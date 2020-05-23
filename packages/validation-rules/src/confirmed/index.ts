import { ValidationContext } from '@micra/validator';

export interface ConfirmedOptions {
  message?: string;
  against?: string;
}

export const confirmed = ({
  against: fieldName,
  message = `validation.confirmed`,
}: ConfirmedOptions = {}) => ({
  check({ field, data, value }: ValidationContext) {
    if (fieldName) {
      return value === data[fieldName];
    }

    return (
      data[`${field as string}Confirmation`] === value ||
      data[`${field as string}_confirmation`] === value
    );
  },
  message: () => message,
});
