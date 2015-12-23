var { createStore, applyMiddleware } = require('redux');
var thunk = require('redux-thunk');
var reducer = require('./../reducers');
var createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);


let store = function configureStore(initialState) {
  return createStoreWithMiddleware(reducer, initialState);
};

module.exports = store;