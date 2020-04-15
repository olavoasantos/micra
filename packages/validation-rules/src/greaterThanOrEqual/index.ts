import { ValidationContext } from '@micra/validator';

export const greaterThanOrEqual = (min: string | number) => ({
  check({ value }: ValidationContext) {
    return Number(value) >= Number(min);
  },
  message: () => `validation.greaterThanOrEqual`,
});
