import { ValidationContext, ValidationError } from '@micra/validator';

export const mockContext = (overrides: Partial<ValidationContext>) =>
  ({
    data: {
      fieldName: null,
    },
    field: 'fieldName',
    value: overrides.data
      ? overrides.field
        ? overrides.data[overrides.field as string]
        : overrides.data.fieldName
      : null,
    dto: {},
    fields: overrides.data ? Object.keys(overrides.data) : ['fieldName'],
    errors: new ValidationError(overrides.fields || ['fieldName']),
    ...overrides,
  } as ValidationContext);
