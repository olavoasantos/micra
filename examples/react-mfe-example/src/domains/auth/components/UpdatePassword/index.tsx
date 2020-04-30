import React, { memo } from 'react';

export type UpdatePasswordProps = {
  children: React.ReactChild;
}

export const UpdatePassword = (_props: UpdatePasswordProps) => (
  <div>UpdatePassword component</div>
);

export default memo(UpdatePassword);
