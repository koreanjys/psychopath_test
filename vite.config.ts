import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2015',
    rollupOptions: {
      input: {
        main: './index.html',
        ko: './ko.html'
      },
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          i18n: ['react-i18next', 'i18next', 'i18next-browser-languagedetector']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
