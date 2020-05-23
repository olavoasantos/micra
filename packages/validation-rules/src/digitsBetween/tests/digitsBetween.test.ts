import { digitsBetween } from '../index';
import { mockContext } from '../../helpers/mockContext';

describe('digitsBetween rule', () => {
  it('should return true if a number has a digit count in a given range', () => {
    expect(digitsBetween({ min: 2, max: 4 }).check(mockContext({ value: 123 }))).toBeTruthy();
  });

  it('should return false if a number has a digit count that matches the limits of a given range', () => {
    expect(digitsBetween({ min: 2, max: 4 }).check(mockContext({ value: 12 }))).toBeFalsy();
    expect(digitsBetween({ min: 2, max: 4 }).check(mockContext({ value: 1234 }))).toBeFalsy();
  });

  it('should return false if a number has a digit count outside a given range', () => {
    expect(digitsBetween({ min: 2, max: 4 }).check(mockContext({ value: 1 }))).toBeFalsy();
    expect(digitsBetween({ min: 2, max: 4 }).check(mockContext({ value: 12345 }))).toBeFalsy();
  });
});
