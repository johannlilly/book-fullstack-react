import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment'
const styles = require('./Messages.css');

class UserListing extends React.Component {
  static propTypes = {
    onClick: PropTypes.func,
    index: PropTypes.number,
  };

  static contextTypes = {
    users: PropTypes.array,
  };

  handleClick = (e) => {
    this.props.onClick(this.props.index);
  };

  render() {
    const { user } = this.props;
    const lastOnline = moment(user.lastOnline).fromNow();
    const onlineWindow = moment().subtract(2, 'hours');
    const online = moment(user.lastOnline).isAfter(onlineWindow);

    return (
      <li className={styles.userListing} onClick={this.handleClick}>
        <img src={user.avatar} className={styles.avatar} alt={user.username} />
        <div className={styles.about}>
          <div className={styles.name}>{user.username}</div>
          <div className={styles.status}>
            <i
              className={[
                'fa',
                'fa-circle',
                online ? styles.online : styles.offline,
              ].join(' ')}
            />
            {online ? 'online' : lastOnline}
          </div>
        </div>
      </li>
    );
  }
}

export default UserListing
