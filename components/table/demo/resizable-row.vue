<docs>
---
order: 0.1
title:
  zh-CN: 可调节行高
  en-US: Resizable Row
---

## zh-CN

设置 `rowResizable` 后可拖拽行底边调节行高，通过受控的 `rowHeights` 保存高度。与 `virtual` 互斥。

## en-US

Enable `rowResizable` to drag the bottom edge of a row to change its height. Persist heights with controlled `rowHeights`. Not compatible with `virtual`.

</docs>

<template>
  <a-table
    row-resizable
    :min-row-height="40"
    :row-heights="rowHeights"
    :columns="columns"
    :data-source="data"
    :pagination="false"
    @resizeRow="handleResizeRow"
  />
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import type { TableColumnsType } from 'ant-design-vue';

const columns: TableColumnsType = [
  { title: 'Name', dataIndex: 'name', key: 'name', width: 160 },
  { title: 'Age', dataIndex: 'age', key: 'age', width: 100 },
  { title: 'Address', dataIndex: 'address', key: 'address' },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];

const rowHeights = reactive<Record<string, number>>({});

function handleResizeRow(height: number, _record: any, _index: number) {
  const key = String(_record.key);
  rowHeights[key] = height;
}
</script>
