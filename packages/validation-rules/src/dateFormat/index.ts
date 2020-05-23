import { ValidationContext } from '@micra/validator';

export interface DateFormatOptions {
  message?: string;
  format: string;
}

export const dateFormat = ({ format, message = `validation.dateFormat` }: DateFormatOptions) => {
  const pattern = format
    .replace('ss', '([0-5][0-9])')
    .replace('mm', '([0-5][0-9])')
    .replace('MM', '(0[1-9]|1[0-2])')
    .replace('HH', '([0-1][0-9]|2[0-3])')
    .replace('DD', '(0[1-9]|1[0-9]|2[0-9]|3[0-1])')
    .replace('YYYY', '(20[0-9][0-9]|1[8-9][0-9][0-9])');

  return {
    check({ value }: ValidationContext) {
      return new RegExp(`^${pattern}$`).test(value);
    },
    message: () => message,
  };
};
