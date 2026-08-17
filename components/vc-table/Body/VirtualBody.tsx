import type { GetRowKey, Key, GetComponentProps } from '../interface';
import ExpandedRow from './ExpandedRow';
import { getColumnsKey } from '../utils/valueUtil';
import MeasureCell from './MeasureCell';
import BodyRow from './BodyRow';
import ColGroup from '../ColGroup';
import useFlattenRecords from '../hooks/useFlattenRecords';
import { computed, defineComponent, onBeforeUnmount, shallowRef, toRef, watch } from 'vue';
import { useInjectResize } from '../context/ResizeContext';
import { useInjectTable } from '../context/TableContext';
import { useInjectBody } from '../context/BodyContext';
import { useProvideHover } from '../context/HoverContext';
import type { EventHandler } from '../../_util/EventInterface';
import type { CSSProperties, PropType } from 'vue';

const OVERSCAN = 5;

export default defineComponent({
  name: 'VirtualBody',
  inheritAttrs: false,
  props: {
    data: { type: Array as PropType<any[]>, default: () => [] },
    getRowKey: { type: Function as PropType<GetRowKey<any>>, required: true },
    measureColumnWidth: { type: Boolean, default: false },
    expandedKeys: { type: Object as PropType<Set<Key>>, required: true },
    customRow: { type: Function as PropType<GetComponentProps<any>> },
    rowExpandable: { type: Function as PropType<(record: any) => boolean> },
    childrenColumnName: { type: String, default: 'children' },
    height: { type: Number, required: true },
    itemHeight: { type: Number, required: true },
    scrollTableStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },
    tableLayout: { type: String as PropType<CSSProperties['tableLayout']> },
    onScroll: { type: Function as PropType<EventHandler> },
    bodyRef: { type: Object as PropType<{ value?: HTMLElement | null }> },
    colWidths: { type: Array as PropType<(number | string)[]>, default: () => [] },
  },
  setup(props, { attrs, slots }) {
    const resizeContext = useInjectResize();
    const tableContext = useInjectTable();
    const bodyContext = useInjectBody();
    const scrollTop = shallowRef(0);
    const scrollBodyRef = shallowRef<HTMLDivElement>();

    const setBodyRef = (el: HTMLDivElement | null) => {
      scrollBodyRef.value = el || undefined;
      if (props.bodyRef) {
        props.bodyRef.value = el;
      }
    };

    const flattenData = useFlattenRecords(
      toRef(props, 'data'),
      toRef(props, 'childrenColumnName'),
      toRef(props, 'expandedKeys'),
      toRef(props, 'getRowKey'),
    );

    const startRow = shallowRef(-1);
    const endRow = shallowRef(-1);
    let timeoutId: any;
    useProvideHover({
      startRow,
      endRow,
      onHover: (start, end) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          startRow.value = start;
          endRow.value = end;
        }, 100);
      },
    });

    onBeforeUnmount(() => {
      clearTimeout(timeoutId);
    });

    const range = computed(() => {
      const itemHeight = props.itemHeight || 54;
      const height = props.height || 0;
      const total = flattenData.value.length;
      if (!total || !height) {
        return { start: 0, end: 0, offsetY: 0, totalHeight: height || 0 };
      }
      const start = Math.max(0, Math.floor(scrollTop.value / itemHeight) - OVERSCAN);
      const visibleCount = Math.ceil(height / itemHeight) + OVERSCAN * 2;
      const end = Math.min(total, start + visibleCount);
      return {
        start,
        end,
        offsetY: start * itemHeight,
        totalHeight: total * itemHeight,
      };
    });

    watch(
      () => flattenData.value.length,
      () => {
        const maxScrollTop = Math.max(0, range.value.totalHeight - (props.height || 0));
        if (scrollTop.value > maxScrollTop) {
          scrollTop.value = maxScrollTop;
          if (scrollBodyRef.value) {
            scrollBodyRef.value.scrollTop = maxScrollTop;
          }
        }
      },
    );

    const onBodyScroll: EventHandler = e => {
      const target = e.currentTarget as HTMLElement;
      scrollTop.value = target.scrollTop;
      props.onScroll?.(e);
    };

    return () => {
      const {
        data,
        getRowKey,
        measureColumnWidth,
        expandedKeys,
        customRow,
        rowExpandable,
        childrenColumnName,
        height,
        itemHeight,
        scrollTableStyle,
        tableLayout,
        colWidths,
      } = props;
      const { onColumnResize } = resizeContext;
      const { prefixCls, getComponent } = tableContext;
      const { flattenColumns } = bodyContext;
      const TableComponent = getComponent(['table'], 'table');
      const WrapperComponent = getComponent(['body', 'wrapper'], 'tbody');
      const trComponent = getComponent(['body', 'row'], 'tr');
      const tdComponent = getComponent(['body', 'cell'], 'td');
      const columnsKey = getColumnsKey(flattenColumns);
      const { start, end, offsetY, totalHeight } = range.value;
      // Numeric column.width wins so resizable updates are not overwritten by MeasureCell
      const mergedColWidths = flattenColumns.map((column, index) => {
        const measured = colWidths?.[index];
        return typeof column.width === 'number' && !Number.isNaN(column.width)
          ? column.width
          : measured ?? column.width;
      });
      // Fill scrollport so header (width:100% + scrollbar col) and body share the same column box;
      // keep scroll.x as minWidth for horizontal overflow.
      const mergedTableStyle: CSSProperties = {
        ...scrollTableStyle,
        tableLayout,
        width: '100%',
        minWidth: (scrollTableStyle.minWidth || scrollTableStyle.width || undefined) as any,
        position: data.length ? 'absolute' : undefined,
        top: 0,
        left: 0,
        transform: data.length ? `translateY(${offsetY}px)` : undefined,
      };

      let rows: any;
      if (data.length) {
        rows = flattenData.value.slice(start, end).map((item, i) => {
          const idx = start + i;
          const { record, indent, index: renderIndex } = item;
          const key = getRowKey(record, idx);
          return (
            <BodyRow
              key={key}
              rowKey={key}
              record={record}
              recordKey={key}
              index={idx}
              renderIndex={renderIndex}
              rowComponent={trComponent}
              cellComponent={tdComponent}
              expandedKeys={expandedKeys}
              customRow={customRow}
              getRowKey={getRowKey}
              rowExpandable={rowExpandable}
              childrenColumnName={childrenColumnName}
              indent={indent}
              style={{ height: `${itemHeight}px` }}
            />
          );
        });
      } else {
        rows = (
          <ExpandedRow
            expanded
            class={`${prefixCls}-placeholder`}
            prefixCls={prefixCls}
            component={trComponent}
            cellComponent={tdComponent}
            colSpan={flattenColumns.length}
            isEmpty
          >
            {slots.emptyNode?.()}
          </ExpandedRow>
        );
      }

      return (
        <div
          {...attrs}
          ref={setBodyRef}
          class={[`${prefixCls}-body`, `${prefixCls}-tbody-virtual`, attrs.class]}
          style={[
            {
              // Default: only vertical scroll. Horizontal comes from attrs (scroll.x).
              overflowX: 'hidden',
              overflowY: 'auto',
              maxHeight: `${height}px`,
            },
            attrs.style as CSSProperties,
          ]}
          onScroll={onBodyScroll}
        >
          <div
            class={`${prefixCls}-tbody-virtual-holder`}
            style={{
              height: `${data.length ? totalHeight : height}px`,
              position: 'relative',
            }}
          >
            <TableComponent style={mergedTableStyle}>
              <ColGroup colWidths={mergedColWidths} columns={flattenColumns} />
              <WrapperComponent class={`${prefixCls}-tbody`}>
                {measureColumnWidth && (
                  <tr
                    aria-hidden="true"
                    class={`${prefixCls}-measure-row`}
                    style={{ height: 0, fontSize: 0 }}
                  >
                    {columnsKey.map(columnKey => (
                      <MeasureCell
                        key={columnKey}
                        columnKey={columnKey}
                        onColumnResize={onColumnResize}
                      />
                    ))}
                  </tr>
                )}
                {rows}
              </WrapperComponent>
            </TableComponent>
          </div>
        </div>
      );
    };
  },
});
