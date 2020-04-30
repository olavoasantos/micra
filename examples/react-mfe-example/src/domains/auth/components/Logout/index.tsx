import React, { memo } from 'react';

export type LogoutProps = {
  children: React.ReactChild;
}

export const Logout = (_props: LogoutProps) => (
  <div>Logout component</div>
);

export default memo(Logout);
