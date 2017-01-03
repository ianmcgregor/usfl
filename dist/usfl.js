(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.usfl = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = array;
function array(length, value) {
    var arr = [];
    for (var i = 0; i < length; i++) {
        var val = typeof value !== 'undefined' ? value : i;
        arr.push(val);
    }
    return arr;
}

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = clone;
function clone(arr) {
    return arr.slice(0);
}

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _array = require('./array');

var _array2 = _interopRequireDefault(_array);

var _clone = require('./clone');

var _clone2 = _interopRequireDefault(_clone);

var _nearest = require('./nearest');

var _nearest2 = _interopRequireDefault(_nearest);

var _randomChoice = require('./randomChoice');

var _randomChoice2 = _interopRequireDefault(_randomChoice);

var _sortAlpha = require('./sortAlpha');

var _sortAlpha2 = _interopRequireDefault(_sortAlpha);

var _sortNumeric = require('./sortNumeric');

var _sortNumeric2 = _interopRequireDefault(_sortNumeric);

var _sortRandom = require('./sortRandom');

var _sortRandom2 = _interopRequireDefault(_sortRandom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    array: _array2.default,
    clone: _clone2.default,
    nearest: _nearest2.default,
    randomChoice: _randomChoice2.default,
    sortAlpha: _sortAlpha2.default,
    sortNumeric: _sortNumeric2.default,
    sortRandom: _sortRandom2.default
};

},{"./array":1,"./clone":2,"./nearest":4,"./randomChoice":5,"./sortAlpha":6,"./sortNumeric":7,"./sortRandom":8}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = randomChoice;
function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = sortAlpha;
function sortAlpha(a, b) {
    if (arguments.length === 1) {
        return function (x, y) {
            return String(x[a]).toLowerCase() > String(y[a]).toLowerCase() ? 1 : -1;
        };
    }
    return String(a).toLowerCase() > String(b).toLowerCase() ? 1 : -1;
}

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = sortNumeric;
function sortNumeric(a, b) {
    if (arguments.length === 1) {
        return function (x, y) {
            return Number(x[a]) - Number(y[a]);
        };
    }
    return Number(a) - Number(b);
}

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = sortRandom;
function sortRandom() {
    return Math.random() > 0.5 ? -1 : 1;
}

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = blockScrolling;
function blockScrolling(value) {
    document.body.style.overflow = value ? 'hidden' : '';
}

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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

},{"./getScrollTop":14}],13:[function(require,module,exports){
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

},{"./getScrollTop":14}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getScrollTop;
function getScrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop;
}

},{}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = getSrcsetImage;
function getSrcsetImage(srcset, pixelWidth) {
    pixelWidth = pixelWidth || window.innerWidth * (window.devicePixelRatio || 0);

    var set = srcset.split(',').map(function (item) {
        var _item$trim$split = item.trim().split(/\s+/);

        var _item$trim$split2 = _slicedToArray(_item$trim$split, 2);

        var url = _item$trim$split2[0];
        var width = _item$trim$split2[1];

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

},{}],16:[function(require,module,exports){
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

var _getSrcsetImage = require('./getSrcsetImage');

var _getSrcsetImage2 = _interopRequireDefault(_getSrcsetImage);

var _isElementInViewport = require('./isElementInViewport');

var _isElementInViewport2 = _interopRequireDefault(_isElementInViewport);

var _isPageEnd = require('./isPageEnd');

var _isPageEnd2 = _interopRequireDefault(_isPageEnd);

var _resize = require('./resize');

var _resize2 = _interopRequireDefault(_resize);

var _scroll = require('./scroll');

var _scroll2 = _interopRequireDefault(_scroll);

var _setStyle = require('./setStyle');

var _setStyle2 = _interopRequireDefault(_setStyle);

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
    getSrcsetImage: _getSrcsetImage2.default,
    isElementInViewport: _isElementInViewport2.default,
    isPageEnd: _isPageEnd2.default,
    resize: _resize2.default,
    scroll: _scroll2.default,
    setStyle: _setStyle2.default,
    transitionEnd: _transitionEnd2.default
};

},{"./blockScrolling":9,"./forceRedraw":10,"./getPageHeight":11,"./getScrollPercentage":12,"./getScrollRemaining":13,"./getScrollTop":14,"./getSrcsetImage":15,"./isElementInViewport":17,"./isPageEnd":18,"./resize":19,"./scroll":20,"./setStyle":21,"./transitionEnd":22}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = isElementInViewport;
function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= window.innerHeight && rect.right <= window.innerWidth;
}

},{}],18:[function(require,module,exports){
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

},{"./getScrollTop":14}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = resize;

var _eventBus = require('../events/eventBus');

var _eventBus2 = _interopRequireDefault(_eventBus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function resize() {
    var debouceDelay = arguments.length <= 0 || arguments[0] === undefined ? 500 : arguments[0];


    var timeoutId = void 0;

    // orientationchange too?

    window.addEventListener('resize', function () {
        clearTimeout(timeoutId);
        timeoutId = window.setTimeout(function () {
            return _eventBus2.default.emit('resize');
        }, debouceDelay);
    });
}

},{"../events/eventBus":26}],20:[function(require,module,exports){
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

},{"../events/eventBus":26}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = setStyle;
function setStyle(el, style) {
    Object.keys(style).forEach(function (prop) {
        el.style[prop] = style[prop];
    });
    return el;
}

},{}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = transitionEnd;
function transitionEnd(el, cb) {
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
}

},{}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = debounce;
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

},{}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = delegateEvents;
function delegateEvents(parentEl, eventType, tagName, cb) {
    tagName = tagName.toUpperCase();

    parentEl.addEventListener(eventType, function (event) {
        var target = event.target;

        while (target !== parentEl) {
            if (target.tagName === tagName) {
                event.stopImmediatePropagation();
                cb(target, event);
                break;
            }
            target = target.parentNode;
        }
    });
}

},{}],25:[function(require,module,exports){
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

},{"events":93}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _emitter = require('./emitter');

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = Object.create(_emitter2.default.prototype);

},{"./emitter":25}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = heartbeat;

var _emitter = require('./emitter');

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function heartbeat(interval) {
    var beat = null,
        time = 0,
        numTimes = 0,
        maxTimes = 0,
        running = false;

    function start() {
        var maxNumTimes = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
        var timeOffset = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

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
        var dt = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

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

    beat = Object.assign(Object.create(_emitter2.default.prototype), {
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

},{"./emitter":25}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _debounce = require('./debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _delegateEvents = require('./delegateEvents');

var _delegateEvents2 = _interopRequireDefault(_delegateEvents);

var _emitter = require('./emitter');

var _emitter2 = _interopRequireDefault(_emitter);

var _eventBus = require('./eventBus');

var _eventBus2 = _interopRequireDefault(_eventBus);

var _heartbeat = require('./heartbeat');

var _heartbeat2 = _interopRequireDefault(_heartbeat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    debounce: _debounce2.default,
    delegateEvents: _delegateEvents2.default,
    emitter: _emitter2.default,
    eventBus: _eventBus2.default,
    heartbeat: _heartbeat2.default
};

},{"./debounce":23,"./delegateEvents":24,"./emitter":25,"./eventBus":26,"./heartbeat":27}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = fps;
function fps(el) {

    var time = 0,
        fps = 0,
        currentFps = 0,
        averageFps = 0,
        ticks = 0,
        totalFps = 0,
        lastFps = 0,
        lastAverage = 0;

    if (!el) {
        el = document.createElement('div');
        el.setAttribute('id', 'fps');
        el.style.position = 'absolute';
        el.style.top = '0px';
        el.style.right = '0px';
        el.style.padding = '2px 6px';
        el.style.zIndex = '99999';
        el.style.background = '#000';
        el.style.color = '#fff';
        el.style.fontSize = '10px';
        document.body.appendChild(el);
    }

    function report() {
        if (currentFps === lastFps && averageFps === lastAverage) {
            return;
        }
        lastFps = currentFps;
        lastAverage = averageFps;
        el.innerHTML = 'FPS: ' + currentFps + '<br />AVE: ' + averageFps;
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
            report();
        }

        fps++;
    }

    function auto() {
        window.requestAnimationFrame(auto);

        update();
    }

    return {
        auto: auto,
        update: update
    };
}

},{}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var request = null,
    exit = null,
    change = null,
    error = null,
    element = null,
    enabled = null;

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

exports.default = {
    request: request,
    exit: exit,
    change: change,
    error: error,
    element: element,
    enabled: enabled
};

},{}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _emitter = require('../events/emitter');

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fullscreen = Object.create(_emitter2.default.prototype);

document.addEventListener(_api2.default.change, function (event) {
    fullscreen.emit('change', event);
});

document.addEventListener(_api2.default.error, function (event) {
    fullscreen.emit('error', event);
});

Object.defineProperties(fullscreen, {
    request: {
        value: function value(el) {
            el = el || document.documentElement;
            el[_api2.default.request](true);
        }
    },
    exit: {
        value: function value() {
            document[_api2.default.exit]();
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
            return !!_api2.default.request;
        }
    },
    isFullscreen: {
        get: function get() {
            return !!document[_api2.default.element];
        }
    },
    element: {
        enumerable: true,
        get: function get() {
            return document[_api2.default.element];
        }
    },
    enabled: {
        enumerable: true,
        get: function get() {
            return document[_api2.default.enabled];
        }
    }
});

exports.default = fullscreen;

},{"../events/emitter":25,"./api":30}],32:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function getColour(r, g, b) {
    var a = arguments.length <= 3 || arguments[3] === undefined ? 1 : arguments[3];

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
        _classCallCheck(this, Graphics);

        if ((typeof width === 'undefined' ? 'undefined' : _typeof(width)) === 'object' && width.tagName === 'CANVAS') {
            this.canvas = width;
        } else {
            this.canvas = document.createElement('canvas');
            this.size(width, height);
        }
        this.ctx = this.canvas.getContext('2d');
    }

    _createClass(Graphics, [{
        key: 'fill',
        value: function fill(r, g, b) {
            var a = arguments.length <= 3 || arguments[3] === undefined ? 1 : arguments[3];

            this.ctx.fillStyle = getColour(r, g, b, a);
            return this;
        }
    }, {
        key: 'stroke',
        value: function stroke(r, g, b) {
            var a = arguments.length <= 3 || arguments[3] === undefined ? 1 : arguments[3];

            this.ctx.strokeStyle = getColour(r, g, b, a);
            return this;
        }
    }, {
        key: 'circle',
        value: function circle(x, y, radius) {
            var ctx = this.ctx;

            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2, false);
            ctx.fill();
            return this;
        }
    }, {
        key: 'rect',
        value: function rect(x, y, width, height) {
            var angle = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];
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
        }
    }, {
        key: 'line',
        value: function line(x1, y1, x2, y2) {
            var ctx = this.ctx;

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            return this;
        }
    }, {
        key: 'lineWidth',
        value: function lineWidth(width) {
            this.ctx.lineWidth = width;
            return this;
        }
    }, {
        key: 'move',
        value: function move(x, y) {
            this.ctx.moveTo(x, y);
            return this;
        }
    }, {
        key: 'image',
        value: function image(el, x, y) {
            var angle = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
            var ctx = this.ctx;

            if (angle !== 0) {
                var offsetX = el.width / 2;
                var offsetY = el.height / 2;
                ctx.save();
                ctx.translate(x + offsetX, y + offsetY);
                ctx.rotate(angle);
                ctx.drawImage(el, -offsetX, -offsetY);
                ctx.restore();
            } else {
                ctx.drawImage(el, x, y);
            }
            return this;
        }
    }, {
        key: 'text',
        value: function text(str, x, y) {
            this.ctx.fillText(str, x, y);
            return this;
        }
    }, {
        key: 'setFontStyle',
        value: function setFontStyle(family, size) {
            this.ctx.font = size + 'px ' + family;
        }
    }, {
        key: 'getImageData',
        value: function getImageData() {
            var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
            var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
            var width = arguments[2];
            var height = arguments[3];
            var ctx = this.ctx;
            var canvas = this.canvas;

            return ctx.getImageData(x, y, width || canvas.width, height || canvas.height);
        }
    }, {
        key: 'getPixel',
        value: function getPixel(x, y) {
            x = Math.floor(x);
            y = Math.floor(y);

            var _ctx$getImageData = this.ctx.getImageData(x, y, 1, 1);

            var data = _ctx$getImageData.data;

            return Array.prototype.slice.call(data);
        }
    }, {
        key: 'setPixel',
        value: function setPixel(x, y, r, g, b, a) {
            x = Math.floor(x);
            y = Math.floor(y);

            var _getImageData = this.getImageData();

            var width = _getImageData.width;
            var data = _getImageData.data;

            var i = (x + y * width) * 4;
            data[i + 0] = r;
            data[i + 1] = g;
            data[i + 2] = b;
            data[i + 3] = a;
            return this;
        }
    }, {
        key: 'clearCircle',
        value: function clearCircle(x, y) {
            var radius = arguments.length <= 2 || arguments[2] === undefined ? 20 : arguments[2];
            var ctx = this.ctx;

            ctx.save();
            ctx.globalCompositeOperation = 'destination-out';
            this.circle(x, y, radius);
            ctx.globalCompositeOperation = 'source-over';
            ctx.restore();
            return this;
        }
    }, {
        key: 'translateAnd',
        value: function translateAnd(x, y, fn) {
            var ctx = this.ctx;

            ctx.save();
            ctx.translate(x, y);
            fn(ctx);
            ctx.restore();
            return this;
        }
    }, {
        key: 'clear',
        value: function clear(r, g, b) {
            var a = arguments.length <= 3 || arguments[3] === undefined ? 1 : arguments[3];

            var color = getColour(r, g, b, a);
            var ctx = this.ctx;
            var _canvas = this.canvas;
            var width = _canvas.width;
            var height = _canvas.height;

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
        }
    }, {
        key: 'size',
        value: function size() {
            var width = arguments.length <= 0 || arguments[0] === undefined ? window.innerWidth : arguments[0];
            var height = arguments.length <= 1 || arguments[1] === undefined ? window.innerHeight : arguments[1];

            this.canvas.width = width;
            this.canvas.height = height;
            return this;
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            if (this.canvas.parentElement) {
                this.canvas.parentElement.removeChild(this.canvas);
            }
            this.canvas = null;
            this.ctx = null;
        }
    }, {
        key: 'context',
        get: function get() {
            return this.ctx;
        }
    }]);

    return Graphics;
}();

exports.default = Graphics;

},{}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getLocation;
function getLocation(href) {
    var l = document.createElement('a');
    l.href = href;
    return l;
}

},{}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getLocation = require('./getLocation');

var _getLocation2 = _interopRequireDefault(_getLocation);

var _jsonp = require('./jsonp');

var _jsonp2 = _interopRequireDefault(_jsonp);

var _loadScript = require('./loadScript');

var _loadScript2 = _interopRequireDefault(_loadScript);

var _urlParams = require('./urlParams');

var _urlParams2 = _interopRequireDefault(_urlParams);

var _xhr = require('./xhr');

var _xhr2 = _interopRequireDefault(_xhr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    getLocation: _getLocation2.default,
    jsonp: _jsonp2.default,
    loadScript: _loadScript2.default,
    urlParams: _urlParams2.default,
    xhr: _xhr2.default
};

},{"./getLocation":33,"./jsonp":35,"./loadScript":36,"./urlParams":37,"./xhr":38}],35:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = jsonp;
function jsonp(url, cb) {
    var timeout = arguments.length <= 2 || arguments[2] === undefined ? 5000 : arguments[2];

    var script = document.createElement('script');
    var callback = 'jsonp_callback_' + Math.round(100000 * Math.random());
    var separator = url.indexOf('?') >= 0 ? '&' : '?';

    var timeoutId = window.setTimeout(function () {
        window[callback](null, 'jsonp error');
    }, timeout);

    window[callback] = function (data) {
        var err = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

        window.clearTimeout(timeoutId);
        delete window[callback];
        document.body.removeChild(script);
        cb(data, err);
    };

    script.src = '' + url + separator + 'callback=' + callback;
    document.body.appendChild(script);
}

},{}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = loadScript;
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

},{}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = urlParams;
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

},{}],38:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = xhr;
function xhr(url) {
    var type = arguments.length <= 1 || arguments[1] === undefined ? 'json' : arguments[1];

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

},{}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('./polyfill');

var _array = require('./array');

var _array2 = _interopRequireDefault(_array);

var _dom = require('./dom');

var _dom2 = _interopRequireDefault(_dom);

var _events = require('./events');

var _events2 = _interopRequireDefault(_events);

var _fps = require('./fps');

var _fps2 = _interopRequireDefault(_fps);

var _fullscreen = require('./fullscreen');

var _fullscreen2 = _interopRequireDefault(_fullscreen);

var _graphics = require('./graphics');

var _graphics2 = _interopRequireDefault(_graphics);

var _http = require('./http');

var _http2 = _interopRequireDefault(_http);

var _input = require('./input');

var _input2 = _interopRequireDefault(_input);

var _linkedList = require('./linked-list');

var _linkedList2 = _interopRequireDefault(_linkedList);

var _math = require('./math');

var _math2 = _interopRequireDefault(_math);

var _media = require('./media');

var _media2 = _interopRequireDefault(_media);

var _objectPool = require('./object-pool');

var _objectPool2 = _interopRequireDefault(_objectPool);

var _platform = require('./platform');

var _platform2 = _interopRequireDefault(_platform);

var _popup = require('./popup');

var _popup2 = _interopRequireDefault(_popup);

var _share = require('./share');

var _share2 = _interopRequireDefault(_share);

var _storage = require('./storage');

var _storage2 = _interopRequireDefault(_storage);

var _string = require('./string');

var _string2 = _interopRequireDefault(_string);

var _track = require('./track');

var _track2 = _interopRequireDefault(_track);

var _visibility = require('./visibility');

var _visibility2 = _interopRequireDefault(_visibility);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    array: _array2.default,
    dom: _dom2.default,
    events: _events2.default,
    fps: _fps2.default,
    fullscreen: _fullscreen2.default,
    graphics: _graphics2.default,
    http: _http2.default,
    input: _input2.default,
    linkedList: _linkedList2.default,
    math: _math2.default,
    media: _media2.default,
    objectPool: _objectPool2.default,
    platform: _platform2.default,
    popup: _popup2.default,
    share: _share2.default,
    storage: _storage2.default,
    string: _string2.default,
    track: _track2.default,
    visibility: _visibility2.default
};

},{"./array":3,"./dom":16,"./events":28,"./fps":29,"./fullscreen":31,"./graphics":32,"./http":34,"./input":41,"./linked-list":49,"./math":65,"./media":88,"./object-pool":94,"./platform":99,"./polyfill":117,"./popup":119,"./share":124,"./storage":134,"./string":149,"./track":167,"./visibility":171}],40:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = clickOutside;
function clickOutside(el, cb) {
    function onClickOutside(event) {
        var target = event.target;
        var inside = false;

        while (target !== document.body) {
            if (target === el) {
                event.stopImmediatePropagation();
                inside = true;
                break;
            }
            target = target.parentNode;
        }

        if (!inside) {
            cb();
        }
    }
    document.body.addEventListener('mousedown', onClickOutside);
    document.body.addEventListener('touchstart', onClickOutside);

    return {
        destroy: function destroy() {
            document.body.removeEventListener('mousedown', onClickOutside);
            document.body.removeEventListener('touchstart', onClickOutside);
        }
    };
}

},{}],41:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _clickOutside = require('./clickOutside');

var _clickOutside2 = _interopRequireDefault(_clickOutside);

var _keyboard = require('./keyboard');

var _keyboard2 = _interopRequireDefault(_keyboard);

var _keyInput = require('./keyInput');

var _keyInput2 = _interopRequireDefault(_keyInput);

var _microphone = require('./microphone');

var _microphone2 = _interopRequireDefault(_microphone);

var _mouseLeftWindow = require('./mouseLeftWindow');

var _mouseLeftWindow2 = _interopRequireDefault(_mouseLeftWindow);

var _mouseWheel = require('./mouseWheel');

var _mouseWheel2 = _interopRequireDefault(_mouseWheel);

var _pointerCoords = require('./pointerCoords');

var _pointerCoords2 = _interopRequireDefault(_pointerCoords);

var _touchInput = require('./touchInput');

var _touchInput2 = _interopRequireDefault(_touchInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    clickOutside: _clickOutside2.default,
    keyboard: _keyboard2.default,
    keyInput: _keyInput2.default,
    microphone: _microphone2.default,
    mouseLeftWindow: _mouseLeftWindow2.default,
    mouseWheel: _mouseWheel2.default,
    pointerCoords: _pointerCoords2.default,
    touchInput: _touchInput2.default
};

},{"./clickOutside":40,"./keyInput":42,"./keyboard":43,"./microphone":44,"./mouseLeftWindow":45,"./mouseWheel":46,"./pointerCoords":47,"./touchInput":48}],42:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = keyInput;

var _array = require('../array/array');

var _array2 = _interopRequireDefault(_array);

var _emitter = require('../events/emitter');

var _emitter2 = _interopRequireDefault(_emitter);

var _keyboard = require('./keyboard');

var _keyboard2 = _interopRequireDefault(_keyboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function keyInput() {
    var api = Object.create(_emitter2.default.prototype);
    var keys = (0, _array2.default)(256, false);

    function emitKey(keyCode) {
        var keyName = Object.keys(_keyboard2.default).reduce(function (value, key) {
            return _keyboard2.default[key] === keyCode ? key : value;
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
        return keys[_keyboard2.default.LEFT] || keys[_keyboard2.default.A];
    }

    function right() {
        return keys[_keyboard2.default.RIGHT] || keys[_keyboard2.default.D];
    }

    function up() {
        return keys[_keyboard2.default.UP] || keys[_keyboard2.default.W];
    }

    function down() {
        return keys[_keyboard2.default.DOWN] || keys[_keyboard2.default.S];
    }

    function space() {
        return keys[_keyboard2.default.SPACE];
    }

    function enable() {
        var value = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

        remove();
        if (value) {
            add();
        }
    }

    add();

    return Object.assign(api, {
        keyboard: _keyboard2.default,
        enable: enable,
        isDown: isDown,
        left: left,
        right: right,
        up: up,
        down: down,
        space: space
    });
}

},{"../array/array":1,"../events/emitter":25,"./keyboard":43}],43:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
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

},{}],44:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = microphone;

var _emitter = require('../events/emitter');

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function microphone() {
    var mic = Object.create(_emitter2.default.prototype);
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

},{"../events/emitter":25}],45:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = mouseLeftWindow;
function mouseLeftWindow(cb) {
    function handler(event) {
        var from = event.relatedTarget || event.toElement;
        if (!from || from.nodeName === 'HTML') {
            cb();
        }
    }

    document.addEventListener('mouseout', handler, false);

    return {
        destroy: function destroy() {
            document.removeEventListener('mouseout', handler);
        }
    };
}

},{}],46:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = mouseWheel;

var _emitter = require('../events/emitter');

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mouseWheel(speed) {
    speed = speed || 2;

    var wheel = void 0;

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

    wheel = Object.create(_emitter2.default.prototype, {
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

},{"../events/emitter":25}],47:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = pointerCoords;
function pointerCoords() {
    var self = void 0;

    function calculateCoords(event) {
        var pX = event.clientX || 0;
        var pY = event.clientY || 0;
        var sX = window.pageXOffset;
        var sY = window.pageYOffset;
        self.x = pX + sX;
        self.y = pY + sY;
        self.percentX = self.x / window.innerWidth;
        self.percentY = self.y / window.innerHeight;
    }

    self = {
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

},{}],48:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = touchInput;

var _emitter = require('../events/emitter');

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

    var self = void 0;

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

    self = Object.create(_emitter2.default.prototype, {
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

},{"../events/emitter":25}],49:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = linkedList;
function linkedList() {
    var arr = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];


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

},{}],50:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = angle;
function angle(x1, y1, x2, y2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    return Math.atan2(dy, dx);
}

},{}],51:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = cerp;
function cerp(from, to) {
    var weight = arguments.length <= 2 || arguments[2] === undefined ? 0.3 : arguments[2];

    var f = (1 - Math.cos(weight * Math.PI)) / 2;
    return from * (1 - f) + to * f;
}

},{}],52:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = circleDistribution;
function circleDistribution(radius) {
    var origin = arguments.length <= 1 || arguments[1] === undefined ? { x: 0, y: 0 } : arguments[1];
    var p = arguments.length <= 2 || arguments[2] === undefined ? { x: 0, y: 0 } : arguments[2];

    var r = Math.sqrt(Math.random()) * radius;
    var theta = Math.random() * Math.PI * 2;
    p.x = origin.x + Math.cos(theta) * r;
    p.y = origin.y + Math.sin(theta) * r;
    return p;
}

},{}],53:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = clamp;
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

},{}],54:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = coinToss;
function coinToss() {
    var heads = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
    var tails = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

    return Math.random() > 0.5 ? heads : tails;
}

},{}],55:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = crossProduct2d;
/*
The sign tells us if a is to the left (-) or the right (+) of b
*/
function crossProduct2d(aX, aY, bX, bY) {
    return aX * bY - aY * bX;
}

},{}],56:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = degrees;
var DEG = 180 / Math.PI;

function degrees(radians) {
    return radians * DEG;
}

},{}],57:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = difference;
function difference(a, b) {
    return Math.abs(a - b);
}

},{}],58:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = distance;
function distance(x1, y1, x2, y2) {
    var dx = x1 - x2;
    var dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
}

},{}],59:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = distanceSQ;
function distanceSQ(x1, y1, x2, y2) {
    var dx = x1 - x2;
    var dy = y1 - y2;
    return dx * dx + dy * dy;
}

},{}],60:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = dotProduct2d;
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

},{}],61:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getCirclePoints;
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

},{}],62:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getIntersectionArea;
function getIntersectionArea(aX, aY, aW, aH, bX, bY, bW, bH) {
    var overlapX = Math.max(0, Math.min(aX + aW, bX + bW) - Math.max(aX, bX));
    var overlapY = Math.max(0, Math.min(aY + aH, bY + bH) - Math.max(aY, bY));
    return overlapX * overlapY;
}

},{}],63:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getOverlapX;
function getOverlapX(aX, aW, bX, bW) {
    return Math.max(0, Math.min(aX + aW, bX + bW) - Math.max(aX, bX));
}

},{}],64:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getOverlapY;
function getOverlapY(aY, aH, bY, bH) {
    return Math.max(0, Math.min(aY + aH, bY + bH) - Math.max(aY, bY));
}

},{}],65:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _angle = require('./angle');

var _angle2 = _interopRequireDefault(_angle);

var _cerp = require('./cerp');

var _cerp2 = _interopRequireDefault(_cerp);

var _circleDistribution = require('./circleDistribution');

var _circleDistribution2 = _interopRequireDefault(_circleDistribution);

var _clamp = require('./clamp');

var _clamp2 = _interopRequireDefault(_clamp);

var _coinToss = require('./coinToss');

var _coinToss2 = _interopRequireDefault(_coinToss);

var _crossProduct2d = require('./crossProduct2d');

var _crossProduct2d2 = _interopRequireDefault(_crossProduct2d);

var _degrees = require('./degrees');

var _degrees2 = _interopRequireDefault(_degrees);

var _difference = require('./difference');

var _difference2 = _interopRequireDefault(_difference);

var _distance = require('./distance');

var _distance2 = _interopRequireDefault(_distance);

var _distanceSq = require('./distanceSq');

var _distanceSq2 = _interopRequireDefault(_distanceSq);

var _dotProduct2d = require('./dotProduct2d');

var _dotProduct2d2 = _interopRequireDefault(_dotProduct2d);

var _getCirclePoints = require('./getCirclePoints');

var _getCirclePoints2 = _interopRequireDefault(_getCirclePoints);

var _getIntersectionArea = require('./getIntersectionArea');

var _getIntersectionArea2 = _interopRequireDefault(_getIntersectionArea);

var _getOverlapX = require('./getOverlapX');

var _getOverlapX2 = _interopRequireDefault(_getOverlapX);

var _getOverlapY = require('./getOverlapY');

var _getOverlapY2 = _interopRequireDefault(_getOverlapY);

var _lerp = require('./lerp');

var _lerp2 = _interopRequireDefault(_lerp);

var _map = require('./map');

var _map2 = _interopRequireDefault(_map);

var _normalize = require('./normalize');

var _normalize2 = _interopRequireDefault(_normalize);

var _orientation = require('./orientation');

var _orientation2 = _interopRequireDefault(_orientation);

var _percentRemaining = require('./percentRemaining');

var _percentRemaining2 = _interopRequireDefault(_percentRemaining);

var _radians = require('./radians');

var _radians2 = _interopRequireDefault(_radians);

var _random = require('./random');

var _random2 = _interopRequireDefault(_random);

var _randomInt = require('./randomInt');

var _randomInt2 = _interopRequireDefault(_randomInt);

var _randomSign = require('./randomSign');

var _randomSign2 = _interopRequireDefault(_randomSign);

var _rotatePoint = require('./rotatePoint');

var _rotatePoint2 = _interopRequireDefault(_rotatePoint);

var _rotateToDeg = require('./rotateToDeg');

var _rotateToDeg2 = _interopRequireDefault(_rotateToDeg);

var _rotateToRad = require('./rotateToRad');

var _rotateToRad2 = _interopRequireDefault(_rotateToRad);

var _roundTo = require('./roundTo');

var _roundTo2 = _interopRequireDefault(_roundTo);

var _roundToNearest = require('./roundToNearest');

var _roundToNearest2 = _interopRequireDefault(_roundToNearest);

var _size = require('./size');

var _size2 = _interopRequireDefault(_size);

var _smerp = require('./smerp');

var _smerp2 = _interopRequireDefault(_smerp);

var _smoothstep = require('./smoothstep');

var _smoothstep2 = _interopRequireDefault(_smoothstep);

var _splitValueAndUnit = require('./splitValueAndUnit');

var _splitValueAndUnit2 = _interopRequireDefault(_splitValueAndUnit);

var _weightedAverage = require('./weightedAverage');

var _weightedAverage2 = _interopRequireDefault(_weightedAverage);

var _weightedDistribution = require('./weightedDistribution');

var _weightedDistribution2 = _interopRequireDefault(_weightedDistribution);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    angle: _angle2.default,
    cerp: _cerp2.default,
    circleDistribution: _circleDistribution2.default,
    clamp: _clamp2.default,
    coinToss: _coinToss2.default,
    crossProduct2d: _crossProduct2d2.default,
    degrees: _degrees2.default,
    difference: _difference2.default,
    distance: _distance2.default,
    distanceSq: _distanceSq2.default,
    dotProduct2d: _dotProduct2d2.default,
    getCirclePoints: _getCirclePoints2.default,
    getIntersectionArea: _getIntersectionArea2.default,
    getOverlapX: _getOverlapX2.default,
    getOverlapY: _getOverlapY2.default,
    lerp: _lerp2.default,
    map: _map2.default,
    normalize: _normalize2.default,
    orientation: _orientation2.default,
    percentRemaining: _percentRemaining2.default,
    radians: _radians2.default,
    random: _random2.default,
    randomInt: _randomInt2.default,
    randomSign: _randomSign2.default,
    rotatePoint: _rotatePoint2.default,
    rotateToDeg: _rotateToDeg2.default,
    rotateToRad: _rotateToRad2.default,
    roundTo: _roundTo2.default,
    roundToNearest: _roundToNearest2.default,
    smerp: _smerp2.default,
    smoothstep: _smoothstep2.default,
    size: _size2.default,
    splitValueAndUnit: _splitValueAndUnit2.default,
    weightedAverage: _weightedAverage2.default,
    weightedDistribution: _weightedDistribution2.default
};

},{"./angle":50,"./cerp":51,"./circleDistribution":52,"./clamp":53,"./coinToss":54,"./crossProduct2d":55,"./degrees":56,"./difference":57,"./distance":58,"./distanceSq":59,"./dotProduct2d":60,"./getCirclePoints":61,"./getIntersectionArea":62,"./getOverlapX":63,"./getOverlapY":64,"./lerp":66,"./map":67,"./normalize":68,"./orientation":69,"./percentRemaining":70,"./radians":71,"./random":72,"./randomInt":73,"./randomSign":74,"./rotatePoint":75,"./rotateToDeg":76,"./rotateToRad":77,"./roundTo":78,"./roundToNearest":79,"./size":80,"./smerp":81,"./smoothstep":82,"./splitValueAndUnit":83,"./weightedAverage":84,"./weightedDistribution":85}],66:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = lerp;
function lerp(from, to) {
    var weight = arguments.length <= 2 || arguments[2] === undefined ? 0.3 : arguments[2];

    return from + (to - from) * weight;
}

},{}],67:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = map;
function map(v, a, b, x, y) {
    // value, min expected, max expected, map min, map max
    // e.g. map some value between 0 to 100 to -50 to 50
    // map(50, 0, 100, -50, 50) // 0
    // map(25, 0, 100, -50, 50) // -25
    return v === a ? x : (v - a) * (y - x) / (b - a) + x;
}

},{}],68:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = normalize;
function normalize(value, min, max) {
    return (value - min) / (max - min);
}

},{}],69:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = orientation;
function orientation(x, y) {
    return Math.atan2(y, x);
}

},{}],70:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = percentRemaining;
function percentRemaining(value, total) {
    return value % total / total;
}

},{}],71:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = radians;
var RAD = Math.PI / 180;

function radians(degrees) {
    return degrees * RAD;
}

},{}],72:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = random;
function random(min, max) {
    if (isNaN(max)) {
        max = min;
        min = 0;
    }
    return min + Math.random() * (max - min);
}

},{}],73:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = randomInt;
function randomInt(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
}

},{}],74:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = randomSign;
function randomSign() {
    return Math.random() > 0.5 ? -1 : 1;
}

},{}],75:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = rotatePoint;
function rotatePoint(p, theta) {
    var origin = arguments.length <= 2 || arguments[2] === undefined ? { x: 0, y: 0 } : arguments[2];
    var p1 = arguments.length <= 3 || arguments[3] === undefined ? { x: 0, y: 0 } : arguments[3];

    var sinTheta = Math.sin(theta);
    var cosTheta = Math.cos(theta);
    p1.x = (p.x - origin.x) * cosTheta - (p.y - origin.y) * sinTheta;
    p1.y = (p.x - origin.x) * sinTheta + (p.y - origin.y) * cosTheta;
    p1.x += origin.x;
    p1.y += origin.y;
    return p1;
}

},{}],76:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = rotateToDeg;
function rotateToDeg(start, end) {
    var diff = (end - start) % 360;
    if (diff !== diff % 180) {
        diff = diff < 0 ? diff + 360 : diff - 360;
    }
    return start + diff;
}

},{}],77:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = rotateToRAD;
var PI2 = Math.PI * 2;

function rotateToRAD(start, end) {
    var diff = (end - start) % PI2;
    if (diff !== diff % Math.PI) {
        diff = diff < 0 ? diff + PI2 : diff - PI2;
    }
    return start + diff;
}

},{}],78:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = roundTo;
function roundTo(x) {
    var places = arguments.length <= 1 || arguments[1] === undefined ? 2 : arguments[1];

    var div = Math.pow(10, places);
    return Math.round(x * div) / div;
}

},{}],79:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = roundToNearest;
function roundToNearest(value, unit) {
    return Math.round(value / unit) * unit;
}

},{}],80:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = size;
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
    var method = arguments.length <= 3 || arguments[3] === undefined ? 'cover' : arguments[3];
    var autoCenter = arguments.length <= 4 || arguments[4] === undefined ? true : arguments[4];

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

},{}],81:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = smerp;

