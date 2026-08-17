<docs>
---
order: 7
title:
  zh-CN: Flex 填充
  en-US: Flex Stretch
---

## zh-CN

Col 提供 `flex` 属性以支持填充。

## en-US

Col provides `flex` prop to support fill rest.

</docs>

<template>
  <xy-divider orientation="left">Percentage columns</xy-divider>
  <xy-row>
    <xy-col :flex="2">2 / 5</xy-col>
    <xy-col :flex="3">3 / 5</xy-col>
  </xy-row>
  <xy-divider orientation="left">Fill rest</xy-divider>
  <xy-row>
    <xy-col flex="100px">100px</xy-col>
    <xy-col flex="auto">auto</xy-col>
  </xy-row>
  <xy-divider orientation="left">Raw flex style</xy-divider>
  <xy-row>
    <xy-col flex="1 1 200px">1 1 200px</xy-col>
    <xy-col flex="0 1 300px">0 1 300px</xy-col>
  </xy-row>
  <xy-row :wrap="false">
    <xy-col flex="none">
      <div style="padding: 0 16px">none</div>
    </xy-col>
    <xy-col flex="auto">auto with no-wrap</xy-col>
  </xy-row>
</template>
