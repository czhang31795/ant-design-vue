<docs>
---
order: 0.31
title:
  zh-CN: 树形行拖拽排序
  en-US: Tree Drag Sort
---

## zh-CN

树形数据开启 `rowDraggable` 后，仅允许在**同一父节点下的同级**之间拖拽排序；跨父级无法放下。列拖拽与普通表相同。

## en-US

With tree data, `rowDraggable` only allows reordering among **siblings under the same parent**. Cross-parent drops are rejected. Column drag works like the flat table.

</docs>

<template>
  <a-table
    column-draggable
    row-draggable
    :columns="columns"
    :data-source="data"
    :pagination="false"
    default-expand-all-rows
    @drag-column="onDragColumn"
    @drag-row="onDragRow"
  />
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const columns = ref<any[]>([
  { title: 'Name', dataIndex: 'name', key: 'name', width: 220 },
  { title: 'Age', dataIndex: 'age', key: 'age', width: 100 },
  { title: 'Address', dataIndex: 'address', key: 'address' },
]);

const data = ref([
  {
    key: '1',
    name: 'John Brown sr.',
    age: 60,
    address: 'New York No. 1 Lake Park',
    children: [
      {
        key: '1-1',
        name: 'John Brown',
        age: 42,
        address: 'New York No. 2 Lake Park',
      },
      {
        key: '1-2',
        name: 'John Brown jr.',
        age: 30,
        address: 'New York No. 3 Lake Park',
        children: [
          {
            key: '1-2-1',
            name: 'Jimmy Brown',
            age: 16,
            address: 'New York No. 3 Lake Park',
          },
          {
            key: '1-2-2',
            name: 'Jimmy Green',
            age: 14,
            address: 'New York No. 4 Lake Park',
          },
        ],
      },
      {
        key: '1-3',
        name: 'Jim Green sr.',
        age: 44,
        address: 'London No. 1 Lake Park',
      },
    ],
  },
  {
    key: '2',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Jim Red',
    age: 28,
    address: 'London No. 2 Lake Park',
  },
]);

function onDragColumn({ columns: next }) {
  columns.value = next;
}

function onDragRow({ dataSource: next }) {
  data.value = next;
}
</script>