var _smoothstep = require('./smoothstep');

var _smoothstep2 = _interopRequireDefault(_smoothstep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function smerp(from, to, startTime, endTime, time) {
    return from + (to - from) * (0, _smoothstep2.default)(startTime, endTime, time);
}

},{"./smoothstep":82}],82:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = smoothstep;

var _clamp = require('./clamp');

var _clamp2 = _interopRequireDefault(_clamp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function smoothstep(min, max, value) {
    var x = (0, _clamp2.default)((value - min) / (max - min), 0, 1);
    return x * x * (3 - 2 * x);
}

},{"./clamp":53}],83:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = splitValueAndUnit;
function splitValueAndUnit(prop) {
    var re = /(^-?\d*\.?\d*)(.*)/;
    var match = prop.match(re);
    var value = Number(match[1]);
    var unit = match[2];
    return { value: value, unit: unit };
}

},{}],84:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = weightedAverage;
function weightedAverage(from, to) {
    var weight = arguments.length <= 2 || arguments[2] === undefined ? 10 : arguments[2];

    return (from * (weight - 1) + to) / weight;
}

},{}],85:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = weightedDistribution;

var _random = require('./random');

var _random2 = _interopRequireDefault(_random);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function weightedDistribution(min, max) {
    var weight = arguments.length <= 2 || arguments[2] === undefined ? 5 : arguments[2];

    var total = 0;
    for (var i = 0; i < weight; i++) {
        total += (0, _random2.default)(min, max);
    }
    return total / weight;
}

},{"./random":72}],86:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = cuepointsReader;
function cuepointsReader() {
    var list = [];
    var reader = void 0;
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

},{}],87:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = iOSPlayVideoInline;
function iOSPlayVideoInline(el) {
    var loop = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    var frameTime = 1 / 25;

    var self = void 0,
        lastTime = 0,
        playing = false;

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

},{}],88:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _cuepointsReader = require('./cuepointsReader');

var _cuepointsReader2 = _interopRequireDefault(_cuepointsReader);

var _iOSPlayVideoInline = require('./iOSPlayVideoInline');

var _iOSPlayVideoInline2 = _interopRequireDefault(_iOSPlayVideoInline);

var _videoPlayer = require('./videoPlayer');

var _videoPlayer2 = _interopRequireDefault(_videoPlayer);

var _vimeo = require('./vimeo');

var _vimeo2 = _interopRequireDefault(_vimeo);

var _youtube = require('./youtube');

var _youtube2 = _interopRequireDefault(_youtube);

var _youtubeBasic = require('./youtubeBasic');

var _youtubeBasic2 = _interopRequireDefault(_youtubeBasic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    cuepointsReader: _cuepointsReader2.default,
    iOSPlayVideoInline: _iOSPlayVideoInline2.default,
    videoPlayer: _videoPlayer2.default,
    vimeo: _vimeo2.default,
    youtube: _youtube2.default,
    youtubeBasic: _youtubeBasic2.default
};

},{"./cuepointsReader":86,"./iOSPlayVideoInline":87,"./videoPlayer":89,"./vimeo":90,"./youtube":91,"./youtubeBasic":92}],89:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = videoPlayer;

var _emitter = require('../events/emitter');

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function videoPlayer(videoEl) {
    var el = videoEl || document.createElement('video');
    var player = void 0;

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

    player = Object.create(_emitter2.default.prototype, {
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

},{"../events/emitter":25}],90:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = vimeo;

var _emitter = require('../events/emitter');

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://developer.vimeo.com/player/js-api

function vimeo(el) {
    var vimeoPlayer = el.contentWindow;
    var re = /^https?:\/\/player.vimeo.com/;
    var player = void 0,
        origin = '*',
        _paused = false;

    function sendCommand(method) {
        var value = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

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

    player = Object.assign(Object.create(_emitter2.default.prototype), {
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

},{"../events/emitter":25}],91:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = youtube;

var _events = require('events');

function youtube(el) {
    var emitter = null,
        player = null,
        _paused = false;

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

    emitter = Object.assign(Object.create(_events.EventEmitter.prototype), {
        _events: {},
        play: play,
        pause: pause,
        paused: function paused() {
            return _paused;
        },
        destroy: destroy
    });

    return emitter;
} // https://developers.google.com/youtube/iframe_api_reference#Events

},{"events":93}],92:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = youtubeBasic;
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

},{}],93:[function(require,module,exports){
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

},{}],94:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = objectPool;
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

},{}],95:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = androidNative;

var _android = require('../os/android');

var _android2 = _interopRequireDefault(_android);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//http://stackoverflow.com/questions/14403766/how-to-detect-the-stock-android-browser
function androidNative() {
    var ua = arguments.length <= 0 || arguments[0] === undefined ? navigator.userAgent : arguments[0];

    if (!(0, _android2.default)(ua)) {
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

},{"../os/android":100}],96:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = ieVersion;
function ieVersion() {
    var ua = arguments.length <= 0 || arguments[0] === undefined ? navigator.userAgent : arguments[0];

    var v = 0;
    if (/MSIE (\d+\.\d+);/.test(ua)) {
        v = parseInt(RegExp.$1, 10);
    } else if (/Trident\/(\d+\.\d+)(.*)rv:(\d+\.\d+)/.test(ua)) {
        v = parseInt(RegExp.$3, 10);
    }
    return v;
}

},{}],97:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _os = require('../os');

var _os2 = _interopRequireDefault(_os);

var _ieVersion = require('./ieVersion');

var _ieVersion2 = _interopRequireDefault(_ieVersion);

var _androidNative = require('./androidNative');

var _androidNative2 = _interopRequireDefault(_androidNative);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ua = navigator.userAgent;
var chromeiOS = function chromeiOS() {
    return _os2.default.ios() && /CriOS/.test(ua);
};
var firefox = function firefox() {
    return (/Firefox/.test(ua)
    );
};
var ie = function ie() {
    return (0, _ieVersion2.default)() > 0;
};
var safari = function safari() {
    return !/Android/.test(ua) && !/Chrome/.test(ua) && /Safari/.test(ua);
};
var safariMobile = function safariMobile() {
    return _os2.default.ios() && /AppleWebKit/.test(ua);
};

exports.default = {
    androidNative: _androidNative2.default,
    chromeiOS: chromeiOS,
    firefox: firefox,
    ie: ie,
    ieVersion: _ieVersion2.default,
    safari: safari,
    safariMobile: safariMobile
};

},{"../os":102,"./androidNative":95,"./ieVersion":96}],98:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var ua = navigator.userAgent;

var ipad = function ipad() {
    return (/iPad/i.test(ua)
    );
};
var ipod = function ipod() {
    return (/iPod/i.test(ua)
    );
};
var iphone = function iphone() {
    return (/iPhone/i.test(ua)
    );
};
var mobile = function mobile() {
    return !!ua.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|SymbianOS/i);
};
var desktop = function desktop() {
    return !mobile();
};

exports.default = {
    desktop: desktop,
    ipad: ipad,
    iphone: iphone,
    ipod: ipod,
    mobile: mobile
};

},{}],99:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _browser = require('./browser');

var _browser2 = _interopRequireDefault(_browser);

var _device = require('./device');

var _device2 = _interopRequireDefault(_device);

var _os = require('./os');

var _os2 = _interopRequireDefault(_os);

var _supports = require('./supports');

var _supports2 = _interopRequireDefault(_supports);

var _screen = require('./screen');

var _screen2 = _interopRequireDefault(_screen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var local = /^(?:https?:\/\/)?(?:localhost|192\.168)/.test(window.location.href);

exports.default = {
    browser: _browser2.default,
    device: _device2.default,
    os: _os2.default,
    supports: _supports2.default,
    screen: _screen2.default,
    local: local
};

},{"./browser":97,"./device":98,"./os":102,"./screen":109,"./supports":111}],100:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var ua = arguments.length <= 0 || arguments[0] === undefined ? navigator.userAgent : arguments[0];

    return (/Android/i.test(ua)
    );
};

},{}],101:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = androidVersion;

var _android = require('./android');

var _android2 = _interopRequireDefault(_android);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function androidVersion() {
    var ua = arguments.length <= 0 || arguments[0] === undefined ? navigator.userAgent : arguments[0];

    if (!(0, _android2.default)(ua)) {
        return 0;
    }
    var version = ua.match(/Android (\d+(?:\.\d+)+);/)[1];

    var _version$split = version.split('.');

    var _version$split2 = _slicedToArray(_version$split, 2);

    var a = _version$split2[0];
    var b = _version$split2[1];

    return parseFloat(a + '.' + b);
}

},{"./android":100}],102:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _android = require('./android');

var _android2 = _interopRequireDefault(_android);

var _androidVersion = require('./androidVersion');

var _androidVersion2 = _interopRequireDefault(_androidVersion);

var _ios = require('./ios');

var _ios2 = _interopRequireDefault(_ios);

var _iosVersion = require('./iosVersion');

var _iosVersion2 = _interopRequireDefault(_iosVersion);

var _linux = require('./linux');

var _linux2 = _interopRequireDefault(_linux);

var _mac = require('./mac');

var _mac2 = _interopRequireDefault(_mac);

var _windows = require('./windows');

var _windows2 = _interopRequireDefault(_windows);

var _windowsPhone = require('./windowsPhone');

var _windowsPhone2 = _interopRequireDefault(_windowsPhone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    android: _android2.default,
    androidVersion: _androidVersion2.default,
    ios: _ios2.default,
    iosVersion: _iosVersion2.default,
    linux: _linux2.default,
    mac: _mac2.default,
    windows: _windows2.default,
    windowsPhone: _windowsPhone2.default
};

},{"./android":100,"./androidVersion":101,"./ios":103,"./iosVersion":104,"./linux":105,"./mac":106,"./windows":107,"./windowsPhone":108}],103:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = ios;
function ios() {
    var ua = arguments.length <= 0 || arguments[0] === undefined ? navigator.userAgent : arguments[0];

    return (/iP[ao]d|iPhone/i.test(ua)
    );
}

},{}],104:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = iosVersion;

var _ios = require('./ios');

var _ios2 = _interopRequireDefault(_ios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function iosVersion() {
    var ua = arguments.length <= 0 || arguments[0] === undefined ? navigator.userAgent : arguments[0];

    if ((0, _ios2.default)(ua)) {
        var _ua$match = ua.match(/OS (\d+)_(\d+)/i);

        var _ua$match2 = _slicedToArray(_ua$match, 3);

        var b = _ua$match2[1];
        var c = _ua$match2[2];

        if (b && c) {
            return parseFloat(b + '.' + c);
        }
    }
    return 0;
}

},{"./ios":103}],105:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = linux;

var _android = require('./android');

var _android2 = _interopRequireDefault(_android);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function linux() {
    var ua = arguments.length <= 0 || arguments[0] === undefined ? navigator.userAgent : arguments[0];

    return !(0, _android2.default)(ua) && /Linux/.test(ua);
}

},{"./android":100}],106:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = mac;

var _ios = require('./ios');

var _ios2 = _interopRequireDefault(_ios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mac() {
    var ua = arguments.length <= 0 || arguments[0] === undefined ? navigator.userAgent : arguments[0];

    return !(0, _ios2.default)(ua) && /Mac OS/.test(ua);
}

},{"./ios":103}],107:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = windows;

var _windowsPhone = require('./windowsPhone');

var _windowsPhone2 = _interopRequireDefault(_windowsPhone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function windows() {
    var ua = arguments.length <= 0 || arguments[0] === undefined ? navigator.userAgent : arguments[0];

    return !(0, _windowsPhone2.default)(ua) && /Windows/.test(ua);
}

},{"./windowsPhone":108}],108:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = windowsPhone;
function windowsPhone() {
    var ua = arguments.length <= 0 || arguments[0] === undefined ? navigator.userAgent : arguments[0];

    return (/Windows Phone/i.test(ua)
    );
}

},{}],109:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
// screen.width / screen.height is often wrong in Android
var height = function height() {
    return Math.max(window.outerHeight, window.screen.height);
};
var width = function width() {
    return Math.max(window.outerWidth, window.screen.width);
};
var dpr = function dpr() {
    return window.devicePixelRatio || 1;
};
var retina = function retina() {
    return dpr() > 1;
};

exports.default = {
    width: width,
    height: height,
    dpr: dpr,
    retina: retina
};

},{}],110:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return !!window.DeviceOrientationEvent;
};

},{}],111:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _webgl = require('./webgl');

var _webgl2 = _interopRequireDefault(_webgl);

var _webm = require('./webm');

var _webm2 = _interopRequireDefault(_webm);

var _mp = require('./mp4');

var _mp2 = _interopRequireDefault(_mp);

var _deviceOrientation = require('./deviceOrientation');

var _deviceOrientation2 = _interopRequireDefault(_deviceOrientation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    webgl: _webgl2.default,
    webm: _webm2.default,
    mp4: _mp2.default,
    deviceOrientation: _deviceOrientation2.default
};

},{"./deviceOrientation":110,"./mp4":112,"./webgl":113,"./webm":114}],112:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var videoEl = document.createElement('video');

exports.default = function () {
  return !!(videoEl.canPlayType && videoEl.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"'));
};

},{}],113:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = webgl;
function webgl() {
    try {
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        return !!(window.WebGLRenderingContext && context);
    } catch (e) {
        return false;
    }
}

},{}],114:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var videoEl = document.createElement('video');

exports.default = function () {
  return !!(videoEl.canPlayType && videoEl.canPlayType('video/webm; codecs="vp8, vorbis"'));
};

},{}],115:[function(require,module,exports){
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

},{}],116:[function(require,module,exports){
'use strict';

(function (fn) {
    window.console = window.console || {};
    var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'memory', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'timeline', 'timelineEnd', 'trace', 'warn'];
    methods.forEach(function (name) {
        window.console[name] = window.console[name] || fn;
    });
})(function () {});

},{}],117:[function(require,module,exports){
'use strict';

require('./classList');

require('./console');

require('./requestAnimationFrame');

},{"./classList":115,"./console":116,"./requestAnimationFrame":118}],118:[function(require,module,exports){
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

},{}],119:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = popup;
function popup(url) {
    var width = arguments.length <= 1 || arguments[1] === undefined ? 800 : arguments[1];
    var height = arguments.length <= 2 || arguments[2] === undefined ? 600 : arguments[2];
    var name = arguments.length <= 3 || arguments[3] === undefined ? '' : arguments[3];

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

},{}],120:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = email;

var _popup = require('../popup');

var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function email(url) {
    var subject = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
    var body = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

    url = encodeURIComponent(url);
    subject = encodeURIComponent(subject);

    var newlines = encodeURIComponent('\r\n\r\n');
    body = body ? '' + encodeURIComponent(body) + newlines : '';

    return (0, _popup2.default)('mailto:?subject=' + subject + '&body=' + body + url);
}

},{"../popup":119}],121:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = facebook;

var _popup = require('../popup');

var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function facebook(url) {
    url = encodeURIComponent(url);
    return (0, _popup2.default)('https://www.facebook.com/sharer/sharer.php?u=' + url);
}

},{"../popup":119}],122:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = facebookFeedDialog;

var _popup = require('../popup');

var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function facebookFeedDialog(appId, redirect, url) {
    var title = arguments.length <= 3 || arguments[3] === undefined ? '' : arguments[3];
    var image = arguments.length <= 4 || arguments[4] === undefined ? '' : arguments[4];
    var caption = arguments.length <= 5 || arguments[5] === undefined ? '' : arguments[5];
    var desc = arguments.length <= 6 || arguments[6] === undefined ? '' : arguments[6];
    var source = arguments.length <= 7 || arguments[7] === undefined ? '' : arguments[7];

    title = encodeURIComponent(title);
    caption = encodeURIComponent(caption);
    desc = encodeURIComponent(desc);

    var params = '?display=popup&show_error=true&app_id=' + appId + '&source=' + source + '&redirect_uri=' + redirect;
    var content = 'name=' + title + '&link=' + url + '&caption=' + caption + '&description=' + desc + '&picture=' + image;

    return (0, _popup2.default)('https://www.facebook.com/dialog/feed?' + params + '&' + content);
}

},{"../popup":119}],123:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = googleplus;

var _popup = require('../popup');

var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function googleplus(url) {
    url = encodeURIComponent(url);
    return (0, _popup2.default)('https://plus.google.com/share?url=' + url);
}

},{"../popup":119}],124:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _email = require('./email');

var _email2 = _interopRequireDefault(_email);

var _facebook = require('./facebook');

var _facebook2 = _interopRequireDefault(_facebook);

var _facebookFeedDialog = require('./facebookFeedDialog');

var _facebookFeedDialog2 = _interopRequireDefault(_facebookFeedDialog);

var _googleplus = require('./googleplus');

var _googleplus2 = _interopRequireDefault(_googleplus);

var _linkedin = require('./linkedin');

var _linkedin2 = _interopRequireDefault(_linkedin);

var _pinterest = require('./pinterest');

var _pinterest2 = _interopRequireDefault(_pinterest);

var _reddit = require('./reddit');

var _reddit2 = _interopRequireDefault(_reddit);

var _renren = require('./renren');

var _renren2 = _interopRequireDefault(_renren);

var _sms = require('./sms');

var _sms2 = _interopRequireDefault(_sms);

var _twitter = require('./twitter');

var _twitter2 = _interopRequireDefault(_twitter);

var _vkontakte = require('./vkontakte');

var _vkontakte2 = _interopRequireDefault(_vkontakte);

var _weibo = require('./weibo');

var _weibo2 = _interopRequireDefault(_weibo);

var _whatsapp = require('./whatsapp');

var _whatsapp2 = _interopRequireDefault(_whatsapp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    email: _email2.default,
    facebook: _facebook2.default,
    facebookFeedDialog: _facebookFeedDialog2.default,
    googleplus: _googleplus2.default,
    linkedin: _linkedin2.default,
    pinterest: _pinterest2.default,
    reddit: _reddit2.default,
    renren: _renren2.default,
    sms: _sms2.default,
    twitter: _twitter2.default,
    vkontakte: _vkontakte2.default,
    weibo: _weibo2.default,
    whatsapp: _whatsapp2.default
};

},{"./email":120,"./facebook":121,"./facebookFeedDialog":122,"./googleplus":123,"./linkedin":125,"./pinterest":126,"./reddit":127,"./renren":128,"./sms":129,"./twitter":130,"./vkontakte":131,"./weibo":132,"./whatsapp":133}],125:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = linkedin;

var _popup = require('../popup');

var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function linkedin(url) {
    var title = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

    url = encodeURIComponent(url);
    title = encodeURIComponent(title);
    return (0, _popup2.default)('https://www.linkedin.com/shareArticle?mini=true&url=' + url + '&title=' + title);
}

},{"../popup":119}],126:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = pinterest;

var _popup = require('../popup');

var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function pinterest(url, media) {
    var desc = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

    url = encodeURIComponent(url);
    media = encodeURIComponent(media);
    desc = encodeURIComponent(desc);
    return (0, _popup2.default)('https://pinterest.com/pin/create/button/?url=' + url + '&media=' + media + '&description=' + desc);
}

},{"../popup":119}],127:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = reddit;

var _popup = require('../popup');

var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function reddit(url) {
    var title = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

    url = encodeURIComponent(url);
    title = encodeURIComponent(title);
    return (0, _popup2.default)('https://www.reddit.com/submit?url=' + url + '&title=' + title);
}

},{"../popup":119}],128:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = vkontakte;

var _popup = require('../popup');

var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function vkontakte(url) {
    var title = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

    url = encodeURIComponent(url);
    title = encodeURIComponent(title);
    return (0, _popup2.default)('http://share.renren.com/share/buttonshare.do?link=' + url + '&title=' + title);
}

},{"../popup":119}],129:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = sms;
function sms(url) {
    var body = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

    url = encodeURIComponent(url);

    var newlines = encodeURIComponent('\r\n\r\n');
    body = body ? '' + encodeURIComponent(body) + newlines : '';

    var ios = /iP[ao]d|iPhone/i.test(navigator.userAgent);
    var delim = ios ? '&' : '?';

    window.location.href = 'sms:' + delim + 'body=' + body + url;
}

},{}],130:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = twitter;

var _popup = require('../popup');

var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function twitter(url) {
    var text = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
    var hashtags = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];
    var related = arguments.length <= 3 || arguments[3] === undefined ? '' : arguments[3];

    url = encodeURIComponent(url);
    text = encodeURIComponent(text);
    hashtags = encodeURIComponent(hashtags);
    related = encodeURIComponent(related);

    return (0, _popup2.default)('https://twitter.com/intent/tweet?url=' + url + '&text=' + text + '&hashtags=' + hashtags + '&related=' + related);
}

},{"../popup":119}],131:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = vkontakte;

var _popup = require('../popup');

var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function vkontakte(url) {
    var title = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
    var description = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];
    var image = arguments.length <= 3 || arguments[3] === undefined ? '' : arguments[3];

    url = encodeURIComponent(url);
    title = encodeURIComponent(title);
    description = encodeURIComponent(description);
    image = encodeURIComponent(image);
    return (0, _popup2.default)('http://vkontakte.ru/share.php?url=' + url + '&title=' + title + '&description=' + description + '&image=' + image);
}

},{"../popup":119}],132:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = weibo;

var _popup = require('../popup');

var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function weibo(url) {
    var title = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
    var image = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

    url = encodeURIComponent(url);
    title = encodeURIComponent(title);
    image = encodeURIComponent(image);

    var params = 'url=' + url + '&appkey=&title=' + title + '&pic=' + image + '&ralateUid=&language=zh_cn';
    return (0, _popup2.default)('http://service.weibo.com/share/share.php?' + params);
}

},{"../popup":119}],133:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = whatsapp;
function whatsapp(url) {
    var body = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

    url = encodeURIComponent(url);

    var newlines = encodeURIComponent('\r\n\r\n');
    body = body ? '' + encodeURIComponent(body) + newlines : '';

    window.location.href = 'whatsapp://send?text=' + body + url;
}

},{}],134:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
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

exports.default = { load: load, save: save, loadJSON: loadJSON, saveJSON: saveJSON, remove: remove };

},{}],135:[function(require,module,exports){
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

},{}],136:[function(require,module,exports){
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

},{}],137:[function(require,module,exports){
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

},{}],138:[function(require,module,exports){
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

},{}],139:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = beginsWith;
// whether str begins with substr
function beginsWith(str, substr) {
    return str.indexOf(substr) === 0;
}

},{}],140:[function(require,module,exports){
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

},{}],141:[function(require,module,exports){
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

},{"./escapePattern":147,"./truncate":164}],142:[function(require,module,exports){
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

},{}],143:[function(require,module,exports){
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

},{"./escapePattern":147}],144:[function(require,module,exports){
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

},{}],145:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = endsWith;
// whether str ends with substr
function endsWith(str, substr) {
    return str.lastIndexOf(substr) === str.length - substr.length;
}

},{}],146:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = escapeHtml;
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

},{}],147:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = escapePattern;
// regex escape pattern
function escapePattern(pattern) {
    return pattern.replace(/(\]|\[|\{|\}|\(|\)|\*|\+|\?|\.|\\)/g, '\\$1');
}

},{}],148:[function(require,module,exports){
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

},{"./removeExtraWhitespace":156}],149:[function(require,module,exports){
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

var _escapeHTML = require('./escapeHTML');

var _escapeHTML2 = _interopRequireDefault(_escapeHTML);

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

var _preventWidow = require('./preventWidow');

var _preventWidow2 = _interopRequireDefault(_preventWidow);

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

var _toNumber = require('./toNumber');

var _toNumber2 = _interopRequireDefault(_toNumber);

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
    escapeHTML: _escapeHTML2.default,
    escapePattern: _escapePattern2.default,
    hasText: _hasText2.default,
    isNumeric: _isNumeric2.default,
    padLeft: _padLeft2.default,
    padRight: _padRight2.default,
    preventWidow: _preventWidow2.default,
    properCase: _properCase2.default,
    remove: _remove2.default,
    removeExtraWhitespace: _removeExtraWhitespace2.default,
    reverse: _reverse2.default,
    reverseWords: _reverseWords2.default,
    similarity: _similarity2.default,
    stripTags: _stripTags2.default,
    swapCase: _swapCase2.default,
    timeCode: _timeCode2.default,
    toNumber: _toNumber2.default,
    truncate: _truncate2.default,
    wordCount: _wordCount2.default
};

},{"./afterFirst":135,"./afterLast":136,"./beforeFirst":137,"./beforeLast":138,"./beginsWith":139,"./between":140,"./block":141,"./capitalize":142,"./countOf":143,"./editDistance":144,"./endsWith":145,"./escapeHTML":146,"./escapePattern":147,"./hasText":148,"./isNumeric":150,"./padLeft":151,"./padRight":152,"./preventWidow":153,"./properCase":154,"./remove":155,"./removeExtraWhitespace":156,"./reverse":157,"./reverseWords":158,"./similarity":159,"./stripTags":160,"./swapCase":161,"./timeCode":162,"./toNumber":163,"./truncate":164,"./wordCount":165}],150:[function(require,module,exports){
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

},{}],151:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = padLeft;
// pad str with substr from the left
function padLeft(str, substr, length) {
    str = String(str);
    while (str.length < length) {
        str = substr + str;
    }
    return str;
}

},{}],152:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = padRight;
// pads str with substr from the right
function padRight(str, substr, length) {
    str = String(str);
    while (str.length < length) {
        str += substr;
    }
    return str;
}

},{}],153:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = preventWidow;
function preventWidow(str) {
    str = str.trim();

    var lastSpace = str.lastIndexOf(' ');
    if (lastSpace > 0) {
        return str.slice(0, lastSpace) + '&nbsp;' + str.slice(lastSpace + 1);
    }

    return str;
}

},{}],154:[function(require,module,exports){
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

},{"./capitalize":142}],155:[function(require,module,exports){
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

},{"./escapePattern":147}],156:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = removeExtraWhitespace;
// remove extra whitespace (extra spaces, tabs, line breaks, etc)
function removeExtraWhitespace(str) {
    return str.trim().replace(/\s+/g, ' ');
}

},{}],157:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = reverse;
// reverse character order
function reverse(str) {
    return str.split('').reverse().join('');
}

},{}],158:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = reverseWords;
// reverse word order
function reverseWords(str) {
    return str.split(' ').reverse().join(' ');
}

},{}],159:[function(require,module,exports){
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

},{"./editDistance":144}],160:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = stripTags;
// remove all HTML tags from str
function stripTags(str) {
    return str.replace(/<\/?[^>]+>/igm, '');
}

},{}],161:[function(require,module,exports){
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

},{}],162:[function(require,module,exports){
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

},{}],163:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = toNumber;
function toNumber(str) {
    return Number(str.replace(/[^0-9.]/g, ''));
}

},{}],164:[function(require,module,exports){
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

},{}],165:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = wordCount;
// the number of words in a string
function wordCount(str) {
    return str.match(/\b\w+\b/g).length;
}

},{}],166:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = event;
function event(category, action, label, value) {
    if (!window.ga) {
        return;
    }
    window.ga('send', 'event', category, action, label, value);
}

},{}],167:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _event = require('./event');

var _event2 = _interopRequireDefault(_event);

var _pageview = require('./pageview');

var _pageview2 = _interopRequireDefault(_pageview);

var _load = require('./load');

var _load2 = _interopRequireDefault(_load);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    event: _event2.default,
    pageview: _pageview2.default,
    load: _load2.default
};

},{"./event":166,"./load":168,"./pageview":169}],168:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = load;
function load(gaAccount) {
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

},{}],169:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = pageview;
function pageview(path) {
    if (!window.ga) {
        return;
    }
    window.ga('send', 'pageview', path);
}

},{}],170:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var hidden = void 0,
    change = void 0;

if (typeof document.hidden !== 'undefined') {
    hidden = 'hidden';
    change = 'visibilitychange';
} else if (typeof document.mozHidden !== 'undefined') {
    hidden = 'mozHidden';
    change = 'mozvisibilitychange';
} else if (typeof document.msHidden !== 'undefined') {
    hidden = 'msHidden';
    change = 'msvisibilitychange';
} else if (typeof document.webkitHidden !== 'undefined') {
    hidden = 'webkitHidden';
    change = 'webkitvisibilitychange';
}

exports.default = {
    hidden: hidden,
    change: change
};

},{}],171:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _emitter = require('../events/emitter');

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var visibility = Object.create(_emitter2.default.prototype, {
    hidden: {
        get: function get() {
            return document[_api2.default.hidden];
        }
    }
});

function onVisibilityChange() {
    if (document[_api2.default.hidden]) {
        visibility.emit('hidden');
    } else {
        visibility.emit('shown');
    }
}

if (_api2.default.change) {
    document.addEventListener(_api2.default.change, onVisibilityChange, false);
}

