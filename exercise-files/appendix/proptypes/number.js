import PropTypes from 'prop-types';
import React from 'react'

class Component extends React.Component {
  static propTypes = {
    totalCount: PropTypes.number
  }

  render() {
    return (<div>{this.props.totalCount}</div>)
  }
}

export default Component
