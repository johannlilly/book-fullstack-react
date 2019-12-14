import React, {PropTypes, Component} from 'react';
import {View, Text, ScrollView, Image, ListView, TextInput} from 'react-native';

import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: '#FFF',
    flex: 1,
    height: 32,
    marginTop: 6,
    marginHorizontal: 10,
    paddingLeft: 10,
    color: '#000',
    borderRadius: 8,
    borderColor: '#000',
    borderWidth: 0.4
  }
});

const tweets = [
  {
    name: 'Ari',
    text: 'I love the rain',
    avatar: 'https://placehold.it/250x150',
    numberOfRetweets: 0,
    numberOfFavorites: 0
  },
  {
    name: 'Ari',
    text: 'I love the rain',
    avatar: 'https://placehold.it/350x150',
    numberOfRetweets: 0,
    numberOfFavorites: 0
  }
];

const SearchBar = () => (
  <TextInput
    style={styles.searchBar}
    onChangeText={text => {}}
    placeholder={'Search tweets'}
  />
);

const ShowMoreTweets = () => (
  <View style={styles.container}>
    <Text>Show more tweets</Text>
  </View>
);

const renderSeparator = (sectionId, rowId) => {
  return (
    <View key={rowId} style={{borderColor: 'gray', borderTopWidth: 0.4}} />
  );
};

class SimpleStyles extends Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.tweets)
    };
  }

  getDerivedStateFromProps(nextProps) {
    if (nextProps.tweets !== this.props.tweets) {
      return {
        dataSource: this.ds.cloneWithRows(nextProps.tweets)
      };
    } else {
      return state;
    }
  }
  renderRow = tweet => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10
        }}
      >
        <View style={{flex: 1}}>
          <Image style={{flex: 1, height: 40}} source={{uri: tweet.avatar}} />
          <Text>{tweet.name}</Text>
        </View>
        <View style={{flex: 2, flexDirection: 'column', marginLeft: 20}}>
          <Text>{tweet.text}</Text>
          <Text>Favs: {tweet.numberOfFavorites}</Text>
          <Text>RTs: {tweet.numberOfRetweets}</Text>
        </View>
      </View>
    );
  };

  renderHeader = () => <SearchBar />;
  renderFooter = () => <ShowMoreTweets />;

  render() {
    return (
      <ListView
        renderRow={this.renderRow}
        dataSource={this.state.dataSource}
        renderSeparator={renderSeparator}
        renderHeader={this.renderHeader}
        renderFooter={this.renderFooter}
      />
    );
  }
}

SimpleStyles.defaultProps = {
  tweets
};

// For book content
export class Simple extends Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.tweets)
    };
  }

  getDerivedStateFromProps(nextProps) {
    if (nextProps.tweets !== this.props.tweets) {
      this.setState({
        dataSource: this.ds.cloneWithRows(nextProps.tweets)
      });
    }
  }
  renderRow = tweet => {
    return (
      <View>
        <View>
          <Image source={{uri: tweet.avatar}} />
          <Text>{tweet.name}</Text>
        </View>
        <View>
          <Text>{tweet.text}</Text>
          <Text>Favs: {tweet.numberOfFavorites}</Text>
          <Text>RTs: {tweet.numberOfRetweets}</Text>
        </View>
      </View>
    );
  };
  render() {
    return (
      <ListView renderRow={this.renderRow} dataSource={this.state.dataSource} />
    );
  }
}

export class SimpleWithSeparator extends Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.tweets)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tweets !== this.props.tweets) {
      this.setState({
        dataSource: this.ds.cloneWithRows(nextProps.tweets)
      });
    }
  }
  renderRow = tweet => {
    return (
      <View>
        <View>
          <Image source={{uri: tweet.avatar}} />
          <Text>{tweet.name}</Text>
        </View>
        <View>
          <Text>{tweet.text}</Text>
          <Text>Favs: {tweet.numberOfFavorites}</Text>
          <Text>RTs: {tweet.numberOfRetweets}</Text>
        </View>
      </View>
    );
  };

  renderSeparator = (sectionId, rowId) => {
    return <View key={rowId} style={styles.separator} />;
  };

  render() {
    return (
      <ListView
        renderRow={this.renderRow}
        dataSource={this.state.dataSource}
        renderSeparator={this.renderSeparator}
      />
    );
  }
}

// HEADER
export class SimpleWithHeader extends Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.tweets)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tweets !== this.props.tweets) {
      this.setState({
        dataSource: this.ds.cloneWithRows(nextProps.tweets)
      });
    }
  }
  renderRow = tweet => {
    return (
      <View>
        <View>
          <Image source={{uri: tweet.avatar}} />
          <Text>{tweet.name}</Text>
        </View>
        <View>
          <Text>{tweet.text}</Text>
          <Text>Favs: {tweet.numberOfFavorites}</Text>
          <Text>RTs: {tweet.numberOfRetweets}</Text>
        </View>
      </View>
    );
  };

  renderHeader = () => <SearchBar />;

  render() {
    return (
      <ListView
        renderRow={this.renderRow}
        dataSource={this.state.dataSource}
        renderHeader={this.renderHeader}
      />
    );
  }
}

// HEADER
export class SimpleWithFooter extends Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.tweets)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tweets !== this.props.tweets) {
      this.setState({
        dataSource: this.ds.cloneWithRows(nextProps.tweets)
      });
    }
  }
  renderRow = tweet => {
    return (
      <View>
        <View>
          <Image source={{uri: tweet.avatar}} />
          <Text>{tweet.name}</Text>
        </View>
        <View>
          <Text>{tweet.text}</Text>
          <Text>Favs: {tweet.numberOfFavorites}</Text>
          <Text>RTs: {tweet.numberOfRetweets}</Text>
        </View>
      </View>
    );
  };

  renderFooter = () => <ShowMoreTweets />;

  render() {
    return (
      <ListView
        renderRow={this.renderRow}
        dataSource={this.state.dataSource}
        renderFooter={this.renderFooter}
      />
    );
  }
}

export default SimpleStyles;
