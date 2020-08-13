import { deepMerge } from '../helpers/deepMerge';
import { pathToObject } from '../helpers/pathToObject';
import { createGenerator } from '../helpers/createGenerator';

export const toGenericThemeType = createGenerator(({ elements, generator: { options } }) => {
  const { willTransform } = options;
  const stringPlaceholder = '____str____';

  const definitions = willTransform(elements).reduce((variables, element) => {
    const el = pathToObject(element.path.split('.').reverse(), stringPlaceholder);

    return deepMerge(variables, el);
  }, {});

  return JSON.stringify(definitions).replace(new RegExp(`\"${stringPlaceholder}\"`, 'g'), 'string');
});
