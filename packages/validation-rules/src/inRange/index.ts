import { ValidationContext } from '@micra/validator';

export interface InRangeOptions {
  message?: string;
  min: string | number;
  max: string | number;
}

export const inRange = ({ min, max, message = `validation.inRange` }: InRangeOptions) => ({
  check({ value }: ValidationContext) {
    if (min === max) {
      throw new Error(`inRange: min and max should be different`);
    }

    const num = Number(value);
    const end = Number(max);
    const initial = Number(min);
    return initial < end ? num > initial && num < end : num < initial && num > end;
  },
  message: () => message,
});
