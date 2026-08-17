<docs>
---
order: 9
iframe: 360
title:
  zh-CN: 侧栏导航
  en-US: Side Navigation
---

## zh-CN

使用 `ProLayout` 的 `layout="side"`：Logo 与完整菜单置于左侧，右侧为顶栏与内容区。

```ts
import { ProLayout } from '@czxingyu/ant-design-vue';
```

## en-US

Use `ProLayout` with `layout="side"`: logo and full menu on the left, header and content on the right.

```ts
import { ProLayout } from '@czxingyu/ant-design-vue';
```

</docs>
<template>
  <xy-pro-layout
    layout="side"
    v-model:collapsed="collapsed"
    v-model:selected-keys="selectedKeys"
    v-model:open-keys="openKeys"
    title="Ant Design Vue"
    header-title="侧栏导航 · side"
    :menu="menuData"
    :breadcrumb="[{ title: '首页' }, { title: currentLabel }]"
  >
    <template #headerRight>
      <span>Admin</span>
    </template>
    <template #footer>Ant Design Vue ©2024</template>
    <div class="demo-panel">
      <p>
        当前模式：
        <strong>side</strong>
        （侧栏导航）
      </p>
      <p>选中菜单：{{ selectedKeys[0] }} · {{ currentLabel }}</p>
    </div>
  </xy-pro-layout>
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
.demo-panel {
  min-height: 280px;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
}
</style>
