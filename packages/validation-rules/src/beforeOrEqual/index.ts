import { ValidationContext } from '@micra/validator';

export const beforeOrEqual = (date: Date | string | number) => ({
  check({ value }: ValidationContext) {
    return new Date(value) <= new Date(date);
  },
  message: () => `validation.beforeOrEqual`,
});
