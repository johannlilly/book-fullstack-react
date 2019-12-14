import React, { PropTypes, Component } from 'react';
import { Navigator } from 'react-native';
import { Platform } from 'react-native';

export default class App extends Component {
  configureScene(route) {
    // Handle configuring scene
  }

  renderScene(route, navigator) {
    // handle rendering scene
  }

  render() {
    return (
      <Navigator
        renderScene={this.renderScene}
        configureScene={this.configureScene}
      />
    );
  }
}

export class RenderSceneApp1 extends Component {
  renderScene(route) {
    if (route.home === true) {
      return <HomeContainer />
    } else if (route.notifications === true) {
      return <NotificationsContainer />
    } else {
      return <FooterTabsContainer />
    }
  }
}

export class RenderSceneApp2 extends Component {
  renderScene(route, navigator) {
    if (route.home === true) {
      return <HomeContainer navigator={navigator} />
    } else if (route.notifications === true) {
      return <NotificationsContainer navigator={navigator} />
    } else {
      return <FooterTabsContainer navigator={navigator} />
    }
  }
}

export class ConfigureSceneApp1 extends Component {
  configureScene(route) {
    if (route.home === true) {
      // Transitioning to HomeContainer
    } else if (route.notifications === true) {
      // Transitioning to NotificationsContainer
    } else {
      // Showing FooterTabsContainer
    }
  }
}


export class Home extends Component {

  handleToNotifications() {
    this.props.navigator.push({
      notifications: true,
    });
  }

  render() {}
}

export class App2 extends Component {
  configureScene(route) {
    if (route.notifications === true) {
      return Navigator.SceneConfigs.FloatFromBottom;
    }

    return Navigator.SceneConfigs.FloatFromRight;
  }

  renderScene(route, navigator) {
    if (route.home === true) {
      return <HomeContainer navigator={navigator} />
    } else if (route.notifications === true) {
      return <NotificationsContainer navigator={navigator} />
    } else {
      return <FooterTabsContainer navigator={navigator} />
    }
  }

  render() {
    return (
      <Navigator
        renderScene={this.renderScene}
        configureScene={this.configureScene}
      />
    );
  }
}

export class PlatformApp extends Component {
  configureScene(route) {
    if (route.notifications === true) {
      if (Platform.OS === 'android') {
        return Navigator.SceneConfigs.FloatFromBottomAndroid;
      } else {
        return Navigator.SceneConfigs.FloatFromBottom;
      }
    }

    return Navigator.SceneConfigs.FloatFromRight;
  }

  renderScene(route, navigator) {
    if (route.home === true) {
      return <HomeContainer navigator={navigator} />
    } else if (route.notifications === true) {
      return <NotificationsContainer navigator={navigator} />
    } else {
      return <FooterTabsContainer navigator={navigator} />
    }
  }

  render() {
    return (
      <Navigator
        renderScene={this.renderScene}
        configureScene={this.configureScene}
      />
    );
  }
}
