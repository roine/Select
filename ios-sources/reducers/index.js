const {combineReducers} = require('redux');
const {REQUEST_OPEN, REQUEST_CLOSE, OPEN, CLOSE, UPDATE_CONTENT} = require('./../actions');

const sidePanelInitialState = {
  status: CLOSE,
  injected: null
};

function sidePanel(state = sidePanelInitialState, action) {
  if (action.type === REQUEST_CLOSE && OPEN) {

    return {
      ...state,
      status: CLOSE
    };
  }
  else if (action.type === REQUEST_OPEN && CLOSE) {
    return {
      ...state,
      status: OPEN,
      injected: action.injected,
      closeOnClickOverlay: action.closeOnClickOverlay,
      height: action.height,
    }
  }
  else if (action.type === UPDATE_CONTENT) {
    return {
      ...state,
      injected: action.injected
    }
  }
  return state;
}

var rootReducer = combineReducers({
  sidePanel
});

module.exports = rootReducer;
