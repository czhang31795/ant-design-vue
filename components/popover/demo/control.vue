<docs>
---
order: 3
title:
  zh-CN: 从浮层内关闭
  en-US: Controlling the close of the dialog
---

## zh-CN

使用 `visible` 属性控制浮层显示。

## en-US

Use `visible` prop to control the display of the card.

</docs>
<template>
  <xy-popover v-model:open="visible" title="Title" trigger="click">
    <template #content>
      <a @click="hide">Close</a>
    </template>
    <xy-button type="primary">Click me</xy-button>
  </xy-popover>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const visible = ref<boolean>(false);

const hide = () => {
  visible.value = false;
};
</script>
