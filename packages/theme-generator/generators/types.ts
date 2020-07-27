import { ThemeElement } from '../parser/types';

export interface ThemeGenerator {
  build(ast: ThemeElement[]): string;
}
