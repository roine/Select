const React = require('react-native');
const Overlay = require('react-native-overlay');
const {bottomSideMenu} = require('./../../shared/colors');

const {
  View,
  Text,
  Component,
  Dimensions,
  Animated,
  LayoutAnimation,
  DeviceEventEmitter,
  Touchable
  } = React;

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const HIDE = -deviceHeight;
const SHOW = 0;

class SidePanel extends Component {
  constructor() {
    super();

    this.state = {
      bottom: new Animated.Value(HIDE),
      opacity: new Animated.Value(0),
      height: null,
      isVisible: false
    };


    this.updateKeyboardSpace = this.updateKeyboardSpace.bind(this);
    this.resetKeyboardSpace = this.resetKeyboardSpace.bind(this);
  }

  componentDidMount() {
    DeviceEventEmitter.addListener('keyboardWillShow', this.updateKeyboardSpace);
    DeviceEventEmitter.addListener('keyboardWillHide', this.resetKeyboardSpace);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isVisible === nextProps.isVisible) {
      return;
    }

    // opening
    if (nextProps.isVisible && !this.props.isVisible) {
      this.setState({ isVisible: true });
      Animated.sequence([
        this.animateOpacity(0.6),
        this.animateBottom(SHOW)
      ]).start();
    }
    // closing
    else if (!nextProps.isVisible && this.props.isVisible) {
      Animated.sequence([
        this.animateBottom(-this.state.height || HIDE),
        this.animateOpacity(0)
      ]).start(() => this.setState({ isVisible: false }));
    }
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeEventListener('keyboardWillShow', this.updateKeyboardSpace);
    DeviceEventEmitter.removeEventListener('keyboardWillHide', this.resetKeyboardSpace);
  }

  // onLayout, recalculate the height and move below the fold by 100% of height,
  // this way the animation is better since it doesnt start from very far
  measureContentHeight() {
    this.refs.contentWrapper.measure((ox, oy, width, height) => {
      this.setState({ height });
      this.state.bottom.setValue(-height);
    });
  }

  updateKeyboardSpace(data) {
    if (data.endCoordinates) {
      this.animateBottom(SHOW + data.endCoordinates.height).start();
    }
  }

  resetKeyboardSpace() {
    this.animateBottom(SHOW).start();
  }

  animateBottom(value) {
    return Animated.timing(
      this.state.bottom,
      {
        toValue: value,
        duration: 300
      }
    );
  }

  animateOpacity(value) {
    return Animated.timing(
      this.state.opacity, {
        toValue: value,
        duration: 300
      }
    );
  }


  render() {
    return (
      <Overlay isVisible={this.state.isVisible} aboveStatusBar={true}>
        <View style={styles.overlayWrapper}>
          <Animated.View style={[styles.overlay, {opacity: this.state.opacity}]}>
          </Animated.View>
          <Animated.View style={[styles.createBoxContainer, {bottom: this.state.bottom}]}>
            <View style={[styles.createBox, this.props.style]} ref="contentWrapper"
                  onLayout={this.measureContentHeight.bind(this)}>
              {this.props.content}
            </View>
          </Animated.View>
        </View>
      </Overlay>
    )
  }
}

const styles = {
  overlayWrapper: {
    flex: 1,
    width: deviceWidth,
  },
  overlay: {
    backgroundColor: 'black',
    height: deviceHeight,
    alignItems: 'center',
  },
  createBoxContainer: {
    position: 'absolute',
    width: deviceWidth,
    alignItems: 'center',
  },
  createBox: {
    flex: 1,
    width: deviceWidth * .95,
    backgroundColor: bottomSideMenu.background,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    padding: 10,
  }
};


SidePanel.propTypes = {
  isVisible: React.PropTypes.bool,
  content: React.PropTypes.node,
  onClickOverlay: React.PropTypes.func
};


module.exports = SidePanel;