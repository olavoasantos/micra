import { ValidationContext } from '@micra/validator';

export interface IsArrayOptions {
  message?: string;
}

export const isArray = ({ message = `validation.isArray` }: IsArrayOptions = {}) => ({
  check({ value }: ValidationContext) {
    return Object.prototype.toString.call(value) === '[object Array]';
  },
  message: () => message,
});
