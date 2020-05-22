import lodash from 'lodash';
import pluralize from 'pluralize';
import { capitalize } from 'helpers/capitalize';

export const variationsOf = (word: string) => {
  const plural = pluralize.plural(word);
  const singular = pluralize.singular(word);

  return {
    RAW: word,
    UPPERCASE: word.toUpperCase(),
    LOWERCASE: word.toLowerCase(),
    KEBAB: lodash.kebabCase(word),
    CAMEL: lodash.camelCase(word),
    SNAKE: lodash.snakeCase(word),
    PASCAL: capitalize(lodash.camelCase(word)),
    MACRO: lodash.snakeCase(word).toUpperCase(),
    CAPITALIZED: lodash.capitalize(word.toLowerCase()),
    SINGULAR: {
      UPPERCASE: singular.toUpperCase(),
      LOWERCASE: singular.toLowerCase(),
      KEBAB: lodash.kebabCase(singular),
      CAMEL: lodash.camelCase(singular),
      SNAKE: lodash.snakeCase(singular),
      PASCAL: capitalize(lodash.camelCase(singular)),
      MACRO: lodash.snakeCase(singular).toUpperCase(),
      CAPITALIZED: lodash.capitalize(singular.toLowerCase()),
    },
    PLURAL: {
      UPPERCASE: plural.toUpperCase(),
      LOWERCASE: plural.toLowerCase(),
      KEBAB: lodash.kebabCase(plural),
      CAMEL: lodash.camelCase(plural),
      SNAKE: lodash.snakeCase(plural),
      PASCAL: capitalize(lodash.camelCase(plural)),
      MACRO: lodash.snakeCase(plural).toUpperCase(),
      CAPITALIZED: lodash.capitalize(plural.toLowerCase()),
    },
  };
};
