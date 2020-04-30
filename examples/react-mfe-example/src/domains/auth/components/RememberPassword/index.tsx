import React, { memo } from 'react';

export type RememberPasswordProps = {
  children: React.ReactChild;
}

export const RememberPassword = (_props: RememberPasswordProps) => (
  <div>RememberPassword component</div>
);

export default memo(RememberPassword);
