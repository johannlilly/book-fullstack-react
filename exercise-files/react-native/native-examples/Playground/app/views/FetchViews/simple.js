import React, { Component } from 'react';
import {
  View, Text, StyleSheet, ListView,
  Image, WebView, Platform,
} from 'react-native';

import Button from 'react-native-button';

import { getGithubUsers, makeGist } from './api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  button: {
    backgroundColor: 'blue',
    color: 'white',
    padding: 10,
  },

  userList: {
    flexDirection: 'column',
  },

  userRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },

  userDetails: {
    marginLeft: 20,
  },

  userText: {
    fontSize: 25,
  },

  avatar: {
    height: 45,
    width: 45,
  },

  webView: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    height: 600,
  },
});

export class SimpleView extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.state = {
      users: [],
      dataSource: ds,
      offset: 0,
      notification: null,
    };
  }

  fetchUsers = () => {
    const { offset } = this.state;
    this.setState({
      notification: null,
    }, () => {
      getGithubUsers({ offset })
      .then(users => {
        const newUsers = this.state.users.concat(users);
        this.setState({
          users: newUsers,
          offset: newUsers[newUsers.length - 1].id,
          dataSource: this.state.dataSource.cloneWithRows(newUsers),
        });
      })
      .catch(console.warn);
    });
  }


  renderDoc = () => {
    makeGist({
      renderedAt: new Date(),
      os: Platform.OS,
    })
    .then(notification => {
      this.setState({ notification });
    });
  }

  renderRow = (rowData) => {
    return (
      <View
        key={rowData.id}
        style={styles.userRow}
      >
        <Image
          source={{ uri: rowData.avatar_url }}
          style={styles.avatar}
        />
        <View style={styles.userDetails}>
          <Text
            style={styles.userText}
          >{rowData.login}</Text>
        </View>
      </View>
    );
  }

  renderNotification = () => {
    const { html_url } = this.state.notification;

    return (
      <WebView
        startInLoadingState
        javaScriptEnabled
        automaticallyAdjustContentInsets={false}
        source={{ uri: html_url }}
        style={styles.webView}
        scalesPageToFit
      />
    );
  }

  render() {
    const { dataSource, notification } = this.state;

    return (
      <View style={styles.container}>
        { notification && this.renderNotification() }
        <Button
          onPress={this.fetchUsers}
          style={styles.button}
        > Fetch github users
        </Button>

        <Button
          onPress={this.renderDoc}
          style={styles.button}
        > Make gist </Button>

        <ListView
          dataSource={dataSource}
          renderRow={this.renderRow}
          contentContainerStyle={styles.userList}
          pageSize={10}
        />
      </View>
    );
  }
}

export default SimpleView;
