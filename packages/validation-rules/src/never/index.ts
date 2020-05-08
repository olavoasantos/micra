import { ValidationContext } from '@micra/validator';

export const never = () => ({
  check({ dto, field }: ValidationContext) {
    dto[field as string] = undefined;

    return true;
  },
  message: () => `validation.never`,
});
