import { lengthBetweenOrEqual } from '../index';
import { mockContext } from '../../helpers/mockContext';

describe('lengthBetweenOrEqual rule', () => {
  /** @test */
  it('should return true when the length is within a given range', () => {
    expect(lengthBetweenOrEqual(2, 5).check(mockContext({ value: 'abc' }))).toBeTruthy();
    expect(lengthBetweenOrEqual(2, 5).check(mockContext({ value: [1, 2, 3] }))).toBeTruthy();
  });

  /** @test */
  it('should return true when the length is equal to the specified limits', () => {
    expect(lengthBetweenOrEqual(2, 5).check(mockContext({ value: 'ab' }))).toBeTruthy();
    expect(lengthBetweenOrEqual(2, 5).check(mockContext({ value: 'abcde' }))).toBeTruthy();
    expect(lengthBetweenOrEqual(2, 5).check(mockContext({ value: [1, 2] }))).toBeTruthy();
    expect(lengthBetweenOrEqual(2, 5).check(mockContext({ value: [1, 2, 3, 4, 5] }))).toBeTruthy();
  });

  /** @test */
  it('should return false when the length is not within a given range', () => {
    expect(lengthBetweenOrEqual(2, 5).check(mockContext({ value: 'a' }))).toBeFalsy();
    expect(lengthBetweenOrEqual(2, 5).check(mockContext({ value: 'abcdef' }))).toBeFalsy();
    expect(lengthBetweenOrEqual(2, 5).check(mockContext({ value: [1] }))).toBeFalsy();
    expect(
      lengthBetweenOrEqual(2, 5).check(mockContext({ value: [1, 2, 3, 4, 5, 6] })),
    ).toBeFalsy();
  });
});
