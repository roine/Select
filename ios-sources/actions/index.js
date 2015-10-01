const REQUEST_OPEN = 'REQUEST_OPEN';
const REQUEST_CLOSE = 'REQUEST_CLOSE';
const OPEN = 'OPEN';
const CLOSE = 'CLOSE';
const UPDATE_CONTENT = 'UPDATE_CONTENT';

let requestOpen = () => ({ type: REQUEST_OPEN });
let requestClose = () => ({ type: REQUEST_CLOSE });
let updateContent = () => ({ type: UPDATE_CONTENT })
module.exports = {
  REQUEST_OPEN,
  REQUEST_CLOSE,
  OPEN,
  CLOSE,
  UPDATE_CONTENT,
  requestOpen,
  requestClose,
  updateContent
};