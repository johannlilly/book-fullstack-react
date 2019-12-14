import PropTypes from 'prop-types';
import React from 'react';

Feed.propTypes = {
  tweets: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    user_id: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    numberOfFavorites: PropTypes.number.isRequired,
    numberOfRetweets: PropTypes.number.isRequired,
  })).isRequired,
};

function Feed ({ tweets }) {
  return (
    <div>
      {tweets.map((tweet) => (
        <div>
          <div>
            <img alt="tweet" src={tweet.avatar} />
            <span>{tweet.name}</span>
          </div>
          <p>{tweet.text}</p>
          <div>
            <div>Favs: {tweet.numberOfFavorites}</div>
            <div>RTs: {tweet.numberOfRetweets}</div>
          </div>
        </div>
      )
      )}
    </div>
  );
}
