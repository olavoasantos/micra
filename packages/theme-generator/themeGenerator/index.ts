import { parser } from '../parser';
import { ThemeToken } from '../parser/types';
import { ThemeGenerator } from '../generators/types';

export const themeGenerator = (tokens: ThemeToken) => {
  const elements = parser(tokens);

  return {
    tokens,
    elements,
    to(...generators: ThemeGenerator[]) {
      return generators.map((generator) => {
        const content = generator.build(elements);
        if (generator.options.callback) {
          generator.options.callback({ content, generator, tokens, elements });
        }

        return content;
      });
    },
  };
};
