import { requiredUnless } from '../index';
import { mockContext } from '../../helpers/mockContext';

describe('requiredUnless rule', () => {
  /** @test */
  it('should return true if the anotherField does not match and the is value is set', () => {
    const context = mockContext({
      field: 'field',
      fields: ['field', 'anotherField'],
      data: {
        field: 'some string',
        anotherField: 'unexpected value',
      },
      value: 'some string',
    });
    expect(
      requiredUnless('anotherField', 'expected value').check(context),
    ).toBeTruthy();
  });

  /** @test */
  it('should return true if the anotherField matches the expected value', () => {
    const context = mockContext({
      field: 'field',
      fields: ['anotherField'],
      data: {
        anotherField: 'expected value',
      },
      value: undefined,
    });
    expect(
      requiredUnless('anotherField', 'expected value').check(context),
    ).toBeTruthy();
  });

  /** @test */
  it('should return false if the anotherField does not match and field is not set', () => {
    const context = mockContext({
      field: 'field',
      fields: ['anotherField'],
      data: {
        anotherField: 'unexpected value',
      },
      value: undefined,
    });
    expect(
      requiredUnless('anotherField', 'expected value').check(context),
    ).toBeFalsy();
  });
});
