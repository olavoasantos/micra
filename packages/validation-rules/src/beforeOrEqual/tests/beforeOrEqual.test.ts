import { beforeOrEqual } from '../index';
import { mockContext } from '../../helpers/mockContext';

describe('beforeOrEqual rule', () => {
  it('should return true when a date is before another date', () => {
    expect(
      beforeOrEqual({ date: '2013-04-28' }).check(mockContext({ value: '2013-04-27' })),
    ).toBeTruthy();
  });

  it('should return true when a date is equal to another date', () => {
    expect(
      beforeOrEqual({ date: '2013-04-29' }).check(mockContext({ value: '2013-04-29' })),
    ).toBeTruthy();
  });

  it('should return false when a date is after another date', () => {
    expect(
      beforeOrEqual({ date: '2013-04-28' }).check(mockContext({ value: '2013-04-29' })),
    ).toBeFalsy();
  });
});
