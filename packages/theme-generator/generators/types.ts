import { ParseValue } from '../parseValue/types';
import { ThemeElement, ThemeToken } from '../parser/types';

export interface BaseGeneratorContext {
  tokens: ThemeToken;
  elements: ThemeElement[];
  generator: ThemeGenerator;
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
