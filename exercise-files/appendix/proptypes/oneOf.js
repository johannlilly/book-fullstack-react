import PropTypes from 'prop-types';
import React from 'react'

class Component extends React.Component {
  static propTypes = {
    level: PropTypes.oneOf([
      'debug', 'info', 'warning', 'error'
    ])
  }

  render() {
    return (
      <div>
        <p>{this.props.level}</p>
      </div>
    )
  }
}

export default Component
