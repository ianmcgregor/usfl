(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.usfl = factory());
}(this, (function () { 'use strict';

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
        var toggle = window.DOMTokenList.prototype.toggle;

        window.DOMTokenList.prototype.toggle = function (token, force) {
            force = !!force;
            if (arguments.length > 1 && this.contains(token) === force) {
                return force;
            } else {
                return toggle.call(this, token);
            }
        };
    }

    testElement = null;
})();

(function (fn) {
    window.console = window.console || {};
    var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'memory', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'timeline', 'timelineEnd', 'trace', 'warn'];
    methods.forEach(function (name) {
        window.console[name] = window.console[name] || fn;
    });
})(function () {});

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

function array$1(length, value) {
    var arr = [];
    for (var i = 0; i < length; i++) {
        var val = typeof value !== 'undefined' ? value : i;
        arr.push(val);
    }
    return arr;
}

function clone(arr) {
    return arr.slice(0);
}

function moveElement(arr, from, to) {
    arr = arr.slice(0);
    var removed = arr.splice(from, 1)[0];
    var insertAt = to < 0 ? arr.length + to : to;
    arr.splice(insertAt, 0, removed);
    return arr;
}

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

function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function sortAlpha(a, b) {
    if (arguments.length === 1) {
        return function (x, y) {
            return String(x[a]).toLowerCase() > String(y[a]).toLowerCase() ? 1 : -1;
        };
    }
    return String(a).toLowerCase() > String(b).toLowerCase() ? 1 : -1;
}

var re = /[^0-9.-]/g;

function diff(a, b) {
    var a1 = a.replace(re, '');
    var b1 = b.replace(re, '');
    return Number(a1) - Number(b1);
}

function sortNumbered(a, b) {
    if (arguments.length === 1) {
        return function (x, y) {
            return diff(x[a], y[a]);
        };
    }
    return diff(a, b);
}

function sortNumeric(a, b) {
    if (arguments.length === 1) {
        return function (x, y) {
            return Number(x[a]) - Number(y[a]);
        };
    }
    return Number(a) - Number(b);
}

function sortRandom() {
    return Math.random() > 0.5 ? -1 : 1;
}

var array$$1 = {
    array: array$1,
    clone: clone,
    moveElement: moveElement,
    nearest: nearest,
    randomChoice: randomChoice,
    sortAlpha: sortAlpha,
    sortNumbered: sortNumbered,
    sortNumeric: sortNumeric,
    sortRandom: sortRandom
};

function blockScrolling(value) {
    document.body.style.overflow = value ? 'hidden' : '';
}

function elCoords(el) {
    var box = el.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top = box.top + scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return {
        top: Math.round(top),
        left: Math.round(left),
        x: Math.round(left),
        y: Math.round(top)
    };
}

function forceRedraw(el) {
    var display = el.style.display;
    el.style.display = 'none';
    el.offsetHeight;
    el.style.display = display;
}

function getPageHeight() {
    var body = document.body;
    var doc = document.documentElement;

    return Math.max(body.scrollHeight || 0, body.offsetHeight || 0, body.clientHeight || 0, doc.clientHeight || 0, doc.offsetHeight || 0, doc.scrollHeight || 0);
}

function getScrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop;
}

function getScrollPercentage() {
    return (getScrollTop() + window.innerHeight) / document.body.clientHeight;
}

function getScrollRemaining() {
    var b = document.body;
    return Math.abs(getScrollTop() - (b.scrollHeight - b.clientHeight));
}

function getSrcsetImage(srcset, pixelWidth) {
    pixelWidth = pixelWidth || window.innerWidth * (window.devicePixelRatio || 0);

    var set = srcset.split(',').map(function (item) {
        var _item$trim$split = item.trim().split(/\s+/),
            url = _item$trim$split[0],
            width = _item$trim$split[1];

        var size = parseInt(width.slice(0, -1), 10);
        return { url: url, size: size };
    }).sort(function (a, b) {
        return b.size - a.size;
    });

    if (!set.length) {
        return '';
    }

    return set.reduce(function (value, item) {
        return item.size >= pixelWidth ? item.url : value;
    }, set[0].url);
}

function isElementInViewport(el) {
    var buffer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    var rect = el.getBoundingClientRect();
    return rect.top >= 0 - buffer && rect.left >= 0 - buffer && rect.bottom <= window.innerHeight + buffer && rect.right <= window.innerWidth + buffer;
}

function isPageEnd() {
    var buffer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    return getScrollRemaining() <= buffer;
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

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
var events = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function (n) {
  if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function (type) {
  var er, handler, len, args, i, listeners;

  if (!this._events) this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler)) return false;

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
    for (i = 0; i < len; i++) {
      listeners[i].apply(this, args);
    }
  }

  return true;
};

EventEmitter.prototype.addListener = function (type, listener) {
  var m;

  if (!isFunction(listener)) throw TypeError('listener must be a function');

  if (!this._events) this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener) this.emit('newListener', type, isFunction(listener.listener) ? listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);else
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
      console.error('(node) warning: possible EventEmitter memory ' + 'leak detected. %d listeners added. ' + 'Use emitter.setMaxListeners() to increase limit.', this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function (type, listener) {
  if (!isFunction(listener)) throw TypeError('listener must be a function');

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
EventEmitter.prototype.removeListener = function (type, listener) {
  var list, position, length, i;

  if (!isFunction(listener)) throw TypeError('listener must be a function');

  if (!this._events || !this._events[type]) return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener || isFunction(list.listener) && list.listener === listener) {
    delete this._events[type];
    if (this._events.removeListener) this.emit('removeListener', type, listener);
  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener || list[i].listener && list[i].listener === listener) {
        position = i;
        break;
      }
    }

    if (position < 0) return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener) this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function (type) {
  var key, listeners;

  if (!this._events) return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0) this._events = {};else if (this._events[type]) delete this._events[type];
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
    while (listeners.length) {
      this.removeListener(type, listeners[listeners.length - 1]);
    }
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function (type) {
  var ret;
  if (!this._events || !this._events[type]) ret = [];else if (isFunction(this._events[type])) ret = [this._events[type]];else ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function (type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener)) return 1;else if (evlistener) return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function (emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

var emitter = function (_events$EventEmitter) {
    inherits(emitter, _events$EventEmitter);

    function emitter() {
        classCallCheck(this, emitter);

        var _this = possibleConstructorReturn(this, _events$EventEmitter.call(this));

        _this.setMaxListeners(20);
        return _this;
    }

    emitter.prototype.off = function off(type, listener) {
        if (listener) {
            return this.removeListener(type, listener);
        }
        if (type) {
            return this.removeAllListeners(type);
        }
        return this.removeAllListeners();
    };

    return emitter;
}(events.EventEmitter);

var eventBus = Object.create(emitter.prototype);

function resize() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$onResize = _ref.onResize,
        onResize = _ref$onResize === undefined ? function () {
        return eventBus.emit('resize');
    } : _ref$onResize,
        _ref$callNow = _ref.callNow,
        callNow = _ref$callNow === undefined ? false : _ref$callNow,
        _ref$debouceDelay = _ref.debouceDelay,
        debouceDelay = _ref$debouceDelay === undefined ? 500 : _ref$debouceDelay;

    var timeoutId = null;

    function resizeHandler() {
        clearTimeout(timeoutId);
        timeoutId = window.setTimeout(function () {
            return onResize();
        }, debouceDelay);
    }

    function start() {
        window.addEventListener('resize', resizeHandler, false);
    }

    function stop() {
        window.removeEventListener('resize', resizeHandler);
    }

    start();

    if (callNow) {
        resizeHandler();
    }

    return { start: start, stop: stop };
}

function scroll() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$onScroll = _ref.onScroll,
        onScroll = _ref$onScroll === undefined ? function (lastScrollY) {
        return eventBus.emit('scroll', lastScrollY);
    } : _ref$onScroll,
        _ref$onScrollEnd = _ref.onScrollEnd,
        onScrollEnd = _ref$onScrollEnd === undefined ? function (lastScrollY) {
        return eventBus.emit('scrollend', lastScrollY);
    } : _ref$onScrollEnd,
        _ref$callNow = _ref.callNow,
        callNow = _ref$callNow === undefined ? false : _ref$callNow,
        _ref$endTimeout = _ref.endTimeout,
        endTimeout = _ref$endTimeout === undefined ? 200 : _ref$endTimeout;

    var lastScrollY = 0;
    var ticking = false;
    var timeoutId = void 0;

    function update() {
        clearTimeout(timeoutId);
        timeoutId = window.setTimeout(function () {
            return onScrollEnd(lastScrollY);
        }, endTimeout);

        onScroll(lastScrollY);
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(update);
            ticking = true;
        }
    }

    function scrollHandler() {
        // lastScrollY = window.scrollY;
        lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
        requestTick();
    }

    function start() {
        window.addEventListener('scroll', scrollHandler, false);
    }

    function stop() {
        window.removeEventListener('scroll', scrollHandler);
    }

    start();

    if (callNow) {
        scrollHandler();
    }

    return { start: start, stop: stop };
}

function setStyle(el, style) {
    Object.keys(style).forEach(function (prop) {
        el.style[prop] = style[prop];
    });
    return el;
}

function transitionEnd(el, cb) {
    var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;


    var timeoutId = null;

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
}

var dom = {
    blockScrolling: blockScrolling,
    elCoords: elCoords,
    forceRedraw: forceRedraw,
    getPageHeight: getPageHeight,
    getScrollPercentage: getScrollPercentage,
    getScrollRemaining: getScrollRemaining,
    getScrollTop: getScrollTop,
    getSrcsetImage: getSrcsetImage,
    isElementInViewport: isElementInViewport,
    isPageEnd: isPageEnd,
    resize: resize,
    scroll: scroll,
    setStyle: setStyle,
    transitionEnd: transitionEnd
};

function easeInBack(t, b, c, d) {
    var s = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1.70158;

    return c * (t /= d) * t * ((s + 1) * t - s) + b;
}

function easeOutBack(t, b, c, d) {
    var s = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1.70158;

    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
}

function easeInOutBack(t, b, c, d) {
    var s = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1.70158;

    if ((t /= d / 2) < 1) {
        return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
    }
    return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
}

var back = {
    easeIn: easeInBack,
    easeOut: easeOutBack,
    easeInOut: easeInOutBack
};

function easeOutBounce(t, b, c, d) {
    if ((t /= d) < 1 / 2.75) {
        return c * (7.5625 * t * t) + b;
    } else if (t < 2 / 2.75) {
        return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
    } else if (t < 2.5 / 2.75) {
        return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
    }
    return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
}

function easeInBounce(t, b, c, d) {
    return c - easeOutBounce(d - t, 0, c, d) + b;
}

