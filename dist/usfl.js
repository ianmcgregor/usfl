(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.usfl = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = clone;
function clone(arr) {
    return arr.slice(0);
}

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _clone = require('./clone');

var _clone2 = _interopRequireDefault(_clone);

var _nearest = require('./nearest');

var _nearest2 = _interopRequireDefault(_nearest);

var _randomChoice = require('./randomChoice');

var _randomChoice2 = _interopRequireDefault(_randomChoice);

var _sortNumeric = require('./sortNumeric');

var _sortNumeric2 = _interopRequireDefault(_sortNumeric);

var _sortRandom = require('./sortRandom');

var _sortRandom2 = _interopRequireDefault(_sortRandom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    clone: _clone2.default,
    randomChoice: _randomChoice2.default,
    nearest: _nearest2.default,
    sortNumeric: _sortNumeric2.default,
    sortRandom: _sortRandom2.default
};

},{"./clone":1,"./nearest":3,"./randomChoice":4,"./sortNumeric":5,"./sortRandom":6}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = nearest;
function nearest(value, arr) {
    var least = Number.MAX_VALUE;
    return arr.reduce(function (result, item) {
        var diff = Math.abs(item - value);
        if (diff < least) {
            least = diff;
            result = item;
        }
        return result;
    }, -1);
}

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = randomChoice;
function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = sortNumeric;
function sortNumeric(arr) {
    return arr.sort(function (a, b) {
        return a - b;
    });
}

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = sortRandom;
function sortRandom(arr) {
    return arr.sort(function () {
        return Math.random() > 0.5 ? -1 : 1;
    });
}

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = blockScrolling;
function blockScrolling(value) {
    document.body.style.overflow = value ? 'hidden' : '';
}

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = forceRedraw;
function forceRedraw(el) {
    var display = el.style.display;
    el.style.display = 'none';
    el.offsetHeight;
    el.style.display = display;
}

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getPageHeight;
function getPageHeight() {
    var body = document.body;
    var doc = document.documentElement;

    return Math.max(body.scrollHeight || 0, body.offsetHeight || 0, body.clientHeight || 0, doc.clientHeight || 0, doc.offsetHeight || 0, doc.scrollHeight || 0);
}

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getScrollPercentage;

var _getScrollTop = require('./getScrollTop');

var _getScrollTop2 = _interopRequireDefault(_getScrollTop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getScrollPercentage() {
    return ((0, _getScrollTop2.default)() + window.innerHeight) / document.body.clientHeight;
}

},{"./getScrollTop":12}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getScrollRemaining;

var _getScrollTop = require('./getScrollTop');

var _getScrollTop2 = _interopRequireDefault(_getScrollTop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getScrollRemaining() {
    var b = document.body;
    return Math.abs((0, _getScrollTop2.default)() - (b.scrollHeight - b.clientHeight));
}

},{"./getScrollTop":12}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getScrollTop;
function getScrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop;
}

},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _blockScrolling = require('./blockScrolling');

var _blockScrolling2 = _interopRequireDefault(_blockScrolling);

var _forceRedraw = require('./forceRedraw');

var _forceRedraw2 = _interopRequireDefault(_forceRedraw);

var _getPageHeight = require('./getPageHeight');

var _getPageHeight2 = _interopRequireDefault(_getPageHeight);

var _getScrollPercentage = require('./getScrollPercentage');

var _getScrollPercentage2 = _interopRequireDefault(_getScrollPercentage);

var _getScrollRemaining = require('./getScrollRemaining');

var _getScrollRemaining2 = _interopRequireDefault(_getScrollRemaining);

var _getScrollTop = require('./getScrollTop');

var _getScrollTop2 = _interopRequireDefault(_getScrollTop);

var _isElementInViewport = require('./isElementInViewport');

var _isElementInViewport2 = _interopRequireDefault(_isElementInViewport);

var _isPageEnd = require('./isPageEnd');

var _isPageEnd2 = _interopRequireDefault(_isPageEnd);

var _resize = require('./resize');

var _resize2 = _interopRequireDefault(_resize);

var _scroll = require('./scroll');

var _scroll2 = _interopRequireDefault(_scroll);

var _transitionEnd = require('./transitionEnd');

var _transitionEnd2 = _interopRequireDefault(_transitionEnd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    blockScrolling: _blockScrolling2.default,
    forceRedraw: _forceRedraw2.default,
    getPageHeight: _getPageHeight2.default,
    getScrollPercentage: _getScrollPercentage2.default,
    getScrollRemaining: _getScrollRemaining2.default,
    getScrollTop: _getScrollTop2.default,
    isElementInViewport: _isElementInViewport2.default,
    isPageEnd: _isPageEnd2.default,
    resize: _resize2.default,
    scroll: _scroll2.default,
    transitionEnd: _transitionEnd2.default
};

},{"./blockScrolling":7,"./forceRedraw":8,"./getPageHeight":9,"./getScrollPercentage":10,"./getScrollRemaining":11,"./getScrollTop":12,"./isElementInViewport":14,"./isPageEnd":15,"./resize":16,"./scroll":17,"./transitionEnd":18}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = isElementInViewport;
function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= window.innerHeight && rect.right <= window.innerWidth;
}

},{}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = isPageEnd;

var _getScrollTop = require('./getScrollTop');

var _getScrollTop2 = _interopRequireDefault(_getScrollTop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isPageEnd() {
    var buffer = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

    var b = document.body;
    return Math.abs((0, _getScrollTop2.default)() - (b.scrollHeight - b.clientHeight)) <= buffer;
}

},{"./getScrollTop":12}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = resize;

var _eventBus = require('../events/eventBus');

var _eventBus2 = _interopRequireDefault(_eventBus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function resize() {

    var timeoutId = void 0;

    // orientationchange too?

    window.addEventListener('resize', function () {
        clearTimeout(timeoutId);
        timeoutId = window.setTimeout(function () {
            return _eventBus2.default.emit('resize');
        }, 500);
    });
}

},{"../events/eventBus":20}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = scroll;

var _eventBus = require('../events/eventBus');

var _eventBus2 = _interopRequireDefault(_eventBus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function scroll() {

    var lastScrollY = 0,
        ticking = false,
        timeoutId = void 0;

    function update() {
        clearTimeout(timeoutId);
        timeoutId = window.setTimeout(function () {
            return _eventBus2.default.emit('scrollend', lastScrollY);
        }, 200);

        _eventBus2.default.emit('scroll', lastScrollY);
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(update);
            ticking = true;
        }
    }

    function onScroll() {
        // lastScrollY = window.scrollY;
        lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
        requestTick();
    }

    window.addEventListener('scroll', onScroll, false);
}

},{"../events/eventBus":20}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (el, cb) {
    var timeout = arguments.length <= 2 || arguments[2] === undefined ? 1000 : arguments[2];


    var timeoutId = void 0;

    function handler() {
        window.clearTimeout(timeoutId);
        el.removeEventListener('transitionend', handler);
        el.removeEventListener('webkitTransitionEnd', handler);
        cb();
    }

    if (typeof el.style.transition !== 'undefined') {
        el.addEventListener('transitionend', handler);
    } else if (typeof el.style.WebkitTransition !== 'undefined') {
        el.addEventListener('webkitTransitionEnd', handler);
    }

    timeoutId = window.setTimeout(handler, timeout);
};

},{}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require('events');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var emitter = function (_EventEmitter) {
    _inherits(emitter, _EventEmitter);

    function emitter() {
        _classCallCheck(this, emitter);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(emitter).call(this));

        _this.setMaxListeners(20);
        return _this;
    }

    _createClass(emitter, [{
        key: 'off',
        value: function off(type, listener) {
            if (listener) {
                return this.removeListener(type, listener);
            }
            if (type) {
                return this.removeAllListeners(type);
            }
            return this.removeAllListeners();
        }
    }]);

    return emitter;
}(_events.EventEmitter);

exports.default = emitter;

},{"events":22}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _emitter = require('./emitter');

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = Object.create(_emitter2.default.prototype);

},{"./emitter":19}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('./polyfill');

var _array = require('./array');

var _array2 = _interopRequireDefault(_array);

var _dom = require('./dom');

var _dom2 = _interopRequireDefault(_dom);

var _string = require('./string');

var _string2 = _interopRequireDefault(_string);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import TouchInput from './TouchInput';
// import track from './track';
// import urlParams from './urlParams';
// import VideoPlayer from './VideoPlayer';
// import Viewport from './viewport';
// import visibility from './visibility';

exports.default = {
    array: _array2.default,
    dom: _dom2.default,
    string: _string2.default
};
// import AssetLoader from './AssetLoader';
// import CuepointsReader from './CuepointsReader';
// import device from './device';
// import emitter from './emitter';
// import Facebook from './Facebook';
// import Flash from './Flash';
// import FPS from './Fps';
// import fullscreen from './fullscreen';
// import Graphics from './Graphics';
// import InputCoords from './InputCoords';
// import keyboard from './keyboard';
// import KeyInput from './KeyInput';
// import LinkedList from './LinkedList';
// import math from './math';
// import modern from './modern';
// import MouseWheel from './MouseWheel';
// import ObjectPool from './ObjectPool';
// import platform from './platform';
// import popup from './popup';
// import ready from './ready';
// import resize from './resize';
// import share from './share';
// import storage from './storage';

},{"./array":2,"./dom":13,"./polyfill":25,"./string":40}],22:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],23:[function(require,module,exports){
'use strict';

/*
 * classList (partial polyfill for IE 10, IE 11 and Firefox <24)
 * adapted from: https://github.com/eligrey/classList.js/blob/master/classList.js
 */

(function () {

    var testElement = document.createElement('_');

    testElement.classList.add('c1', 'c2');

    // Polyfill for IE 10/11 and Firefox <26, where classList.add and
    // classList.remove exist but support only one argument at a time.
    if (!testElement.classList.contains('c2')) {
        var createMethod = function createMethod(method) {
            var original = window.DOMTokenList.prototype[method];

            window.DOMTokenList.prototype[method] = function (token) {
                var i = void 0;
                var len = arguments.length;

                for (i = 0; i < len; i++) {
                    token = arguments[i];
                    original.call(this, token);
                }
            };
        };

        createMethod('add');
        createMethod('remove');
    }

    testElement.classList.toggle('c3', false);

    // Polyfill for IE 10, IE 11 and Firefox <24, where classList.toggle does not
    // support the second argument.
    if (testElement.classList.contains('c3')) {
        (function () {
            var toggle = window.DOMTokenList.prototype.toggle;

            window.DOMTokenList.prototype.toggle = function (token, force) {
                force = !!force;
                if (arguments.length > 1 && this.contains(token) === force) {
                    return force;
                } else {
                    return toggle.call(this, token);
                }
            };
        })();
    }

    testElement = null;
})();

},{}],24:[function(require,module,exports){
'use strict';

(function (fn) {
    window.console = window.console || {};
    var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'memory', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'timeline', 'timelineEnd', 'trace', 'warn'];
    methods.forEach(function (name) {
        window.console[name] = window.console[name] || fn;
    });
})(function () {});

},{}],25:[function(require,module,exports){
'use strict';

require('./classList');

require('./console');

require('./requestAnimationFrame');

},{"./classList":23,"./console":24,"./requestAnimationFrame":26}],26:[function(require,module,exports){
'use strict';

/*
 * requestAnimationFrame (ios6 and android < 4.4)
 */

(function () {
    if (!window.requestAnimationFrame) {
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
        }
    }
})();

},{}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = afterFirst;
// everything after the first occurrence of substr in str
function afterFirst(str, substr) {
    var index = str.indexOf(substr);
    if (index === -1) {
        return '';
    }
    index += substr.length;
    return str.slice(index);
}

},{}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = afterLast;
// everything after the last occurence of substr in str
function afterLast(str, substr) {
    var index = str.lastIndexOf(substr);
    if (index === -1) {
        return '';
    }
    index += substr.length;
    return str.slice(index);
}

},{}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = beforeFirst;
// everything before the first occurrence of substr in str
function beforeFirst(str, substr) {
    var index = str.indexOf(substr);
    if (index === -1) {
        return '';
    }
    return str.slice(0, index);
}

},{}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = beforeLast;
// everything before the last occurrence of substr in the string.
function beforeLast(str, substr) {
    var index = str.lastIndexOf(substr);
    if (index === -1) {
        return '';
    }
    return str.slice(0, index);
}

},{}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = beginsWith;
// whether str begins with substr
function beginsWith(str, substr) {
    return str.indexOf(substr) === 0;
}

},{}],32:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = between;
// everything after the first occurance of start and before the first occurrence of end
function between(str, start, end) {
    var substr = '';
    var startIndex = str.indexOf(start);
    if (startIndex !== -1) {
        startIndex += start.length;
        var endIndex = str.indexOf(end, startIndex);
        if (endIndex !== -1) {
            substr = str.slice(startIndex, endIndex);
        }
    }
    return substr;
}

},{}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = block;

