import { requiredIf } from '../index';
import { mockContext } from '../../helpers/mockContext';

describe('requiredIf rule', () => {
  /** @test */
  it('should return true if the anotherField matches and the is value is set', () => {
    const context = mockContext({
      field: 'field',
      fields: ['field', 'anotherField'],
      data: {
        field: 'some string',
        anotherField: 'expected value',
      },
      value: 'some string',
    });
    expect(requiredIf('anotherField', 'expected value').check(context)).toBeTruthy();
  });

  /** @test */
  it('should return true if the anotherField does not match', () => {
    const context = mockContext({
      field: 'field',
      fields: ['anotherField'],
      data: {
        anotherField: 'unexpected value',
      },
      value: undefined,
    });
    expect(requiredIf('anotherField', 'expected value').check(context)).toBeTruthy();
  });

  /** @test */
  it('should return false if the anotherField does matches and field is not set', () => {
    const context = mockContext({
      field: 'field',
      fields: ['anotherField'],
      data: {
        anotherField: 'expected value',
      },
      value: undefined,
    });
    expect(requiredIf('anotherField', 'expected value').check(context)).toBeFalsy();
  });
});
