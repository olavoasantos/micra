import { digitsBetweenOrEqual } from '../index';
import { mockContext } from '../../helpers/mockContext';

describe('digitsBetweenOrEqual rule', () => {
  /** @test */
  it('should return true if a number has a digit count in a given range', () => {
    expect(
      digitsBetweenOrEqual(2, 4).check(mockContext({ value: 123 })),
    ).toBeTruthy();
  });

  /** @test */
  it('should return true if a number has a digit count that matches the limits of a given range', () => {
    expect(
      digitsBetweenOrEqual(2, 4).check(mockContext({ value: 12 })),
    ).toBeTruthy();
    expect(
      digitsBetweenOrEqual(2, 4).check(mockContext({ value: 1234 })),
    ).toBeTruthy();
  });

  /** @test */
  it('should return false if a number has a digit count outside a given range', () => {
    expect(
      digitsBetweenOrEqual(2, 4).check(mockContext({ value: 1 })),
    ).toBeFalsy();
    expect(
      digitsBetweenOrEqual(2, 4).check(mockContext({ value: 12345 })),
    ).toBeFalsy();
  });
});
