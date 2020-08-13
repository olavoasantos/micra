import { deepMerge } from '../helpers/deepMerge';
import { createGenerator } from './createGenerator';
import { pathToObject } from '../helpers/pathToObject';

export const toThemeType = createGenerator(({ elements, parseValue, generator: { options } }) => {
  const { willTransform } = options;

  const definitions = willTransform(elements).reduce((variables, element) => {
    const el = pathToObject(
      element.path.split('.').reverse(),
      parseValue(element.value, {
        from(path: string) {
          return elements.find((el) => (el.path = path))?.value ?? '';
        },
      }),
    );

    return deepMerge(variables, el);
  }, {});

  return JSON.stringify(definitions);
});
