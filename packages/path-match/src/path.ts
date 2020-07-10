export interface PathElement {
  type: string;
}

export interface PathOptions {
  PATH_SEPARATOR: string;
  VARIABLE_START: string;
  VARIABLE_END: string;
  VARIABLE_ENUM_START: string;
  VARIABLE_ENUM_END: string;
  VARIABLE_ENUM_SEPARATOR: string;
  VARIABLE_OPTIONAL_IDENTIFIER: string;
}

export interface StaticPathElement extends PathElement {
  type: 'STATIC';
  value: string;
}

export interface VariablePathElement extends PathElement {
  type: 'VARIABLE';
  name: string;
  hasOptions: boolean;
  isOptional: boolean;
  options: string[];
}

export type PathElements = StaticPathElement | VariablePathElement;

export const DEFAULT_PATH_SEPARATOR = '/';
export const DEFAULT_VARIABLE_START = ':';
export const DEFAULT_VARIABLE_END = '';
export const DEFAULT_VARIABLE_ENUM_START = '(';
export const DEFAULT_VARIABLE_ENUM_END = ')';
export const DEFAULT_VARIABLE_ENUM_SEPARATOR = '|';
export const DEFAULT_VARIABLE_OPTIONAL_IDENTIFIER = '?';

export const escapeIfExists = (value: string): string => (value ? `\\${value}` : '');

export type PathParser = (
  route: string,
) => {
  elements: PathElements[];
  options: PathOptions;
  path: string;
  regex: RegExp;
  variables: VariablePathElement[];
  couldHaveDoubleSeparator: boolean;
};

export const path = ({
  PATH_SEPARATOR = DEFAULT_PATH_SEPARATOR,
  VARIABLE_START = DEFAULT_VARIABLE_START,
  VARIABLE_END = DEFAULT_VARIABLE_END,
  VARIABLE_ENUM_START = DEFAULT_VARIABLE_ENUM_START,
  VARIABLE_ENUM_END = DEFAULT_VARIABLE_ENUM_END,
  VARIABLE_ENUM_SEPARATOR = DEFAULT_VARIABLE_ENUM_SEPARATOR,
  VARIABLE_OPTIONAL_IDENTIFIER = DEFAULT_VARIABLE_OPTIONAL_IDENTIFIER,
}: Partial<PathOptions> = {}): PathParser => {
  const REGEXP_MATCH = `([^${escapeIfExists(PATH_SEPARATOR)}${escapeIfExists(
    VARIABLE_START,
  )}${escapeIfExists(VARIABLE_END)}${escapeIfExists(VARIABLE_ENUM_START)}${escapeIfExists(
    VARIABLE_ENUM_END,
  )}${escapeIfExists(VARIABLE_OPTIONAL_IDENTIFIER)}]+)`;
  const REGEXP = new RegExp(
    [
      `^${escapeIfExists(VARIABLE_START)}${REGEXP_MATCH}${escapeIfExists(
        VARIABLE_ENUM_START,
      )}${REGEXP_MATCH}${escapeIfExists(VARIABLE_ENUM_END)}${escapeIfExists(
        VARIABLE_END,
      )}${escapeIfExists(VARIABLE_OPTIONAL_IDENTIFIER)}?$`,
      `^${escapeIfExists(VARIABLE_START)}${REGEXP_MATCH}${escapeIfExists(
        VARIABLE_END,
      )}${escapeIfExists(VARIABLE_OPTIONAL_IDENTIFIER)}?$`,
    ].join('|'),
  );

  const categorize = (piece: string): VariablePathElement | StaticPathElement => {
    const match = REGEXP.exec(piece);

    if (match) {
      return {
        type: 'VARIABLE',
        name: match[1] ?? match[3],
        hasOptions: Boolean(match[2]),
        isOptional: piece.includes(VARIABLE_OPTIONAL_IDENTIFIER),
        options: match[2] ? match[2].split(VARIABLE_ENUM_SEPARATOR) : [],
      };
    }

    return {
      type: 'STATIC',
      value: piece,
    };
  };

  const toRegex = (elements: PathElements[]) => {
    const OPTIONAL_SEPARATOR = `[${escapeIfExists(PATH_SEPARATOR)}]?`;
    const regexp = elements.reduce((REGEX: string, element: PathElements) => {
      if (element.type === 'STATIC') {
        return `${REGEX}${OPTIONAL_SEPARATOR}${element.value}`;
      }

      if (element.hasOptions) {
        return element.isOptional
          ? `${REGEX}${OPTIONAL_SEPARATOR}(${element.options.join('|')})?`
          : `${REGEX}${PATH_SEPARATOR}(${element.options.join('|')})`;
      }

      return element.isOptional
        ? `${REGEX}${OPTIONAL_SEPARATOR}([^${PATH_SEPARATOR}]+)?`
        : `${REGEX}${PATH_SEPARATOR}([^${PATH_SEPARATOR}]+)`;
    }, '');

    if (regexp.startsWith(PATH_SEPARATOR)) {
      return `^${OPTIONAL_SEPARATOR}${regexp.slice(1)}${OPTIONAL_SEPARATOR}$`;
    }

    if (regexp.startsWith(OPTIONAL_SEPARATOR)) {
      return `^${regexp}${OPTIONAL_SEPARATOR}$`;
    }

    return `^${OPTIONAL_SEPARATOR}${regexp}${OPTIONAL_SEPARATOR}$`;
  };

  const parse = (value: string): PathElements[] =>
    value
      .split(PATH_SEPARATOR)
      .reduce(
        (elements: PathElements[], piece) =>
          Boolean(piece) ? elements.concat([categorize(piece)]) : elements,
        [],
      );

  const options = {
    PATH_SEPARATOR,
    VARIABLE_START,
    VARIABLE_END,
    VARIABLE_ENUM_START,
    VARIABLE_ENUM_END,
    VARIABLE_ENUM_SEPARATOR,
    VARIABLE_OPTIONAL_IDENTIFIER,
  };

  return (route: string) => {
    const elements = parse(route);
    const regex = toRegex(elements);
    const lastElement = elements[elements.length - 1];
    return {
      elements,
      options,
      path: route,
      regex: new RegExp(regex),
      variables: elements.filter((element) => element.type === 'VARIABLE'),
      couldHaveDoubleSeparator: lastElement.type === 'VARIABLE' && lastElement.isOptional,
    };
  };
};
