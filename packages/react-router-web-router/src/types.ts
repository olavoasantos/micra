import React from 'react';
import { RouteContext } from '@micra/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ReactComponent = React.ComponentType<any>;

export type RouteHandler = (
  context: RouteContext,
) => Promise<{
  default: ReactComponent;
}>;

export type RouterMiddleware = (props: RouteContext) => Promise<void>;

export type RouteDefinition = {
  loading?: ReactComponent;
  path: string;
  exact?: boolean;
  render: RouteHandler;
  middlewares?: RouterMiddleware[];
  dependencies?: string[];
};
