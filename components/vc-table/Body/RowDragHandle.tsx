import addEventListenerWrap from '../../vc-util/Dom/addEventListener';
import type { EventHandler } from '../../_util/EventInterface';
import raf from '../../_util/raf';
import {
  defineComponent,
  onMounted,
  onUnmounted,
  computed,
  shallowRef,
  getCurrentInstance,
  nextTick,
} from 'vue';
import type { PropType } from 'vue';
import type { Key } from '../interface';
import { useInjectTableContext } from '../../table/context';
import supportsPassive from '../../_util/supportsPassive';

const events = {
  mouse: {
    start: 'mousedown',
    move: 'mousemove',
    stop: 'mouseup',
  },
  touch: {
    start: 'touchstart',
    move: 'touchmove',
    stop: 'touchend',
  },
};
type HandleEvent = MouseEvent & TouchEvent;

const defaultMinHeight = 39;

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'RowDragHandle',
  props: {
    prefixCls: String,
    height: {
      type: Number,
    },
    minHeight: {
      type: Number,
      default: defaultMinHeight,
    },
    record: {
      type: Object as PropType<Record<string, any>>,
      default: undefined,
    },
    index: {
      type: Number,
      default: 0,
    },
    rowKey: {
      type: [String, Number] as PropType<Key>,
    },
  },
  setup(props) {
    let startY = 0;
    let moveEvent = { remove: () => {} };
    let stopEvent = { remove: () => {} };
    let resizeObserver: ResizeObserver | null = null;
    let scrollParent: Element | null = null;
    const removeEvents = () => {
      moveEvent.remove();
      stopEvent.remove();
    };
    onUnmounted(() => {
      removeEvents();
      raf.cancel(rafId);
      window.removeEventListener('resize', syncHandleGeometry);
      scrollParent?.removeEventListener('scroll', syncHandleGeometry);
      resizeObserver?.disconnect();
    });

    const { onResizeRow } = useInjectTableContext();
    const minHeight = computed(() => {
      return typeof props.minHeight === 'number' && !isNaN(props.minHeight)
        ? props.minHeight
        : defaultMinHeight;
    });
    const instance = getCurrentInstance();
    let baseHeight = 0;
    let lastHeight = 0;
    let hasMoved = false;
    const dragging = shallowRef(false);
    let rafId: number;

    const resolveContainer = (el: HTMLElement) => {
      const prefix = props.prefixCls || 'xy-table';
      return (
        (el.closest(`.${prefix}-container`) as HTMLElement | null) ||
        (el.closest(`.${prefix}-content`) as HTMLElement | null) ||
        (el.closest('table') as HTMLElement | null)
      );
    };

    const syncHandleGeometry = () => {
      const el = instance.vnode.el as HTMLElement | null;
      if (!el) {
        return;
      }
      const cell = el.parentElement as HTMLElement | null;
      const container = resolveContainer(el);
      if (!cell || !container) {
        return;
      }
      const containerRect = container.getBoundingClientRect();
      const cellRect = cell.getBoundingClientRect();
      // Pin handle to visible table container (not viewport)
      const width = Math.max(container.clientWidth || containerRect.width, 0);
      const left = containerRect.left - cellRect.left;
      el.style.width = `${width}px`;
      el.style.left = `${left}px`;
      el.style.right = 'auto';
      el.style.maxWidth = `${width}px`;
    };

    onMounted(() => {
      nextTick(() => {
        const el = instance.vnode.el as HTMLElement | null;
        if (!el) {
          return;
        }
        syncHandleGeometry();
        const container = resolveContainer(el);
        if (container) {
          scrollParent = container;
          scrollParent.addEventListener('scroll', syncHandleGeometry, { passive: true });
          if (typeof ResizeObserver !== 'undefined') {
            resizeObserver = new ResizeObserver(() => syncHandleGeometry());
            resizeObserver.observe(container);
          }
        }
      });
      window.addEventListener('resize', syncHandleGeometry);
    });

    const updateHeight = (e: HandleEvent, force = false) => {
      let pageY = 0;
      if (e.touches) {
        if (e.touches.length) {
          pageY = e.touches[0].pageY;
        } else {
          pageY = e.changedTouches[0].pageY;
        }
      } else {
        pageY = e.pageY;
      }
      const deltaY = pageY - startY;
      if (!force && !hasMoved && Math.abs(deltaY) < 3) {
        return;
      }
      hasMoved = true;
      let h = Math.max(baseHeight + deltaY, minHeight.value);
      h = Math.round(h);
      if (h === lastHeight) {
        return;
      }
      lastHeight = h;
      raf.cancel(rafId);
      rafId = raf(() => {
        onResizeRow?.(h, props.record, props.index, props.rowKey);
        nextTick(() => syncHandleGeometry());
      });
    };

    const handleMove = (e: HandleEvent) => {
      updateHeight(e);
    };
    const handleStop = (e: HandleEvent) => {
      dragging.value = false;
      if (hasMoved) {
        updateHeight(e, true);
      }
      removeEvents();
      nextTick(() => syncHandleGeometry());
    };
    const handleStart = (e: HandleEvent, eventsFor: any) => {
      if (e instanceof MouseEvent && e.which !== 1) {
        return;
      }
      dragging.value = true;
      hasMoved = false;
      removeEvents();
      syncHandleGeometry();
      const rowEl = (instance.vnode.el as HTMLElement | null)?.closest?.(
        'tr',
      ) as HTMLElement | null;
      const measured = Math.round(rowEl?.getBoundingClientRect().height || 0);
      baseHeight =
        measured || (typeof props.height === 'number' && props.height) || minHeight.value;
      lastHeight = baseHeight;
      if (e.stopPropagation) e.stopPropagation();
      startY = e.touches ? e.touches[0].pageY : e.pageY;
      moveEvent = addEventListenerWrap(document.documentElement, eventsFor.move, handleMove);
      stopEvent = addEventListenerWrap(document.documentElement, eventsFor.stop, handleStop);
    };
    const handleDown: EventHandler = (e: HandleEvent) => {
      e.stopPropagation();
      e.preventDefault();
      handleStart(e, events.mouse);
    };
    const handleTouchDown: EventHandler = (e: HandleEvent) => {
      e.stopPropagation();
      e.preventDefault();
      handleStart(e, events.touch);
    };
    const handleClick: EventHandler = (e: HandleEvent) => {
      e.stopPropagation();
      e.preventDefault();
    };

    return () => {
      const { prefixCls } = props;
      const touchEvents = {
        [supportsPassive ? 'onTouchstartPassive' : 'onTouchstart']: e => handleTouchDown(e),
      };
      return (
        <div
          class={`${prefixCls}-row-resize-handle ${dragging.value ? 'dragging' : ''}`}
          onMousedown={handleDown}
          {...touchEvents}
          onClick={handleClick}
        >
          <div class={`${prefixCls}-row-resize-handle-line`}></div>
        </div>
      );
    };
  },
});
