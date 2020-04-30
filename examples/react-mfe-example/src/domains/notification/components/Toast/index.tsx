import React, { memo } from 'react';

export type ToastProps = {
  children: React.ReactChild;
}

export const Toast = (_props: ToastProps) => (
  <div>Toast component</div>
);

export default memo(Toast);
