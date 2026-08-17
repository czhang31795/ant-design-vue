<docs>
---
order: 7
title:
  zh-CN: 多彩徽标
  en-US: Colorful Badge
---

## zh-CN

1.5.0 后新增。我们添加了多种预设色彩的徽标样式，用作不同场景使用。如果预设值不能满足你的需求，可以设置为具体的色值。

## en-US

New feature after 3.16.0. We preset a series of colorful Badge styles for use in different situations. You can also set it to a hex color string for custom color.

</docs>

<template>
  <h4 style="margin-bottom: 16px">Presets:</h4>
  <div>
    <div v-for="color in colors" :key="color">
      <xy-badge :color="color" :text="color" />
    </div>
  </div>
  <xy-divider orientation="left">Custom</xy-divider>
  <xy-badge color="#f50" text="#f50" />
  <br />
  <xy-badge color="#2db7f5" text="#2db7f5" />
  <br />
  <xy-badge color="#87d068" text="#87d068" />
  <br />
  <xy-badge color="#108ee9" text="#108ee9" />
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
</script>
