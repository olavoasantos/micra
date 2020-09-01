import { join } from 'path';
import prettier from 'prettier';
import { CLICommand } from '@micra/cli-router';
import {
  themeGenerator,
  cssVariables,
  cssVariablesThemeObject,
  genericThemeType,
  themeObject,
  themeType,
  scssVariables,
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

    const themeElements: Record<string, ThemeGenerator> = {};
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
            genericThemeType({
              ...options,
              callback(ctx) {
                if (definition.transform) {
                  ctx = definition.transform(ctx) as any;
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
            themeType({
              ...options,
              callback(ctx) {
                if (definition.transform) {
                  ctx = definition.transform(ctx) as any;
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
            cssVariables({
              ...options,
              callback(ctx) {
                if (definition.transform) {
                  ctx = definition.transform(ctx) as any;
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

        if (definition.type === 'toScssVariables') {
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
            scssVariables({
              ...options,
              callback(ctx) {
                if (definition.transform) {
                  ctx = definition.transform(ctx) as any;
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
            cssVariablesThemeObject({
              ...options,
              callback(ctx) {
                if (definition.transform) {
                  ctx = definition.transform(ctx) as any;
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
            themeObject({
              ...options,
              callback(ctx) {
                if (definition.transform) {
                  ctx = definition.transform(ctx) as any;
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
