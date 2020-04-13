import React, { PureComponent, StrictMode } from 'react';
import { BrowserRouter, RouterView } from '@micra/react-router-web-router';
import { RouterProvider } from 'app/router/RouterProvider';

export class App extends PureComponent {
  render() {
    const routes = use<BrowserRouter>('Router').routes();

    return (
      <StrictMode>
        <RouterProvider>
          <RouterView routes={routes} />
        </RouterProvider>
      </StrictMode>
    );
  }
}
