<docs>
---
order: 12.2
title:
  zh-CN: 虚拟列表
  en-US: Virtual List
---

## zh-CN

通过 `virtual` 开启纵向虚拟滚动，适合大数据量场景。需要设置 `scroll.y`（可为数值或 `auto`），并建议为列设置 `width`。仅在需要横向滚动时再配置 `scroll.x`（注意：`scroll.x` 过小或等于列宽之和时，容易被纵向滚动条挤出横向滚动条）。当前版本暂不支持固定列、动态行高与单元格合并。

## en-US

Enable vertical virtual scroll with `virtual` for large datasets. `scroll.y` is required (number or `auto`), and column `width` is recommended. Set `scroll.x` only when horizontal scrolling is needed (a too-small `scroll.x` plus the vertical scrollbar often creates an unwanted horizontal bar). Fixed columns, dynamic row height, and cell merge are not supported yet.

</docs>

<template>
  <a-table
    virtual
    :virtual-item-height="54"
    :columns="columns"
    :data-source="data"
    :pagination="false"
    :scroll="{ y: 400 }"
  />
</template>
<script lang="ts" setup>
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 100,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    width: 200,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    width: 100,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    width: 300,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    width: 300,
  },
];

const data = [...Array(10000)].map((_, i) => ({
  key: i,
  id: i,
  name: `User ${i}`,
  age: 20 + (i % 40),
  address: `City Street No. ${i}`,
  email: `user${i}@example.com`,
}));
</script>
