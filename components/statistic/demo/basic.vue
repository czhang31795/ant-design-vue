<docs>
---
order: 0
title:
  zh-CN: 基本用法
  en-US: Basic usage
---

## zh-CN

简单展示

## en-US

Simplest Usage.

</docs>

<template>
  <xy-row>
    <xy-col :span="12">
      <xy-statistic title="Active Users" :value="112893" style="margin-right: 50px" />
    </xy-col>
    <xy-col :span="12">
      <xy-statistic title="Account Balance (CNY)" :precision="2" :value="112893" />
    </xy-col>
  </xy-row>
</template>
