import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [react()],
  server: {
    port: 5173,
    // Proxy PocketBase API in dev so no CORS config needed
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8099',
        changeOrigin: true,
      },
      '/_': {
        target: 'http://127.0.0.1:8099',
        changeOrigin: true,
      },
    },
  },
})
