import {
  STRING_TYPE,
  LIST_TYPE,
  JSOSParserListElement,
  NUMERIC_TYPE,
  NODE_TYPE,
  JSOSParserNodeElement,
  JSOSParserElement,
} from '@micra/jsos';
import {
  ThemeTransformer,
  ThemeTransformerOptions,
  TransformerContext,
} from './types';

export const themeType = (
  options: Partial<ThemeTransformerOptions> = {},
): ThemeTransformer => {
  let baseElements: JSOSParserElement[];

  return {
    options,
    visitors: {
      [NODE_TYPE](
        element,
        { append, transform, elements }: TransformerContext,
      ) {
        if (!baseElements) {
          baseElements = elements;
        }

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
      [LIST_TYPE](element, { append, parseValue, findByPath, elements }) {
        if (!baseElements) {
          baseElements = elements;
        }

        const name = element.path.split('.').pop();
        const value = (element as JSOSParserListElement).value
          .map((definition) =>
            parseValue(definition.value, {
              get(path: string) {
                const getValue = findByPath(path, baseElements).value;
                return Array.isArray(getValue)
                  ? getValue
                      .map(({ value }: JSOSParserListElement) => value)
                      .join(', ')
                  : getValue;
              },
            }),
          )
          .filter(Boolean)
          .join(', ');

        append(`"${name}":${JSON.stringify(value)};`);
      },
      [NUMERIC_TYPE](element, { append, elements }) {
        if (!baseElements) {
          baseElements = elements;
        }

        const name = element.path.split('.').pop();
        const value = element.value;

        append(`"${name}":${JSON.stringify(value)};`);
      },
      [STRING_TYPE](element, { append, parseValue, findByPath, elements }) {
        if (!baseElements) {
          baseElements = elements;
        }

        const name = element.path.split('.').pop();
        const value = parseValue(element.value, {
          get(path: string) {
            const getValue = findByPath(path, baseElements).value;
            return Array.isArray(getValue)
              ? getValue
                  .map(({ value }: JSOSParserListElement) => value)
                  .join(', ')
              : getValue;
          },
        });

        append(`"${name}":${JSON.stringify(value)};`);
      },
    },
  };
};
