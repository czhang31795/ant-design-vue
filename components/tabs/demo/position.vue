<docs>
---
order: 6
title:
  zh-CN: 位置
  en-US: Position
---

## zh-CN

有四个位置，`tabPosition="left|right|top|bottom"`。在移动端下，`bottom|right` 会自动切换成 `top`。

## en-US

Tab's position: left, right, top or bottom.  Will auto switch to `top` in mobile.

</docs>

<template>
  <xy-radio-group v-model:value="tabPosition" style="margin: 8px">
    <xy-radio-button value="top">top</xy-radio-button>
    <xy-radio-button value="bottom">bottom</xy-radio-button>
    <xy-radio-button value="left">left</xy-radio-button>
    <xy-radio-button value="right">right</xy-radio-button>
  </xy-radio-group>
  <xy-tabs v-model:activeKey="activeKey" :tab-position="tabPosition" animated>
    <xy-tab-pane key="1" tab="Tab 1">Content of Tab 1</xy-tab-pane>
    <xy-tab-pane key="2" tab="Tab 2">Content of Tab 2</xy-tab-pane>
    <xy-tab-pane key="3" tab="Tab 3">Content of Tab 3</xy-tab-pane>
  </xy-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { TabsProps } from 'ant-design-vue/es/tabs';
const tabPosition = ref<TabsProps['tabPosition']>('top');
const activeKey = ref('1');
</script>
