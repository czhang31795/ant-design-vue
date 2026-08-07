<docs>
---
order: 10
iframe: 360
title:
  zh-CN: 顶部导航
  en-US: Top Navigation
---

## zh-CN

对应 ProComponents `layout="top"`：Logo 与菜单置于顶部，适合一级导航较少的业务系统。菜单数据与侧栏 / 混合模式一致，便于切换布局。

## en-US

Corresponds to ProComponents `layout="top"`: logo and menu in the header, suitable when there are few top-level nav items. Menu data matches the side / mix presets.

</docs>
<template>
  <a-layout class="nav-layout" style="min-height: 100vh">
    <a-layout-header class="nav-header">
      <div class="nav-logo">
        <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="logo" />
        <span class="nav-logo-title">Ant Design Vue</span>
      </div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="light"
        mode="horizontal"
        :items="menuData"
        :style="{
          flex: 1,
          minWidth: 0,
          lineHeight: '62px',
          borderBottom: 'none',
          background: 'transparent',
        }"
      />
      <div class="nav-header-actions">Admin</div>
    </a-layout-header>
    <a-layout-content class="nav-content">
      <a-breadcrumb style="margin-bottom: 16px">
        <a-breadcrumb-item>首页</a-breadcrumb-item>
        <a-breadcrumb-item>{{ currentLabel }}</a-breadcrumb-item>
      </a-breadcrumb>
      <div class="nav-content-inner">
        <p>
          当前模式：
          <strong>top</strong>
          （顶部导航）
        </p>
        <p>选中菜单：{{ selectedKeys[0] }} · {{ currentLabel }}</p>
      </div>
    </a-layout-content>
    <a-layout-footer class="nav-footer">Ant Design Vue ©2024</a-layout-footer>
  </a-layout>
</template>
<script lang="ts" setup>
import { computed, h, ref } from 'vue';
import {
  DashboardOutlined,
  FormOutlined,
  TableOutlined,
  UserOutlined,
} from '@ant-design/icons-vue';
import type { ItemType } from 'ant-design-vue';

const selectedKeys = ref<string[]>(['dashboard']);

const menuData: ItemType[] = [
  {
    key: 'dashboard',
    icon: () => h(DashboardOutlined),
    label: '工作台',
    title: '工作台',
  },
  {
    key: 'list',
    icon: () => h(TableOutlined),
    label: '列表页',
    title: '列表页',
    children: [
      { key: 'list-table', label: '查询表格', title: '查询表格' },
      { key: 'list-basic', label: '标准列表', title: '标准列表' },
      { key: 'list-card', label: '卡片列表', title: '卡片列表' },
    ],
  },
  {
    key: 'form',
    icon: () => h(FormOutlined),
    label: '表单页',
    title: '表单页',
    children: [
      { key: 'form-basic', label: '基础表单', title: '基础表单' },
      { key: 'form-step', label: '分步表单', title: '分步表单' },
    ],
  },
  {
    key: 'account',
    icon: () => h(UserOutlined),
    label: '个人页',
    title: '个人页',
    children: [
      { key: 'account-center', label: '个人中心', title: '个人中心' },
      { key: 'account-settings', label: '个人设置', title: '个人设置' },
    ],
  },
];

const findLabel = (items: ItemType[], key: string): string | undefined => {
  for (const item of items) {
    if (!item || typeof item !== 'object') continue;
    if ('key' in item && item.key === key && 'label' in item) {
      return String(item.label);
    }
    if ('children' in item && Array.isArray(item.children)) {
      const found = findLabel(item.children as ItemType[], key);
      if (found) return found;
    }
  }
  return undefined;
};

const currentLabel = computed(
  () => findLabel(menuData, selectedKeys.value[0]) || selectedKeys.value[0],
);
</script>
<style scoped>
#components-layout-demo-nav-top .nav-layout {
  background: #f5f6f8;
}
#components-layout-demo-nav-top .nav-header {
  display: flex;
  align-items: center;
  padding-inline: 24px 40px;
  height: 64px;
  line-height: 64px;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
}
#components-layout-demo-nav-top .nav-logo {
  display: flex;
  align-items: center;
  margin-right: 24px;
  flex-shrink: 0;
}
#components-layout-demo-nav-top .nav-logo img {
  width: 32px;
  height: 32px;
}
#components-layout-demo-nav-top .nav-logo-title {
  margin-left: 10px;
  color: rgba(0, 0, 0, 0.88);
  font-weight: 600;
  font-size: 16px;
}
#components-layout-demo-nav-top .nav-header-actions {
  margin-left: 16px;
  color: rgba(0, 0, 0, 0.65);
  flex-shrink: 0;
}
#components-layout-demo-nav-top .nav-content {
  padding: 24px 48px;
  background: #fff;
}
#components-layout-demo-nav-top .nav-content-inner {
  min-height: 280px;
  padding: 24px;
  background: #fff;
}
#components-layout-demo-nav-top .nav-footer {
  text-align: center;
  background: #fff;
}
[data-theme='dark'] #components-layout-demo-nav-top .nav-layout {
  background: #141414;
}
[data-theme='dark'] #components-layout-demo-nav-top .nav-header,
[data-theme='dark'] #components-layout-demo-nav-top .nav-content,
[data-theme='dark'] #components-layout-demo-nav-top .nav-content-inner,
[data-theme='dark'] #components-layout-demo-nav-top .nav-footer {
  background: #141414;
}
[data-theme='dark'] #components-layout-demo-nav-top .nav-header {
  border-bottom-color: #303030;
}
[data-theme='dark'] #components-layout-demo-nav-top .nav-logo-title,
[data-theme='dark'] #components-layout-demo-nav-top .nav-header-actions {
  color: rgba(255, 255, 255, 0.85);
}
</style>
