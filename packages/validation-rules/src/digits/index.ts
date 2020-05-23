import { ValidationContext } from '@micra/validator';

export interface DigitsOptions {
  message?: string;
  length: number;
}

export const digits = ({ length, message = `validation.digits` }: DigitsOptions) => ({
  check({ value }: ValidationContext) {
    return !isNaN(value) && String(value).length === length;
  },
  message: () => message,
});
