import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment'
const styles = require('./Messages.css');
// For demo purposes

class ThreadList extends React.Component {
  
  static contextTypes = {
    users: PropTypes.array,
  };

  componentWillReceiveProps(nextProps, nextContext) {
    // ...
  }
  
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    // ...
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    // ...
  }

  componentDidUpdate(prevProps, prevState, prevContext) {
    // ...
  }

  render() {
    return (
      <div className={styles.threadList}>
        <ul className={styles.list}>
          {this.context.users.map((u, idx) => {
            return (
              <UserListing
                onClick={this.props.onClick}
                key={idx}
                index={idx}
                user={u}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ThreadList
