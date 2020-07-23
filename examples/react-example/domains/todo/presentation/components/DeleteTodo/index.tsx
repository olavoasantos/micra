import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { DeleteTodoProps } from 'domains/todo/presentation/types';

const DeleteTodo = ({ onClick }: DeleteTodoProps) => {
  const { t } = useTranslation();

  return (
    <button type="button" onClick={onClick}>
      {t('todos.actions.delete')}
    </button>
  );
};

export default memo(DeleteTodo);
