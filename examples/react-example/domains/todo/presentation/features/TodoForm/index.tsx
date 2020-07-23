import React, { memo } from 'react';
import TodoFormUI from 'domains/todo/presentation/components/TodoForm';
import TodoFormError from 'domains/todo/presentation/components/TodoFormError';
import TodoFormLoading from 'domains/todo/presentation/components/TodoFormLoading';
import { useTodoForm } from 'domains/todo/presentation/connectors/useTodoForm';

const TodoForm = () => {
  const props = useTodoForm();

  if (props.error) {
    return <TodoFormError {...props} />;
  }

  if (props.loading) {
    return <TodoFormLoading {...props} />;
  }

  return <TodoFormUI {...props} />;
};

export default memo(TodoForm);
