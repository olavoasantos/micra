import { useQuery } from 'react-query';
import { TodoService } from 'domains/todo/data/types';
import { TodoListProps } from 'domains/todo/presentation/types';

export const useTodoList = (): TodoListProps => {
  const { data, isLoading, error } = useQuery('todo-list', () =>
    use<TodoService>('TodoService').all(),
  );

  return {
    error,
    loading: isLoading,
    todos: data ?? [],
  };
};
