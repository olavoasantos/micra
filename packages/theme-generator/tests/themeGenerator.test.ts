import { JSOSParserDefinition } from '@micra/jsos';
import { cssVariables } from '../transformers/cssVariables';
import { cssVariablesThemeObject } from '../transformers/cssVariablesThemeObject';
import { genericThemeType } from '../transformers/genericThemeType';
import { scssVariables } from '../transformers/scssVariables';
import { themeGenerator } from '../themeGenerator';
import { themeObject } from '../transformers/themeObject';
import { themeType } from '../transformers/themeType';

describe('themeGenerator tests', () => {
  const theme: JSOSParserDefinition = {
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
    textColors: ({ get }) => get('colors'),
    backgroundColors: ({ get, rgba }) => ({
      root: get('root'),
      black: get('colors.black'),
      whiteOverlay: rgba('#fff', 0.5),
      overlay: rgba('colors.black', 0.5),
    }),
  };

  it('should generate CSS variables', () => {
    const [content] = themeGenerator(theme).to(cssVariables());

    expect(content).toBe(
      '--root: val; --colors-black: #000; --colors-red: #f00; --colors-green: #0f0; --colors-blue: #00f; --opacity-10: 0.1; --font-family-serif: Georgia, serif; --text-colors-black: var(--colors-black); --text-colors-red: var(--colors-red); --text-colors-green: var(--colors-green); --text-colors-blue: var(--colors-blue); --background-colors-root: var(--root); --background-colors-black: var(--colors-black); --background-colors-white-overlay: rgba(#fff, 0.5); --background-colors-overlay: rgba(var(--colors-black), 0.5);',
    );
  });

  it('should generate CSS variables theme object', () => {
    const [content] = themeGenerator(theme).to(cssVariablesThemeObject());

    expect(content).toBe(
      '{"root":"var(--root)","colors":{"black":"var(--colors-black)","red":"var(--colors-red)","green":"var(--colors-green)","blue":"var(--colors-blue)",},"opacity":{"10":"var(--opacity-10)",},"fontFamily":{"serif":"var(--font-family-serif)",},"textColors":{"black":"var(--text-colors-black)","red":"var(--text-colors-red)","green":"var(--text-colors-green)","blue":"var(--text-colors-blue)",},"backgroundColors":{"root":"var(--background-colors-root)","black":"var(--background-colors-black)","whiteOverlay":"var(--background-colors-white-overlay)","overlay":"var(--background-colors-overlay)",},}',
    );
  });

  it('should generate generic theme object', () => {
    const [content] = themeGenerator(theme).to(genericThemeType());
    expect(content).toBe(
      '{"root":string;"colors":{"black":string;"red":string;"green":string;"blue":string;};"opacity":{"10":string;};"fontFamily":{"serif":string;};"textColors":{"black":string;"red":string;"green":string;"blue":string;};"backgroundColors":{"root":string;"black":string;"whiteOverlay":string;"overlay":string;};}',
    );
  });

  it('should generate SCSS variables', () => {
    const [content] = themeGenerator(theme).to(scssVariables());
    expect(content).toBe(
      '$root: val; $colors-black: #000; $colors-red: #f00; $colors-green: #0f0; $colors-blue: #00f; $opacity-10: 0.1; $font-family-serif: Georgia, serif; $text-colors-black: $colors-black; $text-colors-red: $colors-red; $text-colors-green: $colors-green; $text-colors-blue: $colors-blue; $background-colors-root: $root; $background-colors-black: $colors-black; $background-colors-white-overlay: rgba(#fff, 0.5); $background-colors-overlay: rgba($colors-black, 0.5);',
    );
  });

  it('should generate a theme object', () => {
    const [content] = themeGenerator(theme).to(themeObject());
    expect(content).toBe(
      '{"root":"val","colors":{"black":"#000","red":"#f00","green":"#0f0","blue":"#00f",},"opacity":{"10":"0.1",},"fontFamily":{"serif":"Georgia, serif",},"textColors":{"black":"#000","red":"#f00","green":"#0f0","blue":"#00f",},"backgroundColors":{"root":"val","black":"#000","whiteOverlay":"rgba(#fff, 0.5)","overlay":"rgba(#000, 0.5)",},}',
    );
  });

  it('should generate a theme type', () => {
    const [content] = themeGenerator(theme).to(themeType());
    expect(content).toBe(
      '{"root":"val";"colors":{"black":"#000";"red":"#f00";"green":"#0f0";"blue":"#00f";};"opacity":{"10":"0.1";};"fontFamily":{"serif":"Georgia, serif";};"textColors":{"black":"#000";"red":"#f00";"green":"#0f0";"blue":"#00f";};"backgroundColors":{"root":"val";"black":"#000";"whiteOverlay":"rgba(#fff, 0.5)";"overlay":"rgba(#000, 0.5)";};}',
    );
  });
});
