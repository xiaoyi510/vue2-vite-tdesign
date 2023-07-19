import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue2'
import path from 'node:path'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { TDesignResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import WindiCSS from 'vite-plugin-windicss'


const config = defineConfig({
  resolve: {
    alias: {
      '@': `${path.resolve(__dirname, 'src')}`,
    },
  },

  build: {
    minify: true,
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
  ],

  server: {
    port: 28001,
  },
})

export default config
