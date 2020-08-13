import { ThemeToken } from '../types';
import { isPrimitive } from '../helpers';
import { fetchToken } from './fetchToken';

export const rgba = (tokens: ThemeToken): ((path: string, opacity: number) => string) => {
  const theme = fetchToken(tokens);
  return (path: string, opacity: number) => {
    const value = theme(path);

    if (isPrimitive(value)) {
      const parsed = Array.isArray(value) ? value.join(', ') : String(value);
      return `rgba::${parsed}|${opacity}`;
    }

    throw new Error(`Invalid value found in rgba "${path}|${opacity}"`);
  };
};
