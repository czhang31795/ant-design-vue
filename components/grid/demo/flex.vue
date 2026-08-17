<docs>
---
order: 4
title:
  zh-CN: 排版
  en-US: Typesetting
---

## zh-CN

布局基础。

子元素根据不同的值 `start`,`center`,`end`,`space-between`,`space-around`，分别定义其在父节点里面的排版方式。

## en-US

Child elements depending on the value of the `start`,`center`, `end`,`space-between`, `space-around`, which are defined in its parent node typesetting mode.

</docs>

<template>
  <div id="components-grid-demo-flex">
    <xy-divider orientation="left">sub-element align left</xy-divider>
    <xy-row justify="start">
      <xy-col :span="4">col-4</xy-col>
      <xy-col :span="4">col-4</xy-col>
      <xy-col :span="4">col-4</xy-col>
      <xy-col :span="4">col-4</xy-col>
    </xy-row>

    <xy-divider orientation="left">sub-element align center</xy-divider>
    <xy-row justify="center">
      <xy-col :span="4">col-4</xy-col>
      <xy-col :span="4">col-4</xy-col>
      <xy-col :span="4">col-4</xy-col>
      <xy-col :span="4">col-4</xy-col>
    </xy-row>

    <xy-divider orientation="left">sub-element align right</xy-divider>
    <xy-row justify="end">
      <xy-col :span="4">col-4</xy-col>
      <xy-col :span="4">col-4</xy-col>
      <xy-col :span="4">col-4</xy-col>
      <xy-col :span="4">col-4</xy-col>
    </xy-row>

    <xy-divider orientation="left">sub-element monospaced arrangement</xy-divider>
    <xy-row justify="space-between">
      <xy-col :span="4">col-4</xy-col>
      <xy-col :span="4">col-4</xy-col>
      <xy-col :span="4">col-4</xy-col>
      <xy-col :span="4">col-4</xy-col>
    </xy-row>

    <xy-divider orientation="left">sub-element align full</xy-divider>
    <xy-row justify="space-around">
      <xy-col :span="4">col-4</xy-col>
      <xy-col :span="4">col-4</xy-col>
      <xy-col :span="4">col-4</xy-col>
      <xy-col :span="4">col-4</xy-col>
    </xy-row>

    <xy-divider orientation="left">sub-element align full</xy-divider>
    <xy-row justify="space-evenly">
      <xy-col :span="4">col-4</xy-col>
      <xy-col :span="4">col-4</xy-col>
      <xy-col :span="4">col-4</xy-col>
      <xy-col :span="4">col-4</xy-col>
    </xy-row>
  </div>
</template>

<style lang="less" scoped>
:deep(#components-grid-demo-flex) [class~='xy-row'] {
  background: rgba(128, 128, 128, 0.08);
}
</style>
