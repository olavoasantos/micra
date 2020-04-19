import { ValidationContext } from '@micra/validator';

export const isValidDate = () => ({
  check({ value }: ValidationContext) {
    if (value instanceof Date) {
      return !isNaN(value as any);
    }

    if (isNaN(Date.parse(value))) {
      return false;
    }

    const date = new Date(value);
    return !isNaN(date.getFullYear()) && !isNaN(date.getMonth()) && !isNaN(date.getDate());
  },
  message: () => `validation.isValidDate`,
});
