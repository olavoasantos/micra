import React, { memo } from 'react';

export type SprintTemplateProps = {
  children: React.ReactChild;
}

export const SprintTemplate = (_props: SprintTemplateProps) => (
  <div>SprintTemplate component</div>
);

export default memo(SprintTemplate);
