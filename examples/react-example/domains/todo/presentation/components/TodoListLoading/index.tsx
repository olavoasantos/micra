import React, { memo } from 'react';
import { TodoListProps } from 'domains/todo/presentation/types';

const TodoListLoading = (_props: TodoListProps) => (
  <div>
    <h2>Loading...</h2>
  </div>
);

export default memo(TodoListLoading);
