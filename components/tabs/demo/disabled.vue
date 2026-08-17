<docs>
---
order: 1
title:
  zh-CN: 禁用
  en-US: Disabled
---

## zh-CN

禁用某一项。

## en-US

Disabled a tab.

</docs>

<template>
  <xy-tabs v-model:activeKey="activeKey">
    <xy-tab-pane key="1" tab="Tab 1">Tab 1</xy-tab-pane>
    <xy-tab-pane key="2" tab="Tab 2" disabled>Tab 2</xy-tab-pane>
    <xy-tab-pane key="3" tab="Tab 3">Tab 3</xy-tab-pane>
  </xy-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const activeKey = ref('1');
</script>
