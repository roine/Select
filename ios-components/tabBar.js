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

  constructor() {
    super();
    this.selectedTabIcons = [];
    this.unselectedTabIcons = [];
  }

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
  tabs: {
    height: 50,
    flexDirection: 'row',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: '#ccc',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 10,
    alignItems: 'center',
  },
  tabBarUnderlineStyle: {
    position: 'absolute',
    height: 4,
    backgroundColor: 'navy',
    bottom: 0,
  },
  tabBarText: {
    color: 'black',
    fontWeight: 'normal'
  },
  tabBarTextActive: {
    color: 'navy',
    fontWeight: '900'
  }
});

TabBar.propTypes = {
  tabs: React.PropTypes.array,
  activeTab: React.PropTypes.number,
  goToPage: React.PropTypes.func
};

module.exports = TabBar;