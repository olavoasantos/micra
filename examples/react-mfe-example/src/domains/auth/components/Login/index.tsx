import React, { memo } from 'react';

export type LoginProps = {
  children: React.ReactChild;
}

export const Login = (_props: LoginProps) => (
  <div>Login component</div>
);

export default memo(Login);
