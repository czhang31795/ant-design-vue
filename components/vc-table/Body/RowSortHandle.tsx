import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { Key } from '../interface';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'RowSortHandle',
  props: {
    prefixCls: String,
    rowKey: {
      type: [String, Number] as PropType<Key>,
    },
  },
  setup(props) {
    const onDragStart = (e: DragEvent) => {
      if (!e.dataTransfer || props.rowKey == null) {
        return;
      }
      e.stopPropagation();
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', String(props.rowKey));
      const row = (e.currentTarget as HTMLElement).closest('tr');
      row?.classList.add(`${props.prefixCls}-row-dragging`);
      const wrapper = row?.closest(`.${props.prefixCls}-wrapper`) as any;
      wrapper?.classList.add(`${props.prefixCls}-wrapper-row-dragging`);
      if (wrapper) {
        wrapper.__draggingRowKey = props.rowKey;
      }
    };

    const onDragEnd = (e: DragEvent) => {
      e.stopPropagation();
      const row = (e.currentTarget as HTMLElement).closest('tr');
      row?.classList.remove(`${props.prefixCls}-row-dragging`);
      const wrapper = row?.closest(`.${props.prefixCls}-wrapper`) as any;
      wrapper?.classList.remove(`${props.prefixCls}-wrapper-row-dragging`);
      if (wrapper) {
        wrapper.__draggingRowKey = undefined;
      }
      wrapper
        ?.querySelectorAll(
          `.${props.prefixCls}-row-drag-over-up, .${props.prefixCls}-row-drag-over-down, .${props.prefixCls}-row-drag-forbidden`,
        )
        .forEach(el => {
          el.classList.remove(
            `${props.prefixCls}-row-drag-over-up`,
            `${props.prefixCls}-row-drag-over-down`,
            `${props.prefixCls}-row-drag-forbidden`,
          );
        });
    };

    return () => {
      const { prefixCls } = props;
      return (
        <span
          class={`${prefixCls}-row-drag-handle`}
          draggable
          onDragstart={onDragStart}
          onDragend={onDragEnd}
          onClick={(e: MouseEvent) => e.stopPropagation()}
          onMousedown={(e: MouseEvent) => e.stopPropagation()}
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
