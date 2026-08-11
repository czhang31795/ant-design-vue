---
name: antd-layout
version: 1.0.0
description: '后台布局 / 侧栏 / 顶栏 / 混合导航 / ProLayout。当用户要侧边菜单、顶栏、mix 布局、splitMenus 或 Pro 风格壳子时使用；写布局前先用 antd-cli 查 layout API 与 demo。'
metadata:
  requires:
    bins: ['antd-cli']
---

# antd-layout

本库用 `ProLayout`（从 `@czxingyu/ant-design-vue` 导出）做后台壳，不要臆造不存在的 Layout API。

## 写布局前必查

```bash
antd-cli components get layout --section all --json
antd-cli demos list layout --json
antd-cli demos get layout/nav-pro --json
# 或 nav-side / nav-top / nav-mix
```

摘要：`antd-cli skills read antd-page-gen/references/layout.md`（若已生成）。

## 关键 props（以 CLI 文档为准，下列仅为导航线索）

| 能力     | 线索                                      |
| -------- | ----------------------------------------- |
| 布局模式 | `layout`: `side` \| `top` \| `mix`        |
| 菜单拆分 | `splitMenus`（mix 下顶栏一级 + 侧栏二级） |
| 宽度     | `siderWidth`                              |
| 折叠     | `collapsed` / `v-model:collapsed`         |
| 菜单数据 | `menu` / `menus` 等（以 API 表为准）      |

## 推荐 demo

| 场景       | demo              |
| ---------- | ----------------- |
| Pro 默认壳 | `layout/nav-pro`  |
| 侧栏       | `layout/nav-side` |
| 顶栏       | `layout/nav-top`  |
| 混合       | `layout/nav-mix`  |

```bash
antd-cli demos get layout/nav-side --json
antd-cli demos get layout/nav-mix --json
```

## 插槽

常见：`headerRight`、`footer`、默认内容区等——**以 `components get layout` 与 demo 源码为准**，勿编造插槽名。

## 与页面生成配合

1. 先用本 Skill + demo 搭好壳
2. 内容区再按 `antd-page-gen` 填 Form/Table
3. 路由、菜单 key 与业务 path 对齐

## 样式注意

ProLayout 依赖组件库内 `pro-layout` 样式；若页面样式异常，检查是否按项目方式正确引入 `@czxingyu/ant-design-vue` 样式，而不是手写一套冲突的 Layout CSS。
