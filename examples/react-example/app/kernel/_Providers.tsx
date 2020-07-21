import React, { memo } from 'react';
import RouterProvider from 'app/router/RouterProvider';
import TranslationProvider from 'app/translation/TranslationProvider';

export interface ProvidersProps {
  children: React.ReactChild;
}

const Providers = ({ children }: ProvidersProps) => (
  <RouterProvider>
    <TranslationProvider>{children}</TranslationProvider>
  </RouterProvider>
);

export default memo(Providers);
