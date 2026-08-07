import type { ItemType, ResizableInfo } from '../interface';
import { getPtg } from './useSizes';

export function createResizeHandlers(options: {
  getItems: () => ItemType[];
  getResizableInfos: () => ResizableInfo[];
  getPercentSizes: () => number[];
  getContainerSize: () => number;
  updateSizes: (sizes: number[]) => void;
  getReverse: () => boolean;
}) {
  let cacheSizes: number[] = [];
  let cacheCollapsedSize: number[] = [];
  let movingIndex: { index: number; confirmed: boolean } | null = null;

  const getLimitSize = (str: string | number | undefined, defaultLimit: number) => {
    const mergedContainerSize = options.getContainerSize() || 0;
    if (typeof str === 'string') {
      return getPtg(str) * mergedContainerSize;
    }
    return str ?? defaultLimit;
  };

  const getPxSizes = () => {
    const mergedContainerSize = options.getContainerSize() || 0;
    return options.getPercentSizes().map(ptg => ptg * mergedContainerSize);
  };

  const onOffsetStart = (index: number) => {
    cacheSizes = getPxSizes();
    movingIndex = { index, confirmed: false };
  };

  const onOffsetUpdate = (index: number, offset: number) => {
    let confirmedIndex: number | null = null;
    const mergedContainerSize = options.getContainerSize() || 0;
    const resizableInfos = options.getResizableInfos();
    const items = options.getItems();

    if ((!movingIndex || !movingIndex.confirmed) && offset !== 0) {
      if (offset > 0) {
        confirmedIndex = index;
        movingIndex = { index, confirmed: true };
      } else {
        for (let i = index; i >= 0; i -= 1) {
          if (cacheSizes[i] > 0 && resizableInfos[i]?.resizable) {
            confirmedIndex = i;
            movingIndex = { index: i, confirmed: true };
            break;
          }
        }
      }
    }
    const mergedIndex = confirmedIndex ?? movingIndex?.index ?? index;
    const numSizes = [...cacheSizes];
    const nextIndex = mergedIndex + 1;
    const limitSizes = items.map(item => [item.min, item.max]);

    const startMinSize = getLimitSize(limitSizes[mergedIndex]?.[0], 0);
    const endMinSize = getLimitSize(limitSizes[nextIndex]?.[0], 0);
    const startMaxSize = getLimitSize(limitSizes[mergedIndex]?.[1], mergedContainerSize);
    const endMaxSize = getLimitSize(limitSizes[nextIndex]?.[1], mergedContainerSize);

    let mergedOffset = offset;
    if (numSizes[mergedIndex] + mergedOffset < startMinSize) {
      mergedOffset = startMinSize - numSizes[mergedIndex];
    }
    if (numSizes[nextIndex] - mergedOffset < endMinSize) {
      mergedOffset = numSizes[nextIndex] - endMinSize;
    }
    if (numSizes[mergedIndex] + mergedOffset > startMaxSize) {
      mergedOffset = startMaxSize - numSizes[mergedIndex];
    }
    if (numSizes[nextIndex] - mergedOffset > endMaxSize) {
      mergedOffset = numSizes[nextIndex] - endMaxSize;
    }

    numSizes[mergedIndex] += mergedOffset;
    numSizes[nextIndex] -= mergedOffset;
    options.updateSizes(numSizes);
    return numSizes;
  };

  const onOffsetEnd = () => {
    movingIndex = null;
  };

  const onCollapse = (index: number, type: 'start' | 'end') => {
    const currentSizes = getPxSizes();
    const mergedContainerSize = options.getContainerSize() || 0;
    const reverse = options.getReverse();
    const adjustedType = reverse ? (type === 'start' ? 'end' : 'start') : type;
    const currentIndex = adjustedType === 'start' ? index : index + 1;
    const targetIndex = adjustedType === 'start' ? index + 1 : index;
    const items = options.getItems();
    const limitSizes = items.map(item => [item.min, item.max]);

    const currentSize = currentSizes[currentIndex];
    const targetSize = currentSizes[targetIndex];

    if (currentSize !== 0 && targetSize !== 0) {
      currentSizes[currentIndex] = 0;
      currentSizes[targetIndex] += currentSize;
      cacheCollapsedSize[index] = currentSize;
    } else {
      const totalSize = currentSize + targetSize;
      const currentSizeMin = getLimitSize(limitSizes[currentIndex]?.[0], 0);
      const currentSizeMax = getLimitSize(limitSizes[currentIndex]?.[1], mergedContainerSize);
      const targetSizeMin = getLimitSize(limitSizes[targetIndex]?.[0], 0);
      const targetSizeMax = getLimitSize(limitSizes[targetIndex]?.[1], mergedContainerSize);
      const limitStart = Math.max(currentSizeMin, totalSize - targetSizeMax);
      const limitEnd = Math.min(currentSizeMax, totalSize - targetSizeMin);
      const halfOffset = targetSizeMin || (limitEnd - limitStart) / 2;
      const targetCacheCollapsedSize = cacheCollapsedSize[index];
      const currentCacheCollapsedSize = totalSize - targetCacheCollapsedSize;
      const shouldUseCache =
        targetCacheCollapsedSize &&
        targetCacheCollapsedSize <= targetSizeMax &&
        targetCacheCollapsedSize >= targetSizeMin &&
        currentCacheCollapsedSize <= currentSizeMax &&
        currentCacheCollapsedSize >= currentSizeMin;

      if (shouldUseCache) {
        currentSizes[targetIndex] = targetCacheCollapsedSize;
        currentSizes[currentIndex] = currentCacheCollapsedSize;
      } else {
        currentSizes[currentIndex] -= halfOffset;
        currentSizes[targetIndex] += halfOffset;
      }
    }

    options.updateSizes(currentSizes);
    return currentSizes;
  };

  const getMovingIndex = () => movingIndex?.index ?? null;

  return { onOffsetStart, onOffsetUpdate, onOffsetEnd, onCollapse, getMovingIndex };
}
