import { defineComponent } from 'vue';
import Cell from '../Cell';
import { useInjectTable } from '../context/TableContext';
import { useInjectTableContext } from '../../table/context';
import type {
  CellType,
  StickyOffsets,
  ColumnType,
  CustomizeComponent,
  GetComponentProps,
  DefaultRecordType,
} from '../interface';
import { getCellFixedInfo } from '../utils/fixUtil';
import { getColumnsKey } from '../utils/valueUtil';
import DragHandleVue from './DragHandle';
import ColumnDragHandle, { isColumnDraggable } from './ColumnDragHandle';

export interface RowProps<RecordType = DefaultRecordType> {
  cells: readonly CellType<RecordType>[];
  stickyOffsets: StickyOffsets;
  flattenColumns: readonly ColumnType<RecordType>[];
  rowComponent: CustomizeComponent;
  cellComponent: CustomizeComponent;
  customHeaderRow: GetComponentProps<readonly ColumnType<RecordType>[]>;
  index: number;
}

export default defineComponent<RowProps>({
  name: 'HeaderRow',
  props: [
    'cells',
    'stickyOffsets',
    'flattenColumns',
    'rowComponent',
    'cellComponent',
    'index',
    'customHeaderRow',
  ] as any,
  setup(props: RowProps) {
    const tableContext = useInjectTable();
    const tableResizeContext = useInjectTableContext();
    return () => {
      const { prefixCls, direction } = tableContext;
      const {
        cells,
        stickyOffsets,
        flattenColumns,
        rowComponent: RowComponent,
        cellComponent: CellComponent,
        customHeaderRow,
        index,
      } = props;

      let rowProps;
      if (customHeaderRow) {
        rowProps = customHeaderRow(
          cells.map(cell => cell.column),
          index,
        );
      }

      const columnsKey = getColumnsKey(cells.map(cell => cell.column));

      return (
        <RowComponent {...rowProps}>
          {cells.map((cell: CellType, cellIndex) => {
            const { column } = cell;
            const fixedInfo = getCellFixedInfo(
              cell.colStart,
              cell.colEnd,
              flattenColumns,
              stickyOffsets,
              direction,
            );

            let additionalProps: Record<string, any> = {};
            if (column && column.customHeaderCell) {
              additionalProps = {
                ...additionalProps,
                ...(cell.column.customHeaderCell(column) || {}),
              };
            }
            const col: ColumnType<any> = column;
            const colKey = columnsKey[cellIndex];
            const canColumnDrag = !!tableResizeContext.columnDraggable && isColumnDraggable(col);
            additionalProps = {
              ...additionalProps,
              'data-col-key': colKey != null ? String(colKey) : undefined,
              'data-col-draggable': canColumnDrag ? 'true' : 'false',
            };
            const canResize =
              col.resizable === true ||
              (tableResizeContext.resizable &&
                col.resizable !== false &&
                typeof col.width === 'number');
            return (
              <Cell
                {...cell}
                cellType="header"
                class={column?.className}
                ellipsis={column.ellipsis}
                align={column.align}
                component={CellComponent}
                prefixCls={prefixCls}
                key={colKey}
                {...fixedInfo}
                additionalProps={additionalProps}
                rowType="header"
                column={column}
                v-slots={{
                  default: () => (
                    <>
                      {canColumnDrag ? (
                        <ColumnDragHandle prefixCls={prefixCls} column={col} columnKey={colKey} />
                      ) : null}
                      {column.title}
                    </>
                  ),
                  dragHandle: () =>
                    canResize ? (
                      <DragHandleVue
                        prefixCls={prefixCls}
                        width={col.width as number}
                        minWidth={col.minWidth}
                        maxWidth={col.maxWidth}
                        column={col}
                      />
                    ) : null,
                }}
              />
            );
          })}
        </RowComponent>
      );
    };
  },
});
