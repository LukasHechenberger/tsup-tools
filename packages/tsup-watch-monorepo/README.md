# @lhechenberger/tsup-watch-monorepo

> Watch your workspace dependencies and rebuild them with tsup

This package improves the development experience of [`tsup --watch`](https://tsup.egoist.dev/#watch-mode):

- It automatically watches workspace dependencies in a monorepo to trigger a rebuild so all your output files are always up-to-date

## Usage

**Installation**

As always, install the package using your favorite package manager, e.g. with `pnpm`:

```shell
pnpm add --save-dev @lhechenberger/tsup-dev
```

> You should install it in all your monorepo's packages that use tsup

**Adjust your tsup.config.ts**

Use `defineConfig` from this package instead of `tsup`.

```typescript
// tsup.config.ts

import { defineConfig } from '@lhechenberger/tsup-dev';

export default defineConfig({
  // Your tsup options, see https://tsup.egoist.dev
});
```

**Adjust your dev script**

Inside your package's _package.json_ file, adjust your _dev_ (or whatever name you prefer) script:

```diff
  {
    "name": "my-package",
    "scripts": {
      "build": "tsup",
-     "dev": "tsup --watch",
+     "dev": "tsup-dev",
      ...
    }
  }
```
