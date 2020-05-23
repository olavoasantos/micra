import { ValidationContext } from '@micra/validator';
import { required } from '../required';

export interface RequiredIfOptions {
  message?: string;
  field: string;
  value: any;
}

export const requiredIf = ({
  field,
  value,
  message = `validation.requiredIf`,
}: RequiredIfOptions) => ({
  check(context: ValidationContext) {
    if (context.data[field] === value) {
      return required().check(context);
    }

    return true;
  },
  message: () => message,
});
