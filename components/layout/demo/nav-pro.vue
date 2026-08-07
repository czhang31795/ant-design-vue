<docs>
---
order: 12
iframe: 360
title:
  zh-CN: Pro 风格布局
  en-US: Pro Style Layout
---

## zh-CN

对齐 Ant Design Pro 默认后台壳：顶栏放置 Logo 与用户区，浅色侧栏承载菜单，内容区为浅灰底 + 卡片。收起按钮为侧栏边缘圆形浮动按钮，可直接作为业务模板复制。

## en-US

Aligned with the Ant Design Pro admin shell: logo and user area in the header, light sider for menus, and a light-gray content area with cards. Collapse control is a floating circular button on the sider edge.

</docs>
<template>
  <a-layout class="pro-layout">
    <a-layout-header class="pro-header">
      <div class="pro-logo">
        <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="logo" />
        <span class="pro-logo-title">Ant Design Pro</span>
      </div>
      <div class="pro-header-right">
        <span class="pro-header-action"><search-outlined /></span>
        <span class="pro-header-action"><question-circle-outlined /></span>
        <span class="pro-header-action"><bell-outlined /></span>
        <span class="pro-header-account">
          <a-avatar
            size="small"
            src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
          />
          <span class="pro-header-name">ProUser</span>
        </span>
      </div>
    </a-layout-header>
    <a-layout class="pro-body">
      <a-layout-sider
        v-model:collapsed="collapsed"
        collapsible
        :trigger="null"
        :width="208"
        theme="light"
        class="pro-sider"
      >
        <a-menu
          v-model:selectedKeys="selectedKeys"
          v-model:openKeys="openKeys"
          theme="light"
          mode="inline"
          :items="menuData"
        />
        <button
          type="button"
          class="pro-collapse-btn"
          :aria-label="collapsed ? '展开侧栏' : '收起侧栏'"
          @click="collapsed = !collapsed"
        >
          <right-outlined v-if="collapsed" />
          <left-outlined v-else />
        </button>
      </a-layout-sider>
      <a-layout-content class="pro-content">
        <div class="pro-page-header">
          <a-breadcrumb>
            <a-breadcrumb-item>Dashboard</a-breadcrumb-item>
            <a-breadcrumb-item>分析页</a-breadcrumb-item>
          </a-breadcrumb>
          <h1 class="pro-page-title">分析页</h1>
        </div>
        <a-row :gutter="[16, 16]">
          <a-col :xs="24" :sm="12" :md="6" v-for="item in statCards" :key="item.title">
            <a-card size="small" :bordered="false" class="pro-stat-card">
              <div class="pro-stat-title">{{ item.title }}</div>
              <div class="pro-stat-value">{{ item.value }}</div>
              <div class="pro-stat-desc">{{ item.desc }}</div>
            </a-card>
          </a-col>
          <a-col :span="24">
            <a-card title="销售趋势" :bordered="false" class="pro-chart-card">
              <div class="pro-chart-placeholder">此处可放置图表 / 表格等内容</div>
            </a-card>
          </a-col>
        </a-row>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { h, ref } from 'vue';
import {
  BellOutlined,
  DashboardOutlined,
  FormOutlined,
  LeftOutlined,
  QuestionCircleOutlined,
  RightOutlined,
  SearchOutlined,
  SmileOutlined,
  TableOutlined,
  UserOutlined,
} from '@ant-design/icons-vue';
import type { ItemType } from 'ant-design-vue';

const collapsed = ref(false);
const selectedKeys = ref<string[]>(['analysis']);
const openKeys = ref<string[]>(['dashboard']);

