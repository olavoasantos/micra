import React, { memo } from 'react';

export interface AboutProps {
  //
}

const About = (_props: AboutProps) => (
  <div data-testid="about-page">
    <h1>About</h1>
  </div>
);

export default memo(About);
