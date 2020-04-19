import { afterOrEqual } from '../index';
import { mockContext } from '../../helpers/mockContext';

describe('afterOrEqual rule', () => {
  /** @test */
  it('should return true when a date is afterOrEqual another date', () => {
    expect(afterOrEqual('2013-04-28').check(mockContext({ value: '2013-04-29' }))).toBeTruthy();
  });

  /** @test */
  it('should return true when a date is equal to another date', () => {
    expect(afterOrEqual('2013-04-29').check(mockContext({ value: '2013-04-29' }))).toBeTruthy();
  });

  /** @test */
  it('should return false when a date is before another date', () => {
    expect(afterOrEqual('2013-04-30').check(mockContext({ value: '2013-04-29' }))).toBeFalsy();
  });
});
