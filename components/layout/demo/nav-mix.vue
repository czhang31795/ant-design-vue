<docs>
---
order: 11
iframe: 360
title:
  zh-CN: 混合导航
  en-US: Mix Navigation
---

## zh-CN

对应 ProComponents `layout="mix"` + `splitMenus`：顶部仅展示一级菜单，选中后其子菜单出现在左侧。无子菜单的一级（如工作台）不显示侧栏。

## en-US

Corresponds to ProComponents `layout="mix"` with `splitMenus`: top bar shows level-1 menus only; children appear in the sider. Level-1 items without children hide the sider.

</docs>
<template>
  <a-layout class="nav-layout" style="min-height: 100vh">
    <a-layout-header class="nav-header">
      <div class="nav-logo">
        <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="logo" />
        <span class="nav-logo-title">Ant Design Vue</span>
      </div>
      <a-menu
        v-model:selectedKeys="selectedTopKeys"
        theme="light"
        mode="horizontal"
        :items="topMenus"
        :style="{
          flex: 1,
          minWidth: 0,
          lineHeight: '62px',
          borderBottom: 'none',
          background: 'transparent',
        }"
        @click="onTopMenuClick"
      />
      <div class="nav-header-actions">Admin</div>
    </a-layout-header>
    <a-layout>
      <a-layout-sider
        v-if="sideMenus.length"
        v-model:collapsed="collapsed"
        collapsible
        :trigger="null"
        :width="208"
        theme="light"
        class="nav-sider"
      >
        <a-menu
          v-model:selectedKeys="selectedSideKeys"
          theme="light"
          mode="inline"
          :items="sideMenus"
          :style="{ height: '100%', borderRight: 0, background: 'transparent' }"
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
        <a-layout-content class="nav-content">
          <a-breadcrumb style="margin-bottom: 16px">
            <a-breadcrumb-item>首页</a-breadcrumb-item>
            <a-breadcrumb-item>{{ topLabel }}</a-breadcrumb-item>
            <a-breadcrumb-item v-if="sideMenus.length">{{ sideLabel }}</a-breadcrumb-item>
          </a-breadcrumb>
          <div class="nav-content-inner">
            <p>
              当前模式：
              <strong>mix</strong>
              （混合导航 · splitMenus）
            </p>
            <p>一级菜单：{{ selectedTopKeys[0] }} · {{ topLabel }}</p>
            <p v-if="sideMenus.length">侧栏菜单：{{ selectedSideKeys[0] }} · {{ sideLabel }}</p>
            <p v-else>当前一级无子菜单，侧栏已隐藏。</p>
          </div>
        </a-layout-content>
        <a-layout-footer class="nav-footer">Ant Design Vue ©2024</a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { computed, h, ref, watch } from 'vue';
