var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  Component,
  TouchableOpacity,
  Dimensions
  } = React;

var deviceWidth = Dimensions.get('window').width;

var precomputeStyle = require('precomputeStyle');
var TAB_UNDERLINE_REF = 'TAB_UNDERLINE';

class TabBar extends Component {


  renderTab(name, page, tabsCount) {
    var isActiveTab = this.props.activeTab === page;

    return (
      <TouchableOpacity key={name} onPress={() => this.props.goToPage(page)}>
        <View style={[styles.tab, {width: (deviceWidth / tabsCount)}]}>
          <Text style={[styles.tabBarText, isActiveTab && styles.tabBarTextActive]}>{name}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  setAnimationValue(value) {
    this.refs[TAB_UNDERLINE_REF].setNativeProps(precomputeStyle({
      left: (deviceWidth * value) / this.props.tabs.length
    }));
  }

  render() {
    var numberOfTabs = this.props.tabs.length;

    return (
      <View style={styles.tabs}>
        {this.props.tabs.map((tab, i) => this.renderTab(tab, i, this.props.tabs.length))}
        <View style={[styles.tabBarUnderlineStyle, {width: (deviceWidth / numberOfTabs)}]} ref={TAB_UNDERLINE_REF}/>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  extraMenu: {
    backgroundColor: '#3498db'
  },
  extraMenuItem:{
    flex:1
  },
  tabs: {
    paddingTop: 30,
    flexDirection: 'row',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: '#ccc',
    backgroundColor: '#2ecc71'
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5
  },
  tabBarUnderlineStyle: {
    position: 'absolute',
    height: 4,
    backgroundColor: 'navy',
    bottom: 0,
  },
  tabBarText: {
    color: 'white'
  },
  tabBarTextActive: {
    color: '#000000'
  }
});

TabBar.propTypes = {
  tabs: React.PropTypes.array,
  activeTab: React.PropTypes.number,
  goToPage: React.PropTypes.func
};

module.exports = TabBar;