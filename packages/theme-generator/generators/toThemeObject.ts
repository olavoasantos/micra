import { ThemeGenerator, ThemeGeneratorOptions } from './types';
import { deepMerge } from '../helpers/deepMerge';
import { parseValue } from '../parseValue';

export interface ToThemeObjectOptions extends ThemeGeneratorOptions {
  //
}

export const toThemeObject = (
  options: Partial<ToThemeObjectOptions> = {},
): ThemeGenerator<ToThemeObjectOptions> => ({
  options: {
    willTransform: (elements) => elements,
    ...options,
  },
  build(elements) {
    const { willTransform } = this.options;
    const definitions = willTransform(elements).reduce((variables, element) => {
      const [key, ...rest] = element.breadcrumbs.reverse();
      element.breadcrumbs.reverse();

      const el = rest.reduce((obj, subKey) => ({ [subKey]: obj } as any), {
        [key]: parseValue(element.value),
      });

      return deepMerge(variables, el);
    }, {});

    return JSON.stringify(definitions);
  },
});
