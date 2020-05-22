import { existsSync, readFileSync } from 'fs';

export const template = (alias: string) => {
  if (existsSync(alias)) {
    return readFileSync(alias, 'utf-8');
  }

  const PATH = config(`template.${alias}`);
  if (PATH && existsSync(PATH)) {
    return readFileSync(PATH, 'utf-8');
  }

  throw new Error(`Template "${alias}" not defined`);
};