function easeInOutBounce(t, b, c, d) {
    if (t < d / 2) {
        return easeInBounce(t * 2, 0, c, d) * 0.5 + b;
    }
    return easeOutBounce(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
}

var bounce = {
    easeIn: easeInBounce,
    easeOut: easeOutBounce,
    easeInOut: easeInOutBounce
};

var sqrt = Math.sqrt;


function easeInCircular(t, b, c, d) {
    return -c * (sqrt(1 - (t /= d) * t) - 1) + b;
}

function easeOutCircular(t, b, c, d) {
    return c * sqrt(1 - (t = t / d - 1) * t) + b;
}

function easeInOutCircular(t, b, c, d) {
    if ((t /= d / 2) < 1) {
        return -c / 2 * (sqrt(1 - t * t) - 1) + b;
    }
    return c / 2 * (sqrt(1 - (t -= 2) * t) + 1) + b;
}

var circular = {
    easeIn: easeInCircular,
    easeOut: easeOutCircular,
    easeInOut: easeInOutCircular
};

function easeInCubic(t, b, c, d) {
    return c * (t /= d) * t * t + b;
}

function easeOutCubic(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
}

function easeInOutCubic(t, b, c, d) {
    if ((t /= d / 2) < 1) {
        return c / 2 * t * t * t + b;
    }
    return c / 2 * ((t -= 2) * t * t + 2) + b;
}

var cubic = {
    easeIn: easeInCubic,
    easeOut: easeOutCubic,
    easeInOut: easeInOutCubic
};

var abs = Math.abs;
var asin = Math.asin;
var PI = Math.PI;
var pow = Math.pow;
var sin = Math.sin;

var PI_2 = PI * 2;

function easeInElastic(t, b, c, d, a, p) {
    var s = void 0;
    if (t === 0) {
        return b;
    }
    if ((t /= d) === 1) {
        return b + c;
    }
    if (!p) {
        p = d * 0.3;
    }
    if (!a || a < abs(c)) {
        a = c;
        s = p / 4;
    } else {
        s = p / PI_2 * asin(c / a);
    }
    return -(a * pow(2, 10 * (t -= 1)) * sin((t * d - s) * PI_2 / p)) + b;
}

function easeOutElastic(t, b, c, d, a, p) {
    var s = void 0;
    if (t === 0) {
        return b;
    }
    if ((t /= d) === 1) {
        return b + c;
    }
    if (!p) {
        p = d * 0.3;
    }
    if (!a || a < abs(c)) {
        a = c;
        s = p / 4;
    } else {
        s = p / PI_2 * asin(c / a);
    }
    return a * pow(2, -10 * t) * sin((t * d - s) * PI_2 / p) + c + b;
}

function easeInOutElastic(t, b, c, d, a, p) {
    var s = void 0;
    if (t === 0) {
        return b;
    }
    if ((t /= d / 2) === 2) {
        return b + c;
    }
    if (!p) {
        p = d * (0.3 * 1.5);
    }
    if (!a || a < abs(c)) {
        a = c;
        s = p / 4;
    } else {
        s = p / PI_2 * asin(c / a);
    }
    if (t < 1) {
        return -0.5 * (a * pow(2, 10 * (t -= 1)) * sin((t * d - s) * PI_2 / p)) + b;
    }
    return a * pow(2, -10 * (t -= 1)) * sin((t * d - s) * PI_2 / p) * 0.5 + c + b;
}

var elastic = {
    easeIn: easeInElastic,
    easeOut: easeOutElastic,
    easeInOut: easeInOutElastic
};

var pow$1 = Math.pow;


function easeInExpo(t, b, c, d) {
    return t === 0 ? b : c * pow$1(2, 10 * (t / d - 1)) + b;
}

function easeOutExpo(t, b, c, d) {
    return t === d ? b + c : c * (-pow$1(2, -10 * t / d) + 1) + b;
}

function easeInOutExpo(t, b, c, d) {
    if (t === 0) {
        return b;
    }
    if (t === d) {
        return b + c;
    }
    if ((t /= d / 2) < 1) {
        return c / 2 * pow$1(2, 10 * (t - 1)) + b;
    }
    return c / 2 * (-pow$1(2, -10 * --t) + 2) + b;
}

var expo = {
    easeIn: easeInExpo,
    easeOut: easeOutExpo,
    easeInOut: easeInOutExpo
};

function easeLinear(t, b, c, d) {
    return c * t / d + b;
}

var linear = {
    easeIn: easeLinear,
    easeOut: easeLinear,
    easeInOut: easeLinear
};

function easeInQuad(t, b, c, d) {
    return c * (t /= d) * t + b;
}

function easeOutQuad(t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b;
}

function easeInOutQuad(t, b, c, d) {
    if ((t /= d / 2) < 1) {
        return c / 2 * t * t + b;
    }
    return -c / 2 * (--t * (t - 2) - 1) + b;
}

var quad = {
    easeIn: easeInQuad,
    easeOut: easeOutQuad,
    easeInOut: easeInOutQuad
};

function easeInQuart(t, b, c, d) {
    return c * (t /= d) * t * t * t + b;
}

function easeOutQuart(t, b, c, d) {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
}

function easeInOutQuart(t, b, c, d) {
    if ((t /= d / 2) < 1) {
        return c / 2 * t * t * t * t + b;
    }
    return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
}

var quart = {
    easeIn: easeInQuart,
    easeOut: easeOutQuart,
    easeInOut: easeInOutQuart
};

function easeInQuint(t, b, c, d) {
    return c * (t /= d) * t * t * t * t + b;
}

function easeOutQuint(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
}

function easeInOutQuint(t, b, c, d) {
    if ((t /= d / 2) < 1) {
        return c / 2 * t * t * t * t * t + b;
    }
    return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
}

var quint = {
    easeIn: easeInQuint,
    easeOut: easeOutQuint,
    easeInOut: easeInOutQuint
};

var cos = Math.cos;
var PI$1 = Math.PI;
var sin$1 = Math.sin;

var PI_D2 = PI$1 / 2;

function easeInSine(t, b, c, d) {
    return -c * cos(t / d * PI_D2) + c + b;
}

function easeOutSine(t, b, c, d) {
    return c * sin$1(t / d * PI_D2) + b;
}

function easeInOutSine(t, b, c, d) {
    return -c / 2 * (cos(PI$1 * t / d) - 1) + b;
}

var sine = {
    easeIn: easeInSine,
    easeOut: easeOutSine,
    easeInOut: easeInOutSine
};

var ease = {
    back: back,
    bounce: bounce,
    circular: circular,
    cubic: cubic,
    elastic: elastic,
    expo: expo,
    linear: linear,
    quad: quad,
    quart: quart,
    quint: quint,
    sine: sine,
    easeLinear: easeLinear,
    easeInBack: easeInBack,
    easeOutBack: easeOutBack,
    easeInOutBack: easeInOutBack,
    easeInBounce: easeInBounce,
    easeOutBounce: easeOutBounce,
    easeInOutBounce: easeInOutBounce,
    easeInCircular: easeInCircular,
    easeOutCircular: easeOutCircular,
    easeInOutCircular: easeInOutCircular,
    easeInCubic: easeInCubic,
    easeOutCubic: easeOutCubic,
    easeInOutCubic: easeInOutCubic,
    easeInElastic: easeInElastic,
    easeOutElastic: easeOutElastic,
    easeInOutElastic: easeInOutElastic,
    easeInExpo: easeInExpo,
    easeOutExpo: easeOutExpo,
    easeInOutExpo: easeInOutExpo,
    easeInQuad: easeInQuad,
    easeOutQuad: easeOutQuad,
    easeInOutQuad: easeInOutQuad,
    easeInQuart: easeInQuart,
    easeOutQuart: easeOutQuart,
    easeInOutQuart: easeInOutQuart,
    easeInQuint: easeInQuint,
    easeOutQuint: easeOutQuint,
    easeInOutQuint: easeInOutQuint,
    easeInSine: easeInSine,
    easeOutSine: easeOutSine,
    easeInOutSine: easeInOutSine
};

/*
TERMS OF USE - EASING EQUATIONS

Open source under the BSD License.

Copyright © 2001 Robert Penner
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this
list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this
list of conditions and the following disclaimer in the documentation and/or
other materials provided with the distribution.
Neither the name of the author nor the names of contributors may be used to
endorse or promote products derived from this software without specific
prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

function debounce(handler) {
    var ticking = false;

    function update(event) {
        handler(event);
        ticking = false;
    }

    function requestTick(event) {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                return update(event);
            });
            ticking = true;
        }
    }

    return requestTick;
}

function delegateEvents(parentEl, eventType, filter, fn) {

    if (typeof filter === 'string') {
        var tagName = filter.toUpperCase();
        filter = function filter(target) {
            return target.tagName === tagName;
        };
    }

    parentEl.addEventListener(eventType, function (event) {
        var target = event.target;

        while (target !== parentEl) {
            if (filter(target)) {
                event.stopImmediatePropagation();
                fn(target, event);
                break;
            }
            target = target.parentNode;
        }
    });
}

function heartbeat(interval) {
    var beat = null,
        time = 0,
        numTimes = 0,
        maxTimes = 0,
        running = false;

    function start() {
        var maxNumTimes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var timeOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        maxTimes = maxNumTimes;
        time = timeOffset;
        numTimes = 0;
        running = true;
        return beat;
    }

    function stop() {
        running = false;
        return beat;
    }

    function update() {
        var dt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

        if (!running) {
            return beat;
        }

        if (maxTimes > 0 && numTimes >= maxTimes) {
            running = false;
            beat.emit('complete');
            return beat;
        }

        time += dt;

        if (time >= interval) {
            time = 0;
            numTimes++;
            beat.emit('update', numTimes);
        }
        return beat;
    }

    function setInterval(value) {
        interval = value;
        return beat;
    }

    beat = Object.assign(Object.create(emitter.prototype), {
        start: start,
        stop: stop,
        update: update,
        get interval() {
            return interval;
        },
        set interval(value) {
            interval = value;
        },
        setInterval: setInterval
    });

    return beat;
}

var events$2 = {
    debounce: debounce,
    delegateEvents: delegateEvents,
    emitter: emitter,
    eventBus: eventBus,
    heartbeat: heartbeat
};

var time = 0;
var fps = 0;
var currentFps = 0;
var averageFps = 0;
var ticks = 0;
var totalFps = 0;
var lastFps = 0;
var lastAverage = 0;
var logMsg = null;

var el = document.createElement('div');
el.setAttribute('id', 'fps');
el.style.fontFamily = 'monospace';
el.style.position = 'fixed';
el.style.left = '0';
el.style.top = '0';
el.style.padding = '2px 6px';
el.style.zIndex = '99999';
el.style.background = '#000';
el.style.color = '#fff';
el.style.fontSize = '10px';
el.style.userSelect = 'none';
document.body.appendChild(el);

function report() {
    lastFps = currentFps;
    lastAverage = averageFps;
    el.innerHTML = 'FPS: ' + currentFps + '<br />AVE: ' + averageFps;

    if (logMsg) {
        el.innerHTML = el.innerHTML + '<br />MSG: ' + logMsg;
    }
}

function update(now) {
    if (typeof now === 'undefined') {
        now = Date.now();
    }

    if (time === 0) {
        time = now;
    }

    if (now - 1000 > time) {
        time = now;
        currentFps = fps;
        fps = 0;

        if (currentFps > 1) {
            ticks++;
            totalFps += currentFps;
            averageFps = Math.floor(totalFps / ticks);
        }

        if (currentFps !== lastFps || averageFps !== lastAverage) {
            report();
        }
    }

    fps++;
}

function auto() {
    window.requestAnimationFrame(auto);
    update();
}

function log(value) {
    logMsg = String(value);
    report();
}

function style(props) {
    Object.keys(props).forEach(function (prop) {
        el.style[prop] = props[prop];
    });
}

var fps$1 = {
    auto: auto,
    el: el,
    log: log,
    style: style,
    update: update
};

var request = null;
var exit = null;
var change = null;
var error = null;
var element = null;
var enabled = null;

var docEl = document.documentElement;

if (typeof docEl.requestFullscreen !== 'undefined') {
    request = 'requestFullscreen';
    exit = 'exitFullscreen';
    change = 'fullscreenchange';
    error = 'fullscreenerror';
    element = 'fullscreenElement';
    enabled = 'fullscreenEnabled';
} else if (typeof docEl.mozRequestFullScreen !== 'undefined') {
    request = 'mozRequestFullScreen';
    exit = 'mozCancelFullScreen';
    change = 'mozfullscreenchange';
    error = 'mozfullscreenerror';
    element = 'mozFullScreenElement';
    enabled = 'mozFullScreenEnabled';
} else if (typeof docEl.msRequestFullscreen !== 'undefined') {
    request = 'msRequestFullscreen';
    exit = 'msExitFullscreen';
    change = 'MSFullscreenChange';
    error = 'MSFullscreenError';
    element = 'msFullscreenElement';
    enabled = 'msFullscreenEnabled';
} else if (typeof docEl.webkitRequestFullscreen !== 'undefined') {
    request = 'webkitRequestFullscreen';
    exit = 'webkitExitFullscreen';
    change = 'webkitfullscreenchange';
    error = 'webkitFullscreenError';
    element = 'webkitFullscreenElement';
    enabled = 'webkitFullscreenEnabled';
}

var api = {
    request: request,
    exit: exit,
    change: change,
    error: error,
    element: element,
    enabled: enabled
};

var fullscreen = Object.create(emitter.prototype);

document.addEventListener(api.change, function (event) {
    fullscreen.emit('change', event);
});

document.addEventListener(api.error, function (event) {
    fullscreen.emit('error', event);
});

Object.defineProperties(fullscreen, {
    request: {
        value: function value(el) {
            el = el || document.documentElement;
            el[api.request](true);
        }
    },
    exit: {
        value: function value() {
            document[api.exit]();
        }
    },
    toggle: {
        value: function value(el) {
            if (this.isFullscreen) {
                this.exit();
            } else {
                this.request(el);
            }
        }
    },
    isSupported: {
        get: function get() {
            return !!api.request;
        }
    },
    isFullscreen: {
        get: function get() {
            return !!document[api.element];
        }
    },
    element: {
        enumerable: true,
        get: function get() {
            return document[api.element];
        }
    },
    enabled: {
        enumerable: true,
        get: function get() {
            return document[api.enabled];
        }
    }
});

function getColour(r, g, b) {
    var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

    if (typeof r === 'string') {
        return r;
    }
    if (typeof r === 'number') {
        return 'rgba(' + r + ',' + b + ',' + g + ',' + a + ')';
    }
    return null;
}

var Graphics = function () {
    function Graphics(width, height) {
        classCallCheck(this, Graphics);

        if ((typeof width === 'undefined' ? 'undefined' : _typeof(width)) === 'object' && width.tagName === 'CANVAS') {
            this.canvas = width;
        } else {
            this.canvas = document.createElement('canvas');
            this.size(width, height);
        }
        this.ctx = this.canvas.getContext('2d');
    }

    Graphics.prototype.fill = function fill(r, g, b) {
        var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

        this.ctx.fillStyle = getColour(r, g, b, a);
        return this;
    };

    Graphics.prototype.stroke = function stroke(r, g, b) {
        var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

        this.ctx.strokeStyle = getColour(r, g, b, a);
        return this;
    };

    Graphics.prototype.circle = function circle(x, y, radius) {
        var ctx = this.ctx;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2, false);
        ctx.fill();
        return this;
    };

    Graphics.prototype.rect = function rect(x, y, width, height) {
        var angle = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
        var ctx = this.ctx;

        if (angle !== 0) {
            ctx.save();
            ctx.translate(x + width / 2, y + height / 2);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.rect(-width / 2, -height / 2, width, height);
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        } else {
            ctx.rect(x, y, width, height);
            ctx.fill();
            ctx.stroke();
        }
        return this;
    };

    Graphics.prototype.line = function line(x1, y1, x2, y2) {
        var ctx = this.ctx;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        return this;
    };

    Graphics.prototype.lineWidth = function lineWidth(width) {
        this.ctx.lineWidth = width;
        return this;
    };

    Graphics.prototype.move = function move(x, y) {
        this.ctx.moveTo(x, y);
        return this;
    };

    Graphics.prototype.image = function image(el, x, y, options) {
        var ctx = this.ctx;

        if (options) {
            var _options$alpha = options.alpha,
                alpha = _options$alpha === undefined ? 1 : _options$alpha,
                _options$rotation = options.rotation,
                rotation = _options$rotation === undefined ? 0 : _options$rotation,
                _options$scale = options.scale,
                scale = _options$scale === undefined ? 1 : _options$scale;

            var offsetX = el.width / 2;
            var offsetY = el.height / 2;
            ctx.save();
            ctx.translate(x + offsetX, y + offsetY);
            ctx.rotate(rotation);
            ctx.scale(scale, scale);
            ctx.globalAlpha = alpha;
            ctx.drawImage(el, -offsetX, -offsetY);
            ctx.restore();
        } else {
            ctx.drawImage(el, x, y);
        }
        return this;
    };

    Graphics.prototype.text = function text(str, x, y) {
        this.ctx.fillText(str, x, y);
        return this;
    };

    Graphics.prototype.setFontStyle = function setFontStyle(family, size) {
        this.ctx.font = size + 'px ' + family;
    };

    Graphics.prototype.getImageData = function getImageData() {
        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var width = arguments[2];
        var height = arguments[3];
        var ctx = this.ctx,
            canvas = this.canvas;

        return ctx.getImageData(x, y, width || canvas.width, height || canvas.height);
    };

    Graphics.prototype.getPixel = function getPixel(x, y) {
        x = Math.floor(x);
        y = Math.floor(y);

        var _ctx$getImageData = this.ctx.getImageData(x, y, 1, 1),
            data = _ctx$getImageData.data;

        return Array.prototype.slice.call(data);
    };

    Graphics.prototype.setPixel = function setPixel(x, y, r, g, b, a) {
        x = Math.floor(x);
        y = Math.floor(y);

        var _getImageData = this.getImageData(),
            width = _getImageData.width,
            data = _getImageData.data;

        var i = (x + y * width) * 4;
        data[i + 0] = r;
        data[i + 1] = g;
        data[i + 2] = b;
        data[i + 3] = a;
        return this;
    };

    Graphics.prototype.clearCircle = function clearCircle(x, y) {
        var radius = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 20;
        var ctx = this.ctx;

        ctx.save();
        ctx.globalCompositeOperation = 'destination-out';
        this.circle(x, y, radius);
        ctx.globalCompositeOperation = 'source-over';
        ctx.restore();
        return this;
    };

    Graphics.prototype.translateAnd = function translateAnd(x, y, fn) {
        var ctx = this.ctx;

        ctx.save();
        ctx.translate(x, y);
        fn(ctx);
        ctx.restore();
        return this;
    };

    Graphics.prototype.clear = function clear(r, g, b) {
        var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

        var color = getColour(r, g, b, a);
        var ctx = this.ctx;
        var _canvas = this.canvas,
            width = _canvas.width,
            height = _canvas.height;

        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        if (color) {
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, width, height);
        } else {
            ctx.clearRect(0, 0, width, height);
        }
        ctx.beginPath();
        ctx.restore();
        return this;
    };

    Graphics.prototype.size = function size() {
        var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.innerWidth;
        var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.innerHeight;

        this.canvas.width = width;
        this.canvas.height = height;
        return this;
    };

    Graphics.prototype.destroy = function destroy() {
        if (this.canvas.parentElement) {
            this.canvas.parentElement.removeChild(this.canvas);
        }
        this.canvas = null;
        this.ctx = null;
    };

    createClass(Graphics, [{
        key: 'alpha',
        get: function get$$1() {
            return this.ctx.globalAlpha;
        },
        set: function set$$1(value) {
            this.ctx.globalAlpha = value;
        }
    }, {
        key: 'blendMode',
        get: function get$$1() {
            return this.ctx.globalCompositeOperation;
        },
        set: function set$$1(value) {
            this.ctx.globalCompositeOperation = value;
        }
    }, {
        key: 'context',
        get: function get$$1() {
            return this.ctx;
        }
    }]);
    return Graphics;
}();

function loadScript(src, cb) {
    var script = document.createElement('script');
    script.src = src;
    script.addEventListener('load', function () {
        return cb(null, src);
    });
    script.addEventListener('error', function () {
        return cb(true, src);
    });
    document.body.appendChild(script);
    return script;
}

var localHost = (function () {
  return (/^(?:https?:\/\/)?(?:localhost|192\.168)/.test(window.location.href)
  );
});

// example usage:
//
// const opts = {
//     friction: 0.9,
//     maxSpeed: 1
// };
// gui(true)
//     .then((g) => {
//         g.add(opts, 'friction', 0.7, 0.999);
//         g.add(opts, 'maxSpeed', 0.5, 2).onChange((value) => console.log(value));
//     })
//     .catch((err) => console.error(err));

function gui() {
    var localhostOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    if (localhostOnly && !localHost()) {
        return new Promise(function () {});
    }
    return new Promise(function (resolve, reject) {
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.6.1/dat.gui.min.js', function (err, src) {
            if (err) {
                console.error('Error loading script', src);
                reject(new Error('Error loading script'));
                return;
            }
            var g = new window.dat.GUI({ autoPlace: true });

            var style = document.createElement('style');
            document.head.appendChild(style);
            var s = style.sheet;
            s.insertRule('.dg.ac {overflow: visible !important; z-index:10000 !important}', 0);
            s.insertRule('.dg * {font-size:11px !important}', 0);
            s.insertRule('.dg input {font:11px Lucida Grande,sans-serif !important}', 0);

            resolve(g);
        });
    });
}

gui.localHost = localHost;

function getLocation(href) {
    var l = document.createElement('a');
    l.href = href;

    return {
        hash: l.hash,
        host: l.host,
        hostname: l.hostname,
        pathname: l.pathname,
        port: l.port,
        protocol: l.protocol,
        search: l.search
    };
}

function jsonp(url, cb) {
    var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5000;

    var script = document.createElement('script');
    var callback = 'jsonp_callback_' + Math.round(100000 * Math.random());
    var separator = url.indexOf('?') >= 0 ? '&' : '?';

    var timeoutId = window.setTimeout(function () {
        window[callback](null, 'jsonp error');
    }, timeout);

    window[callback] = function (data) {
        var err = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        window.clearTimeout(timeoutId);
        delete window[callback];
        document.body.removeChild(script);
        cb(data, err);
    };

    script.src = '' + url + separator + 'callback=' + callback;
    document.body.appendChild(script);
}

var plus = /\+/g; // match '+' symbol
var search = /([^&=]+)=?([^&]*)/g;

function decode(str) {
    return decodeURIComponent(str.replace(plus, ' '));
}

function urlParams(query) {
    query = query || window.location.search.slice(1);

    var params = {};
    var match = search.exec(query);
    while (match) {
        params[decode(match[1])] = decode(match[2]);
        match = search.exec(query);
    }
    return params;
}

function xhr(url) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'json';

    var p = new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.addEventListener('load', function () {
            var response = req.response;
            if (type === 'json' && typeof response === 'string') {
                response = JSON.parse(response);
            }
            resolve(response);
        });
        req.addEventListener('error', function () {
            return reject(req.status);
        });
        req.open('GET', url);
        req.responseType = type;
        // req.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        req.send();
    });
    return p;
}

var http = {
    getLocation: getLocation,
    jsonp: jsonp,
    loadScript: loadScript,
    urlParams: urlParams,
    xhr: xhr
};

function getTest(el) {
    if (Array.isArray(el)) {
        return function (target) {
            return el.includes(target);
        };
    }
    if (typeof el === 'function') {
        return function (target) {
            return el(target);
        };
    }
    return function (target) {
        return target === el;
    };
}

function clickOutside(el, fn) {
    var test = getTest(el);

    function onClickOutside(event) {
        var target = event.target;
        var inside = false;

        while (target && target !== document.body) {
            if (test(target)) {
                event.stopImmediatePropagation();
                inside = true;
                break;
            }
            target = target.parentNode;
        }

        if (!inside) {
            fn(event);
        }
    }

    function onTouchOutside(event) {
        document.body.removeEventListener('click', onClickOutside);
        onClickOutside(event);
    }

    function destroy() {
        document.body.removeEventListener('click', onClickOutside);
        document.body.removeEventListener('touchstart', onTouchOutside);
    }

    destroy();

    document.body.addEventListener('click', onClickOutside);
    document.body.addEventListener('touchstart', onTouchOutside);

    return {
        destroy: destroy
    };
}

var keyboard = {
    A: 'A'.charCodeAt(0),
    B: 'B'.charCodeAt(0),
    C: 'C'.charCodeAt(0),
    D: 'D'.charCodeAt(0),
    E: 'E'.charCodeAt(0),
    F: 'F'.charCodeAt(0),
    G: 'G'.charCodeAt(0),
    H: 'H'.charCodeAt(0),
    I: 'I'.charCodeAt(0),
    J: 'J'.charCodeAt(0),
    K: 'K'.charCodeAt(0),
    L: 'L'.charCodeAt(0),
    M: 'M'.charCodeAt(0),
    N: 'N'.charCodeAt(0),
    O: 'O'.charCodeAt(0),
    P: 'P'.charCodeAt(0),
    Q: 'Q'.charCodeAt(0),
    R: 'R'.charCodeAt(0),
    S: 'S'.charCodeAt(0),
    T: 'T'.charCodeAt(0),
    U: 'U'.charCodeAt(0),
    V: 'V'.charCodeAt(0),
    W: 'W'.charCodeAt(0),
    X: 'X'.charCodeAt(0),
    Y: 'Y'.charCodeAt(0),
    Z: 'Z'.charCodeAt(0),
    ZERO: '0'.charCodeAt(0),
    ONE: '1'.charCodeAt(0),
    TWO: '2'.charCodeAt(0),
    THREE: '3'.charCodeAt(0),
    FOUR: '4'.charCodeAt(0),
    FIVE: '5'.charCodeAt(0),
    SIX: '6'.charCodeAt(0),
    SEVEN: '7'.charCodeAt(0),
    EIGHT: '8'.charCodeAt(0),
    NINE: '9'.charCodeAt(0),
    NUMPAD_0: 96,
    NUMPAD_1: 97,
    NUMPAD_2: 98,
    NUMPAD_3: 99,
    NUMPAD_4: 100,
    NUMPAD_5: 101,
    NUMPAD_6: 102,
    NUMPAD_7: 103,
    NUMPAD_8: 104,
    NUMPAD_9: 105,
    NUMPAD_MULTIPLY: 106,
    NUMPAD_ADD: 107,
    NUMPAD_ENTER: 108,
    NUMPAD_SUBTRACT: 109,
    NUMPAD_DECIMAL: 110,
    NUMPAD_DIVIDE: 111,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,
    F13: 124,
    F14: 125,
    F15: 126,
    COLON: 186,
    EQUALS: 187,
    UNDERSCORE: 189,
    QUESTION_MARK: 191,
    TILDE: 192,
    OPEN_BRACKET: 219,
    BACKWARD_SLASH: 220,
    CLOSED_BRACKET: 221,
    QUOTES: 222,
    BACKSPACE: 8,
    TAB: 9,
    CLEAR: 12,
    ENTER: 13,
    SHIFT: 16,
    CONTROL: 17,
    ALT: 18,
    CAPS_LOCK: 20,
    ESC: 27,
    SPACE: 32,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    INSERT: 45,
    DELETE: 46,
    HELP: 47,
    NUM_LOCK: 144
};

function keyInput() {
    var api = Object.create(emitter.prototype);
    var keys = array$1(256, false);

    function emitKey(keyCode) {
        var keyName = Object.keys(keyboard).reduce(function (value, key) {
            return keyboard[key] === keyCode ? key : value;
        }, '').toLowerCase();
        if (keyName) {
            api.emit(keyName.toLowerCase());
        }
    }

    function onKeyDown(event) {
        event.preventDefault();
        keys[event.keyCode] = true;
        api.emit('keydown', event.keyCode);
        emitKey(event.keyCode);
    }

    function onKeyUp(event) {
        event.preventDefault();
        keys[event.keyCode] = false;
        api.emit('keyup', event.keyCode);
    }

    function add() {
        document.addEventListener('keydown', onKeyDown, false);
        document.addEventListener('keyup', onKeyUp, false);
    }

    function remove() {
        document.removeEventListener('keydown', onKeyDown);
        document.removeEventListener('keyup', onKeyUp);
    }

    function isDown(key) {
        return keys[key];
    }

    function left() {
        return keys[keyboard.LEFT] || keys[keyboard.A];
    }

    function right() {
        return keys[keyboard.RIGHT] || keys[keyboard.D];
    }

    function up() {
        return keys[keyboard.UP] || keys[keyboard.W];
    }

    function down() {
        return keys[keyboard.DOWN] || keys[keyboard.S];
    }

    function space() {
        return keys[keyboard.SPACE];
    }

    function enable() {
        var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        remove();
        if (value) {
            add();
        }
    }

    add();

    return Object.assign(api, {
        keyboard: keyboard,
        enable: enable,
        isDown: isDown,
        left: left,
        right: right,
        up: up,
        down: down,
        space: space
    });
}

function microphone() {
    var mic = Object.create(emitter.prototype);
    var _stream = null;

    var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

    var _isSupported = !!getUserMedia;

    function connect() {
        if (!_isSupported) {
            mic.emit('error', 'Not supported');
            return;
        }
        getUserMedia({
            audio: true
        }, function (mediaStream) {
            _stream = mediaStream;
            mic.emit('connect', _stream);
        }, function (e) {
            if (e.name === 'PermissionDeniedError' || e === 'PERMISSION_DENIED') {
                console.log('Permission denied. Undo by clicking the camera icon in the address bar');
                mic.emit('denied');
            } else {
                mic.emit('error', e.message || e);
            }
        });
    }

    function disconnect() {
        if (_stream) {
            _stream.stop();
            _stream = null;
        }
    }

    function createWebAudioSource(webAudioContext, connectTo) {
        if (!_stream) {
            return null;
        }

        var source = webAudioContext.createMediaStreamSource(_stream);

        if (connectTo) {
            source.connect(connectTo);
        }

        // HACK: stops moz garbage collection killing the stream
        // see https://support.mozilla.org/en-US/questions/984179
        if (navigator.mozGetUserMedia) {
            window.hack_for_mozilla = source;
        }

        return source;
    }

    return Object.assign(mic, {
        connect: connect,
        disconnect: disconnect,
        createWebAudioSource: createWebAudioSource,
        isSupported: function isSupported() {
            return _isSupported;
        },
        stream: function stream() {
            return _stream;
        }
    });
}

function mouseLeftWindow(fn) {
    function handler(event) {
        var from = event.relatedTarget || event.toElement;
        if (!from || from.nodeName === 'HTML') {
            fn(event);
        }
    }

    document.addEventListener('mouseout', handler, false);

    return {
        destroy: function destroy() {
            document.removeEventListener('mouseout', handler);
        }
    };
}

function mouseWheel(speed) {
    speed = speed || 2;

    var wheel = null;

    function wheelHandler(event) {
        var direction = event.detail < 0 || event.wheelDelta > 0 ? 1 : -1;
        var delta = direction * speed;

        if (direction > 0) {
            wheel.emit('up', delta);
        } else {
            wheel.emit('down', delta);
        }

        wheel.emit('update', delta);
    }

    function add() {
        if ('onmousewheel' in window) {
            window.addEventListener('mousewheel', wheelHandler, false);
        } else if (window.addEventListener) {
            window.addEventListener('DOMMouseScroll', wheelHandler, false);
        }
    }

    function remove() {
        if ('onmousewheel' in window) {
            window.removeEventListener('mousewheel', wheelHandler, false);
        } else if (window.removeEventListener) {
            window.removeEventListener('DOMMouseScroll', wheelHandler, false);
        }
    }

    add();

    wheel = Object.create(emitter.prototype, {
        _events: {
            value: {}
        },
        add: {
            value: add
        },
        remove: {
            value: remove
        }
    });

    return Object.freeze(wheel);
}

function pointerCoords() {
    var self = null;

    function calculateCoords(event) {
        var touch = event.touches && event.touches.length;
        var p = touch ? event.touches[0] : event;
        var cX = p.clientX || 0;
        var cY = p.clientY || 0;
        var pX = window.pageXOffset;
        var pY = window.pageYOffset;
        self.event = event;
        self.clientX = cX;
        self.clientY = cY;
        self.x = cX + pX;
        self.y = cY + pY;
        self.percentX = self.x / window.innerWidth;
        self.percentY = self.y / getPageHeight();
    }

    self = {
        event: null,
        clientX: 0,
        clientY: 0,
        x: 0,
        y: 0,
        percentX: 0,
        percentY: 0,
        isListening: false,

        on: function on() {
            document.body.addEventListener('mousemove', calculateCoords);
            document.body.addEventListener('touchmove', calculateCoords);
            self.isListening = true;
            return this;
        },
        off: function off() {
            document.body.removeEventListener('mousemove', calculateCoords);
            document.body.removeEventListener('touchmove', calculateCoords);
            self.isListening = false;
            return this;
        }
    };
    return self;
}

function touchInput(el) {
    el = el || document.body;

    var data = {
        start: [-1, -1],
        move: [-1, -1],
        end: [-1, -1],
        position: [-1, -1],
        distance: [0, 0],
        direction: ['none', 'none'],
        touching: false,
        originalEvent: null
    };

    var self = null;

    function touchHandler(event) {
        if (!(event && event.touches)) {
            return;
        }
        data.originalEvent = event;
        var touch = event.touches[0];
        var x = touch && touch.pageX;
        var y = touch && touch.pageY;

        switch (event.type) {
            case 'touchstart':
                data.start[0] = data.move[0] = data.end[0] = data.position[0] = x;
                data.start[1] = data.move[1] = data.end[1] = data.position[1] = y;
                data.touching = true;
                self.emit('start', data);
                break;
            case 'touchmove':
                data.move[0] = data.position[0] = x;
                data.move[1] = data.position[1] = y;
                self.emit('move', data);
                break;
            case 'touchend':
                data.end[0] = data.position[0] = x;
                data.end[1] = data.position[1] = y;
                data.touching = false;
                self.emit('end', data);
                break;
            default:
                break;
        }
    }

    function listen(elem) {
        el = elem || el;
        el.addEventListener('touchstart', touchHandler);
        el.addEventListener('touchmove', touchHandler);
        el.addEventListener('touchend', touchHandler);
        return self;
    }

    function destroy() {
        self.removeAllListeners();
        el.removeEventListener('touchstart', touchHandler);
        el.removeEventListener('touchmove', touchHandler);
        el.removeEventListener('touchend', touchHandler);
        el = null;
        return self;
    }

    listen(el);

    self = Object.create(emitter.prototype, {
        _events: {
            value: {}
        },
        listen: {
            value: listen
        },
        isDown: {
            value: function value() {
                return data.touching;
            }
        },
        getTouch: {
            value: function value() {
                return data;
            }
        },
        destroy: {
            value: destroy
        }
    });

    return Object.freeze(self);
}

var input = {
    clickOutside: clickOutside,
    keyboard: keyboard,
    keyInput: keyInput,
    microphone: microphone,
    mouseLeftWindow: mouseLeftWindow,
    mouseWheel: mouseWheel,
    pointerCoords: pointerCoords,
    touchInput: touchInput
};

function linkedList() {
    var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];


    var first = void 0,
        last = void 0;

    /*
        item = {
            'next': null,
            'prev': null
        }
         var item = linkedList.getFirst();
        while(item) {
            // do stuff
            item = item.next;
        }
    */

    function remove(item) {
        if (item.next) {
            item.next.prev = item.prev;
        }
        if (item.prev) {
            item.prev.next = item.next;
        }
        if (item === first) {
            first = item.next;
        }
        if (item === last) {
            last = item.prev;
        }
        item.next = item.prev = null;

        return item;
    }

    function insertAfter(item, after) {
        remove(item);

        item.prev = after;
        item.next = after.next;

        if (!after.next) {
            last = item;
        } else {
            after.next.prev = item;
        }

        after.next = item;

        return item;
    }

    function insertBefore(item, before) {
        remove(item);

        item.prev = before.prev;
        item.next = before;

        if (!before.prev) {
            first = item;
        } else {
            before.prev.next = item;
        }

        before.prev = item;

        return item;
    }

    function add(item) {
        if (!first) {
            first = last = item;
        } else {
            var i = first;
            while (i.next) {
                i = i.next;
            }
            insertAfter(item, i);
        }
        return item;
    }

    function forEach(fn) {
        var item = first;
        while (item) {
            fn(item);
            item = item.next;
        }
    }

    function map(fn) {
        var list = linkedList();
        var item = first;
        while (item) {
            list.add(fn(item));
            item = item.next;
        }
        return list;
    }

    arr.forEach(function (item) {
        return add(item);
    });

    return {
        get first() {
            return first;
        },
        getFirst: function getFirst() {
            return first;
        },

        get last() {
            return last;
        },
        getLast: function getLast() {
            return last;
        },

        get length() {
            return this.getCount();
        },
        getCount: function getCount() {
            var count = 0;
            var i = first;
            while (i) {
                count++;
                i = i.next;
            }
            return count;
        },

        add: add,
        remove: remove,
        insertAfter: insertAfter,
        insertBefore: insertBefore,
        forEach: forEach,
        map: map
    };
}

