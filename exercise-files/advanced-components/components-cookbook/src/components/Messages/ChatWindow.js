import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
const styles = require('./Messages.css');

class ChatWindow extends React.Component {
  static propTypes = {
    messages: PropTypes.object
  };

  static contextTypes = {
    userMap: PropTypes.object
  };

  getParticipants = () => {
    const {userMap} = this.context;
    const uuids = this.props.messages.thread
      .map(m => m.from)
      .filter(m => m !== 'me');

    const users = uuids.reduce(
      (memo, uid) => {
        if (!memo.map[uid]) {
          memo.list.push(userMap[uid]);
          memo.map[uid] = true;
        }
        return memo;
      },
      {list: [], map: {}}
    );
    return users.list;
  };

  render() {
    const participants = this.getParticipants();
    const {thread} = this.props.messages;

    return (
      <div className={styles.chat}>
        <ChatHeader participants={participants} />
        {thread.map((msg, index) => {
          return <ChatMessage message={msg} index={index} key={index} />;
        })}
      </div>
    );
  }
}

export default ChatWindow;
