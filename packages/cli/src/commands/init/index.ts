import { join } from 'path';
import { readFileSync } from 'fs';
import { CLICommand } from '@micra/cli-router';
import { Context } from '../../app/context/types';
import { CONFIG_TEMPLATE_PATH } from './constants';

export const init: CLICommand = {
  command: 'init',
  description: 'Generate a config file',
  arguments: [
    {
      name: 'path',
      description:
        'Path relative to the command working directory where the file should be created. Defaults to CWD.',
      default: './',
    },
  ],
  options: [
    {
      name: 'name',
      alias: 'n',
      description: 'Name of the file',
      default: '.assistantrc.js',
    },
    {
      name: 'force',
      alias: 'f',
      description: 'Should overwrite file if it exists',
      default: false,
    },
  ],
  async handler({ parser, createFile }: Context) {
    const PATH = parser.getArgument(0)?.value;
    const NAME = parser.getOption('name')?.value;
    const FORCE = parser.getOption('force')?.value;
    const TEMPLATE = readFileSync(CONFIG_TEMPLATE_PATH, 'utf-8');

    try {
      createFile(join(PATH, NAME), TEMPLATE, FORCE);
    } catch (e) {
      if (e.message.endsWith('already exists.')) {
        throw new Error(
          `${e.message} Please choose a different name, path or use the --force flag to overwrite the existing file.`,
        );
      }

      throw e;
    }
  },
};
