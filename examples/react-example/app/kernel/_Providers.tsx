import React, { memo } from 'react';

export interface ProvidersProps {
  children: React.ReactChild;
}

const Providers = ({ children }: ProvidersProps) => (
  <>
    {children}
  </>
);

export default memo(Providers);
