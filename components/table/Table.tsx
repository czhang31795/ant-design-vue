import RcTable from '../vc-table';
import type { TableProps as RcTableProps } from '../vc-table/Table';
import { INTERNAL_HOOKS } from '../vc-table/Table';
import type { SpinProps } from '../spin';
import Spin from '../spin';
import Pagination from '../pagination';
import type { TooltipProps } from '../tooltip';
import usePagination, { DEFAULT_PAGE_SIZE, getPaginationParam } from './hooks/usePagination';
import useLazyKVMap from './hooks/useLazyKVMap';
import type { Breakpoint } from '../_util/responsiveObserve';
import type {
  TableRowSelection,
  GetRowKey,
  ColumnType,
  ColumnsType,
  TableCurrentDataSource,
  SorterResult,
  GetPopupContainer,
  ExpandType,
  TablePaginationConfig,
  SortOrder,
  TableLocale,
  TableAction,
  FilterValue,
} from './interface';
import useSelection from './hooks/useSelection';
import type { SortState } from './hooks/useSorter';
import useSorter, { getSortData } from './hooks/useSorter';
import type { FilterState } from './hooks/useFilter';
import useFilter, { getFilterData } from './hooks/useFilter';
import useTitleColumns from './hooks/useTitleColumns';
import renderExpandIcon from './ExpandIcon';
import scrollTo from '../_util/scrollTo';
import defaultLocale from '../locale/en_US';
import type { SizeType } from '../config-provider';
import devWarning from '../vc-util/devWarning';
import type { CSSProperties } from 'vue';
import { nextTick, reactive, ref, computed, defineComponent, toRef, watchEffect, watch } from 'vue';
import type { DefaultRecordType, RenderExpandIconProps } from '../vc-table/interface';
import useBreakpoint from '../_util/hooks/useBreakpoint';
import useConfigInject from '../config-provider/hooks/useConfigInject';
import { useLocaleReceiver } from '../locale-provider/LocaleReceiver';
import classNames from '../_util/classNames';
import omit from '../_util/omit';
import { initDefaultProps } from '../_util/props-util';
import { useProvideSlots, useProvideTableContext } from './context';
import type { ContextSlots } from './context';
import useColumns from './hooks/useColumns';
import useTranspose from './hooks/useTranspose';
import { convertChildrenToColumns, getColumnKey } from './util';
import {
  areSiblingKeys,
  hasGroupColumns,
  reorderByKeys,
  reorderTreeSiblings,
  findSiblingInfo,
} from './utils/dragSort';
import type { DragPlace } from './context';

import {
  stringType,
  booleanType,
  arrayType,
  someType,
  functionType,
  objectType,
} from '../_util/type';

// CSSINJS
import useStyle from './style';
import type { CustomSlotsType } from '../_util/type';

export type { ColumnsType, TablePaginationConfig };

const EMPTY_LIST: any[] = [];

interface ChangeEventInfo<RecordType = DefaultRecordType> {
  pagination: {
    current?: number;
    pageSize?: number;
    total?: number;
  };
  filters: Record<string, FilterValue | null>;
  sorter: SorterResult<RecordType> | SorterResult<RecordType>[];

  filterStates: FilterState<RecordType>[];
  sorterStates: SortState<RecordType>[];

  resetPagination: Function;
}

