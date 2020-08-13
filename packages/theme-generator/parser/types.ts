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

export interface ThemeParserOptions {
  context: ThemeTokenContext;
  elements: ThemeElement[];
  resolvers: ThemeResolver[];
}

export type ThemeParser = (
  tokens: ThemeToken,
  options?: Partial<ThemeParserOptions>,
) => ThemeElement[];
