import React from 'react';
import { View } from 'react-native';
import List from '../../components/List';

import Simple from './simple';
import Flexbox from './flexbox-app';
import FlexboxLayouts from './flexbox-layouts-app';

export const Routes = {
  simple: {
    key: 'simple',
    Component: Simple,
    title: 'Simple list',
  },
  flexbox: {
    key: 'flexbox',
    Component: Flexbox,
    title: 'Flexbox',
  },
  flexboxLayouts: {
    key: 'flexbox-layouts',
    Component: FlexboxLayouts,
    title: 'Flexbox layouts',
  }
};

export const StyleViews = (props) => (
  <View>
    <List
      {...props}
      routes={Routes}
    />
  </View>
);

export default StyleViews;
