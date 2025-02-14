<!-- @replace heading -->

# @lhechenberger/tsup-dev

> `tsup --watch`, but uses your tsup.config to determine which files to watch

<!-- /@replace heading -->

This package is meant to improve the development experience of [running tsup in watch mode](https://tsup.egoist.dev/#watch-mode):

Unlike running `tsup --watch`, running `tsup-dev` will **not ignore** the _watch_ property inside \*tsup.

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
