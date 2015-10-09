const React = require('react-native');
const {addButton} = require('./../../shared/colors')
const {
  Component,
  View,
  Text,
  TouchableOpacity
  } =  React;

class Button extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} activeOpacity={.6}>
        <Icon
          name="ion|record"
          size={56}
          color={addButton}
          style={{width: 56, height: 56, alignItems: 'center'}}
          >
          <Icon
            name='ion|android-add'
            size={24}
            color='white'
            style={{width: 24, height: 24, flex: 1, backgroundColor:'transparent'}}
            />
        </Icon>
      </TouchableOpacity>
    )
  }
}

Button.propTypes = {
  onPress: React.PropTypes.func
};

Button.defaultProps = {
  onPress: function () {
  }
};

module.exports = Button;