import type { ComputedRef, Ref } from 'vue';
import { computed } from 'vue';
import type { ColumnsType, ColumnType, Key, GetRowKey } from '../interface';
import type { DefaultRecordType } from '../../vc-table/interface';

const FIELD_KEY = '__field__';
const FIELD_COLUMN_KEY = '__field_column__';

function flattenLeafColumns<RecordType>(
  columns: ColumnsType<RecordType>,
): ColumnType<RecordType>[] {
  const list: ColumnType<RecordType>[] = [];
  columns.forEach(column => {
    if (column && typeof column === 'object' && 'children' in column && column.children) {
      list.push(...flattenLeafColumns(column.children));
    } else if (column && typeof column === 'object') {
      list.push(column as ColumnType<RecordType>);
    }
  });
  return list;
}

function getPathValue(record: DefaultRecordType, dataIndex: ColumnType['dataIndex']) {
  if (dataIndex === undefined || dataIndex === null) {
    return undefined;
  }
  if (!Array.isArray(dataIndex)) {
    return record?.[dataIndex as string];
  }
  return dataIndex.reduce((acc: any, key) => (acc == null ? acc : acc[key]), record);
}

export interface TransposeResult<RecordType = DefaultRecordType> {
  columns: ColumnsType<RecordType>;
  dataSource: DefaultRecordType[];
}

export default function useTranspose<RecordType extends DefaultRecordType = DefaultRecordType>(
  enabled: Ref<boolean> | ComputedRef<boolean>,
  columns: Ref<ColumnsType<RecordType>> | ComputedRef<ColumnsType<RecordType>>,
  dataSource: Ref<RecordType[]> | ComputedRef<RecordType[]>,
  getRowKey: Ref<GetRowKey<RecordType>> | ComputedRef<GetRowKey<RecordType>>,
  options?: {
    prefixCls?: string | Ref<string> | ComputedRef<string>;
    fieldColumnWidth?: number;
    recordColumnWidth?: number;
    fieldColumnTitle?: string;
    columnWidths?: Ref<Record<string, number>> | ComputedRef<Record<string, number>>;
  },
) {
  return computed<TransposeResult>(() => {
    const cols = columns.value || [];
    const data = dataSource.value || [];
    if (!enabled.value) {
      return {
        columns: cols,
        dataSource: data,
      };
    }

    const leafColumns = flattenLeafColumns(cols);
    const widthMap = options?.columnWidths?.value || {};
    const fieldWidth = widthMap[FIELD_COLUMN_KEY] ?? options?.fieldColumnWidth ?? 120;
    const recordWidth = options?.recordColumnWidth ?? 160;
    const prefix =
      typeof options?.prefixCls === 'object' && options.prefixCls && 'value' in options.prefixCls
        ? options.prefixCls.value
        : (options?.prefixCls as string) || 'ant-table';
    const fieldCellClass = `${prefix}-cell-vertical-field`;

    const transposedColumns: ColumnsType<DefaultRecordType> = [
      {
        key: FIELD_COLUMN_KEY,
        dataIndex: FIELD_KEY,
        title: options?.fieldColumnTitle ?? '',
        width: fieldWidth,
        ellipsis: true,
        align: 'left',
        draggable: false,
        className: fieldCellClass,
        customHeaderCell: () => ({ class: fieldCellClass }),
        customCell: () => ({ class: fieldCellClass }),
      },
      ...data.map((record, index) => {
        const key = String(getRowKey.value(record, index));
        return {
          key,
          dataIndex: key,
          title: key,
          width: widthMap[key] ?? recordWidth,
          ellipsis: true,
          align: 'center' as const,
          draggable: true,
        };
      }),
    ];

    const transposedData: DefaultRecordType[] = leafColumns.map((column, fieldIndex) => {
      const fieldKey = (column.key ?? column.dataIndex ?? fieldIndex) as Key;
      const row: DefaultRecordType = {
        key: fieldKey,
        [FIELD_KEY]: column.title ?? column.dataIndex ?? fieldKey,
        [FIELD_COLUMN_KEY]: column,
      };
      data.forEach((record, index) => {
        const recordKey = String(getRowKey.value(record, index));
        row[recordKey] = getPathValue(record, column.dataIndex);
      });
      return row;
    });

    return {
      columns: transposedColumns,
      dataSource: transposedData,
    };
  });
}

export { FIELD_KEY, FIELD_COLUMN_KEY };
