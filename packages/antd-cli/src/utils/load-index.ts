import fs from 'node:fs';
import path from 'node:path';
import type { ComponentsIndex } from '../indexer/types';

export function getPackageRoot(): string {
  let dir = __dirname;
  while (true) {
    const pkgFile = path.join(dir, 'package.json');
    if (fs.existsSync(pkgFile)) {
      try {
        const pkg = JSON.parse(fs.readFileSync(pkgFile, 'utf8')) as { name?: string };
        if (pkg.name === '@czxingyu/antd-cli') return dir;
      } catch {
        /* ignore invalid package.json */
      }
    }
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  // dist/index.js -> package root (fallback)
  return path.resolve(__dirname, '..');
}

export function loadIndex(): ComponentsIndex {
  const file = path.join(getPackageRoot(), 'data', 'components-index.json');
  if (!fs.existsSync(file)) {
    throw new Error(
      `Missing components index at ${file}. Run \`npm run build\` in packages/antd-cli first.`,
    );
  }
  return JSON.parse(fs.readFileSync(file, 'utf8')) as ComponentsIndex;
}

export function findComponent(index: ComponentsIndex, name: string) {
  const key = name.toLowerCase();
  return index.components.find(
    c =>
      c.name.toLowerCase() === key ||
      c.title?.toLowerCase() === key ||
      c.subtitle?.toLowerCase() === key,
  );
}
