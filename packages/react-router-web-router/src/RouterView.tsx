import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { RouteRender } from './RouteRender';

export type RouterViewProps = {
  routes: any[];
};

export const RouterView = ({ routes }: RouterViewProps) => (
  <Switch>
    {routes.map((route) => (
      <Route
        path={route.path}
        exact={route.exact}
        render={RouteRender(route)}
        key={route.path}
      />
    ))}
  </Switch>
);
