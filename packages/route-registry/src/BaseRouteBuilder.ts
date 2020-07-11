import { toTest, toMatch, toPathBuilder } from '@micra/path-match';
import { BaseRoute } from './BaseRoute';
import { createPath } from './helpers';
import { RouteBuilder } from './types';

export class BaseRouteBuilder<H> implements RouteBuilder<H> {
  public route: BaseRoute<H>;

  constructor(route: BaseRoute<H>) {
    this.route = route;
  }

  prefix(prefix: string) {
    this.route.prefix = prefix;
    this.generateUtils();
    return this;
  }

  middlewares(...middlewares: ((ctx: Record<string, any>) => void)[]) {
    this.route.middleware = this.route.middleware.concat(middlewares);
    return this;
  }

  as(name: string) {
    this.route.name = name;
    return this;
  }

  options(options: Record<string, any>) {
    this.route.options = Object.assign({}, this.route.options, options);
    return this;
  }

  generateUtils() {
    this.route.definition = createPath(this.route.path);
    this.route.test = toTest(this.route.definition);
    this.route.match = toMatch(this.route.definition);
    this.route.toPath = toPathBuilder(this.route.definition);
    return this;
  }
}
