import { ValidationContext } from '@micra/validator';

export const confirmed = (fieldName?: string) => ({
  check({ field, data, value }: ValidationContext) {
    if (fieldName) {
      return value === data[fieldName];
    }

    return (
      data[`${field}Confirmation`] === value ||
      data[`${field}_confirmation`] === value
    );
  },
  message: () => `validation.confirmed`,
});
