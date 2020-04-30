import React, { memo } from 'react';

export type ProfileAvatarProps = {
  children: React.ReactChild;
}

export const ProfileAvatar = (_props: ProfileAvatarProps) => (
  <div>ProfileAvatar component</div>
);

export default memo(ProfileAvatar);
