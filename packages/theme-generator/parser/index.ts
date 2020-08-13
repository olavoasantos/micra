import { createContext } from './context';
import { ThemeParser } from './types';
import { defaultResolvers } from './resolvers';
import { createThemeElement } from './helpers';

export const parser: ThemeParser = (
  definition,
  { context = createContext(definition), elements = [], resolvers = [] } = {},
) => {
  const themeResolvers = resolvers.concat(defaultResolvers);
  for (const [key, entry] of Object.entries(definition)) {
    const element = createThemeElement(key);

    for (const resolver of themeResolvers) {
      if (resolver.check(entry)) {
        elements = elements.concat(resolver.resolve(element, entry, context));
        break;
      }
    }
  }

  return elements;
};
