import lodash from 'lodash';
import pluralize from 'pluralize';
import { capitalize } from './capitalize';
import { toTemplateRender } from './toTemplateRender';

export const defaultVariables = (extensions: Record<string, any>) => ({
  toPlural: toTemplateRender((word) => pluralize.plural(word)),
  toSingular: toTemplateRender((word) => pluralize.singular(word)),
  toUpperCase: toTemplateRender((word) => word.toUpperCase()),
  toLowerCase: toTemplateRender((word) => word.toLowerCase()),
  toKebabCase: toTemplateRender((word) => lodash.kebabCase(word)),
  toCamelCase: toTemplateRender((word) => lodash.camelCase(word)),
  toSnakeCase: toTemplateRender((word) => lodash.snakeCase(word)),
  toPascalCase: toTemplateRender((word) => capitalize(lodash.camelCase(word))),
  toMacroCase: toTemplateRender((word) => lodash.snakeCase(word).toUpperCase()),
  toCapitalizedCase: toTemplateRender((word) => lodash.capitalize(word.toLowerCase())),
  ...extensions,
});
