'use strict';

var canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

var getSelection;

if (canUseDOM) {
  var doc = global.document;
  var getSelectionRaw = require('./getSelectionRaw');
  var getSelectionNullOp = require('./getSelectionNullOp');
  var getSelectionSynthetic = require('./getSelectionSynthetic');
  var isHost = require('./isHost');

  if (isHost.method(global, 'getSelection')) {
    getSelection = getSelectionRaw;
  } else if (typeof doc.selection === 'object' && doc.selection) {
    getSelection = getSelectionSynthetic;
  } else {
    getSelection = getSelectionNullOp;
  }
}

module.exports = getSelection;
