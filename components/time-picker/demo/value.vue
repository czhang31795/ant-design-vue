<docs>
---
order: 8
debugger: true
title:
  zh-CN: 受控组件
  en-US: Under Control
---

## zh-CN

value 和 onChange 需要配合使用。也可以直接使用v-model。

## en-US

`value` and `@change` should be used together or use v-model.

</docs>

<template>
  <xy-space direction="vertical">
    <p>use value and @change</p>
    <xy-time-picker :value="value" @change="onChange" />
    <p>v-model</p>
    <xy-time-picker v-model:value="value" />
    <p>Do not change</p>
    <xy-time-picker :value="value2" />
  </xy-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import dayjs, { Dayjs } from 'dayjs';

const value = ref<Dayjs>();

const onChange = (time: Dayjs) => {
  console.log(time);
  value.value = time;
};

const value2 = ref(dayjs());
</script>
