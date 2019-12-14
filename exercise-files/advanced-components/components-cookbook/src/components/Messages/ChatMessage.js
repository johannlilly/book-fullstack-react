import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment'
const styles = require('./Messages.css');

class ChatMessage extends React.Component {
  static propTypes = {
    message: PropTypes.object,
  };

  static contextTypes = {
    userMap: PropTypes.object,
  };

  getMessageClass = (other) => {
    const { message } = this.props;
    const klasses = [ styles.messageData ];
    if (message.from !== 'me') {
      klasses.push(other);
    }
    return klasses;
  };

  render() {
    const { message } = this.props;
    const at = moment(message.sentAt).fromNow();

    let textKlasses = [ styles.message ];
    let messageKlasses = [ styles.messageData ];
    let datetimeKlasses = [ styles.messageDataTime ];
    let user = message.from;

    if (message.from === 'me') {
      user = { username: 'me' };
      messageKlasses = messageKlasses.concat([ styles.alignRight ]);
      datetimeKlasses = datetimeKlasses.concat([ styles.floatRight ]);
      textKlasses = textKlasses.concat([ styles.myMessage, styles.floatRight ]);
    } else {
      user = this.context.userMap[user];
      messageKlasses = messageKlasses.concat([ styles.alignLeft ]);
      datetimeKlasses = datetimeKlasses.concat([ styles.floatLeft ]);
      textKlasses = textKlasses.concat([ styles.otherMessage ]);
    }
    return (
      <div className={styles.message}>
        <div className={messageKlasses.join(' ')}>
          <span className={styles.messageDataName}>{user.username}</span>
        </div>
        <div className={textKlasses.join(' ')}>
          {message.text}
        </div>
        <div className={datetimeKlasses.join(' ')}>{at}</div>
      </div>
    );
  }
}

export default ChatMessage
