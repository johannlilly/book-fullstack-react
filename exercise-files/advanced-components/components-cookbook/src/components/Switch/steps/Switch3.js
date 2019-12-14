import React, { PropTypes } from 'react';

const CREDITCARD = 'Creditcard';
const BTC = 'Bitcoin';

class Switch extends React.Component {
  state = {
    payMethod: BTC,
  };

  select = (choice) => {
    return (evt) => {
      // <-- handler starts here
      this.setState({
        payMethod: choice,
      });
    };
  };

  render() {
    return (
      <div className='switch'>
        <div
          className='choice'
          onClick={this.select(CREDITCARD)} // add this
        >Creditcard</div>
        <div
          className='choice'
          onClick={this.select(BTC)} // ... and this
        >Bitcoin</div>
        Pay with: {this.state.payMethod}
      </div>
    );
  }
}

module.exports = Switch;
