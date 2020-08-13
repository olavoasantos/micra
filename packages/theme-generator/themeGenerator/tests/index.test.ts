import { ThemeToken } from '../../parser/types';
import { themeGenerator } from '..';
import { toThemeType } from '../../generators/toThemeType';

export const theme: ThemeToken = {
  root: 'val',
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
    root: theme('root'),
    black: theme('colors.black'),
    overlay: rgba('colors.black', 0.5),
    whiteOverlay: rgba('#fff', 0.5),
  }), // <~~ function
};

it('should pass', () => {
  themeGenerator(theme).to(
    toThemeType({
      callback({ content }) {
        expect(content).toBe(
          '{"root":"val","colors":{"black":"#000"},"opacity":{"10":"0.1"},"fontFamily":{"serif":"Georgia, serif"},"backgroundColor":{"root":"val","black":"val","overlay":"rgba(val, 0.5)","whiteOverlay":"rgba(#fff, 0.5)"}}',
        );
      },
    }),
  );
});
