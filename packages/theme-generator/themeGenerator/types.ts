import {
  JSOSParserContext,
  JSOSParserDefinition,
  JSOSParserElement,
  JSOSTransformerContext,
  ValueParser,
} from '@micra/jsos';
import { ThemeTransformer } from '../transformers/types';

export type ThemeDefinition = JSOSParserDefinition & {};

export interface ThemeGenerator {
  tokens: JSOSParserDefinition;
  elements: JSOSParserElement[];
  to(...generators: ThemeTransformer[]): string[];
}

export interface ThemeGeneratorOptions {
  elements?: JSOSParserElement[];
  valueParsers?: Record<string, ValueParser>;
  parserContext?<T = Record<string, any>>(context: JSOSParserContext): T;
  transformerContext?<T = Record<string, any>>(
    context: JSOSTransformerContext,
  ): T;
}
