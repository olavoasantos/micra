import { relative, join } from 'path';

export const relativePath = (from: string) => () => (to: string) =>
  relative(from, join(config('paths.root', process.cwd()), to));
