import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  },
  build: {
    // Production build optimizations
    minify: 'esbuild',
    target: 'es2015',
    cssCodeSplit: true,
    // Generate sourcemaps for debugging (can be set to false for smaller builds)
    sourcemap: false,
    // Optimize chunk size
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks for better caching
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'i18n-vendor': ['i18next', 'react-i18next'],
          'ui-vendor': ['framer-motion', 'lucide-react']
        }
      }
    },
    // Increase chunk size warning limit (default is 500kb)
    chunkSizeWarningLimit: 1000
  },
  preview: {
    port: 4173,
    host: true,
    strictPort: false
  }
})
