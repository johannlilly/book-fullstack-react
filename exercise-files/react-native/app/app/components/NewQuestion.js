import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  navContainer: {
    justifyContent: 'center'
  },
  navText: {
    fontSize: 15
  },
  inputContainer: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    margin: 10
  },
  input: {
    height: 40,
    borderColor: '#c5c5c5',
    borderWidth: 1,
    borderRadius: 5,
    padding: 3
  }
});

export default class NewQuestion extends Component {
  static navigationOptions = {
    title: 'New Question',
    leftHeader: (
      <TouchableOpacity
        onPress={() => this.onCancel(navigation)}
        style={[{marginLeft: 10}, styles.navContainer]}
      >
        <Text style={styles.navText}>Cancel</Text>
      </TouchableOpacity>
    ),
    rightHeader: () => {
      return !title || !firstOption || !secondOption ? (
        <View />
      ) : (
        <TouchableOpacity
          onPress={() =>
            this.onSubmit({title, firstOption, secondOption}, navigation)}
          style={[{marginRight: 10}, styles.navContainer]}
        >
          <Text style={styles.navText}>Submit</Text>
        </TouchableOpacity>
      );
    }
  };
  static propTypes = {
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func
  };
  state = {
    title: 'Bears',
    firstOption: 'Sleep with a bear',
    secondOption: 'Eat a bee'
  };

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  onSubmit = (question, navigation) => {
    const {handleSubmitQuestion} = this.props.screenProps;
    handleSubmitQuestion(question, navigation);
  };

  onCancel = navigation => navigation.goBack();

  render() {
    const {title, firstOption, secondOption} = this.state;
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        {/* <Navbar
          title="New Question"
          leftButton={() => (
            <TouchableOpacity
              onPress={() => this.onCancel(navigation)}
              style={[{marginLeft: 10}, styles.navContainer]}
            >
              <Text style={styles.navText}>Cancel</Text>
            </TouchableOpacity>
          )}
          rightButton={() => {
            return !title || !firstOption || !secondOption ? (
              <View />
            ) : (
              <TouchableOpacity
                onPress={() =>
                  this.onSubmit({title, firstOption, secondOption}, navigation)}
                style={[{marginRight: 10}, styles.navContainer]}
              >
                <Text style={styles.navText}>Submit</Text>
              </TouchableOpacity>
            );
          }}
        /> */}
        <View style={styles.inputContainer}>
          <Text>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={title => this.setState({title})}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>First Option</Text>
          <TextInput
            style={styles.input}
            value={firstOption}
            onChangeText={firstOption => this.setState({firstOption})}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Second Option</Text>
          <TextInput
            style={styles.input}
            value={secondOption}
            onChangeText={secondOption => this.setState({secondOption})}
          />
        </View>
      </View>
    );
  }
}
