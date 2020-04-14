import { ValidationContext } from '@micra/validator';

export const alpha = (...ext: ('num' | 'dash' | 'space')[]) => ({
  check({ value }: ValidationContext) {
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

    return new RegExp(`^[${pattern}]+$`).test(value);
  },
  message: () => `validation.alpha`,
});
