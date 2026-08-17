<docs>
---
order: 6
title:
  zh-CN: 预加载的卡片
  en-US: Loading card
---

## zh-CN

数据读入前会有文本块样式

## en-US

Shows a loading indirector while the contents of the card is being featched

</docs>

<template>
  <xy-card :loading="loading" title="Card title">whatever content</xy-card>
  <xy-button style="margin-top: 16px" @click="handleClick">Toggle loading</xy-button>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const loading = ref(true);

const handleClick = () => {
  loading.value = !loading.value;
};
</script>
