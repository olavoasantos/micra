import React, { memo } from 'react';

export type MessageProps = {
  children: React.ReactChild;
}

export const Message = (_props: MessageProps) => (
  <div>Message component</div>
);

export default memo(Message);
