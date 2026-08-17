<docs>
---
order: 4
title:
  zh-CN: 多彩文字提示
  en-US: Colorful Tooltip
---

## zh-CN

我们添加了多种预设色彩的文字提示样式，用作不同场景使用。

## en-US

We preset a series of colorful Tooltip styles for use in different situations.

</docs>

<template>
  <div id="components-a-tooltip-demo-color">
    <xy-divider orientation="left">Presets</xy-divider>
    <div>
      <xy-tooltip v-for="color in colors" :key="color" title="prompt text" :color="color">
        <xy-button>{{ color }}</xy-button>
      </xy-tooltip>
    </div>
    <xy-divider orientation="left">Custom</xy-divider>
    <div>
      <xy-tooltip v-for="color in customColors" :key="color" title="prompt text" :color="color">
        <xy-button>{{ color }}</xy-button>
      </xy-tooltip>
    </div>
  </div>
</template>

<script lang="ts" setup>
const colors = [
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'volcano',
  'gold',
  'lime',
];
const customColors = ['#f50', '#2db7f5', '#87d068', '#108ee9'];
</script>

<style scoped>
:deep(#components-a-tooltip-demo-color) .xy-btn {
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>
