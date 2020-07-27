import prettier from 'prettier';
import { ThemeGenerator } from './types';
import { camelToKebab } from '../helpers/camelToKebab';
import { deepMerge } from '../helpers/deepMerge';

export const toCssVariablesThemeObject: ThemeGenerator = {
  build(ast) {
    const definitions = ast.reduce((variables, element) => {
      const value = `var(--${element.path.map(camelToKebab).join('-')})`;

      const [key, ...rest] = element.path.reverse();
      element.path.reverse();

      const el = rest.reduce((obj, subKey) => ({ [subKey]: obj } as any), { [key]: value });

      return deepMerge(variables, el);
    }, {});

    return prettier.format(`module.exports = ${JSON.stringify(definitions)}`, {
      parser: 'babel',
      semi: true,
      trailingComma: 'all',
      singleQuote: true,
      printWidth: 100,
      tabWidth: 2,
    });
  },
};
