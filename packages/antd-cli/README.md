# @czxingyu/antd-cli

给 AI Agent 用的薄 CLI：从本仓库组件文档与 demo 查询**真源 API**，配合 Skills 生成准确的 Vue 页面。

## 安装

```bash
# 1) CLI（全局或项目本地均可）
npm i -g @czxingyu/antd-cli

# 2) Agent Skills
# 已发布到 npm 后：装包再同步 skills（推荐）
npm i -D @czxingyu/antd-cli
npx skills experimental_sync -y

# 或从本 monorepo / Git 仓库安装 Skills
npx skills add ./packages/antd-cli -y -g
# npx skills add https://github.com/<owner>/ant-design-vue/tree/main/packages/antd-cli -y -g
```

组件库本体：

```bash
npm i @czxingyu/ant-design-vue
```

## Skills

| Skill           | 用途                                    |
| --------------- | --------------------------------------- |
| `antd-shared`   | 包名、引入、ConfigProvider、fork 差异   |
| `antd-page-gen` | 生成/改写页面：**先查再写**             |
| `antd-layout`   | ProLayout / side\|top\|mix / splitMenus |

`antd-page-gen` 强制流程：

```text
antd-cli components search <关键词> --json
antd-cli components get <name> --section api --json
antd-cli demos get <name>/<demo> --json
→ 再写 .vue
```

高频组件精简摘要在 `skills/antd-page-gen/references/`（构建时从文档生成）。

## CLI

```bash
antd-cli version --json

antd-cli components list --json
antd-cli components search 表格 --json
antd-cli components get layout --section api --json
antd-cli components get select --json

antd-cli demos list layout --json
antd-cli demos get layout/nav-pro --json

antd-cli skills list --json
antd-cli skills read antd-page-gen
antd-cli skills read antd-page-gen/references/table.md
```

所有面向 Agent 的输出请加 `--json`。

## 本地开发（本 monorepo）

```bash
cd packages/antd-cli
npm install
npm run build   # 生成 data/components-index.json + references + dist
node bin/antd-cli.js components search ProLayout --json
```

索引 `libVersion` 取自仓库根 `package.json` 的 `version`，须与发布的 `@czxingyu/ant-design-vue` 对齐。

## 设计边界

- **做**：组件发现、API/demo 查询、Agent Skills 路由
- **不做**：业务脚手架 `create-app`、自动改用户仓库的代码生成器
