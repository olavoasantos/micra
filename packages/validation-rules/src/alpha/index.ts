import { ValidationContext } from '@micra/validator';

export interface AlphaOptions {
  message?: string;
  ext?: ('alpha' | 'num' | 'dash' | 'space')[];
}

export const alpha = ({ ext = [], message = `validation.alpha` }: AlphaOptions = {}) => {
  const pattern = ext.reduce((rgx: string, extension) => {
    if (extension === 'num') {
      return rgx + '0-9';
    }

    if (extension === 'dash') {
      return rgx + '_\\-';
    }

    if (extension === 'space') {
      return rgx + '\\s';
    }

    return rgx;
  }, 'a-zA-Z');

  return {
    check({ value }: ValidationContext) {
      return new RegExp(`^[${pattern}]+$`).test(value);
    },
    message: () => message,
  };
};
