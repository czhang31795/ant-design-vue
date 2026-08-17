<docs>
---
order: 3
title:
  zh-CN: 带徽标的头像
  en-US: With Badge
---

## zh-CN

通常用于消息提示。

## en-US

Usually used for reminders and notifications.
</docs>

<template>
  <xy-space :size="24">
    <xy-badge :count="1">
      <xy-avatar shape="square">
        <template #icon><UserOutlined /></template>
      </xy-avatar>
    </xy-badge>
    <xy-badge dot>
      <xy-avatar shape="square">
        <template #icon><UserOutlined /></template>
      </xy-avatar>
    </xy-badge>
  </xy-space>
</template>

<script lang="ts" setup>
import { UserOutlined } from '@ant-design/icons-vue';
</script>
