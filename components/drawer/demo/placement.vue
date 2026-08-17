<docs>
---
order: 1
title:
  zh-CN: 自定义位置
  en-US: Custom Placement
---

## zh-CN

自定义位置，点击触发按钮抽屉从相应的位置滑出，点击遮罩区关闭

## en-US

The Drawer can appear from any edge of the screen.

</docs>

<template>
  <xy-radio-group v-model:value="placement" style="margin-right: 8px">
    <xy-radio value="top">top</xy-radio>
    <xy-radio value="right">right</xy-radio>
    <xy-radio value="bottom">bottom</xy-radio>
    <xy-radio value="left">left</xy-radio>
  </xy-radio-group>
  <xy-button type="primary" @click="showDrawer">Open</xy-button>
  <xy-drawer
    title="Basic Drawer"
    :placement="placement"
    :closable="false"
    :open="open"
    @close="onClose"
  >
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
