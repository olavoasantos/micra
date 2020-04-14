import { ValidationContext } from '@micra/validator';

export const oneOf = (options: any[]) => ({
  check({ value }: ValidationContext) {
    return options.includes(value);
  },
  message: () => `validation.oneOf`,
});
