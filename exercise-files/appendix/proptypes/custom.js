import React from 'react'

class User {
  constructor(name) {
    this.name = name
  }
  isValid() {
    // must have a name
    return !!this.name && new Error('Name must be present')
  }
}

class Component extends React.Component {
  static propTypes = {
    user: function(props, propName, componentName) {
      const user = props[propName];
      if (!user.isValid()) {
        return new Error('Invalid user');
      }
    }
  }

  render() {
    const { user } = this.props
    return (
      <div>
        {user.name}
      </div>
    )
  }
}

export default Component
