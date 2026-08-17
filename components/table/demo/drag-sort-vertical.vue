<docs>
---
order: 0.32
title:
  zh-CN: 竖表拖拽排序
  en-US: Vertical Drag Sort
---

## zh-CN

`layout="vertical"` 时：拖动记录列表头调整 **dataSource** 顺序；拖动字段行调整 **columns** 顺序。左侧字段名列不可拖。仍通过 `@dragColumn` / `@dragRow` 写回。

## en-US

With `layout="vertical"`: drag record column headers to reorder **dataSource**; drag field rows to reorder **columns**. The left field column is locked. Still write back via `@dragColumn` / `@dragRow`.

</docs>

<template>
  <xy-table
    layout="vertical"
    bordered
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
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
  { title: 'Tags', dataIndex: 'tags', key: 'tags' },
]);

const data = ref([
  {
    key: 'User-1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: 'nice',
  },
  {
    key: 'User-2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: 'cool',
  },
  {
    key: 'User-3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: 'teacher',
  },
]);

function onDragColumn({ columns: next }) {
  columns.value = next;
}

function onDragRow({ dataSource: next }) {
  data.value = next;
}
</script>
