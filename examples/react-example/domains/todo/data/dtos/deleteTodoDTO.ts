import { CompleteTodoInput, UpdateTodoDTO } from 'domains/todo/data/types';

export const deleteTodoDTO = (input: CompleteTodoInput): UpdateTodoDTO => ({
  id: input.id,
});
