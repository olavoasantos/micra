import { basename, dirname } from 'path';

export const nameFromPath = (path: string) => {
  const PATH = dirname(path);
  const FILE = basename(path).split('.').slice(0, -1).join('.');

  if (FILE !== 'index') {
    return FILE;
  }

  return basename(PATH);
};
