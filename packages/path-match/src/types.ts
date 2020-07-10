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

export interface PathObject {
  elements: PathElements[];
  options: PathOptions;
  path: string;
  regex: RegExp;
  variables: VariablePathElement[];
  couldHaveDoubleSeparator: boolean;
}

export type PathParser = (route: string) => PathObject;
