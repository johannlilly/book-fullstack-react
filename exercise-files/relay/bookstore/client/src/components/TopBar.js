import React from 'react';
import {Link} from 'react-router';

import '../styles/TopBar.css';

const TopBar = () => (
  <div className="ui top attached fluid secondary mini menu">
    <div className="item" />
    <div className="item">
      <Link to="/">
        <h3 className="ui green header" style={{marginTop: '10px'}}>
          Bookstore Demo
        </h3>
      </Link>
    </div>
    <div className="right menu" />
  </div>
);

export default TopBar;
