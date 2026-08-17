<docs>
---
order: 2
iframe: 360
title:
  zh-CN: 形状
  en-US: Shape
---

## zh-CN

最简单的用法。

## en-US

The most basic usage.

</docs>

<template>
  <xy-float-button @click="handleClick" />

  <xy-float-button
    shape="circle"
    type="primary"
    :style="{
      right: '94px',
    }"
  >
    <template #icon>
      <CustomerServiceOutlined />
    </template>
  </xy-float-button>

  <xy-float-button
    shape="square"
    type="primary"
    :style="{
      right: '24px',
    }"
  >
    <template #icon>
      <CustomerServiceOutlined />
    </template>
  </xy-float-button>
</template>

<script lang="ts" setup>
import { CustomerServiceOutlined } from '@ant-design/icons-vue';
const handleClick = () => console.log('click');
</script>
