import { getPackages } from '@manypkg/get-packages';
import { replaceInFile } from 'replace-in-file';
import { join } from 'path';
import { writeFile } from 'fs/promises';

const { packages, rootDir, rootPackage } = await getPackages(process.cwd());

const sortedPackages = packages.sort((a, b) => {
  // Private packages last
  if (a.packageJson.private && !b.packageJson.private) return 1;
  if (b.packageJson.private && !a.packageJson.private) return -1;

  // Otherwise sort by name
  return a.packageJson.name.localeCompare(b.packageJson.name);
});

class Marker {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  get regExp() {
    return new RegExp(`<!-- @replace ${this.name} (.|\n)* /@replace ${this.name} -->`, 'm');
  }

  replacement(content: string) {
    return `<!-- @replace ${this.name} -->\n\n${content}\n\n<!-- /@replace ${this.name} -->`;
  }

  // NOTE: This does *not* throw if the marker is not found
  replaceInFile(path: string, content: string) {
    return replaceInFile({
      files: path,
      from: this.regExp,
      to: this.replacement(content),
    });
  }

  static heading = new Marker('heading');
  static footer = new Marker('footer');
}

for (const pkg of [rootPackage!, ...sortedPackages]) {
  // Adjust package.json of non-root packages
  if (pkg !== rootPackage) {
    pkg.packageJson.repository = {
      ...rootPackage!.packageJson.repository!,
      directory: pkg.relativeDir,
    };

    pkg.packageJson.publishConfig = pkg.packageJson.private ? undefined : { access: 'public' };

    await writeFile(join(pkg.dir, 'package.json'), `${JSON.stringify(pkg.packageJson, null, 2)}\n`);
  }

  // Adjust headers in package readmes
  const readmePath = join(pkg.dir, 'README.md');
  let heading = `# ${pkg.packageJson.name}`;

  if (pkg.packageJson.description) {
    heading += `\n\n> ${pkg.packageJson.description}`;
  } else {
    console.warn(`Package ${pkg.packageJson.name} is missing a description`);
  }

  await Marker.heading.replaceInFile(readmePath, heading);

  // TODO: For published packages, also add a footer like "Part of the ... project"
  // if (!pkg.packageJson.private) {}
}

// List all packages in root readme

const packageList = new Marker('packages');
await packageList.replaceInFile(
  join(rootDir, 'README.md'),
  sortedPackages
    .map((pkg) =>
      `- [\`${pkg.packageJson.name}\`](${pkg.relativeDir}/README.md) - ${pkg.packageJson.description ?? ''} ${pkg.packageJson.private ? '(internal)' : ''}`.trim(),
    )
    .join('\n'),
);
