import PropTypes from 'prop-types';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

function Results({info, totalVotes}) {
  return (
    <View>
      <Text style={styles.option}>{info.option}</Text>
      <Text style={styles.voteInfo}>
        Votes: {info.votes} -{' '}
        {totalVotes === 0 ? 0 : parseInt(info.votes / totalVotes * 100)}%
      </Text>
    </View>
  );
}

export default class Question extends React.Component {
  static navigationOptions = {
    title: 'Would you rather'
  };

  constructor(props) {
    super(props);

    const {usersVotes} = this.props.screenProps;
    const {id} = this.props.navigation.state.params;

    this.handleVote = this.handleVote.bind(this);
    this.hasVoted = !!usersVotes[id];
  }

  handleVote = (vote, id) => {
    this.props.screenProps.handleVote(vote, id);
    this.hasVoted = true;
  };

  render() {
    const props = this.props;
    const {id} = props.navigation.state.params;
    const {questions, handleVote} = props.screenProps;

    const question = questions.filter(question => question.id === id)[0];
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{question.title}</Text>
        <View style={styles.innerContainer}>
          <TouchableOpacity
            onPress={() =>
              this.hasVoted === false &&
              this.handleVote('firstOption', question.id)}
            style={[styles.card, {backgroundColor: '#71B6F0'}]}
          >
            {this.hasVoted === true ? (
              <Results
                info={question.firstOption}
                totalVotes={
                  question.firstOption.votes + question.secondOption.votes
                }
              />
            ) : (
              <Text style={styles.cardText}>{question.firstOption.option}</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.hasVoted === false &&
              this.handleVote('secondOption', question.id)}
            style={[styles.card, {backgroundColor: '#E71575'}]}
          >
            {this.hasVoted === true ? (
              <Results
                info={question.secondOption}
                totalVotes={
                  question.firstOption.votes + question.secondOption.votes
                }
              />
            ) : (
              <Text style={styles.cardText}>
                {question.secondOption.option}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

Question.propTypes = {
  info: PropTypes.object,
  hasVoted: PropTypes.bool,
  onCancel: PropTypes.func,
  onVote: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  navContainer: {
    justifyContent: 'center'
  },
  navText: {
    fontSize: 15
  },
  innerContainer: {
    padding: 30,
    paddingTop: 0,
    flex: 1
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    color: '#2d2d2d',
    margin: 20
  },
  card: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 15
  },
  cardText: {
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  option: {
    fontSize: 23,
    color: '#fff',
    textAlign: 'center'
  },
  voteInfo: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18
  }
});
