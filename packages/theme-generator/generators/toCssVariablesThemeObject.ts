import prettier from 'prettier';
import { ThemeGenerator, ThemeGeneratorOptions } from './types';
import { camelToKebab } from '../helpers/camelToKebab';
import { deepMerge } from '../helpers/deepMerge';

export interface ToCssVariablesThemeObjectOptions extends ThemeGeneratorOptions {
  es6?: boolean;
}

export const toCssVariablesThemeObject = (
  options: Partial<ToCssVariablesThemeObjectOptions> = {},
): ThemeGenerator<ToCssVariablesThemeObjectOptions> => ({
  options: {
    es6: false,
    willTransform: (elements) => elements,
    ...options,
  },
  name: 'toCssVariablesThemeObject',
  extension: ['js', 'ts'],
  build(elements) {
    const { es6, willTransform } = this.options;
    const definitions = willTransform(elements).reduce((variables, element) => {
      const value = `var(--${element.breadcrumbs.map(camelToKebab).join('-')})`;

      const [key, ...rest] = element.breadcrumbs.reverse();
      element.breadcrumbs.reverse();

      const el = rest.reduce((obj, subKey) => ({ [subKey]: obj } as any), {
        [key]: value,
      });

      return deepMerge(variables, el);
    }, {});

    return prettier.format(
      `${es6 ? 'export default' : 'module.exports ='} ${JSON.stringify(definitions)}`,
      {
        parser: 'babel',
        semi: true,
        trailingComma: 'all',
        singleQuote: true,
        printWidth: 100,
        tabWidth: 2,
      },
    );
  },
});
