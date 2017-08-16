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

var _moveElement = require('./moveElement');

var _moveElement2 = _interopRequireDefault(_moveElement);

var _nearest = require('./nearest');

var _nearest2 = _interopRequireDefault(_nearest);

var _randomChoice = require('./randomChoice');

var _randomChoice2 = _interopRequireDefault(_randomChoice);

var _sortAlpha = require('./sortAlpha');

var _sortAlpha2 = _interopRequireDefault(_sortAlpha);

var _sortNumbered = require('./sortNumbered');

var _sortNumbered2 = _interopRequireDefault(_sortNumbered);

var _sortNumeric = require('./sortNumeric');

var _sortNumeric2 = _interopRequireDefault(_sortNumeric);

var _sortRandom = require('./sortRandom');

var _sortRandom2 = _interopRequireDefault(_sortRandom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    array: _array2.default,
    clone: _clone2.default,
    moveElement: _moveElement2.default,
    nearest: _nearest2.default,
    randomChoice: _randomChoice2.default,
    sortAlpha: _sortAlpha2.default,
    sortNumbered: _sortNumbered2.default,
    sortNumeric: _sortNumeric2.default,
    sortRandom: _sortRandom2.default
};

},{"./array":1,"./clone":2,"./moveElement":4,"./nearest":5,"./randomChoice":6,"./sortAlpha":7,"./sortNumbered":8,"./sortNumeric":9,"./sortRandom":10}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = moveElement;
function moveElement(arr, from, to) {
    arr = arr.slice(0);
    var removed = arr.splice(from, 1)[0];
    var insertAt = to < 0 ? arr.length + to : to;
    arr.splice(insertAt, 0, removed);
    return arr;
}

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = randomChoice;
function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = sortNumbered;
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

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = sortRandom;
function sortRandom() {
    return Math.random() > 0.5 ? -1 : 1;
}

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = blockScrolling;
function blockScrolling(value) {
    document.body.style.overflow = value ? 'hidden' : '';
}

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = elCoords;
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

},{}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
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

},{"./getScrollTop":17}],16:[function(require,module,exports){
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

},{"./getScrollTop":17}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getScrollTop;
function getScrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop;
}

},{}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = getSrcsetImage;
function getSrcsetImage(srcset, pixelWidth) {
    pixelWidth = pixelWidth || window.innerWidth * (window.devicePixelRatio || 0);

    var set = srcset.split(',').map(function (item) {
        var _item$trim$split = item.trim().split(/\s+/),
            _item$trim$split2 = _slicedToArray(_item$trim$split, 2),
            url = _item$trim$split2[0],
            width = _item$trim$split2[1];

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

},{}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _blockScrolling = require('./blockScrolling');

var _blockScrolling2 = _interopRequireDefault(_blockScrolling);

var _elCoords = require('./elCoords');

var _elCoords2 = _interopRequireDefault(_elCoords);

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
    elCoords: _elCoords2.default,
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

},{"./blockScrolling":11,"./elCoords":12,"./forceRedraw":13,"./getPageHeight":14,"./getScrollPercentage":15,"./getScrollRemaining":16,"./getScrollTop":17,"./getSrcsetImage":18,"./isElementInViewport":20,"./isPageEnd":21,"./resize":22,"./scroll":23,"./setStyle":24,"./transitionEnd":25}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = isElementInViewport;
function isElementInViewport(el) {
    var buffer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    var rect = el.getBoundingClientRect();
    return rect.top >= 0 - buffer && rect.left >= 0 - buffer && rect.bottom <= window.innerHeight + buffer && rect.right <= window.innerWidth + buffer;
}

},{}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = isPageEnd;

var _getScrollRemaining = require('./getScrollRemaining');

var _getScrollRemaining2 = _interopRequireDefault(_getScrollRemaining);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isPageEnd() {
    var buffer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    return (0, _getScrollRemaining2.default)() <= buffer;
}

},{"./getScrollRemaining":16}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = resize;

var _eventBus = require('../events/eventBus');

var _eventBus2 = _interopRequireDefault(_eventBus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function resize() {
    var debouceDelay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;


    var timeoutId = void 0;

    // orientationchange too?

    window.addEventListener('resize', function () {
        clearTimeout(timeoutId);
        timeoutId = window.setTimeout(function () {
            return _eventBus2.default.emit('resize');
        }, debouceDelay);
    });
}

},{"../events/eventBus":41}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = scroll;

var _eventBus = require('../events/eventBus');

var _eventBus2 = _interopRequireDefault(_eventBus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function scroll() {
    var callNow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;


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

    if (callNow) {
        onScroll();
    }
}

},{"../events/eventBus":41}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = transitionEnd;
function transitionEnd(el, cb) {
    var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;


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

},{}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
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

exports.default = {
    easeIn: easeInBack,
    easeOut: easeOutBack,
    easeInOut: easeInOutBack
};
exports.easeInBack = easeInBack;
exports.easeOutBack = easeOutBack;
exports.easeInOutBack = easeInOutBack;

},{}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
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

exports.default = {
    easeIn: easeInBounce,
    easeOut: easeOutBounce,
    easeInOut: easeInOutBounce
};
exports.easeInBounce = easeInBounce;
exports.easeOutBounce = easeOutBounce;
exports.easeInOutBounce = easeInOutBounce;

},{}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
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

exports.default = {
    easeIn: easeInCircular,
    easeOut: easeOutCircular,
    easeInOut: easeInOutCircular
};
exports.easeInCircular = easeInCircular;
exports.easeOutCircular = easeOutCircular;
exports.easeInOutCircular = easeInOutCircular;

},{}],29:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
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

exports.default = {
    easeIn: easeInCubic,
    easeOut: easeOutCubic,
    easeInOut: easeInOutCubic
};
exports.easeInCubic = easeInCubic;
exports.easeOutCubic = easeOutCubic;
exports.easeInOutCubic = easeInOutCubic;

},{}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var abs = Math.abs,
    asin = Math.asin,
    PI = Math.PI,
    pow = Math.pow,
    sin = Math.sin;

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

exports.default = {
    easeIn: easeInElastic,
    easeOut: easeOutElastic,
    easeInOut: easeInOutElastic
};
exports.easeInElastic = easeInElastic;
exports.easeOutElastic = easeOutElastic;
exports.easeInOutElastic = easeInOutElastic;

},{}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var pow = Math.pow;


function easeInExpo(t, b, c, d) {
    return t === 0 ? b : c * pow(2, 10 * (t / d - 1)) + b;
}

function easeOutExpo(t, b, c, d) {
    return t === d ? b + c : c * (-pow(2, -10 * t / d) + 1) + b;
}

function easeInOutExpo(t, b, c, d) {
    if (t === 0) {
        return b;
    }
    if (t === d) {
        return b + c;
    }
    if ((t /= d / 2) < 1) {
        return c / 2 * pow(2, 10 * (t - 1)) + b;
    }
    return c / 2 * (-pow(2, -10 * --t) + 2) + b;
}

exports.default = {
    easeIn: easeInExpo,
    easeOut: easeOutExpo,
    easeInOut: easeInOutExpo
};
exports.easeInExpo = easeInExpo;
exports.easeOutExpo = easeOutExpo;
exports.easeInOutExpo = easeInOutExpo;

},{}],32:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.easeInOutSine = exports.easeOutSine = exports.easeInSine = exports.easeInOutQuint = exports.easeOutQuint = exports.easeInQuint = exports.easeInOutQuart = exports.easeOutQuart = exports.easeInQuart = exports.easeInOutQuad = exports.easeOutQuad = exports.easeInQuad = exports.easeInOutExpo = exports.easeOutExpo = exports.easeInExpo = exports.easeInOutElastic = exports.easeOutElastic = exports.easeInElastic = exports.easeInOutCubic = exports.easeOutCubic = exports.easeInCubic = exports.easeInOutCircular = exports.easeOutCircular = exports.easeInCircular = exports.easeInOutBounce = exports.easeOutBounce = exports.easeInBounce = exports.easeInOutBack = exports.easeOutBack = exports.easeInBack = exports.easeLinear = exports.sine = exports.quint = exports.quart = exports.quad = exports.linear = exports.expo = exports.elastic = exports.cubic = exports.circular = exports.bounce = exports.back = undefined;

var _back = require('./back');

var _back2 = _interopRequireDefault(_back);

var _bounce = require('./bounce');

var _bounce2 = _interopRequireDefault(_bounce);

var _circular = require('./circular');

var _circular2 = _interopRequireDefault(_circular);

var _cubic = require('./cubic');

var _cubic2 = _interopRequireDefault(_cubic);

var _elastic = require('./elastic');

var _elastic2 = _interopRequireDefault(_elastic);

var _expo = require('./expo');

var _expo2 = _interopRequireDefault(_expo);

var _linear = require('./linear');

var _linear2 = _interopRequireDefault(_linear);

var _quad = require('./quad');

var _quad2 = _interopRequireDefault(_quad);

var _quart = require('./quart');

var _quart2 = _interopRequireDefault(_quart);

var _quint = require('./quint');

var _quint2 = _interopRequireDefault(_quint);

var _sine = require('./sine');

var _sine2 = _interopRequireDefault(_sine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.back = _back2.default;
exports.bounce = _bounce2.default;
exports.circular = _circular2.default;
exports.cubic = _cubic2.default;
exports.elastic = _elastic2.default;
exports.expo = _expo2.default;
exports.linear = _linear2.default;
exports.quad = _quad2.default;
exports.quart = _quart2.default;
exports.quint = _quint2.default;
exports.sine = _sine2.default;
exports.easeLinear = _linear.easeLinear;
exports.easeInBack = _back.easeInBack;
exports.easeOutBack = _back.easeOutBack;
exports.easeInOutBack = _back.easeInOutBack;
exports.easeInBounce = _bounce.easeInBounce;
exports.easeOutBounce = _bounce.easeOutBounce;
exports.easeInOutBounce = _bounce.easeInOutBounce;
exports.easeInCircular = _circular.easeInCircular;
exports.easeOutCircular = _circular.easeOutCircular;
exports.easeInOutCircular = _circular.easeInOutCircular;
exports.easeInCubic = _cubic.easeInCubic;
exports.easeOutCubic = _cubic.easeOutCubic;
exports.easeInOutCubic = _cubic.easeInOutCubic;
exports.easeInElastic = _elastic.easeInElastic;
exports.easeOutElastic = _elastic.easeOutElastic;
exports.easeInOutElastic = _elastic.easeInOutElastic;
exports.easeInExpo = _expo.easeInExpo;
exports.easeOutExpo = _expo.easeOutExpo;
exports.easeInOutExpo = _expo.easeInOutExpo;
exports.easeInQuad = _quad.easeInQuad;
exports.easeOutQuad = _quad.easeOutQuad;
exports.easeInOutQuad = _quad.easeInOutQuad;
exports.easeInQuart = _quart.easeInQuart;
exports.easeOutQuart = _quart.easeOutQuart;
exports.easeInOutQuart = _quart.easeInOutQuart;
exports.easeInQuint = _quint.easeInQuint;
exports.easeOutQuint = _quint.easeOutQuint;
exports.easeInOutQuint = _quint.easeInOutQuint;
exports.easeInSine = _sine.easeInSine;
exports.easeOutSine = _sine.easeOutSine;
exports.easeInOutSine = _sine.easeInOutSine;

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

},{"./back":26,"./bounce":27,"./circular":28,"./cubic":29,"./elastic":30,"./expo":31,"./linear":33,"./quad":34,"./quart":35,"./quint":36,"./sine":37}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function easeLinear(t, b, c, d) {
    return c * t / d + b;
}

exports.default = {
    easeIn: easeLinear,
    easeOut: easeLinear,
    easeInOut: easeLinear
};
exports.easeLinear = easeLinear;

},{}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
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

exports.default = {
    easeIn: easeInQuad,
    easeOut: easeOutQuad,
    easeInOut: easeInOutQuad
};
exports.easeInQuad = easeInQuad;
exports.easeOutQuad = easeOutQuad;
exports.easeInOutQuad = easeInOutQuad;

},{}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
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

exports.default = {
    easeIn: easeInQuart,
    easeOut: easeOutQuart,
    easeInOut: easeInOutQuart
};
exports.easeInQuart = easeInQuart;
exports.easeOutQuart = easeOutQuart;
exports.easeInOutQuart = easeInOutQuart;

},{}],36:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
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

exports.default = {
    easeIn: easeInQuint,
    easeOut: easeOutQuint,
    easeInOut: easeInOutQuint
};
exports.easeInQuint = easeInQuint;
exports.easeOutQuint = easeOutQuint;
exports.easeInOutQuint = easeInOutQuint;

},{}],37:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var cos = Math.cos,
    PI = Math.PI,
    sin = Math.sin;

var PI_D2 = PI / 2;

function easeInSine(t, b, c, d) {
    return -c * cos(t / d * PI_D2) + c + b;
}

function easeOutSine(t, b, c, d) {
    return c * sin(t / d * PI_D2) + b;
}

function easeInOutSine(t, b, c, d) {
    return -c / 2 * (cos(PI * t / d) - 1) + b;
}

exports.default = {
    easeIn: easeInSine,
    easeOut: easeOutSine,
    easeInOut: easeInOutSine
};
exports.easeInSine = easeInSine;
exports.easeOutSine = easeOutSine;
exports.easeInOutSine = easeInOutSine;

},{}],38:[function(require,module,exports){
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

},{}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = delegateEvents;
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

},{}],40:[function(require,module,exports){
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

        var _this = _possibleConstructorReturn(this, (emitter.__proto__ || Object.getPrototypeOf(emitter)).call(this));

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

},{"events":112}],41:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _emitter = require('./emitter');

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = Object.create(_emitter2.default.prototype);

},{"./emitter":40}],42:[function(require,module,exports){
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

},{"./emitter":40}],43:[function(require,module,exports){
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

},{"./debounce":38,"./delegateEvents":39,"./emitter":40,"./eventBus":41,"./heartbeat":42}],44:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
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

exports.default = {
    auto: auto,
    el: el,
    log: log,
    style: style,
    update: update
};

},{}],45:[function(require,module,exports){
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

},{}],46:[function(require,module,exports){
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

},{"../events/emitter":40,"./api":45}],47:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
            var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

            this.ctx.fillStyle = getColour(r, g, b, a);
            return this;
        }
    }, {
        key: 'stroke',
        value: function stroke(r, g, b) {
            var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

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
        value: function image(el, x, y, options) {
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
            var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var width = arguments[2];
            var height = arguments[3];
            var ctx = this.ctx,
                canvas = this.canvas;

            return ctx.getImageData(x, y, width || canvas.width, height || canvas.height);
        }
    }, {
        key: 'getPixel',
        value: function getPixel(x, y) {
            x = Math.floor(x);
            y = Math.floor(y);

            var _ctx$getImageData = this.ctx.getImageData(x, y, 1, 1),
                data = _ctx$getImageData.data;

            return Array.prototype.slice.call(data);
        }
    }, {
        key: 'setPixel',
        value: function setPixel(x, y, r, g, b, a) {
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
        }
    }, {
        key: 'clearCircle',
        value: function clearCircle(x, y) {
            var radius = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 20;
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
        }
    }, {
        key: 'size',
        value: function size() {
            var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.innerWidth;
            var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.innerHeight;

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
        key: 'alpha',
        get: function get() {
            return this.ctx.globalAlpha;
        },
        set: function set(value) {
            this.ctx.globalAlpha = value;
        }
    }, {
        key: 'blendMode',
        get: function get() {
            return this.ctx.globalCompositeOperation;
        },
        set: function set(value) {
            this.ctx.globalCompositeOperation = value;
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

},{}],48:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = gui;

var _loadScript = require('../http/loadScript');

var _loadScript2 = _interopRequireDefault(_loadScript);

var _localHost = require('../platform/local-host');

var _localHost2 = _interopRequireDefault(_localHost);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

    if (localhostOnly && !(0, _localHost2.default)()) {
        return new Promise(function () {});
    }
    return new Promise(function (resolve, reject) {
        (0, _loadScript2.default)('https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.6.1/dat.gui.min.js', function (err, src) {
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

gui.isLocalHost = isLocalHost;

},{"../http/loadScript":52,"../platform/local-host":135}],49:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getLocation;
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

},{}],50:[function(require,module,exports){
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

},{"./getLocation":49,"./jsonp":51,"./loadScript":52,"./urlParams":53,"./xhr":54}],51:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = jsonp;
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

},{}],52:[function(require,module,exports){
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

},{}],53:[function(require,module,exports){
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

},{}],54:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = xhr;
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

},{}],55:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('./polyfill');

var _array = require('./array');

var _array2 = _interopRequireDefault(_array);

var _dom = require('./dom');

var _dom2 = _interopRequireDefault(_dom);

var _ease = require('./ease');

var _ease2 = _interopRequireDefault(_ease);

var _events = require('./events');

var _events2 = _interopRequireDefault(_events);

var _fps = require('./fps');

var _fps2 = _interopRequireDefault(_fps);

var _fullscreen = require('./fullscreen');

var _fullscreen2 = _interopRequireDefault(_fullscreen);

var _graphics = require('./graphics');

var _graphics2 = _interopRequireDefault(_graphics);

var _gui = require('./gui');

var _gui2 = _interopRequireDefault(_gui);

var _http = require('./http');

var _http2 = _interopRequireDefault(_http);

var _input = require('./input');

var _input2 = _interopRequireDefault(_input);

var _linkedList = require('./linked-list');

var _linkedList2 = _interopRequireDefault(_linkedList);

var _loop = require('./loop');

var _loop2 = _interopRequireDefault(_loop);

var _math = require('./math');

var _math2 = _interopRequireDefault(_math);

var _media = require('./media');

var _media2 = _interopRequireDefault(_media);

var _object = require('./object');

var _object2 = _interopRequireDefault(_object);

var _objectPool = require('./object-pool');

var _objectPool2 = _interopRequireDefault(_objectPool);

var _particle = require('./particle');

var _particle2 = _interopRequireDefault(_particle);

var _platform = require('./platform');

var _platform2 = _interopRequireDefault(_platform);

var _popup = require('./popup');

var _popup2 = _interopRequireDefault(_popup);

var _quadTree = require('./quad-tree');

var _quadTree2 = _interopRequireDefault(_quadTree);

var _share = require('./share');

var _share2 = _interopRequireDefault(_share);

var _storage = require('./storage');

var _storage2 = _interopRequireDefault(_storage);

var _string = require('./string');

var _string2 = _interopRequireDefault(_string);

var _track = require('./track');

var _track2 = _interopRequireDefault(_track);

var _tween = require('./tween');

var _tween2 = _interopRequireDefault(_tween);

var _visibility = require('./visibility');

var _visibility2 = _interopRequireDefault(_visibility);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    array: _array2.default,
    dom: _dom2.default,
    ease: _ease2.default,
    events: _events2.default,
    fps: _fps2.default,
    fullscreen: _fullscreen2.default,
    graphics: _graphics2.default,
    gui: _gui2.default,
    http: _http2.default,
    input: _input2.default,
    linkedList: _linkedList2.default,
    Loop: _loop2.default,
    math: _math2.default,
    media: _media2.default,
    object: _object2.default,
    objectPool: _objectPool2.default,
    Particle: _particle2.default,
    ParticleGroup: _particle2.default,
    platform: _platform2.default,
    popup: _popup2.default,
    QuadTree: _quadTree2.default,
    share: _share2.default,
    storage: _storage2.default,
    string: _string2.default,
    Tween: _tween2.default,
    track: _track2.default,
    visibility: _visibility2.default
};

},{"./array":3,"./dom":19,"./ease":32,"./events":43,"./fps":44,"./fullscreen":46,"./graphics":47,"./gui":48,"./http":50,"./input":57,"./linked-list":65,"./loop":66,"./math":82,"./media":107,"./object":117,"./object-pool":114,"./particle":119,"./platform":129,"./polyfill":148,"./popup":150,"./quad-tree":151,"./share":156,"./storage":166,"./string":181,"./track":199,"./tween":202,"./visibility":204}],56:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = clickOutside;
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

},{}],57:[function(require,module,exports){
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

},{"./clickOutside":56,"./keyInput":58,"./keyboard":59,"./microphone":60,"./mouseLeftWindow":61,"./mouseWheel":62,"./pointerCoords":63,"./touchInput":64}],58:[function(require,module,exports){
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
        var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

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

},{"../array/array":1,"../events/emitter":40,"./keyboard":59}],59:[function(require,module,exports){
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

},{}],60:[function(require,module,exports){
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

},{"../events/emitter":40}],61:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = mouseLeftWindow;
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

},{}],62:[function(require,module,exports){
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

},{"../events/emitter":40}],63:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = pointerCoords;

var _getPageHeight = require('../dom/getPageHeight');

var _getPageHeight2 = _interopRequireDefault(_getPageHeight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        self.percentY = self.y / (0, _getPageHeight2.default)();
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

},{"../dom/getPageHeight":14}],64:[function(require,module,exports){
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

},{"../events/emitter":40}],65:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = linkedList;
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

},{}],66:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _miniSignals = require('mini-signals');

var _miniSignals2 = _interopRequireDefault(_miniSignals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Loop = function () {
    function Loop() {
        _classCallCheck(this, Loop);

        this.update = this.update.bind(this);
        this.onUpdate = new _miniSignals2.default();

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

    _createClass(Loop, [{
        key: 'start',
        value: function start() {
            if (this.running) {
                return;
            }

            this.running = true;
            this.update();
        }
    }, {
        key: 'stop',
        value: function stop() {
            if (!this.running) {
                return;
            }
            this.last = 0;
            this.running = false;
            window.cancelAnimationFrame(this.raf);
        }
    }, {
        key: 'update',
        value: function update() {
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
        }
    }, {
        key: 'add',
        value: function add(fn, context) {
            return this.onUpdate.add(fn, context);
        }
    }, {
        key: 'remove',
        value: function remove(binding) {
            this.onUpdate.detach(binding);
        }
    }]);

    return Loop;
}();

exports.default = Loop;

},{"mini-signals":113}],67:[function(require,module,exports){
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

},{}],68:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = cerp;
function cerp(from, to) {
    var weight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.3;

    var f = (1 - Math.cos(weight * Math.PI)) / 2;
    return from * (1 - f) + to * f;
}

},{}],69:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = circleDistribution;
function circleDistribution(radius) {
    var origin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { x: 0, y: 0 };
    var p = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { x: 0, y: 0 };

    var r = Math.sqrt(Math.random()) * radius;
    var theta = Math.random() * Math.PI * 2;
    p.x = origin.x + Math.cos(theta) * r;
    p.y = origin.y + Math.sin(theta) * r;
    return p;
}

},{}],70:[function(require,module,exports){
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

},{}],71:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = coinToss;
function coinToss() {
    var heads = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var tails = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    return Math.random() > 0.5 ? heads : tails;
}

},{}],72:[function(require,module,exports){
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

},{}],73:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = degrees;
var DEG = 180 / Math.PI;

function degrees(radians) {
    return radians * DEG;
}

},{}],74:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = difference;
function difference(a, b) {
    return Math.abs(a - b);
}

},{}],75:[function(require,module,exports){
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

},{}],76:[function(require,module,exports){
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

},{}],77:[function(require,module,exports){
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

},{}],78:[function(require,module,exports){
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

},{}],79:[function(require,module,exports){
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

},{}],80:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getOverlapX;
function getOverlapX(aX, aW, bX, bW) {
    return Math.max(0, Math.min(aX + aW, bX + bW) - Math.max(aX, bX));
}

},{}],81:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getOverlapY;
function getOverlapY(aY, aH, bY, bH) {
    return Math.max(0, Math.min(aY + aH, bY + bH) - Math.max(aY, bY));
}

},{}],82:[function(require,module,exports){
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

var _perspective = require('./perspective');

var _perspective2 = _interopRequireDefault(_perspective);

var _quadraticCurve = require('./quadraticCurve');

var _quadraticCurve2 = _interopRequireDefault(_quadraticCurve);

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
    perspective: _perspective2.default,
    quadraticCurve: _quadraticCurve2.default,
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

},{"./angle":67,"./cerp":68,"./circleDistribution":69,"./clamp":70,"./coinToss":71,"./crossProduct2d":72,"./degrees":73,"./difference":74,"./distance":75,"./distanceSq":76,"./dotProduct2d":77,"./getCirclePoints":78,"./getIntersectionArea":79,"./getOverlapX":80,"./getOverlapY":81,"./lerp":83,"./map":84,"./normalize":85,"./orientation":86,"./percentRemaining":87,"./perspective":88,"./quadraticCurve":89,"./radians":90,"./random":91,"./randomInt":92,"./randomSign":93,"./rotatePoint":94,"./rotateToDeg":95,"./rotateToRad":96,"./roundTo":97,"./roundToNearest":98,"./size":99,"./smerp":100,"./smoothstep":101,"./splitValueAndUnit":102,"./weightedAverage":103,"./weightedDistribution":104}],83:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = lerp;
function lerp(from, to) {
    var weight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.3;

    return from + (to - from) * weight;
}

},{}],84:[function(require,module,exports){
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

},{}],85:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = normalize;
function normalize(value, min, max) {
    return (value - min) / (max - min);
}

},{}],86:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = orientation;
function orientation(x, y) {
    return Math.atan2(y, x);
}

},{}],87:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = percentRemaining;
function percentRemaining(value, total) {
    return value % total / total;
}

},{}],88:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = perspective;
// x = x * perspective
// y = y * perspective
// scale = perspective

function perspective(z) {
    var focalLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;

    return focalLength / (focalLength + z);
}

},{}],89:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = quadraticCurve;
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

},{}],90:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = radians;
var RAD = Math.PI / 180;

function radians(degrees) {
    return degrees * RAD;
}

},{}],91:[function(require,module,exports){
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

},{}],92:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = randomInt;
function randomInt(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
}

},{}],93:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = randomSign;
function randomSign() {
    return Math.random() > 0.5 ? -1 : 1;
}

},{}],94:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = rotatePoint;
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

},{}],95:[function(require,module,exports){
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

},{}],96:[function(require,module,exports){
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

},{}],97:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = roundTo;
function roundTo(x) {
    var places = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

    var div = Math.pow(10, places);
    return Math.round(x * div) / div;
}

},{}],98:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = roundToNearest;
function roundToNearest(value, unit) {
    return Math.round(value / unit) * unit;
}

},{}],99:[function(require,module,exports){
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

},{}],100:[function(require,module,exports){
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

},{"./smoothstep":101}],101:[function(require,module,exports){
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

},{"./clamp":70}],102:[function(require,module,exports){
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

},{}],103:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = weightedAverage;
function weightedAverage(from, to) {
    var weight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;

    return (from * (weight - 1) + to) / weight;
}

},{}],104:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = weightedDistribution;

var _random = require('./random');

var _random2 = _interopRequireDefault(_random);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// greater probability of being halfway betweeen min and max

function weightedDistribution(min, max) {
    var weight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;

    var total = 0;
    for (var i = 0; i < weight; i++) {
        total += (0, _random2.default)(min, max);
    }
    return total / weight;
}

},{"./random":91}],105:[function(require,module,exports){
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

},{}],106:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = iOSPlayVideoInline;
function iOSPlayVideoInline(el) {
    var loop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

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

},{}],107:[function(require,module,exports){
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

},{"./cuepointsReader":105,"./iOSPlayVideoInline":106,"./videoPlayer":108,"./vimeo":109,"./youtube":110,"./youtubeBasic":111}],108:[function(require,module,exports){
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

},{"../events/emitter":40}],109:[function(require,module,exports){
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

},{"../events/emitter":40}],110:[function(require,module,exports){
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

},{"events":112}],111:[function(require,module,exports){
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

},{}],112:[function(require,module,exports){
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
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
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

},{}],113:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var MiniSignalBinding = (function () {
  function MiniSignalBinding(fn, once, thisArg) {
    if (once === undefined) once = false;

    _classCallCheck(this, MiniSignalBinding);

    this._fn = fn;
    this._once = once;
    this._thisArg = thisArg;
    this._next = this._prev = this._owner = null;
  }

  _createClass(MiniSignalBinding, [{
    key: 'detach',
    value: function detach() {
      if (this._owner === null) return false;
      this._owner.detach(this);
      return true;
    }
  }]);

  return MiniSignalBinding;
})();

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

var MiniSignal = (function () {
  function MiniSignal() {
    _classCallCheck(this, MiniSignal);

    this._head = this._tail = undefined;
  }

  _createClass(MiniSignal, [{
    key: 'handlers',
    value: function handlers() {
      var exists = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

      var node = this._head;

      if (exists) return !!node;

      var ee = [];

      while (node) {
        ee.push(node);
        node = node._next;
      }

      return ee;
    }
  }, {
    key: 'has',
    value: function has(node) {
      if (!(node instanceof MiniSignalBinding)) {
        throw new Error('MiniSignal#has(): First arg must be a MiniSignalBinding object.');
      }

      return node._owner === this;
    }
  }, {
    key: 'dispatch',
    value: function dispatch() {
      var node = this._head;

      if (!node) return false;

      while (node) {
        if (node._once) this.detach(node);
        node._fn.apply(node._thisArg, arguments);
        node = node._next;
      }

      return true;
    }
  }, {
    key: 'add',
    value: function add(fn) {
      var thisArg = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      if (typeof fn !== 'function') {
        throw new Error('MiniSignal#add(): First arg must be a Function.');
      }
      return _addMiniSignalBinding(this, new MiniSignalBinding(fn, false, thisArg));
    }
  }, {
    key: 'once',
    value: function once(fn) {
      var thisArg = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      if (typeof fn !== 'function') {
        throw new Error('MiniSignal#once(): First arg must be a Function.');
      }
      return _addMiniSignalBinding(this, new MiniSignalBinding(fn, true, thisArg));
    }
  }, {
    key: 'detach',
    value: function detach(node) {
      if (!(node instanceof MiniSignalBinding)) {
        throw new Error('MiniSignal#detach(): First arg must be a MiniSignalBinding object.');
      }
      if (node._owner !== this) return this;

      if (node._prev) node._prev._next = node._next;
      if (node._next) node._next._prev = node._prev;

      if (node === this._head) {
        this._head = node._next;
        if (node._next === null) {
          this._tail = null;
        }
      } else if (node === this._tail) {
        this._tail = node._prev;
        this._tail._next = null;
      }

      node._owner = null;
      return this;
    }
  }, {
    key: 'detachAll',
    value: function detachAll() {
      var node = this._head;
      if (!node) return this;

      this._head = this._tail = null;

      while (node) {
        node._owner = null;
        node = node._next;
      }
      return this;
    }
  }]);

  return MiniSignal;
})();

MiniSignal.MiniSignalBinding = MiniSignalBinding;

exports['default'] = MiniSignal;
module.exports = exports['default'];

},{}],114:[function(require,module,exports){
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

},{}],115:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = clone;
function clone(ob) {
    return JSON.parse(JSON.stringify(ob));
}

},{}],116:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = filter;
function filter(ob, predicate) {
    return Object.keys(ob).filter(function (key) {
        return predicate(key, ob[key]);
    }).reduce(function (newOb, key) {
        newOb[key] = ob[key];
        return newOb;
    }, {});
}

},{}],117:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _clone = require('./clone');

var _clone2 = _interopRequireDefault(_clone);

var _filter = require('./filter');

var _filter2 = _interopRequireDefault(_filter);

var _map = require('./map');

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    clone: _clone2.default,
    filter: _filter2.default,
    map: _map2.default
};

},{"./clone":115,"./filter":116,"./map":118}],118:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = map;
function map(ob, fn) {
    return Object.keys(ob).reduce(function (newOb, key) {
        newOb[key] = fn(key, ob[key]);
        return newOb;
    }, {});
}

},{}],119:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var abs = Math.abs,
    atan2 = Math.atan2,
    cos = Math.cos,
    sin = Math.sin,
    sqrt = Math.sqrt;

var Particle = function () {
    function Particle(options) {
        _classCallCheck(this, Particle);

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

    _createClass(Particle, [{
        key: 'reset',
        value: function reset(options) {
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

            this.vx = cos(angle) * speed;
            this.vy = sin(angle) * speed;

            return this;
        }
    }, {
        key: 'update',
        value: function update() {
            this.vx *= this.friction;
            this.vy *= this.friction;
            this.vy += this.gravity;
            this.x += this.vx;
            this.y += this.vy;
            return this;
        }
    }, {
        key: 'accellerate',
        value: function accellerate(speed, angle) {
            if (typeof angle === 'undefined') {
                angle = this.angle;
            }
            this.vx += cos(angle) * speed;
            this.vy += sin(angle) * speed;
            return this;
        }
    }, {
        key: 'setBounds',
        value: function setBounds(x, y, width, height) {
            this._bounds.x = x || 0;
            this._bounds.y = y || 0;
            this._bounds.width = width;
            this._bounds.height = height;
        }
    }, {
        key: 'angleTo',
        value: function angleTo(p) {
            return atan2(p.y - this.y, p.x - this.x);
        }
    }, {
        key: 'distanceTo',
        value: function distanceTo(p) {
            var dx = p.x - this.x;
            var dy = p.y - this.y;
            return sqrt(dx * dx + dy * dy);
        }
    }, {
        key: 'moveTo',
        value: function moveTo(p) {
            var thrust = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.005;

            var dx = p.x - this.x;
            var dy = p.y - this.y;

            this.vx += dx * thrust;
            this.vy += dy * thrust;

            if (abs(this.vx) > abs(dx)) {
                this.vx = dx;
            }

            if (abs(this.vy) > abs(dy)) {
                this.vy = dy;
            }

            return this;
        }
    }, {
        key: 'gravitateTo',
        value: function gravitateTo(p) {
            var dx = p.x - this.x;
            var dy = p.y - this.y;
            var distSq = dx * dx + dy * dy;
            if (distSq > 0) {
                var dist = sqrt(distSq);
                var force = p.mass / distSq;
                var ax = dx / dist * force;
                var ay = dy / dist * force;
                this.vx += ax;
                this.vy += ay;
            }

            return this;
        }
    }, {
        key: 'springTo',
        value: function springTo(p, stiffness, length) {
            var dx = p.x - this.x;
            var dy = p.y - this.y;
            var distance = sqrt(dx * dx + dy * dy);
            var force = (distance - (length || 0)) * (stiffness || 0.2);

            if (abs(distance * force) > 0) {
                this.vx += dx / distance * force;
                this.vy += dy / distance * force;
            }

            return this;
        }
    }, {
        key: 'collides',
        value: function collides(p) {
            return this.distanceTo(p) <= this.radius + p.radius;
        }
    }, {
        key: 'edgeCollide',
        value: function edgeCollide() {
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
        }
    }, {
        key: 'edgeWrap',
        value: function edgeWrap() {
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
        }
    }, {
        key: 'edgeKill',
        value: function edgeKill() {
            var _outerBounds2 = this.outerBounds,
                left = _outerBounds2.left,
                right = _outerBounds2.right,
                top = _outerBounds2.top,
                bottom = _outerBounds2.bottom;


            if (this.x < left || this.x > right || this.y < top || this.y > bottom) {
                this.alive = false;
            }
        }
    }, {
        key: 'edgeReset',
        value: function edgeReset() {
            var _outerBounds3 = this.outerBounds,
                left = _outerBounds3.left,
                right = _outerBounds3.right,
                top = _outerBounds3.top,
                bottom = _outerBounds3.bottom;


            if (this.x < left || this.x > right || this.y < top || this.y > bottom) {
                this.reset();
            }
        }
    }, {
        key: 'lifeKill',
        value: function lifeKill() {
            this.lifeTime--;

            if (this.lifeTime <= 0) {
                this.alive = false;
            }
        }
    }, {
        key: 'speed',
        get: function get() {
            if (this.vx === 0 && this.vy === 0) {
                return 0;
            }
            return sqrt(this.vx * this.vx + this.vy * this.vy);
        },
        set: function set(value) {
            var angle = this.angle;
            this.vx = cos(angle) * value;
            this.vy = sin(angle) * value;
        }
    }, {
        key: 'angle',
        get: function get() {
            if (this.vx === 0 && this.vy === 0) {
                return 0;
            }
            return atan2(this.vy, this.vx);
        },
        set: function set(value) {
            var speed = this.speed;
            this.vx = cos(value) * speed;
            this.vy = sin(value) * speed;
        }
    }, {
        key: 'bounds',
        get: function get() {
            return this._bounds;
        },
        set: function set(ob) {
            var x = ob.x,
                y = ob.y,
                width = ob.width,
                height = ob.height;

            this.setBounds(x, y, width, height);
        }
    }, {
        key: 'left',
        get: function get() {
            return this.x - this.radius;
        }
    }, {
        key: 'right',
        get: function get() {
            return this.x + this.radius;
        }
    }, {
        key: 'top',
        get: function get() {
            return this.y - this.radius;
        }
    }, {
        key: 'bottom',
        get: function get() {
            return this.y + this.radius;
        }
    }, {
        key: 'outerBounds',
        get: function get() {
            this._outerBounds.left = this._bounds.x - this.radius;
            this._outerBounds.right = this._bounds.x + this._bounds.width + this.radius;
            this._outerBounds.top = this._bounds.y - this.radius;
            this._outerBounds.bottom = this._bounds.y + this._bounds.height + this.radius;
            return this._outerBounds;
        }
    }]);

    return Particle;
}();

exports.default = Particle;

},{}],120:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = androidNative;

var _android = require('./android');

var _android2 = _interopRequireDefault(_android);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//http://stackoverflow.com/questions/14403766/how-to-detect-the-stock-android-browser
function androidNative() {
    var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator.userAgent;

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

},{"./android":122}],121:[function(require,module,exports){
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
    var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator.userAgent;

    if (!(0, _android2.default)(ua)) {
        return 0;
    }
    var version = ua.match(/Android (\d+(?:\.\d+)+);/)[1];

    var _version$split = version.split('.'),
        _version$split2 = _slicedToArray(_version$split, 2),
        a = _version$split2[0],
        b = _version$split2[1];

    return parseFloat(a + '.' + b);
}

},{"./android":122}],122:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator.userAgent;
  return (/Android/i.test(ua)
  );
};

},{}],123:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ios = require('./ios');

var _ios2 = _interopRequireDefault(_ios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator.userAgent;
  return (0, _ios2.default)(ua) && /CriOS/.test(ua);
};

},{"./ios":131}],124:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mobile = require('./mobile');

var _mobile2 = _interopRequireDefault(_mobile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator.userAgent;
  return !(0, _mobile2.default)(ua);
};

},{"./mobile":137}],125:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return !!window.DeviceOrientationEvent;
};

},{}],126:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator.userAgent;
  return (/Firefox/.test(ua)
  );
};

},{}],127:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = ieVersion;
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

},{}],128:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ieVersion = require('./ie-version');

var _ieVersion2 = _interopRequireDefault(_ieVersion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator.userAgent;
  return (0, _ieVersion2.default)(ua) > 0;
};

},{"./ie-version":127}],129:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _android = require('./android');

var _android2 = _interopRequireDefault(_android);

var _androidNative = require('./android-native');

var _androidNative2 = _interopRequireDefault(_androidNative);

var _androidVersion = require('./android-version');

var _androidVersion2 = _interopRequireDefault(_androidVersion);

var _chromeIos = require('./chrome-ios');

var _chromeIos2 = _interopRequireDefault(_chromeIos);

var _desktop = require('./desktop');

var _desktop2 = _interopRequireDefault(_desktop);

var _deviceOrientation = require('./device-orientation');

var _deviceOrientation2 = _interopRequireDefault(_deviceOrientation);

var _firefox = require('./firefox');

var _firefox2 = _interopRequireDefault(_firefox);

var _ie = require('./ie');

var _ie2 = _interopRequireDefault(_ie);

var _ieVersion = require('./ie-version');

var _ieVersion2 = _interopRequireDefault(_ieVersion);

var _ios = require('./ios');

var _ios2 = _interopRequireDefault(_ios);

var _iosVersion = require('./ios-version');

var _iosVersion2 = _interopRequireDefault(_iosVersion);

var _ipad = require('./ipad');

var _ipad2 = _interopRequireDefault(_ipad);

var _iphone = require('./iphone');

var _iphone2 = _interopRequireDefault(_iphone);

var _linux = require('./linux');

var _linux2 = _interopRequireDefault(_linux);

var _localHost = require('./local-host');

var _localHost2 = _interopRequireDefault(_localHost);

var _mac = require('./mac');

var _mac2 = _interopRequireDefault(_mac);

var _mobile = require('./mobile');

var _mobile2 = _interopRequireDefault(_mobile);

var _mp = require('./mp4');

var _mp2 = _interopRequireDefault(_mp);

var _safari = require('./safari');

var _safari2 = _interopRequireDefault(_safari);

var _safariIos = require('./safari-ios');

var _safariIos2 = _interopRequireDefault(_safariIos);

var _screen = require('./screen');

var _screen2 = _interopRequireDefault(_screen);

var _webgl = require('./webgl');

var _webgl2 = _interopRequireDefault(_webgl);

var _webm = require('./webm');

var _webm2 = _interopRequireDefault(_webm);

var _windows = require('./windows');

var _windows2 = _interopRequireDefault(_windows);

var _windowsPhone = require('./windows-phone');

var _windowsPhone2 = _interopRequireDefault(_windowsPhone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    android: (0, _android2.default)(),
    androidNative: (0, _androidNative2.default)(),
    androidVersion: (0, _androidVersion2.default)(),
    chromeIOS: (0, _chromeIos2.default)(),
    desktop: (0, _desktop2.default)(),
    deviceOrientation: (0, _deviceOrientation2.default)(),
    firefox: (0, _firefox2.default)(),
    ie: (0, _ie2.default)(),
    ieVersion: (0, _ieVersion2.default)(),
    ios: (0, _ios2.default)(),
    iosVersion: (0, _iosVersion2.default)(),
    ipad: (0, _ipad2.default)(),
    iphone: (0, _iphone2.default)(),
    linux: (0, _linux2.default)(),
    localHost: (0, _localHost2.default)(),
    mac: (0, _mac2.default)(),
    mobile: (0, _mobile2.default)(),
    mp4: (0, _mp2.default)(),
    safari: (0, _safari2.default)(),
    safariIOS: (0, _safariIos2.default)(),
    screen: _screen2.default,
    webgl: (0, _webgl2.default)(),
    webm: (0, _webm2.default)(),
    windows: (0, _windows2.default)(),
    windowsPhone: (0, _windowsPhone2.default)()
};

},{"./android":122,"./android-native":120,"./android-version":121,"./chrome-ios":123,"./desktop":124,"./device-orientation":125,"./firefox":126,"./ie":128,"./ie-version":127,"./ios":131,"./ios-version":130,"./ipad":132,"./iphone":133,"./linux":134,"./local-host":135,"./mac":136,"./mobile":137,"./mp4":138,"./safari":140,"./safari-ios":139,"./screen":141,"./webgl":142,"./webm":143,"./windows":145,"./windows-phone":144}],130:[function(require,module,exports){
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
    var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator.userAgent;

    if ((0, _ios2.default)(ua)) {
        var _ua$match = ua.match(/OS (\d+)_(\d+)/i),
            _ua$match2 = _slicedToArray(_ua$match, 3),
            b = _ua$match2[1],
            c = _ua$match2[2];

        if (b && c) {
            return parseFloat(b + '.' + c);
        }
    }
    return 0;
}

},{"./ios":131}],131:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator.userAgent;
  return (/iP[ao]d|iPhone/i.test(ua)
  );
};

},{}],132:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator.userAgent;
  return (/iPad/i.test(ua)
  );
};

},{}],133:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator.userAgent;
  return (/iPod|iPhone/i.test(ua)
  );
};

},{}],134:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _android = require('./android');

var _android2 = _interopRequireDefault(_android);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator.userAgent;
  return !(0, _android2.default)(ua) && /Linux/.test(ua);
};

},{"./android":122}],135:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return (/^(?:https?:\/\/)?(?:localhost|192\.168)/.test(window.location.href)
  );
};

},{}],136:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ios = require('./ios');

var _ios2 = _interopRequireDefault(_ios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator.userAgent;
  return !(0, _ios2.default)(ua) && /Mac OS/.test(ua);
};

},{"./ios":131}],137:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator.userAgent;
  return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|SymbianOS/i.test(ua)
  );
};

},{}],138:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var videoEl = document.createElement('video');

exports.default = function () {
  return !!(videoEl.canPlayType && videoEl.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"'));
};

},{}],139:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ios = require('./ios');

var _ios2 = _interopRequireDefault(_ios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator.userAgent;
  return (0, _ios2.default)(ua) && /AppleWebKit/.test(ua);
};

},{"./ios":131}],140:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator.userAgent;
  return !/Android/.test(ua) && !/Chrome/.test(ua) && /Safari/.test(ua);
};

},{}],141:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    width: Math.max(window.outerWidth, window.screen.width),
    height: Math.max(window.outerHeight, window.screen.height),
    dpr: window.devicePixelRatio || 1,
    retina: window.devicePixelRatio > 1
};

},{}],142:[function(require,module,exports){
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

},{}],143:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var videoEl = document.createElement('video');

exports.default = function () {
  return !!(videoEl.canPlayType && videoEl.canPlayType('video/webm; codecs="vp8, vorbis"'));
};

},{}],144:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator.userAgent;
  return (/Windows Phone/i.test(ua)
  );
};

},{}],145:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _windowsPhone = require('./windows-phone');

var _windowsPhone2 = _interopRequireDefault(_windowsPhone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator.userAgent;
  return !(0, _windowsPhone2.default)(ua) && /Windows/.test(ua);
};

},{"./windows-phone":144}],146:[function(require,module,exports){
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

},{}],147:[function(require,module,exports){
'use strict';

(function (fn) {
    window.console = window.console || {};
    var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'memory', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'timeline', 'timelineEnd', 'trace', 'warn'];
    methods.forEach(function (name) {
        window.console[name] = window.console[name] || fn;
    });
})(function () {});

},{}],148:[function(require,module,exports){
'use strict';

require('./classList');

require('./console');

require('./requestAnimationFrame');

},{"./classList":146,"./console":147,"./requestAnimationFrame":149}],149:[function(require,module,exports){
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

},{}],150:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = popup;
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

},{}],151:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Node = function () {
    function Node(bounds, depth, maxDepth, maxChildren) {
        _classCallCheck(this, Node);

        this._bounds = bounds;
        this._depth = depth;
        this._maxDepth = maxDepth;
        this._maxChildren = maxChildren;

        this.children = [];
        this.nodes = [];
    }

    _createClass(Node, [{
        key: "insert",
        value: function insert(item) {
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
        }
    }, {
        key: "retrieve",
        value: function retrieve(item) {
            if (this.nodes.length) {
                var index = this._findIndex(item);
                return this.nodes[index].retrieve(item);
            }

            return this.children;
        }
    }, {
        key: "_findIndex",
        value: function _findIndex(item) {
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
        }
    }, {
        key: "subdivide",
        value: function subdivide() {
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
        }
    }, {
        key: "clear",
        value: function clear() {
            this.children.length = 0;

            while (this.nodes.length) {
                this.nodes.pop().clear();
            }
        }
    }]);

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

        _classCallCheck(this, QuadTree);

        this.root = new Node(bounds, 0, maxDepth, maxChildren);
    }

    _createClass(QuadTree, [{
        key: "insert",
        value: function insert(item) {
            if (Array.isArray(item)) {
                for (var i = 0; i < item.length; i++) {
                    this.root.insert(item[i]);
                }
            } else {
                this.root.insert(item);
            }
        }
    }, {
        key: "clear",
        value: function clear() {
            this.root.clear();
        }
    }, {
        key: "retrieve",
        value: function retrieve(item) {
            return this.root.retrieve(item);
        }
    }]);

    return QuadTree;
}();

exports.default = QuadTree;

},{}],152:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = email;

var _popup = require('../popup');

var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function email(url) {
    var subject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var body = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    url = encodeURIComponent(url);
    subject = encodeURIComponent(subject);

    var newlines = encodeURIComponent('\r\n\r\n');
    body = body ? '' + encodeURIComponent(body) + newlines : '';

    return (0, _popup2.default)('mailto:?subject=' + subject + '&body=' + body + url);
}

},{"../popup":150}],153:[function(require,module,exports){
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

},{"../popup":150}],154:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = facebookFeedDialog;

var _popup = require('../popup');

var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function facebookFeedDialog(appId, redirect, url) {
    var title = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    var image = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
    var caption = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '';
    var desc = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : '';
    var source = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : '';

    title = encodeURIComponent(title);
    caption = encodeURIComponent(caption);
    desc = encodeURIComponent(desc);

    var params = '?display=popup&show_error=true&app_id=' + appId + '&source=' + source + '&redirect_uri=' + redirect;
    var content = 'name=' + title + '&link=' + url + '&caption=' + caption + '&description=' + desc + '&picture=' + image;

    return (0, _popup2.default)('https://www.facebook.com/dialog/feed?' + params + '&' + content);
}

},{"../popup":150}],155:[function(require,module,exports){
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

},{"../popup":150}],156:[function(require,module,exports){
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

},{"./email":152,"./facebook":153,"./facebookFeedDialog":154,"./googleplus":155,"./linkedin":157,"./pinterest":158,"./reddit":159,"./renren":160,"./sms":161,"./twitter":162,"./vkontakte":163,"./weibo":164,"./whatsapp":165}],157:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = linkedin;

var _popup = require('../popup');

var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function linkedin(url) {
    var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    url = encodeURIComponent(url);
    title = encodeURIComponent(title);
    return (0, _popup2.default)('https://www.linkedin.com/shareArticle?mini=true&url=' + url + '&title=' + title);
}

},{"../popup":150}],158:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = pinterest;

var _popup = require('../popup');

var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function pinterest(url, media) {
    var desc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    url = encodeURIComponent(url);
    media = encodeURIComponent(media);
    desc = encodeURIComponent(desc);
    return (0, _popup2.default)('https://pinterest.com/pin/create/button/?url=' + url + '&media=' + media + '&description=' + desc);
}

},{"../popup":150}],159:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = reddit;

var _popup = require('../popup');

var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function reddit(url) {
    var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    url = encodeURIComponent(url);
    title = encodeURIComponent(title);
    return (0, _popup2.default)('https://www.reddit.com/submit?url=' + url + '&title=' + title);
}

},{"../popup":150}],160:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = vkontakte;

var _popup = require('../popup');

var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function vkontakte(url) {
    var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    url = encodeURIComponent(url);
    title = encodeURIComponent(title);
    return (0, _popup2.default)('http://share.renren.com/share/buttonshare.do?link=' + url + '&title=' + title);
}

},{"../popup":150}],161:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = sms;
function sms(url) {
    var body = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    url = encodeURIComponent(url);

    var newlines = encodeURIComponent('\r\n\r\n');
    body = body ? '' + encodeURIComponent(body) + newlines : '';

    var ios = /iP[ao]d|iPhone/i.test(navigator.userAgent);
    var delim = ios ? '&' : '?';

    window.location.href = 'sms:' + delim + 'body=' + body + url;
}

},{}],162:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = twitter;

var _popup = require('../popup');

var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function twitter(url) {
    var text = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var hashtags = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var related = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

    url = encodeURIComponent(url);
    text = encodeURIComponent(text);
    hashtags = encodeURIComponent(hashtags);
    related = encodeURIComponent(related);

    return (0, _popup2.default)('https://twitter.com/intent/tweet?url=' + url + '&text=' + text + '&hashtags=' + hashtags + '&related=' + related);
}

},{"../popup":150}],163:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = vkontakte;

var _popup = require('../popup');

var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function vkontakte(url) {
    var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var description = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var image = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

    url = encodeURIComponent(url);
    title = encodeURIComponent(title);
    description = encodeURIComponent(description);
    image = encodeURIComponent(image);
    return (0, _popup2.default)('http://vkontakte.ru/share.php?url=' + url + '&title=' + title + '&description=' + description + '&image=' + image);
}

},{"../popup":150}],164:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = weibo;

var _popup = require('../popup');

var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function weibo(url) {
    var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var image = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    url = encodeURIComponent(url);
    title = encodeURIComponent(title);
    image = encodeURIComponent(image);

    var params = 'url=' + url + '&appkey=&title=' + title + '&pic=' + image + '&ralateUid=&language=zh_cn';
    return (0, _popup2.default)('http://service.weibo.com/share/share.php?' + params);
}

},{"../popup":150}],165:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = whatsapp;
function whatsapp(url) {
    var body = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    url = encodeURIComponent(url);

    var newlines = encodeURIComponent('\r\n\r\n');
    body = body ? '' + encodeURIComponent(body) + newlines : '';

    window.location.href = 'whatsapp://send?text=' + body + url;
}

},{}],166:[function(require,module,exports){
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

exports.default = { load: load, save: save, loadJSON: loadJSON, saveJSON: saveJSON, remove: remove };

},{}],167:[function(require,module,exports){
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

},{}],168:[function(require,module,exports){
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

},{}],169:[function(require,module,exports){
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

},{}],170:[function(require,module,exports){
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

},{}],171:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = beginsWith;
// whether str begins with substr
function beginsWith(str, substr) {
    return str.indexOf(substr) === 0;
}

},{}],172:[function(require,module,exports){
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

},{}],173:[function(require,module,exports){
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
    var delim = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '.';

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

},{"./escapePattern":179,"./truncate":196}],174:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = capitalize;
// Capitalize the first word in a string or all words
function capitalize(str) {
    var all = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var substr = str.trimLeft();
    var re = all ? /^.|\b./g : /(^\w)/;
    return substr.replace(re, function (match) {
        return match.toUpperCase();
    });
}

},{}],175:[function(require,module,exports){
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

},{"./escapePattern":179}],176:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = editDistance;
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

},{}],177:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = endsWith;
// whether str ends with substr
function endsWith(str, substr) {
    return str.lastIndexOf(substr) === str.length - substr.length;
}

},{}],178:[function(require,module,exports){
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

},{}],179:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = escapePattern;
// regex escape pattern
function escapePattern(pattern) {
    return pattern.replace(/(\]|\[|\{|\}|\(|\)|\*|\+|\?|\.|\\)/g, '\\$1');
}

},{}],180:[function(require,module,exports){
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

},{"./removeExtraWhitespace":188}],181:[function(require,module,exports){
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

},{"./afterFirst":167,"./afterLast":168,"./beforeFirst":169,"./beforeLast":170,"./beginsWith":171,"./between":172,"./block":173,"./capitalize":174,"./countOf":175,"./editDistance":176,"./endsWith":177,"./escapeHTML":178,"./escapePattern":179,"./hasText":180,"./isNumeric":182,"./padLeft":183,"./padRight":184,"./preventWidow":185,"./properCase":186,"./remove":187,"./removeExtraWhitespace":188,"./reverse":189,"./reverseWords":190,"./similarity":191,"./stripTags":192,"./swapCase":193,"./timeCode":194,"./toNumber":195,"./truncate":196,"./wordCount":197}],182:[function(require,module,exports){
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

},{}],183:[function(require,module,exports){
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

},{}],184:[function(require,module,exports){
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

},{}],185:[function(require,module,exports){
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

},{}],186:[function(require,module,exports){
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

},{"./capitalize":174}],187:[function(require,module,exports){
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
    var caseSensitive = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var escapedStr = (0, _escapePattern2.default)(substr);
    var flags = caseSensitive ? 'g' : 'ig';
    return str.replace(new RegExp(escapedStr, flags), '');
}

},{"./escapePattern":179}],188:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = removeExtraWhitespace;
// remove extra whitespace (extra spaces, tabs, line breaks, etc)
function removeExtraWhitespace(str) {
    return str.trim().replace(/\s+/g, ' ');
}

},{}],189:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = reverse;
// reverse character order
function reverse(str) {
    return str.split('').reverse().join('');
}

},{}],190:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = reverseWords;
// reverse word order
function reverseWords(str) {
    return str.split(' ').reverse().join(' ');
}

},{}],191:[function(require,module,exports){
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

},{"./editDistance":176}],192:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = stripTags;
// remove all HTML tags from str
function stripTags(str) {
    return str.replace(/<\/?[^>]+>/igm, '');
}

},{}],193:[function(require,module,exports){
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

},{}],194:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = timeCode;
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

},{}],195:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = toNumber;
function toNumber(str) {
    return Number(str.replace(/[^0-9.]/g, ''));
}

},{}],196:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = truncate;
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

},{}],197:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = wordCount;
// the number of words in a string
function wordCount(str) {
    return str.match(/\b\w+\b/g).length;
}

},{}],198:[function(require,module,exports){
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

},{}],199:[function(require,module,exports){
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

},{"./event":198,"./load":200,"./pageview":201}],200:[function(require,module,exports){
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

},{}],201:[function(require,module,exports){
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

},{}],202:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _quad = require('../ease/quad');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tween = function () {
    function Tween(ob, props, duration, options) {
        _classCallCheck(this, Tween);

        this.ob = ob;

        if (props) {
            this.to(props, duration, options);
        }
    }

    _createClass(Tween, [{
        key: 'to',
        value: function to(props, duration) {
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            this.duration = duration;
            this.ease = options.ease || _quad.easeOutQuad;
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
        }
    }, {
        key: 'update',
        value: function update(dt) {
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
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.time = 0;
            this.complete = false;
        }
    }]);

    return Tween;
}();

exports.default = Tween;

},{"../ease/quad":34}],203:[function(require,module,exports){
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

},{}],204:[function(require,module,exports){
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

},{"../events/emitter":40,"./api":203}]},{},[55])(55)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcnJheS9hcnJheS5qcyIsImFycmF5L2Nsb25lLmpzIiwiYXJyYXkvaW5kZXguanMiLCJhcnJheS9tb3ZlRWxlbWVudC5qcyIsImFycmF5L25lYXJlc3QuanMiLCJhcnJheS9yYW5kb21DaG9pY2UuanMiLCJhcnJheS9zb3J0QWxwaGEuanMiLCJhcnJheS9zb3J0TnVtYmVyZWQuanMiLCJhcnJheS9zb3J0TnVtZXJpYy5qcyIsImFycmF5L3NvcnRSYW5kb20uanMiLCJkb20vYmxvY2tTY3JvbGxpbmcuanMiLCJkb20vZWxDb29yZHMuanMiLCJkb20vZm9yY2VSZWRyYXcuanMiLCJkb20vZ2V0UGFnZUhlaWdodC5qcyIsImRvbS9nZXRTY3JvbGxQZXJjZW50YWdlLmpzIiwiZG9tL2dldFNjcm9sbFJlbWFpbmluZy5qcyIsImRvbS9nZXRTY3JvbGxUb3AuanMiLCJkb20vZ2V0U3Jjc2V0SW1hZ2UuanMiLCJkb20vaW5kZXguanMiLCJkb20vaXNFbGVtZW50SW5WaWV3cG9ydC5qcyIsImRvbS9pc1BhZ2VFbmQuanMiLCJkb20vcmVzaXplLmpzIiwiZG9tL3Njcm9sbC5qcyIsImRvbS9zZXRTdHlsZS5qcyIsImRvbS90cmFuc2l0aW9uRW5kLmpzIiwiZWFzZS9iYWNrLmpzIiwiZWFzZS9ib3VuY2UuanMiLCJlYXNlL2NpcmN1bGFyLmpzIiwiZWFzZS9jdWJpYy5qcyIsImVhc2UvZWxhc3RpYy5qcyIsImVhc2UvZXhwby5qcyIsImVhc2UvaW5kZXguanMiLCJlYXNlL2xpbmVhci5qcyIsImVhc2UvcXVhZC5qcyIsImVhc2UvcXVhcnQuanMiLCJlYXNlL3F1aW50LmpzIiwiZWFzZS9zaW5lLmpzIiwiZXZlbnRzL2RlYm91bmNlLmpzIiwiZXZlbnRzL2RlbGVnYXRlRXZlbnRzLmpzIiwiZXZlbnRzL2VtaXR0ZXIuanMiLCJldmVudHMvZXZlbnRCdXMuanMiLCJldmVudHMvaGVhcnRiZWF0LmpzIiwiZXZlbnRzL2luZGV4LmpzIiwiZnBzL2luZGV4LmpzIiwiZnVsbHNjcmVlbi9hcGkuanMiLCJmdWxsc2NyZWVuL2luZGV4LmpzIiwiZ3JhcGhpY3MvaW5kZXguanMiLCJndWkvaW5kZXguanMiLCJodHRwL2dldExvY2F0aW9uLmpzIiwiaHR0cC9pbmRleC5qcyIsImh0dHAvanNvbnAuanMiLCJodHRwL2xvYWRTY3JpcHQuanMiLCJodHRwL3VybFBhcmFtcy5qcyIsImh0dHAveGhyLmpzIiwiaW5kZXguanMiLCJpbnB1dC9jbGlja091dHNpZGUuanMiLCJpbnB1dC9pbmRleC5qcyIsImlucHV0L2tleUlucHV0LmpzIiwiaW5wdXQva2V5Ym9hcmQuanMiLCJpbnB1dC9taWNyb3Bob25lLmpzIiwiaW5wdXQvbW91c2VMZWZ0V2luZG93LmpzIiwiaW5wdXQvbW91c2VXaGVlbC5qcyIsImlucHV0L3BvaW50ZXJDb29yZHMuanMiLCJpbnB1dC90b3VjaElucHV0LmpzIiwibGlua2VkLWxpc3QvaW5kZXguanMiLCJsb29wL2luZGV4LmpzIiwibWF0aC9hbmdsZS5qcyIsIm1hdGgvY2VycC5qcyIsIm1hdGgvY2lyY2xlRGlzdHJpYnV0aW9uLmpzIiwibWF0aC9jbGFtcC5qcyIsIm1hdGgvY29pblRvc3MuanMiLCJtYXRoL2Nyb3NzUHJvZHVjdDJkLmpzIiwibWF0aC9kZWdyZWVzLmpzIiwibWF0aC9kaWZmZXJlbmNlLmpzIiwibWF0aC9kaXN0YW5jZS5qcyIsIm1hdGgvZGlzdGFuY2VTcS5qcyIsIm1hdGgvZG90UHJvZHVjdDJkLmpzIiwibWF0aC9nZXRDaXJjbGVQb2ludHMuanMiLCJtYXRoL2dldEludGVyc2VjdGlvbkFyZWEuanMiLCJtYXRoL2dldE92ZXJsYXBYLmpzIiwibWF0aC9nZXRPdmVybGFwWS5qcyIsIm1hdGgvaW5kZXguanMiLCJtYXRoL2xlcnAuanMiLCJtYXRoL21hcC5qcyIsIm1hdGgvbm9ybWFsaXplLmpzIiwibWF0aC9vcmllbnRhdGlvbi5qcyIsIm1hdGgvcGVyY2VudFJlbWFpbmluZy5qcyIsIm1hdGgvcGVyc3BlY3RpdmUuanMiLCJtYXRoL3F1YWRyYXRpY0N1cnZlLmpzIiwibWF0aC9yYWRpYW5zLmpzIiwibWF0aC9yYW5kb20uanMiLCJtYXRoL3JhbmRvbUludC5qcyIsIm1hdGgvcmFuZG9tU2lnbi5qcyIsIm1hdGgvcm90YXRlUG9pbnQuanMiLCJtYXRoL3JvdGF0ZVRvRGVnLmpzIiwibWF0aC9yb3RhdGVUb1JhZC5qcyIsIm1hdGgvcm91bmRUby5qcyIsIm1hdGgvcm91bmRUb05lYXJlc3QuanMiLCJtYXRoL3NpemUuanMiLCJtYXRoL3NtZXJwLmpzIiwibWF0aC9zbW9vdGhzdGVwLmpzIiwibWF0aC9zcGxpdFZhbHVlQW5kVW5pdC5qcyIsIm1hdGgvd2VpZ2h0ZWRBdmVyYWdlLmpzIiwibWF0aC93ZWlnaHRlZERpc3RyaWJ1dGlvbi5qcyIsIm1lZGlhL2N1ZXBvaW50c1JlYWRlci5qcyIsIm1lZGlhL2lPU1BsYXlWaWRlb0lubGluZS5qcyIsIm1lZGlhL2luZGV4LmpzIiwibWVkaWEvdmlkZW9QbGF5ZXIuanMiLCJtZWRpYS92aW1lby5qcyIsIm1lZGlhL3lvdXR1YmUuanMiLCJtZWRpYS95b3V0dWJlQmFzaWMuanMiLCJub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsIm5vZGVfbW9kdWxlcy9taW5pLXNpZ25hbHMvbGliL21pbmktc2lnbmFscy5qcyIsIm9iamVjdC1wb29sL2luZGV4LmpzIiwib2JqZWN0L2Nsb25lLmpzIiwib2JqZWN0L2ZpbHRlci5qcyIsIm9iamVjdC9pbmRleC5qcyIsIm9iamVjdC9tYXAuanMiLCJwYXJ0aWNsZS9pbmRleC5qcyIsInBsYXRmb3JtL2FuZHJvaWQtbmF0aXZlLmpzIiwicGxhdGZvcm0vYW5kcm9pZC12ZXJzaW9uLmpzIiwicGxhdGZvcm0vYW5kcm9pZC5qcyIsInBsYXRmb3JtL2Nocm9tZS1pb3MuanMiLCJwbGF0Zm9ybS9kZXNrdG9wLmpzIiwicGxhdGZvcm0vZGV2aWNlLW9yaWVudGF0aW9uLmpzIiwicGxhdGZvcm0vZmlyZWZveC5qcyIsInBsYXRmb3JtL2llLXZlcnNpb24uanMiLCJwbGF0Zm9ybS9pZS5qcyIsInBsYXRmb3JtL2luZGV4LmpzIiwicGxhdGZvcm0vaW9zLXZlcnNpb24uanMiLCJwbGF0Zm9ybS9pb3MuanMiLCJwbGF0Zm9ybS9pcGFkLmpzIiwicGxhdGZvcm0vaXBob25lLmpzIiwicGxhdGZvcm0vbGludXguanMiLCJwbGF0Zm9ybS9sb2NhbC1ob3N0LmpzIiwicGxhdGZvcm0vbWFjLmpzIiwicGxhdGZvcm0vbW9iaWxlLmpzIiwicGxhdGZvcm0vbXA0LmpzIiwicGxhdGZvcm0vc2FmYXJpLWlvcy5qcyIsInBsYXRmb3JtL3NhZmFyaS5qcyIsInBsYXRmb3JtL3NjcmVlbi5qcyIsInBsYXRmb3JtL3dlYmdsLmpzIiwicGxhdGZvcm0vd2VibS5qcyIsInBsYXRmb3JtL3dpbmRvd3MtcGhvbmUuanMiLCJwbGF0Zm9ybS93aW5kb3dzLmpzIiwicG9seWZpbGwvY2xhc3NMaXN0LmpzIiwicG9seWZpbGwvY29uc29sZS5qcyIsInBvbHlmaWxsL2luZGV4LmpzIiwicG9seWZpbGwvcmVxdWVzdEFuaW1hdGlvbkZyYW1lLmpzIiwicG9wdXAvaW5kZXguanMiLCJxdWFkLXRyZWUvaW5kZXguanMiLCJzaGFyZS9lbWFpbC5qcyIsInNoYXJlL2ZhY2Vib29rLmpzIiwic2hhcmUvZmFjZWJvb2tGZWVkRGlhbG9nLmpzIiwic2hhcmUvZ29vZ2xlcGx1cy5qcyIsInNoYXJlL2luZGV4LmpzIiwic2hhcmUvbGlua2VkaW4uanMiLCJzaGFyZS9waW50ZXJlc3QuanMiLCJzaGFyZS9yZWRkaXQuanMiLCJzaGFyZS9yZW5yZW4uanMiLCJzaGFyZS9zbXMuanMiLCJzaGFyZS90d2l0dGVyLmpzIiwic2hhcmUvdmtvbnRha3RlLmpzIiwic2hhcmUvd2VpYm8uanMiLCJzaGFyZS93aGF0c2FwcC5qcyIsInN0b3JhZ2UvaW5kZXguanMiLCJzdHJpbmcvYWZ0ZXJGaXJzdC5qcyIsInN0cmluZy9hZnRlckxhc3QuanMiLCJzdHJpbmcvYmVmb3JlRmlyc3QuanMiLCJzdHJpbmcvYmVmb3JlTGFzdC5qcyIsInN0cmluZy9iZWdpbnNXaXRoLmpzIiwic3RyaW5nL2JldHdlZW4uanMiLCJzdHJpbmcvYmxvY2suanMiLCJzdHJpbmcvY2FwaXRhbGl6ZS5qcyIsInN0cmluZy9jb3VudE9mLmpzIiwic3RyaW5nL2VkaXREaXN0YW5jZS5qcyIsInN0cmluZy9lbmRzV2l0aC5qcyIsInN0cmluZy9lc2NhcGVIVE1MLmpzIiwic3RyaW5nL2VzY2FwZVBhdHRlcm4uanMiLCJzdHJpbmcvaGFzVGV4dC5qcyIsInN0cmluZy9pbmRleC5qcyIsInN0cmluZy9pc051bWVyaWMuanMiLCJzdHJpbmcvcGFkTGVmdC5qcyIsInN0cmluZy9wYWRSaWdodC5qcyIsInN0cmluZy9wcmV2ZW50V2lkb3cuanMiLCJzdHJpbmcvcHJvcGVyQ2FzZS5qcyIsInN0cmluZy9yZW1vdmUuanMiLCJzdHJpbmcvcmVtb3ZlRXh0cmFXaGl0ZXNwYWNlLmpzIiwic3RyaW5nL3JldmVyc2UuanMiLCJzdHJpbmcvcmV2ZXJzZVdvcmRzLmpzIiwic3RyaW5nL3NpbWlsYXJpdHkuanMiLCJzdHJpbmcvc3RyaXBUYWdzLmpzIiwic3RyaW5nL3N3YXBDYXNlLmpzIiwic3RyaW5nL3RpbWVDb2RlLmpzIiwic3RyaW5nL3RvTnVtYmVyLmpzIiwic3RyaW5nL3RydW5jYXRlLmpzIiwic3RyaW5nL3dvcmRDb3VudC5qcyIsInRyYWNrL2V2ZW50LmpzIiwidHJhY2svaW5kZXguanMiLCJ0cmFjay9sb2FkLmpzIiwidHJhY2svcGFnZXZpZXcuanMiLCJ0d2Vlbi9pbmRleC5qcyIsInZpc2liaWxpdHkvYXBpLmpzIiwidmlzaWJpbGl0eS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O2tCQ0F3QixLO0FBQVQsU0FBUyxLQUFULENBQWUsTUFBZixFQUF1QixLQUF2QixFQUE4QjtBQUN6QyxRQUFNLE1BQU0sRUFBWjtBQUNBLFNBQUssSUFBSSxJQUFJLENBQWIsRUFB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O2tCQ3JLd0IsVTtBQUFULFNBQVMsVUFBVCxDQUFvQixTQUFwQixFQUErQjs7QUFFMUMsUUFBSSxPQUFPLEVBQVg7QUFDQSxRQUFJLGFBQWEsQ0FBakI7O0FBRUEsV0FBTztBQUNILGVBREcscUJBQ1E7QUFDUCxtQkFBTyxJQUFQO0FBQ0gsU0FIRTtBQUlILFdBSkcsaUJBSUk7QUFDSCxnQkFBSyxLQUFLLE1BQUwsR0FBYyxDQUFuQixFQUF1QjtBQUNuQix1QkFBTyxLQUFLLEdBQUwsRUFBUDtBQUNILGFBRkQsTUFFTztBQUNIO0FBQ0EsdUJBQU8sV0FBUDtBQUNIO0FBQ0osU0FYRTtBQVlILGVBWkcsbUJBWU0sUUFaTixFQVlnQjtBQUNmLGlCQUFLLElBQUwsQ0FBVSxRQUFWO0FBQ0gsU0FkRTtBQWVILFlBZkcsZ0JBZUcsS0FmSCxFQWVVO0FBQ1QsbUJBQVEsS0FBSyxNQUFMLEdBQWMsS0FBdEIsRUFBOEI7QUFDMUI7QUFDQSxxQkFBSyxLQUFLLE1BQVYsSUFBb0IsV0FBcEI7QUFDSDtBQUNKLFNBcEJFO0FBcUJILGFBckJHLG1CQXFCTTtBQUNMLG1CQUFPLEVBQVA7QUFDSCxTQXZCRTtBQXdCSCxxQkF4QkcsMkJBd0JhO0FBQ1osbUJBQU8sVUFBUDtBQUNIO0FBMUJFLEtBQVA7QUE0Qkg7Ozs7Ozs7O2tCQ2pDdUIsSztBQUFULFNBQVMsS0FBVCxDQUFlLEVBQWYsRUFBbUI7QUFDOUIsV0FBTyxLQUFLLEtBQUwsQ0FBVyxLQUFLLFNBQUwsQ0FBZSxFQUFmLENBQVgsQ0FBUDtBQUNIOzs7Ozs7OztrQkNGdUIsTTtBQUFULFNBQVMsTUFBVCxDQUFnQixFQUFoQixFQUFvQixTQUFwQixFQUErQjtBQUMxQyxXQUFPLE9BQU8sSUFBUCxDQUFZLEVBQVosRUFDRixNQURFLENBQ0s7QUFBQSxlQUFPLFVBQVUsR0FBVixFQUFlLEdBQUcsR0FBSCxDQUFmLENBQVA7QUFBQSxLQURMLEVBRUYsTUFGRSxDQUVLLFVBQUMsS0FBRCxFQUFRLEdBQVIsRUFBZ0I7QUFDcEIsY0FBTSxHQUFOLElBQWEsR0FBRyxHQUFILENBQWI7QUFDQSxlQUFPLEtBQVA7QUFDSCxLQUxFLEVBS0EsRUFMQSxDQUFQO0FBTUg7Ozs7Ozs7OztBQ1BEOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O2tCQUVlO0FBQ1gsMEJBRFc7QUFFWCw0QkFGVztBQUdYO0FBSFcsQzs7Ozs7Ozs7a0JDSlMsRztBQUFULFNBQVMsR0FBVCxDQUFhLEVBQWIsRUFBaUIsRUFBakIsRUFBcUI7QUFDaEMsV0FBTyxPQUFPLElBQVAsQ0FBWSxFQUFaLEVBQ0YsTUFERSxDQUNLLFVBQUMsS0FBRCxFQUFRLEdBQVIsRUFBZ0I7QUFDcEIsY0FBTSxHQUFOLElBQWEsR0FBRyxHQUFILEVBQVEsR0FBRyxHQUFILENBQVIsQ0FBYjtBQUNBLGVBQU8sS0FBUDtBQUNILEtBSkUsRUFJQSxFQUpBLENBQVA7QUFLSDs7Ozs7Ozs7Ozs7OztJQ05NLEcsR0FBOEIsSSxDQUE5QixHO0lBQUssSyxHQUF5QixJLENBQXpCLEs7SUFBTyxHLEdBQWtCLEksQ0FBbEIsRztJQUFLLEcsR0FBYSxJLENBQWIsRztJQUFLLEksR0FBUSxJLENBQVIsSTs7SUFFUixRO0FBQ2pCLHNCQUFZLE9BQVosRUFBcUI7QUFBQTs7QUFDakIsYUFBSyxJQUFMLEdBQVksT0FBWjs7QUFFQSxhQUFLLE9BQUwsR0FBZSxFQUFmO0FBQ0EsYUFBSyxZQUFMLEdBQW9CLEVBQXBCOztBQUVBLGFBQUssU0FBTCxHQUFpQjtBQUNiLG1CQUFPLElBRE07QUFFYixlQUFHLENBRlU7QUFHYixlQUFHLENBSFU7QUFJYixtQkFBTyxDQUpNO0FBS2IsbUJBQU8sQ0FMTTtBQU1iLHFCQUFTLENBTkk7QUFPYixrQkFBTSxDQVBPO0FBUWIsb0JBQVEsQ0FSSztBQVNiLG9CQUFRLEVBQUMsR0FBRyxDQUFDLENBQUwsRUFBUSxHQUFHLENBQUMsQ0FBWixFQVRLO0FBVWIsc0JBQVUsQ0FWRztBQVdiLHNCQUFVLENBWEc7QUFZYixvQkFBUSxFQUFDLEdBQUcsQ0FBSixFQUFPLEdBQUcsQ0FBVixFQUFhLE9BQU8sSUFBcEIsRUFBMEIsUUFBUSxHQUFsQztBQVpLLFNBQWpCOztBQWVBLGFBQUssTUFBTCxHQUFjLE9BQU8sSUFBUCxDQUFZLEtBQUssU0FBakIsQ0FBZDs7QUFFQSxhQUFLLEtBQUwsQ0FBVyxPQUFYO0FBQ0g7Ozs7OEJBRUssTyxFQUFTO0FBQ1gsZ0JBQU0sT0FBTyxLQUFLLFNBQWxCO0FBQ0EsZ0JBQU0sUUFBUSxLQUFLLE1BQW5CO0FBQ0EsZ0JBQU0sT0FBTyxXQUFXLElBQXhCOztBQUVBLGlCQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksTUFBTSxNQUExQixFQUFrQyxHQUFsQyxFQUF1QztBQUNuQyxvQkFBTSxNQUFNLE1BQU0sQ0FBTixDQUFaO0FBQ0Esb0JBQU0sUUFBUSxLQUFLLEdBQUwsS0FBYSxLQUFLLEdBQUwsQ0FBM0I7QUFDQSxxQkFBSyxHQUFMLElBQVksS0FBWjtBQUNBLHFCQUFLLEdBQUwsSUFBWSxLQUFaO0FBQ0g7O0FBRUQsZ0JBQU0sUUFBUSxLQUFLLEtBQUwsSUFBYyxLQUFLLEtBQWpDO0FBQ0EsZ0JBQU0sUUFBUSxLQUFLLEtBQUwsSUFBYyxLQUFLLEtBQWpDOztBQUVBLGlCQUFLLEVBQUwsR0FBVSxJQUFJLEtBQUosSUFBYSxLQUF2QjtBQUNBLGlCQUFLLEVBQUwsR0FBVSxJQUFJLEtBQUosSUFBYSxLQUF2Qjs7QUFFQSxtQkFBTyxJQUFQO0FBQ0g7OztpQ0FFUTtBQUNMLGlCQUFLLEVBQUwsSUFBVyxLQUFLLFFBQWhCO0FBQ0EsaUJBQUssRUFBTCxJQUFXLEtBQUssUUFBaEI7QUFDQSxpQkFBSyxFQUFMLElBQVcsS0FBSyxPQUFoQjtBQUNBLGlCQUFLLENBQUwsSUFBVSxLQUFLLEVBQWY7QUFDQSxpQkFBSyxDQUFMLElBQVUsS0FBSyxFQUFmO0FBQ0EsbUJBQU8sSUFBUDtBQUNIOzs7b0NBRVcsSyxFQUFPLEssRUFBTztBQUN0QixnQkFBSSxPQUFPLEtBQVAsS0FBaUIsV0FBckIsRUFBa0M7QUFDOUIsd0JBQVEsS0FBSyxLQUFiO0FBQ0g7QUFDRCxpQkFBSyxFQUFMLElBQVcsSUFBSSxLQUFKLElBQWEsS0FBeEI7QUFDQSxpQkFBSyxFQUFMLElBQVcsSUFBSSxLQUFKLElBQWEsS0FBeEI7QUFDQSxtQkFBTyxJQUFQO0FBQ0g7OztrQ0E0QlMsQyxFQUFHLEMsRUFBRyxLLEVBQU8sTSxFQUFRO0FBQzNCLGlCQUFLLE9BQUwsQ0FBYSxDQUFiLEdBQWlCLEtBQUssQ0FBdEI7QUFDQSxpQkFBSyxPQUFMLENBQWEsQ0FBYixHQUFpQixLQUFLLENBQXRCO0FBQ0EsaUJBQUssT0FBTCxDQUFhLEtBQWIsR0FBcUIsS0FBckI7QUFDQSxpQkFBSyxPQUFMLENBQWEsTUFBYixHQUFzQixNQUF0QjtBQUNIOzs7Z0NBbUNPLEMsRUFBRztBQUNQLG1CQUFPLE1BQU0sRUFBRSxDQUFGLEdBQU0sS0FBSyxDQUFqQixFQUFvQixFQUFFLENBQUYsR0FBTSxLQUFLLENBQS9CLENBQVA7QUFDSDs7O21DQUVVLEMsRUFBRztBQUNWLGdCQUFNLEtBQUssRUFBRSxDQUFGLEdBQU0sS0FBSyxDQUF0QjtBQUNBLGdCQUFNLEtBQUssRUFBRSxDQUFGLEdBQU0sS0FBSyxDQUF0QjtBQUNBLG1CQUFPLEtBQUssS0FBSyxFQUFMLEdBQVUsS0FBSyxFQUFwQixDQUFQO0FBQ0g7OzsrQkFFTSxDLEVBQW1CO0FBQUEsZ0JBQWhCLE1BQWdCLHVFQUFQLEtBQU87O0FBQ3RCLGdCQUFNLEtBQUssRUFBRSxDQUFGLEdBQU0sS0FBSyxDQUF0QjtBQUNBLGdCQUFNLEtBQUssRUFBRSxDQUFGLEdBQU0sS0FBSyxDQUF0Qjs7QUFFQSxpQkFBSyxFQUFMLElBQVcsS0FBSyxNQUFoQjtBQUNBLGlCQUFLLEVBQUwsSUFBVyxLQUFLLE1BQWhCOztBQUVBLGdCQUFJLElBQUksS0FBSyxFQUFULElBQWUsSUFBSSxFQUFKLENBQW5CLEVBQTRCO0FBQ3hCLHFCQUFLLEVBQUwsR0FBVSxFQUFWO0FBQ0g7O0FBRUQsZ0JBQUksSUFBSSxLQUFLLEVBQVQsSUFBZSxJQUFJLEVBQUosQ0FBbkIsRUFBNEI7QUFDeEIscUJBQUssRUFBTCxHQUFVLEVBQVY7QUFDSDs7QUFFRCxtQkFBTyxJQUFQO0FBQ0g7OztvQ0FFVyxDLEVBQUc7QUFDWCxnQkFBTSxLQUFLLEVBQUUsQ0FBRixHQUFNLEtBQUssQ0FBdEI7QUFDQSxnQkFBTSxLQUFLLEVBQUUsQ0FBRixHQUFNLEtBQUssQ0FBdEI7QUFDQSxnQkFBTSxTQUFTLEtBQUssRUFBTCxHQUFVLEtBQUssRUFBOUI7QUFDQSxnQkFBSSxTQUFTLENBQWIsRUFBZ0I7QUFDWixvQkFBTSxPQUFPLEtBQUssTUFBTCxDQUFiO0FBQ0Esb0JBQU0sUUFBUSxFQUFFLElBQUYsR0FBUyxNQUF2QjtBQUNBLG9CQUFNLEtBQUssS0FBSyxJQUFMLEdBQVksS0FBdkI7QUFDQSxvQkFBTSxLQUFLLEtBQUssSUFBTCxHQUFZLEtBQXZCO0FBQ0EscUJBQUssRUFBTCxJQUFXLEVBQVg7QUFDQSxxQkFBSyxFQUFMLElBQVcsRUFBWDtBQUNIOztBQUVELG1CQUFPLElBQVA7QUFDSDs7O2lDQUVRLEMsRUFBRyxTLEVBQVcsTSxFQUFRO0FBQzNCLGdCQUFNLEtBQUssRUFBRSxDQUFGLEdBQU0sS0FBSyxDQUF0QjtBQUNBLGdCQUFNLEtBQUssRUFBRSxDQUFGLEdBQU0sS0FBSyxDQUF0QjtBQUNBLGdCQUFNLFdBQVcsS0FBSyxLQUFLLEVBQUwsR0FBVSxLQUFLLEVBQXBCLENBQWpCO0FBQ0EsZ0JBQU0sUUFBUSxDQUFDLFlBQVksVUFBVSxDQUF0QixDQUFELEtBQThCLGFBQWEsR0FBM0MsQ0FBZDs7QUFFQSxnQkFBSSxJQUFJLFdBQVcsS0FBZixJQUF3QixDQUE1QixFQUErQjtBQUMzQixxQkFBSyxFQUFMLElBQVcsS0FBSyxRQUFMLEdBQWdCLEtBQTNCO0FBQ0EscUJBQUssRUFBTCxJQUFXLEtBQUssUUFBTCxHQUFnQixLQUEzQjtBQUNIOztBQUVELG1CQUFPLElBQVA7QUFDSDs7O2lDQUVRLEMsRUFBRztBQUNSLG1CQUFPLEtBQUssVUFBTCxDQUFnQixDQUFoQixLQUFzQixLQUFLLE1BQUwsR0FBYyxFQUFFLE1BQTdDO0FBQ0g7OztzQ0FFYTtBQUNWLGdCQUFNLE9BQU8sS0FBSyxPQUFMLENBQWEsQ0FBYixHQUFpQixLQUFLLE1BQW5DO0FBQ0EsZ0JBQU0sUUFBUSxLQUFLLE9BQUwsQ0FBYSxDQUFiLEdBQWlCLEtBQUssT0FBTCxDQUFhLEtBQTlCLEdBQXNDLEtBQUssTUFBekQ7QUFDQSxnQkFBTSxNQUFNLEtBQUssT0FBTCxDQUFhLENBQWIsR0FBaUIsS0FBSyxNQUFsQztBQUNBLGdCQUFNLFNBQVMsS0FBSyxPQUFMLENBQWEsQ0FBYixHQUFpQixLQUFLLE9BQUwsQ0FBYSxNQUE5QixHQUF1QyxLQUFLLE1BQTNEOztBQUVBLGdCQUFJLEtBQUssQ0FBTCxHQUFTLElBQWIsRUFBbUI7QUFDZixxQkFBSyxDQUFMLEdBQVMsSUFBVDtBQUNBLHFCQUFLLEVBQUwsR0FBVSxLQUFLLEVBQUwsR0FBVSxLQUFLLE1BQUwsQ0FBWSxDQUFoQztBQUNIOztBQUVELGdCQUFJLEtBQUssQ0FBTCxHQUFTLEtBQWIsRUFBb0I7QUFDaEIscUJBQUssQ0FBTCxHQUFTLEtBQVQ7QUFDQSxxQkFBSyxFQUFMLEdBQVUsS0FBSyxFQUFMLEdBQVUsS0FBSyxNQUFMLENBQVksQ0FBaEM7QUFDSDs7QUFFRCxnQkFBSSxLQUFLLENBQUwsR0FBUyxHQUFiLEVBQWtCO0FBQ2QscUJBQUssQ0FBTCxHQUFTLEdBQVQ7QUFDQSxxQkFBSyxFQUFMLEdBQVUsS0FBSyxFQUFMLEdBQVUsS0FBSyxNQUFMLENBQVksQ0FBaEM7QUFDSDs7QUFFRCxnQkFBSSxLQUFLLENBQUwsR0FBUyxNQUFiLEVBQXFCO0FBQ2pCLHFCQUFLLENBQUwsR0FBUyxNQUFUO0FBQ0EscUJBQUssRUFBTCxHQUFVLEtBQUssRUFBTCxHQUFVLEtBQUssTUFBTCxDQUFZLENBQWhDO0FBQ0g7QUFDSjs7O21DQUVVO0FBQUEsK0JBQzRCLEtBQUssV0FEakM7QUFBQSxnQkFDQSxJQURBLGdCQUNBLElBREE7QUFBQSxnQkFDTSxLQUROLGdCQUNNLEtBRE47QUFBQSxnQkFDYSxHQURiLGdCQUNhLEdBRGI7QUFBQSxnQkFDa0IsTUFEbEIsZ0JBQ2tCLE1BRGxCOzs7QUFHUCxnQkFBSSxLQUFLLENBQUwsR0FBUyxJQUFiLEVBQW1CO0FBQ2YscUJBQUssQ0FBTCxHQUFTLEtBQVQ7QUFDSDs7QUFFRCxnQkFBSSxLQUFLLENBQUwsR0FBUyxLQUFiLEVBQW9CO0FBQ2hCLHFCQUFLLENBQUwsR0FBUyxJQUFUO0FBQ0g7O0FBRUQsZ0JBQUksS0FBSyxDQUFMLEdBQVMsR0FBYixFQUFrQjtBQUNkLHFCQUFLLENBQUwsR0FBUyxNQUFUO0FBQ0g7O0FBRUQsZ0JBQUksS0FBSyxDQUFMLEdBQVMsTUFBYixFQUFxQjtBQUNqQixxQkFBSyxDQUFMLEdBQVMsR0FBVDtBQUNIO0FBQ0o7OzttQ0FFVTtBQUFBLGdDQUM0QixLQUFLLFdBRGpDO0FBQUEsZ0JBQ0EsSUFEQSxpQkFDQSxJQURBO0FBQUEsZ0JBQ00sS0FETixpQkFDTSxLQUROO0FBQUEsZ0JBQ2EsR0FEYixpQkFDYSxHQURiO0FBQUEsZ0JBQ2tCLE1BRGxCLGlCQUNrQixNQURsQjs7O0FBR1AsZ0JBQUksS0FBSyxDQUFMLEdBQVMsSUFBVCxJQUFpQixLQUFLLENBQUwsR0FBUyxLQUExQixJQUFtQyxLQUFLLENBQUwsR0FBUyxHQUE1QyxJQUFtRCxLQUFLLENBQUwsR0FBUyxNQUFoRSxFQUF3RTtBQUNwRSxxQkFBSyxLQUFMLEdBQWEsS0FBYjtBQUNIO0FBQ0o7OztvQ0FFVztBQUFBLGdDQUMyQixLQUFLLFdBRGhDO0FBQUEsZ0JBQ0QsSUFEQyxpQkFDRCxJQURDO0FBQUEsZ0JBQ0ssS0FETCxpQkFDSyxLQURMO0FBQUEsZ0JBQ1ksR0FEWixpQkFDWSxHQURaO0FBQUEsZ0JBQ2lCLE1BRGpCLGlCQUNpQixNQURqQjs7O0FBR1IsZ0JBQUksS0FBSyxDQUFMLEdBQVMsSUFBVCxJQUFpQixLQUFLLENBQUwsR0FBUyxLQUExQixJQUFtQyxLQUFLLENBQUwsR0FBUyxHQUE1QyxJQUFtRCxLQUFLLENBQUwsR0FBUyxNQUFoRSxFQUF3RTtBQUNwRSxxQkFBSyxLQUFMO0FBQ0g7QUFDSjs7O21DQUVVO0FBQ1AsaUJBQUssUUFBTDs7QUFFQSxnQkFBSSxLQUFLLFFBQUwsSUFBaUIsQ0FBckIsRUFBd0I7QUFDcEIscUJBQUssS0FBTCxHQUFhLEtBQWI7QUFDSDtBQUNKOzs7NEJBck1XO0FBQ1IsZ0JBQUksS0FBSyxFQUFMLEtBQVksQ0FBWixJQUFpQixLQUFLLEVBQUwsS0FBWSxDQUFqQyxFQUFvQztBQUNoQyx1QkFBTyxDQUFQO0FBQ0g7QUFDRCxtQkFBTyxLQUFLLEtBQUssRUFBTCxHQUFVLEtBQUssRUFBZixHQUFvQixLQUFLLEVBQUwsR0FBVSxLQUFLLEVBQXhDLENBQVA7QUFDSCxTOzBCQUVTLEssRUFBTztBQUNiLGdCQUFNLFFBQVEsS0FBSyxLQUFuQjtBQUNBLGlCQUFLLEVBQUwsR0FBVSxJQUFJLEtBQUosSUFBYSxLQUF2QjtBQUNBLGlCQUFLLEVBQUwsR0FBVSxJQUFJLEtBQUosSUFBYSxLQUF2QjtBQUNIOzs7NEJBRVc7QUFDUixnQkFBSSxLQUFLLEVBQUwsS0FBWSxDQUFaLElBQWlCLEtBQUssRUFBTCxLQUFZLENBQWpDLEVBQW9DO0FBQ2hDLHVCQUFPLENBQVA7QUFDSDtBQUNELG1CQUFPLE1BQU0sS0FBSyxFQUFYLEVBQWUsS0FBSyxFQUFwQixDQUFQO0FBQ0gsUzswQkFFUyxLLEVBQU87QUFDYixnQkFBTSxRQUFRLEtBQUssS0FBbkI7QUFDQSxpQkFBSyxFQUFMLEdBQVUsSUFBSSxLQUFKLElBQWEsS0FBdkI7QUFDQSxpQkFBSyxFQUFMLEdBQVUsSUFBSSxLQUFKLElBQWEsS0FBdkI7QUFDSDs7OzRCQVNZO0FBQ1QsbUJBQU8sS0FBSyxPQUFaO0FBQ0gsUzswQkFFVSxFLEVBQUk7QUFBQSxnQkFDSixDQURJLEdBQ21CLEVBRG5CLENBQ0osQ0FESTtBQUFBLGdCQUNELENBREMsR0FDbUIsRUFEbkIsQ0FDRCxDQURDO0FBQUEsZ0JBQ0UsS0FERixHQUNtQixFQURuQixDQUNFLEtBREY7QUFBQSxnQkFDUyxNQURULEdBQ21CLEVBRG5CLENBQ1MsTUFEVDs7QUFFWCxpQkFBSyxTQUFMLENBQWUsQ0FBZixFQUFrQixDQUFsQixFQUFxQixLQUFyQixFQUE0QixNQUE1QjtBQUNIOzs7NEJBRVU7QUFDUCxtQkFBTyxLQUFLLENBQUwsR0FBUyxLQUFLLE1BQXJCO0FBQ0g7Ozs0QkFFVztBQUNSLG1CQUFPLEtBQUssQ0FBTCxHQUFTLEtBQUssTUFBckI7QUFDSDs7OzRCQUVTO0FBQ04sbUJBQU8sS0FBSyxDQUFMLEdBQVMsS0FBSyxNQUFyQjtBQUNIOzs7NEJBRVk7QUFDVCxtQkFBTyxLQUFLLENBQUwsR0FBUyxLQUFLLE1BQXJCO0FBQ0g7Ozs0QkFFaUI7QUFDZCxpQkFBSyxZQUFMLENBQWtCLElBQWxCLEdBQXlCLEtBQUssT0FBTCxDQUFhLENBQWIsR0FBaUIsS0FBSyxNQUEvQztBQUNBLGlCQUFLLFlBQUwsQ0FBa0IsS0FBbEIsR0FBMEIsS0FBSyxPQUFMLENBQWEsQ0FBYixHQUFpQixLQUFLLE9BQUwsQ0FBYSxLQUE5QixHQUFzQyxLQUFLLE1BQXJFO0FBQ0EsaUJBQUssWUFBTCxDQUFrQixHQUFsQixHQUF3QixLQUFLLE9BQUwsQ0FBYSxDQUFiLEdBQWlCLEtBQUssTUFBOUM7QUFDQSxpQkFBSyxZQUFMLENBQWtCLE1BQWxCLEdBQTJCLEtBQUssT0FBTCxDQUFhLENBQWIsR0FBaUIsS0FBSyxPQUFMLENBQWEsTUFBOUIsR0FBdUMsS0FBSyxNQUF2RTtBQUNBLG1CQUFPLEtBQUssWUFBWjtBQUNIOzs7Ozs7a0JBbElnQixROzs7Ozs7OztrQkNDRyxhOztBQUh4Qjs7Ozs7O0FBRUE7QUFDZSxTQUFTLGFBQVQsR0FBaUQ7QUFBQSxRQUExQixFQUEwQix1RUFBckIsVUFBVSxTQUFXOztBQUM1RCxRQUFJLENBQUMsdUJBQVEsRUFBUixDQUFMLEVBQWtCO0FBQ2QsZUFBTyxLQUFQO0FBQ0g7O0FBRUQsUUFBTSxrQkFBa0IsR0FBRyxPQUFILENBQVcsYUFBWCxJQUE0QixDQUFDLENBQTdCLElBQWtDLEdBQUcsT0FBSCxDQUFXLGFBQVgsSUFBNEIsQ0FBQyxDQUF2Rjs7QUFFQSxRQUFNLGdCQUFnQix1QkFBdEI7QUFDQSxRQUFNLG9CQUFvQixjQUFjLElBQWQsQ0FBbUIsRUFBbkIsQ0FBMUI7QUFDQSxRQUFNLHFCQUFxQixvQkFBb0IsV0FBVyxjQUFjLElBQWQsQ0FBbUIsRUFBbkIsRUFBdUIsQ0FBdkIsQ0FBWCxDQUFwQixHQUE0RCxJQUF2Rjs7QUFFQSxRQUFNLFdBQVcsa0JBQWpCO0FBQ0EsUUFBTSxlQUFlLFNBQVMsSUFBVCxDQUFjLEVBQWQsQ0FBckI7QUFDQSxRQUFNLGdCQUFnQixlQUFlLFdBQVcsU0FBUyxJQUFULENBQWMsRUFBZCxFQUFrQixDQUFsQixDQUFYLENBQWYsR0FBa0QsSUFBeEU7O0FBRUEsV0FBTyxtQkFBb0Isc0JBQXNCLHFCQUFxQixHQUEvRCxJQUF3RSxpQkFBaUIsZ0JBQWdCLEVBQWhIO0FBQ0g7Ozs7Ozs7Ozs7O2tCQ2pCdUIsYzs7QUFGeEI7Ozs7OztBQUVlLFNBQVMsY0FBVCxHQUFrRDtBQUFBLFFBQTFCLEVBQTBCLHVFQUFyQixVQUFVLFNBQVc7O0FBQzdELFFBQUksQ0FBQyx1QkFBUSxFQUFSLENBQUwsRUFBa0I7QUFDZCxlQUFPLENBQVA7QUFDSDtBQUNELFFBQU0sVUFBVSxHQUFHLEtBQUgsQ0FBUywwQkFBVCxFQUFxQyxDQUFyQyxDQUFoQjs7QUFKNkQseUJBSzlDLFFBQVEsS0FBUixDQUFjLEdBQWQsQ0FMOEM7QUFBQTtBQUFBLFFBS3RELENBTHNEO0FBQUEsUUFLbkQsQ0FMbUQ7O0FBTTdELFdBQU8sV0FBYyxDQUFkLFNBQW1CLENBQW5CLENBQVA7QUFDSDs7Ozs7Ozs7O2tCQ1RjO0FBQUEsTUFBQyxFQUFELHVFQUFNLFVBQVUsU0FBaEI7QUFBQSxTQUE4QixZQUFXLElBQVgsQ0FBZ0IsRUFBaEI7QUFBOUI7QUFBQSxDOzs7Ozs7Ozs7QUNBZjs7Ozs7O2tCQUVlO0FBQUEsTUFBQyxFQUFELHVFQUFNLFVBQVUsU0FBaEI7QUFBQSxTQUE4QixtQkFBSSxFQUFKLEtBQVcsUUFBUSxJQUFSLENBQWEsRUFBYixDQUF6QztBQUFBLEM7Ozs7Ozs7OztBQ0ZmOzs7Ozs7a0JBRWU7QUFBQSxNQUFDLEVBQUQsdUVBQU0sVUFBVSxTQUFoQjtBQUFBLFNBQThCLENBQUMsc0JBQU8sRUFBUCxDQUEvQjtBQUFBLEM7Ozs7Ozs7OztrQkNGQTtBQUFBLFNBQU0sQ0FBQyxDQUFDLE9BQU8sc0JBQWY7QUFBQSxDOzs7Ozs7Ozs7a0JDQUE7QUFBQSxNQUFDLEVBQUQsdUVBQU0sVUFBVSxTQUFoQjtBQUFBLFNBQThCLFdBQVUsSUFBVixDQUFlLEVBQWY7QUFBOUI7QUFBQSxDOzs7Ozs7OztrQkNBUyxTO0FBQVQsU0FBUyxTQUFULEdBQTZDO0FBQUEsUUFBMUIsRUFBMEIsdUVBQXJCLFVBQVUsU0FBVzs7QUFDeEQsUUFBSSxJQUFJLENBQVI7QUFDQSxRQUFJLG1CQUFtQixJQUFuQixDQUF3QixFQUF4QixDQUFKLEVBQWlDO0FBQzdCLFlBQUksU0FBUyxPQUFPLEVBQWhCLEVBQW9CLEVBQXBCLENBQUo7QUFDSCxLQUZELE1BRU8sSUFBSSx1Q0FBdUMsSUFBdkMsQ0FBNEMsRUFBNUMsQ0FBSixFQUFxRDtBQUN4RCxZQUFJLFNBQVMsT0FBTyxFQUFoQixFQUFvQixFQUFwQixDQUFKO0FBQ0g7QUFDRCxXQUFPLENBQVA7QUFDSDs7Ozs7Ozs7O0FDUkQ7Ozs7OztrQkFFZTtBQUFBLE1BQUMsRUFBRCx1RUFBTSxVQUFVLFNBQWhCO0FBQUEsU0FBOEIseUJBQVUsRUFBVixJQUFnQixDQUE5QztBQUFBLEM7Ozs7Ozs7OztBQ0ZmOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7a0JBRWU7QUFDWCxhQUFTLHdCQURFO0FBRVgsbUJBQWUsOEJBRko7QUFHWCxvQkFBZ0IsK0JBSEw7QUFJWCxlQUFXLDBCQUpBO0FBS1gsYUFBUyx3QkFMRTtBQU1YLHVCQUFtQixrQ0FOUjtBQU9YLGFBQVMsd0JBUEU7QUFRWCxRQUFJLG1CQVJPO0FBU1gsZUFBVywwQkFUQTtBQVVYLFNBQUssb0JBVk07QUFXWCxnQkFBWSwyQkFYRDtBQVlYLFVBQU0scUJBWks7QUFhWCxZQUFRLHVCQWJHO0FBY1gsV0FBTyxzQkFkSTtBQWVYLGVBQVcsMEJBZkE7QUFnQlgsU0FBSyxvQkFoQk07QUFpQlgsWUFBUSx1QkFqQkc7QUFrQlgsU0FBSyxtQkFsQk07QUFtQlgsWUFBUSx1QkFuQkc7QUFvQlgsZUFBVywwQkFwQkE7QUFxQlgsNEJBckJXO0FBc0JYLFdBQU8sc0JBdEJJO0FBdUJYLFVBQU0scUJBdkJLO0FBd0JYLGFBQVMsd0JBeEJFO0FBeUJYLGtCQUFjO0FBekJILEM7Ozs7Ozs7Ozs7O2tCQ3hCUyxVOztBQUZ4Qjs7Ozs7O0FBRWUsU0FBUyxVQUFULEdBQThDO0FBQUEsUUFBMUIsRUFBMEIsdUVBQXJCLFVBQVUsU0FBVzs7QUFDekQsUUFBSSxtQkFBSSxFQUFKLENBQUosRUFBYTtBQUFBLHdCQUNRLEdBQUcsS0FBSCxDQUFTLGlCQUFULENBRFI7QUFBQTtBQUFBLFlBQ0EsQ0FEQTtBQUFBLFlBQ0csQ0FESDs7QUFFVCxZQUFJLEtBQUssQ0FBVCxFQUFZO0FBQ1IsbUJBQU8sV0FBYyxDQUFkLFNBQW1CLENBQW5CLENBQVA7QUFDSDtBQUNKO0FBQ0QsV0FBTyxDQUFQO0FBQ0g7Ozs7Ozs7OztrQkNWYztBQUFBLE1BQUMsRUFBRCx1RUFBTSxVQUFVLFNBQWhCO0FBQUEsU0FBOEIsbUJBQWtCLElBQWxCLENBQXVCLEVBQXZCO0FBQTlCO0FBQUEsQzs7Ozs7Ozs7O2tCQ0FBO0FBQUEsTUFBQyxFQUFELHVFQUFNLFVBQVUsU0FBaEI7QUFBQSxTQUE4QixTQUFRLElBQVIsQ0FBYSxFQUFiO0FBQTlCO0FBQUEsQzs7Ozs7Ozs7O2tCQ0FBO0FBQUEsTUFBQyxFQUFELHVFQUFNLFVBQVUsU0FBaEI7QUFBQSxTQUE4QixnQkFBZSxJQUFmLENBQW9CLEVBQXBCO0FBQTlCO0FBQUEsQzs7Ozs7Ozs7O0FDQWY7Ozs7OztrQkFFZTtBQUFBLE1BQUMsRUFBRCx1RUFBTSxVQUFVLFNBQWhCO0FBQUEsU0FBOEIsQ0FBQyx1QkFBUSxFQUFSLENBQUQsSUFBZ0IsUUFBUSxJQUFSLENBQWEsRUFBYixDQUE5QztBQUFBLEM7Ozs7Ozs7OztrQkNGQTtBQUFBLFNBQU0sMkNBQTBDLElBQTFDLENBQStDLE9BQU8sUUFBUCxDQUFnQixJQUEvRDtBQUFOO0FBQUEsQzs7Ozs7Ozs7O0FDQWY7Ozs7OztrQkFFZTtBQUFBLE1BQUMsRUFBRCx1RUFBTSxVQUFVLFNBQWhCO0FBQUEsU0FBOEIsQ0FBQyxtQkFBSSxFQUFKLENBQUQsSUFBWSxTQUFTLElBQVQsQ0FBYyxFQUFkLENBQTFDO0FBQUEsQzs7Ozs7Ozs7O2tCQ0ZBO0FBQUEsTUFBQyxFQUFELHVFQUFNLFVBQVUsU0FBaEI7QUFBQSxTQUE4QiwwRkFBeUYsSUFBekYsQ0FBOEYsRUFBOUY7QUFBOUI7QUFBQSxDOzs7Ozs7OztBQ0FmLElBQU0sVUFBVSxTQUFTLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBaEI7O2tCQUNlO0FBQUEsU0FBTSxDQUFDLEVBQUUsUUFBUSxXQUFSLElBQXVCLFFBQVEsV0FBUixDQUFvQiw0Q0FBcEIsQ0FBekIsQ0FBUDtBQUFBLEM7Ozs7Ozs7OztBQ0RmOzs7Ozs7a0JBRWU7QUFBQSxNQUFDLEVBQUQsdUVBQU0sVUFBVSxTQUFoQjtBQUFBLFNBQThCLG1CQUFJLEVBQUosS0FBVyxjQUFjLElBQWQsQ0FBbUIsRUFBbkIsQ0FBekM7QUFBQSxDOzs7Ozs7Ozs7a0JDRkE7QUFBQSxNQUFDLEVBQUQsdUVBQU0sVUFBVSxTQUFoQjtBQUFBLFNBQThCLENBQUMsVUFBVSxJQUFWLENBQWUsRUFBZixDQUFELElBQXVCLENBQUMsU0FBUyxJQUFULENBQWMsRUFBZCxDQUF4QixJQUE2QyxTQUFTLElBQVQsQ0FBYyxFQUFkLENBQTNFO0FBQUEsQzs7Ozs7Ozs7a0JDQUE7QUFDWCxXQUFPLEtBQUssR0FBTCxDQUFTLE9BQU8sVUFBaEIsRUFBNEIsT0FBTyxNQUFQLENBQWMsS0FBMUMsQ0FESTtBQUVYLFlBQVEsS0FBSyxHQUFMLENBQVMsT0FBTyxXQUFoQixFQUE2QixPQUFPLE1BQVAsQ0FBYyxNQUEzQyxDQUZHO0FBR1gsU0FBSyxPQUFPLGdCQUFQLElBQTJCLENBSHJCO0FBSVgsWUFBUSxPQUFPLGdCQUFQLEdBQTBCO0FBSnZCLEM7Ozs7Ozs7O2tCQ0FTLEs7QUFBVCxTQUFTLEtBQVQsR0FBaUI7QUFDNUIsUUFBSTtBQUNBLFlBQU0sU0FBUyxTQUFTLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBZjtBQUNBLFlBQU0sVUFBVSxPQUFPLFVBQVAsQ0FBa0IsT0FBbEIsS0FBOEIsT0FBTyxVQUFQLENBQWtCLG9CQUFsQixDQUE5QztBQUNBLGVBQU8sQ0FBQyxFQUFFLE9BQU8scUJBQVAsSUFBZ0MsT0FBbEMsQ0FBUjtBQUNILEtBSkQsQ0FJRSxPQUFPLENBQVAsRUFBVTtBQUNSLGVBQU8sS0FBUDtBQUNIO0FBQ0o7Ozs7Ozs7O0FDUkQsSUFBTSxVQUFVLFNBQVMsYUFBVCxDQUF1QixPQUF2QixDQUFoQjs7a0JBQ2U7QUFBQSxTQUFNLENBQUMsRUFBRSxRQUFRLFdBQVIsSUFBdUIsUUFBUSxXQUFSLENBQW9CLGtDQUFwQixDQUF6QixDQUFQO0FBQUEsQzs7Ozs7Ozs7O2tCQ0RBO0FBQUEsTUFBQyxFQUFELHVFQUFNLFVBQVUsU0FBaEI7QUFBQSxTQUE4QixrQkFBaUIsSUFBakIsQ0FBc0IsRUFBdEI7QUFBOUI7QUFBQSxDOzs7Ozs7Ozs7QUNBZjs7Ozs7O2tCQUVlO0FBQUEsTUFBQyxFQUFELHVFQUFNLFVBQVUsU0FBaEI7QUFBQSxTQUE4QixDQUFDLDRCQUFhLEVBQWIsQ0FBRCxJQUFxQixVQUFVLElBQVYsQ0FBZSxFQUFmLENBQW5EO0FBQUEsQzs7Ozs7QUNGZjs7Ozs7QUFLQyxhQUFXOztBQUVSLFFBQUksY0FBYyxTQUFTLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBbEI7O0FBRUEsZ0JBQVksU0FBWixDQUFzQixHQUF0QixDQUEwQixJQUExQixFQUFnQyxJQUFoQzs7QUFFQTtBQUNBO0FBQ0EsUUFBSSxDQUFDLFlBQVksU0FBWixDQUFzQixRQUF0QixDQUErQixJQUEvQixDQUFMLEVBQTJDO0FBQUEsWUFDOUIsWUFEOEIsR0FDdkMsU0FBUyxZQUFULENBQXNCLE1BQXRCLEVBQThCO0FBQzFCLGdCQUFNLFdBQVcsT0FBTyxZQUFQLENBQW9CLFNBQXBCLENBQThCLE1BQTlCLENBQWpCOztBQUVBLG1CQUFPLFlBQVAsQ0FBb0IsU0FBcEIsQ0FBOEIsTUFBOUIsSUFBd0MsVUFBUyxLQUFULEVBQWdCO0FBQ3BELG9CQUFJLFVBQUo7QUFDQSxvQkFBTSxNQUFNLFVBQVUsTUFBdEI7O0FBRUEscUJBQUssSUFBSSxDQUFULEVBQVksSUFBSSxHQUFoQixFQUFxQixHQUFyQixFQUEwQjtBQUN0Qiw0QkFBUSxVQUFVLENBQVYsQ0FBUjtBQUNBLDZCQUFTLElBQVQsQ0FBYyxJQUFkLEVBQW9CLEtBQXBCO0FBQ0g7QUFDSixhQVJEO0FBU0gsU0Fic0M7O0FBY3ZDLHFCQUFhLEtBQWI7QUFDQSxxQkFBYSxRQUFiO0FBQ0g7O0FBRUQsZ0JBQVksU0FBWixDQUFzQixNQUF0QixDQUE2QixJQUE3QixFQUFtQyxLQUFuQzs7QUFFQTtBQUNBO0FBQ0EsUUFBSSxZQUFZLFNBQVosQ0FBc0IsUUFBdEIsQ0FBK0IsSUFBL0IsQ0FBSixFQUEwQztBQUN0QyxZQUFNLFNBQVMsT0FBTyxZQUFQLENBQW9CLFNBQXBCLENBQThCLE1BQTdDOztBQUVBLGVBQU8sWUFBUCxDQUFvQixTQUFwQixDQUE4QixNQUE5QixHQUF1QyxVQUFTLEtBQVQsRUFBZ0IsS0FBaEIsRUFBdUI7QUFDMUQsb0JBQVEsQ0FBQyxDQUFDLEtBQVY7QUFDQSxnQkFBSSxVQUFVLE1BQVYsR0FBbUIsQ0FBbkIsSUFBd0IsS0FBSyxRQUFMLENBQWMsS0FBZCxNQUF5QixLQUFyRCxFQUE0RDtBQUN4RCx1QkFBTyxLQUFQO0FBQ0gsYUFGRCxNQUVPO0FBQ0gsdUJBQU8sT0FBTyxJQUFQLENBQVksSUFBWixFQUFrQixLQUFsQixDQUFQO0FBQ0g7QUFDSixTQVBEO0FBUUg7O0FBRUQsa0JBQWMsSUFBZDtBQUNILENBNUNBLEdBQUQ7Ozs7O0FDTEMsV0FBUyxFQUFULEVBQWE7QUFDVixXQUFPLE9BQVAsR0FBaUIsT0FBTyxPQUFQLElBQWtCLEVBQW5DO0FBQ0EsUUFBTSxVQUFVLENBQ1osUUFEWSxFQUVaLE9BRlksRUFHWixPQUhZLEVBSVosT0FKWSxFQUtaLEtBTFksRUFNWixRQU5ZLEVBT1osT0FQWSxFQVFaLE9BUlksRUFTWixnQkFUWSxFQVVaLFVBVlksRUFXWixNQVhZLEVBWVosS0FaWSxFQWFaLGNBYlksRUFjWixRQWRZLEVBZVosU0FmWSxFQWdCWixZQWhCWSxFQWlCWixPQWpCWSxFQWtCWixNQWxCWSxFQW1CWixTQW5CWSxFQW9CWixXQXBCWSxFQXFCWixVQXJCWSxFQXNCWixhQXRCWSxFQXVCWixPQXZCWSxFQXdCWixNQXhCWSxDQUFoQjtBQTBCQSxZQUFRLE9BQVIsQ0FBZ0IsVUFBQyxJQUFELEVBQVU7QUFDdEIsZUFBTyxPQUFQLENBQWUsSUFBZixJQUF1QixPQUFPLE9BQVAsQ0FBZSxJQUFmLEtBQXdCLEVBQS9DO0FBQ0gsS0FGRDtBQUdILENBL0JBLEVBK0JDLFlBQVcsQ0FBRSxDQS9CZCxDQUFEOzs7OztBQ0FBOztBQUNBOztBQUNBOzs7OztBQ0ZBOzs7O0FBSUMsYUFBVztBQUNSLFFBQUksQ0FBQyxPQUFPLHFCQUFaLEVBQW1DO0FBQy9CLFlBQU0sVUFBVSxDQUFDLElBQUQsRUFBTyxLQUFQLEVBQWMsUUFBZCxFQUF3QixHQUF4QixDQUFoQjtBQUNBLGFBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxRQUFRLE1BQVosSUFBc0IsQ0FBQyxPQUFPLHFCQUE5QyxFQUFxRSxFQUFFLENBQXZFLEVBQTBFO0FBQ3RFLG1CQUFPLHFCQUFQLEdBQStCLE9BQU8sUUFBUSxDQUFSLElBQWEsdUJBQXBCLENBQS9CO0FBQ0EsbUJBQU8sb0JBQVAsR0FBOEIsT0FBTyxRQUFRLENBQVIsSUFBYSxzQkFBcEIsS0FBK0MsT0FBTyxRQUFRLENBQVIsSUFDaEYsNkJBRHlFLENBQTdFO0FBRUg7QUFDSjtBQUNKLENBVEEsR0FBRDs7Ozs7Ozs7a0JDSndCLEs7QUFBVCxTQUFTLEtBQVQsQ0FBZSxHQUFmLEVBQTBEO0FBQUEsUUFBdEMsS0FBc0MsdUVBQTlCLEdBQThCO0FBQUEsUUFBekIsTUFBeUIsdUVBQWhCLEdBQWdCO0FBQUEsUUFBWCxJQUFXLHVFQUFKLEVBQUk7O0FBQ3JFLFFBQU0sT0FBTyxDQUFDLE9BQU8sTUFBUCxDQUFjLEtBQWQsR0FBc0IsS0FBdkIsSUFBZ0MsQ0FBN0M7QUFDQSxRQUFNLE1BQU0sQ0FBQyxPQUFPLE1BQVAsQ0FBYyxNQUFkLEdBQXVCLE1BQXhCLElBQWtDLENBQTlDO0FBQ0E7QUFDQTtBQUNBLFFBQU0sV0FBVyx1RkFBakI7QUFDQSxRQUFNLG9CQUFrQixLQUFsQixnQkFBa0MsTUFBbEMsYUFBZ0QsR0FBaEQsY0FBNEQsSUFBNUQsU0FBb0UsUUFBMUU7QUFDQSxRQUFNLE1BQU0sT0FBTyxJQUFQLENBQVksR0FBWixFQUFpQixJQUFqQixFQUF1QixNQUF2QixDQUFaO0FBQ0EsUUFBSSxRQUFRLElBQVIsSUFBZ0IsT0FBTyxHQUFQLEtBQWUsV0FBbkMsRUFBZ0Q7QUFDNUMsZUFBTyxLQUFQO0FBQ0g7QUFDRCxRQUFJLE9BQU8sS0FBWCxFQUFrQjtBQUNkLFlBQUksS0FBSjtBQUNIO0FBQ0QsV0FBTyxJQUFQO0FBQ0g7Ozs7Ozs7Ozs7Ozs7SUNkSyxJO0FBQ0Ysa0JBQVksTUFBWixFQUFvQixLQUFwQixFQUEyQixRQUEzQixFQUFxQyxXQUFyQyxFQUFrRDtBQUFBOztBQUM5QyxhQUFLLE9BQUwsR0FBZSxNQUFmO0FBQ0EsYUFBSyxNQUFMLEdBQWMsS0FBZDtBQUNBLGFBQUssU0FBTCxHQUFpQixRQUFqQjtBQUNBLGFBQUssWUFBTCxHQUFvQixXQUFwQjs7QUFFQSxhQUFLLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSxhQUFLLEtBQUwsR0FBYSxFQUFiO0FBQ0g7Ozs7K0JBRU0sSSxFQUFNO0FBQ1QsZ0JBQUksS0FBSyxLQUFMLENBQVcsTUFBZixFQUF1QjtBQUNuQixvQkFBTSxRQUFRLEtBQUssVUFBTCxDQUFnQixJQUFoQixDQUFkO0FBQ0EscUJBQUssS0FBTCxDQUFXLEtBQVgsRUFBa0IsTUFBbEIsQ0FBeUIsSUFBekI7QUFDQTtBQUNIOztBQUVELGlCQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLElBQW5COztBQUVBLGdCQUFJLEVBQUUsS0FBSyxNQUFMLElBQWUsS0FBSyxTQUF0QixLQUFvQyxLQUFLLFFBQUwsQ0FBYyxNQUFkLEdBQXVCLEtBQUssWUFBcEUsRUFBa0Y7O0FBRTlFLHFCQUFLLFNBQUw7O0FBRUEscUJBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxLQUFLLFFBQUwsQ0FBYyxNQUFsQyxFQUEwQyxHQUExQyxFQUErQztBQUMzQyx5QkFBSyxNQUFMLENBQVksS0FBSyxRQUFMLENBQWMsQ0FBZCxDQUFaO0FBQ0g7O0FBRUQscUJBQUssUUFBTCxDQUFjLE1BQWQsR0FBdUIsQ0FBdkI7QUFDSDtBQUNKOzs7aUNBRVEsSSxFQUFNO0FBQ1gsZ0JBQUksS0FBSyxLQUFMLENBQVcsTUFBZixFQUF1QjtBQUNuQixvQkFBTSxRQUFRLEtBQUssVUFBTCxDQUFnQixJQUFoQixDQUFkO0FBQ0EsdUJBQU8sS0FBSyxLQUFMLENBQVcsS0FBWCxFQUFrQixRQUFsQixDQUEyQixJQUEzQixDQUFQO0FBQ0g7O0FBRUQsbUJBQU8sS0FBSyxRQUFaO0FBQ0g7OzttQ0FFVSxJLEVBQU07QUFBQSwwQkFDaUIsS0FBSyxPQUR0QjtBQUFBLGdCQUNOLENBRE0sV0FDTixDQURNO0FBQUEsZ0JBQ0gsQ0FERyxXQUNILENBREc7QUFBQSxnQkFDQSxLQURBLFdBQ0EsS0FEQTtBQUFBLGdCQUNPLE1BRFAsV0FDTyxNQURQOzs7QUFHYixnQkFBTSxRQUFRLEtBQUssQ0FBTCxHQUFTLElBQUksUUFBUSxDQUFuQztBQUNBLGdCQUFNLFNBQVMsS0FBSyxDQUFMLEdBQVMsSUFBSSxTQUFTLENBQXJDOztBQUVBLGdCQUFJLGNBQUo7O0FBRUEsZ0JBQUksS0FBSixFQUFXO0FBQ1Asd0JBQVEsU0FBUyxLQUFLLEVBQWQsR0FBbUIsS0FBSyxFQUFoQztBQUNILGFBRkQsTUFFTztBQUNILHdCQUFRLFNBQVMsS0FBSyxFQUFkLEdBQW1CLEtBQUssRUFBaEM7QUFDSDs7QUFFRCxtQkFBTyxLQUFQO0FBQ0g7OztvQ0FFVztBQUNSLGdCQUFNLFFBQVEsS0FBSyxNQUFMLEdBQWMsQ0FBNUI7O0FBRFEsMkJBR3NCLEtBQUssT0FIM0I7QUFBQSxnQkFHRCxDQUhDLFlBR0QsQ0FIQztBQUFBLGdCQUdFLENBSEYsWUFHRSxDQUhGO0FBQUEsZ0JBR0ssS0FITCxZQUdLLEtBSEw7QUFBQSxnQkFHWSxNQUhaLFlBR1ksTUFIWjs7QUFJUixnQkFBTSxJQUFJLFFBQVEsQ0FBbEI7QUFDQSxnQkFBTSxJQUFJLFNBQVMsQ0FBbkI7O0FBRUEsaUJBQUssS0FBTCxDQUFXLEtBQUssRUFBaEIsSUFBc0IsSUFBSSxJQUFKLENBQVM7QUFDM0Isb0JBRDJCO0FBRTNCLG9CQUYyQjtBQUczQix1QkFBTyxDQUhvQjtBQUkzQix3QkFBUTtBQUptQixhQUFULEVBTXRCLEtBTnNCLEVBTWYsS0FBSyxTQU5VLEVBTUMsS0FBSyxZQU5OLENBQXRCOztBQVFBLGlCQUFLLEtBQUwsQ0FBVyxLQUFLLEVBQWhCLElBQXNCLElBQUksSUFBSixDQUFTO0FBQzNCLG1CQUFHLElBQUksQ0FEb0I7QUFFM0Isb0JBRjJCO0FBRzNCLHVCQUFPLENBSG9CO0FBSTNCLHdCQUFRO0FBSm1CLGFBQVQsRUFNdEIsS0FOc0IsRUFNZixLQUFLLFNBTlUsRUFNQyxLQUFLLFlBTk4sQ0FBdEI7O0FBUUEsaUJBQUssS0FBTCxDQUFXLEtBQUssRUFBaEIsSUFBc0IsSUFBSSxJQUFKLENBQVM7QUFDM0Isb0JBRDJCO0FBRTNCLG1CQUFHLElBQUksQ0FGb0I7QUFHM0IsdUJBQU8sQ0FIb0I7QUFJM0Isd0JBQVE7QUFKbUIsYUFBVCxFQU10QixLQU5zQixFQU1mLEtBQUssU0FOVSxFQU1DLEtBQUssWUFOTixDQUF0Qjs7QUFRQSxpQkFBSyxLQUFMLENBQVcsS0FBSyxFQUFoQixJQUFzQixJQUFJLElBQUosQ0FBUztBQUMzQixtQkFBRyxJQUFJLENBRG9CO0FBRTNCLG1CQUFHLElBQUksQ0FGb0I7QUFHM0IsdUJBQU8sQ0FIb0I7QUFJM0Isd0JBQVE7QUFKbUIsYUFBVCxFQU10QixLQU5zQixFQU1mLEtBQUssU0FOVSxFQU1DLEtBQUssWUFOTixDQUF0QjtBQU9IOzs7Z0NBRU87QUFDSixpQkFBSyxRQUFMLENBQWMsTUFBZCxHQUF1QixDQUF2Qjs7QUFFQSxtQkFBTyxLQUFLLEtBQUwsQ0FBVyxNQUFsQixFQUEwQjtBQUN0QixxQkFBSyxLQUFMLENBQVcsR0FBWCxHQUFpQixLQUFqQjtBQUNIO0FBQ0o7Ozs7OztBQUdMLEtBQUssRUFBTCxHQUFVLENBQVY7QUFDQSxLQUFLLEVBQUwsR0FBVSxDQUFWO0FBQ0EsS0FBSyxFQUFMLEdBQVUsQ0FBVjtBQUNBLEtBQUssRUFBTCxHQUFVLENBQVY7O0lBRXFCLFE7QUFDakIsc0JBQVksTUFBWixFQUFxRDtBQUFBLFlBQWpDLFFBQWlDLHVFQUF0QixDQUFDLENBQXFCO0FBQUEsWUFBbEIsV0FBa0IsdUVBQUosQ0FBQyxDQUFHOztBQUFBOztBQUNqRCxhQUFLLElBQUwsR0FBWSxJQUFJLElBQUosQ0FBUyxNQUFULEVBQWlCLENBQWpCLEVBQW9CLFFBQXBCLEVBQThCLFdBQTlCLENBQVo7QUFDSDs7OzsrQkFFTSxJLEVBQU07QUFDVCxnQkFBSSxNQUFNLE9BQU4sQ0FBYyxJQUFkLENBQUosRUFBeUI7QUFDckIscUJBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxLQUFLLE1BQXpCLEVBQWlDLEdBQWpDLEVBQXNDO0FBQ2xDLHlCQUFLLElBQUwsQ0FBVSxNQUFWLENBQWlCLEtBQUssQ0FBTCxDQUFqQjtBQUNIO0FBQ0osYUFKRCxNQUlPO0FBQ0gscUJBQUssSUFBTCxDQUFVLE1BQVYsQ0FBaUIsSUFBakI7QUFDSDtBQUNKOzs7Z0NBRU87QUFDSixpQkFBSyxJQUFMLENBQVUsS0FBVjtBQUNIOzs7aUNBRVEsSSxFQUFNO0FBQ1gsbUJBQU8sS0FBSyxJQUFMLENBQVUsUUFBVixDQUFtQixJQUFuQixDQUFQO0FBQ0g7Ozs7OztrQkFyQmdCLFE7Ozs7Ozs7O2tCQy9HRyxLOztBQUZ4Qjs7Ozs7O0FBRWUsU0FBUyxLQUFULENBQWUsR0FBZixFQUE2QztBQUFBLFFBQXpCLE9BQXlCLHVFQUFmLEVBQWU7QUFBQSxRQUFYLElBQVcsdUVBQUosRUFBSTs7QUFDeEQsVUFBTSxtQkFBbUIsR0FBbkIsQ0FBTjtBQUNBLGNBQVUsbUJBQW1CLE9BQW5CLENBQVY7O0FBRUEsUUFBTSxXQUFXLG1CQUFtQixVQUFuQixDQUFqQjtBQUNBLFdBQU8sWUFBVSxtQkFBbUIsSUFBbkIsQ0FBVixHQUFxQyxRQUFyQyxHQUFrRCxFQUF6RDs7QUFFQSxXQUFPLDBDQUF5QixPQUF6QixjQUF5QyxJQUF6QyxHQUFnRCxHQUFoRCxDQUFQO0FBQ0g7Ozs7Ozs7O2tCQ1J1QixROztBQUZ4Qjs7Ozs7O0FBRWUsU0FBUyxRQUFULENBQWtCLEdBQWxCLEVBQXVCO0FBQ2xDLFVBQU0sbUJBQW1CLEdBQW5CLENBQU47QUFDQSxXQUFPLHVFQUFzRCxHQUF0RCxDQUFQO0FBQ0g7Ozs7Ozs7O2tCQ0h1QixrQjs7QUFGeEI7Ozs7OztBQUVlLFNBQVMsa0JBQVQsQ0FBNEIsS0FBNUIsRUFBbUMsUUFBbkMsRUFBNkMsR0FBN0MsRUFBZ0g7QUFBQSxRQUE5RCxLQUE4RCx1RUFBdEQsRUFBc0Q7QUFBQSxRQUFsRCxLQUFrRCx1RUFBMUMsRUFBMEM7QUFBQSxRQUF0QyxPQUFzQyx1RUFBNUIsRUFBNEI7QUFBQSxRQUF4QixJQUF3Qix1RUFBakIsRUFBaUI7QUFBQSxRQUFiLE1BQWEsdUVBQUosRUFBSTs7QUFDM0gsWUFBUSxtQkFBbUIsS0FBbkIsQ0FBUjtBQUNBLGNBQVUsbUJBQW1CLE9BQW5CLENBQVY7QUFDQSxXQUFPLG1CQUFtQixJQUFuQixDQUFQOztBQUVBLFFBQU0sb0RBQWtELEtBQWxELGdCQUFrRSxNQUFsRSxzQkFBeUYsUUFBL0Y7QUFDQSxRQUFNLG9CQUFrQixLQUFsQixjQUFnQyxHQUFoQyxpQkFBK0MsT0FBL0MscUJBQXNFLElBQXRFLGlCQUFzRixLQUE1Rjs7QUFFQSxXQUFPLCtEQUE4QyxNQUE5QyxTQUF3RCxPQUF4RCxDQUFQO0FBQ0g7Ozs7Ozs7O2tCQ1R1QixVOztBQUZ4Qjs7Ozs7O0FBRWUsU0FBUyxVQUFULENBQW9CLEdBQXBCLEVBQXlCO0FBQ3BDLFVBQU0sbUJBQW1CLEdBQW5CLENBQU47QUFDQSxXQUFPLDREQUEyQyxHQUEzQyxDQUFQO0FBQ0g7Ozs7Ozs7OztBQ0xEOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7a0JBRWU7QUFDWCwwQkFEVztBQUVYLGdDQUZXO0FBR1gsb0RBSFc7QUFJWCxvQ0FKVztBQUtYLGdDQUxXO0FBTVgsa0NBTlc7QUFPWCw0QkFQVztBQVFYLDRCQVJXO0FBU1gsc0JBVFc7QUFVWCw4QkFWVztBQVdYLGtDQVhXO0FBWVgsMEJBWlc7QUFhWDtBQWJXLEM7Ozs7Ozs7O2tCQ1pTLFE7O0FBRnhCOzs7Ozs7QUFFZSxTQUFTLFFBQVQsQ0FBa0IsR0FBbEIsRUFBbUM7QUFBQSxRQUFaLEtBQVksdUVBQUosRUFBSTs7QUFDOUMsVUFBTSxtQkFBbUIsR0FBbkIsQ0FBTjtBQUNBLFlBQVEsbUJBQW1CLEtBQW5CLENBQVI7QUFDQSxXQUFPLDhFQUE2RCxHQUE3RCxlQUEwRSxLQUExRSxDQUFQO0FBQ0g7Ozs7Ozs7O2tCQ0p1QixTOztBQUZ4Qjs7Ozs7O0FBRWUsU0FBUyxTQUFULENBQW1CLEdBQW5CLEVBQXdCLEtBQXhCLEVBQTBDO0FBQUEsUUFBWCxJQUFXLHVFQUFKLEVBQUk7O0FBQ3JELFVBQU0sbUJBQW1CLEdBQW5CLENBQU47QUFDQSxZQUFRLG1CQUFtQixLQUFuQixDQUFSO0FBQ0EsV0FBTyxtQkFBbUIsSUFBbkIsQ0FBUDtBQUNBLFdBQU8sdUVBQXNELEdBQXRELGVBQW1FLEtBQW5FLHFCQUF3RixJQUF4RixDQUFQO0FBQ0g7Ozs7Ozs7O2tCQ0x1QixNOztBQUZ4Qjs7Ozs7O0FBRWUsU0FBUyxNQUFULENBQWdCLEdBQWhCLEVBQWlDO0FBQUEsUUFBWixLQUFZLHVFQUFKLEVBQUk7O0FBQzVDLFVBQU0sbUJBQW1CLEdBQW5CLENBQU47QUFDQSxZQUFRLG1CQUFtQixLQUFuQixDQUFSO0FBQ0EsV0FBTyw0REFBMkMsR0FBM0MsZUFBd0QsS0FBeEQsQ0FBUDtBQUNIOzs7Ozs7OztrQkNKdUIsUzs7QUFGeEI7Ozs7OztBQUVlLFNBQVMsU0FBVCxDQUFtQixHQUFuQixFQUFvQztBQUFBLFFBQVosS0FBWSx1RUFBSixFQUFJOztBQUMvQyxVQUFNLG1CQUFtQixHQUFuQixDQUFOO0FBQ0EsWUFBUSxtQkFBbUIsS0FBbkIsQ0FBUjtBQUNBLFdBQU8sNEVBQTJELEdBQTNELGVBQXdFLEtBQXhFLENBQVA7QUFDSDs7Ozs7Ozs7a0JDTnVCLEc7QUFBVCxTQUFTLEdBQVQsQ0FBYSxHQUFiLEVBQTZCO0FBQUEsUUFBWCxJQUFXLHVFQUFKLEVBQUk7O0FBQ3hDLFVBQU0sbUJBQW1CLEdBQW5CLENBQU47O0FBRUEsUUFBTSxXQUFXLG1CQUFtQixVQUFuQixDQUFqQjtBQUNBLFdBQU8sWUFBVSxtQkFBbUIsSUFBbkIsQ0FBVixHQUFxQyxRQUFyQyxHQUFrRCxFQUF6RDs7QUFFQSxRQUFNLE1BQU0sa0JBQWtCLElBQWxCLENBQXVCLFVBQVUsU0FBakMsQ0FBWjtBQUNBLFFBQU0sUUFBUSxNQUFNLEdBQU4sR0FBWSxHQUExQjs7QUFFQSxXQUFPLFFBQVAsQ0FBZ0IsSUFBaEIsWUFBOEIsS0FBOUIsYUFBMkMsSUFBM0MsR0FBa0QsR0FBbEQ7QUFDSDs7Ozs7Ozs7a0JDUnVCLE87O0FBRnhCOzs7Ozs7QUFFZSxTQUFTLE9BQVQsQ0FBaUIsR0FBakIsRUFBOEQ7QUFBQSxRQUF4QyxJQUF3Qyx1RUFBakMsRUFBaUM7QUFBQSxRQUE3QixRQUE2Qix1RUFBbEIsRUFBa0I7QUFBQSxRQUFkLE9BQWMsdUVBQUosRUFBSTs7QUFDekUsVUFBTSxtQkFBbUIsR0FBbkIsQ0FBTjtBQUNBLFdBQU8sbUJBQW1CLElBQW5CLENBQVA7QUFDQSxlQUFXLG1CQUFtQixRQUFuQixDQUFYO0FBQ0EsY0FBVSxtQkFBbUIsT0FBbkIsQ0FBVjs7QUFFQSxXQUFPLCtEQUE4QyxHQUE5QyxjQUEwRCxJQUExRCxrQkFBMkUsUUFBM0UsaUJBQStGLE9BQS9GLENBQVA7QUFDSDs7Ozs7Ozs7a0JDUHVCLFM7O0FBRnhCOzs7Ozs7QUFFZSxTQUFTLFNBQVQsQ0FBbUIsR0FBbkIsRUFBa0U7QUFBQSxRQUExQyxLQUEwQyx1RUFBbEMsRUFBa0M7QUFBQSxRQUE5QixXQUE4Qix1RUFBaEIsRUFBZ0I7QUFBQSxRQUFaLEtBQVksdUVBQUosRUFBSTs7QUFDN0UsVUFBTSxtQkFBbUIsR0FBbkIsQ0FBTjtBQUNBLFlBQVEsbUJBQW1CLEtBQW5CLENBQVI7QUFDQSxrQkFBYyxtQkFBbUIsV0FBbkIsQ0FBZDtBQUNBLFlBQVEsbUJBQW1CLEtBQW5CLENBQVI7QUFDQSxXQUFPLDREQUEyQyxHQUEzQyxlQUF3RCxLQUF4RCxxQkFBNkUsV0FBN0UsZUFBa0csS0FBbEcsQ0FBUDtBQUNIOzs7Ozs7OztrQkNOdUIsSzs7QUFGeEI7Ozs7OztBQUVlLFNBQVMsS0FBVCxDQUFlLEdBQWYsRUFBNEM7QUFBQSxRQUF4QixLQUF3Qix1RUFBaEIsRUFBZ0I7QUFBQSxRQUFaLEtBQVksdUVBQUosRUFBSTs7QUFDdkQsVUFBTSxtQkFBbUIsR0FBbkIsQ0FBTjtBQUNBLFlBQVEsbUJBQW1CLEtBQW5CLENBQVI7QUFDQSxZQUFRLG1CQUFtQixLQUFuQixDQUFSOztBQUVBLFFBQU0sa0JBQWdCLEdBQWhCLHVCQUFxQyxLQUFyQyxhQUFrRCxLQUFsRCwrQkFBTjtBQUNBLFdBQU8sbUVBQWtELE1BQWxELENBQVA7QUFDSDs7Ozs7Ozs7a0JDVHVCLFE7QUFBVCxTQUFTLFFBQVQsQ0FBa0IsR0FBbEIsRUFBa0M7QUFBQSxRQUFYLElBQVcsdUVBQUosRUFBSTs7QUFDN0MsVUFBTSxtQkFBbUIsR0FBbkIsQ0FBTjs7QUFFQSxRQUFNLFdBQVcsbUJBQW1CLFVBQW5CLENBQWpCO0FBQ0EsV0FBTyxZQUFVLG1CQUFtQixJQUFuQixDQUFWLEdBQXFDLFFBQXJDLEdBQWtELEVBQXpEOztBQUVBLFdBQU8sUUFBUCxDQUFnQixJQUFoQiw2QkFBK0MsSUFBL0MsR0FBc0QsR0FBdEQ7QUFDSDs7Ozs7Ozs7QUNQRCxTQUFTLElBQVQsQ0FBYyxHQUFkLEVBQW1CO0FBQ2YsUUFBSSxPQUFPLElBQVg7O0FBRUEsUUFBSTtBQUNBLGVBQU8sYUFBYSxPQUFiLENBQXFCLEdBQXJCLENBQVA7QUFDSCxLQUZELENBRUUsT0FBTyxHQUFQLEVBQVksQ0FBRTs7QUFFaEIsV0FBTyxJQUFQO0FBQ0g7O0FBRUQsU0FBUyxJQUFULENBQWMsR0FBZCxFQUFtQixJQUFuQixFQUF5QjtBQUNyQixRQUFJO0FBQ0EscUJBQWEsT0FBYixDQUFxQixHQUFyQixFQUEwQixJQUExQjtBQUNBLGVBQU8sSUFBUDtBQUNILEtBSEQsQ0FHRSxPQUFPLEdBQVAsRUFBWTtBQUNWLGdCQUFRLEtBQVIsQ0FBYyxnQ0FBZDtBQUNIO0FBQ0QsV0FBTyxLQUFQO0FBQ0g7O0FBRUQsU0FBUyxRQUFULENBQWtCLEdBQWxCLEVBQXVCO0FBQ25CLFFBQU0sT0FBTyxLQUFLLEdBQUwsQ0FBYjtBQUNBLFdBQU8sT0FBTyxLQUFLLEtBQUwsQ0FBVyxJQUFYLENBQVAsR0FBMEIsSUFBakM7QUFDSDs7QUFFRCxTQUFTLFFBQVQsQ0FBa0IsR0FBbEIsRUFBdUIsSUFBdkIsRUFBNkI7QUFDekIsV0FBTyxLQUFLLEdBQUwsRUFBVSxLQUFLLFNBQUwsQ0FBZSxJQUFmLENBQVYsQ0FBUDtBQUNIOztBQUVELFNBQVMsTUFBVCxDQUFnQixHQUFoQixFQUFxQjtBQUNqQixRQUFJO0FBQ0EscUJBQWEsVUFBYixDQUF3QixHQUF4QjtBQUNILEtBRkQsQ0FFRSxPQUFPLEdBQVAsRUFBWSxDQUFFO0FBQ25COztrQkFFYyxFQUFDLFVBQUQsRUFBTyxVQUFQLEVBQWEsa0JBQWIsRUFBdUIsa0JBQXZCLEVBQWlDLGNBQWpDLEU7Ozs7Ozs7O2tCQ2xDUyxVO0FBRHhCO0FBQ2UsU0FBUyxVQUFULENBQW9CLEdBQXBCLEVBQXlCLE1BQXpCLEVBQWlDO0FBQzVDLFFBQUksUUFBUSxJQUFJLE9BQUosQ0FBWSxNQUFaLENBQVo7QUFDQSxRQUFJLFVBQVUsQ0FBQyxDQUFmLEVBQWtCO0FBQ2QsZUFBTyxFQUFQO0FBQ0g7QUFDRCxhQUFTLE9BQU8sTUFBaEI7QUFDQSxXQUFPLElBQUksS0FBSixDQUFVLEtBQVYsQ0FBUDtBQUNIOzs7Ozs7OztrQkNQdUIsUztBQUR4QjtBQUNlLFNBQVMsU0FBVCxDQUFtQixHQUFuQixFQUF3QixNQUF4QixFQUFnQztBQUMzQyxRQUFJLFFBQVEsSUFBSSxXQUFKLENBQWdCLE1BQWhCLENBQVo7QUFDQSxRQUFJLFVBQVUsQ0FBQyxDQUFmLEVBQWtCO0FBQ2QsZUFBTyxFQUFQO0FBQ0g7QUFDRCxhQUFTLE9BQU8sTUFBaEI7QUFDQSxXQUFPLElBQUksS0FBSixDQUFVLEtBQVYsQ0FBUDtBQUNIOzs7Ozs7OztrQkNQdUIsVztBQUR4QjtBQUNlLFNBQVMsV0FBVCxDQUFxQixHQUFyQixFQUEwQixNQUExQixFQUFrQztBQUM3QyxRQUFNLFFBQVEsSUFBSSxPQUFKLENBQVksTUFBWixDQUFkO0FBQ0EsUUFBSSxVQUFVLENBQUMsQ0FBZixFQUFrQjtBQUNkLGVBQU8sRUFBUDtBQUNIO0FBQ0QsV0FBTyxJQUFJLEtBQUosQ0FBVSxDQUFWLEVBQWEsS0FBYixDQUFQO0FBQ0g7Ozs7Ozs7O2tCQ051QixVO0FBRHhCO0FBQ2UsU0FBUyxVQUFULENBQW9CLEdBQXBCLEVBQXlCLE1BQXpCLEVBQWlDO0FBQzVDLFFBQU0sUUFBUSxJQUFJLFdBQUosQ0FBZ0IsTUFBaEIsQ0FBZDtBQUNBLFFBQUksVUFBVSxDQUFDLENBQWYsRUFBa0I7QUFDZCxlQUFPLEVBQVA7QUFDSDtBQUNELFdBQU8sSUFBSSxLQUFKLENBQVUsQ0FBVixFQUFhLEtBQWIsQ0FBUDtBQUNIOzs7Ozs7OztrQkNOdUIsVTtBQUR4QjtBQUNlLFNBQVMsVUFBVCxDQUFvQixHQUFwQixFQUF5QixNQUF6QixFQUFpQztBQUM1QyxXQUFPLElBQUksT0FBSixDQUFZLE1BQVosTUFBd0IsQ0FBL0I7QUFDSDs7Ozs7Ozs7a0JDRnVCLE87QUFEeEI7QUFDZSxTQUFTLE9BQVQsQ0FBaUIsR0FBakIsRUFBc0IsS0FBdEIsRUFBNkIsR0FBN0IsRUFBa0M7QUFDN0MsUUFBSSxTQUFTLEVBQWI7QUFDQSxRQUFJLGFBQWEsSUFBSSxPQUFKLENBQVksS0FBWixDQUFqQjtBQUNBLFFBQUksZUFBZSxDQUFDLENBQXBCLEVBQXVCO0FBQ25CLHNCQUFjLE1BQU0sTUFBcEI7QUFDQSxZQUFNLFdBQVcsSUFBSSxPQUFKLENBQVksR0FBWixFQUFpQixVQUFqQixDQUFqQjtBQUNBLFlBQUksYUFBYSxDQUFDLENBQWxCLEVBQXFCO0FBQ2pCLHFCQUFTLElBQUksS0FBSixDQUFVLFVBQVYsRUFBc0IsUUFBdEIsQ0FBVDtBQUNIO0FBQ0o7QUFDRCxXQUFPLE1BQVA7QUFDSDs7Ozs7Ozs7a0JDSnVCLEs7O0FBUnhCOzs7O0FBQ0E7Ozs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNlLFNBQVMsS0FBVCxDQUFlLEdBQWYsRUFBb0IsR0FBcEIsRUFBc0M7QUFBQSxRQUFiLEtBQWEsdUVBQUwsR0FBSzs7QUFDakQsUUFBTSxNQUFNLEVBQVo7O0FBRUEsUUFBSSxDQUFDLEdBQUQsSUFBUSxDQUFDLElBQUksUUFBSixDQUFhLEtBQWIsQ0FBYixFQUFrQztBQUM5QixlQUFPLEdBQVA7QUFDSDs7QUFFRCxRQUFJLFVBQVUsR0FBZCxFQUFtQjtBQUNmLGVBQU8sS0FBUDtBQUNIOztBQUVELFFBQUksV0FBVyxDQUFmO0FBQ0EsUUFBTSxXQUFXLElBQUksTUFBSixDQUFXLE9BQU8sNkJBQWMsS0FBZCxDQUFQLEdBQThCLEtBQXpDLENBQWpCOztBQUVBLFdBQU8sV0FBVyxJQUFJLE1BQXRCLEVBQThCO0FBQzFCLFlBQUksWUFBWSxJQUFJLE1BQUosQ0FBVyxRQUFYLEVBQXFCLEdBQXJCLENBQWhCO0FBQ0EsWUFBSSxDQUFDLFVBQVUsUUFBVixDQUFtQixLQUFuQixDQUFMLEVBQWdDO0FBQzVCLGdCQUFJLElBQUosQ0FBUyx3QkFBUyxTQUFULEVBQW9CLFVBQVUsTUFBOUIsQ0FBVDtBQUNBLHdCQUFZLFVBQVUsTUFBdEI7QUFDSDtBQUNELG9CQUFZLFVBQVUsT0FBVixDQUFrQixRQUFsQixFQUE0QixFQUE1QixDQUFaO0FBQ0Esb0JBQVksVUFBVSxNQUF0QjtBQUNBLFlBQUksSUFBSixDQUFTLFVBQVUsSUFBVixFQUFUO0FBQ0g7QUFDRCxXQUFPLEdBQVA7QUFDSDs7Ozs7Ozs7a0JDaEN1QixVO0FBRHhCO0FBQ2UsU0FBUyxVQUFULENBQW9CLEdBQXBCLEVBQXNDO0FBQUEsUUFBYixHQUFhLHVFQUFQLEtBQU87O0FBQ2pELFFBQU0sU0FBUyxJQUFJLFFBQUosRUFBZjtBQUNBLFFBQU0sS0FBSyxNQUFNLFNBQU4sR0FBa0IsT0FBN0I7QUFDQSxXQUFPLE9BQU8sT0FBUCxDQUFlLEVBQWYsRUFBbUIsVUFBQyxLQUFEO0FBQUEsZUFBVyxNQUFNLFdBQU4sRUFBWDtBQUFBLEtBQW5CLENBQVA7QUFDSDs7Ozs7Ozs7a0JDRnVCLE87O0FBSHhCOzs7Ozs7QUFFQTtBQUNlLFNBQVMsT0FBVCxDQUFpQixHQUFqQixFQUFzQixNQUF0QixFQUE4QixhQUE5QixFQUE2QztBQUN4RCxRQUFNLGFBQWEsNkJBQWMsTUFBZCxDQUFuQjtBQUNBLFFBQU0sUUFBUyxDQUFDLGFBQUYsR0FBbUIsSUFBbkIsR0FBMEIsR0FBeEM7QUFDQSxXQUFPLElBQUksS0FBSixDQUFVLElBQUksTUFBSixDQUFXLFVBQVgsRUFBdUIsS0FBdkIsQ0FBVixFQUF5QyxNQUFoRDtBQUNIOzs7Ozs7OztrQkNKdUIsWTtBQUh4QjtBQUNBO0FBQ0E7QUFDZSxTQUFTLFlBQVQsR0FBZ0Q7QUFBQSxRQUExQixNQUEwQix1RUFBakIsRUFBaUI7QUFBQSxRQUFiLE1BQWEsdUVBQUosRUFBSTs7O0FBRTNELFFBQUksV0FBVyxNQUFmLEVBQXVCO0FBQ25CLGVBQU8sQ0FBUDtBQUNIOztBQUVELFFBQUksQ0FBQyxPQUFPLE1BQVosRUFBb0I7QUFDaEIsZUFBTyxPQUFPLE1BQWQ7QUFDSDs7QUFFRCxRQUFJLENBQUMsT0FBTyxNQUFaLEVBQW9CO0FBQ2hCLGVBQU8sT0FBTyxNQUFkO0FBQ0g7O0FBRUQsUUFBTSxJQUFJLEVBQVY7QUFDQSxRQUFJLFVBQUo7QUFBQSxRQUFPLFVBQVA7QUFBQSxRQUFVLGFBQVY7O0FBRUEsU0FBSyxJQUFJLENBQVQsRUFBWSxLQUFLLE9BQU8sTUFBeEIsRUFBZ0MsR0FBaEMsRUFBcUM7QUFDakMsVUFBRSxDQUFGLElBQU8sRUFBUDtBQUNIO0FBQ0QsU0FBSyxJQUFJLENBQVQsRUFBWSxLQUFLLE9BQU8sTUFBeEIsRUFBZ0MsR0FBaEMsRUFBcUM7QUFDakMsVUFBRSxDQUFGLEVBQUssQ0FBTCxJQUFVLENBQVY7QUFDSDtBQUNELFNBQUssSUFBSSxDQUFULEVBQVksS0FBSyxPQUFPLE1BQXhCLEVBQWdDLEdBQWhDLEVBQXFDO0FBQ2pDLFVBQUUsQ0FBRixFQUFLLENBQUwsSUFBVSxDQUFWO0FBQ0g7O0FBRUQsU0FBSyxJQUFJLENBQVQsRUFBWSxLQUFLLE9BQU8sTUFBeEIsRUFBZ0MsR0FBaEMsRUFBcUM7O0FBRWpDLFlBQU0sS0FBSyxPQUFPLE1BQVAsQ0FBYyxJQUFJLENBQWxCLENBQVg7QUFDQSxhQUFLLElBQUksQ0FBVCxFQUFZLEtBQUssT0FBTyxNQUF4QixFQUFnQyxHQUFoQyxFQUFxQzs7QUFFakMsZ0JBQU0sS0FBSyxPQUFPLE1BQVAsQ0FBYyxJQUFJLENBQWxCLENBQVg7O0FBRUEsZ0JBQUksT0FBTyxFQUFYLEVBQWU7QUFDWCx1QkFBTyxDQUFQO0FBQ0gsYUFGRCxNQUVPO0FBQ0gsdUJBQU8sQ0FBUDtBQUNIOztBQUVELGNBQUUsQ0FBRixFQUFLLENBQUwsSUFBVSxLQUFLLEdBQUwsQ0FBUyxFQUFFLElBQUksQ0FBTixFQUFTLENBQVQsSUFBYyxDQUF2QixFQUEwQixFQUFFLENBQUYsRUFBSyxJQUFJLENBQVQsSUFBYyxDQUF4QyxFQUEyQyxFQUFFLElBQUksQ0FBTixFQUFTLElBQUksQ0FBYixJQUFrQixJQUE3RCxDQUFWO0FBQ0g7QUFDSjs7QUFFRCxXQUFPLEVBQUUsT0FBTyxNQUFULEVBQWlCLE9BQU8sTUFBeEIsQ0FBUDtBQUNIOzs7Ozs7OztrQkMvQ3VCLFE7QUFEeEI7QUFDZSxTQUFTLFFBQVQsQ0FBa0IsR0FBbEIsRUFBdUIsTUFBdkIsRUFBK0I7QUFDMUMsV0FBTyxJQUFJLFdBQUosQ0FBZ0IsTUFBaEIsTUFBNEIsSUFBSSxNQUFKLEdBQWEsT0FBTyxNQUF2RDtBQUNIOzs7Ozs7OztrQkNjdUIsVTtBQWpCeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFNLFlBQVk7QUFDZCxTQUFLLE9BRFM7QUFFZCxTQUFLLE1BRlM7QUFHZCxTQUFLLE1BSFM7QUFJZCxTQUFLLFFBSlM7QUFLZCxVQUFNLE9BTFE7QUFNZCxTQUFLLFFBTlM7QUFPZCxTQUFLLFFBUFM7QUFRZCxTQUFLO0FBUlMsQ0FBbEI7O0FBV2UsU0FBUyxVQUFULENBQW9CLE1BQXBCLEVBQTRCO0FBQ3ZDLFdBQU8sT0FBTyxNQUFQLEVBQ0YsT0FERSxDQUNNLGNBRE4sRUFDc0IsU0FBUyxhQUFULENBQXVCLENBQXZCLEVBQTBCO0FBQy9DLGVBQU8sVUFBVSxDQUFWLENBQVA7QUFDSCxLQUhFLENBQVA7QUFJSDs7Ozs7Ozs7a0JDckJ1QixhO0FBRHhCO0FBQ2UsU0FBUyxhQUFULENBQXVCLE9BQXZCLEVBQWdDO0FBQzNDLFdBQU8sUUFBUSxPQUFSLENBQWdCLHFDQUFoQixFQUF1RCxNQUF2RCxDQUFQO0FBQ0g7Ozs7Ozs7O2tCQ0F1QixPOztBQUh4Qjs7Ozs7O0FBRUE7QUFDZSxTQUFTLE9BQVQsQ0FBaUIsR0FBakIsRUFBc0I7QUFDakMsV0FBTyxDQUFDLENBQUMscUNBQXNCLEdBQXRCLEVBQTJCLE1BQXBDO0FBQ0g7Ozs7Ozs7OztBQ0xEOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O2tCQUVlO0FBQ1gsb0NBRFc7QUFFWCxrQ0FGVztBQUdYLHNDQUhXO0FBSVgsb0NBSlc7QUFLWCxvQ0FMVztBQU1YLDhCQU5XO0FBT1gsMEJBUFc7QUFRWCxvQ0FSVztBQVNYLDhCQVRXO0FBVVgsd0NBVlc7QUFXWCxnQ0FYVztBQVlYLG9DQVpXO0FBYVgsMENBYlc7QUFjWCw4QkFkVztBQWVYLGtDQWZXO0FBZ0JYLDhCQWhCVztBQWlCWCxnQ0FqQlc7QUFrQlgsd0NBbEJXO0FBbUJYLG9DQW5CVztBQW9CWCw0QkFwQlc7QUFxQlgsMERBckJXO0FBc0JYLDhCQXRCVztBQXVCWCx3Q0F2Qlc7QUF3Qlgsb0NBeEJXO0FBeUJYLGtDQXpCVztBQTBCWCxnQ0ExQlc7QUEyQlgsZ0NBM0JXO0FBNEJYLGdDQTVCVztBQTZCWCxnQ0E3Qlc7QUE4Qlg7QUE5QlcsQzs7Ozs7Ozs7a0JDOUJTLFM7QUFEeEI7QUFDZSxTQUFTLFNBQVQsQ0FBbUIsR0FBbkIsRUFBd0I7QUFDbkMsUUFBTSxPQUFPLG1DQUFiO0FBQ0EsV0FBTyxLQUFLLElBQUwsQ0FBVSxHQUFWLENBQVA7QUFDSDs7Ozs7Ozs7a0JDSHVCLE87QUFEeEI7QUFDZSxTQUFTLE9BQVQsQ0FBaUIsR0FBakIsRUFBc0IsTUFBdEIsRUFBOEIsTUFBOUIsRUFBc0M7QUFDakQsVUFBTSxPQUFPLEdBQVAsQ0FBTjtBQUNBLFdBQU8sSUFBSSxNQUFKLEdBQWEsTUFBcEIsRUFBNEI7QUFDeEIsY0FBTSxTQUFTLEdBQWY7QUFDSDtBQUNELFdBQU8sR0FBUDtBQUNIOzs7Ozs7OztrQkNOdUIsUTtBQUR4QjtBQUNlLFNBQVMsUUFBVCxDQUFrQixHQUFsQixFQUF1QixNQUF2QixFQUErQixNQUEvQixFQUF1QztBQUNsRCxVQUFNLE9BQU8sR0FBUCxDQUFOO0FBQ0EsV0FBTyxJQUFJLE1BQUosR0FBYSxNQUFwQixFQUE0QjtBQUN4QixlQUFPLE1BQVA7QUFDSDtBQUNELFdBQU8sR0FBUDtBQUNIOzs7Ozs7OztrQkNQdUIsWTtBQUFULFNBQVMsWUFBVCxDQUFzQixHQUF0QixFQUEyQjtBQUN0QyxVQUFNLElBQUksSUFBSixFQUFOOztBQUVBLFFBQU0sWUFBWSxJQUFJLFdBQUosQ0FBZ0IsR0FBaEIsQ0FBbEI7QUFDQSxRQUFJLFlBQVksQ0FBaEIsRUFBbUI7QUFDZixlQUFVLElBQUksS0FBSixDQUFVLENBQVYsRUFBYSxTQUFiLENBQVYsY0FBMEMsSUFBSSxLQUFKLENBQVUsWUFBWSxDQUF0QixDQUExQztBQUNIOztBQUVELFdBQU8sR0FBUDtBQUNIOzs7Ozs7OztrQkNOdUIsVTs7QUFIeEI7Ozs7OztBQUVBO0FBQ2UsU0FBUyxVQUFULENBQW9CLEdBQXBCLEVBQXlCO0FBQ3BDLFFBQU0sU0FBUyxJQUFJLFdBQUosR0FBa0IsT0FBbEIsQ0FBMEIsY0FBMUIsdUJBQWY7QUFDQSxXQUFPLE9BQU8sT0FBUCxDQUFlLFNBQWYsRUFBMEIsR0FBMUIsQ0FBUDtBQUNIOzs7Ozs7OztrQkNIdUIsTTs7QUFIeEI7Ozs7OztBQUVBO0FBQ2UsU0FBUyxNQUFULENBQWdCLEdBQWhCLEVBQXFCLE1BQXJCLEVBQW9EO0FBQUEsUUFBdkIsYUFBdUIsdUVBQVAsS0FBTzs7QUFDL0QsUUFBTSxhQUFhLDZCQUFjLE1BQWQsQ0FBbkI7QUFDQSxRQUFNLFFBQVEsZ0JBQWdCLEdBQWhCLEdBQXNCLElBQXBDO0FBQ0EsV0FBTyxJQUFJLE9BQUosQ0FBWSxJQUFJLE1BQUosQ0FBVyxVQUFYLEVBQXVCLEtBQXZCLENBQVosRUFBMkMsRUFBM0MsQ0FBUDtBQUNIOzs7Ozs7OztrQkNOdUIscUI7QUFEeEI7QUFDZSxTQUFTLHFCQUFULENBQStCLEdBQS9CLEVBQW9DO0FBQy9DLFdBQU8sSUFBSSxJQUFKLEdBQVcsT0FBWCxDQUFtQixNQUFuQixFQUEyQixHQUEzQixDQUFQO0FBQ0g7Ozs7Ozs7O2tCQ0Z1QixPO0FBRHhCO0FBQ2UsU0FBUyxPQUFULENBQWlCLEdBQWpCLEVBQXNCO0FBQ2pDLFdBQU8sSUFBSSxLQUFKLENBQVUsRUFBVixFQUFjLE9BQWQsR0FBd0IsSUFBeEIsQ0FBNkIsRUFBN0IsQ0FBUDtBQUNIOzs7Ozs7OztrQkNGdUIsWTtBQUR4QjtBQUNlLFNBQVMsWUFBVCxDQUFzQixHQUF0QixFQUEyQjtBQUN0QyxXQUFPLElBQUksS0FBSixDQUFVLEdBQVYsRUFBZSxPQUFmLEdBQXlCLElBQXpCLENBQThCLEdBQTlCLENBQVA7QUFDSDs7Ozs7Ozs7a0JDQXVCLFU7O0FBSHhCOzs7Ozs7QUFFQTtBQUNlLFNBQVMsVUFBVCxDQUFvQixDQUFwQixFQUF1QixDQUF2QixFQUEwQjtBQUNyQyxRQUFNLElBQUksNEJBQWEsQ0FBYixFQUFnQixDQUFoQixDQUFWO0FBQ0EsUUFBTSxJQUFJLEtBQUssR0FBTCxDQUFTLEVBQUUsTUFBWCxFQUFtQixFQUFFLE1BQXJCLENBQVY7QUFDQSxRQUFJLE1BQU0sQ0FBVixFQUFhO0FBQ1QsZUFBTyxDQUFQO0FBQ0g7QUFDRCxXQUFRLElBQUksSUFBSSxDQUFoQjtBQUNIOzs7Ozs7OztrQkNUdUIsUztBQUR4QjtBQUNlLFNBQVMsU0FBVCxDQUFtQixHQUFuQixFQUF3QjtBQUNuQyxXQUFPLElBQUksT0FBSixDQUFZLGVBQVosRUFBNkIsRUFBN0IsQ0FBUDtBQUNIOzs7Ozs7OztrQkNEdUIsUTs7QUFEeEI7QUFDZSxTQUFTLFFBQVQsQ0FBa0IsR0FBbEIsRUFBdUI7QUFDbEMsV0FBTyxJQUFJLE9BQUosQ0FBWSxNQUFaLEVBQW9CLFVBQVMsTUFBVCxFQUFpQjtBQUN4QyxZQUFNLFFBQVEsT0FBTyxXQUFQLEVBQWQ7QUFDQSxZQUFNLFFBQVEsT0FBTyxXQUFQLEVBQWQ7QUFDQSxnQkFBUSxNQUFSO0FBQ0ksaUJBQUssS0FBTDtBQUNJLHVCQUFPLEtBQVA7QUFDSixpQkFBSyxLQUFMO0FBQ0ksdUJBQU8sS0FBUDtBQUNKO0FBQ0ksdUJBQU8sTUFBUDtBQU5SO0FBUUgsS0FYTSxDQUFQO0FBWUg7Ozs7Ozs7O2tCQ2R1QixRO0FBRHhCO0FBQ2UsU0FBUyxRQUFULENBQWtCLE9BQWxCLEVBQXdDO0FBQUEsUUFBYixLQUFhLHVFQUFMLEdBQUs7O0FBQ25ELFFBQU0sSUFBSSxLQUFLLEtBQUwsQ0FBVyxVQUFVLElBQXJCLENBQVY7QUFDQSxRQUFNLElBQUksS0FBSyxLQUFMLENBQVksVUFBVSxJQUFYLEdBQW1CLEVBQTlCLENBQVY7QUFDQSxRQUFNLElBQUksS0FBSyxLQUFMLENBQVksVUFBVSxJQUFYLEdBQW1CLEVBQTlCLENBQVY7QUFDQSxRQUFNLEtBQUssQ0FBQyxJQUFJLEVBQUosR0FBUyxNQUFNLENBQWYsR0FBbUIsQ0FBcEIsSUFBeUIsS0FBcEM7QUFDQSxRQUFNLEtBQUssQ0FBQyxJQUFJLEVBQUosR0FBUyxNQUFNLENBQWYsR0FBbUIsQ0FBcEIsSUFBeUIsS0FBcEM7QUFDQSxRQUFNLEtBQU0sSUFBSSxFQUFKLEdBQVMsTUFBTSxDQUFmLEdBQW1CLENBQS9CO0FBQ0EsV0FBTyxLQUFLLEVBQUwsR0FBVSxFQUFqQjtBQUNIOzs7Ozs7OztrQkNUdUIsUTtBQUFULFNBQVMsUUFBVCxDQUFrQixHQUFsQixFQUF1QjtBQUNsQyxXQUFPLE9BQU8sSUFBSSxPQUFKLENBQVksVUFBWixFQUF3QixFQUF4QixDQUFQLENBQVA7QUFDSDs7Ozs7Ozs7a0JDRHVCLFE7QUFEeEI7QUFDZSxTQUFTLFFBQVQsQ0FBa0IsR0FBbEIsRUFBdUIsR0FBdkIsRUFBNEM7QUFBQSxRQUFoQixNQUFnQix1RUFBUCxLQUFPOztBQUN2RCxXQUFPLE9BQU8sTUFBZDtBQUNBLFFBQUksUUFBUSxHQUFaO0FBQ0EsUUFBSSxNQUFNLE1BQU4sR0FBZSxHQUFuQixFQUF3QjtBQUNwQixnQkFBUSxNQUFNLE1BQU4sQ0FBYSxDQUFiLEVBQWdCLEdBQWhCLENBQVI7QUFDQSxZQUFNLElBQUksT0FBVjtBQUNBLFlBQUksRUFBRSxJQUFGLENBQU8sSUFBSSxNQUFKLENBQVcsR0FBWCxDQUFQLENBQUosRUFBNkI7QUFDekIsb0JBQVEsTUFBTSxPQUFOLENBQWMsV0FBZCxFQUEyQixFQUEzQixFQUErQixTQUEvQixFQUFSO0FBQ0g7QUFDRCxpQkFBUyxNQUFUO0FBQ0g7QUFDRCxXQUFPLEtBQVA7QUFDSDs7Ozs7Ozs7a0JDWnVCLFM7QUFEeEI7QUFDZSxTQUFTLFNBQVQsQ0FBbUIsR0FBbkIsRUFBd0I7QUFDbkMsV0FBTyxJQUFJLEtBQUosQ0FBVSxVQUFWLEVBQXNCLE1BQTdCO0FBQ0g7Ozs7Ozs7O2tCQ0h1QixLO0FBQVQsU0FBUyxLQUFULENBQWUsUUFBZixFQUF5QixNQUF6QixFQUFpQyxLQUFqQyxFQUF3QyxLQUF4QyxFQUErQztBQUMxRCxRQUFJLENBQUMsT0FBTyxFQUFaLEVBQWdCO0FBQ1o7QUFDSDtBQUNELFdBQU8sRUFBUCxDQUFVLE1BQVYsRUFBa0IsT0FBbEIsRUFBMkIsUUFBM0IsRUFBcUMsTUFBckMsRUFBNkMsS0FBN0MsRUFBb0QsS0FBcEQ7QUFDSDs7Ozs7Ozs7O0FDTEQ7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7a0JBRWU7QUFDWCwwQkFEVztBQUVYLGdDQUZXO0FBR1g7QUFIVyxDOzs7Ozs7OztrQkNKUyxJO0FBQVQsU0FBUyxJQUFULENBQWMsU0FBZCxFQUF5QjtBQUNwQyxZQUFRLEdBQVIsQ0FBWSw4Q0FBWixFQUE0RCxTQUE1RDs7QUFFQTtBQUNBLEtBQUMsVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCO0FBQUMsVUFBRSx1QkFBRixJQUEyQixDQUEzQixDQUE2QixFQUFFLENBQUYsSUFBSyxFQUFFLENBQUYsS0FBTSxZQUFVO0FBQzlFLGFBQUMsRUFBRSxDQUFGLEVBQUssQ0FBTCxHQUFPLEVBQUUsQ0FBRixFQUFLLENBQUwsSUFBUSxFQUFoQixFQUFvQixJQUFwQixDQUF5QixTQUF6QjtBQUFvQyxTQURxQixFQUNwQixFQUFFLENBQUYsRUFBSyxDQUFMLEdBQU8sSUFBRSxJQUFJLElBQUosRUFEVyxDQUNBLElBQUUsRUFBRSxhQUFGLENBQWdCLENBQWhCLENBQUYsRUFDekQsSUFBRSxFQUFFLG9CQUFGLENBQXVCLENBQXZCLEVBQTBCLENBQTFCLENBRHVELENBQzFCLEVBQUUsS0FBRixHQUFRLENBQVIsQ0FBVSxFQUFFLEdBQUYsR0FBTSxDQUFOLENBQVEsRUFBRSxVQUFGLENBQWEsWUFBYixDQUEwQixDQUExQixFQUE0QixDQUE1QjtBQUNoRCxLQUhFLEVBR0EsTUFIQSxFQUdPLFFBSFAsRUFHZ0IsUUFIaEIsRUFHeUIseUNBSHpCLEVBR21FLElBSG5FO0FBSUE7O0FBRUEsV0FBTyxFQUFQLENBQVUsUUFBVixFQUFvQixTQUFwQixFQUErQixNQUEvQjtBQUNBLFdBQU8sRUFBUCxDQUFVLE1BQVYsRUFBa0IsVUFBbEI7QUFDSDs7Ozs7Ozs7a0JDWnVCLFE7QUFBVCxTQUFTLFFBQVQsQ0FBa0IsSUFBbEIsRUFBd0I7QUFDbkMsUUFBSSxDQUFDLE9BQU8sRUFBWixFQUFnQjtBQUNaO0FBQ0g7QUFDRCxXQUFPLEVBQVAsQ0FBVSxNQUFWLEVBQWtCLFVBQWxCLEVBQThCLElBQTlCO0FBQ0g7Ozs7Ozs7Ozs7O0FDTEQ7Ozs7SUFFcUIsSztBQUNqQixtQkFBWSxFQUFaLEVBQWdCLEtBQWhCLEVBQXVCLFFBQXZCLEVBQWlDLE9BQWpDLEVBQTBDO0FBQUE7O0FBQ3RDLGFBQUssRUFBTCxHQUFVLEVBQVY7O0FBRUEsWUFBSSxLQUFKLEVBQVc7QUFDUCxpQkFBSyxFQUFMLENBQVEsS0FBUixFQUFlLFFBQWYsRUFBeUIsT0FBekI7QUFDSDtBQUNKOzs7OzJCQUVFLEssRUFBTyxRLEVBQXdCO0FBQUEsZ0JBQWQsT0FBYyx1RUFBSixFQUFJOztBQUM5QixpQkFBSyxRQUFMLEdBQWdCLFFBQWhCO0FBQ0EsaUJBQUssSUFBTCxHQUFZLFFBQVEsSUFBUixxQkFBWjtBQUNBLGlCQUFLLEtBQUwsR0FBYSxRQUFRLEtBQVIsSUFBaUIsQ0FBOUI7QUFDQSxpQkFBSyxRQUFMLEdBQWdCLFFBQVEsUUFBeEI7QUFDQSxpQkFBSyxVQUFMLEdBQWtCLFFBQVEsVUFBMUI7QUFDQSxpQkFBSyxJQUFMLEdBQVksQ0FBWjtBQUNBLGlCQUFLLFFBQUwsR0FBZ0IsS0FBaEI7O0FBRUEsaUJBQUssTUFBTCxHQUFjLE9BQU8sSUFBUCxDQUFZLEtBQVosQ0FBZDtBQUNBLGlCQUFLLFVBQUwsR0FBa0IsRUFBbEI7QUFDQSxpQkFBSyxXQUFMLEdBQW1CLEVBQW5COztBQUVBLGlCQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksS0FBSyxNQUFMLENBQVksTUFBaEMsRUFBd0MsR0FBeEMsRUFBNkM7QUFDekMsb0JBQU0sT0FBTyxLQUFLLE1BQUwsQ0FBWSxDQUFaLENBQWI7QUFDQSxxQkFBSyxVQUFMLENBQWdCLElBQWhCLElBQXdCLEtBQUssRUFBTCxDQUFRLElBQVIsQ0FBeEI7QUFDQSxxQkFBSyxXQUFMLENBQWlCLElBQWpCLElBQXlCLE1BQU0sSUFBTixJQUFjLEtBQUssVUFBTCxDQUFnQixJQUFoQixDQUF2QztBQUNIO0FBQ0o7OzsrQkFFTSxFLEVBQUk7QUFDUCxnQkFBSSxLQUFLLElBQUwsS0FBYyxLQUFLLFFBQXZCLEVBQWlDO0FBQzdCO0FBQ0g7O0FBRUQsZ0JBQUksS0FBSyxLQUFMLEdBQWEsQ0FBakIsRUFBb0I7QUFDaEIscUJBQUssS0FBTCxJQUFjLEVBQWQ7QUFDQTtBQUNIOztBQUVELGlCQUFLLElBQUwsSUFBYSxFQUFiOztBQUVBLGdCQUFJLEtBQUssSUFBTCxHQUFZLEtBQUssUUFBckIsRUFBK0I7QUFDM0IscUJBQUssSUFBTCxHQUFZLEtBQUssUUFBakI7QUFDSDs7QUFFRCxpQkFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLEtBQUssTUFBTCxDQUFZLE1BQWhDLEVBQXdDLEdBQXhDLEVBQTZDO0FBQ3pDLG9CQUFNLE9BQU8sS0FBSyxNQUFMLENBQVksQ0FBWixDQUFiO0FBQ0EscUJBQUssRUFBTCxDQUFRLElBQVIsSUFBZ0IsS0FBSyxJQUFMLENBQVUsS0FBSyxJQUFmLEVBQXFCLEtBQUssVUFBTCxDQUFnQixJQUFoQixDQUFyQixFQUE0QyxLQUFLLFdBQUwsQ0FBaUIsSUFBakIsQ0FBNUMsRUFBb0UsS0FBSyxRQUF6RSxDQUFoQjtBQUNIOztBQUVELGdCQUFJLEtBQUssUUFBVCxFQUFtQjtBQUNmLHFCQUFLLFFBQUwsQ0FBYyxLQUFLLEVBQW5CO0FBQ0g7O0FBRUQsZ0JBQUksS0FBSyxJQUFMLEtBQWMsS0FBSyxRQUF2QixFQUFpQztBQUM3QixxQkFBSyxRQUFMLEdBQWdCLElBQWhCOztBQUVBLG9CQUFJLEtBQUssVUFBVCxFQUFxQjtBQUNqQix5QkFBSyxVQUFMLENBQWdCLEtBQUssRUFBckI7QUFDSDtBQUNKO0FBQ0o7OztnQ0FFTztBQUNKLGlCQUFLLElBQUwsR0FBWSxDQUFaO0FBQ0EsaUJBQUssUUFBTCxHQUFnQixLQUFoQjtBQUNIOzs7Ozs7a0JBbEVnQixLOzs7Ozs7OztBQ0ZyQixJQUFJLGVBQUo7QUFBQSxJQUNJLGVBREo7O0FBR0EsSUFBSSxPQUFPLFNBQVMsTUFBaEIsS0FBMkIsV0FBL0IsRUFBNEM7QUFDeEMsYUFBUyxRQUFUO0FBQ0EsYUFBUyxrQkFBVDtBQUNILENBSEQsTUFHTyxJQUFJLE9BQU8sU0FBUyxTQUFoQixLQUE4QixXQUFsQyxFQUErQztBQUNsRCxhQUFTLFdBQVQ7QUFDQSxhQUFTLHFCQUFUO0FBQ0gsQ0FITSxNQUdBLElBQUksT0FBTyxTQUFTLFFBQWhCLEtBQTZCLFdBQWpDLEVBQThDO0FBQ2pELGFBQVMsVUFBVDtBQUNBLGFBQVMsb0JBQVQ7QUFDSCxDQUhNLE1BR0EsSUFBSSxPQUFPLFNBQVMsWUFBaEIsS0FBaUMsV0FBckMsRUFBa0Q7QUFDckQsYUFBUyxjQUFUO0FBQ0EsYUFBUyx3QkFBVDtBQUNIOztrQkFFYztBQUNYLGtCQURXO0FBRVg7QUFGVyxDOzs7Ozs7Ozs7QUNqQmY7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTSxhQUFhLE9BQU8sTUFBUCxDQUFjLGtCQUFRLFNBQXRCLEVBQWlDO0FBQ2hELFlBQVE7QUFDSixhQUFLLGVBQVc7QUFDWixtQkFBTyxTQUFTLGNBQUksTUFBYixDQUFQO0FBQ0g7QUFIRztBQUR3QyxDQUFqQyxDQUFuQjs7QUFRQSxTQUFTLGtCQUFULEdBQThCO0FBQzFCLFFBQUksU0FBUyxjQUFJLE1BQWIsQ0FBSixFQUEwQjtBQUN0QixtQkFBVyxJQUFYLENBQWdCLFFBQWhCO0FBQ0gsS0FGRCxNQUVPO0FBQ0gsbUJBQVcsSUFBWCxDQUFnQixPQUFoQjtBQUNIO0FBQ0o7O0FBRUQsSUFBSSxjQUFJLE1BQVIsRUFBZ0I7QUFDWixhQUFTLGdCQUFULENBQTBCLGNBQUksTUFBOUIsRUFBc0Msa0JBQXRDLEVBQTBELEtBQTFEO0FBQ0g7O2tCQUVjLFUiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXJyYXkobGVuZ3RoLCB2YWx1ZSkge1xuICAgIGNvbnN0IGFyciA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgdmFsID0gdHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJyA/IHZhbHVlIDogaTtcbiAgICAgICAgYXJyLnB1c2godmFsKTtcbiAgICB9XG4gICAgcmV0dXJuIGFycjtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNsb25lKGFycikge1xuICAgIHJldHVybiBhcnIuc2xpY2UoMCk7XG59XG4iLCJpbXBvcnQgYXJyYXkgZnJvbSAnLi9hcnJheSc7XG5pbXBvcnQgY2xvbmUgZnJvbSAnLi9jbG9uZSc7XG5pbXBvcnQgbW92ZUVsZW1lbnQgZnJvbSAnLi9tb3ZlRWxlbWVudCc7XG5pbXBvcnQgbmVhcmVzdCBmcm9tICcuL25lYXJlc3QnO1xuaW1wb3J0IHJhbmRvbUNob2ljZSBmcm9tICcuL3JhbmRvbUNob2ljZSc7XG5pbXBvcnQgc29ydEFscGhhIGZyb20gJy4vc29ydEFscGhhJztcbmltcG9ydCBzb3J0TnVtYmVyZWQgZnJvbSAnLi9zb3J0TnVtYmVyZWQnO1xuaW1wb3J0IHNvcnROdW1lcmljIGZyb20gJy4vc29ydE51bWVyaWMnO1xuaW1wb3J0IHNvcnRSYW5kb20gZnJvbSAnLi9zb3J0UmFuZG9tJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGFycmF5LFxuICAgIGNsb25lLFxuICAgIG1vdmVFbGVtZW50LFxuICAgIG5lYXJlc3QsXG4gICAgcmFuZG9tQ2hvaWNlLFxuICAgIHNvcnRBbHBoYSxcbiAgICBzb3J0TnVtYmVyZWQsXG4gICAgc29ydE51bWVyaWMsXG4gICAgc29ydFJhbmRvbVxufTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1vdmVFbGVtZW50KGFyciwgZnJvbSwgdG8pIHtcbiAgICBhcnIgPSBhcnIuc2xpY2UoMCk7XG4gICAgY29uc3QgcmVtb3ZlZCA9IGFyci5zcGxpY2UoZnJvbSwgMSlbMF07XG4gICAgY29uc3QgaW5zZXJ0QXQgPSB0byA8IDAgPyBhcnIubGVuZ3RoICsgdG8gOiB0bztcbiAgICBhcnIuc3BsaWNlKGluc2VydEF0LCAwLCByZW1vdmVkKTtcbiAgICByZXR1cm4gYXJyO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbmVhcmVzdCh2YWx1ZSwgYXJyKSB7XG4gICAgbGV0IGxlYXN0ID0gTnVtYmVyLk1BWF9WQUxVRTtcbiAgICByZXR1cm4gYXJyLnJlZHVjZSgocmVzdWx0LCBpdGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IGRpZmYgPSBNYXRoLmFicyhpdGVtIC0gdmFsdWUpO1xuICAgICAgICBpZiAoZGlmZiA8IGxlYXN0KSB7XG4gICAgICAgICAgICBsZWFzdCA9IGRpZmY7XG4gICAgICAgICAgICByZXN1bHQgPSBpdGVtO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSwgLTEpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmFuZG9tQ2hvaWNlKGFycikge1xuICAgIHJldHVybiBhcnJbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXJyLmxlbmd0aCldO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc29ydEFscGhhKGEsIGIpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oeCwgeSkge1xuICAgICAgICAgICAgcmV0dXJuIFN0cmluZyh4W2FdKS50b0xvd2VyQ2FzZSgpID4gU3RyaW5nKHlbYV0pLnRvTG93ZXJDYXNlKCkgPyAxIDogLTE7XG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBTdHJpbmcoYSkudG9Mb3dlckNhc2UoKSA+IFN0cmluZyhiKS50b0xvd2VyQ2FzZSgpID8gMSA6IC0xO1xufVxuIiwiY29uc3QgcmUgPSAvW14wLTkuLV0vZztcblxuZnVuY3Rpb24gZGlmZihhLCBiKSB7XG4gICAgY29uc3QgYTEgPSBhLnJlcGxhY2UocmUsICcnKTtcbiAgICBjb25zdCBiMSA9IGIucmVwbGFjZShyZSwgJycpO1xuICAgIHJldHVybiBOdW1iZXIoYTEpIC0gTnVtYmVyKGIxKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc29ydE51bWJlcmVkKGEsIGIpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oeCwgeSkge1xuICAgICAgICAgICAgcmV0dXJuIGRpZmYoeFthXSwgeVthXSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBkaWZmKGEsIGIpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc29ydE51bWVyaWMoYSwgYikge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbih4LCB5KSB7XG4gICAgICAgICAgICByZXR1cm4gTnVtYmVyKHhbYV0pIC0gTnVtYmVyKHlbYV0pO1xuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gTnVtYmVyKGEpIC0gTnVtYmVyKGIpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc29ydFJhbmRvbSgpIHtcbiAgICByZXR1cm4gTWF0aC5yYW5kb20oKSA+IDAuNSA/IC0xIDogMTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJsb2NrU2Nyb2xsaW5nKHZhbHVlKSB7XG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9IHZhbHVlID8gJ2hpZGRlbicgOiAnJztcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGVsQ29vcmRzKGVsKSB7XG4gICAgY29uc3QgYm94ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQuYm9keTtcbiAgICBjb25zdCBkb2NFbCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuICAgIGNvbnN0IHNjcm9sbFRvcCA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2NFbC5zY3JvbGxUb3AgfHwgYm9keS5zY3JvbGxUb3A7XG4gICAgY29uc3Qgc2Nyb2xsTGVmdCA9IHdpbmRvdy5wYWdlWE9mZnNldCB8fCBkb2NFbC5zY3JvbGxMZWZ0IHx8IGJvZHkuc2Nyb2xsTGVmdDtcblxuICAgIGNvbnN0IGNsaWVudFRvcCA9IGRvY0VsLmNsaWVudFRvcCB8fCBib2R5LmNsaWVudFRvcCB8fCAwO1xuICAgIGNvbnN0IGNsaWVudExlZnQgPSBkb2NFbC5jbGllbnRMZWZ0IHx8IGJvZHkuY2xpZW50TGVmdCB8fCAwO1xuXG4gICAgY29uc3QgdG9wID0gYm94LnRvcCArIHNjcm9sbFRvcCAtIGNsaWVudFRvcDtcbiAgICBjb25zdCBsZWZ0ID0gYm94LmxlZnQgKyBzY3JvbGxMZWZ0IC0gY2xpZW50TGVmdDtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHRvcDogTWF0aC5yb3VuZCh0b3ApLFxuICAgICAgICBsZWZ0OiBNYXRoLnJvdW5kKGxlZnQpLFxuICAgICAgICB4OiBNYXRoLnJvdW5kKGxlZnQpLFxuICAgICAgICB5OiBNYXRoLnJvdW5kKHRvcClcbiAgICB9O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZm9yY2VSZWRyYXcoZWwpIHtcbiAgICBjb25zdCBkaXNwbGF5ID0gZWwuc3R5bGUuZGlzcGxheTtcbiAgICBlbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGVsLm9mZnNldEhlaWdodDtcbiAgICBlbC5zdHlsZS5kaXNwbGF5ID0gZGlzcGxheTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFBhZ2VIZWlnaHQoKSB7XG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LmJvZHk7XG4gICAgY29uc3QgZG9jID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG4gICAgcmV0dXJuIE1hdGgubWF4KFxuICAgICAgICBib2R5LnNjcm9sbEhlaWdodCB8fCAwLFxuICAgICAgICBib2R5Lm9mZnNldEhlaWdodCB8fCAwLFxuICAgICAgICBib2R5LmNsaWVudEhlaWdodCB8fCAwLFxuICAgICAgICBkb2MuY2xpZW50SGVpZ2h0IHx8IDAsXG4gICAgICAgIGRvYy5vZmZzZXRIZWlnaHQgfHwgMCxcbiAgICAgICAgZG9jLnNjcm9sbEhlaWdodCB8fCAwXG4gICAgKTtcbn1cbiIsImltcG9ydCBnZXRTY3JvbGxUb3AgZnJvbSAnLi9nZXRTY3JvbGxUb3AnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRTY3JvbGxQZXJjZW50YWdlKCkge1xuICAgIHJldHVybiAoZ2V0U2Nyb2xsVG9wKCkgKyB3aW5kb3cuaW5uZXJIZWlnaHQpIC8gZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQ7XG59XG4iLCJpbXBvcnQgZ2V0U2Nyb2xsVG9wIGZyb20gJy4vZ2V0U2Nyb2xsVG9wJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0U2Nyb2xsUmVtYWluaW5nKCkge1xuICAgIGNvbnN0IGIgPSBkb2N1bWVudC5ib2R5O1xuICAgIHJldHVybiBNYXRoLmFicyhnZXRTY3JvbGxUb3AoKSAtIChiLnNjcm9sbEhlaWdodCAtIGIuY2xpZW50SGVpZ2h0KSk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRTY3JvbGxUb3AoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0U3Jjc2V0SW1hZ2Uoc3Jjc2V0LCBwaXhlbFdpZHRoKSB7XG4gICAgcGl4ZWxXaWR0aCA9IHBpeGVsV2lkdGggfHwgd2luZG93LmlubmVyV2lkdGggKiAod2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMCk7XG5cbiAgICBjb25zdCBzZXQgPSBzcmNzZXQuc3BsaXQoJywnKVxuICAgICAgICAubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBbdXJsLCB3aWR0aF0gPSBpdGVtLnRyaW0oKS5zcGxpdCgvXFxzKy8pO1xuICAgICAgICAgICAgY29uc3Qgc2l6ZSA9IHBhcnNlSW50KHdpZHRoLnNsaWNlKDAsIC0xKSwgMTApO1xuICAgICAgICAgICAgcmV0dXJuIHt1cmwsIHNpemV9O1xuICAgICAgICB9KVxuICAgICAgICAuc29ydCgoYSwgYikgPT4gYi5zaXplIC0gYS5zaXplKTtcblxuICAgIGlmICghc2V0Lmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNldC5yZWR1Y2UoKHZhbHVlLCBpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiBpdGVtLnNpemUgPj0gcGl4ZWxXaWR0aCA/IGl0ZW0udXJsIDogdmFsdWU7XG4gICAgfSwgc2V0WzBdLnVybCk7XG59XG4iLCJpbXBvcnQgYmxvY2tTY3JvbGxpbmcgZnJvbSAnLi9ibG9ja1Njcm9sbGluZyc7XG5pbXBvcnQgZWxDb29yZHMgZnJvbSAnLi9lbENvb3Jkcyc7XG5pbXBvcnQgZm9yY2VSZWRyYXcgZnJvbSAnLi9mb3JjZVJlZHJhdyc7XG5pbXBvcnQgZ2V0UGFnZUhlaWdodCBmcm9tICcuL2dldFBhZ2VIZWlnaHQnO1xuaW1wb3J0IGdldFNjcm9sbFBlcmNlbnRhZ2UgZnJvbSAnLi9nZXRTY3JvbGxQZXJjZW50YWdlJztcbmltcG9ydCBnZXRTY3JvbGxSZW1haW5pbmcgZnJvbSAnLi9nZXRTY3JvbGxSZW1haW5pbmcnO1xuaW1wb3J0IGdldFNjcm9sbFRvcCBmcm9tICcuL2dldFNjcm9sbFRvcCc7XG5pbXBvcnQgZ2V0U3Jjc2V0SW1hZ2UgZnJvbSAnLi9nZXRTcmNzZXRJbWFnZSc7XG5pbXBvcnQgaXNFbGVtZW50SW5WaWV3cG9ydCBmcm9tICcuL2lzRWxlbWVudEluVmlld3BvcnQnO1xuaW1wb3J0IGlzUGFnZUVuZCBmcm9tICcuL2lzUGFnZUVuZCc7XG5pbXBvcnQgcmVzaXplIGZyb20gJy4vcmVzaXplJztcbmltcG9ydCBzY3JvbGwgZnJvbSAnLi9zY3JvbGwnO1xuaW1wb3J0IHNldFN0eWxlIGZyb20gJy4vc2V0U3R5bGUnO1xuaW1wb3J0IHRyYW5zaXRpb25FbmQgZnJvbSAnLi90cmFuc2l0aW9uRW5kJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGJsb2NrU2Nyb2xsaW5nLFxuICAgIGVsQ29vcmRzLFxuICAgIGZvcmNlUmVkcmF3LFxuICAgIGdldFBhZ2VIZWlnaHQsXG4gICAgZ2V0U2Nyb2xsUGVyY2VudGFnZSxcbiAgICBnZXRTY3JvbGxSZW1haW5pbmcsXG4gICAgZ2V0U2Nyb2xsVG9wLFxuICAgIGdldFNyY3NldEltYWdlLFxuICAgIGlzRWxlbWVudEluVmlld3BvcnQsXG4gICAgaXNQYWdlRW5kLFxuICAgIHJlc2l6ZSxcbiAgICBzY3JvbGwsXG4gICAgc2V0U3R5bGUsXG4gICAgdHJhbnNpdGlvbkVuZFxufTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzRWxlbWVudEluVmlld3BvcnQoZWwsIGJ1ZmZlciA9IDApIHtcbiAgICBjb25zdCByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgcmV0dXJuIChcbiAgICAgICAgcmVjdC50b3AgPj0gMCAtIGJ1ZmZlciAmJlxuICAgICAgICByZWN0LmxlZnQgPj0gMCAtIGJ1ZmZlciAmJlxuICAgICAgICByZWN0LmJvdHRvbSA8PSB3aW5kb3cuaW5uZXJIZWlnaHQgKyBidWZmZXIgJiZcbiAgICAgICAgcmVjdC5yaWdodCA8PSB3aW5kb3cuaW5uZXJXaWR0aCArIGJ1ZmZlclxuICAgICk7XG59XG4iLCJpbXBvcnQgZ2V0U2Nyb2xsUmVtYWluaW5nIGZyb20gJy4vZ2V0U2Nyb2xsUmVtYWluaW5nJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNQYWdlRW5kKGJ1ZmZlciA9IDApIHtcbiAgICByZXR1cm4gZ2V0U2Nyb2xsUmVtYWluaW5nKCkgPD0gYnVmZmVyO1xufVxuIiwiaW1wb3J0IGV2ZW50QnVzIGZyb20gJy4uL2V2ZW50cy9ldmVudEJ1cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlc2l6ZShkZWJvdWNlRGVsYXkgPSA1MDApIHtcblxuICAgIGxldCB0aW1lb3V0SWQ7XG5cbiAgICAvLyBvcmllbnRhdGlvbmNoYW5nZSB0b28/XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dElkKTtcbiAgICAgICAgdGltZW91dElkID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4gZXZlbnRCdXMuZW1pdCgncmVzaXplJyksIGRlYm91Y2VEZWxheSk7XG4gICAgfSk7XG59XG4iLCJpbXBvcnQgZXZlbnRCdXMgZnJvbSAnLi4vZXZlbnRzL2V2ZW50QnVzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2Nyb2xsKGNhbGxOb3cgPSBmYWxzZSkge1xuXG4gICAgbGV0IGxhc3RTY3JvbGxZID0gMCxcbiAgICAgICAgdGlja2luZyA9IGZhbHNlLFxuICAgICAgICB0aW1lb3V0SWQ7XG5cbiAgICBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SWQpO1xuICAgICAgICB0aW1lb3V0SWQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiBldmVudEJ1cy5lbWl0KCdzY3JvbGxlbmQnLCBsYXN0U2Nyb2xsWSksIDIwMCk7XG5cbiAgICAgICAgZXZlbnRCdXMuZW1pdCgnc2Nyb2xsJywgbGFzdFNjcm9sbFkpO1xuICAgICAgICB0aWNraW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVxdWVzdFRpY2soKSB7XG4gICAgICAgIGlmICghdGlja2luZykge1xuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGUpO1xuICAgICAgICAgICAgdGlja2luZyA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblNjcm9sbCgpIHtcbiAgICAgICAgLy8gbGFzdFNjcm9sbFkgPSB3aW5kb3cuc2Nyb2xsWTtcbiAgICAgICAgbGFzdFNjcm9sbFkgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcbiAgICAgICAgcmVxdWVzdFRpY2soKTtcbiAgICB9XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgb25TY3JvbGwsIGZhbHNlKTtcblxuICAgIGlmIChjYWxsTm93KSB7XG4gICAgICAgIG9uU2Nyb2xsKCk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2V0U3R5bGUoZWwsIHN0eWxlKSB7XG4gICAgT2JqZWN0LmtleXMoc3R5bGUpLmZvckVhY2goKHByb3ApID0+IHtcbiAgICAgICAgZWwuc3R5bGVbcHJvcF0gPSBzdHlsZVtwcm9wXTtcbiAgICB9KTtcbiAgICByZXR1cm4gZWw7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0cmFuc2l0aW9uRW5kKGVsLCBjYiwgdGltZW91dCA9IDEwMDApIHtcblxuICAgIGxldCB0aW1lb3V0SWQ7XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVyKCkge1xuICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBoYW5kbGVyKTtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2Via2l0VHJhbnNpdGlvbkVuZCcsIGhhbmRsZXIpO1xuICAgICAgICBjYigpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZWwuc3R5bGUudHJhbnNpdGlvbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGhhbmRsZXIpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGVsLnN0eWxlLldlYmtpdFRyYW5zaXRpb24gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCBoYW5kbGVyKTtcbiAgICB9XG5cbiAgICB0aW1lb3V0SWQgPSB3aW5kb3cuc2V0VGltZW91dChoYW5kbGVyLCB0aW1lb3V0KTtcbn1cbiIsImZ1bmN0aW9uIGVhc2VJbkJhY2sodCwgYiwgYywgZCwgcyA9IDEuNzAxNTgpIHtcbiAgICByZXR1cm4gYyAqICh0IC89IGQpICogdCAqICgocyArIDEpICogdCAtIHMpICsgYjtcbn1cblxuZnVuY3Rpb24gZWFzZU91dEJhY2sodCwgYiwgYywgZCwgcyA9IDEuNzAxNTgpIHtcbiAgICByZXR1cm4gYyAqICgodCA9IHQgLyBkIC0gMSkgKiB0ICogKChzICsgMSkgKiB0ICsgcykgKyAxKSArIGI7XG59XG5cbmZ1bmN0aW9uIGVhc2VJbk91dEJhY2sodCwgYiwgYywgZCwgcyA9IDEuNzAxNTgpIHtcbiAgICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkge1xuICAgICAgICByZXR1cm4gYyAvIDIgKiAodCAqIHQgKiAoKChzICo9ICgxLjUyNSkpICsgMSkgKiB0IC0gcykpICsgYjtcbiAgICB9XG4gICAgcmV0dXJuIGMgLyAyICogKCh0IC09IDIpICogdCAqICgoKHMgKj0gKDEuNTI1KSkgKyAxKSAqIHQgKyBzKSArIDIpICsgYjtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGVhc2VJbjogZWFzZUluQmFjayxcbiAgICBlYXNlT3V0OiBlYXNlT3V0QmFjayxcbiAgICBlYXNlSW5PdXQ6IGVhc2VJbk91dEJhY2tcbn07XG5cbmV4cG9ydCB7XG4gICAgZWFzZUluQmFjayxcbiAgICBlYXNlT3V0QmFjayxcbiAgICBlYXNlSW5PdXRCYWNrXG59O1xuIiwiZnVuY3Rpb24gZWFzZU91dEJvdW5jZSh0LCBiLCBjLCBkKSB7XG4gICAgaWYgKCh0IC89IGQpIDwgKDEgLyAyLjc1KSkge1xuICAgICAgICByZXR1cm4gYyAqICg3LjU2MjUgKiB0ICogdCkgKyBiO1xuICAgIH0gZWxzZSBpZiAodCA8ICgyIC8gMi43NSkpIHtcbiAgICAgICAgcmV0dXJuIGMgKiAoNy41NjI1ICogKHQgLT0gKDEuNSAvIDIuNzUpKSAqIHQgKyAwLjc1KSArIGI7XG4gICAgfSBlbHNlIGlmICh0IDwgKDIuNSAvIDIuNzUpKSB7XG4gICAgICAgIHJldHVybiBjICogKDcuNTYyNSAqICh0IC09ICgyLjI1IC8gMi43NSkpICogdCArIDAuOTM3NSkgKyBiO1xuICAgIH1cbiAgICByZXR1cm4gYyAqICg3LjU2MjUgKiAodCAtPSAoMi42MjUgLyAyLjc1KSkgKiB0ICsgMC45ODQzNzUpICsgYjtcbn1cblxuZnVuY3Rpb24gZWFzZUluQm91bmNlKHQsIGIsIGMsIGQpIHtcbiAgICByZXR1cm4gYyAtIGVhc2VPdXRCb3VuY2UoZCAtIHQsIDAsIGMsIGQpICsgYjtcbn1cblxuZnVuY3Rpb24gZWFzZUluT3V0Qm91bmNlKHQsIGIsIGMsIGQpIHtcbiAgICBpZiAodCA8IGQgLyAyKSB7XG4gICAgICAgIHJldHVybiBlYXNlSW5Cb3VuY2UodCAqIDIsIDAsIGMsIGQpICogMC41ICsgYjtcbiAgICB9XG4gICAgcmV0dXJuIGVhc2VPdXRCb3VuY2UodCAqIDIgLSBkLCAwLCBjLCBkKSAqIDAuNSArIGMgKiAwLjUgKyBiO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZWFzZUluOiBlYXNlSW5Cb3VuY2UsXG4gICAgZWFzZU91dDogZWFzZU91dEJvdW5jZSxcbiAgICBlYXNlSW5PdXQ6IGVhc2VJbk91dEJvdW5jZVxufTtcblxuZXhwb3J0IHtcbiAgICBlYXNlSW5Cb3VuY2UsXG4gICAgZWFzZU91dEJvdW5jZSxcbiAgICBlYXNlSW5PdXRCb3VuY2Vcbn07XG4iLCJjb25zdCB7c3FydH0gPSBNYXRoO1xuXG5mdW5jdGlvbiBlYXNlSW5DaXJjdWxhcih0LCBiLCBjLCBkKSB7XG4gICAgcmV0dXJuIC1jICogKHNxcnQoMSAtICh0IC89IGQpICogdCkgLSAxKSArIGI7XG59XG5cbmZ1bmN0aW9uIGVhc2VPdXRDaXJjdWxhcih0LCBiLCBjLCBkKSB7XG4gICAgcmV0dXJuIGMgKiBzcXJ0KDEgLSAodCA9IHQgLyBkIC0gMSkgKiB0KSArIGI7XG59XG5cbmZ1bmN0aW9uIGVhc2VJbk91dENpcmN1bGFyKHQsIGIsIGMsIGQpIHtcbiAgICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkge1xuICAgICAgICByZXR1cm4gLWMgLyAyICogKHNxcnQoMSAtIHQgKiB0KSAtIDEpICsgYjtcbiAgICB9XG4gICAgcmV0dXJuIGMgLyAyICogKHNxcnQoMSAtICh0IC09IDIpICogdCkgKyAxKSArIGI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBlYXNlSW46IGVhc2VJbkNpcmN1bGFyLFxuICAgIGVhc2VPdXQ6IGVhc2VPdXRDaXJjdWxhcixcbiAgICBlYXNlSW5PdXQ6IGVhc2VJbk91dENpcmN1bGFyXG59O1xuXG5leHBvcnQge1xuICAgIGVhc2VJbkNpcmN1bGFyLFxuICAgIGVhc2VPdXRDaXJjdWxhcixcbiAgICBlYXNlSW5PdXRDaXJjdWxhclxufTtcbiIsImZ1bmN0aW9uIGVhc2VJbkN1YmljKHQsIGIsIGMsIGQpIHtcbiAgICByZXR1cm4gYyAqICh0IC89IGQpICogdCAqIHQgKyBiO1xufVxuXG5mdW5jdGlvbiBlYXNlT3V0Q3ViaWModCwgYiwgYywgZCkge1xuICAgIHJldHVybiBjICogKCh0ID0gdCAvIGQgLSAxKSAqIHQgKiB0ICsgMSkgKyBiO1xufVxuXG5mdW5jdGlvbiBlYXNlSW5PdXRDdWJpYyh0LCBiLCBjLCBkKSB7XG4gICAgaWYgKCh0IC89IGQgLyAyKSA8IDEpIHtcbiAgICAgICAgcmV0dXJuIGMgLyAyICogdCAqIHQgKiB0ICsgYjtcbiAgICB9XG4gICAgcmV0dXJuIGMgLyAyICogKCh0IC09IDIpICogdCAqIHQgKyAyKSArIGI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBlYXNlSW46IGVhc2VJbkN1YmljLFxuICAgIGVhc2VPdXQ6IGVhc2VPdXRDdWJpYyxcbiAgICBlYXNlSW5PdXQ6IGVhc2VJbk91dEN1YmljXG59O1xuXG5leHBvcnQge1xuICAgIGVhc2VJbkN1YmljLFxuICAgIGVhc2VPdXRDdWJpYyxcbiAgICBlYXNlSW5PdXRDdWJpY1xufTtcbiIsImNvbnN0IHthYnMsIGFzaW4sIFBJLCBwb3csIHNpbn0gPSBNYXRoO1xuY29uc3QgUElfMiA9IFBJICogMjtcblxuZnVuY3Rpb24gZWFzZUluRWxhc3RpYyh0LCBiLCBjLCBkLCBhLCBwKSB7XG4gICAgbGV0IHM7XG4gICAgaWYgKHQgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGI7XG4gICAgfVxuICAgIGlmICgodCAvPSBkKSA9PT0gMSkge1xuICAgICAgICByZXR1cm4gYiArIGM7XG4gICAgfVxuICAgIGlmICghcCkge1xuICAgICAgICBwID0gZCAqIDAuMztcbiAgICB9XG4gICAgaWYgKCFhIHx8IGEgPCBhYnMoYykpIHtcbiAgICAgICAgYSA9IGM7XG4gICAgICAgIHMgPSBwIC8gNDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzID0gcCAvIFBJXzIgKiBhc2luKGMgLyBhKTtcbiAgICB9XG4gICAgcmV0dXJuIC0oYSAqIHBvdygyLCAxMCAqICh0IC09IDEpKSAqIHNpbigodCAqIGQgLSBzKSAqIFBJXzIgLyBwKSkgKyBiO1xufVxuXG5mdW5jdGlvbiBlYXNlT3V0RWxhc3RpYyh0LCBiLCBjLCBkLCBhLCBwKSB7XG4gICAgbGV0IHM7XG4gICAgaWYgKHQgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGI7XG4gICAgfVxuICAgIGlmICgodCAvPSBkKSA9PT0gMSkge1xuICAgICAgICByZXR1cm4gYiArIGM7XG4gICAgfVxuICAgIGlmICghcCkge1xuICAgICAgICBwID0gZCAqIDAuMztcbiAgICB9XG4gICAgaWYgKCFhIHx8IGEgPCBhYnMoYykpIHtcbiAgICAgICAgYSA9IGM7XG4gICAgICAgIHMgPSBwIC8gNDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzID0gcCAvIFBJXzIgKiBhc2luKGMgLyBhKTtcbiAgICB9XG4gICAgcmV0dXJuIChhICogcG93KDIsIC0xMCAqIHQpICogc2luKCh0ICogZCAtIHMpICogUElfMiAvIHApICsgYyArIGIpO1xufVxuXG5mdW5jdGlvbiBlYXNlSW5PdXRFbGFzdGljKHQsIGIsIGMsIGQsIGEsIHApIHtcbiAgICBsZXQgcztcbiAgICBpZiAodCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gYjtcbiAgICB9XG4gICAgaWYgKCh0IC89IGQgLyAyKSA9PT0gMikge1xuICAgICAgICByZXR1cm4gYiArIGM7XG4gICAgfVxuICAgIGlmICghcCkge1xuICAgICAgICBwID0gZCAqICgwLjMgKiAxLjUpO1xuICAgIH1cbiAgICBpZiAoIWEgfHwgYSA8IGFicyhjKSkge1xuICAgICAgICBhID0gYztcbiAgICAgICAgcyA9IHAgLyA0O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHMgPSBwIC8gUElfMiAqIGFzaW4oYyAvIGEpO1xuICAgIH1cbiAgICBpZiAodCA8IDEpIHtcbiAgICAgICAgcmV0dXJuIC0wLjUgKiAoYSAqIHBvdygyLCAxMCAqICh0IC09IDEpKSAqIHNpbigodCAqIGQgLSBzKSAqIFBJXzIgLyBwKSkgKyBiO1xuICAgIH1cbiAgICByZXR1cm4gYSAqIHBvdygyLCAtMTAgKiAodCAtPSAxKSkgKiBzaW4oKHQgKiBkIC0gcykgKiBQSV8yIC8gcCkgKiAwLjUgKyBjICsgYjtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGVhc2VJbjogZWFzZUluRWxhc3RpYyxcbiAgICBlYXNlT3V0OiBlYXNlT3V0RWxhc3RpYyxcbiAgICBlYXNlSW5PdXQ6IGVhc2VJbk91dEVsYXN0aWNcbn07XG5cbmV4cG9ydCB7XG4gICAgZWFzZUluRWxhc3RpYyxcbiAgICBlYXNlT3V0RWxhc3RpYyxcbiAgICBlYXNlSW5PdXRFbGFzdGljXG59O1xuIiwiY29uc3Qge3Bvd30gPSBNYXRoO1xuXG5mdW5jdGlvbiBlYXNlSW5FeHBvKHQsIGIsIGMsIGQpIHtcbiAgICByZXR1cm4gdCA9PT0gMCA/IGIgOiBjICogcG93KDIsIDEwICogKHQgLyBkIC0gMSkpICsgYjtcbn1cblxuZnVuY3Rpb24gZWFzZU91dEV4cG8odCwgYiwgYywgZCkge1xuICAgIHJldHVybiB0ID09PSBkID8gYiArIGMgOiBjICogKC1wb3coMiwgLTEwICogdCAvIGQpICsgMSkgKyBiO1xufVxuXG5mdW5jdGlvbiBlYXNlSW5PdXRFeHBvKHQsIGIsIGMsIGQpIHtcbiAgICBpZiAodCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gYjtcbiAgICB9XG4gICAgaWYgKHQgPT09IGQpIHtcbiAgICAgICAgcmV0dXJuIGIgKyBjO1xuICAgIH1cbiAgICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkge1xuICAgICAgICByZXR1cm4gYyAvIDIgKiBwb3coMiwgMTAgKiAodCAtIDEpKSArIGI7XG4gICAgfVxuICAgIHJldHVybiBjIC8gMiAqICgtcG93KDIsIC0xMCAqIC0tdCkgKyAyKSArIGI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBlYXNlSW46IGVhc2VJbkV4cG8sXG4gICAgZWFzZU91dDogZWFzZU91dEV4cG8sXG4gICAgZWFzZUluT3V0OiBlYXNlSW5PdXRFeHBvXG59O1xuXG5leHBvcnQge1xuICAgIGVhc2VJbkV4cG8sXG4gICAgZWFzZU91dEV4cG8sXG4gICAgZWFzZUluT3V0RXhwb1xufTtcbiIsImltcG9ydCBiYWNrLCB7ZWFzZUluQmFjaywgZWFzZU91dEJhY2ssIGVhc2VJbk91dEJhY2t9IGZyb20gJy4vYmFjayc7XG5pbXBvcnQgYm91bmNlLCB7ZWFzZUluQm91bmNlLCBlYXNlT3V0Qm91bmNlLCBlYXNlSW5PdXRCb3VuY2V9IGZyb20gJy4vYm91bmNlJztcbmltcG9ydCBjaXJjdWxhciwge2Vhc2VJbkNpcmN1bGFyLCBlYXNlT3V0Q2lyY3VsYXIsIGVhc2VJbk91dENpcmN1bGFyfSBmcm9tICcuL2NpcmN1bGFyJztcbmltcG9ydCBjdWJpYywge2Vhc2VJbkN1YmljLCBlYXNlT3V0Q3ViaWMsIGVhc2VJbk91dEN1YmljfSBmcm9tICcuL2N1YmljJztcbmltcG9ydCBlbGFzdGljLCB7ZWFzZUluRWxhc3RpYywgZWFzZU91dEVsYXN0aWMsIGVhc2VJbk91dEVsYXN0aWN9IGZyb20gJy4vZWxhc3RpYyc7XG5pbXBvcnQgZXhwbywge2Vhc2VJbkV4cG8sIGVhc2VPdXRFeHBvLCBlYXNlSW5PdXRFeHBvfSBmcm9tICcuL2V4cG8nO1xuaW1wb3J0IGxpbmVhciwge2Vhc2VMaW5lYXJ9IGZyb20gJy4vbGluZWFyJztcbmltcG9ydCBxdWFkLCB7ZWFzZUluUXVhZCwgZWFzZU91dFF1YWQsIGVhc2VJbk91dFF1YWR9IGZyb20gJy4vcXVhZCc7XG5pbXBvcnQgcXVhcnQsIHtlYXNlSW5RdWFydCwgZWFzZU91dFF1YXJ0LCBlYXNlSW5PdXRRdWFydH0gZnJvbSAnLi9xdWFydCc7XG5pbXBvcnQgcXVpbnQsIHtlYXNlSW5RdWludCwgZWFzZU91dFF1aW50LCBlYXNlSW5PdXRRdWludH0gZnJvbSAnLi9xdWludCc7XG5pbXBvcnQgc2luZSwge2Vhc2VJblNpbmUsIGVhc2VPdXRTaW5lLCBlYXNlSW5PdXRTaW5lfSBmcm9tICcuL3NpbmUnO1xuXG5leHBvcnQge1xuICAgIGJhY2ssXG4gICAgYm91bmNlLFxuICAgIGNpcmN1bGFyLFxuICAgIGN1YmljLFxuICAgIGVsYXN0aWMsXG4gICAgZXhwbyxcbiAgICBsaW5lYXIsXG4gICAgcXVhZCxcbiAgICBxdWFydCxcbiAgICBxdWludCxcbiAgICBzaW5lLFxuICAgIGVhc2VMaW5lYXIsXG4gICAgZWFzZUluQmFjayxcbiAgICBlYXNlT3V0QmFjayxcbiAgICBlYXNlSW5PdXRCYWNrLFxuICAgIGVhc2VJbkJvdW5jZSxcbiAgICBlYXNlT3V0Qm91bmNlLFxuICAgIGVhc2VJbk91dEJvdW5jZSxcbiAgICBlYXNlSW5DaXJjdWxhcixcbiAgICBlYXNlT3V0Q2lyY3VsYXIsXG4gICAgZWFzZUluT3V0Q2lyY3VsYXIsXG4gICAgZWFzZUluQ3ViaWMsXG4gICAgZWFzZU91dEN1YmljLFxuICAgIGVhc2VJbk91dEN1YmljLFxuICAgIGVhc2VJbkVsYXN0aWMsXG4gICAgZWFzZU91dEVsYXN0aWMsXG4gICAgZWFzZUluT3V0RWxhc3RpYyxcbiAgICBlYXNlSW5FeHBvLFxuICAgIGVhc2VPdXRFeHBvLFxuICAgIGVhc2VJbk91dEV4cG8sXG4gICAgZWFzZUluUXVhZCxcbiAgICBlYXNlT3V0UXVhZCxcbiAgICBlYXNlSW5PdXRRdWFkLFxuICAgIGVhc2VJblF1YXJ0LFxuICAgIGVhc2VPdXRRdWFydCxcbiAgICBlYXNlSW5PdXRRdWFydCxcbiAgICBlYXNlSW5RdWludCxcbiAgICBlYXNlT3V0UXVpbnQsXG4gICAgZWFzZUluT3V0UXVpbnQsXG4gICAgZWFzZUluU2luZSxcbiAgICBlYXNlT3V0U2luZSxcbiAgICBlYXNlSW5PdXRTaW5lXG59O1xuXG4vKlxuVEVSTVMgT0YgVVNFIC0gRUFTSU5HIEVRVUFUSU9OU1xuXG5PcGVuIHNvdXJjZSB1bmRlciB0aGUgQlNEIExpY2Vuc2UuXG5cbkNvcHlyaWdodCDCqSAyMDAxIFJvYmVydCBQZW5uZXJcbkFsbCByaWdodHMgcmVzZXJ2ZWQuXG5cblJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dFxubW9kaWZpY2F0aW9uLCBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG5cblJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSwgdGhpc1xubGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG5SZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXNcbmxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uIGFuZC9vclxub3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cbk5laXRoZXIgdGhlIG5hbWUgb2YgdGhlIGF1dGhvciBub3IgdGhlIG5hbWVzIG9mIGNvbnRyaWJ1dG9ycyBtYXkgYmUgdXNlZCB0b1xuZW5kb3JzZSBvciBwcm9tb3RlIHByb2R1Y3RzIGRlcml2ZWQgZnJvbSB0aGlzIHNvZnR3YXJlIHdpdGhvdXQgc3BlY2lmaWNcbnByaW9yIHdyaXR0ZW4gcGVybWlzc2lvbi5cblRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgXCJBUyBJU1wiXG5BTkQgQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFXG5JTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBUkVcbkRJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgT1dORVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1JcbkFOWSBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFU1xuKElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTO1xuTE9TUyBPRiBVU0UsIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OXG5BTlkgVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVFxuKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSkgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVNcblNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxuKi9cbiIsImZ1bmN0aW9uIGVhc2VMaW5lYXIodCwgYiwgYywgZCkge1xuICAgIHJldHVybiBjICogdCAvIGQgKyBiO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZWFzZUluOiBlYXNlTGluZWFyLFxuICAgIGVhc2VPdXQ6IGVhc2VMaW5lYXIsXG4gICAgZWFzZUluT3V0OiBlYXNlTGluZWFyXG59O1xuXG5leHBvcnQge1xuICAgIGVhc2VMaW5lYXJcbn07XG4iLCJmdW5jdGlvbiBlYXNlSW5RdWFkKHQsIGIsIGMsIGQpIHtcbiAgICByZXR1cm4gYyAqICh0IC89IGQpICogdCArIGI7XG59XG5cbmZ1bmN0aW9uIGVhc2VPdXRRdWFkKHQsIGIsIGMsIGQpIHtcbiAgICByZXR1cm4gLWMgKiAodCAvPSBkKSAqICh0IC0gMikgKyBiO1xufVxuXG5mdW5jdGlvbiBlYXNlSW5PdXRRdWFkKHQsIGIsIGMsIGQpIHtcbiAgICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkge1xuICAgICAgICByZXR1cm4gYyAvIDIgKiB0ICogdCArIGI7XG4gICAgfVxuICAgIHJldHVybiAtYyAvIDIgKiAoKC0tdCkgKiAodCAtIDIpIC0gMSkgKyBiO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZWFzZUluOiBlYXNlSW5RdWFkLFxuICAgIGVhc2VPdXQ6IGVhc2VPdXRRdWFkLFxuICAgIGVhc2VJbk91dDogZWFzZUluT3V0UXVhZFxufTtcblxuZXhwb3J0IHtcbiAgICBlYXNlSW5RdWFkLFxuICAgIGVhc2VPdXRRdWFkLFxuICAgIGVhc2VJbk91dFF1YWRcbn07XG4iLCJmdW5jdGlvbiBlYXNlSW5RdWFydCh0LCBiLCBjLCBkKSB7XG4gICAgcmV0dXJuIGMgKiAodCAvPSBkKSAqIHQgKiB0ICogdCArIGI7XG59XG5cbmZ1bmN0aW9uIGVhc2VPdXRRdWFydCh0LCBiLCBjLCBkKSB7XG4gICAgcmV0dXJuIC1jICogKCh0ID0gdCAvIGQgLSAxKSAqIHQgKiB0ICogdCAtIDEpICsgYjtcbn1cblxuZnVuY3Rpb24gZWFzZUluT3V0UXVhcnQodCwgYiwgYywgZCkge1xuICAgIGlmICgodCAvPSBkIC8gMikgPCAxKSB7XG4gICAgICAgIHJldHVybiBjIC8gMiAqIHQgKiB0ICogdCAqIHQgKyBiO1xuICAgIH1cbiAgICByZXR1cm4gLWMgLyAyICogKCh0IC09IDIpICogdCAqIHQgKiB0IC0gMikgKyBiO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZWFzZUluOiBlYXNlSW5RdWFydCxcbiAgICBlYXNlT3V0OiBlYXNlT3V0UXVhcnQsXG4gICAgZWFzZUluT3V0OiBlYXNlSW5PdXRRdWFydFxufTtcblxuZXhwb3J0IHtcbiAgICBlYXNlSW5RdWFydCxcbiAgICBlYXNlT3V0UXVhcnQsXG4gICAgZWFzZUluT3V0UXVhcnRcbn07XG4iLCJmdW5jdGlvbiBlYXNlSW5RdWludCh0LCBiLCBjLCBkKSB7XG4gICAgcmV0dXJuIGMgKiAodCAvPSBkKSAqIHQgKiB0ICogdCAqIHQgKyBiO1xufVxuXG5mdW5jdGlvbiBlYXNlT3V0UXVpbnQodCwgYiwgYywgZCkge1xuICAgIHJldHVybiBjICogKCh0ID0gdCAvIGQgLSAxKSAqIHQgKiB0ICogdCAqIHQgKyAxKSArIGI7XG59XG5cbmZ1bmN0aW9uIGVhc2VJbk91dFF1aW50KHQsIGIsIGMsIGQpIHtcbiAgICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkge1xuICAgICAgICByZXR1cm4gYyAvIDIgKiB0ICogdCAqIHQgKiB0ICogdCArIGI7XG4gICAgfVxuICAgIHJldHVybiBjIC8gMiAqICgodCAtPSAyKSAqIHQgKiB0ICogdCAqIHQgKyAyKSArIGI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBlYXNlSW46IGVhc2VJblF1aW50LFxuICAgIGVhc2VPdXQ6IGVhc2VPdXRRdWludCxcbiAgICBlYXNlSW5PdXQ6IGVhc2VJbk91dFF1aW50XG59O1xuXG5leHBvcnQge1xuICAgIGVhc2VJblF1aW50LFxuICAgIGVhc2VPdXRRdWludCxcbiAgICBlYXNlSW5PdXRRdWludFxufTtcbiIsImNvbnN0IHtjb3MsIFBJLCBzaW59ID0gTWF0aDtcbmNvbnN0IFBJX0QyID0gUEkgLyAyO1xuXG5mdW5jdGlvbiBlYXNlSW5TaW5lKHQsIGIsIGMsIGQpIHtcbiAgICByZXR1cm4gLWMgKiBjb3ModCAvIGQgKiBQSV9EMikgKyBjICsgYjtcbn1cblxuZnVuY3Rpb24gZWFzZU91dFNpbmUodCwgYiwgYywgZCkge1xuICAgIHJldHVybiBjICogc2luKHQgLyBkICogUElfRDIpICsgYjtcbn1cblxuZnVuY3Rpb24gZWFzZUluT3V0U2luZSh0LCBiLCBjLCBkKSB7XG4gICAgcmV0dXJuIC1jIC8gMiAqIChjb3MoUEkgKiB0IC8gZCkgLSAxKSArIGI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBlYXNlSW46IGVhc2VJblNpbmUsXG4gICAgZWFzZU91dDogZWFzZU91dFNpbmUsXG4gICAgZWFzZUluT3V0OiBlYXNlSW5PdXRTaW5lXG59O1xuXG5leHBvcnQge1xuICAgIGVhc2VJblNpbmUsXG4gICAgZWFzZU91dFNpbmUsXG4gICAgZWFzZUluT3V0U2luZVxufTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRlYm91bmNlKGhhbmRsZXIpIHtcbiAgICBsZXQgdGlja2luZyA9IGZhbHNlO1xuXG4gICAgZnVuY3Rpb24gdXBkYXRlKGV2ZW50KSB7XG4gICAgICAgIGhhbmRsZXIoZXZlbnQpO1xuICAgICAgICB0aWNraW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVxdWVzdFRpY2soZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aWNraW5nKSB7XG4gICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHVwZGF0ZShldmVudCkpO1xuICAgICAgICAgICAgdGlja2luZyA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVxdWVzdFRpY2s7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZWxlZ2F0ZUV2ZW50cyhwYXJlbnRFbCwgZXZlbnRUeXBlLCBmaWx0ZXIsIGZuKSB7XG5cbiAgICBpZiAodHlwZW9mIGZpbHRlciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgY29uc3QgdGFnTmFtZSA9IGZpbHRlci50b1VwcGVyQ2FzZSgpO1xuICAgICAgICBmaWx0ZXIgPSB0YXJnZXQgPT4gdGFyZ2V0LnRhZ05hbWUgPT09IHRhZ05hbWU7XG4gICAgfVxuXG4gICAgcGFyZW50RWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIChldmVudCkgPT4ge1xuICAgICAgICBsZXQgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuXG4gICAgICAgIHdoaWxlICh0YXJnZXQgIT09IHBhcmVudEVsKSB7XG4gICAgICAgICAgICBpZiAoZmlsdGVyKHRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBmbih0YXJnZXQsIGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnROb2RlO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4iLCJpbXBvcnQge0V2ZW50RW1pdHRlcn0gZnJvbSAnZXZlbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZW1pdHRlciBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5zZXRNYXhMaXN0ZW5lcnMoMjApO1xuICAgIH1cblxuICAgIG9mZiAodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKGxpc3RlbmVyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyh0eXBlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgZW1pdHRlciBmcm9tICcuL2VtaXR0ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuY3JlYXRlKGVtaXR0ZXIucHJvdG90eXBlKTtcbiIsImltcG9ydCBlbWl0dGVyIGZyb20gJy4vZW1pdHRlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGhlYXJ0YmVhdChpbnRlcnZhbCkge1xuICAgIGxldCBiZWF0ID0gbnVsbCxcbiAgICAgICAgdGltZSA9IDAsXG4gICAgICAgIG51bVRpbWVzID0gMCxcbiAgICAgICAgbWF4VGltZXMgPSAwLFxuICAgICAgICBydW5uaW5nID0gZmFsc2U7XG5cbiAgICBmdW5jdGlvbiBzdGFydChtYXhOdW1UaW1lcyA9IDAsIHRpbWVPZmZzZXQgPSAwKSB7XG4gICAgICAgIG1heFRpbWVzID0gbWF4TnVtVGltZXM7XG4gICAgICAgIHRpbWUgPSB0aW1lT2Zmc2V0O1xuICAgICAgICBudW1UaW1lcyA9IDA7XG4gICAgICAgIHJ1bm5pbmcgPSB0cnVlO1xuICAgICAgICByZXR1cm4gYmVhdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdG9wKCkge1xuICAgICAgICBydW5uaW5nID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBiZWF0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZShkdCA9IDEpIHtcbiAgICAgICAgaWYgKCFydW5uaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gYmVhdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtYXhUaW1lcyA+IDAgJiYgbnVtVGltZXMgPj0gbWF4VGltZXMpIHtcbiAgICAgICAgICAgIHJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIGJlYXQuZW1pdCgnY29tcGxldGUnKTtcbiAgICAgICAgICAgIHJldHVybiBiZWF0O1xuICAgICAgICB9XG5cbiAgICAgICAgdGltZSArPSBkdDtcblxuICAgICAgICBpZiAodGltZSA+PSBpbnRlcnZhbCkge1xuICAgICAgICAgICAgdGltZSA9IDA7XG4gICAgICAgICAgICBudW1UaW1lcysrO1xuICAgICAgICAgICAgYmVhdC5lbWl0KCd1cGRhdGUnLCBudW1UaW1lcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJlYXQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0SW50ZXJ2YWwodmFsdWUpIHtcbiAgICAgICAgaW50ZXJ2YWwgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIGJlYXQ7XG4gICAgfVxuXG4gICAgYmVhdCA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmNyZWF0ZShlbWl0dGVyLnByb3RvdHlwZSksIHtcbiAgICAgICAgc3RhcnQsXG4gICAgICAgIHN0b3AsXG4gICAgICAgIHVwZGF0ZSxcbiAgICAgICAgZ2V0IGludGVydmFsKCkge1xuICAgICAgICAgICAgcmV0dXJuIGludGVydmFsO1xuICAgICAgICB9LFxuICAgICAgICBzZXQgaW50ZXJ2YWwodmFsdWUpIHtcbiAgICAgICAgICAgIGludGVydmFsID0gdmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldEludGVydmFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gYmVhdDtcbn1cbiIsImltcG9ydCBkZWJvdW5jZSBmcm9tICcuL2RlYm91bmNlJztcbmltcG9ydCBkZWxlZ2F0ZUV2ZW50cyBmcm9tICcuL2RlbGVnYXRlRXZlbnRzJztcbmltcG9ydCBlbWl0dGVyIGZyb20gJy4vZW1pdHRlcic7XG5pbXBvcnQgZXZlbnRCdXMgZnJvbSAnLi9ldmVudEJ1cyc7XG5pbXBvcnQgaGVhcnRiZWF0IGZyb20gJy4vaGVhcnRiZWF0JztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGRlYm91bmNlLFxuICAgIGRlbGVnYXRlRXZlbnRzLFxuICAgIGVtaXR0ZXIsXG4gICAgZXZlbnRCdXMsXG4gICAgaGVhcnRiZWF0XG59O1xuIiwibGV0IHRpbWUgPSAwO1xubGV0IGZwcyA9IDA7XG5sZXQgY3VycmVudEZwcyA9IDA7XG5sZXQgYXZlcmFnZUZwcyA9IDA7XG5sZXQgdGlja3MgPSAwO1xubGV0IHRvdGFsRnBzID0gMDtcbmxldCBsYXN0RnBzID0gMDtcbmxldCBsYXN0QXZlcmFnZSA9IDA7XG5sZXQgbG9nTXNnID0gbnVsbDtcblxuY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbmVsLnNldEF0dHJpYnV0ZSgnaWQnLCAnZnBzJyk7XG5lbC5zdHlsZS5mb250RmFtaWx5ID0gJ21vbm9zcGFjZSc7XG5lbC5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCc7XG5lbC5zdHlsZS5sZWZ0ID0gJzAnO1xuZWwuc3R5bGUudG9wID0gJzAnO1xuZWwuc3R5bGUucGFkZGluZyA9ICcycHggNnB4JztcbmVsLnN0eWxlLnpJbmRleCA9ICc5OTk5OSc7XG5lbC5zdHlsZS5iYWNrZ3JvdW5kID0gJyMwMDAnO1xuZWwuc3R5bGUuY29sb3IgPSAnI2ZmZic7XG5lbC5zdHlsZS5mb250U2l6ZSA9ICcxMHB4JztcbmVsLnN0eWxlLnVzZXJTZWxlY3QgPSAnbm9uZSc7XG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsKTtcblxuZnVuY3Rpb24gcmVwb3J0KCkge1xuICAgIGxhc3RGcHMgPSBjdXJyZW50RnBzO1xuICAgIGxhc3RBdmVyYWdlID0gYXZlcmFnZUZwcztcbiAgICBlbC5pbm5lckhUTUwgPSBgRlBTOiAke2N1cnJlbnRGcHN9PGJyIC8+QVZFOiAke2F2ZXJhZ2VGcHN9YDtcblxuICAgIGlmIChsb2dNc2cpIHtcbiAgICAgICAgZWwuaW5uZXJIVE1MID0gYCR7ZWwuaW5uZXJIVE1MfTxiciAvPk1TRzogJHtsb2dNc2d9YDtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZShub3cpIHtcbiAgICBpZiAodHlwZW9mIG5vdyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgbm93ID0gRGF0ZS5ub3coKTtcbiAgICB9XG5cbiAgICBpZiAodGltZSA9PT0gMCkge1xuICAgICAgICB0aW1lID0gbm93O1xuICAgIH1cblxuICAgIGlmIChub3cgLSAxMDAwID4gdGltZSkge1xuICAgICAgICB0aW1lID0gbm93O1xuICAgICAgICBjdXJyZW50RnBzID0gZnBzO1xuICAgICAgICBmcHMgPSAwO1xuXG4gICAgICAgIGlmIChjdXJyZW50RnBzID4gMSkge1xuICAgICAgICAgICAgdGlja3MrKztcbiAgICAgICAgICAgIHRvdGFsRnBzICs9IGN1cnJlbnRGcHM7XG4gICAgICAgICAgICBhdmVyYWdlRnBzID0gTWF0aC5mbG9vcih0b3RhbEZwcyAvIHRpY2tzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjdXJyZW50RnBzICE9PSBsYXN0RnBzIHx8IGF2ZXJhZ2VGcHMgIT09IGxhc3RBdmVyYWdlKSB7XG4gICAgICAgICAgICByZXBvcnQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZwcysrO1xufVxuXG5mdW5jdGlvbiBhdXRvKCkge1xuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYXV0byk7XG4gICAgdXBkYXRlKCk7XG59XG5cbmZ1bmN0aW9uIGxvZyh2YWx1ZSkge1xuICAgIGxvZ01zZyA9IFN0cmluZyh2YWx1ZSk7XG4gICAgcmVwb3J0KCk7XG59XG5cbmZ1bmN0aW9uIHN0eWxlKHByb3BzKSB7XG4gICAgT2JqZWN0LmtleXMocHJvcHMpLmZvckVhY2goKHByb3ApID0+IHtcbiAgICAgICAgZWwuc3R5bGVbcHJvcF0gPSBwcm9wc1twcm9wXTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGF1dG8sXG4gICAgZWwsXG4gICAgbG9nLFxuICAgIHN0eWxlLFxuICAgIHVwZGF0ZVxufTtcbiIsImxldCByZXF1ZXN0ID0gbnVsbCxcbiAgICBleGl0ID0gbnVsbCxcbiAgICBjaGFuZ2UgPSBudWxsLFxuICAgIGVycm9yID0gbnVsbCxcbiAgICBlbGVtZW50ID0gbnVsbCxcbiAgICBlbmFibGVkID0gbnVsbDtcblxuY29uc3QgZG9jRWwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cbmlmICh0eXBlb2YgZG9jRWwucmVxdWVzdEZ1bGxzY3JlZW4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmVxdWVzdCA9ICdyZXF1ZXN0RnVsbHNjcmVlbic7XG4gICAgZXhpdCA9ICdleGl0RnVsbHNjcmVlbic7XG4gICAgY2hhbmdlID0gJ2Z1bGxzY3JlZW5jaGFuZ2UnO1xuICAgIGVycm9yID0gJ2Z1bGxzY3JlZW5lcnJvcic7XG4gICAgZWxlbWVudCA9ICdmdWxsc2NyZWVuRWxlbWVudCc7XG4gICAgZW5hYmxlZCA9ICdmdWxsc2NyZWVuRW5hYmxlZCc7XG59IGVsc2UgaWYgKHR5cGVvZiBkb2NFbC5tb3pSZXF1ZXN0RnVsbFNjcmVlbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXF1ZXN0ID0gJ21velJlcXVlc3RGdWxsU2NyZWVuJztcbiAgICBleGl0ID0gJ21vekNhbmNlbEZ1bGxTY3JlZW4nO1xuICAgIGNoYW5nZSA9ICdtb3pmdWxsc2NyZWVuY2hhbmdlJztcbiAgICBlcnJvciA9ICdtb3pmdWxsc2NyZWVuZXJyb3InO1xuICAgIGVsZW1lbnQgPSAnbW96RnVsbFNjcmVlbkVsZW1lbnQnO1xuICAgIGVuYWJsZWQgPSAnbW96RnVsbFNjcmVlbkVuYWJsZWQnO1xufSBlbHNlIGlmICh0eXBlb2YgZG9jRWwubXNSZXF1ZXN0RnVsbHNjcmVlbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXF1ZXN0ID0gJ21zUmVxdWVzdEZ1bGxzY3JlZW4nO1xuICAgIGV4aXQgPSAnbXNFeGl0RnVsbHNjcmVlbic7XG4gICAgY2hhbmdlID0gJ01TRnVsbHNjcmVlbkNoYW5nZSc7XG4gICAgZXJyb3IgPSAnTVNGdWxsc2NyZWVuRXJyb3InO1xuICAgIGVsZW1lbnQgPSAnbXNGdWxsc2NyZWVuRWxlbWVudCc7XG4gICAgZW5hYmxlZCA9ICdtc0Z1bGxzY3JlZW5FbmFibGVkJztcbn0gZWxzZSBpZiAodHlwZW9mIGRvY0VsLndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuICE9PSAndW5kZWZpbmVkJykge1xuICAgIHJlcXVlc3QgPSAnd2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4nO1xuICAgIGV4aXQgPSAnd2Via2l0RXhpdEZ1bGxzY3JlZW4nO1xuICAgIGNoYW5nZSA9ICd3ZWJraXRmdWxsc2NyZWVuY2hhbmdlJztcbiAgICBlcnJvciA9ICd3ZWJraXRGdWxsc2NyZWVuRXJyb3InO1xuICAgIGVsZW1lbnQgPSAnd2Via2l0RnVsbHNjcmVlbkVsZW1lbnQnO1xuICAgIGVuYWJsZWQgPSAnd2Via2l0RnVsbHNjcmVlbkVuYWJsZWQnO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgcmVxdWVzdCxcbiAgICBleGl0LFxuICAgIGNoYW5nZSxcbiAgICBlcnJvcixcbiAgICBlbGVtZW50LFxuICAgIGVuYWJsZWRcbn07XG4iLCJpbXBvcnQgYXBpIGZyb20gJy4vYXBpJztcbmltcG9ydCBlbWl0dGVyIGZyb20gJy4uL2V2ZW50cy9lbWl0dGVyJztcblxuY29uc3QgZnVsbHNjcmVlbiA9IE9iamVjdC5jcmVhdGUoZW1pdHRlci5wcm90b3R5cGUpO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGFwaS5jaGFuZ2UsIChldmVudCkgPT4ge1xuICAgIGZ1bGxzY3JlZW4uZW1pdCgnY2hhbmdlJywgZXZlbnQpO1xufSk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoYXBpLmVycm9yLCAoZXZlbnQpID0+IHtcbiAgICBmdWxsc2NyZWVuLmVtaXQoJ2Vycm9yJywgZXZlbnQpO1xufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGZ1bGxzY3JlZW4sIHtcbiAgICByZXF1ZXN0OiB7XG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbihlbCkge1xuICAgICAgICAgICAgZWwgPSBlbCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgICAgICBlbFthcGkucmVxdWVzdF0odHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGV4aXQ6IHtcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZG9jdW1lbnRbYXBpLmV4aXRdKCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHRvZ2dsZToge1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24oZWwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzRnVsbHNjcmVlbikge1xuICAgICAgICAgICAgICAgIHRoaXMuZXhpdCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlcXVlc3QoZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBpc1N1cHBvcnRlZDoge1xuICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICByZXR1cm4gISFhcGkucmVxdWVzdDtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgaXNGdWxsc2NyZWVuOiB7XG4gICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgIHJldHVybiAhIWRvY3VtZW50W2FwaS5lbGVtZW50XTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZWxlbWVudDoge1xuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnRbYXBpLmVsZW1lbnRdO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBlbmFibGVkOiB7XG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudFthcGkuZW5hYmxlZF07XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgZnVsbHNjcmVlbjtcbiIsImZ1bmN0aW9uIGdldENvbG91cihyLCBnLCBiLCBhID0gMSkge1xuICAgIGlmICh0eXBlb2YgciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIHI7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgciA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgcmV0dXJuIGByZ2JhKCR7cn0sJHtifSwke2d9LCR7YX0pYDtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyYXBoaWNzIHtcbiAgICBjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIGlmICh0eXBlb2Ygd2lkdGggPT09ICdvYmplY3QnICYmIHdpZHRoLnRhZ05hbWUgPT09ICdDQU5WQVMnKSB7XG4gICAgICAgICAgICB0aGlzLmNhbnZhcyA9IHdpZHRoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgICAgIHRoaXMuc2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgfVxuXG4gICAgZ2V0IGFscGhhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jdHguZ2xvYmFsQWxwaGE7XG4gICAgfVxuXG4gICAgc2V0IGFscGhhKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuY3R4Lmdsb2JhbEFscGhhID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IGJsZW5kTW9kZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3R4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbjtcbiAgICB9XG5cbiAgICBzZXQgYmxlbmRNb2RlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuY3R4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCBjb250ZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jdHg7XG4gICAgfVxuXG4gICAgZmlsbChyLCBnLCBiLCBhID0gMSkge1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBnZXRDb2xvdXIociwgZywgYiwgYSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHN0cm9rZShyLCBnLCBiLCBhID0gMSkge1xuICAgICAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IGdldENvbG91cihyLCBnLCBiLCBhKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgY2lyY2xlKHgsIHksIHJhZGl1cykge1xuICAgICAgICBjb25zdCB7Y3R4fSA9IHRoaXM7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LmFyYyh4LCB5LCByYWRpdXMsIDAsIE1hdGguUEkgKiAyLCBmYWxzZSk7XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCwgYW5nbGUgPSAwKSB7XG4gICAgICAgIGNvbnN0IHtjdHh9ID0gdGhpcztcbiAgICAgICAgaWYgKGFuZ2xlICE9PSAwKSB7XG4gICAgICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZSh4ICsgd2lkdGggLyAyLCB5ICsgaGVpZ2h0IC8gMik7XG4gICAgICAgICAgICBjdHgucm90YXRlKGFuZ2xlKTtcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGN0eC5yZWN0KC13aWR0aCAvIDIsIC1oZWlnaHQgLyAyLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3R4LnJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGxpbmUoeDEsIHkxLCB4MiwgeTIpIHtcbiAgICAgICAgY29uc3Qge2N0eH0gPSB0aGlzO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5tb3ZlVG8oeDEsIHkxKTtcbiAgICAgICAgY3R4LmxpbmVUbyh4MiwgeTIpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGxpbmVXaWR0aCh3aWR0aCkge1xuICAgICAgICB0aGlzLmN0eC5saW5lV2lkdGggPSB3aWR0aDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgbW92ZSh4LCB5KSB7XG4gICAgICAgIHRoaXMuY3R4Lm1vdmVUbyh4LCB5KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaW1hZ2UoZWwsIHgsIHksIG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3Qge2N0eH0gPSB0aGlzO1xuICAgICAgICBpZiAob3B0aW9ucykge1xuICAgICAgICAgICAgY29uc3Qge2FscGhhID0gMSwgcm90YXRpb24gPSAwLCBzY2FsZSA9IDF9ID0gb3B0aW9ucztcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldFggPSBlbC53aWR0aCAvIDI7XG4gICAgICAgICAgICBjb25zdCBvZmZzZXRZID0gZWwuaGVpZ2h0IC8gMjtcbiAgICAgICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgICAgICBjdHgudHJhbnNsYXRlKHggKyBvZmZzZXRYLCB5ICsgb2Zmc2V0WSk7XG4gICAgICAgICAgICBjdHgucm90YXRlKHJvdGF0aW9uKTtcbiAgICAgICAgICAgIGN0eC5zY2FsZShzY2FsZSwgc2NhbGUpO1xuICAgICAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gYWxwaGE7XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKGVsLCAtb2Zmc2V0WCwgLW9mZnNldFkpO1xuICAgICAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoZWwsIHgsIHkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHRleHQoc3RyLCB4LCB5KSB7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KHN0ciwgeCwgeSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldEZvbnRTdHlsZShmYW1pbHksIHNpemUpIHtcbiAgICAgICAgdGhpcy5jdHguZm9udCA9IGAke3NpemV9cHggJHtmYW1pbHl9YDtcbiAgICB9XG5cbiAgICBnZXRJbWFnZURhdGEoeCA9IDAsIHkgPSAwLCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIGNvbnN0IHtjdHgsIGNhbnZhc30gPSB0aGlzO1xuICAgICAgICByZXR1cm4gY3R4LmdldEltYWdlRGF0YSh4LCB5LCB3aWR0aCB8fCBjYW52YXMud2lkdGgsIGhlaWdodCB8fCBjYW52YXMuaGVpZ2h0KTtcbiAgICB9XG5cbiAgICBnZXRQaXhlbCh4LCB5KSB7XG4gICAgICAgIHggPSBNYXRoLmZsb29yKHgpO1xuICAgICAgICB5ID0gTWF0aC5mbG9vcih5KTtcbiAgICAgICAgY29uc3Qge2RhdGF9ID0gdGhpcy5jdHguZ2V0SW1hZ2VEYXRhKHgsIHksIDEsIDEpO1xuICAgICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZGF0YSk7XG4gICAgfVxuXG4gICAgc2V0UGl4ZWwoeCwgeSwgciwgZywgYiwgYSkge1xuICAgICAgICB4ID0gTWF0aC5mbG9vcih4KTtcbiAgICAgICAgeSA9IE1hdGguZmxvb3IoeSk7XG4gICAgICAgIGNvbnN0IHt3aWR0aCwgZGF0YX0gPSB0aGlzLmdldEltYWdlRGF0YSgpO1xuICAgICAgICBjb25zdCBpID0gKHggKyB5ICogd2lkdGgpICogNDtcbiAgICAgICAgZGF0YVtpICsgMF0gPSByO1xuICAgICAgICBkYXRhW2kgKyAxXSA9IGc7XG4gICAgICAgIGRhdGFbaSArIDJdID0gYjtcbiAgICAgICAgZGF0YVtpICsgM10gPSBhO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBjbGVhckNpcmNsZSh4LCB5LCByYWRpdXMgPSAyMCkge1xuICAgICAgICBjb25zdCB7Y3R4fSA9IHRoaXM7XG4gICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgIGN0eC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnZGVzdGluYXRpb24tb3V0JztcbiAgICAgICAgdGhpcy5jaXJjbGUoeCwgeSwgcmFkaXVzKTtcbiAgICAgICAgY3R4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdzb3VyY2Utb3Zlcic7XG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHRyYW5zbGF0ZUFuZCh4LCB5LCBmbikge1xuICAgICAgICBjb25zdCB7Y3R4fSA9IHRoaXM7XG4gICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgIGN0eC50cmFuc2xhdGUoeCwgeSk7XG4gICAgICAgIGZuKGN0eCk7XG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGNsZWFyKHIsIGcsIGIsIGEgPSAxKSB7XG4gICAgICAgIGNvbnN0IGNvbG9yID0gZ2V0Q29sb3VyKHIsIGcsIGIsIGEpO1xuICAgICAgICBjb25zdCB7Y3R4fSA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHt3aWR0aCwgaGVpZ2h0fSA9IHRoaXMuY2FudmFzO1xuICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICBjdHguc2V0VHJhbnNmb3JtKDEsIDAsIDAsIDEsIDAsIDApO1xuICAgICAgICBpZiAoY29sb3IpIHtcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgIH1cbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzaXplKHdpZHRoID0gd2luZG93LmlubmVyV2lkdGgsIGhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCkge1xuICAgICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLmNhbnZhcy5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMuY2FudmFzKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNhbnZhcyA9IG51bGw7XG4gICAgICAgIHRoaXMuY3R4ID0gbnVsbDtcbiAgICB9XG59XG4iLCJpbXBvcnQgbG9hZFNjcmlwdCBmcm9tICcuLi9odHRwL2xvYWRTY3JpcHQnO1xuaW1wb3J0IGxvY2FsSG9zdCBmcm9tICcuLi9wbGF0Zm9ybS9sb2NhbC1ob3N0JztcblxuLy8gZXhhbXBsZSB1c2FnZTpcbi8vXG4vLyBjb25zdCBvcHRzID0ge1xuLy8gICAgIGZyaWN0aW9uOiAwLjksXG4vLyAgICAgbWF4U3BlZWQ6IDFcbi8vIH07XG4vLyBndWkodHJ1ZSlcbi8vICAgICAudGhlbigoZykgPT4ge1xuLy8gICAgICAgICBnLmFkZChvcHRzLCAnZnJpY3Rpb24nLCAwLjcsIDAuOTk5KTtcbi8vICAgICAgICAgZy5hZGQob3B0cywgJ21heFNwZWVkJywgMC41LCAyKS5vbkNoYW5nZSgodmFsdWUpID0+IGNvbnNvbGUubG9nKHZhbHVlKSk7XG4vLyAgICAgfSlcbi8vICAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5lcnJvcihlcnIpKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ3VpKGxvY2FsaG9zdE9ubHkgPSBmYWxzZSkge1xuICAgIGlmIChsb2NhbGhvc3RPbmx5ICYmICFsb2NhbEhvc3QoKSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKCkgPT4ge30pO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBsb2FkU2NyaXB0KCdodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9kYXQtZ3VpLzAuNi4xL2RhdC5ndWkubWluLmpzJywgKGVyciwgc3JjKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgbG9hZGluZyBzY3JpcHQnLCBzcmMpO1xuICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ0Vycm9yIGxvYWRpbmcgc2NyaXB0JykpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGcgPSBuZXcgd2luZG93LmRhdC5HVUkoe2F1dG9QbGFjZTogdHJ1ZX0pO1xuXG4gICAgICAgICAgICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgICAgICAgICAgIGNvbnN0IHMgPSBzdHlsZS5zaGVldDtcbiAgICAgICAgICAgIHMuaW5zZXJ0UnVsZSgnLmRnLmFjIHtvdmVyZmxvdzogdmlzaWJsZSAhaW1wb3J0YW50OyB6LWluZGV4OjEwMDAwICFpbXBvcnRhbnR9JywgMCk7XG4gICAgICAgICAgICBzLmluc2VydFJ1bGUoJy5kZyAqIHtmb250LXNpemU6MTFweCAhaW1wb3J0YW50fScsIDApO1xuICAgICAgICAgICAgcy5pbnNlcnRSdWxlKCcuZGcgaW5wdXQge2ZvbnQ6MTFweCBMdWNpZGEgR3JhbmRlLHNhbnMtc2VyaWYgIWltcG9ydGFudH0nLCAwKTtcblxuICAgICAgICAgICAgcmVzb2x2ZShnKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cbmd1aS5pc0xvY2FsSG9zdCA9IGlzTG9jYWxIb3N0O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0TG9jYXRpb24oaHJlZikge1xuICAgIGNvbnN0IGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgbC5ocmVmID0gaHJlZjtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGhhc2g6IGwuaGFzaCxcbiAgICAgICAgaG9zdDogbC5ob3N0LFxuICAgICAgICBob3N0bmFtZTogbC5ob3N0bmFtZSxcbiAgICAgICAgcGF0aG5hbWU6IGwucGF0aG5hbWUsXG4gICAgICAgIHBvcnQ6IGwucG9ydCxcbiAgICAgICAgcHJvdG9jb2w6IGwucHJvdG9jb2wsXG4gICAgICAgIHNlYXJjaDogbC5zZWFyY2hcbiAgICB9O1xufVxuIiwiaW1wb3J0IGdldExvY2F0aW9uIGZyb20gJy4vZ2V0TG9jYXRpb24nO1xuaW1wb3J0IGpzb25wIGZyb20gJy4vanNvbnAnO1xuaW1wb3J0IGxvYWRTY3JpcHQgZnJvbSAnLi9sb2FkU2NyaXB0JztcbmltcG9ydCB1cmxQYXJhbXMgZnJvbSAnLi91cmxQYXJhbXMnO1xuaW1wb3J0IHhociBmcm9tICcuL3hocic7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBnZXRMb2NhdGlvbixcbiAgICBqc29ucCxcbiAgICBsb2FkU2NyaXB0LFxuICAgIHVybFBhcmFtcyxcbiAgICB4aHJcbn07XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBqc29ucCh1cmwsIGNiLCB0aW1lb3V0ID0gNTAwMCkge1xuICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgIGNvbnN0IGNhbGxiYWNrID0gYGpzb25wX2NhbGxiYWNrXyR7TWF0aC5yb3VuZCgxMDAwMDAgKiBNYXRoLnJhbmRvbSgpKX1gO1xuICAgIGNvbnN0IHNlcGFyYXRvciA9IHVybC5pbmRleE9mKCc/JykgPj0gMCA/ICcmJyA6ICc/JztcblxuICAgIGNvbnN0IHRpbWVvdXRJZCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgd2luZG93W2NhbGxiYWNrXShudWxsLCAnanNvbnAgZXJyb3InKTtcbiAgICB9LCB0aW1lb3V0KTtcblxuICAgIHdpbmRvd1tjYWxsYmFja10gPSBmdW5jdGlvbihkYXRhLCBlcnIgPSBudWxsKSB7XG4gICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGltZW91dElkKTtcbiAgICAgICAgZGVsZXRlIHdpbmRvd1tjYWxsYmFja107XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgY2IoZGF0YSwgZXJyKTtcbiAgICB9O1xuXG4gICAgc2NyaXB0LnNyYyA9IGAke3VybH0ke3NlcGFyYXRvcn1jYWxsYmFjaz0ke2NhbGxiYWNrfWA7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbG9hZFNjcmlwdChzcmMsIGNiKSB7XG4gICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgc2NyaXB0LnNyYyA9IHNyYztcbiAgICBzY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IGNiKG51bGwsIHNyYykpO1xuICAgIHNjcmlwdC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsICgpID0+IGNiKHRydWUsIHNyYykpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICByZXR1cm4gc2NyaXB0O1xufVxuIiwiY29uc3QgcGx1cyA9IC9cXCsvZzsgIC8vIG1hdGNoICcrJyBzeW1ib2xcbmNvbnN0IHNlYXJjaCA9IC8oW14mPV0rKT0/KFteJl0qKS9nO1xuXG5mdW5jdGlvbiBkZWNvZGUoc3RyKSB7XG4gICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChzdHIucmVwbGFjZShwbHVzLCAnICcpKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXJsUGFyYW1zKHF1ZXJ5KSB7XG4gICAgcXVlcnkgPSBxdWVyeSB8fCB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnNsaWNlKDEpO1xuXG4gICAgY29uc3QgcGFyYW1zID0ge307XG4gICAgbGV0IG1hdGNoID0gc2VhcmNoLmV4ZWMocXVlcnkpO1xuICAgIHdoaWxlIChtYXRjaCkge1xuICAgICAgICBwYXJhbXNbZGVjb2RlKG1hdGNoWzFdKV0gPSBkZWNvZGUobWF0Y2hbMl0pO1xuICAgICAgICBtYXRjaCA9IHNlYXJjaC5leGVjKHF1ZXJ5KTtcbiAgICB9XG4gICAgcmV0dXJuIHBhcmFtcztcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHhocih1cmwsIHR5cGUgPSAnanNvbicpIHtcbiAgICBjb25zdCBwID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBjb25zdCByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgcmVxLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcmVzcG9uc2UgPSByZXEucmVzcG9uc2U7XG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ2pzb24nICYmIHR5cGVvZiByZXNwb25zZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZSA9IEpTT04ucGFyc2UocmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXEuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoKSA9PiByZWplY3QocmVxLnN0YXR1cykpO1xuICAgICAgICByZXEub3BlbignR0VUJywgdXJsKTtcbiAgICAgICAgcmVxLnJlc3BvbnNlVHlwZSA9IHR5cGU7XG4gICAgICAgIC8vIHJlcS5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpO1xuICAgICAgICByZXEuc2VuZCgpO1xuICAgIH0pO1xuICAgIHJldHVybiBwO1xufVxuIiwiaW1wb3J0ICcuL3BvbHlmaWxsJztcbmltcG9ydCBhcnJheSBmcm9tICcuL2FycmF5JztcbmltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xuaW1wb3J0IGVhc2UgZnJvbSAnLi9lYXNlJztcbmltcG9ydCBldmVudHMgZnJvbSAnLi9ldmVudHMnO1xuaW1wb3J0IGZwcyBmcm9tICcuL2Zwcyc7XG5pbXBvcnQgZnVsbHNjcmVlbiBmcm9tICcuL2Z1bGxzY3JlZW4nO1xuaW1wb3J0IGdyYXBoaWNzIGZyb20gJy4vZ3JhcGhpY3MnO1xuaW1wb3J0IGd1aSBmcm9tICcuL2d1aSc7XG5pbXBvcnQgaHR0cCBmcm9tICcuL2h0dHAnO1xuaW1wb3J0IGlucHV0IGZyb20gJy4vaW5wdXQnO1xuaW1wb3J0IGxpbmtlZExpc3QgZnJvbSAnLi9saW5rZWQtbGlzdCc7XG5pbXBvcnQgTG9vcCBmcm9tICcuL2xvb3AnO1xuaW1wb3J0IG1hdGggZnJvbSAnLi9tYXRoJztcbmltcG9ydCBtZWRpYSBmcm9tICcuL21lZGlhJztcbmltcG9ydCBvYmplY3QgZnJvbSAnLi9vYmplY3QnO1xuaW1wb3J0IG9iamVjdFBvb2wgZnJvbSAnLi9vYmplY3QtcG9vbCc7XG5pbXBvcnQgUGFydGljbGUgZnJvbSAnLi9wYXJ0aWNsZSc7XG5pbXBvcnQgUGFydGljbGVHcm91cCBmcm9tICcuL3BhcnRpY2xlJztcbmltcG9ydCBwbGF0Zm9ybSBmcm9tICcuL3BsYXRmb3JtJztcbmltcG9ydCBwb3B1cCBmcm9tICcuL3BvcHVwJztcbmltcG9ydCBRdWFkVHJlZSBmcm9tICcuL3F1YWQtdHJlZSc7XG5pbXBvcnQgc2hhcmUgZnJvbSAnLi9zaGFyZSc7XG5pbXBvcnQgc3RvcmFnZSBmcm9tICcuL3N0b3JhZ2UnO1xuaW1wb3J0IHN0cmluZyBmcm9tICcuL3N0cmluZyc7XG5pbXBvcnQgdHJhY2sgZnJvbSAnLi90cmFjayc7XG5pbXBvcnQgVHdlZW4gZnJvbSAnLi90d2Vlbic7XG5pbXBvcnQgdmlzaWJpbGl0eSBmcm9tICcuL3Zpc2liaWxpdHknO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYXJyYXksXG4gICAgZG9tLFxuICAgIGVhc2UsXG4gICAgZXZlbnRzLFxuICAgIGZwcyxcbiAgICBmdWxsc2NyZWVuLFxuICAgIGdyYXBoaWNzLFxuICAgIGd1aSxcbiAgICBodHRwLFxuICAgIGlucHV0LFxuICAgIGxpbmtlZExpc3QsXG4gICAgTG9vcCxcbiAgICBtYXRoLFxuICAgIG1lZGlhLFxuICAgIG9iamVjdCxcbiAgICBvYmplY3RQb29sLFxuICAgIFBhcnRpY2xlLFxuICAgIFBhcnRpY2xlR3JvdXAsXG4gICAgcGxhdGZvcm0sXG4gICAgcG9wdXAsXG4gICAgUXVhZFRyZWUsXG4gICAgc2hhcmUsXG4gICAgc3RvcmFnZSxcbiAgICBzdHJpbmcsXG4gICAgVHdlZW4sXG4gICAgdHJhY2ssXG4gICAgdmlzaWJpbGl0eVxufTtcbiIsImZ1bmN0aW9uIGdldFRlc3QoZWwpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShlbCkpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldCA9PiBlbC5pbmNsdWRlcyh0YXJnZXQpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGVsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiB0YXJnZXQgPT4gZWwodGFyZ2V0KTtcbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldCA9PiB0YXJnZXQgPT09IGVsO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjbGlja091dHNpZGUoZWwsIGZuKSB7XG4gICAgY29uc3QgdGVzdCA9IGdldFRlc3QoZWwpO1xuXG4gICAgZnVuY3Rpb24gb25DbGlja091dHNpZGUoZXZlbnQpIHtcbiAgICAgICAgbGV0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgbGV0IGluc2lkZSA9IGZhbHNlO1xuXG4gICAgICAgIHdoaWxlICh0YXJnZXQgJiYgdGFyZ2V0ICE9PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgICAgICBpZiAodGVzdCh0YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgaW5zaWRlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnROb2RlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpbnNpZGUpIHtcbiAgICAgICAgICAgIGZuKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uVG91Y2hPdXRzaWRlKGV2ZW50KSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNsaWNrT3V0c2lkZSk7XG4gICAgICAgIG9uQ2xpY2tPdXRzaWRlKGV2ZW50KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25DbGlja091dHNpZGUpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBvblRvdWNoT3V0c2lkZSk7XG4gICAgfVxuXG4gICAgZGVzdHJveSgpO1xuXG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uQ2xpY2tPdXRzaWRlKTtcbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBvblRvdWNoT3V0c2lkZSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBkZXN0cm95XG4gICAgfTtcbn1cbiIsImltcG9ydCBjbGlja091dHNpZGUgZnJvbSAnLi9jbGlja091dHNpZGUnO1xuaW1wb3J0IGtleWJvYXJkIGZyb20gJy4va2V5Ym9hcmQnO1xuaW1wb3J0IGtleUlucHV0IGZyb20gJy4va2V5SW5wdXQnO1xuaW1wb3J0IG1pY3JvcGhvbmUgZnJvbSAnLi9taWNyb3Bob25lJztcbmltcG9ydCBtb3VzZUxlZnRXaW5kb3cgZnJvbSAnLi9tb3VzZUxlZnRXaW5kb3cnO1xuaW1wb3J0IG1vdXNlV2hlZWwgZnJvbSAnLi9tb3VzZVdoZWVsJztcbmltcG9ydCBwb2ludGVyQ29vcmRzIGZyb20gJy4vcG9pbnRlckNvb3Jkcyc7XG5pbXBvcnQgdG91Y2hJbnB1dCBmcm9tICcuL3RvdWNoSW5wdXQnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgY2xpY2tPdXRzaWRlLFxuICAgIGtleWJvYXJkLFxuICAgIGtleUlucHV0LFxuICAgIG1pY3JvcGhvbmUsXG4gICAgbW91c2VMZWZ0V2luZG93LFxuICAgIG1vdXNlV2hlZWwsXG4gICAgcG9pbnRlckNvb3JkcyxcbiAgICB0b3VjaElucHV0XG59O1xuIiwiaW1wb3J0IGFycmF5IGZyb20gJy4uL2FycmF5L2FycmF5JztcbmltcG9ydCBlbWl0dGVyIGZyb20gJy4uL2V2ZW50cy9lbWl0dGVyJztcbmltcG9ydCBrZXlib2FyZCBmcm9tICcuL2tleWJvYXJkJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ga2V5SW5wdXQoKSB7XG4gICAgY29uc3QgYXBpID0gT2JqZWN0LmNyZWF0ZShlbWl0dGVyLnByb3RvdHlwZSk7XG4gICAgY29uc3Qga2V5cyA9IGFycmF5KDI1NiwgZmFsc2UpO1xuXG4gICAgZnVuY3Rpb24gZW1pdEtleShrZXlDb2RlKSB7XG4gICAgICAgIGNvbnN0IGtleU5hbWUgPSBPYmplY3Qua2V5cyhrZXlib2FyZCkucmVkdWNlKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ga2V5Ym9hcmRba2V5XSA9PT0ga2V5Q29kZSA/IGtleSA6IHZhbHVlO1xuICAgICAgICB9LCAnJykudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgaWYgKGtleU5hbWUpIHtcbiAgICAgICAgICAgIGFwaS5lbWl0KGtleU5hbWUudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbktleURvd24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAga2V5c1tldmVudC5rZXlDb2RlXSA9IHRydWU7XG4gICAgICAgIGFwaS5lbWl0KCdrZXlkb3duJywgZXZlbnQua2V5Q29kZSk7XG4gICAgICAgIGVtaXRLZXkoZXZlbnQua2V5Q29kZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25LZXlVcChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBrZXlzW2V2ZW50LmtleUNvZGVdID0gZmFsc2U7XG4gICAgICAgIGFwaS5lbWl0KCdrZXl1cCcsIGV2ZW50LmtleUNvZGUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZCgpIHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uS2V5RG93biwgZmFsc2UpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIG9uS2V5VXAsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbktleURvd24pO1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXl1cCcsIG9uS2V5VXApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzRG93bihrZXkpIHtcbiAgICAgICAgcmV0dXJuIGtleXNba2V5XTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsZWZ0KCkge1xuICAgICAgICByZXR1cm4ga2V5c1trZXlib2FyZC5MRUZUXSB8fCBrZXlzW2tleWJvYXJkLkFdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJpZ2h0KCkge1xuICAgICAgICByZXR1cm4ga2V5c1trZXlib2FyZC5SSUdIVF0gfHwga2V5c1trZXlib2FyZC5EXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cCgpIHtcbiAgICAgICAgcmV0dXJuIGtleXNba2V5Ym9hcmQuVVBdIHx8IGtleXNba2V5Ym9hcmQuV107XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZG93bigpIHtcbiAgICAgICAgcmV0dXJuIGtleXNba2V5Ym9hcmQuRE9XTl0gfHwga2V5c1trZXlib2FyZC5TXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzcGFjZSgpIHtcbiAgICAgICAgcmV0dXJuIGtleXNba2V5Ym9hcmQuU1BBQ0VdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVuYWJsZSh2YWx1ZSA9IHRydWUpIHtcbiAgICAgICAgcmVtb3ZlKCk7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgYWRkKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGQoKTtcblxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKGFwaSwge1xuICAgICAgICBrZXlib2FyZCxcbiAgICAgICAgZW5hYmxlLFxuICAgICAgICBpc0Rvd24sXG4gICAgICAgIGxlZnQsXG4gICAgICAgIHJpZ2h0LFxuICAgICAgICB1cCxcbiAgICAgICAgZG93bixcbiAgICAgICAgc3BhY2VcbiAgICB9KTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IHtcbiAgICBBOiAnQScuY2hhckNvZGVBdCgwKSxcbiAgICBCOiAnQicuY2hhckNvZGVBdCgwKSxcbiAgICBDOiAnQycuY2hhckNvZGVBdCgwKSxcbiAgICBEOiAnRCcuY2hhckNvZGVBdCgwKSxcbiAgICBFOiAnRScuY2hhckNvZGVBdCgwKSxcbiAgICBGOiAnRicuY2hhckNvZGVBdCgwKSxcbiAgICBHOiAnRycuY2hhckNvZGVBdCgwKSxcbiAgICBIOiAnSCcuY2hhckNvZGVBdCgwKSxcbiAgICBJOiAnSScuY2hhckNvZGVBdCgwKSxcbiAgICBKOiAnSicuY2hhckNvZGVBdCgwKSxcbiAgICBLOiAnSycuY2hhckNvZGVBdCgwKSxcbiAgICBMOiAnTCcuY2hhckNvZGVBdCgwKSxcbiAgICBNOiAnTScuY2hhckNvZGVBdCgwKSxcbiAgICBOOiAnTicuY2hhckNvZGVBdCgwKSxcbiAgICBPOiAnTycuY2hhckNvZGVBdCgwKSxcbiAgICBQOiAnUCcuY2hhckNvZGVBdCgwKSxcbiAgICBROiAnUScuY2hhckNvZGVBdCgwKSxcbiAgICBSOiAnUicuY2hhckNvZGVBdCgwKSxcbiAgICBTOiAnUycuY2hhckNvZGVBdCgwKSxcbiAgICBUOiAnVCcuY2hhckNvZGVBdCgwKSxcbiAgICBVOiAnVScuY2hhckNvZGVBdCgwKSxcbiAgICBWOiAnVicuY2hhckNvZGVBdCgwKSxcbiAgICBXOiAnVycuY2hhckNvZGVBdCgwKSxcbiAgICBYOiAnWCcuY2hhckNvZGVBdCgwKSxcbiAgICBZOiAnWScuY2hhckNvZGVBdCgwKSxcbiAgICBaOiAnWicuY2hhckNvZGVBdCgwKSxcbiAgICBaRVJPOiAnMCcuY2hhckNvZGVBdCgwKSxcbiAgICBPTkU6ICcxJy5jaGFyQ29kZUF0KDApLFxuICAgIFRXTzogJzInLmNoYXJDb2RlQXQoMCksXG4gICAgVEhSRUU6ICczJy5jaGFyQ29kZUF0KDApLFxuICAgIEZPVVI6ICc0Jy5jaGFyQ29kZUF0KDApLFxuICAgIEZJVkU6ICc1Jy5jaGFyQ29kZUF0KDApLFxuICAgIFNJWDogJzYnLmNoYXJDb2RlQXQoMCksXG4gICAgU0VWRU46ICc3Jy5jaGFyQ29kZUF0KDApLFxuICAgIEVJR0hUOiAnOCcuY2hhckNvZGVBdCgwKSxcbiAgICBOSU5FOiAnOScuY2hhckNvZGVBdCgwKSxcbiAgICBOVU1QQURfMDogOTYsXG4gICAgTlVNUEFEXzE6IDk3LFxuICAgIE5VTVBBRF8yOiA5OCxcbiAgICBOVU1QQURfMzogOTksXG4gICAgTlVNUEFEXzQ6IDEwMCxcbiAgICBOVU1QQURfNTogMTAxLFxuICAgIE5VTVBBRF82OiAxMDIsXG4gICAgTlVNUEFEXzc6IDEwMyxcbiAgICBOVU1QQURfODogMTA0LFxuICAgIE5VTVBBRF85OiAxMDUsXG4gICAgTlVNUEFEX01VTFRJUExZOiAxMDYsXG4gICAgTlVNUEFEX0FERDogMTA3LFxuICAgIE5VTVBBRF9FTlRFUjogMTA4LFxuICAgIE5VTVBBRF9TVUJUUkFDVDogMTA5LFxuICAgIE5VTVBBRF9ERUNJTUFMOiAxMTAsXG4gICAgTlVNUEFEX0RJVklERTogMTExLFxuICAgIEYxOiAxMTIsXG4gICAgRjI6IDExMyxcbiAgICBGMzogMTE0LFxuICAgIEY0OiAxMTUsXG4gICAgRjU6IDExNixcbiAgICBGNjogMTE3LFxuICAgIEY3OiAxMTgsXG4gICAgRjg6IDExOSxcbiAgICBGOTogMTIwLFxuICAgIEYxMDogMTIxLFxuICAgIEYxMTogMTIyLFxuICAgIEYxMjogMTIzLFxuICAgIEYxMzogMTI0LFxuICAgIEYxNDogMTI1LFxuICAgIEYxNTogMTI2LFxuICAgIENPTE9OOiAxODYsXG4gICAgRVFVQUxTOiAxODcsXG4gICAgVU5ERVJTQ09SRTogMTg5LFxuICAgIFFVRVNUSU9OX01BUks6IDE5MSxcbiAgICBUSUxERTogMTkyLFxuICAgIE9QRU5fQlJBQ0tFVDogMjE5LFxuICAgIEJBQ0tXQVJEX1NMQVNIOiAyMjAsXG4gICAgQ0xPU0VEX0JSQUNLRVQ6IDIyMSxcbiAgICBRVU9URVM6IDIyMixcbiAgICBCQUNLU1BBQ0U6IDgsXG4gICAgVEFCOiA5LFxuICAgIENMRUFSOiAxMixcbiAgICBFTlRFUjogMTMsXG4gICAgU0hJRlQ6IDE2LFxuICAgIENPTlRST0w6IDE3LFxuICAgIEFMVDogMTgsXG4gICAgQ0FQU19MT0NLOiAyMCxcbiAgICBFU0M6IDI3LFxuICAgIFNQQUNFOiAzMixcbiAgICBQQUdFX1VQOiAzMyxcbiAgICBQQUdFX0RPV046IDM0LFxuICAgIEVORDogMzUsXG4gICAgSE9NRTogMzYsXG4gICAgTEVGVDogMzcsXG4gICAgVVA6IDM4LFxuICAgIFJJR0hUOiAzOSxcbiAgICBET1dOOiA0MCxcbiAgICBJTlNFUlQ6IDQ1LFxuICAgIERFTEVURTogNDYsXG4gICAgSEVMUDogNDcsXG4gICAgTlVNX0xPQ0s6IDE0NFxufTtcbiIsImltcG9ydCBlbWl0dGVyIGZyb20gJy4uL2V2ZW50cy9lbWl0dGVyJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWljcm9waG9uZSgpIHtcbiAgICBjb25zdCBtaWMgPSBPYmplY3QuY3JlYXRlKGVtaXR0ZXIucHJvdG90eXBlKTtcbiAgICBsZXQgc3RyZWFtID0gbnVsbDtcblxuICAgIGNvbnN0IGdldFVzZXJNZWRpYSA9IChuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhIHx8XG4gICAgICAgIG5hdmlnYXRvci53ZWJraXRHZXRVc2VyTWVkaWEgfHxcbiAgICAgICAgbmF2aWdhdG9yLm1vekdldFVzZXJNZWRpYSB8fFxuICAgICAgICBuYXZpZ2F0b3IubXNHZXRVc2VyTWVkaWEpO1xuXG4gICAgY29uc3QgaXNTdXBwb3J0ZWQgPSAhIWdldFVzZXJNZWRpYTtcblxuICAgIGZ1bmN0aW9uIGNvbm5lY3QoKSB7XG4gICAgICAgIGlmICghaXNTdXBwb3J0ZWQpIHtcbiAgICAgICAgICAgIG1pYy5lbWl0KCdlcnJvcicsICdOb3Qgc3VwcG9ydGVkJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZ2V0VXNlck1lZGlhKHtcbiAgICAgICAgICAgIGF1ZGlvOiB0cnVlXG4gICAgICAgIH0sIChtZWRpYVN0cmVhbSkgPT4ge1xuICAgICAgICAgICAgc3RyZWFtID0gbWVkaWFTdHJlYW07XG4gICAgICAgICAgICBtaWMuZW1pdCgnY29ubmVjdCcsIHN0cmVhbSk7XG4gICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZS5uYW1lID09PSAnUGVybWlzc2lvbkRlbmllZEVycm9yJyB8fCBlID09PSAnUEVSTUlTU0lPTl9ERU5JRUQnKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1Blcm1pc3Npb24gZGVuaWVkLiBVbmRvIGJ5IGNsaWNraW5nIHRoZSBjYW1lcmEgaWNvbiBpbiB0aGUgYWRkcmVzcyBiYXInKTtcbiAgICAgICAgICAgICAgICBtaWMuZW1pdCgnZGVuaWVkJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1pYy5lbWl0KCdlcnJvcicsIGUubWVzc2FnZSB8fCBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGlzY29ubmVjdCgpIHtcbiAgICAgICAgaWYgKHN0cmVhbSkge1xuICAgICAgICAgICAgc3RyZWFtLnN0b3AoKTtcbiAgICAgICAgICAgIHN0cmVhbSA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVXZWJBdWRpb1NvdXJjZSh3ZWJBdWRpb0NvbnRleHQsIGNvbm5lY3RUbykge1xuICAgICAgICBpZiAoIXN0cmVhbSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzb3VyY2UgPSB3ZWJBdWRpb0NvbnRleHQuY3JlYXRlTWVkaWFTdHJlYW1Tb3VyY2Uoc3RyZWFtKTtcblxuICAgICAgICBpZiAoY29ubmVjdFRvKSB7XG4gICAgICAgICAgICBzb3VyY2UuY29ubmVjdChjb25uZWN0VG8pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSEFDSzogc3RvcHMgbW96IGdhcmJhZ2UgY29sbGVjdGlvbiBraWxsaW5nIHRoZSBzdHJlYW1cbiAgICAgICAgLy8gc2VlIGh0dHBzOi8vc3VwcG9ydC5tb3ppbGxhLm9yZy9lbi1VUy9xdWVzdGlvbnMvOTg0MTc5XG4gICAgICAgIGlmIChuYXZpZ2F0b3IubW96R2V0VXNlck1lZGlhKSB7XG4gICAgICAgICAgICB3aW5kb3cuaGFja19mb3JfbW96aWxsYSA9IHNvdXJjZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzb3VyY2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24obWljLCB7XG4gICAgICAgIGNvbm5lY3QsXG4gICAgICAgIGRpc2Nvbm5lY3QsXG4gICAgICAgIGNyZWF0ZVdlYkF1ZGlvU291cmNlLFxuICAgICAgICBpc1N1cHBvcnRlZDogKCkgPT4gaXNTdXBwb3J0ZWQsXG4gICAgICAgIHN0cmVhbTogKCkgPT4gc3RyZWFtXG4gICAgfSk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtb3VzZUxlZnRXaW5kb3coZm4pIHtcbiAgICBmdW5jdGlvbiBoYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGZyb20gPSBldmVudC5yZWxhdGVkVGFyZ2V0IHx8IGV2ZW50LnRvRWxlbWVudDtcbiAgICAgICAgaWYgKCFmcm9tIHx8IGZyb20ubm9kZU5hbWUgPT09ICdIVE1MJykge1xuICAgICAgICAgICAgZm4oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBoYW5kbGVyLCBmYWxzZSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBkZXN0cm95ICgpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgaGFuZGxlcik7XG4gICAgICAgIH1cbiAgICB9O1xufVxuIiwiaW1wb3J0IGVtaXR0ZXIgZnJvbSAnLi4vZXZlbnRzL2VtaXR0ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtb3VzZVdoZWVsKHNwZWVkKSB7XG4gICAgc3BlZWQgPSBzcGVlZCB8fCAyO1xuXG4gICAgbGV0IHdoZWVsO1xuXG4gICAgZnVuY3Rpb24gd2hlZWxIYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IChldmVudC5kZXRhaWwgPCAwIHx8IGV2ZW50LndoZWVsRGVsdGEgPiAwKSA/IDEgOiAtMTtcbiAgICAgICAgY29uc3QgZGVsdGEgPSBkaXJlY3Rpb24gKiBzcGVlZDtcblxuICAgICAgICBpZiAoZGlyZWN0aW9uID4gMCkge1xuICAgICAgICAgICAgd2hlZWwuZW1pdCgndXAnLCBkZWx0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3aGVlbC5lbWl0KCdkb3duJywgZGVsdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgd2hlZWwuZW1pdCgndXBkYXRlJywgZGVsdGEpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZCgpIHtcbiAgICAgICAgaWYgKCdvbm1vdXNld2hlZWwnIGluIHdpbmRvdykge1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNld2hlZWwnLCB3aGVlbEhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIGlmICh3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTU1vdXNlU2Nyb2xsJywgd2hlZWxIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICAgIGlmICgnb25tb3VzZXdoZWVsJyBpbiB3aW5kb3cpIHtcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXdoZWVsJywgd2hlZWxIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSBpZiAod2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdET01Nb3VzZVNjcm9sbCcsIHdoZWVsSGFuZGxlciwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkKCk7XG5cbiAgICB3aGVlbCA9IE9iamVjdC5jcmVhdGUoZW1pdHRlci5wcm90b3R5cGUsIHtcbiAgICAgICAgX2V2ZW50czoge1xuICAgICAgICAgICAgdmFsdWU6IHt9XG4gICAgICAgIH0sXG4gICAgICAgIGFkZDoge1xuICAgICAgICAgICAgdmFsdWU6IGFkZFxuICAgICAgICB9LFxuICAgICAgICByZW1vdmU6IHtcbiAgICAgICAgICAgIHZhbHVlOiByZW1vdmVcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUod2hlZWwpO1xufVxuIiwiaW1wb3J0IGdldFBhZ2VIZWlnaHQgZnJvbSAnLi4vZG9tL2dldFBhZ2VIZWlnaHQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwb2ludGVyQ29vcmRzKCkge1xuICAgIGxldCBzZWxmID0gbnVsbDtcblxuICAgIGZ1bmN0aW9uIGNhbGN1bGF0ZUNvb3JkcyhldmVudCkge1xuICAgICAgICBjb25zdCB0b3VjaCA9IGV2ZW50LnRvdWNoZXMgJiYgZXZlbnQudG91Y2hlcy5sZW5ndGg7XG4gICAgICAgIGNvbnN0IHAgPSB0b3VjaCA/IGV2ZW50LnRvdWNoZXNbMF0gOiBldmVudDtcbiAgICAgICAgY29uc3QgY1ggPSBwLmNsaWVudFggfHwgMDtcbiAgICAgICAgY29uc3QgY1kgPSBwLmNsaWVudFkgfHwgMDtcbiAgICAgICAgY29uc3QgcFggPSB3aW5kb3cucGFnZVhPZmZzZXQ7XG4gICAgICAgIGNvbnN0IHBZID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuICAgICAgICBzZWxmLmV2ZW50ID0gZXZlbnQ7XG4gICAgICAgIHNlbGYuY2xpZW50WCA9IGNYO1xuICAgICAgICBzZWxmLmNsaWVudFkgPSBjWTtcbiAgICAgICAgc2VsZi54ID0gY1ggKyBwWDtcbiAgICAgICAgc2VsZi55ID0gY1kgKyBwWTtcbiAgICAgICAgc2VsZi5wZXJjZW50WCA9IHNlbGYueCAvIHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICBzZWxmLnBlcmNlbnRZID0gc2VsZi55IC8gZ2V0UGFnZUhlaWdodCgpO1xuICAgIH1cblxuICAgIHNlbGYgPSB7XG4gICAgICAgIGV2ZW50OiBudWxsLFxuICAgICAgICBjbGllbnRYOiAwLFxuICAgICAgICBjbGllbnRZOiAwLFxuICAgICAgICB4OiAwLFxuICAgICAgICB5OiAwLFxuICAgICAgICBwZXJjZW50WDogMCxcbiAgICAgICAgcGVyY2VudFk6IDAsXG4gICAgICAgIGlzTGlzdGVuaW5nOiBmYWxzZSxcblxuICAgICAgICBvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGNhbGN1bGF0ZUNvb3Jkcyk7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIGNhbGN1bGF0ZUNvb3Jkcyk7XG4gICAgICAgICAgICBzZWxmLmlzTGlzdGVuaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuICAgICAgICBvZmY6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBjYWxjdWxhdGVDb29yZHMpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBjYWxjdWxhdGVDb29yZHMpO1xuICAgICAgICAgICAgc2VsZi5pc0xpc3RlbmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBzZWxmO1xufVxuIiwiaW1wb3J0IGVtaXR0ZXIgZnJvbSAnLi4vZXZlbnRzL2VtaXR0ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0b3VjaElucHV0KGVsKSB7XG4gICAgZWwgPSBlbCB8fCBkb2N1bWVudC5ib2R5O1xuXG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgc3RhcnQ6IFstMSwgLTFdLFxuICAgICAgICBtb3ZlOiBbLTEsIC0xXSxcbiAgICAgICAgZW5kOiBbLTEsIC0xXSxcbiAgICAgICAgcG9zaXRpb246IFstMSwgLTFdLFxuICAgICAgICBkaXN0YW5jZTogWzAsIDBdLFxuICAgICAgICBkaXJlY3Rpb246IFsnbm9uZScsICdub25lJ10sXG4gICAgICAgIHRvdWNoaW5nOiBmYWxzZSxcbiAgICAgICAgb3JpZ2luYWxFdmVudDogbnVsbFxuICAgIH07XG5cbiAgICBsZXQgc2VsZjtcblxuICAgIGZ1bmN0aW9uIHRvdWNoSGFuZGxlcihldmVudCkge1xuICAgICAgICBpZiAoIShldmVudCAmJiBldmVudC50b3VjaGVzKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGRhdGEub3JpZ2luYWxFdmVudCA9IGV2ZW50O1xuICAgICAgICBjb25zdCB0b3VjaCA9IGV2ZW50LnRvdWNoZXNbMF07XG4gICAgICAgIGNvbnN0IHggPSB0b3VjaCAmJiB0b3VjaC5wYWdlWDtcbiAgICAgICAgY29uc3QgeSA9IHRvdWNoICYmIHRvdWNoLnBhZ2VZO1xuXG4gICAgICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAndG91Y2hzdGFydCc6XG4gICAgICAgICAgICAgICAgZGF0YS5zdGFydFswXSA9IGRhdGEubW92ZVswXSA9IGRhdGEuZW5kWzBdID0gZGF0YS5wb3NpdGlvblswXSA9IHg7XG4gICAgICAgICAgICAgICAgZGF0YS5zdGFydFsxXSA9IGRhdGEubW92ZVsxXSA9IGRhdGEuZW5kWzFdID0gZGF0YS5wb3NpdGlvblsxXSA9IHk7XG4gICAgICAgICAgICAgICAgZGF0YS50b3VjaGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgc2VsZi5lbWl0KCdzdGFydCcsIGRhdGEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAndG91Y2htb3ZlJzpcbiAgICAgICAgICAgICAgICBkYXRhLm1vdmVbMF0gPSBkYXRhLnBvc2l0aW9uWzBdID0geDtcbiAgICAgICAgICAgICAgICBkYXRhLm1vdmVbMV0gPSBkYXRhLnBvc2l0aW9uWzFdID0geTtcbiAgICAgICAgICAgICAgICBzZWxmLmVtaXQoJ21vdmUnLCBkYXRhKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3RvdWNoZW5kJzpcbiAgICAgICAgICAgICAgICBkYXRhLmVuZFswXSA9IGRhdGEucG9zaXRpb25bMF0gPSB4O1xuICAgICAgICAgICAgICAgIGRhdGEuZW5kWzFdID0gZGF0YS5wb3NpdGlvblsxXSA9IHk7XG4gICAgICAgICAgICAgICAgZGF0YS50b3VjaGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHNlbGYuZW1pdCgnZW5kJywgZGF0YSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OiBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpc3RlbihlbGVtKSB7XG4gICAgICAgIGVsID0gZWxlbSB8fCBlbDtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRvdWNoSGFuZGxlcik7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRvdWNoSGFuZGxlcik7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdG91Y2hIYW5kbGVyKTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICAgc2VsZi5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRvdWNoSGFuZGxlcik7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRvdWNoSGFuZGxlcik7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdG91Y2hIYW5kbGVyKTtcbiAgICAgICAgZWwgPSBudWxsO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9XG5cbiAgICBsaXN0ZW4oZWwpO1xuXG4gICAgc2VsZiA9IE9iamVjdC5jcmVhdGUoZW1pdHRlci5wcm90b3R5cGUsIHtcbiAgICAgICAgX2V2ZW50czoge1xuICAgICAgICAgICAgdmFsdWU6IHt9XG4gICAgICAgIH0sXG4gICAgICAgIGxpc3Rlbjoge1xuICAgICAgICAgICAgdmFsdWU6IGxpc3RlblxuICAgICAgICB9LFxuICAgICAgICBpc0Rvd246IHtcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS50b3VjaGluZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZ2V0VG91Y2g6IHtcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZGVzdHJveToge1xuICAgICAgICAgICAgdmFsdWU6IGRlc3Ryb3lcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUoc2VsZik7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsaW5rZWRMaXN0KGFyciA9IFtdKSB7XG5cbiAgICBsZXQgZmlyc3QsXG4gICAgICAgIGxhc3Q7XG5cbiAgICAvKlxuICAgICAgICBpdGVtID0ge1xuICAgICAgICAgICAgJ25leHQnOiBudWxsLFxuICAgICAgICAgICAgJ3ByZXYnOiBudWxsXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaXRlbSA9IGxpbmtlZExpc3QuZ2V0Rmlyc3QoKTtcbiAgICAgICAgd2hpbGUoaXRlbSkge1xuICAgICAgICAgICAgLy8gZG8gc3R1ZmZcbiAgICAgICAgICAgIGl0ZW0gPSBpdGVtLm5leHQ7XG4gICAgICAgIH1cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gcmVtb3ZlKGl0ZW0pIHtcbiAgICAgICAgaWYgKGl0ZW0ubmV4dCkge1xuICAgICAgICAgICAgaXRlbS5uZXh0LnByZXYgPSBpdGVtLnByZXY7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGl0ZW0ucHJldikge1xuICAgICAgICAgICAgaXRlbS5wcmV2Lm5leHQgPSBpdGVtLm5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGl0ZW0gPT09IGZpcnN0KSB7XG4gICAgICAgICAgICBmaXJzdCA9IGl0ZW0ubmV4dDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXRlbSA9PT0gbGFzdCkge1xuICAgICAgICAgICAgbGFzdCA9IGl0ZW0ucHJldjtcbiAgICAgICAgfVxuICAgICAgICBpdGVtLm5leHQgPSBpdGVtLnByZXYgPSBudWxsO1xuXG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc2VydEFmdGVyKGl0ZW0sIGFmdGVyKSB7XG4gICAgICAgIHJlbW92ZShpdGVtKTtcblxuICAgICAgICBpdGVtLnByZXYgPSBhZnRlcjtcbiAgICAgICAgaXRlbS5uZXh0ID0gYWZ0ZXIubmV4dDtcblxuICAgICAgICBpZiAoIWFmdGVyLm5leHQpIHtcbiAgICAgICAgICAgIGxhc3QgPSBpdGVtO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWZ0ZXIubmV4dC5wcmV2ID0gaXRlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFmdGVyLm5leHQgPSBpdGVtO1xuXG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc2VydEJlZm9yZShpdGVtLCBiZWZvcmUpIHtcbiAgICAgICAgcmVtb3ZlKGl0ZW0pO1xuXG4gICAgICAgIGl0ZW0ucHJldiA9IGJlZm9yZS5wcmV2O1xuICAgICAgICBpdGVtLm5leHQgPSBiZWZvcmU7XG5cbiAgICAgICAgaWYgKCFiZWZvcmUucHJldikge1xuICAgICAgICAgICAgZmlyc3QgPSBpdGVtO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYmVmb3JlLnByZXYubmV4dCA9IGl0ZW07XG4gICAgICAgIH1cblxuICAgICAgICBiZWZvcmUucHJldiA9IGl0ZW07XG5cbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkKGl0ZW0pIHtcbiAgICAgICAgaWYgKCFmaXJzdCkge1xuICAgICAgICAgICAgZmlyc3QgPSBsYXN0ID0gaXRlbTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBpID0gZmlyc3Q7XG4gICAgICAgICAgICB3aGlsZSAoaS5uZXh0KSB7XG4gICAgICAgICAgICAgICAgaSA9IGkubmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluc2VydEFmdGVyKGl0ZW0sIGkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvckVhY2goZm4pIHtcbiAgICAgICAgbGV0IGl0ZW0gPSBmaXJzdDtcbiAgICAgICAgd2hpbGUgKGl0ZW0pIHtcbiAgICAgICAgICAgIGZuKGl0ZW0pO1xuICAgICAgICAgICAgaXRlbSA9IGl0ZW0ubmV4dDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1hcChmbikge1xuICAgICAgICBjb25zdCBsaXN0ID0gbGlua2VkTGlzdCgpO1xuICAgICAgICBsZXQgaXRlbSA9IGZpcnN0O1xuICAgICAgICB3aGlsZSAoaXRlbSkge1xuICAgICAgICAgICAgbGlzdC5hZGQoZm4oaXRlbSkpO1xuICAgICAgICAgICAgaXRlbSA9IGl0ZW0ubmV4dDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGlzdDtcbiAgICB9XG5cbiAgICBhcnIuZm9yRWFjaCgoaXRlbSkgPT4gYWRkKGl0ZW0pKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGdldCBmaXJzdCAoKSB7XG4gICAgICAgICAgICByZXR1cm4gZmlyc3Q7XG4gICAgICAgIH0sXG4gICAgICAgIGdldEZpcnN0ICgpIHtcbiAgICAgICAgICAgIHJldHVybiBmaXJzdDtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IGxhc3QgKCkge1xuICAgICAgICAgICAgcmV0dXJuIGxhc3Q7XG4gICAgICAgIH0sXG4gICAgICAgIGdldExhc3QgKCkge1xuICAgICAgICAgICAgcmV0dXJuIGxhc3Q7XG4gICAgICAgIH0sXG4gICAgICAgIGdldCBsZW5ndGggKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q291bnQoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0Q291bnQgKCkge1xuICAgICAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgICAgIGxldCBpID0gZmlyc3Q7XG4gICAgICAgICAgICB3aGlsZSAoaSkge1xuICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICAgICAgaSA9IGkubmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb3VudDtcbiAgICAgICAgfSxcbiAgICAgICAgYWRkLFxuICAgICAgICByZW1vdmUsXG4gICAgICAgIGluc2VydEFmdGVyLFxuICAgICAgICBpbnNlcnRCZWZvcmUsXG4gICAgICAgIGZvckVhY2gsXG4gICAgICAgIG1hcFxuICAgIH07XG59XG4iLCJpbXBvcnQgTWluaVNpZ25hbCBmcm9tICdtaW5pLXNpZ25hbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb29wIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy51cGRhdGUgPSB0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uVXBkYXRlID0gbmV3IE1pbmlTaWduYWwoKTtcblxuICAgICAgICB0aGlzLnJhZiA9IG51bGw7XG4gICAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxhc3QgPSAwO1xuICAgICAgICB0aGlzLmRlbHRhID0gMDtcbiAgICAgICAgdGhpcy5lbGFzcGVkID0gMDtcbiAgICAgICAgdGhpcy5kZWx0YVNlY3MgPSAwO1xuICAgICAgICB0aGlzLmVsYXNwZWRTZWNzID0gMDtcblxuICAgICAgICAvLyB0aGlzLmFjY3VtdWxhdGVkID0gMDtcbiAgICAgICAgLy8gdGhpcy5zdGVwID0gMTAwMCAvIDYwO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICBpZiAodGhpcy5ydW5uaW5nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJ1bm5pbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cblxuICAgIHN0b3AoKSB7XG4gICAgICAgIGlmICghdGhpcy5ydW5uaW5nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sYXN0ID0gMDtcbiAgICAgICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XG4gICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLnJhZik7XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICBpZiAoIXRoaXMucnVubmluZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yYWYgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMudXBkYXRlKTtcblxuICAgICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICBsZXQgZGVsdGFNcyA9IG5vdyAtIHRoaXMubGFzdDtcbiAgICAgICAgaWYgKGRlbHRhTXMgPiAyMCkge1xuICAgICAgICAgICAgZGVsdGFNcyA9IDIwO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubGFzdCA9IG5vdztcblxuICAgICAgICB0aGlzLmRlbHRhID0gZGVsdGFNcyAqIDAuMDY7XG4gICAgICAgIHRoaXMuZWxhc3BlZCArPSB0aGlzLmRlbHRhO1xuXG4gICAgICAgIHRoaXMuZGVsdGFTZWNzID0gZGVsdGFNcyAqIDAuMDAxO1xuICAgICAgICB0aGlzLmVsYXNwZWRTZWNzICs9IHRoaXMuZGVsdGFTZWNzO1xuXG4gICAgICAgIC8vICAvLyBmaXhlZCBzdGVwOlxuICAgICAgICAvLyB0aGlzLmFjY3VtdWxhdGVkICs9IGR0O1xuICAgICAgICAvL1xuICAgICAgICAvLyB3aGlsZSAodGhpcy5hY2N1bXVsYXRlZCA+PSB0aGlzLnN0ZXApIHtcbiAgICAgICAgLy8gICAgIHRoaXMuYWNjdW11bGF0ZWQgLT0gdGhpcy5zdGVwO1xuICAgICAgICAvLyAgICAgdGhpcy5vblVwZGF0ZS5kaXNwYXRjaCh0aGlzLnN0ZXApO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgdGhpcy5vblVwZGF0ZS5kaXNwYXRjaCh0aGlzLmRlbHRhLCB0aGlzLmVsYXNwZWQpO1xuICAgIH1cblxuICAgIGFkZChmbiwgY29udGV4dCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vblVwZGF0ZS5hZGQoZm4sIGNvbnRleHQpO1xuICAgIH1cblxuICAgIHJlbW92ZShiaW5kaW5nKSB7XG4gICAgICAgIHRoaXMub25VcGRhdGUuZGV0YWNoKGJpbmRpbmcpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFuZ2xlKHgxLCB5MSwgeDIsIHkyKSB7XG4gICAgY29uc3QgZHggPSB4MiAtIHgxO1xuICAgIGNvbnN0IGR5ID0geTIgLSB5MTtcbiAgICByZXR1cm4gTWF0aC5hdGFuMihkeSwgZHgpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2VycChmcm9tLCB0bywgd2VpZ2h0ID0gMC4zKSB7XG4gICAgY29uc3QgZiA9ICgxIC0gTWF0aC5jb3Mod2VpZ2h0ICogTWF0aC5QSSkpIC8gMjtcbiAgICByZXR1cm4gKGZyb20gKiAoMSAtIGYpICsgdG8gKiBmKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNpcmNsZURpc3RyaWJ1dGlvbihyYWRpdXMsIG9yaWdpbiA9IHt4OiAwLCB5OiAwfSwgcCA9IHt4OiAwLCB5OiAwfSkge1xuICAgIGNvbnN0IHIgPSBNYXRoLnNxcnQoTWF0aC5yYW5kb20oKSkgKiByYWRpdXM7XG4gICAgY29uc3QgdGhldGEgPSBNYXRoLnJhbmRvbSgpICogTWF0aC5QSSAqIDI7XG4gICAgcC54ID0gb3JpZ2luLnggKyBNYXRoLmNvcyh0aGV0YSkgKiByO1xuICAgIHAueSA9IG9yaWdpbi55ICsgTWF0aC5zaW4odGhldGEpICogcjtcbiAgICByZXR1cm4gcDtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNsYW1wKHZhbHVlLCBtaW4sIG1heCkge1xuICAgIGlmIChtaW4gPiBtYXgpIHtcbiAgICAgICAgY29uc3QgYSA9IG1pbjtcbiAgICAgICAgbWluID0gbWF4O1xuICAgICAgICBtYXggPSBhO1xuICAgIH1cbiAgICBpZiAodmFsdWUgPCBtaW4pIHtcbiAgICAgICAgcmV0dXJuIG1pbjtcbiAgICB9XG4gICAgaWYgKHZhbHVlID4gbWF4KSB7XG4gICAgICAgIHJldHVybiBtYXg7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvaW5Ub3NzKGhlYWRzID0gdHJ1ZSwgdGFpbHMgPSBmYWxzZSkge1xuICAgIHJldHVybiBNYXRoLnJhbmRvbSgpID4gMC41ID8gaGVhZHMgOiB0YWlscztcbn1cbiIsIi8qXG5UaGUgc2lnbiB0ZWxscyB1cyBpZiBhIGlzIHRvIHRoZSBsZWZ0ICgtKSBvciB0aGUgcmlnaHQgKCspIG9mIGJcbiovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcm9zc1Byb2R1Y3QyZChhWCwgYVksIGJYLCBiWSkge1xuICAgIHJldHVybiBhWCAqIGJZIC0gYVkgKiBiWDtcbn1cbiIsImNvbnN0IERFRyA9IDE4MCAvIE1hdGguUEk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRlZ3JlZXMocmFkaWFucykge1xuICAgIHJldHVybiByYWRpYW5zICogREVHO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGlmZmVyZW5jZShhLCBiKSB7XG4gICAgcmV0dXJuIE1hdGguYWJzKGEgLSBiKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRpc3RhbmNlKHgxLCB5MSwgeDIsIHkyKSB7XG4gICAgY29uc3QgZHggPSB4MSAtIHgyO1xuICAgIGNvbnN0IGR5ID0geTEgLSB5MjtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRpc3RhbmNlU1EoeDEsIHkxLCB4MiwgeTIpIHtcbiAgICBjb25zdCBkeCA9IHgxIC0geDI7XG4gICAgY29uc3QgZHkgPSB5MSAtIHkyO1xuICAgIHJldHVybiBkeCAqIGR4ICsgZHkgKiBkeTtcbn1cbiIsIi8qXG4tIElmIEEgYW5kIEIgYXJlIHBlcnBlbmRpY3VsYXIgKGF0IDkwIGRlZ3JlZXMgdG8gZWFjaCBvdGhlciksIHRoZSByZXN1bHRcbm9mIHRoZSBkb3QgcHJvZHVjdCB3aWxsIGJlIHplcm8sIGJlY2F1c2UgY29zKM6YKSB3aWxsIGJlIHplcm8uXG4tIElmIHRoZSBhbmdsZSBiZXR3ZWVuIEEgYW5kIEIgYXJlIGxlc3MgdGhhbiA5MCBkZWdyZWVzLCB0aGUgZG90IHByb2R1Y3RcbndpbGwgYmUgcG9zaXRpdmUgKGdyZWF0ZXIgdGhhbiB6ZXJvKSwgYXMgY29zKM6YKSB3aWxsIGJlIHBvc2l0aXZlLCBhbmRcbnRoZSB2ZWN0b3IgbGVuZ3RocyBhcmUgYWx3YXlzIHBvc2l0aXZlIHZhbHVlcy5cbi0gSWYgdGhlIGFuZ2xlIGJldHdlZW4gQSBhbmQgQiBhcmUgZ3JlYXRlciB0aGFuIDkwIGRlZ3JlZXMsIHRoZSBkb3RcbnByb2R1Y3Qgd2lsbCBiZSBuZWdhdGl2ZSAobGVzcyB0aGFuIHplcm8pLCBhcyBjb3MozpgpIHdpbGwgYmUgbmVnYXRpdmUsXG5hbmQgdGhlIHZlY3RvciBsZW5ndGhzIGFyZSBhbHdheXMgcG9zaXRpdmUgdmFsdWVzXG4qL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZG90UHJvZHVjdDJkKGFYLCBhWSwgYlgsIGJZKSB7XG4gICAgcmV0dXJuIGFYICogYlggKyBhWSAqIGJZO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0Q2lyY2xlUG9pbnRzKG9yaWdpblgsIG9yaWdpblksIHJhZGl1cywgY291bnQsIHN0YXJ0LCBDbGFzcykge1xuICAgIGlmICh0eXBlb2Ygc3RhcnQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHN0YXJ0ID0gLU1hdGguUEkgLyAyO1xuICAgIH1cblxuICAgIGNvbnN0IHBvaW50cyA9IFtdLFxuICAgICAgICBjaXJjID0gTWF0aC5QSSAqIDIsXG4gICAgICAgIGluY3IgPSBjaXJjIC8gY291bnQ7XG5cbiAgICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPCBjaXJjICsgc3RhcnQ7IGkgKz0gaW5jcikge1xuICAgICAgICBjb25zdCBvYiA9IHR5cGVvZiBDbGFzcyA9PT0gJ3VuZGVmaW5lZCcgPyB7fSA6IG5ldyBDbGFzcygpO1xuICAgICAgICBvYi54ID0gb3JpZ2luWCArIHJhZGl1cyAqIE1hdGguY29zKGkpO1xuICAgICAgICBvYi55ID0gb3JpZ2luWSArIHJhZGl1cyAqIE1hdGguc2luKGkpO1xuICAgICAgICBwb2ludHMucHVzaChvYik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBvaW50cztcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldEludGVyc2VjdGlvbkFyZWEoYVgsIGFZLCBhVywgYUgsIGJYLCBiWSwgYlcsIGJIKSB7XG4gICAgY29uc3Qgb3ZlcmxhcFggPSBNYXRoLm1heCgwLCBNYXRoLm1pbihhWCArIGFXLCBiWCArIGJXKSAtIE1hdGgubWF4KGFYLCBiWCkpO1xuICAgIGNvbnN0IG92ZXJsYXBZID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oYVkgKyBhSCwgYlkgKyBiSCkgLSBNYXRoLm1heChhWSwgYlkpKTtcbiAgICByZXR1cm4gb3ZlcmxhcFggKiBvdmVybGFwWTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldE92ZXJsYXBYKGFYLCBhVywgYlgsIGJXKSB7XG4gICAgcmV0dXJuIE1hdGgubWF4KDAsIE1hdGgubWluKGFYICsgYVcsIGJYICsgYlcpIC0gTWF0aC5tYXgoYVgsIGJYKSk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRPdmVybGFwWShhWSwgYUgsIGJZLCBiSCkge1xuICAgIHJldHVybiBNYXRoLm1heCgwLCBNYXRoLm1pbihhWSArIGFILCBiWSArIGJIKSAtIE1hdGgubWF4KGFZLCBiWSkpO1xufVxuIiwiaW1wb3J0IGFuZ2xlIGZyb20gJy4vYW5nbGUnO1xuaW1wb3J0IGNlcnAgZnJvbSAnLi9jZXJwJztcbmltcG9ydCBjaXJjbGVEaXN0cmlidXRpb24gZnJvbSAnLi9jaXJjbGVEaXN0cmlidXRpb24nO1xuaW1wb3J0IGNsYW1wIGZyb20gJy4vY2xhbXAnO1xuaW1wb3J0IGNvaW5Ub3NzIGZyb20gJy4vY29pblRvc3MnO1xuaW1wb3J0IGNyb3NzUHJvZHVjdDJkIGZyb20gJy4vY3Jvc3NQcm9kdWN0MmQnO1xuaW1wb3J0IGRlZ3JlZXMgZnJvbSAnLi9kZWdyZWVzJztcbmltcG9ydCBkaWZmZXJlbmNlIGZyb20gJy4vZGlmZmVyZW5jZSc7XG5pbXBvcnQgZGlzdGFuY2UgZnJvbSAnLi9kaXN0YW5jZSc7XG5pbXBvcnQgZGlzdGFuY2VTcSBmcm9tICcuL2Rpc3RhbmNlU3EnO1xuaW1wb3J0IGRvdFByb2R1Y3QyZCBmcm9tICcuL2RvdFByb2R1Y3QyZCc7XG5pbXBvcnQgZ2V0Q2lyY2xlUG9pbnRzIGZyb20gJy4vZ2V0Q2lyY2xlUG9pbnRzJztcbmltcG9ydCBnZXRJbnRlcnNlY3Rpb25BcmVhIGZyb20gJy4vZ2V0SW50ZXJzZWN0aW9uQXJlYSc7XG5pbXBvcnQgZ2V0T3ZlcmxhcFggZnJvbSAnLi9nZXRPdmVybGFwWCc7XG5pbXBvcnQgZ2V0T3ZlcmxhcFkgZnJvbSAnLi9nZXRPdmVybGFwWSc7XG5pbXBvcnQgbGVycCBmcm9tICcuL2xlcnAnO1xuaW1wb3J0IG1hcCBmcm9tICcuL21hcCc7XG5pbXBvcnQgbm9ybWFsaXplIGZyb20gJy4vbm9ybWFsaXplJztcbmltcG9ydCBvcmllbnRhdGlvbiBmcm9tICcuL29yaWVudGF0aW9uJztcbmltcG9ydCBwZXJjZW50UmVtYWluaW5nIGZyb20gJy4vcGVyY2VudFJlbWFpbmluZyc7XG5pbXBvcnQgcGVyc3BlY3RpdmUgZnJvbSAnLi9wZXJzcGVjdGl2ZSc7XG5pbXBvcnQgcXVhZHJhdGljQ3VydmUgZnJvbSAnLi9xdWFkcmF0aWNDdXJ2ZSc7XG5pbXBvcnQgcmFkaWFucyBmcm9tICcuL3JhZGlhbnMnO1xuaW1wb3J0IHJhbmRvbSBmcm9tICcuL3JhbmRvbSc7XG5pbXBvcnQgcmFuZG9tSW50IGZyb20gJy4vcmFuZG9tSW50JztcbmltcG9ydCByYW5kb21TaWduIGZyb20gJy4vcmFuZG9tU2lnbic7XG5pbXBvcnQgcm90YXRlUG9pbnQgZnJvbSAnLi9yb3RhdGVQb2ludCc7XG5pbXBvcnQgcm90YXRlVG9EZWcgZnJvbSAnLi9yb3RhdGVUb0RlZyc7XG5pbXBvcnQgcm90YXRlVG9SYWQgZnJvbSAnLi9yb3RhdGVUb1JhZCc7XG5pbXBvcnQgcm91bmRUbyBmcm9tICcuL3JvdW5kVG8nO1xuaW1wb3J0IHJvdW5kVG9OZWFyZXN0IGZyb20gJy4vcm91bmRUb05lYXJlc3QnO1xuaW1wb3J0IHNpemUgZnJvbSAnLi9zaXplJztcbmltcG9ydCBzbWVycCBmcm9tICcuL3NtZXJwJztcbmltcG9ydCBzbW9vdGhzdGVwIGZyb20gJy4vc21vb3Roc3RlcCc7XG5pbXBvcnQgc3BsaXRWYWx1ZUFuZFVuaXQgZnJvbSAnLi9zcGxpdFZhbHVlQW5kVW5pdCc7XG5pbXBvcnQgd2VpZ2h0ZWRBdmVyYWdlIGZyb20gJy4vd2VpZ2h0ZWRBdmVyYWdlJztcbmltcG9ydCB3ZWlnaHRlZERpc3RyaWJ1dGlvbiBmcm9tICcuL3dlaWdodGVkRGlzdHJpYnV0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGFuZ2xlLFxuICAgIGNlcnAsXG4gICAgY2lyY2xlRGlzdHJpYnV0aW9uLFxuICAgIGNsYW1wLFxuICAgIGNvaW5Ub3NzLFxuICAgIGNyb3NzUHJvZHVjdDJkLFxuICAgIGRlZ3JlZXMsXG4gICAgZGlmZmVyZW5jZSxcbiAgICBkaXN0YW5jZSxcbiAgICBkaXN0YW5jZVNxLFxuICAgIGRvdFByb2R1Y3QyZCxcbiAgICBnZXRDaXJjbGVQb2ludHMsXG4gICAgZ2V0SW50ZXJzZWN0aW9uQXJlYSxcbiAgICBnZXRPdmVybGFwWCxcbiAgICBnZXRPdmVybGFwWSxcbiAgICBsZXJwLFxuICAgIG1hcCxcbiAgICBub3JtYWxpemUsXG4gICAgb3JpZW50YXRpb24sXG4gICAgcGVyY2VudFJlbWFpbmluZyxcbiAgICBwZXJzcGVjdGl2ZSxcbiAgICBxdWFkcmF0aWNDdXJ2ZSxcbiAgICByYWRpYW5zLFxuICAgIHJhbmRvbSxcbiAgICByYW5kb21JbnQsXG4gICAgcmFuZG9tU2lnbixcbiAgICByb3RhdGVQb2ludCxcbiAgICByb3RhdGVUb0RlZyxcbiAgICByb3RhdGVUb1JhZCxcbiAgICByb3VuZFRvLFxuICAgIHJvdW5kVG9OZWFyZXN0LFxuICAgIHNtZXJwLFxuICAgIHNtb290aHN0ZXAsXG4gICAgc2l6ZSxcbiAgICBzcGxpdFZhbHVlQW5kVW5pdCxcbiAgICB3ZWlnaHRlZEF2ZXJhZ2UsXG4gICAgd2VpZ2h0ZWREaXN0cmlidXRpb25cbn07XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsZXJwKGZyb20sIHRvLCB3ZWlnaHQgPSAwLjMpIHtcbiAgICByZXR1cm4gZnJvbSArICh0byAtIGZyb20pICogd2VpZ2h0O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFwKHYsIGEsIGIsIHgsIHkpIHtcbiAgICAvLyB2YWx1ZSwgbWluIGV4cGVjdGVkLCBtYXggZXhwZWN0ZWQsIG1hcCBtaW4sIG1hcCBtYXhcbiAgICAvLyBlLmcuIG1hcCBzb21lIHZhbHVlIGJldHdlZW4gMCB0byAxMDAgdG8gLTUwIHRvIDUwXG4gICAgLy8gbWFwKDUwLCAwLCAxMDAsIC01MCwgNTApIC8vIDBcbiAgICAvLyBtYXAoMjUsIDAsIDEwMCwgLTUwLCA1MCkgLy8gLTI1XG4gICAgcmV0dXJuICh2ID09PSBhKSA/IHggOiAodiAtIGEpICogKHkgLSB4KSAvIChiIC0gYSkgKyB4O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbm9ybWFsaXplKHZhbHVlLCBtaW4sIG1heCkge1xuICAgIHJldHVybiAodmFsdWUgLSBtaW4pIC8gKG1heCAtIG1pbik7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvcmllbnRhdGlvbih4LCB5KSB7XG4gICAgcmV0dXJuIE1hdGguYXRhbjIoeSwgeCk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwZXJjZW50UmVtYWluaW5nKHZhbHVlLCB0b3RhbCkge1xuICAgIHJldHVybiAodmFsdWUgJSB0b3RhbCkgLyB0b3RhbDtcbn1cbiIsIi8vIHggPSB4ICogcGVyc3BlY3RpdmVcbi8vIHkgPSB5ICogcGVyc3BlY3RpdmVcbi8vIHNjYWxlID0gcGVyc3BlY3RpdmVcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGVyc3BlY3RpdmUoeiwgZm9jYWxMZW5ndGggPSAzMDApIHtcbiAgICByZXR1cm4gZm9jYWxMZW5ndGggLyAoZm9jYWxMZW5ndGggKyB6KTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHF1YWRyYXRpY0N1cnZlKGZyb21YLCBmcm9tWSwgY3BYLCBjcFksIHRvWCwgdG9ZLCBnb1Rocm91Z2hDUCA9IGZhbHNlKSB7XG4gICAgY29uc3QgbiA9IDIwO1xuICAgIGNvbnN0IHBvaW50cyA9IFtmcm9tWCwgZnJvbVldO1xuICAgIGxldCB4YSA9IDA7XG4gICAgbGV0IHlhID0gMDtcblxuICAgIGlmIChnb1Rocm91Z2hDUCkge1xuICAgICAgICBjcFggPSBjcFggKiAyIC0gKGZyb21YICsgdG9YKSAvIDI7XG4gICAgICAgIGNwWSA9IGNwWSAqIDIgLSAoZnJvbVkgKyB0b1kpIC8gMjtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBuOyArK2kpIHtcbiAgICAgICAgY29uc3QgaiA9IGkgLyBuO1xuXG4gICAgICAgIHhhID0gZnJvbVggKyAoKGNwWCAtIGZyb21YKSAqIGopO1xuICAgICAgICB5YSA9IGZyb21ZICsgKChjcFkgLSBmcm9tWSkgKiBqKTtcblxuICAgICAgICBwb2ludHMucHVzaCh4YSArICgoKGNwWCArICgodG9YIC0gY3BYKSAqIGopKSAtIHhhKSAqIGopLCB5YSArICgoKGNwWSArICgodG9ZIC0gY3BZKSAqIGopKSAtIHlhKSAqIGopKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcG9pbnRzO1xufVxuIiwiY29uc3QgUkFEID0gTWF0aC5QSSAvIDE4MDtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmFkaWFucyhkZWdyZWVzKSB7XG4gICAgcmV0dXJuIGRlZ3JlZXMgKiBSQUQ7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByYW5kb20obWluLCBtYXgpIHtcbiAgICBpZiAoaXNOYU4obWF4KSkge1xuICAgICAgICBtYXggPSBtaW47XG4gICAgICAgIG1pbiA9IDA7XG4gICAgfVxuICAgIHJldHVybiBtaW4gKyBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbik7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByYW5kb21JbnQobWluLCBtYXgpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihtaW4gKyBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJhbmRvbVNpZ24oKSB7XG4gICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgPiAwLjUgPyAtMSA6IDE7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByb3RhdGVQb2ludChwLCB0aGV0YSwgb3JpZ2luID0ge3g6IDAsIHk6IDB9LCBwMSA9IHt4OiAwLCB5OiAwfSkge1xuICAgIGNvbnN0IHNpblRoZXRhID0gTWF0aC5zaW4odGhldGEpO1xuICAgIGNvbnN0IGNvc1RoZXRhID0gTWF0aC5jb3ModGhldGEpO1xuICAgIHAxLnggPSAocC54IC0gb3JpZ2luLngpICogY29zVGhldGEgLSAocC55IC0gb3JpZ2luLnkpICogc2luVGhldGE7XG4gICAgcDEueSA9IChwLnggLSBvcmlnaW4ueCkgKiBzaW5UaGV0YSArIChwLnkgLSBvcmlnaW4ueSkgKiBjb3NUaGV0YTtcbiAgICBwMS54ICs9IG9yaWdpbi54O1xuICAgIHAxLnkgKz0gb3JpZ2luLnk7XG4gICAgcmV0dXJuIHAxO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcm90YXRlVG9EZWcoc3RhcnQsIGVuZCkge1xuICAgIGxldCBkaWZmID0gKGVuZCAtIHN0YXJ0KSAlIDM2MDtcbiAgICBpZiAoZGlmZiAhPT0gZGlmZiAlIDE4MCkge1xuICAgICAgICBkaWZmID0gKGRpZmYgPCAwKSA/IGRpZmYgKyAzNjAgOiBkaWZmIC0gMzYwO1xuICAgIH1cbiAgICByZXR1cm4gc3RhcnQgKyBkaWZmO1xufVxuIiwiY29uc3QgUEkyID0gTWF0aC5QSSAqIDI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJvdGF0ZVRvUkFEKHN0YXJ0LCBlbmQpIHtcbiAgICBsZXQgZGlmZiA9IChlbmQgLSBzdGFydCkgJSBQSTI7XG4gICAgaWYgKGRpZmYgIT09IGRpZmYgJSBNYXRoLlBJKSB7XG4gICAgICAgIGRpZmYgPSBkaWZmIDwgMCA/IGRpZmYgKyBQSTIgOiBkaWZmIC0gUEkyO1xuICAgIH1cbiAgICByZXR1cm4gc3RhcnQgKyBkaWZmO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcm91bmRUbyh4LCBwbGFjZXMgPSAyKSB7XG4gICAgY29uc3QgZGl2ID0gTWF0aC5wb3coMTAsIHBsYWNlcyk7XG4gICAgcmV0dXJuIE1hdGgucm91bmQoeCAqIGRpdikgLyBkaXY7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByb3VuZFRvTmVhcmVzdCh2YWx1ZSwgdW5pdCkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKHZhbHVlIC8gdW5pdCkgKiB1bml0O1xufVxuIiwiZnVuY3Rpb24gZ2V0U2NhbGUobWV0aG9kLCB3aWR0aCwgaGVpZ2h0LCBhcmVhV2lkdGgsIGFyZWFIZWlnaHQpIHtcbiAgICBzd2l0Y2ggKG1ldGhvZCkge1xuICAgICAgICBjYXNlICdjb3Zlcic6XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5tYXgoYXJlYVdpZHRoIC8gd2lkdGgsIGFyZWFIZWlnaHQgLyBoZWlnaHQpO1xuICAgICAgICBjYXNlICdjb250YWluJzpcbiAgICAgICAgICAgIHJldHVybiBNYXRoLm1pbihhcmVhV2lkdGggLyB3aWR0aCwgYXJlYUhlaWdodCAvIGhlaWdodCk7XG4gICAgICAgIGNhc2UgJ3dpZHRoJzpcbiAgICAgICAgICAgIHJldHVybiBhcmVhV2lkdGggLyB3aWR0aDtcbiAgICAgICAgY2FzZSAnaGVpZ2h0JzpcbiAgICAgICAgICAgIHJldHVybiBhcmVhSGVpZ2h0IC8gaGVpZ2h0O1xuICAgICAgICBkZWZhdWx0OiBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIDE7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNpemUocmVjdCwgYXJlYVdpZHRoLCBhcmVhSGVpZ2h0LCBtZXRob2QgPSAnY292ZXInLCBhdXRvQ2VudGVyID0gdHJ1ZSkge1xuICAgIGNvbnN0IHNjYWxlID0gZ2V0U2NhbGUobWV0aG9kLCByZWN0LndpZHRoLCByZWN0LmhlaWdodCwgYXJlYVdpZHRoLCBhcmVhSGVpZ2h0KTtcbiAgICBjb25zdCB3aWR0aCA9IE1hdGguY2VpbChyZWN0LndpZHRoICogc2NhbGUpO1xuICAgIGNvbnN0IGhlaWdodCA9IE1hdGguY2VpbChyZWN0LmhlaWdodCAqIHNjYWxlKTtcblxuICAgIGxldCB4ID0gMCwgeSA9IDA7XG5cbiAgICBpZiAoYXV0b0NlbnRlcikge1xuICAgICAgICB4ID0gTWF0aC5yb3VuZCgoYXJlYVdpZHRoIC0gd2lkdGgpICogMC41KTtcbiAgICAgICAgeSA9IE1hdGgucm91bmQoKGFyZWFIZWlnaHQgLSBoZWlnaHQpICogMC41KTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB4LFxuICAgICAgICB5LFxuICAgICAgICB3aWR0aCxcbiAgICAgICAgaGVpZ2h0LFxuICAgICAgICBzY2FsZVxuICAgIH07XG59XG4iLCJpbXBvcnQgc21vb3Roc3RlcCBmcm9tICcuL3Ntb290aHN0ZXAnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzbWVycChmcm9tLCB0bywgc3RhcnRUaW1lLCBlbmRUaW1lLCB0aW1lKSB7XG4gICAgcmV0dXJuIGZyb20gKyAodG8gLSBmcm9tKSAqIHNtb290aHN0ZXAoc3RhcnRUaW1lLCBlbmRUaW1lLCB0aW1lKTtcbn1cbiIsImltcG9ydCBjbGFtcCBmcm9tICcuL2NsYW1wJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc21vb3Roc3RlcChtaW4sIG1heCwgdmFsdWUpIHtcbiAgICBjb25zdCB4ID0gY2xhbXAoKHZhbHVlIC0gbWluKSAvIChtYXggLSBtaW4pLCAwLCAxKTtcbiAgICByZXR1cm4geCAqIHggKiAoMyAtIDIgKiB4KTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNwbGl0VmFsdWVBbmRVbml0KHByb3ApIHtcbiAgICBjb25zdCByZSA9IC8oXi0/XFxkKlxcLj9cXGQqKSguKikvO1xuICAgIGNvbnN0IG1hdGNoID0gcHJvcC5tYXRjaChyZSk7XG4gICAgY29uc3QgdmFsdWUgPSBOdW1iZXIobWF0Y2hbMV0pO1xuICAgIGNvbnN0IHVuaXQgPSBtYXRjaFsyXTtcbiAgICByZXR1cm4ge3ZhbHVlLCB1bml0fTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdlaWdodGVkQXZlcmFnZShmcm9tLCB0bywgd2VpZ2h0ID0gMTApIHtcbiAgICByZXR1cm4gKChmcm9tICogKHdlaWdodCAtIDEpKSArIHRvKSAvIHdlaWdodDtcbn1cbiIsImltcG9ydCByYW5kb20gZnJvbSAnLi9yYW5kb20nO1xuXG4vLyBncmVhdGVyIHByb2JhYmlsaXR5IG9mIGJlaW5nIGhhbGZ3YXkgYmV0d2VlZW4gbWluIGFuZCBtYXhcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gd2VpZ2h0ZWREaXN0cmlidXRpb24obWluLCBtYXgsIHdlaWdodCA9IDUpIHtcbiAgICBsZXQgdG90YWwgPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd2VpZ2h0OyBpKyspIHtcbiAgICAgICAgdG90YWwgKz0gcmFuZG9tKG1pbiwgbWF4KTtcbiAgICB9XG4gICAgcmV0dXJuIHRvdGFsIC8gd2VpZ2h0O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3VlcG9pbnRzUmVhZGVyKCkge1xuICAgIGNvbnN0IGxpc3QgPSBbXTtcbiAgICBsZXQgcmVhZGVyO1xuICAgIGxldCBkaXNwYXRjaDtcbiAgICBsZXQgY3VycmVudFBvc2l0aW9uID0gMDtcbiAgICBsZXQgbGFzdFBvc2l0aW9uID0gLTE7XG4gICAgbGV0IHRvbGVyYW5jZSA9IDAuMjtcblxuICAgIGZ1bmN0aW9uIGFkZChwb3NpdGlvbiwgbmFtZSwgZGF0YSkge1xuICAgICAgICBsaXN0LnB1c2goe3Bvc2l0aW9uLCBuYW1lLCBkYXRhfSk7XG5cbiAgICAgICAgbGlzdC5zb3J0KChhLCBiKSA9PiBhLnBvc2l0aW9uIC0gYi5wb3NpdGlvbik7XG5cbiAgICAgICAgcmV0dXJuIHJlYWRlcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkN1ZXBvaW50KGZuLCB0aGlzQXJnKSB7XG4gICAgICAgIGlmIChmbikge1xuICAgICAgICAgICAgZGlzcGF0Y2ggPSB0aGlzQXJnID8gZm4uYmluZCh0aGlzQXJnKSA6IGZuO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGlzcGF0Y2ggPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZWFkZXI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICAgIGN1cnJlbnRQb3NpdGlvbiA9IDA7XG4gICAgICAgIGxhc3RQb3NpdGlvbiA9IC0xO1xuICAgICAgICByZXR1cm4gcmVhZGVyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZUFsbCgpIHtcbiAgICAgICAgbGlzdC5sZW5ndGggPSAwO1xuICAgICAgICByZXR1cm4gcmVzZXQoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRUb2xlcmFuY2UodmFsdWUpIHtcbiAgICAgICAgdG9sZXJhbmNlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiByZWFkZXI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5SYW5nZShjdWVwb2ludFBvcywgY3VycmVudFBvcywgbGFzdFBvcykge1xuICAgICAgICBpZiAoY3VlcG9pbnRQb3MgPiBjdXJyZW50UG9zKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGN1ZXBvaW50UG9zIDw9IGxhc3RQb3MpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBkaWZmID0gY3VlcG9pbnRQb3MgLSBjdXJyZW50UG9zO1xuICAgICAgICBpZiAoZGlmZiA8IDApIHtcbiAgICAgICAgICAgIGRpZmYgPSAtZGlmZjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGlmZiA8PSB0b2xlcmFuY2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2soY3VycmVudFBvcywgbGFzdFBvcykge1xuICAgICAgICBpZiAoY3VycmVudFBvcyA8PSBsYXN0UG9zKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBkaXNwYXRjaCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGlzdC5zb21lKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAoaW5SYW5nZShpdGVtLnBvc2l0aW9uLCBjdXJyZW50UG9zLCBsYXN0UG9zKSkge1xuICAgICAgICAgICAgICAgIGRpc3BhdGNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGUocG9zaXRpb24pIHtcbiAgICAgICAgY3VycmVudFBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgICAgIGNoZWNrKGN1cnJlbnRQb3NpdGlvbiwgbGFzdFBvc2l0aW9uKTtcbiAgICAgICAgbGFzdFBvc2l0aW9uID0gY3VycmVudFBvc2l0aW9uO1xuICAgICAgICByZXR1cm4gcmVhZGVyO1xuICAgIH1cblxuICAgIHJlYWRlciA9IE9iamVjdC5mcmVlemUoe1xuICAgICAgICBhZGQsXG4gICAgICAgIG9uQ3VlcG9pbnQsXG4gICAgICAgIHJlbW92ZUFsbCxcbiAgICAgICAgcmVzZXQsXG4gICAgICAgIHNldFRvbGVyYW5jZSxcbiAgICAgICAgdXBkYXRlXG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVhZGVyO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaU9TUGxheVZpZGVvSW5saW5lKGVsLCBsb29wID0gdHJ1ZSkge1xuICAgIGNvbnN0IGZyYW1lVGltZSA9IDEgLyAyNTtcblxuICAgIGxldCBzZWxmLFxuICAgICAgICBsYXN0VGltZSA9IDAsXG4gICAgICAgIHBsYXlpbmcgPSBmYWxzZTtcblxuICAgIC8vIFRoaXMgY2FuIChhbmQgc2hvdWxkKSBiZSBwdXQgaW4gYSBjc3MgZmlsZSBpbnN0ZWFkIG9mIGRvaW5nIHN0eWxlU2hlZXRzWzBdLmluc2VydFJ1bGU6XG4gICAgY29uc3QgY3NzUnVsZSA9ICcuaU9TUGxheVZpZGVvSW5saW5lOjotd2Via2l0LW1lZGlhLWNvbnRyb2xzIHsgZGlzcGxheTpub25lICFpbXBvcnRhbnQ7IH0nO1xuICAgIGRvY3VtZW50LnN0eWxlU2hlZXRzWzBdLmluc2VydFJ1bGUoY3NzUnVsZSwgMCk7XG5cbiAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoJ2NvbnRyb2xzJyk7XG4gICAgZWwuY2xhc3NMaXN0LmFkZCgnaU9TUGxheVZpZGVvSW5saW5lJyk7XG5cblxuICAgIGZ1bmN0aW9uIHNlZWsodGltZSkge1xuICAgICAgICBlbC5jdXJyZW50VGltZSA9IHRpbWU7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhdXNlKCkge1xuICAgICAgICBwbGF5aW5nID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUZyYW1lKCkge1xuICAgICAgICBpZiAoIXBsYXlpbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlRnJhbWUpO1xuXG4gICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIGNvbnN0IGRlbHRhVGltZSA9IG5vdyAtIGxhc3RUaW1lO1xuXG4gICAgICAgIGlmIChkZWx0YVRpbWUgPj0gZnJhbWVUaW1lICogMTAwMCkge1xuICAgICAgICAgICAgbGFzdFRpbWUgPSBub3c7XG5cbiAgICAgICAgICAgIGNvbnN0IGVuZGVkID0gZWwuY3VycmVudFRpbWUgKyBmcmFtZVRpbWUgPj0gZWwuZHVyYXRpb247XG5cbiAgICAgICAgICAgIGlmIChlbmRlZCAmJiBsb29wKSB7XG4gICAgICAgICAgICAgICAgc2VlaygwKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZW5kZWQpIHtcbiAgICAgICAgICAgICAgICBwYXVzZSgpO1xuICAgICAgICAgICAgICAgIC8vIHNlbGYuZW1pdCgnZW5kZWQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VlayhlbC5jdXJyZW50VGltZSArIGZyYW1lVGltZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHNlbGYuZW1pdCgndGltZXVwZGF0ZScsIGVsLmN1cnJlbnRUaW1lLCBzZWxmKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBsYXkoKSB7XG4gICAgICAgIHBsYXlpbmcgPSB0cnVlO1xuICAgICAgICB1cGRhdGVGcmFtZSgpO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICAvLyBzZWxmLnJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgICAgICBwYXVzZSgpO1xuICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUodXBkYXRlRnJhbWUpO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH1cblxuICAgIC8vIHNlbGYgPSBPYmplY3QuY3JlYXRlKEVtaXR0ZXIucHJvdG90eXBlLCB7XG4gICAgc2VsZiA9IE9iamVjdC5jcmVhdGUobnVsbCwge1xuICAgICAgICBfZXZlbnRzOiB7XG4gICAgICAgICAgICB2YWx1ZToge31cbiAgICAgICAgfSxcbiAgICAgICAgZGVzdHJveToge1xuICAgICAgICAgICAgdmFsdWU6IGRlc3Ryb3lcbiAgICAgICAgfSxcbiAgICAgICAgcGF1c2U6IHtcbiAgICAgICAgICAgIHZhbHVlOiBwYXVzZVxuICAgICAgICB9LFxuICAgICAgICBwbGF5OiB7XG4gICAgICAgICAgICB2YWx1ZTogcGxheVxuICAgICAgICB9LFxuICAgICAgICBzZWVrOiB7XG4gICAgICAgICAgICB2YWx1ZTogc2Vla1xuICAgICAgICB9LFxuICAgICAgICBlbDoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGN1cnJlbnRUaW1lOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbC5jdXJyZW50VGltZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZHVyYXRpb246IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsLmR1cmF0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBsb29wOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBsb29wO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICBsb29wID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHBsYXlpbmc6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBsYXlpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBPYmplY3QuZnJlZXplKHNlbGYpO1xufVxuIiwiaW1wb3J0IGN1ZXBvaW50c1JlYWRlciBmcm9tICcuL2N1ZXBvaW50c1JlYWRlcic7XG5pbXBvcnQgaU9TUGxheVZpZGVvSW5saW5lIGZyb20gJy4vaU9TUGxheVZpZGVvSW5saW5lJztcbmltcG9ydCB2aWRlb1BsYXllciBmcm9tICcuL3ZpZGVvUGxheWVyJztcbmltcG9ydCB2aW1lbyBmcm9tICcuL3ZpbWVvJztcbmltcG9ydCB5b3V0dWJlIGZyb20gJy4veW91dHViZSc7XG5pbXBvcnQgeW91dHViZUJhc2ljIGZyb20gJy4veW91dHViZUJhc2ljJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGN1ZXBvaW50c1JlYWRlcixcbiAgICBpT1NQbGF5VmlkZW9JbmxpbmUsXG4gICAgdmlkZW9QbGF5ZXIsXG4gICAgdmltZW8sXG4gICAgeW91dHViZSxcbiAgICB5b3V0dWJlQmFzaWNcbn07XG4iLCJpbXBvcnQgZW1pdHRlciBmcm9tICcuLi9ldmVudHMvZW1pdHRlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHZpZGVvUGxheWVyKHZpZGVvRWwpIHtcbiAgICBsZXQgZWwgPSB2aWRlb0VsIHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG4gICAgbGV0IHBsYXllcjtcblxuICAgIGZ1bmN0aW9uIG1ldGFkYXRhSGFuZGxlcigpIHtcbiAgICAgICAgcGxheWVyLmVtaXQoJ21ldGFkYXRhJywge1xuICAgICAgICAgICAgc3JjOiBlbC5jdXJyZW50U3JjLFxuICAgICAgICAgICAgd2lkdGg6IGVsLnZpZGVvV2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IGVsLnZpZGVvSGVpZ2h0LFxuICAgICAgICAgICAgZHVyYXRpb246IGVsLmR1cmF0aW9uXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhbnBsYXlIYW5kbGVyKCkge1xuICAgICAgICBwbGF5ZXIuZW1pdCgncmVhZHknKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGF5SGFuZGxlcigpIHtcbiAgICAgICAgcGxheWVyLmVtaXQoJ3BsYXknKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlbmRlZEhhbmRsZXIoKSB7XG4gICAgICAgIHBsYXllci5lbWl0KCdlbmRlZCcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVycm9ySGFuZGxlcigpIHtcbiAgICAgICAgcGxheWVyLmVtaXQoJ2Vycm9yJywgZWwuZXJyb3IpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRpbWV1cGRhdGVIYW5kbGVyKCkge1xuICAgICAgICBwbGF5ZXIuZW1pdCgndGltZXVwZGF0ZScsIGVsLmN1cnJlbnRUaW1lKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVFdmVudExpc3RlbmVycygpIHtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbG9hZGVkbWV0YWRhdGEnLCBtZXRhZGF0YUhhbmRsZXIpO1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjYW5wbGF5dGhyb3VnaCcsIGNhbnBsYXlIYW5kbGVyKTtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigncGxheScsIHBsYXlIYW5kbGVyKTtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigncGxheWluZycsIHBsYXlIYW5kbGVyKTtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignZXJyb3InLCBlcnJvckhhbmRsZXIpO1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdlbmRlZCcsIGVuZGVkSGFuZGxlcik7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RpbWV1cGRhdGUnLCB0aW1ldXBkYXRlSGFuZGxlcik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXJzKCk7XG5cbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVkbWV0YWRhdGEnLCBtZXRhZGF0YUhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2FucGxheXRocm91Z2gnLCBjYW5wbGF5SGFuZGxlciwgZmFsc2UpO1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdwbGF5JywgcGxheUhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigncGxheWluZycsIHBsYXlIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZXJyb3JIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2VuZGVkJywgZW5kZWRIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RpbWV1cGRhdGUnLCB0aW1ldXBkYXRlSGFuZGxlciwgZmFsc2UpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAgIHBsYXllci5vZmYoKTtcbiAgICAgICAgZWwucGF1c2UoKTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKCdzcmMnKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge31cblxuICAgICAgICByZW1vdmVFdmVudExpc3RlbmVycygpO1xuXG4gICAgICAgIGlmIChlbC5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICBlbC5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKGVsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVsID0gbnVsbDtcblxuICAgICAgICByZXR1cm4gcGxheWVyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEJsb2JVUkwodXJsKSB7XG4gICAgICAgIHVybCA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKHVybCk7XG4gICAgICAgIGZ1bmN0aW9uIHJldm9rZSgpIHtcbiAgICAgICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NhbnBsYXl0aHJvdWdoJywgcmV2b2tlKTtcbiAgICAgICAgICAgIHdpbmRvdy5VUkwucmV2b2tlT2JqZWN0VVJMKHVybCk7XG4gICAgICAgIH1cbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2FucGxheXRocm91Z2gnLCByZXZva2UpO1xuICAgICAgICByZXR1cm4gdXJsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvYWQodXJsKSB7XG4gICAgICAgIGlmICh3aW5kb3cuQmxvYiAmJiB1cmwgaW5zdGFuY2VvZiB3aW5kb3cuQmxvYikge1xuICAgICAgICAgICAgdXJsID0gZ2V0QmxvYlVSTCh1cmwpO1xuICAgICAgICB9XG4gICAgICAgIGFkZEV2ZW50TGlzdGVuZXJzKCk7XG5cbiAgICAgICAgZWwuY3Jvc3NPcmlnaW4gPSAnYW5vbnltb3VzJztcbiAgICAgICAgZWwucHJlbG9hZCA9ICdhdXRvJztcbiAgICAgICAgZWwuc3JjID0gdXJsO1xuICAgICAgICBlbC5sb2FkKCk7XG5cbiAgICAgICAgcmV0dXJuIHBsYXllcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGF5KCkge1xuICAgICAgICBlbC5wbGF5KCk7XG5cbiAgICAgICAgcmV0dXJuIHBsYXllcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXVzZSgpIHtcbiAgICAgICAgZWwucGF1c2UoKTtcblxuICAgICAgICByZXR1cm4gcGxheWVyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNlZWsodGltZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZWwuY3VycmVudFRpbWUgPSB0aW1lO1xuICAgICAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgICAgIHJldHVybiBwbGF5ZXI7XG4gICAgfVxuXG4gICAgYWRkRXZlbnRMaXN0ZW5lcnMoKTtcblxuICAgIHBsYXllciA9IE9iamVjdC5jcmVhdGUoZW1pdHRlci5wcm90b3R5cGUsIHtcbiAgICAgICAgX2V2ZW50czoge1xuICAgICAgICAgICAgdmFsdWU6IHt9XG4gICAgICAgIH0sXG4gICAgICAgIGRlc3Ryb3k6IHtcbiAgICAgICAgICAgIHZhbHVlOiBkZXN0cm95XG4gICAgICAgIH0sXG4gICAgICAgIGxvYWQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiBsb2FkXG4gICAgICAgIH0sXG4gICAgICAgIHBhdXNlOiB7XG4gICAgICAgICAgICB2YWx1ZTogcGF1c2VcbiAgICAgICAgfSxcbiAgICAgICAgcGxheToge1xuICAgICAgICAgICAgdmFsdWU6IHBsYXlcbiAgICAgICAgfSxcbiAgICAgICAgc2Vlazoge1xuICAgICAgICAgICAgdmFsdWU6IHNlZWtcbiAgICAgICAgfSxcbiAgICAgICAgZWw6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjdXJyZW50VGltZToge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZWwuY3VycmVudFRpbWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGVsLmN1cnJlbnRUaW1lID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGR1cmF0aW9uOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbC5kdXJhdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdm9sdW1lOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbC52b2x1bWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGVsLnZvbHVtZSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZShwbGF5ZXIpO1xufVxuIiwiaW1wb3J0IGVtaXR0ZXIgZnJvbSAnLi4vZXZlbnRzL2VtaXR0ZXInO1xuXG4vLyBodHRwczovL2RldmVsb3Blci52aW1lby5jb20vcGxheWVyL2pzLWFwaVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB2aW1lbyhlbCkge1xuICAgIGNvbnN0IHZpbWVvUGxheWVyID0gZWwuY29udGVudFdpbmRvdztcbiAgICBjb25zdCByZSA9IC9eaHR0cHM/OlxcL1xcL3BsYXllci52aW1lby5jb20vO1xuICAgIGxldCBwbGF5ZXIsIG9yaWdpbiA9ICcqJywgcGF1c2VkID0gZmFsc2U7XG5cbiAgICBmdW5jdGlvbiBzZW5kQ29tbWFuZChtZXRob2QsIHZhbHVlID0gJycpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgIG1ldGhvZFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgZGF0YS52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgICAgICB2aW1lb1BsYXllci5wb3N0TWVzc2FnZShtZXNzYWdlLCBvcmlnaW4pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBsYXkoKSB7XG4gICAgICAgIHBhdXNlZCA9IGZhbHNlO1xuICAgICAgICBzZW5kQ29tbWFuZCgncGxheScpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhdXNlKCkge1xuICAgICAgICBwYXVzZWQgPSB0cnVlO1xuICAgICAgICBzZW5kQ29tbWFuZCgncGF1c2UnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblJlYWR5KCkge1xuICAgICAgICBzZW5kQ29tbWFuZCgnYWRkRXZlbnRMaXN0ZW5lcicsICdwbGF5Jyk7XG4gICAgICAgIHNlbmRDb21tYW5kKCdhZGRFdmVudExpc3RlbmVyJywgJ3BhdXNlJyk7XG4gICAgICAgIHNlbmRDb21tYW5kKCdhZGRFdmVudExpc3RlbmVyJywgJ2ZpbmlzaCcpO1xuICAgICAgICBzZW5kQ29tbWFuZCgnYWRkRXZlbnRMaXN0ZW5lcicsICdwbGF5UHJvZ3Jlc3MnKTtcbiAgICAgICAgcGxheWVyLmVtaXQoJ3JlYWR5Jyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25QbGF5KCkge1xuICAgICAgICBwYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgcGxheWVyLmVtaXQoJ3BsYXknKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblBhdXNlKCkge1xuICAgICAgICBwYXVzZWQgPSB0cnVlO1xuICAgICAgICBwbGF5ZXIuZW1pdCgncGF1c2UnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkZpbmlzaCgpIHtcbiAgICAgICAgcGxheWVyLmVtaXQoJ2VuZGVkJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25QbGF5UHJvZ3Jlc3MoZGF0YSkge1xuICAgICAgICBwbGF5ZXIuZW1pdCgndGltZXVwZGF0ZScsIGRhdGEuc2Vjb25kcyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25NZXNzYWdlKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGlzVmltZW8gPSByZS50ZXN0KGV2ZW50Lm9yaWdpbik7XG5cbiAgICAgICAgaWYgKCFpc1ZpbWVvKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShldmVudC5kYXRhKTtcblxuICAgICAgICBpZiAoZGF0YS5wbGF5ZXJfaWQgJiYgZWwuaWQgIT09IGRhdGEucGxheWVyX2lkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3JpZ2luID09PSAnKicpIHtcbiAgICAgICAgICAgIG9yaWdpbiA9IGV2ZW50Lm9yaWdpbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoZGF0YS5ldmVudCkge1xuICAgICAgICAgICAgY2FzZSAncmVhZHknOlxuICAgICAgICAgICAgICAgIG9uUmVhZHkoZGF0YS5wbGF5ZXJfaWQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncGxheVByb2dyZXNzJzpcbiAgICAgICAgICAgICAgICBvblBsYXlQcm9ncmVzcyhkYXRhLmRhdGEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncGxheSc6XG4gICAgICAgICAgICAgICAgb25QbGF5KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdwYXVzZSc6XG4gICAgICAgICAgICAgICAgb25QYXVzZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZmluaXNoJzpcbiAgICAgICAgICAgICAgICBvbkZpbmlzaCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgb25NZXNzYWdlKTtcbiAgICB9XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIG9uTWVzc2FnZSk7XG5cbiAgICBwbGF5ZXIgPSBPYmplY3QuYXNzaWduKE9iamVjdC5jcmVhdGUoZW1pdHRlci5wcm90b3R5cGUpLCB7XG4gICAgICAgIF9ldmVudHM6IHt9LFxuICAgICAgICBwbGF5LFxuICAgICAgICBwYXVzZSxcbiAgICAgICAgcGF1c2VkOiAoKSA9PiBwYXVzZWQsXG4gICAgICAgIGRlc3Ryb3lcbiAgICB9KTtcblxuICAgIHJldHVybiBwbGF5ZXI7XG59XG4iLCIvLyBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS95b3V0dWJlL2lmcmFtZV9hcGlfcmVmZXJlbmNlI0V2ZW50c1xuaW1wb3J0IHtFdmVudEVtaXR0ZXJ9IGZyb20gJ2V2ZW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHlvdXR1YmUoZWwpIHtcbiAgICBsZXQgZW1pdHRlciA9IG51bGwsIHBsYXllciA9IG51bGwsIHBhdXNlZCA9IGZhbHNlO1xuXG4gICAgZnVuY3Rpb24gcGxheSgpIHtcbiAgICAgICAgcGF1c2VkID0gZmFsc2U7XG4gICAgICAgIHBsYXllci5wbGF5VmlkZW8oKTtcbiAgICAgICAgcmV0dXJuIGVtaXR0ZXI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGF1c2UoKSB7XG4gICAgICAgIHBhdXNlZCA9IHRydWU7XG4gICAgICAgIHBsYXllci5wYXVzZVZpZGVvKCk7XG4gICAgICAgIHJldHVybiBlbWl0dGVyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uUmVhZHkoKSB7XG4gICAgICAgIGVtaXR0ZXIuZW1pdCgncmVhZHknKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblN0YXRlQ2hhbmdlKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHtQbGF5ZXJTdGF0ZX0gPSB3aW5kb3cuWVQ7XG5cbiAgICAgICAgc3dpdGNoIChldmVudC5kYXRhKSB7XG4gICAgICAgICAgICBjYXNlIFBsYXllclN0YXRlLkNVRUQ6XG4gICAgICAgICAgICBjYXNlIFBsYXllclN0YXRlLkJVRkZFUklORzpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUGxheWVyU3RhdGUuUExBWUlORzpcbiAgICAgICAgICAgICAgICBwYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBlbWl0dGVyLmVtaXQoJ3BsYXknKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUGxheWVyU3RhdGUuUEFVU0VEOlxuICAgICAgICAgICAgICAgIHBhdXNlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgZW1pdHRlci5lbWl0KCdwYXVzZScpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBQbGF5ZXJTdGF0ZS5FTkRFRDpcbiAgICAgICAgICAgICAgICBlbWl0dGVyLmVtaXQoJ2VuZGVkJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OiBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlc3Ryb3koKSB7fVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlUGxheWVyKCkge1xuICAgICAgICBpZiAocGxheWVyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBwbGF5ZXIgPSBuZXcgd2luZG93LllULlBsYXllcihlbCwge1xuICAgICAgICAgICAgZXZlbnRzOiB7XG4gICAgICAgICAgICAgICAgb25SZWFkeSxcbiAgICAgICAgICAgICAgICBvblN0YXRlQ2hhbmdlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG5cbiAgICBpZiAod2luZG93LllUKSB7XG4gICAgICAgIGNyZWF0ZVBsYXllcigpO1xuICAgIH0gZWxzZSBpZiAod2luZG93Lnl0UGxheWVyQ2FsbHMpIHtcbiAgICAgICAgd2luZG93Lnl0UGxheWVyQ2FsbHMucHVzaChjcmVhdGVQbGF5ZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy55dFBsYXllckNhbGxzID0gW2NyZWF0ZVBsYXllcl07XG4gICAgICAgIHdpbmRvdy5vbllvdVR1YmVJZnJhbWVBUElSZWFkeSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgd2luZG93Lnl0UGxheWVyQ2FsbHMuZm9yRWFjaCgoY2FsbCkgPT4gY2FsbCgpKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgIHNjcmlwdC5zcmMgPSAnaHR0cHM6Ly93d3cueW91dHViZS5jb20vaWZyYW1lX2FwaSc7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICB9XG5cbiAgICBlbWl0dGVyID0gT2JqZWN0LmFzc2lnbihPYmplY3QuY3JlYXRlKEV2ZW50RW1pdHRlci5wcm90b3R5cGUpLCB7XG4gICAgICAgIF9ldmVudHM6IHt9LFxuICAgICAgICBwbGF5LFxuICAgICAgICBwYXVzZSxcbiAgICAgICAgcGF1c2VkOiAoKSA9PiBwYXVzZWQsXG4gICAgICAgIGRlc3Ryb3lcbiAgICB9KTtcblxuICAgIHJldHVybiBlbWl0dGVyO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24geW91dHViZUJhc2ljKGVsKSB7XG4gICAgY29uc3QgaWZyYW1lID0gZWwuY29udGVudFdpbmRvdztcblxuICAgIGZ1bmN0aW9uIHNlbmRDb21tYW5kKGNvbW1hbmQpIHtcbiAgICAgICAgaWZyYW1lLnBvc3RNZXNzYWdlKGB7XCJldmVudFwiOlwiY29tbWFuZFwiLFwiZnVuY1wiOlwiJHtjb21tYW5kfVwiLFwiYXJnc1wiOlwiXCJ9YCwgJyonKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGF5KCkge1xuICAgICAgICBzZW5kQ29tbWFuZCgncGxheVZpZGVvJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGF1c2UoKSB7XG4gICAgICAgIHNlbmRDb21tYW5kKCdwYXVzZVZpZGVvJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGxheSxcbiAgICAgICAgcGF1c2VcbiAgICB9O1xufVxuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgdGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG5FdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbihuKSB7XG4gIGlmICghaXNOdW1iZXIobikgfHwgbiA8IDAgfHwgaXNOYU4obikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCduIG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXInKTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBlciwgaGFuZGxlciwgbGVuLCBhcmdzLCBpLCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAodHlwZSA9PT0gJ2Vycm9yJykge1xuICAgIGlmICghdGhpcy5fZXZlbnRzLmVycm9yIHx8XG4gICAgICAgIChpc09iamVjdCh0aGlzLl9ldmVudHMuZXJyb3IpICYmICF0aGlzLl9ldmVudHMuZXJyb3IubGVuZ3RoKSkge1xuICAgICAgZXIgPSBhcmd1bWVudHNbMV07XG4gICAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEF0IGxlYXN0IGdpdmUgc29tZSBraW5kIG9mIGNvbnRleHQgdG8gdGhlIHVzZXJcbiAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5jYXVnaHQsIHVuc3BlY2lmaWVkIFwiZXJyb3JcIiBldmVudC4gKCcgKyBlciArICcpJyk7XG4gICAgICAgIGVyci5jb250ZXh0ID0gZXI7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYW5kbGVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc1VuZGVmaW5lZChoYW5kbGVyKSlcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKGlzRnVuY3Rpb24oaGFuZGxlcikpIHtcbiAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIC8vIGZhc3QgY2FzZXNcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vIHNsb3dlclxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgIGhhbmRsZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGhhbmRsZXIpKSB7XG4gICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgbGlzdGVuZXJzID0gaGFuZGxlci5zbGljZSgpO1xuICAgIGxlbiA9IGxpc3RlbmVycy5sZW5ndGg7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKVxuICAgICAgbGlzdGVuZXJzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIG07XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgaWYgKHRoaXMuX2V2ZW50cy5uZXdMaXN0ZW5lcilcbiAgICB0aGlzLmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgaXNGdW5jdGlvbihsaXN0ZW5lci5saXN0ZW5lcikgP1xuICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgZWxzZSBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuICBlbHNlXG4gICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gW3RoaXMuX2V2ZW50c1t0eXBlXSwgbGlzdGVuZXJdO1xuXG4gIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pICYmICF0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkKSB7XG4gICAgaWYgKCFpc1VuZGVmaW5lZCh0aGlzLl9tYXhMaXN0ZW5lcnMpKSB7XG4gICAgICBtID0gdGhpcy5fbWF4TGlzdGVuZXJzO1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gICAgfVxuXG4gICAgaWYgKG0gJiYgbSA+IDAgJiYgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCA+IG0pIHtcbiAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQgPSB0cnVlO1xuICAgICAgY29uc29sZS5lcnJvcignKG5vZGUpIHdhcm5pbmc6IHBvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgJyArXG4gICAgICAgICAgICAgICAgICAgICdsZWFrIGRldGVjdGVkLiAlZCBsaXN0ZW5lcnMgYWRkZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gaW5jcmVhc2UgbGltaXQuJyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCk7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUudHJhY2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gbm90IHN1cHBvcnRlZCBpbiBJRSAxMFxuICAgICAgICBjb25zb2xlLnRyYWNlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIHZhciBmaXJlZCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGcoKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBnKTtcblxuICAgIGlmICghZmlyZWQpIHtcbiAgICAgIGZpcmVkID0gdHJ1ZTtcbiAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgZy5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICB0aGlzLm9uKHR5cGUsIGcpO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gZW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWRcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbGlzdCwgcG9zaXRpb24sIGxlbmd0aCwgaTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXR1cm4gdGhpcztcblxuICBsaXN0ID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuICBsZW5ndGggPSBsaXN0Lmxlbmd0aDtcbiAgcG9zaXRpb24gPSAtMTtcblxuICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHxcbiAgICAgIChpc0Z1bmN0aW9uKGxpc3QubGlzdGVuZXIpICYmIGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG5cbiAgfSBlbHNlIGlmIChpc09iamVjdChsaXN0KSkge1xuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tID4gMDspIHtcbiAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fFxuICAgICAgICAgIChsaXN0W2ldLmxpc3RlbmVyICYmIGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgbGlzdC5sZW5ndGggPSAwO1xuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC5zcGxpY2UocG9zaXRpb24sIDEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGtleSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgaWYgKCF0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIGVsc2UgaWYgKHRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICBmb3IgKGtleSBpbiB0aGlzLl9ldmVudHMpIHtcbiAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICB9XG4gICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzRnVuY3Rpb24obGlzdGVuZXJzKSkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgfSBlbHNlIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAvLyBMSUZPIG9yZGVyXG4gICAgd2hpbGUgKGxpc3RlbmVycy5sZW5ndGgpXG4gICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tsaXN0ZW5lcnMubGVuZ3RoIC0gMV0pO1xuICB9XG4gIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIHJldDtcbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXQgPSBbXTtcbiAgZWxzZSBpZiAoaXNGdW5jdGlvbih0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIHJldCA9IFt0aGlzLl9ldmVudHNbdHlwZV1dO1xuICBlbHNlXG4gICAgcmV0ID0gdGhpcy5fZXZlbnRzW3R5cGVdLnNsaWNlKCk7XG4gIHJldHVybiByZXQ7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIGlmICh0aGlzLl9ldmVudHMpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICAgIGlmIChpc0Z1bmN0aW9uKGV2bGlzdGVuZXIpKVxuICAgICAgcmV0dXJuIDE7XG4gICAgZWxzZSBpZiAoZXZsaXN0ZW5lcilcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgfVxuICByZXR1cm4gMDtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xufTtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGlzTnVtYmVyKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ251bWJlcic7XG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xufVxuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gdm9pZCAwO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbnZhciBNaW5pU2lnbmFsQmluZGluZyA9IChmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIE1pbmlTaWduYWxCaW5kaW5nKGZuLCBvbmNlLCB0aGlzQXJnKSB7XG4gICAgaWYgKG9uY2UgPT09IHVuZGVmaW5lZCkgb25jZSA9IGZhbHNlO1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIE1pbmlTaWduYWxCaW5kaW5nKTtcblxuICAgIHRoaXMuX2ZuID0gZm47XG4gICAgdGhpcy5fb25jZSA9IG9uY2U7XG4gICAgdGhpcy5fdGhpc0FyZyA9IHRoaXNBcmc7XG4gICAgdGhpcy5fbmV4dCA9IHRoaXMuX3ByZXYgPSB0aGlzLl9vd25lciA9IG51bGw7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoTWluaVNpZ25hbEJpbmRpbmcsIFt7XG4gICAga2V5OiAnZGV0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGV0YWNoKCkge1xuICAgICAgaWYgKHRoaXMuX293bmVyID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG4gICAgICB0aGlzLl9vd25lci5kZXRhY2godGhpcyk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gTWluaVNpZ25hbEJpbmRpbmc7XG59KSgpO1xuXG5mdW5jdGlvbiBfYWRkTWluaVNpZ25hbEJpbmRpbmcoc2VsZiwgbm9kZSkge1xuICBpZiAoIXNlbGYuX2hlYWQpIHtcbiAgICBzZWxmLl9oZWFkID0gbm9kZTtcbiAgICBzZWxmLl90YWlsID0gbm9kZTtcbiAgfSBlbHNlIHtcbiAgICBzZWxmLl90YWlsLl9uZXh0ID0gbm9kZTtcbiAgICBub2RlLl9wcmV2ID0gc2VsZi5fdGFpbDtcbiAgICBzZWxmLl90YWlsID0gbm9kZTtcbiAgfVxuXG4gIG5vZGUuX293bmVyID0gc2VsZjtcblxuICByZXR1cm4gbm9kZTtcbn1cblxudmFyIE1pbmlTaWduYWwgPSAoZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBNaW5pU2lnbmFsKCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBNaW5pU2lnbmFsKTtcblxuICAgIHRoaXMuX2hlYWQgPSB0aGlzLl90YWlsID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKE1pbmlTaWduYWwsIFt7XG4gICAga2V5OiAnaGFuZGxlcnMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVycygpIHtcbiAgICAgIHZhciBleGlzdHMgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IGFyZ3VtZW50c1swXTtcblxuICAgICAgdmFyIG5vZGUgPSB0aGlzLl9oZWFkO1xuXG4gICAgICBpZiAoZXhpc3RzKSByZXR1cm4gISFub2RlO1xuXG4gICAgICB2YXIgZWUgPSBbXTtcblxuICAgICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgICAgZWUucHVzaChub2RlKTtcbiAgICAgICAgbm9kZSA9IG5vZGUuX25leHQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBlZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdoYXMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBoYXMobm9kZSkge1xuICAgICAgaWYgKCEobm9kZSBpbnN0YW5jZW9mIE1pbmlTaWduYWxCaW5kaW5nKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pbmlTaWduYWwjaGFzKCk6IEZpcnN0IGFyZyBtdXN0IGJlIGEgTWluaVNpZ25hbEJpbmRpbmcgb2JqZWN0LicpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbm9kZS5fb3duZXIgPT09IHRoaXM7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZGlzcGF0Y2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkaXNwYXRjaCgpIHtcbiAgICAgIHZhciBub2RlID0gdGhpcy5faGVhZDtcblxuICAgICAgaWYgKCFub2RlKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgIHdoaWxlIChub2RlKSB7XG4gICAgICAgIGlmIChub2RlLl9vbmNlKSB0aGlzLmRldGFjaChub2RlKTtcbiAgICAgICAgbm9kZS5fZm4uYXBwbHkobm9kZS5fdGhpc0FyZywgYXJndW1lbnRzKTtcbiAgICAgICAgbm9kZSA9IG5vZGUuX25leHQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2FkZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFkZChmbikge1xuICAgICAgdmFyIHRoaXNBcmcgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyBudWxsIDogYXJndW1lbnRzWzFdO1xuXG4gICAgICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWluaVNpZ25hbCNhZGQoKTogRmlyc3QgYXJnIG11c3QgYmUgYSBGdW5jdGlvbi4nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBfYWRkTWluaVNpZ25hbEJpbmRpbmcodGhpcywgbmV3IE1pbmlTaWduYWxCaW5kaW5nKGZuLCBmYWxzZSwgdGhpc0FyZykpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ29uY2UnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbmNlKGZuKSB7XG4gICAgICB2YXIgdGhpc0FyZyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IG51bGwgOiBhcmd1bWVudHNbMV07XG5cbiAgICAgIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaW5pU2lnbmFsI29uY2UoKTogRmlyc3QgYXJnIG11c3QgYmUgYSBGdW5jdGlvbi4nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBfYWRkTWluaVNpZ25hbEJpbmRpbmcodGhpcywgbmV3IE1pbmlTaWduYWxCaW5kaW5nKGZuLCB0cnVlLCB0aGlzQXJnKSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZGV0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGV0YWNoKG5vZGUpIHtcbiAgICAgIGlmICghKG5vZGUgaW5zdGFuY2VvZiBNaW5pU2lnbmFsQmluZGluZykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaW5pU2lnbmFsI2RldGFjaCgpOiBGaXJzdCBhcmcgbXVzdCBiZSBhIE1pbmlTaWduYWxCaW5kaW5nIG9iamVjdC4nKTtcbiAgICAgIH1cbiAgICAgIGlmIChub2RlLl9vd25lciAhPT0gdGhpcykgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGlmIChub2RlLl9wcmV2KSBub2RlLl9wcmV2Ll9uZXh0ID0gbm9kZS5fbmV4dDtcbiAgICAgIGlmIChub2RlLl9uZXh0KSBub2RlLl9uZXh0Ll9wcmV2ID0gbm9kZS5fcHJldjtcblxuICAgICAgaWYgKG5vZGUgPT09IHRoaXMuX2hlYWQpIHtcbiAgICAgICAgdGhpcy5faGVhZCA9IG5vZGUuX25leHQ7XG4gICAgICAgIGlmIChub2RlLl9uZXh0ID09PSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5fdGFpbCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAobm9kZSA9PT0gdGhpcy5fdGFpbCkge1xuICAgICAgICB0aGlzLl90YWlsID0gbm9kZS5fcHJldjtcbiAgICAgICAgdGhpcy5fdGFpbC5fbmV4dCA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIG5vZGUuX293bmVyID0gbnVsbDtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2RldGFjaEFsbCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRldGFjaEFsbCgpIHtcbiAgICAgIHZhciBub2RlID0gdGhpcy5faGVhZDtcbiAgICAgIGlmICghbm9kZSkgcmV0dXJuIHRoaXM7XG5cbiAgICAgIHRoaXMuX2hlYWQgPSB0aGlzLl90YWlsID0gbnVsbDtcblxuICAgICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgICAgbm9kZS5fb3duZXIgPSBudWxsO1xuICAgICAgICBub2RlID0gbm9kZS5fbmV4dDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBNaW5pU2lnbmFsO1xufSkoKTtcblxuTWluaVNpZ25hbC5NaW5pU2lnbmFsQmluZGluZyA9IE1pbmlTaWduYWxCaW5kaW5nO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBNaW5pU2lnbmFsO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvYmplY3RQb29sKGZhY3RvcnlGbikge1xuXG4gICAgbGV0IHBvb2wgPSBbXTtcbiAgICBsZXQgbnVtQ3JlYXRlZCA9IDA7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRQb29sICgpIHtcbiAgICAgICAgICAgIHJldHVybiBwb29sO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgaWYgKCBwb29sLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvb2wucG9wKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG51bUNyZWF0ZWQrKztcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFjdG9yeUZuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGRpc3Bvc2UgKGluc3RhbmNlKSB7XG4gICAgICAgICAgICBwb29sLnB1c2goaW5zdGFuY2UpO1xuICAgICAgICB9LFxuICAgICAgICBmaWxsIChjb3VudCkge1xuICAgICAgICAgICAgd2hpbGUgKCBwb29sLmxlbmd0aCA8IGNvdW50ICkge1xuICAgICAgICAgICAgICAgIG51bUNyZWF0ZWQrKztcbiAgICAgICAgICAgICAgICBwb29sW3Bvb2wubGVuZ3RoXSA9IGZhY3RvcnlGbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlbXB0eSAoKSB7XG4gICAgICAgICAgICBwb29sID0gW107XG4gICAgICAgIH0sXG4gICAgICAgIGdldE51bUNyZWF0ZWQoKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVtQ3JlYXRlZDtcbiAgICAgICAgfVxuICAgIH07XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjbG9uZShvYikge1xuICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iKSk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmaWx0ZXIob2IsIHByZWRpY2F0ZSkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhvYilcbiAgICAgICAgLmZpbHRlcihrZXkgPT4gcHJlZGljYXRlKGtleSwgb2Jba2V5XSkpXG4gICAgICAgIC5yZWR1Y2UoKG5ld09iLCBrZXkpID0+IHtcbiAgICAgICAgICAgIG5ld09iW2tleV0gPSBvYltrZXldO1xuICAgICAgICAgICAgcmV0dXJuIG5ld09iO1xuICAgICAgICB9LCB7fSk7XG59XG4iLCJpbXBvcnQgY2xvbmUgZnJvbSAnLi9jbG9uZSc7XG5pbXBvcnQgZmlsdGVyIGZyb20gJy4vZmlsdGVyJztcbmltcG9ydCBtYXAgZnJvbSAnLi9tYXAnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgY2xvbmUsXG4gICAgZmlsdGVyLFxuICAgIG1hcFxufTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1hcChvYiwgZm4pIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMob2IpXG4gICAgICAgIC5yZWR1Y2UoKG5ld09iLCBrZXkpID0+IHtcbiAgICAgICAgICAgIG5ld09iW2tleV0gPSBmbihrZXksIG9iW2tleV0pO1xuICAgICAgICAgICAgcmV0dXJuIG5ld09iO1xuICAgICAgICB9LCB7fSk7XG59XG4iLCJjb25zdCB7YWJzLCBhdGFuMiwgY29zLCBzaW4sIHNxcnR9ID0gTWF0aDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFydGljbGUge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5vcHRzID0gb3B0aW9ucztcblxuICAgICAgICB0aGlzLl9ib3VuZHMgPSB7fTtcbiAgICAgICAgdGhpcy5fb3V0ZXJCb3VuZHMgPSB7fTtcblxuICAgICAgICB0aGlzLl9kZWZhdWx0cyA9IHtcbiAgICAgICAgICAgIGFsaXZlOiB0cnVlLFxuICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgIHk6IDAsXG4gICAgICAgICAgICBhbmdsZTogMCxcbiAgICAgICAgICAgIHNwZWVkOiAwLFxuICAgICAgICAgICAgZ3Jhdml0eTogMCxcbiAgICAgICAgICAgIG1hc3M6IDEsXG4gICAgICAgICAgICByYWRpdXM6IDAsXG4gICAgICAgICAgICBib3VuY2U6IHt4OiAtMSwgeTogLTF9LFxuICAgICAgICAgICAgZnJpY3Rpb246IDEsXG4gICAgICAgICAgICBsaWZlVGltZTogMCxcbiAgICAgICAgICAgIGJvdW5kczoge3g6IDAsIHk6IDAsIHdpZHRoOiAxMjgwLCBoZWlnaHQ6IDcyMH1cbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLl9wcm9wcyA9IE9iamVjdC5rZXlzKHRoaXMuX2RlZmF1bHRzKTtcblxuICAgICAgICB0aGlzLnJlc2V0KG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHJlc2V0KG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgZGVmcyA9IHRoaXMuX2RlZmF1bHRzO1xuICAgICAgICBjb25zdCBwcm9wcyA9IHRoaXMuX3Byb3BzO1xuICAgICAgICBjb25zdCBvcHRzID0gb3B0aW9ucyB8fCBkZWZzO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IHByb3BzW2ldO1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBvcHRzW2tleV0gfHwgZGVmc1trZXldO1xuICAgICAgICAgICAgdGhpc1trZXldID0gdmFsdWU7XG4gICAgICAgICAgICBkZWZzW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGFuZ2xlID0gb3B0cy5hbmdsZSB8fCBkZWZzLmFuZ2xlO1xuICAgICAgICBjb25zdCBzcGVlZCA9IG9wdHMuc3BlZWQgfHwgZGVmcy5zcGVlZDtcblxuICAgICAgICB0aGlzLnZ4ID0gY29zKGFuZ2xlKSAqIHNwZWVkO1xuICAgICAgICB0aGlzLnZ5ID0gc2luKGFuZ2xlKSAqIHNwZWVkO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy52eCAqPSB0aGlzLmZyaWN0aW9uO1xuICAgICAgICB0aGlzLnZ5ICo9IHRoaXMuZnJpY3Rpb247XG4gICAgICAgIHRoaXMudnkgKz0gdGhpcy5ncmF2aXR5O1xuICAgICAgICB0aGlzLnggKz0gdGhpcy52eDtcbiAgICAgICAgdGhpcy55ICs9IHRoaXMudnk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGFjY2VsbGVyYXRlKHNwZWVkLCBhbmdsZSkge1xuICAgICAgICBpZiAodHlwZW9mIGFuZ2xlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgYW5nbGUgPSB0aGlzLmFuZ2xlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudnggKz0gY29zKGFuZ2xlKSAqIHNwZWVkO1xuICAgICAgICB0aGlzLnZ5ICs9IHNpbihhbmdsZSkgKiBzcGVlZDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZ2V0IHNwZWVkKCkge1xuICAgICAgICBpZiAodGhpcy52eCA9PT0gMCAmJiB0aGlzLnZ5ID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3FydCh0aGlzLnZ4ICogdGhpcy52eCArIHRoaXMudnkgKiB0aGlzLnZ5KTtcbiAgICB9XG5cbiAgICBzZXQgc3BlZWQodmFsdWUpIHtcbiAgICAgICAgY29uc3QgYW5nbGUgPSB0aGlzLmFuZ2xlO1xuICAgICAgICB0aGlzLnZ4ID0gY29zKGFuZ2xlKSAqIHZhbHVlO1xuICAgICAgICB0aGlzLnZ5ID0gc2luKGFuZ2xlKSAqIHZhbHVlO1xuICAgIH1cblxuICAgIGdldCBhbmdsZSgpIHtcbiAgICAgICAgaWYgKHRoaXMudnggPT09IDAgJiYgdGhpcy52eSA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGF0YW4yKHRoaXMudnksIHRoaXMudngpO1xuICAgIH1cblxuICAgIHNldCBhbmdsZSh2YWx1ZSkge1xuICAgICAgICBjb25zdCBzcGVlZCA9IHRoaXMuc3BlZWQ7XG4gICAgICAgIHRoaXMudnggPSBjb3ModmFsdWUpICogc3BlZWQ7XG4gICAgICAgIHRoaXMudnkgPSBzaW4odmFsdWUpICogc3BlZWQ7XG4gICAgfVxuXG4gICAgc2V0Qm91bmRzKHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgdGhpcy5fYm91bmRzLnggPSB4IHx8IDA7XG4gICAgICAgIHRoaXMuX2JvdW5kcy55ID0geSB8fCAwO1xuICAgICAgICB0aGlzLl9ib3VuZHMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5fYm91bmRzLmhlaWdodCA9IGhlaWdodDtcbiAgICB9XG5cbiAgICBnZXQgYm91bmRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYm91bmRzO1xuICAgIH1cblxuICAgIHNldCBib3VuZHMob2IpIHtcbiAgICAgICAgY29uc3Qge3gsIHksIHdpZHRoLCBoZWlnaHR9ID0gb2I7XG4gICAgICAgIHRoaXMuc2V0Qm91bmRzKHgsIHksIHdpZHRoLCBoZWlnaHQpO1xuICAgIH1cblxuICAgIGdldCBsZWZ0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy54IC0gdGhpcy5yYWRpdXM7XG4gICAgfVxuXG4gICAgZ2V0IHJpZ2h0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy54ICsgdGhpcy5yYWRpdXM7XG4gICAgfVxuXG4gICAgZ2V0IHRvcCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueSAtIHRoaXMucmFkaXVzO1xuICAgIH1cblxuICAgIGdldCBib3R0b20oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnkgKyB0aGlzLnJhZGl1cztcbiAgICB9XG5cbiAgICBnZXQgb3V0ZXJCb3VuZHMoKSB7XG4gICAgICAgIHRoaXMuX291dGVyQm91bmRzLmxlZnQgPSB0aGlzLl9ib3VuZHMueCAtIHRoaXMucmFkaXVzO1xuICAgICAgICB0aGlzLl9vdXRlckJvdW5kcy5yaWdodCA9IHRoaXMuX2JvdW5kcy54ICsgdGhpcy5fYm91bmRzLndpZHRoICsgdGhpcy5yYWRpdXM7XG4gICAgICAgIHRoaXMuX291dGVyQm91bmRzLnRvcCA9IHRoaXMuX2JvdW5kcy55IC0gdGhpcy5yYWRpdXM7XG4gICAgICAgIHRoaXMuX291dGVyQm91bmRzLmJvdHRvbSA9IHRoaXMuX2JvdW5kcy55ICsgdGhpcy5fYm91bmRzLmhlaWdodCArIHRoaXMucmFkaXVzO1xuICAgICAgICByZXR1cm4gdGhpcy5fb3V0ZXJCb3VuZHM7XG4gICAgfVxuXG4gICAgYW5nbGVUbyhwKSB7XG4gICAgICAgIHJldHVybiBhdGFuMihwLnkgLSB0aGlzLnksIHAueCAtIHRoaXMueCk7XG4gICAgfVxuXG4gICAgZGlzdGFuY2VUbyhwKSB7XG4gICAgICAgIGNvbnN0IGR4ID0gcC54IC0gdGhpcy54O1xuICAgICAgICBjb25zdCBkeSA9IHAueSAtIHRoaXMueTtcbiAgICAgICAgcmV0dXJuIHNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuICAgIH1cblxuICAgIG1vdmVUbyhwLCB0aHJ1c3QgPSAwLjAwNSkge1xuICAgICAgICBjb25zdCBkeCA9IHAueCAtIHRoaXMueDtcbiAgICAgICAgY29uc3QgZHkgPSBwLnkgLSB0aGlzLnk7XG5cbiAgICAgICAgdGhpcy52eCArPSBkeCAqIHRocnVzdDtcbiAgICAgICAgdGhpcy52eSArPSBkeSAqIHRocnVzdDtcblxuICAgICAgICBpZiAoYWJzKHRoaXMudngpID4gYWJzKGR4KSkge1xuICAgICAgICAgICAgdGhpcy52eCA9IGR4O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFicyh0aGlzLnZ5KSA+IGFicyhkeSkpIHtcbiAgICAgICAgICAgIHRoaXMudnkgPSBkeTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGdyYXZpdGF0ZVRvKHApIHtcbiAgICAgICAgY29uc3QgZHggPSBwLnggLSB0aGlzLng7XG4gICAgICAgIGNvbnN0IGR5ID0gcC55IC0gdGhpcy55O1xuICAgICAgICBjb25zdCBkaXN0U3EgPSBkeCAqIGR4ICsgZHkgKiBkeTtcbiAgICAgICAgaWYgKGRpc3RTcSA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGRpc3QgPSBzcXJ0KGRpc3RTcSk7XG4gICAgICAgICAgICBjb25zdCBmb3JjZSA9IHAubWFzcyAvIGRpc3RTcTtcbiAgICAgICAgICAgIGNvbnN0IGF4ID0gZHggLyBkaXN0ICogZm9yY2U7XG4gICAgICAgICAgICBjb25zdCBheSA9IGR5IC8gZGlzdCAqIGZvcmNlO1xuICAgICAgICAgICAgdGhpcy52eCArPSBheDtcbiAgICAgICAgICAgIHRoaXMudnkgKz0gYXk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzcHJpbmdUbyhwLCBzdGlmZm5lc3MsIGxlbmd0aCkge1xuICAgICAgICBjb25zdCBkeCA9IHAueCAtIHRoaXMueDtcbiAgICAgICAgY29uc3QgZHkgPSBwLnkgLSB0aGlzLnk7XG4gICAgICAgIGNvbnN0IGRpc3RhbmNlID0gc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgICAgIGNvbnN0IGZvcmNlID0gKGRpc3RhbmNlIC0gKGxlbmd0aCB8fCAwKSkgKiAoc3RpZmZuZXNzIHx8IDAuMik7XG5cbiAgICAgICAgaWYgKGFicyhkaXN0YW5jZSAqIGZvcmNlKSA+IDApIHtcbiAgICAgICAgICAgIHRoaXMudnggKz0gZHggLyBkaXN0YW5jZSAqIGZvcmNlO1xuICAgICAgICAgICAgdGhpcy52eSArPSBkeSAvIGRpc3RhbmNlICogZm9yY2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBjb2xsaWRlcyhwKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpc3RhbmNlVG8ocCkgPD0gdGhpcy5yYWRpdXMgKyBwLnJhZGl1cztcbiAgICB9XG5cbiAgICBlZGdlQ29sbGlkZSgpIHtcbiAgICAgICAgY29uc3QgbGVmdCA9IHRoaXMuX2JvdW5kcy54ICsgdGhpcy5yYWRpdXM7XG4gICAgICAgIGNvbnN0IHJpZ2h0ID0gdGhpcy5fYm91bmRzLnggKyB0aGlzLl9ib3VuZHMud2lkdGggLSB0aGlzLnJhZGl1cztcbiAgICAgICAgY29uc3QgdG9wID0gdGhpcy5fYm91bmRzLnkgKyB0aGlzLnJhZGl1cztcbiAgICAgICAgY29uc3QgYm90dG9tID0gdGhpcy5fYm91bmRzLnkgKyB0aGlzLl9ib3VuZHMuaGVpZ2h0IC0gdGhpcy5yYWRpdXM7XG5cbiAgICAgICAgaWYgKHRoaXMueCA8IGxlZnQpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IGxlZnQ7XG4gICAgICAgICAgICB0aGlzLnZ4ID0gdGhpcy52eCAqIHRoaXMuYm91bmNlLng7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy54ID4gcmlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHJpZ2h0O1xuICAgICAgICAgICAgdGhpcy52eCA9IHRoaXMudnggKiB0aGlzLmJvdW5jZS54O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMueSA8IHRvcCkge1xuICAgICAgICAgICAgdGhpcy55ID0gdG9wO1xuICAgICAgICAgICAgdGhpcy52eSA9IHRoaXMudnkgKiB0aGlzLmJvdW5jZS55O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMueSA+IGJvdHRvbSkge1xuICAgICAgICAgICAgdGhpcy55ID0gYm90dG9tO1xuICAgICAgICAgICAgdGhpcy52eSA9IHRoaXMudnkgKiB0aGlzLmJvdW5jZS55O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZWRnZVdyYXAoKSB7XG4gICAgICAgIGNvbnN0IHtsZWZ0LCByaWdodCwgdG9wLCBib3R0b219ID0gdGhpcy5vdXRlckJvdW5kcztcblxuICAgICAgICBpZiAodGhpcy54IDwgbGVmdCkge1xuICAgICAgICAgICAgdGhpcy54ID0gcmlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy54ID4gcmlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IGxlZnQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy55IDwgdG9wKSB7XG4gICAgICAgICAgICB0aGlzLnkgPSBib3R0b207XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy55ID4gYm90dG9tKSB7XG4gICAgICAgICAgICB0aGlzLnkgPSB0b3A7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlZGdlS2lsbCgpIHtcbiAgICAgICAgY29uc3Qge2xlZnQsIHJpZ2h0LCB0b3AsIGJvdHRvbX0gPSB0aGlzLm91dGVyQm91bmRzO1xuXG4gICAgICAgIGlmICh0aGlzLnggPCBsZWZ0IHx8IHRoaXMueCA+IHJpZ2h0IHx8IHRoaXMueSA8IHRvcCB8fCB0aGlzLnkgPiBib3R0b20pIHtcbiAgICAgICAgICAgIHRoaXMuYWxpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVkZ2VSZXNldCgpIHtcbiAgICAgICAgY29uc3Qge2xlZnQsIHJpZ2h0LCB0b3AsIGJvdHRvbX0gPSB0aGlzLm91dGVyQm91bmRzO1xuXG4gICAgICAgIGlmICh0aGlzLnggPCBsZWZ0IHx8IHRoaXMueCA+IHJpZ2h0IHx8IHRoaXMueSA8IHRvcCB8fCB0aGlzLnkgPiBib3R0b20pIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxpZmVLaWxsKCkge1xuICAgICAgICB0aGlzLmxpZmVUaW1lLS07XG5cbiAgICAgICAgaWYgKHRoaXMubGlmZVRpbWUgPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5hbGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IGFuZHJvaWQgZnJvbSAnLi9hbmRyb2lkJztcblxuLy9odHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE0NDAzNzY2L2hvdy10by1kZXRlY3QtdGhlLXN0b2NrLWFuZHJvaWQtYnJvd3NlclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYW5kcm9pZE5hdGl2ZSh1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQpIHtcbiAgICBpZiAoIWFuZHJvaWQodWEpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBpc0FuZHJvaWRNb2JpbGUgPSB1YS5pbmRleE9mKCdNb3ppbGxhLzUuMCcpID4gLTEgJiYgdWEuaW5kZXhPZignQXBwbGVXZWJLaXQnKSA+IC0xO1xuXG4gICAgY29uc3QgcmVBcHBsZVdlYktpdCA9IC9BcHBsZVdlYktpdFxcLyhbXFxkLl0rKS87XG4gICAgY29uc3QgcmVzdWx0QXBwbGVXZWJLaXQgPSByZUFwcGxlV2ViS2l0LmV4ZWModWEpO1xuICAgIGNvbnN0IGFwcGxlV2ViS2l0VmVyc2lvbiA9IHJlc3VsdEFwcGxlV2ViS2l0ID8gcGFyc2VGbG9hdChyZUFwcGxlV2ViS2l0LmV4ZWModWEpWzFdKSA6IG51bGw7XG5cbiAgICBjb25zdCByZUNocm9tZSA9IC9DaHJvbWVcXC8oW1xcZC5dKykvO1xuICAgIGNvbnN0IHJlc3VsdENocm9tZSA9IHJlQ2hyb21lLmV4ZWModWEpO1xuICAgIGNvbnN0IGNocm9tZVZlcnNpb24gPSByZXN1bHRDaHJvbWUgPyBwYXJzZUZsb2F0KHJlQ2hyb21lLmV4ZWModWEpWzFdKSA6IG51bGw7XG5cbiAgICByZXR1cm4gaXNBbmRyb2lkTW9iaWxlICYmIChhcHBsZVdlYktpdFZlcnNpb24gJiYgYXBwbGVXZWJLaXRWZXJzaW9uIDwgNTM3KSB8fCAoY2hyb21lVmVyc2lvbiAmJiBjaHJvbWVWZXJzaW9uIDwgMzcpO1xufVxuIiwiaW1wb3J0IGFuZHJvaWQgZnJvbSAnLi9hbmRyb2lkJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYW5kcm9pZFZlcnNpb24odWEgPSBuYXZpZ2F0b3IudXNlckFnZW50KSB7XG4gICAgaWYgKCFhbmRyb2lkKHVhKSkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgY29uc3QgdmVyc2lvbiA9IHVhLm1hdGNoKC9BbmRyb2lkIChcXGQrKD86XFwuXFxkKykrKTsvKVsxXTtcbiAgICBjb25zdCBbYSwgYl0gPSB2ZXJzaW9uLnNwbGl0KCcuJyk7XG4gICAgcmV0dXJuIHBhcnNlRmxvYXQoYCR7YX0uJHtifWApO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgKHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudCkgPT4gL0FuZHJvaWQvaS50ZXN0KHVhKTtcbiIsImltcG9ydCBpb3MgZnJvbSAnLi9pb3MnO1xuXG5leHBvcnQgZGVmYXVsdCAodWEgPSBuYXZpZ2F0b3IudXNlckFnZW50KSA9PiBpb3ModWEpICYmIC9DcmlPUy8udGVzdCh1YSk7XG4iLCJpbXBvcnQgbW9iaWxlIGZyb20gJy4vbW9iaWxlJztcblxuZXhwb3J0IGRlZmF1bHQgKHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudCkgPT4gIW1vYmlsZSh1YSk7XG4iLCJleHBvcnQgZGVmYXVsdCAoKSA9PiAhIXdpbmRvdy5EZXZpY2VPcmllbnRhdGlvbkV2ZW50O1xuIiwiZXhwb3J0IGRlZmF1bHQgKHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudCkgPT4gL0ZpcmVmb3gvLnRlc3QodWEpO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaWVWZXJzaW9uKHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudCkge1xuICAgIGxldCB2ID0gMDtcbiAgICBpZiAoL01TSUUgKFxcZCtcXC5cXGQrKTsvLnRlc3QodWEpKSB7XG4gICAgICAgIHYgPSBwYXJzZUludChSZWdFeHAuJDEsIDEwKTtcbiAgICB9IGVsc2UgaWYgKC9UcmlkZW50XFwvKFxcZCtcXC5cXGQrKSguKilydjooXFxkK1xcLlxcZCspLy50ZXN0KHVhKSkge1xuICAgICAgICB2ID0gcGFyc2VJbnQoUmVnRXhwLiQzLCAxMCk7XG4gICAgfVxuICAgIHJldHVybiB2O1xufVxuIiwiaW1wb3J0IGllVmVyc2lvbiBmcm9tICcuL2llLXZlcnNpb24nO1xuXG5leHBvcnQgZGVmYXVsdCAodWEgPSBuYXZpZ2F0b3IudXNlckFnZW50KSA9PiBpZVZlcnNpb24odWEpID4gMDtcbiIsImltcG9ydCBhbmRyb2lkIGZyb20gJy4vYW5kcm9pZCc7XG5pbXBvcnQgYW5kcm9pZE5hdGl2ZSBmcm9tICcuL2FuZHJvaWQtbmF0aXZlJztcbmltcG9ydCBhbmRyb2lkVmVyc2lvbiBmcm9tICcuL2FuZHJvaWQtdmVyc2lvbic7XG5pbXBvcnQgY2hyb21lSU9TIGZyb20gJy4vY2hyb21lLWlvcyc7XG5pbXBvcnQgZGVza3RvcCBmcm9tICcuL2Rlc2t0b3AnO1xuaW1wb3J0IGRldmljZU9yaWVudGF0aW9uIGZyb20gJy4vZGV2aWNlLW9yaWVudGF0aW9uJztcbmltcG9ydCBmaXJlZm94IGZyb20gJy4vZmlyZWZveCc7XG5pbXBvcnQgaWUgZnJvbSAnLi9pZSc7XG5pbXBvcnQgaWVWZXJzaW9uIGZyb20gJy4vaWUtdmVyc2lvbic7XG5pbXBvcnQgaW9zIGZyb20gJy4vaW9zJztcbmltcG9ydCBpb3NWZXJzaW9uIGZyb20gJy4vaW9zLXZlcnNpb24nO1xuaW1wb3J0IGlwYWQgZnJvbSAnLi9pcGFkJztcbmltcG9ydCBpcGhvbmUgZnJvbSAnLi9pcGhvbmUnO1xuaW1wb3J0IGxpbnV4IGZyb20gJy4vbGludXgnO1xuaW1wb3J0IGxvY2FsSG9zdCBmcm9tICcuL2xvY2FsLWhvc3QnO1xuaW1wb3J0IG1hYyBmcm9tICcuL21hYyc7XG5pbXBvcnQgbW9iaWxlIGZyb20gJy4vbW9iaWxlJztcbmltcG9ydCBtcDQgZnJvbSAnLi9tcDQnO1xuaW1wb3J0IHNhZmFyaSBmcm9tICcuL3NhZmFyaSc7XG5pbXBvcnQgc2FmYXJpSU9TIGZyb20gJy4vc2FmYXJpLWlvcyc7XG5pbXBvcnQgc2NyZWVuIGZyb20gJy4vc2NyZWVuJztcbmltcG9ydCB3ZWJnbCBmcm9tICcuL3dlYmdsJztcbmltcG9ydCB3ZWJtIGZyb20gJy4vd2VibSc7XG5pbXBvcnQgd2luZG93cyBmcm9tICcuL3dpbmRvd3MnO1xuaW1wb3J0IHdpbmRvd3NQaG9uZSBmcm9tICcuL3dpbmRvd3MtcGhvbmUnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYW5kcm9pZDogYW5kcm9pZCgpLFxuICAgIGFuZHJvaWROYXRpdmU6IGFuZHJvaWROYXRpdmUoKSxcbiAgICBhbmRyb2lkVmVyc2lvbjogYW5kcm9pZFZlcnNpb24oKSxcbiAgICBjaHJvbWVJT1M6IGNocm9tZUlPUygpLFxuICAgIGRlc2t0b3A6IGRlc2t0b3AoKSxcbiAgICBkZXZpY2VPcmllbnRhdGlvbjogZGV2aWNlT3JpZW50YXRpb24oKSxcbiAgICBmaXJlZm94OiBmaXJlZm94KCksXG4gICAgaWU6IGllKCksXG4gICAgaWVWZXJzaW9uOiBpZVZlcnNpb24oKSxcbiAgICBpb3M6IGlvcygpLFxuICAgIGlvc1ZlcnNpb246IGlvc1ZlcnNpb24oKSxcbiAgICBpcGFkOiBpcGFkKCksXG4gICAgaXBob25lOiBpcGhvbmUoKSxcbiAgICBsaW51eDogbGludXgoKSxcbiAgICBsb2NhbEhvc3Q6IGxvY2FsSG9zdCgpLFxuICAgIG1hYzogbWFjKCksXG4gICAgbW9iaWxlOiBtb2JpbGUoKSxcbiAgICBtcDQ6IG1wNCgpLFxuICAgIHNhZmFyaTogc2FmYXJpKCksXG4gICAgc2FmYXJpSU9TOiBzYWZhcmlJT1MoKSxcbiAgICBzY3JlZW46IHNjcmVlbixcbiAgICB3ZWJnbDogd2ViZ2woKSxcbiAgICB3ZWJtOiB3ZWJtKCksXG4gICAgd2luZG93czogd2luZG93cygpLFxuICAgIHdpbmRvd3NQaG9uZTogd2luZG93c1Bob25lKClcbn07XG4iLCJpbXBvcnQgaW9zIGZyb20gJy4vaW9zJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW9zVmVyc2lvbih1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQpIHtcbiAgICBpZiAoaW9zKHVhKSkge1xuICAgICAgICBjb25zdCBbLCBiLCBjXSA9IHVhLm1hdGNoKC9PUyAoXFxkKylfKFxcZCspL2kpO1xuICAgICAgICBpZiAoYiAmJiBjKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChgJHtifS4ke2N9YCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIDA7XG59XG4iLCJleHBvcnQgZGVmYXVsdCAodWEgPSBuYXZpZ2F0b3IudXNlckFnZW50KSA9PiAvaVBbYW9dZHxpUGhvbmUvaS50ZXN0KHVhKTtcbiIsImV4cG9ydCBkZWZhdWx0ICh1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQpID0+IC9pUGFkL2kudGVzdCh1YSk7XG4iLCJleHBvcnQgZGVmYXVsdCAodWEgPSBuYXZpZ2F0b3IudXNlckFnZW50KSA9PiAvaVBvZHxpUGhvbmUvaS50ZXN0KHVhKTtcbiIsImltcG9ydCBhbmRyb2lkIGZyb20gJy4vYW5kcm9pZCc7XG5cbmV4cG9ydCBkZWZhdWx0ICh1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQpID0+ICFhbmRyb2lkKHVhKSAmJiAvTGludXgvLnRlc3QodWEpO1xuIiwiZXhwb3J0IGRlZmF1bHQgKCkgPT4gL14oPzpodHRwcz86XFwvXFwvKT8oPzpsb2NhbGhvc3R8MTkyXFwuMTY4KS8udGVzdCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4iLCJpbXBvcnQgaW9zIGZyb20gJy4vaW9zJztcblxuZXhwb3J0IGRlZmF1bHQgKHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudCkgPT4gIWlvcyh1YSkgJiYgL01hYyBPUy8udGVzdCh1YSk7XG4iLCJleHBvcnQgZGVmYXVsdCAodWEgPSBuYXZpZ2F0b3IudXNlckFnZW50KSA9PiAvQW5kcm9pZHx3ZWJPU3xpUGhvbmV8aVBhZHxpUG9kfEJsYWNrQmVycnl8SUVNb2JpbGV8T3BlcmEgTWluaXxXaW5kb3dzIFBob25lfFN5bWJpYW5PUy9pLnRlc3QodWEpO1xuIiwiY29uc3QgdmlkZW9FbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG5leHBvcnQgZGVmYXVsdCAoKSA9PiAhISh2aWRlb0VsLmNhblBsYXlUeXBlICYmIHZpZGVvRWwuY2FuUGxheVR5cGUoJ3ZpZGVvL21wNDsgY29kZWNzPVwiYXZjMS40MkUwMUUsIG1wNGEuNDAuMlwiJykpO1xuIiwiaW1wb3J0IGlvcyBmcm9tICcuL2lvcyc7XG5cbmV4cG9ydCBkZWZhdWx0ICh1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQpID0+IGlvcyh1YSkgJiYgL0FwcGxlV2ViS2l0Ly50ZXN0KHVhKTtcbiIsImV4cG9ydCBkZWZhdWx0ICh1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQpID0+ICEvQW5kcm9pZC8udGVzdCh1YSkgJiYgIS9DaHJvbWUvLnRlc3QodWEpICYmIC9TYWZhcmkvLnRlc3QodWEpO1xuIiwiZXhwb3J0IGRlZmF1bHQge1xuICAgIHdpZHRoOiBNYXRoLm1heCh3aW5kb3cub3V0ZXJXaWR0aCwgd2luZG93LnNjcmVlbi53aWR0aCksXG4gICAgaGVpZ2h0OiBNYXRoLm1heCh3aW5kb3cub3V0ZXJIZWlnaHQsIHdpbmRvdy5zY3JlZW4uaGVpZ2h0KSxcbiAgICBkcHI6IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDEsXG4gICAgcmV0aW5hOiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyA+IDFcbn07XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB3ZWJnbCgpIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgY29uc3QgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCd3ZWJnbCcpIHx8IGNhbnZhcy5nZXRDb250ZXh0KCdleHBlcmltZW50YWwtd2ViZ2wnKTtcbiAgICAgICAgcmV0dXJuICEhKHdpbmRvdy5XZWJHTFJlbmRlcmluZ0NvbnRleHQgJiYgY29udGV4dCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuIiwiY29uc3QgdmlkZW9FbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG5leHBvcnQgZGVmYXVsdCAoKSA9PiAhISh2aWRlb0VsLmNhblBsYXlUeXBlICYmIHZpZGVvRWwuY2FuUGxheVR5cGUoJ3ZpZGVvL3dlYm07IGNvZGVjcz1cInZwOCwgdm9yYmlzXCInKSk7XG4iLCJleHBvcnQgZGVmYXVsdCAodWEgPSBuYXZpZ2F0b3IudXNlckFnZW50KSA9PiAvV2luZG93cyBQaG9uZS9pLnRlc3QodWEpO1xuIiwiaW1wb3J0IHdpbmRvd3NQaG9uZSBmcm9tICcuL3dpbmRvd3MtcGhvbmUnO1xuXG5leHBvcnQgZGVmYXVsdCAodWEgPSBuYXZpZ2F0b3IudXNlckFnZW50KSA9PiAhd2luZG93c1Bob25lKHVhKSAmJiAvV2luZG93cy8udGVzdCh1YSk7XG4iLCIvKlxuICogY2xhc3NMaXN0IChwYXJ0aWFsIHBvbHlmaWxsIGZvciBJRSAxMCwgSUUgMTEgYW5kIEZpcmVmb3ggPDI0KVxuICogYWRhcHRlZCBmcm9tOiBodHRwczovL2dpdGh1Yi5jb20vZWxpZ3JleS9jbGFzc0xpc3QuanMvYmxvYi9tYXN0ZXIvY2xhc3NMaXN0LmpzXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgbGV0IHRlc3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnXycpO1xuXG4gICAgdGVzdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYzEnLCAnYzInKTtcblxuICAgIC8vIFBvbHlmaWxsIGZvciBJRSAxMC8xMSBhbmQgRmlyZWZveCA8MjYsIHdoZXJlIGNsYXNzTGlzdC5hZGQgYW5kXG4gICAgLy8gY2xhc3NMaXN0LnJlbW92ZSBleGlzdCBidXQgc3VwcG9ydCBvbmx5IG9uZSBhcmd1bWVudCBhdCBhIHRpbWUuXG4gICAgaWYgKCF0ZXN0RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2MyJykpIHtcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlTWV0aG9kKG1ldGhvZCkge1xuICAgICAgICAgICAgY29uc3Qgb3JpZ2luYWwgPSB3aW5kb3cuRE9NVG9rZW5MaXN0LnByb3RvdHlwZVttZXRob2RdO1xuXG4gICAgICAgICAgICB3aW5kb3cuRE9NVG9rZW5MaXN0LnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odG9rZW4pIHtcbiAgICAgICAgICAgICAgICBsZXQgaTtcbiAgICAgICAgICAgICAgICBjb25zdCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbC5jYWxsKHRoaXMsIHRva2VuKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGNyZWF0ZU1ldGhvZCgnYWRkJyk7XG4gICAgICAgIGNyZWF0ZU1ldGhvZCgncmVtb3ZlJyk7XG4gICAgfVxuXG4gICAgdGVzdEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnYzMnLCBmYWxzZSk7XG5cbiAgICAvLyBQb2x5ZmlsbCBmb3IgSUUgMTAsIElFIDExIGFuZCBGaXJlZm94IDwyNCwgd2hlcmUgY2xhc3NMaXN0LnRvZ2dsZSBkb2VzIG5vdFxuICAgIC8vIHN1cHBvcnQgdGhlIHNlY29uZCBhcmd1bWVudC5cbiAgICBpZiAodGVzdEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjMycpKSB7XG4gICAgICAgIGNvbnN0IHRvZ2dsZSA9IHdpbmRvdy5ET01Ub2tlbkxpc3QucHJvdG90eXBlLnRvZ2dsZTtcblxuICAgICAgICB3aW5kb3cuRE9NVG9rZW5MaXN0LnByb3RvdHlwZS50b2dnbGUgPSBmdW5jdGlvbih0b2tlbiwgZm9yY2UpIHtcbiAgICAgICAgICAgIGZvcmNlID0gISFmb3JjZTtcbiAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSAmJiB0aGlzLmNvbnRhaW5zKHRva2VuKSA9PT0gZm9yY2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9yY2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0b2dnbGUuY2FsbCh0aGlzLCB0b2tlbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdGVzdEVsZW1lbnQgPSBudWxsO1xufSgpKTtcbiIsIihmdW5jdGlvbihmbikge1xuICAgIHdpbmRvdy5jb25zb2xlID0gd2luZG93LmNvbnNvbGUgfHwge307XG4gICAgY29uc3QgbWV0aG9kcyA9IFtcbiAgICAgICAgJ2Fzc2VydCcsXG4gICAgICAgICdjbGVhcicsXG4gICAgICAgICdjb3VudCcsXG4gICAgICAgICdkZWJ1ZycsXG4gICAgICAgICdkaXInLFxuICAgICAgICAnZGlyeG1sJyxcbiAgICAgICAgJ2Vycm9yJyxcbiAgICAgICAgJ2dyb3VwJyxcbiAgICAgICAgJ2dyb3VwQ29sbGFwc2VkJyxcbiAgICAgICAgJ2dyb3VwRW5kJyxcbiAgICAgICAgJ2luZm8nLFxuICAgICAgICAnbG9nJyxcbiAgICAgICAgJ21hcmtUaW1lbGluZScsXG4gICAgICAgICdtZW1vcnknLFxuICAgICAgICAncHJvZmlsZScsXG4gICAgICAgICdwcm9maWxlRW5kJyxcbiAgICAgICAgJ3RhYmxlJyxcbiAgICAgICAgJ3RpbWUnLFxuICAgICAgICAndGltZUVuZCcsXG4gICAgICAgICd0aW1lU3RhbXAnLFxuICAgICAgICAndGltZWxpbmUnLFxuICAgICAgICAndGltZWxpbmVFbmQnLFxuICAgICAgICAndHJhY2UnLFxuICAgICAgICAnd2FybidcbiAgICBdO1xuICAgIG1ldGhvZHMuZm9yRWFjaCgobmFtZSkgPT4ge1xuICAgICAgICB3aW5kb3cuY29uc29sZVtuYW1lXSA9IHdpbmRvdy5jb25zb2xlW25hbWVdIHx8IGZuO1xuICAgIH0pO1xufShmdW5jdGlvbigpIHt9KSk7XG4iLCJpbXBvcnQgJy4vY2xhc3NMaXN0JztcbmltcG9ydCAnLi9jb25zb2xlJztcbmltcG9ydCAnLi9yZXF1ZXN0QW5pbWF0aW9uRnJhbWUnO1xuIiwiLypcbiAqIHJlcXVlc3RBbmltYXRpb25GcmFtZSAoaW9zNiBhbmQgYW5kcm9pZCA8IDQuNClcbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgaWYgKCF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKSB7XG4gICAgICAgIGNvbnN0IHZlbmRvcnMgPSBbJ21zJywgJ21veicsICd3ZWJraXQnLCAnbyddO1xuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHZlbmRvcnMubGVuZ3RoICYmICF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lOyArK3gpIHtcbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3dbdmVuZG9yc1t4XSArICdSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXTtcbiAgICAgICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9IHdpbmRvd1t2ZW5kb3JzW3hdICsgJ0NhbmNlbEFuaW1hdGlvbkZyYW1lJ10gfHwgd2luZG93W3ZlbmRvcnNbeF0gK1xuICAgICAgICAgICAgICAgICdDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXTtcbiAgICAgICAgfVxuICAgIH1cbn0oKSk7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwb3B1cCh1cmwsIHdpZHRoID0gODAwLCBoZWlnaHQgPSA2MDAsIG5hbWUgPSAnJykge1xuICAgIGNvbnN0IGxlZnQgPSAod2luZG93LnNjcmVlbi53aWR0aCAtIHdpZHRoKSAvIDI7XG4gICAgY29uc3QgdG9wID0gKHdpbmRvdy5zY3JlZW4uaGVpZ2h0IC0gaGVpZ2h0KSAvIDI7XG4gICAgLy8gY29uc3QgbGVmdCA9ICh3aW5kb3cuc2NyZWVuLmF2YWlsV2lkdGggLSB3aWR0aCkgLyAyO1xuICAgIC8vIGNvbnN0IHRvcCA9ICh3aW5kb3cuc2NyZWVuLmF2YWlsSGVpZ2h0IC0gaGVpZ2h0KSAvIDI7XG4gICAgY29uc3QgZGVmYXVsdHMgPSAnZGlyZWN0b3JpZXM9bm8sbG9jYXRpb249bm8sbWVudWJhcj1ubyxyZXNpemFibGU9bm8sc2Nyb2xsYmFycz1ubyxzdGF0dXM9bm8sdG9vbGJhcj1ubyc7XG4gICAgY29uc3QgcGFyYW1zID0gYHdpZHRoPSR7d2lkdGh9LGhlaWdodD0ke2hlaWdodH0sdG9wPSR7dG9wfSxsZWZ0PSR7bGVmdH0sJHtkZWZhdWx0c31gO1xuICAgIGNvbnN0IHdpbiA9IHdpbmRvdy5vcGVuKHVybCwgbmFtZSwgcGFyYW1zKTtcbiAgICBpZiAod2luID09PSBudWxsIHx8IHR5cGVvZiB3aW4gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHdpbmRvdy5mb2N1cykge1xuICAgICAgICB3aW4uZm9jdXMoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG4iLCJcbmNsYXNzIE5vZGUge1xuICAgIGNvbnN0cnVjdG9yKGJvdW5kcywgZGVwdGgsIG1heERlcHRoLCBtYXhDaGlsZHJlbikge1xuICAgICAgICB0aGlzLl9ib3VuZHMgPSBib3VuZHM7XG4gICAgICAgIHRoaXMuX2RlcHRoID0gZGVwdGg7XG4gICAgICAgIHRoaXMuX21heERlcHRoID0gbWF4RGVwdGg7XG4gICAgICAgIHRoaXMuX21heENoaWxkcmVuID0gbWF4Q2hpbGRyZW47XG5cbiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IFtdO1xuICAgICAgICB0aGlzLm5vZGVzID0gW107XG4gICAgfVxuXG4gICAgaW5zZXJ0KGl0ZW0pIHtcbiAgICAgICAgaWYgKHRoaXMubm9kZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuX2ZpbmRJbmRleChpdGVtKTtcbiAgICAgICAgICAgIHRoaXMubm9kZXNbaW5kZXhdLmluc2VydChpdGVtKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2hpbGRyZW4ucHVzaChpdGVtKTtcblxuICAgICAgICBpZiAoISh0aGlzLl9kZXB0aCA+PSB0aGlzLl9tYXhEZXB0aCkgJiYgdGhpcy5jaGlsZHJlbi5sZW5ndGggPiB0aGlzLl9tYXhDaGlsZHJlbikge1xuXG4gICAgICAgICAgICB0aGlzLnN1YmRpdmlkZSgpO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluc2VydCh0aGlzLmNoaWxkcmVuW2ldKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5sZW5ndGggPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0cmlldmUoaXRlbSkge1xuICAgICAgICBpZiAodGhpcy5ub2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fZmluZEluZGV4KGl0ZW0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubm9kZXNbaW5kZXhdLnJldHJpZXZlKGl0ZW0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW47XG4gICAgfVxuXG4gICAgX2ZpbmRJbmRleChpdGVtKSB7XG4gICAgICAgIGNvbnN0IHt4LCB5LCB3aWR0aCwgaGVpZ2h0fSA9IHRoaXMuX2JvdW5kcztcblxuICAgICAgICBjb25zdCByaWdodCA9IGl0ZW0ueCA+IHggKyB3aWR0aCAvIDI7XG4gICAgICAgIGNvbnN0IGJvdHRvbSA9IGl0ZW0ueSA+IHkgKyBoZWlnaHQgLyAyO1xuXG4gICAgICAgIGxldCBpbmRleDtcblxuICAgICAgICBpZiAocmlnaHQpIHtcbiAgICAgICAgICAgIGluZGV4ID0gYm90dG9tID8gTm9kZS5CUiA6IE5vZGUuVFI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpbmRleCA9IGJvdHRvbSA/IE5vZGUuQkwgOiBOb2RlLlRMO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cblxuICAgIHN1YmRpdmlkZSgpIHtcbiAgICAgICAgY29uc3QgZGVwdGggPSB0aGlzLl9kZXB0aCArIDE7XG5cbiAgICAgICAgY29uc3Qge3gsIHksIHdpZHRoLCBoZWlnaHR9ID0gdGhpcy5fYm91bmRzO1xuICAgICAgICBjb25zdCB3ID0gd2lkdGggLyAyO1xuICAgICAgICBjb25zdCBoID0gaGVpZ2h0IC8gMjtcblxuICAgICAgICB0aGlzLm5vZGVzW05vZGUuVExdID0gbmV3IE5vZGUoe1xuICAgICAgICAgICAgeCxcbiAgICAgICAgICAgIHksXG4gICAgICAgICAgICB3aWR0aDogdyxcbiAgICAgICAgICAgIGhlaWdodDogaFxuICAgICAgICB9LFxuICAgICAgICBkZXB0aCwgdGhpcy5fbWF4RGVwdGgsIHRoaXMuX21heENoaWxkcmVuKTtcblxuICAgICAgICB0aGlzLm5vZGVzW05vZGUuVFJdID0gbmV3IE5vZGUoe1xuICAgICAgICAgICAgeDogeCArIHcsXG4gICAgICAgICAgICB5LFxuICAgICAgICAgICAgd2lkdGg6IHcsXG4gICAgICAgICAgICBoZWlnaHQ6IGhcbiAgICAgICAgfSxcbiAgICAgICAgZGVwdGgsIHRoaXMuX21heERlcHRoLCB0aGlzLl9tYXhDaGlsZHJlbik7XG5cbiAgICAgICAgdGhpcy5ub2Rlc1tOb2RlLkJMXSA9IG5ldyBOb2RlKHtcbiAgICAgICAgICAgIHgsXG4gICAgICAgICAgICB5OiB5ICsgaCxcbiAgICAgICAgICAgIHdpZHRoOiB3LFxuICAgICAgICAgICAgaGVpZ2h0OiBoXG4gICAgICAgIH0sXG4gICAgICAgIGRlcHRoLCB0aGlzLl9tYXhEZXB0aCwgdGhpcy5fbWF4Q2hpbGRyZW4pO1xuXG4gICAgICAgIHRoaXMubm9kZXNbTm9kZS5CUl0gPSBuZXcgTm9kZSh7XG4gICAgICAgICAgICB4OiB4ICsgdyxcbiAgICAgICAgICAgIHk6IHkgKyBoLFxuICAgICAgICAgICAgd2lkdGg6IHcsXG4gICAgICAgICAgICBoZWlnaHQ6IGhcbiAgICAgICAgfSxcbiAgICAgICAgZGVwdGgsIHRoaXMuX21heERlcHRoLCB0aGlzLl9tYXhDaGlsZHJlbik7XG4gICAgfVxuXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4ubGVuZ3RoID0gMDtcblxuICAgICAgICB3aGlsZSAodGhpcy5ub2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMubm9kZXMucG9wKCkuY2xlYXIoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuTm9kZS5UTCA9IDA7XG5Ob2RlLlRSID0gMTtcbk5vZGUuQkwgPSAyO1xuTm9kZS5CUiA9IDM7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFF1YWRUcmVlIHtcbiAgICBjb25zdHJ1Y3Rvcihib3VuZHMsIG1heERlcHRoID0gLTEsIG1heENoaWxkcmVuID0gLTEpIHtcbiAgICAgICAgdGhpcy5yb290ID0gbmV3IE5vZGUoYm91bmRzLCAwLCBtYXhEZXB0aCwgbWF4Q2hpbGRyZW4pO1xuICAgIH1cblxuICAgIGluc2VydChpdGVtKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW0pKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb3QuaW5zZXJ0KGl0ZW1baV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yb290Lmluc2VydChpdGVtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLnJvb3QuY2xlYXIoKTtcbiAgICB9XG5cbiAgICByZXRyaWV2ZShpdGVtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJvb3QucmV0cmlldmUoaXRlbSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHBvcHVwIGZyb20gJy4uL3BvcHVwJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZW1haWwodXJsLCBzdWJqZWN0ID0gJycsIGJvZHkgPSAnJykge1xuICAgIHVybCA9IGVuY29kZVVSSUNvbXBvbmVudCh1cmwpO1xuICAgIHN1YmplY3QgPSBlbmNvZGVVUklDb21wb25lbnQoc3ViamVjdCk7XG5cbiAgICBjb25zdCBuZXdsaW5lcyA9IGVuY29kZVVSSUNvbXBvbmVudCgnXFxyXFxuXFxyXFxuJyk7XG4gICAgYm9keSA9IGJvZHkgPyBgJHtlbmNvZGVVUklDb21wb25lbnQoYm9keSl9JHtuZXdsaW5lc31gIDogJyc7XG5cbiAgICByZXR1cm4gcG9wdXAoYG1haWx0bzo/c3ViamVjdD0ke3N1YmplY3R9JmJvZHk9JHtib2R5fSR7dXJsfWApO1xufVxuIiwiaW1wb3J0IHBvcHVwIGZyb20gJy4uL3BvcHVwJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZmFjZWJvb2sodXJsKSB7XG4gICAgdXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KHVybCk7XG4gICAgcmV0dXJuIHBvcHVwKGBodHRwczovL3d3dy5mYWNlYm9vay5jb20vc2hhcmVyL3NoYXJlci5waHA/dT0ke3VybH1gKTtcbn1cbiIsImltcG9ydCBwb3B1cCBmcm9tICcuLi9wb3B1cCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZhY2Vib29rRmVlZERpYWxvZyhhcHBJZCwgcmVkaXJlY3QsIHVybCwgdGl0bGUgPSAnJywgaW1hZ2UgPSAnJywgY2FwdGlvbiA9ICcnLCBkZXNjID0gJycsIHNvdXJjZSA9ICcnKSB7XG4gICAgdGl0bGUgPSBlbmNvZGVVUklDb21wb25lbnQodGl0bGUpO1xuICAgIGNhcHRpb24gPSBlbmNvZGVVUklDb21wb25lbnQoY2FwdGlvbik7XG4gICAgZGVzYyA9IGVuY29kZVVSSUNvbXBvbmVudChkZXNjKTtcblxuICAgIGNvbnN0IHBhcmFtcyA9IGA/ZGlzcGxheT1wb3B1cCZzaG93X2Vycm9yPXRydWUmYXBwX2lkPSR7YXBwSWR9JnNvdXJjZT0ke3NvdXJjZX0mcmVkaXJlY3RfdXJpPSR7cmVkaXJlY3R9YDtcbiAgICBjb25zdCBjb250ZW50ID0gYG5hbWU9JHt0aXRsZX0mbGluaz0ke3VybH0mY2FwdGlvbj0ke2NhcHRpb259JmRlc2NyaXB0aW9uPSR7ZGVzY30mcGljdHVyZT0ke2ltYWdlfWA7XG5cbiAgICByZXR1cm4gcG9wdXAoYGh0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS9kaWFsb2cvZmVlZD8ke3BhcmFtc30mJHtjb250ZW50fWApO1xufVxuIiwiaW1wb3J0IHBvcHVwIGZyb20gJy4uL3BvcHVwJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ29vZ2xlcGx1cyh1cmwpIHtcbiAgICB1cmwgPSBlbmNvZGVVUklDb21wb25lbnQodXJsKTtcbiAgICByZXR1cm4gcG9wdXAoYGh0dHBzOi8vcGx1cy5nb29nbGUuY29tL3NoYXJlP3VybD0ke3VybH1gKTtcbn1cbiIsImltcG9ydCBlbWFpbCBmcm9tICcuL2VtYWlsJztcbmltcG9ydCBmYWNlYm9vayBmcm9tICcuL2ZhY2Vib29rJztcbmltcG9ydCBmYWNlYm9va0ZlZWREaWFsb2cgZnJvbSAnLi9mYWNlYm9va0ZlZWREaWFsb2cnO1xuaW1wb3J0IGdvb2dsZXBsdXMgZnJvbSAnLi9nb29nbGVwbHVzJztcbmltcG9ydCBsaW5rZWRpbiBmcm9tICcuL2xpbmtlZGluJztcbmltcG9ydCBwaW50ZXJlc3QgZnJvbSAnLi9waW50ZXJlc3QnO1xuaW1wb3J0IHJlZGRpdCBmcm9tICcuL3JlZGRpdCc7XG5pbXBvcnQgcmVucmVuIGZyb20gJy4vcmVucmVuJztcbmltcG9ydCBzbXMgZnJvbSAnLi9zbXMnO1xuaW1wb3J0IHR3aXR0ZXIgZnJvbSAnLi90d2l0dGVyJztcbmltcG9ydCB2a29udGFrdGUgZnJvbSAnLi92a29udGFrdGUnO1xuaW1wb3J0IHdlaWJvIGZyb20gJy4vd2VpYm8nO1xuaW1wb3J0IHdoYXRzYXBwIGZyb20gJy4vd2hhdHNhcHAnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZW1haWwsXG4gICAgZmFjZWJvb2ssXG4gICAgZmFjZWJvb2tGZWVkRGlhbG9nLFxuICAgIGdvb2dsZXBsdXMsXG4gICAgbGlua2VkaW4sXG4gICAgcGludGVyZXN0LFxuICAgIHJlZGRpdCxcbiAgICByZW5yZW4sXG4gICAgc21zLFxuICAgIHR3aXR0ZXIsXG4gICAgdmtvbnRha3RlLFxuICAgIHdlaWJvLFxuICAgIHdoYXRzYXBwXG59O1xuIiwiaW1wb3J0IHBvcHVwIGZyb20gJy4uL3BvcHVwJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbGlua2VkaW4odXJsLCB0aXRsZSA9ICcnKSB7XG4gICAgdXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KHVybCk7XG4gICAgdGl0bGUgPSBlbmNvZGVVUklDb21wb25lbnQodGl0bGUpO1xuICAgIHJldHVybiBwb3B1cChgaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3NoYXJlQXJ0aWNsZT9taW5pPXRydWUmdXJsPSR7dXJsfSZ0aXRsZT0ke3RpdGxlfWApO1xufVxuIiwiaW1wb3J0IHBvcHVwIGZyb20gJy4uL3BvcHVwJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGludGVyZXN0KHVybCwgbWVkaWEsIGRlc2MgPSAnJykge1xuICAgIHVybCA9IGVuY29kZVVSSUNvbXBvbmVudCh1cmwpO1xuICAgIG1lZGlhID0gZW5jb2RlVVJJQ29tcG9uZW50KG1lZGlhKTtcbiAgICBkZXNjID0gZW5jb2RlVVJJQ29tcG9uZW50KGRlc2MpO1xuICAgIHJldHVybiBwb3B1cChgaHR0cHM6Ly9waW50ZXJlc3QuY29tL3Bpbi9jcmVhdGUvYnV0dG9uLz91cmw9JHt1cmx9Jm1lZGlhPSR7bWVkaWF9JmRlc2NyaXB0aW9uPSR7ZGVzY31gKTtcbn1cbiIsImltcG9ydCBwb3B1cCBmcm9tICcuLi9wb3B1cCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlZGRpdCh1cmwsIHRpdGxlID0gJycpIHtcbiAgICB1cmwgPSBlbmNvZGVVUklDb21wb25lbnQodXJsKTtcbiAgICB0aXRsZSA9IGVuY29kZVVSSUNvbXBvbmVudCh0aXRsZSk7XG4gICAgcmV0dXJuIHBvcHVwKGBodHRwczovL3d3dy5yZWRkaXQuY29tL3N1Ym1pdD91cmw9JHt1cmx9JnRpdGxlPSR7dGl0bGV9YCk7XG59XG4iLCJpbXBvcnQgcG9wdXAgZnJvbSAnLi4vcG9wdXAnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB2a29udGFrdGUodXJsLCB0aXRsZSA9ICcnKSB7XG4gICAgdXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KHVybCk7XG4gICAgdGl0bGUgPSBlbmNvZGVVUklDb21wb25lbnQodGl0bGUpO1xuICAgIHJldHVybiBwb3B1cChgaHR0cDovL3NoYXJlLnJlbnJlbi5jb20vc2hhcmUvYnV0dG9uc2hhcmUuZG8/bGluaz0ke3VybH0mdGl0bGU9JHt0aXRsZX1gKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNtcyh1cmwsIGJvZHkgPSAnJykge1xuICAgIHVybCA9IGVuY29kZVVSSUNvbXBvbmVudCh1cmwpO1xuXG4gICAgY29uc3QgbmV3bGluZXMgPSBlbmNvZGVVUklDb21wb25lbnQoJ1xcclxcblxcclxcbicpO1xuICAgIGJvZHkgPSBib2R5ID8gYCR7ZW5jb2RlVVJJQ29tcG9uZW50KGJvZHkpfSR7bmV3bGluZXN9YCA6ICcnO1xuXG4gICAgY29uc3QgaW9zID0gL2lQW2FvXWR8aVBob25lL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICBjb25zdCBkZWxpbSA9IGlvcyA/ICcmJyA6ICc/JztcblxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYHNtczoke2RlbGltfWJvZHk9JHtib2R5fSR7dXJsfWA7XG59XG4iLCJpbXBvcnQgcG9wdXAgZnJvbSAnLi4vcG9wdXAnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0d2l0dGVyKHVybCwgdGV4dCA9ICcnLCBoYXNodGFncyA9ICcnLCByZWxhdGVkID0gJycpIHtcbiAgICB1cmwgPSBlbmNvZGVVUklDb21wb25lbnQodXJsKTtcbiAgICB0ZXh0ID0gZW5jb2RlVVJJQ29tcG9uZW50KHRleHQpO1xuICAgIGhhc2h0YWdzID0gZW5jb2RlVVJJQ29tcG9uZW50KGhhc2h0YWdzKTtcbiAgICByZWxhdGVkID0gZW5jb2RlVVJJQ29tcG9uZW50KHJlbGF0ZWQpO1xuXG4gICAgcmV0dXJuIHBvcHVwKGBodHRwczovL3R3aXR0ZXIuY29tL2ludGVudC90d2VldD91cmw9JHt1cmx9JnRleHQ9JHt0ZXh0fSZoYXNodGFncz0ke2hhc2h0YWdzfSZyZWxhdGVkPSR7cmVsYXRlZH1gKTtcbn1cbiIsImltcG9ydCBwb3B1cCBmcm9tICcuLi9wb3B1cCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHZrb250YWt0ZSh1cmwsIHRpdGxlID0gJycsIGRlc2NyaXB0aW9uID0gJycsIGltYWdlID0gJycpIHtcbiAgICB1cmwgPSBlbmNvZGVVUklDb21wb25lbnQodXJsKTtcbiAgICB0aXRsZSA9IGVuY29kZVVSSUNvbXBvbmVudCh0aXRsZSk7XG4gICAgZGVzY3JpcHRpb24gPSBlbmNvZGVVUklDb21wb25lbnQoZGVzY3JpcHRpb24pO1xuICAgIGltYWdlID0gZW5jb2RlVVJJQ29tcG9uZW50KGltYWdlKTtcbiAgICByZXR1cm4gcG9wdXAoYGh0dHA6Ly92a29udGFrdGUucnUvc2hhcmUucGhwP3VybD0ke3VybH0mdGl0bGU9JHt0aXRsZX0mZGVzY3JpcHRpb249JHtkZXNjcmlwdGlvbn0maW1hZ2U9JHtpbWFnZX1gKTtcbn1cbiIsImltcG9ydCBwb3B1cCBmcm9tICcuLi9wb3B1cCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdlaWJvKHVybCwgdGl0bGUgPSAnJywgaW1hZ2UgPSAnJykge1xuICAgIHVybCA9IGVuY29kZVVSSUNvbXBvbmVudCh1cmwpO1xuICAgIHRpdGxlID0gZW5jb2RlVVJJQ29tcG9uZW50KHRpdGxlKTtcbiAgICBpbWFnZSA9IGVuY29kZVVSSUNvbXBvbmVudChpbWFnZSk7XG5cbiAgICBjb25zdCBwYXJhbXMgPSBgdXJsPSR7dXJsfSZhcHBrZXk9JnRpdGxlPSR7dGl0bGV9JnBpYz0ke2ltYWdlfSZyYWxhdGVVaWQ9Jmxhbmd1YWdlPXpoX2NuYDtcbiAgICByZXR1cm4gcG9wdXAoYGh0dHA6Ly9zZXJ2aWNlLndlaWJvLmNvbS9zaGFyZS9zaGFyZS5waHA/JHtwYXJhbXN9YCk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB3aGF0c2FwcCh1cmwsIGJvZHkgPSAnJykge1xuICAgIHVybCA9IGVuY29kZVVSSUNvbXBvbmVudCh1cmwpO1xuXG4gICAgY29uc3QgbmV3bGluZXMgPSBlbmNvZGVVUklDb21wb25lbnQoJ1xcclxcblxcclxcbicpO1xuICAgIGJvZHkgPSBib2R5ID8gYCR7ZW5jb2RlVVJJQ29tcG9uZW50KGJvZHkpfSR7bmV3bGluZXN9YCA6ICcnO1xuXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgd2hhdHNhcHA6Ly9zZW5kP3RleHQ9JHtib2R5fSR7dXJsfWA7XG59XG4iLCJmdW5jdGlvbiBsb2FkKGtleSkge1xuICAgIGxldCBpdGVtID0gbnVsbDtcblxuICAgIHRyeSB7XG4gICAgICAgIGl0ZW0gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICAgIH0gY2F0Y2ggKGVycikge31cblxuICAgIHJldHVybiBpdGVtO1xufVxuXG5mdW5jdGlvbiBzYXZlKGtleSwgaXRlbSkge1xuICAgIHRyeSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgaXRlbSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdDb3VsZG5cXCd0IHNhdmUgaW4gbG9jYWxTdG9yYWdlJyk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gbG9hZEpTT04oa2V5KSB7XG4gICAgY29uc3QgaXRlbSA9IGxvYWQoa2V5KTtcbiAgICByZXR1cm4gaXRlbSA/IEpTT04ucGFyc2UoaXRlbSkgOiBudWxsO1xufVxuXG5mdW5jdGlvbiBzYXZlSlNPTihrZXksIGl0ZW0pIHtcbiAgICByZXR1cm4gc2F2ZShrZXksIEpTT04uc3RyaW5naWZ5KGl0ZW0pKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlKGtleSkge1xuICAgIHRyeSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCB7bG9hZCwgc2F2ZSwgbG9hZEpTT04sIHNhdmVKU09OLCByZW1vdmV9O1xuIiwiLy8gZXZlcnl0aGluZyBhZnRlciB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiBzdWJzdHIgaW4gc3RyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhZnRlckZpcnN0KHN0ciwgc3Vic3RyKSB7XG4gICAgbGV0IGluZGV4ID0gc3RyLmluZGV4T2Yoc3Vic3RyKTtcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgaW5kZXggKz0gc3Vic3RyLmxlbmd0aDtcbiAgICByZXR1cm4gc3RyLnNsaWNlKGluZGV4KTtcbn1cbiIsIi8vIGV2ZXJ5dGhpbmcgYWZ0ZXIgdGhlIGxhc3Qgb2NjdXJlbmNlIG9mIHN1YnN0ciBpbiBzdHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFmdGVyTGFzdChzdHIsIHN1YnN0cikge1xuICAgIGxldCBpbmRleCA9IHN0ci5sYXN0SW5kZXhPZihzdWJzdHIpO1xuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBpbmRleCArPSBzdWJzdHIubGVuZ3RoO1xuICAgIHJldHVybiBzdHIuc2xpY2UoaW5kZXgpO1xufVxuIiwiLy8gZXZlcnl0aGluZyBiZWZvcmUgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2Ygc3Vic3RyIGluIHN0clxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmVmb3JlRmlyc3Qoc3RyLCBzdWJzdHIpIHtcbiAgICBjb25zdCBpbmRleCA9IHN0ci5pbmRleE9mKHN1YnN0cik7XG4gICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHJldHVybiBzdHIuc2xpY2UoMCwgaW5kZXgpO1xufVxuIiwiLy8gZXZlcnl0aGluZyBiZWZvcmUgdGhlIGxhc3Qgb2NjdXJyZW5jZSBvZiBzdWJzdHIgaW4gdGhlIHN0cmluZy5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJlZm9yZUxhc3Qoc3RyLCBzdWJzdHIpIHtcbiAgICBjb25zdCBpbmRleCA9IHN0ci5sYXN0SW5kZXhPZihzdWJzdHIpO1xuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICByZXR1cm4gc3RyLnNsaWNlKDAsIGluZGV4KTtcbn1cbiIsIi8vIHdoZXRoZXIgc3RyIGJlZ2lucyB3aXRoIHN1YnN0clxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmVnaW5zV2l0aChzdHIsIHN1YnN0cikge1xuICAgIHJldHVybiBzdHIuaW5kZXhPZihzdWJzdHIpID09PSAwO1xufVxuIiwiLy8gZXZlcnl0aGluZyBhZnRlciB0aGUgZmlyc3Qgb2NjdXJhbmNlIG9mIHN0YXJ0IGFuZCBiZWZvcmUgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgZW5kXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBiZXR3ZWVuKHN0ciwgc3RhcnQsIGVuZCkge1xuICAgIGxldCBzdWJzdHIgPSAnJztcbiAgICBsZXQgc3RhcnRJbmRleCA9IHN0ci5pbmRleE9mKHN0YXJ0KTtcbiAgICBpZiAoc3RhcnRJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgc3RhcnRJbmRleCArPSBzdGFydC5sZW5ndGg7XG4gICAgICAgIGNvbnN0IGVuZEluZGV4ID0gc3RyLmluZGV4T2YoZW5kLCBzdGFydEluZGV4KTtcbiAgICAgICAgaWYgKGVuZEluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgc3Vic3RyID0gc3RyLnNsaWNlKHN0YXJ0SW5kZXgsIGVuZEluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3Vic3RyO1xufVxuIiwiaW1wb3J0IGVzY2FwZVBhdHRlcm4gZnJvbSAnLi9lc2NhcGVQYXR0ZXJuJztcbmltcG9ydCB0cnVuY2F0ZSBmcm9tICcuL3RydW5jYXRlJztcbi8vIFV0aWxpdHkgbWV0aG9kIHRoYXQgaW50ZWxsaWdlbnRseSBicmVha3MgdXAgeW91ciBzdHJpbmcsXG4vLyBhbGxvd2luZyB5b3UgdG8gY3JlYXRlIGJsb2NrcyBvZiByZWFkYWJsZSB0ZXh0LlxuLy8gVGhpcyBtZXRob2QgcmV0dXJucyB5b3UgdGhlIGNsb3Nlc3QgcG9zc2libGUgbWF0Y2ggdG8gdGhlIGRlbGltIHBhcmFtYXRlcixcbi8vIHdoaWxlIGtlZXBpbmcgdGhlIHRleHQgbGVuZ3RoIHdpdGhpbiB0aGUgbGVuIHBhcmFtdGVyLlxuLy8gSWYgYSBtYXRjaCBjYW4ndCBiZSBmb3VuZCBpbiB5b3VyIHNwZWNpZmllZCBsZW5ndGggYW4gICcuLi4nIGlzIGFkZGVkIHRvIHRoYXQgYmxvY2ssXG4vLyBhbmQgdGhlIGJsb2NraW5nIGNvbnRpbnVlcyB1bnRpbGwgYWxsIHRoZSB0ZXh0IGlzIGJyb2tlbiBhcGFydC5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJsb2NrKHN0ciwgbGVuLCBkZWxpbSA9ICcuJykge1xuICAgIGNvbnN0IGFyciA9IFtdO1xuXG4gICAgaWYgKCFzdHIgfHwgIXN0ci5pbmNsdWRlcyhkZWxpbSkpIHtcbiAgICAgICAgcmV0dXJuIGFycjtcbiAgICB9XG5cbiAgICBpZiAoZGVsaW0gPT09ICcgJykge1xuICAgICAgICBzdHIgKz0gZGVsaW07XG4gICAgfVxuXG4gICAgbGV0IGNockluZGV4ID0gMDtcbiAgICBjb25zdCByZXBsUGF0dCA9IG5ldyBSZWdFeHAoJ1teJyArIGVzY2FwZVBhdHRlcm4oZGVsaW0pICsgJ10rJCcpO1xuXG4gICAgd2hpbGUgKGNockluZGV4IDwgc3RyLmxlbmd0aCkge1xuICAgICAgICBsZXQgc3ViU3RyaW5nID0gc3RyLnN1YnN0cihjaHJJbmRleCwgbGVuKTtcbiAgICAgICAgaWYgKCFzdWJTdHJpbmcuaW5jbHVkZXMoZGVsaW0pKSB7XG4gICAgICAgICAgICBhcnIucHVzaCh0cnVuY2F0ZShzdWJTdHJpbmcsIHN1YlN0cmluZy5sZW5ndGgpKTtcbiAgICAgICAgICAgIGNockluZGV4ICs9IHN1YlN0cmluZy5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgc3ViU3RyaW5nID0gc3ViU3RyaW5nLnJlcGxhY2UocmVwbFBhdHQsICcnKTtcbiAgICAgICAgY2hySW5kZXggKz0gc3ViU3RyaW5nLmxlbmd0aDtcbiAgICAgICAgYXJyLnB1c2goc3ViU3RyaW5nLnRyaW0oKSk7XG4gICAgfVxuICAgIHJldHVybiBhcnI7XG59XG4iLCIvLyBDYXBpdGFsaXplIHRoZSBmaXJzdCB3b3JkIGluIGEgc3RyaW5nIG9yIGFsbCB3b3Jkc1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2FwaXRhbGl6ZShzdHIsIGFsbCA9IGZhbHNlKSB7XG4gICAgY29uc3Qgc3Vic3RyID0gc3RyLnRyaW1MZWZ0KCk7XG4gICAgY29uc3QgcmUgPSBhbGwgPyAvXi58XFxiLi9nIDogLyheXFx3KS87XG4gICAgcmV0dXJuIHN1YnN0ci5yZXBsYWNlKHJlLCAobWF0Y2gpID0+IG1hdGNoLnRvVXBwZXJDYXNlKCkpO1xufVxuIiwiaW1wb3J0IGVzY2FwZVBhdHRlcm4gZnJvbSAnLi9lc2NhcGVQYXR0ZXJuJztcblxuLy8gdGhlIG51bWJlciBvZiB0aW1lcyBzdWJzdHIgYXBwZWFycyB3aXRoaW4gc3RyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb3VudE9mKHN0ciwgc3Vic3RyLCBjYXNlU2Vuc2l0aXZlKSB7XG4gICAgY29uc3QgZXNjYXBlZFN0ciA9IGVzY2FwZVBhdHRlcm4oc3Vic3RyKTtcbiAgICBjb25zdCBmbGFncyA9ICghY2FzZVNlbnNpdGl2ZSkgPyAnaWcnIDogJ2cnO1xuICAgIHJldHVybiBzdHIubWF0Y2gobmV3IFJlZ0V4cChlc2NhcGVkU3RyLCBmbGFncykpLmxlbmd0aDtcbn1cbiIsIi8vIExldmVuc2h0ZWluIGRpc3RhbmNlIChlZGl0RGlzdGFuY2UpIGlzIGEgbWVhc3VyZSBvZiB0aGUgc2ltaWxhcml0eSBiZXR3ZWVuXG4vLyB0d28gc3RyaW5ncy4gVGhlIGRpc3RhbmNlIGlzIHRoZSBudW1iZXIgb2YgZGVsZXRpb25zLCBpbnNlcnRpb25zLCBvclxuLy8gc3Vic3RpdHV0aW9ucyByZXF1aXJlZCB0byB0cmFuc2Zvcm0gc291cmNlIGludG8gdGFyZ2V0LlxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZWRpdERpc3RhbmNlKHNvdXJjZSA9ICcnLCB0YXJnZXQgPSAnJykge1xuXG4gICAgaWYgKHNvdXJjZSA9PT0gdGFyZ2V0KSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIGlmICghc291cmNlLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gdGFyZ2V0Lmxlbmd0aDtcbiAgICB9XG5cbiAgICBpZiAoIXRhcmdldC5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZS5sZW5ndGg7XG4gICAgfVxuXG4gICAgY29uc3QgZCA9IFtdO1xuICAgIGxldCBpLCBqLCBjb3N0O1xuXG4gICAgZm9yIChpID0gMDsgaSA8PSBzb3VyY2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZFtpXSA9IFtdO1xuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDw9IHNvdXJjZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBkW2ldWzBdID0gaTtcbiAgICB9XG4gICAgZm9yIChqID0gMDsgaiA8PSB0YXJnZXQubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgZFswXVtqXSA9IGo7XG4gICAgfVxuXG4gICAgZm9yIChpID0gMTsgaSA8PSBzb3VyY2UubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICBjb25zdCBzaSA9IHNvdXJjZS5jaGFyQXQoaSAtIDEpO1xuICAgICAgICBmb3IgKGogPSAxOyBqIDw9IHRhcmdldC5sZW5ndGg7IGorKykge1xuXG4gICAgICAgICAgICBjb25zdCB0aiA9IHRhcmdldC5jaGFyQXQoaiAtIDEpO1xuXG4gICAgICAgICAgICBpZiAoc2kgPT09IHRqKSB7XG4gICAgICAgICAgICAgICAgY29zdCA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvc3QgPSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkW2ldW2pdID0gTWF0aC5taW4oZFtpIC0gMV1bal0gKyAxLCBkW2ldW2ogLSAxXSArIDEsIGRbaSAtIDFdW2ogLSAxXSArIGNvc3QpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRbc291cmNlLmxlbmd0aF1bdGFyZ2V0Lmxlbmd0aF07XG59XG4iLCIvLyB3aGV0aGVyIHN0ciBlbmRzIHdpdGggc3Vic3RyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlbmRzV2l0aChzdHIsIHN1YnN0cikge1xuICAgIHJldHVybiBzdHIubGFzdEluZGV4T2Yoc3Vic3RyKSA9PT0gc3RyLmxlbmd0aCAtIHN1YnN0ci5sZW5ndGg7XG59XG4iLCIvLyBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlc2NhcGVIdG1sKHN0cikge1xuLy8gICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuLy8gICAgIGRpdi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzdHIpKTtcbi8vICAgICByZXR1cm4gZGl2LmlubmVySFRNTDtcbi8vIH1cblxuY29uc3QgZW50aXR5TWFwID0ge1xuICAgICcmJzogJyZhbXA7JyxcbiAgICAnPCc6ICcmbHQ7JyxcbiAgICAnPic6ICcmZ3Q7JyxcbiAgICAnXCInOiAnJnF1b3Q7JyxcbiAgICAnXFwnJzogJyYjMzk7JyxcbiAgICAnLyc6ICcmI3gyRjsnLFxuICAgICdgJzogJyYjeDYwOycsXG4gICAgJz0nOiAnJiN4M0Q7J1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXNjYXBlSHRtbChzdHJpbmcpIHtcbiAgICByZXR1cm4gU3RyaW5nKHN0cmluZylcbiAgICAgICAgLnJlcGxhY2UoL1smPD5cIidgPVxcL10vZywgZnVuY3Rpb24gZnJvbUVudGl0eU1hcChzKSB7XG4gICAgICAgICAgICByZXR1cm4gZW50aXR5TWFwW3NdO1xuICAgICAgICB9KTtcbn1cbiIsIi8vIHJlZ2V4IGVzY2FwZSBwYXR0ZXJuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlc2NhcGVQYXR0ZXJuKHBhdHRlcm4pIHtcbiAgICByZXR1cm4gcGF0dGVybi5yZXBsYWNlKC8oXFxdfFxcW3xcXHt8XFx9fFxcKHxcXCl8XFwqfFxcK3xcXD98XFwufFxcXFwpL2csICdcXFxcJDEnKTtcbn1cbiIsImltcG9ydCByZW1vdmVFeHRyYVdoaXRlc3BhY2UgZnJvbSAnLi9yZW1vdmVFeHRyYVdoaXRlc3BhY2UnO1xuXG4vLyB3aGV0aGVyIHN0ciBjb250YWlucyBhbnkgdGV4dFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaGFzVGV4dChzdHIpIHtcbiAgICByZXR1cm4gISFyZW1vdmVFeHRyYVdoaXRlc3BhY2Uoc3RyKS5sZW5ndGg7XG59XG4iLCJpbXBvcnQgYWZ0ZXJGaXJzdCBmcm9tICcuL2FmdGVyRmlyc3QnO1xuaW1wb3J0IGFmdGVyTGFzdCBmcm9tICcuL2FmdGVyTGFzdCc7XG5pbXBvcnQgYmVmb3JlRmlyc3QgZnJvbSAnLi9iZWZvcmVGaXJzdCc7XG5pbXBvcnQgYmVmb3JlTGFzdCBmcm9tICcuL2JlZm9yZUxhc3QnO1xuaW1wb3J0IGJlZ2luc1dpdGggZnJvbSAnLi9iZWdpbnNXaXRoJztcbmltcG9ydCBiZXR3ZWVuIGZyb20gJy4vYmV0d2Vlbic7XG5pbXBvcnQgYmxvY2sgZnJvbSAnLi9ibG9jayc7XG5pbXBvcnQgY2FwaXRhbGl6ZSBmcm9tICcuL2NhcGl0YWxpemUnO1xuaW1wb3J0IGNvdW50T2YgZnJvbSAnLi9jb3VudE9mJztcbmltcG9ydCBlZGl0RGlzdGFuY2UgZnJvbSAnLi9lZGl0RGlzdGFuY2UnO1xuaW1wb3J0IGVuZHNXaXRoIGZyb20gJy4vZW5kc1dpdGgnO1xuaW1wb3J0IGVzY2FwZUhUTUwgZnJvbSAnLi9lc2NhcGVIVE1MJztcbmltcG9ydCBlc2NhcGVQYXR0ZXJuIGZyb20gJy4vZXNjYXBlUGF0dGVybic7XG5pbXBvcnQgaGFzVGV4dCBmcm9tICcuL2hhc1RleHQnO1xuaW1wb3J0IGlzTnVtZXJpYyBmcm9tICcuL2lzTnVtZXJpYyc7XG5pbXBvcnQgcGFkTGVmdCBmcm9tICcuL3BhZExlZnQnO1xuaW1wb3J0IHBhZFJpZ2h0IGZyb20gJy4vcGFkUmlnaHQnO1xuaW1wb3J0IHByZXZlbnRXaWRvdyBmcm9tICcuL3ByZXZlbnRXaWRvdyc7XG5pbXBvcnQgcHJvcGVyQ2FzZSBmcm9tICcuL3Byb3BlckNhc2UnO1xuaW1wb3J0IHJlbW92ZSBmcm9tICcuL3JlbW92ZSc7XG5pbXBvcnQgcmVtb3ZlRXh0cmFXaGl0ZXNwYWNlIGZyb20gJy4vcmVtb3ZlRXh0cmFXaGl0ZXNwYWNlJztcbmltcG9ydCByZXZlcnNlIGZyb20gJy4vcmV2ZXJzZSc7XG5pbXBvcnQgcmV2ZXJzZVdvcmRzIGZyb20gJy4vcmV2ZXJzZVdvcmRzJztcbmltcG9ydCBzaW1pbGFyaXR5IGZyb20gJy4vc2ltaWxhcml0eSc7XG5pbXBvcnQgc3RyaXBUYWdzIGZyb20gJy4vc3RyaXBUYWdzJztcbmltcG9ydCBzd2FwQ2FzZSBmcm9tICcuL3N3YXBDYXNlJztcbmltcG9ydCB0aW1lQ29kZSBmcm9tICcuL3RpbWVDb2RlJztcbmltcG9ydCB0b051bWJlciBmcm9tICcuL3RvTnVtYmVyJztcbmltcG9ydCB0cnVuY2F0ZSBmcm9tICcuL3RydW5jYXRlJztcbmltcG9ydCB3b3JkQ291bnQgZnJvbSAnLi93b3JkQ291bnQnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYWZ0ZXJGaXJzdCxcbiAgICBhZnRlckxhc3QsXG4gICAgYmVmb3JlRmlyc3QsXG4gICAgYmVmb3JlTGFzdCxcbiAgICBiZWdpbnNXaXRoLFxuICAgIGJldHdlZW4sXG4gICAgYmxvY2ssXG4gICAgY2FwaXRhbGl6ZSxcbiAgICBjb3VudE9mLFxuICAgIGVkaXREaXN0YW5jZSxcbiAgICBlbmRzV2l0aCxcbiAgICBlc2NhcGVIVE1MLFxuICAgIGVzY2FwZVBhdHRlcm4sXG4gICAgaGFzVGV4dCxcbiAgICBpc051bWVyaWMsXG4gICAgcGFkTGVmdCxcbiAgICBwYWRSaWdodCxcbiAgICBwcmV2ZW50V2lkb3csXG4gICAgcHJvcGVyQ2FzZSxcbiAgICByZW1vdmUsXG4gICAgcmVtb3ZlRXh0cmFXaGl0ZXNwYWNlLFxuICAgIHJldmVyc2UsXG4gICAgcmV2ZXJzZVdvcmRzLFxuICAgIHNpbWlsYXJpdHksXG4gICAgc3RyaXBUYWdzLFxuICAgIHN3YXBDYXNlLFxuICAgIHRpbWVDb2RlLFxuICAgIHRvTnVtYmVyLFxuICAgIHRydW5jYXRlLFxuICAgIHdvcmRDb3VudFxufTtcbiIsIi8vIHdoZXRoZXIgc3RyIGlzIG51bWVyaWNcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzTnVtZXJpYyhzdHIpIHtcbiAgICBjb25zdCByZWd4ID0gL15bLStdP1xcZCpcXC4/XFxkKyg/OltlRV1bLStdP1xcZCspPyQvO1xuICAgIHJldHVybiByZWd4LnRlc3Qoc3RyKTtcbn1cbiIsIi8vIHBhZCBzdHIgd2l0aCBzdWJzdHIgZnJvbSB0aGUgbGVmdFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFkTGVmdChzdHIsIHN1YnN0ciwgbGVuZ3RoKSB7XG4gICAgc3RyID0gU3RyaW5nKHN0cik7XG4gICAgd2hpbGUgKHN0ci5sZW5ndGggPCBsZW5ndGgpIHtcbiAgICAgICAgc3RyID0gc3Vic3RyICsgc3RyO1xuICAgIH1cbiAgICByZXR1cm4gc3RyO1xufVxuIiwiLy8gcGFkcyBzdHIgd2l0aCBzdWJzdHIgZnJvbSB0aGUgcmlnaHRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhZFJpZ2h0KHN0ciwgc3Vic3RyLCBsZW5ndGgpIHtcbiAgICBzdHIgPSBTdHJpbmcoc3RyKTtcbiAgICB3aGlsZSAoc3RyLmxlbmd0aCA8IGxlbmd0aCkge1xuICAgICAgICBzdHIgKz0gc3Vic3RyO1xuICAgIH1cbiAgICByZXR1cm4gc3RyO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcHJldmVudFdpZG93KHN0cikge1xuICAgIHN0ciA9IHN0ci50cmltKCk7XG5cbiAgICBjb25zdCBsYXN0U3BhY2UgPSBzdHIubGFzdEluZGV4T2YoJyAnKTtcbiAgICBpZiAobGFzdFNwYWNlID4gMCkge1xuICAgICAgICByZXR1cm4gYCR7c3RyLnNsaWNlKDAsIGxhc3RTcGFjZSl9Jm5ic3A7JHtzdHIuc2xpY2UobGFzdFNwYWNlICsgMSl9YDtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RyO1xufVxuIiwiaW1wb3J0IGNhcGl0YWxpemUgZnJvbSAnLi9jYXBpdGFsaXplJztcblxuLy8gcHJvcGVyIGNhc2Ugc3RyIGluIHNlbnRlbmNlIGZvcm1hdFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcHJvcGVyQ2FzZShzdHIpIHtcbiAgICBjb25zdCBuZXdTdHIgPSBzdHIudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXGIoW14uPzshXSspLywgY2FwaXRhbGl6ZSk7XG4gICAgcmV0dXJuIG5ld1N0ci5yZXBsYWNlKC9cXGJbaV1cXGIvLCAnSScpO1xufVxuIiwiaW1wb3J0IGVzY2FwZVBhdHRlcm4gZnJvbSAnLi9lc2NhcGVQYXR0ZXJuJztcblxuLy8gcmVtb3ZlIGFsbCBpbnN0YW5jZXMgb2Ygc3Vic3RyIGluIHN0clxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVtb3ZlKHN0ciwgc3Vic3RyLCBjYXNlU2Vuc2l0aXZlID0gZmFsc2UpIHtcbiAgICBjb25zdCBlc2NhcGVkU3RyID0gZXNjYXBlUGF0dGVybihzdWJzdHIpO1xuICAgIGNvbnN0IGZsYWdzID0gY2FzZVNlbnNpdGl2ZSA/ICdnJyA6ICdpZyc7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKG5ldyBSZWdFeHAoZXNjYXBlZFN0ciwgZmxhZ3MpLCAnJyk7XG59XG4iLCIvLyByZW1vdmUgZXh0cmEgd2hpdGVzcGFjZSAoZXh0cmEgc3BhY2VzLCB0YWJzLCBsaW5lIGJyZWFrcywgZXRjKVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVtb3ZlRXh0cmFXaGl0ZXNwYWNlKHN0cikge1xuICAgIHJldHVybiBzdHIudHJpbSgpLnJlcGxhY2UoL1xccysvZywgJyAnKTtcbn1cbiIsIi8vIHJldmVyc2UgY2hhcmFjdGVyIG9yZGVyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZXZlcnNlKHN0cikge1xuICAgIHJldHVybiBzdHIuc3BsaXQoJycpLnJldmVyc2UoKS5qb2luKCcnKTtcbn1cbiIsIi8vIHJldmVyc2Ugd29yZCBvcmRlclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmV2ZXJzZVdvcmRzKHN0cikge1xuICAgIHJldHVybiBzdHIuc3BsaXQoJyAnKS5yZXZlcnNlKCkuam9pbignICcpO1xufVxuIiwiaW1wb3J0IGVkaXREaXN0YW5jZSBmcm9tICcuL2VkaXREaXN0YW5jZSc7XG5cbi8vIHBlcmNlbnRhZ2Ugb2Ygc2ltaWxpYXJpdHkgZnJvbSAwIHRvIDFcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNpbWlsYXJpdHkoYSwgYikge1xuICAgIGNvbnN0IGUgPSBlZGl0RGlzdGFuY2UoYSwgYik7XG4gICAgY29uc3QgbSA9IE1hdGgubWF4KGEubGVuZ3RoLCBiLmxlbmd0aCk7XG4gICAgaWYgKG0gPT09IDApIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgfVxuICAgIHJldHVybiAoMSAtIGUgLyBtKTtcbn1cbiIsIi8vIHJlbW92ZSBhbGwgSFRNTCB0YWdzIGZyb20gc3RyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzdHJpcFRhZ3Moc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC88XFwvP1tePl0rPi9pZ20sICcnKTtcbn1cbiIsIlxuLy8gc3dhcHMgdGhlIGNhc2Ugb2Ygc3RyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzd2FwQ2FzZShzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoLyhcXHcpLywgZnVuY3Rpb24obmV3U3RyKSB7XG4gICAgICAgIGNvbnN0IGxvd2VyID0gbmV3U3RyLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IHVwcGVyID0gbmV3U3RyLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIHN3aXRjaCAobmV3U3RyKSB7XG4gICAgICAgICAgICBjYXNlIGxvd2VyOlxuICAgICAgICAgICAgICAgIHJldHVybiB1cHBlcjtcbiAgICAgICAgICAgIGNhc2UgdXBwZXI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxvd2VyO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3U3RyO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4iLCIvLyBmb3JtYXRzIHNlY29uZHMgaW50byBISDpNTTpTU1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdGltZUNvZGUoc2Vjb25kcywgZGVsaW0gPSAnOicpIHtcbiAgICBjb25zdCBoID0gTWF0aC5mbG9vcihzZWNvbmRzIC8gMzYwMCk7XG4gICAgY29uc3QgbSA9IE1hdGguZmxvb3IoKHNlY29uZHMgJSAzNjAwKSAvIDYwKTtcbiAgICBjb25zdCBzID0gTWF0aC5mbG9vcigoc2Vjb25kcyAlIDM2MDApICUgNjApO1xuICAgIGNvbnN0IGhyID0gKGggPCAxMCA/ICcwJyArIGggOiBoKSArIGRlbGltO1xuICAgIGNvbnN0IG1uID0gKG0gPCAxMCA/ICcwJyArIG0gOiBtKSArIGRlbGltO1xuICAgIGNvbnN0IHNjID0gKHMgPCAxMCA/ICcwJyArIHMgOiBzKTtcbiAgICByZXR1cm4gaHIgKyBtbiArIHNjO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdG9OdW1iZXIoc3RyKSB7XG4gICAgcmV0dXJuIE51bWJlcihzdHIucmVwbGFjZSgvW14wLTkuXS9nLCAnJykpO1xufVxuIiwiLy8gdHJ1bmNhdGUgdG8gbGVuZ3RoIHdpdGggc3VmZml4XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0cnVuY2F0ZShzdHIsIGxlbiwgc3VmZml4ID0gJy4uLicpIHtcbiAgICBsZW4gLT0gc3VmZml4Lmxlbmd0aDtcbiAgICBsZXQgdHJ1bmMgPSBzdHI7XG4gICAgaWYgKHRydW5jLmxlbmd0aCA+IGxlbikge1xuICAgICAgICB0cnVuYyA9IHRydW5jLnN1YnN0cigwLCBsZW4pO1xuICAgICAgICBjb25zdCByID0gL1teXFxzXS87XG4gICAgICAgIGlmIChyLnRlc3Qoc3RyLmNoYXJBdChsZW4pKSkge1xuICAgICAgICAgICAgdHJ1bmMgPSB0cnVuYy5yZXBsYWNlKC9cXHcrJHxcXHMrJC8sICcnKS50cmltUmlnaHQoKTtcbiAgICAgICAgfVxuICAgICAgICB0cnVuYyArPSBzdWZmaXg7XG4gICAgfVxuICAgIHJldHVybiB0cnVuYztcbn1cbiIsIi8vIHRoZSBudW1iZXIgb2Ygd29yZHMgaW4gYSBzdHJpbmdcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdvcmRDb3VudChzdHIpIHtcbiAgICByZXR1cm4gc3RyLm1hdGNoKC9cXGJcXHcrXFxiL2cpLmxlbmd0aDtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGV2ZW50KGNhdGVnb3J5LCBhY3Rpb24sIGxhYmVsLCB2YWx1ZSkge1xuICAgIGlmICghd2luZG93LmdhKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgd2luZG93LmdhKCdzZW5kJywgJ2V2ZW50JywgY2F0ZWdvcnksIGFjdGlvbiwgbGFiZWwsIHZhbHVlKTtcbn1cbiIsImltcG9ydCBldmVudCBmcm9tICcuL2V2ZW50JztcbmltcG9ydCBwYWdldmlldyBmcm9tICcuL3BhZ2V2aWV3JztcbmltcG9ydCBsb2FkIGZyb20gJy4vbG9hZCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBldmVudCxcbiAgICBwYWdldmlldyxcbiAgICBsb2FkXG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbG9hZChnYUFjY291bnQpIHtcbiAgICBjb25zb2xlLmxvZygnSW5pdGlhbGl6ZSBHb29nbGUgQW5hbHl0aWNzIHdpdGggYWNjb3VudCBJZDonLCBnYUFjY291bnQpO1xuXG4gICAgLyplc2xpbnQtZGlzYWJsZSovXG4gICAgKGZ1bmN0aW9uKGkscyxvLGcscixhLG0pe2lbJ0dvb2dsZUFuYWx5dGljc09iamVjdCddPXI7aVtyXT1pW3JdfHxmdW5jdGlvbigpe1xuXHQoaVtyXS5xPWlbcl0ucXx8W10pLnB1c2goYXJndW1lbnRzKX0saVtyXS5sPTEqbmV3IERhdGUoKTthPXMuY3JlYXRlRWxlbWVudChvKSxcblx0bT1zLmdldEVsZW1lbnRzQnlUYWdOYW1lKG8pWzBdO2EuYXN5bmM9MTthLnNyYz1nO20ucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoYSxtKVxuXHR9KSh3aW5kb3csZG9jdW1lbnQsJ3NjcmlwdCcsJy8vd3d3Lmdvb2dsZS1hbmFseXRpY3MuY29tL2FuYWx5dGljcy5qcycsJ2dhJyk7XG4gICAgLyplc2xpbnQtZW5hYmxlKi9cblxuICAgIHdpbmRvdy5nYSgnY3JlYXRlJywgZ2FBY2NvdW50LCAnYXV0bycpO1xuICAgIHdpbmRvdy5nYSgnc2VuZCcsICdwYWdldmlldycpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFnZXZpZXcocGF0aCkge1xuICAgIGlmICghd2luZG93LmdhKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgd2luZG93LmdhKCdzZW5kJywgJ3BhZ2V2aWV3JywgcGF0aCk7XG59XG4iLCJpbXBvcnQge2Vhc2VPdXRRdWFkfSBmcm9tICcuLi9lYXNlL3F1YWQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUd2VlbiB7XG4gICAgY29uc3RydWN0b3Iob2IsIHByb3BzLCBkdXJhdGlvbiwgb3B0aW9ucykge1xuICAgICAgICB0aGlzLm9iID0gb2I7XG5cbiAgICAgICAgaWYgKHByb3BzKSB7XG4gICAgICAgICAgICB0aGlzLnRvKHByb3BzLCBkdXJhdGlvbiwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0byhwcm9wcywgZHVyYXRpb24sIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICB0aGlzLmR1cmF0aW9uID0gZHVyYXRpb247XG4gICAgICAgIHRoaXMuZWFzZSA9IG9wdGlvbnMuZWFzZSB8fCBlYXNlT3V0UXVhZDtcbiAgICAgICAgdGhpcy5kZWxheSA9IG9wdGlvbnMuZGVsYXkgfHwgMDtcbiAgICAgICAgdGhpcy5vblVwZGF0ZSA9IG9wdGlvbnMub25VcGRhdGU7XG4gICAgICAgIHRoaXMub25Db21wbGV0ZSA9IG9wdGlvbnMub25Db21wbGV0ZTtcbiAgICAgICAgdGhpcy50aW1lID0gMDtcbiAgICAgICAgdGhpcy5jb21wbGV0ZSA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuX3Byb3BzID0gT2JqZWN0LmtleXMocHJvcHMpO1xuICAgICAgICB0aGlzLl9iZWdpblZhbHMgPSB7fTtcbiAgICAgICAgdGhpcy5fY2hhbmdlVmFscyA9IHt9O1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHByb3AgPSB0aGlzLl9wcm9wc1tpXTtcbiAgICAgICAgICAgIHRoaXMuX2JlZ2luVmFsc1twcm9wXSA9IHRoaXMub2JbcHJvcF07XG4gICAgICAgICAgICB0aGlzLl9jaGFuZ2VWYWxzW3Byb3BdID0gcHJvcHNbcHJvcF0gLSB0aGlzLl9iZWdpblZhbHNbcHJvcF07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGUoZHQpIHtcbiAgICAgICAgaWYgKHRoaXMudGltZSA9PT0gdGhpcy5kdXJhdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZGVsYXkgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmRlbGF5IC09IGR0O1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50aW1lICs9IGR0O1xuXG4gICAgICAgIGlmICh0aGlzLnRpbWUgPiB0aGlzLmR1cmF0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnRpbWUgPSB0aGlzLmR1cmF0aW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9wcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcHJvcCA9IHRoaXMuX3Byb3BzW2ldO1xuICAgICAgICAgICAgdGhpcy5vYltwcm9wXSA9IHRoaXMuZWFzZSh0aGlzLnRpbWUsIHRoaXMuX2JlZ2luVmFsc1twcm9wXSwgdGhpcy5fY2hhbmdlVmFsc1twcm9wXSwgdGhpcy5kdXJhdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5vblVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5vblVwZGF0ZSh0aGlzLm9iKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnRpbWUgPT09IHRoaXMuZHVyYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuY29tcGxldGUgPSB0cnVlO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5vbkNvbXBsZXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkNvbXBsZXRlKHRoaXMub2IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzZXQoKSB7XG4gICAgICAgIHRoaXMudGltZSA9IDA7XG4gICAgICAgIHRoaXMuY29tcGxldGUgPSBmYWxzZTtcbiAgICB9XG59XG4iLCJsZXQgaGlkZGVuLFxuICAgIGNoYW5nZTtcblxuaWYgKHR5cGVvZiBkb2N1bWVudC5oaWRkZW4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaGlkZGVuID0gJ2hpZGRlbic7XG4gICAgY2hhbmdlID0gJ3Zpc2liaWxpdHljaGFuZ2UnO1xufSBlbHNlIGlmICh0eXBlb2YgZG9jdW1lbnQubW96SGlkZGVuICE9PSAndW5kZWZpbmVkJykge1xuICAgIGhpZGRlbiA9ICdtb3pIaWRkZW4nO1xuICAgIGNoYW5nZSA9ICdtb3p2aXNpYmlsaXR5Y2hhbmdlJztcbn0gZWxzZSBpZiAodHlwZW9mIGRvY3VtZW50Lm1zSGlkZGVuICE9PSAndW5kZWZpbmVkJykge1xuICAgIGhpZGRlbiA9ICdtc0hpZGRlbic7XG4gICAgY2hhbmdlID0gJ21zdmlzaWJpbGl0eWNoYW5nZSc7XG59IGVsc2UgaWYgKHR5cGVvZiBkb2N1bWVudC53ZWJraXRIaWRkZW4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaGlkZGVuID0gJ3dlYmtpdEhpZGRlbic7XG4gICAgY2hhbmdlID0gJ3dlYmtpdHZpc2liaWxpdHljaGFuZ2UnO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgaGlkZGVuLFxuICAgIGNoYW5nZVxufTtcbiIsImltcG9ydCBhcGkgZnJvbSAnLi9hcGknO1xuaW1wb3J0IGVtaXR0ZXIgZnJvbSAnLi4vZXZlbnRzL2VtaXR0ZXInO1xuXG5jb25zdCB2aXNpYmlsaXR5ID0gT2JqZWN0LmNyZWF0ZShlbWl0dGVyLnByb3RvdHlwZSwge1xuICAgIGhpZGRlbjoge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50W2FwaS5oaWRkZW5dO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbmZ1bmN0aW9uIG9uVmlzaWJpbGl0eUNoYW5nZSgpIHtcbiAgICBpZiAoZG9jdW1lbnRbYXBpLmhpZGRlbl0pIHtcbiAgICAgICAgdmlzaWJpbGl0eS5lbWl0KCdoaWRkZW4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2aXNpYmlsaXR5LmVtaXQoJ3Nob3duJyk7XG4gICAgfVxufVxuXG5pZiAoYXBpLmNoYW5nZSkge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoYXBpLmNoYW5nZSwgb25WaXNpYmlsaXR5Q2hhbmdlLCBmYWxzZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHZpc2liaWxpdHk7XG4iXX0=
