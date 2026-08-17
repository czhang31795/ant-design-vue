<docs>
---
order: 2
title:
  zh-CN: 带有图标的通知提醒框
  en-US: Notification with icon
---

## zh-CN

通知提醒框左侧有图标。

## en-US

A notification box with a icon at the left side.

</docs>

<template>
  <div>
    <xy-button @click="() => openNotificationWithIcon('success')">Success</xy-button>
    <xy-button @click="() => openNotificationWithIcon('info')">Info</xy-button>
    <xy-button @click="() => openNotificationWithIcon('warning')">Warning</xy-button>
    <xy-button @click="() => openNotificationWithIcon('error')">Error</xy-button>
  </div>
</template>
<script lang="ts" setup>
import { notification } from 'ant-design-vue';
const openNotificationWithIcon = (type: string) => {
  notification[type]({
    message: 'Notification Title',
    description:
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
  });
};
</script>
