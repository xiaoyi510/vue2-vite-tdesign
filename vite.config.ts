import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue2'
import path from 'node:path'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { TDesignResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { loadEnv } from 'vite'
import { createSvgPlugin } from 'vite-plugin-vue2-svg'
import WindiCSS from 'vite-plugin-windicss'


const CWD = process.cwd();

export default  ({ mode }) => {

  const { VITE_BASE_URL } = loadEnv(mode, CWD);
  
  return {
    resolve: {
      alias: {
        '@': `${path.resolve(__dirname, 'src')}`,
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {},
        },
      },
    },
    build: {
      minify: true,
      
      cssCodeSplit: false,
    },
  
    plugins: [
      vue(),
      WindiCSS(),
      Components({
        resolvers: [
          IconsResolver({
            componentPrefix: 'x-icon',
          }),
        ],
        dts: 'src/components.d.ts',
      }),
      Icons(),
      AutoImport({
        imports: ['@vueuse/core'],
        dts: 'src/auto-imports.d.ts',
      }),
      AutoImport({
        resolvers: [TDesignResolver()],
      }),
      Components({
        resolvers: [TDesignResolver()],
      }),
  
      legacy({
        targets: ['ie >= 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      }),
      createSvgPlugin(),
    ],
  
    server: {
      host: '0.0.0.0',
      port: 28001,
      proxy: {
        '/api': {
          // 用于开发环境下的转发请求
          // 更多请参考：https://vitejs.dev/config/#server-proxy
          target:  VITE_BASE_URL,//'https://service-exndqyuk-1257786608.gz.apigw.tencentcs.com',
          changeOrigin: true,
        },
      },
  
    },
  }
}
