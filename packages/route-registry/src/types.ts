import { PathObject } from '@micra/path-match';

export type Middleware = (ctx: Record<string, any>) => void | Promise<void>;

export interface Route<H> {
  definition: PathObject;
  middleware: Middleware[];
  middlewares: Middleware[];
  name: string;
  options: Record<string, any>;
  path: string;
  prefix: string;
  handler: H;
  match: <T = Record<string, any>>(path: string) => T;
  test: (path: string) => boolean;
  toPath: (params?: Record<string, any>, query?: Record<string, any>) => string;
}

export interface RouteBuilder<H> {
  route: Route<H>;
  as(name: string): this;
  generateUtils(): this;
  middlewares(middlewares: Middleware): this;
  options(options: Record<string, any>): this;
  prefix(prefix: string): this;
}

export interface RouteRegistry<V, H> {
  middlewares: Middleware[];
  prefix: string;
  registry: Map<V, Route<H>[]>;
}

export interface RouteRegistryBuilder<V, H> {
  routes: RouteRegistry<V, H>;
  all(verb: V): Route<H>[];
  prefix(prefix: string): this;
  middlewares(...middlewares: Middleware[]): this;
  find(path: string, verb: V): Route<H> | undefined;
  register(verb: V, path: string, definition: H | Route<H>): RouteBuilder<H>;
}
