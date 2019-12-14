/* eslint-disable no-underscore-dangle, react/sort-comp */
import React from 'react';
import Relay from 'react-relay/classic';
import Link from 'react-router/lib/Link';
import {RIEInput, RIETextArea} from 'riek';

import BookItem from './BookItem';
import FancyBook from './FancyBook';
import UpdateBookMutation from '../mutations/UpdateBookMutation';

import '../styles/BookPage.css';

class BookPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleBookChange = this.handleBookChange.bind(this);
  }

  renderAuthor(authorEdge) {
    return (
      <Link
        key={authorEdge.node._id}
        to={`/authors/${authorEdge.node._id}`}
        className="column"
      >
        <div className="ui fluid card">
          <div className="image">
            <img src={authorEdge.node.avatarUrl} alt={authorEdge.node.name} />
          </div>
          <div className="content">
            <div className="header">{authorEdge.node.name}</div>
          </div>
        </div>
      </Link>
    );
  }

  handleBookChange(newState) {
    console.log('bookChanged', newState, this.props.book);
    const book = Object.assign({}, this.props.book, newState);
    Relay.Store.commitUpdate(
      new UpdateBookMutation({
        id: book.id,
        name: book.name,
        tagline: book.tagline,
        description: book.description,
        book: this.props.book
      })
    );
  }

  render() {
    const {book} = this.props;
    const authors = book.authors.edges.map(this.renderAuthor);
    return (
      <div className="bookPage sixteen wide column">
        <div className="spacer row" />

        <div className="ui grid row">
          <div className="six wide column">
            <FancyBook book={book} />
          </div>

          <div className="ten wide column">
            <div className="content ui form">
              <h2>
                <RIEInput
                  value={book.name}
                  propName={'name'}
                  change={this.handleBookChange}
                />
              </h2>

              <div className="tagline hr">
                <RIEInput
                  value={book.tagline}
                  propName={'tagline'}
                  change={this.handleBookChange}
                />
              </div>

              <div className="description">
                <p>
                  <RIETextArea
                    value={book.description}
                    propName={'description'}
                    change={this.handleBookChange}
                  />
                </p>
              </div>
            </div>

            <div className="ten wide column authorsSection">
              <h2 className="hr">Authors</h2>
              <div className="ui three column grid link cards">{authors}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(BookPage, {
  fragments: {
    book: () => Relay.QL`
    fragment on Book {
      id
      name
      tagline
      coverUrl
      description
      pages
      authors(first: 100) {
        edges {
          node {
            _id
            name
            avatarUrl
            bio
          }
        }
      }
      ${UpdateBookMutation.getFragment('book')}
    }`
  }
});
