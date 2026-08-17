<docs>
---
order: 6
title:
  zh-CN: 自定义文字格式
  en-US: Custom text format
---

## zh-CN

`format` 属性指定格式。

## en-US

You can set a custom text by setting the `format` prop.

</docs>

<template>
  <div>
    <xy-progress type="circle" :percent="75" :format="percent => `${percent} Days`" />
    <xy-progress type="circle" :percent="100" :format="() => 'Done'" />
    <xy-progress type="circle" :percent="75">
      <template #format="percent">
        <span style="color: red">{{ percent }}</span>
      </template>
    </xy-progress>
  </div>
</template>
