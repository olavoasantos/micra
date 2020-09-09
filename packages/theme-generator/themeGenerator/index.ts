import { jsosParser, jsosTransformer } from '@micra/jsos';
import { camelToKebab } from '../helpers/camelToKebab';
import { deepMerge } from '../helpers/deepMerge';
import { pathToKebab } from '../helpers/pathToKebab';
import { pathToObject } from '../helpers/pathToObject';
import { rgbaParser } from '../customParsers/rgba/parser';
import { valueParser } from '../customParsers/value/parser';
import {
  ThemeGeneratorOptions,
  ThemeGenerator,
  ThemeDefinition,
} from './types';
import { valueParsers } from '../customParsers';

export const themeGenerator = (
  tokens: ThemeDefinition,
  options: Partial<ThemeGeneratorOptions> = {},
): ThemeGenerator => {
  const baseContext = {
    tokens,
    deepMerge,
    camelToKebab,
    pathToObject,
    pathToKebab,
  };

  const elements = jsosParser(tokens, {
    elements: options.elements,
    makeContext(context) {
      return Object.assign(
        options.parserContext ? options.parserContext(context) : {},
        {
          rgba: rgbaParser(context),
          value: valueParser(context),
          ...baseContext,
        },
      );
    },
  });

  return {
    tokens,
    elements,
    to(...transformers) {
      return transformers.map((transformer) => {
        const content = jsosTransformer(
          transformer.options?.willTransform
            ? transformer.options.willTransform(elements)
            : elements,
          {
            valueParsers: {
              ...(options.valueParsers ?? {}),
              ...valueParsers,
            },
            transformers: transformer.visitors,
            makeContext(context) {
              return Object.assign(
                options.transformerContext
                  ? options.transformerContext(context)
                  : {},
                {
                  transformer,
                  elements,
                  ...baseContext,
                },
              );
            },
          },
        ).trim();

        if (transformer.options.callback) {
          transformer.options.callback({
            content,
            transformer,
            elements,
            ...baseContext,
          });
        }

        return content;
      });
    },
  };
};
