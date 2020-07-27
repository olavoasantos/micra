import prettier from 'prettier';
import { ThemeGenerator, ThemeGeneratorOptions } from './types';
import { deepMerge } from '../helpers/deepMerge';

export interface ToThemeTypeOptions extends ThemeGeneratorOptions {
  name?: string;
  parent?: string;
}

export const toThemeType = (
  options: Partial<ToThemeTypeOptions> = {},
): ThemeGenerator<ToThemeTypeOptions> => ({
  options: {
    name: 'Theme',
    willTransform: (elements) => elements,
    ...options,
  },
  name: 'toThemeType',
  extension: ['ts'],
  build(elements) {
    const { name, parent, willTransform } = this.options;
    const definitions = willTransform(elements).reduce((variables, element) => {
      const [key, ...rest] = element.breadcrumbs.reverse();
      element.breadcrumbs.reverse();

      const el = rest.reduce((obj, subKey) => ({ [subKey]: obj } as any), {
        [key]: element.value,
      });

      return deepMerge(variables, el);
    }, {});

    return prettier.format(
      `export interface ${name}${Boolean(parent) ? ` extends ${parent}` : ''} ${JSON.stringify(
        definitions,
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
