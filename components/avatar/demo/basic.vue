<docs>
---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

头像有三种尺寸，两种形状可选。

## en-US

Three sizes and two shapes are available.
</docs>

<template>
  <xy-space direction="vertical" :size="32">
    <xy-space wrap :size="16">
      <xy-avatar :size="64">
        <template #icon><UserOutlined /></template>
      </xy-avatar>
      <xy-avatar size="large">
        <template #icon><UserOutlined /></template>
      </xy-avatar>
      <xy-avatar>
        <template #icon><UserOutlined /></template>
      </xy-avatar>
      <xy-avatar size="small">
        <template #icon><UserOutlined /></template>
      </xy-avatar>
    </xy-space>
    <xy-space wrap :size="16">
      <xy-avatar shape="square" :size="64">
        <template #icon><UserOutlined /></template>
      </xy-avatar>
      <xy-avatar shape="square" size="large">
        <template #icon><UserOutlined /></template>
      </xy-avatar>
      <xy-avatar shape="square">
        <template #icon><UserOutlined /></template>
      </xy-avatar>
      <xy-avatar shape="square" size="small">
        <template #icon><UserOutlined /></template>
      </xy-avatar>
    </xy-space>
  </xy-space>
</template>

<script lang="ts" setup>
import { UserOutlined } from '@ant-design/icons-vue';
</script>
