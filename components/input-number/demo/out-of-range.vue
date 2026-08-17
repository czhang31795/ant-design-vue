<docs>
---
order: 6
title:
  zh-CN: 超出边界
  en-US: Out of range
---

## zh-CN

当通过受控将 `value` 超出边界时，提供警告样式。

## en-US

Show warning style when `value` is out of range by control.

</docs>

<template>
  <xy-space>
    <xy-input-number v-model:value="value" :min="1" :max="10" />
    <xy-button type="primary" @click="value = 99">Reset</xy-button>
  </xy-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const value = ref<number>(99);
</script>
