import { ValidationRule, ValidationContext } from '@micra/validator';

export const optional = (rules: ValidationRule[] = [], fallback?: any) => ({
  dto,
  field,
  fields,
}: ValidationContext) => {
  if (fields.includes(field)) {
    return rules;
  }

  if (fallback) {
    dto[field] = fallback;
  }

  return [];
};
