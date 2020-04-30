import React, { memo } from 'react';

export type TicketListProps = {
  children: React.ReactChild;
}

export const TicketList = (_props: TicketListProps) => (
  <div>TicketList component</div>
);

export default memo(TicketList);
