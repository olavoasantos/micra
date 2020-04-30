import React, { memo } from 'react';

export type SprintTemplateListItemProps = {
  children: React.ReactChild;
}

export const SprintTemplateListItem = (_props: SprintTemplateListItemProps) => (
  <div>SprintTemplateListItem component</div>
);

export default memo(SprintTemplateListItem);
