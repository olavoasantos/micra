import { ValidationContext, ValidationError } from '@micra/validator';

export const mockContext = (overrides: Partial<ValidationContext>) =>
  ({
    data: {
      fieldName: null,
    },
    field: 'fieldName',
    value: null,
    dto: {},
    fields: ['fieldName'],
    errors: new ValidationError(overrides.fields || ['fieldName']),
    ...overrides,
  } as ValidationContext);
