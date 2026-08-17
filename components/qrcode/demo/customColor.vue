<docs>
---
order: 5
title:
  zh-CN: 自定义颜色
  en-US: Custom Color
---

## zh-CN

通过设置 `color` 自定义二维码颜色，通过设置 `style` 自定义背景颜色。

## en-US
Custom Color.
</docs>

<template>
  <xy-space>
    <xy-qrcode value="http://www.antdv.com" :color="token.colorSuccessText" />
    <xy-qrcode
      value="http://www.antdv.com"
      :color="token.colorInfoText"
      :bg-color="token.colorBgLayout"
    />
  </xy-space>
</template>

<script lang="ts" setup>
import { theme } from 'ant-design-vue';

const { useToken } = theme;
const { token } = useToken();
</script>
