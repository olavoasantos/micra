import { Languages } from 'app/translation/types';

export const changeLanguage = (
  to: Languages = config('translation.fallbackLng'),
) => {
  const router = use('router');
  const pathTo = use('pathTo');
  const history = use('history');
  const options = config('translation');
  const translation = use('translation');
  const route =
    router.find(history.location.pathname, 'page') ?? router.find('/', 'page');

  const params = route.match(history.location.pathname);
  const lng = to === options.fallbackLng ? undefined : to;

  translation.changeLanguage(to);
  history.push(route.toPath({ ...params, lng }));
};
