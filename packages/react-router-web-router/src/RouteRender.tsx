import { RouteContext } from '@micra/core';
import { BrowserRoute } from '@micra/web-router';
import React, { lazy, Suspense } from 'react';
import { RouteComponentProps } from 'react-router-dom';

export const RouteRender = (route: BrowserRoute) => (props: RouteComponentProps) => {
  const context: RouteContext = { ...props, route };
  const Loading = route.loading ?? (() => null);
  const Component = lazy(async () => {
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
