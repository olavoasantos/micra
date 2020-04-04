import { Router, Route, RouteMiddleware } from '@micra/core';
import { BrowserRoute } from './BrowserRoute';
import { RouteDefinition } from './types';

export class BrowserRouter implements Router {
  protected list: Route[] = [];
  protected map: Map<string, Route> = new Map();
  public globalMiddlewares: RouteMiddleware[] = [];

  middlewares(...middlewares: RouteMiddleware[]) {
    this.globalMiddlewares.push(...middlewares);

    return this;
  }

  has(path: string) {
    return this.map.has(path);
  }

  find(path: string) {
    return this.map.get(path);
  }

  routes() {
    return this.list;
  }

  view(definition: RouteDefinition) {
    const route = new BrowserRoute(definition);

    this.list.push(route);
    this.map.set(route.path, route);

    return route;
  }
}
