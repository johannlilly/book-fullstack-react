import Relay from 'react-relay';
import React from 'react';
import IndexRoute from 'react-router/lib/IndexRoute';
import Route from 'react-router/lib/Route';

import App from './components/App';
import BooksPage from './components/BooksPage';
import BookPage from './components/BookPage';
import AuthorPage from './components/AuthorPage';

const ViewerQueries = {
  viewer: () => Relay.QL`query { viewer }`,
};

const BookQueries = {
  book: () => Relay.QL`
  query { 
    book(slug: $bookSlug)
  }`,
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
      path='/books/:bookSlug'
      component={BookPage}
      queries={BookQueries}
    />
    <Route
      path='/authors/:authorId'
      component={AuthorPage}
      queries={AuthorQueries}
    />
  </Route>
);
