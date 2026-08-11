<docs>
---
order: 11
iframe: 360
title:
  zh-CN: 混合导航
  en-US: Mix Navigation
---

## zh-CN

`layout="mix"` + `splitMenus`：顶部仅展示一级菜单，选中后其子菜单出现在左侧。无子菜单的一级不显示侧栏。

```ts
import { ProLayout } from '@czxingyu/ant-design-vue';
```

## en-US

`layout="mix"` with `splitMenus`: level-1 menus on top, children in the sider. Level-1 items without children hide the sider.

```ts
import { ProLayout } from '@czxingyu/ant-design-vue';
```

</docs>
<template>
  <a-pro-layout
    layout="mix"
    split-menus
    v-model:collapsed="collapsed"
    v-model:selected-keys="selectedKeys"
    title="Ant Design Vue"
    :menu="menuData"
    :breadcrumb="breadcrumb"
  >
    <template #headerRight>
      <span>Admin</span>
    </template>
    <template #footer>Ant Design Vue ©2024</template>
    <div class="demo-panel">
      <p>
        当前模式：
        <strong>mix</strong>
        （混合导航 · splitMenus）
      </p>
      <p>选中菜单：{{ selectedKeys[0] }} · {{ currentLabel }}</p>
    </div>
  </a-pro-layout>
</template>
<script lang="ts" setup>
import { computed, h, ref } from 'vue';
import {
  AppstoreOutlined,
  DashboardOutlined,
  FormOutlined,
  IdcardOutlined,
  SettingOutlined,
  SolutionOutlined,
  TableOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from '@ant-design/icons-vue';
const collapsed = ref(false);
const selectedKeys = ref<string[]>(['list-table']);

type MenuNode = {
  key: string;
  icon?: () => any;
  label: string;
  title: string;
  children?: MenuNode[];
};

const menuData: MenuNode[] = [
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
      {
        key: 'list-table',
        icon: () => h(TableOutlined),
        label: '查询表格',
        title: '查询表格',
      },
      {
        key: 'list-basic',
        icon: () => h(UnorderedListOutlined),
        label: '标准列表',
        title: '标准列表',
      },
      {
        key: 'list-card',
        icon: () => h(AppstoreOutlined),
        label: '卡片列表',
        title: '卡片列表',
      },
    ],
  },
  {
    key: 'form',
    icon: () => h(FormOutlined),
    label: '表单页',
    title: '表单页',
    children: [
      {
        key: 'form-basic',
        icon: () => h(FormOutlined),
        label: '基础表单',
        title: '基础表单',
      },
      {
        key: 'form-step',
        icon: () => h(SolutionOutlined),
        label: '分步表单',
        title: '分步表单',
      },
    ],
  },
  {
    key: 'account',
    icon: () => h(UserOutlined),
    label: '个人页',
    title: '个人页',
    children: [
      {
        key: 'account-center',
        icon: () => h(IdcardOutlined),
        label: '个人中心',
        title: '个人中心',
      },
      {
        key: 'account-settings',
        icon: () => h(SettingOutlined),
        label: '个人设置',
        title: '个人设置',
      },
    ],
  },
];

const findPath = (
  items: MenuNode[],
  key: string,
  path: MenuNode[] = [],
): MenuNode[] | undefined => {
  for (const item of items) {
    const next = [...path, item];
    if (item.key === key) return next;
    if (item.children?.length) {
      const found = findPath(item.children, key, next);
      if (found) return found;
    }
  }
  return undefined;
};

const currentPath = computed(() => findPath(menuData, selectedKeys.value[0]) || []);
const currentLabel = computed(
  () => currentPath.value[currentPath.value.length - 1]?.label || selectedKeys.value[0],
);
const breadcrumb = computed(() => [
  { title: '首页' },
  ...currentPath.value.map(item => ({ title: item.label })),
]);
</script>
<style scoped>
.demo-panel {
  min-height: 280px;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
}
</style>
