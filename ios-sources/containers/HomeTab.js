const React = require('react-native');
const {Icon} = require('react-native-icons');
const {connect} = require('react-redux/native');
const {createStore} = require('redux');

const {home, bottomSide, addButton} = require('./../../shared/colors');
const {SIDE_PANEL_OPEN, SIDE_PANEL_CLOSE, SIDE_PANEL_UPDATE} = require('./../actions');
const {capitalize} = require('./../../shared/helpers');

// DB
const {DB} = require('./../../shared/database-wrapper');
const criterion = new DB().model('criteria');

const {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  AsyncStorage,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableHighlight,
  TextInput,
  Animated
  } = React;

Animated.ScrollView = Animated.createAnimatedComponent(ScrollView);

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const ICON_SIZE = 80;
const NO_CONTENT_FONT_COLOR = home.noContent.font;
const NO_CONTENT_BACKGROUND_COLOR = home.noContent.background;
const INPUT_HEIGHT = 40;

class HomeTab extends React.Component {

  constructor() {
    super();
    this.state = {
      text: '',
      criteria: null,
      noCriteriaOpacity: new Animated.Value(0),
      criteriaOpacity: new Animated.Value(0),
      translateButton: new Animated.Value(-50)
    }
  }

  componentWillMount() {
    this.loadCriteria();
  }

  async loadCriteria() {
    let criteria = await criterion.all();
    if (criteria) {
      this.setState({ criteria });
    }
  }

  openCreateCriteriaBox() {
    this.props.dispatch({
      type: SIDE_PANEL_OPEN,
      injected: this.renderCriteriaAddBoxContent(),
      closeOnClickOverlay: true,
      height: INPUT_HEIGHT
    });
  }

  updateCriteriaBoxContent() {
    this.props.dispatch({
      type: SIDE_PANEL_UPDATE,
      injected: this.renderCriteriaAddBoxContent()
    });
  }

//
  async saveCriteriaAndCloseBox() {
    try {
      var inserted = await criterion.create({ name: this.state.text });
      if(!inserted){
        // @todo: show notification
        return
      }
      var row = await criterion.getLastInsertedRow();
      console.log('row', row)
      this.setState({ criteria: [...row, ...this.state.criteria], text: '' });
      this.props.dispatch({
        type: SIDE_PANEL_CLOSE
      });
    }
    catch (err) {
      console.log('catch', err);
    }
  }

//
  renderCriteriaAddBoxContent() {
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
    if (this.state.noCriteriaOpacity._value === 0) {
      Animated.timing(this.state.noCriteriaOpacity, {
        toValue: 1,
        duration: 300
      }).start();
    }

    return (
      <Animated.View style={[styles.noCriteriaContainer, {opacity: this.state.noCriteriaOpacity}]}>
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
      </Animated.View>
    )
  }

  renderLoading() {
    return (
      <View style={styles.loadingView}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  renderCriteria() {
    if (this.state.criteriaOpacity._value === 0) {
      Animated.timing(this.state.criteriaOpacity, {
        toValue: 1,
        duration: 300
      }).start();
    }

    return (
      <Animated.ScrollView style={[styles.criteriaScrollView, {opacity: this.state.criteriaOpacity}]}
                           automaticallyAdjustContentInsets={false}
                           contentOffset={{x:0, y: 40}}
                           ref={view => {this.scrollView = view}}
                           key={1}>
        <View style={styles.searchRow}>
          <Text>Search</Text>
        </View>
        {this.state.criteria.map((criterion, key)=> {
          return (
            <TouchableOpacity key={key} activeOpacity={.6}>
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
      </Animated.ScrollView>
    );
  }

  render() {
    this.updateCriteriaBoxContent();
    var view;
    if (!this.state.criteria) {
      view = this.renderLoading();
    }
    else if (this.state.criteria && this.state.criteria.length) {
      view = this.renderCriteria();
    }
    else {
      view = this.renderNoCriteria();
    }
    return (
      <View style={styles.tabView}>
        {view}
      </View>
    )
  }
}

var styles = StyleSheet.create({
  tabView: {
    alignItems: 'center',
    backgroundColor: 'transparent',
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

  // maybe has criteria
  loadingView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    width: deviceWidth,
  },
  loadingText: {
    fontSize: 18,
    paddingTop: 0,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#555',
    color: 'white'
  },

  // has definitely criteria
  criteriaScrollView: {
    flex: 1,
    width: deviceWidth,
    paddingTop: 8,
  },
  searchRow: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30
  },
  criterionViewFirstChild: {
    borderColor: 'transparent',
  },
  criterionView: {
    height: 72,
    paddingLeft: 16,
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: '#fff'
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
  },

  circle: {
    position: 'absolute',
    right: 20,
    shadowOffset: {
      height: 2, width: 0
    },
    shadowColor: '#bbb',
    shadowRadius: 1,
    shadowOpacity: 5
  }
});

HomeTab.propTypes = {
  onRequestModule: React.PropTypes.func
};


module.exports = connect(() => ({}))(HomeTab);