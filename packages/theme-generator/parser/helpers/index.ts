import { ThemeElement, ThemeTokenContext, ThemeTokenDefinition, ThemeTokens } from '../types';

export const createThemeElement = (name = ''): ThemeElement => ({
  main: name,
  path: name,
  breadcrumbs: [name],
  value: '',
});

export const isPrimitive = (definition: ThemeTokenDefinition): boolean => {
  return (
    typeof definition === 'string' || typeof definition === 'number' || Array.isArray(definition)
  );
};

export const replaceDeep = (
  obj: ThemeTokenDefinition,
  replace: (value: ThemeTokenDefinition, breadcrumbs: string[]) => string | string,
  context: ThemeTokenContext,
  breadcrumbs: string[] = [],
): ThemeTokens => {
  const result: ThemeTokenDefinition = {};
  for (const [key, value] of Object.entries(obj)) {
    if (isPrimitive(value)) {
      result[key] =
        typeof replace === 'function' ? replace(value, breadcrumbs.concat([key])) : replace;
      continue;
    }

    if (typeof value === 'object' && value != null) {
      result[key] = replaceDeep(value, replace, context, breadcrumbs.concat([key]));
      continue;
    }

    if (typeof value === 'function') {
      result[key] = replaceDeep(value(context), replace, context, breadcrumbs.concat([key]));
      continue;
    }
  }

  return result;
};
