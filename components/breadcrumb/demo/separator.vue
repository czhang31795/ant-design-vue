<docs>
---
order: 4
title:
  zh-CN: 分隔符
  en-US: Configuring the Separator
---

## zh-CN

用` separator=">" `可以自定义分隔符，或者使用slot="separator"自定义更复杂的分隔符

## en-US

The separator can be customized by setting the separator preperty: separator=">" or use
  slot="separator"

</docs>

<template>
  <xy-breadcrumb separator=">">
    <xy-breadcrumb-item>Home</xy-breadcrumb-item>
    <xy-breadcrumb-item href="">Application Center</xy-breadcrumb-item>
    <xy-breadcrumb-item href="">Application List</xy-breadcrumb-item>
    <xy-breadcrumb-item>An Application</xy-breadcrumb-item>
  </xy-breadcrumb>
  <xy-breadcrumb>
    <template #separator><span style="color: red">></span></template>
    <xy-breadcrumb-item>Home</xy-breadcrumb-item>
    <xy-breadcrumb-item href="">Application Center</xy-breadcrumb-item>
    <xy-breadcrumb-item href="">Application List</xy-breadcrumb-item>
    <xy-breadcrumb-item>An Application</xy-breadcrumb-item>
  </xy-breadcrumb>
</template>
