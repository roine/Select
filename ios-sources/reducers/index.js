const {combineReducers} = require('redux');
const {SIDE_PANEL_OPEN, SIDE_PANEL_CLOSE, OPEN, CLOSE, SIDE_PANEL_UPDATE, FETCH_CRITERIA} = require('./../actions');

const sidePanelInitialState = {
  status: CLOSE,
  injected: null
};

function sidePanel(state = sidePanelInitialState, action) {
  if (action.type === SIDE_PANEL_CLOSE && OPEN) {

    return {
      ...state,
      status: CLOSE
    };
  }
  else if (action.type === SIDE_PANEL_OPEN && CLOSE) {
    return {
      ...state,
      status: OPEN,
      injected: action.injected,
      closeOnClickOverlay: action.closeOnClickOverlay,
      height: action.height,
    }
  }
  else if (action.type === SIDE_PANEL_UPDATE) {
    return {
      ...state,
      injected: action.injected
    }
  }
  return state;
}
let dataState = {
  criteria: null
};

var rootReducer = combineReducers({
  sidePanel,
  //fetchData
});
//
module.exports = rootReducer;
