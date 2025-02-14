import '@manypkg/tools';

declare module '@manypkg/tools' {
  export interface PackageJSON {
    /** Description of the package */
    description?: string;
    repository?: {
      type: 'git';
      url: string;
      directory?: string;
    };
  }
}
