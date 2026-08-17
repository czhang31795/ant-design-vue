<docs>
---
order: 5
title:
  zh-CN: 标签
  en-US: Label
---

## zh-CN

使用 `label` 标签单独展示时间。

## en-US

Use `label` show time alone.

</docs>

<template>
  <xy-radio-group v-model:value="mode" style="margin-bottom: 20px">
    <xy-radio value="left">Left</xy-radio>
    <xy-radio value="right">Right</xy-radio>
    <xy-radio value="alternate">Alternate</xy-radio>
  </xy-radio-group>
  <xy-timeline :mode="mode">
    <xy-timeline-item label="2015-09-01">Create a services</xy-timeline-item>
    <xy-timeline-item label="2015-09-01 09:12:11">Solve initial network problems</xy-timeline-item>
    <xy-timeline-item>Technical testing</xy-timeline-item>
    <xy-timeline-item>
      <template #label><strong style="color: red">2015-09-01 09:12:11</strong></template>
      Network problems being solved
    </xy-timeline-item>
  </xy-timeline>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { TimelineProps } from 'ant-design-vue';
const mode = ref<TimelineProps['mode']>('left');
</script>
