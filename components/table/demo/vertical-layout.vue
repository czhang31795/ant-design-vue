<docs>
---
order: 0.2
title:
  zh-CN: 纵向表格
  en-US: Vertical Layout
---

## zh-CN

设置 `layout="vertical"` 将表格转置：左侧为字段名，每一列对应一条记录。可配合 `resizable` 拖拽记录列宽。

当前不支持 `virtual`、树形数据、`rowSelection`、`rowResizable`、`expandedRowRender`。

## en-US

Set `layout="vertical"` to transpose the table: field names on the left, each column is one record. Combine with `resizable` to drag record column widths.

Not supported yet: `virtual`, tree data, `rowSelection`, `rowResizable`, `expandedRowRender`.

</docs>

<template>
  <xy-table
    layout="vertical"
    bordered
    resizable
    table-layout="fixed"
    :columns="columns"
    :data-source="data"
    :pagination="false"
    :scroll="{ x: true }"
  />
</template>
<script lang="ts" setup>
import type { TableColumnsType } from 'ant-design-vue';

const columns: TableColumnsType = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
  { title: 'Tags', dataIndex: 'tags', key: 'tags' },
];

const data = [
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
];
</script>
