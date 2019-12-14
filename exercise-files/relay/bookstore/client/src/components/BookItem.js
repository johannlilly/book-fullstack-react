/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import * as Relay from 'react-relay/classic';

import FancyBook from './FancyBook';

import '../styles/BookItem.css';

class BookItem extends React.Component {
  render() {
    return (
      <div className="bookItem">
        <FancyBook book={this.props.book} />

        <div className="bookMeta">
          <div className="authors">
            {this.props.book.authors.count}
            {this.props.book.authors.count > 1 ? ' Authors' : ' Author'}
          </div>
          <h2>{this.props.book.name}</h2>
          <div className="tagline">{this.props.book.tagline}</div>
          <div className="description">{this.props.book.description}</div>
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(BookItem, {
  fragments: {
    book: () => Relay.QL`
    fragment on Book {
      name
      slug
      tagline
      coverUrl
      pages
      description
      authors {
        count
      }
    }
    `
  }
});
