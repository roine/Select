/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var ScrollableTabView = require('react-native-scrollable-tab-view');
var {deviceWidth, deviceHeight} = require('Dimensions');

// Self-made components
var TabBar = require('./ios-components/tabBar');
var HomeTab = require('./ios-components/homeTab');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView
  } = React;

class DummyPage extends React.Component {
  render() {
    return (
      <ScrollView style={styles.tabView}>
        <Text>Dummy Page</Text>
      </ScrollView>
    )
  }
}


var Select = React.createClass({
  render: function () {
    return (
      <View style={styles.container}>
        <ScrollableTabView renderTabBar={() => <TabBar></TabBar>}>
          <HomeTab tabLabel="Home"/>
          <DummyPage tabLabel="Dummy2"/>
          <DummyPage tabLabel="Dummy3"/>
          <DummyPage tabLabel="Dummy4"/>
        </ScrollableTabView>
      </View>

    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  tabView: {
    width: deviceWidth,
    backgroundColor: 'red'
  }
});

AppRegistry.registerComponent('Select', () => Select);
