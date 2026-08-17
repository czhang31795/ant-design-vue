<docs>
---
order: 4
title:
  zh-CN: 组合使用
  en-US: combination
---

## zh-CN

嵌套使用，可以实现更复杂的布局。

## en-US

Nesting can achieve more complex layouts.

</docs>

<template>
  <xy-card :style="cardStyle" :body-style="{ padding: 0, overflow: 'hidden' }">
    <xy-flex justify="space-between">
      <img
        alt="avatar"
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        :style="imgStyle"
      />
      <xy-flex vertical align="flex-end" justify="space-between" :style="{ padding: '32px' }">
        <xy-typography>
          <xy-typography-title :level="3">
            “antd is an enterprise-class UI design language and Vue UI library.”
          </xy-typography-title>
        </xy-typography>
        <xy-button type="primary" href="https://antdv.com" target="_blank">Get Start</xy-button>
      </xy-flex>
    </xy-flex>
  </xy-card>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue';
const cardStyle: CSSProperties = {
  width: '620px',
};
const imgStyle: CSSProperties = {
  display: 'block',
  width: '273px',
};
</script>
