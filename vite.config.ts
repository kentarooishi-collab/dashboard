import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(__dirname, 'src');

// src/index.html (ポータル) + src/<slug>/index.html (各ダッシュボード) を自動でエントリに登録する。
// "_" で始まるフォルダ (例: _template) と shared / portal は対象外。
function discoverPages() {
  const inputs: Record<string, string> = { index: resolve(root, 'index.html') };
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name.startsWith('_')) continue;
    const html = resolve(root, entry.name, 'index.html');
    if (existsSync(html)) inputs[entry.name] = html;
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
