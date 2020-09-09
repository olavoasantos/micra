import { DeepPartial } from './types';

export const pathToObject = <T = string>(
  path: string | string[],
  value: T,
): DeepPartial<T> => {
  const [key, ...pieces] = Array.isArray(path)
    ? [...path].reverse()
    : path.split('.').reverse();
  return pieces.reduce(
    (partial: DeepPartial<T>, subKey) => ({ [subKey]: partial }),
    {
      [key]: value,
    },
  );
};
