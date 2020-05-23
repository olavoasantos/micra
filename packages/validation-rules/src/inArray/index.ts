import { ValidationContext } from '@micra/validator';

export interface InArrayOptions {
  message?: string;
  field: string;
}

export const inArray = ({ field, message = `validation.inArray` }: InArrayOptions) => ({
  check({ data, value }: ValidationContext) {
    return (
      Object.prototype.toString.call(data[field]) === '[object Array]' &&
      data[field].includes(value)
    );
  },
  message: () => message,
});
