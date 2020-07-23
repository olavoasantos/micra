import React, { memo } from 'react';
import CompleteTodoUI from 'domains/todo/presentation/components/CompleteTodo';
import { TodoProps } from 'domains/todo/presentation/types';
import { useCompleteTodo } from 'domains/todo/presentation/connectors/useCompleteTodo';

const CompleteTodo = (data: TodoProps) => {
  const props = useCompleteTodo(data);

  return <CompleteTodoUI {...props} />;
};

export default memo(CompleteTodo);
