<docs>
---
order: 12.3
title:
  zh-CN: 树形虚拟滚动
  en-US: Virtual Tree
---

## zh-CN

树形数据会先按展开状态扁平化，再进行纵向虚拟滚动。展开/收起后可视区域会自动更新。

## en-US

Tree data is flattened by expand state before vertical virtualization. The visible window updates after expand/collapse.

</docs>

<template>
  <a-table
    virtual
    :virtual-item-height="54"
    :columns="columns"
    :data-source="data"
    :pagination="false"
    :scroll="{ y: 400 }"
    :default-expand-all-rows="true"
  />
</template>
<script lang="ts" setup>
interface DataItem {
  key: string;
  name: string;
  age: number;
  address: string;
  children?: DataItem[];
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: 280,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    width: 100,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    width: 400,
  },
];

function buildTree(level: number, prefix: string, count: number): DataItem[] {
  return [...Array(count)].map((_, i) => {
    const key = `${prefix}-${i}`;
    const node: DataItem = {
      key,
      name: `Node ${key}`,
      age: 20 + (i % 40),
      address: `Address ${key}`,
    };
    if (level < 2) {
      node.children = buildTree(level + 1, key, 8);
    }
    return node;
  });
}

const data = buildTree(0, 'root', 40);
</script>
