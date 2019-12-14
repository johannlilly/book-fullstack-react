import React from 'react';
import logo from './logo.svg';

import {ThemeContext} from './theme';

export const Header = props => (
  <ThemeContext.Consumer>
    {theme => (
      <header
        className="App-header"
        style={{backgroundColor: theme.background}}
      >
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title" style={{color: theme.foreground}}>
          Welcome to React
        </h1>
      </header>
    )}
  </ThemeContext.Consumer>
);

export default Header;
