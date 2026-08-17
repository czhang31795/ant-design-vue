<docs>
---
order: 1
title:
  zh-CN: 固定状态改变的回调
  en-US: Callback
---

## zh-CN

可以获得是否固定的状态。

## en-US

Callback with affixed state.

</docs>

<template>
  <xy-affix :offset-top="120" @change="change">
    <xy-button>120px to affix top</xy-button>
  </xy-affix>
</template>
<script lang="ts" setup>
const change = (affixed: boolean) => {
  console.log(affixed);
};
</script>
