<docs>
---
order: 8
title:
  zh-CN: 垂直方向紧凑布局
  en-US: Vertical Compact Mode
---

## zh-CN

垂直方向的紧凑布局，目前仅支持 Button 组合。

## en-US

Vertical Mode for Space.Compact, support Button only.

</docs>

<template>
  <xy-space>
    <xy-space-compact direction="vertical">
      <xy-button>Button 1</xy-button>
      <xy-button>Button 2</xy-button>
      <xy-button>Button 3</xy-button>
    </xy-space-compact>
    <xy-space-compact direction="vertical">
      <xy-button type="dashed">Button 1</xy-button>
      <xy-button type="dashed">Button 2</xy-button>
      <xy-button type="dashed">Button 3</xy-button>
    </xy-space-compact>
    <xy-space-compact direction="vertical">
      <xy-button type="primary">Button 1</xy-button>
      <xy-button type="primary">Button 2</xy-button>
      <xy-button type="primary">Button 3</xy-button>
    </xy-space-compact>
  </xy-space>
</template>
