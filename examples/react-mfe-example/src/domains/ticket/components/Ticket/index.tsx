import React, { memo } from 'react';

export type TicketProps = {
  children: React.ReactChild;
}

export const Ticket = (_props: TicketProps) => (
  <div>Ticket component</div>
);

export default memo(Ticket);
