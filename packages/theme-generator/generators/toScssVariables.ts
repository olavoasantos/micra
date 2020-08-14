import { createGenerator } from '../helpers/createGenerator';

export const toScssVariables = createGenerator(
  ({ elements, pathToKebab, parseValue, generator: { options } }) => {
    const { willTransform } = options;

    const definitions = willTransform(elements).reduce((variables, element) => {
      const name = `$${pathToKebab(element.path)}`;
      const value = parseValue(element.value, {
        token(path: string) {
          return `$${pathToKebab(path)}`;
        },
      });

      return `${variables} ${name}: ${value};`.trim();
    }, '');

    return definitions;
  },
);
