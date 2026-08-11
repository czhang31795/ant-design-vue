import fs from 'node:fs';
import path from 'node:path';
import type { ComponentsIndex } from '../indexer/types';

export function getPackageRoot(): string {
  // dist/index.js -> package root
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
