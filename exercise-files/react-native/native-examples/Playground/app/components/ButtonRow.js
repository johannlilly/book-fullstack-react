import React, { Component } from 'react';
import { 
  StyleSheet, Text, View,
  ListView, TouchableOpacity,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Button from 'react-native-button'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    backgroundColor: '#e76e63',
    margin: 10,
  },

  buttonRow: {
    height: 90,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  buttonRowText: {
    fontSize: 12,
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

export class ButtonRow extends Component {
  constructor(props) {
    super(props);

    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    const { buttons } = this.props;

    this.state = {
      buttons,
      dataSource: ds.cloneWithRows(buttons),
    };
  }

  renderRow = ({ title, onPress }, sectionId) => {
    return (
      <Button
        key={`button-${sectionId}-${title}`}
        onPress={onPress}
        style={styles.button}
        containerStyle={styles.buttonContainer}
      >
        {title}
      </Button>
    );
  }

  renderSeparator = (sectionId, rowId, adjacentRowHightlighted) => {
    return (
      <View
        key={`${sectionId}-${rowId}`}
        style={[
          { height: adjacentRowHightlighted ? 4 : 1, 
            backgroundColor: adjacentRowHightlighted ? '#3B5998' : '#CCCCCC' },
        ]}
      />
    );
  }

  render() {
    const { dataSource } = this.state;
    const { btnStyles } = this.props;
    let buttonStyles = btnStyles || {};

    return (
      <View
        style={{ flex: 1, flexDirection: 'row' }}
      >
        <ListView
          horizontal
          directionalLockEnabled
          dataSource={dataSource}
          renderRow={this.renderRow}
          renderSeparator={this.renderSeparator}
          enableEmptySections
          contentContainerStyle={[ styles.buttonRow ]}
        />
      </View>
    );
  }
}

export default ButtonRow;
