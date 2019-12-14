import React, {Component} from 'react';
export default class Wrapper extends Component {
  componentDidCatch() {
    console.log('caught an error in wrapper', this.props);
  }
  render() {
    return <div>{this.props.children}</div>;
  }
}
