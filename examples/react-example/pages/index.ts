import { ReactRouteRegistry } from '@micra/react-route-registry';

const router = use<ReactRouteRegistry>('router');

router.page('/', () => import('pages/Home')).as('home');
router.page('/about', () => import('pages/About')).as('about');
