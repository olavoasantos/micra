import React, { memo } from 'react';
import IncompleteTodoUI from 'domains/todo/presentation/components/IncompleteTodo';
import { TodoProps } from 'domains/todo/presentation/types';
import { useIncompleteTodo } from 'domains/todo/presentation/connectors/useIncompleteTodo';

const IncompleteTodo = (data: TodoProps) => {
  const props = useIncompleteTodo(data);

  return <IncompleteTodoUI {...props} />;
};

export default memo(IncompleteTodo);
