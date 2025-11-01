import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0', // Allow external connections
    port: 5174,
    // Configure to handle multiple domains
    proxy: {
      // This allows the dev server to handle subdomain requests
    }
  },
  preview: {
    host: '0.0.0.0',
    port: 4173
  }
})
