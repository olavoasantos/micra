import { Router, RouteMiddleware } from '@micra/core';
import { CLIRouteNamespaces, CLICommand } from './types';
import { CLIRoute } from './CLIRoute';

export class CLIRouter implements Router {
  public middlewares: RouteMiddleware<any>[] = [];
  protected routeDefinitions: Map<CLIRouteNamespaces, CLIRoute[]> = new Map([['command', []]]);

  public has(namespace: CLIRouteNamespaces | string, path?: string): boolean {
    if (path != null) {
      return (
        this.routeDefinitions.has(namespace as CLIRouteNamespaces) &&
        (this.routeDefinitions.get(namespace as CLIRouteNamespaces) as CLIRoute[]).some(
          (route) => route.path === path,
        )
      );
    }

    return (
      this.routeDefinitions.has('command') &&
      (this.routeDefinitions.get('command') as CLIRoute[]).some((route) => route.path === namespace)
    );
  }

  public routes(namespace?: CLIRouteNamespaces): CLIRoute[] {
    if (namespace != null) {
      if (!this.routeDefinitions.has(namespace)) {
        throw new Error(`Namespace "${namespace}" is not defined in routes`);
      }

      return this.routeDefinitions.get(namespace) ?? [];
    }

    return this.routeDefinitions.get('command') ?? [];
  }

  public find(namespace: CLIRouteNamespaces | string, path?: string): CLIRoute | undefined {
    if (path != null) {
      if (!this.routeDefinitions.has(namespace as CLIRouteNamespaces)) {
        throw new Error(`Namespace "${namespace}" is not defined in routes`);
      }
      return (this.routeDefinitions.get(namespace as CLIRouteNamespaces) as CLIRoute[]).find(
        (route) => route.path === path,
      );
    }

    return (this.routeDefinitions.get('command') as CLIRoute[]).find(
      (route) => route.path === namespace,
    );
  }

  public registerMiddlewares<T = any>(...middlewares: RouteMiddleware<T>[]) {
    this.middlewares = this.middlewares.concat(middlewares);

    return this;
  }

  protected registerRoute<T = any>(
    namespace: CLIRouteNamespaces,
    path: string,
    handlers: RouteMiddleware<T>[],
  ) {
    const handler = handlers.pop();
    const namespaceRoutes = this.routes(namespace);

    const route = new CLIRoute(path, handler as RouteMiddleware);
    if (handlers.length > 0) {
      route.middleware(...handlers);
    }

    namespaceRoutes.push(route);
    this.routeDefinitions.set(namespace, namespaceRoutes);

    return route;
  }

  public command<T = any>(path: string, ...handlers: RouteMiddleware<T>[]): CLIRoute {
    if (this.has('command', path)) {
      throw new Error(`Route "${path}" is already defined`);
    }

    return this.registerRoute('command', path, handlers);
  }

  public define(schema: CLICommand): CLIRoute {
    if (this.has('command', schema.command)) {
      throw new Error(`Route "${schema.command}" is already defined`);
    }

    const route = this.registerRoute('command', schema.command, [schema.handler]);

    if (schema.description) {
      route.description(schema.description);
    }

    if (schema.arguments) {
      route.argument(...schema.arguments);
    }

    if (schema.options) {
      route.option(...schema.options);
    }

    if (schema.middlewares) {
      route.middleware(...schema.middlewares);
    }

    return route;
  }
}
