import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import autoprefixer from 'autoprefixer';
import commonjs from '@rollup/plugin-commonjs';

export default defineConfig({
  base: './',
  build: {
    outDir: 'build',
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer(),
      ],
    },
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    force: true,
    include: ['use-sync-external-store/with-selector'],
    exclude: ['react-redux'],
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  plugins: [
    react(),
    commonjs(),
  ],
  resolve: {
    alias: [
      {
        find: 'src/',
        replacement: `${path.resolve(__dirname, 'src')}/`,
      },
    ],
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.scss'],
  },
  server: {
    port: 5173,
    proxy: {
      // Your proxy settings go here
    },
  },
});
