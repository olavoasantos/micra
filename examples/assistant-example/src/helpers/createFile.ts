import { join } from 'path';
import { Logger } from '@micra/core';
import { existsSync, writeFileSync } from 'fs';
import { makeSurePathExists } from 'helpers/makeSurePathExists';

export const createFile = (path: string, name: string, content: any, force: boolean = false) => {
  const logger = use<Logger>('Logger');
  const PATH = join(process.cwd(), path);
  const FULL_PATH = join(process.cwd(), path, name);

  if (!existsSync(FULL_PATH) || force) {
    makeSurePathExists(PATH);

    writeFileSync(FULL_PATH, content, 'utf-8');

    return logger.info('Configuration file created in:', FULL_PATH);
  }

  throw new Error(`File "${join(PATH, name)}" already exists.`);
};
