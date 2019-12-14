import PropTypes from 'prop-types';
import React from 'react';

class ArrayContainer extends React.Component {
  static propTypes = {
    component: PropTypes.element.isRequired,
    children: PropTypes.element.isRequired
  };

  render() {
    const arr = React.Children.toArray(this.props.children);

    return <div className="container">{arr.sort((a, b) => a.id < b.id)}</div>;
  }
}

export default ArrayContainer;
