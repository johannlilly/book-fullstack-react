/* eslint-disable react/prefer-stateless-function,react/sort-comp,class-methods-use-this,max-len */
import React from 'react';
import Relay from 'react-relay/classic';
import {Link} from 'react-router';

import BookItem from './BookItem';

class BooksPage extends React.Component {
  render() {
    const books = this.props.viewer.books.edges.map(this.renderBook);

    return (
      <div className="sixteen wide column">
        <h1>JavaScript Books</h1>
        <div className="ui grid centered">{books}</div>
      </div>
    );
  }

  renderBook(bookEdge) {
    return (
      <Link
        to={`/books/${bookEdge.node.slug}`}
        key={bookEdge.node.slug}
        className="five wide column book"
      >
        <BookItem book={bookEdge.node} />
      </Link>
    );
  }
}

export default Relay.createContainer(BooksPage, {
  initialVariables: {
    count: 100
  },
  fragments: {
    viewer: () => Relay.QL`
    fragment on Viewer {
      books(first: $count) {
        count
        edges {
          node {
            slug
            ${BookItem.getFragment('book')}
          }
        }
      }
    }
    `
  }
});
