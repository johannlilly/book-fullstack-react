import PropTypes from 'prop-types';
import React from 'react'

class User {
  constructor(name) {
    this.name = name
  }
}

class Component extends React.Component {
  static propTypes = {
    user: PropTypes.instanceOf(User)
  }

  render() {
    const { user } = this.props

    return (
      <div>
        <h3>{user.name}</h3>
      </div>
    )
  }
}

export default Component
