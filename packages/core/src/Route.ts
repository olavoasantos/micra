export type RouteContext = Record<string, any>;

export type RouteMiddleware<T = any> = (context: T) => Promise<void>;

export interface Route {
  path: string;
  middlewares: RouteMiddleware[];
  middleware(...middleware: RouteMiddleware[]): this;
  render(context: RouteContext): any;
}
