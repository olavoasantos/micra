import { ValidationContext } from '@micra/validator';

export const confirmed = (field: string) => ({
  check({ data }: ValidationContext) {
    return (
      data[`${field}Confirmation`] === data[field] ||
      data[`${field}_confirmation`] === data[field]
    );
  },
  message: () => `validation.confirmed`,
});
