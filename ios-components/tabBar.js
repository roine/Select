const React = require('react-native');
const {Icon} = require('react-native-icons');
const {tabBar} = require('./../shared/colors');
const {
  StyleSheet,
  Text,
  View,
  Component,
  TouchableOpacity,
  Dimensions
  } = React;

const deviceWidth = Dimensions.get('window').width;

const precomputeStyle = require('precomputeStyle');
const TAB_UNDERLINE_REF = 'TAB_UNDERLINE';

const BAR_BACKGROUND_COLOR = tabBar.background;
const ACTIVE_COLOR = tabBar.active;
const INACTIVE_COLOR = tabBar.inactive;
const ICON_SIZE = 30;

class TabBar extends Component {

  renderIcons(icon, active) {
    if (!icon) {
      return <div></div>
    }
    return <Icon
      name={icon}
      size={ICON_SIZE}
      color={active ? ACTIVE_COLOR: INACTIVE_COLOR}
      style={{width: ICON_SIZE, height: ICON_SIZE}}
      />
  }


  renderTab(name, page, tabsCount) {
    var isActiveTab = this.props.activeTab === page;
    var [name, icon, iconActive] = name.split(/[ ,]+/);

    return (
      <TouchableOpacity key={name} onPress={() => this.props.goToPage(page)}>
        <View style={[styles.tab, {width: (deviceWidth / tabsCount)}]}>
          {this.renderIcons(isActiveTab ? iconActive : icon, isActiveTab)}
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
  extraMenuItem: {
    flex: 1
  },
  tabs: {
    paddingTop: 20,
    paddingBottom: 5,
    flexDirection: 'row',
    borderWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    backgroundColor: BAR_BACKGROUND_COLOR,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  tabBarUnderlineStyle: {
    position: 'absolute',
    height: 2,
    bottom: 0,
    backgroundColor: ACTIVE_COLOR,
  },
  tabBarText: {
    color: INACTIVE_COLOR,
    fontFamily: 'Roboto',
    fontWeight: '500'
  },
  tabBarTextActive: {
    color: ACTIVE_COLOR
  }
});

TabBar.propTypes = {
  tabs: React.PropTypes.array,
  activeTab: React.PropTypes.number,
  goToPage: React.PropTypes.func
};

module.exports = TabBar;