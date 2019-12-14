import React from 'react';

export class Footer extends React.Component {
  render() {
    const {user} = this.props;
    return <footer>{user ? <UserFooter /> : <DefaultFooter />}</footer>;
  }
}

export default Footer;
