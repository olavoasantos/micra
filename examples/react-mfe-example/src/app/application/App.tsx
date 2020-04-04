import React, { PureComponent, StrictMode } from 'react';
import { BrowserRouter, RouterView } from '@micra/react-router-web-router';
import { RouterProvider } from 'app/router/RouterProvider';

export class App extends PureComponent {
  render() {
    return (
      <StrictMode>
        <RouterProvider>
          <RouterView routes={use<BrowserRouter>('Router').routes()} />
        </RouterProvider>
      </StrictMode>
    );
  }
}
