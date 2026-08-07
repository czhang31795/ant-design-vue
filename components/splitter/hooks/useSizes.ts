import { autoPtgSizes } from './sizeUtil';

export function getPtg(str: string) {
  return Number(str.slice(0, -1)) / 100;
}

function isPtg(itemSize: string | number | undefined): itemSize is string {
  return typeof itemSize === 'string' && itemSize.endsWith('%');
}

function isNonNullable<T>(val: T): val is NonNullable<T> {
  return val !== undefined && val !== null;
}

export type SizeInfo = {
  size?: number | string;
  defaultSize?: number | string;
  min?: number | string;
  max?: number | string;
};

/** Pure size calculation — no Vue reactivity inside */
export function calcSizes(
  infos: SizeInfo[],
  innerSizes: (string | number | undefined)[],
  containerSize: number,
) {
  const propSizes = infos.map(item => item.size);
  const sizes = propSizes.some(isNonNullable) ? propSizes : innerSizes;

  if (!containerSize) {
    // Before measure: keep percent / empty, equal flex later via flexGrow
    return {
      panelSizes: sizes.map(size => size),
      itemPxSizes: infos.map(() => 0),
      itemPtgSizes: infos.map(() => 1 / Math.max(infos.length, 1)),
      itemPtgMinSizes: infos.map(() => 0),
      itemPtgMaxSizes: infos.map(() => 1),
    };
  }

  const postPercentMinSizes = infos.map(item => {
    if (isPtg(item.min as any)) {
      return getPtg(item.min as string);
    }
    return (Number(item.min) || 0) / containerSize;
  });

  const postPercentMaxSizes = infos.map(item => {
    if (isPtg(item.max as any)) {
      return getPtg(item.max as string);
    }
    return (item.max == null ? containerSize : Number(item.max)) / containerSize;
  });

  const ptgList: (number | undefined)[] = [];
  for (let i = 0; i < infos.length; i += 1) {
    const itemSize = sizes[i];
    if (isPtg(itemSize)) {
      ptgList[i] = getPtg(itemSize);
    } else if (itemSize || itemSize === 0) {
      const num = Number(itemSize);
      ptgList[i] = Number.isNaN(num) ? undefined : num / containerSize;
    } else {
      ptgList[i] = undefined;
    }
  }

  const itemPtgSizes = autoPtgSizes(ptgList, postPercentMinSizes, postPercentMaxSizes);
  const itemPxSizes = itemPtgSizes.map(ptg => ptg * containerSize);

  return {
    panelSizes: itemPxSizes,
    itemPxSizes,
    itemPtgSizes,
    itemPtgMinSizes: postPercentMinSizes,
    itemPtgMaxSizes: postPercentMaxSizes,
  };
}
