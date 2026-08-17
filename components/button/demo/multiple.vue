<docs>
---
order: 5
title:
  zh-CN: 多个按钮组合
  en-US: Multiple Buttons
---

## zh-CN

按钮组合使用时，推荐使用 1 个主操作 + n 个次操作，3 个以上操作时把更多操作放到 [Dropdown.Button](/components/dropdown/#components-dropdown-demo-dropdown-button) 中组合使用。

## en-US

If you need several buttons, we recommend that you use 1 primary button + n secondary buttons, and if there are more than three operations, you can group some of them into [Dropdown.Button](/components/dropdown/#components-dropdown-demo-dropdown-button).
</docs>

<template>
  <xy-space>
    <xy-button type="primary">Primary</xy-button>
    <xy-button>secondary</xy-button>
    <xy-dropdown>
      <template #overlay>
        <xy-menu @click="handleMenuClick">
          <xy-menu-item key="1">1st item</xy-menu-item>
          <xy-menu-item key="2">2nd item</xy-menu-item>
          <xy-menu-item key="3">3rd item</xy-menu-item>
        </xy-menu>
      </template>
      <xy-button>
        Actions
        <DownOutlined />
      </xy-button>
    </xy-dropdown>
  </xy-space>
</template>

<script lang="ts" setup>
import { DownOutlined } from '@ant-design/icons-vue';
import type { MenuProps } from 'ant-design-vue';
const handleMenuClick: MenuProps['onClick'] = e => {
  console.log('click', e);
};
</script>
