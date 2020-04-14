import { required } from '../index';
import { mockContext } from '../../helpers/mockContext';

describe('required rule', () => {
  /** @test */
  it('should return true if the value is set', () => {
    expect(
      required().check(mockContext({ value: 'some string' })),
    ).toBeTruthy();
    expect(required().check(mockContext({ value: 123 }))).toBeTruthy();
    expect(required().check(mockContext({ value: 0 }))).toBeTruthy();
    expect(required().check(mockContext({ value: {} }))).toBeTruthy();
    expect(required().check(mockContext({ value: true }))).toBeTruthy();
    expect(required().check(mockContext({ value: false }))).toBeTruthy();
  });

  /** @test */
  it('should return false if the value is not set or has a nullish value', () => {
    expect(required().check(mockContext({ value: null }))).toBeFalsy();
    expect(required().check(mockContext({ value: undefined }))).toBeFalsy();
    expect(required().check(mockContext({ value: '' }))).toBeFalsy();
    expect(required().check(mockContext({ value: '       ' }))).toBeFalsy();
  });
});
