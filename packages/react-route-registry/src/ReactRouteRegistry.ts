import React from 'react';
import loadable from '@loadable/component';
import { BaseRoute, BaseRouteRegistryBuilder, Route } from '@micra/route-registry';

export class ReactRouteRegistry<T extends string = string> extends BaseRouteRegistryBuilder<
  'page' | T,
  React.ComponentType<any>
> {
  all(verb: 'page' | T = 'page') {
    return super.all(verb);
  }

  find(path: string, verb: 'page' | T = 'page') {
    return super.find(path, verb);
  }

  page(
    path: string,
    handler:
      | (() => Promise<{ default: React.ComponentType<any> }>)
      | Route<React.ComponentType<any>>,
  ) {
    let route: BaseRoute<React.ComponentType<any>>;
    if (typeof handler === 'function') {
      route = new BaseRoute<React.ComponentType<any>>(
        this.routes,
        path,
        loadable<React.ComponentType<any>>(async () => {
          for (const middleware of route.middleware) {
            await middleware(route);
          }

          return await handler();
        }),
      );

      route.options = { exact: true };
    } else {
      route = new BaseRoute<React.ComponentType<any>>(this.routes, path, handler.handler);
    }

    return this.register('page', path, route);
  }
}
