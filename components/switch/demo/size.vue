<docs>
---
order: 3
title:
  zh-CN: 两种大小
  en-US: Two sizes
---

## zh-CN

`size="small"` 表示小号开关。

## en-US

`size="small"` represents a small sized switch.

</docs>

<template>
  <xy-space direction="vertical">
    <xy-switch v-model:checked="state.checked1" />
    <xy-switch v-model:checked="state.checked2" size="small" />
  </xy-space>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
const state = reactive({
  checked1: true,
  checked2: false,
});
</script>
