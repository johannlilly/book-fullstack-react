import PropTypes from 'prop-types';
import React, {Component} from 'react';

const counterStyle = {
  width: '50px',
  textAlign: 'center',
  backgroundColor: 'aliceblue',
  padding: '10px'
};

class Counter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.initialValue
    };
  }

  decrement = () => {
    // Appears correct, but there is a better way
    const nextValue = this.state.value - 1;
    this.setState({
      value: nextValue
    });
  };

  increment = () => {
    const nextValue = this.state.value + 1;
    this.setState({
      value: nextValue
    });
  };

  render() {
    return (
      <div style={counterStyle} key="Counter1">
        {this.state.value}
        <p>
          <button onClick={this.increment}>+</button>
          <button onClick={this.decrement}>-</button>
        </p>
      </div>
    );
  }
}

export default Counter;
