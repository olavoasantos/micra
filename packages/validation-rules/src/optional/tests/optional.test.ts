import { optional } from '../index';
import { mockContext } from '../../helpers/mockContext';

describe('optional rule', () => {
  it('should return the rules array if field exists', () => {
    const DEFAULT_VALUE = 'DEFAULT VALUE';
    const rules = [
      {
        check: () => true,
        message: () => 'invalid',
      },
    ];
    const optionalRules = optional(rules, DEFAULT_VALUE);
    const context = mockContext({
      field: 'optionalField',
      data: {
        requiredField: 123,
        optionalField: 'INPUT VALUE',
      },
      fields: ['requiredField', 'optionalField'],
    });

    expect(optionalRules(context)).toMatchObject(rules);
  });

  it('should return set the default value to the dto if no value is set', () => {
    const DEFAULT_VALUE = 'DEFAULT VALUE';
    const rules = [
      {
        check: () => true,
        message: () => 'invalid',
      },
    ];
    const optionalRules = optional(rules, DEFAULT_VALUE);
    const context = mockContext({
      field: 'optionalField',
      data: {
        requiredField: 123,
      },
      fields: ['requiredField'],
    });

    optionalRules(context);

    expect(context.dto.optionalField).toBe(DEFAULT_VALUE);
  });

  it('should return an empty array if field does not exist', () => {
    const DEFAULT_VALUE = 'DEFAULT VALUE';
    const rules = [
      {
        check: () => true,
        message: () => 'invalid',
      },
    ];
    const optionalRules = optional(rules, DEFAULT_VALUE);
    const context = mockContext({
      field: 'optionalField',
      data: {
        requiredField: 123,
      },
      fields: ['requiredField'],
    });

    expect(optionalRules(context)).toMatchObject([]);
  });
});
