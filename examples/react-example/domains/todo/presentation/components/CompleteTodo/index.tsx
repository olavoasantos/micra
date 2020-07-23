import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { CompleteTodoProps } from 'domains/todo/presentation/types';

const CompleteTodo = ({ onClick }: CompleteTodoProps) => {
  const { t } = useTranslation();

  return (
    <button type="button" onClick={onClick}>
      {t('todos.actions.complete')}
    </button>
  );
};

export default memo(CompleteTodo);
