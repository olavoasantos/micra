import { parseValue } from '../parseValue';
import { camelToKebab } from '../helpers/camelToKebab';
import { ThemeGenerator, ThemeGeneratorOptions } from './types';

export interface ToCssVariablesOptions extends ThemeGeneratorOptions {
  //
}

export const toCssVariables = (
  options: Partial<ToCssVariablesOptions> = {},
): ThemeGenerator<ToCssVariablesOptions> => ({
  options: {
    willTransform: (elements) => elements,
    ...options,
  },
  build(elements) {
    const { willTransform } = this.options;
    const definitions = willTransform(elements).reduce((variables, element) => {
      const name = `--${element.breadcrumbs.map(camelToKebab).join('-')}`;
      return `${variables} ${name}: ${parseValue(element.value)};`;
    }, '');

    return definitions;
  },
});
