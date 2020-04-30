import React, { memo } from 'react';

export type SprintProps = {
  children: React.ReactChild;
}

export const Sprint = (_props: SprintProps) => (
  <div>Sprint component</div>
);

export default memo(Sprint);
