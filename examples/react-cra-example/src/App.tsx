import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import Routes from './Routes';
import { router } from './pages';

const App = () => (
  <div id="App">
    <h1>App</h1>
    <menu>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </menu>
    <Routes routes={router.all('page')} />
  </div>
);

export default memo(App);
