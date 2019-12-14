import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

import { default as Switch1 } from './steps/Switch1';
import { default as Switch2 } from './steps/Switch2';
import { default as Switch3 } from './steps/Switch3';
import { default as Switch4 } from './steps/Switch4';
import { default as Switch5 } from './steps/Switch5';
import { default as Switch6 } from './steps/Switch6';

// import ActiveSpan from '../ActiveSpan/ActiveSpan';
// import styles from './Switch.css';

const CREDITCARD = 'Creditcard';
const BTC = 'Bitcoin';

class Switch extends React.Component {
  // getInitialState() {
  //   return {
  //     payMethod: BTC
  //   };
  // },

  // select: function(choice) {
  //   const that = this;
  //   return function(evt) {
  //     that.setState({
  //       payMethod: choice
  //     });
  //   };
  // },

  // _renderChoice: function(choice) {
  //   return (
  //     <ActiveSpan onClick={this.select(choice)}
  //                 active={this.state.payMethod === choice}
  //                 activeClass={styles.active}
  //                 className={styles.choice}
  //                 label={choice} />
  //   )
  // },

  // render: function() {
  //   return (
  //     <div className={styles.switch}>
  //       <div className={styles.diamond} />
  //       {this._renderChoice(CREDITCARD)}
  //       {this._renderChoice(BTC)}
  //     </div>
  //   )
  // }
  render() {
    const presentStep = (title, Step) => (
      <div>
        <h2>{title}</h2>
        <Step />
      </div>
    );

    return (
      <div>
        {presentStep('Switch1', Switch1)}
        {presentStep('Switch2', Switch2)}
        {presentStep('Switch3', Switch3)}
        {presentStep('Switch4', Switch4)}
        {presentStep('Switch5', Switch5)}
        {presentStep('Switch6', Switch6)}
      </div>
    );
  }
}

module.exports = Switch;
