/* eslint-disable no-console */

function reducer(state, action) {
  if (action.type === 'INCREMENT') {
    return state + 1;
  } else if (action.type === 'DECREMENT') {
    return state - 1;
  } else {
    return state;
  }
}

const incrementAction = { type: 'INCREMENT' };

console.log(reducer(0, incrementAction)); // -> 1
console.log(reducer(1, incrementAction)); // -> 2
console.log(reducer(5, incrementAction)); // -> 6

const unknownAction = { type: 'UNKNOWN' };

console.log(reducer(5, unknownAction)); // -> 5
console.log(reducer(8, unknownAction)); // -> 8

const decrementAction = { type: 'DECREMENT' };

console.log(reducer(10, decrementAction)); // -> 9
console.log(reducer(9, decrementAction)); // -> 8
console.log(reducer(5, decrementAction)); // -> 4
