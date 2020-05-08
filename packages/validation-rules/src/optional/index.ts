import { ValidationRule, ValidationContext } from '@micra/validator';

export const optional = (rules: ValidationRule[] = [], fallback?: any) => ({
  dto,
  field,
  data,
}: ValidationContext) => {
  if (Object.keys(data).includes(field as string)) {
    return rules;
  }

  if (fallback) {
    dto[field as string] = fallback;
  }

  return [];
};
