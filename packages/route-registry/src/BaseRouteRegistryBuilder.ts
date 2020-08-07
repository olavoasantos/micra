import { BaseRoute } from './BaseRoute';
import { BaseRouteBuilder } from './BaseRouteBuilder';
import { RouteRegistry, RouteRegistryBuilder, Route, Middleware } from './types';

export class BaseRouteRegistryBuilder<V extends string, H> implements RouteRegistryBuilder<V, H> {
  public routes: RouteRegistry<V, H>;

  constructor(routes: RouteRegistry<V, H>) {
    this.routes = routes;
  }

  public all(verb: V) {
    return this.routes.registry.get(verb) as Route<H>[];
  }

  public prefix(prefix: string) {
    this.routes.prefix = prefix;
    return this;
  }

  public middlewares(...middlewares: Middleware[]) {
    this.routes.middlewares = this.routes.middlewares.concat(middlewares);
    return this;
  }

  public find(path: string, verb: V) {
    return this.routes.registry
      .get(verb)
      ?.find((route) => route.path === path || route.name === path || route.test(path));
  }

  public register(verb: V, _path: string, route: BaseRoute<H>) {
    if (!this.routes.registry.has(verb)) {
      this.routes.registry.set(verb, [route]);
    } else {
      this.routes.registry.get(verb)?.push(route);
    }

    return new BaseRouteBuilder(route);
  }
}
