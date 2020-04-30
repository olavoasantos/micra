import React, { memo } from 'react';

export type WorkSessionListItemProps = {
  children: React.ReactChild;
}

export const WorkSessionListItem = (_props: WorkSessionListItemProps) => (
  <div>WorkSessionListItem component</div>
);

export default memo(WorkSessionListItem);
