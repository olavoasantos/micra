import React, { memo } from 'react';

export type SprintTemplateListProps = {
  children: React.ReactChild;
}

export const SprintTemplateList = (_props: SprintTemplateListProps) => (
  <div>SprintTemplateList component</div>
);

export default memo(SprintTemplateList);
