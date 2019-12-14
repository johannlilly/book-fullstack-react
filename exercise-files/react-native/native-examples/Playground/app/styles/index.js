import React from 'react';

import { Platform, StyleSheet, PixelRatio } from 'react-native';

let top = 64;
if (Platform.OS === 'android') {
  top = 44;
}
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 4,
  },

  header: {
    flex: 1,
    flexDirection: 'column',
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
    marginBottom: 10,
  },

  page: {
    flex: 1,
    paddingTop: top,
    backgroundColor: 'white',
  },

  navBar: {
    backgroundColor: '#EAEAEA',
    borderBottomColor: 'blue',
    borderBottomWidth: 0.1,
  },

  navbarTitle: {
    color: 'black',
    fontWeight: '500',
    marginVertical: 11,
    fontSize: 20,
  },

  row: {
    flex: 1,
    flexDirection: 'row',
  },
});
