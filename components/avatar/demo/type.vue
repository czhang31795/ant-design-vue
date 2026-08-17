<docs>
---
order: 1
title:
  zh-CN: 类型
  en-US: Type
---

## zh-CN

支持三种类型：图片、Icon 以及字符，其中 Icon 和字符型可以自定义图标颜色及背景色。

## en-US

Image, Icon and letter are supported, and the latter two kinds avatar can have custom colors and background colors.
</docs>

<template>
  <xy-space :size="16" wrap>
    <xy-avatar>
      <template #icon>
        <UserOutlined />
      </template>
    </xy-avatar>
    <xy-avatar>U</xy-avatar>
    <xy-avatar :size="40">USER</xy-avatar>
    <xy-avatar src="https://www.antdv.com/assets/logo.1ef800a8.svg" />
    <xy-avatar style="color: #f56a00; background-color: #fde3cf">U</xy-avatar>
    <xy-avatar style="background-color: #87d068">
      <template #icon>
        <UserOutlined />
      </template>
    </xy-avatar>
  </xy-space>
</template>

<script lang="ts" setup>
import { UserOutlined } from '@ant-design/icons-vue';
</script>
