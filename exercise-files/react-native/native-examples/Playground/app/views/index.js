import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import List from '../components/List';

import ListViews from './ListViews';
import StyleViews from './StyleViews';
import FetchViews from './FetchViews';

export class Views extends Component {
  constructor(props) {
    super(props);

    this.routes = {
      'lists': {
        title: 'Listing',
        Component: ListViews,
      },
      'styles': {
        title: 'Styles',
        Component: StyleViews,
      },
      'ajax': {
        title: 'Ajax',
        Component: FetchViews
      }
    };
  }

  render() {
    return (
      <View {...this.props}>
        <List
          navigator={this.props.navigator}
          routes={this.routes}
        />
      </View>
    )
  }
}

export default Views;
