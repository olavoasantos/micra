import { ThemeElement, ThemeTokenDefinition } from '../types';

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
