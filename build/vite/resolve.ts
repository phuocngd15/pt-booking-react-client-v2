import path from 'path';
import type { ResolveOptions, AliasOptions } from 'vite';

type myResolveOptions = ResolveOptions & { alias?: AliasOptions };

export function createViteResolve(myDirname: string): myResolveOptions {
  const viteResolve: myResolveOptions = {
    // "Alias configuration."
    alias: {
      // "Configure the '@' alias."
      '@': `${path.resolve(myDirname, 'src')}`,
      // "Configure the '#' alias."
      '#': `${path.resolve(myDirname, 'types')}`,
    },
    // "A list of file extensions to be omitted when importing.
    // Note that it is not recommended to omit extensions for custom import types (e.g. .vue),
    // as it can interfere with IDE and type support."
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  };

  return viteResolve;
}
