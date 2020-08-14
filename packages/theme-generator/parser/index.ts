import { ThemeParser } from './types';
import { createContext } from './context';
import { defaultResolvers } from './resolvers';
import { createThemeElement } from './helpers';

export const themeParser: ThemeParser = (
  definition,
  {
    makeContext,
    elements = [],
    resolvers = [],
    context = createContext(definition, makeContext),
  } = {},
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
