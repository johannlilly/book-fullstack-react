import PropTypes from 'prop-types';
import React from 'react'

class Component extends React.Component {
  static propTypes = {
    listComponent: PropTypes.element,
    list: PropTypes.array
  }

  renderListItem = item => {
    const Comp = this.props.listComponent || 'li'
    return React.createElement(
      Comp, 
      {...this.props, key: item.id}, 
      item)
  }

  render() {
    const { list } = this.props
    return (
      <ul>
        {list.map(this.renderListItem)}
      </ul>
    )
  }
}

const Item = function(props) {
  return (
    <div>{props.children}</div>
  )
}


export default Component
