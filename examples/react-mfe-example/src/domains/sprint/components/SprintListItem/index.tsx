import React, { memo } from 'react';

export type SprintListItemProps = {
  children: React.ReactChild;
}

export const SprintListItem = (_props: SprintListItemProps) => (
  <div>SprintListItem component</div>
);

export default memo(SprintListItem);
