<docs>
---
order: 12.1
title:
  zh-CN: 自动高度
  en-US: Auto Height
---

## zh-CN

设置 `scroll.y` 为 `auto` 时，表格体会自动填满父容器剩余高度。父容器需要有确定高度（或处于可计算高度的 flex 布局中）。

## en-US

Set `scroll.y` to `auto` so the table body fills the remaining height of its parent. The parent must have a definite height (or participate in a measurable flex layout).

</docs>

<template>
  <div style="height: 400px; display: flex; flex-direction: column">
    <a-table
      style="flex: 1; min-height: 0"
      :columns="columns"
      :data-source="data"
      :pagination="false"
      :scroll="{ y: 'auto', x: 800 }"
    />
  </div>
</template>
<script lang="ts" setup>
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    width: 150,
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const data = [...Array(50)].map((_, i) => ({
  key: i,
  name: `Edward King ${i}`,
  age: 32,
  address: `London, Park Lane no. ${i}`,
}));
</script>
