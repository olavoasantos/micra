import React, { memo } from 'react';

export type ResetPasswordProps = {
  children: React.ReactChild;
}

export const ResetPassword = (_props: ResetPasswordProps) => (
  <div>ResetPassword component</div>
);

export default memo(ResetPassword);
