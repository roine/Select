const React = require('react-native');
const {connect} = require('react-redux/native');
const {createStore} = require('redux');
const ScrollableTabView = require('react-native-scrollable-tab-view');

// Redux
const {requestClose, requestOpen, REQUEST_OPEN, OPEN, CLOSE} = require('./../actions');

// Self-made components
const TabBar = require('./../components/TabBar');
const HomeTab = require('./HomeTab');
const SidePanel = require('./../components/SidePanel');

const {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Component
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

class App extends React.Component {

  updateState() {
    console.log('overlay pressed')
    if (this.props.sidePanel.closeOnClickOverlay) {

    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollableTabView renderTabBar={() => <TabBar></TabBar>}>
          <HomeTab tabLabel="Home, ion|ios-home-outline, ion|ios-home"/>
          <DummyPage tabLabel="Dummy2R, ion|ios-cog-outline, ion|ios-cog"/>
        </ScrollableTabView>
        <SidePanel
          isVisible={this.props.sidePanel.status === OPEN}
          content={this.props.sidePanel.injected}
          onClickOverlay={this.updateState.bind(this)}
          height={this.props.sidePanel.height}/>
      </View>
    );
  }
}


var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabView: {
    backgroundColor: 'red',
    height: deviceHeight
  }
});

function select(state) {
  return {
    sidePanel: state.sidePanel
  }
}

module.exports = connect(select)(App);