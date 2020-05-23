import { lengthBetweenOrEqual } from '../index';
import { mockContext } from '../../helpers/mockContext';

describe('lengthBetweenOrEqual rule', () => {
  it('should return true when the length is within a given range', () => {
    expect(
      lengthBetweenOrEqual({ min: 2, max: 5 }).check(mockContext({ value: 'abc' })),
    ).toBeTruthy();
    expect(
      lengthBetweenOrEqual({ min: 2, max: 5 }).check(mockContext({ value: [1, 2, 3] })),
    ).toBeTruthy();
  });

  it('should return true when the length is equal to the specified limits', () => {
    expect(
      lengthBetweenOrEqual({ min: 2, max: 5 }).check(mockContext({ value: 'ab' })),
    ).toBeTruthy();
    expect(
      lengthBetweenOrEqual({ min: 2, max: 5 }).check(mockContext({ value: 'abcde' })),
    ).toBeTruthy();
    expect(
      lengthBetweenOrEqual({ min: 2, max: 5 }).check(mockContext({ value: [1, 2] })),
    ).toBeTruthy();
    expect(
      lengthBetweenOrEqual({ min: 2, max: 5 }).check(mockContext({ value: [1, 2, 3, 4, 5] })),
    ).toBeTruthy();
  });

  it('should return false when the length is not within a given range', () => {
    expect(lengthBetweenOrEqual({ min: 2, max: 5 }).check(mockContext({ value: 'a' }))).toBeFalsy();
    expect(
      lengthBetweenOrEqual({ min: 2, max: 5 }).check(mockContext({ value: 'abcdef' })),
    ).toBeFalsy();
    expect(lengthBetweenOrEqual({ min: 2, max: 5 }).check(mockContext({ value: [1] }))).toBeFalsy();
    expect(
      lengthBetweenOrEqual({ min: 2, max: 5 }).check(mockContext({ value: [1, 2, 3, 4, 5, 6] })),
    ).toBeFalsy();
  });
});
