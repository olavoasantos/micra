import { BaseGeneratorContext } from '../generators/types';

export type ParserArgs = (string | BaseGeneratorContext)[];
export type ParseValueVisitor = (
  value: string,
  meta: Record<string, string | BaseGeneratorContext | ParserArgs | Record<string, ValueParser>>,
) => string;
export type ParseValue = (value: string, visitors?: Record<string, ParseValueVisitor>) => string;
export type ParseValueGenerator = (context: BaseGeneratorContext) => ParseValue;
export type ValueParser = (...args: ParserArgs) => string;
