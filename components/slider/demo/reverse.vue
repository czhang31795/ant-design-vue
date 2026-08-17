<docs>
---
order: 8
title:
  zh-CN: 反向
  en-US: Reverse
---

## zh-CN

设置 `reverse` 可以将滑动条置反。

## en-US

Using `reverse` to render slider reversely.
</docs>

<template>
  <div>
    <xy-slider v-model:value="value1" :reverse="reverse" />
    <xy-slider v-model:value="value2" range :reverse="reverse" />
    Reversed:
    <xy-switch v-model:checked="reverse" size="small" />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref<number>(30);
const value2 = ref<[number, number]>([20, 50]);
const reverse = ref<boolean>(true);
</script>
