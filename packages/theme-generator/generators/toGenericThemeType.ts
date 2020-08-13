import { DeepPartial } from '../helpers/types';
import { deepMerge } from '../helpers/deepMerge';
import { createGenerator } from './createGenerator';
import { pathToObject } from '../helpers/pathToObject';

export const toGenericThemeType = createGenerator(({ elements, generator: { options } }) => {
  const { willTransform } = options;
  const stringPlaceholder = '____str____';

  const definitions = willTransform(elements).reduce((variables, element) => {
    const el = pathToObject(element.path.split('.').reverse(), stringPlaceholder);

    return deepMerge(variables, el);
  }, {});

  return JSON.stringify(definitions).replace(new RegExp(`\"${stringPlaceholder}\"`, 'g'), 'string');
});
