<docs>
---
order: 4
title:
  zh-CN: 动态展示
  en-US: Dynamic
---

## zh-CN

会动的进度条才是好进度条。

## en-US

A dynamic progress bar is better.

</docs>

<template>
  <div>
    <xy-progress :percent="defaultPercent" />
    <xy-button-group>
      <xy-button @click="decline">
        <template #icon><minus-outlined /></template>
      </xy-button>
      <xy-button @click="increase">
        <template #icon><plus-outlined /></template>
      </xy-button>
    </xy-button-group>
  </div>
</template>
<script lang="ts" setup>
import { MinusOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';
const defaultPercent = ref<number>(0);

const increase = () => {
  const percent = defaultPercent.value + 10;
  defaultPercent.value = percent > 100 ? 100 : percent;
};

const decline = () => {
  const percent = defaultPercent.value - 10;
  defaultPercent.value = percent < 0 ? 0 : percent;
};
</script>
