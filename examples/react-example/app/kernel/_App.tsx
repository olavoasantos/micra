import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { ReactRouteRegistry } from '@micra/react-route-registry';
import Routes from 'app/router/components/Routes';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from 'app/translation/helpers/changeLanguage';
import { Language } from 'app/translation/types';

const App = () => {
  const pathTo = use('pathTo');
  const { t, i18n } = useTranslation();
  const router = use<ReactRouteRegistry>('router');

  return (
    <div data-testid="app-container">
      <menu style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <Link to={pathTo('home', { lng: i18n.language })}>
            {t('pages.home.title')}
          </Link>
          <Link to={pathTo('about', { lng: i18n.language })}>
            {t('pages.about.title')}
          </Link>
        </div>
        <div>
          <select
            value={i18n.language}
            onChange={({ target: { value } }) =>
              changeLanguage(value as Language)
            }
          >
            {config('translation.languages').map((language: string) => (
              <option key={language} value={language}>
                {t(`languages.${language}.name`)}
              </option>
            ))}
          </select>
        </div>
      </menu>
      <Routes routes={router.all()} />
    </div>
  );
};

export default memo(App);
