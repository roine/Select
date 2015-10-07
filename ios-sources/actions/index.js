const SIDE_PANEL_OPEN = 'REQUEST_OPEN';
const SIDE_PANEL_CLOSE = 'REQUEST_CLOSE';
const SIDE_PANEL_UPDATE = 'UPDATE_CONTENT';
const OPEN = 'OPEN';
const CLOSE = 'CLOSE';

let requestOpen = () => ({ type: REQUEST_OPEN });
let requestClose = () => ({ type: REQUEST_CLOSE });
let updateContent = () => ({ type: UPDATE_CONTENT })
module.exports = {
  SIDE_PANEL_OPEN,
  SIDE_PANEL_CLOSE,
  SIDE_PANEL_UPDATE,
  OPEN,
  CLOSE,
  requestOpen,
  requestClose,
  updateContent
};