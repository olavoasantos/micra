import { ValidationContext } from '@micra/validator';

export interface GreaterThanOptions {
  message?: string;
  min: string | number;
}

export const greaterThan = ({ min, message = `validation.greaterThan` }: GreaterThanOptions) => ({
  check({ value }: ValidationContext) {
    return Number(value) > Number(min);
  },
  message: () => message,
});
