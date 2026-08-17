<docs>
---
order: 1
title:
  zh-CN: 带有图标的
  en-US: With an Icon
---

## zh-CN

图标放在文字前面。

## en-US

The icon should be placed in front of the text.

</docs>

<template>
  <xy-breadcrumb>
    <xy-breadcrumb-item href="">
      <home-outlined />
    </xy-breadcrumb-item>
    <xy-breadcrumb-item href="">
      <user-outlined />
      <span>Application List</span>
    </xy-breadcrumb-item>
    <xy-breadcrumb-item>Application</xy-breadcrumb-item>
  </xy-breadcrumb>
</template>
<script lang="ts" setup>
import { HomeOutlined, UserOutlined } from '@ant-design/icons-vue';
</script>
