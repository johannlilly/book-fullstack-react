import React from 'react';

import { Link } from 'react-router-dom';

import { client } from '../Client';

const TopBar = () => (
  <div
    className='ui huge top attached fluid secondary menu'
  >
    <div className='item' />
    <div className='item'>
      <h1
        className='ui green header'
        style={{ marginTop: '10px' }}
      >
        Fullstack Music
      </h1>
    </div>
    <div className='right menu'>
      {
        client.isLoggedIn() ? (
          <Link className='ui item' to='/logout'>
            Logout
          </Link>
        ) : (
          <Link className='ui item' to='/login'>
            Login
          </Link>
        )
      }
    </div>
  </div>
);

export default TopBar;
