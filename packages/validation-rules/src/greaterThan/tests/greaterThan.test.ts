import { greaterThan } from '../index';
import { mockContext } from '../../helpers/mockContext';

describe('greaterThan rule', () => {
  /** @test */
  it('should return true when a number greater than another number', () => {
    expect(greaterThan(100).check(mockContext({ value: 200 }))).toBeTruthy();
  });

  /** @test */
  it('should return false when a number is equal to another number', () => {
    expect(greaterThan(100).check(mockContext({ value: 100 }))).toBeFalsy();
  });

  /** @test */
  it('should return false when a number is not greater than another number', () => {
    expect(greaterThan(100).check(mockContext({ value: 50 }))).toBeFalsy();
  });
});