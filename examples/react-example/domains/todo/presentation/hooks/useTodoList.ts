import { TodoListProps } from 'domains/todo/presentation/types';
import { fetchAllTodos } from 'domains/todo/presentation/connectors/fetchAllTodos';

export const useTodoList = (): TodoListProps => {
  const { data, isLoading, error } = fetchAllTodos.run();

  return {
    error,
    loading: isLoading,
    todos: data ?? [],
  };
};
