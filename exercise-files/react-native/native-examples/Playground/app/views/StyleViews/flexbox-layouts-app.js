import React, { Component } from 'react';
import { 
  StyleSheet, Text, View,
  ListView, TouchableOpacity,
} from 'react-native';
import Button from 'react-native-button';

import { FlexboxLayouts as DefaultLayout } from './flexbox-layouts';
import { FlexboxLayouts as LayoutOne } from './flexbox-layouts-1';
import { FlexboxLayouts as LayoutTwo } from './flexbox-layouts-2';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    backgroundColor: '#e76e63',
    margin: 10,
    width: 50,
    height: 50,
  },
  button: {
    fontSize: 15,
    color: '#000000',
  },

  buttonContainer: {
    padding: 10,
    margin: 10,
    height: 45,
    borderBottomWidth: 0.5,
    borderRadius: 2,
    backgroundColor: 'rgba(55, 55, 55, 0.2)',
  },

});

export class FlexboxLayouts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      layout: 0,
      forScreenshots: true,
    };

    this.buttons = [
      { title: 'Reset', onPress: this.reset },
      { title: 'layout 1', onPress: this.changeLayout(1) },
      { title: 'layout 2', onPress: this.changeLayout(2) },
    ];
  }

  changeLayout = (layout) => () => {
    this.setState({ layout });
  }

  toggleScreenshots = () => {
    this.setState({ forScreenshots: !this.state.forScreenshots });
  }

  reset = () => {
    this.setState({ layout: 0 });
  }

  renderOptions = () => {
    const { buttons } = this;
    return (
      <View
        style={{ flex: 2 }}
      >
      {buttons.map(btn => {
        return (
          <Button
            key={`button-${btn.title}`}
            onPress={btn.onPress}
            style={styles.button}
            containerStyle={styles.buttonContainer}
          >
            {btn.title}
          </Button>
        );
      })}
      </View>
    );
  }

  renderLayout = () => {
    const { layout } = this.state;

    switch(layout) {
      case 1:
        return <LayoutOne />;
      case 2:
        return <LayoutTwo />;
      default:
        return <DefaultLayout />;
    };
  }

  render() {
    const { forScreenshots } = this.state;

    return (
      <View
        style={{ flex: 1 }}
      >
        {!forScreenshots && this.renderOptions() }
        <TouchableOpacity
          style={[ { flex: 1 } ]}
          onPress={this.toggleScreenshots}
        >
          {this.renderLayout()}
        </TouchableOpacity>
      </View>
    );
  }
}

export default FlexboxLayouts;
