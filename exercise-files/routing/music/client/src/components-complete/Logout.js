import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

import { client } from '../Client';

class Logout extends Component {

  constructor(props) {
    super(props);

    client.logout();
  }

  render() {
    return (
      <Redirect
        to='/login'
      />
    );
  }
}

export default Logout;
