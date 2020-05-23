import { inRangeIncluding } from '../index';
import { mockContext } from '../../helpers/mockContext';

describe('inRangeIncluding rule', () => {
  it('should return true when a number is within a given range', () => {
    expect(
      inRangeIncluding({ min: 100, max: 200 }).check(mockContext({ value: 150 })),
    ).toBeTruthy();
  });

  it('should return true when a number is equal to the specified limits', () => {
    expect(
      inRangeIncluding({ min: 100, max: 200 }).check(mockContext({ value: 100 })),
    ).toBeTruthy();
    expect(
      inRangeIncluding({ min: 100, max: 200 }).check(mockContext({ value: 200 })),
    ).toBeTruthy();
  });

  it('should return false when a number is not within a given range', () => {
    expect(inRangeIncluding({ min: 100, max: 200 }).check(mockContext({ value: 10 }))).toBeFalsy();
  });
});
