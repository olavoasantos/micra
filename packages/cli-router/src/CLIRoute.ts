import { Route, RouteMiddleware, CLIArgumentSchema, CLIOptionSchema } from '@micra/core';

export class CLIRoute implements Route {
  public path: string;
  public routeDescription?: string;
  public handler: RouteMiddleware<any>;
  public middlewares: RouteMiddleware<any>[];
  public options: CLIOptionSchema[] = [];
  public arguments: CLIArgumentSchema[] = [];

  constructor(path: string, ...handlers: RouteMiddleware<any>[]) {
    this.path = path;
    this.handler = handlers.pop() as RouteMiddleware<any>;
    this.middlewares = handlers.slice();
  }

  middleware<T = any>(...middleware: RouteMiddleware<T>[]): this {
    this.middlewares = this.middlewares.concat(middleware);

    return this;
  }

  argument(...args: CLIArgumentSchema[]): this {
    this.arguments = this.arguments.concat(args);

    return this;
  }

  option(...options: CLIOptionSchema[]): this {
    this.options = this.options.concat(options);

    return this;
  }

  description(description: string): this {
    this.routeDescription = description;

    return this;
  }

  async render(context: Record<string, any>) {
    for (const middleware of this.middlewares) {
      await middleware(context);
    }

    return await this.handler(context);
  }
}
