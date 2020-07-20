import React, { memo } from 'react';
import { BrowserRouter } from 'react-router-dom';

export interface ProvidersProps {
  children: React.ReactChild;
}

const Providers = ({ children }: ProvidersProps) => (
  <BrowserRouter>{children}</BrowserRouter>
);

export default memo(Providers);
