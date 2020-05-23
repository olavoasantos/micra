import { ValidationContext } from '@micra/validator';

export interface BetweenOrEqualDatesOptions {
  message?: string;
  start: Date | string | number;
  end: Date | string | number;
}

export const betweenOrEqualDates = ({
  end,
  start,
  message = `validation.betweenOrEqualDates`,
}: BetweenOrEqualDatesOptions) => ({
  check({ value }: ValidationContext) {
    const date = new Date(value);
    const endDate = new Date(end);
    const initialDate = new Date(start);

    if (initialDate.toString() === endDate.toString()) {
      throw new Error(`betweenOrEqualDates: initial and end dates should be different`);
    }

    return initialDate < endDate
      ? date >= initialDate && date <= endDate
      : date <= initialDate && date >= endDate;
  },
  message: () => message,
});
