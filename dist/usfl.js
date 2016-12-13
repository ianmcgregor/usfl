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

},{"events":89}],26:[function(require,module,exports){
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

},{"./array":3,"./dom":16,"./events":28,"./fps":29,"./fullscreen":31,"./graphics":32,"./http":34,"./input":41,"./linked-list":49,"./math":64,"./media":84,"./object-pool":90,"./platform":95,"./polyfill":113,"./popup":115,"./share":120,"./storage":130,"./string":145,"./track":163,"./visibility":167}],40:[function(require,module,exports){
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

},{}],53:[function(require,module,exports){
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

},{}],54:[function(require,module,exports){
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

},{}],55:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = degrees;
var DEG = 180 / Math.PI;

function degrees(radians) {
    return radians * DEG;
}

},{}],56:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = difference;
function difference(a, b) {
    return Math.abs(a - b);
}

},{}],57:[function(require,module,exports){
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

},{}],58:[function(require,module,exports){
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

},{}],59:[function(require,module,exports){
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

},{}],60:[function(require,module,exports){
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

},{}],61:[function(require,module,exports){
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

},{}],62:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getOverlapX;
function getOverlapX(aX, aW, bX, bW) {
    return Math.max(0, Math.min(aX + aW, bX + bW) - Math.max(aX, bX));
}

},{}],63:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getOverlapY;
function getOverlapY(aY, aH, bY, bH) {
    return Math.max(0, Math.min(aY + aH, bY + bH) - Math.max(aY, bY));
}

},{}],64:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _angle = require('./angle');

var _angle2 = _interopRequireDefault(_angle);

var _cerp = require('./cerp');

var _cerp2 = _interopRequireDefault(_cerp);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    angle: _angle2.default,
    cerp: _cerp2.default,
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
    orientation: _orientation2.default,
    percentRemaining: _percentRemaining2.default,
    radians: _radians2.default,
    random: _random2.default,
    randomInt: _randomInt2.default,
    randomSign: _randomSign2.default,
    rotateToDeg: _rotateToDeg2.default,
    rotateToRad: _rotateToRad2.default,
    roundTo: _roundTo2.default,
    roundToNearest: _roundToNearest2.default,
    smerp: _smerp2.default,
    smoothstep: _smoothstep2.default,
    size: _size2.default,
    splitValueAndUnit: _splitValueAndUnit2.default,
    weightedAverage: _weightedAverage2.default
};

},{"./angle":50,"./cerp":51,"./clamp":52,"./coinToss":53,"./crossProduct2d":54,"./degrees":55,"./difference":56,"./distance":57,"./distanceSq":58,"./dotProduct2d":59,"./getCirclePoints":60,"./getIntersectionArea":61,"./getOverlapX":62,"./getOverlapY":63,"./lerp":65,"./map":66,"./orientation":67,"./percentRemaining":68,"./radians":69,"./random":70,"./randomInt":71,"./randomSign":72,"./rotateToDeg":73,"./rotateToRad":74,"./roundTo":75,"./roundToNearest":76,"./size":77,"./smerp":78,"./smoothstep":79,"./splitValueAndUnit":80,"./weightedAverage":81}],65:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = lerp;
function lerp(from, to) {
    var weight = arguments.length <= 2 || arguments[2] === undefined ? 0.3 : arguments[2];

    return from + (to - from) * weight;
}

},{}],66:[function(require,module,exports){
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

},{}],67:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = orientation;
function orientation(x, y) {
    return Math.atan2(y, x);
}

},{}],68:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = percentRemaining;
function percentRemaining(value, total) {
    return value % total / total;
}

},{}],69:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = radians;
var RAD = Math.PI / 180;

function radians(degrees) {
    return degrees * RAD;
}

},{}],70:[function(require,module,exports){
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

},{}],71:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = randomInt;
function randomInt(min, max) {
    return Math.floor(min + Math.random() * (max - min));
}

},{}],72:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = randomSign;
function randomSign() {
    return Math.random() > 0.5 ? -1 : 1;
}

},{}],73:[function(require,module,exports){
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

},{}],74:[function(require,module,exports){
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

},{}],75:[function(require,module,exports){
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

},{}],76:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = roundToNearest;
function roundToNearest(value, unit) {
    return Math.round(value / unit) * unit;
}

},{}],77:[function(require,module,exports){
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

},{}],78:[function(require,module,exports){
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

},{"./smoothstep":79}],79:[function(require,module,exports){
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

},{"./clamp":52}],80:[function(require,module,exports){
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

},{}],81:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = weightedAverage;
function weightedAverage(from, to) {
    var weight = arguments.length <= 2 || arguments[2] === undefined ? 10 : arguments[2];

    return (from * (weight - 1) + to) / weight;
}

},{}],82:[function(require,module,exports){
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

},{}],83:[function(require,module,exports){
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

},{}],84:[function(require,module,exports){
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

},{"./cuepointsReader":82,"./iOSPlayVideoInline":83,"./videoPlayer":85,"./vimeo":86,"./youtube":87,"./youtubeBasic":88}],85:[function(require,module,exports){
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

},{"../events/emitter":25}],86:[function(require,module,exports){
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

},{"../events/emitter":25}],87:[function(require,module,exports){
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

},{"events":89}],88:[function(require,module,exports){
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

},{}],89:[function(require,module,exports){
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

},{}],90:[function(require,module,exports){
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

},{}],91:[function(require,module,exports){
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

},{"../os/android":96}],92:[function(require,module,exports){
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

},{}],93:[function(require,module,exports){
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

},{"../os":98,"./androidNative":91,"./ieVersion":92}],94:[function(require,module,exports){
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

},{}],95:[function(require,module,exports){
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

},{"./browser":93,"./device":94,"./os":98,"./screen":105,"./supports":107}],96:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var ua = arguments.length <= 0 || arguments[0] === undefined ? navigator.userAgent : arguments[0];

    return (/Android/i.test(ua)
    );
};

},{}],97:[function(require,module,exports){
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

},{"./android":96}],98:[function(require,module,exports){
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

},{"./android":96,"./androidVersion":97,"./ios":99,"./iosVersion":100,"./linux":101,"./mac":102,"./windows":103,"./windowsPhone":104}],99:[function(require,module,exports){
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

},{}],100:[function(require,module,exports){
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

},{"./ios":99}],101:[function(require,module,exports){
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

},{"./android":96}],102:[function(require,module,exports){
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

},{"./ios":99}],103:[function(require,module,exports){
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

},{"./windowsPhone":104}],104:[function(require,module,exports){
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

},{}],105:[function(require,module,exports){
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

},{}],106:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return !!window.DeviceOrientationEvent;
};

},{}],107:[function(require,module,exports){
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

},{"./deviceOrientation":106,"./mp4":108,"./webgl":109,"./webm":110}],108:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var videoEl = document.createElement('video');

exports.default = function () {
  return !!(videoEl.canPlayType && videoEl.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"'));
};

},{}],109:[function(require,module,exports){
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

},{}],110:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var videoEl = document.createElement('video');

