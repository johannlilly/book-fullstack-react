import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

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
});

export class FlexboxLayouts extends Component {
  render() {
    return (
      <View style={[ styles.container ]}>
        <View style={[ styles.box, { flex: 1 } ]} />
        <View style={[ styles.box, { flex: 2 } ]} />
        <View style={[ styles.box, { flex: 1 } ]} />
      </View>
    );
  }
}

export default FlexboxLayouts;
