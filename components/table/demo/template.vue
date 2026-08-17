<docs>
---
order: 99
title:
  en-US: template style API
  zh-CN: template 风格的 API
---

## zh-CN

使用 template 风格的 API。

> 不推荐使用，会有一定的性能损耗。

> 这个只是一个描述 `columns` 的语法糖，所以你不能用其他组件去包裹 `Column` 和 `ColumnGroup`。

## en-US

Using template style API.

> Not recommended, there will be a certain performance loss.

> Since this is just a syntax sugar for the prop `columns`, so that you can't compose `Column` and `ColumnGroup` with other Components.

</docs>

<template>
  <xy-table :data-source="data">
    <xy-table-column-group>
      <template #title><span style="color: #1890ff">Name</span></template>
      <xy-table-column key="firstName" data-index="firstName">
        <template #title><span style="color: #1890ff">First Name</span></template>
      </xy-table-column>
      <xy-table-column key="lastName" title="Last Name" data-index="lastName" />
    </xy-table-column-group>
    <xy-table-column key="age" title="Age" data-index="age" />
    <xy-table-column key="address" title="Address" data-index="address" />
    <xy-table-column key="tags" title="Tags" data-index="tags">
      <template #default="{ text: tags }">
        <span>
          <xy-tag v-for="tag in tags" :key="tag" color="blue">{{ tag }}</xy-tag>
        </span>
      </template>
    </xy-table-column>
    <xy-table-column key="action" title="Action">
      <template #default="{ record }">
        <span>
          <a>Action 一 {{ record.firstName }}</a>
          <xy-divider type="vertical" />
          <a>Delete</a>
        </span>
      </template>
    </xy-table-column>
  </xy-table>
</template>
<script lang="ts" setup>
const data = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
</script>
