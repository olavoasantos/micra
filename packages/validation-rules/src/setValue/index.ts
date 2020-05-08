import { ValidationContext } from '@micra/validator';

export const setValue = (value?: any) => ({
  dto,
  field,
}: ValidationContext) => {
  dto[field as string] = value;

  return [];
};
