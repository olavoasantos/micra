import { Todo } from 'domains/todo/types';
import { TodoService } from 'domains/todo/data/types';
import { createAction } from 'helpers/createAction';

export const fetchAllTodos = createAction<Todo[]>('fetch-all-todos', () =>
  use<TodoService>('TodoService').all(),
);
