import { alpha } from '../index';
import { mockContext } from '../../helpers/mockContext';

describe('alpha rule', () => {
  /** @test */
  it('should return true when a string is only composed by alpha characters', () => {
    expect(alpha().check(mockContext({ value: 'abc' }))).toBeTruthy();
    expect(alpha().check(mockContext({ value: 'ABC' }))).toBeTruthy();
  });

  /** @test */
  it('should return true when a string is composed by alpha and spaces characters and receives the argument space', () => {
    expect(alpha('space').check(mockContext({ value: 'abc EFG' }))).toBeTruthy();
  });

  /** @test */
  it('should return true when a string is composed by alpha and dash characters and receives the argument dash', () => {
    expect(alpha('dash').check(mockContext({ value: 'abc-EFG' }))).toBeTruthy();
  });

  /** @test */
  it('should return true when a string is composed by alpha and underscore characters and receives the argument dash', () => {
    expect(alpha('dash').check(mockContext({ value: 'abc_EFG' }))).toBeTruthy();
  });

  /** @test */
  it('should return true when a string is composed by numeric characters and receives the num argument', () => {
    expect(alpha('num').check(mockContext({ value: '123' }))).toBeTruthy();
    expect(alpha('num').check(mockContext({ value: 'abc123' }))).toBeTruthy();
  });

  /** @test */
  it('should return true when a string is composed by combo of extensions', () => {
    expect(alpha('space', 'num').check(mockContext({ value: 'abc 123' }))).toBeTruthy();
  });

  /** @test */
  it('should return false when a string is composed by alpha characters with spaces', () => {
    expect(alpha().check(mockContext({ value: 'abc EFG' }))).toBeFalsy();
  });

  /** @test */
  it('should return false when a string is composed by numeric characters', () => {
    expect(alpha().check(mockContext({ value: '123' }))).toBeFalsy();
    expect(alpha().check(mockContext({ value: 'abc 123' }))).toBeFalsy();
  });

  /** @test */
  it('should return false when a string is composed by other characters not alpha', () => {
    expect(alpha().check(mockContext({ value: 'a-' }))).toBeFalsy();
    expect(alpha().check(mockContext({ value: 'aas_' }))).toBeFalsy();
    expect(alpha().check(mockContext({ value: 'aas#' }))).toBeFalsy();
    expect(alpha().check(mockContext({ value: 'aas@' }))).toBeFalsy();
  });
});
