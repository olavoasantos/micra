import { ValidationContext } from '@micra/validator';

export interface AfterOrEqualOptions {
  message?: string;
  date: Date | string | number;
}

export const afterOrEqual = ({
  date,
  message = `validation.afterOrEqual`,
}: AfterOrEqualOptions) => ({
  check({ value }: ValidationContext) {
    return new Date(value) >= new Date(date);
  },
  message: () => message,
});
