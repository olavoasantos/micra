import { createGenerator } from '../helpers/createGenerator';

export const toThemeType = createGenerator(({ elements, deepMerge, pathToObject, parseValue, generator: { options } }) => {
  const { willTransform } = options;

  const definitions = willTransform(elements).reduce((variables, element) => {
    const el = pathToObject(
      element.path.split('.').reverse(),
      parseValue(element.value, {
        from(path: string) {
          return elements.find((el) => el.path === path)?.value ?? '';
        },
      }),
    );

    return deepMerge(variables, el);
  }, {});

  return JSON.stringify(definitions);
});
