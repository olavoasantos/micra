import { alpha } from '../index';
import { mockContext } from '../../helpers/mockContext';

describe('alpha rule', () => {
  it('should return true when a string is only composed by alpha characters', () => {
    expect(alpha().check(mockContext({ value: 'abc' }))).toBeTruthy();
    expect(alpha().check(mockContext({ value: 'ABC' }))).toBeTruthy();
  });

  it('should return true when a string is composed by alpha and spaces characters and receives the argument space', () => {
    expect(alpha({ ext: ['space'] }).check(mockContext({ value: 'abc EFG' }))).toBeTruthy();
  });

  it('should return true when a string is composed by alpha and dash characters and receives the argument dash', () => {
    expect(alpha({ ext: ['dash'] }).check(mockContext({ value: 'abc-EFG' }))).toBeTruthy();
  });

  it('should return true when a string is composed by alpha and underscore characters and receives the argument dash', () => {
    expect(alpha({ ext: ['dash'] }).check(mockContext({ value: 'abc_EFG' }))).toBeTruthy();
  });

  it('should return true when a string is composed by numeric characters and receives the num argument', () => {
    expect(alpha({ ext: ['num'] }).check(mockContext({ value: '123' }))).toBeTruthy();
    expect(alpha({ ext: ['num'] }).check(mockContext({ value: 'abc123' }))).toBeTruthy();
  });

  it('should return true when a string is composed by combo of extensions', () => {
    expect(
      alpha({ ext: ['space', , 'num'] }).check(mockContext({ value: 'abc 123' })),
    ).toBeTruthy();
  });

  it('should return false when a string is composed by alpha characters with spaces', () => {
    expect(alpha().check(mockContext({ value: 'abc EFG' }))).toBeFalsy();
  });

  it('should return false when a string is composed by numeric characters', () => {
    expect(alpha().check(mockContext({ value: '123' }))).toBeFalsy();
    expect(alpha().check(mockContext({ value: 'abc 123' }))).toBeFalsy();
  });

  it('should return false when a string is composed by other characters not alpha', () => {
    expect(alpha().check(mockContext({ value: 'a-' }))).toBeFalsy();
    expect(alpha().check(mockContext({ value: 'aas_' }))).toBeFalsy();
    expect(alpha().check(mockContext({ value: 'aas#' }))).toBeFalsy();
    expect(alpha().check(mockContext({ value: 'aas@' }))).toBeFalsy();
  });
});
