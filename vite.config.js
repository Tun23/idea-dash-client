import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^~(.*)$/,
        replacement: '$1',
      },
      { find: '@', replacement: path.resolve(__dirname, './src') },
    ],
  },
  plugins: [vue()],
})
