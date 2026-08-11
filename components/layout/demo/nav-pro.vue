<docs>
---
order: 12
iframe: 360
title:
  zh-CN: Pro 风格布局
  en-US: Pro Style Layout
---

## zh-CN

完整后台页示例：在 `layout="side"` 上组合页头、统计卡片等内容。三种导航模式共用同一组件，仅切换 `layout`。

```ts
import { ProLayout } from '@czxingyu/ant-design-vue';
```

## en-US

Full admin page example on `layout="side"` with page header and stat cards. All three nav modes share one component via `layout`.

```ts
import { ProLayout } from '@czxingyu/ant-design-vue';
```

</docs>
<template>
  <a-pro-layout
    layout="side"
    v-model:collapsed="collapsed"
    v-model:selected-keys="selectedKeys"
    v-model:open-keys="openKeys"
    title="Ant Design Pro"
    :menu="menuData"
    page-title="分析页"
    :breadcrumb="[{ title: 'Dashboard' }, { title: '分析页' }]"
  >
    <template #headerRight>
      <span class="ant-pro-layout-header-action"><search-outlined /></span>
      <span class="ant-pro-layout-header-action"><bell-outlined /></span>
      <span class="ant-pro-layout-header-account">
        <a-avatar
          size="small"
          src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
        />
        <span class="ant-pro-layout-header-name">ProUser</span>
      </span>
    </template>

    <a-row :gutter="[16, 16]">
      <a-col v-for="item in statCards" :key="item.title" :xs="24" :sm="12" :md="6">
        <a-card size="small" :bordered="false">
          <div class="demo-stat-title">{{ item.title }}</div>
          <div class="demo-stat-value">{{ item.value }}</div>
          <div class="demo-stat-desc">{{ item.desc }}</div>
        </a-card>
      </a-col>
      <a-col :span="24">
        <a-card title="销售趋势" :bordered="false">
          <div class="demo-chart-placeholder">此处可放置图表 / 表格等内容</div>
        </a-card>
      </a-col>
    </a-row>
  </a-pro-layout>
</template>
<script lang="ts" setup>
import { h, ref } from 'vue';
import {
  BellOutlined,
  DashboardOutlined,
  FormOutlined,
  SearchOutlined,
  SmileOutlined,
  TableOutlined,
  UserOutlined,
} from '@ant-design/icons-vue';

const collapsed = ref(false);
const selectedKeys = ref<string[]>(['analysis']);
const openKeys = ref<string[]>(['dashboard']);

const menuData = [
  { key: 'welcome', icon: () => h(SmileOutlined), label: '欢迎', title: '欢迎' },
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
.demo-stat-title,
.demo-stat-desc {
  color: rgba(0, 0, 0, 0.45);
}
.demo-stat-value {
  margin: 8px 0;
  color: rgba(0, 0, 0, 0.88);
  font-size: 24px;
  line-height: 32px;
}
.demo-stat-desc {
  font-size: 12px;
}
.demo-chart-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 220px;
  color: rgba(0, 0, 0, 0.45);
  background: linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%);
  border-radius: 6px;
}
</style>
