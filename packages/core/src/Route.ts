export type RouteContext = Record<string, any>;

export type RouteMiddleware = (context: RouteContext) => Promise<void>;

export interface Route {
  path: string;
  middlewares: RouteMiddleware[];
  middleware(...middleware: RouteMiddleware[]): this;
  render(context: RouteContext): any;
}
