import {
  ValidationDefinition,
  ValidationRuleGenerator,
  ValidationRule,
  ValidationContext,
} from './types';
import { ValidationError } from './ValidationError';

export const validate = <T = Record<string, any>>(
  data: Record<Partial<keyof T>, any>,
  validation: ValidationDefinition<T>,
): [T, ValidationError<T>] => {
  const dto: Partial<T> = {};
  const fields = Object.keys(validation) as (keyof T)[];
  const errors = new ValidationError<T>(fields);

  fields.forEach((field) => {
    const context: ValidationContext<T> = {
      data,
      dto,
      errors,
      field,
      fields,
      value: data[field],
    };

    dto[field] = data[field];

    const rules = Array.isArray(validation[field])
      ? (validation[field] as ValidationRule<T>[])
      : ((validation[field] as ValidationRuleGenerator<T>)(context) as ValidationRule<T>[]);

    rules.forEach((rule) => {
      if ((!rule.shouldRun || rule.shouldRun(context)) && !rule.check(context)) {
        errors.push(field, rule.message(context));
      }
    });
  });

  return [dto as T, errors];
};
