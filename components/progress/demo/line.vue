<docs>
---
order: 0
title:
  zh-CN: 进度条
  en-US: Progress bar
---

## zh-CN

标准的进度条。

## en-US

A standard progress bar.

</docs>

<template>
  <xy-progress :percent="30" />
  <xy-progress :percent="50" status="active" />
  <xy-progress :percent="70" status="exception" />
  <xy-progress :percent="100" />
  <xy-progress :percent="50" :show-info="false" />
</template>
