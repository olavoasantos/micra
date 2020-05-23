import { ServiceProvider } from '@micra/service-provider';
import { DefaultContext } from '@micra/assistant-core';
import lodash from 'lodash';
import pluralize from 'pluralize';
import { exit } from '../../helpers/exit';
import { createFile } from '../../helpers/createFile';
import { capitalize } from '../../helpers/capitalize';
import { makeSurePathExists } from '../../helpers/makeSurePathExists';
import { nameFromPath } from '../../helpers/nameFromPath';
import { variationsOf } from '../../helpers/variationsOf';
import { cwd } from '../../helpers/cwd';
import { template } from '../../domains/template/helpers/template';
import { pathToTemplate } from '../../domains/template/helpers/pathToTemplate';

export class ContextServiceProvider extends ServiceProvider {
  register() {
    this.container.value('MakeContext', async (_context: DefaultContext) => {
      return {
        cwd,
        exit,
        lodash,
        template,
        pluralize,
        createFile,
        capitalize,
        nameFromPath,
        variationsOf,
        pathToTemplate,
        makeSurePathExists,
      };
    });
  }
}