/* jshint -W097 */

var MiniSignalBinding = function () {

  /**
  * MiniSignalBinding constructor.
  * @constructs MiniSignalBinding
  * @param {Function} fn Event handler to be called.
  * @param {Boolean} [once=false] Should this listener be removed after dispatch
  * @param {Mixed} [thisArg] The context of the callback function.
  * @api private
  */
  function MiniSignalBinding(fn) {
    var once = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var thisArg = arguments[2];
    classCallCheck(this, MiniSignalBinding);

    this._fn = fn;
    this._once = once;
    this._thisArg = thisArg;
    this._next = this._prev = this._owner = null;
  }

  MiniSignalBinding.prototype.detach = function detach() {
    if (this._owner === null) return false;
    this._owner.detach(this);
    return true;
  };

  return MiniSignalBinding;
}();

/**
* @private
*/
function _addMiniSignalBinding(self, node) {
  if (!self._head) {
    self._head = node;
    self._tail = node;
  } else {
    self._tail._next = node;
    node._prev = self._tail;
    self._tail = node;
  }

  node._owner = self;

  return node;
}

var MiniSignal = function () {

  /**
  * MiniSignal constructor.
  * @constructs MiniSignal
  * @api public
  *
  * @example
  * let mySignal = new MiniSignal();
  * let binding = mySignal.add(onSignal);
  * mySignal.dispatch('foo', 'bar');
  * mySignal.detach(binding);
  */
  function MiniSignal() {
    classCallCheck(this, MiniSignal);

    this._head = this._tail = undefined;
  }

  /**
  * Return an array of attached MiniSignalBinding.
  *
  * @param {Boolean} [exists=false] We only need to know if there are handlers.
  * @returns {MiniSignalBinding[]|Boolean} Array of attached MiniSignalBinding or Boolean if called with exists = true
  * @api public
  */


  MiniSignal.prototype.handlers = function handlers() {
    var exists = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var node = this._head;

    if (exists) return !!node;

    var ee = [];

    while (node) {
      ee.push(node);
      node = node._next;
    }

    return ee;
  };

  /**
  * Return true if node is a MiniSignalBinding attached to this MiniSignal
  *
  * @param {MiniSignalBinding} node Node to check.
  * @returns {Boolean} True if node is attache to mini-signal
  * @api public
  */


  MiniSignal.prototype.has = function has(node) {
    if (!(node instanceof MiniSignalBinding)) {
      throw new Error('MiniSignal#has(): First arg must be a MiniSignalBinding object.');
    }

    return node._owner === this;
  };

  /**
  * Dispaches a signal to all registered listeners.
  *
  * @returns {Boolean} Indication if we've emitted an event.
  * @api public
  */


  MiniSignal.prototype.dispatch = function dispatch() {
    var node = this._head;

    if (!node) return false;

    while (node) {
      if (node._once) this.detach(node);
      node._fn.apply(node._thisArg, arguments);
      node = node._next;
    }

    return true;
  };

  /**
  * Register a new listener.
  *
  * @param {Function} fn Callback function.
  * @param {Mixed} [thisArg] The context of the callback function.
  * @returns {MiniSignalBinding} The MiniSignalBinding node that was added.
  * @api public
  */


  MiniSignal.prototype.add = function add(fn) {
    var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    if (typeof fn !== 'function') {
      throw new Error('MiniSignal#add(): First arg must be a Function.');
    }
    return _addMiniSignalBinding(this, new MiniSignalBinding(fn, false, thisArg));
  };

  /**
  * Register a new listener that will be executed only once.
  *
  * @param {Function} fn Callback function.
  * @param {Mixed} [thisArg] The context of the callback function.
  * @returns {MiniSignalBinding} The MiniSignalBinding node that was added.
  * @api public
  */


  MiniSignal.prototype.once = function once(fn) {
    var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    if (typeof fn !== 'function') {
      throw new Error('MiniSignal#once(): First arg must be a Function.');
    }
    return _addMiniSignalBinding(this, new MiniSignalBinding(fn, true, thisArg));
  };

  /**
  * Remove binding object.
  *
  * @param {MiniSignalBinding} node The binding node that will be removed.
  * @returns {MiniSignal} The instance on which this method was called.
  * @api public */


  MiniSignal.prototype.detach = function detach(node) {
    if (!(node instanceof MiniSignalBinding)) {
      throw new Error('MiniSignal#detach(): First arg must be a MiniSignalBinding object.');
    }
    if (node._owner !== this) return this; // todo: or error?

    if (node._prev) node._prev._next = node._next;
    if (node._next) node._next._prev = node._prev;

    if (node === this._head) {
      // first node
      this._head = node._next;
      if (node._next === null) {
        this._tail = null;
      }
    } else if (node === this._tail) {
      // last node
      this._tail = node._prev;
      this._tail._next = null;
    }

    node._owner = null;
    return this;
  };

  /**
  * Detach all listeners.
  *
  * @returns {MiniSignal} The instance on which this method was called.
  * @api public
  */


  MiniSignal.prototype.detachAll = function detachAll() {
    var node = this._head;
    if (!node) return this;

    this._head = this._tail = null;

    while (node) {
      node._owner = null;
      node = node._next;
    }
    return this;
  };

  return MiniSignal;
}();

