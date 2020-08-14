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
  toCssVariables,
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
  backgroundColor: ({ theme, rgba }) => ({
    gray: theme('colors.gray'),
    overlay: rgba('colors.black', 0.5),
  }),
};

// 2. Parse the tokens
const tokens = themeGenerator(theme);

// 3. Transpile the tokens into the format you need
const [cssVariables] = tokens.to(toCssVariables());

// 4. Save the content into a file
writeFileSync(`${__dirname}/variables.css`, `:root { ${content} }`, 'utf-8');
```

- If you want to see the available generators we have go to the [#available-generators](#available-generators) section!

- If you want to get a deeper understanding of what the theme generator provides, keep on reading below!

### ThemeTokens definition

The `ThemeTokens` object is an object that accepts strings or number as keys and `ThemeTokenDefinition` as value.

```typescript
interface ThemeTokens {
  [key: string | number]: ThemeTokenDefinition;
}
```

`ThemeTokenDefinition`, on the other hand, can be a `string`, a `number`, an array of strings, a function that returns another `ThemeTokenDefinition` or another `ThemeTokens`. In other words:

```typescript
export const theme: ThemeTokens = {
  colors: { // <~~ another ThemeToken
    white: '#fff', // <~~ string
  },
  opacity: {
    10: 0.1, // <~~ number
  },
  fontFamily: {
    serif: ['Georgia', 'serif'], // <~~ array
  },
  backgroundColor: ({ theme }) => ({ gray: theme('colors.gray') }), // <~~ function
};
```

## themeGenerator function

The theme generator accepts a `ThemeTokens` object, which defines your theme. Based on this, it returns an object with the `tokens`, a generic representation of the tokens and a `to` function:

```typescript
type ThemeGenerator = (
  /**
   * tokens
   * The `tokens` are simple the definition you passed to it.
   */
  tokens: ThemeTokens,
  /**
   * options
   * These are options that you can use to customize the
   * generator (see description below).
   */
  options?: Partial<ThemeParserOptions>,
) => {
  /**
   * tokens
   * The `tokens` are simple the definition you passed to it.
   */
  tokens: ThemeTokens;
  /**
   * tokens
   * The `elements` are the a generic representation of the
   * tokens. Think of this as a set of objects that will
   * be used to translate your tokens into other
   * languages.
   */
  elements: ThemeElement[];
  /**
   * to
   * the `to` function is the one which will transform your
   * `elements` into something that you need. This function
   * accepts a sequence of `generators` (which we'll cover
   * next) and return an array with the generated content.
   */
  to(...generators: ThemeGenerator[]): string[];
};

// where
interface ThemeParserOptions {
  /**
   * makeContext
   * This is a function that can be used to extend the context passed to
   * the callback token definitions.
   */
  makeContext: (context: ThemeTokenContext) => Record<string, any>;
  /**
   * valueParsers
   * generators
   */
  valueParsers: Record<string, ValueParser>;
  /**
   * elements
   * This is a list of previously parsed elements. This is useful if
   * you wish to merge two sets of parsed elements (e.g. parse
   * design tokens separately from specific definitions).
   */
  elements: ThemeElement[];
}

interface ThemeElement {
  /*
   * The main key of the element. This is the first key in
   * this element's ThemeTokens definition. Based on the
   * `theme` above, "colors" would be main key.
   */
  main: string;

  /*
   * The path key of the element. This is the dot-separated
   * path of the element's definition. Based on the
   * `theme` above, we get "colors.gray.100".
   */
  path: string;

  /*
   * The breadcrumbs of the element. This is an array which
   * contains the pieces of the path for this definition.
   * From above, we get "['colors', 'gray', '100']".
   */
  breadcrumbs: string[];

