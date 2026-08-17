<docs>
---
order: 4
title:
  zh-CN: 加载中状态
  en-US: Loading
---

## zh-CN

添加 `loading` 属性即可让按钮处于加载状态，最后两个按钮演示点击后进入加载状态。

## en-US

A loading indicator can be added to a button by setting the `loading` property on the `Button`.
</docs>

<template>
  <xy-space direction="vertical">
    <xy-space>
      <xy-button type="primary" loading>Loading</xy-button>
      <xy-button type="primary" size="small" loading>Loading</xy-button>
    </xy-space>
    <xy-space>
      <xy-button type="primary" :loading="loading" @mouseenter="loading = true">
        mouseenter me!
      </xy-button>
      <xy-button type="primary" :loading="iconLoading" @click="enterIconLoading">
        <template #icon><PoweroffOutlined /></template>
        延迟1s
      </xy-button>
    </xy-space>
    <xy-space>
      <xy-button type="primary" loading />
      <xy-button type="primary" shape="circle" loading />
      <xy-button danger shape="round" loading />
    </xy-space>
  </xy-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { PoweroffOutlined } from '@ant-design/icons-vue';

interface DelayLoading {
  delay: number;
}
const loading = ref<boolean>(false);
const iconLoading = ref<boolean | DelayLoading>(false);
const enterIconLoading = () => {
  iconLoading.value = { delay: 1000 };

  setTimeout(() => {
    iconLoading.value = false;
  }, 6000);
};
</script>
