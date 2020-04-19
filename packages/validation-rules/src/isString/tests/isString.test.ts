import { isString } from '../index';
import { mockContext } from '../../helpers/mockContext';

describe('isString rule', () => {
  /** @test */
  it('should return true if the value is a string', () => {
    expect(isString().check(mockContext({ value: 'some string' }))).toBeTruthy();
  });

  /** @test */
  it('should return false if the value is not a string', () => {
    expect(isString().check(mockContext({ value: 123 }))).toBeFalsy();
    expect(isString().check(mockContext({ value: {} }))).toBeFalsy();
    expect(isString().check(mockContext({ value: true }))).toBeFalsy();
    expect(isString().check(mockContext({ value: null }))).toBeFalsy();
    expect(isString().check(mockContext({ value: undefined }))).toBeFalsy();
    expect(isString().check(mockContext({ value: /\s/g }))).toBeFalsy();
  });
});
