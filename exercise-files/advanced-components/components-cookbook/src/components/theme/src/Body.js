import React from 'react';

import {ThemeContext} from './theme';
import {UserContext} from './user';

export const Body = props => (
  <ThemeContext.Consumer>
    {theme => (
      <header
        className="App-header"
        style={{backgroundColor: theme.background}}
      >
        <UserContext.Consumer>
          <h1>{user => (user ? 'Welcome back' : 'Welcome')}</h1>
        </UserContext.Consumer>
      </header>
    )}
  </ThemeContext.Consumer>
);

export default Body;
