import PropTypes from 'prop-types';
/* eslint-disable no-param-reassign */
import React from 'react';
import { pick } from 'lodash';
import 'font-awesome/css/font-awesome.css';
import moment from 'moment';

const styles = require('./Messages.css');

class Messages extends React.Component {
  static propTypes = {
    users: PropTypes.array.isRequired,
    initialActiveChatIdx: PropTypes.number,
    messages: PropTypes.array.isRequired,
  };

  static childContextTypes = {
    users: PropTypes.array,
    userMap: PropTypes.object,
  };

  static defaultProps = {
    initialActiveChatIdx: 0,
  };

  state = {
    currentChatIndex: this.props.initialActiveChatIdx,
  };

  getChildContext() {
    return {
      users: this.getUsers(),
      userMap: this.getUserMap(),
    };
  }

  getUsers = () => {
    const users = this.props.users
      .map(m => pick(m, [ 'uuid', 'username', 'avatar', 'lastOnline' ]))
      .sort((a, b) => moment(a.lastOnline).isBefore(b.lastOnline));
    return users;
  };

  getUserMap = () => {
    // Should be elsewhere
    return this.props.users.reduce(
      (memo, u) => {
        memo[u.uuid] = u;
        return memo;
      },
      {}
    );
  };

  selectChat = (idx) => {
    this.setState({
      currentChatIndex: idx,
    });
  };

  render() {
    const { currentChatIndex } = this.state;
    const currentChat = this.props.messages[currentChatIndex];
    return (
      <div className={styles.container}>
        {/* navbar */}
        <ThreadList onClick={this.selectChat} />
        <ChatWindow messages={currentChat} />
      </div>
    );
  }
}

export default Messages;

