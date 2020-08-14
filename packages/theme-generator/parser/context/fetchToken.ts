import { isPrimitive, replaceDeep } from '../helpers';
import { ThemeTokenContext, ThemeTokenDefinition } from '../types';

export const fetchToken = (context: ThemeTokenContext) => (path: string): ThemeTokenDefinition => {
  let definition = context.tokens as ThemeTokenDefinition;
  for (const key of path.split('.')) {
    const value = definition[key as keyof ThemeTokenDefinition];
    if (value == null) {
      return path;
    }

    definition = value;
  }

  if (isPrimitive(definition)) {
    return `token::${path}`;
  }

  return replaceDeep(
    definition,
    (_: ThemeTokenDefinition, breadcrumbs: string[]) => `token::${breadcrumbs.join('.')}`,
    context,
    path.split('.'),
  );
};