export interface TableProps<RecordType = DefaultRecordType>
  extends Omit<
    RcTableProps<RecordType>,
    | 'transformColumns'
    | 'internalHooks'
    | 'internalRefs'
    | 'data'
    | 'columns'
    | 'scroll'
    | 'emptyText'
    | 'canExpandable'
    | 'onUpdateInternalRefs'
  > {
  dropdownPrefixCls?: string;
  dataSource?: RcTableProps<RecordType>['data'];
  columns?: ColumnsType<RecordType>;
  pagination?: false | TablePaginationConfig;
  loading?: boolean | SpinProps;
  size?: SizeType;
  bordered?: boolean;
  locale?: TableLocale;

  onChange?: (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<RecordType> | SorterResult<RecordType>[],
    extra: TableCurrentDataSource<RecordType>,
  ) => void;
  onResizeColumn?: (w: number, col: ColumnType) => void;
  rowSelection?: TableRowSelection<RecordType>;

  getPopupContainer?: GetPopupContainer;
  scroll?: RcTableProps<RecordType>['scroll'] & {
    scrollToFirstRowOnChange?: boolean;
  };
  /** Enable vertical virtual scroll with fixed row height */
  virtual?: boolean;
  /** Fixed row height used by virtual scroll */
  virtualItemHeight?: number;
  /** Enable column resize for all numeric-width columns */
  resizable?: boolean;
  /** Enable row height drag resize (not compatible with virtual) */
  rowResizable?: boolean;
  /** Controlled row heights map, keyed by rowKey */
  rowHeights?: Record<string, number>;
  /** Minimum row height when rowResizable */
  minRowHeight?: number;
  /** Table layout: vertical = transposed field/record view */
  layout?: 'horizontal' | 'vertical';
  onResizeRow?: (height: number, record: DefaultRecordType, index: number) => void;
  /** Enable column drag reorder */
  columnDraggable?: boolean;
  /** Enable row drag reorder (not compatible with virtual) */
  rowDraggable?: boolean;
  sortDirections?: SortOrder[];
  showSorterTooltip?: boolean | TooltipProps;
}

export const tableProps = () => {
  return {
    prefixCls: stringType<string>(),
    columns: arrayType<ColumnsType>(),
    rowKey: someType<TableProps['rowKey']>([String, Function]),
    tableLayout: stringType<TableProps['tableLayout']>(),
    rowClassName: someType<TableProps['rowClassName']>([String, Function]),
    title: functionType<TableProps['title']>(),
    footer: functionType<TableProps['footer']>(),
    id: stringType<TableProps['id']>(),
    showHeader: booleanType(),
    components: objectType<TableProps['components']>(),
    customRow: functionType<TableProps['customRow']>(),
    customHeaderRow: functionType<TableProps['customHeaderRow']>(),
    direction: stringType<TableProps['direction']>(),
    expandFixed: someType<TableProps['expandFixed']>([Boolean, String]),
    expandColumnWidth: Number,
    expandedRowKeys: arrayType<TableProps['expandedRowKeys']>(),
    defaultExpandedRowKeys: arrayType<TableProps['defaultExpandedRowKeys']>(),
    expandedRowRender: functionType<TableProps['expandedRowRender']>(),
    expandRowByClick: booleanType(),
    expandIcon: functionType<TableProps['expandIcon']>(),
    onExpand: functionType<TableProps['onExpand']>(),
    onExpandedRowsChange: functionType<TableProps['onExpandedRowsChange']>(),
    'onUpdate:expandedRowKeys': functionType<TableProps['onExpandedRowsChange']>(),
    defaultExpandAllRows: booleanType(),
    indentSize: Number,
    /** @deprecated Please use `EXPAND_COLUMN` in `columns` directly */
    expandIconColumnIndex: Number,
    showExpandColumn: booleanType(),
    expandedRowClassName: functionType<TableProps['expandedRowClassName']>(),
    childrenColumnName: stringType<TableProps['childrenColumnName']>(),
    rowExpandable: functionType<TableProps['rowExpandable']>(),
    sticky: someType<TableProps['sticky']>([Boolean, Object]),

    dropdownPrefixCls: String,
    dataSource: arrayType<RcTableProps['data']>(),
    pagination: someType<false | TablePaginationConfig>([Boolean, Object]),
    loading: someType<boolean | SpinProps>([Boolean, Object]),
    size: stringType<SizeType>(),
    bordered: booleanType(),
    locale: objectType<TableLocale>(),

    onChange:
      functionType<
        (
          pagination: TablePaginationConfig,
          filters: Record<string, FilterValue | null>,
          sorter: SorterResult | SorterResult[],
          extra: TableCurrentDataSource,
        ) => void
      >(),
    onResizeColumn: functionType<(w: number, col: ColumnType) => void>(),
    rowSelection: objectType<TableRowSelection>(),
    getPopupContainer: functionType<GetPopupContainer>(),
    scroll: objectType<
      RcTableProps['scroll'] & {
        scrollToFirstRowOnChange?: boolean;
      }
    >(),
    virtual: booleanType(),
    virtualItemHeight: Number,
    resizable: booleanType(),
    rowResizable: booleanType(),
    rowHeights: objectType<Record<string, number>>(),
    minRowHeight: Number,
    layout: stringType<'horizontal' | 'vertical'>(),
    onResizeRow: functionType<(height: number, record: DefaultRecordType, index: number) => void>(),
    columnDraggable: booleanType(),
    rowDraggable: booleanType(),
    sortDirections: arrayType<SortOrder[]>(),
    showSorterTooltip: someType<boolean | TooltipProps>([Boolean, Object], true),
    transformCellText: functionType<TableProps['transformCellText']>(),
  };
};

