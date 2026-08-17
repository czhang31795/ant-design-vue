<docs>
---
order: 6
title:
  zh-CN: 分隔符
  en-US: Configuring the Separator
---

## zh-CN

使用 `Breadcrumb.Separator` 可以自定义分隔符。

## en-US

The separator can be customized by setting the separator property: `Breadcrumb.Separator`.

</docs>

<template>
  <xy-breadcrumb separator="">
    <xy-breadcrumb-item>Location</xy-breadcrumb-item>
    <xy-breadcrumb-separator>:</xy-breadcrumb-separator>
    <xy-breadcrumb-item href="">Application Center</xy-breadcrumb-item>
    <xy-breadcrumb-separator />
    <xy-breadcrumb-item href="">Application List</xy-breadcrumb-item>
    <xy-breadcrumb-separator />
    <xy-breadcrumb-item>An Application</xy-breadcrumb-item>
  </xy-breadcrumb>
</template>
