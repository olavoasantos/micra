import React, { memo } from 'react';
import { Button } from '@material-ui/core';

const HomePage = () => (
  <div>
    <h1>Home page</h1>
    <Button>My button</Button>
  </div>
);

export default memo(HomePage);
