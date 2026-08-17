/**
 * Switch default CSS class prefix from ant- to xy- so this fork can
 * coexist with official ant-design-vue on the same page.
 *
 * Keeps:
 * - ant-design / ant-design-vue package names
 * - anticon icon classes
 * - @ant-prefix / ant-prefix less token key
 */
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const SKIP_DIRS = new Set([
  '.git',
  '.cursor',
  'node_modules',
  'dist',
  'es',
  'lib',
  'coverage',
  '.vite',
  '.cache',
]);
const SKIP_FILES = new Set([
  'CHANGELOG.en-US.md',
  'CHANGELOG.zh-CN.md',
  'package-lock.json',
  'yarn.lock',
  'pnpm-lock.yaml',
  'rewrite-css-prefix.cjs',
]);
const TEXT_EXT = new Set([
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.cjs',
  '.mjs',
  '.vue',
  '.css',
  '.less',
  '.md',
  '.json',
  '.snap',
  '.html',
  '.txt',
]);

function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full, acc);
    else acc.push(full);
  }
  return acc;
}

function rewriteCssPrefix(src) {
  // Preserve less token key; only the value should become xy.
  src = src.replace(/'ant-prefix':\s*'ant'/g, "'ant-prefix': 'xy'");
  src = src.replace(/"ant-prefix":\s*"ant"/g, '"ant-prefix": "xy"');
  // ant-design / ant-prefix stay; anticon has no hyphen.
  return src.replace(/\bant-(?!design(?:-vue)?\b|prefix\b)/g, 'xy-');
}

function patchDefaults() {
  const indexFile = path.join(repoRoot, 'components/config-provider/index.tsx');
  let indexSrc = fs.readFileSync(indexFile, 'utf8');
  indexSrc = indexSrc.replace(
    "export const defaultPrefixCls = 'ant';",
    "export const defaultPrefixCls = 'xy';",
  );
  indexSrc = indexSrc.replace(
    "const { prefixCls = 'ant' } = props;",
    'const { prefixCls = defaultPrefixCls } = props;',
  );
  fs.writeFileSync(indexFile, indexSrc);

  const contextFile = path.join(repoRoot, 'components/config-provider/context.ts');
  let contextSrc = fs.readFileSync(contextFile, 'utf8');
  contextSrc = contextSrc.replace(
    "return suffixCls ? `ant-${suffixCls}` : 'ant';",
    "return suffixCls ? `xy-${suffixCls}` : 'xy';",
  );
  fs.writeFileSync(contextFile, contextSrc);
}

function patchDocs() {
  const files = [
    path.join(repoRoot, 'components/config-provider/index.zh-CN.md'),
    path.join(repoRoot, 'components/config-provider/index.en-US.md'),
  ];
  for (const file of files) {
    let src = fs.readFileSync(file, 'utf8');
    src = src.replace(/prefixCls: 'ant'/g, "prefixCls: 'xy'");
    src = src.replace(/ref\('ant'\)/g, "ref('xy')");
    src = src.replace('| string | `ant` |', '| string | `xy` |');
    src = src.replace('| string | ant |', '| string | xy |');
    fs.writeFileSync(file, src);
  }
}

patchDefaults();
patchDocs();

const files = walk(repoRoot);
let changed = 0;
for (const file of files) {
  if (SKIP_FILES.has(path.basename(file))) continue;
  if (!TEXT_EXT.has(path.extname(file))) continue;
  const src = fs.readFileSync(file, 'utf8');
  const next = rewriteCssPrefix(src);
  if (next !== src) {
    fs.writeFileSync(file, next);
    changed += 1;
  }
}

console.log(`rewrote css prefix in ${changed} files`);
