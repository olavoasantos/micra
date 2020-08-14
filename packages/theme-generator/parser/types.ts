import { ValueParser } from '../parseValue/types';
import { MakeContext } from './context';

export interface ThemeTokenContext {
  tokens: ThemeTokens;
  theme(path: string): ThemeTokenDefinition;
  rgba(path: string, opacity: number): ThemeTokenDefinition;
}
export type ThemeTokenPrimitive = string | number | string[];
export type ThemeTokenDynamicDefinition = (context: ThemeTokenContext) => ThemeTokenDefinition;
export type ThemeTokenDefinition = ThemeTokens | ThemeTokenDynamicDefinition | ThemeTokenPrimitive;
export interface ThemeTokens {
  [key: string]: ThemeTokenDefinition;
  [key: number]: ThemeTokenDefinition;
}

export interface ThemeElement {
  main: string;
  path: string;
  breadcrumbs: string[];
  value: string;
}

export interface ThemeResolver {
  check(definition: ThemeTokenDefinition): boolean;
  resolve(
    element: ThemeElement,
    definition: ThemeTokenDefinition,
    context: ThemeTokenContext,
  ): ThemeElement[];
}

export interface ThemeParserOptions {
  context: ThemeTokenContext;
  elements: ThemeElement[];
  resolvers: ThemeResolver[];
  makeContext: MakeContext;
  valueParsers: Record<string, ValueParser>;
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export type ThemeParser = (
  tokens: ThemeTokens,
  options?: Partial<ThemeParserOptions>,
) => ThemeElement[];
