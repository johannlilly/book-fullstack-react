import PropTypes from 'prop-types';
import React from 'react'

class Component extends React.Component {
  static propTypes = {
    icon: PropTypes.node
  }

  render() {
    const { icon } = this.props
    return (
      <div>
        {icon}
      </div>
    )
  }
}

export default Component
