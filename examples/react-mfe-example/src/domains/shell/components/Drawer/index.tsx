import React, { memo } from 'react';

export type DrawerProps = {
  children: React.ReactChild;
}

export const Drawer = (_props: DrawerProps) => (
  <div>Drawer component</div>
);

export default memo(Drawer);
