import { ValidationContext } from '@micra/validator';

export const betweenOrEqualDates = (
  initial: Date | string | number,
  end: Date | string | number,
) => ({
  check({ value }: ValidationContext) {
    const date = new Date(value);
    const endDate = new Date(end);
    const initialDate = new Date(initial);

    if (initialDate.toString() === endDate.toString()) {
      throw new Error(
        `betweenOrEqualDates: initial and end dates should be different`,
      );
    }

    return initialDate < endDate
      ? date >= initialDate && date <= endDate
      : date <= initialDate && date >= endDate;
  },
  message: () => `validation.betweenOrEqualDates`,
});