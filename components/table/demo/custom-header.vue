<docs>
---
order: 1.5
title:
  zh-CN: 自定义表头
  en-US: Custom Header
---

## zh-CN

通过 `#headerCell` 自定义列头内容，通过 `customHeaderCell` 设置列头单元格属性（样式、事件等）。表格上方标题区可使用 `#title`。

## en-US

Customize column header content with `#headerCell`, and set header cell attributes (style, events, etc.) via `customHeaderCell`. Use `#title` for the table title area above the header.

</docs>

<template>
  <a-table :columns="columns" :data-source="data" :pagination="false">
    <template #title>自定义表格标题</template>

    <template #headerCell="{ column, title }">
      <template v-if="column.key === 'name'">
        <span>
          <user-outlined style="margin-right: 4px" />
          {{ title }}
          <a-tooltip title="用户姓名">
            <info-circle-outlined style="margin-left: 4px; color: rgba(0, 0, 0, 0.45)" />
          </a-tooltip>
        </span>
      </template>
      <template v-else-if="column.key === 'age'">
        <span style="color: #1677ff; font-weight: 600">{{ title }}</span>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <setting-outlined style="margin-right: 4px" />
          {{ title }}
        </span>
      </template>
      <template v-else>{{ title }}</template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <a>{{ record.name }}</a>
      </template>
      <template v-else-if="column.key === 'action'">
        <a>Edit</a>
      </template>
    </template>
  </a-table>
</template>
<script lang="ts" setup>
import { UserOutlined, InfoCircleOutlined, SettingOutlined } from '@ant-design/icons-vue';
import type { TableColumnType } from 'ant-design-vue';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

const columns: TableColumnType<DataType>[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    customHeaderCell: () => ({
      style: { background: '#e6f4ff' },
    }),
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    customHeaderCell: () => ({
      style: { background: '#f6ffed' },
    }),
  },
  {
    title: 'Action',
    key: 'action',
  },
];

const data: DataType[] = [
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
</script>
