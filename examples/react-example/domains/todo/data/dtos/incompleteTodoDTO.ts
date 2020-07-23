import { CompleteTodoInput, UpdateTodoDTO } from 'domains/todo/data/types';

export const incompleteTodoDTO = (input: CompleteTodoInput): UpdateTodoDTO => ({
  id: input.id,
  complete: false,
});
