import prettier from 'prettier';
import { ThemeGenerator, ThemeGeneratorOptions } from './types';
import { camelToKebab } from '../helpers/camelToKebab';

export interface ToCssVariablesOptions extends ThemeGeneratorOptions {
  selector?: string;
}

export const toCssVariables = (
  options: Partial<ToCssVariablesOptions> = {},
): ThemeGenerator<ToCssVariablesOptions> => ({
  options: {
    selector: ':root',
    willTransform: (elements) => elements,
    ...options,
  },
  name: 'toCssVariables',
  extension: ['css', 'scss'],
  build(elements) {
    const { selector, willTransform } = this.options;
    const definitions = willTransform(elements).reduce((variables, element) => {
      const name = `--${element.breadcrumbs.map(camelToKebab).join('-')}`;
      return `${variables} ${name}: ${element.value};`;
    }, '');

    return prettier.format(`${selector} { ${definitions} }`, {
      parser: 'css',
      semi: true,
      trailingComma: 'all',
      singleQuote: true,
      printWidth: 100,
      tabWidth: 2,
    });
  },
});