const InternalTable = defineComponent({
  name: 'InternalTable',
  inheritAttrs: false,
  props: initDefaultProps(
    {
      ...tableProps(),
      contextSlots: objectType<ContextSlots>(),
    },
    {
      rowKey: 'key',
    },
  ),
  setup(props, { attrs, slots, expose, emit }) {
    devWarning(
      !(typeof props.rowKey === 'function' && props.rowKey.length > 1),
      'Table',
      '`index` parameter of `rowKey` function is deprecated. There is no guarantee that it will work as expected.',
    );

    useProvideSlots(computed(() => props.contextSlots));
    const screens = useBreakpoint();

    const mergedColumns = computed(() => {
      const matched = new Set(
        Object.keys(screens.value).filter((m: Breakpoint) => screens.value[m]),
      );
      return props.columns.filter(
        (c: ColumnType<DefaultRecordType>) =>
          !c.responsive || c.responsive.some((r: Breakpoint) => matched.has(r)),
      );
    });

    const {
      size: mergedSize,
      renderEmpty,
      direction,
      prefixCls,
      configProvider,
    } = useConfigInject('table', props);

    // Style
    const [wrapSSR, hashId] = useStyle(prefixCls);

    const transformCellText = computed(
      () => props.transformCellText || configProvider.transformCellText?.value,
    );
    const [tableLocale] = useLocaleReceiver('Table', defaultLocale.Table, toRef(props, 'locale'));
    const rawData = computed(() => props.dataSource || EMPTY_LIST);

    const dropdownPrefixCls = computed(() =>
      configProvider.getPrefixCls('dropdown', props.dropdownPrefixCls),
    );

    const childrenColumnName = computed(() => props.childrenColumnName || 'children');

    const expandType = computed<ExpandType>(() => {
      if (rawData.value.some(item => (item as any)?.[childrenColumnName.value])) {
        return 'nest';
      }

      if (props.expandedRowRender) {
        return 'row';
      }

      return null;
    });

    const internalRefs = reactive({
      body: null,
    });

    const updateInternalRefs = refs => {
      Object.assign(internalRefs, refs);
    };

    // ============================ RowKey ============================
    const getRowKey = computed<GetRowKey<DefaultRecordType>>(() => {
      if (typeof props.rowKey === 'function') {
        return props.rowKey;
      }

      return record => (record as any)?.[props.rowKey as string];
    });

    const isVerticalLayout = computed(() => props.layout === 'vertical');
    const effectiveRowResizable = computed(
      () => !!props.rowResizable && !props.virtual && !isVerticalLayout.value,
    );
    const verticalColumnWidths = reactive<Record<string, number>>({});

    const [getRecordByKey] = useLazyKVMap(rawData, childrenColumnName, getRowKey);

    // ============================ Events =============================
    const changeEventInfo: Partial<ChangeEventInfo> = {};

    const triggerOnChange = (
      info: Partial<ChangeEventInfo>,
      action: TableAction,
      reset = false,
    ) => {
      const { pagination, scroll, onChange } = props;
      const changeInfo = {
        ...changeEventInfo,
        ...info,
      };

      if (reset) {
        changeEventInfo.resetPagination!();

        // Reset event param
        if (changeInfo.pagination!.current) {
          changeInfo.pagination!.current = 1;
        }

        // Trigger pagination events
        if (pagination && pagination.onChange) {
          pagination.onChange(1, changeInfo.pagination!.pageSize);
        }
      }

      if (scroll && scroll.scrollToFirstRowOnChange !== false && internalRefs.body) {
        scrollTo(0, {
          getContainer: () => internalRefs.body,
        });
      }

      onChange?.(changeInfo.pagination!, changeInfo.filters!, changeInfo.sorter!, {
        currentDataSource: getFilterData(
          getSortData(rawData.value, changeInfo.sorterStates!, childrenColumnName.value),
          changeInfo.filterStates!,
        ),
        action,
      });
    };

    /**
     * Controlled state in `columns` is not a good idea that makes too many code (1000+ line?) to read
     * state out and then put it back to title render. Move these code into `hooks` but still too
     * complex. We should provides Table props like `sorter` & `filter` to handle control in next big version.
     */

    // ============================ Sorter =============================
    const onSorterChange = (sorter: SorterResult | SorterResult[], sorterStates: SortState[]) => {
      triggerOnChange(
        {
          sorter,
          sorterStates,
        },
        'sort',
        false,
      );
    };

    const [transformSorterColumns, sortStates, sorterTitleProps, sorters] = useSorter({
      prefixCls,
      mergedColumns,
      onSorterChange,
      sortDirections: computed(() => props.sortDirections || ['ascend', 'descend']),
      tableLocale,
      showSorterTooltip: toRef(props, 'showSorterTooltip'),
    });
    const sortedData = computed(() =>
      getSortData(rawData.value, sortStates.value, childrenColumnName.value),
    );

    // ============================ Filter ============================
    const onFilterChange = (filters: Record<string, FilterValue>, filterStates: FilterState[]) => {
      triggerOnChange(
        {
          filters,
          filterStates,
        },
        'filter',
        true,
      );
    };

    const [transformFilterColumns, filterStates, filters] = useFilter({
      prefixCls,
      locale: tableLocale,
      dropdownPrefixCls,
      mergedColumns,
      onFilterChange,
      getPopupContainer: toRef(props, 'getPopupContainer'),
    });
    const mergedData = computed(() => getFilterData(sortedData.value, filterStates.value));
    // ============================ Column ============================

    const [transformBasicColumns] = useColumns(toRef(props, 'contextSlots'));

    const columnTitleProps = computed(() => {
      const mergedFilters: Record<string, FilterValue> = {};
      const filtersValue = filters.value;
      Object.keys(filtersValue).forEach(filterKey => {
        if (filtersValue[filterKey] !== null) {
          mergedFilters[filterKey] = filtersValue[filterKey]!;
        }
      });
      return {
        ...sorterTitleProps.value,
        filters: mergedFilters,
      };
    });
    const [transformTitleColumns] = useTitleColumns(columnTitleProps);

    // ========================== Pagination ==========================
    const onPaginationChange = (current: number, pageSize: number) => {
      triggerOnChange(
        {
          pagination: { ...changeEventInfo.pagination, current, pageSize },
        },
        'paginate',
      );
    };

    const [mergedPagination, resetPagination] = usePagination(
      computed(() => mergedData.value.length),
      toRef(props, 'pagination'),
      onPaginationChange,
    );

    watchEffect(() => {
      changeEventInfo.sorter = sorters.value;
      changeEventInfo.sorterStates = sortStates.value;

      changeEventInfo.filters = filters.value;
      changeEventInfo.filterStates = filterStates.value;
      changeEventInfo.pagination =
        props.pagination === false
          ? {}
          : getPaginationParam(mergedPagination.value, props.pagination);

      changeEventInfo.resetPagination = resetPagination;
    });

    // ============================= Data =============================
    const pageData = computed(() => {
      if (props.pagination === false || !mergedPagination.value.pageSize) {
        return mergedData.value;
      }

      const { current = 1, total, pageSize = DEFAULT_PAGE_SIZE } = mergedPagination.value;
      devWarning(current > 0, 'Table', '`current` should be positive number.');

      // Dynamic table data
      if (mergedData.value.length < total!) {
        if (mergedData.value.length > pageSize) {
          return mergedData.value.slice((current - 1) * pageSize, current * pageSize);
        }
        return mergedData.value;
      }

      return mergedData.value.slice((current - 1) * pageSize, current * pageSize);
    });

    const transposed = useTranspose(isVerticalLayout, mergedColumns, pageData, getRowKey, {
      prefixCls,
      fieldColumnWidth: 120,
      recordColumnWidth: 160,
      columnWidths: computed(() => verticalColumnWidths),
    });

    const renderColumns = computed(() =>
      isVerticalLayout.value ? transposed.value.columns : mergedColumns.value,
    );

    const renderData = computed(() =>
      isVerticalLayout.value ? transposed.value.dataSource : pageData.value,
    );

    const hasGroupedColumns = computed(() => hasGroupColumns(mergedColumns.value as any[]));
    const effectiveColumnDraggable = computed(
      () => !!props.columnDraggable && !hasGroupedColumns.value,
    );
    const effectiveRowDraggable = computed(() => !!props.rowDraggable && !props.virtual);

    const getUserColumnKey = (column: ColumnType, index: number) =>
      getColumnKey(column, `col-${index}`);

    const emitDragColumn = (
      fromIndex: number,
      toIndex: number,
      column: ColumnType,
      columns: ColumnsType,
    ) => {
      emit('dragColumn', { fromIndex, toIndex, column, columns });
    };

    const emitDragRow = (
      fromIndex: number,
      toIndex: number,
      record: DefaultRecordType,
      dataSource: DefaultRecordType[],
    ) => {
      emit('dragRow', { fromIndex, toIndex, record, dataSource });
    };

    const onDragColumnSort = (
      fromKey: string | number,
      toKey: string | number,
      place: DragPlace,
    ) => {
      if (!effectiveColumnDraggable.value && !isVerticalLayout.value) {
        return;
      }
      // Vertical: dragging record columns => reorder dataSource (dragRow)
      if (isVerticalLayout.value) {
        if (!effectiveRowDraggable.value && !props.rowDraggable) {
          // still allow when rowDraggable or columnDraggable — vertical record drag maps to rows
        }
        if (!props.columnDraggable && !props.rowDraggable) {
          return;
        }
        const result = reorderByKeys(
          pageData.value.slice(),
          fromKey,
          toKey,
          place,
          (record, index) => getRowKey.value(record, index),
        );
        if (!result) {
          return;
        }
        emitDragRow(result.fromIndex, result.toIndex, result.item, result.list);
        return;
      }

      if (!effectiveColumnDraggable.value) {
        return;
      }
      const cols = mergedColumns.value.slice() as ColumnType[];
      const result = reorderByKeys(cols, fromKey, toKey, place, (column, index) =>
        getUserColumnKey(column, index),
      );
      if (!result) {
        return;
      }
      emitDragColumn(result.fromIndex, result.toIndex, result.item, result.list);
    };

    const onDragRowSort = (fromKey: string | number, toKey: string | number, place: DragPlace) => {
      // Vertical: dragging field rows => reorder columns (dragColumn)
      if (isVerticalLayout.value) {
        if (!props.columnDraggable && !props.rowDraggable) {
          return;
        }
        const cols = mergedColumns.value.slice() as ColumnType[];
        const result = reorderByKeys(cols, fromKey, toKey, place, (column, index) =>
          getUserColumnKey(column, index),
        );
        if (!result) {
          return;
        }
        emitDragColumn(result.fromIndex, result.toIndex, result.item, result.list);
        return;
      }

      if (!effectiveRowDraggable.value) {
        return;
      }

      if (expandType.value === 'nest') {
        const fromInfo = findSiblingInfo(
          rawData.value as DefaultRecordType[],
          fromKey,
          getRowKey.value,
          childrenColumnName.value,
        );
        const toInfo = findSiblingInfo(
          rawData.value as DefaultRecordType[],
          toKey,
          getRowKey.value,
          childrenColumnName.value,
        );
        const next = reorderTreeSiblings(
          rawData.value as DefaultRecordType[],
          fromKey,
          toKey,
          getRowKey.value,
          childrenColumnName.value,
          place,
        );
        if (!next || !fromInfo || !toInfo) {
          return;
        }
        let targetIndex = toInfo.index + (place === 'after' ? 1 : 0);
        if (fromInfo.index < targetIndex) {
          targetIndex -= 1;
        }
        emitDragRow(fromInfo.index, targetIndex, fromInfo.siblings[fromInfo.index], next);
        return;
      }

      const result = reorderByKeys(
        (rawData.value as DefaultRecordType[]).slice(),
        fromKey,
        toKey,
        place,
        (record, index) => getRowKey.value(record, index),
      );
      if (!result) {
        return;
      }
      emitDragRow(result.fromIndex, result.toIndex, result.item, result.list);
    };

    const canDropRow = (fromKey: string | number, toKey: string | number) => {
      if (isVerticalLayout.value) {
        return true;
      }
      if (expandType.value !== 'nest') {
        return true;
      }
      return areSiblingKeys(
        rawData.value as DefaultRecordType[],
        fromKey,
        toKey,
        getRowKey.value,
        childrenColumnName.value,
      );
    };

    useProvideTableContext({
      onResizeColumn: (w, col) => {
        if (isVerticalLayout.value && col?.key != null) {
          verticalColumnWidths[String(col.key)] = w;
        }
        emit('resizeColumn', w, col);
      },
      onResizeRow: (height, record, index) => {
        emit('resizeRow', height, record, index);
      },
      onDragColumnSort,
      onDragRowSort,
      canDropRow,
      get resizable() {
        return !!props.resizable;
      },
      get rowResizable() {
        return effectiveRowResizable.value;
      },
      get rowHeights() {
        return props.rowHeights || {};
      },
      get minRowHeight() {
        return props.minRowHeight ?? 39;
      },
      get columnDraggable() {
        // Vertical: column headers are record columns — enable when either drag flag is on
        if (isVerticalLayout.value) {
          return !!(props.columnDraggable || props.rowDraggable);
        }
        return effectiveColumnDraggable.value;
      },
      get rowDraggable() {
        if (isVerticalLayout.value) {
          return !!(props.columnDraggable || props.rowDraggable);
        }
        return effectiveRowDraggable.value;
      },
    });

    watchEffect(
      () => {
        nextTick(() => {
          const { total, pageSize = DEFAULT_PAGE_SIZE } = mergedPagination.value;
          // Dynamic table data
          if (mergedData.value.length < total!) {
            if (mergedData.value.length > pageSize) {
              devWarning(
                false,
                'Table',
                '`dataSource` length is less than `pagination.total` but large than `pagination.pageSize`. Please make sure your config correct data with async mode.',
              );
            }
          }
        });
      },
      { flush: 'post' },
    );

    const expandIconColumnIndex = computed(() => {
      if (props.showExpandColumn === false) return -1;
      // Adjust expand icon index, no overwrite expandIconColumnIndex if set.
      if (expandType.value === 'nest' && props.expandIconColumnIndex === undefined) {
        return props.rowSelection ? 1 : 0;
      } else if (props.expandIconColumnIndex! > 0 && props.rowSelection) {
        return props.expandIconColumnIndex - 1;
      }
      return props.expandIconColumnIndex;
    });
    const rowSelection = ref();
    watch(
      () => props.rowSelection,
      () => {
        rowSelection.value = props.rowSelection ? { ...props.rowSelection } : props.rowSelection;
      },
      { deep: true, immediate: true },
    );
    // ========================== Selections ==========================
    const [transformSelectionColumns, selectedKeySet] = useSelection(rowSelection, {
      prefixCls,
      data: mergedData,
      pageData,
      getRowKey,
      getRecordByKey,
      expandType,
      childrenColumnName,
      locale: tableLocale,
      getPopupContainer: computed(() => props.getPopupContainer),
    });

    const internalRowClassName = (record: any, index: number, indent: number) => {
      let mergedRowClassName;
      const { rowClassName } = props;
      if (typeof rowClassName === 'function') {
        mergedRowClassName = classNames(rowClassName(record, index, indent));
      } else {
        mergedRowClassName = classNames(rowClassName);
      }

      return classNames(
        {
          [`${prefixCls.value}-row-selected`]: selectedKeySet.value.has(
            getRowKey.value(record, index),
          ),
        },
        mergedRowClassName,
      );
    };
    expose({
      selectedKeySet,
    });

    const indentSize = computed(() => {
      // Indent size
      return typeof props.indentSize === 'number' ? props.indentSize : 15;
    });

    const transformColumns = (innerColumns: ColumnsType<any>): ColumnsType<any> => {
      const res = transformTitleColumns(
        transformSelectionColumns(
          transformFilterColumns(transformSorterColumns(transformBasicColumns(innerColumns))),
        ),
      );
      return res;
    };

    return () => {
      const {
        expandIcon = slots.expandIcon || renderExpandIcon(tableLocale.value),
        pagination,
        loading,
        bordered,
      } = props;

      let topPaginationNode;
      let bottomPaginationNode;
      if (pagination !== false && mergedPagination.value?.total) {
        let paginationSize: TablePaginationConfig['size'];
        if (mergedPagination.value.size) {
          paginationSize = mergedPagination.value.size;
        } else {
          paginationSize =
            mergedSize.value === 'small' || mergedSize.value === 'middle' ? 'small' : undefined;
        }

        const renderPagination = (position: string) => (
          <Pagination
            {...mergedPagination.value}
            class={[
              `${prefixCls.value}-pagination ${prefixCls.value}-pagination-${position}`,
              mergedPagination.value.class,
            ]}
            size={paginationSize}
          />
        );
        const defaultPosition = direction.value === 'rtl' ? 'left' : 'right';
        const { position } = mergedPagination.value;
        if (position !== null && Array.isArray(position)) {
          const topPos = position.find(p => p.includes('top'));
          const bottomPos = position.find(p => p.includes('bottom'));
          const isDisable = position.every(p => `${p}` === 'none');
          if (!topPos && !bottomPos && !isDisable) {
            bottomPaginationNode = renderPagination(defaultPosition);
          }
          if (topPos) {
            topPaginationNode = renderPagination(topPos!.toLowerCase().replace('top', ''));
          }
          if (bottomPos) {
            bottomPaginationNode = renderPagination(bottomPos!.toLowerCase().replace('bottom', ''));
          }
        } else {
          bottomPaginationNode = renderPagination(defaultPosition);
        }
      }

      // >>>>>>>>> Spinning
      let spinProps: SpinProps | undefined;
      if (typeof loading === 'boolean') {
        spinProps = {
          spinning: loading,
        };
      } else if (typeof loading === 'object') {
        spinProps = {
          spinning: true,
          ...loading,
        };
      }

      const isAutoHeight = props.scroll?.y === 'auto';
      const mergedVirtualItemHeight =
        props.virtualItemHeight ??
        (mergedSize.value === 'small' ? 39 : mergedSize.value === 'middle' ? 47 : 54);

      if (process.env.NODE_ENV !== 'production') {
        if (props.virtual) {
          devWarning(
            mergedColumns.value.every(col => !(col as ColumnType).fixed),
            'Table',
            '`virtual` does not support fixed columns currently.',
          );
        }
        if (props.virtual && props.rowResizable) {
          devWarning(false, 'Table', '`rowResizable` is ignored when `virtual` is enabled.');
        }
        if (props.virtual && props.rowDraggable) {
          devWarning(false, 'Table', '`rowDraggable` is ignored when `virtual` is enabled.');
        }
        if (props.columnDraggable && hasGroupedColumns.value) {
          devWarning(
            false,
            'Table',
            '`columnDraggable` does not support grouped columns (`column.children`).',
          );
        }
        if (isVerticalLayout.value) {
          devWarning(!props.virtual, 'Table', '`layout="vertical"` does not support `virtual`.');
          devWarning(
            !props.rowSelection,
            'Table',
            '`layout="vertical"` does not support `rowSelection`.',
          );
          devWarning(
            !props.expandedRowRender,
            'Table',
            '`layout="vertical"` does not support `expandedRowRender`.',
          );
          devWarning(
            !props.rowResizable,
            'Table',
            '`layout="vertical"` does not support `rowResizable`.',
          );
          devWarning(
            expandType.value !== 'nest',
            'Table',
            '`layout="vertical"` does not support tree data.',
          );
        }
      }

      const wrapperClassNames = classNames(
        `${prefixCls.value}-wrapper`,
        {
          [`${prefixCls.value}-wrapper-rtl`]: direction.value === 'rtl',
          [`${prefixCls.value}-wrapper-auto-height`]: isAutoHeight,
          [`${prefixCls.value}-wrapper-vertical`]: isVerticalLayout.value,
          [`${prefixCls.value}-wrapper-resizable`]: !!props.resizable || isVerticalLayout.value,
          [`${prefixCls.value}-wrapper-row-resizable`]: effectiveRowResizable.value,
        },
        attrs.class,
        hashId.value,
      );
      const tableProps = omit(props, [
        'columns',
        'resizable',
        'rowResizable',
        'rowHeights',
        'minRowHeight',
        'layout',
        'onResizeRow',
        'columnDraggable',
        'rowDraggable',
      ]);
      // Prefer fixed layout for resizable / vertical so column widths stay predictable
      const mergedTableLayout =
        props.tableLayout ||
        (props.resizable || isVerticalLayout.value ? 'fixed' : props.tableLayout);
      // max-content keeps table width = sum(columns), so drag delta maps 1:1 to column width
      const mergedScroll =
        props.resizable || isVerticalLayout.value
          ? { ...(props.scroll || {}), x: 'max-content' as const }
          : props.scroll;
      return wrapSSR(
        <div
          class={wrapperClassNames}
          style={[
            attrs.style as CSSProperties,
            isAutoHeight
              ? ({ height: '100%', display: 'flex', flexDirection: 'column' } as CSSProperties)
              : null,
          ]}
        >
          <Spin spinning={false} {...spinProps}>
            {topPaginationNode}
            <RcTable
              {...attrs}
              {...tableProps}
              tableLayout={mergedTableLayout}
              scroll={mergedScroll}
              expandedRowKeys={isVerticalLayout.value ? undefined : (props.expandedRowKeys as any)}
              defaultExpandedRowKeys={
                isVerticalLayout.value ? undefined : (props.defaultExpandedRowKeys as any)
              }
              expandIconColumnIndex={isVerticalLayout.value ? -1 : expandIconColumnIndex.value}
              indentSize={indentSize.value}
              expandIcon={expandIcon}
              columns={renderColumns.value}
              direction={direction.value}
              prefixCls={prefixCls.value}
              virtual={isVerticalLayout.value ? false : props.virtual}
              virtualItemHeight={mergedVirtualItemHeight}
              class={classNames({
                [`${prefixCls.value}-middle`]: mergedSize.value === 'middle',
                [`${prefixCls.value}-small`]: mergedSize.value === 'small',
                [`${prefixCls.value}-bordered`]: bordered,
                [`${prefixCls.value}-empty`]: renderData.value.length === 0,
                [`${prefixCls.value}-vertical-layout`]: isVerticalLayout.value,
              })}
              data={renderData.value}
              rowKey={isVerticalLayout.value ? 'key' : getRowKey.value}
              rowClassName={isVerticalLayout.value ? undefined : internalRowClassName}
              // Internal
              internalHooks={INTERNAL_HOOKS}
              internalRefs={internalRefs}
              onUpdateInternalRefs={updateInternalRefs}
              transformColumns={isVerticalLayout.value ? undefined : transformColumns}
              transformCellText={transformCellText.value}
              v-slots={{
                ...slots,
                emptyText: () =>
                  slots.emptyText?.() || props.locale?.emptyText || renderEmpty('Table'),
              }}
            />
            {bottomPaginationNode}
          </Spin>
        </div>,
      );
    };
  },
});

