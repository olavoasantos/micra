import {
  STRING_TYPE,
  LIST_TYPE,
  JSOSParserListElement,
  NUMERIC_TYPE,
} from '@micra/jsos';
import {
  ThemeTransformer,
  ThemeTransformerOptions,
  TransformerContext,
} from './types';

export const cssVariables = (
  options: Partial<ThemeTransformerOptions> = {},
): ThemeTransformer => ({
  options,
  visitors: {
    [LIST_TYPE](
      element,
      { append, parseValue, pathToKebab }: TransformerContext,
    ) {
      const name = `--${pathToKebab(element.path)}`;
      const value = (element as JSOSParserListElement).value
        .map((definition) =>
          parseValue(definition.value, {
            get(path) {
              return `var(--${pathToKebab(path as string)})`;
            },
          }),
        )
        .filter(Boolean)
        .join(', ');

      append(` ${name}: ${value};`.trimRight());
    },
    [NUMERIC_TYPE](
      element,
      { append, parseValue, pathToKebab }: TransformerContext,
    ) {
      const name = `--${pathToKebab(element.path)}`;
      const value = parseValue(element.value, {
        get(path) {
          return `var(--${pathToKebab(path as string)})`;
        },
      });

      append(` ${name}: ${value};`.trimRight());
    },
    [STRING_TYPE](
      element,
      { append, parseValue, pathToKebab }: TransformerContext,
    ) {
      const name = `--${pathToKebab(element.path)}`;
      const value = parseValue(element.value, {
        get(path) {
          return `var(--${pathToKebab(path as string)})`;
        },
      });

      append(` ${name}: ${value};`.trimRight());
    },
  },
});
