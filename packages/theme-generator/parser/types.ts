import { MakeContext } from './context';

export interface ThemeTokenContext {
  tokens: ThemeToken;
  theme(path: string): ThemeTokenDefinition;
  rgba(path: string, opacity: number): ThemeTokenDefinition;
}
export type ThemeTokenPrimitive = string | number | string[];
export type ThemeTokenDynamicDefinition = (context: ThemeTokenContext) => ThemeTokenDefinition;
export type ThemeTokenDefinition = ThemeToken | ThemeTokenDynamicDefinition | ThemeTokenPrimitive;
export interface ThemeToken {
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

export interface ThemeParserOptions<E = ThemeTokenContext> {
  context: ThemeTokenContext;
  elements: ThemeElement[];
  resolvers: ThemeResolver[];
  makeContext: MakeContext<E>;
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export type ThemeParser<E extends ThemeTokenContext = any> = (
  tokens: ThemeToken,
  options?: Partial<ThemeParserOptions<E>>,
) => ThemeElement[];
