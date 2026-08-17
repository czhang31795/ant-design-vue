<docs>
---
order: 5
title:
  zh-CN: 大小
  en-US: Size
---

## zh-CN

大号页签用在页头区域，小号用在弹出框等较狭窄的容器内。

## en-US
Large size tabs are usally used in page header, and small size could be used in Modal.

</docs>

<template>
  <div>
    <xy-radio-group v-model:value="size" style="margin-bottom: 16px">
      <xy-radio-button value="small">Small</xy-radio-button>
      <xy-radio-button value="default">Default</xy-radio-button>
      <xy-radio-button value="large">Large</xy-radio-button>
    </xy-radio-group>
    <xy-tabs v-model:activeKey="activeKey" :size="size">
      <xy-tab-pane key="1" tab="Tab 1">Content of tab 1</xy-tab-pane>
      <xy-tab-pane key="2" tab="Tab 2">Content of tab 2</xy-tab-pane>
      <xy-tab-pane key="3" tab="Tab 3">Content of tab 3</xy-tab-pane>
    </xy-tabs>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { TabsProps } from 'ant-design-vue';
const size = ref<TabsProps['size']>('small');
const activeKey = ref('1');
</script>
