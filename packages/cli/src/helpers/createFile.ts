import { join, dirname } from 'path';
import { existsSync, writeFileSync } from 'fs';
import { Logger } from '@micra/core';
import { makeSurePathExists } from './makeSurePathExists';

export const createFile = (path: string, content: any, force = false) => {
  const logger = use<Logger>('Logger');
  const PATH = dirname(path);

  if (!existsSync(path) || force) {
    makeSurePathExists(PATH);

    writeFileSync(path, content, 'utf-8');

    return logger.info('File created in:', path);
  }

  throw new Error(`File "${path}" already exists.`);
};
