import React, { memo } from 'react';

export type SprintTemplateCardProps = {
  children: React.ReactChild;
}

export const SprintTemplateCard = (_props: SprintTemplateCardProps) => (
  <div>SprintTemplateCard component</div>
);

export default memo(SprintTemplateCard);
