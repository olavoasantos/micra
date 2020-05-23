import { ValidationContext } from '@micra/validator';

export interface MinOptions {
  message?: string;
  value: string | number;
}

export const min = ({ value: minVal, message = `validation.min` }: MinOptions) => ({
  check({ value }: ValidationContext) {
    return Number(value) > Number(minVal);
  },
  message: () => message,
});
