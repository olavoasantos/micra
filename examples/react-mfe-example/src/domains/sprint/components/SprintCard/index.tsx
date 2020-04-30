import React, { memo } from 'react';

export type SprintCardProps = {
  children: React.ReactChild;
}

export const SprintCard = (_props: SprintCardProps) => (
  <div>SprintCard component</div>
);

export default memo(SprintCard);
