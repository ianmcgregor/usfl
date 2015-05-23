'use strict';

var Emitter = require('./Emitter');

function MouseWheel(speed) {
  speed = speed || 2;

  var mouseWheel;

  function add() {
    if ('onmousewheel' in window) {
      window.addEventListener('mousewheel', mouseWheelHandler, false);
    } else if (window.addEventListener) {
      window.addEventListener('DOMMouseScroll', mouseWheelHandler, false);
    }
  }

  function remove() {
    if ('onmousewheel' in window) {
      window.removeEventListener('mousewheel', mouseWheelHandler, false);
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
      mouseWheel.emit('up', delta);
    } else {
      mouseWheel.emit('down', delta);
    }

    mouseWheel.emit('update', delta);
  }

  add();

  mouseWheel = Object.create(Emitter.prototype, {
      _events: { value: {} },
      add: { value: add },
      remove: { value: remove }
  });

  return Object.freeze(mouseWheel);
}

if (typeof module === 'object' && module.exports) {
  module.exports = MouseWheel;
}
