---
name: antd-page-gen
version: 1.0.0
description: '用 @czxingyu/ant-design-vue 生成或改写 Vue 页面（后台 CRUD、查询表格、表单、弹窗等）。写任何 antd 组件前必须先用 antd-cli 查 API 与 demo，禁止编造 props。'
metadata:
  requires:
    bins: ['antd-cli']
---

# antd-page-gen

生成/改写基于本组件库的业务页面时使用本 Skill。布局壳子另见 `antd-layout`；安装与 fork 差异见 `antd-shared`。

## 强制流程（写代码前必须完成）

对每个将要用到的组件：

```text
1) antd-cli components search <关键词> --json
2) antd-cli components get <name> --section api --json
3) antd-cli demos list <name> --json
4) antd-cli demos get <name>/<demo> --json
确认 API 与示例后再生成 .vue
```

也可先读本地精简摘要（若存在）：

- `skills/antd-page-gen/references/<name>.md`
- 或：`antd-cli skills read antd-page-gen/references/<name>.md`

摘要不够时再 `components get`。

## 禁止事项

- 禁止凭训练记忆编造 props、事件名、插槽名
- 禁止假设官方 ant-design-vue 与本 fork API 完全一致
- 禁止在未 `demos get` 的情况下从零手写复杂 Table/Form/ProLayout

## 典型页面套路

### 查询表格页

1. 布局：`antd-layout` + `demos get layout/nav-pro`（或 nav-side/mix）
2. 查询区：`Form` + `Input` / `Select` / `DatePicker`
3. 列表：`Table`（列、分页、rowKey）
4. 操作：`Button`、`Modal` / `Drawer`

```bash
antd-cli components get form --section api --json
antd-cli components get table --section api --json
antd-cli demos list table --json
```

### 表单页 / 弹窗表单

```bash
antd-cli components get form --json
antd-cli components get modal --json
antd-cli demos get form/basic --json   # demo id 以 demos list 为准
```

### 选择器 / 人员

```bash
antd-cli components get select --json
antd-cli components search PersonSelect --json
```

## 输出约定

- 生成可运行的 Vue 3 SFC（`<script setup lang="ts">` 优先，除非项目另有约定）
- 组件从 `@czxingyu/ant-design-vue` 引入
- props 名称与类型以 CLI 返回的 API 表为准
- 不确定的行为用 demo 源码对齐，再改业务字段

## 高频组件 references

优先阅读（由索引生成，勿手改）：

layout、form、table、select、button、modal、drawer、date-picker、input、message
