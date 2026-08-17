<docs>
---
order: 1.1
title:
  zh-CN: 切换不同的选择器
  en-US: Switchable picker
---

## zh-CN

提供选择器，自由切换不同类型的日期选择器，常用于日期筛选场合。

## en-US

Switch in different types of pickers by Select.
</docs>
<template>
  <xy-space direction="vertical" :size="12">
    <xy-select v-model:value="type">
      <xy-select-option value="time">Time</xy-select-option>
      <xy-select-option value="date">Date</xy-select-option>
      <xy-select-option value="week">Week</xy-select-option>
      <xy-select-option value="month">Month</xy-select-option>
      <xy-select-option value="quarter">Quarter</xy-select-option>
      <xy-select-option value="year">Year</xy-select-option>
    </xy-select>
    <template v-if="type === 'time'">
      <xy-time-picker />
    </template>
    <template v-else>
      <xy-date-picker :picker="type" />
    </template>
  </xy-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const type = ref<any>('time');
</script>
