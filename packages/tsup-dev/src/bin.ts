#!/usr/bin/env node

import { spawnSync } from 'child_process';
// Note: '.ts' extension is required to import TypeScript files with Node.js Type Stripping
import { watchModeEnvFlag } from './constants.ts';

// Just launches tsup with an additional environment variable to use the watch config from tsup.config.ts
spawnSync('tsup', [...process.argv.slice(2)], {
  stdio: 'inherit',
  env: {
    ...process.env,
    [watchModeEnvFlag]: 'true',
  },
});
