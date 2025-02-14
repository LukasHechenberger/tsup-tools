import { getPackages, type Package } from '@manypkg/get-packages';
import { join, relative } from 'path';

const dependencyTypesToHandle = [
  'dependencies',
  'devDependencies',
  'peerDependencies',
  'optionalDependencies',
] as const;

type ExtendedPackageJson = Package['packageJson'] & {
  main?: string;
};

function isTruthy<T>(value: T): value is Exclude<T, false | null | undefined> {
  return Boolean(value);
}

function getOutputFiles(packageJson: ExtendedPackageJson) {
  const outputFiles = [
    packageJson.main,
    // TODO: Add exports etc.
  ].filter(isTruthy);

  return outputFiles;
}

export async function getDependencyOutputFiles({}: {} = {}): Promise<string[]> {
  const currentDir = process.cwd();

  const { packages } = await getPackages(currentDir);
  const currentPackage = packages.find((pkg) => pkg.dir === currentDir);
  const packageMap = new Map(packages.map((pkg) => [pkg.packageJson.name, pkg]));

  if (!currentPackage) {
    // TODO: Better error description
    throw new Error('Could not find current package');
  }

  const workspaceDependencies = dependencyTypesToHandle.flatMap((depType) =>
    Object.keys(currentPackage?.packageJson[depType] ?? {}).flatMap((name) => {
      const pkg = packageMap.get(name);

      return pkg ? [pkg] : [];
    }),
  );

  const depdendencyOutputFiles = workspaceDependencies.flatMap((pkg) =>
    getOutputFiles(pkg.packageJson as ExtendedPackageJson)
      // Use relative paths to shorten tsup CLI output
      .map((p) => relative(currentDir, join(pkg.dir, p))),
  );

  return depdendencyOutputFiles;
}

export async function getFilesToWatch() {
  return ['.', ...(await getDependencyOutputFiles())];
}
