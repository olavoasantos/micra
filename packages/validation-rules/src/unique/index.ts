import { ValidationContext } from '@micra/validator';

export const unique = (options?: string[]) => ({
  check({ value }: ValidationContext) {
    for (const item of value) {
      if (options) {
        if (
          value.filter((data: any) => options.some((field) => data[field] === item[field])).length >
          1
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
  message: () => `validation.unique`,
});
