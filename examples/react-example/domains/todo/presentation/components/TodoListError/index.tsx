import React, { memo } from 'react';
import { TodoListProps } from 'domains/todo/presentation/types';

const TodoListError = ({ error }: TodoListProps) => (
  <div>
    <h2>Something went wrong...</h2>
    {error?.message}
  </div>
);

export default memo(TodoListError);
