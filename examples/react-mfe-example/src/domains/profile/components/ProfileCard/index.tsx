import React, { memo } from 'react';

export type ProfileCardProps = {
  children: React.ReactChild;
}

export const ProfileCard = (_props: ProfileCardProps) => (
  <div>ProfileCard component</div>
);

export default memo(ProfileCard);
