import React, { Component } from 'react';
import { 
  StyleSheet, Text, View,
  ListView, TouchableOpacity,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Button from 'react-native-button';

import ButtonRow from '../../components/ButtonRow';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    backgroundColor: '#e76e63',
    margin: 10,
  },
});

export class FlexboxExamples extends Component {
  constructor(props) {
    super(props);

    this.state = {
      containerStyles: {},
      boxStyles: { height: 50, width: 50 },
      forScreenshots: true,
    };

    this.buttons = {
      'flexDirection': [
        { title: 'column', onPress: this.changeStyles({ flexDirection: 'column' }) },
        { title: 'row', onPress: this.changeStyles({ flexDirection: 'row' }) },
      ],
      'justifyContent': [
        { title: 'flex-start', onPress: this.changeStyles({ justifyContent: 'flex-start' }) },
        { title: 'center', onPress: this.changeStyles({ justifyContent: 'center' }) },
        { title: 'flex-end', onPress: this.changeStyles({ justifyContent: 'flex-end' }) },
        { title: 'space-between', onPress: this.changeStyles({ justifyContent: 'space-between' }) },
        { title: 'space-around', onPress: this.changeStyles({ justifyContent: 'space-around' }) },
      ],
      'alignItems': [
        { title: 'flex-start', onPress: this.changeStyles({ alignItems: 'flex-start' }) },
        { title: 'center', onPress: this.changeStyles({ alignItems: 'center' }) },
        { title: 'flex-end', onPress: this.changeStyles({ alignItems: 'flex-end' }) },
        { title: 'stretch', onPress: this.changeStyles({ alignItems: 'stretch' }) },
      ],
      box: [
        { title: 'height', onPress: this.changeBoxStyles({ width: 50 }) },
        { title: 'width', onPress: this.changeBoxStyles({ height: 50 }) },
        { title: 'reset', onPress: this.changeBoxStyles({ width: 50, height: 50 }) },
      ]
    };
  }

  changeStyles = (content) => () => {
    this.setState({
      containerStyles: Object.assign({}, this.state.containerStyles, content),
    });
  }

  changeBoxStyles = (content) => () => {
    this.setState({
      boxStyles: content,
    });
  }

  toggleScreenshots = () => {
    this.setState({ forScreenshots: !this.state.forScreenshots });
  }

  renderOptions = () => {
    const { buttons } = this;
    return (
      <ScrollableTabView
        style={{ flex: 2 }}
      >
      {Object.keys(buttons).map(title => {
        return (
          <ButtonRow
            key={title}
            tabLabel={title}
            buttons={buttons[title]}
            onPress={this.changeStyles.bind(this)}
          />
        )
      })}
      </ScrollableTabView>
    );
  }

  render() {
    const { forScreenshots, containerStyles, boxStyles } = this.state;

    return (
      <View
        style={{ flex: 1 }}
      >
        {!forScreenshots && this.renderOptions() }
        <TouchableOpacity
          style={[ containerStyles, { flex: 8} ]}
          onPress={this.toggleScreenshots}
        >
          <View style={[ boxStyles, styles.box ]} />
          <View style={[ boxStyles, styles.box ]} />
          <View style={[ boxStyles, styles.box ]} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default FlexboxExamples;
