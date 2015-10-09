const Color = require('color');

var mainColor = '#7CDFA6';

module.exports = {
  tabBar: {
    inactive: '#727272',
    active: Color(mainColor).light() ? '#000000' : '#ffffff',
    background: mainColor
  },
  home: {
    noContent: {
      font: Color(mainColor).luminosity() < 0.6 ? '#ffffff' : Color(mainColor).darken(0.8).rgbString(),
      background: Color(mainColor).luminosity() < 0.6 ? Color(mainColor).darken(0.45).rgbString() : Color(mainColor).darken(0.3).rgbString()
    }
  },
  bottomSideMenu: {
    background: '#ffffff'
  },
  addButton: Color(mainColor).darken(.4).rgbString()
};