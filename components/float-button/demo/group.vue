<docs>
---
order: 5
iframe: 360
title:
  zh-CN: 浮动按钮组
  en-US: FloatButton Group
---

## zh-CN

按钮组合使用时，推荐使用 `<FloatButton.Group />`，并通过设置 `shape` 属性改变悬浮按钮组的形状。悬浮按钮组的 `shape` 会覆盖内部 FloatButton 的 `shape` 属性。

## en-US

When multiple buttons are used together, `<FloatButton.Group />` is recommended. By setting `shape` of FloatButton.Group, you can change the shape of group. `shape` of FloatButton.Group will override `shape` of FloatButton inside.

</docs>

<template>
  <xy-float-button-group shape="circle" :style="{ right: '24px' }">
    <xy-float-button>
      <template #icon>
        <QuestionCircleOutlined />
      </template>
    </xy-float-button>
    <xy-float-button />
    <xy-back-top :visibility-height="0" />
  </xy-float-button-group>
  <xy-float-button-group shape="square" :style="{ right: '94px' }">
    <xy-float-button>
      <template #icon>
        <QuestionCircleOutlined />
      </template>
    </xy-float-button>
    <xy-float-button />

    <xy-float-button>
      <template #icon>
        <SyncOutlined />
      </template>
    </xy-float-button>
    <xy-back-top :visibility-height="0" />
  </xy-float-button-group>
</template>

<script lang="ts" setup>
import { QuestionCircleOutlined, SyncOutlined } from '@ant-design/icons-vue';
</script>
