import React from 'react';
import Simple from './simple';
import { View } from 'react-native';
import List from '../../components/List';

export const Routes = {
  simple: {
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
