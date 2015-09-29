const React = require('react-native');
const Overlay = require('react-native-overlay');
const {bottomSideMenu} = require('./../../shared/colors');
const {BlurView} = require('react-native-blur');


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
      <Overlay isVisible={this.props.isVisible} aboveStatusBar={true}>
        <BlurView blurType="dark" style={styles.background}>
          <View style={styles.createBoxContainer}>
            <View style={[styles.createBox, this.props.style]}>
              {this.props.content}
            </View>
          </View>
        </BlurView>
      </Overlay>

    )
  }
}


const styles = {
  background: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .5)',
    width: deviceWidth,
    alignItems: 'center',
    position: 'relative',
  },
  createBoxContainer: {
    bottom: 0,
    backgroundColor: 'transparent'
  },
  createBox: {
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


SidePanel.propTypes = {
  display: React.PropTypes.bool,
  content: React.PropTypes.func
};


module.exports = SidePanel;