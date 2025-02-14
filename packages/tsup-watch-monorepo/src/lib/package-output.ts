import { getPackages } from '@manypkg/get-packages';
import type { PackageJSON } from '@manypkg/tools';
import { join, relative } from 'path';

function isTruthy<T>(value: T): value is Exclude<T, false | null | undefined> {
  return Boolean(value);
}

export function getExportsFiles(exportsField: PackageJSON['exports']): string[] {
  if (!exportsField) return [];

  if (typeof exportsField === 'string') return [exportsField];

  if (Array.isArray(exportsField)) return exportsField.flatMap((field) => getExportsFiles(field));

  return Object.entries(exportsField).flatMap(([_, value]) => getExportsFiles(value));
}

export function getOutputFiles(packageJson: PackageJSON) {
  const outputFiles = [
    packageJson.main,
    packageJson.module,
    packageJson.types,
    ...getExportsFiles(packageJson.exports),
  ].filter(isTruthy);

  return outputFiles;
}
