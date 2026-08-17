<docs>
---
order: 4
title:
  zh-CN: 自定义尺寸
  en-US: Custom Size
---

## zh-CN

自定义尺寸

## en-US
Custom Size.
</docs>

<template>
  <xy-button-group>
    <xy-button @click="decline">
      <template #icon><MinusOutlined /></template>
      small
    </xy-button>
    <xy-button @click="increase">
      <template #icon><PlusOutlined /></template>
      large
    </xy-button>
  </xy-button-group>
  <br />
  <br />
  <xy-qrcode
    :size="size"
    :icon-size="size / 4"
    error-level="H"
    value="https://www.antdv.com"
    icon="https://www.antdv.com/assets/logo.1ef800a8.svg"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons-vue';

const size = ref(160);
const decline = () => {
  size.value = size.value - 10;
  if (size.value < 48) {
    size.value = 48;
  }
};
const increase = () => {
  size.value = size.value + 10;
  if (size.value > 300) {
    size.value = 300;
  }
};
</script>
