import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: ``
      }
    }
  },
  build: {
    target: 'es2015',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['lit', 'jszip'],
          virtualizer: ['lit-virtualizer']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
