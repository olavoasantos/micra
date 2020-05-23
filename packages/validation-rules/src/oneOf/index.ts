import { ValidationContext } from '@micra/validator';

export interface OneOfOptions {
  message?: string;
  options: any[];
}

export const oneOf = ({ options, message = `validation.oneOf` }: OneOfOptions) => ({
  check({ value }: ValidationContext) {
    return options.includes(value);
  },
  message: () => message,
});
