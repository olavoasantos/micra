import React, { memo } from 'react';

export type MenuProps = {
  children: React.ReactChild;
}

export const Menu = (_props: MenuProps) => (
  <div>Menu component</div>
);

export default memo(Menu);
