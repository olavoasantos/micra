import { themeParser } from '../parser';
import { parseValue } from '../parseValue';
import { ThemeElement, ThemeToken } from '../parser/types';
import {
  BaseGeneratorContext,
  PostGeneratorContext,
  PreGeneratorContext,
  ThemeGenerator,
} from '../generators/types';

export interface ThemeGeneratorInterface {
  tokens: ThemeToken;
  elements: ThemeElement[];
  to(...generators: ThemeGenerator[]): string[];
}

export const themeGenerator = (tokens: ThemeToken): ThemeGeneratorInterface => {
  const elements = themeParser(tokens);

  return {
    tokens,
    elements,
    to(...generators: ThemeGenerator[]) {
      return generators.map((generator) => {
        const baseContext: BaseGeneratorContext = { generator, tokens, elements };
        const preContext: PreGeneratorContext = {
          ...baseContext,
          parseValue: parseValue(baseContext),
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
