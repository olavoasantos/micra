import prettier from 'prettier';
import { ThemeGenerator } from './types';
import { camelToKebab } from '../helpers/camelToKebab';

export const toCssVariables: ThemeGenerator = {
  build(ast) {
    const definitions = ast.reduce((variables, element) => {
      const name = `--${element.path.map(camelToKebab).join('-')}`;
      return `${variables} ${name}: ${element.value};`;
    }, '');

    return prettier.format(`:root { ${definitions} }`, {
      parser: 'css',
      semi: true,
      trailingComma: 'all',
      singleQuote: true,
      printWidth: 100,
      tabWidth: 2,
    });
  },
};
