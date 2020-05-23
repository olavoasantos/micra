import { ServiceProvider } from '@micra/service-provider';
import { DefaultContext } from '@micra/assistant-core';
import lodash from 'lodash';
import pluralize from 'pluralize';
import { capitalize } from '../../helpers/capitalize';
import { createFile } from '../../helpers/createFile';
import { cwd } from '../../helpers/cwd';
import { defaultVariables } from '../../helpers/defaultVariables';
import { exit } from '../../helpers/exit';
import { makeSurePathExists } from '../../helpers/makeSurePathExists';
import { nameFromPath } from '../../helpers/nameFromPath';
import { pathToTemplate } from '../../domains/template/helpers/pathToTemplate';
import { relativePath } from '../../helpers/relativePath';
import { template } from '../../domains/template/helpers/template';
import { variationsOf } from '../../helpers/variationsOf';

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
        relativePath,
        variationsOf,
        pathToTemplate,
        defaultVariables,
        makeSurePathExists,
      };
    });
  }
}
