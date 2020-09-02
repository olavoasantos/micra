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
import { runTransformer } from './helpers/runTransformer';

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
  async handler(context: Context) {
    const { parser, cwd, config, template, createFile } = context;
    const BUILD_PATH = parser.getArgument(0)?.value;
    const THEMES = parser.getOption('only')?.value;
    const definitions = config.get('theme.definitions') ?? {};

    const themeElements: Record<string, ThemeGenerator> = {};
    const names = THEMES === '*' ? Object.keys(definitions) : THEMES.split(',');

    names.forEach((key: string) =>
      definitions[key].forEach((definition: GeneratorDefinition) => {
        let theme = themeElements[(definition as ThemeDefinition).source ?? ''];
        if (!Boolean(theme) && (definition as ThemeDefinition).source) {
          const parserOptions = (definition as ThemeDefinition).parserOptions || undefined;
          theme = themeGenerator(
            require(cwd((definition as ThemeDefinition).source)),
            parserOptions,
          );
          themeElements[(definition as ThemeDefinition).source] = theme;
        }

        if (definition.type === 'toGenericThemeType') {
          return runTransformer(genericThemeType, {
            BUILD_PATH,
            DEFAULT_FORMAT: {
              parser: 'babel-ts',
              semi: true,
              trailingComma: 'all',
              singleQuote: true,
              printWidth: 100,
              tabWidth: 2,
            },
          })(theme, definition, context);
        }

        if (definition.type === 'toThemeType') {
          return runTransformer(themeType, {
            BUILD_PATH,
            DEFAULT_FORMAT: {
              parser: 'babel-ts',
              semi: true,
              trailingComma: 'all',
              singleQuote: true,
              printWidth: 100,
              tabWidth: 2,
            },
          })(theme, definition, context);
        }

        if (definition.type === 'toCssVariables') {
          return runTransformer(cssVariables, {
            BUILD_PATH,
            DEFAULT_FORMAT: {
              parser: 'css',
              semi: true,
              trailingComma: 'all',
              singleQuote: true,
              printWidth: 100,
              tabWidth: 2,
            },
          })(theme, definition, context);
        }

        if (definition.type === 'toScssVariables') {
          return runTransformer(scssVariables, {
            BUILD_PATH,
            DEFAULT_FORMAT: {
              parser: 'css',
              semi: true,
              trailingComma: 'all',
              singleQuote: true,
              printWidth: 100,
              tabWidth: 2,
            },
          })(theme, definition, context);
        }

        if (definition.type === 'toCssVariablesThemeObject') {
          return runTransformer(cssVariablesThemeObject, {
            BUILD_PATH,
            DEFAULT_FORMAT: {
              parser: 'babel',
              semi: true,
              trailingComma: 'all',
              singleQuote: true,
              printWidth: 100,
              tabWidth: 2,
            },
          })(theme, definition, context);
        }

        if (definition.type === 'toThemeObject') {
          return runTransformer(themeObject, {
            BUILD_PATH,
            DEFAULT_FORMAT: {
              parser: 'babel',
              semi: true,
              trailingComma: 'all',
              singleQuote: true,
              printWidth: 100,
              tabWidth: 2,
            },
          })(theme, definition, context);
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
