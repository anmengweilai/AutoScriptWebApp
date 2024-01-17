import {defineConfig} from '@umijs/max';
import {resolve} from 'path';

export default defineConfig({
  npmClient: 'pnpm',
  mpa: {
    layout: '@/layouts/BasicLayout',
  },
  initialState: {},
  model: {},
   locale: {
    default: 'zh-CN',
    antd: true,
  },
  fastRefresh: true,
  antd: {},
  outputPath: resolve(__dirname, '../main/dist/renderer'),
  monorepoRedirect: {},

});
