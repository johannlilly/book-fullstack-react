import React from 'react';

class SimpleInput extends React.Component {
  render() {
    return (
      <div>
        <p>Please enter your secret password:</p>
        <input ref='myPassword' type='password' />
      </div>
    );
  }
}

export default SimpleInput;
