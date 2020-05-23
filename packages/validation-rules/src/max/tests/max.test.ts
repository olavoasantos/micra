import { max } from '../index';
import { mockContext } from '../../helpers/mockContext';

describe('max rule', () => {
  it('should return true when a number greater than another number', () => {
    expect(max({ value: 100 }).check(mockContext({ value: 200 }))).toBeTruthy();
  });

  it('should return false when a number is equal to another number', () => {
    expect(max({ value: 100 }).check(mockContext({ value: 100 }))).toBeFalsy();
  });

  it('should return false when a number is not greater than another number', () => {
    expect(max({ value: 100 }).check(mockContext({ value: 50 }))).toBeFalsy();
  });
});
