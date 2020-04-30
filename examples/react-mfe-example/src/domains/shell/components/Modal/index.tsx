import React, { memo } from 'react';

export type ModalProps = {
  children: React.ReactChild;
}

export const Modal = (_props: ModalProps) => (
  <div>Modal component</div>
);

export default memo(Modal);
