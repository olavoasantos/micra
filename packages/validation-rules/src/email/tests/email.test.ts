import { email } from '../index';
import { mockContext } from '../../helpers/mockContext';

describe('email rule', () => {


  /** @test */
  it('should return true if the value is a valid e-mail', () => {
    expect(email().check(mockContext({ value: 'VALID.EMAIL@EXAMPLE.COM' }))).toBeTruthy();
    expect(email().check(mockContext({ value: 'E-MAIL_VALID@EXAMPLE.COM.BR' }))).toBeTruthy();
  });

  /** @test */
  it('should return false if the value is not a valid e-mail', () => {
    expect(email().check(mockContext({ value: 'INVALID EMAIL' }))).toBeFalsy();
    expect(email().check(mockContext({ value: 'INVALID EMAIL@EXAMPLE.COM' }))).toBeFalsy();
    expect(email().check(mockContext({ value: 'INVALID_E-MAIL@EXAMPLE.COM.' }))).toBeFalsy();
    expect(
      email().check(mockContext({ value: '!@!#$!%ˆ&E-MAIL_VALIDO@EXAMPLE.COM.' }))
    ).toBeFalsy();
  });
});
