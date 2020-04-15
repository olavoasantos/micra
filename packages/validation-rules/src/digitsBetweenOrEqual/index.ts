import { ValidationContext } from '@micra/validator';

export const digitsBetweenOrEqual = (
  min: string | number,
  max: string | number,
) => ({
  check({ value }: ValidationContext) {
    if (min === max) {
      throw new Error(`digitsBetweenOrEqual: min and max should be different`);
    }

    if (isNaN(value)) {
      return false;
    }

    const num = String(value).length;
    const end = Number(max);
    const initial = Number(min);

    return initial < end
      ? num >= initial && num <= end
      : num <= initial && num >= end;
  },
  message: () => `validation.digitsBetweenOrEqual`,
});
