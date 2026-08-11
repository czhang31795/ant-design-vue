import addEventListenerWrap from '../../vc-util/Dom/addEventListener';
import type { EventHandler } from '../../_util/EventInterface';
import { defineComponent, onUnmounted, computed, watchEffect, getCurrentInstance } from 'vue';
import type { PropType } from 'vue';
import devWarning from '../../vc-util/devWarning';
import type { ColumnType } from '../interface';
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

const defaultMinWidth = 50;

function getPageX(e: HandleEvent) {
  if (e.touches) {
    if (e.touches.length) {
      return e.touches[0].pageX;
    }
    return e.changedTouches[0].pageX;
  }
  return e.pageX;
}

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'DragHandle',
  props: {
    prefixCls: String,
    width: {
      type: Number,
      required: true,
    },
    minWidth: {
      type: Number,
      default: defaultMinWidth,
    },
    maxWidth: {
      type: Number,
      default: Infinity,
    },
    column: {
      type: Object as PropType<ColumnType<any>>,
      default: undefined as ColumnType<any>,
    },
  },
  setup(props) {
    let startX = 0;
    let baseWidth = 0;
    let columnLeft = 0;
    let dragging = false;
    let proxyEl: HTMLDivElement | null = null;
    let wrapperEl: HTMLElement | null = null;
    let moveEvent = { remove: () => {} };
    let stopEvent = { remove: () => {} };

    const removeEvents = () => {
      moveEvent.remove();
      stopEvent.remove();
    };

    const removeProxy = () => {
      if (proxyEl?.parentNode) {
        proxyEl.parentNode.removeChild(proxyEl);
      }
      proxyEl = null;
    };

    const instance = getCurrentInstance();
    const getHandleEl = () => instance.vnode.el as HTMLElement | null;

    const cleanupDraggingUI = () => {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      wrapperEl?.classList.remove(`${props.prefixCls}-wrapper-resizing`);
      getHandleEl()?.classList.remove('dragging');
      removeProxy();
    };

    onUnmounted(() => {
      removeEvents();
      cleanupDraggingUI();
    });

    watchEffect(() => {
      devWarning(!isNaN(props.width), 'Table', 'width must be a number when use resizable');
    });

    const { onResizeColumn } = useInjectTableContext();
    const minWidth = computed(() => {
      return typeof props.minWidth === 'number' && !isNaN(props.minWidth)
        ? props.minWidth
        : defaultMinWidth;
    });
    const maxWidth = computed(() => {
      return typeof props.maxWidth === 'number' && !isNaN(props.maxWidth)
        ? props.maxWidth
        : Infinity;
    });

    const getColumn = () => props.column.__originColumn__ || props.column;

    const clampWidth = (width: number) => {
      let w = Math.max(width, minWidth.value);
      w = Math.min(w, maxWidth.value);
      return Math.round(w);
    };

    const calcWidth = (e: HandleEvent) => clampWidth(baseWidth + (getPageX(e) - startX));

    const createProxy = (th: HTMLElement) => {
      const prefix = props.prefixCls || 'ant-table';
      const container =
        (th.closest(`.${prefix}-container`) as HTMLElement | null) ||
        (th.closest(`.${prefix}-content`) as HTMLElement | null) ||
        wrapperEl ||
        th.closest('table');
      if (!container) {
        return;
      }
      const rect = container.getBoundingClientRect();
      // Inline styles so guide works outside hashed CSS-in-JS tree
      proxyEl = document.createElement('div');
      proxyEl.className = `${prefix}-resize-proxy`;
      Object.assign(proxyEl.style, {
        position: 'fixed',
        top: `${rect.top}px`,
        height: `${rect.height}px`,
        width: '2px',
        marginLeft: '-1px',
        backgroundColor: 'var(--ant-color-primary, #1677ff)',
        zIndex: '1100',
        pointerEvents: 'none',
        left: `${th.getBoundingClientRect().right}px`,
      });
      document.body.appendChild(proxyEl);
    };

    const syncProxy = (width: number) => {
      if (!proxyEl) {
        return;
      }
      proxyEl.style.left = `${columnLeft + width}px`;
    };

    const handleMove = (e: HandleEvent) => {
      if (!dragging) {
        return;
      }
      e.preventDefault();
      const w = calcWidth(e);
      syncProxy(w);
    };

    const handleStop = (e: HandleEvent) => {
      if (!dragging) {
        return;
      }
      dragging = false;
      const w = calcWidth(e);
      onResizeColumn(w, getColumn());
      removeEvents();
      cleanupDraggingUI();
      wrapperEl = null;
    };

    const handleStart = (e: HandleEvent, eventsFor: typeof events.mouse) => {
      if (e instanceof MouseEvent && e.which !== 1) {
        return;
      }
      const handle = getHandleEl();
      const th = handle?.parentElement as HTMLElement | null;
      if (!th) {
        return;
      }

      const thRect = th.getBoundingClientRect();
      const measured = thRect.width;
      const propWidth = typeof props.width === 'number' && !isNaN(props.width) ? props.width : 0;
      baseWidth =
        propWidth && Math.abs(measured - propWidth) <= 2
          ? propWidth
          : Math.round(measured) || propWidth;
      columnLeft = thRect.left;
      startX = getPageX(e);
      dragging = true;

      const prefix = props.prefixCls || 'ant-table';
      wrapperEl = th.closest(`.${prefix}-wrapper`) as HTMLElement | null;
      wrapperEl?.classList.add(`${prefix}-wrapper-resizing`);
      handle?.classList.add('dragging');
      createProxy(th);
      syncProxy(baseWidth);

      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';

      if (e.stopPropagation) e.stopPropagation();
      removeEvents();
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
        [supportsPassive ? 'onTouchstartPassive' : 'onTouchstart']: (ev: HandleEvent) =>
          handleTouchDown(ev),
      };
      return (
        <div
          class={`${prefixCls}-resize-handle`}
          onMousedown={handleDown}
          {...touchEvents}
          onClick={handleClick}
        >
          <div class={`${prefixCls}-resize-handle-line`}></div>
        </div>
      );
    };
  },
});
