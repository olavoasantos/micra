import { ValidationContext } from '@micra/validator';

export const isBoolean = () => ({
  check({ value }: ValidationContext) {
    return (
      typeof value === 'boolean' ||
      (typeof value === 'object' &&
        value !== null &&
        typeof value.valueOf() === 'boolean')
    );
  },
  message: () => `validation.isBoolean`,
});
