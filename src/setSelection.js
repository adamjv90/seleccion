'use strict';

var canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

var getSelection = require('./getSelection');
var rangeToTextRange = require('./rangeToTextRange');
var setSelection;

if (canUseDOM) {
  var doc = global.document;

  setSelection = function (p) {
    if (doc.createRange) {
      modernSelection();
    } else {
      oldSelection();
    }

    function modernSelection () {
      var sel = getSelection();
      var range = doc.createRange();
      if (!p.startContainer) {
        return;
      }
      if (p.endContainer) {
        range.setEnd(p.endContainer, p.endOffset);
      } else {
        range.setEnd(p.startContainer, p.startOffset);
      }
      range.setStart(p.startContainer, p.startOffset);
      sel.removeAllRanges();
      sel.addRange(range);
    }

    function oldSelection () {
      rangeToTextRange(p).select();
    }
  }
}

module.exports = setSelection;
