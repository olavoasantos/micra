import React, { memo } from 'react';

export type SprintListProps = {
  children: React.ReactChild;
}

export const SprintList = (_props: SprintListProps) => (
  <div>SprintList component</div>
);

export default memo(SprintList);
