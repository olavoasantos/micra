import { ThemeElement, ThemeToken } from '../parser/types';

export interface ThemeGenerator<T extends ThemeGeneratorOptions = any> {
  name: string;
  extension: string[];
  options: T;
  build(elements: ThemeElement[]): string;
}

export interface CallbackContext {
  content: string;
  generator: ThemeGenerator;
  tokens: ThemeToken;
  elements: ThemeElement[];
}

export interface ThemeGeneratorOptions {
  callback?: (context: CallbackContext) => void;
  willTransform: (elements: ThemeElement[]) => ThemeElement[];
}
