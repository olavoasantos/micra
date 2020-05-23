import { ValidationContext } from '@micra/validator';

export interface BeforeOrEqualOptions {
  message?: string;
  date: Date | string | number;
}

export const beforeOrEqual = ({
  date,
  message = `validation.beforeOrEqual`,
}: BeforeOrEqualOptions) => ({
  check({ value }: ValidationContext) {
    return new Date(value) <= new Date(date);
  },
  message: () => message,
});
