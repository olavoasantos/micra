import { Language } from 'app/translation/types';

export const changeLanguage = (
  to: Language = config('translation.fallbackLng'),
) => {
  const router = use('router');
  const history = use('router/history');
  const options = config('translation');
  const translation = use('translation');
  const route =
    router.find(history.location.pathname) ?? router.find(config('router.fallbackRoute', '/'));

  const params = route.match(history.location.pathname);
  const lng = to === options.fallbackLng ? undefined : to;

  translation.changeLanguage(to);
  history.push(route.toPath({ ...params, lng }));
};
