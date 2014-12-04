'use strict';

var signals = require('signals');

function MouseWheel(speed) {
  speed = speed || 2;

  var onUpdate = new signals.Signal();
  var onUp = new signals.Signal();
  var onDown = new signals.Signal();

  function add() {
    if ('onmousewheel' in window) {
      window.onmousewheel = mouseWheelHandler;
    } else if (window.addEventListener) {
      window.addEventListener('DOMMouseScroll', mouseWheelHandler, false);
    }
  }

  function remove() {
    if ('onmousewheel' in window) {
      window.onmousewheel = null;
    } else if (window.removeEventListener) {
      window.removeEventListener('DOMMouseScroll', mouseWheelHandler, false);
    }
  }

  function mouseWheelHandler(event) {
    if (!event) { event = window.event; }
    // event.preventDefault();

    var direction = (event.detail < 0 || event.wheelDelta > 0) ? 1 : -1;
    var delta = direction * speed;

    if (direction > 0) {
      onUp.dispatch(delta);
    } else {
      onDown.dispatch(delta);
    }

    onUpdate.dispatch(delta);
  }

  add();

  return Object.freeze({
    'add': add,
    'remove': remove,
    'onUpdate': onUpdate,
    'onUp': onUp,
    'onDown': onDown
  });
}

if (typeof module === 'object' && module.exports) {
  module.exports = MouseWheel;
}
