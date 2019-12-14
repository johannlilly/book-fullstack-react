import React from 'react';

import { Route, Redirect, Switch } from 'react-router-dom';

import TopBar from './TopBar';
import PrivateRoute from './PrivateRoute';
import AlbumsContainer from './AlbumsContainer';
import Login from './Login';
import Logout from './Logout';

import '../styles/App.css';

const NoMatch = ({ location }) => (
  <div className='ui inverted red raised very padded text container segment'>
    <strong>Error!</strong> No route found matching:
    <div className='ui inverted black segment'>
      <code>{location.pathname}</code>
    </div>
  </div>
);

const App = () => (
  <div className='ui grid'>
    <TopBar />
    <div className='spacer row' />
    <div className='row'>
      <Switch>
        <PrivateRoute path='/albums' component={AlbumsContainer} />
        <Route path='/login' component={Login} />
        <Route path='/logout' component={Logout} />

        <Route exact path='/' render={() => (
          <Redirect
            to='/albums'
          />
        )} />

        <Route component={NoMatch} />
      </Switch>
    </div>
  </div>
);

export default App;
