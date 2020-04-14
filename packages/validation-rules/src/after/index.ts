import { ValidationContext } from '@micra/validator';

export const after = (date: Date | string | number) => ({
  check({ value }: ValidationContext) {
    return new Date(value) > new Date(date);
  },
  message: () => `validation.after`,
});
