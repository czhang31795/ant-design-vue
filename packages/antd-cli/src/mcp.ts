import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import {
  QueryError,
  getComponentsDocs,
  getDemo,
  getVersion,
  listComponents,
  listDemos,
  listSkills,
  readSkill,
  searchComponents,
  type DocSection,
} from './lib/query';

const LIB = '@czxingyu/ant-design-vue';

function text(data: unknown) {
  return {
    content: [{ type: 'text' as const, text: JSON.stringify(data, null, 2) }],
  };
}

function fail(err: unknown) {
  const message = err instanceof Error ? err.message : String(err);
  return {
    isError: true,
    content: [{ type: 'text' as const, text: message }],
  };
}

function wrap<T>(fn: () => T) {
  try {
    return text(fn());
  } catch (err) {
    return fail(err instanceof QueryError ? err : err);
  }
}

function createServer() {
  const version = (() => {
    try {
      return getVersion().cliVersion as string;
    } catch {
      return '0.0.0';
    }
  })();

  const server = new McpServer({
    name: 'antd-vue',
    version,
  });

  server.registerTool(
    'get-version',
    {
      description: `返回 ${LIB} 的文档索引版本。写页面前用来核对与项目 package.json 依赖是否一致。`,
      inputSchema: {},
    },
    async () => wrap(() => getVersion()),
  );

  server.registerTool(
    'get-component-list',
    {
      description: `获取 ${LIB} 全部组件列表（名称、中文名、分类、demo 数量）。适用：不知道用哪个组件、需要组合多个组件实现功能。`,
      inputSchema: {
        category: z
          .string()
          .optional()
          .describe('按 category/type 过滤，例如 Data Display、Layout、反馈'),
      },
    },
    async ({ category }) => wrap(() => listComponents(category)),
  );

  server.registerTool(
    'search-components',
    {
      description: `按中英文关键词搜索 ${LIB} 组件。不确定组件名时先搜，例如：表格、布局、人员、ProLayout、Splitter。禁止凭记忆猜测 fork 独有组件。`,
      inputSchema: {
        query: z.string().describe('中文或英文关键词，如 表格、PersonSelect、splitMenus'),
      },
    },
    async ({ query }) => wrap(() => searchComponents(query)),
  );

  server.registerTool(
    'get-component-docs',
    {
      description: `获取 ${LIB} 组件文档（何时使用、API、demo 列表）。写任何组件代码前必须调用，禁止编造 props / 事件 / 插槽。支持一次查多个组件。`,
      inputSchema: {
        names: z
          .array(z.string())
          .min(1)
          .describe('组件名，如 table、form、layout、select。可用中文名或英文 name'),
        section: z
          .enum(['api', 'when', 'demos', 'all'])
          .optional()
          .describe('默认 all。仅需 props 表时用 api，仅需示例列表时用 demos'),
      },
    },
    async ({ names, section }) =>
      wrap(() => getComponentsDocs(names, (section || 'all') as DocSection)),
  );

  server.registerTool(
    'list-demos',
    {
      description: `列出某组件的全部 demo id 与标题。写复杂 Table / Form / Layout 前先 list，再 get-component-demo 取源码。`,
      inputSchema: {
        name: z.string().describe('组件名，如 layout、table、form'),
      },
    },
    async ({ name }) => wrap(() => listDemos(name)),
  );

  server.registerTool(
    'get-component-demo',
    {
      description: `获取 ${LIB} 某个 demo 的完整 Vue 源码。适用：代码生成时对照官方示例，尤其是 ProLayout、Table、Form。demo id 以 list-demos 为准。`,
      inputSchema: {
        component: z.string().describe('组件名，如 layout、table'),
        demoId: z.string().describe('demo id，如 nav-pro、basic，不要加 .vue 后缀'),
      },
    },
    async ({ component, demoId }) => wrap(() => getDemo(component, demoId)),
  );

  server.registerTool(
    'list-skills',
    {
      description: `列出 ${LIB} 内置 Agent Skill。通常只有 antd-vue：说明如何用 MCP 查组件。`,
      inputSchema: {},
    },
    async () => wrap(() => listSkills()),
  );

  server.registerTool(
    'read-skill',
    {
      description: `读取内置 Skill。传入 antd-vue 即可。组件 API 请用 get-component-docs，不要靠 Skill 里的摘要。`,
      inputSchema: {
        name: z.string().describe('技能名，如 antd-vue'),
      },
    },
    async ({ name }) => wrap(() => readSkill(name)),
  );

  server.registerPrompt(
    'generate-antd-page',
    {
      description: `生成或改写基于 ${LIB} 的 Vue 页面时使用。会要求 Agent 先查 MCP 文档再写代码。`,
      argsSchema: {
        task: z.string().describe('用户要做的页面，例如：带筛选的用户表格 + 新建弹窗'),
      },
    },
    async ({ task }) => ({
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: [
              `请用 ${LIB} 完成：${task}`,
              '',
              '强制流程：',
              '1. 调用 get-version，确认索引版本与项目依赖一致',
              '2. 对每个将使用的组件：search-components → get-component-docs',
              '3. Table / Form / Layout / Modal 必须 list-demos 后 get-component-demo 对照源码',
              '4. 布局壳用 ProLayout：get-component-demo layout/nav-pro（或 nav-side、nav-mix）',
              '5. 从 @czxingyu/ant-design-vue 引入；禁止编造 props、事件、插槽',
              '6. 输出可运行的 Vue 3 SFC（<script setup lang="ts"> 优先）',
            ].join('\n'),
          },
        },
      ],
    }),
  );

  return server;
}

async function main() {
  const server = createServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error(`${LIB} MCP server running on stdio`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
