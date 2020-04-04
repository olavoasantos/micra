import React from 'react';
import { History } from 'history';
import { Router } from 'react-router-dom';

export const RouterProvider = ({
  children,
}: {
  children: React.ReactChild;
}) => {
  const history = use<History>('app/router/history');
  return <Router history={history}>{children}</Router>;
};
