<docs>
---
order: 10
title:
  zh-CN: Block 按钮
  en-US: Block Button
---

## zh-CN

`block` 属性将使按钮适合其父宽度。

## en-US

`block` property will make the button fit to its parent width.
</docs>

<template>
  <xy-space wrap>
    <xy-button type="primary" block>Primary</xy-button>
    <xy-button block>Default</xy-button>
    <xy-button type="dashed" block>Dashed</xy-button>
    <xy-button danger block>Danger</xy-button>
    <xy-button type="link" block>Link</xy-button>
  </xy-space>
</template>