exports.default = visibility;

},{"../events/emitter":25,"./api":170}]},{},[39])(39)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcnJheS9hcnJheS5qcyIsImFycmF5L2Nsb25lLmpzIiwiYXJyYXkvaW5kZXguanMiLCJhcnJheS9uZWFyZXN0LmpzIiwiYXJyYXkvcmFuZG9tQ2hvaWNlLmpzIiwiYXJyYXkvc29ydEFscGhhLmpzIiwiYXJyYXkvc29ydE51bWVyaWMuanMiLCJhcnJheS9zb3J0UmFuZG9tLmpzIiwiZG9tL2Jsb2NrU2Nyb2xsaW5nLmpzIiwiZG9tL2ZvcmNlUmVkcmF3LmpzIiwiZG9tL2dldFBhZ2VIZWlnaHQuanMiLCJkb20vZ2V0U2Nyb2xsUGVyY2VudGFnZS5qcyIsImRvbS9nZXRTY3JvbGxSZW1haW5pbmcuanMiLCJkb20vZ2V0U2Nyb2xsVG9wLmpzIiwiZG9tL2dldFNyY3NldEltYWdlLmpzIiwiZG9tL2luZGV4LmpzIiwiZG9tL2lzRWxlbWVudEluVmlld3BvcnQuanMiLCJkb20vaXNQYWdlRW5kLmpzIiwiZG9tL3Jlc2l6ZS5qcyIsImRvbS9zY3JvbGwuanMiLCJkb20vc2V0U3R5bGUuanMiLCJkb20vdHJhbnNpdGlvbkVuZC5qcyIsImV2ZW50cy9kZWJvdW5jZS5qcyIsImV2ZW50cy9kZWxlZ2F0ZUV2ZW50cy5qcyIsImV2ZW50cy9lbWl0dGVyLmpzIiwiZXZlbnRzL2V2ZW50QnVzLmpzIiwiZXZlbnRzL2hlYXJ0YmVhdC5qcyIsImV2ZW50cy9pbmRleC5qcyIsImZwcy9pbmRleC5qcyIsImZ1bGxzY3JlZW4vYXBpLmpzIiwiZnVsbHNjcmVlbi9pbmRleC5qcyIsImdyYXBoaWNzL2luZGV4LmpzIiwiaHR0cC9nZXRMb2NhdGlvbi5qcyIsImh0dHAvaW5kZXguanMiLCJodHRwL2pzb25wLmpzIiwiaHR0cC9sb2FkU2NyaXB0LmpzIiwiaHR0cC91cmxQYXJhbXMuanMiLCJodHRwL3hoci5qcyIsImluZGV4LmpzIiwiaW5wdXQvY2xpY2tPdXRzaWRlLmpzIiwiaW5wdXQvaW5kZXguanMiLCJpbnB1dC9rZXlJbnB1dC5qcyIsImlucHV0L2tleWJvYXJkLmpzIiwiaW5wdXQvbWljcm9waG9uZS5qcyIsImlucHV0L21vdXNlTGVmdFdpbmRvdy5qcyIsImlucHV0L21vdXNlV2hlZWwuanMiLCJpbnB1dC9wb2ludGVyQ29vcmRzLmpzIiwiaW5wdXQvdG91Y2hJbnB1dC5qcyIsImxpbmtlZC1saXN0L2luZGV4LmpzIiwibWF0aC9hbmdsZS5qcyIsIm1hdGgvY2VycC5qcyIsIm1hdGgvY2lyY2xlRGlzdHJpYnV0aW9uLmpzIiwibWF0aC9jbGFtcC5qcyIsIm1hdGgvY29pblRvc3MuanMiLCJtYXRoL2Nyb3NzUHJvZHVjdDJkLmpzIiwibWF0aC9kZWdyZWVzLmpzIiwibWF0aC9kaWZmZXJlbmNlLmpzIiwibWF0aC9kaXN0YW5jZS5qcyIsIm1hdGgvZGlzdGFuY2VTcS5qcyIsIm1hdGgvZG90UHJvZHVjdDJkLmpzIiwibWF0aC9nZXRDaXJjbGVQb2ludHMuanMiLCJtYXRoL2dldEludGVyc2VjdGlvbkFyZWEuanMiLCJtYXRoL2dldE92ZXJsYXBYLmpzIiwibWF0aC9nZXRPdmVybGFwWS5qcyIsIm1hdGgvaW5kZXguanMiLCJtYXRoL2xlcnAuanMiLCJtYXRoL21hcC5qcyIsIm1hdGgvbm9ybWFsaXplLmpzIiwibWF0aC9vcmllbnRhdGlvbi5qcyIsIm1hdGgvcGVyY2VudFJlbWFpbmluZy5qcyIsIm1hdGgvcmFkaWFucy5qcyIsIm1hdGgvcmFuZG9tLmpzIiwibWF0aC9yYW5kb21JbnQuanMiLCJtYXRoL3JhbmRvbVNpZ24uanMiLCJtYXRoL3JvdGF0ZVBvaW50LmpzIiwibWF0aC9yb3RhdGVUb0RlZy5qcyIsIm1hdGgvcm90YXRlVG9SYWQuanMiLCJtYXRoL3JvdW5kVG8uanMiLCJtYXRoL3JvdW5kVG9OZWFyZXN0LmpzIiwibWF0aC9zaXplLmpzIiwibWF0aC9zbWVycC5qcyIsIm1hdGgvc21vb3Roc3RlcC5qcyIsIm1hdGgvc3BsaXRWYWx1ZUFuZFVuaXQuanMiLCJtYXRoL3dlaWdodGVkQXZlcmFnZS5qcyIsIm1hdGgvd2VpZ2h0ZWREaXN0cmlidXRpb24uanMiLCJtZWRpYS9jdWVwb2ludHNSZWFkZXIuanMiLCJtZWRpYS9pT1NQbGF5VmlkZW9JbmxpbmUuanMiLCJtZWRpYS9pbmRleC5qcyIsIm1lZGlhL3ZpZGVvUGxheWVyLmpzIiwibWVkaWEvdmltZW8uanMiLCJtZWRpYS95b3V0dWJlLmpzIiwibWVkaWEveW91dHViZUJhc2ljLmpzIiwibm9kZV9tb2R1bGVzL2V2ZW50cy9ldmVudHMuanMiLCJvYmplY3QtcG9vbC9pbmRleC5qcyIsInBsYXRmb3JtL2Jyb3dzZXIvYW5kcm9pZE5hdGl2ZS5qcyIsInBsYXRmb3JtL2Jyb3dzZXIvaWVWZXJzaW9uLmpzIiwicGxhdGZvcm0vYnJvd3Nlci9pbmRleC5qcyIsInBsYXRmb3JtL2RldmljZS9pbmRleC5qcyIsInBsYXRmb3JtL2luZGV4LmpzIiwicGxhdGZvcm0vb3MvYW5kcm9pZC5qcyIsInBsYXRmb3JtL29zL2FuZHJvaWRWZXJzaW9uLmpzIiwicGxhdGZvcm0vb3MvaW5kZXguanMiLCJwbGF0Zm9ybS9vcy9pb3MuanMiLCJwbGF0Zm9ybS9vcy9pb3NWZXJzaW9uLmpzIiwicGxhdGZvcm0vb3MvbGludXguanMiLCJwbGF0Zm9ybS9vcy9tYWMuanMiLCJwbGF0Zm9ybS9vcy93aW5kb3dzLmpzIiwicGxhdGZvcm0vb3Mvd2luZG93c1Bob25lLmpzIiwicGxhdGZvcm0vc2NyZWVuL2luZGV4LmpzIiwicGxhdGZvcm0vc3VwcG9ydHMvZGV2aWNlT3JpZW50YXRpb24uanMiLCJwbGF0Zm9ybS9zdXBwb3J0cy9pbmRleC5qcyIsInBsYXRmb3JtL3N1cHBvcnRzL21wNC5qcyIsInBsYXRmb3JtL3N1cHBvcnRzL3dlYmdsLmpzIiwicGxhdGZvcm0vc3VwcG9ydHMvd2VibS5qcyIsInBvbHlmaWxsL2NsYXNzTGlzdC5qcyIsInBvbHlmaWxsL2NvbnNvbGUuanMiLCJwb2x5ZmlsbC9pbmRleC5qcyIsInBvbHlmaWxsL3JlcXVlc3RBbmltYXRpb25GcmFtZS5qcyIsInBvcHVwL2luZGV4LmpzIiwic2hhcmUvZW1haWwuanMiLCJzaGFyZS9mYWNlYm9vay5qcyIsInNoYXJlL2ZhY2Vib29rRmVlZERpYWxvZy5qcyIsInNoYXJlL2dvb2dsZXBsdXMuanMiLCJzaGFyZS9pbmRleC5qcyIsInNoYXJlL2xpbmtlZGluLmpzIiwic2hhcmUvcGludGVyZXN0LmpzIiwic2hhcmUvcmVkZGl0LmpzIiwic2hhcmUvcmVucmVuLmpzIiwic2hhcmUvc21zLmpzIiwic2hhcmUvdHdpdHRlci5qcyIsInNoYXJlL3Zrb250YWt0ZS5qcyIsInNoYXJlL3dlaWJvLmpzIiwic2hhcmUvd2hhdHNhcHAuanMiLCJzdG9yYWdlL2luZGV4LmpzIiwic3RyaW5nL2FmdGVyRmlyc3QuanMiLCJzdHJpbmcvYWZ0ZXJMYXN0LmpzIiwic3RyaW5nL2JlZm9yZUZpcnN0LmpzIiwic3RyaW5nL2JlZm9yZUxhc3QuanMiLCJzdHJpbmcvYmVnaW5zV2l0aC5qcyIsInN0cmluZy9iZXR3ZWVuLmpzIiwic3RyaW5nL2Jsb2NrLmpzIiwic3RyaW5nL2NhcGl0YWxpemUuanMiLCJzdHJpbmcvY291bnRPZi5qcyIsInN0cmluZy9lZGl0RGlzdGFuY2UuanMiLCJzdHJpbmcvZW5kc1dpdGguanMiLCJzdHJpbmcvZXNjYXBlSFRNTC5qcyIsInN0cmluZy9lc2NhcGVQYXR0ZXJuLmpzIiwic3RyaW5nL2hhc1RleHQuanMiLCJzdHJpbmcvaW5kZXguanMiLCJzdHJpbmcvaXNOdW1lcmljLmpzIiwic3RyaW5nL3BhZExlZnQuanMiLCJzdHJpbmcvcGFkUmlnaHQuanMiLCJzdHJpbmcvcHJldmVudFdpZG93LmpzIiwic3RyaW5nL3Byb3BlckNhc2UuanMiLCJzdHJpbmcvcmVtb3ZlLmpzIiwic3RyaW5nL3JlbW92ZUV4dHJhV2hpdGVzcGFjZS5qcyIsInN0cmluZy9yZXZlcnNlLmpzIiwic3RyaW5nL3JldmVyc2VXb3Jkcy5qcyIsInN0cmluZy9zaW1pbGFyaXR5LmpzIiwic3RyaW5nL3N0cmlwVGFncy5qcyIsInN0cmluZy9zd2FwQ2FzZS5qcyIsInN0cmluZy90aW1lQ29kZS5qcyIsInN0cmluZy90b051bWJlci5qcyIsInN0cmluZy90cnVuY2F0ZS5qcyIsInN0cmluZy93b3JkQ291bnQuanMiLCJ0cmFjay9ldmVudC5qcyIsInRyYWNrL2luZGV4LmpzIiwidHJhY2svbG9hZC5qcyIsInRyYWNrL3BhZ2V2aWV3LmpzIiwidmlzaWJpbGl0eS9hcGkuanMiLCJ2aXNpYmlsaXR5L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7a0JDQXdCLEs7QUFBVCxTQUFTLEtBQVQsQ0FBZSxNQUFmLEVBQXVCLEtBQXZCLEVBQThCO0FBQ3pDLFFBQU0sTUFBTSxFQUFaO0FBQ0EsU0FBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLE1BQXBCLEVBQTRCLEdBQTVCLEVBQWlDO0FBQzdCLFlBQU0sTUFBTSxPQUFPLEtBQVAsS0FBaUIsV0FBakIsR0FBK0IsS0FBL0IsR0FBdUMsQ0FBbkQ7QUFDQSxZQUFJLElBQUosQ0FBUyxHQUFUO0FBQ0g7QUFDRCxXQUFPLEdBQVA7QUFDSDs7Ozs7Ozs7a0JDUHVCLEs7QUFBVCxTQUFTLEtBQVQsQ0FBZSxHQUFmLEVBQW9CO0FBQy9CLFdBQU8sSUFBSSxLQUFKLENBQVUsQ0FBVixDQUFQO0FBQ0g7Ozs7Ozs7OztBQ0ZEOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7a0JBRWU7QUFDWCwwQkFEVztBQUVYLDBCQUZXO0FBR1gsOEJBSFc7QUFJWCx3Q0FKVztBQUtYLGtDQUxXO0FBTVgsc0NBTlc7QUFPWDtBQVBXLEM7Ozs7Ozs7O2tCQ1JTLE87QUFBVCxTQUFTLE9BQVQsQ0FBaUIsS0FBakIsRUFBd0IsR0FBeEIsRUFBNkI7QUFDeEMsUUFBSSxRQUFRLE9BQU8sU0FBbkI7QUFDQSxXQUFPLElBQUksTUFBSixDQUFXLFVBQUMsTUFBRCxFQUFTLElBQVQsRUFBa0I7QUFDaEMsWUFBTSxPQUFPLEtBQUssR0FBTCxDQUFT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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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WUFBaEIsS0FBaUMsV0FBckMsRUFBa0Q7QUFDckQsYUFBUyxjQUFUO0FBQ0EsYUFBUyx3QkFBVDtBQUNIOztrQkFFYztBQUNYLGtCQURXO0FBRVg7QUFGVyxDOzs7Ozs7Ozs7QUNqQmY7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTSxhQUFhLE9BQU8sTUFBUCxDQUFjLGtCQUFRLFNBQXRCLEVBQWlDO0FBQ2hELFlBQVE7QUFDSixhQUFLLGVBQVc7QUFDWixtQkFBTyxTQUFTLGNBQUksTUFBYixDQUFQO0FBQ0g7QUFIRztBQUR3QyxDQUFqQyxDQUFuQjs7QUFRQSxTQUFTLGtCQUFULEdBQThCO0FBQzFCLFFBQUksU0FBUyxjQUFJLE1BQWIsQ0FBSixFQUEwQjtBQUN0QixtQkFBVyxJQUFYLENBQWdCLFFBQWhCO0FBQ0gsS0FGRCxNQUVPO0FBQ0gsbUJBQVcsSUFBWCxDQUFnQixPQUFoQjtBQUNIO0FBQ0o7O0FBRUQsSUFBSSxjQUFJLE1BQVIsRUFBZ0I7QUFDWixhQUFTLGdCQUFULENBQTBCLGNBQUksTUFBOUIsRUFBc0Msa0JBQXRDLEVBQTBELEtBQTFEO0FBQ0g7O2tCQUVjLFUiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXJyYXkobGVuZ3RoLCB2YWx1ZSkge1xuICAgIGNvbnN0IGFyciA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgdmFsID0gdHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJyA/IHZhbHVlIDogaTtcbiAgICAgICAgYXJyLnB1c2godmFsKTtcbiAgICB9XG4gICAgcmV0dXJuIGFycjtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNsb25lKGFycikge1xuICAgIHJldHVybiBhcnIuc2xpY2UoMCk7XG59XG4iLCJpbXBvcnQgYXJyYXkgZnJvbSAnLi9hcnJheSc7XG5pbXBvcnQgY2xvbmUgZnJvbSAnLi9jbG9uZSc7XG5pbXBvcnQgbmVhcmVzdCBmcm9tICcuL25lYXJlc3QnO1xuaW1wb3J0IHJhbmRvbUNob2ljZSBmcm9tICcuL3JhbmRvbUNob2ljZSc7XG5pbXBvcnQgc29ydEFscGhhIGZyb20gJy4vc29ydEFscGhhJztcbmltcG9ydCBzb3J0TnVtZXJpYyBmcm9tICcuL3NvcnROdW1lcmljJztcbmltcG9ydCBzb3J0UmFuZG9tIGZyb20gJy4vc29ydFJhbmRvbSc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBhcnJheSxcbiAgICBjbG9uZSxcbiAgICBuZWFyZXN0LFxuICAgIHJhbmRvbUNob2ljZSxcbiAgICBzb3J0QWxwaGEsXG4gICAgc29ydE51bWVyaWMsXG4gICAgc29ydFJhbmRvbVxufTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG5lYXJlc3QodmFsdWUsIGFycikge1xuICAgIGxldCBsZWFzdCA9IE51bWJlci5NQVhfVkFMVUU7XG4gICAgcmV0dXJuIGFyci5yZWR1Y2UoKHJlc3VsdCwgaXRlbSkgPT4ge1xuICAgICAgICBjb25zdCBkaWZmID0gTWF0aC5hYnMoaXRlbSAtIHZhbHVlKTtcbiAgICAgICAgaWYgKGRpZmYgPCBsZWFzdCkge1xuICAgICAgICAgICAgbGVhc3QgPSBkaWZmO1xuICAgICAgICAgICAgcmVzdWx0ID0gaXRlbTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sIC0xKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJhbmRvbUNob2ljZShhcnIpIHtcbiAgICByZXR1cm4gYXJyW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFyci5sZW5ndGgpXTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNvcnRBbHBoYShhLCBiKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHgsIHkpIHtcbiAgICAgICAgICAgIHJldHVybiBTdHJpbmcoeFthXSkudG9Mb3dlckNhc2UoKSA+IFN0cmluZyh5W2FdKS50b0xvd2VyQ2FzZSgpID8gMSA6IC0xO1xuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gU3RyaW5nKGEpLnRvTG93ZXJDYXNlKCkgPiBTdHJpbmcoYikudG9Mb3dlckNhc2UoKSA/IDEgOiAtMTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNvcnROdW1lcmljKGEsIGIpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oeCwgeSkge1xuICAgICAgICAgICAgcmV0dXJuIE51bWJlcih4W2FdKSAtIE51bWJlcih5W2FdKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIE51bWJlcihhKSAtIE51bWJlcihiKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNvcnRSYW5kb20oKSB7XG4gICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgPiAwLjUgPyAtMSA6IDE7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBibG9ja1Njcm9sbGluZyh2YWx1ZSkge1xuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSB2YWx1ZSA/ICdoaWRkZW4nIDogJyc7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmb3JjZVJlZHJhdyhlbCkge1xuICAgIGNvbnN0IGRpc3BsYXkgPSBlbC5zdHlsZS5kaXNwbGF5O1xuICAgIGVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZWwub2Zmc2V0SGVpZ2h0O1xuICAgIGVsLnN0eWxlLmRpc3BsYXkgPSBkaXNwbGF5O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0UGFnZUhlaWdodCgpIHtcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQuYm9keTtcbiAgICBjb25zdCBkb2MgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cbiAgICByZXR1cm4gTWF0aC5tYXgoXG4gICAgICAgIGJvZHkuc2Nyb2xsSGVpZ2h0IHx8IDAsXG4gICAgICAgIGJvZHkub2Zmc2V0SGVpZ2h0IHx8IDAsXG4gICAgICAgIGJvZHkuY2xpZW50SGVpZ2h0IHx8IDAsXG4gICAgICAgIGRvYy5jbGllbnRIZWlnaHQgfHwgMCxcbiAgICAgICAgZG9jLm9mZnNldEhlaWdodCB8fCAwLFxuICAgICAgICBkb2Muc2Nyb2xsSGVpZ2h0IHx8IDBcbiAgICApO1xufVxuIiwiaW1wb3J0IGdldFNjcm9sbFRvcCBmcm9tICcuL2dldFNjcm9sbFRvcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFNjcm9sbFBlcmNlbnRhZ2UoKSB7XG4gICAgcmV0dXJuIChnZXRTY3JvbGxUb3AoKSArIHdpbmRvdy5pbm5lckhlaWdodCkgLyBkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodDtcbn1cbiIsImltcG9ydCBnZXRTY3JvbGxUb3AgZnJvbSAnLi9nZXRTY3JvbGxUb3AnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRTY3JvbGxSZW1haW5pbmcoKSB7XG4gICAgY29uc3QgYiA9IGRvY3VtZW50LmJvZHk7XG4gICAgcmV0dXJuIE1hdGguYWJzKGdldFNjcm9sbFRvcCgpIC0gKGIuc2Nyb2xsSGVpZ2h0IC0gYi5jbGllbnRIZWlnaHQpKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFNjcm9sbFRvcCgpIHtcbiAgICByZXR1cm4gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRTcmNzZXRJbWFnZShzcmNzZXQsIHBpeGVsV2lkdGgpIHtcbiAgICBwaXhlbFdpZHRoID0gcGl4ZWxXaWR0aCB8fCB3aW5kb3cuaW5uZXJXaWR0aCAqICh3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAwKTtcblxuICAgIGNvbnN0IHNldCA9IHNyY3NldC5zcGxpdCgnLCcpXG4gICAgICAgIC5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IFt1cmwsIHdpZHRoXSA9IGl0ZW0udHJpbSgpLnNwbGl0KC9cXHMrLyk7XG4gICAgICAgICAgICBjb25zdCBzaXplID0gcGFyc2VJbnQod2lkdGguc2xpY2UoMCwgLTEpLCAxMCk7XG4gICAgICAgICAgICByZXR1cm4ge3VybCwgc2l6ZX07XG4gICAgICAgIH0pXG4gICAgICAgIC5zb3J0KChhLCBiKSA9PiBiLnNpemUgLSBhLnNpemUpO1xuXG4gICAgaWYgKCFzZXQubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICByZXR1cm4gc2V0LnJlZHVjZSgodmFsdWUsIGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuIGl0ZW0uc2l6ZSA+PSBwaXhlbFdpZHRoID8gaXRlbS51cmwgOiB2YWx1ZTtcbiAgICB9LCBzZXRbMF0udXJsKTtcbn1cbiIsImltcG9ydCBibG9ja1Njcm9sbGluZyBmcm9tICcuL2Jsb2NrU2Nyb2xsaW5nJztcbmltcG9ydCBmb3JjZVJlZHJhdyBmcm9tICcuL2ZvcmNlUmVkcmF3JztcbmltcG9ydCBnZXRQYWdlSGVpZ2h0IGZyb20gJy4vZ2V0UGFnZUhlaWdodCc7XG5pbXBvcnQgZ2V0U2Nyb2xsUGVyY2VudGFnZSBmcm9tICcuL2dldFNjcm9sbFBlcmNlbnRhZ2UnO1xuaW1wb3J0IGdldFNjcm9sbFJlbWFpbmluZyBmcm9tICcuL2dldFNjcm9sbFJlbWFpbmluZyc7XG5pbXBvcnQgZ2V0U2Nyb2xsVG9wIGZyb20gJy4vZ2V0U2Nyb2xsVG9wJztcbmltcG9ydCBnZXRTcmNzZXRJbWFnZSBmcm9tICcuL2dldFNyY3NldEltYWdlJztcbmltcG9ydCBpc0VsZW1lbnRJblZpZXdwb3J0IGZyb20gJy4vaXNFbGVtZW50SW5WaWV3cG9ydCc7XG5pbXBvcnQgaXNQYWdlRW5kIGZyb20gJy4vaXNQYWdlRW5kJztcbmltcG9ydCByZXNpemUgZnJvbSAnLi9yZXNpemUnO1xuaW1wb3J0IHNjcm9sbCBmcm9tICcuL3Njcm9sbCc7XG5pbXBvcnQgc2V0U3R5bGUgZnJvbSAnLi9zZXRTdHlsZSc7XG5pbXBvcnQgdHJhbnNpdGlvbkVuZCBmcm9tICcuL3RyYW5zaXRpb25FbmQnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYmxvY2tTY3JvbGxpbmcsXG4gICAgZm9yY2VSZWRyYXcsXG4gICAgZ2V0UGFnZUhlaWdodCxcbiAgICBnZXRTY3JvbGxQZXJjZW50YWdlLFxuICAgIGdldFNjcm9sbFJlbWFpbmluZyxcbiAgICBnZXRTY3JvbGxUb3AsXG4gICAgZ2V0U3Jjc2V0SW1hZ2UsXG4gICAgaXNFbGVtZW50SW5WaWV3cG9ydCxcbiAgICBpc1BhZ2VFbmQsXG4gICAgcmVzaXplLFxuICAgIHNjcm9sbCxcbiAgICBzZXRTdHlsZSxcbiAgICB0cmFuc2l0aW9uRW5kXG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNFbGVtZW50SW5WaWV3cG9ydChlbCkge1xuICAgIGNvbnN0IHJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICByZXR1cm4gKFxuICAgICAgICByZWN0LnRvcCA+PSAwICYmXG4gICAgICAgIHJlY3QubGVmdCA+PSAwICYmXG4gICAgICAgIHJlY3QuYm90dG9tIDw9IHdpbmRvdy5pbm5lckhlaWdodCAmJlxuICAgICAgICByZWN0LnJpZ2h0IDw9IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgKTtcbn1cbiIsImltcG9ydCBnZXRTY3JvbGxUb3AgZnJvbSAnLi9nZXRTY3JvbGxUb3AnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc1BhZ2VFbmQoYnVmZmVyID0gMCkge1xuICAgIGNvbnN0IGIgPSBkb2N1bWVudC5ib2R5O1xuICAgIHJldHVybiBNYXRoLmFicyhnZXRTY3JvbGxUb3AoKSAtIChiLnNjcm9sbEhlaWdodCAtIGIuY2xpZW50SGVpZ2h0KSkgPD0gYnVmZmVyO1xufVxuIiwiaW1wb3J0IGV2ZW50QnVzIGZyb20gJy4uL2V2ZW50cy9ldmVudEJ1cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlc2l6ZShkZWJvdWNlRGVsYXkgPSA1MDApIHtcblxuICAgIGxldCB0aW1lb3V0SWQ7XG5cbiAgICAvLyBvcmllbnRhdGlvbmNoYW5nZSB0b28/XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dElkKTtcbiAgICAgICAgdGltZW91dElkID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4gZXZlbnRCdXMuZW1pdCgncmVzaXplJyksIGRlYm91Y2VEZWxheSk7XG4gICAgfSk7XG59XG4iLCJpbXBvcnQgZXZlbnRCdXMgZnJvbSAnLi4vZXZlbnRzL2V2ZW50QnVzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2Nyb2xsKCkge1xuXG4gICAgbGV0IGxhc3RTY3JvbGxZID0gMCxcbiAgICAgICAgdGlja2luZyA9IGZhbHNlLFxuICAgICAgICB0aW1lb3V0SWQ7XG5cbiAgICBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SWQpO1xuICAgICAgICB0aW1lb3V0SWQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiBldmVudEJ1cy5lbWl0KCdzY3JvbGxlbmQnLCBsYXN0U2Nyb2xsWSksIDIwMCk7XG5cbiAgICAgICAgZXZlbnRCdXMuZW1pdCgnc2Nyb2xsJywgbGFzdFNjcm9sbFkpO1xuICAgICAgICB0aWNraW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVxdWVzdFRpY2soKSB7XG4gICAgICAgIGlmICghdGlja2luZykge1xuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGUpO1xuICAgICAgICAgICAgdGlja2luZyA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblNjcm9sbCgpIHtcbiAgICAgICAgLy8gbGFzdFNjcm9sbFkgPSB3aW5kb3cuc2Nyb2xsWTtcbiAgICAgICAgbGFzdFNjcm9sbFkgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcbiAgICAgICAgcmVxdWVzdFRpY2soKTtcbiAgICB9XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgb25TY3JvbGwsIGZhbHNlKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNldFN0eWxlKGVsLCBzdHlsZSkge1xuICAgIE9iamVjdC5rZXlzKHN0eWxlKS5mb3JFYWNoKChwcm9wKSA9PiB7XG4gICAgICAgIGVsLnN0eWxlW3Byb3BdID0gc3R5bGVbcHJvcF07XG4gICAgfSk7XG4gICAgcmV0dXJuIGVsO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdHJhbnNpdGlvbkVuZChlbCwgY2IsIHRpbWVvdXQgPSAxMDAwKSB7XG5cbiAgICBsZXQgdGltZW91dElkO1xuXG4gICAgZnVuY3Rpb24gaGFuZGxlcigpIHtcbiAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aW1lb3V0SWQpO1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgaGFuZGxlcik7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCBoYW5kbGVyKTtcbiAgICAgICAgY2IoKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGVsLnN0eWxlLnRyYW5zaXRpb24gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBoYW5kbGVyKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBlbC5zdHlsZS5XZWJraXRUcmFuc2l0aW9uICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRUcmFuc2l0aW9uRW5kJywgaGFuZGxlcik7XG4gICAgfVxuXG4gICAgdGltZW91dElkID0gd2luZG93LnNldFRpbWVvdXQoaGFuZGxlciwgdGltZW91dCk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZWJvdW5jZShoYW5kbGVyKSB7XG4gICAgbGV0IHRpY2tpbmcgPSBmYWxzZTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZShldmVudCkge1xuICAgICAgICBoYW5kbGVyKGV2ZW50KTtcbiAgICAgICAgdGlja2luZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlcXVlc3RUaWNrKGV2ZW50KSB7XG4gICAgICAgIGlmICghdGlja2luZykge1xuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB1cGRhdGUoZXZlbnQpKTtcbiAgICAgICAgICAgIHRpY2tpbmcgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcXVlc3RUaWNrO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGVsZWdhdGVFdmVudHMocGFyZW50RWwsIGV2ZW50VHlwZSwgdGFnTmFtZSwgY2IpIHtcbiAgICB0YWdOYW1lID0gdGFnTmFtZS50b1VwcGVyQ2FzZSgpO1xuXG4gICAgcGFyZW50RWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIChldmVudCkgPT4ge1xuICAgICAgICBsZXQgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuXG4gICAgICAgIHdoaWxlICh0YXJnZXQgIT09IHBhcmVudEVsKSB7XG4gICAgICAgICAgICBpZiAodGFyZ2V0LnRhZ05hbWUgPT09IHRhZ05hbWUpIHtcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBjYih0YXJnZXQsIGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnROb2RlO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4iLCJpbXBvcnQge0V2ZW50RW1pdHRlcn0gZnJvbSAnZXZlbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZW1pdHRlciBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5zZXRNYXhMaXN0ZW5lcnMoMjApO1xuICAgIH1cblxuICAgIG9mZiAodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKGxpc3RlbmVyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyh0eXBlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgZW1pdHRlciBmcm9tICcuL2VtaXR0ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuY3JlYXRlKGVtaXR0ZXIucHJvdG90eXBlKTtcbiIsImltcG9ydCBlbWl0dGVyIGZyb20gJy4vZW1pdHRlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGhlYXJ0YmVhdChpbnRlcnZhbCkge1xuICAgIGxldCBiZWF0ID0gbnVsbCxcbiAgICAgICAgdGltZSA9IDAsXG4gICAgICAgIG51bVRpbWVzID0gMCxcbiAgICAgICAgbWF4VGltZXMgPSAwLFxuICAgICAgICBydW5uaW5nID0gZmFsc2U7XG5cbiAgICBmdW5jdGlvbiBzdGFydChtYXhOdW1UaW1lcyA9IDAsIHRpbWVPZmZzZXQgPSAwKSB7XG4gICAgICAgIG1heFRpbWVzID0gbWF4TnVtVGltZXM7XG4gICAgICAgIHRpbWUgPSB0aW1lT2Zmc2V0O1xuICAgICAgICBudW1UaW1lcyA9IDA7XG4gICAgICAgIHJ1bm5pbmcgPSB0cnVlO1xuICAgICAgICByZXR1cm4gYmVhdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdG9wKCkge1xuICAgICAgICBydW5uaW5nID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBiZWF0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZShkdCA9IDEpIHtcbiAgICAgICAgaWYgKCFydW5uaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gYmVhdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtYXhUaW1lcyA+IDAgJiYgbnVtVGltZXMgPj0gbWF4VGltZXMpIHtcbiAgICAgICAgICAgIHJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIGJlYXQuZW1pdCgnY29tcGxldGUnKTtcbiAgICAgICAgICAgIHJldHVybiBiZWF0O1xuICAgICAgICB9XG5cbiAgICAgICAgdGltZSArPSBkdDtcblxuICAgICAgICBpZiAodGltZSA+PSBpbnRlcnZhbCkge1xuICAgICAgICAgICAgdGltZSA9IDA7XG4gICAgICAgICAgICBudW1UaW1lcysrO1xuICAgICAgICAgICAgYmVhdC5lbWl0KCd1cGRhdGUnLCBudW1UaW1lcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJlYXQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0SW50ZXJ2YWwodmFsdWUpIHtcbiAgICAgICAgaW50ZXJ2YWwgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIGJlYXQ7XG4gICAgfVxuXG4gICAgYmVhdCA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmNyZWF0ZShlbWl0dGVyLnByb3RvdHlwZSksIHtcbiAgICAgICAgc3RhcnQsXG4gICAgICAgIHN0b3AsXG4gICAgICAgIHVwZGF0ZSxcbiAgICAgICAgZ2V0IGludGVydmFsKCkge1xuICAgICAgICAgICAgcmV0dXJuIGludGVydmFsO1xuICAgICAgICB9LFxuICAgICAgICBzZXQgaW50ZXJ2YWwodmFsdWUpIHtcbiAgICAgICAgICAgIGludGVydmFsID0gdmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldEludGVydmFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gYmVhdDtcbn1cbiIsImltcG9ydCBkZWJvdW5jZSBmcm9tICcuL2RlYm91bmNlJztcbmltcG9ydCBkZWxlZ2F0ZUV2ZW50cyBmcm9tICcuL2RlbGVnYXRlRXZlbnRzJztcbmltcG9ydCBlbWl0dGVyIGZyb20gJy4vZW1pdHRlcic7XG5pbXBvcnQgZXZlbnRCdXMgZnJvbSAnLi9ldmVudEJ1cyc7XG5pbXBvcnQgaGVhcnRiZWF0IGZyb20gJy4vaGVhcnRiZWF0JztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGRlYm91bmNlLFxuICAgIGRlbGVnYXRlRXZlbnRzLFxuICAgIGVtaXR0ZXIsXG4gICAgZXZlbnRCdXMsXG4gICAgaGVhcnRiZWF0XG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZnBzKGVsKSB7XG5cbiAgICBsZXQgdGltZSA9IDAsXG4gICAgICAgIGZwcyA9IDAsXG4gICAgICAgIGN1cnJlbnRGcHMgPSAwLFxuICAgICAgICBhdmVyYWdlRnBzID0gMCxcbiAgICAgICAgdGlja3MgPSAwLFxuICAgICAgICB0b3RhbEZwcyA9IDAsXG4gICAgICAgIGxhc3RGcHMgPSAwLFxuICAgICAgICBsYXN0QXZlcmFnZSA9IDA7XG5cbiAgICBpZiAoIWVsKSB7XG4gICAgICAgIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnaWQnLCAnZnBzJyk7XG4gICAgICAgIGVsLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgZWwuc3R5bGUudG9wID0gJzBweCc7XG4gICAgICAgIGVsLnN0eWxlLnJpZ2h0ID0gJzBweCc7XG4gICAgICAgIGVsLnN0eWxlLnBhZGRpbmcgPSAnMnB4IDZweCc7XG4gICAgICAgIGVsLnN0eWxlLnpJbmRleCA9ICc5OTk5OSc7XG4gICAgICAgIGVsLnN0eWxlLmJhY2tncm91bmQgPSAnIzAwMCc7XG4gICAgICAgIGVsLnN0eWxlLmNvbG9yID0gJyNmZmYnO1xuICAgICAgICBlbC5zdHlsZS5mb250U2l6ZSA9ICcxMHB4JztcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVwb3J0KCkge1xuICAgICAgICBpZiAoY3VycmVudEZwcyA9PT0gbGFzdEZwcyAmJiBhdmVyYWdlRnBzID09PSBsYXN0QXZlcmFnZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxhc3RGcHMgPSBjdXJyZW50RnBzO1xuICAgICAgICBsYXN0QXZlcmFnZSA9IGF2ZXJhZ2VGcHM7XG4gICAgICAgIGVsLmlubmVySFRNTCA9ICdGUFM6ICcgKyBjdXJyZW50RnBzICsgJzxiciAvPkFWRTogJyArIGF2ZXJhZ2VGcHM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlKG5vdykge1xuICAgICAgICBpZiAodHlwZW9mIG5vdyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGltZSA9PT0gMCkge1xuICAgICAgICAgICAgdGltZSA9IG5vdztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChub3cgLSAxMDAwID4gdGltZSkge1xuICAgICAgICAgICAgdGltZSA9IG5vdztcbiAgICAgICAgICAgIGN1cnJlbnRGcHMgPSBmcHM7XG4gICAgICAgICAgICBmcHMgPSAwO1xuXG4gICAgICAgICAgICBpZiAoY3VycmVudEZwcyA+IDEpIHtcbiAgICAgICAgICAgICAgICB0aWNrcysrO1xuICAgICAgICAgICAgICAgIHRvdGFsRnBzICs9IGN1cnJlbnRGcHM7XG4gICAgICAgICAgICAgICAgYXZlcmFnZUZwcyA9IE1hdGguZmxvb3IodG90YWxGcHMgLyB0aWNrcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXBvcnQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZwcysrO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGF1dG8oKSB7XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYXV0byk7XG5cbiAgICAgICAgdXBkYXRlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYXV0byxcbiAgICAgICAgdXBkYXRlXG4gICAgfTtcbn1cbiIsImxldCByZXF1ZXN0ID0gbnVsbCxcbiAgICBleGl0ID0gbnVsbCxcbiAgICBjaGFuZ2UgPSBudWxsLFxuICAgIGVycm9yID0gbnVsbCxcbiAgICBlbGVtZW50ID0gbnVsbCxcbiAgICBlbmFibGVkID0gbnVsbDtcblxuY29uc3QgZG9jRWwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cbmlmICh0eXBlb2YgZG9jRWwucmVxdWVzdEZ1bGxzY3JlZW4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmVxdWVzdCA9ICdyZXF1ZXN0RnVsbHNjcmVlbic7XG4gICAgZXhpdCA9ICdleGl0RnVsbHNjcmVlbic7XG4gICAgY2hhbmdlID0gJ2Z1bGxzY3JlZW5jaGFuZ2UnO1xuICAgIGVycm9yID0gJ2Z1bGxzY3JlZW5lcnJvcic7XG4gICAgZWxlbWVudCA9ICdmdWxsc2NyZWVuRWxlbWVudCc7XG4gICAgZW5hYmxlZCA9ICdmdWxsc2NyZWVuRW5hYmxlZCc7XG59IGVsc2UgaWYgKHR5cGVvZiBkb2NFbC5tb3pSZXF1ZXN0RnVsbFNjcmVlbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXF1ZXN0ID0gJ21velJlcXVlc3RGdWxsU2NyZWVuJztcbiAgICBleGl0ID0gJ21vekNhbmNlbEZ1bGxTY3JlZW4nO1xuICAgIGNoYW5nZSA9ICdtb3pmdWxsc2NyZWVuY2hhbmdlJztcbiAgICBlcnJvciA9ICdtb3pmdWxsc2NyZWVuZXJyb3InO1xuICAgIGVsZW1lbnQgPSAnbW96RnVsbFNjcmVlbkVsZW1lbnQnO1xuICAgIGVuYWJsZWQgPSAnbW96RnVsbFNjcmVlbkVuYWJsZWQnO1xufSBlbHNlIGlmICh0eXBlb2YgZG9jRWwubXNSZXF1ZXN0RnVsbHNjcmVlbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXF1ZXN0ID0gJ21zUmVxdWVzdEZ1bGxzY3JlZW4nO1xuICAgIGV4aXQgPSAnbXNFeGl0RnVsbHNjcmVlbic7XG4gICAgY2hhbmdlID0gJ01TRnVsbHNjcmVlbkNoYW5nZSc7XG4gICAgZXJyb3IgPSAnTVNGdWxsc2NyZWVuRXJyb3InO1xuICAgIGVsZW1lbnQgPSAnbXNGdWxsc2NyZWVuRWxlbWVudCc7XG4gICAgZW5hYmxlZCA9ICdtc0Z1bGxzY3JlZW5FbmFibGVkJztcbn0gZWxzZSBpZiAodHlwZW9mIGRvY0VsLndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuICE9PSAndW5kZWZpbmVkJykge1xuICAgIHJlcXVlc3QgPSAnd2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4nO1xuICAgIGV4aXQgPSAnd2Via2l0RXhpdEZ1bGxzY3JlZW4nO1xuICAgIGNoYW5nZSA9ICd3ZWJraXRmdWxsc2NyZWVuY2hhbmdlJztcbiAgICBlcnJvciA9ICd3ZWJraXRGdWxsc2NyZWVuRXJyb3InO1xuICAgIGVsZW1lbnQgPSAnd2Via2l0RnVsbHNjcmVlbkVsZW1lbnQnO1xuICAgIGVuYWJsZWQgPSAnd2Via2l0RnVsbHNjcmVlbkVuYWJsZWQnO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgcmVxdWVzdCxcbiAgICBleGl0LFxuICAgIGNoYW5nZSxcbiAgICBlcnJvcixcbiAgICBlbGVtZW50LFxuICAgIGVuYWJsZWRcbn07XG4iLCJpbXBvcnQgYXBpIGZyb20gJy4vYXBpJztcbmltcG9ydCBlbWl0dGVyIGZyb20gJy4uL2V2ZW50cy9lbWl0dGVyJztcblxuY29uc3QgZnVsbHNjcmVlbiA9IE9iamVjdC5jcmVhdGUoZW1pdHRlci5wcm90b3R5cGUpO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGFwaS5jaGFuZ2UsIChldmVudCkgPT4ge1xuICAgIGZ1bGxzY3JlZW4uZW1pdCgnY2hhbmdlJywgZXZlbnQpO1xufSk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoYXBpLmVycm9yLCAoZXZlbnQpID0+IHtcbiAgICBmdWxsc2NyZWVuLmVtaXQoJ2Vycm9yJywgZXZlbnQpO1xufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGZ1bGxzY3JlZW4sIHtcbiAgICByZXF1ZXN0OiB7XG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbihlbCkge1xuICAgICAgICAgICAgZWwgPSBlbCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgICAgICBlbFthcGkucmVxdWVzdF0odHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGV4aXQ6IHtcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZG9jdW1lbnRbYXBpLmV4aXRdKCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHRvZ2dsZToge1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24oZWwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzRnVsbHNjcmVlbikge1xuICAgICAgICAgICAgICAgIHRoaXMuZXhpdCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlcXVlc3QoZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBpc1N1cHBvcnRlZDoge1xuICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICByZXR1cm4gISFhcGkucmVxdWVzdDtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgaXNGdWxsc2NyZWVuOiB7XG4gICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgIHJldHVybiAhIWRvY3VtZW50W2FwaS5lbGVtZW50XTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZWxlbWVudDoge1xuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnRbYXBpLmVsZW1lbnRdO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBlbmFibGVkOiB7XG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudFthcGkuZW5hYmxlZF07XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgZnVsbHNjcmVlbjtcbiIsImZ1bmN0aW9uIGdldENvbG91cihyLCBnLCBiLCBhID0gMSkge1xuICAgIGlmICh0eXBlb2YgciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIHI7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgciA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgcmV0dXJuIGByZ2JhKCR7cn0sJHtifSwke2d9LCR7YX0pYDtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyYXBoaWNzIHtcbiAgICBjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIGlmICh0eXBlb2Ygd2lkdGggPT09ICdvYmplY3QnICYmIHdpZHRoLnRhZ05hbWUgPT09ICdDQU5WQVMnKSB7XG4gICAgICAgICAgICB0aGlzLmNhbnZhcyA9IHdpZHRoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgICAgIHRoaXMuc2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgfVxuXG4gICAgZ2V0IGNvbnRleHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmN0eDtcbiAgICB9XG5cbiAgICBmaWxsKHIsIGcsIGIsIGEgPSAxKSB7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IGdldENvbG91cihyLCBnLCBiLCBhKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc3Ryb2tlKHIsIGcsIGIsIGEgPSAxKSB7XG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gZ2V0Q29sb3VyKHIsIGcsIGIsIGEpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBjaXJjbGUoeCwgeSwgcmFkaXVzKSB7XG4gICAgICAgIGNvbnN0IHtjdHh9ID0gdGhpcztcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguYXJjKHgsIHksIHJhZGl1cywgMCwgTWF0aC5QSSAqIDIsIGZhbHNlKTtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcmVjdCh4LCB5LCB3aWR0aCwgaGVpZ2h0LCBhbmdsZSA9IDApIHtcbiAgICAgICAgY29uc3Qge2N0eH0gPSB0aGlzO1xuICAgICAgICBpZiAoYW5nbGUgIT09IDApIHtcbiAgICAgICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgICAgICBjdHgudHJhbnNsYXRlKHggKyB3aWR0aCAvIDIsIHkgKyBoZWlnaHQgLyAyKTtcbiAgICAgICAgICAgIGN0eC5yb3RhdGUoYW5nbGUpO1xuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY3R4LnJlY3QoLXdpZHRoIC8gMiwgLWhlaWdodCAvIDIsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjdHgucmVjdCh4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgbGluZSh4MSwgeTEsIHgyLCB5Mikge1xuICAgICAgICBjb25zdCB7Y3R4fSA9IHRoaXM7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4Lm1vdmVUbyh4MSwgeTEpO1xuICAgICAgICBjdHgubGluZVRvKHgyLCB5Mik7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgbGluZVdpZHRoKHdpZHRoKSB7XG4gICAgICAgIHRoaXMuY3R4LmxpbmVXaWR0aCA9IHdpZHRoO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBtb3ZlKHgsIHkpIHtcbiAgICAgICAgdGhpcy5jdHgubW92ZVRvKHgsIHkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBpbWFnZShlbCwgeCwgeSwgYW5nbGUgPSAwKSB7XG4gICAgICAgIGNvbnN0IHtjdHh9ID0gdGhpcztcbiAgICAgICAgaWYgKGFuZ2xlICE9PSAwKSB7XG4gICAgICAgICAgICBjb25zdCBvZmZzZXRYID0gZWwud2lkdGggLyAyO1xuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0WSA9IGVsLmhlaWdodCAvIDI7XG4gICAgICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZSh4ICsgb2Zmc2V0WCwgeSArIG9mZnNldFkpO1xuICAgICAgICAgICAgY3R4LnJvdGF0ZShhbmdsZSk7XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKGVsLCAtb2Zmc2V0WCwgLW9mZnNldFkpO1xuICAgICAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoZWwsIHgsIHkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHRleHQoc3RyLCB4LCB5KSB7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KHN0ciwgeCwgeSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldEZvbnRTdHlsZShmYW1pbHksIHNpemUpIHtcbiAgICAgICAgdGhpcy5jdHguZm9udCA9IGAke3NpemV9cHggJHtmYW1pbHl9YDtcbiAgICB9XG5cbiAgICBnZXRJbWFnZURhdGEoeCA9IDAsIHkgPSAwLCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIGNvbnN0IHtjdHgsIGNhbnZhc30gPSB0aGlzO1xuICAgICAgICByZXR1cm4gY3R4LmdldEltYWdlRGF0YSh4LCB5LCB3aWR0aCB8fCBjYW52YXMud2lkdGgsIGhlaWdodCB8fCBjYW52YXMuaGVpZ2h0KTtcbiAgICB9XG5cbiAgICBnZXRQaXhlbCh4LCB5KSB7XG4gICAgICAgIHggPSBNYXRoLmZsb29yKHgpO1xuICAgICAgICB5ID0gTWF0aC5mbG9vcih5KTtcbiAgICAgICAgY29uc3Qge2RhdGF9ID0gdGhpcy5jdHguZ2V0SW1hZ2VEYXRhKHgsIHksIDEsIDEpO1xuICAgICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZGF0YSk7XG4gICAgfVxuXG4gICAgc2V0UGl4ZWwoeCwgeSwgciwgZywgYiwgYSkge1xuICAgICAgICB4ID0gTWF0aC5mbG9vcih4KTtcbiAgICAgICAgeSA9IE1hdGguZmxvb3IoeSk7XG4gICAgICAgIGNvbnN0IHt3aWR0aCwgZGF0YX0gPSB0aGlzLmdldEltYWdlRGF0YSgpO1xuICAgICAgICBjb25zdCBpID0gKHggKyB5ICogd2lkdGgpICogNDtcbiAgICAgICAgZGF0YVtpICsgMF0gPSByO1xuICAgICAgICBkYXRhW2kgKyAxXSA9IGc7XG4gICAgICAgIGRhdGFbaSArIDJdID0gYjtcbiAgICAgICAgZGF0YVtpICsgM10gPSBhO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBjbGVhckNpcmNsZSh4LCB5LCByYWRpdXMgPSAyMCkge1xuICAgICAgICBjb25zdCB7Y3R4fSA9IHRoaXM7XG4gICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgIGN0eC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnZGVzdGluYXRpb24tb3V0JztcbiAgICAgICAgdGhpcy5jaXJjbGUoeCwgeSwgcmFkaXVzKTtcbiAgICAgICAgY3R4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdzb3VyY2Utb3Zlcic7XG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHRyYW5zbGF0ZUFuZCh4LCB5LCBmbikge1xuICAgICAgICBjb25zdCB7Y3R4fSA9IHRoaXM7XG4gICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgIGN0eC50cmFuc2xhdGUoeCwgeSk7XG4gICAgICAgIGZuKGN0eCk7XG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGNsZWFyKHIsIGcsIGIsIGEgPSAxKSB7XG4gICAgICAgIGNvbnN0IGNvbG9yID0gZ2V0Q29sb3VyKHIsIGcsIGIsIGEpO1xuICAgICAgICBjb25zdCB7Y3R4fSA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHt3aWR0aCwgaGVpZ2h0fSA9IHRoaXMuY2FudmFzO1xuICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICBjdHguc2V0VHJhbnNmb3JtKDEsIDAsIDAsIDEsIDAsIDApO1xuICAgICAgICBpZiAoY29sb3IpIHtcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgIH1cbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzaXplKHdpZHRoID0gd2luZG93LmlubmVyV2lkdGgsIGhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCkge1xuICAgICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLmNhbnZhcy5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMuY2FudmFzKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNhbnZhcyA9IG51bGw7XG4gICAgICAgIHRoaXMuY3R4ID0gbnVsbDtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRMb2NhdGlvbihocmVmKSB7XG4gICAgY29uc3QgbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBsLmhyZWYgPSBocmVmO1xuICAgIHJldHVybiBsO1xufVxuIiwiaW1wb3J0IGdldExvY2F0aW9uIGZyb20gJy4vZ2V0TG9jYXRpb24nO1xuaW1wb3J0IGpzb25wIGZyb20gJy4vanNvbnAnO1xuaW1wb3J0IGxvYWRTY3JpcHQgZnJvbSAnLi9sb2FkU2NyaXB0JztcbmltcG9ydCB1cmxQYXJhbXMgZnJvbSAnLi91cmxQYXJhbXMnO1xuaW1wb3J0IHhociBmcm9tICcuL3hocic7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBnZXRMb2NhdGlvbixcbiAgICBqc29ucCxcbiAgICBsb2FkU2NyaXB0LFxuICAgIHVybFBhcmFtcyxcbiAgICB4aHJcbn07XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBqc29ucCh1cmwsIGNiLCB0aW1lb3V0ID0gNTAwMCkge1xuICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgIGNvbnN0IGNhbGxiYWNrID0gYGpzb25wX2NhbGxiYWNrXyR7TWF0aC5yb3VuZCgxMDAwMDAgKiBNYXRoLnJhbmRvbSgpKX1gO1xuICAgIGNvbnN0IHNlcGFyYXRvciA9IHVybC5pbmRleE9mKCc/JykgPj0gMCA/ICcmJyA6ICc/JztcblxuICAgIGNvbnN0IHRpbWVvdXRJZCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgd2luZG93W2NhbGxiYWNrXShudWxsLCAnanNvbnAgZXJyb3InKTtcbiAgICB9LCB0aW1lb3V0KTtcblxuICAgIHdpbmRvd1tjYWxsYmFja10gPSBmdW5jdGlvbihkYXRhLCBlcnIgPSBudWxsKSB7XG4gICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGltZW91dElkKTtcbiAgICAgICAgZGVsZXRlIHdpbmRvd1tjYWxsYmFja107XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgY2IoZGF0YSwgZXJyKTtcbiAgICB9O1xuXG4gICAgc2NyaXB0LnNyYyA9IGAke3VybH0ke3NlcGFyYXRvcn1jYWxsYmFjaz0ke2NhbGxiYWNrfWA7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbG9hZFNjcmlwdChzcmMsIGNiKSB7XG4gICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgc2NyaXB0LnNyYyA9IHNyYztcbiAgICBzY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IGNiKG51bGwsIHNyYykpO1xuICAgIHNjcmlwdC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsICgpID0+IGNiKHRydWUsIHNyYykpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICByZXR1cm4gc2NyaXB0O1xufVxuIiwiY29uc3QgcGx1cyA9IC9cXCsvZzsgIC8vIG1hdGNoICcrJyBzeW1ib2xcbmNvbnN0IHNlYXJjaCA9IC8oW14mPV0rKT0/KFteJl0qKS9nO1xuXG5mdW5jdGlvbiBkZWNvZGUoc3RyKSB7XG4gICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChzdHIucmVwbGFjZShwbHVzLCAnICcpKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXJsUGFyYW1zKHF1ZXJ5KSB7XG4gICAgcXVlcnkgPSBxdWVyeSB8fCB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnNsaWNlKDEpO1xuXG4gICAgY29uc3QgcGFyYW1zID0ge307XG4gICAgbGV0IG1hdGNoID0gc2VhcmNoLmV4ZWMocXVlcnkpO1xuICAgIHdoaWxlIChtYXRjaCkge1xuICAgICAgICBwYXJhbXNbZGVjb2RlKG1hdGNoWzFdKV0gPSBkZWNvZGUobWF0Y2hbMl0pO1xuICAgICAgICBtYXRjaCA9IHNlYXJjaC5leGVjKHF1ZXJ5KTtcbiAgICB9XG4gICAgcmV0dXJuIHBhcmFtcztcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHhocih1cmwsIHR5cGUgPSAnanNvbicpIHtcbiAgICBjb25zdCBwID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBjb25zdCByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgcmVxLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcmVzcG9uc2UgPSByZXEucmVzcG9uc2U7XG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ2pzb24nICYmIHR5cGVvZiByZXNwb25zZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZSA9IEpTT04ucGFyc2UocmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXEuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoKSA9PiByZWplY3QocmVxLnN0YXR1cykpO1xuICAgICAgICByZXEub3BlbignR0VUJywgdXJsKTtcbiAgICAgICAgcmVxLnJlc3BvbnNlVHlwZSA9IHR5cGU7XG4gICAgICAgIC8vIHJlcS5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpO1xuICAgICAgICByZXEuc2VuZCgpO1xuICAgIH0pO1xuICAgIHJldHVybiBwO1xufVxuIiwiaW1wb3J0ICcuL3BvbHlmaWxsJztcbmltcG9ydCBhcnJheSBmcm9tICcuL2FycmF5JztcbmltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xuaW1wb3J0IGV2ZW50cyBmcm9tICcuL2V2ZW50cyc7XG5pbXBvcnQgZnBzIGZyb20gJy4vZnBzJztcbmltcG9ydCBmdWxsc2NyZWVuIGZyb20gJy4vZnVsbHNjcmVlbic7XG5pbXBvcnQgZ3JhcGhpY3MgZnJvbSAnLi9ncmFwaGljcyc7XG5pbXBvcnQgaHR0cCBmcm9tICcuL2h0dHAnO1xuaW1wb3J0IGlucHV0IGZyb20gJy4vaW5wdXQnO1xuaW1wb3J0IGxpbmtlZExpc3QgZnJvbSAnLi9saW5rZWQtbGlzdCc7XG5pbXBvcnQgbWF0aCBmcm9tICcuL21hdGgnO1xuaW1wb3J0IG1lZGlhIGZyb20gJy4vbWVkaWEnO1xuaW1wb3J0IG9iamVjdFBvb2wgZnJvbSAnLi9vYmplY3QtcG9vbCc7XG5pbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi9wbGF0Zm9ybSc7XG5pbXBvcnQgcG9wdXAgZnJvbSAnLi9wb3B1cCc7XG5pbXBvcnQgc2hhcmUgZnJvbSAnLi9zaGFyZSc7XG5pbXBvcnQgc3RvcmFnZSBmcm9tICcuL3N0b3JhZ2UnO1xuaW1wb3J0IHN0cmluZyBmcm9tICcuL3N0cmluZyc7XG5pbXBvcnQgdHJhY2sgZnJvbSAnLi90cmFjayc7XG5pbXBvcnQgdmlzaWJpbGl0eSBmcm9tICcuL3Zpc2liaWxpdHknO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYXJyYXksXG4gICAgZG9tLFxuICAgIGV2ZW50cyxcbiAgICBmcHMsXG4gICAgZnVsbHNjcmVlbixcbiAgICBncmFwaGljcyxcbiAgICBodHRwLFxuICAgIGlucHV0LFxuICAgIGxpbmtlZExpc3QsXG4gICAgbWF0aCxcbiAgICBtZWRpYSxcbiAgICBvYmplY3RQb29sLFxuICAgIHBsYXRmb3JtLFxuICAgIHBvcHVwLFxuICAgIHNoYXJlLFxuICAgIHN0b3JhZ2UsXG4gICAgc3RyaW5nLFxuICAgIHRyYWNrLFxuICAgIHZpc2liaWxpdHlcbn07XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjbGlja091dHNpZGUoZWwsIGNiKSB7XG4gICAgZnVuY3Rpb24gb25DbGlja091dHNpZGUoZXZlbnQpIHtcbiAgICAgICAgbGV0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgbGV0IGluc2lkZSA9IGZhbHNlO1xuXG4gICAgICAgIHdoaWxlICh0YXJnZXQgIT09IGRvY3VtZW50LmJvZHkpIHtcbiAgICAgICAgICAgIGlmICh0YXJnZXQgPT09IGVsKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgaW5zaWRlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnROb2RlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpbnNpZGUpIHtcbiAgICAgICAgICAgIGNiKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBvbkNsaWNrT3V0c2lkZSk7XG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0Jywgb25DbGlja091dHNpZGUpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZGVzdHJveSgpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgb25DbGlja091dHNpZGUpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0Jywgb25DbGlja091dHNpZGUpO1xuICAgICAgICB9XG4gICAgfTtcbn1cbiIsImltcG9ydCBjbGlja091dHNpZGUgZnJvbSAnLi9jbGlja091dHNpZGUnO1xuaW1wb3J0IGtleWJvYXJkIGZyb20gJy4va2V5Ym9hcmQnO1xuaW1wb3J0IGtleUlucHV0IGZyb20gJy4va2V5SW5wdXQnO1xuaW1wb3J0IG1pY3JvcGhvbmUgZnJvbSAnLi9taWNyb3Bob25lJztcbmltcG9ydCBtb3VzZUxlZnRXaW5kb3cgZnJvbSAnLi9tb3VzZUxlZnRXaW5kb3cnO1xuaW1wb3J0IG1vdXNlV2hlZWwgZnJvbSAnLi9tb3VzZVdoZWVsJztcbmltcG9ydCBwb2ludGVyQ29vcmRzIGZyb20gJy4vcG9pbnRlckNvb3Jkcyc7XG5pbXBvcnQgdG91Y2hJbnB1dCBmcm9tICcuL3RvdWNoSW5wdXQnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgY2xpY2tPdXRzaWRlLFxuICAgIGtleWJvYXJkLFxuICAgIGtleUlucHV0LFxuICAgIG1pY3JvcGhvbmUsXG4gICAgbW91c2VMZWZ0V2luZG93LFxuICAgIG1vdXNlV2hlZWwsXG4gICAgcG9pbnRlckNvb3JkcyxcbiAgICB0b3VjaElucHV0XG59O1xuIiwiaW1wb3J0IGFycmF5IGZyb20gJy4uL2FycmF5L2FycmF5JztcbmltcG9ydCBlbWl0dGVyIGZyb20gJy4uL2V2ZW50cy9lbWl0dGVyJztcbmltcG9ydCBrZXlib2FyZCBmcm9tICcuL2tleWJvYXJkJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ga2V5SW5wdXQoKSB7XG4gICAgY29uc3QgYXBpID0gT2JqZWN0LmNyZWF0ZShlbWl0dGVyLnByb3RvdHlwZSk7XG4gICAgY29uc3Qga2V5cyA9IGFycmF5KDI1NiwgZmFsc2UpO1xuXG4gICAgZnVuY3Rpb24gZW1pdEtleShrZXlDb2RlKSB7XG4gICAgICAgIGNvbnN0IGtleU5hbWUgPSBPYmplY3Qua2V5cyhrZXlib2FyZCkucmVkdWNlKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ga2V5Ym9hcmRba2V5XSA9PT0ga2V5Q29kZSA/IGtleSA6IHZhbHVlO1xuICAgICAgICB9LCAnJykudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgaWYgKGtleU5hbWUpIHtcbiAgICAgICAgICAgIGFwaS5lbWl0KGtleU5hbWUudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbktleURvd24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAga2V5c1tldmVudC5rZXlDb2RlXSA9IHRydWU7XG4gICAgICAgIGFwaS5lbWl0KCdrZXlkb3duJywgZXZlbnQua2V5Q29kZSk7XG4gICAgICAgIGVtaXRLZXkoZXZlbnQua2V5Q29kZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25LZXlVcChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBrZXlzW2V2ZW50LmtleUNvZGVdID0gZmFsc2U7XG4gICAgICAgIGFwaS5lbWl0KCdrZXl1cCcsIGV2ZW50LmtleUNvZGUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZCgpIHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uS2V5RG93biwgZmFsc2UpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIG9uS2V5VXAsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbktleURvd24pO1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXl1cCcsIG9uS2V5VXApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzRG93bihrZXkpIHtcbiAgICAgICAgcmV0dXJuIGtleXNba2V5XTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsZWZ0KCkge1xuICAgICAgICByZXR1cm4ga2V5c1trZXlib2FyZC5MRUZUXSB8fCBrZXlzW2tleWJvYXJkLkFdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJpZ2h0KCkge1xuICAgICAgICByZXR1cm4ga2V5c1trZXlib2FyZC5SSUdIVF0gfHwga2V5c1trZXlib2FyZC5EXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cCgpIHtcbiAgICAgICAgcmV0dXJuIGtleXNba2V5Ym9hcmQuVVBdIHx8IGtleXNba2V5Ym9hcmQuV107XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZG93bigpIHtcbiAgICAgICAgcmV0dXJuIGtleXNba2V5Ym9hcmQuRE9XTl0gfHwga2V5c1trZXlib2FyZC5TXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzcGFjZSgpIHtcbiAgICAgICAgcmV0dXJuIGtleXNba2V5Ym9hcmQuU1BBQ0VdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVuYWJsZSh2YWx1ZSA9IHRydWUpIHtcbiAgICAgICAgcmVtb3ZlKCk7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgYWRkKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGQoKTtcblxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKGFwaSwge1xuICAgICAgICBrZXlib2FyZCxcbiAgICAgICAgZW5hYmxlLFxuICAgICAgICBpc0Rvd24sXG4gICAgICAgIGxlZnQsXG4gICAgICAgIHJpZ2h0LFxuICAgICAgICB1cCxcbiAgICAgICAgZG93bixcbiAgICAgICAgc3BhY2VcbiAgICB9KTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IHtcbiAgICBBOiAnQScuY2hhckNvZGVBdCgwKSxcbiAgICBCOiAnQicuY2hhckNvZGVBdCgwKSxcbiAgICBDOiAnQycuY2hhckNvZGVBdCgwKSxcbiAgICBEOiAnRCcuY2hhckNvZGVBdCgwKSxcbiAgICBFOiAnRScuY2hhckNvZGVBdCgwKSxcbiAgICBGOiAnRicuY2hhckNvZGVBdCgwKSxcbiAgICBHOiAnRycuY2hhckNvZGVBdCgwKSxcbiAgICBIOiAnSCcuY2hhckNvZGVBdCgwKSxcbiAgICBJOiAnSScuY2hhckNvZGVBdCgwKSxcbiAgICBKOiAnSicuY2hhckNvZGVBdCgwKSxcbiAgICBLOiAnSycuY2hhckNvZGVBdCgwKSxcbiAgICBMOiAnTCcuY2hhckNvZGVBdCgwKSxcbiAgICBNOiAnTScuY2hhckNvZGVBdCgwKSxcbiAgICBOOiAnTicuY2hhckNvZGVBdCgwKSxcbiAgICBPOiAnTycuY2hhckNvZGVBdCgwKSxcbiAgICBQOiAnUCcuY2hhckNvZGVBdCgwKSxcbiAgICBROiAnUScuY2hhckNvZGVBdCgwKSxcbiAgICBSOiAnUicuY2hhckNvZGVBdCgwKSxcbiAgICBTOiAnUycuY2hhckNvZGVBdCgwKSxcbiAgICBUOiAnVCcuY2hhckNvZGVBdCgwKSxcbiAgICBVOiAnVScuY2hhckNvZGVBdCgwKSxcbiAgICBWOiAnVicuY2hhckNvZGVBdCgwKSxcbiAgICBXOiAnVycuY2hhckNvZGVBdCgwKSxcbiAgICBYOiAnWCcuY2hhckNvZGVBdCgwKSxcbiAgICBZOiAnWScuY2hhckNvZGVBdCgwKSxcbiAgICBaOiAnWicuY2hhckNvZGVBdCgwKSxcbiAgICBaRVJPOiAnMCcuY2hhckNvZGVBdCgwKSxcbiAgICBPTkU6ICcxJy5jaGFyQ29kZUF0KDApLFxuICAgIFRXTzogJzInLmNoYXJDb2RlQXQoMCksXG4gICAgVEhSRUU6ICczJy5jaGFyQ29kZUF0KDApLFxuICAgIEZPVVI6ICc0Jy5jaGFyQ29kZUF0KDApLFxuICAgIEZJVkU6ICc1Jy5jaGFyQ29kZUF0KDApLFxuICAgIFNJWDogJzYnLmNoYXJDb2RlQXQoMCksXG4gICAgU0VWRU46ICc3Jy5jaGFyQ29kZUF0KDApLFxuICAgIEVJR0hUOiAnOCcuY2hhckNvZGVBdCgwKSxcbiAgICBOSU5FOiAnOScuY2hhckNvZGVBdCgwKSxcbiAgICBOVU1QQURfMDogOTYsXG4gICAgTlVNUEFEXzE6IDk3LFxuICAgIE5VTVBBRF8yOiA5OCxcbiAgICBOVU1QQURfMzogOTksXG4gICAgTlVNUEFEXzQ6IDEwMCxcbiAgICBOVU1QQURfNTogMTAxLFxuICAgIE5VTVBBRF82OiAxMDIsXG4gICAgTlVNUEFEXzc6IDEwMyxcbiAgICBOVU1QQURfODogMTA0LFxuICAgIE5VTVBBRF85OiAxMDUsXG4gICAgTlVNUEFEX01VTFRJUExZOiAxMDYsXG4gICAgTlVNUEFEX0FERDogMTA3LFxuICAgIE5VTVBBRF9FTlRFUjogMTA4LFxuICAgIE5VTVBBRF9TVUJUUkFDVDogMTA5LFxuICAgIE5VTVBBRF9ERUNJTUFMOiAxMTAsXG4gICAgTlVNUEFEX0RJVklERTogMTExLFxuICAgIEYxOiAxMTIsXG4gICAgRjI6IDExMyxcbiAgICBGMzogMTE0LFxuICAgIEY0OiAxMTUsXG4gICAgRjU6IDExNixcbiAgICBGNjogMTE3LFxuICAgIEY3OiAxMTgsXG4gICAgRjg6IDExOSxcbiAgICBGOTogMTIwLFxuICAgIEYxMDogMTIxLFxuICAgIEYxMTogMTIyLFxuICAgIEYxMjogMTIzLFxuICAgIEYxMzogMTI0LFxuICAgIEYxNDogMTI1LFxuICAgIEYxNTogMTI2LFxuICAgIENPTE9OOiAxODYsXG4gICAgRVFVQUxTOiAxODcsXG4gICAgVU5ERVJTQ09SRTogMTg5LFxuICAgIFFVRVNUSU9OX01BUks6IDE5MSxcbiAgICBUSUxERTogMTkyLFxuICAgIE9QRU5fQlJBQ0tFVDogMjE5LFxuICAgIEJBQ0tXQVJEX1NMQVNIOiAyMjAsXG4gICAgQ0xPU0VEX0JSQUNLRVQ6IDIyMSxcbiAgICBRVU9URVM6IDIyMixcbiAgICBCQUNLU1BBQ0U6IDgsXG4gICAgVEFCOiA5LFxuICAgIENMRUFSOiAxMixcbiAgICBFTlRFUjogMTMsXG4gICAgU0hJRlQ6IDE2LFxuICAgIENPTlRST0w6IDE3LFxuICAgIEFMVDogMTgsXG4gICAgQ0FQU19MT0NLOiAyMCxcbiAgICBFU0M6IDI3LFxuICAgIFNQQUNFOiAzMixcbiAgICBQQUdFX1VQOiAzMyxcbiAgICBQQUdFX0RPV046IDM0LFxuICAgIEVORDogMzUsXG4gICAgSE9NRTogMzYsXG4gICAgTEVGVDogMzcsXG4gICAgVVA6IDM4LFxuICAgIFJJR0hUOiAzOSxcbiAgICBET1dOOiA0MCxcbiAgICBJTlNFUlQ6IDQ1LFxuICAgIERFTEVURTogNDYsXG4gICAgSEVMUDogNDcsXG4gICAgTlVNX0xPQ0s6IDE0NFxufTtcbiIsImltcG9ydCBlbWl0dGVyIGZyb20gJy4uL2V2ZW50cy9lbWl0dGVyJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWljcm9waG9uZSgpIHtcbiAgICBjb25zdCBtaWMgPSBPYmplY3QuY3JlYXRlKGVtaXR0ZXIucHJvdG90eXBlKTtcbiAgICBsZXQgc3RyZWFtID0gbnVsbDtcblxuICAgIGNvbnN0IGdldFVzZXJNZWRpYSA9IChuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhIHx8XG4gICAgICAgIG5hdmlnYXRvci53ZWJraXRHZXRVc2VyTWVkaWEgfHxcbiAgICAgICAgbmF2aWdhdG9yLm1vekdldFVzZXJNZWRpYSB8fFxuICAgICAgICBuYXZpZ2F0b3IubXNHZXRVc2VyTWVkaWEpO1xuXG4gICAgY29uc3QgaXNTdXBwb3J0ZWQgPSAhIWdldFVzZXJNZWRpYTtcblxuICAgIGZ1bmN0aW9uIGNvbm5lY3QoKSB7XG4gICAgICAgIGlmICghaXNTdXBwb3J0ZWQpIHtcbiAgICAgICAgICAgIG1pYy5lbWl0KCdlcnJvcicsICdOb3Qgc3VwcG9ydGVkJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZ2V0VXNlck1lZGlhKHtcbiAgICAgICAgICAgIGF1ZGlvOiB0cnVlXG4gICAgICAgIH0sIChtZWRpYVN0cmVhbSkgPT4ge1xuICAgICAgICAgICAgc3RyZWFtID0gbWVkaWFTdHJlYW07XG4gICAgICAgICAgICBtaWMuZW1pdCgnY29ubmVjdCcsIHN0cmVhbSk7XG4gICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZS5uYW1lID09PSAnUGVybWlzc2lvbkRlbmllZEVycm9yJyB8fCBlID09PSAnUEVSTUlTU0lPTl9ERU5JRUQnKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1Blcm1pc3Npb24gZGVuaWVkLiBVbmRvIGJ5IGNsaWNraW5nIHRoZSBjYW1lcmEgaWNvbiBpbiB0aGUgYWRkcmVzcyBiYXInKTtcbiAgICAgICAgICAgICAgICBtaWMuZW1pdCgnZGVuaWVkJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1pYy5lbWl0KCdlcnJvcicsIGUubWVzc2FnZSB8fCBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGlzY29ubmVjdCgpIHtcbiAgICAgICAgaWYgKHN0cmVhbSkge1xuICAgICAgICAgICAgc3RyZWFtLnN0b3AoKTtcbiAgICAgICAgICAgIHN0cmVhbSA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVXZWJBdWRpb1NvdXJjZSh3ZWJBdWRpb0NvbnRleHQsIGNvbm5lY3RUbykge1xuICAgICAgICBpZiAoIXN0cmVhbSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzb3VyY2UgPSB3ZWJBdWRpb0NvbnRleHQuY3JlYXRlTWVkaWFTdHJlYW1Tb3VyY2Uoc3RyZWFtKTtcblxuICAgICAgICBpZiAoY29ubmVjdFRvKSB7XG4gICAgICAgICAgICBzb3VyY2UuY29ubmVjdChjb25uZWN0VG8pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSEFDSzogc3RvcHMgbW96IGdhcmJhZ2UgY29sbGVjdGlvbiBraWxsaW5nIHRoZSBzdHJlYW1cbiAgICAgICAgLy8gc2VlIGh0dHBzOi8vc3VwcG9ydC5tb3ppbGxhLm9yZy9lbi1VUy9xdWVzdGlvbnMvOTg0MTc5XG4gICAgICAgIGlmIChuYXZpZ2F0b3IubW96R2V0VXNlck1lZGlhKSB7XG4gICAgICAgICAgICB3aW5kb3cuaGFja19mb3JfbW96aWxsYSA9IHNvdXJjZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzb3VyY2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24obWljLCB7XG4gICAgICAgIGNvbm5lY3QsXG4gICAgICAgIGRpc2Nvbm5lY3QsXG4gICAgICAgIGNyZWF0ZVdlYkF1ZGlvU291cmNlLFxuICAgICAgICBpc1N1cHBvcnRlZDogKCkgPT4gaXNTdXBwb3J0ZWQsXG4gICAgICAgIHN0cmVhbTogKCkgPT4gc3RyZWFtXG4gICAgfSk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtb3VzZUxlZnRXaW5kb3coY2IpIHtcbiAgICBmdW5jdGlvbiBoYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGZyb20gPSBldmVudC5yZWxhdGVkVGFyZ2V0IHx8IGV2ZW50LnRvRWxlbWVudDtcbiAgICAgICAgaWYgKCFmcm9tIHx8IGZyb20ubm9kZU5hbWUgPT09ICdIVE1MJykge1xuICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgaGFuZGxlciwgZmFsc2UpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZGVzdHJveSAoKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIGhhbmRsZXIpO1xuICAgICAgICB9XG4gICAgfTtcbn1cbiIsImltcG9ydCBlbWl0dGVyIGZyb20gJy4uL2V2ZW50cy9lbWl0dGVyJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbW91c2VXaGVlbChzcGVlZCkge1xuICAgIHNwZWVkID0gc3BlZWQgfHwgMjtcblxuICAgIGxldCB3aGVlbDtcblxuICAgIGZ1bmN0aW9uIHdoZWVsSGFuZGxlcihldmVudCkge1xuICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSAoZXZlbnQuZGV0YWlsIDwgMCB8fCBldmVudC53aGVlbERlbHRhID4gMCkgPyAxIDogLTE7XG4gICAgICAgIGNvbnN0IGRlbHRhID0gZGlyZWN0aW9uICogc3BlZWQ7XG5cbiAgICAgICAgaWYgKGRpcmVjdGlvbiA+IDApIHtcbiAgICAgICAgICAgIHdoZWVsLmVtaXQoJ3VwJywgZGVsdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2hlZWwuZW1pdCgnZG93bicsIGRlbHRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdoZWVsLmVtaXQoJ3VwZGF0ZScsIGRlbHRhKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGQoKSB7XG4gICAgICAgIGlmICgnb25tb3VzZXdoZWVsJyBpbiB3aW5kb3cpIHtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXdoZWVsJywgd2hlZWxIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSBpZiAod2luZG93LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Nb3VzZVNjcm9sbCcsIHdoZWVsSGFuZGxlciwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgICBpZiAoJ29ubW91c2V3aGVlbCcgaW4gd2luZG93KSB7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V3aGVlbCcsIHdoZWVsSGFuZGxlciwgZmFsc2UpO1xuICAgICAgICB9IGVsc2UgaWYgKHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignRE9NTW91c2VTY3JvbGwnLCB3aGVlbEhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZCgpO1xuXG4gICAgd2hlZWwgPSBPYmplY3QuY3JlYXRlKGVtaXR0ZXIucHJvdG90eXBlLCB7XG4gICAgICAgIF9ldmVudHM6IHtcbiAgICAgICAgICAgIHZhbHVlOiB7fVxuICAgICAgICB9LFxuICAgICAgICBhZGQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiBhZGRcbiAgICAgICAgfSxcbiAgICAgICAgcmVtb3ZlOiB7XG4gICAgICAgICAgICB2YWx1ZTogcmVtb3ZlXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBPYmplY3QuZnJlZXplKHdoZWVsKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBvaW50ZXJDb29yZHMoKSB7XG4gICAgbGV0IHNlbGY7XG5cbiAgICBmdW5jdGlvbiBjYWxjdWxhdGVDb29yZHMoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgcFggPSBldmVudC5jbGllbnRYIHx8IDA7XG4gICAgICAgIGNvbnN0IHBZID0gZXZlbnQuY2xpZW50WSB8fCAwO1xuICAgICAgICBjb25zdCBzWCA9IHdpbmRvdy5wYWdlWE9mZnNldDtcbiAgICAgICAgY29uc3Qgc1kgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XG4gICAgICAgIHNlbGYueCA9IHBYICsgc1g7XG4gICAgICAgIHNlbGYueSA9IHBZICsgc1k7XG4gICAgICAgIHNlbGYucGVyY2VudFggPSBzZWxmLnggLyB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgc2VsZi5wZXJjZW50WSA9IHNlbGYueSAvIHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICB9XG5cbiAgICBzZWxmID0ge1xuICAgICAgICB4OiAwLFxuICAgICAgICB5OiAwLFxuICAgICAgICBwZXJjZW50WDogMCxcbiAgICAgICAgcGVyY2VudFk6IDAsXG4gICAgICAgIGlzTGlzdGVuaW5nOiBmYWxzZSxcblxuICAgICAgICBvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGNhbGN1bGF0ZUNvb3Jkcyk7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIGNhbGN1bGF0ZUNvb3Jkcyk7XG4gICAgICAgICAgICBzZWxmLmlzTGlzdGVuaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuICAgICAgICBvZmY6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBjYWxjdWxhdGVDb29yZHMpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBjYWxjdWxhdGVDb29yZHMpO1xuICAgICAgICAgICAgc2VsZi5pc0xpc3RlbmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBzZWxmO1xufVxuIiwiaW1wb3J0IGVtaXR0ZXIgZnJvbSAnLi4vZXZlbnRzL2VtaXR0ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0b3VjaElucHV0KGVsKSB7XG4gICAgZWwgPSBlbCB8fCBkb2N1bWVudC5ib2R5O1xuXG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgc3RhcnQ6IFstMSwgLTFdLFxuICAgICAgICBtb3ZlOiBbLTEsIC0xXSxcbiAgICAgICAgZW5kOiBbLTEsIC0xXSxcbiAgICAgICAgcG9zaXRpb246IFstMSwgLTFdLFxuICAgICAgICBkaXN0YW5jZTogWzAsIDBdLFxuICAgICAgICBkaXJlY3Rpb246IFsnbm9uZScsICdub25lJ10sXG4gICAgICAgIHRvdWNoaW5nOiBmYWxzZSxcbiAgICAgICAgb3JpZ2luYWxFdmVudDogbnVsbFxuICAgIH07XG5cbiAgICBsZXQgc2VsZjtcblxuICAgIGZ1bmN0aW9uIHRvdWNoSGFuZGxlcihldmVudCkge1xuICAgICAgICBpZiAoIShldmVudCAmJiBldmVudC50b3VjaGVzKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGRhdGEub3JpZ2luYWxFdmVudCA9IGV2ZW50O1xuICAgICAgICBjb25zdCB0b3VjaCA9IGV2ZW50LnRvdWNoZXNbMF07XG4gICAgICAgIGNvbnN0IHggPSB0b3VjaCAmJiB0b3VjaC5wYWdlWDtcbiAgICAgICAgY29uc3QgeSA9IHRvdWNoICYmIHRvdWNoLnBhZ2VZO1xuXG4gICAgICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAndG91Y2hzdGFydCc6XG4gICAgICAgICAgICAgICAgZGF0YS5zdGFydFswXSA9IGRhdGEubW92ZVswXSA9IGRhdGEuZW5kWzBdID0gZGF0YS5wb3NpdGlvblswXSA9IHg7XG4gICAgICAgICAgICAgICAgZGF0YS5zdGFydFsxXSA9IGRhdGEubW92ZVsxXSA9IGRhdGEuZW5kWzFdID0gZGF0YS5wb3NpdGlvblsxXSA9IHk7XG4gICAgICAgICAgICAgICAgZGF0YS50b3VjaGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgc2VsZi5lbWl0KCdzdGFydCcsIGRhdGEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAndG91Y2htb3ZlJzpcbiAgICAgICAgICAgICAgICBkYXRhLm1vdmVbMF0gPSBkYXRhLnBvc2l0aW9uWzBdID0geDtcbiAgICAgICAgICAgICAgICBkYXRhLm1vdmVbMV0gPSBkYXRhLnBvc2l0aW9uWzFdID0geTtcbiAgICAgICAgICAgICAgICBzZWxmLmVtaXQoJ21vdmUnLCBkYXRhKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3RvdWNoZW5kJzpcbiAgICAgICAgICAgICAgICBkYXRhLmVuZFswXSA9IGRhdGEucG9zaXRpb25bMF0gPSB4O1xuICAgICAgICAgICAgICAgIGRhdGEuZW5kWzFdID0gZGF0YS5wb3NpdGlvblsxXSA9IHk7XG4gICAgICAgICAgICAgICAgZGF0YS50b3VjaGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHNlbGYuZW1pdCgnZW5kJywgZGF0YSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OiBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpc3RlbihlbGVtKSB7XG4gICAgICAgIGVsID0gZWxlbSB8fCBlbDtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRvdWNoSGFuZGxlcik7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRvdWNoSGFuZGxlcik7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdG91Y2hIYW5kbGVyKTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICAgc2VsZi5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRvdWNoSGFuZGxlcik7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRvdWNoSGFuZGxlcik7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdG91Y2hIYW5kbGVyKTtcbiAgICAgICAgZWwgPSBudWxsO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9XG5cbiAgICBsaXN0ZW4oZWwpO1xuXG4gICAgc2VsZiA9IE9iamVjdC5jcmVhdGUoZW1pdHRlci5wcm90b3R5cGUsIHtcbiAgICAgICAgX2V2ZW50czoge1xuICAgICAgICAgICAgdmFsdWU6IHt9XG4gICAgICAgIH0sXG4gICAgICAgIGxpc3Rlbjoge1xuICAgICAgICAgICAgdmFsdWU6IGxpc3RlblxuICAgICAgICB9LFxuICAgICAgICBpc0Rvd246IHtcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS50b3VjaGluZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZ2V0VG91Y2g6IHtcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZGVzdHJveToge1xuICAgICAgICAgICAgdmFsdWU6IGRlc3Ryb3lcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUoc2VsZik7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsaW5rZWRMaXN0KGFyciA9IFtdKSB7XG5cbiAgICBsZXQgZmlyc3QsXG4gICAgICAgIGxhc3Q7XG5cbiAgICAvKlxuICAgICAgICBpdGVtID0ge1xuICAgICAgICAgICAgJ25leHQnOiBudWxsLFxuICAgICAgICAgICAgJ3ByZXYnOiBudWxsXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaXRlbSA9IGxpbmtlZExpc3QuZ2V0Rmlyc3QoKTtcbiAgICAgICAgd2hpbGUoaXRlbSkge1xuICAgICAgICAgICAgLy8gZG8gc3R1ZmZcbiAgICAgICAgICAgIGl0ZW0gPSBpdGVtLm5leHQ7XG4gICAgICAgIH1cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gcmVtb3ZlKGl0ZW0pIHtcbiAgICAgICAgaWYgKGl0ZW0ubmV4dCkge1xuICAgICAgICAgICAgaXRlbS5uZXh0LnByZXYgPSBpdGVtLnByZXY7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGl0ZW0ucHJldikge1xuICAgICAgICAgICAgaXRlbS5wcmV2Lm5leHQgPSBpdGVtLm5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGl0ZW0gPT09IGZpcnN0KSB7XG4gICAgICAgICAgICBmaXJzdCA9IGl0ZW0ubmV4dDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXRlbSA9PT0gbGFzdCkge1xuICAgICAgICAgICAgbGFzdCA9IGl0ZW0ucHJldjtcbiAgICAgICAgfVxuICAgICAgICBpdGVtLm5leHQgPSBpdGVtLnByZXYgPSBudWxsO1xuXG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc2VydEFmdGVyKGl0ZW0sIGFmdGVyKSB7XG4gICAgICAgIHJlbW92ZShpdGVtKTtcblxuICAgICAgICBpdGVtLnByZXYgPSBhZnRlcjtcbiAgICAgICAgaXRlbS5uZXh0ID0gYWZ0ZXIubmV4dDtcblxuICAgICAgICBpZiAoIWFmdGVyLm5leHQpIHtcbiAgICAgICAgICAgIGxhc3QgPSBpdGVtO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWZ0ZXIubmV4dC5wcmV2ID0gaXRlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFmdGVyLm5leHQgPSBpdGVtO1xuXG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc2VydEJlZm9yZShpdGVtLCBiZWZvcmUpIHtcbiAgICAgICAgcmVtb3ZlKGl0ZW0pO1xuXG4gICAgICAgIGl0ZW0ucHJldiA9IGJlZm9yZS5wcmV2O1xuICAgICAgICBpdGVtLm5leHQgPSBiZWZvcmU7XG5cbiAgICAgICAgaWYgKCFiZWZvcmUucHJldikge1xuICAgICAgICAgICAgZmlyc3QgPSBpdGVtO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYmVmb3JlLnByZXYubmV4dCA9IGl0ZW07XG4gICAgICAgIH1cblxuICAgICAgICBiZWZvcmUucHJldiA9IGl0ZW07XG5cbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkKGl0ZW0pIHtcbiAgICAgICAgaWYgKCFmaXJzdCkge1xuICAgICAgICAgICAgZmlyc3QgPSBsYXN0ID0gaXRlbTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBpID0gZmlyc3Q7XG4gICAgICAgICAgICB3aGlsZSAoaS5uZXh0KSB7XG4gICAgICAgICAgICAgICAgaSA9IGkubmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluc2VydEFmdGVyKGl0ZW0sIGkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvckVhY2goZm4pIHtcbiAgICAgICAgbGV0IGl0ZW0gPSBmaXJzdDtcbiAgICAgICAgd2hpbGUgKGl0ZW0pIHtcbiAgICAgICAgICAgIGZuKGl0ZW0pO1xuICAgICAgICAgICAgaXRlbSA9IGl0ZW0ubmV4dDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1hcChmbikge1xuICAgICAgICBjb25zdCBsaXN0ID0gbGlua2VkTGlzdCgpO1xuICAgICAgICBsZXQgaXRlbSA9IGZpcnN0O1xuICAgICAgICB3aGlsZSAoaXRlbSkge1xuICAgICAgICAgICAgbGlzdC5hZGQoZm4oaXRlbSkpO1xuICAgICAgICAgICAgaXRlbSA9IGl0ZW0ubmV4dDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGlzdDtcbiAgICB9XG5cbiAgICBhcnIuZm9yRWFjaCgoaXRlbSkgPT4gYWRkKGl0ZW0pKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGdldCBmaXJzdCAoKSB7XG4gICAgICAgICAgICByZXR1cm4gZmlyc3Q7XG4gICAgICAgIH0sXG4gICAgICAgIGdldEZpcnN0ICgpIHtcbiAgICAgICAgICAgIHJldHVybiBmaXJzdDtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IGxhc3QgKCkge1xuICAgICAgICAgICAgcmV0dXJuIGxhc3Q7XG4gICAgICAgIH0sXG4gICAgICAgIGdldExhc3QgKCkge1xuICAgICAgICAgICAgcmV0dXJuIGxhc3Q7XG4gICAgICAgIH0sXG4gICAgICAgIGdldCBsZW5ndGggKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q291bnQoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0Q291bnQgKCkge1xuICAgICAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgICAgIGxldCBpID0gZmlyc3Q7XG4gICAgICAgICAgICB3aGlsZSAoaSkge1xuICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICAgICAgaSA9IGkubmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb3VudDtcbiAgICAgICAgfSxcbiAgICAgICAgYWRkLFxuICAgICAgICByZW1vdmUsXG4gICAgICAgIGluc2VydEFmdGVyLFxuICAgICAgICBpbnNlcnRCZWZvcmUsXG4gICAgICAgIGZvckVhY2gsXG4gICAgICAgIG1hcFxuICAgIH07XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhbmdsZSh4MSwgeTEsIHgyLCB5Mikge1xuICAgIGNvbnN0IGR4ID0geDIgLSB4MTtcbiAgICBjb25zdCBkeSA9IHkyIC0geTE7XG4gICAgcmV0dXJuIE1hdGguYXRhbjIoZHksIGR4KTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNlcnAoZnJvbSwgdG8sIHdlaWdodCA9IDAuMykge1xuICAgIGNvbnN0IGYgPSAoMSAtIE1hdGguY29zKHdlaWdodCAqIE1hdGguUEkpKSAvIDI7XG4gICAgcmV0dXJuIChmcm9tICogKDEgLSBmKSArIHRvICogZik7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjaXJjbGVEaXN0cmlidXRpb24ocmFkaXVzLCBvcmlnaW4gPSB7eDogMCwgeTogMH0sIHAgPSB7eDogMCwgeTogMH0pIHtcbiAgICBjb25zdCByID0gTWF0aC5zcXJ0KE1hdGgucmFuZG9tKCkpICogcmFkaXVzO1xuICAgIGNvbnN0IHRoZXRhID0gTWF0aC5yYW5kb20oKSAqIE1hdGguUEkgKiAyO1xuICAgIHAueCA9IG9yaWdpbi54ICsgTWF0aC5jb3ModGhldGEpICogcjtcbiAgICBwLnkgPSBvcmlnaW4ueSArIE1hdGguc2luKHRoZXRhKSAqIHI7XG4gICAgcmV0dXJuIHA7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjbGFtcCh2YWx1ZSwgbWluLCBtYXgpIHtcbiAgICBpZiAobWluID4gbWF4KSB7XG4gICAgICAgIGNvbnN0IGEgPSBtaW47XG4gICAgICAgIG1pbiA9IG1heDtcbiAgICAgICAgbWF4ID0gYTtcbiAgICB9XG4gICAgaWYgKHZhbHVlIDwgbWluKSB7XG4gICAgICAgIHJldHVybiBtaW47XG4gICAgfVxuICAgIGlmICh2YWx1ZSA+IG1heCkge1xuICAgICAgICByZXR1cm4gbWF4O1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb2luVG9zcyhoZWFkcyA9IHRydWUsIHRhaWxzID0gZmFsc2UpIHtcbiAgICByZXR1cm4gTWF0aC5yYW5kb20oKSA+IDAuNSA/IGhlYWRzIDogdGFpbHM7XG59XG4iLCIvKlxuVGhlIHNpZ24gdGVsbHMgdXMgaWYgYSBpcyB0byB0aGUgbGVmdCAoLSkgb3IgdGhlIHJpZ2h0ICgrKSBvZiBiXG4qL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3Jvc3NQcm9kdWN0MmQoYVgsIGFZLCBiWCwgYlkpIHtcbiAgICByZXR1cm4gYVggKiBiWSAtIGFZICogYlg7XG59XG4iLCJjb25zdCBERUcgPSAxODAgLyBNYXRoLlBJO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZWdyZWVzKHJhZGlhbnMpIHtcbiAgICByZXR1cm4gcmFkaWFucyAqIERFRztcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRpZmZlcmVuY2UoYSwgYikge1xuICAgIHJldHVybiBNYXRoLmFicyhhIC0gYik7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkaXN0YW5jZSh4MSwgeTEsIHgyLCB5Mikge1xuICAgIGNvbnN0IGR4ID0geDEgLSB4MjtcbiAgICBjb25zdCBkeSA9IHkxIC0geTI7XG4gICAgcmV0dXJuIE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkaXN0YW5jZVNRKHgxLCB5MSwgeDIsIHkyKSB7XG4gICAgY29uc3QgZHggPSB4MSAtIHgyO1xuICAgIGNvbnN0IGR5ID0geTEgLSB5MjtcbiAgICByZXR1cm4gZHggKiBkeCArIGR5ICogZHk7XG59XG4iLCIvKlxuLSBJZiBBIGFuZCBCIGFyZSBwZXJwZW5kaWN1bGFyIChhdCA5MCBkZWdyZWVzIHRvIGVhY2ggb3RoZXIpLCB0aGUgcmVzdWx0XG5vZiB0aGUgZG90IHByb2R1Y3Qgd2lsbCBiZSB6ZXJvLCBiZWNhdXNlIGNvcyjOmCkgd2lsbCBiZSB6ZXJvLlxuLSBJZiB0aGUgYW5nbGUgYmV0d2VlbiBBIGFuZCBCIGFyZSBsZXNzIHRoYW4gOTAgZGVncmVlcywgdGhlIGRvdCBwcm9kdWN0XG53aWxsIGJlIHBvc2l0aXZlIChncmVhdGVyIHRoYW4gemVybyksIGFzIGNvcyjOmCkgd2lsbCBiZSBwb3NpdGl2ZSwgYW5kXG50aGUgdmVjdG9yIGxlbmd0aHMgYXJlIGFsd2F5cyBwb3NpdGl2ZSB2YWx1ZXMuXG4tIElmIHRoZSBhbmdsZSBiZXR3ZWVuIEEgYW5kIEIgYXJlIGdyZWF0ZXIgdGhhbiA5MCBkZWdyZWVzLCB0aGUgZG90XG5wcm9kdWN0IHdpbGwgYmUgbmVnYXRpdmUgKGxlc3MgdGhhbiB6ZXJvKSwgYXMgY29zKM6YKSB3aWxsIGJlIG5lZ2F0aXZlLFxuYW5kIHRoZSB2ZWN0b3IgbGVuZ3RocyBhcmUgYWx3YXlzIHBvc2l0aXZlIHZhbHVlc1xuKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRvdFByb2R1Y3QyZChhWCwgYVksIGJYLCBiWSkge1xuICAgIHJldHVybiBhWCAqIGJYICsgYVkgKiBiWTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldENpcmNsZVBvaW50cyhvcmlnaW5YLCBvcmlnaW5ZLCByYWRpdXMsIGNvdW50LCBzdGFydCwgQ2xhc3MpIHtcbiAgICBpZiAodHlwZW9mIHN0YXJ0ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBzdGFydCA9IC1NYXRoLlBJIC8gMjtcbiAgICB9XG5cbiAgICBjb25zdCBwb2ludHMgPSBbXSxcbiAgICAgICAgY2lyYyA9IE1hdGguUEkgKiAyLFxuICAgICAgICBpbmNyID0gY2lyYyAvIGNvdW50O1xuXG4gICAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgY2lyYyArIHN0YXJ0OyBpICs9IGluY3IpIHtcbiAgICAgICAgY29uc3Qgb2IgPSB0eXBlb2YgQ2xhc3MgPT09ICd1bmRlZmluZWQnID8ge30gOiBuZXcgQ2xhc3MoKTtcbiAgICAgICAgb2IueCA9IG9yaWdpblggKyByYWRpdXMgKiBNYXRoLmNvcyhpKTtcbiAgICAgICAgb2IueSA9IG9yaWdpblkgKyByYWRpdXMgKiBNYXRoLnNpbihpKTtcbiAgICAgICAgcG9pbnRzLnB1c2gob2IpO1xuICAgIH1cblxuICAgIHJldHVybiBwb2ludHM7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRJbnRlcnNlY3Rpb25BcmVhKGFYLCBhWSwgYVcsIGFILCBiWCwgYlksIGJXLCBiSCkge1xuICAgIGNvbnN0IG92ZXJsYXBYID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oYVggKyBhVywgYlggKyBiVykgLSBNYXRoLm1heChhWCwgYlgpKTtcbiAgICBjb25zdCBvdmVybGFwWSA9IE1hdGgubWF4KDAsIE1hdGgubWluKGFZICsgYUgsIGJZICsgYkgpIC0gTWF0aC5tYXgoYVksIGJZKSk7XG4gICAgcmV0dXJuIG92ZXJsYXBYICogb3ZlcmxhcFk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRPdmVybGFwWChhWCwgYVcsIGJYLCBiVykge1xuICAgIHJldHVybiBNYXRoLm1heCgwLCBNYXRoLm1pbihhWCArIGFXLCBiWCArIGJXKSAtIE1hdGgubWF4KGFYLCBiWCkpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0T3ZlcmxhcFkoYVksIGFILCBiWSwgYkgpIHtcbiAgICByZXR1cm4gTWF0aC5tYXgoMCwgTWF0aC5taW4oYVkgKyBhSCwgYlkgKyBiSCkgLSBNYXRoLm1heChhWSwgYlkpKTtcbn1cbiIsImltcG9ydCBhbmdsZSBmcm9tICcuL2FuZ2xlJztcbmltcG9ydCBjZXJwIGZyb20gJy4vY2VycCc7XG5pbXBvcnQgY2lyY2xlRGlzdHJpYnV0aW9uIGZyb20gJy4vY2lyY2xlRGlzdHJpYnV0aW9uJztcbmltcG9ydCBjbGFtcCBmcm9tICcuL2NsYW1wJztcbmltcG9ydCBjb2luVG9zcyBmcm9tICcuL2NvaW5Ub3NzJztcbmltcG9ydCBjcm9zc1Byb2R1Y3QyZCBmcm9tICcuL2Nyb3NzUHJvZHVjdDJkJztcbmltcG9ydCBkZWdyZWVzIGZyb20gJy4vZGVncmVlcyc7XG5pbXBvcnQgZGlmZmVyZW5jZSBmcm9tICcuL2RpZmZlcmVuY2UnO1xuaW1wb3J0IGRpc3RhbmNlIGZyb20gJy4vZGlzdGFuY2UnO1xuaW1wb3J0IGRpc3RhbmNlU3EgZnJvbSAnLi9kaXN0YW5jZVNxJztcbmltcG9ydCBkb3RQcm9kdWN0MmQgZnJvbSAnLi9kb3RQcm9kdWN0MmQnO1xuaW1wb3J0IGdldENpcmNsZVBvaW50cyBmcm9tICcuL2dldENpcmNsZVBvaW50cyc7XG5pbXBvcnQgZ2V0SW50ZXJzZWN0aW9uQXJlYSBmcm9tICcuL2dldEludGVyc2VjdGlvbkFyZWEnO1xuaW1wb3J0IGdldE92ZXJsYXBYIGZyb20gJy4vZ2V0T3ZlcmxhcFgnO1xuaW1wb3J0IGdldE92ZXJsYXBZIGZyb20gJy4vZ2V0T3ZlcmxhcFknO1xuaW1wb3J0IGxlcnAgZnJvbSAnLi9sZXJwJztcbmltcG9ydCBtYXAgZnJvbSAnLi9tYXAnO1xuaW1wb3J0IG5vcm1hbGl6ZSBmcm9tICcuL25vcm1hbGl6ZSc7XG5pbXBvcnQgb3JpZW50YXRpb24gZnJvbSAnLi9vcmllbnRhdGlvbic7XG5pbXBvcnQgcGVyY2VudFJlbWFpbmluZyBmcm9tICcuL3BlcmNlbnRSZW1haW5pbmcnO1xuaW1wb3J0IHJhZGlhbnMgZnJvbSAnLi9yYWRpYW5zJztcbmltcG9ydCByYW5kb20gZnJvbSAnLi9yYW5kb20nO1xuaW1wb3J0IHJhbmRvbUludCBmcm9tICcuL3JhbmRvbUludCc7XG5pbXBvcnQgcmFuZG9tU2lnbiBmcm9tICcuL3JhbmRvbVNpZ24nO1xuaW1wb3J0IHJvdGF0ZVBvaW50IGZyb20gJy4vcm90YXRlUG9pbnQnO1xuaW1wb3J0IHJvdGF0ZVRvRGVnIGZyb20gJy4vcm90YXRlVG9EZWcnO1xuaW1wb3J0IHJvdGF0ZVRvUmFkIGZyb20gJy4vcm90YXRlVG9SYWQnO1xuaW1wb3J0IHJvdW5kVG8gZnJvbSAnLi9yb3VuZFRvJztcbmltcG9ydCByb3VuZFRvTmVhcmVzdCBmcm9tICcuL3JvdW5kVG9OZWFyZXN0JztcbmltcG9ydCBzaXplIGZyb20gJy4vc2l6ZSc7XG5pbXBvcnQgc21lcnAgZnJvbSAnLi9zbWVycCc7XG5pbXBvcnQgc21vb3Roc3RlcCBmcm9tICcuL3Ntb290aHN0ZXAnO1xuaW1wb3J0IHNwbGl0VmFsdWVBbmRVbml0IGZyb20gJy4vc3BsaXRWYWx1ZUFuZFVuaXQnO1xuaW1wb3J0IHdlaWdodGVkQXZlcmFnZSBmcm9tICcuL3dlaWdodGVkQXZlcmFnZSc7XG5pbXBvcnQgd2VpZ2h0ZWREaXN0cmlidXRpb24gZnJvbSAnLi93ZWlnaHRlZERpc3RyaWJ1dGlvbic7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBhbmdsZSxcbiAgICBjZXJwLFxuICAgIGNpcmNsZURpc3RyaWJ1dGlvbixcbiAgICBjbGFtcCxcbiAgICBjb2luVG9zcyxcbiAgICBjcm9zc1Byb2R1Y3QyZCxcbiAgICBkZWdyZWVzLFxuICAgIGRpZmZlcmVuY2UsXG4gICAgZGlzdGFuY2UsXG4gICAgZGlzdGFuY2VTcSxcbiAgICBkb3RQcm9kdWN0MmQsXG4gICAgZ2V0Q2lyY2xlUG9pbnRzLFxuICAgIGdldEludGVyc2VjdGlvbkFyZWEsXG4gICAgZ2V0T3ZlcmxhcFgsXG4gICAgZ2V0T3ZlcmxhcFksXG4gICAgbGVycCxcbiAgICBtYXAsXG4gICAgbm9ybWFsaXplLFxuICAgIG9yaWVudGF0aW9uLFxuICAgIHBlcmNlbnRSZW1haW5pbmcsXG4gICAgcmFkaWFucyxcbiAgICByYW5kb20sXG4gICAgcmFuZG9tSW50LFxuICAgIHJhbmRvbVNpZ24sXG4gICAgcm90YXRlUG9pbnQsXG4gICAgcm90YXRlVG9EZWcsXG4gICAgcm90YXRlVG9SYWQsXG4gICAgcm91bmRUbyxcbiAgICByb3VuZFRvTmVhcmVzdCxcbiAgICBzbWVycCxcbiAgICBzbW9vdGhzdGVwLFxuICAgIHNpemUsXG4gICAgc3BsaXRWYWx1ZUFuZFVuaXQsXG4gICAgd2VpZ2h0ZWRBdmVyYWdlLFxuICAgIHdlaWdodGVkRGlzdHJpYnV0aW9uXG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbGVycChmcm9tLCB0bywgd2VpZ2h0ID0gMC4zKSB7XG4gICAgcmV0dXJuIGZyb20gKyAodG8gLSBmcm9tKSAqIHdlaWdodDtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1hcCh2LCBhLCBiLCB4LCB5KSB7XG4gICAgLy8gdmFsdWUsIG1pbiBleHBlY3RlZCwgbWF4IGV4cGVjdGVkLCBtYXAgbWluLCBtYXAgbWF4XG4gICAgLy8gZS5nLiBtYXAgc29tZSB2YWx1ZSBiZXR3ZWVuIDAgdG8gMTAwIHRvIC01MCB0byA1MFxuICAgIC8vIG1hcCg1MCwgMCwgMTAwLCAtNTAsIDUwKSAvLyAwXG4gICAgLy8gbWFwKDI1LCAwLCAxMDAsIC01MCwgNTApIC8vIC0yNVxuICAgIHJldHVybiAodiA9PT0gYSkgPyB4IDogKHYgLSBhKSAqICh5IC0geCkgLyAoYiAtIGEpICsgeDtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG5vcm1hbGl6ZSh2YWx1ZSwgbWluLCBtYXgpIHtcbiAgICByZXR1cm4gKHZhbHVlIC0gbWluKSAvIChtYXggLSBtaW4pO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb3JpZW50YXRpb24oeCwgeSkge1xuICAgIHJldHVybiBNYXRoLmF0YW4yKHksIHgpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGVyY2VudFJlbWFpbmluZyh2YWx1ZSwgdG90YWwpIHtcbiAgICByZXR1cm4gKHZhbHVlICUgdG90YWwpIC8gdG90YWw7XG59XG4iLCJjb25zdCBSQUQgPSBNYXRoLlBJIC8gMTgwO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByYWRpYW5zKGRlZ3JlZXMpIHtcbiAgICByZXR1cm4gZGVncmVlcyAqIFJBRDtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJhbmRvbShtaW4sIG1heCkge1xuICAgIGlmIChpc05hTihtYXgpKSB7XG4gICAgICAgIG1heCA9IG1pbjtcbiAgICAgICAgbWluID0gMDtcbiAgICB9XG4gICAgcmV0dXJuIG1pbiArIE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJhbmRvbUludChtaW4sIG1heCkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKG1pbiArIE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmFuZG9tU2lnbigpIHtcbiAgICByZXR1cm4gTWF0aC5yYW5kb20oKSA+IDAuNSA/IC0xIDogMTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJvdGF0ZVBvaW50KHAsIHRoZXRhLCBvcmlnaW4gPSB7eDogMCwgeTogMH0sIHAxID0ge3g6IDAsIHk6IDB9KSB7XG4gICAgY29uc3Qgc2luVGhldGEgPSBNYXRoLnNpbih0aGV0YSk7XG4gICAgY29uc3QgY29zVGhldGEgPSBNYXRoLmNvcyh0aGV0YSk7XG4gICAgcDEueCA9IChwLnggLSBvcmlnaW4ueCkgKiBjb3NUaGV0YSAtIChwLnkgLSBvcmlnaW4ueSkgKiBzaW5UaGV0YTtcbiAgICBwMS55ID0gKHAueCAtIG9yaWdpbi54KSAqIHNpblRoZXRhICsgKHAueSAtIG9yaWdpbi55KSAqIGNvc1RoZXRhO1xuICAgIHAxLnggKz0gb3JpZ2luLng7XG4gICAgcDEueSArPSBvcmlnaW4ueTtcbiAgICByZXR1cm4gcDE7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByb3RhdGVUb0RlZyhzdGFydCwgZW5kKSB7XG4gICAgbGV0IGRpZmYgPSAoZW5kIC0gc3RhcnQpICUgMzYwO1xuICAgIGlmIChkaWZmICE9PSBkaWZmICUgMTgwKSB7XG4gICAgICAgIGRpZmYgPSAoZGlmZiA8IDApID8gZGlmZiArIDM2MCA6IGRpZmYgLSAzNjA7XG4gICAgfVxuICAgIHJldHVybiBzdGFydCArIGRpZmY7XG59XG4iLCJjb25zdCBQSTIgPSBNYXRoLlBJICogMjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcm90YXRlVG9SQUQoc3RhcnQsIGVuZCkge1xuICAgIGxldCBkaWZmID0gKGVuZCAtIHN0YXJ0KSAlIFBJMjtcbiAgICBpZiAoZGlmZiAhPT0gZGlmZiAlIE1hdGguUEkpIHtcbiAgICAgICAgZGlmZiA9IGRpZmYgPCAwID8gZGlmZiArIFBJMiA6IGRpZmYgLSBQSTI7XG4gICAgfVxuICAgIHJldHVybiBzdGFydCArIGRpZmY7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByb3VuZFRvKHgsIHBsYWNlcyA9IDIpIHtcbiAgICBjb25zdCBkaXYgPSBNYXRoLnBvdygxMCwgcGxhY2VzKTtcbiAgICByZXR1cm4gTWF0aC5yb3VuZCh4ICogZGl2KSAvIGRpdjtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJvdW5kVG9OZWFyZXN0KHZhbHVlLCB1bml0KSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQodmFsdWUgLyB1bml0KSAqIHVuaXQ7XG59XG4iLCJmdW5jdGlvbiBnZXRTY2FsZShtZXRob2QsIHdpZHRoLCBoZWlnaHQsIGFyZWFXaWR0aCwgYXJlYUhlaWdodCkge1xuICAgIHN3aXRjaCAobWV0aG9kKSB7XG4gICAgICAgIGNhc2UgJ2NvdmVyJzpcbiAgICAgICAgICAgIHJldHVybiBNYXRoLm1heChhcmVhV2lkdGggLyB3aWR0aCwgYXJlYUhlaWdodCAvIGhlaWdodCk7XG4gICAgICAgIGNhc2UgJ2NvbnRhaW4nOlxuICAgICAgICAgICAgcmV0dXJuIE1hdGgubWluKGFyZWFXaWR0aCAvIHdpZHRoLCBhcmVhSGVpZ2h0IC8gaGVpZ2h0KTtcbiAgICAgICAgY2FzZSAnd2lkdGgnOlxuICAgICAgICAgICAgcmV0dXJuIGFyZWFXaWR0aCAvIHdpZHRoO1xuICAgICAgICBjYXNlICdoZWlnaHQnOlxuICAgICAgICAgICAgcmV0dXJuIGFyZWFIZWlnaHQgLyBoZWlnaHQ7XG4gICAgICAgIGRlZmF1bHQ6IGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gMTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2l6ZShyZWN0LCBhcmVhV2lkdGgsIGFyZWFIZWlnaHQsIG1ldGhvZCA9ICdjb3ZlcicsIGF1dG9DZW50ZXIgPSB0cnVlKSB7XG4gICAgY29uc3Qgc2NhbGUgPSBnZXRTY2FsZShtZXRob2QsIHJlY3Qud2lkdGgsIHJlY3QuaGVpZ2h0LCBhcmVhV2lkdGgsIGFyZWFIZWlnaHQpO1xuICAgIGNvbnN0IHdpZHRoID0gTWF0aC5jZWlsKHJlY3Qud2lkdGggKiBzY2FsZSk7XG4gICAgY29uc3QgaGVpZ2h0ID0gTWF0aC5jZWlsKHJlY3QuaGVpZ2h0ICogc2NhbGUpO1xuXG4gICAgbGV0IHggPSAwLCB5ID0gMDtcblxuICAgIGlmIChhdXRvQ2VudGVyKSB7XG4gICAgICAgIHggPSBNYXRoLnJvdW5kKChhcmVhV2lkdGggLSB3aWR0aCkgKiAwLjUpO1xuICAgICAgICB5ID0gTWF0aC5yb3VuZCgoYXJlYUhlaWdodCAtIGhlaWdodCkgKiAwLjUpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHgsXG4gICAgICAgIHksXG4gICAgICAgIHdpZHRoLFxuICAgICAgICBoZWlnaHQsXG4gICAgICAgIHNjYWxlXG4gICAgfTtcbn1cbiIsImltcG9ydCBzbW9vdGhzdGVwIGZyb20gJy4vc21vb3Roc3RlcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNtZXJwKGZyb20sIHRvLCBzdGFydFRpbWUsIGVuZFRpbWUsIHRpbWUpIHtcbiAgICByZXR1cm4gZnJvbSArICh0byAtIGZyb20pICogc21vb3Roc3RlcChzdGFydFRpbWUsIGVuZFRpbWUsIHRpbWUpO1xufVxuIiwiaW1wb3J0IGNsYW1wIGZyb20gJy4vY2xhbXAnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzbW9vdGhzdGVwKG1pbiwgbWF4LCB2YWx1ZSkge1xuICAgIGNvbnN0IHggPSBjbGFtcCgodmFsdWUgLSBtaW4pIC8gKG1heCAtIG1pbiksIDAsIDEpO1xuICAgIHJldHVybiB4ICogeCAqICgzIC0gMiAqIHgpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3BsaXRWYWx1ZUFuZFVuaXQocHJvcCkge1xuICAgIGNvbnN0IHJlID0gLyheLT9cXGQqXFwuP1xcZCopKC4qKS87XG4gICAgY29uc3QgbWF0Y2ggPSBwcm9wLm1hdGNoKHJlKTtcbiAgICBjb25zdCB2YWx1ZSA9IE51bWJlcihtYXRjaFsxXSk7XG4gICAgY29uc3QgdW5pdCA9IG1hdGNoWzJdO1xuICAgIHJldHVybiB7dmFsdWUsIHVuaXR9O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gd2VpZ2h0ZWRBdmVyYWdlKGZyb20sIHRvLCB3ZWlnaHQgPSAxMCkge1xuICAgIHJldHVybiAoKGZyb20gKiAod2VpZ2h0IC0gMSkpICsgdG8pIC8gd2VpZ2h0O1xufVxuIiwiaW1wb3J0IHJhbmRvbSBmcm9tICcuL3JhbmRvbSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdlaWdodGVkRGlzdHJpYnV0aW9uKG1pbiwgbWF4LCB3ZWlnaHQgPSA1KSB7XG4gICAgbGV0IHRvdGFsID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdlaWdodDsgaSsrKSB7XG4gICAgICAgIHRvdGFsICs9IHJhbmRvbShtaW4sIG1heCk7XG4gICAgfVxuICAgIHJldHVybiB0b3RhbCAvIHdlaWdodDtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGN1ZXBvaW50c1JlYWRlcigpIHtcbiAgICBjb25zdCBsaXN0ID0gW107XG4gICAgbGV0IHJlYWRlcjtcbiAgICBsZXQgZGlzcGF0Y2g7XG4gICAgbGV0IGN1cnJlbnRQb3NpdGlvbiA9IDA7XG4gICAgbGV0IGxhc3RQb3NpdGlvbiA9IC0xO1xuICAgIGxldCB0b2xlcmFuY2UgPSAwLjI7XG5cbiAgICBmdW5jdGlvbiBhZGQocG9zaXRpb24sIG5hbWUsIGRhdGEpIHtcbiAgICAgICAgbGlzdC5wdXNoKHtwb3NpdGlvbiwgbmFtZSwgZGF0YX0pO1xuXG4gICAgICAgIGxpc3Quc29ydCgoYSwgYikgPT4gYS5wb3NpdGlvbiAtIGIucG9zaXRpb24pO1xuXG4gICAgICAgIHJldHVybiByZWFkZXI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25DdWVwb2ludChmbiwgdGhpc0FyZykge1xuICAgICAgICBpZiAoZm4pIHtcbiAgICAgICAgICAgIGRpc3BhdGNoID0gdGhpc0FyZyA/IGZuLmJpbmQodGhpc0FyZykgOiBmbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRpc3BhdGNoID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVhZGVyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgICAgICBjdXJyZW50UG9zaXRpb24gPSAwO1xuICAgICAgICBsYXN0UG9zaXRpb24gPSAtMTtcbiAgICAgICAgcmV0dXJuIHJlYWRlcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVBbGwoKSB7XG4gICAgICAgIGxpc3QubGVuZ3RoID0gMDtcbiAgICAgICAgcmV0dXJuIHJlc2V0KCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0VG9sZXJhbmNlKHZhbHVlKSB7XG4gICAgICAgIHRvbGVyYW5jZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gcmVhZGVyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluUmFuZ2UoY3VlcG9pbnRQb3MsIGN1cnJlbnRQb3MsIGxhc3RQb3MpIHtcbiAgICAgICAgaWYgKGN1ZXBvaW50UG9zID4gY3VycmVudFBvcykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjdWVwb2ludFBvcyA8PSBsYXN0UG9zKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZGlmZiA9IGN1ZXBvaW50UG9zIC0gY3VycmVudFBvcztcbiAgICAgICAgaWYgKGRpZmYgPCAwKSB7XG4gICAgICAgICAgICBkaWZmID0gLWRpZmY7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRpZmYgPD0gdG9sZXJhbmNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrKGN1cnJlbnRQb3MsIGxhc3RQb3MpIHtcbiAgICAgICAgaWYgKGN1cnJlbnRQb3MgPD0gbGFzdFBvcykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgZGlzcGF0Y2ggIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxpc3Quc29tZSgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaWYgKGluUmFuZ2UoaXRlbS5wb3NpdGlvbiwgY3VycmVudFBvcywgbGFzdFBvcykpIHtcbiAgICAgICAgICAgICAgICBkaXNwYXRjaChpdGVtKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlKHBvc2l0aW9uKSB7XG4gICAgICAgIGN1cnJlbnRQb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgICAgICBjaGVjayhjdXJyZW50UG9zaXRpb24sIGxhc3RQb3NpdGlvbik7XG4gICAgICAgIGxhc3RQb3NpdGlvbiA9IGN1cnJlbnRQb3NpdGlvbjtcbiAgICAgICAgcmV0dXJuIHJlYWRlcjtcbiAgICB9XG5cbiAgICByZWFkZXIgPSBPYmplY3QuZnJlZXplKHtcbiAgICAgICAgYWRkLFxuICAgICAgICBvbkN1ZXBvaW50LFxuICAgICAgICByZW1vdmVBbGwsXG4gICAgICAgIHJlc2V0LFxuICAgICAgICBzZXRUb2xlcmFuY2UsXG4gICAgICAgIHVwZGF0ZVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlYWRlcjtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlPU1BsYXlWaWRlb0lubGluZShlbCwgbG9vcCA9IHRydWUpIHtcbiAgICBjb25zdCBmcmFtZVRpbWUgPSAxIC8gMjU7XG5cbiAgICBsZXQgc2VsZixcbiAgICAgICAgbGFzdFRpbWUgPSAwLFxuICAgICAgICBwbGF5aW5nID0gZmFsc2U7XG5cbiAgICAvLyBUaGlzIGNhbiAoYW5kIHNob3VsZCkgYmUgcHV0IGluIGEgY3NzIGZpbGUgaW5zdGVhZCBvZiBkb2luZyBzdHlsZVNoZWV0c1swXS5pbnNlcnRSdWxlOlxuICAgIGNvbnN0IGNzc1J1bGUgPSAnLmlPU1BsYXlWaWRlb0lubGluZTo6LXdlYmtpdC1tZWRpYS1jb250cm9scyB7IGRpc3BsYXk6bm9uZSAhaW1wb3J0YW50OyB9JztcbiAgICBkb2N1bWVudC5zdHlsZVNoZWV0c1swXS5pbnNlcnRSdWxlKGNzc1J1bGUsIDApO1xuXG4gICAgZWwucmVtb3ZlQXR0cmlidXRlKCdjb250cm9scycpO1xuICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2lPU1BsYXlWaWRlb0lubGluZScpO1xuXG5cbiAgICBmdW5jdGlvbiBzZWVrKHRpbWUpIHtcbiAgICAgICAgZWwuY3VycmVudFRpbWUgPSB0aW1lO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXVzZSgpIHtcbiAgICAgICAgcGxheWluZyA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVGcmFtZSgpIHtcbiAgICAgICAgaWYgKCFwbGF5aW5nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZUZyYW1lKTtcblxuICAgICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICBjb25zdCBkZWx0YVRpbWUgPSBub3cgLSBsYXN0VGltZTtcblxuICAgICAgICBpZiAoZGVsdGFUaW1lID49IGZyYW1lVGltZSAqIDEwMDApIHtcbiAgICAgICAgICAgIGxhc3RUaW1lID0gbm93O1xuXG4gICAgICAgICAgICBjb25zdCBlbmRlZCA9IGVsLmN1cnJlbnRUaW1lICsgZnJhbWVUaW1lID49IGVsLmR1cmF0aW9uO1xuXG4gICAgICAgICAgICBpZiAoZW5kZWQgJiYgbG9vcCkge1xuICAgICAgICAgICAgICAgIHNlZWsoMCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGVuZGVkKSB7XG4gICAgICAgICAgICAgICAgcGF1c2UoKTtcbiAgICAgICAgICAgICAgICAvLyBzZWxmLmVtaXQoJ2VuZGVkJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlZWsoZWwuY3VycmVudFRpbWUgKyBmcmFtZVRpbWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBzZWxmLmVtaXQoJ3RpbWV1cGRhdGUnLCBlbC5jdXJyZW50VGltZSwgc2VsZik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGF5KCkge1xuICAgICAgICBwbGF5aW5nID0gdHJ1ZTtcbiAgICAgICAgdXBkYXRlRnJhbWUoKTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICAgLy8gc2VsZi5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICAgICAgcGF1c2UoKTtcbiAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKHVwZGF0ZUZyYW1lKTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9XG5cbiAgICAvLyBzZWxmID0gT2JqZWN0LmNyZWF0ZShFbWl0dGVyLnByb3RvdHlwZSwge1xuICAgIHNlbGYgPSBPYmplY3QuY3JlYXRlKG51bGwsIHtcbiAgICAgICAgX2V2ZW50czoge1xuICAgICAgICAgICAgdmFsdWU6IHt9XG4gICAgICAgIH0sXG4gICAgICAgIGRlc3Ryb3k6IHtcbiAgICAgICAgICAgIHZhbHVlOiBkZXN0cm95XG4gICAgICAgIH0sXG4gICAgICAgIHBhdXNlOiB7XG4gICAgICAgICAgICB2YWx1ZTogcGF1c2VcbiAgICAgICAgfSxcbiAgICAgICAgcGxheToge1xuICAgICAgICAgICAgdmFsdWU6IHBsYXlcbiAgICAgICAgfSxcbiAgICAgICAgc2Vlazoge1xuICAgICAgICAgICAgdmFsdWU6IHNlZWtcbiAgICAgICAgfSxcbiAgICAgICAgZWw6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjdXJyZW50VGltZToge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZWwuY3VycmVudFRpbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGR1cmF0aW9uOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbC5kdXJhdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbG9vcDoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbG9vcDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgbG9vcCA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBwbGF5aW5nOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwbGF5aW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZShzZWxmKTtcbn1cbiIsImltcG9ydCBjdWVwb2ludHNSZWFkZXIgZnJvbSAnLi9jdWVwb2ludHNSZWFkZXInO1xuaW1wb3J0IGlPU1BsYXlWaWRlb0lubGluZSBmcm9tICcuL2lPU1BsYXlWaWRlb0lubGluZSc7XG5pbXBvcnQgdmlkZW9QbGF5ZXIgZnJvbSAnLi92aWRlb1BsYXllcic7XG5pbXBvcnQgdmltZW8gZnJvbSAnLi92aW1lbyc7XG5pbXBvcnQgeW91dHViZSBmcm9tICcuL3lvdXR1YmUnO1xuaW1wb3J0IHlvdXR1YmVCYXNpYyBmcm9tICcuL3lvdXR1YmVCYXNpYyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBjdWVwb2ludHNSZWFkZXIsXG4gICAgaU9TUGxheVZpZGVvSW5saW5lLFxuICAgIHZpZGVvUGxheWVyLFxuICAgIHZpbWVvLFxuICAgIHlvdXR1YmUsXG4gICAgeW91dHViZUJhc2ljXG59O1xuIiwiaW1wb3J0IGVtaXR0ZXIgZnJvbSAnLi4vZXZlbnRzL2VtaXR0ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB2aWRlb1BsYXllcih2aWRlb0VsKSB7XG4gICAgbGV0IGVsID0gdmlkZW9FbCB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xuICAgIGxldCBwbGF5ZXI7XG5cbiAgICBmdW5jdGlvbiBtZXRhZGF0YUhhbmRsZXIoKSB7XG4gICAgICAgIHBsYXllci5lbWl0KCdtZXRhZGF0YScsIHtcbiAgICAgICAgICAgIHNyYzogZWwuY3VycmVudFNyYyxcbiAgICAgICAgICAgIHdpZHRoOiBlbC52aWRlb1dpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBlbC52aWRlb0hlaWdodCxcbiAgICAgICAgICAgIGR1cmF0aW9uOiBlbC5kdXJhdGlvblxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYW5wbGF5SGFuZGxlcigpIHtcbiAgICAgICAgcGxheWVyLmVtaXQoJ3JlYWR5Jyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGxheUhhbmRsZXIoKSB7XG4gICAgICAgIHBsYXllci5lbWl0KCdwbGF5Jyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW5kZWRIYW5kbGVyKCkge1xuICAgICAgICBwbGF5ZXIuZW1pdCgnZW5kZWQnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlcnJvckhhbmRsZXIoKSB7XG4gICAgICAgIHBsYXllci5lbWl0KCdlcnJvcicsIGVsLmVycm9yKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0aW1ldXBkYXRlSGFuZGxlcigpIHtcbiAgICAgICAgcGxheWVyLmVtaXQoJ3RpbWV1cGRhdGUnLCBlbC5jdXJyZW50VGltZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2xvYWRlZG1ldGFkYXRhJywgbWV0YWRhdGFIYW5kbGVyKTtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2FucGxheXRocm91Z2gnLCBjYW5wbGF5SGFuZGxlcik7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BsYXknLCBwbGF5SGFuZGxlcik7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BsYXlpbmcnLCBwbGF5SGFuZGxlcik7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZXJyb3JIYW5kbGVyKTtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignZW5kZWQnLCBlbmRlZEhhbmRsZXIpO1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0aW1ldXBkYXRlJywgdGltZXVwZGF0ZUhhbmRsZXIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgICByZW1vdmVFdmVudExpc3RlbmVycygpO1xuXG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlZG1ldGFkYXRhJywgbWV0YWRhdGFIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NhbnBsYXl0aHJvdWdoJywgY2FucGxheUhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigncGxheScsIHBsYXlIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3BsYXlpbmcnLCBwbGF5SGFuZGxlciwgZmFsc2UpO1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGVycm9ySGFuZGxlciwgZmFsc2UpO1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdlbmRlZCcsIGVuZGVkSGFuZGxlciwgZmFsc2UpO1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCd0aW1ldXBkYXRlJywgdGltZXVwZGF0ZUhhbmRsZXIsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICBwbGF5ZXIub2ZmKCk7XG4gICAgICAgIGVsLnBhdXNlKCk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZSgnc3JjJyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKTtcblxuICAgICAgICBpZiAoZWwucGFyZW50RWxlbWVudCkge1xuICAgICAgICAgICAgZWwucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChlbCk7XG4gICAgICAgIH1cblxuICAgICAgICBlbCA9IG51bGw7XG5cbiAgICAgICAgcmV0dXJuIHBsYXllcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRCbG9iVVJMKHVybCkge1xuICAgICAgICB1cmwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTCh1cmwpO1xuICAgICAgICBmdW5jdGlvbiByZXZva2UoKSB7XG4gICAgICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjYW5wbGF5dGhyb3VnaCcsIHJldm9rZSk7XG4gICAgICAgICAgICB3aW5kb3cuVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpO1xuICAgICAgICB9XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NhbnBsYXl0aHJvdWdoJywgcmV2b2tlKTtcbiAgICAgICAgcmV0dXJuIHVybDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2FkKHVybCkge1xuICAgICAgICBpZiAod2luZG93LkJsb2IgJiYgdXJsIGluc3RhbmNlb2Ygd2luZG93LkJsb2IpIHtcbiAgICAgICAgICAgIHVybCA9IGdldEJsb2JVUkwodXJsKTtcbiAgICAgICAgfVxuICAgICAgICBhZGRFdmVudExpc3RlbmVycygpO1xuXG4gICAgICAgIGVsLmNyb3NzT3JpZ2luID0gJ2Fub255bW91cyc7XG4gICAgICAgIGVsLnByZWxvYWQgPSAnYXV0byc7XG4gICAgICAgIGVsLnNyYyA9IHVybDtcbiAgICAgICAgZWwubG9hZCgpO1xuXG4gICAgICAgIHJldHVybiBwbGF5ZXI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGxheSgpIHtcbiAgICAgICAgZWwucGxheSgpO1xuXG4gICAgICAgIHJldHVybiBwbGF5ZXI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGF1c2UoKSB7XG4gICAgICAgIGVsLnBhdXNlKCk7XG5cbiAgICAgICAgcmV0dXJuIHBsYXllcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZWVrKHRpbWUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGVsLmN1cnJlbnRUaW1lID0gdGltZTtcbiAgICAgICAgfSBjYXRjaCAoZSkge31cblxuICAgICAgICByZXR1cm4gcGxheWVyO1xuICAgIH1cblxuICAgIGFkZEV2ZW50TGlzdGVuZXJzKCk7XG5cbiAgICBwbGF5ZXIgPSBPYmplY3QuY3JlYXRlKGVtaXR0ZXIucHJvdG90eXBlLCB7XG4gICAgICAgIF9ldmVudHM6IHtcbiAgICAgICAgICAgIHZhbHVlOiB7fVxuICAgICAgICB9LFxuICAgICAgICBkZXN0cm95OiB7XG4gICAgICAgICAgICB2YWx1ZTogZGVzdHJveVxuICAgICAgICB9LFxuICAgICAgICBsb2FkOiB7XG4gICAgICAgICAgICB2YWx1ZTogbG9hZFxuICAgICAgICB9LFxuICAgICAgICBwYXVzZToge1xuICAgICAgICAgICAgdmFsdWU6IHBhdXNlXG4gICAgICAgIH0sXG4gICAgICAgIHBsYXk6IHtcbiAgICAgICAgICAgIHZhbHVlOiBwbGF5XG4gICAgICAgIH0sXG4gICAgICAgIHNlZWs6IHtcbiAgICAgICAgICAgIHZhbHVlOiBzZWVrXG4gICAgICAgIH0sXG4gICAgICAgIGVsOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY3VycmVudFRpbWU6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsLmN1cnJlbnRUaW1lO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICBlbC5jdXJyZW50VGltZSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBkdXJhdGlvbjoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZWwuZHVyYXRpb247XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHZvbHVtZToge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZWwudm9sdW1lO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICBlbC52b2x1bWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUocGxheWVyKTtcbn1cbiIsImltcG9ydCBlbWl0dGVyIGZyb20gJy4uL2V2ZW50cy9lbWl0dGVyJztcblxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIudmltZW8uY29tL3BsYXllci9qcy1hcGlcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdmltZW8oZWwpIHtcbiAgICBjb25zdCB2aW1lb1BsYXllciA9IGVsLmNvbnRlbnRXaW5kb3c7XG4gICAgY29uc3QgcmUgPSAvXmh0dHBzPzpcXC9cXC9wbGF5ZXIudmltZW8uY29tLztcbiAgICBsZXQgcGxheWVyLCBvcmlnaW4gPSAnKicsIHBhdXNlZCA9IGZhbHNlO1xuXG4gICAgZnVuY3Rpb24gc2VuZENvbW1hbmQobWV0aG9kLCB2YWx1ZSA9ICcnKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgICBtZXRob2RcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIGRhdGEudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICAgICAgdmltZW9QbGF5ZXIucG9zdE1lc3NhZ2UobWVzc2FnZSwgb3JpZ2luKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGF5KCkge1xuICAgICAgICBwYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgc2VuZENvbW1hbmQoJ3BsYXknKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXVzZSgpIHtcbiAgICAgICAgcGF1c2VkID0gdHJ1ZTtcbiAgICAgICAgc2VuZENvbW1hbmQoJ3BhdXNlJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25SZWFkeSgpIHtcbiAgICAgICAgc2VuZENvbW1hbmQoJ2FkZEV2ZW50TGlzdGVuZXInLCAncGxheScpO1xuICAgICAgICBzZW5kQ29tbWFuZCgnYWRkRXZlbnRMaXN0ZW5lcicsICdwYXVzZScpO1xuICAgICAgICBzZW5kQ29tbWFuZCgnYWRkRXZlbnRMaXN0ZW5lcicsICdmaW5pc2gnKTtcbiAgICAgICAgc2VuZENvbW1hbmQoJ2FkZEV2ZW50TGlzdGVuZXInLCAncGxheVByb2dyZXNzJyk7XG4gICAgICAgIHBsYXllci5lbWl0KCdyZWFkeScpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uUGxheSgpIHtcbiAgICAgICAgcGF1c2VkID0gZmFsc2U7XG4gICAgICAgIHBsYXllci5lbWl0KCdwbGF5Jyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25QYXVzZSgpIHtcbiAgICAgICAgcGF1c2VkID0gdHJ1ZTtcbiAgICAgICAgcGxheWVyLmVtaXQoJ3BhdXNlJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25GaW5pc2goKSB7XG4gICAgICAgIHBsYXllci5lbWl0KCdlbmRlZCcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uUGxheVByb2dyZXNzKGRhdGEpIHtcbiAgICAgICAgcGxheWVyLmVtaXQoJ3RpbWV1cGRhdGUnLCBkYXRhLnNlY29uZHMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTWVzc2FnZShldmVudCkge1xuICAgICAgICBjb25zdCBpc1ZpbWVvID0gcmUudGVzdChldmVudC5vcmlnaW4pO1xuXG4gICAgICAgIGlmICghaXNWaW1lbykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UoZXZlbnQuZGF0YSk7XG5cbiAgICAgICAgaWYgKGRhdGEucGxheWVyX2lkICYmIGVsLmlkICE9PSBkYXRhLnBsYXllcl9pZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9yaWdpbiA9PT0gJyonKSB7XG4gICAgICAgICAgICBvcmlnaW4gPSBldmVudC5vcmlnaW47XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKGRhdGEuZXZlbnQpIHtcbiAgICAgICAgICAgIGNhc2UgJ3JlYWR5JzpcbiAgICAgICAgICAgICAgICBvblJlYWR5KGRhdGEucGxheWVyX2lkKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3BsYXlQcm9ncmVzcyc6XG4gICAgICAgICAgICAgICAgb25QbGF5UHJvZ3Jlc3MoZGF0YS5kYXRhKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3BsYXknOlxuICAgICAgICAgICAgICAgIG9uUGxheSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncGF1c2UnOlxuICAgICAgICAgICAgICAgIG9uUGF1c2UoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2ZpbmlzaCc6XG4gICAgICAgICAgICAgICAgb25GaW5pc2goKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIG9uTWVzc2FnZSk7XG4gICAgfVxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBvbk1lc3NhZ2UpO1xuXG4gICAgcGxheWVyID0gT2JqZWN0LmFzc2lnbihPYmplY3QuY3JlYXRlKGVtaXR0ZXIucHJvdG90eXBlKSwge1xuICAgICAgICBfZXZlbnRzOiB7fSxcbiAgICAgICAgcGxheSxcbiAgICAgICAgcGF1c2UsXG4gICAgICAgIHBhdXNlZDogKCkgPT4gcGF1c2VkLFxuICAgICAgICBkZXN0cm95XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcGxheWVyO1xufVxuIiwiLy8gaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20veW91dHViZS9pZnJhbWVfYXBpX3JlZmVyZW5jZSNFdmVudHNcbmltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tICdldmVudHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB5b3V0dWJlKGVsKSB7XG4gICAgbGV0IGVtaXR0ZXIgPSBudWxsLCBwbGF5ZXIgPSBudWxsLCBwYXVzZWQgPSBmYWxzZTtcblxuICAgIGZ1bmN0aW9uIHBsYXkoKSB7XG4gICAgICAgIHBhdXNlZCA9IGZhbHNlO1xuICAgICAgICBwbGF5ZXIucGxheVZpZGVvKCk7XG4gICAgICAgIHJldHVybiBlbWl0dGVyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhdXNlKCkge1xuICAgICAgICBwYXVzZWQgPSB0cnVlO1xuICAgICAgICBwbGF5ZXIucGF1c2VWaWRlbygpO1xuICAgICAgICByZXR1cm4gZW1pdHRlcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblJlYWR5KCkge1xuICAgICAgICBlbWl0dGVyLmVtaXQoJ3JlYWR5Jyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25TdGF0ZUNoYW5nZShldmVudCkge1xuICAgICAgICBjb25zdCB7UGxheWVyU3RhdGV9ID0gd2luZG93LllUO1xuXG4gICAgICAgIHN3aXRjaCAoZXZlbnQuZGF0YSkge1xuICAgICAgICAgICAgY2FzZSBQbGF5ZXJTdGF0ZS5DVUVEOlxuICAgICAgICAgICAgY2FzZSBQbGF5ZXJTdGF0ZS5CVUZGRVJJTkc6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFBsYXllclN0YXRlLlBMQVlJTkc6XG4gICAgICAgICAgICAgICAgcGF1c2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZW1pdHRlci5lbWl0KCdwbGF5Jyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFBsYXllclN0YXRlLlBBVVNFRDpcbiAgICAgICAgICAgICAgICBwYXVzZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGVtaXR0ZXIuZW1pdCgncGF1c2UnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUGxheWVyU3RhdGUuRU5ERUQ6XG4gICAgICAgICAgICAgICAgZW1pdHRlci5lbWl0KCdlbmRlZCcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDogYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZXN0cm95KCkge31cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVBsYXllcigpIHtcbiAgICAgICAgaWYgKHBsYXllcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcGxheWVyID0gbmV3IHdpbmRvdy5ZVC5QbGF5ZXIoZWwsIHtcbiAgICAgICAgICAgIGV2ZW50czoge1xuICAgICAgICAgICAgICAgIG9uUmVhZHksXG4gICAgICAgICAgICAgICAgb25TdGF0ZUNoYW5nZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuXG4gICAgaWYgKHdpbmRvdy5ZVCkge1xuICAgICAgICBjcmVhdGVQbGF5ZXIoKTtcbiAgICB9IGVsc2UgaWYgKHdpbmRvdy55dFBsYXllckNhbGxzKSB7XG4gICAgICAgIHdpbmRvdy55dFBsYXllckNhbGxzLnB1c2goY3JlYXRlUGxheWVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB3aW5kb3cueXRQbGF5ZXJDYWxscyA9IFtjcmVhdGVQbGF5ZXJdO1xuICAgICAgICB3aW5kb3cub25Zb3VUdWJlSWZyYW1lQVBJUmVhZHkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHdpbmRvdy55dFBsYXllckNhbGxzLmZvckVhY2goKGNhbGwpID0+IGNhbGwoKSk7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICBzY3JpcHQuc3JjID0gJ2h0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2lmcmFtZV9hcGknO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgfVxuXG4gICAgZW1pdHRlciA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmNyZWF0ZShFdmVudEVtaXR0ZXIucHJvdG90eXBlKSwge1xuICAgICAgICBfZXZlbnRzOiB7fSxcbiAgICAgICAgcGxheSxcbiAgICAgICAgcGF1c2UsXG4gICAgICAgIHBhdXNlZDogKCkgPT4gcGF1c2VkLFxuICAgICAgICBkZXN0cm95XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZW1pdHRlcjtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHlvdXR1YmVCYXNpYyhlbCkge1xuICAgIGNvbnN0IGlmcmFtZSA9IGVsLmNvbnRlbnRXaW5kb3c7XG5cbiAgICBmdW5jdGlvbiBzZW5kQ29tbWFuZChjb21tYW5kKSB7XG4gICAgICAgIGlmcmFtZS5wb3N0TWVzc2FnZShge1wiZXZlbnRcIjpcImNvbW1hbmRcIixcImZ1bmNcIjpcIiR7Y29tbWFuZH1cIixcImFyZ3NcIjpcIlwifWAsICcqJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGxheSgpIHtcbiAgICAgICAgc2VuZENvbW1hbmQoJ3BsYXlWaWRlbycpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhdXNlKCkge1xuICAgICAgICBzZW5kQ29tbWFuZCgncGF1c2VWaWRlbycpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHBsYXksXG4gICAgICAgIHBhdXNlXG4gICAgfTtcbn1cbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIHRoaXMuX2V2ZW50cyA9IHRoaXMuX2V2ZW50cyB8fCB7fTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxuRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24obikge1xuICBpZiAoIWlzTnVtYmVyKG4pIHx8IG4gPCAwIHx8IGlzTmFOKG4pKVxuICAgIHRocm93IFR5cGVFcnJvcignbiBtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyJyk7XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgZXIsIGhhbmRsZXIsIGxlbiwgYXJncywgaSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKHR5cGUgPT09ICdlcnJvcicpIHtcbiAgICBpZiAoIXRoaXMuX2V2ZW50cy5lcnJvciB8fFxuICAgICAgICAoaXNPYmplY3QodGhpcy5fZXZlbnRzLmVycm9yKSAmJiAhdGhpcy5fZXZlbnRzLmVycm9yLmxlbmd0aCkpIHtcbiAgICAgIGVyID0gYXJndW1lbnRzWzFdO1xuICAgICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgICB9XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoJ1VuY2F1Z2h0LCB1bnNwZWNpZmllZCBcImVycm9yXCIgZXZlbnQuJyk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICBpZiAoaXNVbmRlZmluZWQoaGFuZGxlcikpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGhhbmRsZXIpKSB7XG4gICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAvLyBmYXN0IGNhc2VzXG4gICAgICBjYXNlIDE6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBzbG93ZXJcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICBoYW5kbGVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc09iamVjdChoYW5kbGVyKSkge1xuICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgIGxpc3RlbmVycyA9IGhhbmRsZXIuc2xpY2UoKTtcbiAgICBsZW4gPSBsaXN0ZW5lcnMubGVuZ3RoO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKylcbiAgICAgIGxpc3RlbmVyc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBtO1xuXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gIGlmICh0aGlzLl9ldmVudHMubmV3TGlzdGVuZXIpXG4gICAgdGhpcy5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgIGlzRnVuY3Rpb24obGlzdGVuZXIubGlzdGVuZXIpID9cbiAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gIGVsc2UgaWYgKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkpXG4gICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5wdXNoKGxpc3RlbmVyKTtcbiAgZWxzZVxuICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IFt0aGlzLl9ldmVudHNbdHlwZV0sIGxpc3RlbmVyXTtcblxuICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSAmJiAhdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCkge1xuICAgIGlmICghaXNVbmRlZmluZWQodGhpcy5fbWF4TGlzdGVuZXJzKSkge1xuICAgICAgbSA9IHRoaXMuX21heExpc3RlbmVycztcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICAgIH1cblxuICAgIGlmIChtICYmIG0gPiAwICYmIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGggPiBtKSB7XG4gICAgICB0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkID0gdHJ1ZTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJyhub2RlKSB3YXJuaW5nOiBwb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5ICcgK1xuICAgICAgICAgICAgICAgICAgICAnbGVhayBkZXRlY3RlZC4gJWQgbGlzdGVuZXJzIGFkZGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1VzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvIGluY3JlYXNlIGxpbWl0LicsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGgpO1xuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLnRyYWNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIG5vdCBzdXBwb3J0ZWQgaW4gSUUgMTBcbiAgICAgICAgY29uc29sZS50cmFjZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICB2YXIgZmlyZWQgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBnKCkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgZyk7XG5cbiAgICBpZiAoIWZpcmVkKSB7XG4gICAgICBmaXJlZCA9IHRydWU7XG4gICAgICBsaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfVxuXG4gIGcubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgdGhpcy5vbih0eXBlLCBnKTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIGVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZmYgdGhlIGxpc3RlbmVyIHdhcyByZW1vdmVkXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIGxpc3QsIHBvc2l0aW9uLCBsZW5ndGgsIGk7XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgbGlzdCA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgbGVuZ3RoID0gbGlzdC5sZW5ndGg7XG4gIHBvc2l0aW9uID0gLTE7XG5cbiAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8XG4gICAgICAoaXNGdW5jdGlvbihsaXN0Lmxpc3RlbmVyKSAmJiBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuXG4gIH0gZWxzZSBpZiAoaXNPYmplY3QobGlzdCkpIHtcbiAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSA+IDA7KSB7XG4gICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHxcbiAgICAgICAgICAobGlzdFtpXS5saXN0ZW5lciAmJiBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICAgIGxpc3QubGVuZ3RoID0gMDtcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3Quc3BsaWNlKHBvc2l0aW9uLCAxKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBrZXksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICByZXR1cm4gdGhpcztcblxuICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gIGlmICghdGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXG4gICAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICBlbHNlIGlmICh0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgZm9yIChrZXkgaW4gdGhpcy5fZXZlbnRzKSB7XG4gICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgfVxuICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGxpc3RlbmVycykpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gIH0gZWxzZSBpZiAobGlzdGVuZXJzKSB7XG4gICAgLy8gTElGTyBvcmRlclxuICAgIHdoaWxlIChsaXN0ZW5lcnMubGVuZ3RoKVxuICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbbGlzdGVuZXJzLmxlbmd0aCAtIDFdKTtcbiAgfVxuICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciByZXQ7XG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0ID0gW107XG4gIGVsc2UgaWYgKGlzRnVuY3Rpb24odGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICByZXQgPSBbdGhpcy5fZXZlbnRzW3R5cGVdXTtcbiAgZWxzZVxuICAgIHJldCA9IHRoaXMuX2V2ZW50c1t0eXBlXS5zbGljZSgpO1xuICByZXR1cm4gcmV0O1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24odHlwZSkge1xuICBpZiAodGhpcy5fZXZlbnRzKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgICBpZiAoaXNGdW5jdGlvbihldmxpc3RlbmVyKSlcbiAgICAgIHJldHVybiAxO1xuICAgIGVsc2UgaWYgKGV2bGlzdGVuZXIpXG4gICAgICByZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGg7XG4gIH1cbiAgcmV0dXJuIDA7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKTtcbn07XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nO1xufVxuXG5mdW5jdGlvbiBpc051bWJlcihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdudW1iZXInO1xufVxuXG5mdW5jdGlvbiBpc09iamVjdChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnICYmIGFyZyAhPT0gbnVsbDtcbn1cblxuZnVuY3Rpb24gaXNVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IHZvaWQgMDtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG9iamVjdFBvb2woZmFjdG9yeUZuKSB7XG5cbiAgICBsZXQgcG9vbCA9IFtdO1xuICAgIGxldCBudW1DcmVhdGVkID0gMDtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGdldFBvb2wgKCkge1xuICAgICAgICAgICAgcmV0dXJuIHBvb2w7XG4gICAgICAgIH0sXG4gICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICBpZiAoIHBvb2wubGVuZ3RoID4gMCApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9vbC5wb3AoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbnVtQ3JlYXRlZCsrO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWN0b3J5Rm4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZGlzcG9zZSAoaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHBvb2wucHVzaChpbnN0YW5jZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGZpbGwgKGNvdW50KSB7XG4gICAgICAgICAgICB3aGlsZSAoIHBvb2wubGVuZ3RoIDwgY291bnQgKSB7XG4gICAgICAgICAgICAgICAgbnVtQ3JlYXRlZCsrO1xuICAgICAgICAgICAgICAgIHBvb2xbcG9vbC5sZW5ndGhdID0gZmFjdG9yeUZuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVtcHR5ICgpIHtcbiAgICAgICAgICAgIHBvb2wgPSBbXTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0TnVtQ3JlYXRlZCgpIHtcbiAgICAgICAgICAgIHJldHVybiBudW1DcmVhdGVkO1xuICAgICAgICB9XG4gICAgfTtcbn1cbiIsImltcG9ydCBhbmRyb2lkIGZyb20gJy4uL29zL2FuZHJvaWQnO1xuXG4vL2h0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTQ0MDM3NjYvaG93LXRvLWRldGVjdC10aGUtc3RvY2stYW5kcm9pZC1icm93c2VyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhbmRyb2lkTmF0aXZlKHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudCkge1xuICAgIGlmICghYW5kcm9pZCh1YSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IGlzQW5kcm9pZE1vYmlsZSA9IHVhLmluZGV4T2YoJ01vemlsbGEvNS4wJykgPiAtMSAmJiB1YS5pbmRleE9mKCdBcHBsZVdlYktpdCcpID4gLTE7XG5cbiAgICBjb25zdCByZUFwcGxlV2ViS2l0ID0gL0FwcGxlV2ViS2l0XFwvKFtcXGQuXSspLztcbiAgICBjb25zdCByZXN1bHRBcHBsZVdlYktpdCA9IHJlQXBwbGVXZWJLaXQuZXhlYyh1YSk7XG4gICAgY29uc3QgYXBwbGVXZWJLaXRWZXJzaW9uID0gcmVzdWx0QXBwbGVXZWJLaXQgPyBwYXJzZUZsb2F0KHJlQXBwbGVXZWJLaXQuZXhlYyh1YSlbMV0pIDogbnVsbDtcblxuICAgIGNvbnN0IHJlQ2hyb21lID0gL0Nocm9tZVxcLyhbXFxkLl0rKS87XG4gICAgY29uc3QgcmVzdWx0Q2hyb21lID0gcmVDaHJvbWUuZXhlYyh1YSk7XG4gICAgY29uc3QgY2hyb21lVmVyc2lvbiA9IHJlc3VsdENocm9tZSA/IHBhcnNlRmxvYXQocmVDaHJvbWUuZXhlYyh1YSlbMV0pIDogbnVsbDtcblxuICAgIHJldHVybiBpc0FuZHJvaWRNb2JpbGUgJiYgKGFwcGxlV2ViS2l0VmVyc2lvbiAmJiBhcHBsZVdlYktpdFZlcnNpb24gPCA1MzcpIHx8IChjaHJvbWVWZXJzaW9uICYmIGNocm9tZVZlcnNpb24gPCAzNyk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpZVZlcnNpb24odWEgPSBuYXZpZ2F0b3IudXNlckFnZW50KSB7XG4gICAgbGV0IHYgPSAwO1xuICAgIGlmICgvTVNJRSAoXFxkK1xcLlxcZCspOy8udGVzdCh1YSkpIHtcbiAgICAgICAgdiA9IHBhcnNlSW50KFJlZ0V4cC4kMSwgMTApO1xuICAgIH0gZWxzZSBpZiAoL1RyaWRlbnRcXC8oXFxkK1xcLlxcZCspKC4qKXJ2OihcXGQrXFwuXFxkKykvLnRlc3QodWEpKSB7XG4gICAgICAgIHYgPSBwYXJzZUludChSZWdFeHAuJDMsIDEwKTtcbiAgICB9XG4gICAgcmV0dXJuIHY7XG59XG4iLCJpbXBvcnQgb3MgZnJvbSAnLi4vb3MnO1xuaW1wb3J0IGllVmVyc2lvbiBmcm9tICcuL2llVmVyc2lvbic7XG5pbXBvcnQgYW5kcm9pZE5hdGl2ZSBmcm9tICcuL2FuZHJvaWROYXRpdmUnO1xuXG5jb25zdCB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XG5jb25zdCBjaHJvbWVpT1MgPSAoKSA9PiBvcy5pb3MoKSAmJiAvQ3JpT1MvLnRlc3QodWEpO1xuY29uc3QgZmlyZWZveCA9ICgpID0+IC9GaXJlZm94Ly50ZXN0KHVhKTtcbmNvbnN0IGllID0gKCkgPT4gaWVWZXJzaW9uKCkgPiAwO1xuY29uc3Qgc2FmYXJpID0gKCkgPT4gIS9BbmRyb2lkLy50ZXN0KHVhKSAmJiAhL0Nocm9tZS8udGVzdCh1YSkgJiYgL1NhZmFyaS8udGVzdCh1YSk7XG5jb25zdCBzYWZhcmlNb2JpbGUgPSAoKSA9PiBvcy5pb3MoKSAmJiAvQXBwbGVXZWJLaXQvLnRlc3QodWEpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYW5kcm9pZE5hdGl2ZSxcbiAgICBjaHJvbWVpT1MsXG4gICAgZmlyZWZveCxcbiAgICBpZSxcbiAgICBpZVZlcnNpb24sXG4gICAgc2FmYXJpLFxuICAgIHNhZmFyaU1vYmlsZVxufTtcbiIsImNvbnN0IHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcblxuY29uc3QgaXBhZCA9ICgpID0+IC9pUGFkL2kudGVzdCh1YSk7XG5jb25zdCBpcG9kID0gKCkgPT4gL2lQb2QvaS50ZXN0KHVhKTtcbmNvbnN0IGlwaG9uZSA9ICgpID0+IC9pUGhvbmUvaS50ZXN0KHVhKTtcbmNvbnN0IG1vYmlsZSA9ICgpID0+ICEhdWEubWF0Y2goL0FuZHJvaWR8d2ViT1N8aVBob25lfGlQYWR8aVBvZHxCbGFja0JlcnJ5fElFTW9iaWxlfE9wZXJhIE1pbml8V2luZG93cyBQaG9uZXxTeW1iaWFuT1MvaSk7XG5jb25zdCBkZXNrdG9wID0gKCkgPT4gIW1vYmlsZSgpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZGVza3RvcCxcbiAgICBpcGFkLFxuICAgIGlwaG9uZSxcbiAgICBpcG9kLFxuICAgIG1vYmlsZVxufTtcbiIsImltcG9ydCBicm93c2VyIGZyb20gJy4vYnJvd3Nlcic7XG5pbXBvcnQgZGV2aWNlIGZyb20gJy4vZGV2aWNlJztcbmltcG9ydCBvcyBmcm9tICcuL29zJztcbmltcG9ydCBzdXBwb3J0cyBmcm9tICcuL3N1cHBvcnRzJztcbmltcG9ydCBzY3JlZW4gZnJvbSAnLi9zY3JlZW4nO1xuXG5jb25zdCBsb2NhbCA9IC9eKD86aHR0cHM/OlxcL1xcLyk/KD86bG9jYWxob3N0fDE5MlxcLjE2OCkvLnRlc3Qod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYnJvd3NlcixcbiAgICBkZXZpY2UsXG4gICAgb3MsXG4gICAgc3VwcG9ydHMsXG4gICAgc2NyZWVuLFxuICAgIGxvY2FsXG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odWEgPSBuYXZpZ2F0b3IudXNlckFnZW50KSB7XG4gICAgcmV0dXJuIC9BbmRyb2lkL2kudGVzdCh1YSk7XG59XG4iLCJpbXBvcnQgYW5kcm9pZCBmcm9tICcuL2FuZHJvaWQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhbmRyb2lkVmVyc2lvbih1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQpIHtcbiAgICBpZiAoIWFuZHJvaWQodWEpKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBjb25zdCB2ZXJzaW9uID0gdWEubWF0Y2goL0FuZHJvaWQgKFxcZCsoPzpcXC5cXGQrKSspOy8pWzFdO1xuICAgIGNvbnN0IFthLCBiXSA9IHZlcnNpb24uc3BsaXQoJy4nKTtcbiAgICByZXR1cm4gcGFyc2VGbG9hdChgJHthfS4ke2J9YCk7XG59XG4iLCJpbXBvcnQgYW5kcm9pZCBmcm9tICcuL2FuZHJvaWQnO1xuaW1wb3J0IGFuZHJvaWRWZXJzaW9uIGZyb20gJy4vYW5kcm9pZFZlcnNpb24nO1xuaW1wb3J0IGlvcyBmcm9tICcuL2lvcyc7XG5pbXBvcnQgaW9zVmVyc2lvbiBmcm9tICcuL2lvc1ZlcnNpb24nO1xuaW1wb3J0IGxpbnV4IGZyb20gJy4vbGludXgnO1xuaW1wb3J0IG1hYyBmcm9tICcuL21hYyc7XG5pbXBvcnQgd2luZG93cyBmcm9tICcuL3dpbmRvd3MnO1xuaW1wb3J0IHdpbmRvd3NQaG9uZSBmcm9tICcuL3dpbmRvd3NQaG9uZSc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBhbmRyb2lkLFxuICAgIGFuZHJvaWRWZXJzaW9uLFxuICAgIGlvcyxcbiAgICBpb3NWZXJzaW9uLFxuICAgIGxpbnV4LFxuICAgIG1hYyxcbiAgICB3aW5kb3dzLFxuICAgIHdpbmRvd3NQaG9uZVxufTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlvcyh1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQpIHtcbiAgICByZXR1cm4gL2lQW2FvXWR8aVBob25lL2kudGVzdCh1YSk7XG59XG4iLCJpbXBvcnQgaW9zIGZyb20gJy4vaW9zJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW9zVmVyc2lvbih1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQpIHtcbiAgICBpZiAoaW9zKHVhKSkge1xuICAgICAgICBjb25zdCBbLCBiLCBjXSA9IHVhLm1hdGNoKC9PUyAoXFxkKylfKFxcZCspL2kpO1xuICAgICAgICBpZiAoYiAmJiBjKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChgJHtifS4ke2N9YCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIDA7XG59XG4iLCJpbXBvcnQgYW5kcm9pZCBmcm9tICcuL2FuZHJvaWQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsaW51eCh1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQpIHtcbiAgICByZXR1cm4gIWFuZHJvaWQodWEpICYmIC9MaW51eC8udGVzdCh1YSk7XG59XG4iLCJpbXBvcnQgaW9zIGZyb20gJy4vaW9zJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFjKHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudCkge1xuICAgIHJldHVybiAhaW9zKHVhKSAmJiAvTWFjIE9TLy50ZXN0KHVhKTtcbn1cbiIsImltcG9ydCB3aW5kb3dzUGhvbmUgZnJvbSAnLi93aW5kb3dzUGhvbmUnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB3aW5kb3dzKHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudCkge1xuICAgIHJldHVybiAhd2luZG93c1Bob25lKHVhKSAmJiAvV2luZG93cy8udGVzdCh1YSk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB3aW5kb3dzUGhvbmUodWEgPSBuYXZpZ2F0b3IudXNlckFnZW50KSB7XG4gICAgcmV0dXJuIC9XaW5kb3dzIFBob25lL2kudGVzdCh1YSk7XG59XG4iLCIvLyBzY3JlZW4ud2lkdGggLyBzY3JlZW4uaGVpZ2h0IGlzIG9mdGVuIHdyb25nIGluIEFuZHJvaWRcbmNvbnN0IGhlaWdodCA9ICgpID0+IE1hdGgubWF4KHdpbmRvdy5vdXRlckhlaWdodCwgd2luZG93LnNjcmVlbi5oZWlnaHQpO1xuY29uc3Qgd2lkdGggPSAoKSA9PiBNYXRoLm1heCh3aW5kb3cub3V0ZXJXaWR0aCwgd2luZG93LnNjcmVlbi53aWR0aCk7XG5jb25zdCBkcHIgPSAoKSA9PiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxO1xuY29uc3QgcmV0aW5hID0gKCkgPT4gZHByKCkgPiAxO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgd2lkdGgsXG4gICAgaGVpZ2h0LFxuICAgIGRwcixcbiAgICByZXRpbmFcbn07XG4iLCJleHBvcnQgZGVmYXVsdCAoKSA9PiAhIXdpbmRvdy5EZXZpY2VPcmllbnRhdGlvbkV2ZW50O1xuIiwiaW1wb3J0IHdlYmdsIGZyb20gJy4vd2ViZ2wnO1xuaW1wb3J0IHdlYm0gZnJvbSAnLi93ZWJtJztcbmltcG9ydCBtcDQgZnJvbSAnLi9tcDQnO1xuaW1wb3J0IGRldmljZU9yaWVudGF0aW9uIGZyb20gJy4vZGV2aWNlT3JpZW50YXRpb24nO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgd2ViZ2wsXG4gICAgd2VibSxcbiAgICBtcDQsXG4gICAgZGV2aWNlT3JpZW50YXRpb25cbn07XG4iLCJjb25zdCB2aWRlb0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcbmV4cG9ydCBkZWZhdWx0ICgpID0+ICEhKHZpZGVvRWwuY2FuUGxheVR5cGUgJiYgdmlkZW9FbC5jYW5QbGF5VHlwZSgndmlkZW8vbXA0OyBjb2RlY3M9XCJhdmMxLjQyRTAxRSwgbXA0YS40MC4yXCInKSk7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB3ZWJnbCgpIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgY29uc3QgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCd3ZWJnbCcpIHx8IGNhbnZhcy5nZXRDb250ZXh0KCdleHBlcmltZW50YWwtd2ViZ2wnKTtcbiAgICAgICAgcmV0dXJuICEhKHdpbmRvdy5XZWJHTFJlbmRlcmluZ0NvbnRleHQgJiYgY29udGV4dCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuIiwiY29uc3QgdmlkZW9FbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG5leHBvcnQgZGVmYXVsdCAoKSA9PiAhISh2aWRlb0VsLmNhblBsYXlUeXBlICYmIHZpZGVvRWwuY2FuUGxheVR5cGUoJ3ZpZGVvL3dlYm07IGNvZGVjcz1cInZwOCwgdm9yYmlzXCInKSk7XG4iLCIvKlxuICogY2xhc3NMaXN0IChwYXJ0aWFsIHBvbHlmaWxsIGZvciBJRSAxMCwgSUUgMTEgYW5kIEZpcmVmb3ggPDI0KVxuICogYWRhcHRlZCBmcm9tOiBodHRwczovL2dpdGh1Yi5jb20vZWxpZ3JleS9jbGFzc0xpc3QuanMvYmxvYi9tYXN0ZXIvY2xhc3NMaXN0LmpzXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgbGV0IHRlc3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnXycpO1xuXG4gICAgdGVzdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYzEnLCAnYzInKTtcblxuICAgIC8vIFBvbHlmaWxsIGZvciBJRSAxMC8xMSBhbmQgRmlyZWZveCA8MjYsIHdoZXJlIGNsYXNzTGlzdC5hZGQgYW5kXG4gICAgLy8gY2xhc3NMaXN0LnJlbW92ZSBleGlzdCBidXQgc3VwcG9ydCBvbmx5IG9uZSBhcmd1bWVudCBhdCBhIHRpbWUuXG4gICAgaWYgKCF0ZXN0RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2MyJykpIHtcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlTWV0aG9kKG1ldGhvZCkge1xuICAgICAgICAgICAgY29uc3Qgb3JpZ2luYWwgPSB3aW5kb3cuRE9NVG9rZW5MaXN0LnByb3RvdHlwZVttZXRob2RdO1xuXG4gICAgICAgICAgICB3aW5kb3cuRE9NVG9rZW5MaXN0LnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odG9rZW4pIHtcbiAgICAgICAgICAgICAgICBsZXQgaTtcbiAgICAgICAgICAgICAgICBjb25zdCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbC5jYWxsKHRoaXMsIHRva2VuKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGNyZWF0ZU1ldGhvZCgnYWRkJyk7XG4gICAgICAgIGNyZWF0ZU1ldGhvZCgncmVtb3ZlJyk7XG4gICAgfVxuXG4gICAgdGVzdEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnYzMnLCBmYWxzZSk7XG5cbiAgICAvLyBQb2x5ZmlsbCBmb3IgSUUgMTAsIElFIDExIGFuZCBGaXJlZm94IDwyNCwgd2hlcmUgY2xhc3NMaXN0LnRvZ2dsZSBkb2VzIG5vdFxuICAgIC8vIHN1cHBvcnQgdGhlIHNlY29uZCBhcmd1bWVudC5cbiAgICBpZiAodGVzdEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjMycpKSB7XG4gICAgICAgIGNvbnN0IHRvZ2dsZSA9IHdpbmRvdy5ET01Ub2tlbkxpc3QucHJvdG90eXBlLnRvZ2dsZTtcblxuICAgICAgICB3aW5kb3cuRE9NVG9rZW5MaXN0LnByb3RvdHlwZS50b2dnbGUgPSBmdW5jdGlvbih0b2tlbiwgZm9yY2UpIHtcbiAgICAgICAgICAgIGZvcmNlID0gISFmb3JjZTtcbiAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSAmJiB0aGlzLmNvbnRhaW5zKHRva2VuKSA9PT0gZm9yY2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9yY2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0b2dnbGUuY2FsbCh0aGlzLCB0b2tlbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdGVzdEVsZW1lbnQgPSBudWxsO1xufSgpKTtcbiIsIihmdW5jdGlvbihmbikge1xuICAgIHdpbmRvdy5jb25zb2xlID0gd2luZG93LmNvbnNvbGUgfHwge307XG4gICAgY29uc3QgbWV0aG9kcyA9IFtcbiAgICAgICAgJ2Fzc2VydCcsXG4gICAgICAgICdjbGVhcicsXG4gICAgICAgICdjb3VudCcsXG4gICAgICAgICdkZWJ1ZycsXG4gICAgICAgICdkaXInLFxuICAgICAgICAnZGlyeG1sJyxcbiAgICAgICAgJ2Vycm9yJyxcbiAgICAgICAgJ2dyb3VwJyxcbiAgICAgICAgJ2dyb3VwQ29sbGFwc2VkJyxcbiAgICAgICAgJ2dyb3VwRW5kJyxcbiAgICAgICAgJ2luZm8nLFxuICAgICAgICAnbG9nJyxcbiAgICAgICAgJ21hcmtUaW1lbGluZScsXG4gICAgICAgICdtZW1vcnknLFxuICAgICAgICAncHJvZmlsZScsXG4gICAgICAgICdwcm9maWxlRW5kJyxcbiAgICAgICAgJ3RhYmxlJyxcbiAgICAgICAgJ3RpbWUnLFxuICAgICAgICAndGltZUVuZCcsXG4gICAgICAgICd0aW1lU3RhbXAnLFxuICAgICAgICAndGltZWxpbmUnLFxuICAgICAgICAndGltZWxpbmVFbmQnLFxuICAgICAgICAndHJhY2UnLFxuICAgICAgICAnd2FybidcbiAgICBdO1xuICAgIG1ldGhvZHMuZm9yRWFjaCgobmFtZSkgPT4ge1xuICAgICAgICB3aW5kb3cuY29uc29sZVtuYW1lXSA9IHdpbmRvdy5jb25zb2xlW25hbWVdIHx8IGZuO1xuICAgIH0pO1xufShmdW5jdGlvbigpIHt9KSk7XG4iLCJpbXBvcnQgJy4vY2xhc3NMaXN0JztcbmltcG9ydCAnLi9jb25zb2xlJztcbmltcG9ydCAnLi9yZXF1ZXN0QW5pbWF0aW9uRnJhbWUnO1xuIiwiLypcbiAqIHJlcXVlc3RBbmltYXRpb25GcmFtZSAoaW9zNiBhbmQgYW5kcm9pZCA8IDQuNClcbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgaWYgKCF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKSB7XG4gICAgICAgIGNvbnN0IHZlbmRvcnMgPSBbJ21zJywgJ21veicsICd3ZWJraXQnLCAnbyddO1xuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHZlbmRvcnMubGVuZ3RoICYmICF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lOyArK3gpIHtcbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3dbdmVuZG9yc1t4XSArICdSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXTtcbiAgICAgICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9IHdpbmRvd1t2ZW5kb3JzW3hdICsgJ0NhbmNlbEFuaW1hdGlvbkZyYW1lJ10gfHwgd2luZG93W3ZlbmRvcnNbeF0gK1xuICAgICAgICAgICAgICAgICdDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXTtcbiAgICAgICAgfVxuICAgIH1cbn0oKSk7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwb3B1cCh1cmwsIHdpZHRoID0gODAwLCBoZWlnaHQgPSA2MDAsIG5hbWUgPSAnJykge1xuICAgIGNvbnN0IGxlZnQgPSAod2luZG93LnNjcmVlbi53aWR0aCAtIHdpZHRoKSAvIDI7XG4gICAgY29uc3QgdG9wID0gKHdpbmRvdy5zY3JlZW4uaGVpZ2h0IC0gaGVpZ2h0KSAvIDI7XG4gICAgLy8gY29uc3QgbGVmdCA9ICh3aW5kb3cuc2NyZWVuLmF2YWlsV2lkdGggLSB3aWR0aCkgLyAyO1xuICAgIC8vIGNvbnN0IHRvcCA9ICh3aW5kb3cuc2NyZWVuLmF2YWlsSGVpZ2h0IC0gaGVpZ2h0KSAvIDI7XG4gICAgY29uc3QgZGVmYXVsdHMgPSAnZGlyZWN0b3JpZXM9bm8sbG9jYXRpb249bm8sbWVudWJhcj1ubyxyZXNpemFibGU9bm8sc2Nyb2xsYmFycz1ubyxzdGF0dXM9bm8sdG9vbGJhcj1ubyc7XG4gICAgY29uc3QgcGFyYW1zID0gYHdpZHRoPSR7d2lkdGh9LGhlaWdodD0ke2hlaWdodH0sdG9wPSR7dG9wfSxsZWZ0PSR7bGVmdH0sJHtkZWZhdWx0c31gO1xuICAgIGNvbnN0IHdpbiA9IHdpbmRvdy5vcGVuKHVybCwgbmFtZSwgcGFyYW1zKTtcbiAgICBpZiAod2luID09PSBudWxsIHx8IHR5cGVvZiB3aW4gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHdpbmRvdy5mb2N1cykge1xuICAgICAgICB3aW4uZm9jdXMoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG4iLCJpbXBvcnQgcG9wdXAgZnJvbSAnLi4vcG9wdXAnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlbWFpbCh1cmwsIHN1YmplY3QgPSAnJywgYm9keSA9ICcnKSB7XG4gICAgdXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KHVybCk7XG4gICAgc3ViamVjdCA9IGVuY29kZVVSSUNvbXBvbmVudChzdWJqZWN0KTtcblxuICAgIGNvbnN0IG5ld2xpbmVzID0gZW5jb2RlVVJJQ29tcG9uZW50KCdcXHJcXG5cXHJcXG4nKTtcbiAgICBib2R5ID0gYm9keSA/IGAke2VuY29kZVVSSUNvbXBvbmVudChib2R5KX0ke25ld2xpbmVzfWAgOiAnJztcblxuICAgIHJldHVybiBwb3B1cChgbWFpbHRvOj9zdWJqZWN0PSR7c3ViamVjdH0mYm9keT0ke2JvZHl9JHt1cmx9YCk7XG59XG4iLCJpbXBvcnQgcG9wdXAgZnJvbSAnLi4vcG9wdXAnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmYWNlYm9vayh1cmwpIHtcbiAgICB1cmwgPSBlbmNvZGVVUklDb21wb25lbnQodXJsKTtcbiAgICByZXR1cm4gcG9wdXAoYGh0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS9zaGFyZXIvc2hhcmVyLnBocD91PSR7dXJsfWApO1xufVxuIiwiaW1wb3J0IHBvcHVwIGZyb20gJy4uL3BvcHVwJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZmFjZWJvb2tGZWVkRGlhbG9nKGFwcElkLCByZWRpcmVjdCwgdXJsLCB0aXRsZSA9ICcnLCBpbWFnZSA9ICcnLCBjYXB0aW9uID0gJycsIGRlc2MgPSAnJywgc291cmNlID0gJycpIHtcbiAgICB0aXRsZSA9IGVuY29kZVVSSUNvbXBvbmVudCh0aXRsZSk7XG4gICAgY2FwdGlvbiA9IGVuY29kZVVSSUNvbXBvbmVudChjYXB0aW9uKTtcbiAgICBkZXNjID0gZW5jb2RlVVJJQ29tcG9uZW50KGRlc2MpO1xuXG4gICAgY29uc3QgcGFyYW1zID0gYD9kaXNwbGF5PXBvcHVwJnNob3dfZXJyb3I9dHJ1ZSZhcHBfaWQ9JHthcHBJZH0mc291cmNlPSR7c291cmNlfSZyZWRpcmVjdF91cmk9JHtyZWRpcmVjdH1gO1xuICAgIGNvbnN0IGNvbnRlbnQgPSBgbmFtZT0ke3RpdGxlfSZsaW5rPSR7dXJsfSZjYXB0aW9uPSR7Y2FwdGlvbn0mZGVzY3JpcHRpb249JHtkZXNjfSZwaWN0dXJlPSR7aW1hZ2V9YDtcblxuICAgIHJldHVybiBwb3B1cChgaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL2RpYWxvZy9mZWVkPyR7cGFyYW1zfSYke2NvbnRlbnR9YCk7XG59XG4iLCJpbXBvcnQgcG9wdXAgZnJvbSAnLi4vcG9wdXAnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnb29nbGVwbHVzKHVybCkge1xuICAgIHVybCA9IGVuY29kZVVSSUNvbXBvbmVudCh1cmwpO1xuICAgIHJldHVybiBwb3B1cChgaHR0cHM6Ly9wbHVzLmdvb2dsZS5jb20vc2hhcmU/dXJsPSR7dXJsfWApO1xufVxuIiwiaW1wb3J0IGVtYWlsIGZyb20gJy4vZW1haWwnO1xuaW1wb3J0IGZhY2Vib29rIGZyb20gJy4vZmFjZWJvb2snO1xuaW1wb3J0IGZhY2Vib29rRmVlZERpYWxvZyBmcm9tICcuL2ZhY2Vib29rRmVlZERpYWxvZyc7XG5pbXBvcnQgZ29vZ2xlcGx1cyBmcm9tICcuL2dvb2dsZXBsdXMnO1xuaW1wb3J0IGxpbmtlZGluIGZyb20gJy4vbGlua2VkaW4nO1xuaW1wb3J0IHBpbnRlcmVzdCBmcm9tICcuL3BpbnRlcmVzdCc7XG5pbXBvcnQgcmVkZGl0IGZyb20gJy4vcmVkZGl0JztcbmltcG9ydCByZW5yZW4gZnJvbSAnLi9yZW5yZW4nO1xuaW1wb3J0IHNtcyBmcm9tICcuL3Ntcyc7XG5pbXBvcnQgdHdpdHRlciBmcm9tICcuL3R3aXR0ZXInO1xuaW1wb3J0IHZrb250YWt0ZSBmcm9tICcuL3Zrb250YWt0ZSc7XG5pbXBvcnQgd2VpYm8gZnJvbSAnLi93ZWlibyc7XG5pbXBvcnQgd2hhdHNhcHAgZnJvbSAnLi93aGF0c2FwcCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBlbWFpbCxcbiAgICBmYWNlYm9vayxcbiAgICBmYWNlYm9va0ZlZWREaWFsb2csXG4gICAgZ29vZ2xlcGx1cyxcbiAgICBsaW5rZWRpbixcbiAgICBwaW50ZXJlc3QsXG4gICAgcmVkZGl0LFxuICAgIHJlbnJlbixcbiAgICBzbXMsXG4gICAgdHdpdHRlcixcbiAgICB2a29udGFrdGUsXG4gICAgd2VpYm8sXG4gICAgd2hhdHNhcHBcbn07XG4iLCJpbXBvcnQgcG9wdXAgZnJvbSAnLi4vcG9wdXAnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsaW5rZWRpbih1cmwsIHRpdGxlID0gJycpIHtcbiAgICB1cmwgPSBlbmNvZGVVUklDb21wb25lbnQodXJsKTtcbiAgICB0aXRsZSA9IGVuY29kZVVSSUNvbXBvbmVudCh0aXRsZSk7XG4gICAgcmV0dXJuIHBvcHVwKGBodHRwczovL3d3dy5saW5rZWRpbi5jb20vc2hhcmVBcnRpY2xlP21pbmk9dHJ1ZSZ1cmw9JHt1cmx9JnRpdGxlPSR7dGl0bGV9YCk7XG59XG4iLCJpbXBvcnQgcG9wdXAgZnJvbSAnLi4vcG9wdXAnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwaW50ZXJlc3QodXJsLCBtZWRpYSwgZGVzYyA9ICcnKSB7XG4gICAgdXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KHVybCk7XG4gICAgbWVkaWEgPSBlbmNvZGVVUklDb21wb25lbnQobWVkaWEpO1xuICAgIGRlc2MgPSBlbmNvZGVVUklDb21wb25lbnQoZGVzYyk7XG4gICAgcmV0dXJuIHBvcHVwKGBodHRwczovL3BpbnRlcmVzdC5jb20vcGluL2NyZWF0ZS9idXR0b24vP3VybD0ke3VybH0mbWVkaWE9JHttZWRpYX0mZGVzY3JpcHRpb249JHtkZXNjfWApO1xufVxuIiwiaW1wb3J0IHBvcHVwIGZyb20gJy4uL3BvcHVwJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVkZGl0KHVybCwgdGl0bGUgPSAnJykge1xuICAgIHVybCA9IGVuY29kZVVSSUNvbXBvbmVudCh1cmwpO1xuICAgIHRpdGxlID0gZW5jb2RlVVJJQ29tcG9uZW50KHRpdGxlKTtcbiAgICByZXR1cm4gcG9wdXAoYGh0dHBzOi8vd3d3LnJlZGRpdC5jb20vc3VibWl0P3VybD0ke3VybH0mdGl0bGU9JHt0aXRsZX1gKTtcbn1cbiIsImltcG9ydCBwb3B1cCBmcm9tICcuLi9wb3B1cCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHZrb250YWt0ZSh1cmwsIHRpdGxlID0gJycpIHtcbiAgICB1cmwgPSBlbmNvZGVVUklDb21wb25lbnQodXJsKTtcbiAgICB0aXRsZSA9IGVuY29kZVVSSUNvbXBvbmVudCh0aXRsZSk7XG4gICAgcmV0dXJuIHBvcHVwKGBodHRwOi8vc2hhcmUucmVucmVuLmNvbS9zaGFyZS9idXR0b25zaGFyZS5kbz9saW5rPSR7dXJsfSZ0aXRsZT0ke3RpdGxlfWApO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc21zKHVybCwgYm9keSA9ICcnKSB7XG4gICAgdXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KHVybCk7XG5cbiAgICBjb25zdCBuZXdsaW5lcyA9IGVuY29kZVVSSUNvbXBvbmVudCgnXFxyXFxuXFxyXFxuJyk7XG4gICAgYm9keSA9IGJvZHkgPyBgJHtlbmNvZGVVUklDb21wb25lbnQoYm9keSl9JHtuZXdsaW5lc31gIDogJyc7XG5cbiAgICBjb25zdCBpb3MgPSAvaVBbYW9dZHxpUGhvbmUvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgIGNvbnN0IGRlbGltID0gaW9zID8gJyYnIDogJz8nO1xuXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgc21zOiR7ZGVsaW19Ym9keT0ke2JvZHl9JHt1cmx9YDtcbn1cbiIsImltcG9ydCBwb3B1cCBmcm9tICcuLi9wb3B1cCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHR3aXR0ZXIodXJsLCB0ZXh0ID0gJycsIGhhc2h0YWdzID0gJycsIHJlbGF0ZWQgPSAnJykge1xuICAgIHVybCA9IGVuY29kZVVSSUNvbXBvbmVudCh1cmwpO1xuICAgIHRleHQgPSBlbmNvZGVVUklDb21wb25lbnQodGV4dCk7XG4gICAgaGFzaHRhZ3MgPSBlbmNvZGVVUklDb21wb25lbnQoaGFzaHRhZ3MpO1xuICAgIHJlbGF0ZWQgPSBlbmNvZGVVUklDb21wb25lbnQocmVsYXRlZCk7XG5cbiAgICByZXR1cm4gcG9wdXAoYGh0dHBzOi8vdHdpdHRlci5jb20vaW50ZW50L3R3ZWV0P3VybD0ke3VybH0mdGV4dD0ke3RleHR9Jmhhc2h0YWdzPSR7aGFzaHRhZ3N9JnJlbGF0ZWQ9JHtyZWxhdGVkfWApO1xufVxuIiwiaW1wb3J0IHBvcHVwIGZyb20gJy4uL3BvcHVwJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdmtvbnRha3RlKHVybCwgdGl0bGUgPSAnJywgZGVzY3JpcHRpb24gPSAnJywgaW1hZ2UgPSAnJykge1xuICAgIHVybCA9IGVuY29kZVVSSUNvbXBvbmVudCh1cmwpO1xuICAgIHRpdGxlID0gZW5jb2RlVVJJQ29tcG9uZW50KHRpdGxlKTtcbiAgICBkZXNjcmlwdGlvbiA9IGVuY29kZVVSSUNvbXBvbmVudChkZXNjcmlwdGlvbik7XG4gICAgaW1hZ2UgPSBlbmNvZGVVUklDb21wb25lbnQoaW1hZ2UpO1xuICAgIHJldHVybiBwb3B1cChgaHR0cDovL3Zrb250YWt0ZS5ydS9zaGFyZS5waHA/dXJsPSR7dXJsfSZ0aXRsZT0ke3RpdGxlfSZkZXNjcmlwdGlvbj0ke2Rlc2NyaXB0aW9ufSZpbWFnZT0ke2ltYWdlfWApO1xufVxuIiwiaW1wb3J0IHBvcHVwIGZyb20gJy4uL3BvcHVwJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gd2VpYm8odXJsLCB0aXRsZSA9ICcnLCBpbWFnZSA9ICcnKSB7XG4gICAgdXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KHVybCk7XG4gICAgdGl0bGUgPSBlbmNvZGVVUklDb21wb25lbnQodGl0bGUpO1xuICAgIGltYWdlID0gZW5jb2RlVVJJQ29tcG9uZW50KGltYWdlKTtcblxuICAgIGNvbnN0IHBhcmFtcyA9IGB1cmw9JHt1cmx9JmFwcGtleT0mdGl0bGU9JHt0aXRsZX0mcGljPSR7aW1hZ2V9JnJhbGF0ZVVpZD0mbGFuZ3VhZ2U9emhfY25gO1xuICAgIHJldHVybiBwb3B1cChgaHR0cDovL3NlcnZpY2Uud2VpYm8uY29tL3NoYXJlL3NoYXJlLnBocD8ke3BhcmFtc31gKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdoYXRzYXBwKHVybCwgYm9keSA9ICcnKSB7XG4gICAgdXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KHVybCk7XG5cbiAgICBjb25zdCBuZXdsaW5lcyA9IGVuY29kZVVSSUNvbXBvbmVudCgnXFxyXFxuXFxyXFxuJyk7XG4gICAgYm9keSA9IGJvZHkgPyBgJHtlbmNvZGVVUklDb21wb25lbnQoYm9keSl9JHtuZXdsaW5lc31gIDogJyc7XG5cbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGB3aGF0c2FwcDovL3NlbmQ/dGV4dD0ke2JvZHl9JHt1cmx9YDtcbn1cbiIsImZ1bmN0aW9uIGxvYWQoa2V5KSB7XG4gICAgbGV0IGl0ZW0gPSBudWxsO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgaXRlbSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7fVxuXG4gICAgcmV0dXJuIGl0ZW07XG59XG5cbmZ1bmN0aW9uIHNhdmUoa2V5LCBpdGVtKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBpdGVtKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0NvdWxkblxcJ3Qgc2F2ZSBpbiBsb2NhbFN0b3JhZ2UnKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGxvYWRKU09OKGtleSkge1xuICAgIGNvbnN0IGl0ZW0gPSBsb2FkKGtleSk7XG4gICAgcmV0dXJuIGl0ZW0gPyBKU09OLnBhcnNlKGl0ZW0pIDogbnVsbDtcbn1cblxuZnVuY3Rpb24gc2F2ZUpTT04oa2V5LCBpdGVtKSB7XG4gICAgcmV0dXJuIHNhdmUoa2V5LCBKU09OLnN0cmluZ2lmeShpdGVtKSk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZShrZXkpIHtcbiAgICB0cnkge1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICAgIH0gY2F0Y2ggKGVycikge31cbn1cblxuZXhwb3J0IGRlZmF1bHQge2xvYWQsIHNhdmUsIGxvYWRKU09OLCBzYXZlSlNPTiwgcmVtb3ZlfTtcbiIsIi8vIGV2ZXJ5dGhpbmcgYWZ0ZXIgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2Ygc3Vic3RyIGluIHN0clxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWZ0ZXJGaXJzdChzdHIsIHN1YnN0cikge1xuICAgIGxldCBpbmRleCA9IHN0ci5pbmRleE9mKHN1YnN0cik7XG4gICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGluZGV4ICs9IHN1YnN0ci5sZW5ndGg7XG4gICAgcmV0dXJuIHN0ci5zbGljZShpbmRleCk7XG59XG4iLCIvLyBldmVyeXRoaW5nIGFmdGVyIHRoZSBsYXN0IG9jY3VyZW5jZSBvZiBzdWJzdHIgaW4gc3RyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhZnRlckxhc3Qoc3RyLCBzdWJzdHIpIHtcbiAgICBsZXQgaW5kZXggPSBzdHIubGFzdEluZGV4T2Yoc3Vic3RyKTtcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgaW5kZXggKz0gc3Vic3RyLmxlbmd0aDtcbiAgICByZXR1cm4gc3RyLnNsaWNlKGluZGV4KTtcbn1cbiIsIi8vIGV2ZXJ5dGhpbmcgYmVmb3JlIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIHN1YnN0ciBpbiBzdHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJlZm9yZUZpcnN0KHN0ciwgc3Vic3RyKSB7XG4gICAgY29uc3QgaW5kZXggPSBzdHIuaW5kZXhPZihzdWJzdHIpO1xuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICByZXR1cm4gc3RyLnNsaWNlKDAsIGluZGV4KTtcbn1cbiIsIi8vIGV2ZXJ5dGhpbmcgYmVmb3JlIHRoZSBsYXN0IG9jY3VycmVuY2Ugb2Ygc3Vic3RyIGluIHRoZSBzdHJpbmcuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBiZWZvcmVMYXN0KHN0ciwgc3Vic3RyKSB7XG4gICAgY29uc3QgaW5kZXggPSBzdHIubGFzdEluZGV4T2Yoc3Vic3RyKTtcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgcmV0dXJuIHN0ci5zbGljZSgwLCBpbmRleCk7XG59XG4iLCIvLyB3aGV0aGVyIHN0ciBiZWdpbnMgd2l0aCBzdWJzdHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJlZ2luc1dpdGgoc3RyLCBzdWJzdHIpIHtcbiAgICByZXR1cm4gc3RyLmluZGV4T2Yoc3Vic3RyKSA9PT0gMDtcbn1cbiIsIi8vIGV2ZXJ5dGhpbmcgYWZ0ZXIgdGhlIGZpcnN0IG9jY3VyYW5jZSBvZiBzdGFydCBhbmQgYmVmb3JlIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIGVuZFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmV0d2VlbihzdHIsIHN0YXJ0LCBlbmQpIHtcbiAgICBsZXQgc3Vic3RyID0gJyc7XG4gICAgbGV0IHN0YXJ0SW5kZXggPSBzdHIuaW5kZXhPZihzdGFydCk7XG4gICAgaWYgKHN0YXJ0SW5kZXggIT09IC0xKSB7XG4gICAgICAgIHN0YXJ0SW5kZXggKz0gc3RhcnQubGVuZ3RoO1xuICAgICAgICBjb25zdCBlbmRJbmRleCA9IHN0ci5pbmRleE9mKGVuZCwgc3RhcnRJbmRleCk7XG4gICAgICAgIGlmIChlbmRJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHN1YnN0ciA9IHN0ci5zbGljZShzdGFydEluZGV4LCBlbmRJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN1YnN0cjtcbn1cbiIsImltcG9ydCBlc2NhcGVQYXR0ZXJuIGZyb20gJy4vZXNjYXBlUGF0dGVybic7XG5pbXBvcnQgdHJ1bmNhdGUgZnJvbSAnLi90cnVuY2F0ZSc7XG4vLyBVdGlsaXR5IG1ldGhvZCB0aGF0IGludGVsbGlnZW50bHkgYnJlYWtzIHVwIHlvdXIgc3RyaW5nLFxuLy8gYWxsb3dpbmcgeW91IHRvIGNyZWF0ZSBibG9ja3Mgb2YgcmVhZGFibGUgdGV4dC5cbi8vIFRoaXMgbWV0aG9kIHJldHVybnMgeW91IHRoZSBjbG9zZXN0IHBvc3NpYmxlIG1hdGNoIHRvIHRoZSBkZWxpbSBwYXJhbWF0ZXIsXG4vLyB3aGlsZSBrZWVwaW5nIHRoZSB0ZXh0IGxlbmd0aCB3aXRoaW4gdGhlIGxlbiBwYXJhbXRlci5cbi8vIElmIGEgbWF0Y2ggY2FuJ3QgYmUgZm91bmQgaW4geW91ciBzcGVjaWZpZWQgbGVuZ3RoIGFuICAnLi4uJyBpcyBhZGRlZCB0byB0aGF0IGJsb2NrLFxuLy8gYW5kIHRoZSBibG9ja2luZyBjb250aW51ZXMgdW50aWxsIGFsbCB0aGUgdGV4dCBpcyBicm9rZW4gYXBhcnQuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBibG9jayhzdHIsIGxlbiwgZGVsaW0gPSAnLicpIHtcbiAgICBjb25zdCBhcnIgPSBbXTtcblxuICAgIGlmICghc3RyIHx8ICFzdHIuaW5jbHVkZXMoZGVsaW0pKSB7XG4gICAgICAgIHJldHVybiBhcnI7XG4gICAgfVxuXG4gICAgaWYgKGRlbGltID09PSAnICcpIHtcbiAgICAgICAgc3RyICs9IGRlbGltO1xuICAgIH1cblxuICAgIGxldCBjaHJJbmRleCA9IDA7XG4gICAgY29uc3QgcmVwbFBhdHQgPSBuZXcgUmVnRXhwKCdbXicgKyBlc2NhcGVQYXR0ZXJuKGRlbGltKSArICddKyQnKTtcblxuICAgIHdoaWxlIChjaHJJbmRleCA8IHN0ci5sZW5ndGgpIHtcbiAgICAgICAgbGV0IHN1YlN0cmluZyA9IHN0ci5zdWJzdHIoY2hySW5kZXgsIGxlbik7XG4gICAgICAgIGlmICghc3ViU3RyaW5nLmluY2x1ZGVzKGRlbGltKSkge1xuICAgICAgICAgICAgYXJyLnB1c2godHJ1bmNhdGUoc3ViU3RyaW5nLCBzdWJTdHJpbmcubGVuZ3RoKSk7XG4gICAgICAgICAgICBjaHJJbmRleCArPSBzdWJTdHJpbmcubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIHN1YlN0cmluZyA9IHN1YlN0cmluZy5yZXBsYWNlKHJlcGxQYXR0LCAnJyk7XG4gICAgICAgIGNockluZGV4ICs9IHN1YlN0cmluZy5sZW5ndGg7XG4gICAgICAgIGFyci5wdXNoKHN1YlN0cmluZy50cmltKCkpO1xuICAgIH1cbiAgICByZXR1cm4gYXJyO1xufVxuIiwiLy8gQ2FwaXRhbGl6ZSB0aGUgZmlyc3Qgd29yZCBpbiBhIHN0cmluZyBvciBhbGwgd29yZHNcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNhcGl0YWxpemUoc3RyLCBhbGwgPSBmYWxzZSkge1xuICAgIGNvbnN0IHN1YnN0ciA9IHN0ci50cmltTGVmdCgpO1xuICAgIGNvbnN0IHJlID0gYWxsID8gL14ufFxcYi4vZyA6IC8oXlxcdykvO1xuICAgIHJldHVybiBzdWJzdHIucmVwbGFjZShyZSwgKG1hdGNoKSA9PiBtYXRjaC50b1VwcGVyQ2FzZSgpKTtcbn1cbiIsImltcG9ydCBlc2NhcGVQYXR0ZXJuIGZyb20gJy4vZXNjYXBlUGF0dGVybic7XG5cbi8vIHRoZSBudW1iZXIgb2YgdGltZXMgc3Vic3RyIGFwcGVhcnMgd2l0aGluIHN0clxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY291bnRPZihzdHIsIHN1YnN0ciwgY2FzZVNlbnNpdGl2ZSkge1xuICAgIGNvbnN0IGVzY2FwZWRTdHIgPSBlc2NhcGVQYXR0ZXJuKHN1YnN0cik7XG4gICAgY29uc3QgZmxhZ3MgPSAoIWNhc2VTZW5zaXRpdmUpID8gJ2lnJyA6ICdnJztcbiAgICByZXR1cm4gc3RyLm1hdGNoKG5ldyBSZWdFeHAoZXNjYXBlZFN0ciwgZmxhZ3MpKS5sZW5ndGg7XG59XG4iLCIvLyBMZXZlbnNodGVpbiBkaXN0YW5jZSAoZWRpdERpc3RhbmNlKSBpcyBhIG1lYXN1cmUgb2YgdGhlIHNpbWlsYXJpdHkgYmV0d2VlblxuLy8gdHdvIHN0cmluZ3MuIFRoZSBkaXN0YW5jZSBpcyB0aGUgbnVtYmVyIG9mIGRlbGV0aW9ucywgaW5zZXJ0aW9ucywgb3Jcbi8vIHN1YnN0aXR1dGlvbnMgcmVxdWlyZWQgdG8gdHJhbnNmb3JtIHNvdXJjZSBpbnRvIHRhcmdldC5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGVkaXREaXN0YW5jZShzb3VyY2UgPSAnJywgdGFyZ2V0ID0gJycpIHtcblxuICAgIGlmIChzb3VyY2UgPT09IHRhcmdldCkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICBpZiAoIXNvdXJjZS5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldC5sZW5ndGg7XG4gICAgfVxuXG4gICAgaWYgKCF0YXJnZXQubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2UubGVuZ3RoO1xuICAgIH1cblxuICAgIGNvbnN0IGQgPSBbXTtcbiAgICBsZXQgaSwgaiwgY29zdDtcblxuICAgIGZvciAoaSA9IDA7IGkgPD0gc291cmNlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGRbaV0gPSBbXTtcbiAgICB9XG4gICAgZm9yIChpID0gMDsgaSA8PSBzb3VyY2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZFtpXVswXSA9IGk7XG4gICAgfVxuICAgIGZvciAoaiA9IDA7IGogPD0gdGFyZ2V0Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGRbMF1bal0gPSBqO1xuICAgIH1cblxuICAgIGZvciAoaSA9IDE7IGkgPD0gc291cmNlLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgY29uc3Qgc2kgPSBzb3VyY2UuY2hhckF0KGkgLSAxKTtcbiAgICAgICAgZm9yIChqID0gMTsgaiA8PSB0YXJnZXQubGVuZ3RoOyBqKyspIHtcblxuICAgICAgICAgICAgY29uc3QgdGogPSB0YXJnZXQuY2hhckF0KGogLSAxKTtcblxuICAgICAgICAgICAgaWYgKHNpID09PSB0aikge1xuICAgICAgICAgICAgICAgIGNvc3QgPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb3N0ID0gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZFtpXVtqXSA9IE1hdGgubWluKGRbaSAtIDFdW2pdICsgMSwgZFtpXVtqIC0gMV0gKyAxLCBkW2kgLSAxXVtqIC0gMV0gKyBjb3N0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkW3NvdXJjZS5sZW5ndGhdW3RhcmdldC5sZW5ndGhdO1xufVxuIiwiLy8gd2hldGhlciBzdHIgZW5kcyB3aXRoIHN1YnN0clxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZW5kc1dpdGgoc3RyLCBzdWJzdHIpIHtcbiAgICByZXR1cm4gc3RyLmxhc3RJbmRleE9mKHN1YnN0cikgPT09IHN0ci5sZW5ndGggLSBzdWJzdHIubGVuZ3RoO1xufVxuIiwiLy8gZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXNjYXBlSHRtbChzdHIpIHtcbi8vICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbi8vICAgICBkaXYuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoc3RyKSk7XG4vLyAgICAgcmV0dXJuIGRpdi5pbm5lckhUTUw7XG4vLyB9XG5cbmNvbnN0IGVudGl0eU1hcCA9IHtcbiAgICAnJic6ICcmYW1wOycsXG4gICAgJzwnOiAnJmx0OycsXG4gICAgJz4nOiAnJmd0OycsXG4gICAgJ1wiJzogJyZxdW90OycsXG4gICAgJ1xcJyc6ICcmIzM5OycsXG4gICAgJy8nOiAnJiN4MkY7JyxcbiAgICAnYCc6ICcmI3g2MDsnLFxuICAgICc9JzogJyYjeDNEOydcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGVzY2FwZUh0bWwoc3RyaW5nKSB7XG4gICAgcmV0dXJuIFN0cmluZyhzdHJpbmcpXG4gICAgICAgIC5yZXBsYWNlKC9bJjw+XCInYD1cXC9dL2csIGZ1bmN0aW9uIGZyb21FbnRpdHlNYXAocykge1xuICAgICAgICAgICAgcmV0dXJuIGVudGl0eU1hcFtzXTtcbiAgICAgICAgfSk7XG59XG4iLCIvLyByZWdleCBlc2NhcGUgcGF0dGVyblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXNjYXBlUGF0dGVybihwYXR0ZXJuKSB7XG4gICAgcmV0dXJuIHBhdHRlcm4ucmVwbGFjZSgvKFxcXXxcXFt8XFx7fFxcfXxcXCh8XFwpfFxcKnxcXCt8XFw/fFxcLnxcXFxcKS9nLCAnXFxcXCQxJyk7XG59XG4iLCJpbXBvcnQgcmVtb3ZlRXh0cmFXaGl0ZXNwYWNlIGZyb20gJy4vcmVtb3ZlRXh0cmFXaGl0ZXNwYWNlJztcblxuLy8gd2hldGhlciBzdHIgY29udGFpbnMgYW55IHRleHRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGhhc1RleHQoc3RyKSB7XG4gICAgcmV0dXJuICEhcmVtb3ZlRXh0cmFXaGl0ZXNwYWNlKHN0cikubGVuZ3RoO1xufVxuIiwiaW1wb3J0IGFmdGVyRmlyc3QgZnJvbSAnLi9hZnRlckZpcnN0JztcbmltcG9ydCBhZnRlckxhc3QgZnJvbSAnLi9hZnRlckxhc3QnO1xuaW1wb3J0IGJlZm9yZUZpcnN0IGZyb20gJy4vYmVmb3JlRmlyc3QnO1xuaW1wb3J0IGJlZm9yZUxhc3QgZnJvbSAnLi9iZWZvcmVMYXN0JztcbmltcG9ydCBiZWdpbnNXaXRoIGZyb20gJy4vYmVnaW5zV2l0aCc7XG5pbXBvcnQgYmV0d2VlbiBmcm9tICcuL2JldHdlZW4nO1xuaW1wb3J0IGJsb2NrIGZyb20gJy4vYmxvY2snO1xuaW1wb3J0IGNhcGl0YWxpemUgZnJvbSAnLi9jYXBpdGFsaXplJztcbmltcG9ydCBjb3VudE9mIGZyb20gJy4vY291bnRPZic7XG5pbXBvcnQgZWRpdERpc3RhbmNlIGZyb20gJy4vZWRpdERpc3RhbmNlJztcbmltcG9ydCBlbmRzV2l0aCBmcm9tICcuL2VuZHNXaXRoJztcbmltcG9ydCBlc2NhcGVIVE1MIGZyb20gJy4vZXNjYXBlSFRNTCc7XG5pbXBvcnQgZXNjYXBlUGF0dGVybiBmcm9tICcuL2VzY2FwZVBhdHRlcm4nO1xuaW1wb3J0IGhhc1RleHQgZnJvbSAnLi9oYXNUZXh0JztcbmltcG9ydCBpc051bWVyaWMgZnJvbSAnLi9pc051bWVyaWMnO1xuaW1wb3J0IHBhZExlZnQgZnJvbSAnLi9wYWRMZWZ0JztcbmltcG9ydCBwYWRSaWdodCBmcm9tICcuL3BhZFJpZ2h0JztcbmltcG9ydCBwcmV2ZW50V2lkb3cgZnJvbSAnLi9wcmV2ZW50V2lkb3cnO1xuaW1wb3J0IHByb3BlckNhc2UgZnJvbSAnLi9wcm9wZXJDYXNlJztcbmltcG9ydCByZW1vdmUgZnJvbSAnLi9yZW1vdmUnO1xuaW1wb3J0IHJlbW92ZUV4dHJhV2hpdGVzcGFjZSBmcm9tICcuL3JlbW92ZUV4dHJhV2hpdGVzcGFjZSc7XG5pbXBvcnQgcmV2ZXJzZSBmcm9tICcuL3JldmVyc2UnO1xuaW1wb3J0IHJldmVyc2VXb3JkcyBmcm9tICcuL3JldmVyc2VXb3Jkcyc7XG5pbXBvcnQgc2ltaWxhcml0eSBmcm9tICcuL3NpbWlsYXJpdHknO1xuaW1wb3J0IHN0cmlwVGFncyBmcm9tICcuL3N0cmlwVGFncyc7XG5pbXBvcnQgc3dhcENhc2UgZnJvbSAnLi9zd2FwQ2FzZSc7XG5pbXBvcnQgdGltZUNvZGUgZnJvbSAnLi90aW1lQ29kZSc7XG5pbXBvcnQgdG9OdW1iZXIgZnJvbSAnLi90b051bWJlcic7XG5pbXBvcnQgdHJ1bmNhdGUgZnJvbSAnLi90cnVuY2F0ZSc7XG5pbXBvcnQgd29yZENvdW50IGZyb20gJy4vd29yZENvdW50JztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGFmdGVyRmlyc3QsXG4gICAgYWZ0ZXJMYXN0LFxuICAgIGJlZm9yZUZpcnN0LFxuICAgIGJlZm9yZUxhc3QsXG4gICAgYmVnaW5zV2l0aCxcbiAgICBiZXR3ZWVuLFxuICAgIGJsb2NrLFxuICAgIGNhcGl0YWxpemUsXG4gICAgY291bnRPZixcbiAgICBlZGl0RGlzdGFuY2UsXG4gICAgZW5kc1dpdGgsXG4gICAgZXNjYXBlSFRNTCxcbiAgICBlc2NhcGVQYXR0ZXJuLFxuICAgIGhhc1RleHQsXG4gICAgaXNOdW1lcmljLFxuICAgIHBhZExlZnQsXG4gICAgcGFkUmlnaHQsXG4gICAgcHJldmVudFdpZG93LFxuICAgIHByb3BlckNhc2UsXG4gICAgcmVtb3ZlLFxuICAgIHJlbW92ZUV4dHJhV2hpdGVzcGFjZSxcbiAgICByZXZlcnNlLFxuICAgIHJldmVyc2VXb3JkcyxcbiAgICBzaW1pbGFyaXR5LFxuICAgIHN0cmlwVGFncyxcbiAgICBzd2FwQ2FzZSxcbiAgICB0aW1lQ29kZSxcbiAgICB0b051bWJlcixcbiAgICB0cnVuY2F0ZSxcbiAgICB3b3JkQ291bnRcbn07XG4iLCIvLyB3aGV0aGVyIHN0ciBpcyBudW1lcmljXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc051bWVyaWMoc3RyKSB7XG4gICAgY29uc3QgcmVneCA9IC9eWy0rXT9cXGQqXFwuP1xcZCsoPzpbZUVdWy0rXT9cXGQrKT8kLztcbiAgICByZXR1cm4gcmVneC50ZXN0KHN0cik7XG59XG4iLCIvLyBwYWQgc3RyIHdpdGggc3Vic3RyIGZyb20gdGhlIGxlZnRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhZExlZnQoc3RyLCBzdWJzdHIsIGxlbmd0aCkge1xuICAgIHN0ciA9IFN0cmluZyhzdHIpO1xuICAgIHdoaWxlIChzdHIubGVuZ3RoIDwgbGVuZ3RoKSB7XG4gICAgICAgIHN0ciA9IHN1YnN0ciArIHN0cjtcbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbn1cbiIsIi8vIHBhZHMgc3RyIHdpdGggc3Vic3RyIGZyb20gdGhlIHJpZ2h0XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYWRSaWdodChzdHIsIHN1YnN0ciwgbGVuZ3RoKSB7XG4gICAgc3RyID0gU3RyaW5nKHN0cik7XG4gICAgd2hpbGUgKHN0ci5sZW5ndGggPCBsZW5ndGgpIHtcbiAgICAgICAgc3RyICs9IHN1YnN0cjtcbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHByZXZlbnRXaWRvdyhzdHIpIHtcbiAgICBzdHIgPSBzdHIudHJpbSgpO1xuXG4gICAgY29uc3QgbGFzdFNwYWNlID0gc3RyLmxhc3RJbmRleE9mKCcgJyk7XG4gICAgaWYgKGxhc3RTcGFjZSA+IDApIHtcbiAgICAgICAgcmV0dXJuIGAke3N0ci5zbGljZSgwLCBsYXN0U3BhY2UpfSZuYnNwOyR7c3RyLnNsaWNlKGxhc3RTcGFjZSArIDEpfWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0cjtcbn1cbiIsImltcG9ydCBjYXBpdGFsaXplIGZyb20gJy4vY2FwaXRhbGl6ZSc7XG5cbi8vIHByb3BlciBjYXNlIHN0ciBpbiBzZW50ZW5jZSBmb3JtYXRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHByb3BlckNhc2Uoc3RyKSB7XG4gICAgY29uc3QgbmV3U3RyID0gc3RyLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxiKFteLj87IV0rKS8sIGNhcGl0YWxpemUpO1xuICAgIHJldHVybiBuZXdTdHIucmVwbGFjZSgvXFxiW2ldXFxiLywgJ0knKTtcbn1cbiIsImltcG9ydCBlc2NhcGVQYXR0ZXJuIGZyb20gJy4vZXNjYXBlUGF0dGVybic7XG5cbi8vIHJlbW92ZSBhbGwgaW5zdGFuY2VzIG9mIHN1YnN0ciBpbiBzdHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbW92ZShzdHIsIHN1YnN0ciwgY2FzZVNlbnNpdGl2ZSA9IGZhbHNlKSB7XG4gICAgY29uc3QgZXNjYXBlZFN0ciA9IGVzY2FwZVBhdHRlcm4oc3Vic3RyKTtcbiAgICBjb25zdCBmbGFncyA9IGNhc2VTZW5zaXRpdmUgPyAnZycgOiAnaWcnO1xuICAgIHJldHVybiBzdHIucmVwbGFjZShuZXcgUmVnRXhwKGVzY2FwZWRTdHIsIGZsYWdzKSwgJycpO1xufVxuIiwiLy8gcmVtb3ZlIGV4dHJhIHdoaXRlc3BhY2UgKGV4dHJhIHNwYWNlcywgdGFicywgbGluZSBicmVha3MsIGV0YylcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbW92ZUV4dHJhV2hpdGVzcGFjZShzdHIpIHtcbiAgICByZXR1cm4gc3RyLnRyaW0oKS5yZXBsYWNlKC9cXHMrL2csICcgJyk7XG59XG4iLCIvLyByZXZlcnNlIGNoYXJhY3RlciBvcmRlclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmV2ZXJzZShzdHIpIHtcbiAgICByZXR1cm4gc3RyLnNwbGl0KCcnKS5yZXZlcnNlKCkuam9pbignJyk7XG59XG4iLCIvLyByZXZlcnNlIHdvcmQgb3JkZXJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJldmVyc2VXb3JkcyhzdHIpIHtcbiAgICByZXR1cm4gc3RyLnNwbGl0KCcgJykucmV2ZXJzZSgpLmpvaW4oJyAnKTtcbn1cbiIsImltcG9ydCBlZGl0RGlzdGFuY2UgZnJvbSAnLi9lZGl0RGlzdGFuY2UnO1xuXG4vLyBwZXJjZW50YWdlIG9mIHNpbWlsaWFyaXR5IGZyb20gMCB0byAxXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzaW1pbGFyaXR5KGEsIGIpIHtcbiAgICBjb25zdCBlID0gZWRpdERpc3RhbmNlKGEsIGIpO1xuICAgIGNvbnN0IG0gPSBNYXRoLm1heChhLmxlbmd0aCwgYi5sZW5ndGgpO1xuICAgIGlmIChtID09PSAwKSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgIH1cbiAgICByZXR1cm4gKDEgLSBlIC8gbSk7XG59XG4iLCIvLyByZW1vdmUgYWxsIEhUTUwgdGFncyBmcm9tIHN0clxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3RyaXBUYWdzKHN0cikge1xuICAgIHJldHVybiBzdHIucmVwbGFjZSgvPFxcLz9bXj5dKz4vaWdtLCAnJyk7XG59XG4iLCJcbi8vIHN3YXBzIHRoZSBjYXNlIG9mIHN0clxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3dhcENhc2Uoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC8oXFx3KS8sIGZ1bmN0aW9uKG5ld1N0cikge1xuICAgICAgICBjb25zdCBsb3dlciA9IG5ld1N0ci50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCB1cHBlciA9IG5ld1N0ci50b1VwcGVyQ2FzZSgpO1xuICAgICAgICBzd2l0Y2ggKG5ld1N0cikge1xuICAgICAgICAgICAgY2FzZSBsb3dlcjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdXBwZXI7XG4gICAgICAgICAgICBjYXNlIHVwcGVyOlxuICAgICAgICAgICAgICAgIHJldHVybiBsb3dlcjtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld1N0cjtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuIiwiLy8gZm9ybWF0cyBzZWNvbmRzIGludG8gSEg6TU06U1NcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRpbWVDb2RlKHNlY29uZHMsIGRlbGltID0gJzonKSB7XG4gICAgY29uc3QgaCA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDM2MDApO1xuICAgIGNvbnN0IG0gPSBNYXRoLmZsb29yKChzZWNvbmRzICUgMzYwMCkgLyA2MCk7XG4gICAgY29uc3QgcyA9IE1hdGguZmxvb3IoKHNlY29uZHMgJSAzNjAwKSAlIDYwKTtcbiAgICBjb25zdCBociA9IChoIDwgMTAgPyAnMCcgKyBoIDogaCkgKyBkZWxpbTtcbiAgICBjb25zdCBtbiA9IChtIDwgMTAgPyAnMCcgKyBtIDogbSkgKyBkZWxpbTtcbiAgICBjb25zdCBzYyA9IChzIDwgMTAgPyAnMCcgKyBzIDogcyk7XG4gICAgcmV0dXJuIGhyICsgbW4gKyBzYztcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRvTnVtYmVyKHN0cikge1xuICAgIHJldHVybiBOdW1iZXIoc3RyLnJlcGxhY2UoL1teMC05Ll0vZywgJycpKTtcbn1cbiIsIi8vIHRydW5jYXRlIHRvIGxlbmd0aCB3aXRoIHN1ZmZpeFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdHJ1bmNhdGUoc3RyLCBsZW4sIHN1ZmZpeCA9ICcuLi4nKSB7XG4gICAgbGVuIC09IHN1ZmZpeC5sZW5ndGg7XG4gICAgbGV0IHRydW5jID0gc3RyO1xuICAgIGlmICh0cnVuYy5sZW5ndGggPiBsZW4pIHtcbiAgICAgICAgdHJ1bmMgPSB0cnVuYy5zdWJzdHIoMCwgbGVuKTtcbiAgICAgICAgY29uc3QgciA9IC9bXlxcc10vO1xuICAgICAgICBpZiAoci50ZXN0KHN0ci5jaGFyQXQobGVuKSkpIHtcbiAgICAgICAgICAgIHRydW5jID0gdHJ1bmMucmVwbGFjZSgvXFx3KyR8XFxzKyQvLCAnJykudHJpbVJpZ2h0KCk7XG4gICAgICAgIH1cbiAgICAgICAgdHJ1bmMgKz0gc3VmZml4O1xuICAgIH1cbiAgICByZXR1cm4gdHJ1bmM7XG59XG4iLCIvLyB0aGUgbnVtYmVyIG9mIHdvcmRzIGluIGEgc3RyaW5nXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB3b3JkQ291bnQoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5tYXRjaCgvXFxiXFx3K1xcYi9nKS5sZW5ndGg7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBldmVudChjYXRlZ29yeSwgYWN0aW9uLCBsYWJlbCwgdmFsdWUpIHtcbiAgICBpZiAoIXdpbmRvdy5nYSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHdpbmRvdy5nYSgnc2VuZCcsICdldmVudCcsIGNhdGVnb3J5LCBhY3Rpb24sIGxhYmVsLCB2YWx1ZSk7XG59XG4iLCJpbXBvcnQgZXZlbnQgZnJvbSAnLi9ldmVudCc7XG5pbXBvcnQgcGFnZXZpZXcgZnJvbSAnLi9wYWdldmlldyc7XG5pbXBvcnQgbG9hZCBmcm9tICcuL2xvYWQnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZXZlbnQsXG4gICAgcGFnZXZpZXcsXG4gICAgbG9hZFxufTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvYWQoZ2FBY2NvdW50KSB7XG4gICAgY29uc29sZS5sb2coJ0luaXRpYWxpemUgR29vZ2xlIEFuYWx5dGljcyB3aXRoIGFjY291bnQgSWQ6JywgZ2FBY2NvdW50KTtcblxuICAgIC8qZXNsaW50LWRpc2FibGUqL1xuICAgIChmdW5jdGlvbihpLHMsbyxnLHIsYSxtKXtpWydHb29nbGVBbmFseXRpY3NPYmplY3QnXT1yO2lbcl09aVtyXXx8ZnVuY3Rpb24oKXtcblx0KGlbcl0ucT1pW3JdLnF8fFtdKS5wdXNoKGFyZ3VtZW50cyl9LGlbcl0ubD0xKm5ldyBEYXRlKCk7YT1zLmNyZWF0ZUVsZW1lbnQobyksXG5cdG09cy5nZXRFbGVtZW50c0J5VGFnTmFtZShvKVswXTthLmFzeW5jPTE7YS5zcmM9ZzttLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGEsbSlcblx0fSkod2luZG93LGRvY3VtZW50LCdzY3JpcHQnLCcvL3d3dy5nb29nbGUtYW5hbHl0aWNzLmNvbS9hbmFseXRpY3MuanMnLCdnYScpO1xuICAgIC8qZXNsaW50LWVuYWJsZSovXG5cbiAgICB3aW5kb3cuZ2EoJ2NyZWF0ZScsIGdhQWNjb3VudCwgJ2F1dG8nKTtcbiAgICB3aW5kb3cuZ2EoJ3NlbmQnLCAncGFnZXZpZXcnKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhZ2V2aWV3KHBhdGgpIHtcbiAgICBpZiAoIXdpbmRvdy5nYSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHdpbmRvdy5nYSgnc2VuZCcsICdwYWdldmlldycsIHBhdGgpO1xufVxuIiwibGV0IGhpZGRlbixcbiAgICBjaGFuZ2U7XG5cbmlmICh0eXBlb2YgZG9jdW1lbnQuaGlkZGVuICE9PSAndW5kZWZpbmVkJykge1xuICAgIGhpZGRlbiA9ICdoaWRkZW4nO1xuICAgIGNoYW5nZSA9ICd2aXNpYmlsaXR5Y2hhbmdlJztcbn0gZWxzZSBpZiAodHlwZW9mIGRvY3VtZW50Lm1vekhpZGRlbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBoaWRkZW4gPSAnbW96SGlkZGVuJztcbiAgICBjaGFuZ2UgPSAnbW96dmlzaWJpbGl0eWNoYW5nZSc7XG59IGVsc2UgaWYgKHR5cGVvZiBkb2N1bWVudC5tc0hpZGRlbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBoaWRkZW4gPSAnbXNIaWRkZW4nO1xuICAgIGNoYW5nZSA9ICdtc3Zpc2liaWxpdHljaGFuZ2UnO1xufSBlbHNlIGlmICh0eXBlb2YgZG9jdW1lbnQud2Via2l0SGlkZGVuICE9PSAndW5kZWZpbmVkJykge1xuICAgIGhpZGRlbiA9ICd3ZWJraXRIaWRkZW4nO1xuICAgIGNoYW5nZSA9ICd3ZWJraXR2aXNpYmlsaXR5Y2hhbmdlJztcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGhpZGRlbixcbiAgICBjaGFuZ2Vcbn07XG4iLCJpbXBvcnQgYXBpIGZyb20gJy4vYXBpJztcbmltcG9ydCBlbWl0dGVyIGZyb20gJy4uL2V2ZW50cy9lbWl0dGVyJztcblxuY29uc3QgdmlzaWJpbGl0eSA9IE9iamVjdC5jcmVhdGUoZW1pdHRlci5wcm90b3R5cGUsIHtcbiAgICBoaWRkZW46IHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudFthcGkuaGlkZGVuXTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5mdW5jdGlvbiBvblZpc2liaWxpdHlDaGFuZ2UoKSB7XG4gICAgaWYgKGRvY3VtZW50W2FwaS5oaWRkZW5dKSB7XG4gICAgICAgIHZpc2liaWxpdHkuZW1pdCgnaGlkZGVuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmlzaWJpbGl0eS5lbWl0KCdzaG93bicpO1xuICAgIH1cbn1cblxuaWYgKGFwaS5jaGFuZ2UpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGFwaS5jaGFuZ2UsIG9uVmlzaWJpbGl0eUNoYW5nZSwgZmFsc2UpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2aXNpYmlsaXR5O1xuIl19
