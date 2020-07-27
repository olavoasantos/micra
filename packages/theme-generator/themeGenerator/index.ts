import { parser } from '../parser';
import { ThemeToken } from '../parser/types';
import { ThemeGenerator } from '../generators/types';

export const themeGenerator = (tokens: ThemeToken) => {
  const AST = parser(tokens);

  return {
    to(generators: ThemeGenerator[], callback?: (content: string) => void) {
      return generators.map((generator) => {
        const content = generator.build(AST);
        if (callback) {
          callback(content);
        }

        return content;
      });
    },
  };
};
