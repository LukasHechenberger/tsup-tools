import { type Options as TsupOptions, defineConfig as original } from 'tsup';
import { watchModeEnvFlag } from './constants';

export function getWatchOption(options: TsupOptions = {}) {
  return process.env[watchModeEnvFlag] ? (options.watch ?? true) : false;
}

type MaybeArray<T> = T | T[];
type MaybePromise<T> = T | Promise<T>;

export function defineConfig(
  options:
    | MaybeArray<TsupOptions>
    | ((overrideOptions: TsupOptions) => MaybePromise<MaybeArray<TsupOptions>>),
) {
  return original(async (override) => {
    const optionsResolved = typeof options === 'function' ? await options(override) : options;

    return (Array.isArray(optionsResolved) ? optionsResolved : [optionsResolved]).map((o) => ({
      ...o,
      watch: getWatchOption(o),
    }));
  });
}
