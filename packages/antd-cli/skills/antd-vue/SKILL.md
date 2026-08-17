---
name: antd-vue
description: >-
  使用 @czxingyu/ant-design-vue 生成或改写 Vue 页面。写任何组件前必须用 antd-vue MCP 查 API 与 demo，禁止凭记忆编造 props。当用户提到 antd、Ant Design Vue、 ProLayout、表格、表单、后台布局时使用。
---

# antd-vue

人看用法请打开组件文档站。AI **只通过 MCP 服务器 `antd-vue` 查文档**，不要读本地组件摘要，也不要使用官方 `ant-design-vue` 的记忆。

包名：`@czxingyu/ant-design-vue`（Vue 3）。

## 查文档（每个组件都要走）

```text
1. search-components { query }          # 不确定英文名时先搜，如 表格、人员、布局
2. get-component-docs { names, section: "api" }
3. list-demos { name }
4. get-component-demo { component, demoId }
→ 再写 .vue
```

复杂 Table / Form / Modal / Layout 必须对照 demo 源码。禁止编造 props、事件、插槽。

## 容易找错的 fork 能力（先搜，再 get-docs / get-demo）

这些不是独立文档条目，或和官方库不同，用 MCP 按下面关键词查：

| 需求 | 搜什么 | 组件名 | 典型 demo |
| --- | --- | --- | --- |
| 后台壳 / 侧栏 / mix | ProLayout、布局 | `layout` | `nav-pro` / `nav-side` / `nav-top` / `nav-mix` |
| 人员选择 | 人员、PersonSelect | `select` | `select-person` |
| 分割面板 | Splitter | `splitter` | `list-demos` 为准 |
| 年季月同屏 | YearQuarterMonth | `date-picker` | `list-demos` 为准 |
| Table 虚拟滚动 / 列宽拖拽 | 虚拟、拖拽 | `table` | `list-demos` 为准 |

`get-version` 的 `libVersion` 须与项目 `package.json` 里的组件库版本一致。

## 输出

- Vue 3 SFC，优先 `<script setup lang="ts">`
- `import { Table, Form, ProLayout } from '@czxingyu/ant-design-vue'`
- 模板标签前缀是 **`xy-`**（`<xy-table>`、`<xy-button>`、`<xy-pro-layout>`），不要写 `a-`
- CSS class 前缀默认是 **`xy-`**（`xy-btn`、`xy-table`），不要写 `ant-btn`；图标仍是 `anticon`
- 不要引入 `ant-design-vue`
