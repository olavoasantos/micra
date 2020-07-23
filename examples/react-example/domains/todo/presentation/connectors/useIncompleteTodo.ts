import { useCallback } from 'react';
import { queryCache } from 'react-query';
import { TodoService } from 'domains/todo/data/types';
import {
  IncompleteTodoProps,
  TodoProps,
} from 'domains/todo/presentation/types';

export const useIncompleteTodo = ({ todo }: TodoProps): IncompleteTodoProps => {
  const onClick = useCallback(() => {
    use<TodoService>('TodoService')
      .markAsIncomplete(todo)
      .then(() => queryCache.invalidateQueries('todo-list'));
  }, []);

  return {
    onClick,
    todo,
  };
};
