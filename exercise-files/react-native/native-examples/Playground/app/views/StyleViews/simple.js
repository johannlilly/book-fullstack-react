import React, { PropTypes, Component } from 'react';
import { View, Text, ScrollView, Image, ListView, TextInput } from 'react-native';

import { StyleSheet } from 'react-native';

const BackgroundColoredComponent = (props) => (
  <View style={{ backgroundColor: 'green', padding: 10 }}>
    <Text style={{ color: 'blue', fontSize: 25 }}>
      Hello world
    </Text>
  </View>
);

const ContainerComponent = () => {
  const getBackgroundColor = () => {
    return { backgroundColor: 'red' };
  };

  return (
    <View style={[ getBackgroundColor(), { padding: 10 } ]}>
      <Text style={{ color: 'blue', fontSize: 25 }}>
        Hello world
      </Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  containerText: {
    color: 'blue',
    fontSize: 20,
  },
});

class ExampleComponent extends Component {
  getBackgroundColor() {
    return {
      backgroundColor: 'yellow'
    };
  }

  render() {
    return (
      <View style={[ 
        this.getBackgroundColor(),
        styles.container 
      ]}>
        <Text style={styles.containerText}>
          Hello world
        </Text>
      </View>
    );
  }
}

// For book content
export class Simple extends Component {
  render() {
    return (
      <View style={styles.container}>
        <BackgroundColoredComponent />
        <ContainerComponent />
        <ExampleComponent />
      </View>
    );
  }
}

export default Simple;
