import { PathObject } from './types';

export const escapeIfExists = (value: string): string => (value ? `\\${value}` : '');

const parseQueryParams = (params: Record<string, any>) =>
  Object.entries(params).reduce(
    (qs, [key, value]) => `${qs}${qs === '' ? '?' : '&'}${key}=${value}`,
    '',
  );

export const toTest = (definition: PathObject) => (path: string) =>
  definition.regex.test(path) &&
  !(
    definition.couldHaveDoubleSeparator &&
    path.includes(definition.options.PATH_SEPARATOR + definition.options.PATH_SEPARATOR)
  );

export const toMatch = (definition: PathObject) => <T = Record<string, any>>(path: string): T => {
  if (definition.variables.length === 0) {
    return {} as T;
  }

  const result = definition.regex.exec(path);
  if (!result) {
    return {} as T;
  }

  return definition.variables.reduce((variables: any, variable, index) => {
    variables[variable.name] = result[index + 1];
    return variables;
  }, {}) as T;
};

export const toPathBuilder = (definition: PathObject) => (
  params: Record<string, any> = {},
  query: Record<string, any> = {},
) => {
  const qs = parseQueryParams(query);
  const definedParams = Object.keys(params);
  const path = definition.elements.reduce((partial: string, element) => {
    if (element.type === 'STATIC') {
      return `${partial}${definition.options.PATH_SEPARATOR}${element.value}`;
    }

    if (element.isOptional && !definedParams.includes(element.name)) {
      return partial;
    }

    const value = String(params[element.name]);
    if (!element.hasOptions || element.options.includes(value)) {
      return `${partial}${definition.options.PATH_SEPARATOR}${value}`;
    }

    return partial;
  }, '');

  return (path || '/') + qs;
};
