<docs>
---
order: 12
title:
  zh-CN: 自定义渲染
  en-US: Custum Time
---

## zh-CN

增加自定义渲染功能，在默认 `slot` 中，你可以设置任何你想渲染的组件。

## en-US

Added custom rendering function, in the default `slot`, you can set any component you want to render.

</docs>

<template>
  <xy-space direction="vertical" :size="12">
    <xy-date-picker v-model:value="time1" placeholder="Select Time" @ok="onOk">
      <span>{{ time1 ? time1.toString() : 'SelectTime' }}</span>
    </xy-date-picker>
    <xy-range-picker v-model:value="time2">
      <span>
        {{ time2 ? time2.toString() : '请选择' }}
      </span>
    </xy-range-picker>
  </xy-space>
</template>
<script lang="ts" setup>
import { Dayjs } from 'dayjs';
import { ref } from 'vue';
const time1 = ref<Dayjs>();
const time2 = ref<[Dayjs, Dayjs]>();

const onOk = (value: Dayjs) => {
  console.log('onOk: ', value);
};
</script>
