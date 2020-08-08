import { ThemeGenerator, ThemeGeneratorOptions } from './types';
import { deepMerge } from '../helpers/deepMerge';

export interface ToThemeTypeOptions extends ThemeGeneratorOptions {
  //
}

export const toThemeType = (
  options: Partial<ToThemeTypeOptions> = {},
): ThemeGenerator<ToThemeTypeOptions> => ({
  options: {
    willTransform: (elements) => elements,
    ...options,
  },
  name: 'toThemeType',
  extension: ['ts'],
  build(elements) {
    const { willTransform } = this.options;
    const definitions = willTransform(elements).reduce((variables, element) => {
      const [key, ...rest] = element.breadcrumbs.reverse();
      element.breadcrumbs.reverse();

      const el = rest.reduce((obj, subKey) => ({ [subKey]: obj } as any), {
        [key]: element.value,
      });

      return deepMerge(variables, el);
    }, {});

    return JSON.stringify(definitions);
  },
});
