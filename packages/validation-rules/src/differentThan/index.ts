import { ValidationContext } from '@micra/validator';

export interface DifferentThanOptions {
  message?: string;
  field: string;
}

export const differentThan = ({
  field,
  message = `validation.differentThan`,
}: DifferentThanOptions) => ({
  check({ data, value }: ValidationContext) {
    return JSON.stringify(data[field]) !== JSON.stringify(value);
  },
  message: () => message,
});
