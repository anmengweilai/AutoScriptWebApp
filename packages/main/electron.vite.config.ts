import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import { join } from 'node:path';
import { preload } from 'unplugin-auto-expose';
import {node as nodeVersion} from '../../.electron-vendors.cache.json'

const isDev = process.env.MODE !== 'development';

const target = `node${nodeVersion}`;

const externalPlugin = externalizeDepsPlugin();

export default defineConfig({
  main: {
    optimizeDeps: {
      include: ['linked-dep'],
    },
    resolve: {
      alias: {
        '@': join(__dirname, 'src/'),
        '@web-app/common': join(__dirname, '../common/src'),
      },
    },
    build: {
      commonjsOptions: {
        include: [/linked-dep/, /node_modules/],
      },
      ssr: true,
      sourcemap: 'inline',
      minify: !isDev,
      target,
      lib: {
        entry: 'src/index.ts',
      },
      outDir: 'dist/main',
      emptyOutDir: true,
    },
    plugins: [externalPlugin,],
  },
  preload: {
    build: {
      ssr: true,
      sourcemap: 'inline',
      target,
      minify: !isDev,
      lib: {
        entry: join(__dirname, '../preload/src/index.ts'),
      },
      outDir: 'dist/preload',
      emptyOutDir: true,
    },
    plugins: [preload.esbuild(), externalPlugin],
  },
  // 忽略 renderer 的构建
  renderer: {
    root: 'scripts',
    build: {
      rollupOptions: {
        input: 'scripts/zombieRender/index.html',
      },
      outDir: 'node_modules/.cache/electron-vite/renderer',
    },
  },
});
