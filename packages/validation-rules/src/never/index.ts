import { ValidationContext } from '@micra/validator';

export const never = () => ({
  check({ dto, field }: ValidationContext) {
    dto[field] = undefined;

    return true;
  },
  message: () => `validation.never`,
});
