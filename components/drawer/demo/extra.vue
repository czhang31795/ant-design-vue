<docs>
---
order: 2
title:
  zh-CN: 额外操作
  en-US: Extra Actions
---

## zh-CN

在 Ant Design 规范中，操作按钮建议放在抽屉的右上角，可以使用 extra 属性来实现。

## en-US

Extra actions should be placed at corner of drawer in Ant Design, you can using `extra` prop for that.

</docs>

<template>
  <xy-radio-group v-model:value="placement" style="margin-right: 8px">
    <xy-radio value="top">top</xy-radio>
    <xy-radio value="right">right</xy-radio>
    <xy-radio value="bottom">bottom</xy-radio>
    <xy-radio value="left">left</xy-radio>
  </xy-radio-group>
  <xy-button type="primary" @click="showDrawer">Open</xy-button>
  <xy-drawer :width="500" title="Basic Drawer" :placement="placement" :open="open" @close="onClose">
    <template #extra>
      <xy-button style="margin-right: 8px" @click="onClose">Cancel</xy-button>
      <xy-button type="primary" @click="onClose">Submit</xy-button>
    </template>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </xy-drawer>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { DrawerProps } from 'ant-design-vue';
const placement = ref<DrawerProps['placement']>('left');
const open = ref<boolean>(false);

const showDrawer = () => {
  open.value = true;
};

const onClose = () => {
  open.value = false;
};
</script>
