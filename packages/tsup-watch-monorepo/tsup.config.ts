import { defineConfig } from '@lhechenberger/tsup-dev';
import { getFilesToWatch } from './src';

export default defineConfig({
  entry: ['./src/index.ts'],
  format: 'esm',
  dts: true,
  outDir: './out',
  watch: await getFilesToWatch(),
});
