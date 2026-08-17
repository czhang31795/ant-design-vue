<docs>
---
order: 19
version: 3.3.0
title:
  zh-CN: 自定义状态
  en-US: Status
---

## zh-CN

使用 `status` 为 DatePicker 添加状态，可选 `error` 或者 `warning`。

## en-US

Add status to DatePicker with `status`, which could be `error` or `warning`.

</docs>

<template>
  <xy-space direction="vertical" style="width: 100%">
    <xy-time-picker status="error" />
    <xy-time-picker status="warning" />
    <xy-time-range-picker status="error" />
    <xy-time-range-picker status="warning" />
  </xy-space>
</template>
