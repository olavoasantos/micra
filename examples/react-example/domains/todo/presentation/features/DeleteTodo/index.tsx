import React, { memo } from 'react';
import DeleteTodoUI from 'domains/todo/presentation/components/DeleteTodo';
import { TodoProps } from 'domains/todo/presentation/types';
import { useDeleteTodo } from 'domains/todo/presentation/connectors/useDeleteTodo';

const DeleteTodo = (data: TodoProps) => {
  const props = useDeleteTodo(data);

  return <DeleteTodoUI {...props} />;
};

export default memo(DeleteTodo);
