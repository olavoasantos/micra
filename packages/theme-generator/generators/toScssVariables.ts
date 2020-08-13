import { createGenerator } from './createGenerator';
import { pathToKebab } from '../helpers/pathToKebab';

export const toScssVariables = createGenerator(
  ({ elements, parseValue, generator: { options } }) => {
    const { willTransform } = options;

    const definitions = willTransform(elements).reduce((variables, element) => {
      const name = `$${pathToKebab(element.path)}`;
      const value = parseValue(element.value, {
        from(path: string) {
          return `$${pathToKebab(path)}`;
        },
      });

      return `${variables} ${name}: ${value};`.trim();
    }, '');

    return definitions;
  },
);
