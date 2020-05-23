import { isBoolean } from '../index';
import { mockContext } from '../../helpers/mockContext';

describe('isBoolean rule', () => {
  it('should return true if the value is an boolean', () => {
    expect(isBoolean().check(mockContext({ value: true }))).toBeTruthy();
    expect(isBoolean().check(mockContext({ value: false }))).toBeTruthy();
  });

  it('should return false if the value is not an boolean', () => {
    expect(isBoolean().check(mockContext({ value: 'string' }))).toBeFalsy();
    expect(isBoolean().check(mockContext({ value: 123 }))).toBeFalsy();
    expect(isBoolean().check(mockContext({ value: [] }))).toBeFalsy();
    expect(isBoolean().check(mockContext({ value: {} }))).toBeFalsy();
    expect(isBoolean().check(mockContext({ value: null }))).toBeFalsy();
    expect(isBoolean().check(mockContext({ value: undefined }))).toBeFalsy();
    expect(isBoolean().check(mockContext({ value: /\s/g }))).toBeFalsy();
  });
});
