import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

export interface HomeProps {
  //
}

const Home = (_props: HomeProps) => {
  const { t } = useTranslation();
  return (
    <div data-testid="home-page">
      <h1>{t('routes.home.title')}</h1>
    </div>
  );
};

export default memo(Home);
