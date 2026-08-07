import Cell from '../Cell';
import { getColumnsKey } from '../utils/valueUtil';
import type { CustomizeComponent, GetComponentProps, Key, GetRowKey } from '../interface';
import ExpandedRow from './ExpandedRow';
import { computed, defineComponent, shallowRef, watchEffect } from 'vue';
import { useInjectTable } from '../context/TableContext';
import { useInjectBody } from '../context/BodyContext';
import { useInjectTableContext } from '../../table/context';
import classNames from '../../_util/classNames';
import type { MouseEventHandler } from '../../_util/EventInterface';
import RowDragHandle from './RowDragHandle';
import RowSortHandle from './RowSortHandle';

export interface BodyRowProps<RecordType> {
  record: RecordType;
  index: number;
  renderIndex: number;
  recordKey: Key;
  expandedKeys: Set<Key>;
  rowComponent: CustomizeComponent;
  cellComponent: CustomizeComponent;
  customRow: GetComponentProps<RecordType>;
  rowExpandable: (record: RecordType) => boolean;
  indent?: number;
  rowKey: Key;
  getRowKey: GetRowKey<RecordType>;
  childrenColumnName: string;
}

export default defineComponent<BodyRowProps<unknown>>({
  name: 'BodyRow',
  inheritAttrs: false,
  props: [
    'record',
    'index',
    'renderIndex',
    'recordKey',
    'expandedKeys',
    'rowComponent',
    'cellComponent',
    'customRow',
    'rowExpandable',
    'indent',
    'rowKey',
    'getRowKey',
    'childrenColumnName',
  ] as any,
  setup(props, { attrs }) {
    const tableContext = useInjectTable();
    const bodyContext = useInjectBody();
    const tableResizeContext = useInjectTableContext();
    const expandRended = shallowRef(false);

    const expanded = computed(() => props.expandedKeys && props.expandedKeys.has(props.recordKey));

    watchEffect(() => {
      if (expanded.value) {
        expandRended.value = true;
      }
    });

    const rowSupportExpand = computed(
      () =>
        bodyContext.expandableType === 'row' &&
        (!props.rowExpandable || props.rowExpandable(props.record)),
    );
    // Only when row is not expandable and `children` exist in record
    const nestExpandable = computed(() => bodyContext.expandableType === 'nest');
    const hasNestChildren = computed(
      () => props.childrenColumnName && props.record && props.record[props.childrenColumnName],
    );
    const mergedExpandable = computed(() => rowSupportExpand.value || nestExpandable.value);

    const onInternalTriggerExpand = (record, event) => {
      bodyContext.onTriggerExpand(record, event);
    };

    // =========================== onRow ===========================
    const additionalProps = computed<Record<string, any>>(
      () => props.customRow?.(props.record, props.index) || {},
    );

    const onClick: MouseEventHandler = (event, ...args) => {
      if (bodyContext.expandRowByClick && mergedExpandable.value) {
        onInternalTriggerExpand(props.record, event);
      }

      additionalProps.value?.onClick?.(event, ...args);
    };

    const computeRowClassName = computed(() => {
      const { record, index, indent } = props;
      const { rowClassName } = bodyContext;
      if (typeof rowClassName === 'string') {
        return rowClassName;
      } else if (typeof rowClassName === 'function') {
        return rowClassName(record, index, indent);
      }
      return '';
    });

    const columnsKey = computed(() => getColumnsKey(bodyContext.flattenColumns));

    return () => {
      const { class: className, style } = attrs as any;
      const {
        record,
        index,
        rowKey,
        indent = 0,
        rowComponent: RowComponent,
        cellComponent,
      } = props;
      const { prefixCls, fixedInfoList, transformCellText } = tableContext;
      const {
        flattenColumns,
        expandedRowClassName,
        indentSize,
        expandIcon,
        expandedRowRender,
        expandIconColumnIndex,
      } = bodyContext;
      const rowResizable = !!tableResizeContext.rowResizable;
      const rowDraggable = !!tableResizeContext.rowDraggable;
      const rowHeight = tableResizeContext.rowHeights?.[String(rowKey)];
      const minRowHeight = tableResizeContext.minRowHeight ?? 39;

      const clearDragOverClass = (el: Element | null) => {
        el?.classList.remove(
          `${prefixCls}-row-drag-over-up`,
          `${prefixCls}-row-drag-over-down`,
          `${prefixCls}-row-drag-forbidden`,
        );
      };

      const onDragOver = (e: DragEvent) => {
        if (!rowDraggable) {
          return;
        }
        e.preventDefault();
        const wrapper = (e.currentTarget as HTMLElement).closest(`.${prefixCls}-wrapper`);
        const draggingKey = (wrapper as any)?.__draggingRowKey as Key | undefined;
        const allowed =
          draggingKey == null ||
          String(draggingKey) === String(rowKey) ||
          tableResizeContext.canDropRow?.(draggingKey, rowKey) !== false;
        const rowEl = e.currentTarget as HTMLElement;
        clearDragOverClass(rowEl);
        if (!allowed) {
          rowEl.classList.add(`${prefixCls}-row-drag-forbidden`);
          if (e.dataTransfer) {
            e.dataTransfer.dropEffect = 'none';
          }
          return;
        }
        if (e.dataTransfer) {
          e.dataTransfer.dropEffect = 'move';
        }
        if (draggingKey != null && String(draggingKey) === String(rowKey)) {
          return;
        }
        const rect = rowEl.getBoundingClientRect();
        const place = e.clientY < rect.top + rect.height / 2 ? 'up' : 'down';
        rowEl.classList.add(
          place === 'up' ? `${prefixCls}-row-drag-over-up` : `${prefixCls}-row-drag-over-down`,
        );
      };

      const onDragLeave = (e: DragEvent) => {
        clearDragOverClass(e.currentTarget as HTMLElement);
      };

      const onDrop = (e: DragEvent) => {
        if (!rowDraggable) {
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        const fromKey = e.dataTransfer?.getData('text/plain');
        const rowEl = e.currentTarget as HTMLElement;
        clearDragOverClass(rowEl);
        if (!fromKey || String(fromKey) === String(rowKey)) {
          return;
        }
        if (tableResizeContext.canDropRow?.(fromKey, rowKey) === false) {
          return;
        }
        const rect = rowEl.getBoundingClientRect();
        const place = e.clientY < rect.top + rect.height / 2 ? 'before' : 'after';
        tableResizeContext.onDragRowSort?.(fromKey, rowKey, place);
      };

      const onRowDragStartCapture = (e: DragEvent) => {
        if (!rowDraggable) {
          return;
        }
        const wrapper = (e.currentTarget as HTMLElement).closest(`.${prefixCls}-wrapper`) as any;
        if (wrapper) {
          wrapper.__draggingRowKey = rowKey;
        }
      };

      const onRowDragEndCapture = (e: DragEvent) => {
        const wrapper = (e.currentTarget as HTMLElement).closest(`.${prefixCls}-wrapper`) as any;
        if (wrapper) {
          wrapper.__draggingRowKey = undefined;
        }
      };

      const baseRowNode = (
        <RowComponent
          {...additionalProps.value}
          data-row-key={rowKey}
          class={classNames(
            className,
            `${prefixCls}-row`,
            `${prefixCls}-row-level-${indent}`,
            {
              [`${prefixCls}-row-resizable`]: rowResizable,
              [`${prefixCls}-row-draggable`]: rowDraggable,
            },
            computeRowClassName.value,
            additionalProps.value.class,
          )}
          style={[
            style,
            additionalProps.value.style,
            rowHeight ? { height: `${rowHeight}px` } : null,
          ]}
          onClick={onClick}
          onDragover={rowDraggable ? onDragOver : undefined}
          onDragleave={rowDraggable ? onDragLeave : undefined}
          onDrop={rowDraggable ? onDrop : undefined}
          onDragstart={rowDraggable ? onRowDragStartCapture : undefined}
          onDragend={rowDraggable ? onRowDragEndCapture : undefined}
        >
          {flattenColumns.map((column, colIndex) => {
            const { customRender, dataIndex, className: columnClassName } = column;

            const key = columnsKey[colIndex];
            const fixedInfo = fixedInfoList[colIndex];
            const isFirstColumn = colIndex === 0;

            let additionalCellProps;
            if (column.customCell) {
              additionalCellProps = column.customCell(record, index, column);
            }
            // not use slot to fix https://github.com/vueComponent/ant-design-vue/issues/5295
            const expandAppendNode =
              colIndex === (expandIconColumnIndex || 0) && nestExpandable.value ? (
                <>
                  <span
                    style={{ paddingLeft: `${indentSize * indent}px` }}
                    class={`${prefixCls}-row-indent indent-level-${indent}`}
                  />
                  {expandIcon({
                    prefixCls,
                    expanded: expanded.value,
                    expandable: hasNestChildren.value,
                    record,
                    onExpand: onInternalTriggerExpand,
                  })}
                </>
              ) : null;
            const appendNode = (
              <>
                {isFirstColumn && rowDraggable ? (
                  <RowSortHandle prefixCls={prefixCls} rowKey={rowKey} />
                ) : null}
                {expandAppendNode}
                {isFirstColumn && rowResizable ? (
                  <RowDragHandle
                    prefixCls={prefixCls}
                    height={rowHeight}
                    minHeight={minRowHeight}
                    record={record}
                    index={index}
                    rowKey={rowKey}
                  />
                ) : null}
              </>
            );
            return (
              <Cell
                cellType="body"
                class={columnClassName}
                ellipsis={column.ellipsis}
                align={column.align}
                component={cellComponent}
                prefixCls={prefixCls}
                key={key}
                record={record}
                index={index}
                renderIndex={props.renderIndex}
                dataIndex={dataIndex}
                customRender={customRender}
                {...fixedInfo}
                additionalProps={additionalCellProps}
                column={column}
                transformCellText={transformCellText}
                appendNode={appendNode}
              />
            );
          })}
        </RowComponent>
      );

      // ======================== Expand Row =========================
      let expandRowNode;
      if (rowSupportExpand.value && (expandRended.value || expanded.value)) {
        const expandContent = expandedRowRender({
          record,
          index,
          indent: indent + 1,
          expanded: expanded.value,
        });
        const computedExpandedRowClassName =
          expandedRowClassName && expandedRowClassName(record, index, indent);
        expandRowNode = (
          <ExpandedRow
            expanded={expanded.value}
            class={classNames(
              `${prefixCls}-expanded-row`,
              `${prefixCls}-expanded-row-level-${indent + 1}`,
              computedExpandedRowClassName,
            )}
            prefixCls={prefixCls}
            component={RowComponent}
            cellComponent={cellComponent}
            colSpan={flattenColumns.length}
            isEmpty={false}
          >
            {expandContent}
          </ExpandedRow>
        );
      }

      return (
        <>
          {baseRowNode}
          {expandRowNode}
        </>
      );
    };
  },
});
