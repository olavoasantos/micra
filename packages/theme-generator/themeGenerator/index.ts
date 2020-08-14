import { themeParser } from '../parser';
import { parseValue } from '../parseValue';
import { deepMerge } from '../helpers/deepMerge';
import { camelToKebab } from '../helpers/camelToKebab';
import { pathToObject } from '../helpers/pathToObject';
import { pathToKebab } from '../helpers/pathToKebab';
import { ThemeElement, ThemeParserOptions, ThemeTokens } from '../parser/types';
import {
  BaseGeneratorContext,
  PostGeneratorContext,
  PreGeneratorContext,
  ThemeGenerator,
} from '../generators/types';

export interface ThemeGeneratorInterface {
  tokens: ThemeTokens;
  elements: ThemeElement[];
  to(...generators: ThemeGenerator[]): string[];
}

export const themeGenerator = (
  tokens: ThemeTokens,
  options: Partial<ThemeParserOptions> = {},
): ThemeGeneratorInterface => {
  const elements = themeParser(tokens, options);

  return {
    tokens,
    elements,
    to(...generators: ThemeGenerator[]) {
      return generators.map((generator) => {
        const baseContext: BaseGeneratorContext = {
          generator,
          tokens,
          elements,
          deepMerge,
          camelToKebab,
          pathToObject,
          pathToKebab,
        };
        const preContext: PreGeneratorContext = {
          ...baseContext,
          parseValue: parseValue(baseContext, options.valueParsers),
        };
        const postContext: PostGeneratorContext = {
          ...preContext,
          content: generator.build(preContext),
        };

        if (generator.options.callback) {
          generator.options.callback(postContext);
        }

        return postContext.content;
      });
    },
  };
};
