import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    hmr: {
      host: 'localhost',
      clientPort: 5174,
      protocol: 'ws'
    },
    proxy: {
      '/posts': {
        target: 'http://backend:3000',
        changeOrigin: true
      },
      '/auth': {
        target: 'http://backend:3000',
        changeOrigin: true
      }
    }
  }
})