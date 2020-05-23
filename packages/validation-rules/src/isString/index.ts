import { ValidationContext } from '@micra/validator';

export interface IsStringOptions {
  message?: string;
}

export const isString = ({ message = `validation.isString` }: IsStringOptions = {}) => ({
  check({ value }: ValidationContext) {
    return typeof value === 'string' || value instanceof String;
  },
  message: () => message,
});