var Loop = function () {
    function Loop() {
        classCallCheck(this, Loop);

        this.update = this.update.bind(this);
        this.onUpdate = new MiniSignal();

        this.raf = null;
        this.running = false;
        this.last = 0;
        this.delta = 0;
        this.elasped = 0;
        this.deltaSecs = 0;
        this.elaspedSecs = 0;

        // this.accumulated = 0;
        // this.step = 1000 / 60;
    }

    Loop.prototype.start = function start() {
        if (this.running) {
            return;
        }

        this.running = true;
        this.update();
    };

    Loop.prototype.stop = function stop() {
        if (!this.running) {
            return;
        }
        this.last = 0;
        this.running = false;
        window.cancelAnimationFrame(this.raf);
    };

    Loop.prototype.update = function update() {
        if (!this.running) {
            return;
        }

        this.raf = window.requestAnimationFrame(this.update);

        var now = Date.now();
        var deltaMs = now - this.last;
        if (deltaMs > 20) {
            deltaMs = 20;
        }
        this.last = now;

        this.delta = deltaMs * 0.06;
        this.elasped += this.delta;

        this.deltaSecs = deltaMs * 0.001;
        this.elaspedSecs += this.deltaSecs;

        //  // fixed step:
        // this.accumulated += dt;
        //
        // while (this.accumulated >= this.step) {
        //     this.accumulated -= this.step;
        //     this.onUpdate.dispatch(this.step);
        // }

        this.onUpdate.dispatch(this.delta, this.elasped);
    };

    Loop.prototype.add = function add(fn, context) {
        return this.onUpdate.add(fn, context);
    };

    Loop.prototype.remove = function remove(binding) {
        this.onUpdate.detach(binding);
    };

    return Loop;
}();