import {
  AppstoreOutlined,
  DashboardOutlined,
  FormOutlined,
  IdcardOutlined,
  LeftOutlined,
  RightOutlined,
  SettingOutlined,
  SolutionOutlined,
  TableOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from '@ant-design/icons-vue';
import type { ItemType, MenuProps } from 'ant-design-vue';

const collapsed = ref(false);
const selectedTopKeys = ref<string[]>(['list']);
const selectedSideKeys = ref<string[]>(['list-table']);

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

/** splitMenus: top shows level-1 only */
const topMenus = computed<ItemType[]>(() =>
  menuData.map(({ key, icon, label, title }) => ({ key, icon, label, title })),
);

const activeTop = computed(() => menuData.find(item => item.key === selectedTopKeys.value[0]));

const sideMenus = computed<ItemType[]>(() => (activeTop.value?.children as ItemType[]) || []);

const topLabel = computed(() => activeTop.value?.label || selectedTopKeys.value[0]);

const sideLabel = computed(() => {
  const side = activeTop.value?.children?.find(item => item.key === selectedSideKeys.value[0]);
  return side?.label || selectedSideKeys.value[0];
});

const syncSideSelection = (topKey: string) => {
  const top = menuData.find(item => item.key === topKey);
  if (top?.children?.length) {
    selectedSideKeys.value = [top.children[0].key];
  } else {
    selectedSideKeys.value = [];
  }
};

const onTopMenuClick: MenuProps['onClick'] = ({ key }) => {
  selectedTopKeys.value = [String(key)];
  syncSideSelection(String(key));
};

watch(
  selectedTopKeys,
  keys => {
    const top = menuData.find(item => item.key === keys[0]);
    if (top?.children?.length) {
      const stillValid = top.children.some(c => c.key === selectedSideKeys.value[0]);
      if (!stillValid) {
        selectedSideKeys.value = [top.children[0].key];
      }
    }
  },
  { immediate: true },
);
</script>
<style scoped>
#components-layout-demo-nav-mix .nav-layout {
  background: #f5f6f8;
}
#components-layout-demo-nav-mix .nav-header {
  display: flex;
  align-items: center;
  padding-inline: 24px 40px;
  height: 64px;
  line-height: 64px;
  z-index: 2;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
}
#components-layout-demo-nav-mix .nav-logo {
  display: flex;
  align-items: center;
  margin-right: 24px;
  flex-shrink: 0;
}
#components-layout-demo-nav-mix .nav-logo img {
  width: 32px;
  height: 32px;
}
#components-layout-demo-nav-mix .nav-logo-title {
  margin-left: 10px;
  color: rgba(0, 0, 0, 0.88);
  font-weight: 600;
  font-size: 16px;
}
#components-layout-demo-nav-mix .nav-header-actions {
  margin-left: 16px;
  color: rgba(0, 0, 0, 0.65);
  flex-shrink: 0;
}
#components-layout-demo-nav-mix .nav-sider {
  position: relative;
  z-index: 1;
  background: #f7f8fa !important;
  border-right: 1px solid #eff0f3;
  overflow: visible !important;
}
#components-layout-demo-nav-mix .nav-sider :deep(.ant-layout-sider-children) {
  overflow: visible;
}
#components-layout-demo-nav-mix .nav-sider :deep(.ant-menu.ant-menu-inline-collapsed) {
  width: 100%;
}
#components-layout-demo-nav-mix .nav-sider :deep(.ant-menu-inline-collapsed > .ant-menu-item) {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-inline: 0 !important;
}
#components-layout-demo-nav-mix .nav-sider :deep(.ant-menu-inline-collapsed .ant-menu-item-icon) {
  margin-inline: 0 !important;
}
#components-layout-demo-nav-mix .nav-collapse-btn {
  position: absolute;
  top: 24px;
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
#components-layout-demo-nav-mix .nav-collapse-btn:hover {
  color: #1677ff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}
#components-layout-demo-nav-mix .nav-main {
  background: #fff;
}
#components-layout-demo-nav-mix .nav-content {
  margin: 16px 24px;
}
#components-layout-demo-nav-mix .nav-content-inner {
  min-height: 280px;
  padding: 24px;
  background: #fff;
}
#components-layout-demo-nav-mix .nav-footer {
  text-align: center;
  background: #fff;
}
[data-theme='dark'] #components-layout-demo-nav-mix .nav-layout {
  background: #141414;
}
[data-theme='dark'] #components-layout-demo-nav-mix .nav-header,
[data-theme='dark'] #components-layout-demo-nav-mix .nav-main,
[data-theme='dark'] #components-layout-demo-nav-mix .nav-content-inner,
[data-theme='dark'] #components-layout-demo-nav-mix .nav-footer {
  background: #141414;
}
[data-theme='dark'] #components-layout-demo-nav-mix .nav-header {
  border-bottom-color: #303030;
}
[data-theme='dark'] #components-layout-demo-nav-mix .nav-sider {
  background: #1f1f1f !important;
  border-right-color: #303030;
}
[data-theme='dark'] #components-layout-demo-nav-mix .nav-logo-title,
[data-theme='dark'] #components-layout-demo-nav-mix .nav-header-actions {
  color: rgba(255, 255, 255, 0.85);
}
[data-theme='dark'] #components-layout-demo-nav-mix .nav-collapse-btn {
  color: rgba(255, 255, 255, 0.65);
  background: #1f1f1f;
  border-color: #434343;
}
</style>
