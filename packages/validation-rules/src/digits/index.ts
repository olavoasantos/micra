import { ValidationContext } from '@micra/validator';

export const digits = (count: number) => ({
  check({ value }: ValidationContext) {
    return !isNaN(value) && String(value).length === count;
  },
  message: () => `validation.digits`,
});
