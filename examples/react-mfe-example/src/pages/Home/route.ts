import { loadModules } from 'app/module-manager/middlewares/loadModules';

export const HomePageRoute = {
  path: '/',
  render: () => import('pages/Home'),
  middlewares: [loadModules],
  dependencies: ['@material-ui/core'],
};
