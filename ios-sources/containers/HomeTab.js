const React = require('react-native');
const {Icon} = require('react-native-icons');
const {connect} = require('react-redux/native');
const {createStore} = require('redux');

const {home, bottomSide} = require('./../../shared/colors');
const {SIDE_PANEL_OPEN, SIDE_PANEL_CLOSE, SIDE_PANEL_UPDATE} = require('./../actions');
const {capitalize} = require('./../../shared/helpers');

// DB
const {DB} = require('./../../shared/database-wrapper');

const {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  AsyncStorage,
  TouchableOpacity,
  TextInput
  } = React;

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const ICON_SIZE = 80;
const NO_CONTENT_FONT_COLOR = home.noContent.font;
const NO_CONTENT_BACKGROUND_COLOR = home.noContent.background;
const INPUT_HEIGHT = 40;

const fixture = [
  {
    name: 'dsfdsgdfhjfgerwfrdghjfdsa dfgh dfghj fdgh agf'
  },
  {
    name: 'Mobile'
  },{
    name: 'Projector'
  },{
    name: 'Bicycle'
  },{
    name: 'Printer'
  },{
    name: 'Place where we could settle'
  },{
    name: 'Diamond ring'
  },
]

class HomeTab extends React.Component {

  constructor() {
    super();
    this.state = {
      text: '',
      criteria: []
    }
  }


  componentWillMount() {
    this.loadCriteria();
  }

  async loadCriteria() {
    const criterion = new DB().model('criteria');
    let criteria = await criterion.all();
    if (criteria) {
      criteria = [...criteria, ...fixture]
      this.setState({ criteria });
    }
  }

  openCreateCriteriaBox() {
    this.props.dispatch({
      type: SIDE_PANEL_OPEN,
      injected: this.renderCriteriaContent(),
      closeOnClickOverlay: true,
      height: INPUT_HEIGHT
    });
  }

  updateCriteriaBoxContent() {
    this.props.dispatch({
      type: SIDE_PANEL_UPDATE,
      injected: this.renderCriteriaContent()
    });
  }

  saveCriteriaAndCloseBox() {
    this.props.dispatch({
      type: SIDE_PANEL_CLOSE
    });

    // do some saving
    this.setState({ text: '' });

  }

  renderCriteriaContent() {
    return (
      <View>
        <TextInput
          style={{ height: INPUT_HEIGHT, borderColor: NO_CONTENT_BACKGROUND_COLOR, borderWidth: 1, paddingLeft: 10 }}
          onChangeText={(text => this.setState({text})).bind(this)}
          value={this.state.text}
          returnKeyType="done"
          placeholder="Add a new Criteria"
          clearButtonMode="always"
          onEndEditing={this.saveCriteriaAndCloseBox.bind(this)}
          />
      </View>
    );
  }

  renderNoCriteria() {
    return (
      <View style={styles.noCriteriaContainer}>
        <Icon name="ion|sad-outline"
              size={ICON_SIZE}
              color={NO_CONTENT_FONT_COLOR}
              style={{width: ICON_SIZE, height: ICON_SIZE}}></Icon>
        <Text style={styles.noCriteriaText}>You did not set any criteria yet!</Text>
        <TouchableOpacity onPress={this.openCreateCriteriaBox.bind(this)} style={styles.buttonCreate}>
          <View >
            <Text style={styles.buttonCreateText}>Add a new Criteria</Text>
          </View>

        </TouchableOpacity>

      </View>
    )
  }

  renderCriteria() {
    return (
      <ScrollView style={styles.criteriaScrollView} automaticallyAdjustContentInsets={false}>
        {this.state.criteria.map((criterion, key)=> {
          return (
            <TouchableOpacity key={key}>
              <View style={[styles.criterionView, key === 0 && styles.criterionViewFirstChild]}>
                <View style={styles.criterionIconWrapper}>
                  <Icon
                    name="ion|ios-circle-outline"
                    size={40}
                    color="#333"
                    style={{width: 40, height: 40, alignItems: 'center'}}
                    >
                    <Icon
                      name='ion|flash'
                      size={20}
                      color='#333333'
                      style={{width: 20, height: 20, flex: 1, backgroundColor:'transparent'}}
                      />
                  </Icon>
                </View>
                <View style={styles.criterionTextWrapper}>
                  <Text style={styles.criterionText} numberOfLines={1}>{capitalize(criterion.name)}</Text>
                  <Text style={{fontSize: 13, color: '#333', marginTop: 2}}>X criteria</Text>
                </View>

              </View>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    );
  }

  render() {
    this.updateCriteriaBoxContent();
    return (
      <View style={styles.tabView}>
        {this.state.criteria.length ? this.renderCriteria() : this.renderNoCriteria()}
      </View>
    )
  }
}

var styles = StyleSheet.create({
  tabView: {
    alignItems: 'center',
    backgroundColor: 'transparent'
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
  },

  // has criteria
  criteriaScrollView: {
    flex: 1,
    width: deviceWidth,
    marginTop: 8,
  },
  criterionViewFirstChild:{
    borderColor:'transparent',
  },
  criterionView: {
    height: 72,
    paddingLeft: 16,
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  criterionIconWrapper: {
    width: 56,
    flexDirection: 'row',
    alignItems: 'center',
  },
  criterionIcon: {
    width: 30,
    height: 30,

  },
  criterionTextWrapper: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
    justifyContent: 'center',
    paddingRight: 16
  },
  criterionText: {
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: '400',
  }
});

HomeTab.propTypes = {
  onRequestModule: React.PropTypes.func
};


module.exports = connect(() => ({}))(HomeTab);