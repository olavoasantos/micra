import { deepMerge } from '../helpers/deepMerge';
import { pathToKebab } from '../helpers/pathToKebab';
import { pathToObject } from '../helpers/pathToObject';
import { createGenerator } from '../helpers/createGenerator';

export const toCssVariablesThemeObject = createGenerator(({ elements, generator: { options } }) => {
  const { willTransform } = options;

  const definitions = willTransform(elements).reduce((variables, element) => {
    const value = `var(--${pathToKebab(element.path)})`;
    const el = pathToObject(element.path.split('.').reverse(), value);

    return deepMerge(variables, el);
  }, {});

  return JSON.stringify(definitions);
});
