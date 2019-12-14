import PropTypes from 'prop-types';
import React, { Component, Children } from 'react';
import { Navigator, View, Text, TouchableOpacity } from 'react-native';
import { Platform } from 'react-native';

import styles from './styles';
import ViewListing from './views';

// While building the app
let initialRoute = { title: 'Examples', component: ViewListing };
// TESTING
// const { Routes } = require('./views/FetchViews');
// initialRoute = Routes.fetch;
// END

const NavigationBarRouteMapper = {
  LeftButton: (route, navigator, index, navState) => {
    if (index === 0) {
      return null;
    }

    let previousRoute = navState.routeStack[index - 1];
    const pop = () => navigator.pop(previousRoute);
    
    return (
      <TouchableOpacity
        onPress={pop}
        style={{ width: 40, height: 40 }}
      >
        <Text
          style={styles.navbarTitle}
        > {'<'} 
        </Text>
      </TouchableOpacity>
    )
  },

  RightButton: () => {
    return null;
  },

  Title: (route) => {
    return (
      <Text style={styles.navbarTitle}>{route.title}</Text>
    );
  },
};

const Page = (props) => (
  <View
    style={styles.page}
  >
    { Children.map(props.children, c => React.cloneElement(c, props)) }
  </View>
);

export default class App extends Component {
  configureScene(route) {
    // Handle configuring scene
    if (route.sceneConfig) {
      return route.sceneConfig;
    }
    return Navigator.SceneConfigs.FloatFromRight;
  }

  renderScene(route, navigator) {
    let RouteComponent;
    // handle rendering scene
    if (route && route.Component) {
      RouteComponent = route.Component;
    } else {
      RouteComponent = ViewListing;
    }

    return (
      <Page>
        <RouteComponent
          style={{ flex: 1 }}
          navigator={navigator}
          route={route}
          {...this.props}
        />
      </Page>
    );
  }

  render() {
    return (
      <Navigator
        renderScene={this.renderScene}
        configureScene={this.configureScene}
        initialRoute={initialRoute}
        navigationBar={
          <Navigator.NavigationBar
            style={styles.navBar}
            routeMapper={NavigationBarRouteMapper}
          />
        }
      />
    );
  }
}
