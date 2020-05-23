import { ValidationContext } from '@micra/validator';

export interface IsBooleanOptions {
  message?: string;
}

export const isBoolean = ({ message = `validation.isBoolean` }: IsBooleanOptions = {}) => ({
  check({ value }: ValidationContext) {
    return (
      typeof value === 'boolean' ||
      (typeof value === 'object' && value !== null && typeof value.valueOf() === 'boolean')
    );
  },
  message: () => message,
});
