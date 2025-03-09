import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import VueRouter from 'unplugin-vue-router/vite'

const root = process.cwd()

const pathResolve = (path: string) => {
  return resolve(root, path)
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      routesFolder: 'src/pages',
      routeBlockLang: 'json5',
    }),
    vue(),
    AutoImport({
      imports: ['vue', 'pinia'],
      dts: './auto-imports.d.ts',
    }),
    Components({
      dts: './components.d.ts',
      resolvers: [
        AntDesignVueResolver({
          importStyle: false,
        }),
      ],
    }),
    UnoCSS(),
  ],
  resolve: {
    alias: {
      '@': pathResolve('src'),
    },
  },
})
