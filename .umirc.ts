import { defineConfig } from 'umi';

export default defineConfig({
  headScripts: [
    {
      src:
        'http://api.map.baidu.com/api?v=2.0&ak=8DOGFmiBanYw4Mgx3sROYPTxRNBX0rtg',
    },
  ],
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh: {},
});
