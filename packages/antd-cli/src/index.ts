import fs from 'node:fs';
import path from 'node:path';
import { cac } from 'cac';
import { findComponent, getPackageRoot, loadIndex } from './utils/load-index';
import { fail, printResult } from './utils/output';

const cli = cac('antd-cli');

cli.option('--json', 'Output JSON for agents');

cli
  .command('version', 'Show CLI and indexed library version')
  .action((options: { json?: boolean }) => {
    const pkg = JSON.parse(fs.readFileSync(path.join(getPackageRoot(), 'package.json'), 'utf8'));
    try {
      const index = loadIndex();
      printResult(
        {
          cliVersion: pkg.version,
          libName: index.libName,
          libVersion: index.libVersion,
          componentCount: index.components.length,
          generatedAt: index.generatedAt,
        },
        !!options.json,
      );
    } catch {
      printResult({ cliVersion: pkg.version, index: null }, !!options.json);
    }
  });

cli
  .command('components <action> [query]', 'list | search <q> | get <name>')
  .option('--section <section>', 'For get: api | when | demos | all', { default: 'all' })
  .option('--category <category>', 'For list: filter by category/type')
  .action(
    (
      action: string,
      query: string | undefined,
      options: { json?: boolean; section?: string; category?: string },
    ) => {
      const index = loadIndex();
      const act = action.toLowerCase();

      if (act === 'list') {
        let list = index.components.map(c => ({
          name: c.name,
          title: c.title,
          subtitle: c.subtitle,
          category: c.category,
          type: c.type,
          demoCount: c.demos.length,
          summary: c.summary.slice(0, 160),
        }));
        if (options.category) {
          const cat = options.category.toLowerCase();
          list = list.filter(
            c => (c.category || '').toLowerCase().includes(cat) || (c.type || '').includes(cat),
          );
        }
        if (options.json) {
          printResult({ libVersion: index.libVersion, count: list.length, components: list }, true);
          return;
        }
        for (const c of list) {
          process.stdout.write(
            `${c.name.padEnd(18)} ${(c.subtitle || c.title || '').padEnd(12)} ${c.type || ''}\n`,
          );
        }
        process.stdout.write(`\n${list.length} components (lib ${index.libVersion})\n`);
        return;
      }

      if (act === 'search') {
        if (!query) fail('Usage: antd-cli components search <query> --json');
        const q = query.toLowerCase();
        const hits = index.components
          .map(c => {
            const hay = [
              c.name,
              c.title,
              c.subtitle,
              c.type,
              c.summary,
              c.whenToUse,
              c.api,
              c.extras,
            ]
              .filter(Boolean)
              .join('\n')
              .toLowerCase();
            const score =
              (c.name.toLowerCase().includes(q) ? 10 : 0) +
              (c.subtitle?.toLowerCase().includes(q) ? 8 : 0) +
              (c.title?.toLowerCase().includes(q) ? 6 : 0) +
              (hay.includes(q) ? 3 : 0);
            return { c, score };
          })
          .filter(x => x.score > 0)
          .sort((a, b) => b.score - a.score)
          .map(({ c, score }) => ({
            name: c.name,
            title: c.title,
            subtitle: c.subtitle,
            type: c.type,
            score,
            summary: c.summary.slice(0, 200),
          }));

        if (options.json) {
          printResult({ query, count: hits.length, results: hits }, true);
          return;
        }
        if (!hits.length) {
          process.stdout.write(`No components matched "${query}"\n`);
          return;
        }
        for (const h of hits) {
          process.stdout.write(
            `${h.name.padEnd(18)} ${h.subtitle || h.title || ''}\n  ${h.summary}\n\n`,
          );
        }
        return;
      }

      if (act === 'get') {
        if (!query) fail('Usage: antd-cli components get <name> --json');
        const c = findComponent(index, query);
        if (!c) fail(`Component not found: ${query}. Try \`antd-cli components search ${query}\``);

        const section = (options.section || 'all').toLowerCase();
        const payload: Record<string, unknown> = {
          name: c.name,
          title: c.title,
          subtitle: c.subtitle,
          category: c.category,
          type: c.type,
          libVersion: index.libVersion,
        };

        if (section === 'all' || section === 'when') {
          payload.summary = c.summary;
          payload.whenToUse = c.whenToUse;
          if (c.extras) payload.extras = c.extras;
        }
        if (section === 'all' || section === 'api') {
          payload.api = c.api;
        }
        if (section === 'all' || section === 'demos') {
          payload.demos = c.demos.map(d => ({
            id: d.id,
            titleZh: d.titleZh,
            titleEn: d.titleEn,
            file: d.file,
          }));
        }

        if (options.json) {
          printResult(payload, true);
          return;
        }

        process.stdout.write(`# ${c.title || c.name}${c.subtitle ? ` ${c.subtitle}` : ''}\n\n`);
        if (payload.summary) process.stdout.write(`${payload.summary}\n\n`);
        if (payload.whenToUse) process.stdout.write(`## 何时使用\n\n${payload.whenToUse}\n\n`);
        if (payload.extras) process.stdout.write(`${payload.extras}\n\n`);
        if (payload.api) process.stdout.write(`## API\n\n${payload.api}\n\n`);
        if (payload.demos) {
          process.stdout.write(`## Demos\n\n`);
          for (const d of payload.demos as Array<{ id: string; titleZh?: string }>) {
            process.stdout.write(`- ${d.id}${d.titleZh ? ` — ${d.titleZh}` : ''}\n`);
          }
          process.stdout.write(`\nUse: antd-cli demos get ${c.name}/<id> --json\n`);
        }
        return;
      }

      fail(`Unknown components action: ${action}. Use list | search | get`);
    },
  );

