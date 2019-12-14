import React from 'react';
import { View } from 'react-native';
import List from '../../components/List';

import Simple from './simple';

export const Routes = {
  fetch: {
    key: 'simple',
    Component: Simple,
    title: 'Simple list',
  },
};

export const ListViews = (props) => (
  <View>
    <List
      {...props}
      routes={Routes}
    />
  </View>
);

export default ListViews;
