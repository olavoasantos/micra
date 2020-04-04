import { RouteContext } from '@micra/core';
import React, { lazy, Suspense } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { BrowserRoute } from './BrowserRoute';
import { BrowserRouter } from './BrowserRouter';

export const RouteRender = (route: BrowserRoute) => (props: RouteComponentProps) => {
  const context: RouteContext = { ...props, route };
  const Loading = route.loading ?? (() => null);
  const Component = lazy(async () => {
    for (const middleware of use<BrowserRouter>('Router').globalMiddlewares) {
      await middleware(context);
    }

    if (route.middlewares) {
      for (const middleware of route.middlewares) {
        await middleware(context);
      }
    }

    return route.render(context);
  });

  return (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  );
};
