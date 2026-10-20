import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(__dirname, 'src');

// src/index.html (ポータル) + src/<slug>/index.html (各ダッシュボード)
// + src/<slug>/<sub>/index.html (サブページ) を自動でエントリに登録する。
// "_" で始まるフォルダ (例: _template) と index.html のないフォルダは対象外。
function discoverPages() {
  const inputs: Record<string, string> = { index: resolve(root, 'index.html') };
  const dirs = (dir: string) =>
    readdirSync(dir, { withFileTypes: true }).filter((e) => e.isDirectory() && !e.name.startsWith('_'));
  for (const entry of dirs(root)) {
    const html = resolve(root, entry.name, 'index.html');
    if (!existsSync(html)) continue;
    inputs[entry.name] = html;
    for (const sub of dirs(resolve(root, entry.name))) {
      const subHtml = resolve(root, entry.name, sub.name, 'index.html');
      if (existsSync(subHtml)) inputs[`${entry.name}/${sub.name}`] = subHtml;
    }
  }
  return inputs;
}

export default defineConfig({
  root,
  // GitHub Pages: https://kentarooishi-collab.github.io/dashboard/
  base: process.env.BASE_PATH ?? '/dashboard/',
  plugins: [react()],
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: { input: discoverPages() },
  },
});
