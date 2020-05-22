import { DefaultContext } from '@micra/assistant-core';
import { exit } from 'helpers/exit';
import { createFile } from 'helpers/createFile';
import { capitalize } from 'helpers/capitalize';
import { makeSurePathExists } from 'helpers/makeSurePathExists';

export interface Context extends DefaultContext {
  exit: typeof exit;
  createFile: typeof createFile;
  capitalize: typeof capitalize;
  makeSurePathExists: typeof makeSurePathExists;
}
