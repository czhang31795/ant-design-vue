import addEventListenerWrap from '../../vc-util/Dom/addEventListener';
import type { EventHandler } from '../../_util/EventInterface';
import { defineComponent, onUnmounted, getCurrentInstance } from 'vue';
import type { PropType } from 'vue';
import type { ColumnType, Key } from '../interface';
import { useInjectTableContext } from '../../table/context';
import { INTERNAL_COL_DEFINE } from '../utils/legacyUtil';

// Keep in sync with table/hooks/useTranspose FIELD_COLUMN_KEY
const FIELD_COLUMN_KEY = '__field_column__';

function getPageX(e: MouseEvent | TouchEvent) {
  if ('touches' in e) {
    if (e.touches.length) {
      return e.touches[0].pageX;
    }
    return e.changedTouches[0].pageX;
  }
  return e.pageX;
}

function isColumnDraggable(column?: ColumnType<any>) {
  if (!column || typeof column !== 'object') {
    return false;
  }
  if (column.draggable === false) {
    return false;
  }
  if (column.fixed) {
    return false;
  }
  if (INTERNAL_COL_DEFINE in column) {
    return false;
  }
  if (String(column.key) === FIELD_COLUMN_KEY) {
    return false;
  }
  if ('children' in column && (column as any).children) {
    return false;
  }
  return true;
}

export { isColumnDraggable };

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ColumnDragHandle',
  props: {
    prefixCls: String,
    column: {
      type: Object as PropType<ColumnType<any>>,
      default: undefined as ColumnType<any>,
    },
    columnKey: {
      type: [String, Number] as PropType<Key>,
    },
  },
  setup(props) {
    let dragging = false;
    let proxyEl: HTMLDivElement | null = null;
    let wrapperEl: HTMLElement | null = null;
    let fromKey: Key | null = null;
    let targetKey: Key | null = null;
    let place: 'before' | 'after' = 'before';
    let moveEvent = { remove: () => {} };
    let stopEvent = { remove: () => {} };
    let touchMoveEvent = { remove: () => {} };
    let touchStopEvent = { remove: () => {} };

    const { onDragColumnSort } = useInjectTableContext();
    const instance = getCurrentInstance();

    const removeEvents = () => {
      moveEvent.remove();
      stopEvent.remove();
      touchMoveEvent.remove();
      touchStopEvent.remove();
    };

    const removeProxy = () => {
      if (proxyEl?.parentNode) {
        proxyEl.parentNode.removeChild(proxyEl);
      }
      proxyEl = null;
    };

    const cleanup = () => {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      wrapperEl?.classList.remove(`${props.prefixCls}-wrapper-column-dragging`);
      const handle = instance.vnode.el as HTMLElement | null;
      handle?.classList.remove('dragging');
      removeProxy();
      wrapperEl = null;
      fromKey = null;
      targetKey = null;
    };

    onUnmounted(() => {
      removeEvents();
      cleanup();
    });

    const createProxy = (th: HTMLElement) => {
      const prefix = props.prefixCls || 'xy-table';
      const container =
        (th.closest(`.${prefix}-container`) as HTMLElement | null) ||
        (th.closest(`.${prefix}-content`) as HTMLElement | null) ||
        wrapperEl ||
        th.closest('table');
      if (!container) {
        return;
      }
      const rect = container.getBoundingClientRect();
      proxyEl = document.createElement('div');
      proxyEl.className = `${prefix}-column-drag-proxy`;
      Object.assign(proxyEl.style, {
        position: 'fixed',
        top: `${rect.top}px`,
        height: `${rect.height}px`,
        width: '2px',
        marginLeft: '-1px',
        backgroundColor: 'var(--xy-color-primary, #1677ff)',
        zIndex: '1100',
        pointerEvents: 'none',
        left: `${th.getBoundingClientRect().left}px`,
      });
      document.body.appendChild(proxyEl);
    };

    const resolveTarget = (pageX: number) => {
      if (!wrapperEl) {
        return;
      }
      const prefix = props.prefixCls || 'xy-table';
      const headers = wrapperEl.querySelectorAll(
        `.${prefix}-thead > tr > th`,
      ) as NodeListOf<HTMLElement>;
      let matched: { key: Key; place: 'before' | 'after'; left: number } | null = null;
      headers.forEach(th => {
        const key = th.getAttribute('data-col-key');
        if (key == null || th.getAttribute('data-col-draggable') === 'false') {
          return;
        }
        const rect = th.getBoundingClientRect();
        if (pageX < rect.left || pageX > rect.right) {
          return;
        }
        const nextPlace: 'before' | 'after' =
          pageX < rect.left + rect.width / 2 ? 'before' : 'after';
        matched = {
          key,
          place: nextPlace,
          left: nextPlace === 'before' ? rect.left : rect.right,
        };
      });
      if (matched && proxyEl) {
        targetKey = matched.key;
        place = matched.place;
        proxyEl.style.left = `${matched.left}px`;
      }
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging) {
        return;
      }
      e.preventDefault();
      resolveTarget(getPageX(e));
    };

    const handleStop = (e: MouseEvent | TouchEvent) => {
      if (!dragging) {
        return;
      }
      dragging = false;
      resolveTarget(getPageX(e));
      if (fromKey != null && targetKey != null && String(fromKey) !== String(targetKey)) {
        onDragColumnSort?.(fromKey, targetKey, place);
      }
      removeEvents();
      cleanup();
    };

    const handleStart = (e: MouseEvent | TouchEvent) => {
      if (e instanceof MouseEvent && 'which' in e && e.which !== 1) {
        return;
      }
      const handle = instance.vnode.el as HTMLElement | null;
      const th = handle?.closest('th') as HTMLElement | null;
      if (!th || !isColumnDraggable(props.column)) {
        return;
      }
      const prefix = props.prefixCls || 'xy-table';
      fromKey = props.columnKey ?? props.column?.key ?? null;
      if (fromKey == null) {
        return;
      }
      targetKey = fromKey;
      place = 'before';
      dragging = true;
      wrapperEl = th.closest(`.${prefix}-wrapper`) as HTMLElement | null;
      wrapperEl?.classList.add(`${prefix}-wrapper-column-dragging`);
      handle?.classList.add('dragging');
      createProxy(th);
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
      e.stopPropagation?.();
      if ('preventDefault' in e) {
        e.preventDefault();
      }
      removeEvents();
      moveEvent = addEventListenerWrap(document.documentElement, 'mousemove', handleMove);
      stopEvent = addEventListenerWrap(document.documentElement, 'mouseup', handleStop);
      touchMoveEvent = addEventListenerWrap(document.documentElement, 'touchmove', handleMove);
      touchStopEvent = addEventListenerWrap(document.documentElement, 'touchend', handleStop);
    };

    const onMouseDown: EventHandler = (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      handleStart(e);
    };

    return () => {
      const { prefixCls } = props;
      return (
        <span
          class={`${prefixCls}-column-drag-handle`}
          onMousedown={onMouseDown}
          title="Drag to reorder"
        >
          <svg viewBox="0 0 16 16" width="1em" height="1em" fill="currentColor" aria-hidden="true">
            <circle cx="5.5" cy="3.5" r="1.35" />
            <circle cx="10.5" cy="3.5" r="1.35" />
            <circle cx="5.5" cy="8" r="1.35" />
            <circle cx="10.5" cy="8" r="1.35" />
            <circle cx="5.5" cy="12.5" r="1.35" />
            <circle cx="10.5" cy="12.5" r="1.35" />
          </svg>
        </span>
      );
    };
  },
});