var _escapePattern = require('./escapePattern');

var _escapePattern2 = _interopRequireDefault(_escapePattern);

var _truncate = require('./truncate');

var _truncate2 = _interopRequireDefault(_truncate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Utility method that intelligently breaks up your string,
// allowing you to create blocks of readable text.
// This method returns you the closest possible match to the delim paramater,
// while keeping the text length within the len paramter.
// If a match can't be found in your specified length an  '...' is added to that block,
// and the blocking continues untill all the text is broken apart.
function block(str, len) {
    var delim = arguments.length <= 2 || arguments[2] === undefined ? '.' : arguments[2];

    var arr = [];

    if (!str || !str.includes(delim)) {
        return arr;
    }

    if (delim === ' ') {
        str += delim;
    }

    var chrIndex = 0;
    var replPatt = new RegExp('[^' + (0, _escapePattern2.default)(delim) + ']+$');

    while (chrIndex < str.length) {
        var subString = str.substr(chrIndex, len);
        if (!subString.includes(delim)) {
            arr.push((0, _truncate2.default)(subString, subString.length));
            chrIndex += subString.length;
        }
        subString = subString.replace(replPatt, '');
        chrIndex += subString.length;
        arr.push(subString.trim());
    }
    return arr;
}

},{"./escapePattern":38,"./truncate":53}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = capitalize;
// Capitalize the first word in a string or all words
function capitalize(str) {
    var all = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

    var substr = str.trimLeft();
    var re = all ? /^.|\b./g : /(^\w)/;
    return substr.replace(re, function (match) {
        return match.toUpperCase();
    });
}

},{}],35:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = countOf;

var _escapePattern = require('./escapePattern');

var _escapePattern2 = _interopRequireDefault(_escapePattern);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// the number of times substr appears within str
function countOf(str, substr, caseSensitive) {
    var escapedStr = (0, _escapePattern2.default)(substr);
    var flags = !caseSensitive ? 'ig' : 'g';
    return str.match(new RegExp(escapedStr, flags)).length;
}

},{"./escapePattern":38}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = editDistance;
// Levenshtein distance (editDistance) is a measure of the similarity between
// two strings. The distance is the number of deletions, insertions, or
// substitutions required to transform source into target.
function editDistance() {
    var source = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
    var target = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];


    if (source === target) {
        return 0;
    }

    if (!source.length) {
        return target.length;
    }

    if (!target.length) {
        return source.length;
    }

    var d = [];
    var i = void 0,
        j = void 0,
        cost = void 0;

    for (i = 0; i <= source.length; i++) {
        d[i] = [];
    }
    for (i = 0; i <= source.length; i++) {
        d[i][0] = i;
    }
    for (j = 0; j <= target.length; j++) {
        d[0][j] = j;
    }

    for (i = 1; i <= source.length; i++) {

        var si = source.charAt(i - 1);
        for (j = 1; j <= target.length; j++) {

            var tj = target.charAt(j - 1);

            if (si === tj) {
                cost = 0;
            } else {
                cost = 1;
            }

            d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
        }
    }

    return d[source.length][target.length];
}

},{}],37:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = endsWith;
// whether str ends with substr
function endsWith(str, substr) {
    return str.lastIndexOf(substr) === str.length - substr.length;
}

},{}],38:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = escapePattern;
// regex escape pattern
function escapePattern(pattern) {
    return pattern.replace(/(\]|\[|\{|\}|\(|\)|\*|\+|\?|\.|\\)/g, '\\$1');
}

},{}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = hasText;

var _removeExtraWhitespace = require('./removeExtraWhitespace');

var _removeExtraWhitespace2 = _interopRequireDefault(_removeExtraWhitespace);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// whether str contains any text
function hasText(str) {
    return !!(0, _removeExtraWhitespace2.default)(str).length;
}

},{"./removeExtraWhitespace":46}],40:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _afterFirst = require('./afterFirst');

var _afterFirst2 = _interopRequireDefault(_afterFirst);

var _afterLast = require('./afterLast');

var _afterLast2 = _interopRequireDefault(_afterLast);

var _beforeFirst = require('./beforeFirst');

var _beforeFirst2 = _interopRequireDefault(_beforeFirst);

var _beforeLast = require('./beforeLast');

var _beforeLast2 = _interopRequireDefault(_beforeLast);

var _beginsWith = require('./beginsWith');

var _beginsWith2 = _interopRequireDefault(_beginsWith);

var _between = require('./between');

var _between2 = _interopRequireDefault(_between);

var _block = require('./block');

var _block2 = _interopRequireDefault(_block);

var _capitalize = require('./capitalize');

var _capitalize2 = _interopRequireDefault(_capitalize);

var _countOf = require('./countOf');

var _countOf2 = _interopRequireDefault(_countOf);

var _editDistance = require('./editDistance');

var _editDistance2 = _interopRequireDefault(_editDistance);

var _endsWith = require('./endsWith');

var _endsWith2 = _interopRequireDefault(_endsWith);

var _escapePattern = require('./escapePattern');

var _escapePattern2 = _interopRequireDefault(_escapePattern);

var _hasText = require('./hasText');

var _hasText2 = _interopRequireDefault(_hasText);

var _isNumeric = require('./isNumeric');

var _isNumeric2 = _interopRequireDefault(_isNumeric);

var _padLeft = require('./padLeft');

var _padLeft2 = _interopRequireDefault(_padLeft);

var _padRight = require('./padRight');

var _padRight2 = _interopRequireDefault(_padRight);

var _properCase = require('./properCase');

var _properCase2 = _interopRequireDefault(_properCase);

var _remove = require('./remove');

var _remove2 = _interopRequireDefault(_remove);

var _removeExtraWhitespace = require('./removeExtraWhitespace');

var _removeExtraWhitespace2 = _interopRequireDefault(_removeExtraWhitespace);

var _reverse = require('./reverse');

var _reverse2 = _interopRequireDefault(_reverse);

var _reverseWords = require('./reverseWords');

var _reverseWords2 = _interopRequireDefault(_reverseWords);

var _similarity = require('./similarity');

var _similarity2 = _interopRequireDefault(_similarity);

var _stripTags = require('./stripTags');

var _stripTags2 = _interopRequireDefault(_stripTags);

var _swapCase = require('./swapCase');

var _swapCase2 = _interopRequireDefault(_swapCase);

var _timeCode = require('./timeCode');

var _timeCode2 = _interopRequireDefault(_timeCode);

var _truncate = require('./truncate');

var _truncate2 = _interopRequireDefault(_truncate);

var _wordCount = require('./wordCount');

var _wordCount2 = _interopRequireDefault(_wordCount);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    afterFirst: _afterFirst2.default,
    afterLast: _afterLast2.default,
    beforeFirst: _beforeFirst2.default,
    beforeLast: _beforeLast2.default,
    beginsWith: _beginsWith2.default,
    between: _between2.default,
    block: _block2.default,
    capitalize: _capitalize2.default,
    countOf: _countOf2.default,
    editDistance: _editDistance2.default,
    endsWith: _endsWith2.default,
    escapePattern: _escapePattern2.default,
    hasText: _hasText2.default,
    isNumeric: _isNumeric2.default,
    padLeft: _padLeft2.default,
    padRight: _padRight2.default,
    properCase: _properCase2.default,
    remove: _remove2.default,
    removeExtraWhitespace: _removeExtraWhitespace2.default,
    reverse: _reverse2.default,
    reverseWords: _reverseWords2.default,
    similarity: _similarity2.default,
    stripTags: _stripTags2.default,
    swapCase: _swapCase2.default,
    timeCode: _timeCode2.default,
    truncate: _truncate2.default,
    wordCount: _wordCount2.default
};

},{"./afterFirst":27,"./afterLast":28,"./beforeFirst":29,"./beforeLast":30,"./beginsWith":31,"./between":32,"./block":33,"./capitalize":34,"./countOf":35,"./editDistance":36,"./endsWith":37,"./escapePattern":38,"./hasText":39,"./isNumeric":41,"./padLeft":42,"./padRight":43,"./properCase":44,"./remove":45,"./removeExtraWhitespace":46,"./reverse":47,"./reverseWords":48,"./similarity":49,"./stripTags":50,"./swapCase":51,"./timeCode":52,"./truncate":53,"./wordCount":54}],41:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = isNumeric;
// whether str is numeric
function isNumeric(str) {
    var regx = /^[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?$/;
    return regx.test(str);
}

},{}],42:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = padLeft;
// pad str with substr from the left
function padLeft(str, substr, length) {
    while (str.length < length) {
        str = substr + str;
    }
    return str;
}

},{}],43:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = padRight;
// pads str with substr from the right
function padRight(str, substr, length) {
    while (str.length < length) {
        str += substr;
    }
    return str;
}

},{}],44:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = properCase;

var _capitalize = require('./capitalize');

var _capitalize2 = _interopRequireDefault(_capitalize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// proper case str in sentence format
function properCase(str) {
    var newStr = str.toLowerCase().replace(/\b([^.?;!]+)/, _capitalize2.default);
    return newStr.replace(/\b[i]\b/, 'I');
}

},{"./capitalize":34}],45:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = remove;

var _escapePattern = require('./escapePattern');

var _escapePattern2 = _interopRequireDefault(_escapePattern);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// remove all instances of substr in str
function remove(str, substr) {
    var caseSensitive = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

    var escapedStr = (0, _escapePattern2.default)(substr);
    var flags = caseSensitive ? 'g' : 'ig';
    return str.replace(new RegExp(escapedStr, flags), '');
}

},{"./escapePattern":38}],46:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = removeExtraWhitespace;
// remove extra whitespace (extra spaces, tabs, line breaks, etc)
function removeExtraWhitespace(str) {
    return str.trim().replace(/\s+/g, ' ');
}

},{}],47:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = reverse;
// reverse character order
function reverse(str) {
    return str.split('').reverse().join('');
}

},{}],48:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = reverseWords;
// reverse word order
function reverseWords(str) {
    return str.split(' ').reverse().join(' ');
}

},{}],49:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = similarity;

var _editDistance = require('./editDistance');

var _editDistance2 = _interopRequireDefault(_editDistance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// percentage of similiarity from 0 to 1
function similarity(a, b) {
    var e = (0, _editDistance2.default)(a, b);
    var m = Math.max(a.length, b.length);
    if (m === 0) {
        return 1;
    }
    return 1 - e / m;
}

},{"./editDistance":36}],50:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = stripTags;
// remove all HTML tags from str
function stripTags(str) {
    return str.replace(/<\/?[^>]+>/igm, '');
}

},{}],51:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = swapCase;

