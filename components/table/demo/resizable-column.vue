<docs>
---
order: 0
title:
  en-US: Resizable column
  zh-CN: 可伸缩列
---

## zh-CN

设置表级 `resizable` 后，所有带数字 `width` 的列可拖拽调宽；也可在列上单独设置 `resizable`。列级 `resizable: false` 可关闭。

鼠标 hover 到列分割线上拖拽体验。

## en-US

Set table-level `resizable` to enable drag resize for all columns with numeric `width`. Per-column `resizable` still works; set `resizable: false` to opt out.

Hover the column border and drag to resize.
</docs>

<template>
  <a-table resizable :columns="columns" :data-source="data" @resizeColumn="handleResizeColumn">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <span>
          <smile-outlined />
          Name
        </span>
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <a>
          {{ record.name }}
        </a>
      </template>
      <template v-else-if="column.key === 'tags'">
        <span>
          <a-tag
            v-for="tag in record.tags"
            :key="tag"
            :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
          >
            {{ tag.toUpperCase() }}
          </a-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a>Invite 一 {{ record.name }}</a>
          <a-divider type="vertical" />
          <a>Delete</a>
        </span>
      </template>
    </template>
  </a-table>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { SmileOutlined } from '@ant-design/icons-vue';
import type { TableColumnsType } from 'ant-design-vue';

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const columns = ref<TableColumnsType>([
  {
    dataIndex: 'name',
    key: 'name',
    width: 150,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: 100,
    minWidth: 100,
    maxWidth: 200,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    width: 200,
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    width: 180,
    resizable: false,
  },
  {
    title: 'Action',
    key: 'action',
    width: 160,
  },
]);
function handleResizeColumn(w, col) {
  col.width = w;
}
</script>