  /*
   * The value of the element. This is a string representation
   * of the value for this element's ThemeTokens definition.
   * In our case, we'd get "#ccc".
   */
  value: string;
}
```

## Generators

After parsing the your `ThemeTokens`, we need to transform them into something useful. Generators are responsible for transforming that generic representation of the tokens into things like CSS variable definitions, TypeScript types or JS/TS objects.

Each generator accepts an object which can contain:

```typescript
interface ThemeGeneratorOptions {
  /**
   * willTransform
   * This function is called right before the content is generated.
   * This will receive the elements and should return elements. This is
   * particularly useful if you need to filter or add elements to the list.
   */
  willTransform?: (elements: ThemeElement[]) => ThemeElement[];
  /**
   * callback
   * This function that'll be called right after the content has been
   * generated This function will receive a `CallbackContext` object
   * containing the generated content, the generator itself, the
   * tokens and the elements. This is useful for when you
   * want to create a file with the generated content.
   */
  callback?: (context: CallbackContext) => void;
}

// Where:
interface CallbackContext {
  /** Context definitions */
  content: string;
  elements: ThemeElement[];
  generator: ThemeGenerator;
  tokens: ThemeTokens;

  /** Helper functions */
  /**
   * parseValue
   * This function converts special markup from the parser into
   * actual values. The markup consists of `FnName::arg1|arg2`.
   * In case you need to modify the value of a specific function,
   * you can pass a `visitor` function on the object.
   *
   * Example:
   * parseValue('token::color.blue', {
   *  token(path: string, { pathToKebab }) {
   *    return `var(--${pathToKebab(path)})`;
   *  },
   * }); // "var(--color-blue)"
   */
  parseValue(value: string, visitors?: Record<string, ParseValueVisitor>): string;
  /**
   * camelToKebab
   * Transforms a camel-cased string into kebab-case
   * example: camelCase => camel-case
   */
  camelToKebab: (value: string) => string;
  /**
   * deepMerge
   * Deep merges two objects.
   */
  deepMerge: <
    A = Record<string | number, unknown>,
    B = Record<string | number, unknown>
  >(
    target: A,
    values: B,
  ) => A & B;
  /**
   * pathToKebab
   * Converts a ThemeElement's `path` to kebab-case.
   * example: backgroundColor.gray.100 => background-color-gray-100
   */
  pathToKebab: (path: string) => string;
  /**
   * pathToObject
   * Converts a ThemeElement's `path` to an object containing a given value.
   * example: pathToObject('backgroundColor.gray', '#ccc') => { backgroundColor: { gray: '#ccc' } }
   */
  pathToObject: <T = string>(
    path: string | string[],
    value: T,
  ) => DeepPartial<T>;
}

interface DeepPartial<T = string> {
  [key: string]: T | DeepPartial<T>;
}
```

### Available generators

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
  backgroundColor: ({ theme, rgba }) => ({
    gray: theme('colors.gray'),
    overlay: rgba('colors.black', 0.5),
  }),
};
```

#### toCssVariables

This generates CSS variable definitions based on the theme.

##### Usage

```typescript
const [cssVariables] = themeGenerator(theme).to(toCssVariables());
```

##### Result

```css
--colors-black: #000;
--colors-gray-100: #f7fafc;
--font-family-serif: Georgia, serif;
--background-color-gray-100: var(--colors-gray-100);
--background-color-overlay: rgba(var(--colors-black), 0.5);
```

#### toCssVariablesThemeObject

This generator is used if you want to use CSS variables with CSS-in-JS tools.

##### Usage

```typescript
const [jsThemeObject] = themeGenerator(theme).to(toCssVariablesThemeObject());
```

##### Result

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

#### toGenericThemeType

This generates a generic Theme object based on the tokens. This is useful if you wish to create a generic interface to serve as base for multiple themes.

##### Usage

```typescript
const [tsType] = themeGenerator(theme).to(toGenericThemeType());
```

##### Result

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

#### toScssVariables

This generates SCSS variable definitions based on the theme.

##### Usage

```typescript
const [scssVariables] = themeGenerator(theme).to(toScssVariables());
```

##### Result

```scss
$colors-black: #000;
$colors-gray-100: #f7fafc;
$font-family-serif: Georgia, serif;
$background-color-gray-100: $colors-gray-100;
$background-color-overlay: rgba($colors-black, 0.5);
```

#### toThemeObject

This generates a theme object. Useful if you are not using CSS variables and want a global theme object.

##### Usage

```typescript
const [tsType] = themeGenerator(theme).to(toThemeObject());
```

##### Result

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

#### toThemeType

##### Usage

```typescript
const [tsType] = themeGenerator(theme).to(toThemeType());
```

##### Result

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
