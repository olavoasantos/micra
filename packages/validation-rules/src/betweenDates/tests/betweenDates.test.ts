import { betweenDates } from '../index';
import { mockContext } from '../../helpers/mockContext';

describe('betweenDates rule', () => {
  /** @test */
  it('should return true when a date is between specified dates', () => {
    expect(
      betweenDates('2013-04-28', '2013-04-30').check(
        mockContext({ value: '2013-04-29' }),
      ),
    ).toBeTruthy();
  });

  /** @test */
  it('should return false when a date is equal to the specified dates', () => {
    expect(
      betweenDates('2013-04-28', '2013-04-30').check(
        mockContext({ value: '2013-04-28' }),
      ),
    ).toBeFalsy();
    expect(
      betweenDates('2013-04-28', '2013-04-30').check(
        mockContext({ value: '2013-04-30' }),
      ),
    ).toBeFalsy();
  });

  /** @test */
  it('should return false when a date is not between the specified dates', () => {
    expect(
      betweenDates('2013-04-28', '2013-04-30').check(
        mockContext({ value: '2013-04-03' }),
      ),
    ).toBeFalsy();
  });
});
