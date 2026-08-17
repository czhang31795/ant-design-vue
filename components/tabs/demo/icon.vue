<docs>
---
order: 2
title:
  zh-CN: 图标
  en-US: Icon
---

## zh-CN

有图标的标签。

## en-US

The Tab with Icon.

</docs>

<template>
  <xy-tabs v-model:activeKey="activeKey">
    <xy-tab-pane key="1">
      <template #tab>
        <span>
          <apple-outlined />
          Tab 1
        </span>
      </template>
      Tab 1
    </xy-tab-pane>
    <xy-tab-pane key="2">
      <template #tab>
        <span>
          <android-outlined />
          Tab 2
        </span>
      </template>
      Tab 2
    </xy-tab-pane>
  </xy-tabs>
</template>
<script lang="ts" setup>
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';
const activeKey = ref('1');
</script>
