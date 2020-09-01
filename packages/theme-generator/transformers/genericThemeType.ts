import {
  STRING_TYPE,
  LIST_TYPE,
  NUMERIC_TYPE,
  NODE_TYPE,
  JSOSParserNodeElement,
} from '@micra/jsos';
import {
  ThemeTransformer,
  ThemeTransformerOptions,
  TransformerContext,
} from './types';

export const genericThemeType = (
  options: Partial<ThemeTransformerOptions> = {},
): ThemeTransformer => ({
  options,
  visitors: {
    [NODE_TYPE](element, { append, transform }: TransformerContext) {
      if (element.path) {
        append(
          `"${element.path.split('.').pop()}":{${transform(
            (element as JSOSParserNodeElement).value,
          )}};`,
        );
      } else {
        append(`{${transform((element as JSOSParserNodeElement).value)}}`);
      }
    },
    [LIST_TYPE](element, { append }: TransformerContext) {
      const name = element.path.split('.').pop();
      const value = `string`;

      append(`"${name}":${value};`);
    },
    [NUMERIC_TYPE](element, { append }: TransformerContext) {
      const name = element.path.split('.').pop();
      const value = `string`;

      append(`"${name}":${value};`);
    },
    [STRING_TYPE](element, { append }: TransformerContext) {
      const name = element.path.split('.').pop();
      const value = `string`;

      append(`"${name}":${value};`);
    },
  },
});
