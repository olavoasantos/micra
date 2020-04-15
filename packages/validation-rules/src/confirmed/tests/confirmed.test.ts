/* eslint-disable @typescript-eslint/camelcase */
import { confirmed } from '../index';
import { mockContext } from '../../helpers/mockContext';

describe('confirmed rule', () => {
  /** @test */
  it('should return true if value has the correct confirmation', () => {
    const context = mockContext({
      field: 'password',
      data: {
        password: 'MY PASSWORD',
        password_confirmation: 'MY PASSWORD',
      },
    });

    expect(confirmed().check(context)).toBeTruthy();
  });

  /** @test */
  it('should return false if value has the wrong confirmation', () => {
    const context = mockContext({
      field: 'password',
      data: {
        password: 'MY PASSWORD',
        password_confirmation: 'MY WRONG PASSWORD',
      },
    });

    expect(confirmed().check(context)).toBeFalsy();
  });

  /** @test */
  it('should return false if value has no confirmation', () => {
    const context = mockContext({
      field: 'password',
      data: {
        password: 'MY PASSWORD',
      },
    });

    expect(confirmed().check(context)).toBeFalsy();
  });

  /** @test */
  it('should return true if value has the correct confirmation using camel-case', () => {
    const context = mockContext({
      field: 'password',
      data: {
        password: 'MY PASSWORD',
        passwordConfirmation: 'MY PASSWORD',
      },
    });

    expect(confirmed().check(context)).toBeTruthy();
  });

  /** @test */
  it('should return true if value has the correct confirmation using custom field', () => {
    const context = mockContext({
      field: 'password',
      data: {
        password: 'MY PASSWORD',
        myConfirmationField: 'MY PASSWORD',
      },
    });

    expect(confirmed('myConfirmationField').check(context)).toBeTruthy();
  });
});
