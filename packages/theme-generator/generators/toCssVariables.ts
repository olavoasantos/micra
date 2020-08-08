import { ThemeGenerator, ThemeGeneratorOptions } from './types';
import { camelToKebab } from '../helpers/camelToKebab';

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
  name: 'toCssVariables',
  extension: ['css', 'scss'],
  build(elements) {
    const { willTransform } = this.options;
    const definitions = willTransform(elements).reduce((variables, element) => {
      const name = `--${element.breadcrumbs.map(camelToKebab).join('-')}`;
      return `${variables} ${name}: ${element.value};`;
    }, '');

    return definitions;
  },
});
