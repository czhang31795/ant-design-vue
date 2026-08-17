<docs>
---
order: 3
title:
  zh-CN: 自定义尺寸
  en-US: Customize Size
---

## zh-CN

自定义间距大小。

## en-US

Custom spacing size.
</docs>

<template>
  <div>
    <xy-slider v-model:value="size" />
    <br />
    <br />
    <xy-space :size="size">
      <xy-button type="primary">Primary</xy-button>
      <xy-button>Default</xy-button>
      <xy-button type="dashed">Dashed</xy-button>
      <xy-button type="link">Link</xy-button>
    </xy-space>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const size = ref(8);
</script>
