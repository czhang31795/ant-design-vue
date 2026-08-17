<docs>
---
order: 0
title:
  zh-CN: 自动换行
  en-US: Basic Usage
---

## zh-CN

自动换行。

## en-US

Wrap

</docs>

<template>
  <xy-space :size="[8, 16]" wrap>
    <template v-for="_i in 20" :key="_i">
      <xy-button>Button</xy-button>
    </template>
  </xy-space>
</template>
