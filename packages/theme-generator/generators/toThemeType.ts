import prettier from 'prettier';
import { ThemeGenerator } from './types';
import { deepMerge } from '../helpers/deepMerge';

export const toThemeType: ThemeGenerator = {
  build(ast) {
    const definitions = ast.reduce((variables, element) => {
      const [key, ...rest] = element.path.reverse();
      element.path.reverse();

      const el = rest.reduce((obj, subKey) => ({ [subKey]: obj } as any), { [key]: element.value });

      return deepMerge(variables, el);
    }, {});

    return prettier.format(`interface Theme ${JSON.stringify(definitions)}`, {
      parser: 'babel-ts',
      semi: true,
      trailingComma: 'all',
      singleQuote: true,
      printWidth: 100,
      tabWidth: 2,
    });
  },
};
