import { defineConfig } from './src/index';

export default defineConfig({
  entry: ['./src/index.ts', './src/bin.ts'],
  format: 'esm',
  outDir: './out',
  splitting: false, // Inline constants
  dts: true,
});
