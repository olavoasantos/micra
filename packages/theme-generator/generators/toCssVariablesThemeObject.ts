import { ThemeGenerator, ThemeGeneratorOptions } from './types';
import { camelToKebab } from '../helpers/camelToKebab';
import { deepMerge } from '../helpers/deepMerge';

export interface ToCssVariablesThemeObjectOptions extends ThemeGeneratorOptions {
  //
}

export const toCssVariablesThemeObject = (
  options: Partial<ToCssVariablesThemeObjectOptions> = {},
): ThemeGenerator<ToCssVariablesThemeObjectOptions> => ({
  options: {
    willTransform: (elements) => elements,
    ...options,
  },
  build(elements) {
    const { willTransform } = this.options;
    const definitions = willTransform(elements).reduce((variables, element) => {
      const value = `var(--${element.breadcrumbs.map(camelToKebab).join('-')})`;

      const [key, ...rest] = element.breadcrumbs.reverse();
      element.breadcrumbs.reverse();

      const el = rest.reduce((obj, subKey) => ({ [subKey]: obj } as Record<string, any>), {
        [key]: value,
      });

      return deepMerge(variables, el);
    }, {});

    return JSON.stringify(definitions);
  },
});
