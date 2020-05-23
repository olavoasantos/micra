import { greaterThan } from '../index';
import { mockContext } from '../../helpers/mockContext';

describe('greaterThan rule', () => {
  it('should return true when a number greater than another number', () => {
    expect(greaterThan({ min: 100 }).check(mockContext({ value: 200 }))).toBeTruthy();
  });

  it('should return false when a number is equal to another number', () => {
    expect(greaterThan({ min: 100 }).check(mockContext({ value: 100 }))).toBeFalsy();
  });

  it('should return false when a number is not greater than another number', () => {
    expect(greaterThan({ min: 100 }).check(mockContext({ value: 50 }))).toBeFalsy();
  });
});