function angle(x1, y1, x2, y2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    return Math.atan2(dy, dx);
}

function cerp(from, to) {
    var weight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.3;

    var f = (1 - Math.cos(weight * Math.PI)) / 2;
    return from * (1 - f) + to * f;
}

function circleDistribution(radius) {
    var origin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { x: 0, y: 0 };
    var p = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { x: 0, y: 0 };

    var r = Math.sqrt(Math.random()) * radius;
    var theta = Math.random() * Math.PI * 2;
    p.x = origin.x + Math.cos(theta) * r;
    p.y = origin.y + Math.sin(theta) * r;
    return p;
}

function clamp(value, min, max) {
    if (min > max) {
        var a = min;
        min = max;
        max = a;
    }
    if (value < min) {
        return min;
    }
    if (value > max) {
        return max;
    }
    return value;
}

function coinToss() {
    var heads = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var tails = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    return Math.random() > 0.5 ? heads : tails;
}

/*
The sign tells us if a is to the left (-) or the right (+) of b
*/
function crossProduct2d(aX, aY, bX, bY) {
    return aX * bY - aY * bX;
}

var DEG = 180 / Math.PI;

function degrees(radians) {
    return radians * DEG;
}

function difference(a, b) {
    return Math.abs(a - b);
}

function distance(x1, y1, x2, y2) {
    var dx = x1 - x2;
    var dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
}

function distanceSQ(x1, y1, x2, y2) {
    var dx = x1 - x2;
    var dy = y1 - y2;
    return dx * dx + dy * dy;
}

/*
- If A and B are perpendicular (at 90 degrees to each other), the result
of the dot product will be zero, because cos(Θ) will be zero.
- If the angle between A and B are less than 90 degrees, the dot product
will be positive (greater than zero), as cos(Θ) will be positive, and
the vector lengths are always positive values.
- If the angle between A and B are greater than 90 degrees, the dot
product will be negative (less than zero), as cos(Θ) will be negative,
and the vector lengths are always positive values
*/
function dotProduct2d(aX, aY, bX, bY) {
    return aX * bX + aY * bY;
}

function getCirclePoints(originX, originY, radius, count, start, Class) {
    if (typeof start === 'undefined') {
        start = -Math.PI / 2;
    }

    var points = [],
        circ = Math.PI * 2,
        incr = circ / count;

    for (var i = start; i < circ + start; i += incr) {
        var ob = typeof Class === 'undefined' ? {} : new Class();
        ob.x = originX + radius * Math.cos(i);
        ob.y = originY + radius * Math.sin(i);
        points.push(ob);
    }

    return points;
}

function getIntersectionArea(aX, aY, aW, aH, bX, bY, bW, bH) {
    var overlapX = Math.max(0, Math.min(aX + aW, bX + bW) - Math.max(aX, bX));
    var overlapY = Math.max(0, Math.min(aY + aH, bY + bH) - Math.max(aY, bY));
    return overlapX * overlapY;
}

function getOverlapX(aX, aW, bX, bW) {
    return Math.max(0, Math.min(aX + aW, bX + bW) - Math.max(aX, bX));
}

function getOverlapY(aY, aH, bY, bH) {
    return Math.max(0, Math.min(aY + aH, bY + bH) - Math.max(aY, bY));
}

function lerp(from, to) {
    var weight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.3;

    return from + (to - from) * weight;
}

function map(v, a, b, x, y) {
    // value, min expected, max expected, map min, map max
    // e.g. map some value between 0 to 100 to -50 to 50
    // map(50, 0, 100, -50, 50) // 0
    // map(25, 0, 100, -50, 50) // -25
    return v === a ? x : (v - a) * (y - x) / (b - a) + x;
}

function normalize(value, min, max) {
    return (value - min) / (max - min);
}

function orientation(x, y) {
    return Math.atan2(y, x);
}

function percentRemaining(value, total) {
    return value % total / total;
}

// x = x * perspective
// y = y * perspective
// scale = perspective

function perspective(z) {
    var focalLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;

    return focalLength / (focalLength + z);
}

function quadraticCurve(fromX, fromY, cpX, cpY, toX, toY) {
    var goThroughCP = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;

    var n = 20;
    var points = [fromX, fromY];
    var xa = 0;
    var ya = 0;

    if (goThroughCP) {
        cpX = cpX * 2 - (fromX + toX) / 2;
        cpY = cpY * 2 - (fromY + toY) / 2;
    }

    for (var i = 1; i <= n; ++i) {
        var j = i / n;

        xa = fromX + (cpX - fromX) * j;
        ya = fromY + (cpY - fromY) * j;

        points.push(xa + (cpX + (toX - cpX) * j - xa) * j, ya + (cpY + (toY - cpY) * j - ya) * j);
    }

    return points;
}

var RAD = Math.PI / 180;

function radians(degrees) {
    return degrees * RAD;
}

function random(min, max) {
    if (isNaN(max)) {
        max = min;
        min = 0;
    }
    return min + Math.random() * (max - min);
}

function randomInt(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
}

function randomSign() {
    return Math.random() > 0.5 ? -1 : 1;
}

function rotatePoint(p, theta) {
    var origin = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { x: 0, y: 0 };
    var p1 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : { x: 0, y: 0 };

    var sinTheta = Math.sin(theta);
    var cosTheta = Math.cos(theta);
    p1.x = (p.x - origin.x) * cosTheta - (p.y - origin.y) * sinTheta;
    p1.y = (p.x - origin.x) * sinTheta + (p.y - origin.y) * cosTheta;
    p1.x += origin.x;
    p1.y += origin.y;
    return p1;
}

function rotateToDeg(start, end) {
    var diff = (end - start) % 360;
    if (diff !== diff % 180) {
        diff = diff < 0 ? diff + 360 : diff - 360;
    }
    return start + diff;
}

var PI2 = Math.PI * 2;

function rotateToRAD(start, end) {
    var diff = (end - start) % PI2;
    if (diff !== diff % Math.PI) {
        diff = diff < 0 ? diff + PI2 : diff - PI2;
    }
    return start + diff;
}

function roundTo(x) {
    var places = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

    var div = Math.pow(10, places);
    return Math.round(x * div) / div;
}

function roundToNearest(value, unit) {
    return Math.round(value / unit) * unit;
}

function getScale(method, width, height, areaWidth, areaHeight) {
    switch (method) {
        case 'cover':
            return Math.max(areaWidth / width, areaHeight / height);
        case 'contain':
            return Math.min(areaWidth / width, areaHeight / height);
        case 'width':
            return areaWidth / width;
        case 'height':
            return areaHeight / height;
        default:
            break;
    }
    return 1;
}

function size(rect, areaWidth, areaHeight) {
    var method = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'cover';
    var autoCenter = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

    var scale = getScale(method, rect.width, rect.height, areaWidth, areaHeight);
    var width = Math.ceil(rect.width * scale);
    var height = Math.ceil(rect.height * scale);

    var x = 0,
        y = 0;

    if (autoCenter) {
        x = Math.round((areaWidth - width) * 0.5);
        y = Math.round((areaHeight - height) * 0.5);
    }

    return {
        x: x,
        y: y,
        width: width,
        height: height,
        scale: scale
    };
}

function smoothstep(min, max, value) {
    var x = clamp((value - min) / (max - min), 0, 1);
    return x * x * (3 - 2 * x);
}

function smerp(from, to, startTime, endTime, time) {
    return from + (to - from) * smoothstep(startTime, endTime, time);
}

function splitValueAndUnit(prop) {
    var re = /(^-?\d*\.?\d*)(.*)/;
    var match = prop.match(re);
    var value = Number(match[1]);
    var unit = match[2];
    return { value: value, unit: unit };
}

function weightedAverage(from, to) {
    var weight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;

    return (from * (weight - 1) + to) / weight;
}

// greater probability of being halfway betweeen min and max

function weightedDistribution(min, max) {
    var weight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;

    var total = 0;
    for (var i = 0; i < weight; i++) {
        total += random(min, max);
    }
    return total / weight;
}

var math = {
    angle: angle,
    cerp: cerp,
    circleDistribution: circleDistribution,
    clamp: clamp,
    coinToss: coinToss,
    crossProduct2d: crossProduct2d,
    degrees: degrees,
    difference: difference,
    distance: distance,
    distanceSq: distanceSQ,
    dotProduct2d: dotProduct2d,
    getCirclePoints: getCirclePoints,
    getIntersectionArea: getIntersectionArea,
    getOverlapX: getOverlapX,
    getOverlapY: getOverlapY,
    lerp: lerp,
    map: map,
    normalize: normalize,
    orientation: orientation,
    percentRemaining: percentRemaining,
    perspective: perspective,
    quadraticCurve: quadraticCurve,
    radians: radians,
    random: random,
    randomInt: randomInt,
    randomSign: randomSign,
    rotatePoint: rotatePoint,
    rotateToDeg: rotateToDeg,
    rotateToRad: rotateToRAD,
    roundTo: roundTo,
    roundToNearest: roundToNearest,
    smerp: smerp,
    smoothstep: smoothstep,
    size: size,
    splitValueAndUnit: splitValueAndUnit,
    weightedAverage: weightedAverage,
    weightedDistribution: weightedDistribution
};

var el$1 = document.createElement('video');

var tests = [{ type: 'ogv', codec: 'video/ogg; codecs="theora"' }, { type: 'mp4', codec: 'video/mp4; codecs="avc1.42E01E"' }, // H.264 Constrained baseline profile level 3
{ type: 'webm', codec: 'video/webm; codecs="vp8, vorbis"' }, { type: 'vp9', codec: 'video/webm; codecs="vp9"' }, { type: 'hls', codec: 'application/x-mpegURL; codecs="avc1.42E01E"' }, { type: 'ogg', codec: 'audio/ogg; codecs="vorbis"' }, { type: 'mp3', codec: 'audio/mpeg;' }, { type: 'opus', codec: 'audio/ogg; codecs="opus"' }, { type: 'wav', codec: 'audio/wav; codecs="1"' }];

var canPlay = tests.reduce(function (map, test) {
    map[test.type] = !!(el$1 && el$1.canPlayType(test.codec));
    return map;
}, {});

function cuepointsReader() {
    var list = [];
    var reader = null;
    var dispatch = void 0;
    var currentPosition = 0;
    var lastPosition = -1;
    var tolerance = 0.2;

    function add(position, name, data) {
        list.push({ position: position, name: name, data: data });

        list.sort(function (a, b) {
            return a.position - b.position;
        });

        return reader;
    }

    function onCuepoint(fn, thisArg) {
        if (fn) {
            dispatch = thisArg ? fn.bind(thisArg) : fn;
        } else {
            dispatch = null;
        }
        return reader;
    }

    function reset() {
        currentPosition = 0;
        lastPosition = -1;
        return reader;
    }

    function removeAll() {
        list.length = 0;
        return reset();
    }

    function setTolerance(value) {
        tolerance = value;
        return reader;
    }

    function inRange(cuepointPos, currentPos, lastPos) {
        if (cuepointPos > currentPos) {
            return false;
        }
        if (cuepointPos <= lastPos) {
            return false;
        }

        var diff = cuepointPos - currentPos;
        if (diff < 0) {
            diff = -diff;
        }
        return diff <= tolerance;
    }

    function check(currentPos, lastPos) {
        if (currentPos <= lastPos) {
            return;
        }
        if (typeof dispatch !== 'function') {
            return;
        }

        list.some(function (item) {
            if (inRange(item.position, currentPos, lastPos)) {
                dispatch(item);
                return true;
            }
            return false;
        });
    }

    function update(position) {
        currentPosition = position;
        check(currentPosition, lastPosition);
        lastPosition = currentPosition;
        return reader;
    }

    reader = Object.freeze({
        add: add,
        onCuepoint: onCuepoint,
        removeAll: removeAll,
        reset: reset,
        setTolerance: setTolerance,
        update: update
    });

    return reader;
}

function iOSPlayVideoInline(el) {
    var loop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    var frameTime = 1 / 25;

    var self = null;
    var lastTime = 0;
    var playing = false;

    // This can (and should) be put in a css file instead of doing styleSheets[0].insertRule:
    var cssRule = '.iOSPlayVideoInline::-webkit-media-controls { display:none !important; }';
    document.styleSheets[0].insertRule(cssRule, 0);

    el.removeAttribute('controls');
    el.classList.add('iOSPlayVideoInline');

    function seek(time) {
        el.currentTime = time;
        return self;
    }

    function pause() {
        playing = false;
        return self;
    }

    function updateFrame() {
        if (!playing) {
            return;
        }

        window.requestAnimationFrame(updateFrame);

        var now = Date.now();
        var deltaTime = now - lastTime;

        if (deltaTime >= frameTime * 1000) {
            lastTime = now;

            var ended = el.currentTime + frameTime >= el.duration;

            if (ended && loop) {
                seek(0);
            } else if (ended) {
                pause();
                // self.emit('ended');
            } else {
                seek(el.currentTime + frameTime);
            }

            // self.emit('timeupdate', el.currentTime, self);
        }
    }

    function play() {
        playing = true;
        updateFrame();
        return self;
    }

    function destroy() {
        // self.removeAllListeners();
        pause();
        window.cancelAnimationFrame(updateFrame);

        return self;
    }

    // self = Object.create(Emitter.prototype, {
    self = Object.create(null, {
        _events: {
            value: {}
        },
        destroy: {
            value: destroy
        },
        pause: {
            value: pause
        },
        play: {
            value: play
        },
        seek: {
            value: seek
        },
        el: {
            get: function get() {
                return el;
            }
        },
        currentTime: {
            get: function get() {
                return el.currentTime;
            }
        },
        duration: {
            get: function get() {
                return el.duration;
            }
        },
        loop: {
            get: function get() {
                return loop;
            },
            set: function set(value) {
                loop = value;
            }
        },
        playing: {
            get: function get() {
                return playing;
            }
        }
    });

    return Object.freeze(self);
}

