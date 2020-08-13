export interface ThemeTokenContext {
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
export type ElementType = 'PRIMARY' | 'DERIVED';
export interface ThemeElement {
  type: ElementType;
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
