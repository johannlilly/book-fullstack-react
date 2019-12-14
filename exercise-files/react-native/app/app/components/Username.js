import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

export default class Username extends Component {
  static navigationOptions = {
    title: 'What is your username'
  };
  static propTypes = {
    onSubmitUsername: PropTypes.func.isRequired
  };
  state = {
    username: ''
  };
  render() {
    return (
      <View>
        {/* <Navbar title="Username" /> */}
        <Text style={styles.header}>What is your username</Text>
        <TextInput
          maxLength={30}
          style={styles.input}
          onChangeText={username => this.setState({username})}
          value={this.state.username}
        />
        {this.state.username.length > 0 ? (
          <TouchableOpacity
            onPress={() => this.props.onSubmitUsername(this.state.username)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20
  },
  input: {
    height: 40,
    borderColor: '#d8d8d8',
    borderWidth: 1,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
    padding: 5
  },
  button: {
    padding: 15,
    backgroundColor: '#4a90e2',
    width: 150,
    alignSelf: 'center',
    borderRadius: 5
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff'
  }
});
