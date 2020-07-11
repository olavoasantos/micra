import { escapeIfExists } from './helpers';
import { DEFAULT_OPTIONS } from './constants';
import {
  PathOptions,
  PathParser,
  VariablePathElement,
  StaticPathElement,
  PathElements,
  PathObject,
} from './types';

export const path = (CUSTOM_OPTIONS: Partial<PathOptions> = {}): PathParser => {
  const options = Object.assign({}, DEFAULT_OPTIONS, CUSTOM_OPTIONS);
  const REGEXP_MATCH = `([^${escapeIfExists(options.PATH_SEPARATOR)}${escapeIfExists(
    options.VARIABLE_START,
  )}${escapeIfExists(options.VARIABLE_END)}${escapeIfExists(
    options.VARIABLE_ENUM_START,
  )}${escapeIfExists(options.VARIABLE_ENUM_END)}${escapeIfExists(
    options.VARIABLE_OPTIONAL_IDENTIFIER,
  )}]+)`;
  const REGEXP = new RegExp(
    [
      `^${escapeIfExists(options.VARIABLE_START)}${REGEXP_MATCH}${escapeIfExists(
        options.VARIABLE_ENUM_START,
      )}${REGEXP_MATCH}${escapeIfExists(options.VARIABLE_ENUM_END)}${escapeIfExists(
        options.VARIABLE_END,
      )}${escapeIfExists(options.VARIABLE_OPTIONAL_IDENTIFIER)}?$`,
      `^${escapeIfExists(options.VARIABLE_START)}${REGEXP_MATCH}${escapeIfExists(
        options.VARIABLE_END,
      )}${escapeIfExists(options.VARIABLE_OPTIONAL_IDENTIFIER)}?$`,
    ].join('|'),
  );

  const categorize = (piece: string): VariablePathElement | StaticPathElement => {
    const match = REGEXP.exec(piece);

    if (match) {
      return {
        type: 'VARIABLE',
        name: match[1] ?? match[3],
        hasOptions: Boolean(match[2]),
        isOptional: piece.includes(options.VARIABLE_OPTIONAL_IDENTIFIER),
        options: match[2] ? match[2].split(options.VARIABLE_ENUM_SEPARATOR) : [],
      };
    }

    return {
      type: 'STATIC',
      value: piece,
    };
  };

  const toRegex = (elements: PathElements[]) => {
    const OPTIONAL_SEPARATOR = `[${escapeIfExists(options.PATH_SEPARATOR)}]?`;
    if (elements.length === 0) {
      return `^${OPTIONAL_SEPARATOR}$`;
    }
    const regexp = elements.reduce((REGEX: string, element: PathElements) => {
      if (element.type === 'STATIC') {
        return `${REGEX}${OPTIONAL_SEPARATOR}${element.value}`;
      }

      if (element.hasOptions) {
        return element.isOptional
          ? `${REGEX}${OPTIONAL_SEPARATOR}(${element.options.join('|')})?`
          : `${REGEX}${options.PATH_SEPARATOR}(${element.options.join('|')})`;
      }

      return element.isOptional
        ? `${REGEX}${OPTIONAL_SEPARATOR}([^${options.PATH_SEPARATOR}]+)?`
        : `${REGEX}${options.PATH_SEPARATOR}([^${options.PATH_SEPARATOR}]+)`;
    }, '');

    if (regexp.startsWith(options.PATH_SEPARATOR)) {
      return `^${OPTIONAL_SEPARATOR}${regexp.slice(1)}${OPTIONAL_SEPARATOR}$`;
    }

    if (regexp.startsWith(OPTIONAL_SEPARATOR)) {
      return `^${regexp}${OPTIONAL_SEPARATOR}$`;
    }

    return `^${OPTIONAL_SEPARATOR}${regexp}${OPTIONAL_SEPARATOR}$`;
  };

  const parse = (value: string): PathElements[] =>
    value
      .split(options.PATH_SEPARATOR)
      .reduce(
        (elements: PathElements[], piece) =>
          Boolean(piece) ? elements.concat([categorize(piece)]) : elements,
        [],
      );

  return (route: string): PathObject => {
    const elements = parse(route);
    const regex = toRegex(elements);
    const lastElement = elements[elements.length - 1];
    return {
      elements,
      options,
      path: route,
      regex: new RegExp(regex),
      couldHaveDoubleSeparator:
        lastElement && lastElement.type === 'VARIABLE' && lastElement.isOptional,
      variables: elements.filter((element) => element.type === 'VARIABLE') as VariablePathElement[],
    };
  };
};
