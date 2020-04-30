import React, { memo } from 'react';

export type MetaProps = {
  children: React.ReactChild;
}

export const Meta = (_props: MetaProps) => (
  <div>Meta component</div>
);

export default memo(Meta);
