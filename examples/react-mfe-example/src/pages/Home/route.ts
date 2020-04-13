import { RouteDefinition } from '@micra/react-router-web-router';

export const HomePageRoute: RouteDefinition = {
  path: '/',
  render: () => import('pages/Home'),
  dependencies: ['@material-ui/core'],
};
