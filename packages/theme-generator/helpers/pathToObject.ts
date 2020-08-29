import { DeepPartial } from './types';

export const pathToObject = <T = string>(
  path: string | string[],
  value: T,
): DeepPartial<T> => {
  const [key, ...pieces] = Array.isArray(path) ? path : path.split('.');
  return pieces.reduce(
    (partial: DeepPartial<T>, subKey) => ({ [subKey]: partial }),
    {
      [key]: value,
    },
  );
};
