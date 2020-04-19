import { ValidationContext } from '@micra/validator';

export const lengthBetweenOrEqual = (min: string | number, max: string | number) => ({
  check({ value }: ValidationContext) {
    if (min === max) {
      throw new Error(`lengthBetweenOrEqual: min and max should be different`);
    }

    const num = value.length;
    const end = Number(max);
    const initial = Number(min);

    if (!num) {
      return false;
    }

    return initial < end ? num >= initial && num <= end : num <= initial && num >= end;
  },
  message: () => `validation.lengthBetweenOrEqual`,
});
