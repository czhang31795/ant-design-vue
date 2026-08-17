<docs>
---
order: 5
title:
  zh-CN: 带下拉框的按钮
  en-US: Button with dropdown menu
---

## zh-CN

左边是按钮，右边是额外的相关功能菜单。可设置 `icon` 属性来修改右边的图标。

## en-US

A button is on the left, and a related functional menu is on the right. You can set the icon property to modify the icon of right.

</docs>

<template>
  <div class="demo-dropdown-wrap">
    <xy-dropdown-button @click="handleButtonClick">
      Dropdown
      <template #overlay>
        <xy-menu @click="handleMenuClick">
          <xy-menu-item key="1">
            <UserOutlined />
            1st menu item
          </xy-menu-item>
          <xy-menu-item key="2">
            <UserOutlined />
            2nd menu item
          </xy-menu-item>
          <xy-menu-item key="3">
            <UserOutlined />
            3rd item
          </xy-menu-item>
        </xy-menu>
      </template>
    </xy-dropdown-button>
    <xy-dropdown-button>
      Dropdown
      <template #overlay>
        <xy-menu @click="handleMenuClick">
          <xy-menu-item key="1">
            <UserOutlined />
            1st menu item
          </xy-menu-item>
          <xy-menu-item key="2">
            <UserOutlined />
            2nd menu item
          </xy-menu-item>
          <xy-menu-item key="3">
            <UserOutlined />
            3rd item
          </xy-menu-item>
        </xy-menu>
      </template>
      <template #icon><UserOutlined /></template>
    </xy-dropdown-button>
    <xy-dropdown-button disabled @click="handleButtonClick">
      Dropdown
      <template #overlay>
        <xy-menu @click="handleMenuClick">
          <xy-menu-item key="1">
            <UserOutlined />
            1st menu item
          </xy-menu-item>
          <xy-menu-item key="2">
            <UserOutlined />
            2nd menu item
          </xy-menu-item>
          <xy-menu-item key="3">
            <UserOutlined />
            3rd item
          </xy-menu-item>
        </xy-menu>
      </template>
    </xy-dropdown-button>
    <xy-dropdown>
      <template #overlay>
        <xy-menu @click="handleMenuClick">
          <xy-menu-item key="1">
            <UserOutlined />
            1st menu item
          </xy-menu-item>
          <xy-menu-item key="2">
            <UserOutlined />
            2nd menu item
          </xy-menu-item>
          <xy-menu-item key="3">
            <UserOutlined />
            3rd item
          </xy-menu-item>
        </xy-menu>
      </template>
      <xy-button>
        Button
        <DownOutlined />
      </xy-button>
    </xy-dropdown>
  </div>
</template>
<script lang="ts" setup>
import { UserOutlined, DownOutlined } from '@ant-design/icons-vue';
import type { MenuProps } from 'ant-design-vue';
const handleButtonClick = (e: Event) => {
  console.log('click left button', e);
};
const handleMenuClick: MenuProps['onClick'] = e => {
  console.log('click', e);
};
</script>
<style lang="less" scoped>
.demo-dropdown-wrap :deep(.xy-dropdown-button) {
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>
