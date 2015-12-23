const SIDE_PANEL_OPEN = 'REQUEST_OPEN';
const SIDE_PANEL_CLOSE = 'REQUEST_CLOSE';
const SIDE_PANEL_UPDATE = 'UPDATE_CONTENT';
const OPEN = 'OPEN';
const CLOSE = 'CLOSE';

const FETCH_CRITERIA = 'FETCH_CRITERIA';
//const RECE

// @todo: not sure this is useful
let requestOpen = () => ({ type: SIDE_PANEL_OPEN });
let requestClose = () => ({ type: SIDE_PANEL_CLOSE });
let updateContent = () => ({ type: SIDE_PANEL_UPDATE });
let fetchCriteria = () => ({type: FETCH_CRITERIA});

module.exports = {
  SIDE_PANEL_OPEN,
  SIDE_PANEL_CLOSE,
  SIDE_PANEL_UPDATE,
  OPEN,
  CLOSE,
  requestOpen,
  requestClose,
  updateContent,

  FETCH_CRITERIA,
  fetchCriteria
};