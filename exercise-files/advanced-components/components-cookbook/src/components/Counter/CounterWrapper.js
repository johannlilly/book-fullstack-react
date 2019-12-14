import React from 'react';
import Counter from './Counter';

const CounterWrapper = props => (
  <div key="counterWrapper">
    <Counter initialValue={125} />
  </div>
);

export default CounterWrapper;
