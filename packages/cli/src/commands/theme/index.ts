import { join } from 'path';
import prettier from 'prettier';
import { CLICommand } from '@micra/cli-router';
import {
  themeGenerator,
  toCssVariables,
  toCssVariablesThemeObject,
  toGenericThemeType,
  toThemeObject,
  toThemeType,
  ThemeToken,
  ThemeElement,
  ThemeGenerator,
} from '@micra/theme-generator';
import { Context } from '../../app/context/types';
import { GeneratorDefinition, ThemeDefinition } from './types';

export const themeBuild: CLICommand = {
  command: 'theme:build',
  description: 'Generates a theme based on your definitions',
  arguments: [
    {
      name: 'path',
      description: 'The path to where the files should be generated',
    },
  ],
  options: [
    {
      name: 'only',
      alias: 'o',
      description: 'Definitions to build',
      default: '*',
    },
  ],
  async handler({ parser, cwd, config, template, createFile }: Context) {
    const BUILD_PATH = parser.getArgument(0)?.value;
    const THEMES = parser.getOption('only')?.value;
    const definitions = config.get('theme.definitions') ?? {};

    const themeElements: Record<string, {
      tokens: ThemeToken;
      elements: ThemeElement[];
      to(...generators: ThemeGenerator<any>[]): string[];
    }> = {};
    const names = THEMES === '*' ? Object.keys(definitions) : THEMES.split(',');

    names.forEach((key: string) =>
      definitions[key].forEach((definition: GeneratorDefinition) => {
        let theme = themeElements[(definition as ThemeDefinition).source ?? ''];
        if (!Boolean(theme) && (definition as ThemeDefinition).source) {
          theme = themeGenerator(require(cwd((definition as ThemeDefinition).source)));
          themeElements[(definition as ThemeDefinition).source] = theme;
        }

        if (definition.type === 'toGenericThemeType') {
          const format = definition.format ?? {
            parser: 'babel-ts',
            semi: true,
            trailingComma: 'all',
            singleQuote: true,
            printWidth: 100,
            tabWidth: 2,
          };
          const options = Object.assign(
            {},
            definition.options || {},
          );
          theme.to(
            toGenericThemeType({
              ...options,
              callback(ctx) {
                if (definition.transform) {
                  ctx = definition.transform(ctx);
                }

                let TEMPLATE = ctx.content;
                if (definition.template) {
                  TEMPLATE = template(definition.template);
                }

                const FILE_PATH = join(BUILD_PATH, definition.path || '');
                const CONTENT = use('TemplateEngine').render(TEMPLATE, {
                  ...(definition.variables || {}),
                  CONTENT: ctx.content,
                  BUILD_PATH,
                  FILE_PATH,
                  CTX: ctx,
                });

                createFile(cwd(FILE_PATH), prettier.format(CONTENT, format), true);
              },
            }),
          );
        }

        if (definition.type === 'toThemeType') {
          const format = definition.format ?? {
            parser: 'babel-ts',
            semi: true,
            trailingComma: 'all',
            singleQuote: true,
            printWidth: 100,
            tabWidth: 2,
          };
          const options = Object.assign(
            {},
            definition.options || {},
          );
          theme.to(
            toThemeType({
              ...options,
              callback(ctx) {
                if (definition.transform) {
                  ctx = definition.transform(ctx);
                }

                let TEMPLATE = ctx.content;
                if (definition.template) {
                  TEMPLATE = template(definition.template);
                }

                const FILE_PATH = join(BUILD_PATH, definition.path || '');
                const CONTENT = use('TemplateEngine').render(TEMPLATE, {
                  ...(definition.variables || {}),
                  CONTENT: ctx.content,
                  BUILD_PATH,
                  FILE_PATH,
                  CTX: ctx,
                });

                createFile(cwd(FILE_PATH), prettier.format(CONTENT, format), true);
              },
            }),
          );
        }

        if (definition.type === 'toCssVariables') {
          const format = definition.format ?? {
            parser: 'css',
            semi: true,
            trailingComma: 'all',
            singleQuote: true,
            printWidth: 100,
            tabWidth: 2,
          };
          const options = Object.assign(
            {},
            definition.options || {},
          );
          theme.to(
            toCssVariables({
              ...options,
              callback(ctx) {
                if (definition.transform) {
                  ctx = definition.transform(ctx);
                }

                let TEMPLATE = ctx.content;
                if (definition.template) {
                  TEMPLATE = template(definition.template);
                }

                const FILE_PATH = join(BUILD_PATH, definition.path || '');
                const CONTENT = use('TemplateEngine').render(TEMPLATE, {
                  ...(definition.variables || {}),
                  CONTENT: ctx.content,
                  BUILD_PATH,
                  FILE_PATH,
                  CTX: ctx,
                });

                createFile(cwd(FILE_PATH), prettier.format(CONTENT, format), true);
              },
            }),
          );
        }

        if (definition.type === 'toCssVariablesThemeObject') {
          const format = definition.format ?? {
            parser: 'babel',
            semi: true,
            trailingComma: 'all',
            singleQuote: true,
            printWidth: 100,
            tabWidth: 2,
          };
          const options = Object.assign(
            {},
            definition.options || {},
          );
          theme.to(
            toCssVariablesThemeObject({
              ...options,
              callback(ctx) {
                if (definition.transform) {
                  ctx = definition.transform(ctx);
                }

                let TEMPLATE = ctx.content;
                if (definition.template) {
                  TEMPLATE = template(definition.template);
                }

                const FILE_PATH = join(BUILD_PATH, definition.path || '');
                const CONTENT = use('TemplateEngine').render(TEMPLATE, {
                  ...(definition.variables || {}),
                  CONTENT: ctx.content,
                  BUILD_PATH,
                  FILE_PATH,
                  CTX: ctx,
                });

                createFile(cwd(FILE_PATH), prettier.format(CONTENT, format), true);
              },
            }),
          );
        }

        if (definition.type === 'toThemeObject') {
          const format = definition.format ?? {
            parser: 'babel',
            semi: true,
            trailingComma: 'all',
            singleQuote: true,
            printWidth: 100,
            tabWidth: 2,
          };
          const options = Object.assign(
            {},
            definition.options || {},
          );
          theme.to(
            toThemeObject({
              ...options,
              callback(ctx) {
                if (definition.transform) {
                  ctx = definition.transform(ctx);
                }

                let TEMPLATE = ctx.content;
                if (definition.template) {
                  TEMPLATE = template(definition.template);
                }

                const FILE_PATH = join(BUILD_PATH, definition.path || '');
                const CONTENT = use('TemplateEngine').render(TEMPLATE, {
                  ...(definition.variables || {}),
                  CONTENT: ctx.content,
                  BUILD_PATH,
                  FILE_PATH,
                  CTX: ctx,
                });

                createFile(cwd(FILE_PATH), prettier.format(CONTENT, format), true);
              },
            }),
          );
        }

        if (definition.type === 'file') {
          const format = definition.format;
          const TEMPLATE = template(definition.template);
          const FILE_PATH = join(BUILD_PATH, definition.path || '');
          const CONTENT = use('TemplateEngine').render(TEMPLATE, {
            ...(definition.variables || {}),
            BUILD_PATH,
            FILE_PATH,
          });

          const FORMATTED_CONTENT = format ? prettier.format(CONTENT, format) : CONTENT;

          createFile(cwd(FILE_PATH), FORMATTED_CONTENT, true);
        }
      }),
    );
  },
};
