import { ValidationContext } from '@micra/validator';

export interface AfterOptions {
  message?: string;
  date: Date | string | number;
}

export const after = ({ date, message = `validation.after` }: AfterOptions) => ({
  check({ value }: ValidationContext) {
    return new Date(value) > new Date(date);
  },
  message: () => message,
});
