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
    overlay: rgba('colors.white', .5)
  }),
};

// 2. Parse the tokens
const tokens = themeGenerator(theme);

// 3. Transpile the tokens into the format you need
const [cssVariables] = tokens.to(toCssVariables());

// 4. Save the content into a file
writeFileSync(
  `${__dirname}/variables.css`,
  `:root { ${content} }`,
  'utf-8',
);
```

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

Or if you like type definitions:

```typescript
type ThemeTokenDefinition =
  | ThemeTokens
  | ThemeTokenDynamicDefinition
  | ThemeTokenPrimitive;

type ThemeTokenPrimitive = string | number | string[];

type ThemeTokenDynamicDefinition = (
  context: ThemeTokenContext,
) => ThemeTokenDefinition;
```

## themeGenerator function

The theme generator accepts a `ThemeTokens` object, which defines your theme. Based on this, it returns an object with the `tokens`, a generic representation of the tokens and a `to` function:

```typescript
type ThemeGenerator = (
  tokens: ThemeTokens,
) => {
  tokens: ThemeTokens;
  elements: ThemeElement[];
  to(...generators: ThemeGenerator[]): string[];
};
```

- The `tokens` are simple the definition you passed to it.

- The `elements` are the a generic representation of the tokens. Think of this as a set of objects that will be used to translate your tokens into other languages:

```typescript
// Example
const theme = {
  colors: {
    gray: {
      100: '#ccc',
    },
  },
};

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

- Finally, the `to` function is the one which will transform your `elements` into something that you need. This function accepts a sequence of `generators` (which we'll cover next) and return an array with the generated content.

## Generators

After parsing the your `ThemeTokens`, we need to transform them into something useful. Generators are responsible for transforming that generic representation of the tokens into things like CSS variable definitions, TypeScript types or JS/TS objects.

Each generator has the following structure:

```typescript
type GeneratorFunction = (
  options?: Partial<GeneratorOptions>,
) => ThemeGenerator<GeneratorOptions>;

// Where:
interface ThemeGenerator<T extends ThemeGeneratorOptions> {
  options: T;
  build(elements: ThemeElement[]): string;
}
```

This function accepts `options` for the generator and return a `ThemeGenerator` object. This object is composed of:

- `options`: options for you to configure the generator (we'll see more next)
- `build` function that will generate the content based on the `ThemeElement` that is given

While each generator will have it's own particular option object, they all extend a common interface:

```typescript
interface ThemeGeneratorOptions {
  callback?: (context: CallbackContext) => void;
  willTransform?: (elements: ThemeElement[]) => ThemeElement[];
}

// Where:
interface CallbackContext {
  content: string;
  generator: ThemeGenerator;
  tokens: ThemeTokens;
  elements: ThemeElement[];
}
```

- The `callback` option is a function that'll be called right after the content has been generated. This function will receive a `CallbackContext` object containing the generated content, the generator itself, the tokens and the elements. This is useful for when you want to create a file with the generated content.

- The `willTransform` function is called right before the content is generated. This will receive the elements and should return elements. This is particularly useful if you need to filter or add elements to the list.

### Available generators

For the next examples and definition, let's consider the following `ThemeTokens` definition:

```typescript
export const theme: ThemeTokens = {
  colors: {
    white: '#fff',
    gray: {
      100: '#f7fafc',
    },
  },
  fontFamily: {
    serif: ['Georgia', 'serif'],
  },
  backgroundColor: ({ theme }) => ({ gray: theme('colors.gray') }),
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
--colors-white: #fff;
--colors-gray-100: #f7fafc;
--font-family-serif: Georgia, serif;
--background-color-gray-100: #f7fafc;
```

#### toCssVariablesThemeObject

This generator is used if you want to use CSS variables with CSS-in-JS tools.

##### Usage

```typescript
const [jsThemeObject] = themeGenerator(theme).to(toCssVariablesThemeObject());
```

##### Result

```javascript
{
  colors: {
    white: 'var(--colors-white)',
    gray: { '100': 'var(--colors-gray-100)' },
  },
  fontFamily: { serif: 'var(--font-family-serif)' },
  backgroundColor: { gray: { '100': 'var(--background-color-gray-100)' } },
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
  colors: { white: string; gray: { '100': string } };
  fontFamily: { serif: string };
  backgroundColor: { '100': string };
}
```

#### toThemeObject

This generates a theme object. Useful if you are not using CSS variables and want a global theme object.

##### Usage

```typescript
const [tsType] = themeGenerator(theme).to(toThemeObject());
```

##### Result

```typescript
{
  colors: { white: '#fff', gray: { '100': '#f7fafc' } },
  fontFamily: { serif: 'Georgia, serif' },
  backgroundColor: { '100': '#f7fafc' },
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
  colors: { white: '#fff'; gray: { '100': '#f7fafc' } };
  fontFamily: { serif: 'Georgia, serif' };
  backgroundColor: { gray: { '100': '#f7fafc' } };
}
```
