import { defineConfig, type LibraryFormats } from 'vite';
import { resolve } from 'path';

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/packages/boltotron-react-native',
  plugins: [],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'BoltotronReactNative',
      fileName: 'index',
      formats: ['es', 'cjs'] as LibraryFormats[],
    },
    rollupOptions: {
      external: ['react', 'react-native'],
      output: {
        globals: {
          react: 'React',
          'react-native': 'ReactNative',
        },
      },
    },
    outDir: 'dist',
    sourcemap: true,
    target: 'es2015',
  },
  test: {
    watch: false,
    globals: true,
    environment: 'node',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: './test-output/vitest/coverage',
      provider: 'v8' as const,
    },
  },
}));
