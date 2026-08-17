<docs>
---
order: 3
title:
  zh-CN: 自动调整位置
  en-US: Adjust placement automatically
---

## zh-CN

气泡框不可见时自动调整位置。

## en-US

Adjust popup placement automatically when popup is invisible.

</docs>

<template>
  <div :style="wrapStyles">
    <xy-tooltip placement="left" title="Prompt Text" :get-popup-container="getPopupContainer">
      <xy-button>Adjust automatically / 自动调整</xy-button>
    </xy-tooltip>
    <br />
    <xy-tooltip
      placement="left"
      title="Prompt Text"
      :get-popup-container="getPopupContainer"
      :auto-adjust-overflow="false"
    >
      <xy-button style="margin-top: 10px">Ingore / 不处理</xy-button>
    </xy-tooltip>
  </div>
</template>
<script lang="ts" setup>
const wrapStyles: Record<string, string> = {
  overflow: 'hidden',
  position: 'relative',
  padding: '24px',
  border: '1px solid #e9e9e9',
};
const getPopupContainer = (trigger: HTMLElement) => {
  return trigger.parentElement;
};
</script>
