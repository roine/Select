var React = require('react-native');
var {Icon} = require('react-native-icons')
var {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions
  } = React;

var deviceWidth = Dimensions.get('window').width;
class HomeTab extends React.Component {
  render(){
    return (
      <View>
        <ScrollView style={styles.tabView}>
          <Text>Home</Text>
        </ScrollView>
        <Icon
          name='ion|beer'
          size={50}
          color='black'
          style={{width:100, height:100}}
          />
      </View>
    )
  }
}

var styles = StyleSheet.create({
  tabView: {
    width: deviceWidth
  }
});



module.exports = HomeTab;