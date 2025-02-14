# @lhechenberger/tsup-watch-monorepo

> Watch your workspace dependencies and rebuild them with tsup

- It automatically watches workspace dependencies in a monorepo to trigger a rebuild so all your output files are always up-to-date

## Usage

**Installation**

As always, install the package using your favorite package manager, e.g. with `pnpm`:

```shell
pnpm add --save-dev @lhechenberger/tsup-watch-monorepo
```

> You should install it in all your monorepo's packages that use tsup

**Adjust your tsup.config.ts**

Use `getFilesToWatch` to find files to watch.

```typescript
// tsup.config.ts

import { defineConfig } from '@lhechenberger/tsup-dev'; // Works with tsup as well
import { getFilesToWatch } from '@lhechenberger/tsup-watch-monorepo';

export default defineConfig({
  // Your tsup options, see https://tsup.egoist.dev
  watch: await getFilesToWatch(),
});
```
