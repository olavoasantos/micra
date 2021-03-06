import { accepted } from '../index';
import { mockContext } from '../../helpers/mockContext';

describe('accepted rule', () => {
  it('should accept using a boolean', () => {
    expect(accepted().check(mockContext({ value: true }))).toBeTruthy();
  });

  it('should accept using a number', () => {
    expect(accepted().check(mockContext({ value: 1 }))).toBeTruthy();
  });

  it('should accept using a "on"', () => {
    expect(accepted().check(mockContext({ value: 'on' }))).toBeTruthy();
  });

  it('should accept using a "yes"', () => {
    expect(accepted().check(mockContext({ value: 'yes' }))).toBeTruthy();
  });

  it('should fail using when passing null and undefined', () => {
    expect(accepted().check(mockContext({ value: null }))).toBeFalsy();
    expect(accepted().check(mockContext({ value: undefined }))).toBeFalsy();
  });

  it('should fail using a boolean other than true', () => {
    expect(accepted().check(mockContext({ value: false }))).toBeFalsy();
  });

  it('should fail using a number other than 1', () => {
    expect(accepted().check(mockContext({ value: 0 }))).toBeFalsy();
    expect(accepted().check(mockContext({ value: 213 }))).toBeFalsy();
  });

  it('should fail using a string other than "yes" and "on"', () => {
    expect(accepted().check(mockContext({ value: 'no' }))).toBeFalsy();
    expect(accepted().check(mockContext({ value: 'off' }))).toBeFalsy();
    expect(accepted().check(mockContext({ value: 'A RANDOM STRING' }))).toBeFalsy();
  });
});
