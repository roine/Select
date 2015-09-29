const REQUEST_OPEN = 'REQUEST_OPEN';
const REQUEST_CLOSE = 'REQUEST_CLOSE';
const OPEN = 'OPEN';
const CLOSE = 'CLOSE';

let requestOpen = () => ({ type: REQUEST_OPEN, test: 1 });
let requestClose = () => ({ type: REQUEST_CLOSE });
module.exports = {
  REQUEST_OPEN,
  REQUEST_CLOSE,
  OPEN,
  CLOSE,
  requestOpen,
  requestClose,
};