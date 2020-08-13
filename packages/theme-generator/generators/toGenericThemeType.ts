import { ThemeGenerator, ThemeGeneratorOptions } from './types';
import { deepMerge } from '../helpers/deepMerge';

export interface ToGenericThemeTypeOptions extends ThemeGeneratorOptions {
  //
}

export const toGenericThemeType = (
  options: Partial<ToGenericThemeTypeOptions> = {},
): ThemeGenerator<ToGenericThemeTypeOptions> => ({
  options: {
    willTransform: (elements) => elements,
    ...options,
  },
  build(elements) {
    const { willTransform } = this.options;
    const stringPlaceholder = '____str____';
    const definitions = willTransform(elements).reduce((variables, element) => {
      const [key, ...rest] = element.breadcrumbs.reverse();
      element.breadcrumbs.reverse();

      const el = rest.reduce((obj, subKey) => ({ [subKey]: obj } as any), {
        [key]: stringPlaceholder,
      });

      return deepMerge(variables, el);
    }, {});

    return JSON.stringify(definitions).replace(
      new RegExp(`\"${stringPlaceholder}\"`, 'g'),
      'string',
    );
  },
});
