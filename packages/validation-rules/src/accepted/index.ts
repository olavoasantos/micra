import { ValidationContext } from '@micra/validator';

export interface AcceptedOptions {
  message?: string;
}

export const accepted = ({ message = `validation.accepted` }: AcceptedOptions = {}) => ({
  check({ value }: ValidationContext) {
    return value === true || value === 1 || value === 'on' || value === 'yes';
  },
  message: () => message,
});