const Table = defineComponent({
  name: 'XyTable',
  inheritAttrs: false,
  props: initDefaultProps(tableProps(), {
    rowKey: 'key',
  }),
  slots: Object as CustomSlotsType<{
    emptyText?: any;
    expandIcon?: RenderExpandIconProps<any>;
    title?: any;
    footer?: any;
    summary?: any;
    expandedRowRender?: any;
    expandColumnTitle?: any;
    bodyCell?: (props: {
      text: any;
      value: any;
      record: Record<string, any>;
      index: number;
      column: ColumnType;
    }) => void;
    headerCell?: (props: { title: any; column: ColumnType }) => void;
    customFilterIcon?: any;
    customFilterDropdown?: any;
    default: any;
  }>,
  setup(props, { attrs, slots, expose }) {
    const table = ref();
    expose({
      table,
    });
    return () => {
      const columns = props.columns || convertChildrenToColumns(slots.default?.());
      return (
        <InternalTable
          ref={table}
          {...attrs}
          {...props}
          columns={columns || []}
          expandedRowRender={slots.expandedRowRender || props.expandedRowRender}
          contextSlots={{ ...slots }} // use new object, 否则slot热更新失效，原因需进一步探究
          v-slots={slots}
        />
      );
    };
  },
});

export default Table;
