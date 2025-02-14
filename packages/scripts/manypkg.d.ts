import '@manypkg/tools';
import type { JSONSchemaForNPMPackageJsonFiles2 } from '@schemastore/package';

declare module '@manypkg/tools' {
  export interface PackageJSON extends JSONSchemaForNPMPackageJsonFiles2 {
    // Use the object form
    repository?: Exclude<JSONSchemaForNPMPackageJsonFiles2['repository'], string>;
  }
}
