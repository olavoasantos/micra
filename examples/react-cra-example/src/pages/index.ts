import { router } from '@micra/react-route-registry';

router.page('/', () => import('./Home'));

router
  .page('/about', () => import('./About'))
  .options({ exact: false })
  .as('about')
  .middlewares(async (route) => {
    console.log('middleware of', route.name);
  });

export { router };
