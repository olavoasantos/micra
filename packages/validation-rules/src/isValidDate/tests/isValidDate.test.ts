import { isValidDate } from '../index';
import { mockContext } from '../../helpers/mockContext';

describe('isValidDate rule', () => {
  /** @test */
  it('should return true if the value is a valid Date', () => {
    expect(
      isValidDate().check(mockContext({ value: '2020/04/14' })),
    ).toBeTruthy();
    expect(
      isValidDate().check(mockContext({ value: new Date() })),
    ).toBeTruthy();
  });

  /** @test */
  it('should return false if the value is not a valid Date', () => {
    expect(isValidDate().check(mockContext({ value: 'foo' }))).toBeFalsy();
    expect(
      isValidDate().check(mockContext({ value: 'June 32, 2020' })),
    ).toBeFalsy();
    expect(isValidDate().check(mockContext({ value: {} }))).toBeFalsy();
    expect(isValidDate().check(mockContext({ value: true }))).toBeFalsy();
    expect(isValidDate().check(mockContext({ value: null }))).toBeFalsy();
    expect(isValidDate().check(mockContext({ value: undefined }))).toBeFalsy();
    expect(isValidDate().check(mockContext({ value: /\s/g }))).toBeFalsy();
  });
});
