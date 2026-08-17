import type { ColumnType } from './interface';
import { INTERNAL_COL_DEFINE } from './utils/legacyUtil';

export interface ColGroupProps<RecordType> {
  colWidths: readonly (number | string)[];
  columns?: readonly ColumnType<RecordType>[];
  columCount?: number;
}

function resolveColWidth<RecordType>(
  measured: number | string | undefined,
  column?: ColumnType<RecordType>,
) {
  const declared = column?.width;
  // Explicit numeric width wins over MeasureCell — otherwise resizable updates are ignored
  if (typeof declared === 'number' && !Number.isNaN(declared)) {
    return declared;
  }
  return measured ?? declared;
}

function ColGroup<RecordType>({ colWidths, columns, columCount }: ColGroupProps<RecordType>) {
  const cols = [];
  const len = columCount || columns.length;

  // Only insert col with width & additional props
  // Skip if rest col do not have any useful info
  let mustInsert = false;
  for (let i = len - 1; i >= 0; i -= 1) {
    const column = columns && columns[i];
    const width = resolveColWidth(colWidths[i], column);
    const additionalProps = column && column[INTERNAL_COL_DEFINE];

    if (width || additionalProps || mustInsert) {
      const { columnType, ...restAdditionalProps } = additionalProps || {};
      cols.unshift(
        <col
          key={i}
          style={{ width: typeof width === 'number' ? `${width}px` : width }}
          {...restAdditionalProps}
        />,
      );
      mustInsert = true;
    }
  }

  return <colgroup>{cols}</colgroup>;
}

export default ColGroup;
