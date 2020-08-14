import { ParseValue } from '../parseValue/types';
import { ThemeElement, ThemeTokens } from '../parser/types';
import { deepMerge } from '../helpers/deepMerge';
import { camelToKebab } from '../helpers/camelToKebab';
import { pathToObject } from '../helpers/pathToObject';
import { pathToKebab } from '../helpers/pathToKebab';

export interface BaseGeneratorContext {
  tokens: ThemeTokens;
  elements: ThemeElement[];
  generator: ThemeGenerator;
  deepMerge: typeof deepMerge;
  pathToKebab: typeof pathToKebab;
  camelToKebab: typeof camelToKebab;
  pathToObject: typeof pathToObject;
}

export interface PreGeneratorContext extends BaseGeneratorContext {
  parseValue: ParseValue;
}

export interface PostGeneratorContext extends PreGeneratorContext {
  content: string;
}

export interface ThemeGeneratorOptions {
  callback?: (context: PostGeneratorContext) => void;
  willTransform: (elements: ThemeElement[]) => ThemeElement[];
}

export interface ThemeGenerator<T extends ThemeGeneratorOptions = ThemeGeneratorOptions> {
  options: T;
  build(context: PreGeneratorContext): string;
}
