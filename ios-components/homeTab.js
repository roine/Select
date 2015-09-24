var React = require('react-native');
var {deviceWidth, deviceHeight} = require('Dimensions');

var {
  ScrollView,
  Text,
  StyleSheet
  } = React;


class HomeTab extends React.Component {
  render(){
    return (
      <ScrollView style={styles.tabView}>
        <Text>Home</Text>
      </ScrollView>
    )
  }
}

var styles = StyleSheet.create({
  tabView: {
    width: deviceWidth,
    backgroundColor:'pink'
  }
});



module.exports = HomeTab;