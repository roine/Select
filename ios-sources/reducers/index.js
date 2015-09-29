const {combineReducers} = require('redux');
const {REQUEST_OPEN, REQUEST_CLOSE, OPEN, CLOSE} = require('./../actions');

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
      injected: action.injected
    }
  }
  return state;
}

var rootReducer = combineReducers({
  sidePanel
});

module.exports = rootReducer;
