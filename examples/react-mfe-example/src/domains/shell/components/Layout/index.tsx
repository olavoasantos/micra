import React, { memo } from 'react';

export type LayoutProps = {
  children: React.ReactChild;
}

export const Layout = (_props: LayoutProps) => (
  <div>Layout component</div>
);

export default memo(Layout);