function videoPlayer(videoEl) {
    var el = videoEl || document.createElement('video');
    var player = null;

    function metadataHandler() {
        player.emit('metadata', {
            src: el.currentSrc,
            width: el.videoWidth,
            height: el.videoHeight,
            duration: el.duration
        });
    }

    function canplayHandler() {
        player.emit('ready');
    }

    function playHandler() {
        player.emit('play');
    }

    function endedHandler() {
        player.emit('ended');
    }

    function errorHandler() {
        player.emit('error', el.error);
    }

    function timeupdateHandler() {
        player.emit('timeupdate', el.currentTime);
    }

    function removeEventListeners() {
        el.removeEventListener('loadedmetadata', metadataHandler);
        el.removeEventListener('canplaythrough', canplayHandler);
        el.removeEventListener('play', playHandler);
        el.removeEventListener('playing', playHandler);
        el.removeEventListener('error', errorHandler);
        el.removeEventListener('ended', endedHandler);
        el.removeEventListener('timeupdate', timeupdateHandler);
    }

    function addEventListeners() {
        removeEventListeners();

        el.addEventListener('loadedmetadata', metadataHandler, false);
        el.addEventListener('canplaythrough', canplayHandler, false);
        el.addEventListener('play', playHandler, false);
        el.addEventListener('playing', playHandler, false);
        el.addEventListener('error', errorHandler, false);
        el.addEventListener('ended', endedHandler, false);
        el.addEventListener('timeupdate', timeupdateHandler, false);
    }

    function destroy() {
        player.off();
        el.pause();

        try {
            el.removeAttribute('src');
        } catch (e) {}

        removeEventListeners();

        if (el.parentElement) {
            el.parentElement.removeChild(el);
        }

        el = null;

        return player;
    }

    function getBlobURL(url) {
        url = window.URL.createObjectURL(url);
        function revoke() {
            el.removeEventListener('canplaythrough', revoke);
            window.URL.revokeObjectURL(url);
        }
        el.addEventListener('canplaythrough', revoke);
        return url;
    }

    function load(url) {
        if (window.Blob && url instanceof window.Blob) {
            url = getBlobURL(url);
        }
        addEventListeners();

        el.crossOrigin = 'anonymous';
        el.preload = 'auto';
        el.src = url;
        el.load();

        return player;
    }

    function play() {
        el.play();

        return player;
    }

    function pause() {
        el.pause();

        return player;
    }

    function seek(time) {
        try {
            el.currentTime = time;
        } catch (e) {}

        return player;
    }

    addEventListeners();

    player = Object.create(emitter.prototype, {
        _events: {
            value: {}
        },
        destroy: {
            value: destroy
        },
        load: {
            value: load
        },
        pause: {
            value: pause
        },
        play: {
            value: play
        },
        seek: {
            value: seek
        },
        el: {
            get: function get() {
                return el;
            }
        },
        currentTime: {
            get: function get() {
                return el.currentTime;
            },
            set: function set(value) {
                el.currentTime = value;
            }
        },
        duration: {
            get: function get() {
                return el.duration;
            }
        },
        volume: {
            get: function get() {
                return el.volume;
            },
            set: function set(value) {
                el.volume = value;
            }
        }
    });

    return Object.freeze(player);
}

// https://developer.vimeo.com/player/js-api

function vimeo(el) {
    var vimeoPlayer = el.contentWindow;
    var re = /^https?:\/\/player.vimeo.com/;
    var player = null;
    var origin = '*';
    var _paused = false;

    function sendCommand(method) {
        var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

        var data = {
            method: method
        };

        if (value) {
            data.value = value;
        }

        var message = JSON.stringify(data);
        vimeoPlayer.postMessage(message, origin);
    }

    function play() {
        _paused = false;
        sendCommand('play');
    }

    function pause() {
        _paused = true;
        sendCommand('pause');
    }

    function onReady() {
        sendCommand('addEventListener', 'play');
        sendCommand('addEventListener', 'pause');
        sendCommand('addEventListener', 'finish');
        sendCommand('addEventListener', 'playProgress');
        player.emit('ready');
    }

    function onPlay() {
        _paused = false;
        player.emit('play');
    }

    function onPause() {
        _paused = true;
        player.emit('pause');
    }

    function onFinish() {
        player.emit('ended');
    }

    function onPlayProgress(data) {
        player.emit('timeupdate', data.seconds);
    }

    function onMessage(event) {
        var isVimeo = re.test(event.origin);

        if (!isVimeo) {
            return;
        }

        var data = JSON.parse(event.data);

        if (data.player_id && el.id !== data.player_id) {
            return;
        }

        if (origin === '*') {
            origin = event.origin;
        }

        switch (data.event) {
            case 'ready':
                onReady(data.player_id);
                break;
            case 'playProgress':
                onPlayProgress(data.data);
                break;
            case 'play':
                onPlay();
                break;
            case 'pause':
                onPause();
                break;
            case 'finish':
                onFinish();
                break;
            default:
                break;
        }
    }

    function destroy() {
        window.removeEventListener('message', onMessage);
    }

    window.addEventListener('message', onMessage);

    player = Object.assign(Object.create(emitter.prototype), {
        _events: {},
        play: play,
        pause: pause,
        paused: function paused() {
            return _paused;
        },
        destroy: destroy
    });

    return player;
}

// https://developers.google.com/youtube/iframe_api_reference#Events
function youtube(el) {
    var emitter = null;
    var player = null;
    var _paused = false;

    function play() {
        _paused = false;
        player.playVideo();
        return emitter;
    }

    function pause() {
        _paused = true;
        player.pauseVideo();
        return emitter;
    }

    function onReady() {
        emitter.emit('ready');
    }

    function onStateChange(event) {
        var PlayerState = window.YT.PlayerState;


        switch (event.data) {
            case PlayerState.CUED:
            case PlayerState.BUFFERING:
                break;
            case PlayerState.PLAYING:
                _paused = false;
                emitter.emit('play');
                break;
            case PlayerState.PAUSED:
                _paused = true;
                emitter.emit('pause');
                break;
            case PlayerState.ENDED:
                emitter.emit('ended');
                break;
            default:
                break;
        }
    }

    function destroy() {}

    function createPlayer() {
        if (player) {
            return;
        }

        player = new window.YT.Player(el, {
            events: {
                onReady: onReady,
                onStateChange: onStateChange
            }
        });
    }

    if (window.YT) {
        createPlayer();
    } else if (window.ytPlayerCalls) {
        window.ytPlayerCalls.push(createPlayer);
    } else {
        window.ytPlayerCalls = [createPlayer];
        window.onYouTubeIframeAPIReady = function () {
            window.ytPlayerCalls.forEach(function (call) {
                return call();
            });
        };
        var script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(script);
    }

    emitter = Object.assign(Object.create(events.EventEmitter.prototype), {
        _events: {},
        play: play,
        pause: pause,
        paused: function paused() {
            return _paused;
        },
        destroy: destroy
    });

    return emitter;
}

function youtubeBasic(el) {
    var iframe = el.contentWindow;

    function sendCommand(command) {
        iframe.postMessage('{"event":"command","func":"' + command + '","args":""}', '*');
    }

    function play() {
        sendCommand('playVideo');
    }

    function pause() {
        sendCommand('pauseVideo');
    }

    return {
        play: play,
        pause: pause
    };
}

var media = {
    canPlay: canPlay,
    cuepointsReader: cuepointsReader,
    iOSPlayVideoInline: iOSPlayVideoInline,
    videoPlayer: videoPlayer,
    vimeo: vimeo,
    youtube: youtube,
    youtubeBasic: youtubeBasic
};

function clone$1(ob) {
    return JSON.parse(JSON.stringify(ob));
}

function filter(ob, predicate) {
    return Object.keys(ob).filter(function (key) {
        return predicate(key, ob[key]);
    }).reduce(function (newOb, key) {
        newOb[key] = ob[key];
        return newOb;
    }, {});
}

function map$1(ob, fn) {
    return Object.keys(ob).reduce(function (newOb, key) {
        newOb[key] = fn(key, ob[key]);
        return newOb;
    }, {});
}

var object = {
    clone: clone$1,
    filter: filter,
    map: map$1
};

function objectPool(factoryFn) {

    var pool = [];
    var numCreated = 0;

    return {
        getPool: function getPool() {
            return pool;
        },
        get: function get() {
            if (pool.length > 0) {
                return pool.pop();
            } else {
                numCreated++;
                return factoryFn();
            }
        },
        dispose: function dispose(instance) {
            pool.push(instance);
        },
        fill: function fill(count) {
            while (pool.length < count) {
                numCreated++;
                pool[pool.length] = factoryFn();
            }
        },
        empty: function empty() {
            pool = [];
        },
        getNumCreated: function getNumCreated() {
            return numCreated;
        }
    };
}

var abs$1 = Math.abs;
var atan2 = Math.atan2;
var cos$1 = Math.cos;
var sin$2 = Math.sin;
var sqrt$1 = Math.sqrt;

var Particle = function () {
    function Particle(options) {
        classCallCheck(this, Particle);

        this.opts = options;

        this._bounds = {};
        this._outerBounds = {};

        this._defaults = {
            alive: true,
            x: 0,
            y: 0,
            angle: 0,
            speed: 0,
            gravity: 0,
            mass: 1,
            radius: 0,
            bounce: { x: -1, y: -1 },
            friction: 1,
            lifeTime: 0,
            bounds: { x: 0, y: 0, width: 1280, height: 720 }
        };

        this._props = Object.keys(this._defaults);

        this.reset(options);
    }

    Particle.prototype.reset = function reset(options) {
        var defs = this._defaults;
        var props = this._props;
        var opts = options || defs;

        for (var i = 0; i < props.length; i++) {
            var key = props[i];
            var value = opts[key] || defs[key];
            this[key] = value;
            defs[key] = value;
        }

        var angle = opts.angle || defs.angle;
        var speed = opts.speed || defs.speed;

        this.vx = cos$1(angle) * speed;
        this.vy = sin$2(angle) * speed;

        return this;
    };

    Particle.prototype.update = function update() {
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        return this;
    };

    Particle.prototype.accellerate = function accellerate(speed, angle) {
        if (typeof angle === 'undefined') {
            angle = this.angle;
        }
        this.vx += cos$1(angle) * speed;
        this.vy += sin$2(angle) * speed;
        return this;
    };

    Particle.prototype.setBounds = function setBounds(x, y, width, height) {
        this._bounds.x = x || 0;
        this._bounds.y = y || 0;
        this._bounds.width = width;
        this._bounds.height = height;
    };

    Particle.prototype.angleTo = function angleTo(p) {
        return atan2(p.y - this.y, p.x - this.x);
    };

    Particle.prototype.distanceTo = function distanceTo(p) {
        var dx = p.x - this.x;
        var dy = p.y - this.y;
        return sqrt$1(dx * dx + dy * dy);
    };

    Particle.prototype.moveTo = function moveTo(p) {
        var thrust = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.005;

        var dx = p.x - this.x;
        var dy = p.y - this.y;

        this.vx += dx * thrust;
        this.vy += dy * thrust;

        if (abs$1(this.vx) > abs$1(dx)) {
            this.vx = dx;
        }

        if (abs$1(this.vy) > abs$1(dy)) {
            this.vy = dy;
        }

        return this;
    };

    Particle.prototype.gravitateTo = function gravitateTo(p) {
        var dx = p.x - this.x;
        var dy = p.y - this.y;
        var distSq = dx * dx + dy * dy;
        if (distSq > 0) {
            var dist = sqrt$1(distSq);
            var force = p.mass / distSq;
            var ax = dx / dist * force;
            var ay = dy / dist * force;
            this.vx += ax;
            this.vy += ay;
        }

        return this;
    };

    Particle.prototype.springTo = function springTo(p, stiffness, length) {
        var dx = p.x - this.x;
        var dy = p.y - this.y;
        var distance = sqrt$1(dx * dx + dy * dy);
        var force = (distance - (length || 0)) * (stiffness || 0.2);

        if (abs$1(distance * force) > 0) {
            this.vx += dx / distance * force;
            this.vy += dy / distance * force;
        }

        return this;
    };

    Particle.prototype.collides = function collides(p) {
        return this.distanceTo(p) <= this.radius + p.radius;
    };

    Particle.prototype.edgeCollide = function edgeCollide() {
        var left = this._bounds.x + this.radius;
        var right = this._bounds.x + this._bounds.width - this.radius;
        var top = this._bounds.y + this.radius;
        var bottom = this._bounds.y + this._bounds.height - this.radius;

        if (this.x < left) {
            this.x = left;
            this.vx = this.vx * this.bounce.x;
        }

        if (this.x > right) {
            this.x = right;
            this.vx = this.vx * this.bounce.x;
        }

        if (this.y < top) {
            this.y = top;
            this.vy = this.vy * this.bounce.y;
        }

        if (this.y > bottom) {
            this.y = bottom;
            this.vy = this.vy * this.bounce.y;
        }
    };

    Particle.prototype.edgeWrap = function edgeWrap() {
        var _outerBounds = this.outerBounds,
            left = _outerBounds.left,
            right = _outerBounds.right,
            top = _outerBounds.top,
            bottom = _outerBounds.bottom;


        if (this.x < left) {
            this.x = right;
        }

        if (this.x > right) {
            this.x = left;
        }

        if (this.y < top) {
            this.y = bottom;
        }

        if (this.y > bottom) {
            this.y = top;
        }
    };

    Particle.prototype.edgeKill = function edgeKill() {
        var _outerBounds2 = this.outerBounds,
            left = _outerBounds2.left,
            right = _outerBounds2.right,
            top = _outerBounds2.top,
            bottom = _outerBounds2.bottom;


        if (this.x < left || this.x > right || this.y < top || this.y > bottom) {
            this.alive = false;
        }
    };

    Particle.prototype.edgeReset = function edgeReset() {
        var _outerBounds3 = this.outerBounds,
            left = _outerBounds3.left,
            right = _outerBounds3.right,
            top = _outerBounds3.top,
            bottom = _outerBounds3.bottom;


        if (this.x < left || this.x > right || this.y < top || this.y > bottom) {
            this.reset();
        }
    };

    Particle.prototype.lifeKill = function lifeKill() {
        this.lifeTime--;

        if (this.lifeTime <= 0) {
            this.alive = false;
        }
    };

    createClass(Particle, [{
        key: 'speed',
        get: function get$$1() {
            if (this.vx === 0 && this.vy === 0) {
                return 0;
            }
            return sqrt$1(this.vx * this.vx + this.vy * this.vy);
        },
        set: function set$$1(value) {
            var angle = this.angle;
            this.vx = cos$1(angle) * value;
            this.vy = sin$2(angle) * value;
        }
    }, {
        key: 'angle',
        get: function get$$1() {
            if (this.vx === 0 && this.vy === 0) {
                return 0;
            }
            return atan2(this.vy, this.vx);
        },
        set: function set$$1(value) {
            var speed = this.speed;
            this.vx = cos$1(value) * speed;
            this.vy = sin$2(value) * speed;
        }
    }, {
        key: 'bounds',
        get: function get$$1() {
            return this._bounds;
        },
        set: function set$$1(ob) {
            var x = ob.x,
                y = ob.y,
                width = ob.width,
                height = ob.height;

            this.setBounds(x, y, width, height);
        }
    }, {
        key: 'left',
        get: function get$$1() {
            return this.x - this.radius;
        }
    }, {
        key: 'right',
        get: function get$$1() {
            return this.x + this.radius;
        }
    }, {
        key: 'top',
        get: function get$$1() {
            return this.y - this.radius;
        }
    }, {
        key: 'bottom',
        get: function get$$1() {
            return this.y + this.radius;
        }
    }, {
        key: 'outerBounds',
        get: function get$$1() {
            this._outerBounds.left = this._bounds.x - this.radius;
            this._outerBounds.right = this._bounds.x + this._bounds.width + this.radius;
            this._outerBounds.top = this._bounds.y - this.radius;
            this._outerBounds.bottom = this._bounds.y + this._bounds.height + this.radius;
            return this._outerBounds;
        }
    }]);
    return Particle;
}();

