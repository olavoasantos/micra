import { writeFileSync } from 'fs';
import { themeGenerator } from '../themeGenerator';
import { toThemeType } from '../generators/toThemeType';
import { toCssVariables } from '../generators/toCssVariables';
import { toCssVariablesThemeObject } from '../generators/toCssVariablesThemeObject';
import { ThemeToken } from '../parser/types';

const theme: ThemeToken = {
  colors: {
    white: '#fff', // Shallow
    gray: {
      100: '#f7fafc', // Nested
    },
  },
  fontFamily: {
    serif: ['Georgia', 'serif'], // array
  },
  backgroundColor: ({ theme }) => theme('colors.gray'), // functions
};

it('should pass', () => {
  const [tsTypes, cssVars, themeObject] = themeGenerator(theme).to([
    toThemeType,
    toCssVariables,
    toCssVariablesThemeObject,
  ]);

  writeFileSync(`${__dirname}/types.ts`, tsTypes, 'utf-8');
  writeFileSync(`${__dirname}/light.js`, themeObject, 'utf-8');
  writeFileSync(`${__dirname}/variables.css`, cssVars, 'utf-8');
});
