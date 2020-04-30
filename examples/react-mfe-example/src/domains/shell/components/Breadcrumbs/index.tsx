import React, { memo } from 'react';

export type BreadcrumbsProps = {
  children: React.ReactChild;
}

export const Breadcrumbs = (_props: BreadcrumbsProps) => (
  <div>Breadcrumbs component</div>
);

export default memo(Breadcrumbs);
