import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { ComponentEntry, ComponentsIndex, DemoEntry } from './types';

const CLI_ROOT = path.resolve(__dirname, '../..');
const REPO_ROOT = path.resolve(CLI_ROOT, '../..');
const COMPONENTS_DIR = path.join(REPO_ROOT, 'components');
const OUT_FILE = path.join(CLI_ROOT, 'data', 'components-index.json');

function readLibVersion(): string {
  const pkg = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, 'package.json'), 'utf8'));
  return pkg.version as string;
}

function extractSection(markdown: string, heading: string): string {
  const re = new RegExp(`##\\s+${heading}\\s*\\n([\\s\\S]*?)(?=\\n##\\s+|$)`, 'i');
  const m = markdown.match(re);
  return m ? m[1].trim() : '';
}

function extractSummary(markdown: string): string {
  // First non-empty paragraph after frontmatter body start, before first ##
  const body = markdown.replace(/^---[\s\S]*?---\s*/, '');
  const beforeH2 = body.split(/\n##\s+/)[0] || '';
  const lines = beforeH2
    .split(/\n/)
    .map(l => l.trim())
    .filter(Boolean)
    .filter(l => !l.startsWith('#') && !l.startsWith('!') && !l.startsWith('<'));
  return lines.slice(0, 3).join('\n');
}

function parseDocsBlock(source: string): {
  titleZh?: string;
  titleEn?: string;
  descriptionZh?: string;
  descriptionEn?: string;
} {
  const m = source.match(/<docs>([\s\S]*?)<\/docs>/);
  if (!m) return {};
  const docs = m[1].trim();
  try {
    const parsed = matter(docs);
    const data = parsed.data as Record<string, any>;
    const title = data.title;
    return {
      titleZh: typeof title === 'object' ? title['zh-CN'] : undefined,
      titleEn:
        typeof title === 'object' ? title['en-US'] : typeof title === 'string' ? title : undefined,
      descriptionZh: extractSection(docs, 'zh-CN') || undefined,
      descriptionEn: extractSection(docs, 'en-US') || undefined,
    };
  } catch {
    const titleZh = docs.match(/zh-CN:\s*(.+)/)?.[1]?.trim();
    const titleEn = docs.match(/en-US:\s*(.+)/)?.[1]?.trim();
    return { titleZh, titleEn };
  }
}

function collectDemos(componentDir: string, componentName: string): DemoEntry[] {
  const demoDir = path.join(componentDir, 'demo');
  if (!fs.existsSync(demoDir)) return [];
  return fs
    .readdirSync(demoDir)
    .filter(f => f.endsWith('.vue') && !f.startsWith('index.'))
    .sort()
    .map(file => {
      const full = path.join(demoDir, file);
      const source = fs.readFileSync(full, 'utf8');
      const meta = parseDocsBlock(source);
      const id = file.replace(/\.vue$/, '');
      return {
        id,
        file: `components/${componentName}/demo/${file}`,
        titleZh: meta.titleZh,
        titleEn: meta.titleEn,
        descriptionZh: meta.descriptionZh,
        descriptionEn: meta.descriptionEn,
        source,
      };
    });
}

function buildComponent(name: string): ComponentEntry | null {
  const dir = path.join(COMPONENTS_DIR, name);
  const mdPath = path.join(dir, 'index.zh-CN.md');
  if (!fs.existsSync(mdPath)) return null;

  const raw = fs.readFileSync(mdPath, 'utf8');
  const { data, content } = matter(raw);
  const whenToUse = extractSection(content, '何时使用');
  const api = extractSection(content, 'API');
  // Keep remaining useful sections briefly
  const extrasParts = ['ProLayout', '组件概述', '导航模式']
    .map(h => {
      const body = extractSection(content, h);
      return body ? `## ${h}\n\n${body}` : '';
    })
    .filter(Boolean);

  return {
    name,
    title: data.title as string | undefined,
    subtitle: data.subtitle as string | undefined,
    category: data.category as string | undefined,
    type: data.type as string | undefined,
    summary: extractSummary(content),
    whenToUse,
    api,
    extras: extrasParts.join('\n\n'),
    demos: collectDemos(dir, name),
  };
}

function main() {
  const names = fs
    .readdirSync(COMPONENTS_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory() && !d.name.startsWith('_') && !d.name.startsWith('.'))
    .map(d => d.name)
    .sort();

  const components: ComponentEntry[] = [];
  for (const name of names) {
    const entry = buildComponent(name);
    if (entry) components.push(entry);
  }

  const index: ComponentsIndex = {
    libName: '@czxingyu/ant-design-vue',
    libVersion: readLibVersion(),
    generatedAt: new Date().toISOString(),
    components,
  };

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify(index, null, 2), 'utf8');

  console.log(
    `Indexed ${components.length} components → ${path.relative(REPO_ROOT, OUT_FILE)} (lib ${
      index.libVersion
    })`,
  );
}

main();
