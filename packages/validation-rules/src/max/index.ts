import { ValidationContext } from '@micra/validator';

export interface MaxOptions {
  message?: string;
  value: string | number;
}

export const max = ({ value: maxVal, message = `validation.max` }: MaxOptions) => ({
  check({ value }: ValidationContext) {
    return Number(value) < Number(maxVal);
  },
  message: () => message,
});
