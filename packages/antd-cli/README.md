# @czxingyu/antd-cli

给 AI 用的套件：一条命令安装组件库 + MCP + Skills。  
**查 API / demo 只走 MCP**；人看组件文档站。本包不再提供文档查询 CLI。

## 业务项目：一条命令

在 **Vue 项目根目录**执行：

```bash
npx @czxingyu/antd-cli@latest setup
```

会自动：

1. 安装 `@czxingyu/ant-design-vue`（组件库）
2. 安装 `@czxingyu/antd-cli`（MCP，devDependency）
3. 写入 MCP 配置：
   - `.cursor/mcp.json`（Cursor）
   - `.mcp.json`（Qoder / Claude Code 等）
   - `.vscode/mcp.json`（VS Code Copilot Agent）
4. 复制 Agent Skills 到 `.cursor/skills/`
5. 写入 / 更新 `AGENTS.md`（告诉 AI 先查 MCP 再写页面）

然后打开 Cursor **Settings → MCP**，确认 `antd-vue` 已连接；必要时 Reload Window。

### 升级（组件库 + MCP 一起）

```bash
npx @czxingyu/antd-cli@latest upgrade
```

MCP 指向项目里的 `node_modules/@czxingyu/antd-cli`，升级后文档索引一起更新。

可选参数：`--skip-install` / `--skip-mcp` / `--skip-skills` / `--skip-agents` / `--force`

套件入口（安装/升级，不是查文档）：

```bash
npx @czxingyu/antd-cli setup
npx @czxingyu/antd-cli upgrade
npx @czxingyu/antd-cli mcp    # 由编辑器拉起，一般不用手跑
```

## MCP 工具

| 工具                         | 用途                                 |
| ---------------------------- | ------------------------------------ |
| `get-version`                | 文档索引版本，对齐项目依赖           |
| `get-component-list`         | 全部组件列表                         |
| `search-components`          | 中英文关键词搜索（表格、ProLayout…） |
| `get-component-docs`         | 何时使用、API、demo 列表（可批量）   |
| `list-demos`                 | 某组件的 demo id                     |
| `get-component-demo`         | demo 完整 Vue 源码                   |
| `list-skills` / `read-skill` | 内置 Agent Skills 与高频组件摘要     |

Prompt：`generate-antd-page`（生成/改写页面时走强制查询流程）。

手动写 MCP 配置（`setup` 已写好则不用）。同一进程，只是文件路径不同：

Cursor（`.cursor/mcp.json`）/ Qoder（`.mcp.json`）：

```json
{
  "mcpServers": {
    "antd-vue": {
      "command": "node",
      "args": ["${workspaceFolder}/node_modules/@czxingyu/antd-cli/dist/mcp.js"]
    }
  }
}
```

VS Code（`.vscode/mcp.json`，注意根键是 `servers`）：

```json
{
  "servers": {
    "antd-vue": {
      "type": "stdio",
      "command": "node",
      "args": ["${workspaceFolder}/node_modules/@czxingyu/antd-cli/dist/mcp.js"]
    }
  }
}
```

本地调试 MCP：

```bash
cd packages/antd-cli
npm install
npm run build
npx @modelcontextprotocol/inspector node dist/mcp.js
```

## Skills

只保留一个 Skill：`antd-vue`。它不包含组件 API，只告诉 AI 如何用 MCP 查找。

```text
search-components → get-component-docs → list-demos → get-component-demo
→ 再写 .vue
```

`setup` / `upgrade` 会把该 Skill 同步到项目 `.cursor/skills/`（并清掉旧的拆分 Skill）。

## 本地开发（本 monorepo）

```bash
cd packages/antd-cli
npm install
npm run build   # 生成 data/components-index.json + dist
node bin/antd-cli.js mcp
```

索引 `libVersion` 取自仓库根 `package.json` 的 `version`，须与发布的 `@czxingyu/ant-design-vue` 对齐。

本仓库 `.cursor/mcp.json` 指向本地 `packages/antd-cli/dist/mcp.js`，供开发自测，不要对这个仓库跑 `setup`（会拒绝；确有需要才 `--force`）。

## 设计边界

- **做**：MCP 查询真源 API/demo、Skills、业务项目一键安装/升级
- **不做**：给人用的文档查询 CLI（请看文档站）、从零生成业务脚手架
