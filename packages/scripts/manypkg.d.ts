import '@manypkg/tools';

declare module '@manypkg/tools' {
  export interface PackageJSON {
    /** Description of the package */
    description?: string;
  }
}
