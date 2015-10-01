const React = require('react-native');
const Overlay = require('react-native-overlay');
const {bottomSideMenu} = require('./../../shared/colors');


const {
  View,
  Text,
  Component,
  Dimensions,
  Animated,
  DeviceEventEmitter,
  Touchable
  } = React;

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
// 1 is the device height
const ratioHeight = .2;

const padding = 10;

class SidePanel extends Component {
  constructor() {
    super();

    this.state = {
      top: new Animated.Value(0),
      height: deviceHeight * ratioHeight
    };


    this.updateKeyboardSpace = this.updateKeyboardSpace.bind(this);
    this.resetKeyboardSpace = this.resetKeyboardSpace.bind(this);
  }

  componentDidMount() {
    this.state.top.setValue(deviceHeight);

    DeviceEventEmitter.addListener('keyboardWillShow', this.updateKeyboardSpace);

    DeviceEventEmitter.addListener('keyboardWillHide', this.resetKeyboardSpace);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isVisible === nextProps.isVisible) {
      return;
    }
    if (nextProps.isVisible) {
      this.show = this.show || deviceHeight - nextProps.height - padding * 2;
      this.animate(this.show);
    }
    else if (!nextProps.isVisible) {
      this.animate(HIDE)
    }
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeEventListener('keyboardWillShow', this.updateKeyboardSpace);
    DeviceEventEmitter.removeEventListener('keyboardWillHide', this.resetKeyboardSpace);
  }

  updateKeyboardSpace(data) {
    if (data.endCoordinates) {
      console.log(this.show)
      this.animate(this.show - data.endCoordinates.height);
      this.setState({ height: data.endCoordinates.screenY - deviceHeight * ratioHeight })
    }
  }

  resetKeyboardSpace() {
    this.animate(this.show);
  }

  animate(value) {
    console.log('animate to', value)
    Animated.timing(
      this.state.top,
      {
        toValue: value,
        duration: 300
      }
    ).start();
  }

//
  render() {
    return (
      <Overlay isVisible={this.props.isVisible} aboveStatusBar={true}>
        <View style={styles.overlay} onMoveShouldSetResponder={()=> true}>
          <Animated.View style={[styles.createBoxContainer, {top: this.state.top}]}>
            <View style={[styles.createBox, this.props.style]} ref="contentWrapper">
              {this.props.content}
            </View>
          </Animated.View>
        </View>
      </Overlay>
    )
  }
}

const styles = {
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .5)',
    width: deviceWidth,
    alignItems: 'center'
  },
  createBoxContainer: {
    width: deviceWidth,
    alignItems: 'center',
    flex: 1,
  },
  createBox: {
    flex: 1,
    width: deviceWidth * .95,
    backgroundColor: bottomSideMenu.background,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    padding: padding,
  }
};


SidePanel.propTypes = {
  isVisible: React.PropTypes.bool,
  content: React.PropTypes.node,
  onClickOverlay: React.PropTypes.func
};


module.exports = SidePanel;