import { ValidationContext } from '@micra/validator';

export interface BetweenDatesOptions {
  message?: string;
  start: Date | string | number;
  end: Date | string | number;
}

export const betweenDates = ({
  start,
  end,
  message = `validation.betweenDates`,
}: BetweenDatesOptions) => ({
  check({ value }: ValidationContext) {
    const date = new Date(value);
    const endDate = new Date(end);
    const initialDate = new Date(start);

    if (initialDate.toString() === endDate.toString()) {
      throw new Error(`betweenDates: initial and end dates should be different`);
    }

    return initialDate < endDate
      ? date > initialDate && date < endDate
      : date < initialDate && date > endDate;
  },
  message: () => message,
});
