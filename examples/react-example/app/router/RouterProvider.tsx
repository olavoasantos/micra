import React, { memo } from 'react';
import { Router } from 'react-router';

export interface RouterProviderProps {
  children?: React.ReactChild;
}

const RouterProvider = ({ children }: RouterProviderProps) => (
  <Router history={use('history')}>{children}</Router>
);

export default memo(RouterProvider);
