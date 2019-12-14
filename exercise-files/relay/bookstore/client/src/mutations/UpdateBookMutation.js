import React from 'react';
import Relay from 'react-relay/classic';
import RelayMutationType from 'react-relay/lib/RelayMutationType';

export default class UpdateBookMutation extends Relay.Mutation {
  constructor(props) {
    super(props);
  }

  getMutation() {
    return Relay.QL`mutation { updateBook }`;
  }

  getVariables() {
    return {
      id: this.props.id,
      name: this.props.name,
      tagline: this.props.tagline,
      description: this.props.description
    };
  }

  static fragments = {
    book: () => Relay.QL`
      fragment on Book {
        id
        name
        tagline
        description
      }
    `
  };

  getFatQuery() {
    return Relay.QL`
      fragment on updateBookPayload {
        changedBook
      }
    `;
  }

  getConfigs() {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          changedBook: this.props.book.id
        }
      }
    ];
  }

  // Let's craft an optimistic response that mimics the shape of the
  // addBookPayload, as well as the values we expect to receive.
  getOptimisticResponse() {
    const {book, id, name, tagline, description} = this.props;

    const newBook = Object.assign({}, book, {id, name, tagline, description});

    const optimisticResponse = {
      changedBook: newBook
    };
    console.log('optimisticResponse', optimisticResponse);
    return optimisticResponse;
  }
}
