export interface ThemeTokenContext {
  theme(path: string): ThemeTokenDefinition;
}
export type ThemeTokenPrimitive = string | number | string[];
export type ThemeTokenDynamicPrimitive = (context: ThemeTokenContext) => ThemeTokenDefinition;
export type ThemeTokenDefinition = ThemeToken | ThemeTokenDynamicPrimitive | ThemeTokenPrimitive;
export interface ThemeToken {
  [key: string]: ThemeTokenDefinition;
  [key: number]: ThemeTokenDefinition;
}
export interface ThemeElement {
  path: string[];
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
