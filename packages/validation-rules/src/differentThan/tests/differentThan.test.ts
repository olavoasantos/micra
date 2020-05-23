import { differentThan } from '../index';
import { mockContext } from '../../helpers/mockContext';

describe('differentThan rule', () => {
  it('should return true if the value is different than the value of another field', () => {
    const context = mockContext({
      field: 'field',
      data: {
        field: 'value',
        anotherField: 'another value',
      },
    });
    expect(differentThan({ field: 'anotherField' }).check(context)).toBeTruthy();
  });

  it('should return false if the value is not different than the value of another field', () => {
    const context = mockContext({
      field: 'field',
      data: {
        field: 'same value',
        anotherField: 'same value',
      },
    });
    expect(differentThan({ field: 'anotherField' }).check(context)).toBeFalsy();
  });
});
