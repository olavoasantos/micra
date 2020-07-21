import React, { memo } from 'react';
import { Router } from 'react-router';
import { I18nextProvider } from 'react-i18next';

export interface ProvidersProps {
  children: React.ReactChild;
}

const Providers = ({ children }: ProvidersProps) => (
  <Router history={use('router/history')}>
    <I18nextProvider i18n={use('translation')}>{children}</I18nextProvider>
  </Router>
);

export default memo(Providers);
