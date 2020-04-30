import React, { memo } from 'react';

export type TicketListItemProps = {
  children: React.ReactChild;
}

export const TicketListItem = (_props: TicketListItemProps) => (
  <div>TicketListItem component</div>
);

export default memo(TicketListItem);
