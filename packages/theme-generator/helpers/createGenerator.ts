import { ThemeGenerator, ThemeGeneratorOptions } from '../generators/types';

export const createGenerator = <O extends ThemeGeneratorOptions = ThemeGeneratorOptions>(
  build: ThemeGenerator['build'],
  defaultOptions: Partial<O> = {},
) => (options: Partial<O> = {}): ThemeGenerator<O> => ({
  options: {
    willTransform: (elements) => elements,
    ...defaultOptions,
    ...options,
  } as O,
  build,
});
