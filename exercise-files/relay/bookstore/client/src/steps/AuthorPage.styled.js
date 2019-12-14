/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import Relay from 'react-relay';
import Link from 'react-router/lib/Link';

import '../styles/AuthorPage.css';

class AuthorPage extends React.Component {
  render() {
    const { author } = this.props;

    return (
      <div className='authorPage bookPage sixteen wide column'>
        <div className='spacer row' />

        <div className='ui divided items'>
          <div className='item'>
            <div className='ui'>
              <img src={author.avatarUrl}
                alt={author.name}
                className='ui medium rounded bordered image'
              />
            </div>
            <div className='content'>
              <div className='header authorName'>
                <h1>{ author.name }</h1>
                <div className='extra'>
                  <div className='ui label'>
                    { author.books.count }
                    { author.books.count > 1 ? ' Books' : ' Book' }
                  </div>
                </div>
              </div>
              <div className='description'>
                <p> { author.bio } </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Relay.createContainer(AuthorPage, {
  fragments: {
    author: () => Relay.QL`
    fragment on Author { 
      name
      avatarUrl
      bio
      books(first: 100) {
        count
      }
    }`,
  },
});

