import PropTypes from 'prop-types';
import React from 'react'

class Component extends React.Component {
  static propTypes = {
    // Optional props:
    onStart: PropTypes.func,
    // Required props:
    onComplete: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
  }

  startTimer = (seconds=5) => {
    const { onStart, onComplete } = this.props
    onStart()
    setTimeout(() => onComplete(), seconds)
  }

  render() {
    const { name } = this.props
    return (
      <div onClick={this.startTimer}>
        {name}
      </div>
    )
  }
}

export default Component
