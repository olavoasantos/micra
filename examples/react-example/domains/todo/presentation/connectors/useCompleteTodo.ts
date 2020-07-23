import { useCallback } from 'react';
import { queryCache } from 'react-query';
import { CompleteTodoProps, TodoProps } from 'domains/todo/presentation/types';
import { TodoService } from 'domains/todo/data/types';

export const useCompleteTodo = ({ todo }: TodoProps): CompleteTodoProps => {
  const onClick = useCallback(() => {
    use<TodoService>('TodoService')
      .markAsComplete(todo)
      .then(() => queryCache.invalidateQueries('todo-list'));
  }, []);

  return {
    onClick,
    todo,
  };
};
