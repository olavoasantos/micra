# @micra/theme-generator

## Installation

```sh
yarn add @micra/theme-generator
```

## Basic usage

```typescript
import { writeFileSync } from 'fs';
import {
  ThemeToken,
  themeGenerator,
  toCssVariables,
} from '@micra/theme-generator';

export const theme: ThemeToken = {
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

themeGenerator(theme).to(
  toCssVariables({
    callback({ content }) {
      writeFileSync(`${__dirname}/variables.css`, content, 'utf-8');
    },
  }),
);
```

### ThemeToken definition

The `ThemeToken` object is an object that accepts strings or number as keys and `ThemeTokenDefinition` as value.

```typescript
interface ThemeToken {
  [key: string | number]: ThemeTokenDefinition;
}
```

`ThemeTokenDefinition`, on the other hand, can be a `string`, a `number`, an array of strings, a function that returns another `ThemeTokenDefinition` or another `ThemeToken`. In other words:

```typescript
export const theme: ThemeToken = {
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
  | ThemeToken
  | ThemeTokenDynamicDefinition
  | ThemeTokenPrimitive;

type ThemeTokenPrimitive = string | number | string[];

type ThemeTokenDynamicDefinition = (
  context: ThemeTokenContext,
) => ThemeTokenDefinition;
```

## themeGenerator function

The theme generator accepts a `ThemeToken` object, which defines your theme. Based on this, it returns an object with the `tokens`, a generic representation of the tokens and a `to` function:

```typescript
type ThemeGenerator = (
  tokens: ThemeToken,
) => {
  tokens: ThemeToken;
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
   * this element's ThemeToken definition. Based on the
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
   * of the value for this element's ThemeToken definition.
   * In our case, we'd get "#ccc".
   */
  value: string;
}
```

- Finally, the `to` function is the one which will transform your `elements` into something that you need. This function accepts a sequence of `generators` (which we'll cover next) and return an array with the generated content.

## Generators

After parsing the your `ThemeToken`, we need to transform them into something useful. Generators are responsible for transforming that generic representation of the tokens into things like CSS variable definitions, TypeScript types or JS/TS objects.

Each generator has the following structure:

```typescript
type GeneratorFunction = (
  options?: Partial<GeneratorOptions>,
) => ThemeGenerator<GeneratorOptions>;

// Where:
interface ThemeGenerator<T extends ThemeGeneratorOptions> {
  name: string;
  extension: string[];
  options: T;
  build(elements: ThemeElement[]): string;
}
```

This function accepts `options` for the generator and return a `ThemeGenerator` object. This object is composed of:

- `name`: is the name of the given generator
- `extension`: proposed extension for the content that's generated (e.g. ['js', 'ts'])
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
  tokens: ThemeToken;
  elements: ThemeElement[];
}
```

- The `callback` option is a function that'll be called right after the content has been generated. This function will receive a `CallbackContext` object containing the generated content, the generator itself, the tokens and the elements. This is useful for when you want to create a file with the generated content.

- The `willTransform` function is called right before the content is generated. This will receive the elements and should return elements. This is particularly useful if you need to filter or add elements to the list.

### Available generators

For the next examples and definition, let's consider the following `ThemeToken` definition:

```typescript
export const theme: ThemeToken = {
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
:root {
  --colors-white: #fff;
  --colors-gray-100: #f7fafc;
  --font-family-serif: Georgia, serif;
  --background-color-gray-100: #f7fafc;
}
```

##### Options

```typescript
export interface ToCssVariablesOptions extends ThemeGeneratorOptions {
  /**
   * Defines the sector used to define the variables.
   * Defaults to `:root`.
   */
  selector?: string;
}
```

#### toCssVariablesThemeObject

This generator is used if you want to use CSS variables with CSS-in-JS tools.

##### Usage

```typescript
const [jsThemeObject] = themeGenerator(theme).to(toCssVariablesThemeObject());
```

##### Result

```javascript
module.exports = {
  colors: {
    white: 'var(--colors-white)',
    gray: { '100': 'var(--colors-gray-100)' },
  },
  fontFamily: { serif: 'var(--font-family-serif)' },
  backgroundColor: { gray: { '100': 'var(--background-color-gray-100)' } },
};
```

##### Options

```typescript
export interface ToCssVariablesThemeObjectOptions
  extends ThemeGeneratorOptions {
  /**
   * Defines rather the output should use ES6 export syntax.
   * Defaults to `false`.
   */
  es6?: boolean;
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
export interface Theme {
  colors: { white: string; gray: { '100': string } };
  fontFamily: { serif: string };
  backgroundColor: { '100': string };
}
```

##### Options

```typescript
export interface ToGenericThemeTypeOptions extends ThemeGeneratorOptions {
  name?: string;
  parent?: string;
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
export const Theme = {
  colors: { white: '#fff', gray: { '100': '#f7fafc' } },
  fontFamily: { serif: 'Georgia, serif' },
  backgroundColor: { '100': '#f7fafc' },
};
```

##### Options

```typescript
export interface ToThemeObjectOptions extends ThemeGeneratorOptions {
  name?: string;
  shouldExport?: boolean;
  type?: string;
  imports?: string;
}
```

#### toThemeType

```typescript
const [tsType] = themeGenerator(theme).to(toThemeType());
```

##### Result

```typescript
interface Theme {
  colors: { white: '#fff'; gray: { '100': '#f7fafc' } };
  fontFamily: { serif: 'Georgia, serif' };
  backgroundColor: { gray: { '100': '#f7fafc' } };
}
```

##### Options

```typescript
export interface ToThemeTypeOptions extends ThemeGeneratorOptions {
  name?: string;
  parent?: string;
}
```