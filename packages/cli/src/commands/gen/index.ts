import { basename, dirname } from 'path';
import { CLICommand } from '@micra/cli-router';
import { TemplateEngine } from '@micra/core';
import { Context } from '../../app/context/types';
import { listTemplates } from './middlewares/listTemplates';

export const gen: CLICommand = {
  command: 'gen',
  description: 'Generate a file from a template',
  middlewares: [listTemplates],
  arguments: [
    {
      name: 'template',
      description: 'Alias of or absolute path to template.',
    },
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
    },
    {
      name: 'force',
      alias: 'f',
      description: 'Should overwrite file if it exists',
      default: false,
    },
    {
      name: 'js',
      description: 'Create a JS file.',
      default: false,
    },
    {
      name: 'list',
      alias: 'l',
      description: 'Lists all available templates',
    },
  ],
  async handler({
    createFile,
    cwd,
    nameFromPath,
    parser,
    relativePath,
    template,
    variationsOf,
    defaultVariables,
  }: Context) {
    try {
      const PATH = parser.getArgument(1)?.value;
      const FULL_PATH = cwd(PATH);
      const DIR_NAME = dirname(PATH);
      const FILE_NAME = basename(PATH);
      const TEMPLATE_REFERENCE = parser.getArgument(0)?.value;
      const TEMPLATE = template(TEMPLATE_REFERENCE);
      const FORCE = parser.getOption('force')?.value;
      const JS = parser.getOption('js')?.value;
      const OPTIONS = parser.options
        .map((option) => (option.name ? { name: option.name, value: option.value } : undefined))
        .filter(Boolean);
      const ARGUMENTS = parser.arguments
        .map((argument) =>
          argument.name ? { name: argument.name, value: argument.value } : undefined,
        )
        .filter(Boolean);
      const NAME = variationsOf(parser.getOption('name')?.value ?? nameFromPath(PATH));

      const CONTENT = use<TemplateEngine>('TemplateEngine').render(
        TEMPLATE,
        defaultVariables({
          NAME,
          PATH,
          OPTIONS,
          ARGUMENTS,
          FULL_PATH,
          DIR_NAME,
          FILE_NAME,
          JS,
          relativePath: relativePath(DIR_NAME),
        }),
      );

      createFile(FULL_PATH, CONTENT, FORCE);
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
