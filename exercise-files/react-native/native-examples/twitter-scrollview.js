import React, { PropTypes } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';

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
    <ScrollView>
      {tweets.map((tweet) => (
        <View>
          <View>
            <Image src={tweet.avatar} />
            <Text>{tweet.name}</Text>
          </View>
          <Text>{tweet.text}</Text>
          <View>
            <Text>Favs: {tweet.numberOfFavorites}</Text>
            <Text>RTs: {tweet.numberOfRetweets}</Text>
          </View>
        </View>
      )
      )}
    </ScrollView>
  );
}
