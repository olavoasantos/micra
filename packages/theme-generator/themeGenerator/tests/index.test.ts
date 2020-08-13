import { themeGenerator } from '..';
import { ThemeToken } from '../../parser/types';
import { toThemeType } from '../../generators/toThemeType';
import { toThemeObject } from '../../generators/toThemeObject';
import { toCssVariables } from '../../generators/toCssVariables';
import { toScssVariables } from '../../generators/toScssVariables';
import { toGenericThemeType } from '../../generators/toGenericThemeType';
import { toCssVariablesThemeObject } from '../../generators/toCssVariablesThemeObject';

export const theme: ThemeToken = {
  root: 'val',
  colors: {
    black: '#000',
    red: '#f00',
    green: '#0f0',
    blue: '#00f',
  },
  opacity: {
    10: 0.1,
  },
  fontFamily: {
    serif: ['Georgia', 'serif'],
  },
  textColors: ({ theme }) => theme('colors'),
  backgroundColors: ({ theme, rgba }) => ({
    root: theme('root'),
    black: theme('colors.black'),
    whiteOverlay: rgba('#fff', 0.5),
    overlay: rgba('colors.black', 0.5),
  }),
};

describe('theme generator tests', () => {
  const elements = themeGenerator(theme);

  it('should generate css variables referencing the theme value definitions', () => {
    const [content] = elements.to(toCssVariables());
    expect(content).toBe(
      '--root: val; --colors-black: #000; --colors-red: #f00; --colors-green: #0f0; --colors-blue: #00f; --opacity-10: 0.1; --font-family-serif: Georgia, serif; --text-colors-black: var(--colors-black); --text-colors-red: var(--colors-red); --text-colors-green: var(--colors-green); --text-colors-blue: var(--colors-blue); --background-colors-root: var(--root); --background-colors-black: var(--colors-black); --background-colors-white-overlay: rgba(#fff, 0.5); --background-colors-overlay: rgba(var(--colors-black), 0.5);',
    );
  });

  it('should generate a theme object referencing css variables definitions', () => {
    const [content] = elements.to(toCssVariablesThemeObject());
    expect(content).toBe(
      '{"root":"var(--root)","colors":{"black":"var(--colors-black)","red":"var(--colors-red)","green":"var(--colors-green)","blue":"var(--colors-blue)"},"opacity":{"10":"var(--opacity-10)"},"fontFamily":{"serif":"var(--font-family-serif)"},"textColors":{"black":"var(--text-colors-black)","red":"var(--text-colors-red)","green":"var(--text-colors-green)","blue":"var(--text-colors-blue)"},"backgroundColors":{"root":"var(--background-colors-root)","black":"var(--background-colors-black)","whiteOverlay":"var(--background-colors-white-overlay)","overlay":"var(--background-colors-overlay)"}}',
    );
  });

  it('should generate a theme interface definition referencing generic values', () => {
    const [content] = elements.to(toGenericThemeType());
    expect(content).toBe(
      '{"root":string,"colors":{"black":string,"red":string,"green":string,"blue":string},"opacity":{"10":string},"fontFamily":{"serif":string},"textColors":{"black":string,"red":string,"green":string,"blue":string},"backgroundColors":{"root":string,"black":string,"whiteOverlay":string,"overlay":string}}',
    );
  });

  it('should generate scss variables referencing the theme value definitions', () => {
    const [content] = elements.to(toScssVariables());
    expect(content).toBe(
      '$root: val; $colors-black: #000; $colors-red: #f00; $colors-green: #0f0; $colors-blue: #00f; $opacity-10: 0.1; $font-family-serif: Georgia, serif; $text-colors-black: $colors-black; $text-colors-red: $colors-red; $text-colors-green: $colors-green; $text-colors-blue: $colors-blue; $background-colors-root: $root; $background-colors-black: $colors-black; $background-colors-white-overlay: rgba(#fff, 0.5); $background-colors-overlay: rgba($colors-black, 0.5);',
    );
  });

  it('should generate theme object referencing the theme value definitions', () => {
    const [content] = elements.to(toThemeObject());
    expect(content).toBe(
      '{"root":"val","colors":{"black":"#000","red":"#f00","green":"#0f0","blue":"#00f"},"opacity":{"10":"0.1"},"fontFamily":{"serif":"Georgia, serif"},"textColors":{"black":"#000","red":"#f00","green":"#0f0","blue":"#00f"},"backgroundColors":{"root":"val","black":"#000","whiteOverlay":"rgba(#fff, 0.5)","overlay":"rgba(#000, 0.5)"}}',
    );
  });

  it('should generate theme interface variables referencing the theme value definitions', () => {
    const [content] = elements.to(toThemeType());
    expect(content).toBe(
      '{"root":"val","colors":{"black":"#000","red":"#f00","green":"#0f0","blue":"#00f"},"opacity":{"10":"0.1"},"fontFamily":{"serif":"Georgia, serif"},"textColors":{"black":"#000","red":"#f00","green":"#0f0","blue":"#00f"},"backgroundColors":{"root":"val","black":"#000","whiteOverlay":"rgba(#fff, 0.5)","overlay":"rgba(#000, 0.5)"}}',
    );
  });
});
