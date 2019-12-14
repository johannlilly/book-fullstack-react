import PropTypes from 'prop-types';
import React from 'react'

class Component extends React.Component {
  static propTypes = {
    user: PropTypes.object
  }

  render() {
    const { user } = this.props
    return (
      <div>
        <h1>{user.name}</h1>
        <h5>{user.profile}</h5>
      </div>
    )
  }
}

export default Component
