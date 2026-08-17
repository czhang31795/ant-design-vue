<docs>
---
order: 8
title:
  zh-CN: 幽灵按钮
  en-US: Ghost Button
---

## zh-CN

幽灵按钮将按钮的内容反色，背景变为透明，常用在有色背景上。

## en-US

`ghost` property will make button's background transparent, it is commonly used in colored background.

</docs>

<template>
  <div :style="{ background: 'rgb(190, 200, 200)', padding: '16px 16px' }">
    <xy-space>
      <xy-button type="primary" ghost>Primary</xy-button>
      <xy-button ghost>Default</xy-button>
      <xy-button type="dashed" ghost>Dashed</xy-button>
      <xy-button type="primary" danger ghost>Danger</xy-button>
    </xy-space>
  </div>
</template>
