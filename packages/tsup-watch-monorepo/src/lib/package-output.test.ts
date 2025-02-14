import exp from 'constants';
import { test, describe, expect } from 'vitest';
import { getOutputFiles } from './package-output';
import type { PackageJSON } from '@manypkg/tools';

function outputFiles(packageJson: Partial<PackageJSON>) {
  return getOutputFiles({
    name: 'test',
    version: '1.0.0',
    ...packageJson,
  });
}

const sampleExports = {
  manifestField: {
    './': './out/index.js',
    './sub': './out/sub/index.js',
    './conditional': {
      import: './out/conditional/index.js',
      require: './out/conditional/index.cjs',
    },
  },
  expected: [
    './out/index.js',
    './out/sub/index.js',
    './out/conditional/index.js',
    './out/conditional/index.cjs',
  ],
};

describe('getOutputFiles', () => {
  test('should return main, module, etc', async () => {
    expect(
      outputFiles({
        main: 'dist/main.js',
        module: 'dist/module.js',
        types: 'dist/types.d.ts',
      }),
    ).toEqual(['dist/main.js', 'dist/module.js', 'dist/types.d.ts']);
  });

  test('should return exports entries', async () => {
    expect(
      outputFiles({
        exports: sampleExports.manifestField,
      }),
    ).toEqual(sampleExports.expected);
  });
});
