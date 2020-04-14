import { ValidationContext } from '@micra/validator';

export const accepted = () => ({
  check({ value }: ValidationContext) {
    return value === true || value === 1 || value === 'on' || value === 'yes';
  },
  message: () => `validation.accepted`,
});
