import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { ReactRouteRegistry } from '@micra/react-route-registry';
import Routes from 'app/router/Routes';

const App = () => {
  const router = use<ReactRouteRegistry>('router');

  return (
    <div data-testid="app-container">
      <menu>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </menu>
      <Routes routes={router.all('page')} />
    </div>
  );
};

export default memo(App);
