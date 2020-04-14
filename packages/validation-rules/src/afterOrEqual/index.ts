import { ValidationContext } from '@micra/validator';

export const afterOrEqual = (date: Date | string | number) => ({
  check({ value }: ValidationContext) {
    return new Date(value) >= new Date(date);
  },
  message: () => `validation.afterOrEqual`,
});
