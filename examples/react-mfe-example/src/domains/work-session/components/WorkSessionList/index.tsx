import React, { memo } from 'react';

export type WorkSessionListProps = {
  children: React.ReactChild;
}

export const WorkSessionList = (_props: WorkSessionListProps) => (
  <div>WorkSessionList component</div>
);

export default memo(WorkSessionList);
