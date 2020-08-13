import { ThemeToken } from '../parser/types';
import { themeGenerator } from '../themeGenerator';
import { toScssVariables } from '../generators/toScssVariables';

export const theme: ThemeToken = {
  colors: { // <~~ another ThemeToken
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
    overlay: rgba('colors.black', .5),
    whiteOverlay: rgba('#fff', .5),
  }), // <~~ function
};

it('should pass', () => {
  themeGenerator(theme).to(toScssVariables({
    callback({ content, elements }) {
      console.log(elements);
    }
  }));
});
