import { useCallback } from 'react';
import { queryCache } from 'react-query';
import { TodoService } from 'domains/todo/data/types';
import { DeleteTodoProps, TodoProps } from 'domains/todo/presentation/types';

export const useDeleteTodo = ({ todo }: TodoProps): DeleteTodoProps => {
  const onClick = useCallback(() => {
    use<TodoService>('TodoService')
      .delete(todo)
      .then(() => queryCache.invalidateQueries('todo-list'));
  }, []);

  return {
    onClick,
    todo,
  };
};
