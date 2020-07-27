import prettier from 'prettier';
import { ThemeGenerator, ThemeGeneratorOptions } from './types';
import { deepMerge } from '../helpers/deepMerge';

export interface ToGenericThemeTypeOptions extends ThemeGeneratorOptions {
  name?: string;
}

export const toGenericThemeType = (
  options: Partial<ToGenericThemeTypeOptions> = {},
): ThemeGenerator<ToGenericThemeTypeOptions> => ({
  options: {
    name: 'Theme',
    willTransform: (elements) => elements,
    ...options,
  },
  name: 'toGenericThemeType',
  extension: ['ts'],
  build(elements) {
    const { name, willTransform } = this.options;
    const stringPlaceholder = '____str____';
    const definitions = willTransform(elements).reduce((variables, element) => {
      const [key, ...rest] = element.breadcrumbs.reverse();
      element.breadcrumbs.reverse();

      const el = rest.reduce((obj, subKey) => ({ [subKey]: obj } as any), {
        [key]: stringPlaceholder,
      });

      return deepMerge(variables, el);
    }, {});

    return prettier.format(
      `export interface ${name} ${JSON.stringify(definitions).replace(
        new RegExp(`\"${stringPlaceholder}\"`, 'g'),
        'string',
      )}`,
      {
        parser: 'babel-ts',
        semi: true,
        trailingComma: 'all',
        singleQuote: true,
        printWidth: 100,
        tabWidth: 2,
      },
    );
  },
});
