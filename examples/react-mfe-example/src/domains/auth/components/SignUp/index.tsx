import React, { memo } from 'react';

export type SignUpProps = {
  children: React.ReactChild;
}

export const SignUp = (_props: SignUpProps) => (
  <div>SignUp component</div>
);

export default memo(SignUp);
