import { ValidationContext } from '@micra/validator';

export interface BeforeOptions {
  message?: string;
  date: Date | string | number;
}

export const before = ({ date, message = `validation.before` }: BeforeOptions) => ({
  check({ value }: ValidationContext) {
    return new Date(value) < new Date(date);
  },
  message: () => message,
});
