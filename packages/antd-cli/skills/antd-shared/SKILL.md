---
name: antd-shared
version: 1.0.0
description: '@czxingyu/ant-design-vue 安装、引入、主题与 fork 差异。当用户要在 Vue3 项目使用该组件库、配置 ConfigProvider、或对比官方 ant-design-vue 时使用。'
metadata:
  requires:
    bins: ['antd-cli']
---

# antd-shared

> 生成页面或调用组件前，先阅读本 Skill；查具体 API / demo 用 CLI，禁止凭记忆编造 props。

## 包信息

| 项     | 值                                      |
| ------ | --------------------------------------- |
| npm    | `@czxingyu/ant-design-vue`              |
| CLI    | `@czxingyu/antd-cli`（命令 `antd-cli`） |
| 技术栈 | Vue 3                                   |

```bash
npm i @czxingyu/ant-design-vue
# Agent 文档查询
npm i -g @czxingyu/antd-cli
# Skills：npm i -D @czxingyu/antd-cli && npx skills experimental_sync -y
antd-cli version --json
```

## 引入方式

```ts
// 全量（示例）
import Antd from '@czxingyu/ant-design-vue';
import '@czxingyu/ant-design-vue/dist/reset.css'; // 按项目实际样式入口
app.use(Antd);

// 推荐按需
import { Button, Table, Form, ProLayout } from '@czxingyu/ant-design-vue';
```

样式以项目现有 Vite/Webpack 配置为准；不确定时先看业务仓库已有引入，不要擅自改全局 CSS 方案。

## ConfigProvider

主题、国际化、组件默认值走 `ConfigProvider`：

```vue
<a-config-provider :locale="zhCN" :theme="{ token: { colorPrimary: '#1677ff' } }">
  <router-view />
</a-config-provider>
```

## 相对官方 ant-design-vue 的增强（fork）

写页面时优先考虑这些能力（详情用 CLI 查文档）：

| 能力           | 说明                                              |
| -------------- | ------------------------------------------------- |
| `ProLayout`    | 后台壳：`layout=side\|top\|mix`，`splitMenus`     |
| `Splitter`     | 分割面板                                          |
| `PersonSelect` | Select 人员选择                                   |
| Table          | 虚拟滚动、列宽/行高拖拽、拖拽排序等（以文档为准） |
| Button         | `color` + `variant`                               |
| DatePicker     | YearQuarterMonth 等扩展（以文档为准）             |

```bash
antd-cli components search ProLayout --json
antd-cli components get layout --json
antd-cli components get select --json
```

## Agent 铁律

1. **先查后写**：任何组件 props / 事件 / 插槽，以 `antd-cli components get <name> --section api --json` 为准。
2. **先看示例**：`antd-cli demos list <name>` → `demos get <name>/<id>`。
3. **版本对齐**：`antd-cli version --json` 中的 `libVersion` 应与项目 `package.json` 依赖一致。
4. 不要使用未在索引中出现的组件名或臆造 API。
