import React, { memo } from 'react';

export type UpdateProfileProps = {
  children: React.ReactChild;
}

export const UpdateProfile = (_props: UpdateProfileProps) => (
  <div>UpdateProfile component</div>
);

export default memo(UpdateProfile);
