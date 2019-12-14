/* eslint-disable no-console */
/* eslint-disable no-shadow */

function reducer(state, action) {
  if (action.type === 'INCREMENT') {
    return state + action.amount;
  } else if (action.type === 'DECREMENT') {
    return state - action.amount;
  } else {
    return state;
  }
}

function createStore(reducer) {
  let state = 0;

  const getState = () => (state);

  const dispatch = (action) => {
    state = reducer(state, action);
  };

  return {
    getState,
    dispatch,
  };
}

const store = createStore(reducer);

const incrementAction = {
  type: 'INCREMENT',
  amount: 3,
};

store.dispatch(incrementAction);
console.log(store.getState()); // -> 3
store.dispatch(incrementAction);
console.log(store.getState()); // -> 6

const decrementAction = {
  type: 'DECREMENT',
  amount: 4,
};

store.dispatch(decrementAction);
console.log(store.getState()); // -> 2
