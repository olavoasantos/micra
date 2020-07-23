import { CompleteTodoInput, UpdateTodoDTO } from 'domains/todo/data/types';

export const completeTodoDTO = (input: CompleteTodoInput): UpdateTodoDTO => ({
  id: input.id,
  complete: true,
});
