import React, { memo } from 'react';

export type TicketCardProps = {
  children: React.ReactChild;
}

export const TicketCard = (_props: TicketCardProps) => (
  <div>TicketCard component</div>
);

export default memo(TicketCard);
