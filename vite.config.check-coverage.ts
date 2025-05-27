// A vite config for building a script used to check unit test coverage together with v8.
// We use v8 instead of c8 because c8 encounters problems installing when developing on windows.
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'node18',
    ssr: 'scripts/check-coverage.tsx',
    outDir: 'dist/check-coverage',
    rollupOptions: {
      external: ['fs', 'path', 'url'], // don't bundle core modules
      output: {
        entryFileNames: 'check-coverage.js',
      },
    },
  },
});
