# @micra/theme-generator

## Installation

```sh
yarn add @micra/theme-generator
```

## Basic usage

```typescript
import { writeFileSync } from 'fs';
import {
  ThemeTokens,
  themeGenerator,
  cssVariables,
} from '@micra/theme-generator';

// 1. Define your theme tokens
export const themeTokens: ThemeTokens = {
  colors: {
    black: '#000',
    gray: {
      100: '#f7fafc',
    },
  },
  fontFamily: {
    serif: ['Georgia', 'serif'],
  },
  backgroundColor: ({ get, rgba }) => ({
    gray: get('colors.gray'),
    overlay: rgba('colors.black', 0.5),
  }),
};

// 2. Parse the tokens
const tokens = themeGenerator(theme);

// 3. Transpile the tokens into the format you need
const [cssVariables] = tokens.to(cssVariables());

// 4. Save the content into a file
writeFileSync(`${__dirname}/variables.css`, `:root { ${content} }`, 'utf-8');
```

- If you want to see the available transformers we have go to the [#available-transformers](#available-transformers) section!
- If you want to get a deeper understanding of what the theme generator provides, keep on reading below!

### ThemeTokens definition

The `ThemeTokens` object is an object that accepts strings or number as keys and `ThemeTokenDefinition` as value.

```typescript
interface ThemeDefinition {
  [key: string | number]: string | number | string[] | number[] | (context: ThemeContext) => ThemeDefinition | ThemeDefinition;
}
```

`ThemeTokenDefinition`, on the other hand, can be a `string`, a `number`, an array of strings, a function that returns another `ThemeTokenDefinition` or another `ThemeTokens`. In other words:

```typescript
export const theme: ThemeDefinition = {
  colors: { // <~~ another ThemeToken
    white: '#fff', // <~~ string
  },
  opacity: {
    10: 0.1, // <~~ number
  },
  fontFamily: {
    serif: ['Georgia', 'serif'], // <~~ array
  },
  backgroundColor: ({ get }) => ({ gray: get('colors.gray') }), // <~~ function
};
```

Functions receive a context with containing:

```typescript
interface ThemeContext {
  tokens: ThemeDefinition;
  get(path: string): ThemeDefinition;
  rgba(pathOrValue: string, opacity: number): ThemeDefinition;
  camelToKebab: (value: string) => string;
  pathToKebab: (path: string) => string;
  deepMerge: <
    A = Record<string | number, unknown>,
    B = Record<string | number, unknown>
  >(
    target: A,
    values: B,
  ) => A & B;
  pathToObject: <T = string>(
    path: string | string[],
    value: T,
  ) => DeepPartial<T>;
}

interface DeepPartial<T = string> {
  [key: string]: T | DeepPartial<T>;
}
```

## Available transformers

For the next examples and definition, let's consider the following `ThemeTokens` definition:

```typescript
export const theme: ThemeTokens = {
  colors: {
    black: '#000',
    gray: {
      100: '#f7fafc',
    },
  },
  fontFamily: {
    serif: ['Georgia', 'serif'],
  },
  backgroundColor: ({ get, rgba }) => ({
    gray: get('colors.gray'),
    overlay: rgba('colors.black', 0.5),
  }),
};
```

### cssVariables

This generates CSS variable definitions based on the theme.

#### Usage

```typescript
const [variables] = themeGenerator(theme).to(cssVariables());
```

#### Result

```css
--colors-black: #000;
--colors-gray-100: #f7fafc;
--font-family-serif: Georgia, serif;
--background-color-gray-100: var(--colors-gray-100);
--background-color-overlay: rgba(var(--colors-black), 0.5);
```

### cssVariablesThemeObject

This generator is used if you want to use CSS variables with CSS-in-JS tools.

#### Usage

```typescript
const [jsThemeObject] = themeGenerator(theme).to(cssVariablesThemeObject());
```

#### Result

```json
{
  "colors": {
    "black": "var(--colors-black)",
    "gray": { "100": "var(--colors-gray-100)" }
  },
  "fontFamily": { "serif": "var(--font-family-serif)" },
  "backgroundColor": {
    "gray": { "100": "var(--background-color-gray-100)" },
    "overlay": "var(--background-color-overlay)"
  }
}
```

### genericThemeType

This generates a generic Theme object based on the tokens. This is useful if you wish to create a generic interface to serve as base for multiple themes.

#### Usage

```typescript
const [tsType] = themeGenerator(theme).to(genericThemeType());
```

#### Result

```typescript
{
  "colors": { "black": string, "gray": { "100": string } },
  "fontFamily": { "serif": string },
  "backgroundColor": {
    "gray": { "100": string },
    "overlay": string
  }
}
```

> IMPORTANT: The generator returns the interface's shape. It does NOT attempt to name or export the interface to give the developer the flexibility to do so as they see fit.

### scssVariables

This generates SCSS variable definitions based on the theme.

#### Usage

```typescript
const [variables] = themeGenerator(theme).to(scssVariables());
```

#### Result

```scss
$colors-black: #000;
$colors-gray-100: #f7fafc;
$font-family-serif: Georgia, serif;
$background-color-gray-100: $colors-gray-100;
$background-color-overlay: rgba($colors-black, 0.5);
```

### themeObject

This generates a theme object. Useful if you are not using CSS variables and want a global theme object.

#### Usage

```typescript
const [tsType] = themeGenerator(theme).to(themeObject());
```

#### Result

```json
{
  "colors": { "black": "#000", "gray": { "100": "#f7fafc" } },
  "fontFamily": { "serif": "Georgia, serif" },
  "backgroundColor": {
    "gray": { "100": "#f7fafc" },
    "overlay": "rgba(#000, 0.5)"
  }
}
```

### themeType

#### Usage

```typescript
const [tsType] = themeGenerator(theme).to(themeType());
```

#### Result

```typescript
{
  "colors": { "black": "#000", "gray": { "100": "#f7fafc" } },
  "fontFamily": { "serif": "Georgia, serif" },
  "backgroundColor": {
    "gray": { "100": "#f7fafc" },
    "overlay": "rgba(#000, 0.5)"
  }
}
```

> IMPORTANT: The generator returns the interface's shape. It does NOT attempt to name or export the interface to give the developer the flexibility to do so as they see fit.
