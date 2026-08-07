import type { ComputedRef, InjectionKey } from 'vue';
import { computed, inject, provide } from 'vue';
import type { ColumnType, Key } from './interface';

export type ContextSlots = {
  emptyText?: (...args: any[]) => any;
  expandIcon?: (...args: any[]) => any;
  title?: (...args: any[]) => any;
  footer?: (...args: any[]) => any;
  summary?: (...args: any[]) => any;
  bodyCell?: (...args: any[]) => any;
  expandColumnTitle?: (...args: any[]) => any;
  headerCell?: (...args: any[]) => any;
  customFilterIcon?: (...args: any[]) => any;
  customFilterDropdown?: (...args: any[]) => any;
  // 兼容 2.x 的 columns slots 配置
  [key: string]: ((...args: any[]) => any) | undefined;
};

type SlotsContextProps = ComputedRef<ContextSlots>;

const SlotsContextKey: InjectionKey<SlotsContextProps> = Symbol('SlotsContextProps');

export const useProvideSlots = (props: SlotsContextProps) => {
  provide(SlotsContextKey, props);
};

export const useInjectSlots = () => {
  return inject(SlotsContextKey, computed(() => ({})) as SlotsContextProps);
};

export type DragPlace = 'before' | 'after';

type ContextProps = {
  onResizeColumn: (w: number, column: ColumnType<any>) => void;
  onResizeRow?: (height: number, record: any, index: number, rowKey?: Key) => void;
  /** Physical column drag (header). Keys are rendered column keys. */
  onDragColumnSort?: (fromKey: Key, toKey: Key, place: DragPlace) => void;
  /** Physical row drag. Keys are rendered row keys. */
  onDragRowSort?: (fromKey: Key, toKey: Key, place: DragPlace) => void;
  /** Validate whether fromRow can drop onto toRow (tree sibling check). */
  canDropRow?: (fromKey: Key, toKey: Key) => boolean;
  /** Table-level column resize switch */
  resizable?: boolean;
  rowResizable?: boolean;
  rowHeights?: Record<string, number>;
  minRowHeight?: number;
  columnDraggable?: boolean;
  rowDraggable?: boolean;
};

const ContextKey: InjectionKey<ContextProps> = Symbol('ContextProps');

export const useProvideTableContext = (props: ContextProps) => {
  provide(ContextKey, props);
};

export const useInjectTableContext = () => {
  return inject(ContextKey, {
    onResizeColumn: () => {},
    onResizeRow: () => {},
    onDragColumnSort: () => {},
    onDragRowSort: () => {},
    canDropRow: () => true,
    resizable: false,
    rowResizable: false,
    rowHeights: {},
    minRowHeight: 39,
    columnDraggable: false,
    rowDraggable: false,
  } as ContextProps);
};
