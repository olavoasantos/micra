import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { IncompleteTodoProps } from 'domains/todo/presentation/types';

const IncompleteTodo = ({ onClick }: IncompleteTodoProps) => {
  const { t } = useTranslation();

  return (
    <button type="button" onClick={onClick}>
      {t('todos.actions.incomplete')}
    </button>
  );
};

export default memo(IncompleteTodo);
