<docs>
---
order: 9
iframe: 360
title:
  zh-CN: 侧栏导航
  en-US: Side Navigation
---

## zh-CN

对应 ProComponents `layout="side"`：Logo 与完整菜单置于左侧，右侧为顶栏与内容区。菜单数据可直接复用到业务项目。

## en-US

Corresponds to ProComponents `layout="side"`: logo and full menu on the left, header and content on the right. Menu data can be reused in your project.

</docs>
<template>
  <a-layout class="nav-layout" style="min-height: 100vh">
    <a-layout-sider
      v-model:collapsed="collapsed"
      collapsible
      :trigger="null"
      :width="208"
      theme="light"
      class="nav-sider"
    >
      <div class="nav-logo" :class="{ 'nav-logo-collapsed': collapsed }">
        <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="logo" />
        <span v-if="!collapsed" class="nav-logo-title">Ant Design Vue</span>
      </div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        v-model:openKeys="openKeys"
        theme="light"
        mode="inline"
        :items="menuData"
      />
      <button
        type="button"
        class="nav-collapse-btn"
        :aria-label="collapsed ? '展开侧栏' : '收起侧栏'"
        @click="collapsed = !collapsed"
      >
        <right-outlined v-if="collapsed" />
        <left-outlined v-else />
      </button>
    </a-layout-sider>
    <a-layout class="nav-main">
      <a-layout-header class="nav-header">
        <div class="nav-header-title">侧栏导航 · side</div>
        <div class="nav-header-actions">
          <span>Admin</span>
        </div>
      </a-layout-header>
      <a-layout-content class="nav-content">
        <a-breadcrumb style="margin-bottom: 16px">
          <a-breadcrumb-item>首页</a-breadcrumb-item>
          <a-breadcrumb-item>{{ currentLabel }}</a-breadcrumb-item>
        </a-breadcrumb>
        <div class="nav-content-inner">
          <p>
            当前模式：
            <strong>side</strong>
            （侧栏导航）
          </p>
          <p>选中菜单：{{ selectedKeys[0] }} · {{ currentLabel }}</p>
        </div>
      </a-layout-content>
      <a-layout-footer class="nav-footer">Ant Design Vue ©2024</a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { computed, h, ref } from 'vue';
import {
  DashboardOutlined,
  FormOutlined,
  LeftOutlined,
  RightOutlined,
  TableOutlined,
  UserOutlined,
} from '@ant-design/icons-vue';
import type { ItemType } from 'ant-design-vue';

const collapsed = ref(false);
const selectedKeys = ref<string[]>(['dashboard']);
const openKeys = ref<string[]>(['list', 'form']);

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
#components-layout-demo-nav-side .nav-layout {
  background: #f5f6f8;
}
#components-layout-demo-nav-side .nav-sider {
  position: relative;
  z-index: 1;
  background: #f7f8fa !important;
  border-right: 1px solid #eff0f3;
  overflow: visible !important;
}
#components-layout-demo-nav-side .nav-sider :deep(.ant-layout-sider-children) {
  display: flex;
  flex-direction: column;
  overflow: visible;
}
#components-layout-demo-nav-side .nav-sider :deep(.ant-menu) {
  background: transparent;
  border-inline-end: none !important;
}
#components-layout-demo-nav-side .nav-logo {
  display: flex;
  align-items: center;
  height: 64px;
  padding-inline: 24px;
  overflow: hidden;
  white-space: nowrap;
  transition: padding 0.2s;
}
/* 收起时与菜单 icon 水平居中对齐 */
#components-layout-demo-nav-side .nav-logo-collapsed {
  justify-content: center;
  padding-inline: 0;
}
#components-layout-demo-nav-side .nav-logo img {
  display: block;
  width: 32px;
  height: 32px;
  margin: 0 auto;
  flex-shrink: 0;
}
#components-layout-demo-nav-side .nav-sider :deep(.ant-menu.ant-menu-inline-collapsed) {
  width: 100%;
}
#components-layout-demo-nav-side .nav-sider :deep(.ant-menu-inline-collapsed > .ant-menu-item),
#components-layout-demo-nav-side
  .nav-sider
  :deep(.ant-menu-inline-collapsed > .ant-menu-submenu > .ant-menu-submenu-title) {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-inline: 0 !important;
}
#components-layout-demo-nav-side .nav-sider :deep(.ant-menu-inline-collapsed .ant-menu-item-icon) {
  margin-inline: 0 !important;
}
#components-layout-demo-nav-side .nav-logo-title {
  margin-left: 10px;
  color: rgba(0, 0, 0, 0.88);
  font-weight: 600;
  font-size: 16px;
}
#components-layout-demo-nav-side .nav-collapse-btn {
  position: absolute;
  top: 72px;
  right: -12px;
  z-index: 20;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  color: rgba(0, 0, 0, 0.45);
  font-size: 10px;
  line-height: 1;
  background: #fff;
  border: 1px solid #e5e6eb;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: color 0.2s, box-shadow 0.2s;
}
#components-layout-demo-nav-side .nav-collapse-btn:hover {
  color: #1677ff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}
#components-layout-demo-nav-side .nav-main {
  background: #fff;
}
#components-layout-demo-nav-side .nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 24px;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  line-height: 64px;
}
#components-layout-demo-nav-side .nav-header-title {
  font-weight: 500;
}
#components-layout-demo-nav-side .nav-header-actions {
  color: rgba(0, 0, 0, 0.65);
}
#components-layout-demo-nav-side .nav-content {
  margin: 16px 24px;
}
#components-layout-demo-nav-side .nav-content-inner {
  min-height: 280px;
  padding: 24px;
  background: #fff;
}
#components-layout-demo-nav-side .nav-footer {
  text-align: center;
  background: #fff;
}
[data-theme='dark'] #components-layout-demo-nav-side .nav-layout {
  background: #141414;
}
[data-theme='dark'] #components-layout-demo-nav-side .nav-sider {
  background: #1f1f1f !important;
  border-right-color: #303030;
}
[data-theme='dark'] #components-layout-demo-nav-side .nav-logo-title,
[data-theme='dark'] #components-layout-demo-nav-side .nav-header-actions {
  color: rgba(255, 255, 255, 0.85);
}
[data-theme='dark'] #components-layout-demo-nav-side .nav-collapse-btn {
  color: rgba(255, 255, 255, 0.65);
  background: #1f1f1f;
  border-color: #434343;
}
[data-theme='dark'] #components-layout-demo-nav-side .nav-main,
[data-theme='dark'] #components-layout-demo-nav-side .nav-header,
[data-theme='dark'] #components-layout-demo-nav-side .nav-content-inner,
[data-theme='dark'] #components-layout-demo-nav-side .nav-footer {
  background: #141414;
}
[data-theme='dark'] #components-layout-demo-nav-side .nav-header {
  border-bottom-color: #303030;
}
</style>
