/**
 * Switch Vue component prefix from a- to xy-.
 * 1) install() uses registerComponent
 * 2) name/displayName AFoo -> XyFoo
 */
const fs = require('fs');
const path = require('path');

const componentsRoot = path.resolve(__dirname, '../components');
const repoRoot = path.resolve(__dirname, '..');

function walk(dir, acc = [], skip = new Set(['__tests__', 'node_modules', 'es', 'lib', 'dist'])) {
  if (!fs.existsSync(dir)) return acc;
  for (const name of fs.readdirSync(dir)) {
    if (skip.has(name)) continue;
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full, acc, skip);
    else acc.push(full);
  }
  return acc;
}

function relImport(fromFile) {
  const fromDir = path.dirname(fromFile);
  let rel = path
    .relative(fromDir, path.join(componentsRoot, '_util/registerComponent'))
    .replace(/\\/g, '/');
  if (!rel.startsWith('.')) rel = `./${rel}`;
  return rel;
}

function rewriteInstall(file) {
  if (!/\.(ts|tsx|js|jsx)$/.test(file)) return false;
  if (file.endsWith(`${path.sep}type.ts`) || file.endsWith(`${path.sep}registerComponent.ts`)) {
    return false;
  }
  let src = fs.readFileSync(file, 'utf8');
  if (!src.includes('app.component(')) return false;

  const next = src.replace(
    /app\.component\(([^,]+),\s*([^)]+)\)/g,
    (_m, _nameExpr, compExpr) => `registerComponent(app, ${compExpr.trim()})`,
  );
  if (next === src) return false;
  src = next;

  if (!/registerComponent/.test(src) || !/from ['"].*registerComponent['"]/.test(src)) {
    const importPath = relImport(file);
    const line = `import { registerComponent } from '${importPath}';\n`;
    if (/from ['"]vue['"]/.test(src)) {
      src = src.replace(/(import type \{[^}]+\} from ['"]vue['"];\r?\n)/, `$1${line}`);
      if (!src.includes(`from '${importPath}'`)) {
        src = line + src;
      }
    } else {
      src = line + src;
    }
  }

  fs.writeFileSync(file, src);
  return true;
}

function renameComponentNames(file) {
  if (!/\.(ts|tsx|js|jsx)$/.test(file)) return false;
  if (file.includes(`${path.sep}__tests__${path.sep}`)) return false;
  let src = fs.readFileSync(file, 'utf8');
  const next = src
    .replace(/\bname:\s*'A([A-Z])/g, "name: 'Xy$1")
    .replace(/\bname:\s*"A([A-Z])/g, 'name: "Xy$1')
    .replace(/\bdisplayName:\s*'A([A-Z])/g, "displayName: 'Xy$1")
    .replace(/\bdisplayName:\s*"A([A-Z])/g, 'displayName: "Xy$1');
  if (next === src) return false;
  fs.writeFileSync(file, next);
  return true;
}

function rewriteTags(file) {
  if (!/\.(vue|md)$/.test(file)) return false;
  let src = fs.readFileSync(file, 'utf8');
  const next = src.replace(/<\/?a-/g, m => m.replace('a-', 'xy-'));
  if (next === src) return false;
  fs.writeFileSync(file, next);
  return true;
}

let n1 = 0;
let n2 = 0;
for (const file of walk(componentsRoot)) {
  if (rewriteInstall(file)) n1 += 1;
  if (renameComponentNames(file)) n2 += 1;
}
console.log('install rewritten:', n1);
console.log('names renamed:', n2);

const globalDts = path.join(repoRoot, 'typings/global.d.ts');
let dts = fs.readFileSync(globalDts, 'utf8');
dts = dts.replace(/^(\s+)A([A-Z])/gm, '$1Xy$2');
fs.writeFileSync(globalDts, dts);
console.log('updated typings/global.d.ts');

const gen = path.join(repoRoot, 'antd-tools/generator-types/index.js');
fs.writeFileSync(gen, fs.readFileSync(gen, 'utf8').replace("tagPrefix: 'a-'", "tagPrefix: 'xy-'"));
console.log('updated generator tagPrefix');

let tagFiles = 0;
for (const dir of [
  path.join(componentsRoot),
  path.join(repoRoot, 'site/src'),
  path.join(repoRoot, 'packages/antd-cli'),
]) {
  for (const file of walk(dir)) {
    if (rewriteTags(file)) tagFiles += 1;
  }
}
console.log('tag files rewritten:', tagFiles);
