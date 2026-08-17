<docs>
---
order: 19
version: 3.3.0
title:
  zh-CN: 自定义状态
  en-US: Status
---

## zh-CN

使用 `status` 为 Input 添加状态，可选 `error` 或者 `warning`。

## en-US

Add status to Input with `status`, which could be `error` or `warning`.

</docs>
<template>
  <xy-space direction="vertical" style="width: 100%">
    <xy-input status="error" placeholder="Error" />
    <xy-input status="warning" placeholder="Warning" />
    <xy-input status="error" placeholder="Error with prefix">
      <template #prefix><ClockCircleOutlined /></template>
    </xy-input>
    <xy-input status="warning" placeholder="Warning with prefix">
      <template #prefix><ClockCircleOutlined /></template>
    </xy-input>
  </xy-space>
</template>

<script lang="ts" setup>
import { ClockCircleOutlined } from '@ant-design/icons-vue';
</script>
