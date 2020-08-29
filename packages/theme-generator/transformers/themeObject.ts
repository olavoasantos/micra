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

export const themeObject = (
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
          append(`"${element.path}":{${transform((element as JSOSParserNodeElement).value)}},`);
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
                return findByPath(path, baseElements).value as string;
              },
            }),
          )
          .filter(Boolean)
          .join(', ');

        append(`"${name}":"${value}",`);
      },
      [NUMERIC_TYPE](element, { append, parseValue, findByPath, elements }) {
        if (!baseElements) {
          baseElements = elements;
        }

        const name = element.path.split('.').pop();
        const value = parseValue(element.value, {
          get(path: string) {
            return findByPath(path, baseElements).value as string;
          },
        });

        append(`"${name}":"${value}",`);
      },
      [STRING_TYPE](element, { append, parseValue, findByPath, elements }) {
        if (!baseElements) {
          baseElements = elements;
        }

        const name = element.path.split('.').pop();
        const value = parseValue(element.value, {
          get(path: string) {
            return findByPath(path, baseElements).value as string;
          },
        });

        append(`"${name}":"${value}",`);
      },
    },
  };
};
