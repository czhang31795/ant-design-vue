import type { CSSProperties } from 'vue';
import { computed, defineComponent, onBeforeUnmount, onMounted, ref } from 'vue';
import classNames from '../_util/classNames';
import { initDefaultProps } from '../_util/props-util';
import type { CustomSlotsType } from '../_util/type';
import { cloneElement } from '../_util/vnode';
import useConfigInject from '../config-provider/hooks/useConfigInject';
import getPanelInfos from './hooks/useItems';
import getResizableInfos from './hooks/useResizable';
import { createResizeHandlers } from './hooks/useResize';
import { calcSizes } from './hooks/useSizes';
import type { ItemType } from './interface';
import { splitterProps } from './interface';
import SplitBar from './SplitBar';
import useStyle from './style';

function isNumber(val: unknown): val is number {
  return typeof val === 'number' && !Number.isNaN(val);
}

export default defineComponent({
  name: 'ASplitter',
  inheritAttrs: false,
  props: initDefaultProps(splitterProps(), {
    lazy: false,
  }),
  slots: Object as CustomSlotsType<{
    default?: any;
  }>,
  emits: ['resizeStart', 'resize', 'resizeEnd', 'collapse'],
  setup(props, { attrs, slots, emit }) {
    const { prefixCls, direction } = useConfigInject('splitter', props);
    const [wrapSSR, hashId] = useStyle(prefixCls);

    const containerRef = ref<HTMLElement>();
    const containerSize = ref(0);
    const dragging = ref(false);
    const movingIndex = ref<number | null>(null);
    // Bump to re-render after drag updates (innerSizes itself is plain data)
    const sizeVersion = ref(0);

    let innerSizes: (string | number | undefined)[] = [];
    let latestInfos: ItemType[] = [];
    let latestPtgSizes: number[] = [];
    let latestPxSizes: number[] = [];
    let latestResizable: ReturnType<typeof getResizableInfos> = [];

    const mergedOrientation = computed(() => {
      if (props.orientation) return props.orientation;
      if (props.layout) return props.layout;
      return props.vertical ? 'vertical' : 'horizontal';
    });
    const isVertical = computed(() => mergedOrientation.value === 'vertical');
    const reverse = computed(() => !isVertical.value && direction.value === 'rtl');

    const resize = createResizeHandlers({
      getItems: () => latestInfos,
      getResizableInfos: () => latestResizable,
      getPercentSizes: () => latestPtgSizes,
      getContainerSize: () => containerSize.value,
      getReverse: () => reverse.value,
      updateSizes: sizes => {
        innerSizes = sizes;
        sizeVersion.value += 1;
      },
    });

    let rafId = 0;
    let pendingOffset: { index: number; offset: number } | null = null;
    let ro: ResizeObserver | null = null;

    const flushOffset = () => {
      rafId = 0;
      if (!pendingOffset) return;
      const { index, offset } = pendingOffset;
      pendingOffset = null;
      const nextSizes = resize.onOffsetUpdate(index, offset);
      movingIndex.value = resize.getMovingIndex();
      emit('resize', nextSizes);
    };

    const measure = () => {
      const el = containerRef.value;
      if (!el || dragging.value) return;
      const next = isVertical.value ? el.offsetHeight : el.offsetWidth;
      if (next > 0 && next !== containerSize.value) {
        containerSize.value = next;
      }
    };

    onMounted(() => {
      measure();
      const el = containerRef.value;
      if (!el || typeof ResizeObserver === 'undefined') return;
      ro = new ResizeObserver(() => measure());
      ro.observe(el);
    });

    onBeforeUnmount(() => {
      if (rafId) cancelAnimationFrame(rafId);
      ro?.disconnect();
      ro = null;
    });

    const onInternalResizeStart = (index: number) => {
      dragging.value = true;
      resize.onOffsetStart(index);
      movingIndex.value = index;
      emit('resizeStart', latestPxSizes);
    };

    const onInternalResizeUpdate = (
      index: number,
      offsetX: number,
      offsetY: number,
      lazyEnd?: boolean,
    ) => {
      let offset = isVertical.value ? offsetY : offsetX;
      if (reverse.value) offset = -offset;

      if (lazyEnd) {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = 0;
        }
        pendingOffset = null;
        const nextSizes = resize.onOffsetUpdate(index, offset);
        movingIndex.value = resize.getMovingIndex();
        emit('resizeEnd', nextSizes);
        return;
      }

      pendingOffset = { index, offset };
      if (!rafId) {
        rafId = requestAnimationFrame(flushOffset);
      }
    };

    const onInternalResizeEnd = (lazyEnd?: boolean) => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        flushOffset();
      }
      resize.onOffsetEnd();
      movingIndex.value = null;
      dragging.value = false;
      measure();
      if (!lazyEnd) {
        emit('resizeEnd', latestPxSizes);
      }
    };

    const onInternalCollapse = (index: number, type: 'start' | 'end') => {
      const nextSizes = resize.onCollapse(index, type);
      movingIndex.value = null;
      emit('resize', nextSizes);
      emit('resizeEnd', nextSizes);
      const collapsed = nextSizes.map(size => Math.abs(size) < Number.EPSILON);
      emit('collapse', collapsed, nextSizes);
    };

    return () => {
      // depend on sizeVersion for drag updates
      sizeVersion.value;

      const panels = getPanelInfos(slots.default?.());
      const infos = panels.map(p => p.info);

      if (innerSizes.length !== infos.length) {
        innerSizes = infos.map((info, index) => innerSizes[index] ?? info.defaultSize);
      }

      const sizeResult = calcSizes(infos, innerSizes, containerSize.value);
      const resizableInfos = getResizableInfos(infos, sizeResult.itemPxSizes, reverse.value);

      latestInfos = infos;
      latestPtgSizes = sizeResult.itemPtgSizes;
      latestPxSizes = sizeResult.itemPxSizes;
      latestResizable = resizableInfos;

      const stackSizes: number[] = [];
      let stack = 0;
      sizeResult.itemPtgSizes.forEach(size => {
        stack += size;
        stackSizes.push(stack);
      });

      const children = panels.map(({ vnode }, idx) => {
        const panelNode = cloneElement(vnode, {
          key: `panel-${infos[idx].key ?? idx}`,
          prefixCls: prefixCls.value,
          flexSize: sizeResult.panelSizes[idx],
        });

        let splitBar: any = null;
        const resizableInfo = resizableInfos[idx];
        if (resizableInfo) {
          const prevStackSize = Number.isFinite(stackSizes[idx - 1]) ? stackSizes[idx - 1] : 0;
          const nextStackSize = Number.isFinite(stackSizes[idx + 1]) ? stackSizes[idx + 1] : 1;
          const ariaMinStart = prevStackSize + sizeResult.itemPtgMinSizes[idx];
          const ariaMinEnd = nextStackSize - sizeResult.itemPtgMaxSizes[idx + 1];
          const ariaMaxStart = prevStackSize + sizeResult.itemPtgMaxSizes[idx];
          const ariaMaxEnd = nextStackSize - sizeResult.itemPtgMinSizes[idx + 1];

          splitBar = (
            <SplitBar
              key={`bar-${idx}`}
              index={idx}
              active={movingIndex.value === idx}
              prefixCls={prefixCls.value}
              vertical={isVertical.value}
              resizable={resizableInfo.resizable}
              lazy={props.lazy}
              startCollapsible={resizableInfo.startCollapsible}
              endCollapsible={resizableInfo.endCollapsible}
              showStartCollapsibleIcon={resizableInfo.showStartCollapsibleIcon}
              showEndCollapsibleIcon={resizableInfo.showEndCollapsibleIcon}
              ariaNow={(sizeResult.itemPtgSizes[idx] || 0) * 100}
              ariaMin={Math.max(ariaMinStart, ariaMinEnd) * 100}
              ariaMax={Math.min(ariaMaxStart, ariaMaxEnd) * 100}
              containerSize={containerSize.value || 0}
              onOffsetStart={onInternalResizeStart}
              onOffsetUpdate={onInternalResizeUpdate}
              onOffsetEnd={onInternalResizeEnd}
              onCollapse={onInternalCollapse}
            />
          );
        }

        return [panelNode, splitBar];
      });

      return wrapSSR(
        <div
          {...attrs}
          ref={containerRef}
          class={classNames(
            prefixCls.value,
            `${prefixCls.value}-${mergedOrientation.value}`,
            {
              [`${prefixCls.value}-rtl`]: direction.value === 'rtl',
            },
            hashId.value,
            attrs.class,
          )}
          style={attrs.style as CSSProperties}
        >
          {children}
          {isNumber(movingIndex.value) && (
            <div
              class={classNames(`${prefixCls.value}-mask`, {
                [`${prefixCls.value}-mask-horizontal`]: !isVertical.value,
                [`${prefixCls.value}-mask-vertical`]: isVertical.value,
              })}
            />
          )}
        </div>,
      );
    };
  },
});
