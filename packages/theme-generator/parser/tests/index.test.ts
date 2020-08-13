import { parser } from '..';
import { ThemeTokenDefinition } from '../types';

export const theme: ThemeTokenDefinition = {
  colors: {
    // <~~ another ThemeToken
    black: '#000', // <~~ string
  },
  opacity: {
    10: 0.1, // <~~ number
  },
  fontFamily: {
    serif: ['Georgia', 'serif'], // <~~ array
  },
  backgroundColor: ({ theme, rgba }) => ({
    black: theme('colors.black'),
    overlay: rgba('colors.black', 0.5),
    whiteOverlay: rgba('#fff', 0.5),
  }), // <~~ function
};

it('should pass', () => {
  const elements = parser(theme);

  console.log(elements);
});
