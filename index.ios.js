
// Vendors
const React = require('react-native');
const ScrollableTabView = require('react-native-scrollable-tab-view');

// Self-made components
const TabBar = require('./ios-components/tabBar');
const HomeTab = require('./ios-components/pages/homeTab');
const SidePanel = require('./ios-components/sidePanel');


const {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions
  } = React;

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

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
        <ScrollableTabView
          renderTabBar={() => <TabBar></TabBar>}>
          <HomeTab tabLabel="Home, ion|ios-home-outline, ion|ios-home"/>
          <DummyPage tabLabel="Dummy2R, ion|ios-cog-outline, ion|ios-cog"/>
        </ScrollableTabView>
        <SidePanel></SidePanel>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabView: {
    backgroundColor: 'red',
    height: deviceHeight
  }
});

AppRegistry.registerComponent('Select', () => Select);
