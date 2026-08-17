<docs>
---
order: 7
title:
  zh-CN: 自定义 icon
  en-US: Custom icon
---

## zh-CN

自定义 icon。

## en-US

Custom icon.

</docs>

<template>
  <xy-result title="Great, we have done all the operations!">
    <template #icon>
      <smile-twoTone />
    </template>
    <template #extra>
      <xy-button type="primary">Next</xy-button>
    </template>
  </xy-result>
</template>
<script lang="ts" setup>
import { SmileTwoTone } from '@ant-design/icons-vue';
</script>
