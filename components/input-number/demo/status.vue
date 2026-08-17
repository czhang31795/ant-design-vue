<docs>
---
order: 19
version: 3.3.0
title:
  zh-CN: 自定义状态
  en-US: Status
---

## zh-CN

使用 `status` 为 InputNumber 添加状态，可选 `error` 或者 `warning`。

## en-US

Add status to InputNumber with `status`, which could be `error` or `warning`.

</docs>
<template>
  <xy-space direction="vertical" style="width: 100%">
    <xy-input-number status="error" style="width: 100%" />
    <xy-input-number status="warning" style="width: 100%" />
    <xy-input-number status="error" style="width: 100%">
      <template #prefix><ClockCircleOutlined /></template>
    </xy-input-number>
    <xy-input-number status="warning" style="width: 100%">
      <template #prefix><ClockCircleOutlined /></template>
    </xy-input-number>
  </xy-space>
</template>

<script lang="ts" setup>
import { ClockCircleOutlined } from '@ant-design/icons-vue';
</script>
