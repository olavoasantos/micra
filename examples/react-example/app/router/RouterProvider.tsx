import React, { memo } from 'react';
import { Router } from 'react-router';

export interface RouterProviderProps {
  children?: React.ReactChild;
}

const RouterProvider = ({ children }: RouterProviderProps) => (
  <Router history={use('router/history')}>{children}</Router>
);

export default memo(RouterProvider);
