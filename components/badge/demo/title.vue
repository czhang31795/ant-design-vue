<docs>
---
order: 6
title:
  zh-CN: 自定义标题
  en-US: Title
---

## zh-CN

设置鼠标放在状态点上时显示的文字

## en-US

The badge will display `title` when hovered over, instead of `count`.

</docs>

<template>
  <xy-badge :count="5" title="Custom hover text">
    <xy-avatar shape="square" size="large" />
  </xy-badge>
</template>
