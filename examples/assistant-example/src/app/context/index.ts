import { ServiceProvider } from '@micra/service-provider';
import { DefaultContext } from '@micra/assistant-core';
import { exit } from 'helpers/exit';
import { createFile } from 'helpers/createFile';
import { capitalize } from 'helpers/capitalize';
import { makeSurePathExists } from 'helpers/makeSurePathExists';

export class ContextServiceProvider extends ServiceProvider {
  register() {
    this.container.value('MakeContext', async (_context: DefaultContext) => {
      return {
        exit,
        createFile,
        capitalize,
        makeSurePathExists,
      };
    });
  }
}
