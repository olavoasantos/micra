import { inRangeIncluding } from '../index';
import { mockContext } from '../../helpers/mockContext';

describe('inRangeIncluding rule', () => {
  /** @test */
  it('should return true when a number is within a given range', () => {
    expect(
      inRangeIncluding(100, 200).check(mockContext({ value: 150 })),
    ).toBeTruthy();
  });

  /** @test */
  it('should return true when a number is equal to the specified limits', () => {
    expect(
      inRangeIncluding(100, 200).check(mockContext({ value: 100 })),
    ).toBeTruthy();
    expect(
      inRangeIncluding(100, 200).check(mockContext({ value: 200 })),
    ).toBeTruthy();
  });

  /** @test */
  it('should return false when a number is not within a given range', () => {
    expect(
      inRangeIncluding(100, 200).check(mockContext({ value: 10 })),
    ).toBeFalsy();
  });
});
