import { ValidationContext } from '@micra/validator';

export interface EmailOptions {
  message?: string;
}

export const email = ({ message = `validation.email` }: EmailOptions = {}) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return {
    check({ value }: ValidationContext) {
      return re.test(String(value).toLowerCase());
    },
    message: () => message,
  };
};