cli
  .command('demos <action> <target>', 'list <name> | get <name>/<demo-id>')
  .action((action: string, target: string, options: { json?: boolean }) => {
    const index = loadIndex();
    const act = action.toLowerCase();

    if (act === 'list') {
      const c = findComponent(index, target);
      if (!c) fail(`Component not found: ${target}`);
      const demos = c.demos.map(d => ({
        id: d.id,
        titleZh: d.titleZh,
        titleEn: d.titleEn,
        file: d.file,
        descriptionZh: d.descriptionZh?.slice(0, 200),
      }));
      if (options.json) {
        printResult({ component: c.name, count: demos.length, demos }, true);
        return;
      }
      for (const d of demos) {
        process.stdout.write(`${d.id.padEnd(28)} ${d.titleZh || d.titleEn || ''}\n`);
      }
      return;
    }

    if (act === 'get') {
      const [name, demoId] = target.split('/');
      if (!name || !demoId) fail('Expected format: <component>/<demo-id>, e.g. layout/nav-pro');
      const c = findComponent(index, name);
      if (!c) fail(`Component not found: ${name}`);
      const demo = c.demos.find(d => d.id === demoId || d.id === demoId.replace(/\.vue$/, ''));
      if (!demo) {
        fail(
          `Demo not found: ${target}. Available: ${c.demos.map(d => d.id).join(', ') || '(none)'}`,
        );
      }
      if (options.json) {
        printResult(
          {
            component: c.name,
            id: demo.id,
            titleZh: demo.titleZh,
            titleEn: demo.titleEn,
            file: demo.file,
            descriptionZh: demo.descriptionZh,
            source: demo.source,
          },
          true,
        );
        return;
      }
      process.stdout.write(demo.source);
      if (!demo.source.endsWith('\n')) process.stdout.write('\n');
      return;
    }

    fail(`Unknown demos action: ${action}. Use list | get`);
  });

cli
  .command('skills <action> [name]', 'list | read <skill[/path]>')
  .action((action: string, name: string | undefined, options: { json?: boolean }) => {
    const skillsDir = path.join(getPackageRoot(), 'skills');
    if (!fs.existsSync(skillsDir)) fail('No skills directory in package');
    const act = action.toLowerCase();

    if (act === 'list') {
      const skills = fs
        .readdirSync(skillsDir, { withFileTypes: true })
        .filter(d => d.isDirectory())
        .map(d => {
          const skillFile = path.join(skillsDir, d.name, 'SKILL.md');
          let description = '';
          if (fs.existsSync(skillFile)) {
            const text = fs.readFileSync(skillFile, 'utf8');
            description = text.match(/^description:\s*["']?(.+?)["']?\s*$/m)?.[1] || '';
          }
          return { name: d.name, description };
        });
      if (options.json) {
        printResult({ count: skills.length, skills }, true);
        return;
      }
      for (const s of skills) {
        process.stdout.write(`${s.name}\n  ${s.description}\n\n`);
      }
      return;
    }

    if (act === 'read') {
      if (!name) fail('Usage: antd-cli skills read <name> [--json]');
      const [skillName, ...rest] = name.replace(/\\/g, '/').split('/');
      const rel = rest.length ? rest.join('/') : 'SKILL.md';
      const file = path.join(skillsDir, skillName, rel);
      const resolved = path.resolve(file);
      if (!resolved.startsWith(path.resolve(skillsDir))) fail('Invalid skill path');
      if (!fs.existsSync(resolved)) fail(`Skill file not found: ${skillName}/${rel}`);
      const content = fs.readFileSync(resolved, 'utf8');
      if (options.json) {
        printResult({ skill: skillName, path: rel, content }, true);
        return;
      }
      process.stdout.write(content);
      if (!content.endsWith('\n')) process.stdout.write('\n');
      return;
    }

    fail(`Unknown skills action: ${action}. Use list | read`);
  });

cli.help();
cli.parse();
