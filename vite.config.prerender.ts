// A vite config for building a script used to pre-render some pages so Google can index them.
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    ssr: 'scripts/prerender.tsx',
    outDir: 'dist/prerender',
    rollupOptions: {
      external: ['maplibre-gl'],
      output: {
        entryFileNames: 'prerender.js',
      },
    },
  },
});
