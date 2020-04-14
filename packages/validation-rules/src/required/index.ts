import { ValidationContext } from '@micra/validator';

export const required = () => ({
  check({ value }: ValidationContext) {
    if (typeof value === 'string') {
      return value.replace(/\s+/g, '').trim() !== '';
    }

    return value != null;
  },
  message: () => `validation.required`,
});