// swaps the case of str
function swapCase(str) {
    return str.replace(/(\w)/, function (newStr) {
        var lower = newStr.toLowerCase();
        var upper = newStr.toUpperCase();
        switch (newStr) {
            case lower:
                return upper;
            case upper:
                return lower;
            default:
                return newStr;
        }
    });
}

},{}],52:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = timeCode;
// formats seconds into HH:MM:SS
function timeCode(seconds) {
    var delim = arguments.length <= 1 || arguments[1] === undefined ? ':' : arguments[1];

    var h = Math.floor(seconds / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 3600 % 60);
    var hr = (h < 10 ? '0' + h : h) + delim;
    var mn = (m < 10 ? '0' + m : m) + delim;
    var sc = s < 10 ? '0' + s : s;
    return hr + mn + sc;
}

},{}],53:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = truncate;
// truncate to length with suffix
function truncate(str, len) {
    var suffix = arguments.length <= 2 || arguments[2] === undefined ? '...' : arguments[2];

    len -= suffix.length;
    var trunc = str;
    if (trunc.length > len) {
        trunc = trunc.substr(0, len);
        var r = /[^\s]/;
        if (r.test(str.charAt(len))) {
            trunc = trunc.replace(/\w+$|\s+$/, '').trimRight();
        }
        trunc += suffix;
    }
    return trunc;
}

},{}],54:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = wordCount;
// the number of words in a string
function wordCount(str) {
    return str.match(/\b\w+\b/g).length;
}

},{}]},{},[21])(21)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcnJheS9jbG9uZS5qcyIsImFycmF5L2luZGV4LmpzIiwiYXJyYXkvbmVhcmVzdC5qcyIsImFycmF5L3JhbmRvbUNob2ljZS5qcyIsImFycmF5L3NvcnROdW1lcmljLmpzIiwiYXJyYXkvc29ydFJhbmRvbS5qcyIsImRvbS9ibG9ja1Njcm9sbGluZy5qcyIsImRvbS9mb3JjZVJlZHJhdy5qcyIsImRvbS9nZXRQYWdlSGVpZ2h0LmpzIiwiZG9tL2dldFNjcm9sbFBlcmNlbnRhZ2UuanMiLCJkb20vZ2V0U2Nyb2xsUmVtYWluaW5nLmpzIiwiZG9tL2dldFNjcm9sbFRvcC5qcyIsImRvbS9pbmRleC5qcyIsImRvbS9pc0VsZW1lbnRJblZpZXdwb3J0LmpzIiwiZG9tL2lzUGFnZUVuZC5qcyIsImRvbS9yZXNpemUuanMiLCJkb20vc2Nyb2xsLmpzIiwiZG9tL3RyYW5zaXRpb25FbmQuanMiLCJldmVudHMvZW1pdHRlci5qcyIsImV2ZW50cy9ldmVudEJ1cy5qcyIsImluZGV4LmpzIiwibm9kZV9tb2R1bGVzL2V2ZW50cy9ldmVudHMuanMiLCJwb2x5ZmlsbC9jbGFzc0xpc3QuanMiLCJwb2x5ZmlsbC9jb25zb2xlLmpzIiwicG9seWZpbGwvaW5kZXguanMiLCJwb2x5ZmlsbC9yZXF1ZXN0QW5pbWF0aW9uRnJhbWUuanMiLCJzdHJpbmcvYWZ0ZXJGaXJzdC5qcyIsInN0cmluZy9hZnRlckxhc3QuanMiLCJzdHJpbmcvYmVmb3JlRmlyc3QuanMiLCJzdHJpbmcvYmVmb3JlTGFzdC5qcyIsInN0cmluZy9iZWdpbnNXaXRoLmpzIiwic3RyaW5nL2JldHdlZW4uanMiLCJzdHJpbmcvYmxvY2suanMiLCJzdHJpbmcvY2FwaXRhbGl6ZS5qcyIsInN0cmluZy9jb3VudE9mLmpzIiwic3RyaW5nL2VkaXREaXN0YW5jZS5qcyIsInN0cmluZy9lbmRzV2l0aC5qcyIsInN0cmluZy9lc2NhcGVQYXR0ZXJuLmpzIiwic3RyaW5nL2hhc1RleHQuanMiLCJzdHJpbmcvaW5kZXguanMiLCJzdHJpbmcvaXNOdW1lcmljLmpzIiwic3RyaW5nL3BhZExlZnQuanMiLCJzdHJpbmcvcGFkUmlnaHQuanMiLCJzdHJpbmcvcHJvcGVyQ2FzZS5qcyIsInN0cmluZy9yZW1vdmUuanMiLCJzdHJpbmcvcmVtb3ZlRXh0cmFXaGl0ZXNwYWNlLmpzIiwic3RyaW5nL3JldmVyc2UuanMiLCJzdHJpbmcvcmV2ZXJzZVdvcmRzLmpzIiwic3RyaW5nL3NpbWlsYXJpdHkuanMiLCJzdHJpbmcvc3RyaXBUYWdzLmpzIiwic3RyaW5nL3N3YXBDYXNlLmpzIiwic3RyaW5nL3RpbWVDb2RlLmpzIiwic3RyaW5nL3RydW5jYXRlLmpzIiwic3RyaW5nL3dvcmRDb3VudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O2tCQ0F3QixLO0FBQVQsU0FBUyxLQUFULENBQWUsR0FBZixFQUFvQjtBQUMvQixXQUFPLElBQUksS0FBSixDQUFVLENBQVYsQ0FBUDtBQUNIOzs7Ozs7Ozs7QUNGRDs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7a0JBRWU7QUFDWCwwQkFEVztBQUVYLHdDQUZXO0FBR1gsOEJBSFc7QUFJWCxzQ0FKVztBQUtYO0FBTFcsQzs7Ozs7Ozs7a0JDTlMsTztBQUFULFNBQVMsT0FBVCxDQUFpQixLQUFqQixFQUF3QixHQUF4QixFQUE2QjtBQUN4QyxRQUFJLFFBQVEsT0FBTyxTQUFuQjtBQUNBLFdBQU8sSUFBSSxNQUFKLENBQVcsVUFBQyxNQUFELEVBQVMsSUFBVCxFQUFrQjtBQUNoQyxZQUFNLE9BQU8sS0FBSyxHQUFMLENBQVMsT0FBTyxLQUFoQixDQUFiO0FBQ0EsWUFBSSxPQUFPLEtBQVgsRUFBa0I7QUFDZCxvQkFBUSxJQUFSO0FBQ0EscUJBQVMsSUFBVDtBQUNIO0FBQ0QsZUFBTyxNQUFQO0FBQ0gsS0FQTSxFQU9KLENBQUMsQ0FQRyxDQUFQO0FBUUg7Ozs7Ozs7O2tCQ1Z1QixZO0FBQVQsU0FBUyxZQUFULENBQXNCLEdBQXRCLEVBQTJCO0FBQ3RDLFdBQU8sSUFBSSxLQUFLLEtBQUwsQ0FBVyxLQUFLLE1BQUwsS0FBZ0IsSUFBSSxNQUEvQixDQUFKLENBQVA7QUFDSDs7Ozs7Ozs7a0JDRnVCLFc7QUFBVCxTQUFTLFdBQVQsQ0FBcUIsR0FBckIsRUFBMEI7QUFDckMsV0FBTyxJQUFJLElBQUosQ0FBUyxVQUFTLENBQVQsRUFBWSxDQUFaLEVBQWU7QUFDM0IsZUFBTyxJQUFJLENBQVg7QUFDSCxLQUZNLENBQVA7QUFHSDs7Ozs7Ozs7a0JDSnVCLFU7QUFBVCxTQUFTLFVBQVQsQ0FBb0IsR0FBcEIsRUFBeUI7QUFDcEMsV0FBTyxJQUFJLElBQUosQ0FBUyxZQUFNO0FBQ2xCLGVBQU8sS0FBSyxNQUFMLEtBQWdCLEdBQWhCLEdBQXNCLENBQUMsQ0FBdkIsR0FBMkIsQ0FBbEM7QUFDSCxLQUZNLENBQVA7QUFHSDs7Ozs7Ozs7a0JDSnVCLGM7QUFBVCxTQUFTLGNBQVQsQ0FBd0IsS0FBeEIsRUFBK0I7QUFDMUMsYUFBUyxJQUFULENBQWMsS0FBZCxDQUFvQixRQUFwQixHQUErQixRQUFRLFFBQVIsR0FBbUIsRUFBbEQ7QUFDSDs7Ozs7Ozs7a0JDRnVCLFc7QUFBVCxTQUFTLFdBQVQsQ0FBcUIsRUFBckIsRUFBeUI7QUFDcEMsUUFBTSxVQUFVLEdBQUcsS0FBSCxDQUFTLE9BQXpCO0FBQ0EsT0FBRyxLQUFILENBQVMsT0FBVCxHQUFtQixNQUFuQjtBQUNBLE9BQUcsWUFBSDtBQUNBLE9BQUcsS0FBSCxDQUFTLE9BQVQsR0FBbUIsT0FBbkI7QUFDSDs7Ozs7Ozs7a0JDTHVCLGE7QUFBVCxTQUFTLGFBQVQsR0FBeUI7QUFDcEMsUUFBTSxPQUFPLFNBQVMsSUFBdEI7QUFDQSxRQUFNLE1BQU0sU0FBUyxlQUFyQjs7QUFFQSxXQUFPLEtBQUssR0FBTCxDQUNILEtBQUssWUFBTCxJQUFxQixDQURsQixFQUVILEtBQUssWUFBTCxJQUFxQixDQUZsQixFQUdILEtBQUssWUFBTCxJQUFxQixDQUhsQixFQUlILElBQUksWUFBSixJQUFvQixDQUpqQixFQUtILElBQUksWUFBSixJQUFvQixDQUxqQixFQU1ILElBQUksWUFBSixJQUFvQixDQU5qQixDQUFQO0FBUUg7Ozs7Ozs7O2tCQ1Z1QixtQjs7QUFGeEI7Ozs7OztBQUVlLFNBQVMsbUJBQVQsR0FBK0I7QUFDMUMsV0FBTyxDQUFDLGdDQUFpQixPQUFPLFdBQXpCLElBQXdDLFNBQVMsSUFBVCxDQUFjLFlBQTdEO0FBQ0g7Ozs7Ozs7O2tCQ0Z1QixrQjs7QUFGeEI7Ozs7OztBQUVlLFNBQVMsa0JBQVQsR0FBOEI7QUFDekMsUUFBTSxJQUFJLFNBQVMsSUFBbkI7QUFDQSxXQUFPLEtBQUssR0FBTCxDQUFTLGlDQUFrQixFQUFFLFlBQUYsR0FBaUIsRUFBRSxZQUFyQyxDQUFULENBQVA7QUFDSDs7Ozs7Ozs7a0JDTHVCLFk7QUFBVCxTQUFTLFlBQVQsR0FBd0I7QUFDbkMsV0FBTyxPQUFPLFdBQVAsSUFBc0IsU0FBUyxlQUFULENBQXlCLFNBQXREO0FBQ0g7Ozs7Ozs7OztBQ0ZEOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztrQkFFZTtBQUNYLDRDQURXO0FBRVgsc0NBRlc7QUFHWCwwQ0FIVztBQUlYLHNEQUpXO0FBS1gsb0RBTFc7QUFNWCx3Q0FOVztBQU9YLHNEQVBXO0FBUVgsa0NBUlc7QUFTWCw0QkFUVztBQVVYLDRCQVZXO0FBV1g7QUFYVyxDOzs7Ozs7OztrQkNaUyxtQjtBQUFULFNBQVMsbUJBQVQsQ0FBNkIsRUFBN0IsRUFBaUM7QUFDNUMsUUFBTSxPQUFPLEdBQUcscUJBQUgsRUFBYjtBQUNBLFdBQ0ksS0FBSyxHQUFMLElBQVksQ0FBWixJQUNBLEtBQUssSUFBTCxJQUFhLENBRGIsSUFFQSxLQUFLLE1BQUwsSUFBZSxPQUFPLFdBRnRCLElBR0EsS0FBSyxLQUFMLElBQWMsT0FBTyxVQUp6QjtBQU1IOzs7Ozs7OztrQkNOdUIsUzs7QUFGeEI7Ozs7OztBQUVlLFNBQVMsU0FBVCxHQUErQjtBQUFBLFFBQVosTUFBWSx5REFBSCxDQUFHOztBQUMxQyxRQUFNLElBQUksU0FBUyxJQUFuQjtBQUNBLFdBQU8sS0FBSyxHQUFMLENBQVMsaUNBQWtCLEVBQUUsWUFBRixHQUFpQixFQUFFLFlBQXJDLENBQVQsS0FBZ0UsTUFBdkU7QUFDSDs7Ozs7Ozs7a0JDSHVCLE07O0FBRnhCOzs7Ozs7QUFFZSxTQUFTLE1BQVQsR0FBa0I7O0FBRTdCLFFBQUksa0JBQUo7Ozs7QUFJQSxXQUFPLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDLFlBQU07QUFDcEMscUJBQWEsU0FBYjtBQUNBLG9CQUFZLE9BQU8sVUFBUCxDQUFrQjtBQUFBLG1CQUFNLG1CQUFTLElBQVQsQ0FBYyxRQUFkLENBQU47QUFBQSxTQUFsQixFQUFpRCxHQUFqRCxDQUFaO0FBQ0gsS0FIRDtBQUlIOzs7Ozs7OztrQkNWdUIsTTs7QUFGeEI7Ozs7OztBQUVlLFNBQVMsTUFBVCxHQUFrQjs7QUFFN0IsUUFBSSxjQUFjLENBQWxCO1FBQ0ksVUFBVSxLQURkO1FBRUksa0JBRko7O0FBSUEsYUFBUyxNQUFULEdBQWtCO0FBQ2QscUJBQWEsU0FBYjtBQUNBLG9CQUFZLE9BQU8sVUFBUCxDQUFrQjtBQUFBLG1CQUFNLG1CQUFTLElBQVQsQ0FBYyxXQUFkLEVBQTJCLFdBQTNCLENBQU47QUFBQSxTQUFsQixFQUFpRSxHQUFqRSxDQUFaOztBQUVBLDJCQUFTLElBQVQsQ0FBYyxRQUFkLEVBQXdCLFdBQXhCO0FBQ0Esa0JBQVUsS0FBVjtBQUNIOztBQUVELGFBQVMsV0FBVCxHQUF1QjtBQUNuQixZQUFJLENBQUMsT0FBTCxFQUFjO0FBQ1YsbUJBQU8scUJBQVAsQ0FBNkIsTUFBN0I7QUFDQSxzQkFBVSxJQUFWO0FBQ0g7QUFDSjs7QUFFRCxhQUFTLFFBQVQsR0FBb0I7O0FBRWhCLHNCQUFjLE9BQU8sV0FBUCxJQUFzQixTQUFTLGVBQVQsQ0FBeUIsU0FBN0Q7QUFDQTtBQUNIOztBQUVELFdBQU8sZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0MsUUFBbEMsRUFBNEMsS0FBNUM7QUFDSDs7Ozs7Ozs7O2tCQzlCYyxVQUFTLEVBQVQsRUFBYSxFQUFiLEVBQWlDO0FBQUEsUUFBaEIsT0FBZ0IseURBQU4sSUFBTTs7O0FBRTVDLFFBQUksa0JBQUo7O0FBRUEsYUFBUyxPQUFULEdBQW1CO0FBQ2YsZUFBTyxZQUFQLENBQW9CLFNBQXBCO0FBQ0EsV0FBRyxtQkFBSCxDQUF1QixlQUF2QixFQUF3QyxPQUF4QztBQUNBLFdBQUcsbUJBQUgsQ0FBdUIscUJBQXZCLEVBQThDLE9BQTlDO0FBQ0E7QUFDSDs7QUFFRCxRQUFJLE9BQU8sR0FBRyxLQUFILENBQVMsVUFBaEIsS0FBK0IsV0FBbkMsRUFBZ0Q7QUFDNUMsV0FBRyxnQkFBSCxDQUFvQixlQUFwQixFQUFxQyxPQUFyQztBQUNILEtBRkQsTUFFTyxJQUFJLE9BQU8sR0FBRyxLQUFILENBQVMsZ0JBQWhCLEtBQXFDLFdBQXpDLEVBQXNEO0FBQ3pELFdBQUcsZ0JBQUgsQ0FBb0IscUJBQXBCLEVBQTJDLE9BQTNDO0FBQ0g7O0FBRUQsZ0JBQVksT0FBTyxVQUFQLENBQWtCLE9BQWxCLEVBQTJCLE9BQTNCLENBQVo7QUFDSCxDOzs7Ozs7Ozs7OztBQ2xCRDs7Ozs7Ozs7SUFFcUIsTzs7O0FBQ2pCLHVCQUFjO0FBQUE7O0FBQUE7O0FBR1YsY0FBSyxlQUFMLENBQXFCLEVBQXJCO0FBSFU7QUFJYjs7Ozs0QkFFSSxJLEVBQU0sUSxFQUFVO0FBQ2pCLGdCQUFJLFFBQUosRUFBYztBQUNWLHVCQUFPLEtBQUssY0FBTCxDQUFvQixJQUFwQixFQUEwQixRQUExQixDQUFQO0FBQ0g7QUFDRCxnQkFBSSxJQUFKLEVBQVU7QUFDTix1QkFBTyxLQUFLLGtCQUFMLENBQXdCLElBQXhCLENBQVA7QUFDSDtBQUNELG1CQUFPLEtBQUssa0JBQUwsRUFBUDtBQUNIOzs7Ozs7a0JBZmdCLE87Ozs7Ozs7OztBQ0ZyQjs7Ozs7O2tCQUVlLE9BQU8sTUFBUCxDQUFjLGtCQUFRLFNBQXRCLEM7Ozs7Ozs7OztBQ0ZmOztBQUNBOzs7O0FBQ0E7Ozs7QUF3QkE7Ozs7Ozs7Ozs7Ozs7a0JBUWU7QUFDWCwwQkFEVztBQUVYLHNCQUZXO0FBR1g7QUFIVyxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QVI7QUFDSDtBQUNELGlCQUFTLE1BQVQ7QUFDSDtBQUNELFdBQU8sS0FBUDtBQUNIOzs7Ozs7OztrQkNadUIsUzs7QUFBVCxTQUFTLFNBQVQsQ0FBbUIsR0FBbkIsRUFBd0I7QUFDbkMsV0FBTyxJQUFJLEtBQUosQ0FBVSxVQUFWLEVBQXNCLE1BQTdCO0FBQ0giLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2xvbmUoYXJyKSB7XG4gICAgcmV0dXJuIGFyci5zbGljZSgwKTtcbn1cbiIsImltcG9ydCBjbG9uZSBmcm9tICcuL2Nsb25lJztcbmltcG9ydCBuZWFyZXN0IGZyb20gJy4vbmVhcmVzdCc7XG5pbXBvcnQgcmFuZG9tQ2hvaWNlIGZyb20gJy4vcmFuZG9tQ2hvaWNlJztcbmltcG9ydCBzb3J0TnVtZXJpYyBmcm9tICcuL3NvcnROdW1lcmljJztcbmltcG9ydCBzb3J0UmFuZG9tIGZyb20gJy4vc29ydFJhbmRvbSc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBjbG9uZSxcbiAgICByYW5kb21DaG9pY2UsXG4gICAgbmVhcmVzdCxcbiAgICBzb3J0TnVtZXJpYyxcbiAgICBzb3J0UmFuZG9tXG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbmVhcmVzdCh2YWx1ZSwgYXJyKSB7XG4gICAgbGV0IGxlYXN0ID0gTnVtYmVyLk1BWF9WQUxVRTtcbiAgICByZXR1cm4gYXJyLnJlZHVjZSgocmVzdWx0LCBpdGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IGRpZmYgPSBNYXRoLmFicyhpdGVtIC0gdmFsdWUpO1xuICAgICAgICBpZiAoZGlmZiA8IGxlYXN0KSB7XG4gICAgICAgICAgICBsZWFzdCA9IGRpZmY7XG4gICAgICAgICAgICByZXN1bHQgPSBpdGVtO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSwgLTEpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmFuZG9tQ2hvaWNlKGFycikge1xuICAgIHJldHVybiBhcnJbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXJyLmxlbmd0aCldO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc29ydE51bWVyaWMoYXJyKSB7XG4gICAgcmV0dXJuIGFyci5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEgLSBiO1xuICAgIH0pO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc29ydFJhbmRvbShhcnIpIHtcbiAgICByZXR1cm4gYXJyLnNvcnQoKCkgPT4ge1xuICAgICAgICByZXR1cm4gTWF0aC5yYW5kb20oKSA+IDAuNSA/IC0xIDogMTtcbiAgICB9KTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJsb2NrU2Nyb2xsaW5nKHZhbHVlKSB7XG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9IHZhbHVlID8gJ2hpZGRlbicgOiAnJztcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZvcmNlUmVkcmF3KGVsKSB7XG4gICAgY29uc3QgZGlzcGxheSA9IGVsLnN0eWxlLmRpc3BsYXk7XG4gICAgZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBlbC5vZmZzZXRIZWlnaHQ7XG4gICAgZWwuc3R5bGUuZGlzcGxheSA9IGRpc3BsYXk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRQYWdlSGVpZ2h0KCkge1xuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5ib2R5O1xuICAgIGNvbnN0IGRvYyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuICAgIHJldHVybiBNYXRoLm1heChcbiAgICAgICAgYm9keS5zY3JvbGxIZWlnaHQgfHwgMCxcbiAgICAgICAgYm9keS5vZmZzZXRIZWlnaHQgfHwgMCxcbiAgICAgICAgYm9keS5jbGllbnRIZWlnaHQgfHwgMCxcbiAgICAgICAgZG9jLmNsaWVudEhlaWdodCB8fCAwLFxuICAgICAgICBkb2Mub2Zmc2V0SGVpZ2h0IHx8IDAsXG4gICAgICAgIGRvYy5zY3JvbGxIZWlnaHQgfHwgMFxuICAgICk7XG59XG4iLCJpbXBvcnQgZ2V0U2Nyb2xsVG9wIGZyb20gJy4vZ2V0U2Nyb2xsVG9wJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0U2Nyb2xsUGVyY2VudGFnZSgpIHtcbiAgICByZXR1cm4gKGdldFNjcm9sbFRvcCgpICsgd2luZG93LmlubmVySGVpZ2h0KSAvIGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0O1xufVxuIiwiaW1wb3J0IGdldFNjcm9sbFRvcCBmcm9tICcuL2dldFNjcm9sbFRvcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFNjcm9sbFJlbWFpbmluZygpIHtcbiAgICBjb25zdCBiID0gZG9jdW1lbnQuYm9keTtcbiAgICByZXR1cm4gTWF0aC5hYnMoZ2V0U2Nyb2xsVG9wKCkgLSAoYi5zY3JvbGxIZWlnaHQgLSBiLmNsaWVudEhlaWdodCkpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0U2Nyb2xsVG9wKCkge1xuICAgIHJldHVybiB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcbn1cbiIsImltcG9ydCBibG9ja1Njcm9sbGluZyBmcm9tICcuL2Jsb2NrU2Nyb2xsaW5nJztcbmltcG9ydCBmb3JjZVJlZHJhdyBmcm9tICcuL2ZvcmNlUmVkcmF3JztcbmltcG9ydCBnZXRQYWdlSGVpZ2h0IGZyb20gJy4vZ2V0UGFnZUhlaWdodCc7XG5pbXBvcnQgZ2V0U2Nyb2xsUGVyY2VudGFnZSBmcm9tICcuL2dldFNjcm9sbFBlcmNlbnRhZ2UnO1xuaW1wb3J0IGdldFNjcm9sbFJlbWFpbmluZyBmcm9tICcuL2dldFNjcm9sbFJlbWFpbmluZyc7XG5pbXBvcnQgZ2V0U2Nyb2xsVG9wIGZyb20gJy4vZ2V0U2Nyb2xsVG9wJztcbmltcG9ydCBpc0VsZW1lbnRJblZpZXdwb3J0IGZyb20gJy4vaXNFbGVtZW50SW5WaWV3cG9ydCc7XG5pbXBvcnQgaXNQYWdlRW5kIGZyb20gJy4vaXNQYWdlRW5kJztcbmltcG9ydCByZXNpemUgZnJvbSAnLi9yZXNpemUnO1xuaW1wb3J0IHNjcm9sbCBmcm9tICcuL3Njcm9sbCc7XG5pbXBvcnQgdHJhbnNpdGlvbkVuZCBmcm9tICcuL3RyYW5zaXRpb25FbmQnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYmxvY2tTY3JvbGxpbmcsXG4gICAgZm9yY2VSZWRyYXcsXG4gICAgZ2V0UGFnZUhlaWdodCxcbiAgICBnZXRTY3JvbGxQZXJjZW50YWdlLFxuICAgIGdldFNjcm9sbFJlbWFpbmluZyxcbiAgICBnZXRTY3JvbGxUb3AsXG4gICAgaXNFbGVtZW50SW5WaWV3cG9ydCxcbiAgICBpc1BhZ2VFbmQsXG4gICAgcmVzaXplLFxuICAgIHNjcm9sbCxcbiAgICB0cmFuc2l0aW9uRW5kXG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNFbGVtZW50SW5WaWV3cG9ydChlbCkge1xuICAgIGNvbnN0IHJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICByZXR1cm4gKFxuICAgICAgICByZWN0LnRvcCA+PSAwICYmXG4gICAgICAgIHJlY3QubGVmdCA+PSAwICYmXG4gICAgICAgIHJlY3QuYm90dG9tIDw9IHdpbmRvdy5pbm5lckhlaWdodCAmJlxuICAgICAgICByZWN0LnJpZ2h0IDw9IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgKTtcbn1cbiIsImltcG9ydCBnZXRTY3JvbGxUb3AgZnJvbSAnLi9nZXRTY3JvbGxUb3AnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc1BhZ2VFbmQoYnVmZmVyID0gMCkge1xuICAgIGNvbnN0IGIgPSBkb2N1bWVudC5ib2R5O1xuICAgIHJldHVybiBNYXRoLmFicyhnZXRTY3JvbGxUb3AoKSAtIChiLnNjcm9sbEhlaWdodCAtIGIuY2xpZW50SGVpZ2h0KSkgPD0gYnVmZmVyO1xufVxuIiwiaW1wb3J0IGV2ZW50QnVzIGZyb20gJy4uL2V2ZW50cy9ldmVudEJ1cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlc2l6ZSgpIHtcblxuICAgIGxldCB0aW1lb3V0SWQ7XG5cbiAgICAvLyBvcmllbnRhdGlvbmNoYW5nZSB0b28/XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dElkKTtcbiAgICAgICAgdGltZW91dElkID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4gZXZlbnRCdXMuZW1pdCgncmVzaXplJyksIDUwMCk7XG4gICAgfSk7XG59XG4iLCJpbXBvcnQgZXZlbnRCdXMgZnJvbSAnLi4vZXZlbnRzL2V2ZW50QnVzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2Nyb2xsKCkge1xuXG4gICAgbGV0IGxhc3RTY3JvbGxZID0gMCxcbiAgICAgICAgdGlja2luZyA9IGZhbHNlLFxuICAgICAgICB0aW1lb3V0SWQ7XG5cbiAgICBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SWQpO1xuICAgICAgICB0aW1lb3V0SWQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiBldmVudEJ1cy5lbWl0KCdzY3JvbGxlbmQnLCBsYXN0U2Nyb2xsWSksIDIwMCk7XG5cbiAgICAgICAgZXZlbnRCdXMuZW1pdCgnc2Nyb2xsJywgbGFzdFNjcm9sbFkpO1xuICAgICAgICB0aWNraW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVxdWVzdFRpY2soKSB7XG4gICAgICAgIGlmICghdGlja2luZykge1xuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGUpO1xuICAgICAgICAgICAgdGlja2luZyA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblNjcm9sbCgpIHtcbiAgICAgICAgLy8gbGFzdFNjcm9sbFkgPSB3aW5kb3cuc2Nyb2xsWTtcbiAgICAgICAgbGFzdFNjcm9sbFkgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcbiAgICAgICAgcmVxdWVzdFRpY2soKTtcbiAgICB9XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgb25TY3JvbGwsIGZhbHNlKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGVsLCBjYiwgdGltZW91dCA9IDEwMDApIHtcblxuICAgIGxldCB0aW1lb3V0SWQ7XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVyKCkge1xuICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBoYW5kbGVyKTtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2Via2l0VHJhbnNpdGlvbkVuZCcsIGhhbmRsZXIpO1xuICAgICAgICBjYigpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZWwuc3R5bGUudHJhbnNpdGlvbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGhhbmRsZXIpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGVsLnN0eWxlLldlYmtpdFRyYW5zaXRpb24gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCBoYW5kbGVyKTtcbiAgICB9XG5cbiAgICB0aW1lb3V0SWQgPSB3aW5kb3cuc2V0VGltZW91dChoYW5kbGVyLCB0aW1lb3V0KTtcbn1cbiIsImltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tICdldmVudHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBlbWl0dGVyIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLnNldE1heExpc3RlbmVycygyMCk7XG4gICAgfVxuXG4gICAgb2ZmICh0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgICBpZiAobGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKHR5cGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgIH1cbn1cbiIsImltcG9ydCBlbWl0dGVyIGZyb20gJy4vZW1pdHRlcic7XG5cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5jcmVhdGUoZW1pdHRlci5wcm90b3R5cGUpO1xuIiwiaW1wb3J0ICcuL3BvbHlmaWxsJztcbmltcG9ydCBhcnJheSBmcm9tICcuL2FycmF5JztcbmltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xuLy8gaW1wb3J0IEFzc2V0TG9hZGVyIGZyb20gJy4vQXNzZXRMb2FkZXInO1xuLy8gaW1wb3J0IEN1ZXBvaW50c1JlYWRlciBmcm9tICcuL0N1ZXBvaW50c1JlYWRlcic7XG4vLyBpbXBvcnQgZGV2aWNlIGZyb20gJy4vZGV2aWNlJztcbi8vIGltcG9ydCBlbWl0dGVyIGZyb20gJy4vZW1pdHRlcic7XG4vLyBpbXBvcnQgRmFjZWJvb2sgZnJvbSAnLi9GYWNlYm9vayc7XG4vLyBpbXBvcnQgRmxhc2ggZnJvbSAnLi9GbGFzaCc7XG4vLyBpbXBvcnQgRlBTIGZyb20gJy4vRnBzJztcbi8vIGltcG9ydCBmdWxsc2NyZWVuIGZyb20gJy4vZnVsbHNjcmVlbic7XG4vLyBpbXBvcnQgR3JhcGhpY3MgZnJvbSAnLi9HcmFwaGljcyc7XG4vLyBpbXBvcnQgSW5wdXRDb29yZHMgZnJvbSAnLi9JbnB1dENvb3Jkcyc7XG4vLyBpbXBvcnQga2V5Ym9hcmQgZnJvbSAnLi9rZXlib2FyZCc7XG4vLyBpbXBvcnQgS2V5SW5wdXQgZnJvbSAnLi9LZXlJbnB1dCc7XG4vLyBpbXBvcnQgTGlua2VkTGlzdCBmcm9tICcuL0xpbmtlZExpc3QnO1xuLy8gaW1wb3J0IG1hdGggZnJvbSAnLi9tYXRoJztcbi8vIGltcG9ydCBtb2Rlcm4gZnJvbSAnLi9tb2Rlcm4nO1xuLy8gaW1wb3J0IE1vdXNlV2hlZWwgZnJvbSAnLi9Nb3VzZVdoZWVsJztcbi8vIGltcG9ydCBPYmplY3RQb29sIGZyb20gJy4vT2JqZWN0UG9vbCc7XG4vLyBpbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi9wbGF0Zm9ybSc7XG4vLyBpbXBvcnQgcG9wdXAgZnJvbSAnLi9wb3B1cCc7XG4vLyBpbXBvcnQgcmVhZHkgZnJvbSAnLi9yZWFkeSc7XG4vLyBpbXBvcnQgcmVzaXplIGZyb20gJy4vcmVzaXplJztcbi8vIGltcG9ydCBzaGFyZSBmcm9tICcuL3NoYXJlJztcbi8vIGltcG9ydCBzdG9yYWdlIGZyb20gJy4vc3RvcmFnZSc7XG5pbXBvcnQgc3RyaW5nIGZyb20gJy4vc3RyaW5nJztcbi8vIGltcG9ydCBUb3VjaElucHV0IGZyb20gJy4vVG91Y2hJbnB1dCc7XG4vLyBpbXBvcnQgdHJhY2sgZnJvbSAnLi90cmFjayc7XG4vLyBpbXBvcnQgdXJsUGFyYW1zIGZyb20gJy4vdXJsUGFyYW1zJztcbi8vIGltcG9ydCBWaWRlb1BsYXllciBmcm9tICcuL1ZpZGVvUGxheWVyJztcbi8vIGltcG9ydCBWaWV3cG9ydCBmcm9tICcuL3ZpZXdwb3J0Jztcbi8vIGltcG9ydCB2aXNpYmlsaXR5IGZyb20gJy4vdmlzaWJpbGl0eSc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBhcnJheSxcbiAgICBkb20sXG4gICAgc3RyaW5nXG59O1xuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgdGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG5FdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbihuKSB7XG4gIGlmICghaXNOdW1iZXIobikgfHwgbiA8IDAgfHwgaXNOYU4obikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCduIG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXInKTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBlciwgaGFuZGxlciwgbGVuLCBhcmdzLCBpLCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAodHlwZSA9PT0gJ2Vycm9yJykge1xuICAgIGlmICghdGhpcy5fZXZlbnRzLmVycm9yIHx8XG4gICAgICAgIChpc09iamVjdCh0aGlzLl9ldmVudHMuZXJyb3IpICYmICF0aGlzLl9ldmVudHMuZXJyb3IubGVuZ3RoKSkge1xuICAgICAgZXIgPSBhcmd1bWVudHNbMV07XG4gICAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICAgIH1cbiAgICAgIHRocm93IFR5cGVFcnJvcignVW5jYXVnaHQsIHVuc3BlY2lmaWVkIFwiZXJyb3JcIiBldmVudC4nKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc1VuZGVmaW5lZChoYW5kbGVyKSlcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKGlzRnVuY3Rpb24oaGFuZGxlcikpIHtcbiAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIC8vIGZhc3QgY2FzZXNcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vIHNsb3dlclxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgIGhhbmRsZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGhhbmRsZXIpKSB7XG4gICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgbGlzdGVuZXJzID0gaGFuZGxlci5zbGljZSgpO1xuICAgIGxlbiA9IGxpc3RlbmVycy5sZW5ndGg7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKVxuICAgICAgbGlzdGVuZXJzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIG07XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgaWYgKHRoaXMuX2V2ZW50cy5uZXdMaXN0ZW5lcilcbiAgICB0aGlzLmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgaXNGdW5jdGlvbihsaXN0ZW5lci5saXN0ZW5lcikgP1xuICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgZWxzZSBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuICBlbHNlXG4gICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gW3RoaXMuX2V2ZW50c1t0eXBlXSwgbGlzdGVuZXJdO1xuXG4gIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pICYmICF0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkKSB7XG4gICAgaWYgKCFpc1VuZGVmaW5lZCh0aGlzLl9tYXhMaXN0ZW5lcnMpKSB7XG4gICAgICBtID0gdGhpcy5fbWF4TGlzdGVuZXJzO1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gICAgfVxuXG4gICAgaWYgKG0gJiYgbSA+IDAgJiYgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCA+IG0pIHtcbiAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQgPSB0cnVlO1xuICAgICAgY29uc29sZS5lcnJvcignKG5vZGUpIHdhcm5pbmc6IHBvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgJyArXG4gICAgICAgICAgICAgICAgICAgICdsZWFrIGRldGVjdGVkLiAlZCBsaXN0ZW5lcnMgYWRkZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gaW5jcmVhc2UgbGltaXQuJyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCk7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUudHJhY2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gbm90IHN1cHBvcnRlZCBpbiBJRSAxMFxuICAgICAgICBjb25zb2xlLnRyYWNlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIHZhciBmaXJlZCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGcoKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBnKTtcblxuICAgIGlmICghZmlyZWQpIHtcbiAgICAgIGZpcmVkID0gdHJ1ZTtcbiAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgZy5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICB0aGlzLm9uKHR5cGUsIGcpO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gZW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWRcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbGlzdCwgcG9zaXRpb24sIGxlbmd0aCwgaTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXR1cm4gdGhpcztcblxuICBsaXN0ID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuICBsZW5ndGggPSBsaXN0Lmxlbmd0aDtcbiAgcG9zaXRpb24gPSAtMTtcblxuICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHxcbiAgICAgIChpc0Z1bmN0aW9uKGxpc3QubGlzdGVuZXIpICYmIGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG5cbiAgfSBlbHNlIGlmIChpc09iamVjdChsaXN0KSkge1xuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tID4gMDspIHtcbiAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fFxuICAgICAgICAgIChsaXN0W2ldLmxpc3RlbmVyICYmIGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgbGlzdC5sZW5ndGggPSAwO1xuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC5zcGxpY2UocG9zaXRpb24sIDEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGtleSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgaWYgKCF0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIGVsc2UgaWYgKHRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICBmb3IgKGtleSBpbiB0aGlzLl9ldmVudHMpIHtcbiAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICB9XG4gICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzRnVuY3Rpb24obGlzdGVuZXJzKSkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgfSBlbHNlIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAvLyBMSUZPIG9yZGVyXG4gICAgd2hpbGUgKGxpc3RlbmVycy5sZW5ndGgpXG4gICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tsaXN0ZW5lcnMubGVuZ3RoIC0gMV0pO1xuICB9XG4gIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIHJldDtcbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXQgPSBbXTtcbiAgZWxzZSBpZiAoaXNGdW5jdGlvbih0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIHJldCA9IFt0aGlzLl9ldmVudHNbdHlwZV1dO1xuICBlbHNlXG4gICAgcmV0ID0gdGhpcy5fZXZlbnRzW3R5cGVdLnNsaWNlKCk7XG4gIHJldHVybiByZXQ7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIGlmICh0aGlzLl9ldmVudHMpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICAgIGlmIChpc0Z1bmN0aW9uKGV2bGlzdGVuZXIpKVxuICAgICAgcmV0dXJuIDE7XG4gICAgZWxzZSBpZiAoZXZsaXN0ZW5lcilcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgfVxuICByZXR1cm4gMDtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xufTtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGlzTnVtYmVyKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ251bWJlcic7XG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xufVxuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gdm9pZCAwO1xufVxuIiwiLypcbiAqIGNsYXNzTGlzdCAocGFydGlhbCBwb2x5ZmlsbCBmb3IgSUUgMTAsIElFIDExIGFuZCBGaXJlZm94IDwyNClcbiAqIGFkYXB0ZWQgZnJvbTogaHR0cHM6Ly9naXRodWIuY29tL2VsaWdyZXkvY2xhc3NMaXN0LmpzL2Jsb2IvbWFzdGVyL2NsYXNzTGlzdC5qc1xuICovXG5cbihmdW5jdGlvbigpIHtcblxuICAgIGxldCB0ZXN0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ18nKTtcblxuICAgIHRlc3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2MxJywgJ2MyJyk7XG5cbiAgICAvLyBQb2x5ZmlsbCBmb3IgSUUgMTAvMTEgYW5kIEZpcmVmb3ggPDI2LCB3aGVyZSBjbGFzc0xpc3QuYWRkIGFuZFxuICAgIC8vIGNsYXNzTGlzdC5yZW1vdmUgZXhpc3QgYnV0IHN1cHBvcnQgb25seSBvbmUgYXJndW1lbnQgYXQgYSB0aW1lLlxuICAgIGlmICghdGVzdEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjMicpKSB7XG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZU1ldGhvZChtZXRob2QpIHtcbiAgICAgICAgICAgIGNvbnN0IG9yaWdpbmFsID0gd2luZG93LkRPTVRva2VuTGlzdC5wcm90b3R5cGVbbWV0aG9kXTtcblxuICAgICAgICAgICAgd2luZG93LkRPTVRva2VuTGlzdC5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHRva2VuKSB7XG4gICAgICAgICAgICAgICAgbGV0IGk7XG4gICAgICAgICAgICAgICAgY29uc3QgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWwuY2FsbCh0aGlzLCB0b2tlbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjcmVhdGVNZXRob2QoJ2FkZCcpO1xuICAgICAgICBjcmVhdGVNZXRob2QoJ3JlbW92ZScpO1xuICAgIH1cblxuICAgIHRlc3RFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ2MzJywgZmFsc2UpO1xuXG4gICAgLy8gUG9seWZpbGwgZm9yIElFIDEwLCBJRSAxMSBhbmQgRmlyZWZveCA8MjQsIHdoZXJlIGNsYXNzTGlzdC50b2dnbGUgZG9lcyBub3RcbiAgICAvLyBzdXBwb3J0IHRoZSBzZWNvbmQgYXJndW1lbnQuXG4gICAgaWYgKHRlc3RFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnYzMnKSkge1xuICAgICAgICBjb25zdCB0b2dnbGUgPSB3aW5kb3cuRE9NVG9rZW5MaXN0LnByb3RvdHlwZS50b2dnbGU7XG5cbiAgICAgICAgd2luZG93LkRPTVRva2VuTGlzdC5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24odG9rZW4sIGZvcmNlKSB7XG4gICAgICAgICAgICBmb3JjZSA9ICEhZm9yY2U7XG4gICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgdGhpcy5jb250YWlucyh0b2tlbikgPT09IGZvcmNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcmNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9nZ2xlLmNhbGwodGhpcywgdG9rZW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHRlc3RFbGVtZW50ID0gbnVsbDtcbn0oKSk7XG4iLCIoZnVuY3Rpb24oZm4pIHtcbiAgICB3aW5kb3cuY29uc29sZSA9IHdpbmRvdy5jb25zb2xlIHx8IHt9O1xuICAgIGNvbnN0IG1ldGhvZHMgPSBbXG4gICAgICAgICdhc3NlcnQnLFxuICAgICAgICAnY2xlYXInLFxuICAgICAgICAnY291bnQnLFxuICAgICAgICAnZGVidWcnLFxuICAgICAgICAnZGlyJyxcbiAgICAgICAgJ2RpcnhtbCcsXG4gICAgICAgICdlcnJvcicsXG4gICAgICAgICdncm91cCcsXG4gICAgICAgICdncm91cENvbGxhcHNlZCcsXG4gICAgICAgICdncm91cEVuZCcsXG4gICAgICAgICdpbmZvJyxcbiAgICAgICAgJ2xvZycsXG4gICAgICAgICdtYXJrVGltZWxpbmUnLFxuICAgICAgICAnbWVtb3J5JyxcbiAgICAgICAgJ3Byb2ZpbGUnLFxuICAgICAgICAncHJvZmlsZUVuZCcsXG4gICAgICAgICd0YWJsZScsXG4gICAgICAgICd0aW1lJyxcbiAgICAgICAgJ3RpbWVFbmQnLFxuICAgICAgICAndGltZVN0YW1wJyxcbiAgICAgICAgJ3RpbWVsaW5lJyxcbiAgICAgICAgJ3RpbWVsaW5lRW5kJyxcbiAgICAgICAgJ3RyYWNlJyxcbiAgICAgICAgJ3dhcm4nXG4gICAgXTtcbiAgICBtZXRob2RzLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICAgICAgd2luZG93LmNvbnNvbGVbbmFtZV0gPSB3aW5kb3cuY29uc29sZVtuYW1lXSB8fCBmbjtcbiAgICB9KTtcbn0oZnVuY3Rpb24oKSB7fSkpO1xuIiwiaW1wb3J0ICcuL2NsYXNzTGlzdCc7XG5pbXBvcnQgJy4vY29uc29sZSc7XG5pbXBvcnQgJy4vcmVxdWVzdEFuaW1hdGlvbkZyYW1lJztcbiIsIi8qXG4gKiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgKGlvczYgYW5kIGFuZHJvaWQgPCA0LjQpXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAgIGlmICghd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSkge1xuICAgICAgICBjb25zdCB2ZW5kb3JzID0gWydtcycsICdtb3onLCAnd2Via2l0JywgJ28nXTtcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB2ZW5kb3JzLmxlbmd0aCAmJiAhd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZTsgKyt4KSB7XG4gICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gd2luZG93W3ZlbmRvcnNbeF0gKyAnUmVxdWVzdEFuaW1hdGlvbkZyYW1lJ107XG4gICAgICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSB3aW5kb3dbdmVuZG9yc1t4XSArICdDYW5jZWxBbmltYXRpb25GcmFtZSddIHx8IHdpbmRvd1t2ZW5kb3JzW3hdICtcbiAgICAgICAgICAgICAgICAnQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lJ107XG4gICAgICAgIH1cbiAgICB9XG59KCkpO1xuIiwiLy8gZXZlcnl0aGluZyBhZnRlciB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiBzdWJzdHIgaW4gc3RyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhZnRlckZpcnN0KHN0ciwgc3Vic3RyKSB7XG4gICAgbGV0IGluZGV4ID0gc3RyLmluZGV4T2Yoc3Vic3RyKTtcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgaW5kZXggKz0gc3Vic3RyLmxlbmd0aDtcbiAgICByZXR1cm4gc3RyLnNsaWNlKGluZGV4KTtcbn1cbiIsIi8vIGV2ZXJ5dGhpbmcgYWZ0ZXIgdGhlIGxhc3Qgb2NjdXJlbmNlIG9mIHN1YnN0ciBpbiBzdHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFmdGVyTGFzdChzdHIsIHN1YnN0cikge1xuICAgIGxldCBpbmRleCA9IHN0ci5sYXN0SW5kZXhPZihzdWJzdHIpO1xuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBpbmRleCArPSBzdWJzdHIubGVuZ3RoO1xuICAgIHJldHVybiBzdHIuc2xpY2UoaW5kZXgpO1xufVxuIiwiLy8gZXZlcnl0aGluZyBiZWZvcmUgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2Ygc3Vic3RyIGluIHN0clxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmVmb3JlRmlyc3Qoc3RyLCBzdWJzdHIpIHtcbiAgICBjb25zdCBpbmRleCA9IHN0ci5pbmRleE9mKHN1YnN0cik7XG4gICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHJldHVybiBzdHIuc2xpY2UoMCwgaW5kZXgpO1xufVxuIiwiLy8gZXZlcnl0aGluZyBiZWZvcmUgdGhlIGxhc3Qgb2NjdXJyZW5jZSBvZiBzdWJzdHIgaW4gdGhlIHN0cmluZy5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJlZm9yZUxhc3Qoc3RyLCBzdWJzdHIpIHtcbiAgICBjb25zdCBpbmRleCA9IHN0ci5sYXN0SW5kZXhPZihzdWJzdHIpO1xuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICByZXR1cm4gc3RyLnNsaWNlKDAsIGluZGV4KTtcbn1cbiIsIi8vIHdoZXRoZXIgc3RyIGJlZ2lucyB3aXRoIHN1YnN0clxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmVnaW5zV2l0aChzdHIsIHN1YnN0cikge1xuICAgIHJldHVybiBzdHIuaW5kZXhPZihzdWJzdHIpID09PSAwO1xufVxuIiwiLy8gZXZlcnl0aGluZyBhZnRlciB0aGUgZmlyc3Qgb2NjdXJhbmNlIG9mIHN0YXJ0IGFuZCBiZWZvcmUgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgZW5kXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBiZXR3ZWVuKHN0ciwgc3RhcnQsIGVuZCkge1xuICAgIGxldCBzdWJzdHIgPSAnJztcbiAgICBsZXQgc3RhcnRJbmRleCA9IHN0ci5pbmRleE9mKHN0YXJ0KTtcbiAgICBpZiAoc3RhcnRJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgc3RhcnRJbmRleCArPSBzdGFydC5sZW5ndGg7XG4gICAgICAgIGNvbnN0IGVuZEluZGV4ID0gc3RyLmluZGV4T2YoZW5kLCBzdGFydEluZGV4KTtcbiAgICAgICAgaWYgKGVuZEluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgc3Vic3RyID0gc3RyLnNsaWNlKHN0YXJ0SW5kZXgsIGVuZEluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3Vic3RyO1xufVxuIiwiaW1wb3J0IGVzY2FwZVBhdHRlcm4gZnJvbSAnLi9lc2NhcGVQYXR0ZXJuJztcbmltcG9ydCB0cnVuY2F0ZSBmcm9tICcuL3RydW5jYXRlJztcbi8vIFV0aWxpdHkgbWV0aG9kIHRoYXQgaW50ZWxsaWdlbnRseSBicmVha3MgdXAgeW91ciBzdHJpbmcsXG4vLyBhbGxvd2luZyB5b3UgdG8gY3JlYXRlIGJsb2NrcyBvZiByZWFkYWJsZSB0ZXh0LlxuLy8gVGhpcyBtZXRob2QgcmV0dXJucyB5b3UgdGhlIGNsb3Nlc3QgcG9zc2libGUgbWF0Y2ggdG8gdGhlIGRlbGltIHBhcmFtYXRlcixcbi8vIHdoaWxlIGtlZXBpbmcgdGhlIHRleHQgbGVuZ3RoIHdpdGhpbiB0aGUgbGVuIHBhcmFtdGVyLlxuLy8gSWYgYSBtYXRjaCBjYW4ndCBiZSBmb3VuZCBpbiB5b3VyIHNwZWNpZmllZCBsZW5ndGggYW4gICcuLi4nIGlzIGFkZGVkIHRvIHRoYXQgYmxvY2ssXG4vLyBhbmQgdGhlIGJsb2NraW5nIGNvbnRpbnVlcyB1bnRpbGwgYWxsIHRoZSB0ZXh0IGlzIGJyb2tlbiBhcGFydC5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJsb2NrKHN0ciwgbGVuLCBkZWxpbSA9ICcuJykge1xuICAgIGNvbnN0IGFyciA9IFtdO1xuXG4gICAgaWYgKCFzdHIgfHwgIXN0ci5pbmNsdWRlcyhkZWxpbSkpIHtcbiAgICAgICAgcmV0dXJuIGFycjtcbiAgICB9XG5cbiAgICBpZiAoZGVsaW0gPT09ICcgJykge1xuICAgICAgICBzdHIgKz0gZGVsaW07XG4gICAgfVxuXG4gICAgbGV0IGNockluZGV4ID0gMDtcbiAgICBjb25zdCByZXBsUGF0dCA9IG5ldyBSZWdFeHAoJ1teJyArIGVzY2FwZVBhdHRlcm4oZGVsaW0pICsgJ10rJCcpO1xuXG4gICAgd2hpbGUgKGNockluZGV4IDwgc3RyLmxlbmd0aCkge1xuICAgICAgICBsZXQgc3ViU3RyaW5nID0gc3RyLnN1YnN0cihjaHJJbmRleCwgbGVuKTtcbiAgICAgICAgaWYgKCFzdWJTdHJpbmcuaW5jbHVkZXMoZGVsaW0pKSB7XG4gICAgICAgICAgICBhcnIucHVzaCh0cnVuY2F0ZShzdWJTdHJpbmcsIHN1YlN0cmluZy5sZW5ndGgpKTtcbiAgICAgICAgICAgIGNockluZGV4ICs9IHN1YlN0cmluZy5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgc3ViU3RyaW5nID0gc3ViU3RyaW5nLnJlcGxhY2UocmVwbFBhdHQsICcnKTtcbiAgICAgICAgY2hySW5kZXggKz0gc3ViU3RyaW5nLmxlbmd0aDtcbiAgICAgICAgYXJyLnB1c2goc3ViU3RyaW5nLnRyaW0oKSk7XG4gICAgfVxuICAgIHJldHVybiBhcnI7XG59XG4iLCIvLyBDYXBpdGFsaXplIHRoZSBmaXJzdCB3b3JkIGluIGEgc3RyaW5nIG9yIGFsbCB3b3Jkc1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2FwaXRhbGl6ZShzdHIsIGFsbCA9IGZhbHNlKSB7XG4gICAgY29uc3Qgc3Vic3RyID0gc3RyLnRyaW1MZWZ0KCk7XG4gICAgY29uc3QgcmUgPSBhbGwgPyAvXi58XFxiLi9nIDogLyheXFx3KS87XG4gICAgcmV0dXJuIHN1YnN0ci5yZXBsYWNlKHJlLCAobWF0Y2gpID0+IG1hdGNoLnRvVXBwZXJDYXNlKCkpO1xufVxuIiwiaW1wb3J0IGVzY2FwZVBhdHRlcm4gZnJvbSAnLi9lc2NhcGVQYXR0ZXJuJztcblxuLy8gdGhlIG51bWJlciBvZiB0aW1lcyBzdWJzdHIgYXBwZWFycyB3aXRoaW4gc3RyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb3VudE9mKHN0ciwgc3Vic3RyLCBjYXNlU2Vuc2l0aXZlKSB7XG4gICAgY29uc3QgZXNjYXBlZFN0ciA9IGVzY2FwZVBhdHRlcm4oc3Vic3RyKTtcbiAgICBjb25zdCBmbGFncyA9ICghY2FzZVNlbnNpdGl2ZSkgPyAnaWcnIDogJ2cnO1xuICAgIHJldHVybiBzdHIubWF0Y2gobmV3IFJlZ0V4cChlc2NhcGVkU3RyLCBmbGFncykpLmxlbmd0aDtcbn1cbiIsIi8vIExldmVuc2h0ZWluIGRpc3RhbmNlIChlZGl0RGlzdGFuY2UpIGlzIGEgbWVhc3VyZSBvZiB0aGUgc2ltaWxhcml0eSBiZXR3ZWVuXG4vLyB0d28gc3RyaW5ncy4gVGhlIGRpc3RhbmNlIGlzIHRoZSBudW1iZXIgb2YgZGVsZXRpb25zLCBpbnNlcnRpb25zLCBvclxuLy8gc3Vic3RpdHV0aW9ucyByZXF1aXJlZCB0byB0cmFuc2Zvcm0gc291cmNlIGludG8gdGFyZ2V0LlxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZWRpdERpc3RhbmNlKHNvdXJjZSA9ICcnLCB0YXJnZXQgPSAnJykge1xuXG4gICAgaWYgKHNvdXJjZSA9PT0gdGFyZ2V0KSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIGlmICghc291cmNlLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gdGFyZ2V0Lmxlbmd0aDtcbiAgICB9XG5cbiAgICBpZiAoIXRhcmdldC5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZS5sZW5ndGg7XG4gICAgfVxuXG4gICAgY29uc3QgZCA9IFtdO1xuICAgIGxldCBpLCBqLCBjb3N0O1xuXG4gICAgZm9yIChpID0gMDsgaSA8PSBzb3VyY2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZFtpXSA9IFtdO1xuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDw9IHNvdXJjZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBkW2ldWzBdID0gaTtcbiAgICB9XG4gICAgZm9yIChqID0gMDsgaiA8PSB0YXJnZXQubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgZFswXVtqXSA9IGo7XG4gICAgfVxuXG4gICAgZm9yIChpID0gMTsgaSA8PSBzb3VyY2UubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICBjb25zdCBzaSA9IHNvdXJjZS5jaGFyQXQoaSAtIDEpO1xuICAgICAgICBmb3IgKGogPSAxOyBqIDw9IHRhcmdldC5sZW5ndGg7IGorKykge1xuXG4gICAgICAgICAgICBjb25zdCB0aiA9IHRhcmdldC5jaGFyQXQoaiAtIDEpO1xuXG4gICAgICAgICAgICBpZiAoc2kgPT09IHRqKSB7XG4gICAgICAgICAgICAgICAgY29zdCA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvc3QgPSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkW2ldW2pdID0gTWF0aC5taW4oZFtpIC0gMV1bal0gKyAxLCBkW2ldW2ogLSAxXSArIDEsIGRbaSAtIDFdW2ogLSAxXSArIGNvc3QpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRbc291cmNlLmxlbmd0aF1bdGFyZ2V0Lmxlbmd0aF07XG59XG4iLCIvLyB3aGV0aGVyIHN0ciBlbmRzIHdpdGggc3Vic3RyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlbmRzV2l0aChzdHIsIHN1YnN0cikge1xuICAgIHJldHVybiBzdHIubGFzdEluZGV4T2Yoc3Vic3RyKSA9PT0gc3RyLmxlbmd0aCAtIHN1YnN0ci5sZW5ndGg7XG59XG4iLCIvLyByZWdleCBlc2NhcGUgcGF0dGVyblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXNjYXBlUGF0dGVybihwYXR0ZXJuKSB7XG4gICAgcmV0dXJuIHBhdHRlcm4ucmVwbGFjZSgvKFxcXXxcXFt8XFx7fFxcfXxcXCh8XFwpfFxcKnxcXCt8XFw/fFxcLnxcXFxcKS9nLCAnXFxcXCQxJyk7XG59XG4iLCJpbXBvcnQgcmVtb3ZlRXh0cmFXaGl0ZXNwYWNlIGZyb20gJy4vcmVtb3ZlRXh0cmFXaGl0ZXNwYWNlJztcblxuLy8gd2hldGhlciBzdHIgY29udGFpbnMgYW55IHRleHRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGhhc1RleHQoc3RyKSB7XG4gICAgcmV0dXJuICEhcmVtb3ZlRXh0cmFXaGl0ZXNwYWNlKHN0cikubGVuZ3RoO1xufVxuIiwiaW1wb3J0IGFmdGVyRmlyc3QgZnJvbSAnLi9hZnRlckZpcnN0JztcbmltcG9ydCBhZnRlckxhc3QgZnJvbSAnLi9hZnRlckxhc3QnO1xuaW1wb3J0IGJlZm9yZUZpcnN0IGZyb20gJy4vYmVmb3JlRmlyc3QnO1xuaW1wb3J0IGJlZm9yZUxhc3QgZnJvbSAnLi9iZWZvcmVMYXN0JztcbmltcG9ydCBiZWdpbnNXaXRoIGZyb20gJy4vYmVnaW5zV2l0aCc7XG5pbXBvcnQgYmV0d2VlbiBmcm9tICcuL2JldHdlZW4nO1xuaW1wb3J0IGJsb2NrIGZyb20gJy4vYmxvY2snO1xuaW1wb3J0IGNhcGl0YWxpemUgZnJvbSAnLi9jYXBpdGFsaXplJztcbmltcG9ydCBjb3VudE9mIGZyb20gJy4vY291bnRPZic7XG5pbXBvcnQgZWRpdERpc3RhbmNlIGZyb20gJy4vZWRpdERpc3RhbmNlJztcbmltcG9ydCBlbmRzV2l0aCBmcm9tICcuL2VuZHNXaXRoJztcbmltcG9ydCBlc2NhcGVQYXR0ZXJuIGZyb20gJy4vZXNjYXBlUGF0dGVybic7XG5pbXBvcnQgaGFzVGV4dCBmcm9tICcuL2hhc1RleHQnO1xuaW1wb3J0IGlzTnVtZXJpYyBmcm9tICcuL2lzTnVtZXJpYyc7XG5pbXBvcnQgcGFkTGVmdCBmcm9tICcuL3BhZExlZnQnO1xuaW1wb3J0IHBhZFJpZ2h0IGZyb20gJy4vcGFkUmlnaHQnO1xuaW1wb3J0IHByb3BlckNhc2UgZnJvbSAnLi9wcm9wZXJDYXNlJztcbmltcG9ydCByZW1vdmUgZnJvbSAnLi9yZW1vdmUnO1xuaW1wb3J0IHJlbW92ZUV4dHJhV2hpdGVzcGFjZSBmcm9tICcuL3JlbW92ZUV4dHJhV2hpdGVzcGFjZSc7XG5pbXBvcnQgcmV2ZXJzZSBmcm9tICcuL3JldmVyc2UnO1xuaW1wb3J0IHJldmVyc2VXb3JkcyBmcm9tICcuL3JldmVyc2VXb3Jkcyc7XG5pbXBvcnQgc2ltaWxhcml0eSBmcm9tICcuL3NpbWlsYXJpdHknO1xuaW1wb3J0IHN0cmlwVGFncyBmcm9tICcuL3N0cmlwVGFncyc7XG5pbXBvcnQgc3dhcENhc2UgZnJvbSAnLi9zd2FwQ2FzZSc7XG5pbXBvcnQgdGltZUNvZGUgZnJvbSAnLi90aW1lQ29kZSc7XG5pbXBvcnQgdHJ1bmNhdGUgZnJvbSAnLi90cnVuY2F0ZSc7XG5pbXBvcnQgd29yZENvdW50IGZyb20gJy4vd29yZENvdW50JztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGFmdGVyRmlyc3QsXG4gICAgYWZ0ZXJMYXN0LFxuICAgIGJlZm9yZUZpcnN0LFxuICAgIGJlZm9yZUxhc3QsXG4gICAgYmVnaW5zV2l0aCxcbiAgICBiZXR3ZWVuLFxuICAgIGJsb2NrLFxuICAgIGNhcGl0YWxpemUsXG4gICAgY291bnRPZixcbiAgICBlZGl0RGlzdGFuY2UsXG4gICAgZW5kc1dpdGgsXG4gICAgZXNjYXBlUGF0dGVybixcbiAgICBoYXNUZXh0LFxuICAgIGlzTnVtZXJpYyxcbiAgICBwYWRMZWZ0LFxuICAgIHBhZFJpZ2h0LFxuICAgIHByb3BlckNhc2UsXG4gICAgcmVtb3ZlLFxuICAgIHJlbW92ZUV4dHJhV2hpdGVzcGFjZSxcbiAgICByZXZlcnNlLFxuICAgIHJldmVyc2VXb3JkcyxcbiAgICBzaW1pbGFyaXR5LFxuICAgIHN0cmlwVGFncyxcbiAgICBzd2FwQ2FzZSxcbiAgICB0aW1lQ29kZSxcbiAgICB0cnVuY2F0ZSxcbiAgICB3b3JkQ291bnRcbn07XG4iLCIvLyB3aGV0aGVyIHN0ciBpcyBudW1lcmljXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc051bWVyaWMoc3RyKSB7XG4gICAgY29uc3QgcmVneCA9IC9eWy0rXT9cXGQqXFwuP1xcZCsoPzpbZUVdWy0rXT9cXGQrKT8kLztcbiAgICByZXR1cm4gcmVneC50ZXN0KHN0cik7XG59XG4iLCIvLyBwYWQgc3RyIHdpdGggc3Vic3RyIGZyb20gdGhlIGxlZnRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhZExlZnQoc3RyLCBzdWJzdHIsIGxlbmd0aCkge1xuICAgIHdoaWxlIChzdHIubGVuZ3RoIDwgbGVuZ3RoKSB7XG4gICAgICAgIHN0ciA9IHN1YnN0ciArIHN0cjtcbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbn1cbiIsIi8vIHBhZHMgc3RyIHdpdGggc3Vic3RyIGZyb20gdGhlIHJpZ2h0XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYWRSaWdodChzdHIsIHN1YnN0ciwgbGVuZ3RoKSB7XG4gICAgd2hpbGUgKHN0ci5sZW5ndGggPCBsZW5ndGgpIHtcbiAgICAgICAgc3RyICs9IHN1YnN0cjtcbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbn1cbiIsImltcG9ydCBjYXBpdGFsaXplIGZyb20gJy4vY2FwaXRhbGl6ZSc7XG5cbi8vIHByb3BlciBjYXNlIHN0ciBpbiBzZW50ZW5jZSBmb3JtYXRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHByb3BlckNhc2Uoc3RyKSB7XG4gICAgY29uc3QgbmV3U3RyID0gc3RyLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxiKFteLj87IV0rKS8sIGNhcGl0YWxpemUpO1xuICAgIHJldHVybiBuZXdTdHIucmVwbGFjZSgvXFxiW2ldXFxiLywgJ0knKTtcbn1cbiIsImltcG9ydCBlc2NhcGVQYXR0ZXJuIGZyb20gJy4vZXNjYXBlUGF0dGVybic7XG5cbi8vIHJlbW92ZSBhbGwgaW5zdGFuY2VzIG9mIHN1YnN0ciBpbiBzdHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbW92ZShzdHIsIHN1YnN0ciwgY2FzZVNlbnNpdGl2ZSA9IGZhbHNlKSB7XG4gICAgY29uc3QgZXNjYXBlZFN0ciA9IGVzY2FwZVBhdHRlcm4oc3Vic3RyKTtcbiAgICBjb25zdCBmbGFncyA9IGNhc2VTZW5zaXRpdmUgPyAnZycgOiAnaWcnO1xuICAgIHJldHVybiBzdHIucmVwbGFjZShuZXcgUmVnRXhwKGVzY2FwZWRTdHIsIGZsYWdzKSwgJycpO1xufVxuIiwiLy8gcmVtb3ZlIGV4dHJhIHdoaXRlc3BhY2UgKGV4dHJhIHNwYWNlcywgdGFicywgbGluZSBicmVha3MsIGV0YylcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbW92ZUV4dHJhV2hpdGVzcGFjZShzdHIpIHtcbiAgICByZXR1cm4gc3RyLnRyaW0oKS5yZXBsYWNlKC9cXHMrL2csICcgJyk7XG59XG4iLCIvLyByZXZlcnNlIGNoYXJhY3RlciBvcmRlclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmV2ZXJzZShzdHIpIHtcbiAgICByZXR1cm4gc3RyLnNwbGl0KCcnKS5yZXZlcnNlKCkuam9pbignJyk7XG59XG4iLCIvLyByZXZlcnNlIHdvcmQgb3JkZXJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJldmVyc2VXb3JkcyhzdHIpIHtcbiAgICByZXR1cm4gc3RyLnNwbGl0KCcgJykucmV2ZXJzZSgpLmpvaW4oJyAnKTtcbn1cbiIsImltcG9ydCBlZGl0RGlzdGFuY2UgZnJvbSAnLi9lZGl0RGlzdGFuY2UnO1xuXG4vLyBwZXJjZW50YWdlIG9mIHNpbWlsaWFyaXR5IGZyb20gMCB0byAxXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzaW1pbGFyaXR5KGEsIGIpIHtcbiAgICBjb25zdCBlID0gZWRpdERpc3RhbmNlKGEsIGIpO1xuICAgIGNvbnN0IG0gPSBNYXRoLm1heChhLmxlbmd0aCwgYi5sZW5ndGgpO1xuICAgIGlmIChtID09PSAwKSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgIH1cbiAgICByZXR1cm4gKDEgLSBlIC8gbSk7XG59XG4iLCIvLyByZW1vdmUgYWxsIEhUTUwgdGFncyBmcm9tIHN0clxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3RyaXBUYWdzKHN0cikge1xuICAgIHJldHVybiBzdHIucmVwbGFjZSgvPFxcLz9bXj5dKz4vaWdtLCAnJyk7XG59XG4iLCJcbi8vIHN3YXBzIHRoZSBjYXNlIG9mIHN0clxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3dhcENhc2Uoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC8oXFx3KS8sIGZ1bmN0aW9uKG5ld1N0cikge1xuICAgICAgICBjb25zdCBsb3dlciA9IG5ld1N0ci50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCB1cHBlciA9IG5ld1N0ci50b1VwcGVyQ2FzZSgpO1xuICAgICAgICBzd2l0Y2ggKG5ld1N0cikge1xuICAgICAgICAgICAgY2FzZSBsb3dlcjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdXBwZXI7XG4gICAgICAgICAgICBjYXNlIHVwcGVyOlxuICAgICAgICAgICAgICAgIHJldHVybiBsb3dlcjtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld1N0cjtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuIiwiLy8gZm9ybWF0cyBzZWNvbmRzIGludG8gSEg6TU06U1NcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRpbWVDb2RlKHNlY29uZHMsIGRlbGltID0gJzonKSB7XG4gICAgY29uc3QgaCA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDM2MDApO1xuICAgIGNvbnN0IG0gPSBNYXRoLmZsb29yKChzZWNvbmRzICUgMzYwMCkgLyA2MCk7XG4gICAgY29uc3QgcyA9IE1hdGguZmxvb3IoKHNlY29uZHMgJSAzNjAwKSAlIDYwKTtcbiAgICBjb25zdCBociA9IChoIDwgMTAgPyAnMCcgKyBoIDogaCkgKyBkZWxpbTtcbiAgICBjb25zdCBtbiA9IChtIDwgMTAgPyAnMCcgKyBtIDogbSkgKyBkZWxpbTtcbiAgICBjb25zdCBzYyA9IChzIDwgMTAgPyAnMCcgKyBzIDogcyk7XG4gICAgcmV0dXJuIGhyICsgbW4gKyBzYztcbn1cbiIsIi8vIHRydW5jYXRlIHRvIGxlbmd0aCB3aXRoIHN1ZmZpeFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdHJ1bmNhdGUoc3RyLCBsZW4sIHN1ZmZpeCA9ICcuLi4nKSB7XG4gICAgbGVuIC09IHN1ZmZpeC5sZW5ndGg7XG4gICAgbGV0IHRydW5jID0gc3RyO1xuICAgIGlmICh0cnVuYy5sZW5ndGggPiBsZW4pIHtcbiAgICAgICAgdHJ1bmMgPSB0cnVuYy5zdWJzdHIoMCwgbGVuKTtcbiAgICAgICAgY29uc3QgciA9IC9bXlxcc10vO1xuICAgICAgICBpZiAoci50ZXN0KHN0ci5jaGFyQXQobGVuKSkpIHtcbiAgICAgICAgICAgIHRydW5jID0gdHJ1bmMucmVwbGFjZSgvXFx3KyR8XFxzKyQvLCAnJykudHJpbVJpZ2h0KCk7XG4gICAgICAgIH1cbiAgICAgICAgdHJ1bmMgKz0gc3VmZml4O1xuICAgIH1cbiAgICByZXR1cm4gdHJ1bmM7XG59XG4iLCIvLyB0aGUgbnVtYmVyIG9mIHdvcmRzIGluIGEgc3RyaW5nXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB3b3JkQ291bnQoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5tYXRjaCgvXFxiXFx3K1xcYi9nKS5sZW5ndGg7XG59XG4iXX0=
