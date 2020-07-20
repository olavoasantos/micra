import React, { memo } from 'react';

export interface HomeProps {
  //
}

const Home = (_props: HomeProps) => (
  <div data-testid="home-page">
    <h1>Home</h1>
  </div>
);

export default memo(Home);
