import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Navigator,
  Platform,
  ListView
} from 'react-native';
import {NavigationActions, StackNavigator} from 'react-navigation';

const AppNavigator = StackNavigator(
  {
    Home: {
      screen: Home
    },
    Username: {
      path: 'username',
      screen: Username
    },
    NewQuestion: {
      screen: NewQuestion
    },
    Question: {
      screen: Question
    }
  },
  {
    initialRouteName: 'Home'
  }
);

import Username from './components/Username';
import Home from './components/Home';
import NewQuestion from './components/NewQuestion';
import Question from './components/Question';
import {
  getUsername,
  login,
  getQuestions,
  saveQuestions,
  getUsersVotes,
  setUsersVotes,
  createFakeRandomishNumber
} from './api';

function Loading() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator />
    </View>
  );
}

const ToNewQuestion = NavigationActions.navigate({
  routeName: 'NewQuestion',
  params: {}
});

const toHome = NavigationActions.navigate({
  routeName: 'Home'
});

export class WouldYouRather extends React.Component {
  static navigationOptions = {
    title: 'WouldYouRather'
  };
  constructor(props) {
    super(props);
    this.questions = [];
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this.ds.cloneWithRows([]),
      loading: true,
      usersVotes: {},
      username: ''
    };

    this.handleSubmitQuestion = this.handleSubmitQuestion.bind(this);
    this.handleVote = this.handleVote.bind(this);
  }
  componentDidMount() {
    let username = '';
    getUsername()
      .then(name => {
        username = name;
        return name;
      })
      .then(() => Promise.all([getUsersVotes(username), getQuestions()]))
      .then(([usersVotes, questions]) => {
        this.questions = questions;
        this.setState({
          username,
          dataSource: this.ds.cloneWithRows(questions),
          usersVotes,
          loading: false
        });
      });
  }
  handleSubmitUsername = username => {
    login(username);
    this.setState({username});
  };
  handleSubmitQuestion = (question, navigation) => {
    this.questions = this.questions.concat([
      {
        title: question.title,
        author: this.state.username,
        timestamp: Date.now(),
        firstOption: {
          votes: 0,
          option: question.firstOption
        },
        secondOption: {
          votes: 0,
          option: question.secondOption
        },
        id: createFakeRandomishNumber()
      }
    ]);
    this.setState({
      dataSource: this.ds.cloneWithRows(this.questions)
    });

    saveQuestions(this.questions);
    navigation.goBack();
  };
  handleVote = (vote, id) => {
    this.questions = this.questions.map(question => {
      if (id === question.id) {
        return {
          ...question,
          [vote]: {
            ...question[vote],
            votes: question[vote].votes + 1
          }
        };
      }
      return question;
    });

    const usersVotes = {...this.state.usersVotes, [id]: true};

    this.setState({
      usersVotes,
      dataSource: this.ds.cloneWithRows(this.questions)
    });

    setUsersVotes(this.state.username, usersVotes);
  };
  // renderScene = (route, navigator) => {
  //   if (this.state.loading === true) {
  //     return <Loading />;
  //   } else if (this.state.username === '') {
  //     return <Username onSubmitUsername={this.handleSubmitUsername} />;
  //   } else if (route.newQuestion === true) {
  //     return (
  //       <NewQuestion
  //         onCancel={navigator.pop}
  //         onSubmit={question => this.handleSubmitQuestion(question, navigator)}
  //       />
  //     );
  //   } else if (route.question === true) {
  //     return (
  //       <Question
  //         onCancel={navigator.pop}
  //         onVote={this.handleVote}
  //         hasVoted={!!this.state.usersVotes[route.id]}
  //         info={this.questions.find(question => question.id === route.id)}
  //       />
  //     );
  //   } else {
  //     return (
  //       <Home
  //         usersVotes={this.state.usersVotes}
  //         dataSource={this.state.dataSource}
  //         toQuestion={id => navigator.push({question: true, id})}
  //         toNewQuestion={() => navigator.push({newQuestion: true})}
  //       />
  //     );
  //   }
  // };
  // configureScene = route => {
  //   if (Platform.OS === 'android') {
  //     return Navigator.SceneConfigs.FloatFromBottomAndroid;
  //   }

  //   if (route.newQuestion === true) {
  //     return Navigator.SceneConfigs.FloatFromBottom;
  //   }

  //   return Navigator.SceneConfigs.FloatFromRight;
  // };
  render() {
    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <AppNavigator
        ref={nav => (this.navigation = nav)}
        screenProps={{
          dataSource: this.state.dataSource,
          questions: this.questions,
          usersVotes: this.state.usersVotes,
          handleSubmitQuestion: this.handleSubmitQuestion,
          handleVote: this.handleVote,
          toQuestion: id => NavigationActions.navigate({routeName: 'Question'}),
          toNewQuestion: () => this.props.navigation.dispatch(ToNewQuestion)
        }}
      />
    );
  }
}

export default WouldYouRather;
