import { ReactRouteRegistry } from '@micra/react-route-registry';
import { loadTranslations } from 'app/translation/middlewares/loadTranslations';

const router = use<ReactRouteRegistry>('router');

router.page('/', () => import('pages/Home'))
  .as('home')
  .middlewares(
    loadTranslations((language) => import(`pages/Home/translations/${language}`)),
  );

router.page('/about', () => import('pages/About'))
  .as('about')
  .middlewares(
    loadTranslations((language) => import(`pages/About/translations/${language}`)),
  );
