import type { Key } from '../interface';
import type { DefaultRecordType, GetRowKey } from '../../vc-table/interface';

export function reorderList<T>(list: T[], fromIndex: number, toIndex: number): T[] {
  if (
    fromIndex === toIndex ||
    fromIndex < 0 ||
    toIndex < 0 ||
    fromIndex >= list.length ||
    toIndex >= list.length
  ) {
    return list.slice();
  }
  const next = list.slice();
  const [item] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, item);
  return next;
}

/** Move item so it ends at toIndex (after removal, indices adjust). */
export function moveItem<T>(list: T[], fromIndex: number, toIndex: number): T[] {
  if (fromIndex === toIndex || fromIndex < 0 || fromIndex >= list.length) {
    return list.slice();
  }
  const next = list.slice();
  const [item] = next.splice(fromIndex, 1);
  let insertAt = toIndex;
  if (fromIndex < toIndex) {
    insertAt = toIndex - 1;
  }
  insertAt = Math.max(0, Math.min(insertAt, next.length));
  next.splice(insertAt, 0, item);
  return next;
}

export interface SiblingInfo<RecordType = DefaultRecordType> {
  parent: RecordType | null;
  siblings: RecordType[];
  index: number;
  path: number[];
}

export function findSiblingInfo<RecordType extends DefaultRecordType>(
  data: RecordType[],
  targetKey: Key,
  getRowKey: GetRowKey<RecordType>,
  childrenColumnName: string,
): SiblingInfo<RecordType> | null {
  const walk = (
    nodes: RecordType[],
    parent: RecordType | null,
    path: number[],
  ): SiblingInfo<RecordType> | null => {
    for (let i = 0; i < nodes.length; i += 1) {
      const node = nodes[i];
      const key = getRowKey(node, i);
      if (String(key) === String(targetKey)) {
        return { parent, siblings: nodes, index: i, path: [...path, i] };
      }
      const children = node?.[childrenColumnName] as RecordType[] | undefined;
      if (Array.isArray(children) && children.length) {
        const found = walk(children, node, [...path, i]);
        if (found) {
          return found;
        }
      }
    }
    return null;
  };
  return walk(data, null, []);
}

function cloneTree<RecordType extends DefaultRecordType>(
  nodes: RecordType[],
  childrenColumnName: string,
): RecordType[] {
  return nodes.map(node => {
    const children = (node as any)?.[childrenColumnName] as RecordType[] | undefined;
    if (Array.isArray(children)) {
      return {
        ...(node as object),
        [childrenColumnName]: cloneTree(children, childrenColumnName),
      } as RecordType;
    }
    return { ...(node as object) } as RecordType;
  });
}

function sameParentPath(a: number[], b: number[]) {
  if (a.length !== b.length) {
    return false;
  }
  return a.every((value, index) => value === b[index]);
}

export function areSiblingKeys<RecordType extends DefaultRecordType>(
  data: RecordType[],
  fromKey: Key,
  toKey: Key,
  getRowKey: GetRowKey<RecordType>,
  childrenColumnName: string,
): boolean {
  const fromInfo = findSiblingInfo(data, fromKey, getRowKey, childrenColumnName);
  const toInfo = findSiblingInfo(data, toKey, getRowKey, childrenColumnName);
  if (!fromInfo || !toInfo) {
    return false;
  }
  return sameParentPath(fromInfo.path.slice(0, -1), toInfo.path.slice(0, -1));
}

/**
 * Reorder two nodes that share the same parent. Returns null if not siblings.
 */
export function reorderTreeSiblings<RecordType extends DefaultRecordType>(
  data: RecordType[],
  fromKey: Key,
  toKey: Key,
  getRowKey: GetRowKey<RecordType>,
  childrenColumnName: string,
  place: 'before' | 'after' = 'before',
): RecordType[] | null {
  const cloned = cloneTree(data, childrenColumnName);
  const fromInfo = findSiblingInfo(cloned, fromKey, getRowKey, childrenColumnName);
  const toInfo = findSiblingInfo(cloned, toKey, getRowKey, childrenColumnName);
  if (!fromInfo || !toInfo) {
    return null;
  }
  if (!sameParentPath(fromInfo.path.slice(0, -1), toInfo.path.slice(0, -1))) {
    return null;
  }
  if (fromInfo.index === toInfo.index) {
    return cloned;
  }

  let targetIndex = toInfo.index + (place === 'after' ? 1 : 0);
  if (fromInfo.index < targetIndex) {
    targetIndex -= 1;
  }

  // fromInfo.siblings is the live array inside the cloned tree
  const [item] = fromInfo.siblings.splice(fromInfo.index, 1);
  fromInfo.siblings.splice(targetIndex, 0, item);
  return cloned;
}

export function reorderByKeys<T>(
  list: T[],
  fromKey: Key,
  toKey: Key,
  place: 'before' | 'after',
  getKey: (item: T, index: number) => Key,
): { list: T[]; fromIndex: number; toIndex: number; item: T } | null {
  const fromIndex = list.findIndex(
    (item, index) => String(getKey(item, index)) === String(fromKey),
  );
  const toIndex = list.findIndex((item, index) => String(getKey(item, index)) === String(toKey));
  if (fromIndex < 0 || toIndex < 0) {
    return null;
  }
  let targetIndex = toIndex + (place === 'after' ? 1 : 0);
  if (fromIndex < targetIndex) {
    targetIndex -= 1;
  }
  const next = list.slice();
  const [item] = next.splice(fromIndex, 1);
  next.splice(targetIndex, 0, item);
  return { list: next, fromIndex, toIndex: targetIndex, item };
}

export function hasGroupColumns(columns: readonly any[]): boolean {
  return columns.some(col => col && typeof col === 'object' && Array.isArray(col.children));
}
