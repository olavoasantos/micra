import { ValidationContext } from '@micra/validator';

export const isString = () => ({
  check({ value }: ValidationContext) {
    return typeof value === 'string' || value instanceof String;
  },
  message: () => `validation.isString`,
});
