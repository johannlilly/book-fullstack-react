import PropTypes from 'prop-types';
import React from 'react'

class Component extends React.Component {
  static propTypes = {
    mustBePresent: PropTypes.any
  }

  render() {
    return (
      <div>
        Is here: {this.props.mustBePresent}
      </div>
    )
  }
}

export default Component
