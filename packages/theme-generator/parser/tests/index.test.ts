import { themeParser } from '..';

describe('theme parser tests', () => {
  it('should parse a string value token', () => {
    const elements = themeParser({ key: 'value' });

    expect(elements).toMatchObject([
      { main: 'key', path: 'key', breadcrumbs: ['key'], value: 'value' },
    ]);
  });

  it('should parse a numeric value token', () => {
    const elements = themeParser({ key: 123 });

    expect(elements).toMatchObject([
      { main: 'key', path: 'key', breadcrumbs: ['key'], value: '123' },
    ]);
  });

  it('should parse a list value token', () => {
    const elements = themeParser({ key: ['a', 'b'] });

    expect(elements).toMatchObject([
      { main: 'key', path: 'key', breadcrumbs: ['key'], value: 'a, b' },
    ]);
  });

  it('should parse an object value token', () => {
    const elements = themeParser({ key: { subKey: 'value' } });

    expect(elements).toMatchObject([
      { main: 'key', path: 'key.subKey', breadcrumbs: ['key', 'subKey'], value: 'value' },
    ]);
  });

  it('should parse a callback value token', () => {
    const elements = themeParser({ key: () => 'value' });

    expect(elements).toMatchObject([
      { main: 'key', path: 'key', breadcrumbs: ['key'], value: 'value' },
    ]);
  });

  describe('fetchToken tests', () => {
    it('should parse a callback referencing another shallow value token', () => {
      const elements = themeParser({ another: 'value', derived: ({ theme }) => theme('another') });

      expect(elements).toMatchObject([
        { main: 'another', path: 'another', breadcrumbs: ['another'], value: 'value' },
        { main: 'derived', path: 'derived', breadcrumbs: ['derived'], value: 'from::another' },
      ]);
    });

    it('should parse a callback referencing another deep value token', () => {
      const elements = themeParser({
        another: { key: 'value' },
        derived: ({ theme }) => theme('another.key'),
      });

      expect(elements).toMatchObject([
        { main: 'another', path: 'another.key', breadcrumbs: ['another', 'key'], value: 'value' },
        { main: 'derived', path: 'derived', breadcrumbs: ['derived'], value: 'from::another.key' },
      ]);
    });

    it('should parse a callback referencing a set of values based on another token', () => {
      const elements = themeParser({
        colors: {
          black: '#000',
          red: '#ff0',
        },
        backgroundColor: ({ theme }) => theme('colors'),
      });

      expect(elements).toMatchObject([
        { main: 'colors', path: 'colors.black', breadcrumbs: ['colors', 'black'], value: '#000' },
        { main: 'colors', path: 'colors.red', breadcrumbs: ['colors', 'red'], value: '#ff0' },
        {
          main: 'backgroundColor',
          path: 'backgroundColor.black',
          breadcrumbs: ['backgroundColor', 'black'],
          value: 'from::colors.black',
        },
        {
          main: 'backgroundColor',
          path: 'backgroundColor.red',
          breadcrumbs: ['backgroundColor', 'red'],
          value: 'from::colors.red',
        },
      ]);
    });
  });

  describe('rgba tests', () => {
    it('should parse a callback defining an rgba value', () => {
      const elements = themeParser({ key: ({ rgba }) => rgba('#000', 0.5) });

      expect(elements).toMatchObject([
        { main: 'key', path: 'key', breadcrumbs: ['key'], value: 'rgba::#000|0.5' },
      ]);
    });

    it('should parse a callback defining an rgba value based on another token', () => {
      const elements = themeParser({
        colors: {
          black: '#000',
        },
        key: ({ rgba }) => rgba('colors.black', 0.5),
      });

      expect(elements).toMatchObject([
        { main: 'colors', path: 'colors.black', breadcrumbs: ['colors', 'black'], value: '#000' },
        { main: 'key', path: 'key', breadcrumbs: ['key'], value: 'rgba::from::colors.black|0.5' },
      ]);
    });
  });
});
