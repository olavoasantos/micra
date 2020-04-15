import { ValidationContext } from '@micra/validator';

export const differentThan = (field: string) => ({
  check({ data, value }: ValidationContext) {
    return JSON.stringify(data[field]) !== JSON.stringify(value);
  },
  message: () => `validation.differentThan`,
});
