import React, { memo, useState } from 'react';
import { Button } from '@material-ui/core';
import { useCounter } from 'domains/counter/data/hooks/useCounter';
import { useDispatch } from 'helpers/useDispatch';
import { useListener } from 'helpers/useListener';
import {
  DECREMENT_COUNTER,
  DECREMENTED_COUNTER,
  INCREMENT_COUNTER,
  INCREMENTED_COUNTER,
} from 'domains/counter/data/events/constants';

const HomePage = () => {
  const dispatch = useDispatch();
  const [count] = useCounter();
  const [clicked, setClicked] = useState({ inc: 0, dec: 0 });

  useListener(INCREMENTED_COUNTER, () => {
    setClicked({ ...clicked, inc: clicked.inc + 1 });
  });

  useListener(DECREMENTED_COUNTER, () => {
    setClicked({ ...clicked, dec: clicked.dec + 1 });
  });

  return (
    <>
      <h1>
        Home page - Count is
        {' '}
        {count}
      </h1>
      <Button onClick={() => dispatch(INCREMENT_COUNTER)}>
        increment
        {' '}
        {clicked.inc}
      </Button>
      <Button onClick={() => dispatch(DECREMENT_COUNTER)}>
        decrement
        {' '}
        {clicked.dec}
      </Button>
    </>
  );
};

export default memo(HomePage);
