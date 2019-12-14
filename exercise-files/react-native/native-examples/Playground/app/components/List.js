import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, View, Text, ListView } from 'react-native';
import styles from '../styles';

export class List extends Component {
  static props = {
    routes: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.string,
    })).isRequired,
    navigator: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.routes),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.routes !== this.props.routes) {
      this.setState({
        dataSource: this.ds.cloneWithRows(nextProps.routes),
      });
    }
  }

  gotoRoute(route) {
    this.props.navigator.push(route);
  }

  renderRow = (route) => {
    return (
      <View
        style={styles.row}
      >
        <Button
          title={route.title}
          onPress={() => this.gotoRoute(route)}
        ></Button>
      </View>
    );
  }
  render() {
    return (
      <ListView
        renderRow={this.renderRow} 
        dataSource={this.state.dataSource}
      />
    );
  }
}

export default List;
