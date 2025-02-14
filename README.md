# tsup-tools

> Some useful tools to improve developer experience with tsup

## Maintainers

### Running repo script

As we are using the packages inside this repo to build themselves, `tsup --watch` (or `tsup-dev`) won't work properly, so only use `pnpm dev` in the repo root dir to watch and rebuild - it uses `pnpm turbo watch dev` under the hood. Once built you can run `pnpm test:dev` to test the dev script one would configure in a real project.

### TODO

> Just a list of nice-to-haves

**General**

- `init` script to setup `tsup-dev`

**CI**

- Check types etc. package.json values

**Additional packages**

- `tsup-smart-defaults`: Inherit config from package.json etc:
  - format `esm` if `type: 'module'`
  - `outDir` from main/exports etc.
  - clean if not `--watch`