const menuData: ItemType[] = [
  {
    key: 'welcome',
    icon: () => h(SmileOutlined),
    label: '欢迎',
    title: '欢迎',
  },
  {
    key: 'dashboard',
    icon: () => h(DashboardOutlined),
    label: 'Dashboard',
    title: 'Dashboard',
    children: [
      { key: 'analysis', label: '分析页', title: '分析页' },
      { key: 'monitor', label: '监控页', title: '监控页' },
      { key: 'workplace', label: '工作台', title: '工作台' },
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
    key: 'list',
    icon: () => h(TableOutlined),
    label: '列表页',
    title: '列表页',
    children: [
      { key: 'list-table', label: '查询表格', title: '查询表格' },
      { key: 'list-basic', label: '标准列表', title: '标准列表' },
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

const statCards = [
  { title: '总销售额', value: '¥ 126,560', desc: '日均销售额 ¥12,423' },
  { title: '访问量', value: '8,846', desc: '日访问量 1,234' },
  { title: '支付笔数', value: '6,560', desc: '转化率 60%' },
  { title: '运营活动效果', value: '78%', desc: '周同比 12%' },
];
</script>
<style scoped>
#components-layout-demo-nav-pro .pro-layout {
  min-height: 100vh;
  background: #f0f2f5;
}
#components-layout-demo-nav-pro .pro-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 0 24px;
  line-height: 56px;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  z-index: 3;
}
#components-layout-demo-nav-pro .pro-logo {
  display: flex;
  align-items: center;
}
#components-layout-demo-nav-pro .pro-logo img {
  width: 32px;
  height: 32px;
}
#components-layout-demo-nav-pro .pro-logo-title {
  margin-left: 12px;
  color: rgba(0, 0, 0, 0.88);
  font-weight: 600;
  font-size: 18px;
}
#components-layout-demo-nav-pro .pro-header-right {
  display: flex;
  align-items: center;
  gap: 4px;
  color: rgba(0, 0, 0, 0.65);
}
#components-layout-demo-nav-pro .pro-header-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 56px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
}
#components-layout-demo-nav-pro .pro-header-action:hover {
  background: rgba(0, 0, 0, 0.025);
}
#components-layout-demo-nav-pro .pro-header-account {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 56px;
  padding: 0 12px;
  cursor: pointer;
}
#components-layout-demo-nav-pro .pro-header-account:hover {
  background: rgba(0, 0, 0, 0.025);
}
#components-layout-demo-nav-pro .pro-header-name {
  color: rgba(0, 0, 0, 0.85);
}
#components-layout-demo-nav-pro .pro-body {
  min-height: calc(100vh - 56px);
  background: #f0f2f5;
}
#components-layout-demo-nav-pro .pro-sider {
  position: relative;
  z-index: 2;
  background: #fff !important;
  border-right: 1px solid #f0f0f0;
  overflow: visible !important;
}
#components-layout-demo-nav-pro .pro-sider :deep(.ant-layout-sider-children) {
  overflow: visible;
}
#components-layout-demo-nav-pro .pro-sider :deep(.ant-menu) {
  border-inline-end: none !important;
}
#components-layout-demo-nav-pro .pro-collapse-btn {
  position: absolute;
  top: 18px;
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
#components-layout-demo-nav-pro .pro-collapse-btn:hover {
  color: #1677ff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}
#components-layout-demo-nav-pro .pro-content {
  padding: 16px 24px 24px;
  background: #f0f2f5;
}
#components-layout-demo-nav-pro .pro-page-header {
  margin-bottom: 16px;
}
#components-layout-demo-nav-pro .pro-page-title {
  margin: 8px 0 0;
  color: rgba(0, 0, 0, 0.88);
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}
#components-layout-demo-nav-pro .pro-stat-card,
#components-layout-demo-nav-pro .pro-chart-card {
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
}
#components-layout-demo-nav-pro .pro-stat-title {
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
}
#components-layout-demo-nav-pro .pro-stat-value {
  margin: 8px 0;
  color: rgba(0, 0, 0, 0.88);
  font-size: 24px;
  line-height: 32px;
}
#components-layout-demo-nav-pro .pro-stat-desc {
  color: rgba(0, 0, 0, 0.45);
  font-size: 12px;
}
#components-layout-demo-nav-pro .pro-chart-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 220px;
  color: rgba(0, 0, 0, 0.45);
  background: linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%);
  border-radius: 6px;
}
[data-theme='dark'] #components-layout-demo-nav-pro .pro-layout,
[data-theme='dark'] #components-layout-demo-nav-pro .pro-body,
[data-theme='dark'] #components-layout-demo-nav-pro .pro-content {
  background: #141414;
}
[data-theme='dark'] #components-layout-demo-nav-pro .pro-header,
[data-theme='dark'] #components-layout-demo-nav-pro .pro-sider {
  background: #1f1f1f !important;
  border-color: #303030;
}
[data-theme='dark'] #components-layout-demo-nav-pro .pro-logo-title,
[data-theme='dark'] #components-layout-demo-nav-pro .pro-header-name,
[data-theme='dark'] #components-layout-demo-nav-pro .pro-page-title {
  color: rgba(255, 255, 255, 0.85);
}
[data-theme='dark'] #components-layout-demo-nav-pro .pro-header-right,
[data-theme='dark'] #components-layout-demo-nav-pro .pro-stat-title,
[data-theme='dark'] #components-layout-demo-nav-pro .pro-stat-desc,
[data-theme='dark'] #components-layout-demo-nav-pro .pro-chart-placeholder {
  color: rgba(255, 255, 255, 0.45);
}
[data-theme='dark'] #components-layout-demo-nav-pro .pro-collapse-btn {
  color: rgba(255, 255, 255, 0.65);
  background: #1f1f1f;
  border-color: #434343;
}
[data-theme='dark'] #components-layout-demo-nav-pro .pro-chart-placeholder {
  background: #141414;
}
</style>
