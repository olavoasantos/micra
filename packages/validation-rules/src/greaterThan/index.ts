import { ValidationContext } from '@micra/validator';

export const greaterThan = (min: string | number) => ({
  check({ value }: ValidationContext) {
    return Number(value) > Number(min);
  },
  message: () => `validation.greaterThan`,
});
