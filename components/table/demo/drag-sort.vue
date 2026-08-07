<docs>
---
order: 0.3
title:
  zh-CN: 行列拖拽排序
  en-US: Drag Sort
---

## zh-CN

开启 `columnDraggable` / `rowDraggable` 后，通过表头/行手柄拖拽调整顺序。请在 `@dragColumn` / `@dragRow` 中写回 `columns` / `dataSource`（受控）。

## en-US

Enable `columnDraggable` / `rowDraggable` and reorder via header/row grips. Write back `columns` / `dataSource` in `@dragColumn` / `@dragRow` (controlled).

</docs>

<template>
  <a-table
    column-draggable
    row-draggable
    :columns="columns"
    :data-source="data"
    :pagination="false"
    @drag-column="onDragColumn"
    @drag-row="onDragRow"
  />
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const columns = ref([
  { title: 'Name', dataIndex: 'name', key: 'name', width: 160 },
  { title: 'Age', dataIndex: 'age', key: 'age', width: 100 },
  { title: 'Address', dataIndex: 'address', key: 'address', width: 240 },
  { title: 'Tags', dataIndex: 'tags', key: 'tags', width: 160 },
]);

const data = ref([
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: 'nice',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: 'cool',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: 'teacher',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 28,
    address: 'London No. 2 Lake Park',
    tags: 'dev',
  },
]);

function onDragColumn({ columns: next }) {
  columns.value = next;
}

function onDragRow({ dataSource: next }) {
  data.value = next;
}
</script>