var android = (function () {
  var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator.userAgent;
  return (/Android/i.test(ua)
  );
});

//http://stackoverflow.com/questions/14403766/how-to-detect-the-stock-android-browser
function androidNative() {
    var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator.userAgent;

    if (!android(ua)) {
        return false;
    }

    var isAndroidMobile = ua.indexOf('Mozilla/5.0') > -1 && ua.indexOf('AppleWebKit') > -1;

    var reAppleWebKit = /AppleWebKit\/([\d.]+)/;
    var resultAppleWebKit = reAppleWebKit.exec(ua);
    var appleWebKitVersion = resultAppleWebKit ? parseFloat(reAppleWebKit.exec(ua)[1]) : null;

    var reChrome = /Chrome\/([\d.]+)/;
    var resultChrome = reChrome.exec(ua);
    var chromeVersion = resultChrome ? parseFloat(reChrome.exec(ua)[1]) : null;

    return isAndroidMobile && appleWebKitVersion && appleWebKitVersion < 537 || chromeVersion && chromeVersion < 37;
}

function androidVersion() {
    var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator.userAgent;

    if (!android(ua)) {
        return 0;
    }
    var version = ua.match(/Android (\d+(?:\.\d+)+);/)[1];

    var _version$split = version.split('.'),
        a = _version$split[0],
        b = _version$split[1];

    return parseFloat(a + '.' + b);
}

var ios = (function () {
  var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator.userAgent;
  return (/iP[ao]d|iPhone/i.test(ua)
  );
});

var chromeIOS = (function () {
  var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator.userAgent;
  return ios(ua) && /CriOS/.test(ua);
});

var mobile = (function () {
  var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator.userAgent;
  return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|SymbianOS/i.test(ua)
  );
});

var desktop = (function () {
  var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator.userAgent;
  return !mobile(ua);
});

var deviceOrientation = (function () {
  return !!window.DeviceOrientationEvent;
});

var firefox = (function () {
  var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator.userAgent;
  return (/Firefox/.test(ua)
  );
});

function ieVersion() {
    var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator.userAgent;

    var v = 0;
    if (/MSIE (\d+\.\d+);/.test(ua)) {
        v = parseInt(RegExp.$1, 10);
    } else if (/Trident\/(\d+\.\d+)(.*)rv:(\d+\.\d+)/.test(ua)) {
        v = parseInt(RegExp.$3, 10);
    }
    return v;
}

var ie = (function () {
  var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator.userAgent;
  return ieVersion(ua) > 0;
});

function iosVersion() {
    var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator.userAgent;

    if (ios(ua)) {
        var _ua$match = ua.match(/OS (\d+)_(\d+)/i),
            b = _ua$match[1],
            c = _ua$match[2];

        if (b && c) {
            return parseFloat(b + '.' + c);
        }
    }
    return 0;
}

var ipad = (function () {
  var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator.userAgent;
  return (/iPad/i.test(ua)
  );
});

var iphone = (function () {
  var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator.userAgent;
  return (/iPod|iPhone/i.test(ua)
  );
});

var linux = (function () {
  var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator.userAgent;
  return !android(ua) && /Linux/.test(ua);
});

var mac = (function () {
  var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator.userAgent;
  return !ios(ua) && /Mac OS/.test(ua);
});

