import { digits } from '../index';
import { mockContext } from '../../helpers/mockContext';

describe('digits rule', () => {
  it('should return true if a number has a given number of digits', () => {
    expect(digits({ length: 2 }).check(mockContext({ value: 10 }))).toBeTruthy();
  });

  it('should return false if a number does not a given number of digits', () => {
    expect(digits({ length: 2 }).check(mockContext({ value: 1 }))).toBeFalsy();
    expect(digits({ length: 2 }).check(mockContext({ value: 100 }))).toBeFalsy();
  });
});
