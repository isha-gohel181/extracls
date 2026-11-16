import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    react({ jsxRuntime: 'automatic' }),
    tailwindcss(),
  ],
  server: {
    host: true,
    port: 5173,
  },
  define: {
    global: 'globalThis'
  },
  resolve: {
    dedupe: ['react', 'react-dom', 'react-redux'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      'socket.io-client': 'socket.io-client/dist/socket.io.js',
    }
  },
  optimizeDeps: {
    include: ['socket.io-client', 'engine.io-client'],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // chunks
        }
      }
    }
  }
})