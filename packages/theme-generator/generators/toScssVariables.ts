import { ThemeGenerator, ThemeGeneratorOptions } from './types';
import { camelToKebab } from '../helpers/camelToKebab';
import { parseValue } from '../parseValue';

export interface ToScssVariablesOptions extends ThemeGeneratorOptions {
  //
}

export const toScssVariables = (
  options: Partial<ToScssVariablesOptions> = {},
): ThemeGenerator<ToScssVariablesOptions> => ({
  options: {
    willTransform: (elements) => elements,
    ...options,
  },
  build(elements) {
    const { willTransform } = this.options;
    const definitions = willTransform(elements).reduce((variables, element) => {
      const name = `$${element.breadcrumbs.map(camelToKebab).join('-')}`;
      return `${variables} ${name}: ${parseValue(element.value)};`;
    }, '');

    return definitions;
  },
});
