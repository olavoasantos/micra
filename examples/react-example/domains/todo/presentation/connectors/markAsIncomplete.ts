import { Todo } from 'domains/todo/types';
import { TodoService } from 'domains/todo/data/types';
import { createAction } from 'helpers/createAction';

export const markAsIncomplete = createAction<Todo, Todo>(
  'mark-todo-as-incomplete',
  (todo) => use<TodoService>('TodoService').markAsIncomplete(todo as Todo),
);
