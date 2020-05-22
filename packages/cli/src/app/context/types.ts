import { DefaultContext } from '@micra/assistant-core';
import { LoDashStatic } from 'lodash';
import pluralize from 'pluralize';
import { exit } from 'helpers/exit';
import { createFile } from 'helpers/createFile';
import { capitalize } from 'helpers/capitalize';
import { nameFromPath } from 'helpers/nameFromPath';
import { variationsOf } from 'helpers/variationsOf';
import { makeSurePathExists } from 'helpers/makeSurePathExists';
import { template } from 'domains/template/helpers/template';
import { pathToTemplate } from 'domains/template/helpers/pathToTemplate';
import { cwd } from 'helpers/cwd';

export interface Context extends DefaultContext {
  cwd: typeof cwd;
  exit: typeof exit;
  lodash: LoDashStatic;
  template: typeof template;
  pluralize: typeof pluralize;
  createFile: typeof createFile;
  capitalize: typeof capitalize;
  nameFromPath: typeof nameFromPath;
  variationsOf: typeof variationsOf;
  pathToTemplate: typeof pathToTemplate;
  makeSurePathExists: typeof makeSurePathExists;
}
