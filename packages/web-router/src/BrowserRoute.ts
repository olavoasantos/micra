import { Route, RouteMiddleware, RouteContext } from '@micra/core';

export class BrowserRoute<T = any> implements Route {
  path: string;
  exact: boolean;
  dependencies: string[];
  middlewares: RouteMiddleware[];
  loading: T;
  render: (
    context: RouteContext,
  ) => Promise<{
    default: T;
  }>;

  constructor({
    path,
    render,
    exact,
    dependencies,
    loading,
    middlewares,
  }: Record<string, any>) {
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
