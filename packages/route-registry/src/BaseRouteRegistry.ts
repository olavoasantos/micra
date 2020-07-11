import { Middleware, Route } from './types';

export class BaseRouteRegistry<V extends string, H> {
  public registry: Map<V, Route<H>[]> = new Map();

  public prefix = '';

  public middlewares: Middleware[] = [];
}
