import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  return defineConfig({
    resolve: {
      alias: [
        {
          find: /^~(.*)$/,
          replacement: '$1',
        },
        { find: '@', replacement: path.resolve(__dirname, './src') },
        {
          find: '@SwiperBundle',
          replacement: path.resolve(__dirname, './node_modules/swiper/swiper-bundle.css'),
        },
        {
          find: 'viteChart',
          replacement: path.resolve(__dirname, './node_modules/chart.js'),
        },
      ],
    },
    server: { port: process.env.VITE_PORT },
    plugins: [vue()],
  })
}
