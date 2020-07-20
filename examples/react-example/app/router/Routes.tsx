import React, { memo } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ReactRoute } from '@micra/react-route-registry';

export interface RoutesProps {
  routes: ReactRoute[];
}

const Routes = ({ routes }: RoutesProps) => (
  <Switch>
    {routes.map((route) => (
      <Route
        path={route.path}
        key={route.name + route.path}
        exact={route.options.exact}
        render={(props) => <route.handler {...props} route={route} />}
      />
    ))}
  </Switch>
);

export default memo(Routes);
