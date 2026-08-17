const { Client } = require('@modelcontextprotocol/sdk/client/index.js');
const { StdioClientTransport } = require('@modelcontextprotocol/sdk/client/stdio.js');
const path = require('node:path');

async function main() {
  const transport = new StdioClientTransport({
    command: process.execPath,
    args: [path.join(__dirname, '../dist/mcp.js')],
  });
  const client = new Client({ name: 'smoke', version: '0.0.0' });
  await client.connect(transport);

  const { tools } = await client.listTools();
  console.log('tools:', tools.map(t => t.name).join(', '));

  const search = await client.callTool({
    name: 'search-components',
    arguments: { query: '表格' },
  });
  const searchText = search.content[0].text;
  const searchJson = JSON.parse(searchText);
  console.log('search count:', searchJson.count, 'top:', searchJson.results?.[0]?.name);

  const docs = await client.callTool({
    name: 'get-component-docs',
    arguments: { names: ['button'], section: 'api' },
  });
  const docsJson = JSON.parse(docs.content[0].text);
  const api = docsJson.components?.[0]?.api || '';
  console.log('button api chars:', api.length, 'has color:', /color/.test(api));

  const demo = await client.callTool({
    name: 'get-component-demo',
    arguments: { component: 'layout', demoId: 'nav-pro' },
  });
  const demoJson = JSON.parse(demo.content[0].text);
  console.log('layout/nav-pro source chars:', demoJson.source?.length || 0);

  await client.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
