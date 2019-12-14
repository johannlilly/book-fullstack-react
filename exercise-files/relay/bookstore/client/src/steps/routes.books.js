import Relay from 'react-relay';
import React from 'react';
import IndexRoute from 'react-router/lib/IndexRoute';
import Route from 'react-router/lib/Route';

import App from './components/App';
import BooksPage from './components/BooksPage';
import AuthorPage from './components/AuthorPage';

const ViewerQueries = {
  viewer: () => Relay.QL`query { viewer }`,
};

const AuthorQueries = {
  author: () => Relay.QL`
  query { 
    author(id: $authorId)
  }`,
};

export default (
  <Route
    path='/'
    component={App}
  >
    <IndexRoute
      component={BooksPage}
      queries={ViewerQueries}
    />
    <Route
      path='/authors/:authorId'
      component={AuthorPage}
      queries={AuthorQueries}
    />
  </Route>
);
