import PropTypes from 'prop-types';
import React from 'react'

class Component extends React.Component {
  static propTypes = {
    name: PropTypes.string
  }

  render() {
    return (<div>{this.props.name}</div>)
  }
}

Component.propTypes = {
  name: PropTypes.string
}

export default Component
