const React = require('react-native');
const {bottomSideMenu} = require('./../shared/colors');

const {
  View,
  Text,
  Component,
  Dimensions
  } = React;

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class SidePanel extends Component {
  render() {
    return (
      <View style={styles.createBoxContainer}>
        <View style={[styles.createBox, this.props.style]}>
          <Text>Test</Text>
        </View>
      </View>
    )
  }
}

const styles = {
  createBoxContainer: {
    width: deviceWidth,
    alignItems: 'center',
    bottom: 0,
    backgroundColor: 'transparent'
  },
  createBox: {
    position: 'relative',
    height: deviceHeight * .3,
    width: deviceWidth * .95,
    backgroundColor: bottomSideMenu.background,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    padding: 15
  }
};

module.exports = SidePanel;