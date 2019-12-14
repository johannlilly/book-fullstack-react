import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
const styles = require('./Messages.css');

const ChatHeader = (props, context) => {
  const user = props.participants[0]; // one user, for now
  return (
    <div className={[styles.chatHeader].join(' ')}>
      <img src={user.avatar} className={styles.avatar} alt={user.username} />

      <div className={styles.chatAbout}>
        <div className={styles.chatWith}>Chat with {user.username}</div>
      </div>
      <div />
    </div>
  );
};
ChatHeader.propTypes = {participants: PropTypes.array};
ChatHeader.contextTypes = {users: PropTypes.array};

export default ChatHeader;
