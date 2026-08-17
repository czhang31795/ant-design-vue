import { cac } from 'cac';
import { runProjectKit } from './lib/project-setup';
import { fail } from './utils/output';

const cli = cac('antd-cli');

type KitOptions = {
  force?: boolean;
  skipInstall?: boolean;
  skipMcp?: boolean;
  skipSkills?: boolean;
  skipAgents?: boolean;
};

function addKitOptions(command: ReturnType<typeof cli.command>) {
  return command
    .option('--force', 'Allow running inside the component-library repo')
    .option('--skip-install', 'Do not install npm packages')
    .option('--skip-mcp', 'Do not write MCP config')
    .option('--skip-skills', 'Do not copy Agent Skills')
    .option('--skip-agents', 'Do not write AGENTS.md');
}

addKitOptions(
  cli.command('setup', 'Install component library + MCP + skills into this project'),
).action((options: KitOptions) => {
  runProjectKit('setup', options);
});

addKitOptions(cli.command('upgrade', 'Update component library + MCP + skills to latest')).action(
  (options: KitOptions) => {
    runProjectKit('upgrade', options);
  },
);

addKitOptions(cli.command('update', 'Alias of upgrade')).action((options: KitOptions) => {
  runProjectKit('upgrade', options);
});

cli.command('mcp', 'Start MCP server on stdio (Cursor / Claude)').action(() => {
  fail('MCP is started via `antd-cli mcp` bin router. If you see this, rebuild the package.');
});

cli.help();
cli.parse();
