import { ValidationContext } from '@micra/validator';

export const inArray = (field: string) => ({
  check({ data, value }: ValidationContext) {
    return (
      Object.prototype.toString.call(data[field]) === '[object Array]' &&
      data[field].includes(value)
    );
  },
  message: () => `validation.inArray`,
});
