import { ValidationContext } from '@micra/validator';

export const isArray = () => ({
  check({ value }: ValidationContext) {
    return Object.prototype.toString.call(value) === '[object Array]';
  },
  message: () => `validation.isArray`,
});