exports.default = function () {
  return !!(videoEl.canPlayType && videoEl.canPlayType('video/webm; codecs="vp8, vorbis"'));
};

},{}],111:[function(require,module,exports){
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

},{}],112:[function(require,module,exports){
'use strict';

(function (fn) {
    window.console = window.console || {};
    var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'memory', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'timeline', 'timelineEnd', 'trace', 'warn'];
    methods.forEach(function (name) {
        window.console[name] = window.console[name] || fn;
    });
})(function () {});

},{}],113:[function(require,module,exports){
'use strict';

require('./classList');

require('./console');

require('./requestAnimationFrame');

},{"./classList":111,"./console":112,"./requestAnimationFrame":114}],114:[function(require,module,exports){
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

},{}],115:[function(require,module,exports){
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

},{}],116:[function(require,module,exports){
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

},{"../popup":115}],117:[function(require,module,exports){
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

},{"../popup":115}],118:[function(require,module,exports){
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

},{"../popup":115}],119:[function(require,module,exports){
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

},{"../popup":115}],120:[function(require,module,exports){
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

},{"./email":116,"./facebook":117,"./facebookFeedDialog":118,"./googleplus":119,"./linkedin":121,"./pinterest":122,"./reddit":123,"./renren":124,"./sms":125,"./twitter":126,"./vkontakte":127,"./weibo":128,"./whatsapp":129}],121:[function(require,module,exports){
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

},{"../popup":115}],122:[function(require,module,exports){
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

},{"../popup":115}],123:[function(require,module,exports){
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

},{"../popup":115}],124:[function(require,module,exports){
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

},{"../popup":115}],125:[function(require,module,exports){
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

},{}],126:[function(require,module,exports){
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

},{"../popup":115}],127:[function(require,module,exports){
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

},{"../popup":115}],128:[function(require,module,exports){
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

},{"../popup":115}],129:[function(require,module,exports){
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

},{}],130:[function(require,module,exports){
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

},{}],131:[function(require,module,exports){
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

},{}],132:[function(require,module,exports){
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

},{}],133:[function(require,module,exports){
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

},{}],134:[function(require,module,exports){
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

},{}],135:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = beginsWith;
// whether str begins with substr
function beginsWith(str, substr) {
    return str.indexOf(substr) === 0;
}

},{}],136:[function(require,module,exports){
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

},{}],137:[function(require,module,exports){
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

},{"./escapePattern":143,"./truncate":160}],138:[function(require,module,exports){
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

},{}],139:[function(require,module,exports){
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

},{"./escapePattern":143}],140:[function(require,module,exports){
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

},{}],141:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = endsWith;
// whether str ends with substr
function endsWith(str, substr) {
    return str.lastIndexOf(substr) === str.length - substr.length;
}

},{}],142:[function(require,module,exports){
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

},{}],143:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = escapePattern;
// regex escape pattern
function escapePattern(pattern) {
    return pattern.replace(/(\]|\[|\{|\}|\(|\)|\*|\+|\?|\.|\\)/g, '\\$1');
}

},{}],144:[function(require,module,exports){
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

},{"./removeExtraWhitespace":152}],145:[function(require,module,exports){
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

},{"./afterFirst":131,"./afterLast":132,"./beforeFirst":133,"./beforeLast":134,"./beginsWith":135,"./between":136,"./block":137,"./capitalize":138,"./countOf":139,"./editDistance":140,"./endsWith":141,"./escapeHTML":142,"./escapePattern":143,"./hasText":144,"./isNumeric":146,"./padLeft":147,"./padRight":148,"./preventWidow":149,"./properCase":150,"./remove":151,"./removeExtraWhitespace":152,"./reverse":153,"./reverseWords":154,"./similarity":155,"./stripTags":156,"./swapCase":157,"./timeCode":158,"./toNumber":159,"./truncate":160,"./wordCount":161}],146:[function(require,module,exports){
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

},{}],147:[function(require,module,exports){
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

},{}],148:[function(require,module,exports){
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

},{}],149:[function(require,module,exports){
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

},{}],150:[function(require,module,exports){
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

},{"./capitalize":138}],151:[function(require,module,exports){
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

},{"./escapePattern":143}],152:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = removeExtraWhitespace;
// remove extra whitespace (extra spaces, tabs, line breaks, etc)
function removeExtraWhitespace(str) {
    return str.trim().replace(/\s+/g, ' ');
}

},{}],153:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = reverse;
// reverse character order
function reverse(str) {
    return str.split('').reverse().join('');
}

},{}],154:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = reverseWords;
// reverse word order
function reverseWords(str) {
    return str.split(' ').reverse().join(' ');
}

},{}],155:[function(require,module,exports){
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

},{"./editDistance":140}],156:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = stripTags;
// remove all HTML tags from str
function stripTags(str) {
    return str.replace(/<\/?[^>]+>/igm, '');
}

},{}],157:[function(require,module,exports){
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

},{}],158:[function(require,module,exports){
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

},{}],159:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = toNumber;
function toNumber(str) {
    return Number(str.replace(/[^0-9.]/g, ''));
}

},{}],160:[function(require,module,exports){
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

},{}],161:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = wordCount;
// the number of words in a string
function wordCount(str) {
    return str.match(/\b\w+\b/g).length;
}

},{}],162:[function(require,module,exports){
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

},{}],163:[function(require,module,exports){
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

},{"./event":162,"./load":164,"./pageview":165}],164:[function(require,module,exports){
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

},{}],165:[function(require,module,exports){
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

},{}],166:[function(require,module,exports){
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

},{}],167:[function(require,module,exports){
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

},{"../events/emitter":25,"./api":166}]},{},[39])(39)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcnJheS9hcnJheS5qcyIsImFycmF5L2Nsb25lLmpzIiwiYXJyYXkvaW5kZXguanMiLCJhcnJheS9uZWFyZXN0LmpzIiwiYXJyYXkvcmFuZG9tQ2hvaWNlLmpzIiwiYXJyYXkvc29ydEFscGhhLmpzIiwiYXJyYXkvc29ydE51bWVyaWMuanMiLCJhcnJheS9zb3J0UmFuZG9tLmpzIiwiZG9tL2Jsb2NrU2Nyb2xsaW5nLmpzIiwiZG9tL2ZvcmNlUmVkcmF3LmpzIiwiZG9tL2dldFBhZ2VIZWlnaHQuanMiLCJkb20vZ2V0U2Nyb2xsUGVyY2VudGFnZS5qcyIsImRvbS9nZXRTY3JvbGxSZW1haW5pbmcuanMiLCJkb20vZ2V0U2Nyb2xsVG9wLmpzIiwiZG9tL2dldFNyY3NldEltYWdlLmpzIiwiZG9tL2luZGV4LmpzIiwiZG9tL2lzRWxlbWVudEluVmlld3BvcnQuanMiLCJkb20vaXNQYWdlRW5kLmpzIiwiZG9tL3Jlc2l6ZS5qcyIsImRvbS9zY3JvbGwuanMiLCJkb20vc2V0U3R5bGUuanMiLCJkb20vdHJhbnNpdGlvbkVuZC5qcyIsImV2ZW50cy9kZWJvdW5jZS5qcyIsImV2ZW50cy9kZWxlZ2F0ZUV2ZW50cy5qcyIsImV2ZW50cy9lbWl0dGVyLmpzIiwiZXZlbnRzL2V2ZW50QnVzLmpzIiwiZXZlbnRzL2hlYXJ0YmVhdC5qcyIsImV2ZW50cy9pbmRleC5qcyIsImZwcy9pbmRleC5qcyIsImZ1bGxzY3JlZW4vYXBpLmpzIiwiZnVsbHNjcmVlbi9pbmRleC5qcyIsImdyYXBoaWNzL2luZGV4LmpzIiwiaHR0cC9nZXRMb2NhdGlvbi5qcyIsImh0dHAvaW5kZXguanMiLCJodHRwL2pzb25wLmpzIiwiaHR0cC9sb2FkU2NyaXB0LmpzIiwiaHR0cC91cmxQYXJhbXMuanMiLCJodHRwL3hoci5qcyIsImluZGV4LmpzIiwiaW5wdXQvY2xpY2tPdXRzaWRlLmpzIiwiaW5wdXQvaW5kZXguanMiLCJpbnB1dC9rZXlJbnB1dC5qcyIsImlucHV0L2tleWJvYXJkLmpzIiwiaW5wdXQvbWljcm9waG9uZS5qcyIsImlucHV0L21vdXNlTGVmdFdpbmRvdy5qcyIsImlucHV0L21vdXNlV2hlZWwuanMiLCJpbnB1dC9wb2ludGVyQ29vcmRzLmpzIiwiaW5wdXQvdG91Y2hJbnB1dC5qcyIsImxpbmtlZC1saXN0L2luZGV4LmpzIiwibWF0aC9hbmdsZS5qcyIsIm1hdGgvY2VycC5qcyIsIm1hdGgvY2xhbXAuanMiLCJtYXRoL2NvaW5Ub3NzLmpzIiwibWF0aC9jcm9zc1Byb2R1Y3QyZC5qcyIsIm1hdGgvZGVncmVlcy5qcyIsIm1hdGgvZGlmZmVyZW5jZS5qcyIsIm1hdGgvZGlzdGFuY2UuanMiLCJtYXRoL2Rpc3RhbmNlU3EuanMiLCJtYXRoL2RvdFByb2R1Y3QyZC5qcyIsIm1hdGgvZ2V0Q2lyY2xlUG9pbnRzLmpzIiwibWF0aC9nZXRJbnRlcnNlY3Rpb25BcmVhLmpzIiwibWF0aC9nZXRPdmVybGFwWC5qcyIsIm1hdGgvZ2V0T3ZlcmxhcFkuanMiLCJtYXRoL2luZGV4LmpzIiwibWF0aC9sZXJwLmpzIiwibWF0aC9tYXAuanMiLCJtYXRoL29yaWVudGF0aW9uLmpzIiwibWF0aC9wZXJjZW50UmVtYWluaW5nLmpzIiwibWF0aC9yYWRpYW5zLmpzIiwibWF0aC9yYW5kb20uanMiLCJtYXRoL3JhbmRvbUludC5qcyIsIm1hdGgvcmFuZG9tU2lnbi5qcyIsIm1hdGgvcm90YXRlVG9EZWcuanMiLCJtYXRoL3JvdGF0ZVRvUmFkLmpzIiwibWF0aC9yb3VuZFRvLmpzIiwibWF0aC9yb3VuZFRvTmVhcmVzdC5qcyIsIm1hdGgvc2l6ZS5qcyIsIm1hdGgvc21lcnAuanMiLCJtYXRoL3Ntb290aHN0ZXAuanMiLCJtYXRoL3NwbGl0VmFsdWVBbmRVbml0LmpzIiwibWF0aC93ZWlnaHRlZEF2ZXJhZ2UuanMiLCJtZWRpYS9jdWVwb2ludHNSZWFkZXIuanMiLCJtZWRpYS9pT1NQbGF5VmlkZW9JbmxpbmUuanMiLCJtZWRpYS9pbmRleC5qcyIsIm1lZGlhL3ZpZGVvUGxheWVyLmpzIiwibWVkaWEvdmltZW8uanMiLCJtZWRpYS95b3V0dWJlLmpzIiwibWVkaWEveW91dHViZUJhc2ljLmpzIiwibm9kZV9tb2R1bGVzL2V2ZW50cy9ldmVudHMuanMiLCJvYmplY3QtcG9vbC9pbmRleC5qcyIsInBsYXRmb3JtL2Jyb3dzZXIvYW5kcm9pZE5hdGl2ZS5qcyIsInBsYXRmb3JtL2Jyb3dzZXIvaWVWZXJzaW9uLmpzIiwicGxhdGZvcm0vYnJvd3Nlci9pbmRleC5qcyIsInBsYXRmb3JtL2RldmljZS9pbmRleC5qcyIsInBsYXRmb3JtL2luZGV4LmpzIiwicGxhdGZvcm0vb3MvYW5kcm9pZC5qcyIsInBsYXRmb3JtL29zL2FuZHJvaWRWZXJzaW9uLmpzIiwicGxhdGZvcm0vb3MvaW5kZXguanMiLCJwbGF0Zm9ybS9vcy9pb3MuanMiLCJwbGF0Zm9ybS9vcy9pb3NWZXJzaW9uLmpzIiwicGxhdGZvcm0vb3MvbGludXguanMiLCJwbGF0Zm9ybS9vcy9tYWMuanMiLCJwbGF0Zm9ybS9vcy93aW5kb3dzLmpzIiwicGxhdGZvcm0vb3Mvd2luZG93c1Bob25lLmpzIiwicGxhdGZvcm0vc2NyZWVuL2luZGV4LmpzIiwicGxhdGZvcm0vc3VwcG9ydHMvZGV2aWNlT3JpZW50YXRpb24uanMiLCJwbGF0Zm9ybS9zdXBwb3J0cy9pbmRleC5qcyIsInBsYXRmb3JtL3N1cHBvcnRzL21wNC5qcyIsInBsYXRmb3JtL3N1cHBvcnRzL3dlYmdsLmpzIiwicGxhdGZvcm0vc3VwcG9ydHMvd2VibS5qcyIsInBvbHlmaWxsL2NsYXNzTGlzdC5qcyIsInBvbHlmaWxsL2NvbnNvbGUuanMiLCJwb2x5ZmlsbC9pbmRleC5qcyIsInBvbHlmaWxsL3JlcXVlc3RBbmltYXRpb25GcmFtZS5qcyIsInBvcHVwL2luZGV4LmpzIiwic2hhcmUvZW1haWwuanMiLCJzaGFyZS9mYWNlYm9vay5qcyIsInNoYXJlL2ZhY2Vib29rRmVlZERpYWxvZy5qcyIsInNoYXJlL2dvb2dsZXBsdXMuanMiLCJzaGFyZS9pbmRleC5qcyIsInNoYXJlL2xpbmtlZGluLmpzIiwic2hhcmUvcGludGVyZXN0LmpzIiwic2hhcmUvcmVkZGl0LmpzIiwic2hhcmUvcmVucmVuLmpzIiwic2hhcmUvc21zLmpzIiwic2hhcmUvdHdpdHRlci5qcyIsInNoYXJlL3Zrb250YWt0ZS5qcyIsInNoYXJlL3dlaWJvLmpzIiwic2hhcmUvd2hhdHNhcHAuanMiLCJzdG9yYWdlL2luZGV4LmpzIiwic3RyaW5nL2FmdGVyRmlyc3QuanMiLCJzdHJpbmcvYWZ0ZXJMYXN0LmpzIiwic3RyaW5nL2JlZm9yZUZpcnN0LmpzIiwic3RyaW5nL2JlZm9yZUxhc3QuanMiLCJzdHJpbmcvYmVnaW5zV2l0aC5qcyIsInN0cmluZy9iZXR3ZWVuLmpzIiwic3RyaW5nL2Jsb2NrLmpzIiwic3RyaW5nL2NhcGl0YWxpemUuanMiLCJzdHJpbmcvY291bnRPZi5qcyIsInN0cmluZy9lZGl0RGlzdGFuY2UuanMiLCJzdHJpbmcvZW5kc1dpdGguanMiLCJzdHJpbmcvZXNjYXBlSFRNTC5qcyIsInN0cmluZy9lc2NhcGVQYXR0ZXJuLmpzIiwic3RyaW5nL2hhc1RleHQuanMiLCJzdHJpbmcvaW5kZXguanMiLCJzdHJpbmcvaXNOdW1lcmljLmpzIiwic3RyaW5nL3BhZExlZnQuanMiLCJzdHJpbmcvcGFkUmlnaHQuanMiLCJzdHJpbmcvcHJldmVudFdpZG93LmpzIiwic3RyaW5nL3Byb3BlckNhc2UuanMiLCJzdHJpbmcvcmVtb3ZlLmpzIiwic3RyaW5nL3JlbW92ZUV4dHJhV2hpdGVzcGFjZS5qcyIsInN0cmluZy9yZXZlcnNlLmpzIiwic3RyaW5nL3JldmVyc2VXb3Jkcy5qcyIsInN0cmluZy9zaW1pbGFyaXR5LmpzIiwic3RyaW5nL3N0cmlwVGFncy5qcyIsInN0cmluZy9zd2FwQ2FzZS5qcyIsInN0cmluZy90aW1lQ29kZS5qcyIsInN0cmluZy90b051bWJlci5qcyIsInN0cmluZy90cnVuY2F0ZS5qcyIsInN0cmluZy93b3JkQ291bnQuanMiLCJ0cmFjay9ldmVudC5qcyIsInRyYWNrL2luZGV4LmpzIiwidHJhY2svbG9hZC5qcyIsInRyYWNrL3BhZ2V2aWV3LmpzIiwidmlzaWJpbGl0eS9hcGkuanMiLCJ2aXNpYmlsaXR5L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7a0JDQXdCLEs7QUFBVCxTQUFTLEtBQVQsQ0FBZSxNQUFmLEVBQXVCLEtBQXZCLEVBQThCO0FBQ3pDLFFBQU0sTUFBTSxFQUFaO0FBQ0EsU0FBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLE1BQXBCLEVBQTRCLEdBQTVCLEVBQWlDO0FBQzdCLFlBQU0sTUFBTSxPQUFPLEtBQVAsS0FBaUIsV0FBakIsR0FBK0IsS0FBL0IsR0FBdUMsQ0FBbkQ7QUFDQSxZQUFJLElBQUosQ0FBUyxHQUFUO0FBQ0g7QUFDRCxXQUFPLEdBQVA7QUFDSDs7Ozs7Ozs7a0JDUHVCLEs7QUFBVCxTQUFTLEtBQVQsQ0FBZSxHQUFmLEVBQW9CO0FBQy9CLFdBQU8sSUFBSSxLQUFKLENBQVUsQ0FBVixDQUFQO0FBQ0g7Ozs7Ozs7OztBQ0ZEOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7a0JBRWU7QUFDWCwwQkFEVztBQUVYLDBCQUZXO0FBR1gsOEJBSFc7QUFJWCx3Q0FKVztBQUtYLGtDQUxXO0FBTVgsc0NBTlc7QUFPWDtBQVBXLEM7Ozs7Ozs7O2tCQ1JTLE87QUFBVCxTQUFTLE9BQVQsQ0FBaUIsS0FBakIsRUFBd0IsR0FBeEIsRUFBNkI7QUFDeEMsUUFBSSxRQUFRLE9BQU8sU0FBbkI7QUFDQSxXQUFPLElBQUksTUFBSixDQUFXLFVBQUMsTUFBRCxFQUFTLElBQVQsRUFBa0I7QUFDaEMsWUFBTSxPQUFPLEtBQUssR0FBTCxDQUFTLE9BQU8sS0FBaEIsQ0FBYjtBQUNBLFlBQUksT0FBTyxLQUFYLEVBQWtCO0FBQ2Qsb0JBQVEsSUFBUjtBQUNBLHFCQUFTLElBQVQ7QUFDSDtBQUNELGVBQU8sTUFBUDtBQUNILEtB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QSxhQUFTLGtCQUFUO0FBQ0gsQ0FIRCxNQUdPLElBQUksT0FBTyxTQUFTLFNBQWhCLEtBQThCLFdBQWxDLEVBQStDO0FBQ2xELGFBQVMsV0FBVDtBQUNBLGFBQVMscUJBQVQ7QUFDSCxDQUhNLE1BR0EsSUFBSSxPQUFPLFNBQVMsUUFBaEIsS0FBNkIsV0FBakMsRUFBOEM7QUFDakQsYUFBUyxVQUFUO0FBQ0EsYUFBUyxvQkFBVDtBQUNILENBSE0sTUFHQSxJQUFJLE9BQU8sU0FBUyxZQUFoQixLQUFpQyxXQUFyQyxFQUFrRDtBQUNyRCxhQUFTLGNBQVQ7QUFDQSxhQUFTLHdCQUFUO0FBQ0g7O2tCQUVjO0FBQ1gsa0JBRFc7QUFFWDtBQUZXLEM7Ozs7Ozs7OztBQ2pCZjs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNLGFBQWEsT0FBTyxNQUFQLENBQWMsa0JBQVEsU0FBdEIsRUFBaUM7QUFDaEQsWUFBUTtBQUNKLGFBQUssZUFBVztBQUNaLG1CQUFPLFNBQVMsY0FBSSxNQUFiLENBQVA7QUFDSDtBQUhHO0FBRHdDLENBQWpDLENBQW5COztBQVFBLFNBQVMsa0JBQVQsR0FBOEI7QUFDMUIsUUFBSSxTQUFTLGNBQUksTUFBYixDQUFKLEVBQTBCO0FBQ3RCLG1CQUFXLElBQVgsQ0FBZ0IsUUFBaEI7QUFDSCxLQUZELE1BRU87QUFDSCxtQkFBVyxJQUFYLENBQWdCLE9BQWhCO0FBQ0g7QUFDSjs7QUFFRCxJQUFJLGNBQUksTUFBUixFQUFnQjtBQUNaLGFBQVMsZ0JBQVQsQ0FBMEIsY0FBSSxNQUE5QixFQUFzQyxrQkFBdEMsRUFBMEQsS0FBMUQ7QUFDSDs7a0JBRWMsVSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhcnJheShsZW5ndGgsIHZhbHVlKSB7XG4gICAgY29uc3QgYXJyID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCB2YWwgPSB0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnID8gdmFsdWUgOiBpO1xuICAgICAgICBhcnIucHVzaCh2YWwpO1xuICAgIH1cbiAgICByZXR1cm4gYXJyO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2xvbmUoYXJyKSB7XG4gICAgcmV0dXJuIGFyci5zbGljZSgwKTtcbn1cbiIsImltcG9ydCBhcnJheSBmcm9tICcuL2FycmF5JztcbmltcG9ydCBjbG9uZSBmcm9tICcuL2Nsb25lJztcbmltcG9ydCBuZWFyZXN0IGZyb20gJy4vbmVhcmVzdCc7XG5pbXBvcnQgcmFuZG9tQ2hvaWNlIGZyb20gJy4vcmFuZG9tQ2hvaWNlJztcbmltcG9ydCBzb3J0QWxwaGEgZnJvbSAnLi9zb3J0QWxwaGEnO1xuaW1wb3J0IHNvcnROdW1lcmljIGZyb20gJy4vc29ydE51bWVyaWMnO1xuaW1wb3J0IHNvcnRSYW5kb20gZnJvbSAnLi9zb3J0UmFuZG9tJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGFycmF5LFxuICAgIGNsb25lLFxuICAgIG5lYXJlc3QsXG4gICAgcmFuZG9tQ2hvaWNlLFxuICAgIHNvcnRBbHBoYSxcbiAgICBzb3J0TnVtZXJpYyxcbiAgICBzb3J0UmFuZG9tXG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbmVhcmVzdCh2YWx1ZSwgYXJyKSB7XG4gICAgbGV0IGxlYXN0ID0gTnVtYmVyLk1BWF9WQUxVRTtcbiAgICByZXR1cm4gYXJyLnJlZHVjZSgocmVzdWx0LCBpdGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IGRpZmYgPSBNYXRoLmFicyhpdGVtIC0gdmFsdWUpO1xuICAgICAgICBpZiAoZGlmZiA8IGxlYXN0KSB7XG4gICAgICAgICAgICBsZWFzdCA9IGRpZmY7XG4gICAgICAgICAgICByZXN1bHQgPSBpdGVtO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSwgLTEpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmFuZG9tQ2hvaWNlKGFycikge1xuICAgIHJldHVybiBhcnJbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXJyLmxlbmd0aCldO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc29ydEFscGhhKGEsIGIpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oeCwgeSkge1xuICAgICAgICAgICAgcmV0dXJuIFN0cmluZyh4W2FdKS50b0xvd2VyQ2FzZSgpID4gU3RyaW5nKHlbYV0pLnRvTG93ZXJDYXNlKCkgPyAxIDogLTE7XG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBTdHJpbmcoYSkudG9Mb3dlckNhc2UoKSA+IFN0cmluZyhiKS50b0xvd2VyQ2FzZSgpID8gMSA6IC0xO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc29ydE51bWVyaWMoYSwgYikge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbih4LCB5KSB7XG4gICAgICAgICAgICByZXR1cm4gTnVtYmVyKHhbYV0pIC0gTnVtYmVyKHlbYV0pO1xuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gTnVtYmVyKGEpIC0gTnVtYmVyKGIpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc29ydFJhbmRvbSgpIHtcbiAgICByZXR1cm4gTWF0aC5yYW5kb20oKSA+IDAuNSA/IC0xIDogMTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJsb2NrU2Nyb2xsaW5nKHZhbHVlKSB7XG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9IHZhbHVlID8gJ2hpZGRlbicgOiAnJztcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZvcmNlUmVkcmF3KGVsKSB7XG4gICAgY29uc3QgZGlzcGxheSA9IGVsLnN0eWxlLmRpc3BsYXk7XG4gICAgZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBlbC5vZmZzZXRIZWlnaHQ7XG4gICAgZWwuc3R5bGUuZGlzcGxheSA9IGRpc3BsYXk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRQYWdlSGVpZ2h0KCkge1xuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5ib2R5O1xuICAgIGNvbnN0IGRvYyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuICAgIHJldHVybiBNYXRoLm1heChcbiAgICAgICAgYm9keS5zY3JvbGxIZWlnaHQgfHwgMCxcbiAgICAgICAgYm9keS5vZmZzZXRIZWlnaHQgfHwgMCxcbiAgICAgICAgYm9keS5jbGllbnRIZWlnaHQgfHwgMCxcbiAgICAgICAgZG9jLmNsaWVudEhlaWdodCB8fCAwLFxuICAgICAgICBkb2Mub2Zmc2V0SGVpZ2h0IHx8IDAsXG4gICAgICAgIGRvYy5zY3JvbGxIZWlnaHQgfHwgMFxuICAgICk7XG59XG4iLCJpbXBvcnQgZ2V0U2Nyb2xsVG9wIGZyb20gJy4vZ2V0U2Nyb2xsVG9wJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0U2Nyb2xsUGVyY2VudGFnZSgpIHtcbiAgICByZXR1cm4gKGdldFNjcm9sbFRvcCgpICsgd2luZG93LmlubmVySGVpZ2h0KSAvIGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0O1xufVxuIiwiaW1wb3J0IGdldFNjcm9sbFRvcCBmcm9tICcuL2dldFNjcm9sbFRvcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFNjcm9sbFJlbWFpbmluZygpIHtcbiAgICBjb25zdCBiID0gZG9jdW1lbnQuYm9keTtcbiAgICByZXR1cm4gTWF0aC5hYnMoZ2V0U2Nyb2xsVG9wKCkgLSAoYi5zY3JvbGxIZWlnaHQgLSBiLmNsaWVudEhlaWdodCkpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0U2Nyb2xsVG9wKCkge1xuICAgIHJldHVybiB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFNyY3NldEltYWdlKHNyY3NldCwgcGl4ZWxXaWR0aCkge1xuICAgIHBpeGVsV2lkdGggPSBwaXhlbFdpZHRoIHx8IHdpbmRvdy5pbm5lcldpZHRoICogKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDApO1xuXG4gICAgY29uc3Qgc2V0ID0gc3Jjc2V0LnNwbGl0KCcsJylcbiAgICAgICAgLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgW3VybCwgd2lkdGhdID0gaXRlbS50cmltKCkuc3BsaXQoL1xccysvKTtcbiAgICAgICAgICAgIGNvbnN0IHNpemUgPSBwYXJzZUludCh3aWR0aC5zbGljZSgwLCAtMSksIDEwKTtcbiAgICAgICAgICAgIHJldHVybiB7dXJsLCBzaXplfTtcbiAgICAgICAgfSlcbiAgICAgICAgLnNvcnQoKGEsIGIpID0+IGIuc2l6ZSAtIGEuc2l6ZSk7XG5cbiAgICBpZiAoIXNldC5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIHJldHVybiBzZXQucmVkdWNlKCh2YWx1ZSwgaXRlbSkgPT4ge1xuICAgICAgICByZXR1cm4gaXRlbS5zaXplID49IHBpeGVsV2lkdGggPyBpdGVtLnVybCA6IHZhbHVlO1xuICAgIH0sIHNldFswXS51cmwpO1xufVxuIiwiaW1wb3J0IGJsb2NrU2Nyb2xsaW5nIGZyb20gJy4vYmxvY2tTY3JvbGxpbmcnO1xuaW1wb3J0IGZvcmNlUmVkcmF3IGZyb20gJy4vZm9yY2VSZWRyYXcnO1xuaW1wb3J0IGdldFBhZ2VIZWlnaHQgZnJvbSAnLi9nZXRQYWdlSGVpZ2h0JztcbmltcG9ydCBnZXRTY3JvbGxQZXJjZW50YWdlIGZyb20gJy4vZ2V0U2Nyb2xsUGVyY2VudGFnZSc7XG5pbXBvcnQgZ2V0U2Nyb2xsUmVtYWluaW5nIGZyb20gJy4vZ2V0U2Nyb2xsUmVtYWluaW5nJztcbmltcG9ydCBnZXRTY3JvbGxUb3AgZnJvbSAnLi9nZXRTY3JvbGxUb3AnO1xuaW1wb3J0IGdldFNyY3NldEltYWdlIGZyb20gJy4vZ2V0U3Jjc2V0SW1hZ2UnO1xuaW1wb3J0IGlzRWxlbWVudEluVmlld3BvcnQgZnJvbSAnLi9pc0VsZW1lbnRJblZpZXdwb3J0JztcbmltcG9ydCBpc1BhZ2VFbmQgZnJvbSAnLi9pc1BhZ2VFbmQnO1xuaW1wb3J0IHJlc2l6ZSBmcm9tICcuL3Jlc2l6ZSc7XG5pbXBvcnQgc2Nyb2xsIGZyb20gJy4vc2Nyb2xsJztcbmltcG9ydCBzZXRTdHlsZSBmcm9tICcuL3NldFN0eWxlJztcbmltcG9ydCB0cmFuc2l0aW9uRW5kIGZyb20gJy4vdHJhbnNpdGlvbkVuZCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBibG9ja1Njcm9sbGluZyxcbiAgICBmb3JjZVJlZHJhdyxcbiAgICBnZXRQYWdlSGVpZ2h0LFxuICAgIGdldFNjcm9sbFBlcmNlbnRhZ2UsXG4gICAgZ2V0U2Nyb2xsUmVtYWluaW5nLFxuICAgIGdldFNjcm9sbFRvcCxcbiAgICBnZXRTcmNzZXRJbWFnZSxcbiAgICBpc0VsZW1lbnRJblZpZXdwb3J0LFxuICAgIGlzUGFnZUVuZCxcbiAgICByZXNpemUsXG4gICAgc2Nyb2xsLFxuICAgIHNldFN0eWxlLFxuICAgIHRyYW5zaXRpb25FbmRcbn07XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc0VsZW1lbnRJblZpZXdwb3J0KGVsKSB7XG4gICAgY29uc3QgcmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHJldHVybiAoXG4gICAgICAgIHJlY3QudG9wID49IDAgJiZcbiAgICAgICAgcmVjdC5sZWZ0ID49IDAgJiZcbiAgICAgICAgcmVjdC5ib3R0b20gPD0gd2luZG93LmlubmVySGVpZ2h0ICYmXG4gICAgICAgIHJlY3QucmlnaHQgPD0gd2luZG93LmlubmVyV2lkdGhcbiAgICApO1xufVxuIiwiaW1wb3J0IGdldFNjcm9sbFRvcCBmcm9tICcuL2dldFNjcm9sbFRvcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzUGFnZUVuZChidWZmZXIgPSAwKSB7XG4gICAgY29uc3QgYiA9IGRvY3VtZW50LmJvZHk7XG4gICAgcmV0dXJuIE1hdGguYWJzKGdldFNjcm9sbFRvcCgpIC0gKGIuc2Nyb2xsSGVpZ2h0IC0gYi5jbGllbnRIZWlnaHQpKSA8PSBidWZmZXI7XG59XG4iLCJpbXBvcnQgZXZlbnRCdXMgZnJvbSAnLi4vZXZlbnRzL2V2ZW50QnVzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVzaXplKGRlYm91Y2VEZWxheSA9IDUwMCkge1xuXG4gICAgbGV0IHRpbWVvdXRJZDtcblxuICAgIC8vIG9yaWVudGF0aW9uY2hhbmdlIHRvbz9cblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SWQpO1xuICAgICAgICB0aW1lb3V0SWQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiBldmVudEJ1cy5lbWl0KCdyZXNpemUnKSwgZGVib3VjZURlbGF5KTtcbiAgICB9KTtcbn1cbiIsImltcG9ydCBldmVudEJ1cyBmcm9tICcuLi9ldmVudHMvZXZlbnRCdXMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzY3JvbGwoKSB7XG5cbiAgICBsZXQgbGFzdFNjcm9sbFkgPSAwLFxuICAgICAgICB0aWNraW5nID0gZmFsc2UsXG4gICAgICAgIHRpbWVvdXRJZDtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XG4gICAgICAgIHRpbWVvdXRJZCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IGV2ZW50QnVzLmVtaXQoJ3Njcm9sbGVuZCcsIGxhc3RTY3JvbGxZKSwgMjAwKTtcblxuICAgICAgICBldmVudEJ1cy5lbWl0KCdzY3JvbGwnLCBsYXN0U2Nyb2xsWSk7XG4gICAgICAgIHRpY2tpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXF1ZXN0VGljaygpIHtcbiAgICAgICAgaWYgKCF0aWNraW5nKSB7XG4gICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSk7XG4gICAgICAgICAgICB0aWNraW5nID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uU2Nyb2xsKCkge1xuICAgICAgICAvLyBsYXN0U2Nyb2xsWSA9IHdpbmRvdy5zY3JvbGxZO1xuICAgICAgICBsYXN0U2Nyb2xsWSA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgICAgICByZXF1ZXN0VGljaygpO1xuICAgIH1cblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBvblNjcm9sbCwgZmFsc2UpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2V0U3R5bGUoZWwsIHN0eWxlKSB7XG4gICAgT2JqZWN0LmtleXMoc3R5bGUpLmZvckVhY2goKHByb3ApID0+IHtcbiAgICAgICAgZWwuc3R5bGVbcHJvcF0gPSBzdHlsZVtwcm9wXTtcbiAgICB9KTtcbiAgICByZXR1cm4gZWw7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0cmFuc2l0aW9uRW5kKGVsLCBjYiwgdGltZW91dCA9IDEwMDApIHtcblxuICAgIGxldCB0aW1lb3V0SWQ7XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVyKCkge1xuICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBoYW5kbGVyKTtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2Via2l0VHJhbnNpdGlvbkVuZCcsIGhhbmRsZXIpO1xuICAgICAgICBjYigpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZWwuc3R5bGUudHJhbnNpdGlvbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGhhbmRsZXIpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGVsLnN0eWxlLldlYmtpdFRyYW5zaXRpb24gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCBoYW5kbGVyKTtcbiAgICB9XG5cbiAgICB0aW1lb3V0SWQgPSB3aW5kb3cuc2V0VGltZW91dChoYW5kbGVyLCB0aW1lb3V0KTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRlYm91bmNlKGhhbmRsZXIpIHtcbiAgICBsZXQgdGlja2luZyA9IGZhbHNlO1xuXG4gICAgZnVuY3Rpb24gdXBkYXRlKGV2ZW50KSB7XG4gICAgICAgIGhhbmRsZXIoZXZlbnQpO1xuICAgICAgICB0aWNraW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVxdWVzdFRpY2soZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aWNraW5nKSB7XG4gICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHVwZGF0ZShldmVudCkpO1xuICAgICAgICAgICAgdGlja2luZyA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVxdWVzdFRpY2s7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZWxlZ2F0ZUV2ZW50cyhwYXJlbnRFbCwgZXZlbnRUeXBlLCB0YWdOYW1lLCBjYikge1xuICAgIHRhZ05hbWUgPSB0YWdOYW1lLnRvVXBwZXJDYXNlKCk7XG5cbiAgICBwYXJlbnRFbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgKGV2ZW50KSA9PiB7XG4gICAgICAgIGxldCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG5cbiAgICAgICAgd2hpbGUgKHRhcmdldCAhPT0gcGFyZW50RWwpIHtcbiAgICAgICAgICAgIGlmICh0YXJnZXQudGFnTmFtZSA9PT0gdGFnTmFtZSkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIGNiKHRhcmdldCwgZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGU7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbiIsImltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tICdldmVudHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBlbWl0dGVyIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLnNldE1heExpc3RlbmVycygyMCk7XG4gICAgfVxuXG4gICAgb2ZmICh0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgICBpZiAobGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKHR5cGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgIH1cbn1cbiIsImltcG9ydCBlbWl0dGVyIGZyb20gJy4vZW1pdHRlcic7XG5cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5jcmVhdGUoZW1pdHRlci5wcm90b3R5cGUpO1xuIiwiaW1wb3J0IGVtaXR0ZXIgZnJvbSAnLi9lbWl0dGVyJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaGVhcnRiZWF0KGludGVydmFsKSB7XG4gICAgbGV0IGJlYXQgPSBudWxsLFxuICAgICAgICB0aW1lID0gMCxcbiAgICAgICAgbnVtVGltZXMgPSAwLFxuICAgICAgICBtYXhUaW1lcyA9IDAsXG4gICAgICAgIHJ1bm5pbmcgPSBmYWxzZTtcblxuICAgIGZ1bmN0aW9uIHN0YXJ0KG1heE51bVRpbWVzID0gMCwgdGltZU9mZnNldCA9IDApIHtcbiAgICAgICAgbWF4VGltZXMgPSBtYXhOdW1UaW1lcztcbiAgICAgICAgdGltZSA9IHRpbWVPZmZzZXQ7XG4gICAgICAgIG51bVRpbWVzID0gMDtcbiAgICAgICAgcnVubmluZyA9IHRydWU7XG4gICAgICAgIHJldHVybiBiZWF0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgICAgIHJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGJlYXQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlKGR0ID0gMSkge1xuICAgICAgICBpZiAoIXJ1bm5pbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBiZWF0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1heFRpbWVzID4gMCAmJiBudW1UaW1lcyA+PSBtYXhUaW1lcykge1xuICAgICAgICAgICAgcnVubmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgYmVhdC5lbWl0KCdjb21wbGV0ZScpO1xuICAgICAgICAgICAgcmV0dXJuIGJlYXQ7XG4gICAgICAgIH1cblxuICAgICAgICB0aW1lICs9IGR0O1xuXG4gICAgICAgIGlmICh0aW1lID49IGludGVydmFsKSB7XG4gICAgICAgICAgICB0aW1lID0gMDtcbiAgICAgICAgICAgIG51bVRpbWVzKys7XG4gICAgICAgICAgICBiZWF0LmVtaXQoJ3VwZGF0ZScsIG51bVRpbWVzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYmVhdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRJbnRlcnZhbCh2YWx1ZSkge1xuICAgICAgICBpbnRlcnZhbCA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gYmVhdDtcbiAgICB9XG5cbiAgICBiZWF0ID0gT2JqZWN0LmFzc2lnbihPYmplY3QuY3JlYXRlKGVtaXR0ZXIucHJvdG90eXBlKSwge1xuICAgICAgICBzdGFydCxcbiAgICAgICAgc3RvcCxcbiAgICAgICAgdXBkYXRlLFxuICAgICAgICBnZXQgaW50ZXJ2YWwoKSB7XG4gICAgICAgICAgICByZXR1cm4gaW50ZXJ2YWw7XG4gICAgICAgIH0sXG4gICAgICAgIHNldCBpbnRlcnZhbCh2YWx1ZSkge1xuICAgICAgICAgICAgaW50ZXJ2YWwgPSB2YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0SW50ZXJ2YWxcbiAgICB9KTtcblxuICAgIHJldHVybiBiZWF0O1xufVxuIiwiaW1wb3J0IGRlYm91bmNlIGZyb20gJy4vZGVib3VuY2UnO1xuaW1wb3J0IGRlbGVnYXRlRXZlbnRzIGZyb20gJy4vZGVsZWdhdGVFdmVudHMnO1xuaW1wb3J0IGVtaXR0ZXIgZnJvbSAnLi9lbWl0dGVyJztcbmltcG9ydCBldmVudEJ1cyBmcm9tICcuL2V2ZW50QnVzJztcbmltcG9ydCBoZWFydGJlYXQgZnJvbSAnLi9oZWFydGJlYXQnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZGVib3VuY2UsXG4gICAgZGVsZWdhdGVFdmVudHMsXG4gICAgZW1pdHRlcixcbiAgICBldmVudEJ1cyxcbiAgICBoZWFydGJlYXRcbn07XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmcHMoZWwpIHtcblxuICAgIGxldCB0aW1lID0gMCxcbiAgICAgICAgZnBzID0gMCxcbiAgICAgICAgY3VycmVudEZwcyA9IDAsXG4gICAgICAgIGF2ZXJhZ2VGcHMgPSAwLFxuICAgICAgICB0aWNrcyA9IDAsXG4gICAgICAgIHRvdGFsRnBzID0gMCxcbiAgICAgICAgbGFzdEZwcyA9IDAsXG4gICAgICAgIGxhc3RBdmVyYWdlID0gMDtcblxuICAgIGlmICghZWwpIHtcbiAgICAgICAgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKCdpZCcsICdmcHMnKTtcbiAgICAgICAgZWwuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICBlbC5zdHlsZS50b3AgPSAnMHB4JztcbiAgICAgICAgZWwuc3R5bGUucmlnaHQgPSAnMHB4JztcbiAgICAgICAgZWwuc3R5bGUucGFkZGluZyA9ICcycHggNnB4JztcbiAgICAgICAgZWwuc3R5bGUuekluZGV4ID0gJzk5OTk5JztcbiAgICAgICAgZWwuc3R5bGUuYmFja2dyb3VuZCA9ICcjMDAwJztcbiAgICAgICAgZWwuc3R5bGUuY29sb3IgPSAnI2ZmZic7XG4gICAgICAgIGVsLnN0eWxlLmZvbnRTaXplID0gJzEwcHgnO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXBvcnQoKSB7XG4gICAgICAgIGlmIChjdXJyZW50RnBzID09PSBsYXN0RnBzICYmIGF2ZXJhZ2VGcHMgPT09IGxhc3RBdmVyYWdlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGFzdEZwcyA9IGN1cnJlbnRGcHM7XG4gICAgICAgIGxhc3RBdmVyYWdlID0gYXZlcmFnZUZwcztcbiAgICAgICAgZWwuaW5uZXJIVE1MID0gJ0ZQUzogJyArIGN1cnJlbnRGcHMgKyAnPGJyIC8+QVZFOiAnICsgYXZlcmFnZUZwcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGUobm93KSB7XG4gICAgICAgIGlmICh0eXBlb2Ygbm93ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aW1lID09PSAwKSB7XG4gICAgICAgICAgICB0aW1lID0gbm93O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5vdyAtIDEwMDAgPiB0aW1lKSB7XG4gICAgICAgICAgICB0aW1lID0gbm93O1xuICAgICAgICAgICAgY3VycmVudEZwcyA9IGZwcztcbiAgICAgICAgICAgIGZwcyA9IDA7XG5cbiAgICAgICAgICAgIGlmIChjdXJyZW50RnBzID4gMSkge1xuICAgICAgICAgICAgICAgIHRpY2tzKys7XG4gICAgICAgICAgICAgICAgdG90YWxGcHMgKz0gY3VycmVudEZwcztcbiAgICAgICAgICAgICAgICBhdmVyYWdlRnBzID0gTWF0aC5mbG9vcih0b3RhbEZwcyAvIHRpY2tzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcG9ydCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnBzKys7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXV0bygpIHtcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShhdXRvKTtcblxuICAgICAgICB1cGRhdGUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBhdXRvLFxuICAgICAgICB1cGRhdGVcbiAgICB9O1xufVxuIiwibGV0IHJlcXVlc3QgPSBudWxsLFxuICAgIGV4aXQgPSBudWxsLFxuICAgIGNoYW5nZSA9IG51bGwsXG4gICAgZXJyb3IgPSBudWxsLFxuICAgIGVsZW1lbnQgPSBudWxsLFxuICAgIGVuYWJsZWQgPSBudWxsO1xuXG5jb25zdCBkb2NFbCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuaWYgKHR5cGVvZiBkb2NFbC5yZXF1ZXN0RnVsbHNjcmVlbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXF1ZXN0ID0gJ3JlcXVlc3RGdWxsc2NyZWVuJztcbiAgICBleGl0ID0gJ2V4aXRGdWxsc2NyZWVuJztcbiAgICBjaGFuZ2UgPSAnZnVsbHNjcmVlbmNoYW5nZSc7XG4gICAgZXJyb3IgPSAnZnVsbHNjcmVlbmVycm9yJztcbiAgICBlbGVtZW50ID0gJ2Z1bGxzY3JlZW5FbGVtZW50JztcbiAgICBlbmFibGVkID0gJ2Z1bGxzY3JlZW5FbmFibGVkJztcbn0gZWxzZSBpZiAodHlwZW9mIGRvY0VsLm1velJlcXVlc3RGdWxsU2NyZWVuICE9PSAndW5kZWZpbmVkJykge1xuICAgIHJlcXVlc3QgPSAnbW96UmVxdWVzdEZ1bGxTY3JlZW4nO1xuICAgIGV4aXQgPSAnbW96Q2FuY2VsRnVsbFNjcmVlbic7XG4gICAgY2hhbmdlID0gJ21vemZ1bGxzY3JlZW5jaGFuZ2UnO1xuICAgIGVycm9yID0gJ21vemZ1bGxzY3JlZW5lcnJvcic7XG4gICAgZWxlbWVudCA9ICdtb3pGdWxsU2NyZWVuRWxlbWVudCc7XG4gICAgZW5hYmxlZCA9ICdtb3pGdWxsU2NyZWVuRW5hYmxlZCc7XG59IGVsc2UgaWYgKHR5cGVvZiBkb2NFbC5tc1JlcXVlc3RGdWxsc2NyZWVuICE9PSAndW5kZWZpbmVkJykge1xuICAgIHJlcXVlc3QgPSAnbXNSZXF1ZXN0RnVsbHNjcmVlbic7XG4gICAgZXhpdCA9ICdtc0V4aXRGdWxsc2NyZWVuJztcbiAgICBjaGFuZ2UgPSAnTVNGdWxsc2NyZWVuQ2hhbmdlJztcbiAgICBlcnJvciA9ICdNU0Z1bGxzY3JlZW5FcnJvcic7XG4gICAgZWxlbWVudCA9ICdtc0Z1bGxzY3JlZW5FbGVtZW50JztcbiAgICBlbmFibGVkID0gJ21zRnVsbHNjcmVlbkVuYWJsZWQnO1xufSBlbHNlIGlmICh0eXBlb2YgZG9jRWwud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmVxdWVzdCA9ICd3ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbic7XG4gICAgZXhpdCA9ICd3ZWJraXRFeGl0RnVsbHNjcmVlbic7XG4gICAgY2hhbmdlID0gJ3dlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UnO1xuICAgIGVycm9yID0gJ3dlYmtpdEZ1bGxzY3JlZW5FcnJvcic7XG4gICAgZWxlbWVudCA9ICd3ZWJraXRGdWxsc2NyZWVuRWxlbWVudCc7XG4gICAgZW5hYmxlZCA9ICd3ZWJraXRGdWxsc2NyZWVuRW5hYmxlZCc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICByZXF1ZXN0LFxuICAgIGV4aXQsXG4gICAgY2hhbmdlLFxuICAgIGVycm9yLFxuICAgIGVsZW1lbnQsXG4gICAgZW5hYmxlZFxufTtcbiIsImltcG9ydCBhcGkgZnJvbSAnLi9hcGknO1xuaW1wb3J0IGVtaXR0ZXIgZnJvbSAnLi4vZXZlbnRzL2VtaXR0ZXInO1xuXG5jb25zdCBmdWxsc2NyZWVuID0gT2JqZWN0LmNyZWF0ZShlbWl0dGVyLnByb3RvdHlwZSk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoYXBpLmNoYW5nZSwgKGV2ZW50KSA9PiB7XG4gICAgZnVsbHNjcmVlbi5lbWl0KCdjaGFuZ2UnLCBldmVudCk7XG59KTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihhcGkuZXJyb3IsIChldmVudCkgPT4ge1xuICAgIGZ1bGxzY3JlZW4uZW1pdCgnZXJyb3InLCBldmVudCk7XG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoZnVsbHNjcmVlbiwge1xuICAgIHJlcXVlc3Q6IHtcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uKGVsKSB7XG4gICAgICAgICAgICBlbCA9IGVsIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgICAgIGVsW2FwaS5yZXF1ZXN0XSh0cnVlKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZXhpdDoge1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBkb2N1bWVudFthcGkuZXhpdF0oKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgdG9nZ2xlOiB7XG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbihlbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5leGl0KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucmVxdWVzdChlbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGlzU3VwcG9ydGVkOiB7XG4gICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgIHJldHVybiAhIWFwaS5yZXF1ZXN0O1xuICAgICAgICB9XG4gICAgfSxcbiAgICBpc0Z1bGxzY3JlZW46IHtcbiAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgcmV0dXJuICEhZG9jdW1lbnRbYXBpLmVsZW1lbnRdO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBlbGVtZW50OiB7XG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudFthcGkuZWxlbWVudF07XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGVuYWJsZWQ6IHtcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50W2FwaS5lbmFibGVkXTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBmdWxsc2NyZWVuO1xuIiwiZnVuY3Rpb24gZ2V0Q29sb3VyKHIsIGcsIGIsIGEgPSAxKSB7XG4gICAgaWYgKHR5cGVvZiByID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gcjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiByID09PSAnbnVtYmVyJykge1xuICAgICAgICByZXR1cm4gYHJnYmEoJHtyfSwke2J9LCR7Z30sJHthfSlgO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JhcGhpY3Mge1xuICAgIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB3aWR0aCA9PT0gJ29iamVjdCcgJiYgd2lkdGgudGFnTmFtZSA9PT0gJ0NBTlZBUycpIHtcbiAgICAgICAgICAgIHRoaXMuY2FudmFzID0gd2lkdGg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICAgICAgdGhpcy5zaXplKHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICB9XG5cbiAgICBnZXQgY29udGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3R4O1xuICAgIH1cblxuICAgIGZpbGwociwgZywgYiwgYSA9IDEpIHtcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gZ2V0Q29sb3VyKHIsIGcsIGIsIGEpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzdHJva2UociwgZywgYiwgYSA9IDEpIHtcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBnZXRDb2xvdXIociwgZywgYiwgYSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGNpcmNsZSh4LCB5LCByYWRpdXMpIHtcbiAgICAgICAgY29uc3Qge2N0eH0gPSB0aGlzO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5hcmMoeCwgeSwgcmFkaXVzLCAwLCBNYXRoLlBJICogMiwgZmFsc2UpO1xuICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICByZWN0KHgsIHksIHdpZHRoLCBoZWlnaHQsIGFuZ2xlID0gMCkge1xuICAgICAgICBjb25zdCB7Y3R4fSA9IHRoaXM7XG4gICAgICAgIGlmIChhbmdsZSAhPT0gMCkge1xuICAgICAgICAgICAgY3R4LnNhdmUoKTtcbiAgICAgICAgICAgIGN0eC50cmFuc2xhdGUoeCArIHdpZHRoIC8gMiwgeSArIGhlaWdodCAvIDIpO1xuICAgICAgICAgICAgY3R4LnJvdGF0ZShhbmdsZSk7XG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBjdHgucmVjdCgtd2lkdGggLyAyLCAtaGVpZ2h0IC8gMiwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGN0eC5yZWN0KHgsIHksIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBsaW5lKHgxLCB5MSwgeDIsIHkyKSB7XG4gICAgICAgIGNvbnN0IHtjdHh9ID0gdGhpcztcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHgubW92ZVRvKHgxLCB5MSk7XG4gICAgICAgIGN0eC5saW5lVG8oeDIsIHkyKTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBsaW5lV2lkdGgod2lkdGgpIHtcbiAgICAgICAgdGhpcy5jdHgubGluZVdpZHRoID0gd2lkdGg7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIG1vdmUoeCwgeSkge1xuICAgICAgICB0aGlzLmN0eC5tb3ZlVG8oeCwgeSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGltYWdlKGVsLCB4LCB5LCBhbmdsZSA9IDApIHtcbiAgICAgICAgY29uc3Qge2N0eH0gPSB0aGlzO1xuICAgICAgICBpZiAoYW5nbGUgIT09IDApIHtcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldFggPSBlbC53aWR0aCAvIDI7XG4gICAgICAgICAgICBjb25zdCBvZmZzZXRZID0gZWwuaGVpZ2h0IC8gMjtcbiAgICAgICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgICAgICBjdHgudHJhbnNsYXRlKHggKyBvZmZzZXRYLCB5ICsgb2Zmc2V0WSk7XG4gICAgICAgICAgICBjdHgucm90YXRlKGFuZ2xlKTtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoZWwsIC1vZmZzZXRYLCAtb2Zmc2V0WSk7XG4gICAgICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShlbCwgeCwgeSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgdGV4dChzdHIsIHgsIHkpIHtcbiAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoc3RyLCB4LCB5KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2V0Rm9udFN0eWxlKGZhbWlseSwgc2l6ZSkge1xuICAgICAgICB0aGlzLmN0eC5mb250ID0gYCR7c2l6ZX1weCAke2ZhbWlseX1gO1xuICAgIH1cblxuICAgIGdldEltYWdlRGF0YSh4ID0gMCwgeSA9IDAsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgY29uc3Qge2N0eCwgY2FudmFzfSA9IHRoaXM7XG4gICAgICAgIHJldHVybiBjdHguZ2V0SW1hZ2VEYXRhKHgsIHksIHdpZHRoIHx8IGNhbnZhcy53aWR0aCwgaGVpZ2h0IHx8IGNhbnZhcy5oZWlnaHQpO1xuICAgIH1cblxuICAgIGdldFBpeGVsKHgsIHkpIHtcbiAgICAgICAgeCA9IE1hdGguZmxvb3IoeCk7XG4gICAgICAgIHkgPSBNYXRoLmZsb29yKHkpO1xuICAgICAgICBjb25zdCB7ZGF0YX0gPSB0aGlzLmN0eC5nZXRJbWFnZURhdGEoeCwgeSwgMSwgMSk7XG4gICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkYXRhKTtcbiAgICB9XG5cbiAgICBzZXRQaXhlbCh4LCB5LCByLCBnLCBiLCBhKSB7XG4gICAgICAgIHggPSBNYXRoLmZsb29yKHgpO1xuICAgICAgICB5ID0gTWF0aC5mbG9vcih5KTtcbiAgICAgICAgY29uc3Qge3dpZHRoLCBkYXRhfSA9IHRoaXMuZ2V0SW1hZ2VEYXRhKCk7XG4gICAgICAgIGNvbnN0IGkgPSAoeCArIHkgKiB3aWR0aCkgKiA0O1xuICAgICAgICBkYXRhW2kgKyAwXSA9IHI7XG4gICAgICAgIGRhdGFbaSArIDFdID0gZztcbiAgICAgICAgZGF0YVtpICsgMl0gPSBiO1xuICAgICAgICBkYXRhW2kgKyAzXSA9IGE7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGNsZWFyQ2lyY2xlKHgsIHksIHJhZGl1cyA9IDIwKSB7XG4gICAgICAgIGNvbnN0IHtjdHh9ID0gdGhpcztcbiAgICAgICAgY3R4LnNhdmUoKTtcbiAgICAgICAgY3R4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdkZXN0aW5hdGlvbi1vdXQnO1xuICAgICAgICB0aGlzLmNpcmNsZSh4LCB5LCByYWRpdXMpO1xuICAgICAgICBjdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ3NvdXJjZS1vdmVyJztcbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgdHJhbnNsYXRlQW5kKHgsIHksIGZuKSB7XG4gICAgICAgIGNvbnN0IHtjdHh9ID0gdGhpcztcbiAgICAgICAgY3R4LnNhdmUoKTtcbiAgICAgICAgY3R4LnRyYW5zbGF0ZSh4LCB5KTtcbiAgICAgICAgZm4oY3R4KTtcbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgY2xlYXIociwgZywgYiwgYSA9IDEpIHtcbiAgICAgICAgY29uc3QgY29sb3IgPSBnZXRDb2xvdXIociwgZywgYiwgYSk7XG4gICAgICAgIGNvbnN0IHtjdHh9ID0gdGhpcztcbiAgICAgICAgY29uc3Qge3dpZHRoLCBoZWlnaHR9ID0gdGhpcy5jYW52YXM7XG4gICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgIGN0eC5zZXRUcmFuc2Zvcm0oMSwgMCwgMCwgMSwgMCwgMCk7XG4gICAgICAgIGlmIChjb2xvcikge1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgfVxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNpemUod2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCwgaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0KSB7XG4gICAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FudmFzLnBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuY2FudmFzLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQodGhpcy5jYW52YXMpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2FudmFzID0gbnVsbDtcbiAgICAgICAgdGhpcy5jdHggPSBudWxsO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldExvY2F0aW9uKGhyZWYpIHtcbiAgICBjb25zdCBsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGwuaHJlZiA9IGhyZWY7XG4gICAgcmV0dXJuIGw7XG59XG4iLCJpbXBvcnQgZ2V0TG9jYXRpb24gZnJvbSAnLi9nZXRMb2NhdGlvbic7XG5pbXBvcnQganNvbnAgZnJvbSAnLi9qc29ucCc7XG5pbXBvcnQgbG9hZFNjcmlwdCBmcm9tICcuL2xvYWRTY3JpcHQnO1xuaW1wb3J0IHVybFBhcmFtcyBmcm9tICcuL3VybFBhcmFtcyc7XG5pbXBvcnQgeGhyIGZyb20gJy4veGhyJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGdldExvY2F0aW9uLFxuICAgIGpzb25wLFxuICAgIGxvYWRTY3JpcHQsXG4gICAgdXJsUGFyYW1zLFxuICAgIHhoclxufTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGpzb25wKHVybCwgY2IsIHRpbWVvdXQgPSA1MDAwKSB7XG4gICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgY29uc3QgY2FsbGJhY2sgPSBganNvbnBfY2FsbGJhY2tfJHtNYXRoLnJvdW5kKDEwMDAwMCAqIE1hdGgucmFuZG9tKCkpfWA7XG4gICAgY29uc3Qgc2VwYXJhdG9yID0gdXJsLmluZGV4T2YoJz8nKSA+PSAwID8gJyYnIDogJz8nO1xuXG4gICAgY29uc3QgdGltZW91dElkID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB3aW5kb3dbY2FsbGJhY2tdKG51bGwsICdqc29ucCBlcnJvcicpO1xuICAgIH0sIHRpbWVvdXQpO1xuXG4gICAgd2luZG93W2NhbGxiYWNrXSA9IGZ1bmN0aW9uKGRhdGEsIGVyciA9IG51bGwpIHtcbiAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aW1lb3V0SWQpO1xuICAgICAgICBkZWxldGUgd2luZG93W2NhbGxiYWNrXTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChzY3JpcHQpO1xuICAgICAgICBjYihkYXRhLCBlcnIpO1xuICAgIH07XG5cbiAgICBzY3JpcHQuc3JjID0gYCR7dXJsfSR7c2VwYXJhdG9yfWNhbGxiYWNrPSR7Y2FsbGJhY2t9YDtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsb2FkU2NyaXB0KHNyYywgY2IpIHtcbiAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICBzY3JpcHQuc3JjID0gc3JjO1xuICAgIHNjcmlwdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4gY2IobnVsbCwgc3JjKSk7XG4gICAgc2NyaXB0LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgKCkgPT4gY2IodHJ1ZSwgc3JjKSk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgIHJldHVybiBzY3JpcHQ7XG59XG4iLCJjb25zdCBwbHVzID0gL1xcKy9nOyAgLy8gbWF0Y2ggJysnIHN5bWJvbFxuY29uc3Qgc2VhcmNoID0gLyhbXiY9XSspPT8oW14mXSopL2c7XG5cbmZ1bmN0aW9uIGRlY29kZShzdHIpIHtcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHN0ci5yZXBsYWNlKHBsdXMsICcgJykpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1cmxQYXJhbXMocXVlcnkpIHtcbiAgICBxdWVyeSA9IHF1ZXJ5IHx8IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc2xpY2UoMSk7XG5cbiAgICBjb25zdCBwYXJhbXMgPSB7fTtcbiAgICBsZXQgbWF0Y2ggPSBzZWFyY2guZXhlYyhxdWVyeSk7XG4gICAgd2hpbGUgKG1hdGNoKSB7XG4gICAgICAgIHBhcmFtc1tkZWNvZGUobWF0Y2hbMV0pXSA9IGRlY29kZShtYXRjaFsyXSk7XG4gICAgICAgIG1hdGNoID0gc2VhcmNoLmV4ZWMocXVlcnkpO1xuICAgIH1cbiAgICByZXR1cm4gcGFyYW1zO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24geGhyKHVybCwgdHlwZSA9ICdqc29uJykge1xuICAgIGNvbnN0IHAgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IHJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICByZXEuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCByZXNwb25zZSA9IHJlcS5yZXNwb25zZTtcbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnanNvbicgJiYgdHlwZW9mIHJlc3BvbnNlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJlcS5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsICgpID0+IHJlamVjdChyZXEuc3RhdHVzKSk7XG4gICAgICAgIHJlcS5vcGVuKCdHRVQnLCB1cmwpO1xuICAgICAgICByZXEucmVzcG9uc2VUeXBlID0gdHlwZTtcbiAgICAgICAgLy8gcmVxLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04Jyk7XG4gICAgICAgIHJlcS5zZW5kKCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHA7XG59XG4iLCJpbXBvcnQgJy4vcG9seWZpbGwnO1xuaW1wb3J0IGFycmF5IGZyb20gJy4vYXJyYXknO1xuaW1wb3J0IGRvbSBmcm9tICcuL2RvbSc7XG5pbXBvcnQgZXZlbnRzIGZyb20gJy4vZXZlbnRzJztcbmltcG9ydCBmcHMgZnJvbSAnLi9mcHMnO1xuaW1wb3J0IGZ1bGxzY3JlZW4gZnJvbSAnLi9mdWxsc2NyZWVuJztcbmltcG9ydCBncmFwaGljcyBmcm9tICcuL2dyYXBoaWNzJztcbmltcG9ydCBodHRwIGZyb20gJy4vaHR0cCc7XG5pbXBvcnQgaW5wdXQgZnJvbSAnLi9pbnB1dCc7XG5pbXBvcnQgbGlua2VkTGlzdCBmcm9tICcuL2xpbmtlZC1saXN0JztcbmltcG9ydCBtYXRoIGZyb20gJy4vbWF0aCc7XG5pbXBvcnQgbWVkaWEgZnJvbSAnLi9tZWRpYSc7XG5pbXBvcnQgb2JqZWN0UG9vbCBmcm9tICcuL29iamVjdC1wb29sJztcbmltcG9ydCBwbGF0Zm9ybSBmcm9tICcuL3BsYXRmb3JtJztcbmltcG9ydCBwb3B1cCBmcm9tICcuL3BvcHVwJztcbmltcG9ydCBzaGFyZSBmcm9tICcuL3NoYXJlJztcbmltcG9ydCBzdG9yYWdlIGZyb20gJy4vc3RvcmFnZSc7XG5pbXBvcnQgc3RyaW5nIGZyb20gJy4vc3RyaW5nJztcbmltcG9ydCB0cmFjayBmcm9tICcuL3RyYWNrJztcbmltcG9ydCB2aXNpYmlsaXR5IGZyb20gJy4vdmlzaWJpbGl0eSc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBhcnJheSxcbiAgICBkb20sXG4gICAgZXZlbnRzLFxuICAgIGZwcyxcbiAgICBmdWxsc2NyZWVuLFxuICAgIGdyYXBoaWNzLFxuICAgIGh0dHAsXG4gICAgaW5wdXQsXG4gICAgbGlua2VkTGlzdCxcbiAgICBtYXRoLFxuICAgIG1lZGlhLFxuICAgIG9iamVjdFBvb2wsXG4gICAgcGxhdGZvcm0sXG4gICAgcG9wdXAsXG4gICAgc2hhcmUsXG4gICAgc3RvcmFnZSxcbiAgICBzdHJpbmcsXG4gICAgdHJhY2ssXG4gICAgdmlzaWJpbGl0eVxufTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNsaWNrT3V0c2lkZShlbCwgY2IpIHtcbiAgICBmdW5jdGlvbiBvbkNsaWNrT3V0c2lkZShldmVudCkge1xuICAgICAgICBsZXQgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBsZXQgaW5zaWRlID0gZmFsc2U7XG5cbiAgICAgICAgd2hpbGUgKHRhcmdldCAhPT0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgICAgICAgaWYgKHRhcmdldCA9PT0gZWwpIHtcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBpbnNpZGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWluc2lkZSkge1xuICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIG9uQ2xpY2tPdXRzaWRlKTtcbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBvbkNsaWNrT3V0c2lkZSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBkZXN0cm95KCkge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBvbkNsaWNrT3V0c2lkZSk7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBvbkNsaWNrT3V0c2lkZSk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuIiwiaW1wb3J0IGNsaWNrT3V0c2lkZSBmcm9tICcuL2NsaWNrT3V0c2lkZSc7XG5pbXBvcnQga2V5Ym9hcmQgZnJvbSAnLi9rZXlib2FyZCc7XG5pbXBvcnQga2V5SW5wdXQgZnJvbSAnLi9rZXlJbnB1dCc7XG5pbXBvcnQgbWljcm9waG9uZSBmcm9tICcuL21pY3JvcGhvbmUnO1xuaW1wb3J0IG1vdXNlTGVmdFdpbmRvdyBmcm9tICcuL21vdXNlTGVmdFdpbmRvdyc7XG5pbXBvcnQgbW91c2VXaGVlbCBmcm9tICcuL21vdXNlV2hlZWwnO1xuaW1wb3J0IHBvaW50ZXJDb29yZHMgZnJvbSAnLi9wb2ludGVyQ29vcmRzJztcbmltcG9ydCB0b3VjaElucHV0IGZyb20gJy4vdG91Y2hJbnB1dCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBjbGlja091dHNpZGUsXG4gICAga2V5Ym9hcmQsXG4gICAga2V5SW5wdXQsXG4gICAgbWljcm9waG9uZSxcbiAgICBtb3VzZUxlZnRXaW5kb3csXG4gICAgbW91c2VXaGVlbCxcbiAgICBwb2ludGVyQ29vcmRzLFxuICAgIHRvdWNoSW5wdXRcbn07XG4iLCJpbXBvcnQgYXJyYXkgZnJvbSAnLi4vYXJyYXkvYXJyYXknO1xuaW1wb3J0IGVtaXR0ZXIgZnJvbSAnLi4vZXZlbnRzL2VtaXR0ZXInO1xuaW1wb3J0IGtleWJvYXJkIGZyb20gJy4va2V5Ym9hcmQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBrZXlJbnB1dCgpIHtcbiAgICBjb25zdCBhcGkgPSBPYmplY3QuY3JlYXRlKGVtaXR0ZXIucHJvdG90eXBlKTtcbiAgICBjb25zdCBrZXlzID0gYXJyYXkoMjU2LCBmYWxzZSk7XG5cbiAgICBmdW5jdGlvbiBlbWl0S2V5KGtleUNvZGUpIHtcbiAgICAgICAgY29uc3Qga2V5TmFtZSA9IE9iamVjdC5rZXlzKGtleWJvYXJkKS5yZWR1Y2UoKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBrZXlib2FyZFtrZXldID09PSBrZXlDb2RlID8ga2V5IDogdmFsdWU7XG4gICAgICAgIH0sICcnKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBpZiAoa2V5TmFtZSkge1xuICAgICAgICAgICAgYXBpLmVtaXQoa2V5TmFtZS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uS2V5RG93bihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBrZXlzW2V2ZW50LmtleUNvZGVdID0gdHJ1ZTtcbiAgICAgICAgYXBpLmVtaXQoJ2tleWRvd24nLCBldmVudC5rZXlDb2RlKTtcbiAgICAgICAgZW1pdEtleShldmVudC5rZXlDb2RlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbktleVVwKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGtleXNbZXZlbnQua2V5Q29kZV0gPSBmYWxzZTtcbiAgICAgICAgYXBpLmVtaXQoJ2tleXVwJywgZXZlbnQua2V5Q29kZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkKCkge1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25LZXlEb3duLCBmYWxzZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgb25LZXlVcCwgZmFsc2UpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uS2V5RG93bik7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgb25LZXlVcCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNEb3duKGtleSkge1xuICAgICAgICByZXR1cm4ga2V5c1trZXldO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxlZnQoKSB7XG4gICAgICAgIHJldHVybiBrZXlzW2tleWJvYXJkLkxFRlRdIHx8IGtleXNba2V5Ym9hcmQuQV07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmlnaHQoKSB7XG4gICAgICAgIHJldHVybiBrZXlzW2tleWJvYXJkLlJJR0hUXSB8fCBrZXlzW2tleWJvYXJkLkRdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwKCkge1xuICAgICAgICByZXR1cm4ga2V5c1trZXlib2FyZC5VUF0gfHwga2V5c1trZXlib2FyZC5XXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkb3duKCkge1xuICAgICAgICByZXR1cm4ga2V5c1trZXlib2FyZC5ET1dOXSB8fCBrZXlzW2tleWJvYXJkLlNdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNwYWNlKCkge1xuICAgICAgICByZXR1cm4ga2V5c1trZXlib2FyZC5TUEFDRV07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW5hYmxlKHZhbHVlID0gdHJ1ZSkge1xuICAgICAgICByZW1vdmUoKTtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBhZGQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZCgpO1xuXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oYXBpLCB7XG4gICAgICAgIGVuYWJsZSxcbiAgICAgICAgaXNEb3duLFxuICAgICAgICBsZWZ0LFxuICAgICAgICByaWdodCxcbiAgICAgICAgdXAsXG4gICAgICAgIGRvd24sXG4gICAgICAgIHNwYWNlXG4gICAgfSk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gICAgQTogJ0EnLmNoYXJDb2RlQXQoMCksXG4gICAgQjogJ0InLmNoYXJDb2RlQXQoMCksXG4gICAgQzogJ0MnLmNoYXJDb2RlQXQoMCksXG4gICAgRDogJ0QnLmNoYXJDb2RlQXQoMCksXG4gICAgRTogJ0UnLmNoYXJDb2RlQXQoMCksXG4gICAgRjogJ0YnLmNoYXJDb2RlQXQoMCksXG4gICAgRzogJ0cnLmNoYXJDb2RlQXQoMCksXG4gICAgSDogJ0gnLmNoYXJDb2RlQXQoMCksXG4gICAgSTogJ0knLmNoYXJDb2RlQXQoMCksXG4gICAgSjogJ0onLmNoYXJDb2RlQXQoMCksXG4gICAgSzogJ0snLmNoYXJDb2RlQXQoMCksXG4gICAgTDogJ0wnLmNoYXJDb2RlQXQoMCksXG4gICAgTTogJ00nLmNoYXJDb2RlQXQoMCksXG4gICAgTjogJ04nLmNoYXJDb2RlQXQoMCksXG4gICAgTzogJ08nLmNoYXJDb2RlQXQoMCksXG4gICAgUDogJ1AnLmNoYXJDb2RlQXQoMCksXG4gICAgUTogJ1EnLmNoYXJDb2RlQXQoMCksXG4gICAgUjogJ1InLmNoYXJDb2RlQXQoMCksXG4gICAgUzogJ1MnLmNoYXJDb2RlQXQoMCksXG4gICAgVDogJ1QnLmNoYXJDb2RlQXQoMCksXG4gICAgVTogJ1UnLmNoYXJDb2RlQXQoMCksXG4gICAgVjogJ1YnLmNoYXJDb2RlQXQoMCksXG4gICAgVzogJ1cnLmNoYXJDb2RlQXQoMCksXG4gICAgWDogJ1gnLmNoYXJDb2RlQXQoMCksXG4gICAgWTogJ1knLmNoYXJDb2RlQXQoMCksXG4gICAgWjogJ1onLmNoYXJDb2RlQXQoMCksXG4gICAgWkVSTzogJzAnLmNoYXJDb2RlQXQoMCksXG4gICAgT05FOiAnMScuY2hhckNvZGVBdCgwKSxcbiAgICBUV086ICcyJy5jaGFyQ29kZUF0KDApLFxuICAgIFRIUkVFOiAnMycuY2hhckNvZGVBdCgwKSxcbiAgICBGT1VSOiAnNCcuY2hhckNvZGVBdCgwKSxcbiAgICBGSVZFOiAnNScuY2hhckNvZGVBdCgwKSxcbiAgICBTSVg6ICc2Jy5jaGFyQ29kZUF0KDApLFxuICAgIFNFVkVOOiAnNycuY2hhckNvZGVBdCgwKSxcbiAgICBFSUdIVDogJzgnLmNoYXJDb2RlQXQoMCksXG4gICAgTklORTogJzknLmNoYXJDb2RlQXQoMCksXG4gICAgTlVNUEFEXzA6IDk2LFxuICAgIE5VTVBBRF8xOiA5NyxcbiAgICBOVU1QQURfMjogOTgsXG4gICAgTlVNUEFEXzM6IDk5LFxuICAgIE5VTVBBRF80OiAxMDAsXG4gICAgTlVNUEFEXzU6IDEwMSxcbiAgICBOVU1QQURfNjogMTAyLFxuICAgIE5VTVBBRF83OiAxMDMsXG4gICAgTlVNUEFEXzg6IDEwNCxcbiAgICBOVU1QQURfOTogMTA1LFxuICAgIE5VTVBBRF9NVUxUSVBMWTogMTA2LFxuICAgIE5VTVBBRF9BREQ6IDEwNyxcbiAgICBOVU1QQURfRU5URVI6IDEwOCxcbiAgICBOVU1QQURfU1VCVFJBQ1Q6IDEwOSxcbiAgICBOVU1QQURfREVDSU1BTDogMTEwLFxuICAgIE5VTVBBRF9ESVZJREU6IDExMSxcbiAgICBGMTogMTEyLFxuICAgIEYyOiAxMTMsXG4gICAgRjM6IDExNCxcbiAgICBGNDogMTE1LFxuICAgIEY1OiAxMTYsXG4gICAgRjY6IDExNyxcbiAgICBGNzogMTE4LFxuICAgIEY4OiAxMTksXG4gICAgRjk6IDEyMCxcbiAgICBGMTA6IDEyMSxcbiAgICBGMTE6IDEyMixcbiAgICBGMTI6IDEyMyxcbiAgICBGMTM6IDEyNCxcbiAgICBGMTQ6IDEyNSxcbiAgICBGMTU6IDEyNixcbiAgICBDT0xPTjogMTg2LFxuICAgIEVRVUFMUzogMTg3LFxuICAgIFVOREVSU0NPUkU6IDE4OSxcbiAgICBRVUVTVElPTl9NQVJLOiAxOTEsXG4gICAgVElMREU6IDE5MixcbiAgICBPUEVOX0JSQUNLRVQ6IDIxOSxcbiAgICBCQUNLV0FSRF9TTEFTSDogMjIwLFxuICAgIENMT1NFRF9CUkFDS0VUOiAyMjEsXG4gICAgUVVPVEVTOiAyMjIsXG4gICAgQkFDS1NQQUNFOiA4LFxuICAgIFRBQjogOSxcbiAgICBDTEVBUjogMTIsXG4gICAgRU5URVI6IDEzLFxuICAgIFNISUZUOiAxNixcbiAgICBDT05UUk9MOiAxNyxcbiAgICBBTFQ6IDE4LFxuICAgIENBUFNfTE9DSzogMjAsXG4gICAgRVNDOiAyNyxcbiAgICBTUEFDRTogMzIsXG4gICAgUEFHRV9VUDogMzMsXG4gICAgUEFHRV9ET1dOOiAzNCxcbiAgICBFTkQ6IDM1LFxuICAgIEhPTUU6IDM2LFxuICAgIExFRlQ6IDM3LFxuICAgIFVQOiAzOCxcbiAgICBSSUdIVDogMzksXG4gICAgRE9XTjogNDAsXG4gICAgSU5TRVJUOiA0NSxcbiAgICBERUxFVEU6IDQ2LFxuICAgIEhFTFA6IDQ3LFxuICAgIE5VTV9MT0NLOiAxNDRcbn07XG4iLCJpbXBvcnQgZW1pdHRlciBmcm9tICcuLi9ldmVudHMvZW1pdHRlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1pY3JvcGhvbmUoKSB7XG4gICAgY29uc3QgbWljID0gT2JqZWN0LmNyZWF0ZShlbWl0dGVyLnByb3RvdHlwZSk7XG4gICAgbGV0IHN0cmVhbSA9IG51bGw7XG5cbiAgICBjb25zdCBnZXRVc2VyTWVkaWEgPSAobmF2aWdhdG9yLmdldFVzZXJNZWRpYSB8fFxuICAgICAgICBuYXZpZ2F0b3Iud2Via2l0R2V0VXNlck1lZGlhIHx8XG4gICAgICAgIG5hdmlnYXRvci5tb3pHZXRVc2VyTWVkaWEgfHxcbiAgICAgICAgbmF2aWdhdG9yLm1zR2V0VXNlck1lZGlhKTtcblxuICAgIGNvbnN0IGlzU3VwcG9ydGVkID0gISFnZXRVc2VyTWVkaWE7XG5cbiAgICBmdW5jdGlvbiBjb25uZWN0KCkge1xuICAgICAgICBpZiAoIWlzU3VwcG9ydGVkKSB7XG4gICAgICAgICAgICBtaWMuZW1pdCgnZXJyb3InLCAnTm90IHN1cHBvcnRlZCcpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGdldFVzZXJNZWRpYSh7XG4gICAgICAgICAgICBhdWRpbzogdHJ1ZVxuICAgICAgICB9LCAobWVkaWFTdHJlYW0pID0+IHtcbiAgICAgICAgICAgIHN0cmVhbSA9IG1lZGlhU3RyZWFtO1xuICAgICAgICAgICAgbWljLmVtaXQoJ2Nvbm5lY3QnLCBzdHJlYW0pO1xuICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGUubmFtZSA9PT0gJ1Blcm1pc3Npb25EZW5pZWRFcnJvcicgfHwgZSA9PT0gJ1BFUk1JU1NJT05fREVOSUVEJykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQZXJtaXNzaW9uIGRlbmllZC4gVW5kbyBieSBjbGlja2luZyB0aGUgY2FtZXJhIGljb24gaW4gdGhlIGFkZHJlc3MgYmFyJyk7XG4gICAgICAgICAgICAgICAgbWljLmVtaXQoJ2RlbmllZCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtaWMuZW1pdCgnZXJyb3InLCBlLm1lc3NhZ2UgfHwgZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRpc2Nvbm5lY3QoKSB7XG4gICAgICAgIGlmIChzdHJlYW0pIHtcbiAgICAgICAgICAgIHN0cmVhbS5zdG9wKCk7XG4gICAgICAgICAgICBzdHJlYW0gPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlV2ViQXVkaW9Tb3VyY2Uod2ViQXVkaW9Db250ZXh0LCBjb25uZWN0VG8pIHtcbiAgICAgICAgaWYgKCFzdHJlYW0pIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc291cmNlID0gd2ViQXVkaW9Db250ZXh0LmNyZWF0ZU1lZGlhU3RyZWFtU291cmNlKHN0cmVhbSk7XG5cbiAgICAgICAgaWYgKGNvbm5lY3RUbykge1xuICAgICAgICAgICAgc291cmNlLmNvbm5lY3QoY29ubmVjdFRvKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEhBQ0s6IHN0b3BzIG1veiBnYXJiYWdlIGNvbGxlY3Rpb24ga2lsbGluZyB0aGUgc3RyZWFtXG4gICAgICAgIC8vIHNlZSBodHRwczovL3N1cHBvcnQubW96aWxsYS5vcmcvZW4tVVMvcXVlc3Rpb25zLzk4NDE3OVxuICAgICAgICBpZiAobmF2aWdhdG9yLm1vekdldFVzZXJNZWRpYSkge1xuICAgICAgICAgICAgd2luZG93LmhhY2tfZm9yX21vemlsbGEgPSBzb3VyY2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc291cmNlO1xuICAgIH1cblxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKG1pYywge1xuICAgICAgICBjb25uZWN0LFxuICAgICAgICBkaXNjb25uZWN0LFxuICAgICAgICBjcmVhdGVXZWJBdWRpb1NvdXJjZSxcbiAgICAgICAgaXNTdXBwb3J0ZWQ6ICgpID0+IGlzU3VwcG9ydGVkLFxuICAgICAgICBzdHJlYW06ICgpID0+IHN0cmVhbVxuICAgIH0pO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbW91c2VMZWZ0V2luZG93KGNiKSB7XG4gICAgZnVuY3Rpb24gaGFuZGxlcihldmVudCkge1xuICAgICAgICBjb25zdCBmcm9tID0gZXZlbnQucmVsYXRlZFRhcmdldCB8fCBldmVudC50b0VsZW1lbnQ7XG4gICAgICAgIGlmICghZnJvbSB8fCBmcm9tLm5vZGVOYW1lID09PSAnSFRNTCcpIHtcbiAgICAgICAgICAgIGNiKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIGhhbmRsZXIsIGZhbHNlKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGRlc3Ryb3kgKCkge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBoYW5kbGVyKTtcbiAgICAgICAgfVxuICAgIH07XG59XG4iLCJpbXBvcnQgZW1pdHRlciBmcm9tICcuLi9ldmVudHMvZW1pdHRlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1vdXNlV2hlZWwoc3BlZWQpIHtcbiAgICBzcGVlZCA9IHNwZWVkIHx8IDI7XG5cbiAgICBsZXQgd2hlZWw7XG5cbiAgICBmdW5jdGlvbiB3aGVlbEhhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgZGlyZWN0aW9uID0gKGV2ZW50LmRldGFpbCA8IDAgfHwgZXZlbnQud2hlZWxEZWx0YSA+IDApID8gMSA6IC0xO1xuICAgICAgICBjb25zdCBkZWx0YSA9IGRpcmVjdGlvbiAqIHNwZWVkO1xuXG4gICAgICAgIGlmIChkaXJlY3Rpb24gPiAwKSB7XG4gICAgICAgICAgICB3aGVlbC5lbWl0KCd1cCcsIGRlbHRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdoZWVsLmVtaXQoJ2Rvd24nLCBkZWx0YSk7XG4gICAgICAgIH1cblxuICAgICAgICB3aGVlbC5lbWl0KCd1cGRhdGUnLCBkZWx0YSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkKCkge1xuICAgICAgICBpZiAoJ29ubW91c2V3aGVlbCcgaW4gd2luZG93KSB7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V3aGVlbCcsIHdoZWVsSGFuZGxlciwgZmFsc2UpO1xuICAgICAgICB9IGVsc2UgaWYgKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NTW91c2VTY3JvbGwnLCB3aGVlbEhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgICAgaWYgKCdvbm1vdXNld2hlZWwnIGluIHdpbmRvdykge1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNld2hlZWwnLCB3aGVlbEhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIGlmICh3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ0RPTU1vdXNlU2Nyb2xsJywgd2hlZWxIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGQoKTtcblxuICAgIHdoZWVsID0gT2JqZWN0LmNyZWF0ZShlbWl0dGVyLnByb3RvdHlwZSwge1xuICAgICAgICBfZXZlbnRzOiB7XG4gICAgICAgICAgICB2YWx1ZToge31cbiAgICAgICAgfSxcbiAgICAgICAgYWRkOiB7XG4gICAgICAgICAgICB2YWx1ZTogYWRkXG4gICAgICAgIH0sXG4gICAgICAgIHJlbW92ZToge1xuICAgICAgICAgICAgdmFsdWU6IHJlbW92ZVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZSh3aGVlbCk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwb2ludGVyQ29vcmRzKCkge1xuICAgIGxldCBzZWxmO1xuXG4gICAgZnVuY3Rpb24gY2FsY3VsYXRlQ29vcmRzKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHBYID0gZXZlbnQuY2xpZW50WCB8fCAwO1xuICAgICAgICBjb25zdCBwWSA9IGV2ZW50LmNsaWVudFkgfHwgMDtcbiAgICAgICAgY29uc3Qgc1ggPSB3aW5kb3cucGFnZVhPZmZzZXQ7XG4gICAgICAgIGNvbnN0IHNZID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuICAgICAgICBzZWxmLnggPSBwWCArIHNYO1xuICAgICAgICBzZWxmLnkgPSBwWSArIHNZO1xuICAgICAgICBzZWxmLnBlcmNlbnRYID0gc2VsZi54IC8gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgIHNlbGYucGVyY2VudFkgPSBzZWxmLnkgLyB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgfVxuXG4gICAgc2VsZiA9IHtcbiAgICAgICAgeDogMCxcbiAgICAgICAgeTogMCxcbiAgICAgICAgcGVyY2VudFg6IDAsXG4gICAgICAgIHBlcmNlbnRZOiAwLFxuICAgICAgICBpc0xpc3RlbmluZzogZmFsc2UsXG5cbiAgICAgICAgb246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBjYWxjdWxhdGVDb29yZHMpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBjYWxjdWxhdGVDb29yZHMpO1xuICAgICAgICAgICAgc2VsZi5pc0xpc3RlbmluZyA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcbiAgICAgICAgb2ZmOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgY2FsY3VsYXRlQ29vcmRzKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgY2FsY3VsYXRlQ29vcmRzKTtcbiAgICAgICAgICAgIHNlbGYuaXNMaXN0ZW5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gc2VsZjtcbn1cbiIsImltcG9ydCBlbWl0dGVyIGZyb20gJy4uL2V2ZW50cy9lbWl0dGVyJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdG91Y2hJbnB1dChlbCkge1xuICAgIGVsID0gZWwgfHwgZG9jdW1lbnQuYm9keTtcblxuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIHN0YXJ0OiBbLTEsIC0xXSxcbiAgICAgICAgbW92ZTogWy0xLCAtMV0sXG4gICAgICAgIGVuZDogWy0xLCAtMV0sXG4gICAgICAgIHBvc2l0aW9uOiBbLTEsIC0xXSxcbiAgICAgICAgZGlzdGFuY2U6IFswLCAwXSxcbiAgICAgICAgZGlyZWN0aW9uOiBbJ25vbmUnLCAnbm9uZSddLFxuICAgICAgICB0b3VjaGluZzogZmFsc2UsXG4gICAgICAgIG9yaWdpbmFsRXZlbnQ6IG51bGxcbiAgICB9O1xuXG4gICAgbGV0IHNlbGY7XG5cbiAgICBmdW5jdGlvbiB0b3VjaEhhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgaWYgKCEoZXZlbnQgJiYgZXZlbnQudG91Y2hlcykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBkYXRhLm9yaWdpbmFsRXZlbnQgPSBldmVudDtcbiAgICAgICAgY29uc3QgdG91Y2ggPSBldmVudC50b3VjaGVzWzBdO1xuICAgICAgICBjb25zdCB4ID0gdG91Y2ggJiYgdG91Y2gucGFnZVg7XG4gICAgICAgIGNvbnN0IHkgPSB0b3VjaCAmJiB0b3VjaC5wYWdlWTtcblxuICAgICAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3RvdWNoc3RhcnQnOlxuICAgICAgICAgICAgICAgIGRhdGEuc3RhcnRbMF0gPSBkYXRhLm1vdmVbMF0gPSBkYXRhLmVuZFswXSA9IGRhdGEucG9zaXRpb25bMF0gPSB4O1xuICAgICAgICAgICAgICAgIGRhdGEuc3RhcnRbMV0gPSBkYXRhLm1vdmVbMV0gPSBkYXRhLmVuZFsxXSA9IGRhdGEucG9zaXRpb25bMV0gPSB5O1xuICAgICAgICAgICAgICAgIGRhdGEudG91Y2hpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHNlbGYuZW1pdCgnc3RhcnQnLCBkYXRhKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3RvdWNobW92ZSc6XG4gICAgICAgICAgICAgICAgZGF0YS5tb3ZlWzBdID0gZGF0YS5wb3NpdGlvblswXSA9IHg7XG4gICAgICAgICAgICAgICAgZGF0YS5tb3ZlWzFdID0gZGF0YS5wb3NpdGlvblsxXSA9IHk7XG4gICAgICAgICAgICAgICAgc2VsZi5lbWl0KCdtb3ZlJywgZGF0YSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd0b3VjaGVuZCc6XG4gICAgICAgICAgICAgICAgZGF0YS5lbmRbMF0gPSBkYXRhLnBvc2l0aW9uWzBdID0geDtcbiAgICAgICAgICAgICAgICBkYXRhLmVuZFsxXSA9IGRhdGEucG9zaXRpb25bMV0gPSB5O1xuICAgICAgICAgICAgICAgIGRhdGEudG91Y2hpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBzZWxmLmVtaXQoJ2VuZCcsIGRhdGEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDogYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaXN0ZW4oZWxlbSkge1xuICAgICAgICBlbCA9IGVsZW0gfHwgZWw7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0b3VjaEhhbmRsZXIpO1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0b3VjaEhhbmRsZXIpO1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRvdWNoSGFuZGxlcik7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAgIHNlbGYucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0b3VjaEhhbmRsZXIpO1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0b3VjaEhhbmRsZXIpO1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRvdWNoSGFuZGxlcik7XG4gICAgICAgIGVsID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfVxuXG4gICAgbGlzdGVuKGVsKTtcblxuICAgIHNlbGYgPSBPYmplY3QuY3JlYXRlKGVtaXR0ZXIucHJvdG90eXBlLCB7XG4gICAgICAgIF9ldmVudHM6IHtcbiAgICAgICAgICAgIHZhbHVlOiB7fVxuICAgICAgICB9LFxuICAgICAgICBsaXN0ZW46IHtcbiAgICAgICAgICAgIHZhbHVlOiBsaXN0ZW5cbiAgICAgICAgfSxcbiAgICAgICAgaXNEb3duOiB7XG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEudG91Y2hpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGdldFRvdWNoOiB7XG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGRlc3Ryb3k6IHtcbiAgICAgICAgICAgIHZhbHVlOiBkZXN0cm95XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBPYmplY3QuZnJlZXplKHNlbGYpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbGlua2VkTGlzdChhcnIgPSBbXSkge1xuXG4gICAgbGV0IGZpcnN0LFxuICAgICAgICBsYXN0O1xuXG4gICAgLypcbiAgICAgICAgaXRlbSA9IHtcbiAgICAgICAgICAgICduZXh0JzogbnVsbCxcbiAgICAgICAgICAgICdwcmV2JzogbnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGl0ZW0gPSBsaW5rZWRMaXN0LmdldEZpcnN0KCk7XG4gICAgICAgIHdoaWxlKGl0ZW0pIHtcbiAgICAgICAgICAgIC8vIGRvIHN0dWZmXG4gICAgICAgICAgICBpdGVtID0gaXRlbS5uZXh0O1xuICAgICAgICB9XG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIHJlbW92ZShpdGVtKSB7XG4gICAgICAgIGlmIChpdGVtLm5leHQpIHtcbiAgICAgICAgICAgIGl0ZW0ubmV4dC5wcmV2ID0gaXRlbS5wcmV2O1xuICAgICAgICB9XG4gICAgICAgIGlmIChpdGVtLnByZXYpIHtcbiAgICAgICAgICAgIGl0ZW0ucHJldi5uZXh0ID0gaXRlbS5uZXh0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChpdGVtID09PSBmaXJzdCkge1xuICAgICAgICAgICAgZmlyc3QgPSBpdGVtLm5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGl0ZW0gPT09IGxhc3QpIHtcbiAgICAgICAgICAgIGxhc3QgPSBpdGVtLnByZXY7XG4gICAgICAgIH1cbiAgICAgICAgaXRlbS5uZXh0ID0gaXRlbS5wcmV2ID0gbnVsbDtcblxuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnNlcnRBZnRlcihpdGVtLCBhZnRlcikge1xuICAgICAgICByZW1vdmUoaXRlbSk7XG5cbiAgICAgICAgaXRlbS5wcmV2ID0gYWZ0ZXI7XG4gICAgICAgIGl0ZW0ubmV4dCA9IGFmdGVyLm5leHQ7XG5cbiAgICAgICAgaWYgKCFhZnRlci5uZXh0KSB7XG4gICAgICAgICAgICBsYXN0ID0gaXRlbTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFmdGVyLm5leHQucHJldiA9IGl0ZW07XG4gICAgICAgIH1cblxuICAgICAgICBhZnRlci5uZXh0ID0gaXRlbTtcblxuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnNlcnRCZWZvcmUoaXRlbSwgYmVmb3JlKSB7XG4gICAgICAgIHJlbW92ZShpdGVtKTtcblxuICAgICAgICBpdGVtLnByZXYgPSBiZWZvcmUucHJldjtcbiAgICAgICAgaXRlbS5uZXh0ID0gYmVmb3JlO1xuXG4gICAgICAgIGlmICghYmVmb3JlLnByZXYpIHtcbiAgICAgICAgICAgIGZpcnN0ID0gaXRlbTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJlZm9yZS5wcmV2Lm5leHQgPSBpdGVtO1xuICAgICAgICB9XG5cbiAgICAgICAgYmVmb3JlLnByZXYgPSBpdGVtO1xuXG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZChpdGVtKSB7XG4gICAgICAgIGlmICghZmlyc3QpIHtcbiAgICAgICAgICAgIGZpcnN0ID0gbGFzdCA9IGl0ZW07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgaSA9IGZpcnN0O1xuICAgICAgICAgICAgd2hpbGUgKGkubmV4dCkge1xuICAgICAgICAgICAgICAgIGkgPSBpLm5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbnNlcnRBZnRlcihpdGVtLCBpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JFYWNoKGZuKSB7XG4gICAgICAgIGxldCBpdGVtID0gZmlyc3Q7XG4gICAgICAgIHdoaWxlIChpdGVtKSB7XG4gICAgICAgICAgICBmbihpdGVtKTtcbiAgICAgICAgICAgIGl0ZW0gPSBpdGVtLm5leHQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYXAoZm4pIHtcbiAgICAgICAgY29uc3QgbGlzdCA9IGxpbmtlZExpc3QoKTtcbiAgICAgICAgbGV0IGl0ZW0gPSBmaXJzdDtcbiAgICAgICAgd2hpbGUgKGl0ZW0pIHtcbiAgICAgICAgICAgIGxpc3QuYWRkKGZuKGl0ZW0pKTtcbiAgICAgICAgICAgIGl0ZW0gPSBpdGVtLm5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxpc3Q7XG4gICAgfVxuXG4gICAgYXJyLmZvckVhY2goKGl0ZW0pID0+IGFkZChpdGVtKSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBnZXQgZmlyc3QgKCkge1xuICAgICAgICAgICAgcmV0dXJuIGZpcnN0O1xuICAgICAgICB9LFxuICAgICAgICBnZXRGaXJzdCAoKSB7XG4gICAgICAgICAgICByZXR1cm4gZmlyc3Q7XG4gICAgICAgIH0sXG4gICAgICAgIGdldCBsYXN0ICgpIHtcbiAgICAgICAgICAgIHJldHVybiBsYXN0O1xuICAgICAgICB9LFxuICAgICAgICBnZXRMYXN0ICgpIHtcbiAgICAgICAgICAgIHJldHVybiBsYXN0O1xuICAgICAgICB9LFxuICAgICAgICBnZXQgbGVuZ3RoICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldENvdW50KCk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldENvdW50ICgpIHtcbiAgICAgICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgICAgICBsZXQgaSA9IGZpcnN0O1xuICAgICAgICAgICAgd2hpbGUgKGkpIHtcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgICAgIGkgPSBpLm5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY291bnQ7XG4gICAgICAgIH0sXG4gICAgICAgIGFkZCxcbiAgICAgICAgcmVtb3ZlLFxuICAgICAgICBpbnNlcnRBZnRlcixcbiAgICAgICAgaW5zZXJ0QmVmb3JlLFxuICAgICAgICBmb3JFYWNoLFxuICAgICAgICBtYXBcbiAgICB9O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYW5nbGUoeDEsIHkxLCB4MiwgeTIpIHtcbiAgICBjb25zdCBkeCA9IHgyIC0geDE7XG4gICAgY29uc3QgZHkgPSB5MiAtIHkxO1xuICAgIHJldHVybiBNYXRoLmF0YW4yKGR5LCBkeCk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjZXJwKGZyb20sIHRvLCB3ZWlnaHQgPSAwLjMpIHtcbiAgICBjb25zdCBmID0gKDEgLSBNYXRoLmNvcyh3ZWlnaHQgKiBNYXRoLlBJKSkgLyAyO1xuICAgIHJldHVybiAoZnJvbSAqICgxIC0gZikgKyB0byAqIGYpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2xhbXAodmFsdWUsIG1pbiwgbWF4KSB7XG4gICAgaWYgKG1pbiA+IG1heCkge1xuICAgICAgICBjb25zdCBhID0gbWluO1xuICAgICAgICBtaW4gPSBtYXg7XG4gICAgICAgIG1heCA9IGE7XG4gICAgfVxuICAgIGlmICh2YWx1ZSA8IG1pbikge1xuICAgICAgICByZXR1cm4gbWluO1xuICAgIH1cbiAgICBpZiAodmFsdWUgPiBtYXgpIHtcbiAgICAgICAgcmV0dXJuIG1heDtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29pblRvc3MoaGVhZHMgPSB0cnVlLCB0YWlscyA9IGZhbHNlKSB7XG4gICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgPiAwLjUgPyBoZWFkcyA6IHRhaWxzO1xufVxuIiwiLypcblRoZSBzaWduIHRlbGxzIHVzIGlmIGEgaXMgdG8gdGhlIGxlZnQgKC0pIG9yIHRoZSByaWdodCAoKykgb2YgYlxuKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyb3NzUHJvZHVjdDJkKGFYLCBhWSwgYlgsIGJZKSB7XG4gICAgcmV0dXJuIGFYICogYlkgLSBhWSAqIGJYO1xufVxuIiwiY29uc3QgREVHID0gMTgwIC8gTWF0aC5QSTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGVncmVlcyhyYWRpYW5zKSB7XG4gICAgcmV0dXJuIHJhZGlhbnMgKiBERUc7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkaWZmZXJlbmNlKGEsIGIpIHtcbiAgICByZXR1cm4gTWF0aC5hYnMoYSAtIGIpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGlzdGFuY2UoeDEsIHkxLCB4MiwgeTIpIHtcbiAgICBjb25zdCBkeCA9IHgxIC0geDI7XG4gICAgY29uc3QgZHkgPSB5MSAtIHkyO1xuICAgIHJldHVybiBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGlzdGFuY2VTUSh4MSwgeTEsIHgyLCB5Mikge1xuICAgIGNvbnN0IGR4ID0geDEgLSB4MjtcbiAgICBjb25zdCBkeSA9IHkxIC0geTI7XG4gICAgcmV0dXJuIGR4ICogZHggKyBkeSAqIGR5O1xufVxuIiwiLypcbi0gSWYgQSBhbmQgQiBhcmUgcGVycGVuZGljdWxhciAoYXQgOTAgZGVncmVlcyB0byBlYWNoIG90aGVyKSwgdGhlIHJlc3VsdFxub2YgdGhlIGRvdCBwcm9kdWN0IHdpbGwgYmUgemVybywgYmVjYXVzZSBjb3MozpgpIHdpbGwgYmUgemVyby5cbi0gSWYgdGhlIGFuZ2xlIGJldHdlZW4gQSBhbmQgQiBhcmUgbGVzcyB0aGFuIDkwIGRlZ3JlZXMsIHRoZSBkb3QgcHJvZHVjdFxud2lsbCBiZSBwb3NpdGl2ZSAoZ3JlYXRlciB0aGFuIHplcm8pLCBhcyBjb3MozpgpIHdpbGwgYmUgcG9zaXRpdmUsIGFuZFxudGhlIHZlY3RvciBsZW5ndGhzIGFyZSBhbHdheXMgcG9zaXRpdmUgdmFsdWVzLlxuLSBJZiB0aGUgYW5nbGUgYmV0d2VlbiBBIGFuZCBCIGFyZSBncmVhdGVyIHRoYW4gOTAgZGVncmVlcywgdGhlIGRvdFxucHJvZHVjdCB3aWxsIGJlIG5lZ2F0aXZlIChsZXNzIHRoYW4gemVybyksIGFzIGNvcyjOmCkgd2lsbCBiZSBuZWdhdGl2ZSxcbmFuZCB0aGUgdmVjdG9yIGxlbmd0aHMgYXJlIGFsd2F5cyBwb3NpdGl2ZSB2YWx1ZXNcbiovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkb3RQcm9kdWN0MmQoYVgsIGFZLCBiWCwgYlkpIHtcbiAgICByZXR1cm4gYVggKiBiWCArIGFZICogYlk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRDaXJjbGVQb2ludHMob3JpZ2luWCwgb3JpZ2luWSwgcmFkaXVzLCBjb3VudCwgc3RhcnQsIENsYXNzKSB7XG4gICAgaWYgKHR5cGVvZiBzdGFydCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgc3RhcnQgPSAtTWF0aC5QSSAvIDI7XG4gICAgfVxuXG4gICAgY29uc3QgcG9pbnRzID0gW10sXG4gICAgICAgIGNpcmMgPSBNYXRoLlBJICogMixcbiAgICAgICAgaW5jciA9IGNpcmMgLyBjb3VudDtcblxuICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IGNpcmMgKyBzdGFydDsgaSArPSBpbmNyKSB7XG4gICAgICAgIGNvbnN0IG9iID0gdHlwZW9mIENsYXNzID09PSAndW5kZWZpbmVkJyA/IHt9IDogbmV3IENsYXNzKCk7XG4gICAgICAgIG9iLnggPSBvcmlnaW5YICsgcmFkaXVzICogTWF0aC5jb3MoaSk7XG4gICAgICAgIG9iLnkgPSBvcmlnaW5ZICsgcmFkaXVzICogTWF0aC5zaW4oaSk7XG4gICAgICAgIHBvaW50cy5wdXNoKG9iKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcG9pbnRzO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0SW50ZXJzZWN0aW9uQXJlYShhWCwgYVksIGFXLCBhSCwgYlgsIGJZLCBiVywgYkgpIHtcbiAgICBjb25zdCBvdmVybGFwWCA9IE1hdGgubWF4KDAsIE1hdGgubWluKGFYICsgYVcsIGJYICsgYlcpIC0gTWF0aC5tYXgoYVgsIGJYKSk7XG4gICAgY29uc3Qgb3ZlcmxhcFkgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihhWSArIGFILCBiWSArIGJIKSAtIE1hdGgubWF4KGFZLCBiWSkpO1xuICAgIHJldHVybiBvdmVybGFwWCAqIG92ZXJsYXBZO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0T3ZlcmxhcFgoYVgsIGFXLCBiWCwgYlcpIHtcbiAgICByZXR1cm4gTWF0aC5tYXgoMCwgTWF0aC5taW4oYVggKyBhVywgYlggKyBiVykgLSBNYXRoLm1heChhWCwgYlgpKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldE92ZXJsYXBZKGFZLCBhSCwgYlksIGJIKSB7XG4gICAgcmV0dXJuIE1hdGgubWF4KDAsIE1hdGgubWluKGFZICsgYUgsIGJZICsgYkgpIC0gTWF0aC5tYXgoYVksIGJZKSk7XG59XG4iLCJpbXBvcnQgYW5nbGUgZnJvbSAnLi9hbmdsZSc7XG5pbXBvcnQgY2VycCBmcm9tICcuL2NlcnAnO1xuaW1wb3J0IGNsYW1wIGZyb20gJy4vY2xhbXAnO1xuaW1wb3J0IGNvaW5Ub3NzIGZyb20gJy4vY29pblRvc3MnO1xuaW1wb3J0IGNyb3NzUHJvZHVjdDJkIGZyb20gJy4vY3Jvc3NQcm9kdWN0MmQnO1xuaW1wb3J0IGRlZ3JlZXMgZnJvbSAnLi9kZWdyZWVzJztcbmltcG9ydCBkaWZmZXJlbmNlIGZyb20gJy4vZGlmZmVyZW5jZSc7XG5pbXBvcnQgZGlzdGFuY2UgZnJvbSAnLi9kaXN0YW5jZSc7XG5pbXBvcnQgZGlzdGFuY2VTcSBmcm9tICcuL2Rpc3RhbmNlU3EnO1xuaW1wb3J0IGRvdFByb2R1Y3QyZCBmcm9tICcuL2RvdFByb2R1Y3QyZCc7XG5pbXBvcnQgZ2V0Q2lyY2xlUG9pbnRzIGZyb20gJy4vZ2V0Q2lyY2xlUG9pbnRzJztcbmltcG9ydCBnZXRJbnRlcnNlY3Rpb25BcmVhIGZyb20gJy4vZ2V0SW50ZXJzZWN0aW9uQXJlYSc7XG5pbXBvcnQgZ2V0T3ZlcmxhcFggZnJvbSAnLi9nZXRPdmVybGFwWCc7XG5pbXBvcnQgZ2V0T3ZlcmxhcFkgZnJvbSAnLi9nZXRPdmVybGFwWSc7XG5pbXBvcnQgbGVycCBmcm9tICcuL2xlcnAnO1xuaW1wb3J0IG1hcCBmcm9tICcuL21hcCc7XG5pbXBvcnQgb3JpZW50YXRpb24gZnJvbSAnLi9vcmllbnRhdGlvbic7XG5pbXBvcnQgcGVyY2VudFJlbWFpbmluZyBmcm9tICcuL3BlcmNlbnRSZW1haW5pbmcnO1xuaW1wb3J0IHJhZGlhbnMgZnJvbSAnLi9yYWRpYW5zJztcbmltcG9ydCByYW5kb20gZnJvbSAnLi9yYW5kb20nO1xuaW1wb3J0IHJhbmRvbUludCBmcm9tICcuL3JhbmRvbUludCc7XG5pbXBvcnQgcmFuZG9tU2lnbiBmcm9tICcuL3JhbmRvbVNpZ24nO1xuaW1wb3J0IHJvdGF0ZVRvRGVnIGZyb20gJy4vcm90YXRlVG9EZWcnO1xuaW1wb3J0IHJvdGF0ZVRvUmFkIGZyb20gJy4vcm90YXRlVG9SYWQnO1xuaW1wb3J0IHJvdW5kVG8gZnJvbSAnLi9yb3VuZFRvJztcbmltcG9ydCByb3VuZFRvTmVhcmVzdCBmcm9tICcuL3JvdW5kVG9OZWFyZXN0JztcbmltcG9ydCBzaXplIGZyb20gJy4vc2l6ZSc7XG5pbXBvcnQgc21lcnAgZnJvbSAnLi9zbWVycCc7XG5pbXBvcnQgc21vb3Roc3RlcCBmcm9tICcuL3Ntb290aHN0ZXAnO1xuaW1wb3J0IHNwbGl0VmFsdWVBbmRVbml0IGZyb20gJy4vc3BsaXRWYWx1ZUFuZFVuaXQnO1xuaW1wb3J0IHdlaWdodGVkQXZlcmFnZSBmcm9tICcuL3dlaWdodGVkQXZlcmFnZSc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBhbmdsZSxcbiAgICBjZXJwLFxuICAgIGNsYW1wLFxuICAgIGNvaW5Ub3NzLFxuICAgIGNyb3NzUHJvZHVjdDJkLFxuICAgIGRlZ3JlZXMsXG4gICAgZGlmZmVyZW5jZSxcbiAgICBkaXN0YW5jZSxcbiAgICBkaXN0YW5jZVNxLFxuICAgIGRvdFByb2R1Y3QyZCxcbiAgICBnZXRDaXJjbGVQb2ludHMsXG4gICAgZ2V0SW50ZXJzZWN0aW9uQXJlYSxcbiAgICBnZXRPdmVybGFwWCxcbiAgICBnZXRPdmVybGFwWSxcbiAgICBsZXJwLFxuICAgIG1hcCxcbiAgICBvcmllbnRhdGlvbixcbiAgICBwZXJjZW50UmVtYWluaW5nLFxuICAgIHJhZGlhbnMsXG4gICAgcmFuZG9tLFxuICAgIHJhbmRvbUludCxcbiAgICByYW5kb21TaWduLFxuICAgIHJvdGF0ZVRvRGVnLFxuICAgIHJvdGF0ZVRvUmFkLFxuICAgIHJvdW5kVG8sXG4gICAgcm91bmRUb05lYXJlc3QsXG4gICAgc21lcnAsXG4gICAgc21vb3Roc3RlcCxcbiAgICBzaXplLFxuICAgIHNwbGl0VmFsdWVBbmRVbml0LFxuICAgIHdlaWdodGVkQXZlcmFnZVxufTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxlcnAoZnJvbSwgdG8sIHdlaWdodCA9IDAuMykge1xuICAgIHJldHVybiBmcm9tICsgKHRvIC0gZnJvbSkgKiB3ZWlnaHQ7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYXAodiwgYSwgYiwgeCwgeSkge1xuICAgIC8vIHZhbHVlLCBtaW4gZXhwZWN0ZWQsIG1heCBleHBlY3RlZCwgbWFwIG1pbiwgbWFwIG1heFxuICAgIC8vIGUuZy4gbWFwIHNvbWUgdmFsdWUgYmV0d2VlbiAwIHRvIDEwMCB0byAtNTAgdG8gNTBcbiAgICAvLyBtYXAoNTAsIDAsIDEwMCwgLTUwLCA1MCkgLy8gMFxuICAgIC8vIG1hcCgyNSwgMCwgMTAwLCAtNTAsIDUwKSAvLyAtMjVcbiAgICByZXR1cm4gKHYgPT09IGEpID8geCA6ICh2IC0gYSkgKiAoeSAtIHgpIC8gKGIgLSBhKSArIHg7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvcmllbnRhdGlvbih4LCB5KSB7XG4gICAgcmV0dXJuIE1hdGguYXRhbjIoeSwgeCk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwZXJjZW50UmVtYWluaW5nKHZhbHVlLCB0b3RhbCkge1xuICAgIHJldHVybiAodmFsdWUgJSB0b3RhbCkgLyB0b3RhbDtcbn1cbiIsImNvbnN0IFJBRCA9IE1hdGguUEkgLyAxODA7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJhZGlhbnMoZGVncmVlcykge1xuICAgIHJldHVybiBkZWdyZWVzICogUkFEO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmFuZG9tKG1pbiwgbWF4KSB7XG4gICAgaWYgKGlzTmFOKG1heCkpIHtcbiAgICAgICAgbWF4ID0gbWluO1xuICAgICAgICBtaW4gPSAwO1xuICAgIH1cbiAgICByZXR1cm4gbWluICsgTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmFuZG9tSW50KG1pbiwgbWF4KSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IobWluICsgTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJhbmRvbVNpZ24oKSB7XG4gICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgPiAwLjUgPyAtMSA6IDE7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByb3RhdGVUb0RlZyhzdGFydCwgZW5kKSB7XG4gICAgbGV0IGRpZmYgPSAoZW5kIC0gc3RhcnQpICUgMzYwO1xuICAgIGlmIChkaWZmICE9PSBkaWZmICUgMTgwKSB7XG4gICAgICAgIGRpZmYgPSAoZGlmZiA8IDApID8gZGlmZiArIDM2MCA6IGRpZmYgLSAzNjA7XG4gICAgfVxuICAgIHJldHVybiBzdGFydCArIGRpZmY7XG59XG4iLCJjb25zdCBQSTIgPSBNYXRoLlBJICogMjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcm90YXRlVG9SQUQoc3RhcnQsIGVuZCkge1xuICAgIGxldCBkaWZmID0gKGVuZCAtIHN0YXJ0KSAlIFBJMjtcbiAgICBpZiAoZGlmZiAhPT0gZGlmZiAlIE1hdGguUEkpIHtcbiAgICAgICAgZGlmZiA9IGRpZmYgPCAwID8gZGlmZiArIFBJMiA6IGRpZmYgLSBQSTI7XG4gICAgfVxuICAgIHJldHVybiBzdGFydCArIGRpZmY7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByb3VuZFRvKHgsIHBsYWNlcyA9IDIpIHtcbiAgICBjb25zdCBkaXYgPSBNYXRoLnBvdygxMCwgcGxhY2VzKTtcbiAgICByZXR1cm4gTWF0aC5yb3VuZCh4ICogZGl2KSAvIGRpdjtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJvdW5kVG9OZWFyZXN0KHZhbHVlLCB1bml0KSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQodmFsdWUgLyB1bml0KSAqIHVuaXQ7XG59XG4iLCJmdW5jdGlvbiBnZXRTY2FsZShtZXRob2QsIHdpZHRoLCBoZWlnaHQsIGFyZWFXaWR0aCwgYXJlYUhlaWdodCkge1xuICAgIHN3aXRjaCAobWV0aG9kKSB7XG4gICAgICAgIGNhc2UgJ2NvdmVyJzpcbiAgICAgICAgICAgIHJldHVybiBNYXRoLm1heChhcmVhV2lkdGggLyB3aWR0aCwgYXJlYUhlaWdodCAvIGhlaWdodCk7XG4gICAgICAgIGNhc2UgJ2NvbnRhaW4nOlxuICAgICAgICAgICAgcmV0dXJuIE1hdGgubWluKGFyZWFXaWR0aCAvIHdpZHRoLCBhcmVhSGVpZ2h0IC8gaGVpZ2h0KTtcbiAgICAgICAgY2FzZSAnd2lkdGgnOlxuICAgICAgICAgICAgcmV0dXJuIGFyZWFXaWR0aCAvIHdpZHRoO1xuICAgICAgICBjYXNlICdoZWlnaHQnOlxuICAgICAgICAgICAgcmV0dXJuIGFyZWFIZWlnaHQgLyBoZWlnaHQ7XG4gICAgICAgIGRlZmF1bHQ6IGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gMTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2l6ZShyZWN0LCBhcmVhV2lkdGgsIGFyZWFIZWlnaHQsIG1ldGhvZCA9ICdjb3ZlcicsIGF1dG9DZW50ZXIgPSB0cnVlKSB7XG4gICAgY29uc3Qgc2NhbGUgPSBnZXRTY2FsZShtZXRob2QsIHJlY3Qud2lkdGgsIHJlY3QuaGVpZ2h0LCBhcmVhV2lkdGgsIGFyZWFIZWlnaHQpO1xuICAgIGNvbnN0IHdpZHRoID0gTWF0aC5jZWlsKHJlY3Qud2lkdGggKiBzY2FsZSk7XG4gICAgY29uc3QgaGVpZ2h0ID0gTWF0aC5jZWlsKHJlY3QuaGVpZ2h0ICogc2NhbGUpO1xuXG4gICAgbGV0IHggPSAwLCB5ID0gMDtcblxuICAgIGlmIChhdXRvQ2VudGVyKSB7XG4gICAgICAgIHggPSBNYXRoLnJvdW5kKChhcmVhV2lkdGggLSB3aWR0aCkgKiAwLjUpO1xuICAgICAgICB5ID0gTWF0aC5yb3VuZCgoYXJlYUhlaWdodCAtIGhlaWdodCkgKiAwLjUpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHgsXG4gICAgICAgIHksXG4gICAgICAgIHdpZHRoLFxuICAgICAgICBoZWlnaHQsXG4gICAgICAgIHNjYWxlXG4gICAgfTtcbn1cbiIsImltcG9ydCBzbW9vdGhzdGVwIGZyb20gJy4vc21vb3Roc3RlcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNtZXJwKGZyb20sIHRvLCBzdGFydFRpbWUsIGVuZFRpbWUsIHRpbWUpIHtcbiAgICByZXR1cm4gZnJvbSArICh0byAtIGZyb20pICogc21vb3Roc3RlcChzdGFydFRpbWUsIGVuZFRpbWUsIHRpbWUpO1xufVxuIiwiaW1wb3J0IGNsYW1wIGZyb20gJy4vY2xhbXAnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzbW9vdGhzdGVwKG1pbiwgbWF4LCB2YWx1ZSkge1xuICAgIGNvbnN0IHggPSBjbGFtcCgodmFsdWUgLSBtaW4pIC8gKG1heCAtIG1pbiksIDAsIDEpO1xuICAgIHJldHVybiB4ICogeCAqICgzIC0gMiAqIHgpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3BsaXRWYWx1ZUFuZFVuaXQocHJvcCkge1xuICAgIGNvbnN0IHJlID0gLyheLT9cXGQqXFwuP1xcZCopKC4qKS87XG4gICAgY29uc3QgbWF0Y2ggPSBwcm9wLm1hdGNoKHJlKTtcbiAgICBjb25zdCB2YWx1ZSA9IE51bWJlcihtYXRjaFsxXSk7XG4gICAgY29uc3QgdW5pdCA9IG1hdGNoWzJdO1xuICAgIHJldHVybiB7dmFsdWUsIHVuaXR9O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gd2VpZ2h0ZWRBdmVyYWdlKGZyb20sIHRvLCB3ZWlnaHQgPSAxMCkge1xuICAgIHJldHVybiAoKGZyb20gKiAod2VpZ2h0IC0gMSkpICsgdG8pIC8gd2VpZ2h0O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3VlcG9pbnRzUmVhZGVyKCkge1xuICAgIGNvbnN0IGxpc3QgPSBbXTtcbiAgICBsZXQgcmVhZGVyO1xuICAgIGxldCBkaXNwYXRjaDtcbiAgICBsZXQgY3VycmVudFBvc2l0aW9uID0gMDtcbiAgICBsZXQgbGFzdFBvc2l0aW9uID0gLTE7XG4gICAgbGV0IHRvbGVyYW5jZSA9IDAuMjtcblxuICAgIGZ1bmN0aW9uIGFkZChwb3NpdGlvbiwgbmFtZSwgZGF0YSkge1xuICAgICAgICBsaXN0LnB1c2goe3Bvc2l0aW9uLCBuYW1lLCBkYXRhfSk7XG5cbiAgICAgICAgbGlzdC5zb3J0KChhLCBiKSA9PiBhLnBvc2l0aW9uIC0gYi5wb3NpdGlvbik7XG5cbiAgICAgICAgcmV0dXJuIHJlYWRlcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkN1ZXBvaW50KGZuLCB0aGlzQXJnKSB7XG4gICAgICAgIGlmIChmbikge1xuICAgICAgICAgICAgZGlzcGF0Y2ggPSB0aGlzQXJnID8gZm4uYmluZCh0aGlzQXJnKSA6IGZuO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGlzcGF0Y2ggPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZWFkZXI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICAgIGN1cnJlbnRQb3NpdGlvbiA9IDA7XG4gICAgICAgIGxhc3RQb3NpdGlvbiA9IC0xO1xuICAgICAgICByZXR1cm4gcmVhZGVyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZUFsbCgpIHtcbiAgICAgICAgbGlzdC5sZW5ndGggPSAwO1xuICAgICAgICByZXR1cm4gcmVzZXQoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRUb2xlcmFuY2UodmFsdWUpIHtcbiAgICAgICAgdG9sZXJhbmNlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiByZWFkZXI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5SYW5nZShjdWVwb2ludFBvcywgY3VycmVudFBvcywgbGFzdFBvcykge1xuICAgICAgICBpZiAoY3VlcG9pbnRQb3MgPiBjdXJyZW50UG9zKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGN1ZXBvaW50UG9zIDw9IGxhc3RQb3MpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBkaWZmID0gY3VlcG9pbnRQb3MgLSBjdXJyZW50UG9zO1xuICAgICAgICBpZiAoZGlmZiA8IDApIHtcbiAgICAgICAgICAgIGRpZmYgPSAtZGlmZjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGlmZiA8PSB0b2xlcmFuY2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2soY3VycmVudFBvcywgbGFzdFBvcykge1xuICAgICAgICBpZiAoY3VycmVudFBvcyA8PSBsYXN0UG9zKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBkaXNwYXRjaCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGlzdC5zb21lKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAoaW5SYW5nZShpdGVtLnBvc2l0aW9uLCBjdXJyZW50UG9zLCBsYXN0UG9zKSkge1xuICAgICAgICAgICAgICAgIGRpc3BhdGNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGUocG9zaXRpb24pIHtcbiAgICAgICAgY3VycmVudFBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgICAgIGNoZWNrKGN1cnJlbnRQb3NpdGlvbiwgbGFzdFBvc2l0aW9uKTtcbiAgICAgICAgbGFzdFBvc2l0aW9uID0gY3VycmVudFBvc2l0aW9uO1xuICAgICAgICByZXR1cm4gcmVhZGVyO1xuICAgIH1cblxuICAgIHJlYWRlciA9IE9iamVjdC5mcmVlemUoe1xuICAgICAgICBhZGQsXG4gICAgICAgIG9uQ3VlcG9pbnQsXG4gICAgICAgIHJlbW92ZUFsbCxcbiAgICAgICAgcmVzZXQsXG4gICAgICAgIHNldFRvbGVyYW5jZSxcbiAgICAgICAgdXBkYXRlXG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVhZGVyO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaU9TUGxheVZpZGVvSW5saW5lKGVsLCBsb29wID0gdHJ1ZSkge1xuICAgIGNvbnN0IGZyYW1lVGltZSA9IDEgLyAyNTtcblxuICAgIGxldCBzZWxmLFxuICAgICAgICBsYXN0VGltZSA9IDAsXG4gICAgICAgIHBsYXlpbmcgPSBmYWxzZTtcblxuICAgIC8vIFRoaXMgY2FuIChhbmQgc2hvdWxkKSBiZSBwdXQgaW4gYSBjc3MgZmlsZSBpbnN0ZWFkIG9mIGRvaW5nIHN0eWxlU2hlZXRzWzBdLmluc2VydFJ1bGU6XG4gICAgY29uc3QgY3NzUnVsZSA9ICcuaU9TUGxheVZpZGVvSW5saW5lOjotd2Via2l0LW1lZGlhLWNvbnRyb2xzIHsgZGlzcGxheTpub25lICFpbXBvcnRhbnQ7IH0nO1xuICAgIGRvY3VtZW50LnN0eWxlU2hlZXRzWzBdLmluc2VydFJ1bGUoY3NzUnVsZSwgMCk7XG5cbiAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoJ2NvbnRyb2xzJyk7XG4gICAgZWwuY2xhc3NMaXN0LmFkZCgnaU9TUGxheVZpZGVvSW5saW5lJyk7XG5cblxuICAgIGZ1bmN0aW9uIHNlZWsodGltZSkge1xuICAgICAgICBlbC5jdXJyZW50VGltZSA9IHRpbWU7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhdXNlKCkge1xuICAgICAgICBwbGF5aW5nID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUZyYW1lKCkge1xuICAgICAgICBpZiAoIXBsYXlpbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlRnJhbWUpO1xuXG4gICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIGNvbnN0IGRlbHRhVGltZSA9IG5vdyAtIGxhc3RUaW1lO1xuXG4gICAgICAgIGlmIChkZWx0YVRpbWUgPj0gZnJhbWVUaW1lICogMTAwMCkge1xuICAgICAgICAgICAgbGFzdFRpbWUgPSBub3c7XG5cbiAgICAgICAgICAgIGNvbnN0IGVuZGVkID0gZWwuY3VycmVudFRpbWUgKyBmcmFtZVRpbWUgPj0gZWwuZHVyYXRpb247XG5cbiAgICAgICAgICAgIGlmIChlbmRlZCAmJiBsb29wKSB7XG4gICAgICAgICAgICAgICAgc2VlaygwKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZW5kZWQpIHtcbiAgICAgICAgICAgICAgICBwYXVzZSgpO1xuICAgICAgICAgICAgICAgIC8vIHNlbGYuZW1pdCgnZW5kZWQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VlayhlbC5jdXJyZW50VGltZSArIGZyYW1lVGltZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHNlbGYuZW1pdCgndGltZXVwZGF0ZScsIGVsLmN1cnJlbnRUaW1lLCBzZWxmKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBsYXkoKSB7XG4gICAgICAgIHBsYXlpbmcgPSB0cnVlO1xuICAgICAgICB1cGRhdGVGcmFtZSgpO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICAvLyBzZWxmLnJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgICAgICBwYXVzZSgpO1xuICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUodXBkYXRlRnJhbWUpO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH1cblxuICAgIC8vIHNlbGYgPSBPYmplY3QuY3JlYXRlKEVtaXR0ZXIucHJvdG90eXBlLCB7XG4gICAgc2VsZiA9IE9iamVjdC5jcmVhdGUobnVsbCwge1xuICAgICAgICBfZXZlbnRzOiB7XG4gICAgICAgICAgICB2YWx1ZToge31cbiAgICAgICAgfSxcbiAgICAgICAgZGVzdHJveToge1xuICAgICAgICAgICAgdmFsdWU6IGRlc3Ryb3lcbiAgICAgICAgfSxcbiAgICAgICAgcGF1c2U6IHtcbiAgICAgICAgICAgIHZhbHVlOiBwYXVzZVxuICAgICAgICB9LFxuICAgICAgICBwbGF5OiB7XG4gICAgICAgICAgICB2YWx1ZTogcGxheVxuICAgICAgICB9LFxuICAgICAgICBzZWVrOiB7XG4gICAgICAgICAgICB2YWx1ZTogc2Vla1xuICAgICAgICB9LFxuICAgICAgICBlbDoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGN1cnJlbnRUaW1lOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbC5jdXJyZW50VGltZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZHVyYXRpb246IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsLmR1cmF0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBsb29wOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBsb29wO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICBsb29wID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHBsYXlpbmc6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBsYXlpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBPYmplY3QuZnJlZXplKHNlbGYpO1xufVxuIiwiaW1wb3J0IGN1ZXBvaW50c1JlYWRlciBmcm9tICcuL2N1ZXBvaW50c1JlYWRlcic7XG5pbXBvcnQgaU9TUGxheVZpZGVvSW5saW5lIGZyb20gJy4vaU9TUGxheVZpZGVvSW5saW5lJztcbmltcG9ydCB2aWRlb1BsYXllciBmcm9tICcuL3ZpZGVvUGxheWVyJztcbmltcG9ydCB2aW1lbyBmcm9tICcuL3ZpbWVvJztcbmltcG9ydCB5b3V0dWJlIGZyb20gJy4veW91dHViZSc7XG5pbXBvcnQgeW91dHViZUJhc2ljIGZyb20gJy4veW91dHViZUJhc2ljJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGN1ZXBvaW50c1JlYWRlcixcbiAgICBpT1NQbGF5VmlkZW9JbmxpbmUsXG4gICAgdmlkZW9QbGF5ZXIsXG4gICAgdmltZW8sXG4gICAgeW91dHViZSxcbiAgICB5b3V0dWJlQmFzaWNcbn07XG4iLCJpbXBvcnQgZW1pdHRlciBmcm9tICcuLi9ldmVudHMvZW1pdHRlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHZpZGVvUGxheWVyKHZpZGVvRWwpIHtcbiAgICBsZXQgZWwgPSB2aWRlb0VsIHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG4gICAgbGV0IHBsYXllcjtcblxuICAgIGZ1bmN0aW9uIG1ldGFkYXRhSGFuZGxlcigpIHtcbiAgICAgICAgcGxheWVyLmVtaXQoJ21ldGFkYXRhJywge1xuICAgICAgICAgICAgc3JjOiBlbC5jdXJyZW50U3JjLFxuICAgICAgICAgICAgd2lkdGg6IGVsLnZpZGVvV2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IGVsLnZpZGVvSGVpZ2h0LFxuICAgICAgICAgICAgZHVyYXRpb246IGVsLmR1cmF0aW9uXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhbnBsYXlIYW5kbGVyKCkge1xuICAgICAgICBwbGF5ZXIuZW1pdCgncmVhZHknKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGF5SGFuZGxlcigpIHtcbiAgICAgICAgcGxheWVyLmVtaXQoJ3BsYXknKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlbmRlZEhhbmRsZXIoKSB7XG4gICAgICAgIHBsYXllci5lbWl0KCdlbmRlZCcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVycm9ySGFuZGxlcigpIHtcbiAgICAgICAgcGxheWVyLmVtaXQoJ2Vycm9yJywgZWwuZXJyb3IpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRpbWV1cGRhdGVIYW5kbGVyKCkge1xuICAgICAgICBwbGF5ZXIuZW1pdCgndGltZXVwZGF0ZScsIGVsLmN1cnJlbnRUaW1lKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVFdmVudExpc3RlbmVycygpIHtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbG9hZGVkbWV0YWRhdGEnLCBtZXRhZGF0YUhhbmRsZXIpO1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjYW5wbGF5dGhyb3VnaCcsIGNhbnBsYXlIYW5kbGVyKTtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigncGxheScsIHBsYXlIYW5kbGVyKTtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigncGxheWluZycsIHBsYXlIYW5kbGVyKTtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignZXJyb3InLCBlcnJvckhhbmRsZXIpO1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdlbmRlZCcsIGVuZGVkSGFuZGxlcik7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RpbWV1cGRhdGUnLCB0aW1ldXBkYXRlSGFuZGxlcik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXJzKCk7XG5cbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVkbWV0YWRhdGEnLCBtZXRhZGF0YUhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2FucGxheXRocm91Z2gnLCBjYW5wbGF5SGFuZGxlciwgZmFsc2UpO1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdwbGF5JywgcGxheUhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigncGxheWluZycsIHBsYXlIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZXJyb3JIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2VuZGVkJywgZW5kZWRIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RpbWV1cGRhdGUnLCB0aW1ldXBkYXRlSGFuZGxlciwgZmFsc2UpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAgIHBsYXllci5vZmYoKTtcbiAgICAgICAgZWwucGF1c2UoKTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKCdzcmMnKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge31cblxuICAgICAgICByZW1vdmVFdmVudExpc3RlbmVycygpO1xuXG4gICAgICAgIGlmIChlbC5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICBlbC5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKGVsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVsID0gbnVsbDtcblxuICAgICAgICByZXR1cm4gcGxheWVyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEJsb2JVUkwodXJsKSB7XG4gICAgICAgIHVybCA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKHVybCk7XG4gICAgICAgIGZ1bmN0aW9uIHJldm9rZSgpIHtcbiAgICAgICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NhbnBsYXl0aHJvdWdoJywgcmV2b2tlKTtcbiAgICAgICAgICAgIHdpbmRvdy5VUkwucmV2b2tlT2JqZWN0VVJMKHVybCk7XG4gICAgICAgIH1cbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2FucGxheXRocm91Z2gnLCByZXZva2UpO1xuICAgICAgICByZXR1cm4gdXJsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvYWQodXJsKSB7XG4gICAgICAgIGlmICh3aW5kb3cuQmxvYiAmJiB1cmwgaW5zdGFuY2VvZiB3aW5kb3cuQmxvYikge1xuICAgICAgICAgICAgdXJsID0gZ2V0QmxvYlVSTCh1cmwpO1xuICAgICAgICB9XG4gICAgICAgIGFkZEV2ZW50TGlzdGVuZXJzKCk7XG5cbiAgICAgICAgZWwuY3Jvc3NPcmlnaW4gPSAnYW5vbnltb3VzJztcbiAgICAgICAgZWwucHJlbG9hZCA9ICdhdXRvJztcbiAgICAgICAgZWwuc3JjID0gdXJsO1xuICAgICAgICBlbC5sb2FkKCk7XG5cbiAgICAgICAgcmV0dXJuIHBsYXllcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGF5KCkge1xuICAgICAgICBlbC5wbGF5KCk7XG5cbiAgICAgICAgcmV0dXJuIHBsYXllcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXVzZSgpIHtcbiAgICAgICAgZWwucGF1c2UoKTtcblxuICAgICAgICByZXR1cm4gcGxheWVyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNlZWsodGltZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZWwuY3VycmVudFRpbWUgPSB0aW1lO1xuICAgICAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgICAgIHJldHVybiBwbGF5ZXI7XG4gICAgfVxuXG4gICAgYWRkRXZlbnRMaXN0ZW5lcnMoKTtcblxuICAgIHBsYXllciA9IE9iamVjdC5jcmVhdGUoZW1pdHRlci5wcm90b3R5cGUsIHtcbiAgICAgICAgX2V2ZW50czoge1xuICAgICAgICAgICAgdmFsdWU6IHt9XG4gICAgICAgIH0sXG4gICAgICAgIGRlc3Ryb3k6IHtcbiAgICAgICAgICAgIHZhbHVlOiBkZXN0cm95XG4gICAgICAgIH0sXG4gICAgICAgIGxvYWQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiBsb2FkXG4gICAgICAgIH0sXG4gICAgICAgIHBhdXNlOiB7XG4gICAgICAgICAgICB2YWx1ZTogcGF1c2VcbiAgICAgICAgfSxcbiAgICAgICAgcGxheToge1xuICAgICAgICAgICAgdmFsdWU6IHBsYXlcbiAgICAgICAgfSxcbiAgICAgICAgc2Vlazoge1xuICAgICAgICAgICAgdmFsdWU6IHNlZWtcbiAgICAgICAgfSxcbiAgICAgICAgZWw6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjdXJyZW50VGltZToge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZWwuY3VycmVudFRpbWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGVsLmN1cnJlbnRUaW1lID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGR1cmF0aW9uOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbC5kdXJhdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdm9sdW1lOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbC52b2x1bWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGVsLnZvbHVtZSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZShwbGF5ZXIpO1xufVxuIiwiaW1wb3J0IGVtaXR0ZXIgZnJvbSAnLi4vZXZlbnRzL2VtaXR0ZXInO1xuXG4vLyBodHRwczovL2RldmVsb3Blci52aW1lby5jb20vcGxheWVyL2pzLWFwaVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB2aW1lbyhlbCkge1xuICAgIGNvbnN0IHZpbWVvUGxheWVyID0gZWwuY29udGVudFdpbmRvdztcbiAgICBjb25zdCByZSA9IC9eaHR0cHM/OlxcL1xcL3BsYXllci52aW1lby5jb20vO1xuICAgIGxldCBwbGF5ZXIsIG9yaWdpbiA9ICcqJywgcGF1c2VkID0gZmFsc2U7XG5cbiAgICBmdW5jdGlvbiBzZW5kQ29tbWFuZChtZXRob2QsIHZhbHVlID0gJycpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgIG1ldGhvZFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgZGF0YS52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgICAgICB2aW1lb1BsYXllci5wb3N0TWVzc2FnZShtZXNzYWdlLCBvcmlnaW4pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBsYXkoKSB7XG4gICAgICAgIHBhdXNlZCA9IGZhbHNlO1xuICAgICAgICBzZW5kQ29tbWFuZCgncGxheScpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhdXNlKCkge1xuICAgICAgICBwYXVzZWQgPSB0cnVlO1xuICAgICAgICBzZW5kQ29tbWFuZCgncGF1c2UnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblJlYWR5KCkge1xuICAgICAgICBzZW5kQ29tbWFuZCgnYWRkRXZlbnRMaXN0ZW5lcicsICdwbGF5Jyk7XG4gICAgICAgIHNlbmRDb21tYW5kKCdhZGRFdmVudExpc3RlbmVyJywgJ3BhdXNlJyk7XG4gICAgICAgIHNlbmRDb21tYW5kKCdhZGRFdmVudExpc3RlbmVyJywgJ2ZpbmlzaCcpO1xuICAgICAgICBzZW5kQ29tbWFuZCgnYWRkRXZlbnRMaXN0ZW5lcicsICdwbGF5UHJvZ3Jlc3MnKTtcbiAgICAgICAgcGxheWVyLmVtaXQoJ3JlYWR5Jyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25QbGF5KCkge1xuICAgICAgICBwYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgcGxheWVyLmVtaXQoJ3BsYXknKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblBhdXNlKCkge1xuICAgICAgICBwYXVzZWQgPSB0cnVlO1xuICAgICAgICBwbGF5ZXIuZW1pdCgncGF1c2UnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkZpbmlzaCgpIHtcbiAgICAgICAgcGxheWVyLmVtaXQoJ2VuZGVkJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25QbGF5UHJvZ3Jlc3MoZGF0YSkge1xuICAgICAgICBwbGF5ZXIuZW1pdCgndGltZXVwZGF0ZScsIGRhdGEuc2Vjb25kcyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25NZXNzYWdlKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGlzVmltZW8gPSByZS50ZXN0KGV2ZW50Lm9yaWdpbik7XG5cbiAgICAgICAgaWYgKCFpc1ZpbWVvKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShldmVudC5kYXRhKTtcblxuICAgICAgICBpZiAoZGF0YS5wbGF5ZXJfaWQgJiYgZWwuaWQgIT09IGRhdGEucGxheWVyX2lkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3JpZ2luID09PSAnKicpIHtcbiAgICAgICAgICAgIG9yaWdpbiA9IGV2ZW50Lm9yaWdpbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoZGF0YS5ldmVudCkge1xuICAgICAgICAgICAgY2FzZSAncmVhZHknOlxuICAgICAgICAgICAgICAgIG9uUmVhZHkoZGF0YS5wbGF5ZXJfaWQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncGxheVByb2dyZXNzJzpcbiAgICAgICAgICAgICAgICBvblBsYXlQcm9ncmVzcyhkYXRhLmRhdGEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncGxheSc6XG4gICAgICAgICAgICAgICAgb25QbGF5KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdwYXVzZSc6XG4gICAgICAgICAgICAgICAgb25QYXVzZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZmluaXNoJzpcbiAgICAgICAgICAgICAgICBvbkZpbmlzaCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgb25NZXNzYWdlKTtcbiAgICB9XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIG9uTWVzc2FnZSk7XG5cbiAgICBwbGF5ZXIgPSBPYmplY3QuYXNzaWduKE9iamVjdC5jcmVhdGUoZW1pdHRlci5wcm90b3R5cGUpLCB7XG4gICAgICAgIF9ldmVudHM6IHt9LFxuICAgICAgICBwbGF5LFxuICAgICAgICBwYXVzZSxcbiAgICAgICAgcGF1c2VkOiAoKSA9PiBwYXVzZWQsXG4gICAgICAgIGRlc3Ryb3lcbiAgICB9KTtcblxuICAgIHJldHVybiBwbGF5ZXI7XG59XG4iLCIvLyBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS95b3V0dWJlL2lmcmFtZV9hcGlfcmVmZXJlbmNlI0V2ZW50c1xuaW1wb3J0IHtFdmVudEVtaXR0ZXJ9IGZyb20gJ2V2ZW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHlvdXR1YmUoZWwpIHtcbiAgICBsZXQgZW1pdHRlciA9IG51bGwsIHBsYXllciA9IG51bGwsIHBhdXNlZCA9IGZhbHNlO1xuXG4gICAgZnVuY3Rpb24gcGxheSgpIHtcbiAgICAgICAgcGF1c2VkID0gZmFsc2U7XG4gICAgICAgIHBsYXllci5wbGF5VmlkZW8oKTtcbiAgICAgICAgcmV0dXJuIGVtaXR0ZXI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGF1c2UoKSB7XG4gICAgICAgIHBhdXNlZCA9IHRydWU7XG4gICAgICAgIHBsYXllci5wYXVzZVZpZGVvKCk7XG4gICAgICAgIHJldHVybiBlbWl0dGVyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uUmVhZHkoKSB7XG4gICAgICAgIGVtaXR0ZXIuZW1pdCgncmVhZHknKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblN0YXRlQ2hhbmdlKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHtQbGF5ZXJTdGF0ZX0gPSB3aW5kb3cuWVQ7XG5cbiAgICAgICAgc3dpdGNoIChldmVudC5kYXRhKSB7XG4gICAgICAgICAgICBjYXNlIFBsYXllclN0YXRlLkNVRUQ6XG4gICAgICAgICAgICBjYXNlIFBsYXllclN0YXRlLkJVRkZFUklORzpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUGxheWVyU3RhdGUuUExBWUlORzpcbiAgICAgICAgICAgICAgICBwYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBlbWl0dGVyLmVtaXQoJ3BsYXknKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUGxheWVyU3RhdGUuUEFVU0VEOlxuICAgICAgICAgICAgICAgIHBhdXNlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgZW1pdHRlci5lbWl0KCdwYXVzZScpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBQbGF5ZXJTdGF0ZS5FTkRFRDpcbiAgICAgICAgICAgICAgICBlbWl0dGVyLmVtaXQoJ2VuZGVkJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OiBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlc3Ryb3koKSB7fVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlUGxheWVyKCkge1xuICAgICAgICBpZiAocGxheWVyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBwbGF5ZXIgPSBuZXcgd2luZG93LllULlBsYXllcihlbCwge1xuICAgICAgICAgICAgZXZlbnRzOiB7XG4gICAgICAgICAgICAgICAgb25SZWFkeSxcbiAgICAgICAgICAgICAgICBvblN0YXRlQ2hhbmdlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG5cbiAgICBpZiAod2luZG93LllUKSB7XG4gICAgICAgIGNyZWF0ZVBsYXllcigpO1xuICAgIH0gZWxzZSBpZiAod2luZG93Lnl0UGxheWVyQ2FsbHMpIHtcbiAgICAgICAgd2luZG93Lnl0UGxheWVyQ2FsbHMucHVzaChjcmVhdGVQbGF5ZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy55dFBsYXllckNhbGxzID0gW2NyZWF0ZVBsYXllcl07XG4gICAgICAgIHdpbmRvdy5vbllvdVR1YmVJZnJhbWVBUElSZWFkeSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgd2luZG93Lnl0UGxheWVyQ2FsbHMuZm9yRWFjaCgoY2FsbCkgPT4gY2FsbCgpKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgIHNjcmlwdC5zcmMgPSAnaHR0cHM6Ly93d3cueW91dHViZS5jb20vaWZyYW1lX2FwaSc7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICB9XG5cbiAgICBlbWl0dGVyID0gT2JqZWN0LmFzc2lnbihPYmplY3QuY3JlYXRlKEV2ZW50RW1pdHRlci5wcm90b3R5cGUpLCB7XG4gICAgICAgIF9ldmVudHM6IHt9LFxuICAgICAgICBwbGF5LFxuICAgICAgICBwYXVzZSxcbiAgICAgICAgcGF1c2VkOiAoKSA9PiBwYXVzZWQsXG4gICAgICAgIGRlc3Ryb3lcbiAgICB9KTtcblxuICAgIHJldHVybiBlbWl0dGVyO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24geW91dHViZUJhc2ljKGVsKSB7XG4gICAgY29uc3QgaWZyYW1lID0gZWwuY29udGVudFdpbmRvdztcblxuICAgIGZ1bmN0aW9uIHNlbmRDb21tYW5kKGNvbW1hbmQpIHtcbiAgICAgICAgaWZyYW1lLnBvc3RNZXNzYWdlKGB7XCJldmVudFwiOlwiY29tbWFuZFwiLFwiZnVuY1wiOlwiJHtjb21tYW5kfVwiLFwiYXJnc1wiOlwiXCJ9YCwgJyonKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGF5KCkge1xuICAgICAgICBzZW5kQ29tbWFuZCgncGxheVZpZGVvJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGF1c2UoKSB7XG4gICAgICAgIHNlbmRDb21tYW5kKCdwYXVzZVZpZGVvJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGxheSxcbiAgICAgICAgcGF1c2VcbiAgICB9O1xufVxuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgdGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG5FdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbihuKSB7XG4gIGlmICghaXNOdW1iZXIobikgfHwgbiA8IDAgfHwgaXNOYU4obikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCduIG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXInKTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBlciwgaGFuZGxlciwgbGVuLCBhcmdzLCBpLCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAodHlwZSA9PT0gJ2Vycm9yJykge1xuICAgIGlmICghdGhpcy5fZXZlbnRzLmVycm9yIHx8XG4gICAgICAgIChpc09iamVjdCh0aGlzLl9ldmVudHMuZXJyb3IpICYmICF0aGlzLl9ldmVudHMuZXJyb3IubGVuZ3RoKSkge1xuICAgICAgZXIgPSBhcmd1bWVudHNbMV07XG4gICAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICAgIH1cbiAgICAgIHRocm93IFR5cGVFcnJvcignVW5jYXVnaHQsIHVuc3BlY2lmaWVkIFwiZXJyb3JcIiBldmVudC4nKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc1VuZGVmaW5lZChoYW5kbGVyKSlcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKGlzRnVuY3Rpb24oaGFuZGxlcikpIHtcbiAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIC8vIGZhc3QgY2FzZXNcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vIHNsb3dlclxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgIGhhbmRsZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGhhbmRsZXIpKSB7XG4gICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgbGlzdGVuZXJzID0gaGFuZGxlci5zbGljZSgpO1xuICAgIGxlbiA9IGxpc3RlbmVycy5sZW5ndGg7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKVxuICAgICAgbGlzdGVuZXJzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIG07XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgaWYgKHRoaXMuX2V2ZW50cy5uZXdMaXN0ZW5lcilcbiAgICB0aGlzLmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgaXNGdW5jdGlvbihsaXN0ZW5lci5saXN0ZW5lcikgP1xuICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgZWxzZSBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuICBlbHNlXG4gICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gW3RoaXMuX2V2ZW50c1t0eXBlXSwgbGlzdGVuZXJdO1xuXG4gIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pICYmICF0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkKSB7XG4gICAgaWYgKCFpc1VuZGVmaW5lZCh0aGlzLl9tYXhMaXN0ZW5lcnMpKSB7XG4gICAgICBtID0gdGhpcy5fbWF4TGlzdGVuZXJzO1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gICAgfVxuXG4gICAgaWYgKG0gJiYgbSA+IDAgJiYgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCA+IG0pIHtcbiAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQgPSB0cnVlO1xuICAgICAgY29uc29sZS5lcnJvcignKG5vZGUpIHdhcm5pbmc6IHBvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgJyArXG4gICAgICAgICAgICAgICAgICAgICdsZWFrIGRldGVjdGVkLiAlZCBsaXN0ZW5lcnMgYWRkZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gaW5jcmVhc2UgbGltaXQuJyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCk7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUudHJhY2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gbm90IHN1cHBvcnRlZCBpbiBJRSAxMFxuICAgICAgICBjb25zb2xlLnRyYWNlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIHZhciBmaXJlZCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGcoKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBnKTtcblxuICAgIGlmICghZmlyZWQpIHtcbiAgICAgIGZpcmVkID0gdHJ1ZTtcbiAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgZy5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICB0aGlzLm9uKHR5cGUsIGcpO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gZW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWRcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbGlzdCwgcG9zaXRpb24sIGxlbmd0aCwgaTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXR1cm4gdGhpcztcblxuICBsaXN0ID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuICBsZW5ndGggPSBsaXN0Lmxlbmd0aDtcbiAgcG9zaXRpb24gPSAtMTtcblxuICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHxcbiAgICAgIChpc0Z1bmN0aW9uKGxpc3QubGlzdGVuZXIpICYmIGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG5cbiAgfSBlbHNlIGlmIChpc09iamVjdChsaXN0KSkge1xuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tID4gMDspIHtcbiAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fFxuICAgICAgICAgIChsaXN0W2ldLmxpc3RlbmVyICYmIGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgbGlzdC5sZW5ndGggPSAwO1xuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC5zcGxpY2UocG9zaXRpb24sIDEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGtleSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgaWYgKCF0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIGVsc2UgaWYgKHRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICBmb3IgKGtleSBpbiB0aGlzLl9ldmVudHMpIHtcbiAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICB9XG4gICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzRnVuY3Rpb24obGlzdGVuZXJzKSkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgfSBlbHNlIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAvLyBMSUZPIG9yZGVyXG4gICAgd2hpbGUgKGxpc3RlbmVycy5sZW5ndGgpXG4gICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tsaXN0ZW5lcnMubGVuZ3RoIC0gMV0pO1xuICB9XG4gIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIHJldDtcbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXQgPSBbXTtcbiAgZWxzZSBpZiAoaXNGdW5jdGlvbih0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIHJldCA9IFt0aGlzLl9ldmVudHNbdHlwZV1dO1xuICBlbHNlXG4gICAgcmV0ID0gdGhpcy5fZXZlbnRzW3R5cGVdLnNsaWNlKCk7XG4gIHJldHVybiByZXQ7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIGlmICh0aGlzLl9ldmVudHMpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICAgIGlmIChpc0Z1bmN0aW9uKGV2bGlzdGVuZXIpKVxuICAgICAgcmV0dXJuIDE7XG4gICAgZWxzZSBpZiAoZXZsaXN0ZW5lcilcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgfVxuICByZXR1cm4gMDtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xufTtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGlzTnVtYmVyKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ251bWJlcic7XG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xufVxuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gdm9pZCAwO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb2JqZWN0UG9vbChmYWN0b3J5Rm4pIHtcblxuICAgIGxldCBwb29sID0gW107XG4gICAgbGV0IG51bUNyZWF0ZWQgPSAwO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0UG9vbCAoKSB7XG4gICAgICAgICAgICByZXR1cm4gcG9vbDtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgIGlmICggcG9vbC5sZW5ndGggPiAwICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwb29sLnBvcCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBudW1DcmVhdGVkKys7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhY3RvcnlGbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBkaXNwb3NlIChpbnN0YW5jZSkge1xuICAgICAgICAgICAgcG9vbC5wdXNoKGluc3RhbmNlKTtcbiAgICAgICAgfSxcbiAgICAgICAgZmlsbCAoY291bnQpIHtcbiAgICAgICAgICAgIHdoaWxlICggcG9vbC5sZW5ndGggPCBjb3VudCApIHtcbiAgICAgICAgICAgICAgICBudW1DcmVhdGVkKys7XG4gICAgICAgICAgICAgICAgcG9vbFtwb29sLmxlbmd0aF0gPSBmYWN0b3J5Rm4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZW1wdHkgKCkge1xuICAgICAgICAgICAgcG9vbCA9IFtdO1xuICAgICAgICB9LFxuICAgICAgICBnZXROdW1DcmVhdGVkKCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bUNyZWF0ZWQ7XG4gICAgICAgIH1cbiAgICB9O1xufVxuIiwiaW1wb3J0IGFuZHJvaWQgZnJvbSAnLi4vb3MvYW5kcm9pZCc7XG5cbi8vaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xNDQwMzc2Ni9ob3ctdG8tZGV0ZWN0LXRoZS1zdG9jay1hbmRyb2lkLWJyb3dzZXJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFuZHJvaWROYXRpdmUodWEgPSBuYXZpZ2F0b3IudXNlckFnZW50KSB7XG4gICAgaWYgKCFhbmRyb2lkKHVhKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgaXNBbmRyb2lkTW9iaWxlID0gdWEuaW5kZXhPZignTW96aWxsYS81LjAnKSA+IC0xICYmIHVhLmluZGV4T2YoJ0FwcGxlV2ViS2l0JykgPiAtMTtcblxuICAgIGNvbnN0IHJlQXBwbGVXZWJLaXQgPSAvQXBwbGVXZWJLaXRcXC8oW1xcZC5dKykvO1xuICAgIGNvbnN0IHJlc3VsdEFwcGxlV2ViS2l0ID0gcmVBcHBsZVdlYktpdC5leGVjKHVhKTtcbiAgICBjb25zdCBhcHBsZVdlYktpdFZlcnNpb24gPSByZXN1bHRBcHBsZVdlYktpdCA/IHBhcnNlRmxvYXQocmVBcHBsZVdlYktpdC5leGVjKHVhKVsxXSkgOiBudWxsO1xuXG4gICAgY29uc3QgcmVDaHJvbWUgPSAvQ2hyb21lXFwvKFtcXGQuXSspLztcbiAgICBjb25zdCByZXN1bHRDaHJvbWUgPSByZUNocm9tZS5leGVjKHVhKTtcbiAgICBjb25zdCBjaHJvbWVWZXJzaW9uID0gcmVzdWx0Q2hyb21lID8gcGFyc2VGbG9hdChyZUNocm9tZS5leGVjKHVhKVsxXSkgOiBudWxsO1xuXG4gICAgcmV0dXJuIGlzQW5kcm9pZE1vYmlsZSAmJiAoYXBwbGVXZWJLaXRWZXJzaW9uICYmIGFwcGxlV2ViS2l0VmVyc2lvbiA8IDUzNykgfHwgKGNocm9tZVZlcnNpb24gJiYgY2hyb21lVmVyc2lvbiA8IDM3KTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGllVmVyc2lvbih1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQpIHtcbiAgICBsZXQgdiA9IDA7XG4gICAgaWYgKC9NU0lFIChcXGQrXFwuXFxkKyk7Ly50ZXN0KHVhKSkge1xuICAgICAgICB2ID0gcGFyc2VJbnQoUmVnRXhwLiQxLCAxMCk7XG4gICAgfSBlbHNlIGlmICgvVHJpZGVudFxcLyhcXGQrXFwuXFxkKykoLiopcnY6KFxcZCtcXC5cXGQrKS8udGVzdCh1YSkpIHtcbiAgICAgICAgdiA9IHBhcnNlSW50KFJlZ0V4cC4kMywgMTApO1xuICAgIH1cbiAgICByZXR1cm4gdjtcbn1cbiIsImltcG9ydCBvcyBmcm9tICcuLi9vcyc7XG5pbXBvcnQgaWVWZXJzaW9uIGZyb20gJy4vaWVWZXJzaW9uJztcbmltcG9ydCBhbmRyb2lkTmF0aXZlIGZyb20gJy4vYW5kcm9pZE5hdGl2ZSc7XG5cbmNvbnN0IHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcbmNvbnN0IGNocm9tZWlPUyA9ICgpID0+IG9zLmlvcygpICYmIC9DcmlPUy8udGVzdCh1YSk7XG5jb25zdCBmaXJlZm94ID0gKCkgPT4gL0ZpcmVmb3gvLnRlc3QodWEpO1xuY29uc3QgaWUgPSAoKSA9PiBpZVZlcnNpb24oKSA+IDA7XG5jb25zdCBzYWZhcmkgPSAoKSA9PiAhL0FuZHJvaWQvLnRlc3QodWEpICYmICEvQ2hyb21lLy50ZXN0KHVhKSAmJiAvU2FmYXJpLy50ZXN0KHVhKTtcbmNvbnN0IHNhZmFyaU1vYmlsZSA9ICgpID0+IG9zLmlvcygpICYmIC9BcHBsZVdlYktpdC8udGVzdCh1YSk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBhbmRyb2lkTmF0aXZlLFxuICAgIGNocm9tZWlPUyxcbiAgICBmaXJlZm94LFxuICAgIGllLFxuICAgIGllVmVyc2lvbixcbiAgICBzYWZhcmksXG4gICAgc2FmYXJpTW9iaWxlXG59O1xuIiwiY29uc3QgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xuXG5jb25zdCBpcGFkID0gKCkgPT4gL2lQYWQvaS50ZXN0KHVhKTtcbmNvbnN0IGlwb2QgPSAoKSA9PiAvaVBvZC9pLnRlc3QodWEpO1xuY29uc3QgaXBob25lID0gKCkgPT4gL2lQaG9uZS9pLnRlc3QodWEpO1xuY29uc3QgbW9iaWxlID0gKCkgPT4gISF1YS5tYXRjaCgvQW5kcm9pZHx3ZWJPU3xpUGhvbmV8aVBhZHxpUG9kfEJsYWNrQmVycnl8SUVNb2JpbGV8T3BlcmEgTWluaXxXaW5kb3dzIFBob25lfFN5bWJpYW5PUy9pKTtcbmNvbnN0IGRlc2t0b3AgPSAoKSA9PiAhbW9iaWxlKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBkZXNrdG9wLFxuICAgIGlwYWQsXG4gICAgaXBob25lLFxuICAgIGlwb2QsXG4gICAgbW9iaWxlXG59O1xuIiwiaW1wb3J0IGJyb3dzZXIgZnJvbSAnLi9icm93c2VyJztcbmltcG9ydCBkZXZpY2UgZnJvbSAnLi9kZXZpY2UnO1xuaW1wb3J0IG9zIGZyb20gJy4vb3MnO1xuaW1wb3J0IHN1cHBvcnRzIGZyb20gJy4vc3VwcG9ydHMnO1xuaW1wb3J0IHNjcmVlbiBmcm9tICcuL3NjcmVlbic7XG5cbmNvbnN0IGxvY2FsID0gL14oPzpodHRwcz86XFwvXFwvKT8oPzpsb2NhbGhvc3R8MTkyXFwuMTY4KS8udGVzdCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBicm93c2VyLFxuICAgIGRldmljZSxcbiAgICBvcyxcbiAgICBzdXBwb3J0cyxcbiAgICBzY3JlZW4sXG4gICAgbG9jYWxcbn07XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbih1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQpIHtcbiAgICByZXR1cm4gL0FuZHJvaWQvaS50ZXN0KHVhKTtcbn1cbiIsImltcG9ydCBhbmRyb2lkIGZyb20gJy4vYW5kcm9pZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFuZHJvaWRWZXJzaW9uKHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudCkge1xuICAgIGlmICghYW5kcm9pZCh1YSkpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIGNvbnN0IHZlcnNpb24gPSB1YS5tYXRjaCgvQW5kcm9pZCAoXFxkKyg/OlxcLlxcZCspKyk7LylbMV07XG4gICAgY29uc3QgW2EsIGJdID0gdmVyc2lvbi5zcGxpdCgnLicpO1xuICAgIHJldHVybiBwYXJzZUZsb2F0KGAke2F9LiR7Yn1gKTtcbn1cbiIsImltcG9ydCBhbmRyb2lkIGZyb20gJy4vYW5kcm9pZCc7XG5pbXBvcnQgYW5kcm9pZFZlcnNpb24gZnJvbSAnLi9hbmRyb2lkVmVyc2lvbic7XG5pbXBvcnQgaW9zIGZyb20gJy4vaW9zJztcbmltcG9ydCBpb3NWZXJzaW9uIGZyb20gJy4vaW9zVmVyc2lvbic7XG5pbXBvcnQgbGludXggZnJvbSAnLi9saW51eCc7XG5pbXBvcnQgbWFjIGZyb20gJy4vbWFjJztcbmltcG9ydCB3aW5kb3dzIGZyb20gJy4vd2luZG93cyc7XG5pbXBvcnQgd2luZG93c1Bob25lIGZyb20gJy4vd2luZG93c1Bob25lJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGFuZHJvaWQsXG4gICAgYW5kcm9pZFZlcnNpb24sXG4gICAgaW9zLFxuICAgIGlvc1ZlcnNpb24sXG4gICAgbGludXgsXG4gICAgbWFjLFxuICAgIHdpbmRvd3MsXG4gICAgd2luZG93c1Bob25lXG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW9zKHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudCkge1xuICAgIHJldHVybiAvaVBbYW9dZHxpUGhvbmUvaS50ZXN0KHVhKTtcbn1cbiIsImltcG9ydCBpb3MgZnJvbSAnLi9pb3MnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpb3NWZXJzaW9uKHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudCkge1xuICAgIGlmIChpb3ModWEpKSB7XG4gICAgICAgIGNvbnN0IFssIGIsIGNdID0gdWEubWF0Y2goL09TIChcXGQrKV8oXFxkKykvaSk7XG4gICAgICAgIGlmIChiICYmIGMpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0KGAke2J9LiR7Y31gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gMDtcbn1cbiIsImltcG9ydCBhbmRyb2lkIGZyb20gJy4vYW5kcm9pZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxpbnV4KHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudCkge1xuICAgIHJldHVybiAhYW5kcm9pZCh1YSkgJiYgL0xpbnV4Ly50ZXN0KHVhKTtcbn1cbiIsImltcG9ydCBpb3MgZnJvbSAnLi9pb3MnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYWModWEgPSBuYXZpZ2F0b3IudXNlckFnZW50KSB7XG4gICAgcmV0dXJuICFpb3ModWEpICYmIC9NYWMgT1MvLnRlc3QodWEpO1xufVxuIiwiaW1wb3J0IHdpbmRvd3NQaG9uZSBmcm9tICcuL3dpbmRvd3NQaG9uZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdpbmRvd3ModWEgPSBuYXZpZ2F0b3IudXNlckFnZW50KSB7XG4gICAgcmV0dXJuICF3aW5kb3dzUGhvbmUodWEpICYmIC9XaW5kb3dzLy50ZXN0KHVhKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdpbmRvd3NQaG9uZSh1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQpIHtcbiAgICByZXR1cm4gL1dpbmRvd3MgUGhvbmUvaS50ZXN0KHVhKTtcbn1cbiIsIi8vIHNjcmVlbi53aWR0aCAvIHNjcmVlbi5oZWlnaHQgaXMgb2Z0ZW4gd3JvbmcgaW4gQW5kcm9pZFxuY29uc3QgaGVpZ2h0ID0gKCkgPT4gTWF0aC5tYXgod2luZG93Lm91dGVySGVpZ2h0LCB3aW5kb3cuc2NyZWVuLmhlaWdodCk7XG5jb25zdCB3aWR0aCA9ICgpID0+IE1hdGgubWF4KHdpbmRvdy5vdXRlcldpZHRoLCB3aW5kb3cuc2NyZWVuLndpZHRoKTtcbmNvbnN0IGRwciA9ICgpID0+IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDE7XG5jb25zdCByZXRpbmEgPSAoKSA9PiBkcHIoKSA+IDE7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICB3aWR0aCxcbiAgICBoZWlnaHQsXG4gICAgZHByLFxuICAgIHJldGluYVxufTtcbiIsImV4cG9ydCBkZWZhdWx0ICgpID0+ICEhd2luZG93LkRldmljZU9yaWVudGF0aW9uRXZlbnQ7XG4iLCJpbXBvcnQgd2ViZ2wgZnJvbSAnLi93ZWJnbCc7XG5pbXBvcnQgd2VibSBmcm9tICcuL3dlYm0nO1xuaW1wb3J0IG1wNCBmcm9tICcuL21wNCc7XG5pbXBvcnQgZGV2aWNlT3JpZW50YXRpb24gZnJvbSAnLi9kZXZpY2VPcmllbnRhdGlvbic7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICB3ZWJnbCxcbiAgICB3ZWJtLFxuICAgIG1wNCxcbiAgICBkZXZpY2VPcmllbnRhdGlvblxufTtcbiIsImNvbnN0IHZpZGVvRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xuZXhwb3J0IGRlZmF1bHQgKCkgPT4gISEodmlkZW9FbC5jYW5QbGF5VHlwZSAmJiB2aWRlb0VsLmNhblBsYXlUeXBlKCd2aWRlby9tcDQ7IGNvZGVjcz1cImF2YzEuNDJFMDFFLCBtcDRhLjQwLjJcIicpKTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdlYmdsKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJ3dlYmdsJykgfHwgY2FudmFzLmdldENvbnRleHQoJ2V4cGVyaW1lbnRhbC13ZWJnbCcpO1xuICAgICAgICByZXR1cm4gISEod2luZG93LldlYkdMUmVuZGVyaW5nQ29udGV4dCAmJiBjb250ZXh0KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG4iLCJjb25zdCB2aWRlb0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcbmV4cG9ydCBkZWZhdWx0ICgpID0+ICEhKHZpZGVvRWwuY2FuUGxheVR5cGUgJiYgdmlkZW9FbC5jYW5QbGF5VHlwZSgndmlkZW8vd2VibTsgY29kZWNzPVwidnA4LCB2b3JiaXNcIicpKTtcbiIsIi8qXG4gKiBjbGFzc0xpc3QgKHBhcnRpYWwgcG9seWZpbGwgZm9yIElFIDEwLCBJRSAxMSBhbmQgRmlyZWZveCA8MjQpXG4gKiBhZGFwdGVkIGZyb206IGh0dHBzOi8vZ2l0aHViLmNvbS9lbGlncmV5L2NsYXNzTGlzdC5qcy9ibG9iL21hc3Rlci9jbGFzc0xpc3QuanNcbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICBsZXQgdGVzdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdfJyk7XG5cbiAgICB0ZXN0RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdjMScsICdjMicpO1xuXG4gICAgLy8gUG9seWZpbGwgZm9yIElFIDEwLzExIGFuZCBGaXJlZm94IDwyNiwgd2hlcmUgY2xhc3NMaXN0LmFkZCBhbmRcbiAgICAvLyBjbGFzc0xpc3QucmVtb3ZlIGV4aXN0IGJ1dCBzdXBwb3J0IG9ubHkgb25lIGFyZ3VtZW50IGF0IGEgdGltZS5cbiAgICBpZiAoIXRlc3RFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnYzInKSkge1xuICAgICAgICBmdW5jdGlvbiBjcmVhdGVNZXRob2QobWV0aG9kKSB7XG4gICAgICAgICAgICBjb25zdCBvcmlnaW5hbCA9IHdpbmRvdy5ET01Ub2tlbkxpc3QucHJvdG90eXBlW21ldGhvZF07XG5cbiAgICAgICAgICAgIHdpbmRvdy5ET01Ub2tlbkxpc3QucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih0b2tlbikge1xuICAgICAgICAgICAgICAgIGxldCBpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsLmNhbGwodGhpcywgdG9rZW4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgY3JlYXRlTWV0aG9kKCdhZGQnKTtcbiAgICAgICAgY3JlYXRlTWV0aG9kKCdyZW1vdmUnKTtcbiAgICB9XG5cbiAgICB0ZXN0RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdjMycsIGZhbHNlKTtcblxuICAgIC8vIFBvbHlmaWxsIGZvciBJRSAxMCwgSUUgMTEgYW5kIEZpcmVmb3ggPDI0LCB3aGVyZSBjbGFzc0xpc3QudG9nZ2xlIGRvZXMgbm90XG4gICAgLy8gc3VwcG9ydCB0aGUgc2Vjb25kIGFyZ3VtZW50LlxuICAgIGlmICh0ZXN0RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2MzJykpIHtcbiAgICAgICAgY29uc3QgdG9nZ2xlID0gd2luZG93LkRPTVRva2VuTGlzdC5wcm90b3R5cGUudG9nZ2xlO1xuXG4gICAgICAgIHdpbmRvdy5ET01Ub2tlbkxpc3QucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uKHRva2VuLCBmb3JjZSkge1xuICAgICAgICAgICAgZm9yY2UgPSAhIWZvcmNlO1xuICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIHRoaXMuY29udGFpbnModG9rZW4pID09PSBmb3JjZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3JjZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRvZ2dsZS5jYWxsKHRoaXMsIHRva2VuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICB0ZXN0RWxlbWVudCA9IG51bGw7XG59KCkpO1xuIiwiKGZ1bmN0aW9uKGZuKSB7XG4gICAgd2luZG93LmNvbnNvbGUgPSB3aW5kb3cuY29uc29sZSB8fCB7fTtcbiAgICBjb25zdCBtZXRob2RzID0gW1xuICAgICAgICAnYXNzZXJ0JyxcbiAgICAgICAgJ2NsZWFyJyxcbiAgICAgICAgJ2NvdW50JyxcbiAgICAgICAgJ2RlYnVnJyxcbiAgICAgICAgJ2RpcicsXG4gICAgICAgICdkaXJ4bWwnLFxuICAgICAgICAnZXJyb3InLFxuICAgICAgICAnZ3JvdXAnLFxuICAgICAgICAnZ3JvdXBDb2xsYXBzZWQnLFxuICAgICAgICAnZ3JvdXBFbmQnLFxuICAgICAgICAnaW5mbycsXG4gICAgICAgICdsb2cnLFxuICAgICAgICAnbWFya1RpbWVsaW5lJyxcbiAgICAgICAgJ21lbW9yeScsXG4gICAgICAgICdwcm9maWxlJyxcbiAgICAgICAgJ3Byb2ZpbGVFbmQnLFxuICAgICAgICAndGFibGUnLFxuICAgICAgICAndGltZScsXG4gICAgICAgICd0aW1lRW5kJyxcbiAgICAgICAgJ3RpbWVTdGFtcCcsXG4gICAgICAgICd0aW1lbGluZScsXG4gICAgICAgICd0aW1lbGluZUVuZCcsXG4gICAgICAgICd0cmFjZScsXG4gICAgICAgICd3YXJuJ1xuICAgIF07XG4gICAgbWV0aG9kcy5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgICAgIHdpbmRvdy5jb25zb2xlW25hbWVdID0gd2luZG93LmNvbnNvbGVbbmFtZV0gfHwgZm47XG4gICAgfSk7XG59KGZ1bmN0aW9uKCkge30pKTtcbiIsImltcG9ydCAnLi9jbGFzc0xpc3QnO1xuaW1wb3J0ICcuL2NvbnNvbGUnO1xuaW1wb3J0ICcuL3JlcXVlc3RBbmltYXRpb25GcmFtZSc7XG4iLCIvKlxuICogcmVxdWVzdEFuaW1hdGlvbkZyYW1lIChpb3M2IGFuZCBhbmRyb2lkIDwgNC40KVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgICBpZiAoIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpIHtcbiAgICAgICAgY29uc3QgdmVuZG9ycyA9IFsnbXMnLCAnbW96JywgJ3dlYmtpdCcsICdvJ107XG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdmVuZG9ycy5sZW5ndGggJiYgIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7ICsreCkge1xuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvd1t2ZW5kb3JzW3hdICsgJ1JlcXVlc3RBbmltYXRpb25GcmFtZSddO1xuICAgICAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gd2luZG93W3ZlbmRvcnNbeF0gKyAnQ2FuY2VsQW5pbWF0aW9uRnJhbWUnXSB8fCB3aW5kb3dbdmVuZG9yc1t4XSArXG4gICAgICAgICAgICAgICAgJ0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSddO1xuICAgICAgICB9XG4gICAgfVxufSgpKTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBvcHVwKHVybCwgd2lkdGggPSA4MDAsIGhlaWdodCA9IDYwMCwgbmFtZSA9ICcnKSB7XG4gICAgY29uc3QgbGVmdCA9ICh3aW5kb3cuc2NyZWVuLndpZHRoIC0gd2lkdGgpIC8gMjtcbiAgICBjb25zdCB0b3AgPSAod2luZG93LnNjcmVlbi5oZWlnaHQgLSBoZWlnaHQpIC8gMjtcbiAgICAvLyBjb25zdCBsZWZ0ID0gKHdpbmRvdy5zY3JlZW4uYXZhaWxXaWR0aCAtIHdpZHRoKSAvIDI7XG4gICAgLy8gY29uc3QgdG9wID0gKHdpbmRvdy5zY3JlZW4uYXZhaWxIZWlnaHQgLSBoZWlnaHQpIC8gMjtcbiAgICBjb25zdCBkZWZhdWx0cyA9ICdkaXJlY3Rvcmllcz1ubyxsb2NhdGlvbj1ubyxtZW51YmFyPW5vLHJlc2l6YWJsZT1ubyxzY3JvbGxiYXJzPW5vLHN0YXR1cz1ubyx0b29sYmFyPW5vJztcbiAgICBjb25zdCBwYXJhbXMgPSBgd2lkdGg9JHt3aWR0aH0saGVpZ2h0PSR7aGVpZ2h0fSx0b3A9JHt0b3B9LGxlZnQ9JHtsZWZ0fSwke2RlZmF1bHRzfWA7XG4gICAgY29uc3Qgd2luID0gd2luZG93Lm9wZW4odXJsLCBuYW1lLCBwYXJhbXMpO1xuICAgIGlmICh3aW4gPT09IG51bGwgfHwgdHlwZW9mIHdpbiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAod2luZG93LmZvY3VzKSB7XG4gICAgICAgIHdpbi5mb2N1cygpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cbiIsImltcG9ydCBwb3B1cCBmcm9tICcuLi9wb3B1cCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGVtYWlsKHVybCwgc3ViamVjdCA9ICcnLCBib2R5ID0gJycpIHtcbiAgICB1cmwgPSBlbmNvZGVVUklDb21wb25lbnQodXJsKTtcbiAgICBzdWJqZWN0ID0gZW5jb2RlVVJJQ29tcG9uZW50KHN1YmplY3QpO1xuXG4gICAgY29uc3QgbmV3bGluZXMgPSBlbmNvZGVVUklDb21wb25lbnQoJ1xcclxcblxcclxcbicpO1xuICAgIGJvZHkgPSBib2R5ID8gYCR7ZW5jb2RlVVJJQ29tcG9uZW50KGJvZHkpfSR7bmV3bGluZXN9YCA6ICcnO1xuXG4gICAgcmV0dXJuIHBvcHVwKGBtYWlsdG86P3N1YmplY3Q9JHtzdWJqZWN0fSZib2R5PSR7Ym9keX0ke3VybH1gKTtcbn1cbiIsImltcG9ydCBwb3B1cCBmcm9tICcuLi9wb3B1cCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZhY2Vib29rKHVybCkge1xuICAgIHVybCA9IGVuY29kZVVSSUNvbXBvbmVudCh1cmwpO1xuICAgIHJldHVybiBwb3B1cChgaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL3NoYXJlci9zaGFyZXIucGhwP3U9JHt1cmx9YCk7XG59XG4iLCJpbXBvcnQgcG9wdXAgZnJvbSAnLi4vcG9wdXAnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmYWNlYm9va0ZlZWREaWFsb2coYXBwSWQsIHJlZGlyZWN0LCB1cmwsIHRpdGxlID0gJycsIGltYWdlID0gJycsIGNhcHRpb24gPSAnJywgZGVzYyA9ICcnLCBzb3VyY2UgPSAnJykge1xuICAgIHRpdGxlID0gZW5jb2RlVVJJQ29tcG9uZW50KHRpdGxlKTtcbiAgICBjYXB0aW9uID0gZW5jb2RlVVJJQ29tcG9uZW50KGNhcHRpb24pO1xuICAgIGRlc2MgPSBlbmNvZGVVUklDb21wb25lbnQoZGVzYyk7XG5cbiAgICBjb25zdCBwYXJhbXMgPSBgP2Rpc3BsYXk9cG9wdXAmc2hvd19lcnJvcj10cnVlJmFwcF9pZD0ke2FwcElkfSZzb3VyY2U9JHtzb3VyY2V9JnJlZGlyZWN0X3VyaT0ke3JlZGlyZWN0fWA7XG4gICAgY29uc3QgY29udGVudCA9IGBuYW1lPSR7dGl0bGV9Jmxpbms9JHt1cmx9JmNhcHRpb249JHtjYXB0aW9ufSZkZXNjcmlwdGlvbj0ke2Rlc2N9JnBpY3R1cmU9JHtpbWFnZX1gO1xuXG4gICAgcmV0dXJuIHBvcHVwKGBodHRwczovL3d3dy5mYWNlYm9vay5jb20vZGlhbG9nL2ZlZWQ/JHtwYXJhbXN9JiR7Y29udGVudH1gKTtcbn1cbiIsImltcG9ydCBwb3B1cCBmcm9tICcuLi9wb3B1cCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdvb2dsZXBsdXModXJsKSB7XG4gICAgdXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KHVybCk7XG4gICAgcmV0dXJuIHBvcHVwKGBodHRwczovL3BsdXMuZ29vZ2xlLmNvbS9zaGFyZT91cmw9JHt1cmx9YCk7XG59XG4iLCJpbXBvcnQgZW1haWwgZnJvbSAnLi9lbWFpbCc7XG5pbXBvcnQgZmFjZWJvb2sgZnJvbSAnLi9mYWNlYm9vayc7XG5pbXBvcnQgZmFjZWJvb2tGZWVkRGlhbG9nIGZyb20gJy4vZmFjZWJvb2tGZWVkRGlhbG9nJztcbmltcG9ydCBnb29nbGVwbHVzIGZyb20gJy4vZ29vZ2xlcGx1cyc7XG5pbXBvcnQgbGlua2VkaW4gZnJvbSAnLi9saW5rZWRpbic7XG5pbXBvcnQgcGludGVyZXN0IGZyb20gJy4vcGludGVyZXN0JztcbmltcG9ydCByZWRkaXQgZnJvbSAnLi9yZWRkaXQnO1xuaW1wb3J0IHJlbnJlbiBmcm9tICcuL3JlbnJlbic7XG5pbXBvcnQgc21zIGZyb20gJy4vc21zJztcbmltcG9ydCB0d2l0dGVyIGZyb20gJy4vdHdpdHRlcic7XG5pbXBvcnQgdmtvbnRha3RlIGZyb20gJy4vdmtvbnRha3RlJztcbmltcG9ydCB3ZWlibyBmcm9tICcuL3dlaWJvJztcbmltcG9ydCB3aGF0c2FwcCBmcm9tICcuL3doYXRzYXBwJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGVtYWlsLFxuICAgIGZhY2Vib29rLFxuICAgIGZhY2Vib29rRmVlZERpYWxvZyxcbiAgICBnb29nbGVwbHVzLFxuICAgIGxpbmtlZGluLFxuICAgIHBpbnRlcmVzdCxcbiAgICByZWRkaXQsXG4gICAgcmVucmVuLFxuICAgIHNtcyxcbiAgICB0d2l0dGVyLFxuICAgIHZrb250YWt0ZSxcbiAgICB3ZWlibyxcbiAgICB3aGF0c2FwcFxufTtcbiIsImltcG9ydCBwb3B1cCBmcm9tICcuLi9wb3B1cCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxpbmtlZGluKHVybCwgdGl0bGUgPSAnJykge1xuICAgIHVybCA9IGVuY29kZVVSSUNvbXBvbmVudCh1cmwpO1xuICAgIHRpdGxlID0gZW5jb2RlVVJJQ29tcG9uZW50KHRpdGxlKTtcbiAgICByZXR1cm4gcG9wdXAoYGh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9zaGFyZUFydGljbGU/bWluaT10cnVlJnVybD0ke3VybH0mdGl0bGU9JHt0aXRsZX1gKTtcbn1cbiIsImltcG9ydCBwb3B1cCBmcm9tICcuLi9wb3B1cCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBpbnRlcmVzdCh1cmwsIG1lZGlhLCBkZXNjID0gJycpIHtcbiAgICB1cmwgPSBlbmNvZGVVUklDb21wb25lbnQodXJsKTtcbiAgICBtZWRpYSA9IGVuY29kZVVSSUNvbXBvbmVudChtZWRpYSk7XG4gICAgZGVzYyA9IGVuY29kZVVSSUNvbXBvbmVudChkZXNjKTtcbiAgICByZXR1cm4gcG9wdXAoYGh0dHBzOi8vcGludGVyZXN0LmNvbS9waW4vY3JlYXRlL2J1dHRvbi8/dXJsPSR7dXJsfSZtZWRpYT0ke21lZGlhfSZkZXNjcmlwdGlvbj0ke2Rlc2N9YCk7XG59XG4iLCJpbXBvcnQgcG9wdXAgZnJvbSAnLi4vcG9wdXAnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZWRkaXQodXJsLCB0aXRsZSA9ICcnKSB7XG4gICAgdXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KHVybCk7XG4gICAgdGl0bGUgPSBlbmNvZGVVUklDb21wb25lbnQodGl0bGUpO1xuICAgIHJldHVybiBwb3B1cChgaHR0cHM6Ly93d3cucmVkZGl0LmNvbS9zdWJtaXQ/dXJsPSR7dXJsfSZ0aXRsZT0ke3RpdGxlfWApO1xufVxuIiwiaW1wb3J0IHBvcHVwIGZyb20gJy4uL3BvcHVwJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdmtvbnRha3RlKHVybCwgdGl0bGUgPSAnJykge1xuICAgIHVybCA9IGVuY29kZVVSSUNvbXBvbmVudCh1cmwpO1xuICAgIHRpdGxlID0gZW5jb2RlVVJJQ29tcG9uZW50KHRpdGxlKTtcbiAgICByZXR1cm4gcG9wdXAoYGh0dHA6Ly9zaGFyZS5yZW5yZW4uY29tL3NoYXJlL2J1dHRvbnNoYXJlLmRvP2xpbms9JHt1cmx9JnRpdGxlPSR7dGl0bGV9YCk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzbXModXJsLCBib2R5ID0gJycpIHtcbiAgICB1cmwgPSBlbmNvZGVVUklDb21wb25lbnQodXJsKTtcblxuICAgIGNvbnN0IG5ld2xpbmVzID0gZW5jb2RlVVJJQ29tcG9uZW50KCdcXHJcXG5cXHJcXG4nKTtcbiAgICBib2R5ID0gYm9keSA/IGAke2VuY29kZVVSSUNvbXBvbmVudChib2R5KX0ke25ld2xpbmVzfWAgOiAnJztcblxuICAgIGNvbnN0IGlvcyA9IC9pUFthb11kfGlQaG9uZS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgY29uc3QgZGVsaW0gPSBpb3MgPyAnJicgOiAnPyc7XG5cbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGBzbXM6JHtkZWxpbX1ib2R5PSR7Ym9keX0ke3VybH1gO1xufVxuIiwiaW1wb3J0IHBvcHVwIGZyb20gJy4uL3BvcHVwJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdHdpdHRlcih1cmwsIHRleHQgPSAnJywgaGFzaHRhZ3MgPSAnJywgcmVsYXRlZCA9ICcnKSB7XG4gICAgdXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KHVybCk7XG4gICAgdGV4dCA9IGVuY29kZVVSSUNvbXBvbmVudCh0ZXh0KTtcbiAgICBoYXNodGFncyA9IGVuY29kZVVSSUNvbXBvbmVudChoYXNodGFncyk7XG4gICAgcmVsYXRlZCA9IGVuY29kZVVSSUNvbXBvbmVudChyZWxhdGVkKTtcblxuICAgIHJldHVybiBwb3B1cChgaHR0cHM6Ly90d2l0dGVyLmNvbS9pbnRlbnQvdHdlZXQ/dXJsPSR7dXJsfSZ0ZXh0PSR7dGV4dH0maGFzaHRhZ3M9JHtoYXNodGFnc30mcmVsYXRlZD0ke3JlbGF0ZWR9YCk7XG59XG4iLCJpbXBvcnQgcG9wdXAgZnJvbSAnLi4vcG9wdXAnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB2a29udGFrdGUodXJsLCB0aXRsZSA9ICcnLCBkZXNjcmlwdGlvbiA9ICcnLCBpbWFnZSA9ICcnKSB7XG4gICAgdXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KHVybCk7XG4gICAgdGl0bGUgPSBlbmNvZGVVUklDb21wb25lbnQodGl0bGUpO1xuICAgIGRlc2NyaXB0aW9uID0gZW5jb2RlVVJJQ29tcG9uZW50KGRlc2NyaXB0aW9uKTtcbiAgICBpbWFnZSA9IGVuY29kZVVSSUNvbXBvbmVudChpbWFnZSk7XG4gICAgcmV0dXJuIHBvcHVwKGBodHRwOi8vdmtvbnRha3RlLnJ1L3NoYXJlLnBocD91cmw9JHt1cmx9JnRpdGxlPSR7dGl0bGV9JmRlc2NyaXB0aW9uPSR7ZGVzY3JpcHRpb259JmltYWdlPSR7aW1hZ2V9YCk7XG59XG4iLCJpbXBvcnQgcG9wdXAgZnJvbSAnLi4vcG9wdXAnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB3ZWlibyh1cmwsIHRpdGxlID0gJycsIGltYWdlID0gJycpIHtcbiAgICB1cmwgPSBlbmNvZGVVUklDb21wb25lbnQodXJsKTtcbiAgICB0aXRsZSA9IGVuY29kZVVSSUNvbXBvbmVudCh0aXRsZSk7XG4gICAgaW1hZ2UgPSBlbmNvZGVVUklDb21wb25lbnQoaW1hZ2UpO1xuXG4gICAgY29uc3QgcGFyYW1zID0gYHVybD0ke3VybH0mYXBwa2V5PSZ0aXRsZT0ke3RpdGxlfSZwaWM9JHtpbWFnZX0mcmFsYXRlVWlkPSZsYW5ndWFnZT16aF9jbmA7XG4gICAgcmV0dXJuIHBvcHVwKGBodHRwOi8vc2VydmljZS53ZWliby5jb20vc2hhcmUvc2hhcmUucGhwPyR7cGFyYW1zfWApO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gd2hhdHNhcHAodXJsLCBib2R5ID0gJycpIHtcbiAgICB1cmwgPSBlbmNvZGVVUklDb21wb25lbnQodXJsKTtcblxuICAgIGNvbnN0IG5ld2xpbmVzID0gZW5jb2RlVVJJQ29tcG9uZW50KCdcXHJcXG5cXHJcXG4nKTtcbiAgICBib2R5ID0gYm9keSA/IGAke2VuY29kZVVSSUNvbXBvbmVudChib2R5KX0ke25ld2xpbmVzfWAgOiAnJztcblxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYHdoYXRzYXBwOi8vc2VuZD90ZXh0PSR7Ym9keX0ke3VybH1gO1xufVxuIiwiZnVuY3Rpb24gbG9hZChrZXkpIHtcbiAgICBsZXQgaXRlbSA9IG51bGw7XG5cbiAgICB0cnkge1xuICAgICAgICBpdGVtID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgICB9IGNhdGNoIChlcnIpIHt9XG5cbiAgICByZXR1cm4gaXRlbTtcbn1cblxuZnVuY3Rpb24gc2F2ZShrZXksIGl0ZW0pIHtcbiAgICB0cnkge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIGl0ZW0pO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignQ291bGRuXFwndCBzYXZlIGluIGxvY2FsU3RvcmFnZScpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gbG9hZEpTT04oa2V5KSB7XG4gICAgY29uc3QgaXRlbSA9IGxvYWQoa2V5KTtcbiAgICByZXR1cm4gaXRlbSA/IEpTT04ucGFyc2UoaXRlbSkgOiBudWxsO1xufVxuXG5mdW5jdGlvbiBzYXZlSlNPTihrZXksIGl0ZW0pIHtcbiAgICByZXR1cm4gc2F2ZShrZXksIEpTT04uc3RyaW5naWZ5KGl0ZW0pKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlKGtleSkge1xuICAgIHRyeSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCB7bG9hZCwgc2F2ZSwgbG9hZEpTT04sIHNhdmVKU09OLCByZW1vdmV9O1xuIiwiLy8gZXZlcnl0aGluZyBhZnRlciB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiBzdWJzdHIgaW4gc3RyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhZnRlckZpcnN0KHN0ciwgc3Vic3RyKSB7XG4gICAgbGV0IGluZGV4ID0gc3RyLmluZGV4T2Yoc3Vic3RyKTtcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgaW5kZXggKz0gc3Vic3RyLmxlbmd0aDtcbiAgICByZXR1cm4gc3RyLnNsaWNlKGluZGV4KTtcbn1cbiIsIi8vIGV2ZXJ5dGhpbmcgYWZ0ZXIgdGhlIGxhc3Qgb2NjdXJlbmNlIG9mIHN1YnN0ciBpbiBzdHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFmdGVyTGFzdChzdHIsIHN1YnN0cikge1xuICAgIGxldCBpbmRleCA9IHN0ci5sYXN0SW5kZXhPZihzdWJzdHIpO1xuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBpbmRleCArPSBzdWJzdHIubGVuZ3RoO1xuICAgIHJldHVybiBzdHIuc2xpY2UoaW5kZXgpO1xufVxuIiwiLy8gZXZlcnl0aGluZyBiZWZvcmUgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2Ygc3Vic3RyIGluIHN0clxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmVmb3JlRmlyc3Qoc3RyLCBzdWJzdHIpIHtcbiAgICBjb25zdCBpbmRleCA9IHN0ci5pbmRleE9mKHN1YnN0cik7XG4gICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHJldHVybiBzdHIuc2xpY2UoMCwgaW5kZXgpO1xufVxuIiwiLy8gZXZlcnl0aGluZyBiZWZvcmUgdGhlIGxhc3Qgb2NjdXJyZW5jZSBvZiBzdWJzdHIgaW4gdGhlIHN0cmluZy5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJlZm9yZUxhc3Qoc3RyLCBzdWJzdHIpIHtcbiAgICBjb25zdCBpbmRleCA9IHN0ci5sYXN0SW5kZXhPZihzdWJzdHIpO1xuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICByZXR1cm4gc3RyLnNsaWNlKDAsIGluZGV4KTtcbn1cbiIsIi8vIHdoZXRoZXIgc3RyIGJlZ2lucyB3aXRoIHN1YnN0clxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmVnaW5zV2l0aChzdHIsIHN1YnN0cikge1xuICAgIHJldHVybiBzdHIuaW5kZXhPZihzdWJzdHIpID09PSAwO1xufVxuIiwiLy8gZXZlcnl0aGluZyBhZnRlciB0aGUgZmlyc3Qgb2NjdXJhbmNlIG9mIHN0YXJ0IGFuZCBiZWZvcmUgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgZW5kXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBiZXR3ZWVuKHN0ciwgc3RhcnQsIGVuZCkge1xuICAgIGxldCBzdWJzdHIgPSAnJztcbiAgICBsZXQgc3RhcnRJbmRleCA9IHN0ci5pbmRleE9mKHN0YXJ0KTtcbiAgICBpZiAoc3RhcnRJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgc3RhcnRJbmRleCArPSBzdGFydC5sZW5ndGg7XG4gICAgICAgIGNvbnN0IGVuZEluZGV4ID0gc3RyLmluZGV4T2YoZW5kLCBzdGFydEluZGV4KTtcbiAgICAgICAgaWYgKGVuZEluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgc3Vic3RyID0gc3RyLnNsaWNlKHN0YXJ0SW5kZXgsIGVuZEluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3Vic3RyO1xufVxuIiwiaW1wb3J0IGVzY2FwZVBhdHRlcm4gZnJvbSAnLi9lc2NhcGVQYXR0ZXJuJztcbmltcG9ydCB0cnVuY2F0ZSBmcm9tICcuL3RydW5jYXRlJztcbi8vIFV0aWxpdHkgbWV0aG9kIHRoYXQgaW50ZWxsaWdlbnRseSBicmVha3MgdXAgeW91ciBzdHJpbmcsXG4vLyBhbGxvd2luZyB5b3UgdG8gY3JlYXRlIGJsb2NrcyBvZiByZWFkYWJsZSB0ZXh0LlxuLy8gVGhpcyBtZXRob2QgcmV0dXJucyB5b3UgdGhlIGNsb3Nlc3QgcG9zc2libGUgbWF0Y2ggdG8gdGhlIGRlbGltIHBhcmFtYXRlcixcbi8vIHdoaWxlIGtlZXBpbmcgdGhlIHRleHQgbGVuZ3RoIHdpdGhpbiB0aGUgbGVuIHBhcmFtdGVyLlxuLy8gSWYgYSBtYXRjaCBjYW4ndCBiZSBmb3VuZCBpbiB5b3VyIHNwZWNpZmllZCBsZW5ndGggYW4gICcuLi4nIGlzIGFkZGVkIHRvIHRoYXQgYmxvY2ssXG4vLyBhbmQgdGhlIGJsb2NraW5nIGNvbnRpbnVlcyB1bnRpbGwgYWxsIHRoZSB0ZXh0IGlzIGJyb2tlbiBhcGFydC5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJsb2NrKHN0ciwgbGVuLCBkZWxpbSA9ICcuJykge1xuICAgIGNvbnN0IGFyciA9IFtdO1xuXG4gICAgaWYgKCFzdHIgfHwgIXN0ci5pbmNsdWRlcyhkZWxpbSkpIHtcbiAgICAgICAgcmV0dXJuIGFycjtcbiAgICB9XG5cbiAgICBpZiAoZGVsaW0gPT09ICcgJykge1xuICAgICAgICBzdHIgKz0gZGVsaW07XG4gICAgfVxuXG4gICAgbGV0IGNockluZGV4ID0gMDtcbiAgICBjb25zdCByZXBsUGF0dCA9IG5ldyBSZWdFeHAoJ1teJyArIGVzY2FwZVBhdHRlcm4oZGVsaW0pICsgJ10rJCcpO1xuXG4gICAgd2hpbGUgKGNockluZGV4IDwgc3RyLmxlbmd0aCkge1xuICAgICAgICBsZXQgc3ViU3RyaW5nID0gc3RyLnN1YnN0cihjaHJJbmRleCwgbGVuKTtcbiAgICAgICAgaWYgKCFzdWJTdHJpbmcuaW5jbHVkZXMoZGVsaW0pKSB7XG4gICAgICAgICAgICBhcnIucHVzaCh0cnVuY2F0ZShzdWJTdHJpbmcsIHN1YlN0cmluZy5sZW5ndGgpKTtcbiAgICAgICAgICAgIGNockluZGV4ICs9IHN1YlN0cmluZy5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgc3ViU3RyaW5nID0gc3ViU3RyaW5nLnJlcGxhY2UocmVwbFBhdHQsICcnKTtcbiAgICAgICAgY2hySW5kZXggKz0gc3ViU3RyaW5nLmxlbmd0aDtcbiAgICAgICAgYXJyLnB1c2goc3ViU3RyaW5nLnRyaW0oKSk7XG4gICAgfVxuICAgIHJldHVybiBhcnI7XG59XG4iLCIvLyBDYXBpdGFsaXplIHRoZSBmaXJzdCB3b3JkIGluIGEgc3RyaW5nIG9yIGFsbCB3b3Jkc1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2FwaXRhbGl6ZShzdHIsIGFsbCA9IGZhbHNlKSB7XG4gICAgY29uc3Qgc3Vic3RyID0gc3RyLnRyaW1MZWZ0KCk7XG4gICAgY29uc3QgcmUgPSBhbGwgPyAvXi58XFxiLi9nIDogLyheXFx3KS87XG4gICAgcmV0dXJuIHN1YnN0ci5yZXBsYWNlKHJlLCAobWF0Y2gpID0+IG1hdGNoLnRvVXBwZXJDYXNlKCkpO1xufVxuIiwiaW1wb3J0IGVzY2FwZVBhdHRlcm4gZnJvbSAnLi9lc2NhcGVQYXR0ZXJuJztcblxuLy8gdGhlIG51bWJlciBvZiB0aW1lcyBzdWJzdHIgYXBwZWFycyB3aXRoaW4gc3RyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb3VudE9mKHN0ciwgc3Vic3RyLCBjYXNlU2Vuc2l0aXZlKSB7XG4gICAgY29uc3QgZXNjYXBlZFN0ciA9IGVzY2FwZVBhdHRlcm4oc3Vic3RyKTtcbiAgICBjb25zdCBmbGFncyA9ICghY2FzZVNlbnNpdGl2ZSkgPyAnaWcnIDogJ2cnO1xuICAgIHJldHVybiBzdHIubWF0Y2gobmV3IFJlZ0V4cChlc2NhcGVkU3RyLCBmbGFncykpLmxlbmd0aDtcbn1cbiIsIi8vIExldmVuc2h0ZWluIGRpc3RhbmNlIChlZGl0RGlzdGFuY2UpIGlzIGEgbWVhc3VyZSBvZiB0aGUgc2ltaWxhcml0eSBiZXR3ZWVuXG4vLyB0d28gc3RyaW5ncy4gVGhlIGRpc3RhbmNlIGlzIHRoZSBudW1iZXIgb2YgZGVsZXRpb25zLCBpbnNlcnRpb25zLCBvclxuLy8gc3Vic3RpdHV0aW9ucyByZXF1aXJlZCB0byB0cmFuc2Zvcm0gc291cmNlIGludG8gdGFyZ2V0LlxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZWRpdERpc3RhbmNlKHNvdXJjZSA9ICcnLCB0YXJnZXQgPSAnJykge1xuXG4gICAgaWYgKHNvdXJjZSA9PT0gdGFyZ2V0KSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIGlmICghc291cmNlLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gdGFyZ2V0Lmxlbmd0aDtcbiAgICB9XG5cbiAgICBpZiAoIXRhcmdldC5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZS5sZW5ndGg7XG4gICAgfVxuXG4gICAgY29uc3QgZCA9IFtdO1xuICAgIGxldCBpLCBqLCBjb3N0O1xuXG4gICAgZm9yIChpID0gMDsgaSA8PSBzb3VyY2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZFtpXSA9IFtdO1xuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDw9IHNvdXJjZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBkW2ldWzBdID0gaTtcbiAgICB9XG4gICAgZm9yIChqID0gMDsgaiA8PSB0YXJnZXQubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgZFswXVtqXSA9IGo7XG4gICAgfVxuXG4gICAgZm9yIChpID0gMTsgaSA8PSBzb3VyY2UubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICBjb25zdCBzaSA9IHNvdXJjZS5jaGFyQXQoaSAtIDEpO1xuICAgICAgICBmb3IgKGogPSAxOyBqIDw9IHRhcmdldC5sZW5ndGg7IGorKykge1xuXG4gICAgICAgICAgICBjb25zdCB0aiA9IHRhcmdldC5jaGFyQXQoaiAtIDEpO1xuXG4gICAgICAgICAgICBpZiAoc2kgPT09IHRqKSB7XG4gICAgICAgICAgICAgICAgY29zdCA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvc3QgPSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkW2ldW2pdID0gTWF0aC5taW4oZFtpIC0gMV1bal0gKyAxLCBkW2ldW2ogLSAxXSArIDEsIGRbaSAtIDFdW2ogLSAxXSArIGNvc3QpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRbc291cmNlLmxlbmd0aF1bdGFyZ2V0Lmxlbmd0aF07XG59XG4iLCIvLyB3aGV0aGVyIHN0ciBlbmRzIHdpdGggc3Vic3RyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlbmRzV2l0aChzdHIsIHN1YnN0cikge1xuICAgIHJldHVybiBzdHIubGFzdEluZGV4T2Yoc3Vic3RyKSA9PT0gc3RyLmxlbmd0aCAtIHN1YnN0ci5sZW5ndGg7XG59XG4iLCIvLyBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlc2NhcGVIdG1sKHN0cikge1xuLy8gICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuLy8gICAgIGRpdi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzdHIpKTtcbi8vICAgICByZXR1cm4gZGl2LmlubmVySFRNTDtcbi8vIH1cblxuY29uc3QgZW50aXR5TWFwID0ge1xuICAgICcmJzogJyZhbXA7JyxcbiAgICAnPCc6ICcmbHQ7JyxcbiAgICAnPic6ICcmZ3Q7JyxcbiAgICAnXCInOiAnJnF1b3Q7JyxcbiAgICAnXFwnJzogJyYjMzk7JyxcbiAgICAnLyc6ICcmI3gyRjsnLFxuICAgICdgJzogJyYjeDYwOycsXG4gICAgJz0nOiAnJiN4M0Q7J1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXNjYXBlSHRtbChzdHJpbmcpIHtcbiAgICByZXR1cm4gU3RyaW5nKHN0cmluZylcbiAgICAgICAgLnJlcGxhY2UoL1smPD5cIidgPVxcL10vZywgZnVuY3Rpb24gZnJvbUVudGl0eU1hcChzKSB7XG4gICAgICAgICAgICByZXR1cm4gZW50aXR5TWFwW3NdO1xuICAgICAgICB9KTtcbn1cbiIsIi8vIHJlZ2V4IGVzY2FwZSBwYXR0ZXJuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlc2NhcGVQYXR0ZXJuKHBhdHRlcm4pIHtcbiAgICByZXR1cm4gcGF0dGVybi5yZXBsYWNlKC8oXFxdfFxcW3xcXHt8XFx9fFxcKHxcXCl8XFwqfFxcK3xcXD98XFwufFxcXFwpL2csICdcXFxcJDEnKTtcbn1cbiIsImltcG9ydCByZW1vdmVFeHRyYVdoaXRlc3BhY2UgZnJvbSAnLi9yZW1vdmVFeHRyYVdoaXRlc3BhY2UnO1xuXG4vLyB3aGV0aGVyIHN0ciBjb250YWlucyBhbnkgdGV4dFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaGFzVGV4dChzdHIpIHtcbiAgICByZXR1cm4gISFyZW1vdmVFeHRyYVdoaXRlc3BhY2Uoc3RyKS5sZW5ndGg7XG59XG4iLCJpbXBvcnQgYWZ0ZXJGaXJzdCBmcm9tICcuL2FmdGVyRmlyc3QnO1xuaW1wb3J0IGFmdGVyTGFzdCBmcm9tICcuL2FmdGVyTGFzdCc7XG5pbXBvcnQgYmVmb3JlRmlyc3QgZnJvbSAnLi9iZWZvcmVGaXJzdCc7XG5pbXBvcnQgYmVmb3JlTGFzdCBmcm9tICcuL2JlZm9yZUxhc3QnO1xuaW1wb3J0IGJlZ2luc1dpdGggZnJvbSAnLi9iZWdpbnNXaXRoJztcbmltcG9ydCBiZXR3ZWVuIGZyb20gJy4vYmV0d2Vlbic7XG5pbXBvcnQgYmxvY2sgZnJvbSAnLi9ibG9jayc7XG5pbXBvcnQgY2FwaXRhbGl6ZSBmcm9tICcuL2NhcGl0YWxpemUnO1xuaW1wb3J0IGNvdW50T2YgZnJvbSAnLi9jb3VudE9mJztcbmltcG9ydCBlZGl0RGlzdGFuY2UgZnJvbSAnLi9lZGl0RGlzdGFuY2UnO1xuaW1wb3J0IGVuZHNXaXRoIGZyb20gJy4vZW5kc1dpdGgnO1xuaW1wb3J0IGVzY2FwZUhUTUwgZnJvbSAnLi9lc2NhcGVIVE1MJztcbmltcG9ydCBlc2NhcGVQYXR0ZXJuIGZyb20gJy4vZXNjYXBlUGF0dGVybic7XG5pbXBvcnQgaGFzVGV4dCBmcm9tICcuL2hhc1RleHQnO1xuaW1wb3J0IGlzTnVtZXJpYyBmcm9tICcuL2lzTnVtZXJpYyc7XG5pbXBvcnQgcGFkTGVmdCBmcm9tICcuL3BhZExlZnQnO1xuaW1wb3J0IHBhZFJpZ2h0IGZyb20gJy4vcGFkUmlnaHQnO1xuaW1wb3J0IHByZXZlbnRXaWRvdyBmcm9tICcuL3ByZXZlbnRXaWRvdyc7XG5pbXBvcnQgcHJvcGVyQ2FzZSBmcm9tICcuL3Byb3BlckNhc2UnO1xuaW1wb3J0IHJlbW92ZSBmcm9tICcuL3JlbW92ZSc7XG5pbXBvcnQgcmVtb3ZlRXh0cmFXaGl0ZXNwYWNlIGZyb20gJy4vcmVtb3ZlRXh0cmFXaGl0ZXNwYWNlJztcbmltcG9ydCByZXZlcnNlIGZyb20gJy4vcmV2ZXJzZSc7XG5pbXBvcnQgcmV2ZXJzZVdvcmRzIGZyb20gJy4vcmV2ZXJzZVdvcmRzJztcbmltcG9ydCBzaW1pbGFyaXR5IGZyb20gJy4vc2ltaWxhcml0eSc7XG5pbXBvcnQgc3RyaXBUYWdzIGZyb20gJy4vc3RyaXBUYWdzJztcbmltcG9ydCBzd2FwQ2FzZSBmcm9tICcuL3N3YXBDYXNlJztcbmltcG9ydCB0aW1lQ29kZSBmcm9tICcuL3RpbWVDb2RlJztcbmltcG9ydCB0b051bWJlciBmcm9tICcuL3RvTnVtYmVyJztcbmltcG9ydCB0cnVuY2F0ZSBmcm9tICcuL3RydW5jYXRlJztcbmltcG9ydCB3b3JkQ291bnQgZnJvbSAnLi93b3JkQ291bnQnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYWZ0ZXJGaXJzdCxcbiAgICBhZnRlckxhc3QsXG4gICAgYmVmb3JlRmlyc3QsXG4gICAgYmVmb3JlTGFzdCxcbiAgICBiZWdpbnNXaXRoLFxuICAgIGJldHdlZW4sXG4gICAgYmxvY2ssXG4gICAgY2FwaXRhbGl6ZSxcbiAgICBjb3VudE9mLFxuICAgIGVkaXREaXN0YW5jZSxcbiAgICBlbmRzV2l0aCxcbiAgICBlc2NhcGVIVE1MLFxuICAgIGVzY2FwZVBhdHRlcm4sXG4gICAgaGFzVGV4dCxcbiAgICBpc051bWVyaWMsXG4gICAgcGFkTGVmdCxcbiAgICBwYWRSaWdodCxcbiAgICBwcmV2ZW50V2lkb3csXG4gICAgcHJvcGVyQ2FzZSxcbiAgICByZW1vdmUsXG4gICAgcmVtb3ZlRXh0cmFXaGl0ZXNwYWNlLFxuICAgIHJldmVyc2UsXG4gICAgcmV2ZXJzZVdvcmRzLFxuICAgIHNpbWlsYXJpdHksXG4gICAgc3RyaXBUYWdzLFxuICAgIHN3YXBDYXNlLFxuICAgIHRpbWVDb2RlLFxuICAgIHRvTnVtYmVyLFxuICAgIHRydW5jYXRlLFxuICAgIHdvcmRDb3VudFxufTtcbiIsIi8vIHdoZXRoZXIgc3RyIGlzIG51bWVyaWNcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzTnVtZXJpYyhzdHIpIHtcbiAgICBjb25zdCByZWd4ID0gL15bLStdP1xcZCpcXC4/XFxkKyg/OltlRV1bLStdP1xcZCspPyQvO1xuICAgIHJldHVybiByZWd4LnRlc3Qoc3RyKTtcbn1cbiIsIi8vIHBhZCBzdHIgd2l0aCBzdWJzdHIgZnJvbSB0aGUgbGVmdFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFkTGVmdChzdHIsIHN1YnN0ciwgbGVuZ3RoKSB7XG4gICAgc3RyID0gU3RyaW5nKHN0cik7XG4gICAgd2hpbGUgKHN0ci5sZW5ndGggPCBsZW5ndGgpIHtcbiAgICAgICAgc3RyID0gc3Vic3RyICsgc3RyO1xuICAgIH1cbiAgICByZXR1cm4gc3RyO1xufVxuIiwiLy8gcGFkcyBzdHIgd2l0aCBzdWJzdHIgZnJvbSB0aGUgcmlnaHRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhZFJpZ2h0KHN0ciwgc3Vic3RyLCBsZW5ndGgpIHtcbiAgICBzdHIgPSBTdHJpbmcoc3RyKTtcbiAgICB3aGlsZSAoc3RyLmxlbmd0aCA8IGxlbmd0aCkge1xuICAgICAgICBzdHIgKz0gc3Vic3RyO1xuICAgIH1cbiAgICByZXR1cm4gc3RyO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcHJldmVudFdpZG93KHN0cikge1xuICAgIHN0ciA9IHN0ci50cmltKCk7XG5cbiAgICBjb25zdCBsYXN0U3BhY2UgPSBzdHIubGFzdEluZGV4T2YoJyAnKTtcbiAgICBpZiAobGFzdFNwYWNlID4gMCkge1xuICAgICAgICByZXR1cm4gYCR7c3RyLnNsaWNlKDAsIGxhc3RTcGFjZSl9Jm5ic3A7JHtzdHIuc2xpY2UobGFzdFNwYWNlICsgMSl9YDtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RyO1xufVxuIiwiaW1wb3J0IGNhcGl0YWxpemUgZnJvbSAnLi9jYXBpdGFsaXplJztcblxuLy8gcHJvcGVyIGNhc2Ugc3RyIGluIHNlbnRlbmNlIGZvcm1hdFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcHJvcGVyQ2FzZShzdHIpIHtcbiAgICBjb25zdCBuZXdTdHIgPSBzdHIudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXGIoW14uPzshXSspLywgY2FwaXRhbGl6ZSk7XG4gICAgcmV0dXJuIG5ld1N0ci5yZXBsYWNlKC9cXGJbaV1cXGIvLCAnSScpO1xufVxuIiwiaW1wb3J0IGVzY2FwZVBhdHRlcm4gZnJvbSAnLi9lc2NhcGVQYXR0ZXJuJztcblxuLy8gcmVtb3ZlIGFsbCBpbnN0YW5jZXMgb2Ygc3Vic3RyIGluIHN0clxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVtb3ZlKHN0ciwgc3Vic3RyLCBjYXNlU2Vuc2l0aXZlID0gZmFsc2UpIHtcbiAgICBjb25zdCBlc2NhcGVkU3RyID0gZXNjYXBlUGF0dGVybihzdWJzdHIpO1xuICAgIGNvbnN0IGZsYWdzID0gY2FzZVNlbnNpdGl2ZSA/ICdnJyA6ICdpZyc7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKG5ldyBSZWdFeHAoZXNjYXBlZFN0ciwgZmxhZ3MpLCAnJyk7XG59XG4iLCIvLyByZW1vdmUgZXh0cmEgd2hpdGVzcGFjZSAoZXh0cmEgc3BhY2VzLCB0YWJzLCBsaW5lIGJyZWFrcywgZXRjKVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVtb3ZlRXh0cmFXaGl0ZXNwYWNlKHN0cikge1xuICAgIHJldHVybiBzdHIudHJpbSgpLnJlcGxhY2UoL1xccysvZywgJyAnKTtcbn1cbiIsIi8vIHJldmVyc2UgY2hhcmFjdGVyIG9yZGVyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZXZlcnNlKHN0cikge1xuICAgIHJldHVybiBzdHIuc3BsaXQoJycpLnJldmVyc2UoKS5qb2luKCcnKTtcbn1cbiIsIi8vIHJldmVyc2Ugd29yZCBvcmRlclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmV2ZXJzZVdvcmRzKHN0cikge1xuICAgIHJldHVybiBzdHIuc3BsaXQoJyAnKS5yZXZlcnNlKCkuam9pbignICcpO1xufVxuIiwiaW1wb3J0IGVkaXREaXN0YW5jZSBmcm9tICcuL2VkaXREaXN0YW5jZSc7XG5cbi8vIHBlcmNlbnRhZ2Ugb2Ygc2ltaWxpYXJpdHkgZnJvbSAwIHRvIDFcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNpbWlsYXJpdHkoYSwgYikge1xuICAgIGNvbnN0IGUgPSBlZGl0RGlzdGFuY2UoYSwgYik7XG4gICAgY29uc3QgbSA9IE1hdGgubWF4KGEubGVuZ3RoLCBiLmxlbmd0aCk7XG4gICAgaWYgKG0gPT09IDApIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgfVxuICAgIHJldHVybiAoMSAtIGUgLyBtKTtcbn1cbiIsIi8vIHJlbW92ZSBhbGwgSFRNTCB0YWdzIGZyb20gc3RyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzdHJpcFRhZ3Moc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC88XFwvP1tePl0rPi9pZ20sICcnKTtcbn1cbiIsIlxuLy8gc3dhcHMgdGhlIGNhc2Ugb2Ygc3RyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzd2FwQ2FzZShzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoLyhcXHcpLywgZnVuY3Rpb24obmV3U3RyKSB7XG4gICAgICAgIGNvbnN0IGxvd2VyID0gbmV3U3RyLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IHVwcGVyID0gbmV3U3RyLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIHN3aXRjaCAobmV3U3RyKSB7XG4gICAgICAgICAgICBjYXNlIGxvd2VyOlxuICAgICAgICAgICAgICAgIHJldHVybiB1cHBlcjtcbiAgICAgICAgICAgIGNhc2UgdXBwZXI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxvd2VyO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3U3RyO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4iLCIvLyBmb3JtYXRzIHNlY29uZHMgaW50byBISDpNTTpTU1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdGltZUNvZGUoc2Vjb25kcywgZGVsaW0gPSAnOicpIHtcbiAgICBjb25zdCBoID0gTWF0aC5mbG9vcihzZWNvbmRzIC8gMzYwMCk7XG4gICAgY29uc3QgbSA9IE1hdGguZmxvb3IoKHNlY29uZHMgJSAzNjAwKSAvIDYwKTtcbiAgICBjb25zdCBzID0gTWF0aC5mbG9vcigoc2Vjb25kcyAlIDM2MDApICUgNjApO1xuICAgIGNvbnN0IGhyID0gKGggPCAxMCA/ICcwJyArIGggOiBoKSArIGRlbGltO1xuICAgIGNvbnN0IG1uID0gKG0gPCAxMCA/ICcwJyArIG0gOiBtKSArIGRlbGltO1xuICAgIGNvbnN0IHNjID0gKHMgPCAxMCA/ICcwJyArIHMgOiBzKTtcbiAgICByZXR1cm4gaHIgKyBtbiArIHNjO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdG9OdW1iZXIoc3RyKSB7XG4gICAgcmV0dXJuIE51bWJlcihzdHIucmVwbGFjZSgvW14wLTkuXS9nLCAnJykpO1xufVxuIiwiLy8gdHJ1bmNhdGUgdG8gbGVuZ3RoIHdpdGggc3VmZml4XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0cnVuY2F0ZShzdHIsIGxlbiwgc3VmZml4ID0gJy4uLicpIHtcbiAgICBsZW4gLT0gc3VmZml4Lmxlbmd0aDtcbiAgICBsZXQgdHJ1bmMgPSBzdHI7XG4gICAgaWYgKHRydW5jLmxlbmd0aCA+IGxlbikge1xuICAgICAgICB0cnVuYyA9IHRydW5jLnN1YnN0cigwLCBsZW4pO1xuICAgICAgICBjb25zdCByID0gL1teXFxzXS87XG4gICAgICAgIGlmIChyLnRlc3Qoc3RyLmNoYXJBdChsZW4pKSkge1xuICAgICAgICAgICAgdHJ1bmMgPSB0cnVuYy5yZXBsYWNlKC9cXHcrJHxcXHMrJC8sICcnKS50cmltUmlnaHQoKTtcbiAgICAgICAgfVxuICAgICAgICB0cnVuYyArPSBzdWZmaXg7XG4gICAgfVxuICAgIHJldHVybiB0cnVuYztcbn1cbiIsIi8vIHRoZSBudW1iZXIgb2Ygd29yZHMgaW4gYSBzdHJpbmdcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdvcmRDb3VudChzdHIpIHtcbiAgICByZXR1cm4gc3RyLm1hdGNoKC9cXGJcXHcrXFxiL2cpLmxlbmd0aDtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGV2ZW50KGNhdGVnb3J5LCBhY3Rpb24sIGxhYmVsLCB2YWx1ZSkge1xuICAgIGlmICghd2luZG93LmdhKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgd2luZG93LmdhKCdzZW5kJywgJ2V2ZW50JywgY2F0ZWdvcnksIGFjdGlvbiwgbGFiZWwsIHZhbHVlKTtcbn1cbiIsImltcG9ydCBldmVudCBmcm9tICcuL2V2ZW50JztcbmltcG9ydCBwYWdldmlldyBmcm9tICcuL3BhZ2V2aWV3JztcbmltcG9ydCBsb2FkIGZyb20gJy4vbG9hZCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBldmVudCxcbiAgICBwYWdldmlldyxcbiAgICBsb2FkXG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbG9hZChnYUFjY291bnQpIHtcbiAgICBjb25zb2xlLmxvZygnSW5pdGlhbGl6ZSBHb29nbGUgQW5hbHl0aWNzIHdpdGggYWNjb3VudCBJZDonLCBnYUFjY291bnQpO1xuXG4gICAgLyplc2xpbnQtZGlzYWJsZSovXG4gICAgKGZ1bmN0aW9uKGkscyxvLGcscixhLG0pe2lbJ0dvb2dsZUFuYWx5dGljc09iamVjdCddPXI7aVtyXT1pW3JdfHxmdW5jdGlvbigpe1xuXHQoaVtyXS5xPWlbcl0ucXx8W10pLnB1c2goYXJndW1lbnRzKX0saVtyXS5sPTEqbmV3IERhdGUoKTthPXMuY3JlYXRlRWxlbWVudChvKSxcblx0bT1zLmdldEVsZW1lbnRzQnlUYWdOYW1lKG8pWzBdO2EuYXN5bmM9MTthLnNyYz1nO20ucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoYSxtKVxuXHR9KSh3aW5kb3csZG9jdW1lbnQsJ3NjcmlwdCcsJy8vd3d3Lmdvb2dsZS1hbmFseXRpY3MuY29tL2FuYWx5dGljcy5qcycsJ2dhJyk7XG4gICAgLyplc2xpbnQtZW5hYmxlKi9cblxuICAgIHdpbmRvdy5nYSgnY3JlYXRlJywgZ2FBY2NvdW50LCAnYXV0bycpO1xuICAgIHdpbmRvdy5nYSgnc2VuZCcsICdwYWdldmlldycpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFnZXZpZXcocGF0aCkge1xuICAgIGlmICghd2luZG93LmdhKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgd2luZG93LmdhKCdzZW5kJywgJ3BhZ2V2aWV3JywgcGF0aCk7XG59XG4iLCJsZXQgaGlkZGVuLFxuICAgIGNoYW5nZTtcblxuaWYgKHR5cGVvZiBkb2N1bWVudC5oaWRkZW4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaGlkZGVuID0gJ2hpZGRlbic7XG4gICAgY2hhbmdlID0gJ3Zpc2liaWxpdHljaGFuZ2UnO1xufSBlbHNlIGlmICh0eXBlb2YgZG9jdW1lbnQubW96SGlkZGVuICE9PSAndW5kZWZpbmVkJykge1xuICAgIGhpZGRlbiA9ICdtb3pIaWRkZW4nO1xuICAgIGNoYW5nZSA9ICdtb3p2aXNpYmlsaXR5Y2hhbmdlJztcbn0gZWxzZSBpZiAodHlwZW9mIGRvY3VtZW50Lm1zSGlkZGVuICE9PSAndW5kZWZpbmVkJykge1xuICAgIGhpZGRlbiA9ICdtc0hpZGRlbic7XG4gICAgY2hhbmdlID0gJ21zdmlzaWJpbGl0eWNoYW5nZSc7XG59IGVsc2UgaWYgKHR5cGVvZiBkb2N1bWVudC53ZWJraXRIaWRkZW4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaGlkZGVuID0gJ3dlYmtpdEhpZGRlbic7XG4gICAgY2hhbmdlID0gJ3dlYmtpdHZpc2liaWxpdHljaGFuZ2UnO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgaGlkZGVuLFxuICAgIGNoYW5nZVxufTtcbiIsImltcG9ydCBhcGkgZnJvbSAnLi9hcGknO1xuaW1wb3J0IGVtaXR0ZXIgZnJvbSAnLi4vZXZlbnRzL2VtaXR0ZXInO1xuXG5jb25zdCB2aXNpYmlsaXR5ID0gT2JqZWN0LmNyZWF0ZShlbWl0dGVyLnByb3RvdHlwZSwge1xuICAgIGhpZGRlbjoge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50W2FwaS5oaWRkZW5dO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbmZ1bmN0aW9uIG9uVmlzaWJpbGl0eUNoYW5nZSgpIHtcbiAgICBpZiAoZG9jdW1lbnRbYXBpLmhpZGRlbl0pIHtcbiAgICAgICAgdmlzaWJpbGl0eS5lbWl0KCdoaWRkZW4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2aXNpYmlsaXR5LmVtaXQoJ3Nob3duJyk7XG4gICAgfVxufVxuXG5pZiAoYXBpLmNoYW5nZSkge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoYXBpLmNoYW5nZSwgb25WaXNpYmlsaXR5Q2hhbmdlLCBmYWxzZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHZpc2liaWxpdHk7XG4iXX0=
