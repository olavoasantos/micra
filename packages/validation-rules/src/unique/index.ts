import { ValidationContext } from '@micra/validator';

export interface UniqueOptions {
  message?: string;
  keys?: string[];
}

export const unique = ({ keys, message = `validation.unique` }: UniqueOptions = {}) => ({
  check({ value }: ValidationContext) {
    for (const item of value) {
      if (keys) {
        if (
          value.filter((data: any) => keys.some((field) => data[field] === item[field])).length > 1
        ) {
          return false;
        }
      } else {
        if (value.filter((data: any) => data === item).length > 1) {
          return false;
        }
      }
    }

    return true;
  },
  message: () => message,
});
