import React, { memo } from 'react';
import TodoListUI from 'domains/todo/presentation/components/TodoList';
import TodoListError from 'domains/todo/presentation/components/TodoListError';
import TodoListLoading from 'domains/todo/presentation/components/TodoListLoading';
import { useTodoList } from 'domains/todo/presentation/hooks/useTodoList';

const TodoList = () => {
  const props = useTodoList();

  if (props.error) {
    return <TodoListError {...props} />;
  }

  if (props.loading) {
    return <TodoListLoading {...props} />;
  }

  return <TodoListUI {...props} />;
};

export default memo(TodoList);
