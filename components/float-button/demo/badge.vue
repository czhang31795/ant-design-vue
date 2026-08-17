<docs>
---
order: 8
iframe: 360
title:
  zh-CN: 徽标数
  en-US: Badge
---

## zh-CN

右上角附带圆形徽标数字的悬浮按钮。

## en-US

FloatButton with Badge.

</docs>

<template>
  <xy-float-button shape="circle" :badge="{ dot: true }" :style="{ right: '164px' }" />
  <xy-float-button-group shape="circle" :style="{ right: '94px' }">
    <xy-float-button :badge="{ count: 5, color: 'blue' }">
      <template #tooltip>
        <div>custom badge color</div>
      </template>
    </xy-float-button>
    <xy-float-button :badge="{ count: 5 }"></xy-float-button>
  </xy-float-button-group>
  <xy-float-button-group shape="circle">
    <xy-float-button :badge="{ count: 12 }">
      <template #icon>
        <QuestionCircleOutlined />
      </template>
    </xy-float-button>
    <xy-float-button :badge="{ count: 123, overflowCount: 999 }"></xy-float-button>
    <xy-back-top :visibility-height="0" />
  </xy-float-button-group>
</template>
<script setup>
import { QuestionCircleOutlined } from '@ant-design/icons-vue';
</script>
