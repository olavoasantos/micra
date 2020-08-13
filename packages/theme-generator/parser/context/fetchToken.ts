import { isPrimitive } from '../helpers';
import { ThemeTokenDefinition } from '../types';

export const fetchToken = (theme: ThemeTokenDefinition) => (path: string): ThemeTokenDefinition => {
  let definition = theme;
  for (const key of path.split('.')) {
    const value = definition[key as keyof ThemeTokenDefinition];
    if (value == null) {
      return path;
    }

    definition = value;
  }

  if (isPrimitive(definition)) {
    return `from::${path}`;
  }

  return definition;
};
