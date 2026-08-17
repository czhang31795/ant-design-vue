<docs>
---
order: 0
title:
  zh-CN: 基本使用
  en-US: Base
---

## zh-CN

基本用法。

## en-US
Basic Usage.
</docs>

<template>
  <xy-space direction="vertical" align="center">
    <xy-qrcode :value="text" />
    <xy-input v-model:value="text" placeholder="-" :maxlength="60" />
  </xy-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const text = ref('https://www.antdv.com/');
</script>