var videoEl = document.createElement('video');
var mp4 = (function () {
  return !!(videoEl.canPlayType && videoEl.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"'));
});

var safari = (function () {
  var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator.userAgent;
  return !/Android/.test(ua) && !/Chrome/.test(ua) && /Safari/.test(ua);
});

var safariIOS = (function () {
  var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator.userAgent;
  return ios(ua) && /AppleWebKit/.test(ua);
});

var screen = {
    width: Math.max(window.outerWidth, window.screen.width),
    height: Math.max(window.outerHeight, window.screen.height),
    dpr: window.devicePixelRatio || 1,
    retina: window.devicePixelRatio > 1
};

function webgl() {
    try {
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        return !!(window.WebGLRenderingContext && context);
    } catch (e) {
        return false;
    }
}

var videoEl$1 = document.createElement('video');
var webm = (function () {
  return !!(videoEl$1.canPlayType && videoEl$1.canPlayType('video/webm; codecs="vp8, vorbis"'));
});

var windowsPhone = (function () {
  var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator.userAgent;
  return (/Windows Phone/i.test(ua)
  );
});

var windows = (function () {
  var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator.userAgent;
  return !windowsPhone(ua) && /Windows/.test(ua);
});

var platform = {
    android: android(),
    androidNative: androidNative(),
    androidVersion: androidVersion(),
    chromeIOS: chromeIOS(),
    desktop: desktop(),
    deviceOrientation: deviceOrientation(),
    firefox: firefox(),
    ie: ie(),
    ieVersion: ieVersion(),
    ios: ios(),
    iosVersion: iosVersion(),
    ipad: ipad(),
    iphone: iphone(),
    linux: linux(),
    localHost: localHost(),
    mac: mac(),
    mobile: mobile(),
    mp4: mp4(),
    safari: safari(),
    safariIOS: safariIOS(),
    screen: screen,
    webgl: webgl(),
    webm: webm(),
    windows: windows(),
    windowsPhone: windowsPhone()
};

function popup(url) {
    var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 800;
    var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 600;
    var name = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

    var left = (window.screen.width - width) / 2;
    var top = (window.screen.height - height) / 2;
    // const left = (window.screen.availWidth - width) / 2;
    // const top = (window.screen.availHeight - height) / 2;
    var defaults = 'directories=no,location=no,menubar=no,resizable=no,scrollbars=no,status=no,toolbar=no';
    var params = 'width=' + width + ',height=' + height + ',top=' + top + ',left=' + left + ',' + defaults;
    var win = window.open(url, name, params);
    if (win === null || typeof win === 'undefined') {
        return false;
    }
    if (window.focus) {
        win.focus();
    }
    return true;
}

var Node = function () {
    function Node(bounds, depth, maxDepth, maxChildren) {
        classCallCheck(this, Node);

        this._bounds = bounds;
        this._depth = depth;
        this._maxDepth = maxDepth;
        this._maxChildren = maxChildren;

        this.children = [];
        this.nodes = [];
    }

    Node.prototype.insert = function insert(item) {
        if (this.nodes.length) {
            var index = this._findIndex(item);
            this.nodes[index].insert(item);
            return;
        }

        this.children.push(item);

        if (!(this._depth >= this._maxDepth) && this.children.length > this._maxChildren) {

            this.subdivide();

            for (var i = 0; i < this.children.length; i++) {
                this.insert(this.children[i]);
            }

            this.children.length = 0;
        }
    };

    Node.prototype.retrieve = function retrieve(item) {
        if (this.nodes.length) {
            var index = this._findIndex(item);
            return this.nodes[index].retrieve(item);
        }

        return this.children;
    };

    Node.prototype._findIndex = function _findIndex(item) {
        var _bounds = this._bounds,
            x = _bounds.x,
            y = _bounds.y,
            width = _bounds.width,
            height = _bounds.height;


        var right = item.x > x + width / 2;
        var bottom = item.y > y + height / 2;

        var index = void 0;

        if (right) {
            index = bottom ? Node.BR : Node.TR;
        } else {
            index = bottom ? Node.BL : Node.TL;
        }

        return index;
    };

    Node.prototype.subdivide = function subdivide() {
        var depth = this._depth + 1;

        var _bounds2 = this._bounds,
            x = _bounds2.x,
            y = _bounds2.y,
            width = _bounds2.width,
            height = _bounds2.height;

        var w = width / 2;
        var h = height / 2;

        this.nodes[Node.TL] = new Node({
            x: x,
            y: y,
            width: w,
            height: h
        }, depth, this._maxDepth, this._maxChildren);

        this.nodes[Node.TR] = new Node({
            x: x + w,
            y: y,
            width: w,
            height: h
        }, depth, this._maxDepth, this._maxChildren);

        this.nodes[Node.BL] = new Node({
            x: x,
            y: y + h,
            width: w,
            height: h
        }, depth, this._maxDepth, this._maxChildren);

        this.nodes[Node.BR] = new Node({
            x: x + w,
            y: y + h,
            width: w,
            height: h
        }, depth, this._maxDepth, this._maxChildren);
    };

    Node.prototype.clear = function clear() {
        this.children.length = 0;

        while (this.nodes.length) {
            this.nodes.pop().clear();
        }
    };

    return Node;
}();

Node.TL = 0;
Node.TR = 1;
Node.BL = 2;
Node.BR = 3;

var QuadTree = function () {
    function QuadTree(bounds) {
        var maxDepth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
        var maxChildren = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
        classCallCheck(this, QuadTree);

        this.root = new Node(bounds, 0, maxDepth, maxChildren);
    }

    QuadTree.prototype.insert = function insert(item) {
        if (Array.isArray(item)) {
            for (var i = 0; i < item.length; i++) {
                this.root.insert(item[i]);
            }
        } else {
            this.root.insert(item);
        }
    };

    QuadTree.prototype.clear = function clear() {
        this.root.clear();
    };

    QuadTree.prototype.retrieve = function retrieve(item) {
        return this.root.retrieve(item);
    };

    return QuadTree;
}();

function email(url) {
    var subject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var body = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    url = encodeURIComponent(url);
    subject = encodeURIComponent(subject);

    var newlines = encodeURIComponent('\r\n\r\n');
    body = body ? '' + encodeURIComponent(body) + newlines : '';

    return popup('mailto:?subject=' + subject + '&body=' + body + url);
}

function facebook(url) {
    url = encodeURIComponent(url);
    return popup('https://www.facebook.com/sharer/sharer.php?u=' + url);
}

function googleplus(url) {
    url = encodeURIComponent(url);
    return popup('https://plus.google.com/share?url=' + url);
}

function linkedin(url) {
    var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    url = encodeURIComponent(url);
    title = encodeURIComponent(title);
    return popup('https://www.linkedin.com/shareArticle?mini=true&url=' + url + '&title=' + title);
}

function pinterest(url, media) {
    var desc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    url = encodeURIComponent(url);
    media = encodeURIComponent(media);
    desc = encodeURIComponent(desc);
    return popup('https://pinterest.com/pin/create/button/?url=' + url + '&media=' + media + '&description=' + desc);
}

function reddit(url) {
    var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    url = encodeURIComponent(url);
    title = encodeURIComponent(title);
    return popup('https://www.reddit.com/submit?url=' + url + '&title=' + title);
}

function vkontakte(url) {
    var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    url = encodeURIComponent(url);
    title = encodeURIComponent(title);
    return popup('http://share.renren.com/share/buttonshare.do?link=' + url + '&title=' + title);
}

function sms(url) {
    var body = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    url = encodeURIComponent(url);

    var newlines = encodeURIComponent('\r\n\r\n');
    body = body ? '' + encodeURIComponent(body) + newlines : '';

    var ios = /iP[ao]d|iPhone/i.test(navigator.userAgent);
    var delim = ios ? '&' : '?';

    window.location.href = 'sms:' + delim + 'body=' + body + url;
}

function twitter(url) {
    var text = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var hashtags = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var related = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

    url = encodeURIComponent(url);
    text = encodeURIComponent(text);
    hashtags = encodeURIComponent(hashtags);
    related = encodeURIComponent(related);

    return popup('https://twitter.com/intent/tweet?url=' + url + '&text=' + text + '&hashtags=' + hashtags + '&related=' + related);
}

function vkontakte$1(url) {
    var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var description = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var image = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

    url = encodeURIComponent(url);
    title = encodeURIComponent(title);
    description = encodeURIComponent(description);
    image = encodeURIComponent(image);
    return popup('http://vkontakte.ru/share.php?url=' + url + '&title=' + title + '&description=' + description + '&image=' + image);
}

function weibo(url) {
    var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var image = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    url = encodeURIComponent(url);
    title = encodeURIComponent(title);
    image = encodeURIComponent(image);

    var params = 'url=' + url + '&appkey=&title=' + title + '&pic=' + image + '&ralateUid=&language=zh_cn';
    return popup('http://service.weibo.com/share/share.php?' + params);
}

function whatsapp(url) {
    var body = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    url = encodeURIComponent(url);

    var newlines = encodeURIComponent('\r\n\r\n');
    body = body ? '' + encodeURIComponent(body) + newlines : '';

    window.location.href = 'whatsapp://send?text=' + body + url;
}

var share = {
    email: email,
    facebook: facebook,
    googleplus: googleplus,
    linkedin: linkedin,
    pinterest: pinterest,
    reddit: reddit,
    renren: vkontakte,
    sms: sms,
    twitter: twitter,
    vkontakte: vkontakte$1,
    weibo: weibo,
    whatsapp: whatsapp
};

function load(key) {
    var item = null;

    try {
        item = localStorage.getItem(key);
    } catch (err) {}

    return item;
}

function save(key, item) {
    try {
        localStorage.setItem(key, item);
        return true;
    } catch (err) {
        console.error('Couldn\'t save in localStorage');
    }
    return false;
}

function loadJSON(key) {
    var item = load(key);
    return item ? JSON.parse(item) : null;
}

function saveJSON(key, item) {
    return save(key, JSON.stringify(item));
}

function remove(key) {
    try {
        localStorage.removeItem(key);
    } catch (err) {}
}

var storage = { load: load, save: save, loadJSON: loadJSON, saveJSON: saveJSON, remove: remove };

// everything after the first occurrence of substr in str
function afterFirst(str, substr) {
    var index = str.indexOf(substr);
    if (index === -1) {
        return '';
    }
    index += substr.length;
    return str.slice(index);
}

// everything after the last occurence of substr in str
function afterLast(str, substr) {
    var index = str.lastIndexOf(substr);
    if (index === -1) {
        return '';
    }
    index += substr.length;
    return str.slice(index);
}

// everything before the first occurrence of substr in str
function beforeFirst(str, substr) {
    var index = str.indexOf(substr);
    if (index === -1) {
        return '';
    }
    return str.slice(0, index);
}

// everything before the last occurrence of substr in the string.
function beforeLast(str, substr) {
    var index = str.lastIndexOf(substr);
    if (index === -1) {
        return '';
    }
    return str.slice(0, index);
}

// whether str begins with substr
function beginsWith(str, substr) {
    return str.indexOf(substr) === 0;
}

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

// regex escape pattern
function escapePattern(pattern) {
    return pattern.replace(/(\]|\[|\{|\}|\(|\)|\*|\+|\?|\.|\\)/g, '\\$1');
}

// truncate to length with suffix
function truncate(str, len) {
    var suffix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '...';

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

// Utility method that intelligently breaks up your string,
// allowing you to create blocks of readable text.
// This method returns you the closest possible match to the delim paramater,
// while keeping the text length within the len paramter.
// If a match can't be found in your specified length an  '...' is added to that block,
// and the blocking continues untill all the text is broken apart.
function block(str, len) {
    var delim = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '.';

    var arr = [];

    if (!str || !str.includes(delim)) {
        return arr;
    }

    if (delim === ' ') {
        str += delim;
    }

    var chrIndex = 0;
    var replPatt = new RegExp('[^' + escapePattern(delim) + ']+$');

    while (chrIndex < str.length) {
        var subString = str.substr(chrIndex, len);
        if (!subString.includes(delim)) {
            arr.push(truncate(subString, subString.length));
            chrIndex += subString.length;
        }
        subString = subString.replace(replPatt, '');
        chrIndex += subString.length;
        arr.push(subString.trim());
    }
    return arr;
}

// Capitalize the first word in a string or all words
function capitalize(str) {
    var all = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var substr = str.trimLeft();
    var re = all ? /^.|\b./g : /(^\w)/;
    return substr.replace(re, function (match) {
        return match.toUpperCase();
    });
}

// the number of times substr appears within str
function countOf(str, substr, caseSensitive) {
    var escapedStr = escapePattern(substr);
    var flags = !caseSensitive ? 'ig' : 'g';
    return str.match(new RegExp(escapedStr, flags)).length;
}

// Levenshtein distance (editDistance) is a measure of the similarity between
// two strings. The distance is the number of deletions, insertions, or
// substitutions required to transform source into target.
function editDistance() {
    var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';


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

// whether str ends with substr
function endsWith(str, substr) {
    return str.lastIndexOf(substr) === str.length - substr.length;
}

// export default function escapeHtml(str) {
//     const div = document.createElement('div');
//     div.appendChild(document.createTextNode(str));
//     return div.innerHTML;
// }

var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
};

function escapeHtml(string) {
    return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap(s) {
        return entityMap[s];
    });
}

// remove extra whitespace (extra spaces, tabs, line breaks, etc)
function removeExtraWhitespace(str) {
    return str.trim().replace(/\s+/g, ' ');
}

// whether str contains any text
function hasText(str) {
    return !!removeExtraWhitespace(str).length;
}

// whether str is numeric
function isNumeric(str) {
    var regx = /^[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?$/;
    return regx.test(str);
}

// pad str with substr from the left
function padLeft(str, substr, length) {
    str = String(str);
    while (str.length < length) {
        str = substr + str;
    }
    return str;
}

// pads str with substr from the right
function padRight(str, substr, length) {
    str = String(str);
    while (str.length < length) {
        str += substr;
    }
    return str;
}

function preventWidow(str) {
    str = str.trim();

    var lastSpace = str.lastIndexOf(' ');
    if (lastSpace > 0) {
        return str.slice(0, lastSpace) + '&nbsp;' + str.slice(lastSpace + 1);
    }

    return str;
}

// proper case str in sentence format
function properCase(str) {
    var newStr = str.toLowerCase().replace(/\b([^.?;!]+)/, capitalize);
    return newStr.replace(/\b[i]\b/, 'I');
}

// remove all instances of substr in str
function remove$1(str, substr) {
    var caseSensitive = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var escapedStr = escapePattern(substr);
    var flags = caseSensitive ? 'g' : 'ig';
    return str.replace(new RegExp(escapedStr, flags), '');
}

// reverse character order
function reverse(str) {
    return str.split('').reverse().join('');
}

// reverse word order
function reverseWords(str) {
    return str.split(' ').reverse().join(' ');
}

// percentage of similiarity from 0 to 1
function similarity(a, b) {
    var e = editDistance(a, b);
    var m = Math.max(a.length, b.length);
    if (m === 0) {
        return 1;
    }
    return 1 - e / m;
}

// remove all HTML tags from str
function stripTags(str) {
    return str.replace(/<\/?[^>]+>/igm, '');
}

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

// formats seconds into HH:MM:SS
function timeCode(seconds) {
    var delim = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ':';

    var h = Math.floor(seconds / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 3600 % 60);
    var hr = (h < 10 ? '0' + h : h) + delim;
    var mn = (m < 10 ? '0' + m : m) + delim;
    var sc = s < 10 ? '0' + s : s;
    return hr + mn + sc;
}

function toNumber(str) {
    return Number(str.replace(/[^0-9.]/g, ''));
}

// the number of words in a string
function wordCount(str) {
    return str.match(/\b\w+\b/g).length;
}

var string = {
    afterFirst: afterFirst,
    afterLast: afterLast,
    beforeFirst: beforeFirst,
    beforeLast: beforeLast,
    beginsWith: beginsWith,
    between: between,
    block: block,
    capitalize: capitalize,
    countOf: countOf,
    editDistance: editDistance,
    endsWith: endsWith,
    escapeHTML: escapeHtml,
    escapePattern: escapePattern,
    hasText: hasText,
    isNumeric: isNumeric,
    padLeft: padLeft,
    padRight: padRight,
    preventWidow: preventWidow,
    properCase: properCase,
    remove: remove$1,
    removeExtraWhitespace: removeExtraWhitespace,
    reverse: reverse,
    reverseWords: reverseWords,
    similarity: similarity,
    stripTags: stripTags,
    swapCase: swapCase,
    timeCode: timeCode,
    toNumber: toNumber,
    truncate: truncate,
    wordCount: wordCount
};

function event(category, action, label, value) {
    if (!window.ga) {
        return;
    }
    window.ga('send', 'event', category, action, label, value);
}

function pageview(path) {
    if (!window.ga) {
        return;
    }
    window.ga('send', 'pageview', path);
}

function load$1(gaAccount) {
    console.log('Initialize Google Analytics with account Id:', gaAccount);

    /*eslint-disable*/
    (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments);
        }, i[r].l = 1 * new Date();a = s.createElement(o), m = s.getElementsByTagName(o)[0];a.async = 1;a.src = g;m.parentNode.insertBefore(a, m);
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
    /*eslint-enable*/

    window.ga('create', gaAccount, 'auto');
    window.ga('send', 'pageview');
}

var track = {
    event: event,
    pageview: pageview,
    load: load$1
};

var Tween = function () {
    function Tween(ob, props, duration, options) {
        classCallCheck(this, Tween);

        this.ob = ob;

        if (props) {
            this.to(props, duration, options);
        }
    }

    Tween.prototype.to = function to(props, duration) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        this.duration = duration;
        this.ease = options.ease || easeOutQuad;
        this.delay = options.delay || 0;
        this.onUpdate = options.onUpdate;
        this.onComplete = options.onComplete;
        this.time = 0;
        this.complete = false;

        this._props = Object.keys(props);
        this._beginVals = {};
        this._changeVals = {};

        for (var i = 0; i < this._props.length; i++) {
            var prop = this._props[i];
            this._beginVals[prop] = this.ob[prop];
            this._changeVals[prop] = props[prop] - this._beginVals[prop];
        }
    };

    Tween.prototype.update = function update(dt) {
        if (this.time === this.duration) {
            return;
        }

        if (this.delay > 0) {
            this.delay -= dt;
            return;
        }

        this.time += dt;

        if (this.time > this.duration) {
            this.time = this.duration;
        }

        for (var i = 0; i < this._props.length; i++) {
            var prop = this._props[i];
            this.ob[prop] = this.ease(this.time, this._beginVals[prop], this._changeVals[prop], this.duration);
        }

        if (this.onUpdate) {
            this.onUpdate(this.ob);
        }

        if (this.time === this.duration) {
            this.complete = true;

            if (this.onComplete) {
                this.onComplete(this.ob);
            }
        }
    };

    Tween.prototype.reset = function reset() {
        this.time = 0;
        this.complete = false;
    };

    return Tween;
}();

var hidden = void 0;
var change$1 = void 0;

if (typeof document.hidden !== 'undefined') {
    hidden = 'hidden';
    change$1 = 'visibilitychange';
} else if (typeof document.mozHidden !== 'undefined') {
    hidden = 'mozHidden';
    change$1 = 'mozvisibilitychange';
} else if (typeof document.msHidden !== 'undefined') {
    hidden = 'msHidden';
    change$1 = 'msvisibilitychange';
} else if (typeof document.webkitHidden !== 'undefined') {
    hidden = 'webkitHidden';
    change$1 = 'webkitvisibilitychange';
}

var api$1 = {
    hidden: hidden,
    change: change$1
};

var visibility = Object.create(emitter.prototype, {
    hidden: {
        get: function get() {
            return document[api$1.hidden];
        }
    }
});

function onVisibilityChange() {
    if (document[api$1.hidden]) {
        visibility.emit('hidden');
    } else {
        visibility.emit('shown');
    }
}

if (api$1.change) {
    document.addEventListener(api$1.change, onVisibilityChange, false);
}

var index = {
    array: array$$1,
    dom: dom,
    ease: ease,
    events: events$2,
    fps: fps$1,
    fullscreen: fullscreen,
    graphics: Graphics,
    gui: gui,
    http: http,
    input: input,
    linkedList: linkedList,
    Loop: Loop,
    math: math,
    media: media,
    object: object,
    objectPool: objectPool,
    Particle: Particle,
    ParticleGroup: Particle,
    platform: platform,
    popup: popup,
    QuadTree: QuadTree,
    share: share,
    storage: storage,
    string: string,
    Tween: Tween,
    track: track,
    visibility: visibility
};

return index;

})));
//# sourceMappingURL=usfl.js.map
