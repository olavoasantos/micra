import { isArray } from '../index';
import { mockContext } from '../../helpers/mockContext';

describe('isArray rule', () => {
  /** @test */
  it('should return true if the value is an array', () => {
    expect(isArray().check(mockContext({ value: ['some string'] }))).toBeTruthy();
  });

  /** @test */
  it('should return false if the value is not an array', () => {
    expect(isArray().check(mockContext({ value: 'string' }))).toBeFalsy();
    expect(isArray().check(mockContext({ value: 123 }))).toBeFalsy();
    expect(isArray().check(mockContext({ value: {} }))).toBeFalsy();
    expect(isArray().check(mockContext({ value: true }))).toBeFalsy();
    expect(isArray().check(mockContext({ value: null }))).toBeFalsy();
    expect(isArray().check(mockContext({ value: undefined }))).toBeFalsy();
    expect(isArray().check(mockContext({ value: /\s/g }))).toBeFalsy();
  });
});
