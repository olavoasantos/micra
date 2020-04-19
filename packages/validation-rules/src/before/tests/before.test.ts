import { before } from '../index';
import { mockContext } from '../../helpers/mockContext';

describe('before rule', () => {
  /** @test */
  it('should return true when a date is before another date', () => {
    expect(before('2013-04-28').check(mockContext({ value: '2013-04-27' }))).toBeTruthy();
  });

  /** @test */
  it('should return false when a date is equal to another date', () => {
    expect(before('2013-04-29').check(mockContext({ value: '2013-04-29' }))).toBeFalsy();
  });

  /** @test */
  it('should return false when a date is after another date', () => {
    expect(before('2013-04-28').check(mockContext({ value: '2013-04-29' }))).toBeFalsy();
  });
});
