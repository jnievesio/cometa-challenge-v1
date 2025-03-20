import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
  ],
  define: {
    'process.env': {},
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@config': resolve(__dirname, '../config.json')
    }
  }
});
