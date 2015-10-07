const React = require('react-native');
const {createStore} = require('redux');
const {Provider} = require('react-redux/native');
const reducers = require('./ios-sources/reducers');
const App = require('./ios-sources/containers/AppContainer')
const configureStore = require('./ios-sources/store/configureStore');

let store = configureStore();
//let store = createStore(reducers);
const {
  AppRegistry,
  Component
  } = React;

class Select extends Component {
  render() {
    return (
      <Provider store={store}>
        {()=> <App/>}
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Select', () => Select);
