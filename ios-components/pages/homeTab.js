const React = require('react-native');
const {Icon} = require('react-native-icons');
const {home, bottomSide} = require('./../../shared/colors');

var {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  AsyncStorage,
  TouchableOpacity
  } = React;
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

const ICON_SIZE = 80;
const NO_CONTENT_FONT_COLOR = home.noContent.font;
const NO_CONTENT_BACKGROUND_COLOR = home.noContent.background;

class HomeTab extends React.Component {
  componentWillMount() {
    this.criterias = [];
  }

  renderCriteria() {
    return (
      <ScrollView style={{width: deviceWidth}}>
        <Text>Home</Text>
      </ScrollView>
    );
  }

  openCreateCriteriaBox() {
    console.log('created')
  }

  renderNoCriteria() {
    return (
      <View style={styles.noCriteriaContainer}>
        <Icon name="ion|sad-outline"
              size={ICON_SIZE}
              color={NO_CONTENT_FONT_COLOR}
              style={{width: ICON_SIZE, height: ICON_SIZE}}></Icon>
        <Text style={styles.noCriteriaText}>You did not set any criteria yet!</Text>
        <TouchableOpacity style={styles.buttonCreate}
                          onPress={this.openCreateCriteriaBox.bind(this)}>
          <Text style={styles.buttonCreateText}>Add a new Criteria</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.tabView}>
        {this.criterias.length ? this.renderCriteria() : this.renderNoCriteria()}
      </View>
    )
  }
}

var styles = StyleSheet.create({
  tabView: {
    alignItems: 'center',
  },
  noCriteriaContainer: {
    backgroundColor: NO_CONTENT_BACKGROUND_COLOR,
    height: deviceHeight,
    alignItems: 'center',
    paddingTop: deviceHeight * .1,
    width: deviceWidth,
  },
  noCriteriaText: {
    color: NO_CONTENT_FONT_COLOR,
    fontSize: 18,
    marginTop: deviceHeight * .1,
    fontFamily: 'Roboto',
    fontWeight: '100',
    fontStyle: 'italic'
  },
  buttonCreate: {
    marginTop: deviceHeight * .2,
    backgroundColor: NO_CONTENT_FONT_COLOR,
    width: deviceWidth * .8,
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5
  },
  buttonCreateText: {
    fontSize: 18,
    color: NO_CONTENT_BACKGROUND_COLOR
  }
});


module.exports = HomeTab;