<docs>
---
order: 8
title:
  zh-CN: 分段进度条
  en-US: Progress bar with success segment
---

## zh-CN

标准的进度条。

## en-US

A standard progress bar.

</docs>

<template>
  <div>
    <xy-tooltip title="3 done / 3 in progress / 4 to do">
      <xy-progress :percent="60" :success="{ percent: 30 }" />
    </xy-tooltip>
    <xy-tooltip title="3 done / 3 in progress / 4 to do">
      <xy-progress :percent="60" :success="{ percent: 30 }" type="circle" />
    </xy-tooltip>
    <xy-tooltip title="3 done / 3 in progress / 4 to do">
      <xy-progress :percent="60" :success="{ percent: 30 }" type="dashboard" />
    </xy-tooltip>
  </div>
</template>
