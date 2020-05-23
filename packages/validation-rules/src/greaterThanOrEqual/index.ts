import { ValidationContext } from '@micra/validator';

export interface GreaterThanOrEqualOptions {
  message?: string;
  min: string | number;
}

export const greaterThanOrEqual = ({
  min,
  message = `validation.greaterThanOrEqual`,
}: GreaterThanOrEqualOptions) => ({
  check({ value }: ValidationContext) {
    return Number(value) >= Number(min);
  },
  message: () => message,
});
