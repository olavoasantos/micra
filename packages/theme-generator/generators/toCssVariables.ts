import { createGenerator } from '../helpers/createGenerator';

export const toCssVariables = createGenerator(
  ({ elements, parseValue, pathToKebab, generator: { options } }) => {
    const { willTransform } = options;

    const definitions = willTransform(elements).reduce((variables, element) => {
      const name = `--${pathToKebab(element.path)}`;
      const value = parseValue(element.value, {
        token(path: string) {
          return `var(--${pathToKebab(path)})`;
        },
      });

      return `${variables} ${name}: ${value};`.trim();
    }, '');

    return definitions;
  },
);
