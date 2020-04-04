import { Route, RouteMiddleware, RouteContext } from '@micra/core';
import { RouteDefinition, ReactComponent } from './types';

export class BrowserRoute implements Route {
  path: string;
  exact: boolean;
  dependencies: string[];
  middlewares: RouteMiddleware[];
  loading: ReactComponent;
  render: (
    context: RouteContext,
  ) => Promise<{
    default: ReactComponent;
  }>;

  constructor({
    path,
    render,
    exact,
    dependencies,
    loading,
    middlewares,
  }: RouteDefinition) {
    this.path = path;
    this.render = render;
    this.exact = exact || false;
    this.loading = loading || (() => null);
    this.middlewares = middlewares || [];
    this.dependencies = dependencies || [];
  }

  middleware(...middlewares: RouteMiddleware[]) {
    this.middlewares.push(...middlewares);

    return this;
  }
}
