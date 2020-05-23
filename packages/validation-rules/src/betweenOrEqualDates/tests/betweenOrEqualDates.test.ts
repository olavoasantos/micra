import { betweenOrEqualDates } from '../index';
import { mockContext } from '../../helpers/mockContext';

describe('betweenOrEqualDates rule', () => {
  it('should return true when a date is between specified dates', () => {
    expect(
      betweenOrEqualDates({ start: '2013-04-28', end: '2013-04-30' }).check(
        mockContext({ value: '2013-04-29' }),
      ),
    ).toBeTruthy();
  });

  it('should return true when a date is equal to the specified dates', () => {
    expect(
      betweenOrEqualDates({ start: '2013-04-28', end: '2013-04-30' }).check(
        mockContext({ value: '2013-04-28' }),
      ),
    ).toBeTruthy();
    expect(
      betweenOrEqualDates({ start: '2013-04-28', end: '2013-04-30' }).check(
        mockContext({ value: '2013-04-30' }),
      ),
    ).toBeTruthy();
  });

  it('should return false when a date is not between the specified dates', () => {
    expect(
      betweenOrEqualDates({ start: '2013-04-28', end: '2013-04-30' }).check(
        mockContext({ value: '2013-04-03' }),
      ),
    ).toBeFalsy();
  });
});
