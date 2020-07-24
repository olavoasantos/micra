import { validate, ValidationError } from '@micra/validator';
import { required, isString, setValue } from '@micra/validation-rules';
import { CompleteTodoInput, UpdateTodoDTO } from 'domains/todo/data/types';

export const completeTodoValidation = (
  input: CompleteTodoInput,
): [UpdateTodoDTO, ValidationError<UpdateTodoDTO>] =>
  validate<any>(input, {
    id: [required(), isString()],
    complete: setValue(true),
  });
