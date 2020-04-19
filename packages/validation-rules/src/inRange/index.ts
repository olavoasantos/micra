import { ValidationContext } from '@micra/validator';

export const inRange = (min: string | number, max: string | number) => ({
  check({ value }: ValidationContext) {
    if (min === max) {
      throw new Error(`inRange: min and max should be different`);
    }

    const num = Number(value);
    const end = Number(max);
    const initial = Number(min);
    return initial < end ? num > initial && num < end : num < initial && num > end;
  },
  message: () => `validation.inRange`,
});
