import { lengthBetween } from '../index';
import { mockContext } from '../../helpers/mockContext';

describe('lengthBetween rule', () => {
  /** @test */
  it('should return true when the length is within a given range', () => {
    expect(
      lengthBetween(2, 5).check(mockContext({ value: 'abc' })),
    ).toBeTruthy();
    expect(
      lengthBetween(2, 5).check(mockContext({ value: [1, 2, 3] })),
    ).toBeTruthy();
  });

  /** @test */
  it('should return false when the length is equal to the specified limits', () => {
    expect(lengthBetween(2, 5).check(mockContext({ value: 'ab' }))).toBeFalsy();
    expect(
      lengthBetween(2, 5).check(mockContext({ value: 'abcde' })),
    ).toBeFalsy();
    expect(
      lengthBetween(2, 5).check(mockContext({ value: [1, 2] })),
    ).toBeFalsy();
    expect(
      lengthBetween(2, 5).check(mockContext({ value: [1, 2, 3, 4, 5] })),
    ).toBeFalsy();
  });

  /** @test */
  it('should return false when the length is not within a given range', () => {
    expect(lengthBetween(2, 5).check(mockContext({ value: 'a' }))).toBeFalsy();
    expect(
      lengthBetween(2, 5).check(mockContext({ value: 'abcdef' })),
    ).toBeFalsy();
    expect(lengthBetween(2, 5).check(mockContext({ value: [1] }))).toBeFalsy();
    expect(
      lengthBetween(2, 5).check(mockContext({ value: [1, 2, 3, 4, 5, 6] })),
    ).toBeFalsy();
  });
});
