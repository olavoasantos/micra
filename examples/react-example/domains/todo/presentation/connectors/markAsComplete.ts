import { Todo } from 'domains/todo/types';
import { TodoService } from 'domains/todo/data/types';
import { createAction } from 'helpers/createAction';

export const markAsComplete = createAction<Todo, Todo>(
  'mark-todo-as-complete',
  (todo) => use<TodoService>('TodoService').markAsComplete(todo as Todo),
);
