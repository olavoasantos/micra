import { join, dirname } from 'path';
import { existsSync, writeFileSync } from 'fs';
import { Logger } from '@micra/core';
import { makeSurePathExists } from 'helpers/makeSurePathExists';

export const createFile = (path: string, content: any, force = false) => {
  const logger = use<Logger>('Logger');
  const PATH = join(process.cwd(), dirname(path));
  const FULL_PATH = join(process.cwd(), path);

  if (!existsSync(FULL_PATH) || force) {
    makeSurePathExists(PATH);

    writeFileSync(FULL_PATH, content, 'utf-8');

    return logger.info('File created in:', FULL_PATH);
  }

  throw new Error(`File "${path}" already exists.`);
};
