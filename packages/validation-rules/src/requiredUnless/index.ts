import { ValidationContext } from '@micra/validator';
import { required } from '../required';

export interface RequiredUnlessOptions {
  message?: string;
  field: string;
  value: any;
}

export const requiredUnless = ({
  field,
  value,
  message = `validation.requiredUnless`,
}: RequiredUnlessOptions) => ({
  check(context: ValidationContext) {
    if (context.data[field] !== value) {
      return required().check(context);
    }

    return true;
  },
  message: () => message,
});
