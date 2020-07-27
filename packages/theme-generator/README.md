# @micra/theme-generator

## Installation

```sh
yarn add @micra/theme-generator
```

## Basic usage

```typescript
import { writeFileSync } from 'fs';
import { ThemeToken, themeGenerator, toCssVariables } from '@micra/theme-generator';

export const theme: ThemeToken = {
  colors: {
    white: '#fff',    // Shallow
    gray: {
      100: '#f7fafc', // Nested
    },
  },
  fontFamily: {
    serif: ['Georgia', 'serif'], // array
  },
  backgroundColor: ({ theme }) => ({ gray: theme('colors.gray') }), // functions
}

const [cssVariables] = themeGenerator(theme).to([toCssVariables]);

writeFileSync(`${__dirname}/variables.css`, cssVariables, 'utf-8');
```

## Generators

Based on:

```typescript
export const theme: ThemeToken = {
  colors: {
    white: '#fff',    // Shallow
    gray: {
      100: '#f7fafc', // Nested
    },
  },
  fontFamily: {
    serif: ['Georgia', 'serif'], // array
  },
  backgroundColor: ({ theme }) => ({ gray: theme('colors.gray') }), // functions
}
```

### toCssVariables

```typescript
const [cssVariables] = themeGenerator(theme).to([toCssVariables]);
```

Result:

```css
:root {
  --colors-white: #fff;
  --colors-gray-100: #f7fafc;
  --font-family-serif: Georgia, serif;
  --background-color-gray-100: #f7fafc;
}
```

### toCssVariablesThemeObject

```typescript
const [jsThemeObject] = themeGenerator(theme).to([toCssVariablesThemeObject]);
```

Result:

```javascript
module.exports = {
  colors: { white: 'var(--colors-white)', gray: { '100': 'var(--colors-gray-100)' } },
  fontFamily: { serif: 'var(--font-family-serif)' },
  backgroundColor: { gray: { '100': 'var(--background-color-gray-100)' } },
};
```

### toThemeType

```typescript
const [tsType] = themeGenerator(theme).to([toThemeType]);
```

Result:

```typescript
interface Theme {
  colors: { white: '#fff'; gray: { '100': '#f7fafc' } };
  fontFamily: { serif: 'Georgia, serif' };
  backgroundColor: { gray: { '100': '#f7fafc' } };
}
```
