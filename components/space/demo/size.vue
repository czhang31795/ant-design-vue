<docs>
---
order: 2
title:
  zh-CN: 间距大小
  en-US: Space Size
---

## zh-CN

间距预设大、中、小三种大小。
通过设置 `size` 为 `large` `middle` 分别把间距设为大、中间距。若不设置 `size`，则间距为小。


## en-US

`large`, `middle` and `small` preset sizes.
Set the size to `large` and `middle` by setting size to large and middle respectively. If `size` is not set, the spacing is `small`.

</docs>

<template>
  <div>
    <xy-radio-group v-model:value="size">
      <xy-radio value="small">Small</xy-radio>
      <xy-radio value="middle">Middle</xy-radio>
      <xy-radio value="large">Large</xy-radio>
    </xy-radio-group>
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
const size = ref('small' as const);
</script>
