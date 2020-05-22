import kebabCase from 'lodash/kebabCase';

export const flatten = (
  obj: Record<string, any>,
  separator = '.',
  normalizeKey: (key: string) => string = kebabCase,
) => {
  return Object.entries(obj).reduce(
    (toReturn: Record<string | number, string | number>, [name, value]) => {
      if (Array.isArray(value)) {
        toReturn[normalizeKey(name)] = value.join(', ');
      } else if (typeof value === 'object' && value !== null) {
        Object.entries(flatten(value, separator, normalizeKey)).forEach(([key, definition]) => {
          toReturn[`${normalizeKey(name)}${separator}${normalizeKey(key)}`] = definition as
            | string
            | number;
        });
      } else {
        toReturn[normalizeKey(name)] = value as string | number;
      }
      return toReturn;
    },
    {},
  );
};
