import { oneOf } from '../index';
import { mockContext } from '../../helpers/mockContext';

describe('oneOf rule', () => {
  /** @test */
  it('should return true if the value is included in the options', () => {
    expect(oneOf(['option', 123]).check(mockContext({ value: 'option' }))).toBeTruthy();
    expect(oneOf(['option', 123]).check(mockContext({ value: 123 }))).toBeTruthy();
  });

  /** @test */
  it('should return false if the value is not included in the options', () => {
    expect(oneOf(['option', 123]).check(mockContext({ value: {} }))).toBeFalsy();
    expect(oneOf(['option', 123]).check(mockContext({ value: true }))).toBeFalsy();
    expect(oneOf(['option', 123]).check(mockContext({ value: null }))).toBeFalsy();
    expect(oneOf(['option', 123]).check(mockContext({ value: undefined }))).toBeFalsy();
    expect(oneOf(['option', 123]).check(mockContext({ value: /\s/g }))).toBeFalsy();
  });
});
