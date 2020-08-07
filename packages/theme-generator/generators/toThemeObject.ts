import prettier from 'prettier';
import { ThemeGenerator, ThemeGeneratorOptions } from './types';
import { deepMerge } from '../helpers/deepMerge';

export interface ToThemeObjectOptions extends ThemeGeneratorOptions {
  name?: string;
  shouldExport?: boolean;
  type?: string;
  imports?: string;
}

export const toThemeObject = (
  options: Partial<ToThemeObjectOptions> = {},
): ThemeGenerator<ToThemeObjectOptions> => ({
  options: {
    name: 'Theme',
    shouldExport: true,
    willTransform: (elements) => elements,
    ...options,
  },
  name: 'toThemeObject',
  extension: ['js', 'ts'],
  build(elements) {
    const { name, shouldExport, type, imports, willTransform } = this.options;
    const definitions = willTransform(elements).reduce((variables, element) => {
      const [key, ...rest] = element.breadcrumbs.reverse();
      element.breadcrumbs.reverse();

      const el = rest.reduce((obj, subKey) => ({ [subKey]: obj } as any), {
        [key]: element.value,
      });

      return deepMerge(variables, el);
    }, {});

    return prettier.format(
      `${Boolean(imports) ? `${imports}\n\n` : ''}${shouldExport ? 'exports.' : ''}${name}${
        Boolean(type) ? `: ${type}` : ''
      } = ${JSON.stringify(definitions)}`,
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
