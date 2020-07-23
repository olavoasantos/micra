import { validate, ValidationError } from '@micra/validator';
import { required, isString } from '@micra/validation-rules';
import { CompleteTodoInput } from 'domains/todo/data/types';

export const completeTodoValidation = (
  input: CompleteTodoInput,
): [CompleteTodoInput, ValidationError<CompleteTodoInput>] =>
  validate<any>(input, {
    id: [required(), isString()],
  });
