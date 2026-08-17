<docs>
---
order: 3
title:
  zh-CN: 滑动
  en-US: Slide
---

## zh-CN

可以左右、上下滑动，容纳更多标签。

## en-US

In order to fit in more tabs, they can slide left and right (or up and down).

</docs>

<template>
  <div>
    <xy-radio-group v-model:value="mode" :style="{ marginBottom: '8px' }">
      <xy-radio-button value="top">Horizontal</xy-radio-button>
      <xy-radio-button value="left">Vertical</xy-radio-button>
    </xy-radio-group>
    <xy-tabs
      v-model:activeKey="activeKey"
      :tab-position="mode"
      :style="{ height: '200px' }"
      @tabScroll="callback"
    >
      <xy-tab-pane v-for="i in 30" :key="i" :tab="`Tab-${i}`">Content of tab {{ i }}</xy-tab-pane>
    </xy-tabs>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { TabsProps } from 'ant-design-vue';
const mode = ref<TabsProps['tabPosition']>('top');
const activeKey = ref(1);
const callback: TabsProps['onTabScroll'] = val => {
  console.log(val);
};
</script>
