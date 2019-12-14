import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ListView,
  StyleSheet
} from 'react-native';

const ToNewQuestion = NavigationActions.navigate({
  routeName: 'NewQuestion'
});

const ToQuestion = id =>
  NavigationActions.navigate({
    routeName: 'Question',
    params: {id}
  });

export default class Home extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'WouldYouRather',
      headerRight: (
        <TouchableOpacity
          onPress={() => navigation.dispatch(ToNewQuestion)}
          style={{justifyContent: 'center', marginRight: 10}}
        >
          <Text style={{fontSize: 35}}>+</Text>
        </TouchableOpacity>
      )
    };
  };
  static propTypes = {
    dataSource: PropTypes.object,
    usersVotes: PropTypes.object,
    toNewQuestion: PropTypes.func,
    toQuestion: PropTypes.func
  };
  renderRow = question => {
    const {navigation, screenProps} = this.props;
    const {toQuestion, usersVotes} = screenProps;
    const {navigate} = navigation;

    return (
      <TouchableOpacity onPress={() => navigate('Question', {id: question.id})}>
        <View
          style={[
            styles.row,
            {
              borderLeftColor:
                usersVotes[question.id] === true ? 'green' : 'red'
            }
          ]}
        >
          <Text>{question.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    const {dataSource} = this.props.screenProps;
    return (
      <View>
        <ScrollView>
          <ListView renderRow={this.renderRow} dataSource={dataSource} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    borderLeftWidth: 2,
    margin: 10,
    padding: 10
  }
});
