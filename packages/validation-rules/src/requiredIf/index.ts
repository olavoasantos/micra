import { ValidationContext } from '@micra/validator';
import {required} from '../required';

export const requiredIf = (field: string, value: any) => ({
  check(context: ValidationContext) {
    if (context.data[field] === value) {
      return required().check(context);
    }

    return true;
  },
  message: () => `validation.requiredIf`,
});
