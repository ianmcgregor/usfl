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
    sortNumeric: _sortNumeric2.default,
    sortRandom: _sortRandom2.default
};

},{"./array":1,"./clone":2,"./moveElement":4,"./nearest":5,"./randomChoice":6,"./sortAlpha":7,"./sortNumeric":8,"./sortRandom":9}],4:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = sortRandom;
function sortRandom() {
    return Math.random() > 0.5 ? -1 : 1;
}

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = blockScrolling;
function blockScrolling(value) {
    document.body.style.overflow = value ? 'hidden' : '';
}

},{}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
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

},{"./getScrollTop":16}],15:[function(require,module,exports){
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

},{"./getScrollTop":16}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getScrollTop;
function getScrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop;
}

},{}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
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

},{"./blockScrolling":10,"./elCoords":11,"./forceRedraw":12,"./getPageHeight":13,"./getScrollPercentage":14,"./getScrollRemaining":15,"./getScrollTop":16,"./getSrcsetImage":17,"./isElementInViewport":19,"./isPageEnd":20,"./resize":21,"./scroll":22,"./setStyle":23,"./transitionEnd":24}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
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

},{"./getScrollRemaining":15}],21:[function(require,module,exports){
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

},{"../events/eventBus":40}],22:[function(require,module,exports){
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

},{"../events/eventBus":40}],23:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
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

},{}],26:[function(require,module,exports){
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

},{}],27:[function(require,module,exports){
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

},{}],28:[function(require,module,exports){
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

},{}],29:[function(require,module,exports){
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

},{}],30:[function(require,module,exports){
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

},{}],31:[function(require,module,exports){
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

},{"./back":25,"./bounce":26,"./circular":27,"./cubic":28,"./elastic":29,"./expo":30,"./linear":32,"./quad":33,"./quart":34,"./quint":35,"./sine":36}],32:[function(require,module,exports){
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

},{}],33:[function(require,module,exports){
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

},{}],34:[function(require,module,exports){
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

},{}],35:[function(require,module,exports){
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

},{}],36:[function(require,module,exports){
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

},{}],37:[function(require,module,exports){
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

},{}],38:[function(require,module,exports){
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

},{}],39:[function(require,module,exports){
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

},{"events":110}],40:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _emitter = require('./emitter');

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = Object.create(_emitter2.default.prototype);

},{"./emitter":39}],41:[function(require,module,exports){
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

},{"./emitter":39}],42:[function(require,module,exports){
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

},{"./debounce":37,"./delegateEvents":38,"./emitter":39,"./eventBus":40,"./heartbeat":41}],43:[function(require,module,exports){
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
el.style.position = 'absolute';
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

},{}],44:[function(require,module,exports){
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

},{}],45:[function(require,module,exports){
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

},{"../events/emitter":39,"./api":44}],46:[function(require,module,exports){
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
        key: 'context',
        get: function get() {
            return this.ctx;
        }
    }]);

    return Graphics;
}();

exports.default = Graphics;

},{}],47:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = gui;

var _loadScript = require('../http/loadScript');

var _loadScript2 = _interopRequireDefault(_loadScript);

var _isLocalHost = require('../platform/isLocalHost');

var _isLocalHost2 = _interopRequireDefault(_isLocalHost);

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

    if (localhostOnly && !(0, _isLocalHost2.default)()) {
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
            var s = document.styleSheets[0];
            s.insertRule('.dg.ac {z-index:10000 !important}', 0);
            s.insertRule('.dg * {font-size:11px !important}', 0);
            s.insertRule('.dg input {font:11px Lucida Grande,sans-serif !important}', 0);
            resolve(g);
        });
    });
}

gui.isLocalHost = _isLocalHost2.default;

},{"../http/loadScript":51,"../platform/isLocalHost":124}],48:[function(require,module,exports){
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

},{}],49:[function(require,module,exports){
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

},{"./getLocation":48,"./jsonp":50,"./loadScript":51,"./urlParams":52,"./xhr":53}],50:[function(require,module,exports){
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

},{}],51:[function(require,module,exports){
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

},{}],52:[function(require,module,exports){
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

},{}],53:[function(require,module,exports){
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

},{}],54:[function(require,module,exports){
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

var _ticker = require('./ticker');

var _ticker2 = _interopRequireDefault(_ticker);

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
    Ticker: _ticker2.default,
    Tween: _tween2.default,
    track: _track2.default,
    visibility: _visibility2.default
};

},{"./array":3,"./dom":18,"./ease":31,"./events":42,"./fps":43,"./fullscreen":45,"./graphics":46,"./gui":47,"./http":49,"./input":56,"./linked-list":64,"./math":80,"./media":105,"./object":115,"./object-pool":112,"./particle":117,"./platform":123,"./polyfill":142,"./popup":144,"./quad-tree":145,"./share":150,"./storage":160,"./string":175,"./ticker":192,"./track":194,"./tween":197,"./visibility":199}],55:[function(require,module,exports){
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

        while (target !== document.body) {
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

},{}],56:[function(require,module,exports){
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

},{"./clickOutside":55,"./keyInput":57,"./keyboard":58,"./microphone":59,"./mouseLeftWindow":60,"./mouseWheel":61,"./pointerCoords":62,"./touchInput":63}],57:[function(require,module,exports){
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

},{"../array/array":1,"../events/emitter":39,"./keyboard":58}],58:[function(require,module,exports){
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

},{}],59:[function(require,module,exports){
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

},{"../events/emitter":39}],60:[function(require,module,exports){
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

},{}],61:[function(require,module,exports){
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

},{"../events/emitter":39}],62:[function(require,module,exports){
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

},{"../dom/getPageHeight":13}],63:[function(require,module,exports){
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

},{"../events/emitter":39}],64:[function(require,module,exports){
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

},{}],65:[function(require,module,exports){
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

},{}],66:[function(require,module,exports){
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

},{}],67:[function(require,module,exports){
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

},{}],68:[function(require,module,exports){
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

},{}],69:[function(require,module,exports){
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

},{}],70:[function(require,module,exports){
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

},{}],71:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = degrees;
var DEG = 180 / Math.PI;

function degrees(radians) {
    return radians * DEG;
}

},{}],72:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = difference;
function difference(a, b) {
    return Math.abs(a - b);
}

},{}],73:[function(require,module,exports){
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

},{}],74:[function(require,module,exports){
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

},{}],75:[function(require,module,exports){
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

},{}],76:[function(require,module,exports){
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

},{}],77:[function(require,module,exports){
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

},{}],78:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getOverlapX;
function getOverlapX(aX, aW, bX, bW) {
    return Math.max(0, Math.min(aX + aW, bX + bW) - Math.max(aX, bX));
}

},{}],79:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getOverlapY;
function getOverlapY(aY, aH, bY, bH) {
    return Math.max(0, Math.min(aY + aH, bY + bH) - Math.max(aY, bY));
}

},{}],80:[function(require,module,exports){
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

},{"./angle":65,"./cerp":66,"./circleDistribution":67,"./clamp":68,"./coinToss":69,"./crossProduct2d":70,"./degrees":71,"./difference":72,"./distance":73,"./distanceSq":74,"./dotProduct2d":75,"./getCirclePoints":76,"./getIntersectionArea":77,"./getOverlapX":78,"./getOverlapY":79,"./lerp":81,"./map":82,"./normalize":83,"./orientation":84,"./percentRemaining":85,"./perspective":86,"./quadraticCurve":87,"./radians":88,"./random":89,"./randomInt":90,"./randomSign":91,"./rotatePoint":92,"./rotateToDeg":93,"./rotateToRad":94,"./roundTo":95,"./roundToNearest":96,"./size":97,"./smerp":98,"./smoothstep":99,"./splitValueAndUnit":100,"./weightedAverage":101,"./weightedDistribution":102}],81:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = lerp;
function lerp(from, to) {
    var weight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.3;

    return from + (to - from) * weight;
}

},{}],82:[function(require,module,exports){
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

},{}],83:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = normalize;
function normalize(value, min, max) {
    return (value - min) / (max - min);
}

},{}],84:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = orientation;
function orientation(x, y) {
    return Math.atan2(y, x);
}

},{}],85:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = percentRemaining;
function percentRemaining(value, total) {
    return value % total / total;
}

},{}],86:[function(require,module,exports){
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

},{}],87:[function(require,module,exports){
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

},{}],88:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = radians;
var RAD = Math.PI / 180;

function radians(degrees) {
    return degrees * RAD;
}

},{}],89:[function(require,module,exports){
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

},{}],90:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = randomInt;
function randomInt(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
}

},{}],91:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = randomSign;
function randomSign() {
    return Math.random() > 0.5 ? -1 : 1;
}

},{}],92:[function(require,module,exports){
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

},{}],93:[function(require,module,exports){
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

},{}],94:[function(require,module,exports){
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

},{}],95:[function(require,module,exports){
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

},{}],96:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = roundToNearest;
function roundToNearest(value, unit) {
    return Math.round(value / unit) * unit;
}

},{}],97:[function(require,module,exports){
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

},{}],98:[function(require,module,exports){
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

},{"./smoothstep":99}],99:[function(require,module,exports){
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

},{"./clamp":68}],100:[function(require,module,exports){
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

},{}],101:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = weightedAverage;
function weightedAverage(from, to) {
    var weight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;

    return (from * (weight - 1) + to) / weight;
}

},{}],102:[function(require,module,exports){
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

},{"./random":89}],103:[function(require,module,exports){
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

},{}],104:[function(require,module,exports){
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

},{}],105:[function(require,module,exports){
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

},{"./cuepointsReader":103,"./iOSPlayVideoInline":104,"./videoPlayer":106,"./vimeo":107,"./youtube":108,"./youtubeBasic":109}],106:[function(require,module,exports){
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

},{"../events/emitter":39}],107:[function(require,module,exports){
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

},{"../events/emitter":39}],108:[function(require,module,exports){
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

},{"events":110}],109:[function(require,module,exports){
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

},{}],110:[function(require,module,exports){
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

},{}],111:[function(require,module,exports){
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

},{}],112:[function(require,module,exports){
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

},{}],113:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = clone;
function clone(ob) {
    return JSON.parse(JSON.stringify(ob));
}

},{}],114:[function(require,module,exports){
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

},{}],115:[function(require,module,exports){
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

},{"./clone":113,"./filter":114,"./map":116}],116:[function(require,module,exports){
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

},{}],117:[function(require,module,exports){
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

},{}],118:[function(require,module,exports){
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

},{"../os/android":125}],119:[function(require,module,exports){
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

},{}],120:[function(require,module,exports){
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

var _safari = require('./safari');

var _safari2 = _interopRequireDefault(_safari);

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
var safariMobile = function safariMobile() {
    return _os2.default.ios() && /AppleWebKit/.test(ua);
};

exports.default = {
    androidNative: _androidNative2.default,
    chromeiOS: chromeiOS,
    firefox: firefox,
    ie: ie,
    ieVersion: _ieVersion2.default,
    safari: _safari2.default,
    safariMobile: safariMobile
};

},{"../os":127,"./androidNative":118,"./ieVersion":119,"./safari":121}],121:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = safari;
function safari() {
    var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator.userAgent;

    return !/Android/.test(ua) && !/Chrome/.test(ua) && /Safari/.test(ua);
}

},{}],122:[function(require,module,exports){
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

},{}],123:[function(require,module,exports){
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

var _isLocalHost = require('./isLocalHost');

var _isLocalHost2 = _interopRequireDefault(_isLocalHost);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var local = (0, _isLocalHost2.default)();

exports.default = {
    browser: _browser2.default,
    device: _device2.default,
    os: _os2.default,
    supports: _supports2.default,
    screen: _screen2.default,
    local: local
};

},{"./browser":120,"./device":122,"./isLocalHost":124,"./os":127,"./screen":134,"./supports":136}],124:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = isLocalHost;
function isLocalHost() {
    return (/^(?:https?:\/\/)?(?:localhost|192\.168)/.test(window.location.href)
    );
}

},{}],125:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator.userAgent;

    return (/Android/i.test(ua)
    );
};

},{}],126:[function(require,module,exports){
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

},{"./android":125}],127:[function(require,module,exports){
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

},{"./android":125,"./androidVersion":126,"./ios":128,"./iosVersion":129,"./linux":130,"./mac":131,"./windows":132,"./windowsPhone":133}],128:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = ios;
function ios() {
    var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator.userAgent;

    return (/iP[ao]d|iPhone/i.test(ua)
    );
}

},{}],129:[function(require,module,exports){
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

},{"./ios":128}],130:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = linux;

var _android = require('./android');

var _android2 = _interopRequireDefault(_android);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function linux() {
    var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator.userAgent;

    return !(0, _android2.default)(ua) && /Linux/.test(ua);
}

},{"./android":125}],131:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = mac;

var _ios = require('./ios');

var _ios2 = _interopRequireDefault(_ios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mac() {
    var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator.userAgent;

    return !(0, _ios2.default)(ua) && /Mac OS/.test(ua);
}

},{"./ios":128}],132:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = windows;

var _windowsPhone = require('./windowsPhone');

var _windowsPhone2 = _interopRequireDefault(_windowsPhone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function windows() {
    var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator.userAgent;

    return !(0, _windowsPhone2.default)(ua) && /Windows/.test(ua);
}

},{"./windowsPhone":133}],133:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = windowsPhone;
function windowsPhone() {
    var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator.userAgent;

    return (/Windows Phone/i.test(ua)
    );
}

},{}],134:[function(require,module,exports){
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

},{}],135:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return !!window.DeviceOrientationEvent;
};

},{}],136:[function(require,module,exports){
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

},{"./deviceOrientation":135,"./mp4":137,"./webgl":138,"./webm":139}],137:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var videoEl = document.createElement('video');

exports.default = function () {
  return !!(videoEl.canPlayType && videoEl.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"'));
};

},{}],138:[function(require,module,exports){
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

},{}],139:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var videoEl = document.createElement('video');

exports.default = function () {
  return !!(videoEl.canPlayType && videoEl.canPlayType('video/webm; codecs="vp8, vorbis"'));
};

},{}],140:[function(require,module,exports){
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

},{}],141:[function(require,module,exports){
'use strict';

(function (fn) {
    window.console = window.console || {};
    var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'memory', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'timeline', 'timelineEnd', 'trace', 'warn'];
    methods.forEach(function (name) {
        window.console[name] = window.console[name] || fn;
    });
})(function () {});

},{}],142:[function(require,module,exports){
'use strict';

require('./classList');

require('./console');

require('./requestAnimationFrame');

},{"./classList":140,"./console":141,"./requestAnimationFrame":143}],143:[function(require,module,exports){
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

},{}],144:[function(require,module,exports){
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

},{}],145:[function(require,module,exports){
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

},{}],146:[function(require,module,exports){
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

},{"../popup":144}],147:[function(require,module,exports){
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

},{"../popup":144}],148:[function(require,module,exports){
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

},{"../popup":144}],149:[function(require,module,exports){
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

},{"../popup":144}],150:[function(require,module,exports){
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

},{"./email":146,"./facebook":147,"./facebookFeedDialog":148,"./googleplus":149,"./linkedin":151,"./pinterest":152,"./reddit":153,"./renren":154,"./sms":155,"./twitter":156,"./vkontakte":157,"./weibo":158,"./whatsapp":159}],151:[function(require,module,exports){
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

},{"../popup":144}],152:[function(require,module,exports){
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

},{"../popup":144}],153:[function(require,module,exports){
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

},{"../popup":144}],154:[function(require,module,exports){
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

},{"../popup":144}],155:[function(require,module,exports){
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

},{}],156:[function(require,module,exports){
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

},{"../popup":144}],157:[function(require,module,exports){
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

},{"../popup":144}],158:[function(require,module,exports){
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

},{"../popup":144}],159:[function(require,module,exports){
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

},{}],160:[function(require,module,exports){
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

},{}],161:[function(require,module,exports){
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

},{}],162:[function(require,module,exports){
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

},{}],163:[function(require,module,exports){
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

},{}],164:[function(require,module,exports){
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

},{}],165:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = beginsWith;
// whether str begins with substr
function beginsWith(str, substr) {
    return str.indexOf(substr) === 0;
}

},{}],166:[function(require,module,exports){
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

},{}],167:[function(require,module,exports){
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

},{"./escapePattern":173,"./truncate":190}],168:[function(require,module,exports){
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

},{}],169:[function(require,module,exports){
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

},{"./escapePattern":173}],170:[function(require,module,exports){
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

},{}],171:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = endsWith;
// whether str ends with substr
function endsWith(str, substr) {
    return str.lastIndexOf(substr) === str.length - substr.length;
}

},{}],172:[function(require,module,exports){
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

},{}],173:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = escapePattern;
// regex escape pattern
function escapePattern(pattern) {
    return pattern.replace(/(\]|\[|\{|\}|\(|\)|\*|\+|\?|\.|\\)/g, '\\$1');
}

},{}],174:[function(require,module,exports){
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

},{"./removeExtraWhitespace":182}],175:[function(require,module,exports){
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

},{"./afterFirst":161,"./afterLast":162,"./beforeFirst":163,"./beforeLast":164,"./beginsWith":165,"./between":166,"./block":167,"./capitalize":168,"./countOf":169,"./editDistance":170,"./endsWith":171,"./escapeHTML":172,"./escapePattern":173,"./hasText":174,"./isNumeric":176,"./padLeft":177,"./padRight":178,"./preventWidow":179,"./properCase":180,"./remove":181,"./removeExtraWhitespace":182,"./reverse":183,"./reverseWords":184,"./similarity":185,"./stripTags":186,"./swapCase":187,"./timeCode":188,"./toNumber":189,"./truncate":190,"./wordCount":191}],176:[function(require,module,exports){
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

},{}],177:[function(require,module,exports){
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

},{}],178:[function(require,module,exports){
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

},{}],179:[function(require,module,exports){
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

},{}],180:[function(require,module,exports){
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

},{"./capitalize":168}],181:[function(require,module,exports){
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

},{"./escapePattern":173}],182:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = removeExtraWhitespace;
// remove extra whitespace (extra spaces, tabs, line breaks, etc)
function removeExtraWhitespace(str) {
    return str.trim().replace(/\s+/g, ' ');
}

},{}],183:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = reverse;
// reverse character order
function reverse(str) {
    return str.split('').reverse().join('');
}

},{}],184:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = reverseWords;
// reverse word order
function reverseWords(str) {
    return str.split(' ').reverse().join(' ');
}

},{}],185:[function(require,module,exports){
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

},{"./editDistance":170}],186:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = stripTags;
// remove all HTML tags from str
function stripTags(str) {
    return str.replace(/<\/?[^>]+>/igm, '');
}

},{}],187:[function(require,module,exports){
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

},{}],188:[function(require,module,exports){
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

},{}],189:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = toNumber;
function toNumber(str) {
    return Number(str.replace(/[^0-9.]/g, ''));
}

},{}],190:[function(require,module,exports){
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

},{}],191:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = wordCount;
// the number of words in a string
function wordCount(str) {
    return str.match(/\b\w+\b/g).length;
}

},{}],192:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // import Signal from 'signals';


var _miniSignals = require('mini-signals');

var _miniSignals2 = _interopRequireDefault(_miniSignals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ticker = function () {
    function Ticker() {
        _classCallCheck(this, Ticker);

        this.update = this.update.bind(this);
        // this.onUpdate = new Signal();
        this.onUpdate = new _miniSignals2.default();

        this.running = false;
        this.last = 0;
        // this.accumulated = 0;
        // this.step = 1000 / 60;
    }

    _createClass(Ticker, [{
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

            this.running = false;
        }
    }, {
        key: 'update',
        value: function update() {
            if (!this.running) {
                return;
            }

            window.requestAnimationFrame(this.update);

            var now = Date.now();
            var dt = now - this.last;
            if (dt > 20) {
                dt = 20;
            }
            this.last = now;

            //  // fixed step:
            // this.accumulated += dt;
            //
            // while (this.accumulated >= this.step) {
            //     this.accumulated -= this.step;
            //     this.onUpdate.dispatch(this.step);
            // }

            this.onUpdate.dispatch(dt * 0.001);
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

        // remove(fn, context) {
        //     this.onUpdate.remove(fn, context);
        // }

    }]);

    return Ticker;
}();

exports.default = Ticker;

},{"mini-signals":111}],193:[function(require,module,exports){
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

},{}],194:[function(require,module,exports){
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

},{"./event":193,"./load":195,"./pageview":196}],195:[function(require,module,exports){
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

},{}],196:[function(require,module,exports){
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

},{}],197:[function(require,module,exports){
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

},{"../ease/quad":33}],198:[function(require,module,exports){
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

},{}],199:[function(require,module,exports){
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

},{"../events/emitter":39,"./api":198}]},{},[54])(54)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcnJheS9hcnJheS5qcyIsImFycmF5L2Nsb25lLmpzIiwiYXJyYXkvaW5kZXguanMiLCJhcnJheS9tb3ZlRWxlbWVudC5qcyIsImFycmF5L25lYXJlc3QuanMiLCJhcnJheS9yYW5kb21DaG9pY2UuanMiLCJhcnJheS9zb3J0QWxwaGEuanMiLCJhcnJheS9zb3J0TnVtZXJpYy5qcyIsImFycmF5L3NvcnRSYW5kb20uanMiLCJkb20vYmxvY2tTY3JvbGxpbmcuanMiLCJkb20vZWxDb29yZHMuanMiLCJkb20vZm9yY2VSZWRyYXcuanMiLCJkb20vZ2V0UGFnZUhlaWdodC5qcyIsImRvbS9nZXRTY3JvbGxQZXJjZW50YWdlLmpzIiwiZG9tL2dldFNjcm9sbFJlbWFpbmluZy5qcyIsImRvbS9nZXRTY3JvbGxUb3AuanMiLCJkb20vZ2V0U3Jjc2V0SW1hZ2UuanMiLCJkb20vaW5kZXguanMiLCJkb20vaXNFbGVtZW50SW5WaWV3cG9ydC5qcyIsImRvbS9pc1BhZ2VFbmQuanMiLCJkb20vcmVzaXplLmpzIiwiZG9tL3Njcm9sbC5qcyIsImRvbS9zZXRTdHlsZS5qcyIsImRvbS90cmFuc2l0aW9uRW5kLmpzIiwiZWFzZS9iYWNrLmpzIiwiZWFzZS9ib3VuY2UuanMiLCJlYXNlL2NpcmN1bGFyLmpzIiwiZWFzZS9jdWJpYy5qcyIsImVhc2UvZWxhc3RpYy5qcyIsImVhc2UvZXhwby5qcyIsImVhc2UvaW5kZXguanMiLCJlYXNlL2xpbmVhci5qcyIsImVhc2UvcXVhZC5qcyIsImVhc2UvcXVhcnQuanMiLCJlYXNlL3F1aW50LmpzIiwiZWFzZS9zaW5lLmpzIiwiZXZlbnRzL2RlYm91bmNlLmpzIiwiZXZlbnRzL2RlbGVnYXRlRXZlbnRzLmpzIiwiZXZlbnRzL2VtaXR0ZXIuanMiLCJldmVudHMvZXZlbnRCdXMuanMiLCJldmVudHMvaGVhcnRiZWF0LmpzIiwiZXZlbnRzL2luZGV4LmpzIiwiZnBzL2luZGV4LmpzIiwiZnVsbHNjcmVlbi9hcGkuanMiLCJmdWxsc2NyZWVuL2luZGV4LmpzIiwiZ3JhcGhpY3MvaW5kZXguanMiLCJndWkvaW5kZXguanMiLCJodHRwL2dldExvY2F0aW9uLmpzIiwiaHR0cC9pbmRleC5qcyIsImh0dHAvanNvbnAuanMiLCJodHRwL2xvYWRTY3JpcHQuanMiLCJodHRwL3VybFBhcmFtcy5qcyIsImh0dHAveGhyLmpzIiwiaW5kZXguanMiLCJpbnB1dC9jbGlja091dHNpZGUuanMiLCJpbnB1dC9pbmRleC5qcyIsImlucHV0L2tleUlucHV0LmpzIiwiaW5wdXQva2V5Ym9hcmQuanMiLCJpbnB1dC9taWNyb3Bob25lLmpzIiwiaW5wdXQvbW91c2VMZWZ0V2luZG93LmpzIiwiaW5wdXQvbW91c2VXaGVlbC5qcyIsImlucHV0L3BvaW50ZXJDb29yZHMuanMiLCJpbnB1dC90b3VjaElucHV0LmpzIiwibGlua2VkLWxpc3QvaW5kZXguanMiLCJtYXRoL2FuZ2xlLmpzIiwibWF0aC9jZXJwLmpzIiwibWF0aC9jaXJjbGVEaXN0cmlidXRpb24uanMiLCJtYXRoL2NsYW1wLmpzIiwibWF0aC9jb2luVG9zcy5qcyIsIm1hdGgvY3Jvc3NQcm9kdWN0MmQuanMiLCJtYXRoL2RlZ3JlZXMuanMiLCJtYXRoL2RpZmZlcmVuY2UuanMiLCJtYXRoL2Rpc3RhbmNlLmpzIiwibWF0aC9kaXN0YW5jZVNxLmpzIiwibWF0aC9kb3RQcm9kdWN0MmQuanMiLCJtYXRoL2dldENpcmNsZVBvaW50cy5qcyIsIm1hdGgvZ2V0SW50ZXJzZWN0aW9uQXJlYS5qcyIsIm1hdGgvZ2V0T3ZlcmxhcFguanMiLCJtYXRoL2dldE92ZXJsYXBZLmpzIiwibWF0aC9pbmRleC5qcyIsIm1hdGgvbGVycC5qcyIsIm1hdGgvbWFwLmpzIiwibWF0aC9ub3JtYWxpemUuanMiLCJtYXRoL29yaWVudGF0aW9uLmpzIiwibWF0aC9wZXJjZW50UmVtYWluaW5nLmpzIiwibWF0aC9wZXJzcGVjdGl2ZS5qcyIsIm1hdGgvcXVhZHJhdGljQ3VydmUuanMiLCJtYXRoL3JhZGlhbnMuanMiLCJtYXRoL3JhbmRvbS5qcyIsIm1hdGgvcmFuZG9tSW50LmpzIiwibWF0aC9yYW5kb21TaWduLmpzIiwibWF0aC9yb3RhdGVQb2ludC5qcyIsIm1hdGgvcm90YXRlVG9EZWcuanMiLCJtYXRoL3JvdGF0ZVRvUmFkLmpzIiwibWF0aC9yb3VuZFRvLmpzIiwibWF0aC9yb3VuZFRvTmVhcmVzdC5qcyIsIm1hdGgvc2l6ZS5qcyIsIm1hdGgvc21lcnAuanMiLCJtYXRoL3Ntb290aHN0ZXAuanMiLCJtYXRoL3NwbGl0VmFsdWVBbmRVbml0LmpzIiwibWF0aC93ZWlnaHRlZEF2ZXJhZ2UuanMiLCJtYXRoL3dlaWdodGVkRGlzdHJpYnV0aW9uLmpzIiwibWVkaWEvY3VlcG9pbnRzUmVhZGVyLmpzIiwibWVkaWEvaU9TUGxheVZpZGVvSW5saW5lLmpzIiwibWVkaWEvaW5kZXguanMiLCJtZWRpYS92aWRlb1BsYXllci5qcyIsIm1lZGlhL3ZpbWVvLmpzIiwibWVkaWEveW91dHViZS5qcyIsIm1lZGlhL3lvdXR1YmVCYXNpYy5qcyIsIm5vZGVfbW9kdWxlcy9ldmVudHMvZXZlbnRzLmpzIiwibm9kZV9tb2R1bGVzL21pbmktc2lnbmFscy9saWIvbWluaS1zaWduYWxzLmpzIiwib2JqZWN0LXBvb2wvaW5kZXguanMiLCJvYmplY3QvY2xvbmUuanMiLCJvYmplY3QvZmlsdGVyLmpzIiwib2JqZWN0L2luZGV4LmpzIiwib2JqZWN0L21hcC5qcyIsInBhcnRpY2xlL2luZGV4LmpzIiwicGxhdGZvcm0vYnJvd3Nlci9hbmRyb2lkTmF0aXZlLmpzIiwicGxhdGZvcm0vYnJvd3Nlci9pZVZlcnNpb24uanMiLCJwbGF0Zm9ybS9icm93c2VyL2luZGV4LmpzIiwicGxhdGZvcm0vYnJvd3Nlci9zYWZhcmkuanMiLCJwbGF0Zm9ybS9kZXZpY2UvaW5kZXguanMiLCJwbGF0Zm9ybS9pbmRleC5qcyIsInBsYXRmb3JtL2lzTG9jYWxIb3N0LmpzIiwicGxhdGZvcm0vb3MvYW5kcm9pZC5qcyIsInBsYXRmb3JtL29zL2FuZHJvaWRWZXJzaW9uLmpzIiwicGxhdGZvcm0vb3MvaW5kZXguanMiLCJwbGF0Zm9ybS9vcy9pb3MuanMiLCJwbGF0Zm9ybS9vcy9pb3NWZXJzaW9uLmpzIiwicGxhdGZvcm0vb3MvbGludXguanMiLCJwbGF0Zm9ybS9vcy9tYWMuanMiLCJwbGF0Zm9ybS9vcy93aW5kb3dzLmpzIiwicGxhdGZvcm0vb3Mvd2luZG93c1Bob25lLmpzIiwicGxhdGZvcm0vc2NyZWVuL2luZGV4LmpzIiwicGxhdGZvcm0vc3VwcG9ydHMvZGV2aWNlT3JpZW50YXRpb24uanMiLCJwbGF0Zm9ybS9zdXBwb3J0cy9pbmRleC5qcyIsInBsYXRmb3JtL3N1cHBvcnRzL21wNC5qcyIsInBsYXRmb3JtL3N1cHBvcnRzL3dlYmdsLmpzIiwicGxhdGZvcm0vc3VwcG9ydHMvd2VibS5qcyIsInBvbHlmaWxsL2NsYXNzTGlzdC5qcyIsInBvbHlmaWxsL2NvbnNvbGUuanMiLCJwb2x5ZmlsbC9pbmRleC5qcyIsInBvbHlmaWxsL3JlcXVlc3RBbmltYXRpb25GcmFtZS5qcyIsInBvcHVwL2luZGV4LmpzIiwicXVhZC10cmVlL2luZGV4LmpzIiwic2hhcmUvZW1haWwuanMiLCJzaGFyZS9mYWNlYm9vay5qcyIsInNoYXJlL2ZhY2Vib29rRmVlZERpYWxvZy5qcyIsInNoYXJlL2dvb2dsZXBsdXMuanMiLCJzaGFyZS9pbmRleC5qcyIsInNoYXJlL2xpbmtlZGluLmpzIiwic2hhcmUvcGludGVyZXN0LmpzIiwic2hhcmUvcmVkZGl0LmpzIiwic2hhcmUvcmVucmVuLmpzIiwic2hhcmUvc21zLmpzIiwic2hhcmUvdHdpdHRlci5qcyIsInNoYXJlL3Zrb250YWt0ZS5qcyIsInNoYXJlL3dlaWJvLmpzIiwic2hhcmUvd2hhdHNhcHAuanMiLCJzdG9yYWdlL2luZGV4LmpzIiwic3RyaW5nL2FmdGVyRmlyc3QuanMiLCJzdHJpbmcvYWZ0ZXJMYXN0LmpzIiwic3RyaW5nL2JlZm9yZUZpcnN0LmpzIiwic3RyaW5nL2JlZm9yZUxhc3QuanMiLCJzdHJpbmcvYmVnaW5zV2l0aC5qcyIsInN0cmluZy9iZXR3ZWVuLmpzIiwic3RyaW5nL2Jsb2NrLmpzIiwic3RyaW5nL2NhcGl0YWxpemUuanMiLCJzdHJpbmcvY291bnRPZi5qcyIsInN0cmluZy9lZGl0RGlzdGFuY2UuanMiLCJzdHJpbmcvZW5kc1dpdGguanMiLCJzdHJpbmcvZXNjYXBlSFRNTC5qcyIsInN0cmluZy9lc2NhcGVQYXR0ZXJuLmpzIiwic3RyaW5nL2hhc1RleHQuanMiLCJzdHJpbmcvaW5kZXguanMiLCJzdHJpbmcvaXNOdW1lcmljLmpzIiwic3RyaW5nL3BhZExlZnQuanMiLCJzdHJpbmcvcGFkUmlnaHQuanMiLCJzdHJpbmcvcHJldmVudFdpZG93LmpzIiwic3RyaW5nL3Byb3BlckNhc2UuanMiLCJzdHJpbmcvcmVtb3ZlLmpzIiwic3RyaW5nL3JlbW92ZUV4dHJhV2hpdGVzcGFjZS5qcyIsInN0cmluZy9yZXZlcnNlLmpzIiwic3RyaW5nL3JldmVyc2VXb3Jkcy5qcyIsInN0cmluZy9zaW1pbGFyaXR5LmpzIiwic3RyaW5nL3N0cmlwVGFncy5qcyIsInN0cmluZy9zd2FwQ2FzZS5qcyIsInN0cmluZy90aW1lQ29kZS5qcyIsInN0cmluZy90b051bWJlci5qcyIsInN0cmluZy90cnVuY2F0ZS5qcyIsInN0cmluZy93b3JkQ291bnQuanMiLCJ0aWNrZXIvaW5kZXguanMiLCJ0cmFjay9ldmVudC5qcyIsInRyYWNrL2luZGV4LmpzIiwidHJhY2svbG9hZC5qcyIsInRyYWNrL3BhZ2V2aWV3LmpzIiwidHdlZW4vaW5kZXguanMiLCJ2aXNpYmlsaXR5L2FwaS5qcyIsInZpc2liaWxpdHkvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztrQkNBd0IsSztBQUFULFNBQVMsS0FBVCxDQUFlLE1BQWYsRUFBdUIsS0FBdkIsRUFBOEI7QUFDekMsUUFBTSxNQUFNLEVBQVo7QUFDQSxTQUFLLElBQUksSUFBSSxDQUFiLEVBQWdC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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztrQkNyS3dCLFU7QUFBVCxTQUFTLFVBQVQsQ0FBb0IsU0FBcEIsRUFBK0I7O0FBRTFDLFFBQUksT0FBTyxFQUFYO0FBQ0EsUUFBSSxhQUFhLENBQWpCOztBQUVBLFdBQU87QUFDSCxlQURHLHFCQUNRO0FBQ1AsbUJBQU8sSUFBUDtBQUNILFNBSEU7QUFJSCxXQUpHLGlCQUlJO0FBQ0gsZ0JBQUssS0FBSyxNQUFMLEdBQWMsQ0FBbkIsRUFBdUI7QUFDbkIsdUJBQU8sS0FBSyxHQUFMLEVBQVA7QUFDSCxhQUZELE1BRU87QUFDSDtBQUNBLHVCQUFPLFdBQVA7QUFDSDtBQUNKLFNBWEU7QUFZSCxlQVpHLG1CQVlNLFFBWk4sRUFZZ0I7QUFDZixpQkFBSyxJQUFMLENBQVUsUUFBVjtBQUNILFNBZEU7QUFlSCxZQWZHLGdCQWVHLEtBZkgsRUFlVTtBQUNULG1CQUFRLEtBQUssTUFBTCxHQUFjLEtBQXRCLEVBQThCO0FBQzFCO0FBQ0EscUJBQUssS0FBSyxNQUFWLElBQW9CLFdBQXBCO0FBQ0g7QUFDSixTQXBCRTtBQXFCSCxhQXJCRyxtQkFxQk07QUFDTCxtQkFBTyxFQUFQO0FBQ0gsU0F2QkU7QUF3QkgscUJBeEJHLDJCQXdCYTtBQUNaLG1CQUFPLFVBQVA7QUFDSDtBQTFCRSxLQUFQO0FBNEJIOzs7Ozs7OztrQkNqQ3VCLEs7QUFBVCxTQUFTLEtBQVQsQ0FBZSxFQUFmLEVBQW1CO0FBQzlCLFdBQU8sS0FBSyxLQUFMLENBQVcsS0FBSyxTQUFMLENBQWUsRUFBZixDQUFYLENBQVA7QUFDSDs7Ozs7Ozs7a0JDRnVCLE07QUFBVCxTQUFTLE1BQVQsQ0FBZ0IsRUFBaEIsRUFBb0IsU0FBcEIsRUFBK0I7QUFDMUMsV0FBTyxPQUFPLElBQVAsQ0FBWSxFQUFaLEVBQ0YsTUFERSxDQUNLO0FBQUEsZUFBTyxVQUFVLEdBQVYsRUFBZSxHQUFHLEdBQUgsQ0FBZixDQUFQO0FBQUEsS0FETCxFQUVGLE1BRkUsQ0FFSyxVQUFDLEtBQUQsRUFBUSxHQUFSLEVBQWdCO0FBQ3BCLGNBQU0sR0FBTixJQUFhLEdBQUcsR0FBSCxDQUFiO0FBQ0EsZUFBTyxLQUFQO0FBQ0gsS0FMRSxFQUtBLEVBTEEsQ0FBUDtBQU1IOzs7Ozs7Ozs7QUNQRDs7OztBQUNBOzs7O0FBQ0E7Ozs7OztrQkFFZTtBQUNYLDBCQURXO0FBRVgsNEJBRlc7QUFHWDtBQUhXLEM7Ozs7Ozs7O2tCQ0pTLEc7QUFBVCxTQUFTLEdBQVQsQ0FBYSxFQUFiLEVBQWlCLEVBQWpCLEVBQXFCO0FBQ2hDLFdBQU8sT0FBTyxJQUFQLENBQVksRUFBWixFQUNGLE1BREUsQ0FDSyxVQUFDLEtBQUQsRUFBUSxHQUFSLEVBQWdCO0FBQ3BCLGNBQU0sR0FBTixJQUFhLEdBQUcsR0FBSCxFQUFRLEdBQUcsR0FBSCxDQUFSLENBQWI7QUFDQSxlQUFPLEtBQVA7QUFDSCxLQUpFLEVBSUEsRUFKQSxDQUFQO0FBS0g7Ozs7Ozs7Ozs7Ozs7SUNOTSxHLEdBQThCLEksQ0FBOUIsRztJQUFLLEssR0FBeUIsSSxDQUF6QixLO0lBQU8sRyxHQUFrQixJLENBQWxCLEc7SUFBSyxHLEdBQWEsSSxDQUFiLEc7SUFBSyxJLEdBQVEsSSxDQUFSLEk7O0lBRVIsUTtBQUNqQixzQkFBWSxPQUFaLEVBQXFCO0FBQUE7O0FBQ2pCLGFBQUssSUFBTCxHQUFZLE9BQVo7O0FBRUEsYUFBSyxPQUFMLEdBQWUsRUFBZjtBQUNBLGFBQUssWUFBTCxHQUFvQixFQUFwQjs7QUFFQSxhQUFLLFNBQUwsR0FBaUI7QUFDYixtQkFBTyxJQURNO0FBRWIsZUFBRyxDQUZVO0FBR2IsZUFBRyxDQUhVO0FBSWIsbUJBQU8sQ0FKTTtBQUtiLG1CQUFPLENBTE07QUFNYixxQkFBUyxDQU5JO0FBT2Isa0JBQU0sQ0FQTztBQVFiLG9CQUFRLENBUks7QUFTYixvQkFBUSxFQUFDLEdBQUcsQ0FBQyxDQUFMLEVBQVEsR0FBRyxDQUFDLENBQVosRUFUSztBQVViLHNCQUFVLENBVkc7QUFXYixzQkFBVSxDQVhHO0FBWWIsb0JBQVEsRUFBQyxHQUFHLENBQUosRUFBTyxHQUFHLENBQVYsRUFBYSxPQUFPLElBQXBCLEVBQTBCLFFBQVEsR0FBbEM7QUFaSyxTQUFqQjs7QUFlQSxhQUFLLE1BQUwsR0FBYyxPQUFPLElBQVAsQ0FBWSxLQUFLLFNBQWpCLENBQWQ7O0FBRUEsYUFBSyxLQUFMLENBQVcsT0FBWDtBQUNIOzs7OzhCQUVLLE8sRUFBUztBQUNYLGdCQUFNLE9BQU8sS0FBSyxTQUFsQjtBQUNBLGdCQUFNLFFBQVEsS0FBSyxNQUFuQjtBQUNBLGdCQUFNLE9BQU8sV0FBVyxJQUF4Qjs7QUFFQSxpQkFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLE1BQU0sTUFBMUIsRUFBa0MsR0FBbEMsRUFBdUM7QUFDbkMsb0JBQU0sTUFBTSxNQUFNLENBQU4sQ0FBWjtBQUNBLG9CQUFNLFFBQVEsS0FBSyxHQUFMLEtBQWEsS0FBSyxHQUFMLENBQTNCO0FBQ0EscUJBQUssR0FBTCxJQUFZLEtBQVo7QUFDQSxxQkFBSyxHQUFMLElBQVksS0FBWjtBQUNIOztBQUVELGdCQUFNLFFBQVEsS0FBSyxLQUFMLElBQWMsS0FBSyxLQUFqQztBQUNBLGdCQUFNLFFBQVEsS0FBSyxLQUFMLElBQWMsS0FBSyxLQUFqQzs7QUFFQSxpQkFBSyxFQUFMLEdBQVUsSUFBSSxLQUFKLElBQWEsS0FBdkI7QUFDQSxpQkFBSyxFQUFMLEdBQVUsSUFBSSxLQUFKLElBQWEsS0FBdkI7O0FBRUEsbUJBQU8sSUFBUDtBQUNIOzs7aUNBRVE7QUFDTCxpQkFBSyxFQUFMLElBQVcsS0FBSyxRQUFoQjtBQUNBLGlCQUFLLEVBQUwsSUFBVyxLQUFLLFFBQWhCO0FBQ0EsaUJBQUssRUFBTCxJQUFXLEtBQUssT0FBaEI7QUFDQSxpQkFBSyxDQUFMLElBQVUsS0FBSyxFQUFmO0FBQ0EsaUJBQUssQ0FBTCxJQUFVLEtBQUssRUFBZjtBQUNBLG1CQUFPLElBQVA7QUFDSDs7O29DQUVXLEssRUFBTyxLLEVBQU87QUFDdEIsZ0JBQUksT0FBTyxLQUFQLEtBQWlCLFdBQXJCLEVBQWtDO0FBQzlCLHdCQUFRLEtBQUssS0FBYjtBQUNIO0FBQ0QsaUJBQUssRUFBTCxJQUFXLElBQUksS0FBSixJQUFhLEtBQXhCO0FBQ0EsaUJBQUssRUFBTCxJQUFXLElBQUksS0FBSixJQUFhLEtBQXhCO0FBQ0EsbUJBQU8sSUFBUDtBQUNIOzs7a0NBNEJTLEMsRUFBRyxDLEVBQUcsSyxFQUFPLE0sRUFBUTtBQUMzQixpQkFBSyxPQUFMLENBQWEsQ0FBYixHQUFpQixLQUFLLENBQXRCO0FBQ0EsaUJBQUssT0FBTCxDQUFhLENBQWIsR0FBaUIsS0FBSyxDQUF0QjtBQUNBLGlCQUFLLE9BQUwsQ0FBYSxLQUFiLEdBQXFCLEtBQXJCO0FBQ0EsaUJBQUssT0FBTCxDQUFhLE1BQWIsR0FBc0IsTUFBdEI7QUFDSDs7O2dDQW1DTyxDLEVBQUc7QUFDUCxtQkFBTyxNQUFNLEVBQUUsQ0FBRixHQUFNLEtBQUssQ0FBakIsRUFBb0IsRUFBRSxDQUFGLEdBQU0sS0FBSyxDQUEvQixDQUFQO0FBQ0g7OzttQ0FFVSxDLEVBQUc7QUFDVixnQkFBTSxLQUFLLEVBQUUsQ0FBRixHQUFNLEtBQUssQ0FBdEI7QUFDQSxnQkFBTSxLQUFLLEVBQUUsQ0FBRixHQUFNLEtBQUssQ0FBdEI7QUFDQSxtQkFBTyxLQUFLLEtBQUssRUFBTCxHQUFVLEtBQUssRUFBcEIsQ0FBUDtBQUNIOzs7K0JBRU0sQyxFQUFtQjtBQUFBLGdCQUFoQixNQUFnQix1RUFBUCxLQUFPOztBQUN0QixnQkFBTSxLQUFLLEVBQUUsQ0FBRixHQUFNLEtBQUssQ0FBdEI7QUFDQSxnQkFBTSxLQUFLLEVBQUUsQ0FBRixHQUFNLEtBQUssQ0FBdEI7O0FBRUEsaUJBQUssRUFBTCxJQUFXLEtBQUssTUFBaEI7QUFDQSxpQkFBSyxFQUFMLElBQVcsS0FBSyxNQUFoQjs7QUFFQSxnQkFBSSxJQUFJLEtBQUssRUFBVCxJQUFlLElBQUksRUFBSixDQUFuQixFQUE0QjtBQUN4QixxQkFBSyxFQUFMLEdBQVUsRUFBVjtBQUNIOztBQUVELGdCQUFJLElBQUksS0FBSyxFQUFULElBQWUsSUFBSSxFQUFKLENBQW5CLEVBQTRCO0FBQ3hCLHFCQUFLLEVBQUwsR0FBVSxFQUFWO0FBQ0g7O0FBRUQsbUJBQU8sSUFBUDtBQUNIOzs7b0NBRVcsQyxFQUFHO0FBQ1gsZ0JBQU0sS0FBSyxFQUFFLENBQUYsR0FBTSxLQUFLLENBQXRCO0FBQ0EsZ0JBQU0sS0FBSyxFQUFFLENBQUYsR0FBTSxLQUFLLENBQXRCO0FBQ0EsZ0JBQU0sU0FBUyxLQUFLLEVBQUwsR0FBVSxLQUFLLEVBQTlCO0FBQ0EsZ0JBQUksU0FBUyxDQUFiLEVBQWdCO0FBQ1osb0JBQU0sT0FBTyxLQUFLLE1BQUwsQ0FBYjtBQUNBLG9CQUFNLFFBQVEsRUFBRSxJQUFGLEdBQVMsTUFBdkI7QUFDQSxvQkFBTSxLQUFLLEtBQUssSUFBTCxHQUFZLEtBQXZCO0FBQ0Esb0JBQU0sS0FBSyxLQUFLLElBQUwsR0FBWSxLQUF2QjtBQUNBLHFCQUFLLEVBQUwsSUFBVyxFQUFYO0FBQ0EscUJBQUssRUFBTCxJQUFXLEVBQVg7QUFDSDs7QUFFRCxtQkFBTyxJQUFQO0FBQ0g7OztpQ0FFUSxDLEVBQUcsUyxFQUFXLE0sRUFBUTtBQUMzQixnQkFBTSxLQUFLLEVBQUUsQ0FBRixHQUFNLEtBQUssQ0FBdEI7QUFDQSxnQkFBTSxLQUFLLEVBQUUsQ0FBRixHQUFNLEtBQUssQ0FBdEI7QUFDQSxnQkFBTSxXQUFXLEtBQUssS0FBSyxFQUFMLEdBQVUsS0FBSyxFQUFwQixDQUFqQjtBQUNBLGdCQUFNLFFBQVEsQ0FBQyxZQUFZLFVBQVUsQ0FBdEIsQ0FBRCxLQUE4QixhQUFhLEdBQTNDLENBQWQ7O0FBRUEsZ0JBQUksSUFBSSxXQUFXLEtBQWYsSUFBd0IsQ0FBNUIsRUFBK0I7QUFDM0IscUJBQUssRUFBTCxJQUFXLEtBQUssUUFBTCxHQUFnQixLQUEzQjtBQUNBLHFCQUFLLEVBQUwsSUFBVyxLQUFLLFFBQUwsR0FBZ0IsS0FBM0I7QUFDSDs7QUFFRCxtQkFBTyxJQUFQO0FBQ0g7OztpQ0FFUSxDLEVBQUc7QUFDUixtQkFBTyxLQUFLLFVBQUwsQ0FBZ0IsQ0FBaEIsS0FBc0IsS0FBSyxNQUFMLEdBQWMsRUFBRSxNQUE3QztBQUNIOzs7c0NBRWE7QUFDVixnQkFBTSxPQUFPLEtBQUssT0FBTCxDQUFhLENBQWIsR0FBaUIsS0FBSyxNQUFuQztBQUNBLGdCQUFNLFFBQVEsS0FBSyxPQUFMLENBQWEsQ0FBYixHQUFpQixLQUFLLE9BQUwsQ0FBYSxLQUE5QixHQUFzQyxLQUFLLE1BQXpEO0FBQ0EsZ0JBQU0sTUFBTSxLQUFLLE9BQUwsQ0FBYSxDQUFiLEdBQWlCLEtBQUssTUFBbEM7QUFDQSxnQkFBTSxTQUFTLEtBQUssT0FBTCxDQUFhLENBQWIsR0FBaUIsS0FBSyxPQUFMLENBQWEsTUFBOUIsR0FBdUMsS0FBSyxNQUEzRDs7QUFFQSxnQkFBSSxLQUFLLENBQUwsR0FBUyxJQUFiLEVBQW1CO0FBQ2YscUJBQUssQ0FBTCxHQUFTLElBQVQ7QUFDQSxxQkFBSyxFQUFMLEdBQVUsS0FBSyxFQUFMLEdBQVUsS0FBSyxNQUFMLENBQVksQ0FBaEM7QUFDSDs7QUFFRCxnQkFBSSxLQUFLLENBQUwsR0FBUyxLQUFiLEVBQW9CO0FBQ2hCLHFCQUFLLENBQUwsR0FBUyxLQUFUO0FBQ0EscUJBQUssRUFBTCxHQUFVLEtBQUssRUFBTCxHQUFVLEtBQUssTUFBTCxDQUFZLENBQWhDO0FBQ0g7O0FBRUQsZ0JBQUksS0FBSyxDQUFMLEdBQVMsR0FBYixFQUFrQjtBQUNkLHFCQUFLLENBQUwsR0FBUyxHQUFUO0FBQ0EscUJBQUssRUFBTCxHQUFVLEtBQUssRUFBTCxHQUFVLEtBQUssTUFBTCxDQUFZLENBQWhDO0FBQ0g7O0FBRUQsZ0JBQUksS0FBSyxDQUFMLEdBQVMsTUFBYixFQUFxQjtBQUNqQixxQkFBSyxDQUFMLEdBQVMsTUFBVDtBQUNBLHFCQUFLLEVBQUwsR0FBVSxLQUFLLEVBQUwsR0FBVSxLQUFLLE1BQUwsQ0FBWSxDQUFoQztBQUNIO0FBQ0o7OzttQ0FFVTtBQUFBLCtCQUM0QixLQUFLLFdBRGpDO0FBQUEsZ0JBQ0EsSUFEQSxnQkFDQSxJQURBO0FBQUEsZ0JBQ00sS0FETixnQkFDTSxLQUROO0FBQUEsZ0JBQ2EsR0FEYixnQkFDYSxHQURiO0FBQUEsZ0JBQ2tCLE1BRGxCLGdCQUNrQixNQURsQjs7O0FBR1AsZ0JBQUksS0FBSyxDQUFMLEdBQVMsSUFBYixFQUFtQjtBQUNmLHFCQUFLLENBQUwsR0FBUyxLQUFUO0FBQ0g7O0FBRUQsZ0JBQUksS0FBSyxDQUFMLEdBQVMsS0FBYixFQUFvQjtBQUNoQixxQkFBSyxDQUFMLEdBQVMsSUFBVDtBQUNIOztBQUVELGdCQUFJLEtBQUssQ0FBTCxHQUFTLEdBQWIsRUFBa0I7QUFDZCxxQkFBSyxDQUFMLEdBQVMsTUFBVDtBQUNIOztBQUVELGdCQUFJLEtBQUssQ0FBTCxHQUFTLE1BQWIsRUFBcUI7QUFDakIscUJBQUssQ0FBTCxHQUFTLEdBQVQ7QUFDSDtBQUNKOzs7bUNBRVU7QUFBQSxnQ0FDNEIsS0FBSyxXQURqQztBQUFBLGdCQUNBLElBREEsaUJBQ0EsSUFEQTtBQUFBLGdCQUNNLEtBRE4saUJBQ00sS0FETjtBQUFBLGdCQUNhLEdBRGIsaUJBQ2EsR0FEYjtBQUFBLGdCQUNrQixNQURsQixpQkFDa0IsTUFEbEI7OztBQUdQLGdCQUFJLEtBQUssQ0FBTCxHQUFTLElBQVQsSUFBaUIsS0FBSyxDQUFMLEdBQVMsS0FBMUIsSUFBbUMsS0FBSyxDQUFMLEdBQVMsR0FBNUMsSUFBbUQsS0FBSyxDQUFMLEdBQVMsTUFBaEUsRUFBd0U7QUFDcEUscUJBQUssS0FBTCxHQUFhLEtBQWI7QUFDSDtBQUNKOzs7b0NBRVc7QUFBQSxnQ0FDMkIsS0FBSyxXQURoQztBQUFBLGdCQUNELElBREMsaUJBQ0QsSUFEQztBQUFBLGdCQUNLLEtBREwsaUJBQ0ssS0FETDtBQUFBLGdCQUNZLEdBRFosaUJBQ1ksR0FEWjtBQUFBLGdCQUNpQixNQURqQixpQkFDaUIsTUFEakI7OztBQUdSLGdCQUFJLEtBQUssQ0FBTCxHQUFTLElBQVQsSUFBaUIsS0FBSyxDQUFMLEdBQVMsS0FBMUIsSUFBbUMsS0FBSyxDQUFMLEdBQVMsR0FBNUMsSUFBbUQsS0FBSyxDQUFMLEdBQVMsTUFBaEUsRUFBd0U7QUFDcEUscUJBQUssS0FBTDtBQUNIO0FBQ0o7OzttQ0FFVTtBQUNQLGlCQUFLLFFBQUw7O0FBRUEsZ0JBQUksS0FBSyxRQUFMLElBQWlCLENBQXJCLEVBQXdCO0FBQ3BCLHFCQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0g7QUFDSjs7OzRCQXJNVztBQUNSLGdCQUFJLEtBQUssRUFBTCxLQUFZLENBQVosSUFBaUIsS0FBSyxFQUFMLEtBQVksQ0FBakMsRUFBb0M7QUFDaEMsdUJBQU8sQ0FBUDtBQUNIO0FBQ0QsbUJBQU8sS0FBSyxLQUFLLEVBQUwsR0FBVSxLQUFLLEVBQWYsR0FBb0IsS0FBSyxFQUFMLEdBQVUsS0FBSyxFQUF4QyxDQUFQO0FBQ0gsUzswQkFFUyxLLEVBQU87QUFDYixnQkFBTSxRQUFRLEtBQUssS0FBbkI7QUFDQSxpQkFBSyxFQUFMLEdBQVUsSUFBSSxLQUFKLElBQWEsS0FBdkI7QUFDQSxpQkFBSyxFQUFMLEdBQVUsSUFBSSxLQUFKLElBQWEsS0FBdkI7QUFDSDs7OzRCQUVXO0FBQ1IsZ0JBQUksS0FBSyxFQUFMLEtBQVksQ0FBWixJQUFpQixLQUFLLEVBQUwsS0FBWSxDQUFqQyxFQUFvQztBQUNoQyx1QkFBTyxDQUFQO0FBQ0g7QUFDRCxtQkFBTyxNQUFNLEtBQUssRUFBWCxFQUFlLEtBQUssRUFBcEIsQ0FBUDtBQUNILFM7MEJBRVMsSyxFQUFPO0FBQ2IsZ0JBQU0sUUFBUSxLQUFLLEtBQW5CO0FBQ0EsaUJBQUssRUFBTCxHQUFVLElBQUksS0FBSixJQUFhLEtBQXZCO0FBQ0EsaUJBQUssRUFBTCxHQUFVLElBQUksS0FBSixJQUFhLEtBQXZCO0FBQ0g7Ozs0QkFTWTtBQUNULG1CQUFPLEtBQUssT0FBWjtBQUNILFM7MEJBRVUsRSxFQUFJO0FBQUEsZ0JBQ0osQ0FESSxHQUNtQixFQURuQixDQUNKLENBREk7QUFBQSxnQkFDRCxDQURDLEdBQ21CLEVBRG5CLENBQ0QsQ0FEQztBQUFBLGdCQUNFLEtBREYsR0FDbUIsRUFEbkIsQ0FDRSxLQURGO0FBQUEsZ0JBQ1MsTUFEVCxHQUNtQixFQURuQixDQUNTLE1BRFQ7O0FBRVgsaUJBQUssU0FBTCxDQUFlLENBQWYsRUFBa0IsQ0FBbEIsRUFBcUIsS0FBckIsRUFBNEIsTUFBNUI7QUFDSDs7OzRCQUVVO0FBQ1AsbUJBQU8sS0FBSyxDQUFMLEdBQVMsS0FBSyxNQUFyQjtBQUNIOzs7NEJBRVc7QUFDUixtQkFBTyxLQUFLLENBQUwsR0FBUyxLQUFLLE1BQXJCO0FBQ0g7Ozs0QkFFUztBQUNOLG1CQUFPLEtBQUssQ0FBTCxHQUFTLEtBQUssTUFBckI7QUFDSDs7OzRCQUVZO0FBQ1QsbUJBQU8sS0FBSyxDQUFMLEdBQVMsS0FBSyxNQUFyQjtBQUNIOzs7NEJBRWlCO0FBQ2QsaUJBQUssWUFBTCxDQUFrQixJQUFsQixHQUF5QixLQUFLLE9BQUwsQ0FBYSxDQUFiLEdBQWlCLEtBQUssTUFBL0M7QUFDQSxpQkFBSyxZQUFMLENBQWtCLEtBQWxCLEdBQTBCLEtBQUssT0FBTCxDQUFhLENBQWIsR0FBaUIsS0FBSyxPQUFMLENBQWEsS0FBOUIsR0FBc0MsS0FBSyxNQUFyRTtBQUNBLGlCQUFLLFlBQUwsQ0FBa0IsR0FBbEIsR0FBd0IsS0FBSyxPQUFMLENBQWEsQ0FBYixHQUFpQixLQUFLLE1BQTlDO0FBQ0EsaUJBQUssWUFBTCxDQUFrQixNQUFsQixHQUEyQixLQUFLLE9BQUwsQ0FBYSxDQUFiLEdBQWlCLEtBQUssT0FBTCxDQUFhLE1BQTlCLEdBQXVDLEtBQUssTUFBdkU7QUFDQSxtQkFBTyxLQUFLLFlBQVo7QUFDSDs7Ozs7O2tCQWxJZ0IsUTs7Ozs7Ozs7a0JDQ0csYTs7QUFIeEI7Ozs7OztBQUVBO0FBQ2UsU0FBUyxhQUFULEdBQWlEO0FBQUEsUUFBMUIsRUFBMEIsdUVBQXJCLFVBQVUsU0FBVzs7QUFDNUQsUUFBSSxDQUFDLHVCQUFRLEVBQVIsQ0FBTCxFQUFrQjtBQUNkLGVBQU8sS0FBUDtBQUNIOztBQUVELFFBQU0sa0JBQWtCLEdBQUcsT0FBSCxDQUFXLGFBQVgsSUFBNEIsQ0FBQyxDQUE3QixJQUFrQyxHQUFHLE9BQUgsQ0FBVyxhQUFYLElBQTRCLENBQUMsQ0FBdkY7O0FBRUEsUUFBTSxnQkFBZ0IsdUJBQXRCO0FBQ0EsUUFBTSxvQkFBb0IsY0FBYyxJQUFkLENBQW1CLEVBQW5CLENBQTFCO0FBQ0EsUUFBTSxxQkFBcUIsb0JBQW9CLFdBQVcsY0FBYyxJQUFkLENBQW1CLEVBQW5CLEVBQXVCLENBQXZCLENBQVgsQ0FBcEIsR0FBNEQsSUFBdkY7O0FBRUEsUUFBTSxXQUFXLGtCQUFqQjtBQUNBLFFBQU0sZUFBZSxTQUFTLElBQVQsQ0FBYyxFQUFkLENBQXJCO0FBQ0EsUUFBTSxnQkFBZ0IsZUFBZSxXQUFXLFNBQVMsSUFBVCxDQUFjLEVBQWQsRUFBa0IsQ0FBbEIsQ0FBWCxDQUFmLEdBQWtELElBQXhFOztBQUVBLFdBQU8sbUJBQW9CLHNCQUFzQixxQkFBcUIsR0FBL0QsSUFBd0UsaUJBQWlCLGdCQUFnQixFQUFoSDtBQUNIOzs7Ozs7OztrQkNuQnVCLFM7QUFBVCxTQUFTLFNBQVQsR0FBNkM7QUFBQSxRQUExQixFQUEwQix1RUFBckIsVUFBVSxTQUFXOztBQUN4RCxRQUFJLElBQUksQ0FBUjtBQUNBLFFBQUksbUJBQW1CLElBQW5CLENBQXdCLEVBQXhCLENBQUosRUFBaUM7QUFDN0IsWUFBSSxTQUFTLE9BQU8sRUFBaEIsRUFBb0IsRUFBcEIsQ0FBSjtBQUNILEtBRkQsTUFFTyxJQUFJLHVDQUF1QyxJQUF2QyxDQUE0QyxFQUE1QyxDQUFKLEVBQXFEO0FBQ3hELFlBQUksU0FBUyxPQUFPLEVBQWhCLEVBQW9CLEVBQXBCLENBQUo7QUFDSDtBQUNELFdBQU8sQ0FBUDtBQUNIOzs7Ozs7Ozs7QUNSRDs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTSxLQUFLLFVBQVUsU0FBckI7QUFDQSxJQUFNLFlBQVksU0FBWixTQUFZO0FBQUEsV0FBTSxhQUFHLEdBQUgsTUFBWSxRQUFRLElBQVIsQ0FBYSxFQUFiLENBQWxCO0FBQUEsQ0FBbEI7QUFDQSxJQUFNLFVBQVUsU0FBVixPQUFVO0FBQUEsV0FBTSxXQUFVLElBQVYsQ0FBZSxFQUFmO0FBQU47QUFBQSxDQUFoQjtBQUNBLElBQU0sS0FBSyxTQUFMLEVBQUs7QUFBQSxXQUFNLDZCQUFjLENBQXBCO0FBQUEsQ0FBWDtBQUNBLElBQU0sZUFBZSxTQUFmLFlBQWU7QUFBQSxXQUFNLGFBQUcsR0FBSCxNQUFZLGNBQWMsSUFBZCxDQUFtQixFQUFuQixDQUFsQjtBQUFBLENBQXJCOztrQkFFZTtBQUNYLDBDQURXO0FBRVgsd0JBRlc7QUFHWCxvQkFIVztBQUlYLFVBSlc7QUFLWCxrQ0FMVztBQU1YLDRCQU5XO0FBT1g7QUFQVyxDOzs7Ozs7OztrQkNYUyxNO0FBQVQsU0FBUyxNQUFULEdBQTBDO0FBQUEsUUFBMUIsRUFBMEIsdUVBQXJCLFVBQVUsU0FBVzs7QUFDckQsV0FBTyxDQUFDLFVBQVUsSUFBVixDQUFlLEVBQWYsQ0FBRCxJQUF1QixDQUFDLFNBQVMsSUFBVCxDQUFjLEVBQWQsQ0FBeEIsSUFBNkMsU0FBUyxJQUFULENBQWMsRUFBZCxDQUFwRDtBQUNIOzs7Ozs7OztBQ0ZELElBQU0sS0FBSyxVQUFVLFNBQXJCOztBQUVBLElBQU0sT0FBTyxTQUFQLElBQU87QUFBQSxXQUFNLFNBQVEsSUFBUixDQUFhLEVBQWI7QUFBTjtBQUFBLENBQWI7QUFDQSxJQUFNLE9BQU8sU0FBUCxJQUFPO0FBQUEsV0FBTSxTQUFRLElBQVIsQ0FBYSxFQUFiO0FBQU47QUFBQSxDQUFiO0FBQ0EsSUFBTSxTQUFTLFNBQVQsTUFBUztBQUFBLFdBQU0sV0FBVSxJQUFWLENBQWUsRUFBZjtBQUFOO0FBQUEsQ0FBZjtBQUNBLElBQU0sU0FBUyxTQUFULE1BQVM7QUFBQSxXQUFNLENBQUMsQ0FBQyxHQUFHLEtBQUgsQ0FBUyx3RkFBVCxDQUFSO0FBQUEsQ0FBZjtBQUNBLElBQU0sVUFBVSxTQUFWLE9BQVU7QUFBQSxXQUFNLENBQUMsUUFBUDtBQUFBLENBQWhCOztrQkFFZTtBQUNYLG9CQURXO0FBRVgsY0FGVztBQUdYLGtCQUhXO0FBSVgsY0FKVztBQUtYO0FBTFcsQzs7Ozs7Ozs7O0FDUmY7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNLFFBQVEsNEJBQWQ7O2tCQUVlO0FBQ1gsOEJBRFc7QUFFWCw0QkFGVztBQUdYLG9CQUhXO0FBSVgsZ0NBSlc7QUFLWCw0QkFMVztBQU1YO0FBTlcsQzs7Ozs7Ozs7a0JDVFMsVztBQUFULFNBQVMsV0FBVCxHQUF1QjtBQUNsQyxXQUFPLDJDQUEwQyxJQUExQyxDQUErQyxPQUFPLFFBQVAsQ0FBZ0IsSUFBL0Q7QUFBUDtBQUNIOzs7Ozs7Ozs7a0JDRmMsWUFBbUM7QUFBQSxRQUExQixFQUEwQix1RUFBckIsVUFBVSxTQUFXOztBQUM5QyxXQUFPLFlBQVcsSUFBWCxDQUFnQixFQUFoQjtBQUFQO0FBQ0gsQzs7Ozs7Ozs7Ozs7a0JDQXVCLGM7O0FBRnhCOzs7Ozs7QUFFZSxTQUFTLGNBQVQsR0FBa0Q7QUFBQSxRQUExQixFQUEwQix1RUFBckIsVUFBVSxTQUFXOztBQUM3RCxRQUFJLENBQUMsdUJBQVEsRUFBUixDQUFMLEVBQWtCO0FBQ2QsZUFBTyxDQUFQO0FBQ0g7QUFDRCxRQUFNLFVBQVUsR0FBRyxLQUFILENBQVMsMEJBQVQsRUFBcUMsQ0FBckMsQ0FBaEI7O0FBSjZELHlCQUs5QyxRQUFRLEtBQVIsQ0FBYyxHQUFkLENBTDhDO0FBQUE7QUFBQSxRQUt0RCxDQUxzRDtBQUFBLFFBS25ELENBTG1EOztBQU03RCxXQUFPLFdBQWMsQ0FBZCxTQUFtQixDQUFuQixDQUFQO0FBQ0g7Ozs7Ozs7OztBQ1REOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztrQkFFZTtBQUNYLDhCQURXO0FBRVgsNENBRlc7QUFHWCxzQkFIVztBQUlYLG9DQUpXO0FBS1gsMEJBTFc7QUFNWCxzQkFOVztBQU9YLDhCQVBXO0FBUVg7QUFSVyxDOzs7Ozs7OztrQkNUUyxHO0FBQVQsU0FBUyxHQUFULEdBQXVDO0FBQUEsUUFBMUIsRUFBMEIsdUVBQXJCLFVBQVUsU0FBVzs7QUFDbEQsV0FBTyxtQkFBa0IsSUFBbEIsQ0FBdUIsRUFBdkI7QUFBUDtBQUNIOzs7Ozs7Ozs7OztrQkNBdUIsVTs7QUFGeEI7Ozs7OztBQUVlLFNBQVMsVUFBVCxHQUE4QztBQUFBLFFBQTFCLEVBQTBCLHVFQUFyQixVQUFVLFNBQVc7O0FBQ3pELFFBQUksbUJBQUksRUFBSixDQUFKLEVBQWE7QUFBQSx3QkFDUSxHQUFHLEtBQUgsQ0FBUyxpQkFBVCxDQURSO0FBQUE7QUFBQSxZQUNBLENBREE7QUFBQSxZQUNHLENBREg7O0FBRVQsWUFBSSxLQUFLLENBQVQsRUFBWTtBQUNSLG1CQUFPLFdBQWMsQ0FBZCxTQUFtQixDQUFuQixDQUFQO0FBQ0g7QUFDSjtBQUNELFdBQU8sQ0FBUDtBQUNIOzs7Ozs7OztrQkNSdUIsSzs7QUFGeEI7Ozs7OztBQUVlLFNBQVMsS0FBVCxHQUF5QztBQUFBLFFBQTFCLEVBQTBCLHVFQUFyQixVQUFVLFNBQVc7O0FBQ3BELFdBQU8sQ0FBQyx1QkFBUSxFQUFSLENBQUQsSUFBZ0IsUUFBUSxJQUFSLENBQWEsRUFBYixDQUF2QjtBQUNIOzs7Ozs7OztrQkNGdUIsRzs7QUFGeEI7Ozs7OztBQUVlLFNBQVMsR0FBVCxHQUF1QztBQUFBLFFBQTFCLEVBQTBCLHVFQUFyQixVQUFVLFNBQVc7O0FBQ2xELFdBQU8sQ0FBQyxtQkFBSSxFQUFKLENBQUQsSUFBWSxTQUFTLElBQVQsQ0FBYyxFQUFkLENBQW5CO0FBQ0g7Ozs7Ozs7O2tCQ0Z1QixPOztBQUZ4Qjs7Ozs7O0FBRWUsU0FBUyxPQUFULEdBQTJDO0FBQUEsUUFBMUIsRUFBMEIsdUVBQXJCLFVBQVUsU0FBVzs7QUFDdEQsV0FBTyxDQUFDLDRCQUFhLEVBQWIsQ0FBRCxJQUFxQixVQUFVLElBQVYsQ0FBZSxFQUFmLENBQTVCO0FBQ0g7Ozs7Ozs7O2tCQ0p1QixZO0FBQVQsU0FBUyxZQUFULEdBQWdEO0FBQUEsUUFBMUIsRUFBMEIsdUVBQXJCLFVBQVUsU0FBVzs7QUFDM0QsV0FBTyxrQkFBaUIsSUFBakIsQ0FBc0IsRUFBdEI7QUFBUDtBQUNIOzs7Ozs7OztBQ0ZEO0FBQ0EsSUFBTSxTQUFTLFNBQVQsTUFBUztBQUFBLFdBQU0sS0FBSyxHQUFMLENBQVMsT0FBTyxXQUFoQixFQUE2QixPQUFPLE1BQVAsQ0FBYyxNQUEzQyxDQUFOO0FBQUEsQ0FBZjtBQUNBLElBQU0sUUFBUSxTQUFSLEtBQVE7QUFBQSxXQUFNLEtBQUssR0FBTCxDQUFTLE9BQU8sVUFBaEIsRUFBNEIsT0FBTyxNQUFQLENBQWMsS0FBMUMsQ0FBTjtBQUFBLENBQWQ7QUFDQSxJQUFNLE1BQU0sU0FBTixHQUFNO0FBQUEsV0FBTSxPQUFPLGdCQUFQLElBQTJCLENBQWpDO0FBQUEsQ0FBWjtBQUNBLElBQU0sU0FBUyxTQUFULE1BQVM7QUFBQSxXQUFNLFFBQVEsQ0FBZDtBQUFBLENBQWY7O2tCQUVlO0FBQ1gsZ0JBRFc7QUFFWCxrQkFGVztBQUdYLFlBSFc7QUFJWDtBQUpXLEM7Ozs7Ozs7OztrQkNOQTtBQUFBLFNBQU0sQ0FBQyxDQUFDLE9BQU8sc0JBQWY7QUFBQSxDOzs7Ozs7Ozs7QUNBZjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O2tCQUVlO0FBQ1gsMEJBRFc7QUFFWCx3QkFGVztBQUdYLHFCQUhXO0FBSVg7QUFKVyxDOzs7Ozs7OztBQ0xmLElBQU0sVUFBVSxTQUFTLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBaEI7O2tCQUNlO0FBQUEsU0FBTSxDQUFDLEVBQUUsUUFBUSxXQUFSLElBQXVCLFFBQVEsV0FBUixDQUFvQiw0Q0FBcEIsQ0FBekIsQ0FBUDtBQUFBLEM7Ozs7Ozs7O2tCQ0RTLEs7QUFBVCxTQUFTLEtBQVQsR0FBaUI7QUFDNUIsUUFBSTtBQUNBLFlBQU0sU0FBUyxTQUFTLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBZjtBQUNBLFlBQU0sVUFBVSxPQUFPLFVBQVAsQ0FBa0IsT0FBbEIsS0FBOEIsT0FBTyxVQUFQLENBQWtCLG9CQUFsQixDQUE5QztBQUNBLGVBQU8sQ0FBQyxFQUFFLE9BQU8scUJBQVAsSUFBZ0MsT0FBbEMsQ0FBUjtBQUNILEtBSkQsQ0FJRSxPQUFPLENBQVAsRUFBVTtBQUNSLGVBQU8sS0FBUDtBQUNIO0FBQ0o7Ozs7Ozs7O0FDUkQsSUFBTSxVQUFVLFNBQVMsYUFBVCxDQUF1QixPQUF2QixDQUFoQjs7a0JBQ2U7QUFBQSxTQUFNLENBQUMsRUFBRSxRQUFRLFdBQVIsSUFBdUIsUUFBUSxXQUFSLENBQW9CLGtDQUFwQixDQUF6QixDQUFQO0FBQUEsQzs7Ozs7QUNEZjs7Ozs7QUFLQyxhQUFXOztBQUVSLFFBQUksY0FBYyxTQUFTLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBbEI7O0FBRUEsZ0JBQVksU0FBWixDQUFzQixHQUF0QixDQUEwQixJQUExQixFQUFnQyxJQUFoQzs7QUFFQTtBQUNBO0FBQ0EsUUFBSSxDQUFDLFlBQVksU0FBWixDQUFzQixRQUF0QixDQUErQixJQUEvQixDQUFMLEVBQTJDO0FBQUEsWUFDOUIsWUFEOEIsR0FDdkMsU0FBUyxZQUFULENBQXNCLE1BQXRCLEVBQThCO0FBQzFCLGdCQUFNLFdBQVcsT0FBTyxZQUFQLENBQW9CLFNBQXBCLENBQThCLE1BQTlCLENBQWpCOztBQUVBLG1CQUFPLFlBQVAsQ0FBb0IsU0FBcEIsQ0FBOEIsTUFBOUIsSUFBd0MsVUFBUyxLQUFULEVBQWdCO0FBQ3BELG9CQUFJLFVBQUo7QUFDQSxvQkFBTSxNQUFNLFVBQVUsTUFBdEI7O0FBRUEscUJBQUssSUFBSSxDQUFULEVBQVksSUFBSSxHQUFoQixFQUFxQixHQUFyQixFQUEwQjtBQUN0Qiw0QkFBUSxVQUFVLENBQVYsQ0FBUjtBQUNBLDZCQUFTLElBQVQsQ0FBYyxJQUFkLEVBQW9CLEtBQXBCO0FBQ0g7QUFDSixhQVJEO0FBU0gsU0Fic0M7O0FBY3ZDLHFCQUFhLEtBQWI7QUFDQSxxQkFBYSxRQUFiO0FBQ0g7O0FBRUQsZ0JBQVksU0FBWixDQUFzQixNQUF0QixDQUE2QixJQUE3QixFQUFtQyxLQUFuQzs7QUFFQTtBQUNBO0FBQ0EsUUFBSSxZQUFZLFNBQVosQ0FBc0IsUUFBdEIsQ0FBK0IsSUFBL0IsQ0FBSixFQUEwQztBQUN0QyxZQUFNLFNBQVMsT0FBTyxZQUFQLENBQW9CLFNBQXBCLENBQThCLE1BQTdDOztBQUVBLGVBQU8sWUFBUCxDQUFvQixTQUFwQixDQUE4QixNQUE5QixHQUF1QyxVQUFTLEtBQVQsRUFBZ0IsS0FBaEIsRUFBdUI7QUFDMUQsb0JBQVEsQ0FBQyxDQUFDLEtBQVY7QUFDQSxnQkFBSSxVQUFVLE1BQVYsR0FBbUIsQ0FBbkIsSUFBd0IsS0FBSyxRQUFMLENBQWMsS0FBZCxNQUF5QixLQUFyRCxFQUE0RDtBQUN4RCx1QkFBTyxLQUFQO0FBQ0gsYUFGRCxNQUVPO0FBQ0gsdUJBQU8sT0FBTyxJQUFQLENBQVksSUFBWixFQUFrQixLQUFsQixDQUFQO0FBQ0g7QUFDSixTQVBEO0FBUUg7O0FBRUQsa0JBQWMsSUFBZDtBQUNILENBNUNBLEdBQUQ7Ozs7O0FDTEMsV0FBUyxFQUFULEVBQWE7QUFDVixXQUFPLE9BQVAsR0FBaUIsT0FBTyxPQUFQLElBQWtCLEVBQW5DO0FBQ0EsUUFBTSxVQUFVLENBQ1osUUFEWSxFQUVaLE9BRlksRUFHWixPQUhZLEVBSVosT0FKWSxFQUtaLEtBTFksRUFNWixRQU5ZLEVBT1osT0FQWSxFQVFaLE9BUlksRUFTWixnQkFUWSxFQVVaLFVBVlksRUFXWixNQVhZLEVBWVosS0FaWSxFQWFaLGNBYlksRUFjWixRQWRZLEVBZVosU0FmWSxFQWdCWixZQWhCWSxFQWlCWixPQWpCWSxFQWtCWixNQWxCWSxFQW1CWixTQW5CWSxFQW9CWixXQXBCWSxFQXFCWixVQXJCWSxFQXNCWixhQXRCWSxFQXVCWixPQXZCWSxFQXdCWixNQXhCWSxDQUFoQjtBQTBCQSxZQUFRLE9BQVIsQ0FBZ0IsVUFBQyxJQUFELEVBQVU7QUFDdEIsZUFBTyxPQUFQLENBQWUsSUFBZixJQUF1QixPQUFPLE9BQVAsQ0FBZSxJQUFmLEtBQXdCLEVBQS9DO0FBQ0gsS0FGRDtBQUdILENBL0JBLEVBK0JDLFlBQVcsQ0FBRSxDQS9CZCxDQUFEOzs7OztBQ0FBOztBQUNBOztBQUNBOzs7OztBQ0ZBOzs7O0FBSUMsYUFBVztBQUNSLFFBQUksQ0FBQyxPQUFPLHFCQUFaLEVBQW1DO0FBQy9CLFlBQU0sVUFBVSxDQUFDLElBQUQsRUFBTyxLQUFQLEVBQWMsUUFBZCxFQUF3QixHQUF4QixDQUFoQjtBQUNBLGFBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxRQUFRLE1BQVosSUFBc0IsQ0FBQyxPQUFPLHFCQUE5QyxFQUFxRSxFQUFFLENBQXZFLEVBQTBFO0FBQ3RFLG1CQUFPLHFCQUFQLEdBQStCLE9BQU8sUUFBUSxDQUFSLElBQWEsdUJBQXBCLENBQS9CO0FBQ0EsbUJBQU8sb0JBQVAsR0FBOEIsT0FBTyxRQUFRLENBQVIsSUFBYSxzQkFBcEIsS0FBK0MsT0FBTyxRQUFRLENBQVIsSUFDaEYsNkJBRHlFLENBQTdFO0FBRUg7QUFDSjtBQUNKLENBVEEsR0FBRDs7Ozs7Ozs7a0JDSndCLEs7QUFBVCxTQUFTLEtBQVQsQ0FBZSxHQUFmLEVBQTBEO0FBQUEsUUFBdEMsS0FBc0MsdUVBQTlCLEdBQThCO0FBQUEsUUFBekIsTUFBeUIsdUVBQWhCLEdBQWdCO0FBQUEsUUFBWCxJQUFXLHVFQUFKLEVBQUk7O0FBQ3JFLFFBQU0sT0FBTyxDQUFDLE9BQU8sTUFBUCxDQUFjLEtBQWQsR0FBc0IsS0FBdkIsSUFBZ0MsQ0FBN0M7QUFDQSxRQUFNLE1BQU0sQ0FBQyxPQUFPLE1BQVAsQ0FBYyxNQUFkLEdBQXVCLE1BQXhCLElBQWtDLENBQTlDO0FBQ0E7QUFDQTtBQUNBLFFBQU0sV0FBVyx1RkFBakI7QUFDQSxRQUFNLG9CQUFrQixLQUFsQixnQkFBa0MsTUFBbEMsYUFBZ0QsR0FBaEQsY0FBNEQsSUFBNUQsU0FBb0UsUUFBMUU7QUFDQSxRQUFNLE1BQU0sT0FBTyxJQUFQLENBQVksR0FBWixFQUFpQixJQUFqQixFQUF1QixNQUF2QixDQUFaO0FBQ0EsUUFBSSxRQUFRLElBQVIsSUFBZ0IsT0FBTyxHQUFQLEtBQWUsV0FBbkMsRUFBZ0Q7QUFDNUMsZUFBTyxLQUFQO0FBQ0g7QUFDRCxRQUFJLE9BQU8sS0FBWCxFQUFrQjtBQUNkLFlBQUksS0FBSjtBQUNIO0FBQ0QsV0FBTyxJQUFQO0FBQ0g7Ozs7Ozs7Ozs7Ozs7SUNkSyxJO0FBQ0Ysa0JBQVksTUFBWixFQUFvQixLQUFwQixFQUEyQixRQUEzQixFQUFxQyxXQUFyQyxFQUFrRDtBQUFBOztBQUM5QyxhQUFLLE9BQUwsR0FBZSxNQUFmO0FBQ0EsYUFBSyxNQUFMLEdBQWMsS0FBZDtBQUNBLGFBQUssU0FBTCxHQUFpQixRQUFqQjtBQUNBLGFBQUssWUFBTCxHQUFvQixXQUFwQjs7QUFFQSxhQUFLLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSxhQUFLLEtBQUwsR0FBYSxFQUFiO0FBQ0g7Ozs7K0JBRU0sSSxFQUFNO0FBQ1QsZ0JBQUksS0FBSyxLQUFMLENBQVcsTUFBZixFQUF1QjtBQUNuQixvQkFBTSxRQUFRLEtBQUssVUFBTCxDQUFnQixJQUFoQixDQUFkO0FBQ0EscUJBQUssS0FBTCxDQUFXLEtBQVgsRUFBa0IsTUFBbEIsQ0FBeUIsSUFBekI7QUFDQTtBQUNIOztBQUVELGlCQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLElBQW5COztBQUVBLGdCQUFJLEVBQUUsS0FBSyxNQUFMLElBQWUsS0FBSyxTQUF0QixLQUFvQyxLQUFLLFFBQUwsQ0FBYyxNQUFkLEdBQXVCLEtBQUssWUFBcEUsRUFBa0Y7O0FBRTlFLHFCQUFLLFNBQUw7O0FBRUEscUJBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxLQUFLLFFBQUwsQ0FBYyxNQUFsQyxFQUEwQyxHQUExQyxFQUErQztBQUMzQyx5QkFBSyxNQUFMLENBQVksS0FBSyxRQUFMLENBQWMsQ0FBZCxDQUFaO0FBQ0g7O0FBRUQscUJBQUssUUFBTCxDQUFjLE1BQWQsR0FBdUIsQ0FBdkI7QUFDSDtBQUNKOzs7aUNBRVEsSSxFQUFNO0FBQ1gsZ0JBQUksS0FBSyxLQUFMLENBQVcsTUFBZixFQUF1QjtBQUNuQixvQkFBTSxRQUFRLEtBQUssVUFBTCxDQUFnQixJQUFoQixDQUFkO0FBQ0EsdUJBQU8sS0FBSyxLQUFMLENBQVcsS0FBWCxFQUFrQixRQUFsQixDQUEyQixJQUEzQixDQUFQO0FBQ0g7O0FBRUQsbUJBQU8sS0FBSyxRQUFaO0FBQ0g7OzttQ0FFVSxJLEVBQU07QUFBQSwwQkFDaUIsS0FBSyxPQUR0QjtBQUFBLGdCQUNOLENBRE0sV0FDTixDQURNO0FBQUEsZ0JBQ0gsQ0FERyxXQUNILENBREc7QUFBQSxnQkFDQSxLQURBLFdBQ0EsS0FEQTtBQUFBLGdCQUNPLE1BRFAsV0FDTyxNQURQOzs7QUFHYixnQkFBTSxRQUFRLEtBQUssQ0FBTCxHQUFTLElBQUksUUFBUSxDQUFuQztBQUNBLGdCQUFNLFNBQVMsS0FBSyxDQUFMLEdBQVMsSUFBSSxTQUFTLENBQXJDOztBQUVBLGdCQUFJLGNBQUo7O0FBRUEsZ0JBQUksS0FBSixFQUFXO0FBQ1Asd0JBQVEsU0FBUyxLQUFLLEVBQWQsR0FBbUIsS0FBSyxFQUFoQztBQUNILGFBRkQsTUFFTztBQUNILHdCQUFRLFNBQVMsS0FBSyxFQUFkLEdBQW1CLEtBQUssRUFBaEM7QUFDSDs7QUFFRCxtQkFBTyxLQUFQO0FBQ0g7OztvQ0FFVztBQUNSLGdCQUFNLFFBQVEsS0FBSyxNQUFMLEdBQWMsQ0FBNUI7O0FBRFEsMkJBR3NCLEtBQUssT0FIM0I7QUFBQSxnQkFHRCxDQUhDLFlBR0QsQ0FIQztBQUFBLGdCQUdFLENBSEYsWUFHRSxDQUhGO0FBQUEsZ0JBR0ssS0FITCxZQUdLLEtBSEw7QUFBQSxnQkFHWSxNQUhaLFlBR1ksTUFIWjs7QUFJUixnQkFBTSxJQUFJLFFBQVEsQ0FBbEI7QUFDQSxnQkFBTSxJQUFJLFNBQVMsQ0FBbkI7O0FBRUEsaUJBQUssS0FBTCxDQUFXLEtBQUssRUFBaEIsSUFBc0IsSUFBSSxJQUFKLENBQVM7QUFDM0Isb0JBRDJCO0FBRTNCLG9CQUYyQjtBQUczQix1QkFBTyxDQUhvQjtBQUkzQix3QkFBUTtBQUptQixhQUFULEVBTXRCLEtBTnNCLEVBTWYsS0FBSyxTQU5VLEVBTUMsS0FBSyxZQU5OLENBQXRCOztBQVFBLGlCQUFLLEtBQUwsQ0FBVyxLQUFLLEVBQWhCLElBQXNCLElBQUksSUFBSixDQUFTO0FBQzNCLG1CQUFHLElBQUksQ0FEb0I7QUFFM0Isb0JBRjJCO0FBRzNCLHVCQUFPLENBSG9CO0FBSTNCLHdCQUFRO0FBSm1CLGFBQVQsRUFNdEIsS0FOc0IsRUFNZixLQUFLLFNBTlUsRUFNQyxLQUFLLFlBTk4sQ0FBdEI7O0FBUUEsaUJBQUssS0FBTCxDQUFXLEtBQUssRUFBaEIsSUFBc0IsSUFBSSxJQUFKLENBQVM7QUFDM0Isb0JBRDJCO0FBRTNCLG1CQUFHLElBQUksQ0FGb0I7QUFHM0IsdUJBQU8sQ0FIb0I7QUFJM0Isd0JBQVE7QUFKbUIsYUFBVCxFQU10QixLQU5zQixFQU1mLEtBQUssU0FOVSxFQU1DLEtBQUssWUFOTixDQUF0Qjs7QUFRQSxpQkFBSyxLQUFMLENBQVcsS0FBSyxFQUFoQixJQUFzQixJQUFJLElBQUosQ0FBUztBQUMzQixtQkFBRyxJQUFJLENBRG9CO0FBRTNCLG1CQUFHLElBQUksQ0FGb0I7QUFHM0IsdUJBQU8sQ0FIb0I7QUFJM0Isd0JBQVE7QUFKbUIsYUFBVCxFQU10QixLQU5zQixFQU1mLEtBQUssU0FOVSxFQU1DLEtBQUssWUFOTixDQUF0QjtBQU9IOzs7Z0NBRU87QUFDSixpQkFBSyxRQUFMLENBQWMsTUFBZCxHQUF1QixDQUF2Qjs7QUFFQSxtQkFBTyxLQUFLLEtBQUwsQ0FBVyxNQUFsQixFQUEwQjtBQUN0QixxQkFBSyxLQUFMLENBQVcsR0FBWCxHQUFpQixLQUFqQjtBQUNIO0FBQ0o7Ozs7OztBQUdMLEtBQUssRUFBTCxHQUFVLENBQVY7QUFDQSxLQUFLLEVBQUwsR0FBVSxDQUFWO0FBQ0EsS0FBSyxFQUFMLEdBQVUsQ0FBVjtBQUNBLEtBQUssRUFBTCxHQUFVLENBQVY7O0lBRXFCLFE7QUFDakIsc0JBQVksTUFBWixFQUFxRDtBQUFBLFlBQWpDLFFBQWlDLHVFQUF0QixDQUFDLENBQXFCO0FBQUEsWUFBbEIsV0FBa0IsdUVBQUosQ0FBQyxDQUFHOztBQUFBOztBQUNqRCxhQUFLLElBQUwsR0FBWSxJQUFJLElBQUosQ0FBUyxNQUFULEVBQWlCLENBQWpCLEVBQW9CLFFBQXBCLEVBQThCLFdBQTlCLENBQVo7QUFDSDs7OzsrQkFFTSxJLEVBQU07QUFDVCxnQkFBSSxNQUFNLE9BQU4sQ0FBYyxJQUFkLENBQUosRUFBeUI7QUFDckIscUJBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxLQUFLLE1BQXpCLEVBQWlDLEdBQWpDLEVBQXNDO0FBQ2xDLHlCQUFLLElBQUwsQ0FBVSxNQUFWLENBQWlCLEtBQUssQ0FBTCxDQUFqQjtBQUNIO0FBQ0osYUFKRCxNQUlPO0FBQ0gscUJBQUssSUFBTCxDQUFVLE1BQVYsQ0FBaUIsSUFBakI7QUFDSDtBQUNKOzs7Z0NBRU87QUFDSixpQkFBSyxJQUFMLENBQVUsS0FBVjtBQUNIOzs7aUNBRVEsSSxFQUFNO0FBQ1gsbUJBQU8sS0FBSyxJQUFMLENBQVUsUUFBVixDQUFtQixJQUFuQixDQUFQO0FBQ0g7Ozs7OztrQkFyQmdCLFE7Ozs7Ozs7O2tCQy9HRyxLOztBQUZ4Qjs7Ozs7O0FBRWUsU0FBUyxLQUFULENBQWUsR0FBZixFQUE2QztBQUFBLFFBQXpCLE9BQXlCLHVFQUFmLEVBQWU7QUFBQSxRQUFYLElBQVcsdUVBQUosRUFBSTs7QUFDeEQsVUFBTSxtQkFBbUIsR0FBbkIsQ0FBTjtBQUNBLGNBQVUsbUJBQW1CLE9BQW5CLENBQVY7O0FBRUEsUUFBTSxXQUFXLG1CQUFtQixVQUFuQixDQUFqQjtBQUNBLFdBQU8sWUFBVSxtQkFBbUIsSUFBbkIsQ0FBVixHQUFxQyxRQUFyQyxHQUFrRCxFQUF6RDs7QUFFQSxXQUFPLDBDQUF5QixPQUF6QixjQUF5QyxJQUF6QyxHQUFnRCxHQUFoRCxDQUFQO0FBQ0g7Ozs7Ozs7O2tCQ1J1QixROztBQUZ4Qjs7Ozs7O0FBRWUsU0FBUyxRQUFULENBQWtCLEdBQWxCLEVBQXVCO0FBQ2xDLFVBQU0sbUJBQW1CLEdBQW5CLENBQU47QUFDQSxXQUFPLHVFQUFzRCxHQUF0RCxDQUFQO0FBQ0g7Ozs7Ozs7O2tCQ0h1QixrQjs7QUFGeEI7Ozs7OztBQUVlLFNBQVMsa0JBQVQsQ0FBNEIsS0FBNUIsRUFBbUMsUUFBbkMsRUFBNkMsR0FBN0MsRUFBZ0g7QUFBQSxRQUE5RCxLQUE4RCx1RUFBdEQsRUFBc0Q7QUFBQSxRQUFsRCxLQUFrRCx1RUFBMUMsRUFBMEM7QUFBQSxRQUF0QyxPQUFzQyx1RUFBNUIsRUFBNEI7QUFBQSxRQUF4QixJQUF3Qix1RUFBakIsRUFBaUI7QUFBQSxRQUFiLE1BQWEsdUVBQUosRUFBSTs7QUFDM0gsWUFBUSxtQkFBbUIsS0FBbkIsQ0FBUjtBQUNBLGNBQVUsbUJBQW1CLE9BQW5CLENBQVY7QUFDQSxXQUFPLG1CQUFtQixJQUFuQixDQUFQOztBQUVBLFFBQU0sb0RBQWtELEtBQWxELGdCQUFrRSxNQUFsRSxzQkFBeUYsUUFBL0Y7QUFDQSxRQUFNLG9CQUFrQixLQUFsQixjQUFnQyxHQUFoQyxpQkFBK0MsT0FBL0MscUJBQXNFLElBQXRFLGlCQUFzRixLQUE1Rjs7QUFFQSxXQUFPLCtEQUE4QyxNQUE5QyxTQUF3RCxPQUF4RCxDQUFQO0FBQ0g7Ozs7Ozs7O2tCQ1R1QixVOztBQUZ4Qjs7Ozs7O0FBRWUsU0FBUyxVQUFULENBQW9CLEdBQXBCLEVBQXlCO0FBQ3BDLFVBQU0sbUJBQW1CLEdBQW5CLENBQU47QUFDQSxXQUFPLDREQUEyQyxHQUEzQyxDQUFQO0FBQ0g7Ozs7Ozs7OztBQ0xEOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7a0JBRWU7QUFDWCwwQkFEVztBQUVYLGdDQUZXO0FBR1gsb0RBSFc7QUFJWCxvQ0FKVztBQUtYLGdDQUxXO0FBTVgsa0NBTlc7QUFPWCw0QkFQVztBQVFYLDRCQVJXO0FBU1gsc0JBVFc7QUFVWCw4QkFWVztBQVdYLGtDQVhXO0FBWVgsMEJBWlc7QUFhWDtBQWJXLEM7Ozs7Ozs7O2tCQ1pTLFE7O0FBRnhCOzs7Ozs7QUFFZSxTQUFTLFFBQVQsQ0FBa0IsR0FBbEIsRUFBbUM7QUFBQSxRQUFaLEtBQVksdUVBQUosRUFBSTs7QUFDOUMsVUFBTSxtQkFBbUIsR0FBbkIsQ0FBTjtBQUNBLFlBQVEsbUJBQW1CLEtBQW5CLENBQVI7QUFDQSxXQUFPLDhFQUE2RCxHQUE3RCxlQUEwRSxLQUExRSxDQUFQO0FBQ0g7Ozs7Ozs7O2tCQ0p1QixTOztBQUZ4Qjs7Ozs7O0FBRWUsU0FBUyxTQUFULENBQW1CLEdBQW5CLEVBQXdCLEtBQXhCLEVBQTBDO0FBQUEsUUFBWCxJQUFXLHVFQUFKLEVBQUk7O0FBQ3JELFVBQU0sbUJBQW1CLEdBQW5CLENBQU47QUFDQSxZQUFRLG1CQUFtQixLQUFuQixDQUFSO0FBQ0EsV0FBTyxtQkFBbUIsSUFBbkIsQ0FBUDtBQUNBLFdBQU8sdUVBQXNELEdBQXRELGVBQW1FLEtBQW5FLHFCQUF3RixJQUF4RixDQUFQO0FBQ0g7Ozs7Ozs7O2tCQ0x1QixNOztBQUZ4Qjs7Ozs7O0FBRWUsU0FBUyxNQUFULENBQWdCLEdBQWhCLEVBQWlDO0FBQUEsUUFBWixLQUFZLHVFQUFKLEVBQUk7O0FBQzVDLFVBQU0sbUJBQW1CLEdBQW5CLENBQU47QUFDQSxZQUFRLG1CQUFtQixLQUFuQixDQUFSO0FBQ0EsV0FBTyw0REFBMkMsR0FBM0MsZUFBd0QsS0FBeEQsQ0FBUDtBQUNIOzs7Ozs7OztrQkNKdUIsUzs7QUFGeEI7Ozs7OztBQUVlLFNBQVMsU0FBVCxDQUFtQixHQUFuQixFQUFvQztBQUFBLFFBQVosS0FBWSx1RUFBSixFQUFJOztBQUMvQyxVQUFNLG1CQUFtQixHQUFuQixDQUFOO0FBQ0EsWUFBUSxtQkFBbUIsS0FBbkIsQ0FBUjtBQUNBLFdBQU8sNEVBQTJELEdBQTNELGVBQXdFLEtBQXhFLENBQVA7QUFDSDs7Ozs7Ozs7a0JDTnVCLEc7QUFBVCxTQUFTLEdBQVQsQ0FBYSxHQUFiLEVBQTZCO0FBQUEsUUFBWCxJQUFXLHVFQUFKLEVBQUk7O0FBQ3hDLFVBQU0sbUJBQW1CLEdBQW5CLENBQU47O0FBRUEsUUFBTSxXQUFXLG1CQUFtQixVQUFuQixDQUFqQjtBQUNBLFdBQU8sWUFBVSxtQkFBbUIsSUFBbkIsQ0FBVixHQUFxQyxRQUFyQyxHQUFrRCxFQUF6RDs7QUFFQSxRQUFNLE1BQU0sa0JBQWtCLElBQWxCLENBQXVCLFVBQVUsU0FBakMsQ0FBWjtBQUNBLFFBQU0sUUFBUSxNQUFNLEdBQU4sR0FBWSxHQUExQjs7QUFFQSxXQUFPLFFBQVAsQ0FBZ0IsSUFBaEIsWUFBOEIsS0FBOUIsYUFBMkMsSUFBM0MsR0FBa0QsR0FBbEQ7QUFDSDs7Ozs7Ozs7a0JDUnVCLE87O0FBRnhCOzs7Ozs7QUFFZSxTQUFTLE9BQVQsQ0FBaUIsR0FBakIsRUFBOEQ7QUFBQSxRQUF4QyxJQUF3Qyx1RUFBakMsRUFBaUM7QUFBQSxRQUE3QixRQUE2Qix1RUFBbEIsRUFBa0I7QUFBQSxRQUFkLE9BQWMsdUVBQUosRUFBSTs7QUFDekUsVUFBTSxtQkFBbUIsR0FBbkIsQ0FBTjtBQUNBLFdBQU8sbUJBQW1CLElBQW5CLENBQVA7QUFDQSxlQUFXLG1CQUFtQixRQUFuQixDQUFYO0FBQ0EsY0FBVSxtQkFBbUIsT0FBbkIsQ0FBVjs7QUFFQSxXQUFPLCtEQUE4QyxHQUE5QyxjQUEwRCxJQUExRCxrQkFBMkUsUUFBM0UsaUJBQStGLE9BQS9GLENBQVA7QUFDSDs7Ozs7Ozs7a0JDUHVCLFM7O0FBRnhCOzs7Ozs7QUFFZSxTQUFTLFNBQVQsQ0FBbUIsR0FBbkIsRUFBa0U7QUFBQSxRQUExQyxLQUEwQyx1RUFBbEMsRUFBa0M7QUFBQSxRQUE5QixXQUE4Qix1RUFBaEIsRUFBZ0I7QUFBQSxRQUFaLEtBQVksdUVBQUosRUFBSTs7QUFDN0UsVUFBTSxtQkFBbUIsR0FBbkIsQ0FBTjtBQUNBLFlBQVEsbUJBQW1CLEtBQW5CLENBQVI7QUFDQSxrQkFBYyxtQkFBbUIsV0FBbkIsQ0FBZDtBQUNBLFlBQVEsbUJBQW1CLEtBQW5CLENBQVI7QUFDQSxXQUFPLDREQUEyQyxHQUEzQyxlQUF3RCxLQUF4RCxxQkFBNkUsV0FBN0UsZUFBa0csS0FBbEcsQ0FBUDtBQUNIOzs7Ozs7OztrQkNOdUIsSzs7QUFGeEI7Ozs7OztBQUVlLFNBQVMsS0FBVCxDQUFlLEdBQWYsRUFBNEM7QUFBQSxRQUF4QixLQUF3Qix1RUFBaEIsRUFBZ0I7QUFBQSxRQUFaLEtBQVksdUVBQUosRUFBSTs7QUFDdkQsVUFBTSxtQkFBbUIsR0FBbkIsQ0FBTjtBQUNBLFlBQVEsbUJBQW1CLEtBQW5CLENBQVI7QUFDQSxZQUFRLG1CQUFtQixLQUFuQixDQUFSOztBQUVBLFFBQU0sa0JBQWdCLEdBQWhCLHVCQUFxQyxLQUFyQyxhQUFrRCxLQUFsRCwrQkFBTjtBQUNBLFdBQU8sbUVBQWtELE1BQWxELENBQVA7QUFDSDs7Ozs7Ozs7a0JDVHVCLFE7QUFBVCxTQUFTLFFBQVQsQ0FBa0IsR0FBbEIsRUFBa0M7QUFBQSxRQUFYLElBQVcsdUVBQUosRUFBSTs7QUFDN0MsVUFBTSxtQkFBbUIsR0FBbkIsQ0FBTjs7QUFFQSxRQUFNLFdBQVcsbUJBQW1CLFVBQW5CLENBQWpCO0FBQ0EsV0FBTyxZQUFVLG1CQUFtQixJQUFuQixDQUFWLEdBQXFDLFFBQXJDLEdBQWtELEVBQXpEOztBQUVBLFdBQU8sUUFBUCxDQUFnQixJQUFoQiw2QkFBK0MsSUFBL0MsR0FBc0QsR0FBdEQ7QUFDSDs7Ozs7Ozs7QUNQRCxTQUFTLElBQVQsQ0FBYyxHQUFkLEVBQW1CO0FBQ2YsUUFBSSxPQUFPLElBQVg7O0FBRUEsUUFBSTtBQUNBLGVBQU8sYUFBYSxPQUFiLENBQXFCLEdBQXJCLENBQVA7QUFDSCxLQUZELENBRUUsT0FBTyxHQUFQLEVBQVksQ0FBRTs7QUFFaEIsV0FBTyxJQUFQO0FBQ0g7O0FBRUQsU0FBUyxJQUFULENBQWMsR0FBZCxFQUFtQixJQUFuQixFQUF5QjtBQUNyQixRQUFJO0FBQ0EscUJBQWEsT0FBYixDQUFxQixHQUFyQixFQUEwQixJQUExQjtBQUNBLGVBQU8sSUFBUDtBQUNILEtBSEQsQ0FHRSxPQUFPLEdBQVAsRUFBWTtBQUNWLGdCQUFRLEtBQVIsQ0FBYyxnQ0FBZDtBQUNIO0FBQ0QsV0FBTyxLQUFQO0FBQ0g7O0FBRUQsU0FBUyxRQUFULENBQWtCLEdBQWxCLEVBQXVCO0FBQ25CLFFBQU0sT0FBTyxLQUFLLEdBQUwsQ0FBYjtBQUNBLFdBQU8sT0FBTyxLQUFLLEtBQUwsQ0FBVyxJQUFYLENBQVAsR0FBMEIsSUFBakM7QUFDSDs7QUFFRCxTQUFTLFFBQVQsQ0FBa0IsR0FBbEIsRUFBdUIsSUFBdkIsRUFBNkI7QUFDekIsV0FBTyxLQUFLLEdBQUwsRUFBVSxLQUFLLFNBQUwsQ0FBZSxJQUFmLENBQVYsQ0FBUDtBQUNIOztBQUVELFNBQVMsTUFBVCxDQUFnQixHQUFoQixFQUFxQjtBQUNqQixRQUFJO0FBQ0EscUJBQWEsVUFBYixDQUF3QixHQUF4QjtBQUNILEtBRkQsQ0FFRSxPQUFPLEdBQVAsRUFBWSxDQUFFO0FBQ25COztrQkFFYyxFQUFDLFVBQUQsRUFBTyxVQUFQLEVBQWEsa0JBQWIsRUFBdUIsa0JBQXZCLEVBQWlDLGNBQWpDLEU7Ozs7Ozs7O2tCQ2xDUyxVO0FBRHhCO0FBQ2UsU0FBUyxVQUFULENBQW9CLEdBQXBCLEVBQXlCLE1BQXpCLEVBQWlDO0FBQzVDLFFBQUksUUFBUSxJQUFJLE9BQUosQ0FBWSxNQUFaLENBQVo7QUFDQSxRQUFJLFVBQVUsQ0FBQyxDQUFmLEVBQWtCO0FBQ2QsZUFBTyxFQUFQO0FBQ0g7QUFDRCxhQUFTLE9BQU8sTUFBaEI7QUFDQSxXQUFPLElBQUksS0FBSixDQUFVLEtBQVYsQ0FBUDtBQUNIOzs7Ozs7OztrQkNQdUIsUztBQUR4QjtBQUNlLFNBQVMsU0FBVCxDQUFtQixHQUFuQixFQUF3QixNQUF4QixFQUFnQztBQUMzQyxRQUFJLFFBQVEsSUFBSSxXQUFKLENBQWdCLE1BQWhCLENBQVo7QUFDQSxRQUFJLFVBQVUsQ0FBQyxDQUFmLEVBQWtCO0FBQ2QsZUFBTyxFQUFQO0FBQ0g7QUFDRCxhQUFTLE9BQU8sTUFBaEI7QUFDQSxXQUFPLElBQUksS0FBSixDQUFVLEtBQVYsQ0FBUDtBQUNIOzs7Ozs7OztrQkNQdUIsVztBQUR4QjtBQUNlLFNBQVMsV0FBVCxDQUFxQixHQUFyQixFQUEwQixNQUExQixFQUFrQztBQUM3QyxRQUFNLFFBQVEsSUFBSSxPQUFKLENBQVksTUFBWixDQUFkO0FBQ0EsUUFBSSxVQUFVLENBQUMsQ0FBZixFQUFrQjtBQUNkLGVBQU8sRUFBUDtBQUNIO0FBQ0QsV0FBTyxJQUFJLEtBQUosQ0FBVSxDQUFWLEVBQWEsS0FBYixDQUFQO0FBQ0g7Ozs7Ozs7O2tCQ051QixVO0FBRHhCO0FBQ2UsU0FBUyxVQUFULENBQW9CLEdBQXBCLEVBQXlCLE1BQXpCLEVBQWlDO0FBQzVDLFFBQU0sUUFBUSxJQUFJLFdBQUosQ0FBZ0IsTUFBaEIsQ0FBZDtBQUNBLFFBQUksVUFBVSxDQUFDLENBQWYsRUFBa0I7QUFDZCxlQUFPLEVBQVA7QUFDSDtBQUNELFdBQU8sSUFBSSxLQUFKLENBQVUsQ0FBVixFQUFhLEtBQWIsQ0FBUDtBQUNIOzs7Ozs7OztrQkNOdUIsVTtBQUR4QjtBQUNlLFNBQVMsVUFBVCxDQUFvQixHQUFwQixFQUF5QixNQUF6QixFQUFpQztBQUM1QyxXQUFPLElBQUksT0FBSixDQUFZLE1BQVosTUFBd0IsQ0FBL0I7QUFDSDs7Ozs7Ozs7a0JDRnVCLE87QUFEeEI7QUFDZSxTQUFTLE9BQVQsQ0FBaUIsR0FBakIsRUFBc0IsS0FBdEIsRUFBNkIsR0FBN0IsRUFBa0M7QUFDN0MsUUFBSSxTQUFTLEVBQWI7QUFDQSxRQUFJLGFBQWEsSUFBSSxPQUFKLENBQVksS0FBWixDQUFqQjtBQUNBLFFBQUksZUFBZSxDQUFDLENBQXBCLEVBQXVCO0FBQ25CLHNCQUFjLE1BQU0sTUFBcEI7QUFDQSxZQUFNLFdBQVcsSUFBSSxPQUFKLENBQVksR0FBWixFQUFpQixVQUFqQixDQUFqQjtBQUNBLFlBQUksYUFBYSxDQUFDLENBQWxCLEVBQXFCO0FBQ2pCLHFCQUFTLElBQUksS0FBSixDQUFVLFVBQVYsRUFBc0IsUUFBdEIsQ0FBVDtBQUNIO0FBQ0o7QUFDRCxXQUFPLE1BQVA7QUFDSDs7Ozs7Ozs7a0JDSnVCLEs7O0FBUnhCOzs7O0FBQ0E7Ozs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNlLFNBQVMsS0FBVCxDQUFlLEdBQWYsRUFBb0IsR0FBcEIsRUFBc0M7QUFBQSxRQUFiLEtBQWEsdUVBQUwsR0FBSzs7QUFDakQsUUFBTSxNQUFNLEVBQVo7O0FBRUEsUUFBSSxDQUFDLEdBQUQsSUFBUSxDQUFDLElBQUksUUFBSixDQUFhLEtBQWIsQ0FBYixFQUFrQztBQUM5QixlQUFPLEdBQVA7QUFDSDs7QUFFRCxRQUFJLFVBQVUsR0FBZCxFQUFtQjtBQUNmLGVBQU8sS0FBUDtBQUNIOztBQUVELFFBQUksV0FBVyxDQUFmO0FBQ0EsUUFBTSxXQUFXLElBQUksTUFBSixDQUFXLE9BQU8sNkJBQWMsS0FBZCxDQUFQLEdBQThCLEtBQXpDLENBQWpCOztBQUVBLFdBQU8sV0FBVyxJQUFJLE1BQXRCLEVBQThCO0FBQzFCLFlBQUksWUFBWSxJQUFJLE1BQUosQ0FBVyxRQUFYLEVBQXFCLEdBQXJCLENBQWhCO0FBQ0EsWUFBSSxDQUFDLFVBQVUsUUFBVixDQUFtQixLQUFuQixDQUFMLEVBQWdDO0FBQzVCLGdCQUFJLElBQUosQ0FBUyx3QkFBUyxTQUFULEVBQW9CLFVBQVUsTUFBOUIsQ0FBVDtBQUNBLHdCQUFZLFVBQVUsTUFBdEI7QUFDSDtBQUNELG9CQUFZLFVBQVUsT0FBVixDQUFrQixRQUFsQixFQUE0QixFQUE1QixDQUFaO0FBQ0Esb0JBQVksVUFBVSxNQUF0QjtBQUNBLFlBQUksSUFBSixDQUFTLFVBQVUsSUFBVixFQUFUO0FBQ0g7QUFDRCxXQUFPLEdBQVA7QUFDSDs7Ozs7Ozs7a0JDaEN1QixVO0FBRHhCO0FBQ2UsU0FBUyxVQUFULENBQW9CLEdBQXBCLEVBQXNDO0FBQUEsUUFBYixHQUFhLHVFQUFQLEtBQU87O0FBQ2pELFFBQU0sU0FBUyxJQUFJLFFBQUosRUFBZjtBQUNBLFFBQU0sS0FBSyxNQUFNLFNBQU4sR0FBa0IsT0FBN0I7QUFDQSxXQUFPLE9BQU8sT0FBUCxDQUFlLEVBQWYsRUFBbUIsVUFBQyxLQUFEO0FBQUEsZUFBVyxNQUFNLFdBQU4sRUFBWDtBQUFBLEtBQW5CLENBQVA7QUFDSDs7Ozs7Ozs7a0JDRnVCLE87O0FBSHhCOzs7Ozs7QUFFQTtBQUNlLFNBQVMsT0FBVCxDQUFpQixHQUFqQixFQUFzQixNQUF0QixFQUE4QixhQUE5QixFQUE2QztBQUN4RCxRQUFNLGFBQWEsNkJBQWMsTUFBZCxDQUFuQjtBQUNBLFFBQU0sUUFBUyxDQUFDLGFBQUYsR0FBbUIsSUFBbkIsR0FBMEIsR0FBeEM7QUFDQSxXQUFPLElBQUksS0FBSixDQUFVLElBQUksTUFBSixDQUFXLFVBQVgsRUFBdUIsS0FBdkIsQ0FBVixFQUF5QyxNQUFoRDtBQUNIOzs7Ozs7OztrQkNKdUIsWTtBQUh4QjtBQUNBO0FBQ0E7QUFDZSxTQUFTLFlBQVQsR0FBZ0Q7QUFBQSxRQUExQixNQUEwQix1RUFBakIsRUFBaUI7QUFBQSxRQUFiLE1BQWEsdUVBQUosRUFBSTs7O0FBRTNELFFBQUksV0FBVyxNQUFmLEVBQXVCO0FBQ25CLGVBQU8sQ0FBUDtBQUNIOztBQUVELFFBQUksQ0FBQyxPQUFPLE1BQVosRUFBb0I7QUFDaEIsZUFBTyxPQUFPLE1BQWQ7QUFDSDs7QUFFRCxRQUFJLENBQUMsT0FBTyxNQUFaLEVBQW9CO0FBQ2hCLGVBQU8sT0FBTyxNQUFkO0FBQ0g7O0FBRUQsUUFBTSxJQUFJLEVBQVY7QUFDQSxRQUFJLFVBQUo7QUFBQSxRQUFPLFVBQVA7QUFBQSxRQUFVLGFBQVY7O0FBRUEsU0FBSyxJQUFJLENBQVQsRUFBWSxLQUFLLE9BQU8sTUFBeEIsRUFBZ0MsR0FBaEMsRUFBcUM7QUFDakMsVUFBRSxDQUFGLElBQU8sRUFBUDtBQUNIO0FBQ0QsU0FBSyxJQUFJLENBQVQsRUFBWSxLQUFLLE9BQU8sTUFBeEIsRUFBZ0MsR0FBaEMsRUFBcUM7QUFDakMsVUFBRSxDQUFGLEVBQUssQ0FBTCxJQUFVLENBQVY7QUFDSDtBQUNELFNBQUssSUFBSSxDQUFULEVBQVksS0FBSyxPQUFPLE1BQXhCLEVBQWdDLEdBQWhDLEVBQXFDO0FBQ2pDLFVBQUUsQ0FBRixFQUFLLENBQUwsSUFBVSxDQUFWO0FBQ0g7O0FBRUQsU0FBSyxJQUFJLENBQVQsRUFBWSxLQUFLLE9BQU8sTUFBeEIsRUFBZ0MsR0FBaEMsRUFBcUM7O0FBRWpDLFlBQU0sS0FBSyxPQUFPLE1BQVAsQ0FBYyxJQUFJLENBQWxCLENBQVg7QUFDQSxhQUFLLElBQUksQ0FBVCxFQUFZLEtBQUssT0FBTyxNQUF4QixFQUFnQyxHQUFoQyxFQUFxQzs7QUFFakMsZ0JBQU0sS0FBSyxPQUFPLE1BQVAsQ0FBYyxJQUFJLENBQWxCLENBQVg7O0FBRUEsZ0JBQUksT0FBTyxFQUFYLEVBQWU7QUFDWCx1QkFBTyxDQUFQO0FBQ0gsYUFGRCxNQUVPO0FBQ0gsdUJBQU8sQ0FBUDtBQUNIOztBQUVELGNBQUUsQ0FBRixFQUFLLENBQUwsSUFBVSxLQUFLLEdBQUwsQ0FBUyxFQUFFLElBQUksQ0FBTixFQUFTLENBQVQsSUFBYyxDQUF2QixFQUEwQixFQUFFLENBQUYsRUFBSyxJQUFJLENBQVQsSUFBYyxDQUF4QyxFQUEyQyxFQUFFLElBQUksQ0FBTixFQUFTLElBQUksQ0FBYixJQUFrQixJQUE3RCxDQUFWO0FBQ0g7QUFDSjs7QUFFRCxXQUFPLEVBQUUsT0FBTyxNQUFULEVBQWlCLE9BQU8sTUFBeEIsQ0FBUDtBQUNIOzs7Ozs7OztrQkMvQ3VCLFE7QUFEeEI7QUFDZSxTQUFTLFFBQVQsQ0FBa0IsR0FBbEIsRUFBdUIsTUFBdkIsRUFBK0I7QUFDMUMsV0FBTyxJQUFJLFdBQUosQ0FBZ0IsTUFBaEIsTUFBNEIsSUFBSSxNQUFKLEdBQWEsT0FBTyxNQUF2RDtBQUNIOzs7Ozs7OztrQkNjdUIsVTtBQWpCeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFNLFlBQVk7QUFDZCxTQUFLLE9BRFM7QUFFZCxTQUFLLE1BRlM7QUFHZCxTQUFLLE1BSFM7QUFJZCxTQUFLLFFBSlM7QUFLZCxVQUFNLE9BTFE7QUFNZCxTQUFLLFFBTlM7QUFPZCxTQUFLLFFBUFM7QUFRZCxTQUFLO0FBUlMsQ0FBbEI7O0FBV2UsU0FBUyxVQUFULENBQW9CLE1BQXBCLEVBQTRCO0FBQ3ZDLFdBQU8sT0FBTyxNQUFQLEVBQ0YsT0FERSxDQUNNLGNBRE4sRUFDc0IsU0FBUyxhQUFULENBQXVCLENBQXZCLEVBQTBCO0FBQy9DLGVBQU8sVUFBVSxDQUFWLENBQVA7QUFDSCxLQUhFLENBQVA7QUFJSDs7Ozs7Ozs7a0JDckJ1QixhO0FBRHhCO0FBQ2UsU0FBUyxhQUFULENBQXVCLE9BQXZCLEVBQWdDO0FBQzNDLFdBQU8sUUFBUSxPQUFSLENBQWdCLHFDQUFoQixFQUF1RCxNQUF2RCxDQUFQO0FBQ0g7Ozs7Ozs7O2tCQ0F1QixPOztBQUh4Qjs7Ozs7O0FBRUE7QUFDZSxTQUFTLE9BQVQsQ0FBaUIsR0FBakIsRUFBc0I7QUFDakMsV0FBTyxDQUFDLENBQUMscUNBQXNCLEdBQXRCLEVBQTJCLE1BQXBDO0FBQ0g7Ozs7Ozs7OztBQ0xEOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O2tCQUVlO0FBQ1gsb0NBRFc7QUFFWCxrQ0FGVztBQUdYLHNDQUhXO0FBSVgsb0NBSlc7QUFLWCxvQ0FMVztBQU1YLDhCQU5XO0FBT1gsMEJBUFc7QUFRWCxvQ0FSVztBQVNYLDhCQVRXO0FBVVgsd0NBVlc7QUFXWCxnQ0FYVztBQVlYLG9DQVpXO0FBYVgsMENBYlc7QUFjWCw4QkFkVztBQWVYLGtDQWZXO0FBZ0JYLDhCQWhCVztBQWlCWCxnQ0FqQlc7QUFrQlgsd0NBbEJXO0FBbUJYLG9DQW5CVztBQW9CWCw0QkFwQlc7QUFxQlgsMERBckJXO0FBc0JYLDhCQXRCVztBQXVCWCx3Q0F2Qlc7QUF3Qlgsb0NBeEJXO0FBeUJYLGtDQXpCVztBQTBCWCxnQ0ExQlc7QUEyQlgsZ0NBM0JXO0FBNEJYLGdDQTVCVztBQTZCWCxnQ0E3Qlc7QUE4Qlg7QUE5QlcsQzs7Ozs7Ozs7a0JDOUJTLFM7QUFEeEI7QUFDZSxTQUFTLFNBQVQsQ0FBbUIsR0FBbkIsRUFBd0I7QUFDbkMsUUFBTSxPQUFPLG1DQUFiO0FBQ0EsV0FBTyxLQUFLLElBQUwsQ0FBVSxHQUFWLENBQVA7QUFDSDs7Ozs7Ozs7a0JDSHVCLE87QUFEeEI7QUFDZSxTQUFTLE9BQVQsQ0FBaUIsR0FBakIsRUFBc0IsTUFBdEIsRUFBOEIsTUFBOUIsRUFBc0M7QUFDakQsVUFBTSxPQUFPLEdBQVAsQ0FBTjtBQUNBLFdBQU8sSUFBSSxNQUFKLEdBQWEsTUFBcEIsRUFBNEI7QUFDeEIsY0FBTSxTQUFTLEdBQWY7QUFDSDtBQUNELFdBQU8sR0FBUDtBQUNIOzs7Ozs7OztrQkNOdUIsUTtBQUR4QjtBQUNlLFNBQVMsUUFBVCxDQUFrQixHQUFsQixFQUF1QixNQUF2QixFQUErQixNQUEvQixFQUF1QztBQUNsRCxVQUFNLE9BQU8sR0FBUCxDQUFOO0FBQ0EsV0FBTyxJQUFJLE1BQUosR0FBYSxNQUFwQixFQUE0QjtBQUN4QixlQUFPLE1BQVA7QUFDSDtBQUNELFdBQU8sR0FBUDtBQUNIOzs7Ozs7OztrQkNQdUIsWTtBQUFULFNBQVMsWUFBVCxDQUFzQixHQUF0QixFQUEyQjtBQUN0QyxVQUFNLElBQUksSUFBSixFQUFOOztBQUVBLFFBQU0sWUFBWSxJQUFJLFdBQUosQ0FBZ0IsR0FBaEIsQ0FBbEI7QUFDQSxRQUFJLFlBQVksQ0FBaEIsRUFBbUI7QUFDZixlQUFVLElBQUksS0FBSixDQUFVLENBQVYsRUFBYSxTQUFiLENBQVYsY0FBMEMsSUFBSSxLQUFKLENBQVUsWUFBWSxDQUF0QixDQUExQztBQUNIOztBQUVELFdBQU8sR0FBUDtBQUNIOzs7Ozs7OztrQkNOdUIsVTs7QUFIeEI7Ozs7OztBQUVBO0FBQ2UsU0FBUyxVQUFULENBQW9CLEdBQXBCLEVBQXlCO0FBQ3BDLFFBQU0sU0FBUyxJQUFJLFdBQUosR0FBa0IsT0FBbEIsQ0FBMEIsY0FBMUIsdUJBQWY7QUFDQSxXQUFPLE9BQU8sT0FBUCxDQUFlLFNBQWYsRUFBMEIsR0FBMUIsQ0FBUDtBQUNIOzs7Ozs7OztrQkNIdUIsTTs7QUFIeEI7Ozs7OztBQUVBO0FBQ2UsU0FBUyxNQUFULENBQWdCLEdBQWhCLEVBQXFCLE1BQXJCLEVBQW9EO0FBQUEsUUFBdkIsYUFBdUIsdUVBQVAsS0FBTzs7QUFDL0QsUUFBTSxhQUFhLDZCQUFjLE1BQWQsQ0FBbkI7QUFDQSxRQUFNLFFBQVEsZ0JBQWdCLEdBQWhCLEdBQXNCLElBQXBDO0FBQ0EsV0FBTyxJQUFJLE9BQUosQ0FBWSxJQUFJLE1BQUosQ0FBVyxVQUFYLEVBQXVCLEtBQXZCLENBQVosRUFBMkMsRUFBM0MsQ0FBUDtBQUNIOzs7Ozs7OztrQkNOdUIscUI7QUFEeEI7QUFDZSxTQUFTLHFCQUFULENBQStCLEdBQS9CLEVBQW9DO0FBQy9DLFdBQU8sSUFBSSxJQUFKLEdBQVcsT0FBWCxDQUFtQixNQUFuQixFQUEyQixHQUEzQixDQUFQO0FBQ0g7Ozs7Ozs7O2tCQ0Z1QixPO0FBRHhCO0FBQ2UsU0FBUyxPQUFULENBQWlCLEdBQWpCLEVBQXNCO0FBQ2pDLFdBQU8sSUFBSSxLQUFKLENBQVUsRUFBVixFQUFjLE9BQWQsR0FBd0IsSUFBeEIsQ0FBNkIsRUFBN0IsQ0FBUDtBQUNIOzs7Ozs7OztrQkNGdUIsWTtBQUR4QjtBQUNlLFNBQVMsWUFBVCxDQUFzQixHQUF0QixFQUEyQjtBQUN0QyxXQUFPLElBQUksS0FBSixDQUFVLEdBQVYsRUFBZSxPQUFmLEdBQXlCLElBQXpCLENBQThCLEdBQTlCLENBQVA7QUFDSDs7Ozs7Ozs7a0JDQXVCLFU7O0FBSHhCOzs7Ozs7QUFFQTtBQUNlLFNBQVMsVUFBVCxDQUFvQixDQUFwQixFQUF1QixDQUF2QixFQUEwQjtBQUNyQyxRQUFNLElBQUksNEJBQWEsQ0FBYixFQUFnQixDQUFoQixDQUFWO0FBQ0EsUUFBTSxJQUFJLEtBQUssR0FBTCxDQUFTLEVBQUUsTUFBWCxFQUFtQixFQUFFLE1BQXJCLENBQVY7QUFDQSxRQUFJLE1BQU0sQ0FBVixFQUFhO0FBQ1QsZUFBTyxDQUFQO0FBQ0g7QUFDRCxXQUFRLElBQUksSUFBSSxDQUFoQjtBQUNIOzs7Ozs7OztrQkNUdUIsUztBQUR4QjtBQUNlLFNBQVMsU0FBVCxDQUFtQixHQUFuQixFQUF3QjtBQUNuQyxXQUFPLElBQUksT0FBSixDQUFZLGVBQVosRUFBNkIsRUFBN0IsQ0FBUDtBQUNIOzs7Ozs7OztrQkNEdUIsUTs7QUFEeEI7QUFDZSxTQUFTLFFBQVQsQ0FBa0IsR0FBbEIsRUFBdUI7QUFDbEMsV0FBTyxJQUFJLE9BQUosQ0FBWSxNQUFaLEVBQW9CLFVBQVMsTUFBVCxFQUFpQjtBQUN4QyxZQUFNLFFBQVEsT0FBTyxXQUFQLEVBQWQ7QUFDQSxZQUFNLFFBQVEsT0FBTyxXQUFQLEVBQWQ7QUFDQSxnQkFBUSxNQUFSO0FBQ0ksaUJBQUssS0FBTDtBQUNJLHVCQUFPLEtBQVA7QUFDSixpQkFBSyxLQUFMO0FBQ0ksdUJBQU8sS0FBUDtBQUNKO0FBQ0ksdUJBQU8sTUFBUDtBQU5SO0FBUUgsS0FYTSxDQUFQO0FBWUg7Ozs7Ozs7O2tCQ2R1QixRO0FBRHhCO0FBQ2UsU0FBUyxRQUFULENBQWtCLE9BQWxCLEVBQXdDO0FBQUEsUUFBYixLQUFhLHVFQUFMLEdBQUs7O0FBQ25ELFFBQU0sSUFBSSxLQUFLLEtBQUwsQ0FBVyxVQUFVLElBQXJCLENBQVY7QUFDQSxRQUFNLElBQUksS0FBSyxLQUFMLENBQVksVUFBVSxJQUFYLEdBQW1CLEVBQTlCLENBQVY7QUFDQSxRQUFNLElBQUksS0FBSyxLQUFMLENBQVksVUFBVSxJQUFYLEdBQW1CLEVBQTlCLENBQVY7QUFDQSxRQUFNLEtBQUssQ0FBQyxJQUFJLEVBQUosR0FBUyxNQUFNLENBQWYsR0FBbUIsQ0FBcEIsSUFBeUIsS0FBcEM7QUFDQSxRQUFNLEtBQUssQ0FBQyxJQUFJLEVBQUosR0FBUyxNQUFNLENBQWYsR0FBbUIsQ0FBcEIsSUFBeUIsS0FBcEM7QUFDQSxRQUFNLEtBQU0sSUFBSSxFQUFKLEdBQVMsTUFBTSxDQUFmLEdBQW1CLENBQS9CO0FBQ0EsV0FBTyxLQUFLLEVBQUwsR0FBVSxFQUFqQjtBQUNIOzs7Ozs7OztrQkNUdUIsUTtBQUFULFNBQVMsUUFBVCxDQUFrQixHQUFsQixFQUF1QjtBQUNsQyxXQUFPLE9BQU8sSUFBSSxPQUFKLENBQVksVUFBWixFQUF3QixFQUF4QixDQUFQLENBQVA7QUFDSDs7Ozs7Ozs7a0JDRHVCLFE7QUFEeEI7QUFDZSxTQUFTLFFBQVQsQ0FBa0IsR0FBbEIsRUFBdUIsR0FBdkIsRUFBNEM7QUFBQSxRQUFoQixNQUFnQix1RUFBUCxLQUFPOztBQUN2RCxXQUFPLE9BQU8sTUFBZDtBQUNBLFFBQUksUUFBUSxHQUFaO0FBQ0EsUUFBSSxNQUFNLE1BQU4sR0FBZSxHQUFuQixFQUF3QjtBQUNwQixnQkFBUSxNQUFNLE1BQU4sQ0FBYSxDQUFiLEVBQWdCLEdBQWhCLENBQVI7QUFDQSxZQUFNLElBQUksT0FBVjtBQUNBLFlBQUksRUFBRSxJQUFGLENBQU8sSUFBSSxNQUFKLENBQVcsR0FBWCxDQUFQLENBQUosRUFBNkI7QUFDekIsb0JBQVEsTUFBTSxPQUFOLENBQWMsV0FBZCxFQUEyQixFQUEzQixFQUErQixTQUEvQixFQUFSO0FBQ0g7QUFDRCxpQkFBUyxNQUFUO0FBQ0g7QUFDRCxXQUFPLEtBQVA7QUFDSDs7Ozs7Ozs7a0JDWnVCLFM7QUFEeEI7QUFDZSxTQUFTLFNBQVQsQ0FBbUIsR0FBbkIsRUFBd0I7QUFDbkMsV0FBTyxJQUFJLEtBQUosQ0FBVSxVQUFWLEVBQXNCLE1BQTdCO0FBQ0g7Ozs7Ozs7OztxakJDSEQ7OztBQUNBOzs7Ozs7OztJQUVxQixNO0FBQ2pCLHNCQUFjO0FBQUE7O0FBQ1YsYUFBSyxNQUFMLEdBQWMsS0FBSyxNQUFMLENBQVksSUFBWixDQUFpQixJQUFqQixDQUFkO0FBQ0E7QUFDQSxhQUFLLFFBQUwsR0FBZ0IsMkJBQWhCOztBQUVBLGFBQUssT0FBTCxHQUFlLEtBQWY7QUFDQSxhQUFLLElBQUwsR0FBWSxDQUFaO0FBQ0E7QUFDQTtBQUNIOzs7O2dDQUVPO0FBQ0osZ0JBQUksS0FBSyxPQUFULEVBQWtCO0FBQ2Q7QUFDSDs7QUFFRCxpQkFBSyxPQUFMLEdBQWUsSUFBZjtBQUNBLGlCQUFLLE1BQUw7QUFDSDs7OytCQUVNO0FBQ0gsZ0JBQUksQ0FBQyxLQUFLLE9BQVYsRUFBbUI7QUFDZjtBQUNIOztBQUVELGlCQUFLLE9BQUwsR0FBZSxLQUFmO0FBQ0g7OztpQ0FFUTtBQUNMLGdCQUFJLENBQUMsS0FBSyxPQUFWLEVBQW1CO0FBQ2Y7QUFDSDs7QUFFRCxtQkFBTyxxQkFBUCxDQUE2QixLQUFLLE1BQWxDOztBQUVBLGdCQUFNLE1BQU0sS0FBSyxHQUFMLEVBQVo7QUFDQSxnQkFBSSxLQUFLLE1BQU0sS0FBSyxJQUFwQjtBQUNBLGdCQUFJLEtBQUssRUFBVCxFQUFhO0FBQ1QscUJBQUssRUFBTDtBQUNIO0FBQ0QsaUJBQUssSUFBTCxHQUFZLEdBQVo7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQUssUUFBTCxDQUFjLFFBQWQsQ0FBdUIsS0FBSyxLQUE1QjtBQUNIOzs7NEJBRUcsRSxFQUFJLE8sRUFBUztBQUNiLG1CQUFPLEtBQUssUUFBTCxDQUFjLEdBQWQsQ0FBa0IsRUFBbEIsRUFBc0IsT0FBdEIsQ0FBUDtBQUNIOzs7K0JBRU0sTyxFQUFTO0FBQ1osaUJBQUssUUFBTCxDQUFjLE1BQWQsQ0FBcUIsT0FBckI7QUFDSDs7QUFFRDtBQUNBO0FBQ0E7Ozs7Ozs7a0JBaEVpQixNOzs7Ozs7OztrQkNIRyxLO0FBQVQsU0FBUyxLQUFULENBQWUsUUFBZixFQUF5QixNQUF6QixFQUFpQyxLQUFqQyxFQUF3QyxLQUF4QyxFQUErQztBQUMxRCxRQUFJLENBQUMsT0FBTyxFQUFaLEVBQWdCO0FBQ1o7QUFDSDtBQUNELFdBQU8sRUFBUCxDQUFVLE1BQVYsRUFBa0IsT0FBbEIsRUFBMkIsUUFBM0IsRUFBcUMsTUFBckMsRUFBNkMsS0FBN0MsRUFBb0QsS0FBcEQ7QUFDSDs7Ozs7Ozs7O0FDTEQ7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7a0JBRWU7QUFDWCwwQkFEVztBQUVYLGdDQUZXO0FBR1g7QUFIVyxDOzs7Ozs7OztrQkNKUyxJO0FBQVQsU0FBUyxJQUFULENBQWMsU0FBZCxFQUF5QjtBQUNwQyxZQUFRLEdBQVIsQ0FBWSw4Q0FBWixFQUE0RCxTQUE1RDs7QUFFQTtBQUNBLEtBQUMsVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCO0FBQUMsVUFBRSx1QkFBRixJQUEyQixDQUEzQixDQUE2QixFQUFFLENBQUYsSUFBSyxFQUFFLENBQUYsS0FBTSxZQUFVO0FBQzlFLGFBQUMsRUFBRSxDQUFGLEVBQUssQ0FBTCxHQUFPLEVBQUUsQ0FBRixFQUFLLENBQUwsSUFBUSxFQUFoQixFQUFvQixJQUFwQixDQUF5QixTQUF6QjtBQUFvQyxTQURxQixFQUNwQixFQUFFLENBQUYsRUFBSyxDQUFMLEdBQU8sSUFBRSxJQUFJLElBQUosRUFEVyxDQUNBLElBQUUsRUFBRSxhQUFGLENBQWdCLENBQWhCLENBQUYsRUFDekQsSUFBRSxFQUFFLG9CQUFGLENBQXVCLENBQXZCLEVBQTBCLENBQTFCLENBRHVELENBQzFCLEVBQUUsS0FBRixHQUFRLENBQVIsQ0FBVSxFQUFFLEdBQUYsR0FBTSxDQUFOLENBQVEsRUFBRSxVQUFGLENBQWEsWUFBYixDQUEwQixDQUExQixFQUE0QixDQUE1QjtBQUNoRCxLQUhFLEVBR0EsTUFIQSxFQUdPLFFBSFAsRUFHZ0IsUUFIaEIsRUFHeUIseUNBSHpCLEVBR21FLElBSG5FO0FBSUE7O0FBRUEsV0FBTyxFQUFQLENBQVUsUUFBVixFQUFvQixTQUFwQixFQUErQixNQUEvQjtBQUNBLFdBQU8sRUFBUCxDQUFVLE1BQVYsRUFBa0IsVUFBbEI7QUFDSDs7Ozs7Ozs7a0JDWnVCLFE7QUFBVCxTQUFTLFFBQVQsQ0FBa0IsSUFBbEIsRUFBd0I7QUFDbkMsUUFBSSxDQUFDLE9BQU8sRUFBWixFQUFnQjtBQUNaO0FBQ0g7QUFDRCxXQUFPLEVBQVAsQ0FBVSxNQUFWLEVBQWtCLFVBQWxCLEVBQThCLElBQTlCO0FBQ0g7Ozs7Ozs7Ozs7O0FDTEQ7Ozs7SUFFcUIsSztBQUNqQixtQkFBWSxFQUFaLEVBQWdCLEtBQWhCLEVBQXVCLFFBQXZCLEVBQWlDLE9BQWpDLEVBQTBDO0FBQUE7O0FBQ3RDLGFBQUssRUFBTCxHQUFVLEVBQVY7O0FBRUEsWUFBSSxLQUFKLEVBQVc7QUFDUCxpQkFBSyxFQUFMLENBQVEsS0FBUixFQUFlLFFBQWYsRUFBeUIsT0FBekI7QUFDSDtBQUNKOzs7OzJCQUVFLEssRUFBTyxRLEVBQXdCO0FBQUEsZ0JBQWQsT0FBYyx1RUFBSixFQUFJOztBQUM5QixpQkFBSyxRQUFMLEdBQWdCLFFBQWhCO0FBQ0EsaUJBQUssSUFBTCxHQUFZLFFBQVEsSUFBUixxQkFBWjtBQUNBLGlCQUFLLEtBQUwsR0FBYSxRQUFRLEtBQVIsSUFBaUIsQ0FBOUI7QUFDQSxpQkFBSyxRQUFMLEdBQWdCLFFBQVEsUUFBeEI7QUFDQSxpQkFBSyxVQUFMLEdBQWtCLFFBQVEsVUFBMUI7QUFDQSxpQkFBSyxJQUFMLEdBQVksQ0FBWjtBQUNBLGlCQUFLLFFBQUwsR0FBZ0IsS0FBaEI7O0FBRUEsaUJBQUssTUFBTCxHQUFjLE9BQU8sSUFBUCxDQUFZLEtBQVosQ0FBZDtBQUNBLGlCQUFLLFVBQUwsR0FBa0IsRUFBbEI7QUFDQSxpQkFBSyxXQUFMLEdBQW1CLEVBQW5COztBQUVBLGlCQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksS0FBSyxNQUFMLENBQVksTUFBaEMsRUFBd0MsR0FBeEMsRUFBNkM7QUFDekMsb0JBQU0sT0FBTyxLQUFLLE1BQUwsQ0FBWSxDQUFaLENBQWI7QUFDQSxxQkFBSyxVQUFMLENBQWdCLElBQWhCLElBQXdCLEtBQUssRUFBTCxDQUFRLElBQVIsQ0FBeEI7QUFDQSxxQkFBSyxXQUFMLENBQWlCLElBQWpCLElBQXlCLE1BQU0sSUFBTixJQUFjLEtBQUssVUFBTCxDQUFnQixJQUFoQixDQUF2QztBQUNIO0FBQ0o7OzsrQkFFTSxFLEVBQUk7QUFDUCxnQkFBSSxLQUFLLElBQUwsS0FBYyxLQUFLLFFBQXZCLEVBQWlDO0FBQzdCO0FBQ0g7O0FBRUQsZ0JBQUksS0FBSyxLQUFMLEdBQWEsQ0FBakIsRUFBb0I7QUFDaEIscUJBQUssS0FBTCxJQUFjLEVBQWQ7QUFDQTtBQUNIOztBQUVELGlCQUFLLElBQUwsSUFBYSxFQUFiOztBQUVBLGdCQUFJLEtBQUssSUFBTCxHQUFZLEtBQUssUUFBckIsRUFBK0I7QUFDM0IscUJBQUssSUFBTCxHQUFZLEtBQUssUUFBakI7QUFDSDs7QUFFRCxpQkFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLEtBQUssTUFBTCxDQUFZLE1BQWhDLEVBQXdDLEdBQXhDLEVBQTZDO0FBQ3pDLG9CQUFNLE9BQU8sS0FBSyxNQUFMLENBQVksQ0FBWixDQUFiO0FBQ0EscUJBQUssRUFBTCxDQUFRLElBQVIsSUFBZ0IsS0FBSyxJQUFMLENBQVUsS0FBSyxJQUFmLEVBQXFCLEtBQUssVUFBTCxDQUFnQixJQUFoQixDQUFyQixFQUE0QyxLQUFLLFdBQUwsQ0FBaUIsSUFBakIsQ0FBNUMsRUFBb0UsS0FBSyxRQUF6RSxDQUFoQjtBQUNIOztBQUVELGdCQUFJLEtBQUssUUFBVCxFQUFtQjtBQUNmLHFCQUFLLFFBQUwsQ0FBYyxLQUFLLEVBQW5CO0FBQ0g7O0FBRUQsZ0JBQUksS0FBSyxJQUFMLEtBQWMsS0FBSyxRQUF2QixFQUFpQztBQUM3QixxQkFBSyxRQUFMLEdBQWdCLElBQWhCOztBQUVBLG9CQUFJLEtBQUssVUFBVCxFQUFxQjtBQUNqQix5QkFBSyxVQUFMLENBQWdCLEtBQUssRUFBckI7QUFDSDtBQUNKO0FBQ0o7OztnQ0FFTztBQUNKLGlCQUFLLElBQUwsR0FBWSxDQUFaO0FBQ0EsaUJBQUssUUFBTCxHQUFnQixLQUFoQjtBQUNIOzs7Ozs7a0JBbEVnQixLOzs7Ozs7OztBQ0ZyQixJQUFJLGVBQUo7QUFBQSxJQUNJLGVBREo7O0FBR0EsSUFBSSxPQUFPLFNBQVMsTUFBaEIsS0FBMkIsV0FBL0IsRUFBNEM7QUFDeEMsYUFBUyxRQUFUO0FBQ0EsYUFBUyxrQkFBVDtBQUNILENBSEQsTUFHTyxJQUFJLE9BQU8sU0FBUyxTQUFoQixLQUE4QixXQUFsQyxFQUErQztBQUNsRCxhQUFTLFdBQVQ7QUFDQSxhQUFTLHFCQUFUO0FBQ0gsQ0FITSxNQUdBLElBQUksT0FBTyxTQUFTLFFBQWhCLEtBQTZCLFdBQWpDLEVBQThDO0FBQ2pELGFBQVMsVUFBVDtBQUNBLGFBQVMsb0JBQVQ7QUFDSCxDQUhNLE1BR0EsSUFBSSxPQUFPLFNBQVMsWUFBaEIsS0FBaUMsV0FBckMsRUFBa0Q7QUFDckQsYUFBUyxjQUFUO0FBQ0EsYUFBUyx3QkFBVDtBQUNIOztrQkFFYztBQUNYLGtCQURXO0FBRVg7QUFGVyxDOzs7Ozs7Ozs7QUNqQmY7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTSxhQUFhLE9BQU8sTUFBUCxDQUFjLGtCQUFRLFNBQXRCLEVBQWlDO0FBQ2hELFlBQVE7QUFDSixhQUFLLGVBQVc7QUFDWixtQkFBTyxTQUFTLGNBQUksTUFBYixDQUFQO0FBQ0g7QUFIRztBQUR3QyxDQUFqQyxDQUFuQjs7QUFRQSxTQUFTLGtCQUFULEdBQThCO0FBQzFCLFFBQUksU0FBUyxjQUFJLE1BQWIsQ0FBSixFQUEwQjtBQUN0QixtQkFBVyxJQUFYLENBQWdCLFFBQWhCO0FBQ0gsS0FGRCxNQUVPO0FBQ0gsbUJBQVcsSUFBWCxDQUFnQixPQUFoQjtBQUNIO0FBQ0o7O0FBRUQsSUFBSSxjQUFJLE1BQVIsRUFBZ0I7QUFDWixhQUFTLGdCQUFULENBQTBCLGNBQUksTUFBOUIsRUFBc0Msa0JBQXRDLEVBQTBELEtBQTFEO0FBQ0g7O2tCQUVjLFUiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXJyYXkobGVuZ3RoLCB2YWx1ZSkge1xuICAgIGNvbnN0IGFyciA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgdmFsID0gdHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJyA/IHZhbHVlIDogaTtcbiAgICAgICAgYXJyLnB1c2godmFsKTtcbiAgICB9XG4gICAgcmV0dXJuIGFycjtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNsb25lKGFycikge1xuICAgIHJldHVybiBhcnIuc2xpY2UoMCk7XG59XG4iLCJpbXBvcnQgYXJyYXkgZnJvbSAnLi9hcnJheSc7XG5pbXBvcnQgY2xvbmUgZnJvbSAnLi9jbG9uZSc7XG5pbXBvcnQgbW92ZUVsZW1lbnQgZnJvbSAnLi9tb3ZlRWxlbWVudCc7XG5pbXBvcnQgbmVhcmVzdCBmcm9tICcuL25lYXJlc3QnO1xuaW1wb3J0IHJhbmRvbUNob2ljZSBmcm9tICcuL3JhbmRvbUNob2ljZSc7XG5pbXBvcnQgc29ydEFscGhhIGZyb20gJy4vc29ydEFscGhhJztcbmltcG9ydCBzb3J0TnVtZXJpYyBmcm9tICcuL3NvcnROdW1lcmljJztcbmltcG9ydCBzb3J0UmFuZG9tIGZyb20gJy4vc29ydFJhbmRvbSc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBhcnJheSxcbiAgICBjbG9uZSxcbiAgICBtb3ZlRWxlbWVudCxcbiAgICBuZWFyZXN0LFxuICAgIHJhbmRvbUNob2ljZSxcbiAgICBzb3J0QWxwaGEsXG4gICAgc29ydE51bWVyaWMsXG4gICAgc29ydFJhbmRvbVxufTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1vdmVFbGVtZW50KGFyciwgZnJvbSwgdG8pIHtcbiAgICBhcnIgPSBhcnIuc2xpY2UoMCk7XG4gICAgY29uc3QgcmVtb3ZlZCA9IGFyci5zcGxpY2UoZnJvbSwgMSlbMF07XG4gICAgY29uc3QgaW5zZXJ0QXQgPSB0byA8IDAgPyBhcnIubGVuZ3RoICsgdG8gOiB0bztcbiAgICBhcnIuc3BsaWNlKGluc2VydEF0LCAwLCByZW1vdmVkKTtcbiAgICByZXR1cm4gYXJyO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbmVhcmVzdCh2YWx1ZSwgYXJyKSB7XG4gICAgbGV0IGxlYXN0ID0gTnVtYmVyLk1BWF9WQUxVRTtcbiAgICByZXR1cm4gYXJyLnJlZHVjZSgocmVzdWx0LCBpdGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IGRpZmYgPSBNYXRoLmFicyhpdGVtIC0gdmFsdWUpO1xuICAgICAgICBpZiAoZGlmZiA8IGxlYXN0KSB7XG4gICAgICAgICAgICBsZWFzdCA9IGRpZmY7XG4gICAgICAgICAgICByZXN1bHQgPSBpdGVtO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSwgLTEpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmFuZG9tQ2hvaWNlKGFycikge1xuICAgIHJldHVybiBhcnJbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXJyLmxlbmd0aCldO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc29ydEFscGhhKGEsIGIpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oeCwgeSkge1xuICAgICAgICAgICAgcmV0dXJuIFN0cmluZyh4W2FdKS50b0xvd2VyQ2FzZSgpID4gU3RyaW5nKHlbYV0pLnRvTG93ZXJDYXNlKCkgPyAxIDogLTE7XG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBTdHJpbmcoYSkudG9Mb3dlckNhc2UoKSA+IFN0cmluZyhiKS50b0xvd2VyQ2FzZSgpID8gMSA6IC0xO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc29ydE51bWVyaWMoYSwgYikge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbih4LCB5KSB7XG4gICAgICAgICAgICByZXR1cm4gTnVtYmVyKHhbYV0pIC0gTnVtYmVyKHlbYV0pO1xuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gTnVtYmVyKGEpIC0gTnVtYmVyKGIpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc29ydFJhbmRvbSgpIHtcbiAgICByZXR1cm4gTWF0aC5yYW5kb20oKSA+IDAuNSA/IC0xIDogMTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJsb2NrU2Nyb2xsaW5nKHZhbHVlKSB7XG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9IHZhbHVlID8gJ2hpZGRlbicgOiAnJztcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGVsQ29vcmRzKGVsKSB7XG4gICAgY29uc3QgYm94ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQuYm9keTtcbiAgICBjb25zdCBkb2NFbCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuICAgIGNvbnN0IHNjcm9sbFRvcCA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2NFbC5zY3JvbGxUb3AgfHwgYm9keS5zY3JvbGxUb3A7XG4gICAgY29uc3Qgc2Nyb2xsTGVmdCA9IHdpbmRvdy5wYWdlWE9mZnNldCB8fCBkb2NFbC5zY3JvbGxMZWZ0IHx8IGJvZHkuc2Nyb2xsTGVmdDtcblxuICAgIGNvbnN0IGNsaWVudFRvcCA9IGRvY0VsLmNsaWVudFRvcCB8fCBib2R5LmNsaWVudFRvcCB8fCAwO1xuICAgIGNvbnN0IGNsaWVudExlZnQgPSBkb2NFbC5jbGllbnRMZWZ0IHx8IGJvZHkuY2xpZW50TGVmdCB8fCAwO1xuXG4gICAgY29uc3QgdG9wID0gYm94LnRvcCArIHNjcm9sbFRvcCAtIGNsaWVudFRvcDtcbiAgICBjb25zdCBsZWZ0ID0gYm94LmxlZnQgKyBzY3JvbGxMZWZ0IC0gY2xpZW50TGVmdDtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHRvcDogTWF0aC5yb3VuZCh0b3ApLFxuICAgICAgICBsZWZ0OiBNYXRoLnJvdW5kKGxlZnQpLFxuICAgICAgICB4OiBNYXRoLnJvdW5kKGxlZnQpLFxuICAgICAgICB5OiBNYXRoLnJvdW5kKHRvcClcbiAgICB9O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZm9yY2VSZWRyYXcoZWwpIHtcbiAgICBjb25zdCBkaXNwbGF5ID0gZWwuc3R5bGUuZGlzcGxheTtcbiAgICBlbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGVsLm9mZnNldEhlaWdodDtcbiAgICBlbC5zdHlsZS5kaXNwbGF5ID0gZGlzcGxheTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFBhZ2VIZWlnaHQoKSB7XG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LmJvZHk7XG4gICAgY29uc3QgZG9jID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG4gICAgcmV0dXJuIE1hdGgubWF4KFxuICAgICAgICBib2R5LnNjcm9sbEhlaWdodCB8fCAwLFxuICAgICAgICBib2R5Lm9mZnNldEhlaWdodCB8fCAwLFxuICAgICAgICBib2R5LmNsaWVudEhlaWdodCB8fCAwLFxuICAgICAgICBkb2MuY2xpZW50SGVpZ2h0IHx8IDAsXG4gICAgICAgIGRvYy5vZmZzZXRIZWlnaHQgfHwgMCxcbiAgICAgICAgZG9jLnNjcm9sbEhlaWdodCB8fCAwXG4gICAgKTtcbn1cbiIsImltcG9ydCBnZXRTY3JvbGxUb3AgZnJvbSAnLi9nZXRTY3JvbGxUb3AnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRTY3JvbGxQZXJjZW50YWdlKCkge1xuICAgIHJldHVybiAoZ2V0U2Nyb2xsVG9wKCkgKyB3aW5kb3cuaW5uZXJIZWlnaHQpIC8gZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQ7XG59XG4iLCJpbXBvcnQgZ2V0U2Nyb2xsVG9wIGZyb20gJy4vZ2V0U2Nyb2xsVG9wJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0U2Nyb2xsUmVtYWluaW5nKCkge1xuICAgIGNvbnN0IGIgPSBkb2N1bWVudC5ib2R5O1xuICAgIHJldHVybiBNYXRoLmFicyhnZXRTY3JvbGxUb3AoKSAtIChiLnNjcm9sbEhlaWdodCAtIGIuY2xpZW50SGVpZ2h0KSk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRTY3JvbGxUb3AoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0U3Jjc2V0SW1hZ2Uoc3Jjc2V0LCBwaXhlbFdpZHRoKSB7XG4gICAgcGl4ZWxXaWR0aCA9IHBpeGVsV2lkdGggfHwgd2luZG93LmlubmVyV2lkdGggKiAod2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMCk7XG5cbiAgICBjb25zdCBzZXQgPSBzcmNzZXQuc3BsaXQoJywnKVxuICAgICAgICAubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBbdXJsLCB3aWR0aF0gPSBpdGVtLnRyaW0oKS5zcGxpdCgvXFxzKy8pO1xuICAgICAgICAgICAgY29uc3Qgc2l6ZSA9IHBhcnNlSW50KHdpZHRoLnNsaWNlKDAsIC0xKSwgMTApO1xuICAgICAgICAgICAgcmV0dXJuIHt1cmwsIHNpemV9O1xuICAgICAgICB9KVxuICAgICAgICAuc29ydCgoYSwgYikgPT4gYi5zaXplIC0gYS5zaXplKTtcblxuICAgIGlmICghc2V0Lmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNldC5yZWR1Y2UoKHZhbHVlLCBpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiBpdGVtLnNpemUgPj0gcGl4ZWxXaWR0aCA/IGl0ZW0udXJsIDogdmFsdWU7XG4gICAgfSwgc2V0WzBdLnVybCk7XG59XG4iLCJpbXBvcnQgYmxvY2tTY3JvbGxpbmcgZnJvbSAnLi9ibG9ja1Njcm9sbGluZyc7XG5pbXBvcnQgZWxDb29yZHMgZnJvbSAnLi9lbENvb3Jkcyc7XG5pbXBvcnQgZm9yY2VSZWRyYXcgZnJvbSAnLi9mb3JjZVJlZHJhdyc7XG5pbXBvcnQgZ2V0UGFnZUhlaWdodCBmcm9tICcuL2dldFBhZ2VIZWlnaHQnO1xuaW1wb3J0IGdldFNjcm9sbFBlcmNlbnRhZ2UgZnJvbSAnLi9nZXRTY3JvbGxQZXJjZW50YWdlJztcbmltcG9ydCBnZXRTY3JvbGxSZW1haW5pbmcgZnJvbSAnLi9nZXRTY3JvbGxSZW1haW5pbmcnO1xuaW1wb3J0IGdldFNjcm9sbFRvcCBmcm9tICcuL2dldFNjcm9sbFRvcCc7XG5pbXBvcnQgZ2V0U3Jjc2V0SW1hZ2UgZnJvbSAnLi9nZXRTcmNzZXRJbWFnZSc7XG5pbXBvcnQgaXNFbGVtZW50SW5WaWV3cG9ydCBmcm9tICcuL2lzRWxlbWVudEluVmlld3BvcnQnO1xuaW1wb3J0IGlzUGFnZUVuZCBmcm9tICcuL2lzUGFnZUVuZCc7XG5pbXBvcnQgcmVzaXplIGZyb20gJy4vcmVzaXplJztcbmltcG9ydCBzY3JvbGwgZnJvbSAnLi9zY3JvbGwnO1xuaW1wb3J0IHNldFN0eWxlIGZyb20gJy4vc2V0U3R5bGUnO1xuaW1wb3J0IHRyYW5zaXRpb25FbmQgZnJvbSAnLi90cmFuc2l0aW9uRW5kJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGJsb2NrU2Nyb2xsaW5nLFxuICAgIGVsQ29vcmRzLFxuICAgIGZvcmNlUmVkcmF3LFxuICAgIGdldFBhZ2VIZWlnaHQsXG4gICAgZ2V0U2Nyb2xsUGVyY2VudGFnZSxcbiAgICBnZXRTY3JvbGxSZW1haW5pbmcsXG4gICAgZ2V0U2Nyb2xsVG9wLFxuICAgIGdldFNyY3NldEltYWdlLFxuICAgIGlzRWxlbWVudEluVmlld3BvcnQsXG4gICAgaXNQYWdlRW5kLFxuICAgIHJlc2l6ZSxcbiAgICBzY3JvbGwsXG4gICAgc2V0U3R5bGUsXG4gICAgdHJhbnNpdGlvbkVuZFxufTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzRWxlbWVudEluVmlld3BvcnQoZWwsIGJ1ZmZlciA9IDApIHtcbiAgICBjb25zdCByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgcmV0dXJuIChcbiAgICAgICAgcmVjdC50b3AgPj0gMCAtIGJ1ZmZlciAmJlxuICAgICAgICByZWN0LmxlZnQgPj0gMCAtIGJ1ZmZlciAmJlxuICAgICAgICByZWN0LmJvdHRvbSA8PSB3aW5kb3cuaW5uZXJIZWlnaHQgKyBidWZmZXIgJiZcbiAgICAgICAgcmVjdC5yaWdodCA8PSB3aW5kb3cuaW5uZXJXaWR0aCArIGJ1ZmZlclxuICAgICk7XG59XG4iLCJpbXBvcnQgZ2V0U2Nyb2xsUmVtYWluaW5nIGZyb20gJy4vZ2V0U2Nyb2xsUmVtYWluaW5nJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNQYWdlRW5kKGJ1ZmZlciA9IDApIHtcbiAgICByZXR1cm4gZ2V0U2Nyb2xsUmVtYWluaW5nKCkgPD0gYnVmZmVyO1xufVxuIiwiaW1wb3J0IGV2ZW50QnVzIGZyb20gJy4uL2V2ZW50cy9ldmVudEJ1cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlc2l6ZShkZWJvdWNlRGVsYXkgPSA1MDApIHtcblxuICAgIGxldCB0aW1lb3V0SWQ7XG5cbiAgICAvLyBvcmllbnRhdGlvbmNoYW5nZSB0b28/XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dElkKTtcbiAgICAgICAgdGltZW91dElkID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4gZXZlbnRCdXMuZW1pdCgncmVzaXplJyksIGRlYm91Y2VEZWxheSk7XG4gICAgfSk7XG59XG4iLCJpbXBvcnQgZXZlbnRCdXMgZnJvbSAnLi4vZXZlbnRzL2V2ZW50QnVzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2Nyb2xsKGNhbGxOb3cgPSBmYWxzZSkge1xuXG4gICAgbGV0IGxhc3RTY3JvbGxZID0gMCxcbiAgICAgICAgdGlja2luZyA9IGZhbHNlLFxuICAgICAgICB0aW1lb3V0SWQ7XG5cbiAgICBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SWQpO1xuICAgICAgICB0aW1lb3V0SWQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiBldmVudEJ1cy5lbWl0KCdzY3JvbGxlbmQnLCBsYXN0U2Nyb2xsWSksIDIwMCk7XG5cbiAgICAgICAgZXZlbnRCdXMuZW1pdCgnc2Nyb2xsJywgbGFzdFNjcm9sbFkpO1xuICAgICAgICB0aWNraW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVxdWVzdFRpY2soKSB7XG4gICAgICAgIGlmICghdGlja2luZykge1xuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGUpO1xuICAgICAgICAgICAgdGlja2luZyA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblNjcm9sbCgpIHtcbiAgICAgICAgLy8gbGFzdFNjcm9sbFkgPSB3aW5kb3cuc2Nyb2xsWTtcbiAgICAgICAgbGFzdFNjcm9sbFkgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcbiAgICAgICAgcmVxdWVzdFRpY2soKTtcbiAgICB9XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgb25TY3JvbGwsIGZhbHNlKTtcblxuICAgIGlmIChjYWxsTm93KSB7XG4gICAgICAgIG9uU2Nyb2xsKCk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2V0U3R5bGUoZWwsIHN0eWxlKSB7XG4gICAgT2JqZWN0LmtleXMoc3R5bGUpLmZvckVhY2goKHByb3ApID0+IHtcbiAgICAgICAgZWwuc3R5bGVbcHJvcF0gPSBzdHlsZVtwcm9wXTtcbiAgICB9KTtcbiAgICByZXR1cm4gZWw7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0cmFuc2l0aW9uRW5kKGVsLCBjYiwgdGltZW91dCA9IDEwMDApIHtcblxuICAgIGxldCB0aW1lb3V0SWQ7XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVyKCkge1xuICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBoYW5kbGVyKTtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2Via2l0VHJhbnNpdGlvbkVuZCcsIGhhbmRsZXIpO1xuICAgICAgICBjYigpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZWwuc3R5bGUudHJhbnNpdGlvbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGhhbmRsZXIpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGVsLnN0eWxlLldlYmtpdFRyYW5zaXRpb24gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCBoYW5kbGVyKTtcbiAgICB9XG5cbiAgICB0aW1lb3V0SWQgPSB3aW5kb3cuc2V0VGltZW91dChoYW5kbGVyLCB0aW1lb3V0KTtcbn1cbiIsImZ1bmN0aW9uIGVhc2VJbkJhY2sodCwgYiwgYywgZCwgcyA9IDEuNzAxNTgpIHtcbiAgICByZXR1cm4gYyAqICh0IC89IGQpICogdCAqICgocyArIDEpICogdCAtIHMpICsgYjtcbn1cblxuZnVuY3Rpb24gZWFzZU91dEJhY2sodCwgYiwgYywgZCwgcyA9IDEuNzAxNTgpIHtcbiAgICByZXR1cm4gYyAqICgodCA9IHQgLyBkIC0gMSkgKiB0ICogKChzICsgMSkgKiB0ICsgcykgKyAxKSArIGI7XG59XG5cbmZ1bmN0aW9uIGVhc2VJbk91dEJhY2sodCwgYiwgYywgZCwgcyA9IDEuNzAxNTgpIHtcbiAgICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkge1xuICAgICAgICByZXR1cm4gYyAvIDIgKiAodCAqIHQgKiAoKChzICo9ICgxLjUyNSkpICsgMSkgKiB0IC0gcykpICsgYjtcbiAgICB9XG4gICAgcmV0dXJuIGMgLyAyICogKCh0IC09IDIpICogdCAqICgoKHMgKj0gKDEuNTI1KSkgKyAxKSAqIHQgKyBzKSArIDIpICsgYjtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGVhc2VJbjogZWFzZUluQmFjayxcbiAgICBlYXNlT3V0OiBlYXNlT3V0QmFjayxcbiAgICBlYXNlSW5PdXQ6IGVhc2VJbk91dEJhY2tcbn07XG5cbmV4cG9ydCB7XG4gICAgZWFzZUluQmFjayxcbiAgICBlYXNlT3V0QmFjayxcbiAgICBlYXNlSW5PdXRCYWNrXG59O1xuIiwiZnVuY3Rpb24gZWFzZU91dEJvdW5jZSh0LCBiLCBjLCBkKSB7XG4gICAgaWYgKCh0IC89IGQpIDwgKDEgLyAyLjc1KSkge1xuICAgICAgICByZXR1cm4gYyAqICg3LjU2MjUgKiB0ICogdCkgKyBiO1xuICAgIH0gZWxzZSBpZiAodCA8ICgyIC8gMi43NSkpIHtcbiAgICAgICAgcmV0dXJuIGMgKiAoNy41NjI1ICogKHQgLT0gKDEuNSAvIDIuNzUpKSAqIHQgKyAwLjc1KSArIGI7XG4gICAgfSBlbHNlIGlmICh0IDwgKDIuNSAvIDIuNzUpKSB7XG4gICAgICAgIHJldHVybiBjICogKDcuNTYyNSAqICh0IC09ICgyLjI1IC8gMi43NSkpICogdCArIDAuOTM3NSkgKyBiO1xuICAgIH1cbiAgICByZXR1cm4gYyAqICg3LjU2MjUgKiAodCAtPSAoMi42MjUgLyAyLjc1KSkgKiB0ICsgMC45ODQzNzUpICsgYjtcbn1cblxuZnVuY3Rpb24gZWFzZUluQm91bmNlKHQsIGIsIGMsIGQpIHtcbiAgICByZXR1cm4gYyAtIGVhc2VPdXRCb3VuY2UoZCAtIHQsIDAsIGMsIGQpICsgYjtcbn1cblxuZnVuY3Rpb24gZWFzZUluT3V0Qm91bmNlKHQsIGIsIGMsIGQpIHtcbiAgICBpZiAodCA8IGQgLyAyKSB7XG4gICAgICAgIHJldHVybiBlYXNlSW5Cb3VuY2UodCAqIDIsIDAsIGMsIGQpICogMC41ICsgYjtcbiAgICB9XG4gICAgcmV0dXJuIGVhc2VPdXRCb3VuY2UodCAqIDIgLSBkLCAwLCBjLCBkKSAqIDAuNSArIGMgKiAwLjUgKyBiO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZWFzZUluOiBlYXNlSW5Cb3VuY2UsXG4gICAgZWFzZU91dDogZWFzZU91dEJvdW5jZSxcbiAgICBlYXNlSW5PdXQ6IGVhc2VJbk91dEJvdW5jZVxufTtcblxuZXhwb3J0IHtcbiAgICBlYXNlSW5Cb3VuY2UsXG4gICAgZWFzZU91dEJvdW5jZSxcbiAgICBlYXNlSW5PdXRCb3VuY2Vcbn07XG4iLCJjb25zdCB7c3FydH0gPSBNYXRoO1xuXG5mdW5jdGlvbiBlYXNlSW5DaXJjdWxhcih0LCBiLCBjLCBkKSB7XG4gICAgcmV0dXJuIC1jICogKHNxcnQoMSAtICh0IC89IGQpICogdCkgLSAxKSArIGI7XG59XG5cbmZ1bmN0aW9uIGVhc2VPdXRDaXJjdWxhcih0LCBiLCBjLCBkKSB7XG4gICAgcmV0dXJuIGMgKiBzcXJ0KDEgLSAodCA9IHQgLyBkIC0gMSkgKiB0KSArIGI7XG59XG5cbmZ1bmN0aW9uIGVhc2VJbk91dENpcmN1bGFyKHQsIGIsIGMsIGQpIHtcbiAgICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkge1xuICAgICAgICByZXR1cm4gLWMgLyAyICogKHNxcnQoMSAtIHQgKiB0KSAtIDEpICsgYjtcbiAgICB9XG4gICAgcmV0dXJuIGMgLyAyICogKHNxcnQoMSAtICh0IC09IDIpICogdCkgKyAxKSArIGI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBlYXNlSW46IGVhc2VJbkNpcmN1bGFyLFxuICAgIGVhc2VPdXQ6IGVhc2VPdXRDaXJjdWxhcixcbiAgICBlYXNlSW5PdXQ6IGVhc2VJbk91dENpcmN1bGFyXG59O1xuXG5leHBvcnQge1xuICAgIGVhc2VJbkNpcmN1bGFyLFxuICAgIGVhc2VPdXRDaXJjdWxhcixcbiAgICBlYXNlSW5PdXRDaXJjdWxhclxufTtcbiIsImZ1bmN0aW9uIGVhc2VJbkN1YmljKHQsIGIsIGMsIGQpIHtcbiAgICByZXR1cm4gYyAqICh0IC89IGQpICogdCAqIHQgKyBiO1xufVxuXG5mdW5jdGlvbiBlYXNlT3V0Q3ViaWModCwgYiwgYywgZCkge1xuICAgIHJldHVybiBjICogKCh0ID0gdCAvIGQgLSAxKSAqIHQgKiB0ICsgMSkgKyBiO1xufVxuXG5mdW5jdGlvbiBlYXNlSW5PdXRDdWJpYyh0LCBiLCBjLCBkKSB7XG4gICAgaWYgKCh0IC89IGQgLyAyKSA8IDEpIHtcbiAgICAgICAgcmV0dXJuIGMgLyAyICogdCAqIHQgKiB0ICsgYjtcbiAgICB9XG4gICAgcmV0dXJuIGMgLyAyICogKCh0IC09IDIpICogdCAqIHQgKyAyKSArIGI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBlYXNlSW46IGVhc2VJbkN1YmljLFxuICAgIGVhc2VPdXQ6IGVhc2VPdXRDdWJpYyxcbiAgICBlYXNlSW5PdXQ6IGVhc2VJbk91dEN1YmljXG59O1xuXG5leHBvcnQge1xuICAgIGVhc2VJbkN1YmljLFxuICAgIGVhc2VPdXRDdWJpYyxcbiAgICBlYXNlSW5PdXRDdWJpY1xufTtcbiIsImNvbnN0IHthYnMsIGFzaW4sIFBJLCBwb3csIHNpbn0gPSBNYXRoO1xuY29uc3QgUElfMiA9IFBJICogMjtcblxuZnVuY3Rpb24gZWFzZUluRWxhc3RpYyh0LCBiLCBjLCBkLCBhLCBwKSB7XG4gICAgbGV0IHM7XG4gICAgaWYgKHQgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGI7XG4gICAgfVxuICAgIGlmICgodCAvPSBkKSA9PT0gMSkge1xuICAgICAgICByZXR1cm4gYiArIGM7XG4gICAgfVxuICAgIGlmICghcCkge1xuICAgICAgICBwID0gZCAqIDAuMztcbiAgICB9XG4gICAgaWYgKCFhIHx8IGEgPCBhYnMoYykpIHtcbiAgICAgICAgYSA9IGM7XG4gICAgICAgIHMgPSBwIC8gNDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzID0gcCAvIFBJXzIgKiBhc2luKGMgLyBhKTtcbiAgICB9XG4gICAgcmV0dXJuIC0oYSAqIHBvdygyLCAxMCAqICh0IC09IDEpKSAqIHNpbigodCAqIGQgLSBzKSAqIFBJXzIgLyBwKSkgKyBiO1xufVxuXG5mdW5jdGlvbiBlYXNlT3V0RWxhc3RpYyh0LCBiLCBjLCBkLCBhLCBwKSB7XG4gICAgbGV0IHM7XG4gICAgaWYgKHQgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGI7XG4gICAgfVxuICAgIGlmICgodCAvPSBkKSA9PT0gMSkge1xuICAgICAgICByZXR1cm4gYiArIGM7XG4gICAgfVxuICAgIGlmICghcCkge1xuICAgICAgICBwID0gZCAqIDAuMztcbiAgICB9XG4gICAgaWYgKCFhIHx8IGEgPCBhYnMoYykpIHtcbiAgICAgICAgYSA9IGM7XG4gICAgICAgIHMgPSBwIC8gNDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzID0gcCAvIFBJXzIgKiBhc2luKGMgLyBhKTtcbiAgICB9XG4gICAgcmV0dXJuIChhICogcG93KDIsIC0xMCAqIHQpICogc2luKCh0ICogZCAtIHMpICogUElfMiAvIHApICsgYyArIGIpO1xufVxuXG5mdW5jdGlvbiBlYXNlSW5PdXRFbGFzdGljKHQsIGIsIGMsIGQsIGEsIHApIHtcbiAgICBsZXQgcztcbiAgICBpZiAodCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gYjtcbiAgICB9XG4gICAgaWYgKCh0IC89IGQgLyAyKSA9PT0gMikge1xuICAgICAgICByZXR1cm4gYiArIGM7XG4gICAgfVxuICAgIGlmICghcCkge1xuICAgICAgICBwID0gZCAqICgwLjMgKiAxLjUpO1xuICAgIH1cbiAgICBpZiAoIWEgfHwgYSA8IGFicyhjKSkge1xuICAgICAgICBhID0gYztcbiAgICAgICAgcyA9IHAgLyA0O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHMgPSBwIC8gUElfMiAqIGFzaW4oYyAvIGEpO1xuICAgIH1cbiAgICBpZiAodCA8IDEpIHtcbiAgICAgICAgcmV0dXJuIC0wLjUgKiAoYSAqIHBvdygyLCAxMCAqICh0IC09IDEpKSAqIHNpbigodCAqIGQgLSBzKSAqIFBJXzIgLyBwKSkgKyBiO1xuICAgIH1cbiAgICByZXR1cm4gYSAqIHBvdygyLCAtMTAgKiAodCAtPSAxKSkgKiBzaW4oKHQgKiBkIC0gcykgKiBQSV8yIC8gcCkgKiAwLjUgKyBjICsgYjtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGVhc2VJbjogZWFzZUluRWxhc3RpYyxcbiAgICBlYXNlT3V0OiBlYXNlT3V0RWxhc3RpYyxcbiAgICBlYXNlSW5PdXQ6IGVhc2VJbk91dEVsYXN0aWNcbn07XG5cbmV4cG9ydCB7XG4gICAgZWFzZUluRWxhc3RpYyxcbiAgICBlYXNlT3V0RWxhc3RpYyxcbiAgICBlYXNlSW5PdXRFbGFzdGljXG59O1xuIiwiY29uc3Qge3Bvd30gPSBNYXRoO1xuXG5mdW5jdGlvbiBlYXNlSW5FeHBvKHQsIGIsIGMsIGQpIHtcbiAgICByZXR1cm4gdCA9PT0gMCA/IGIgOiBjICogcG93KDIsIDEwICogKHQgLyBkIC0gMSkpICsgYjtcbn1cblxuZnVuY3Rpb24gZWFzZU91dEV4cG8odCwgYiwgYywgZCkge1xuICAgIHJldHVybiB0ID09PSBkID8gYiArIGMgOiBjICogKC1wb3coMiwgLTEwICogdCAvIGQpICsgMSkgKyBiO1xufVxuXG5mdW5jdGlvbiBlYXNlSW5PdXRFeHBvKHQsIGIsIGMsIGQpIHtcbiAgICBpZiAodCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gYjtcbiAgICB9XG4gICAgaWYgKHQgPT09IGQpIHtcbiAgICAgICAgcmV0dXJuIGIgKyBjO1xuICAgIH1cbiAgICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkge1xuICAgICAgICByZXR1cm4gYyAvIDIgKiBwb3coMiwgMTAgKiAodCAtIDEpKSArIGI7XG4gICAgfVxuICAgIHJldHVybiBjIC8gMiAqICgtcG93KDIsIC0xMCAqIC0tdCkgKyAyKSArIGI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBlYXNlSW46IGVhc2VJbkV4cG8sXG4gICAgZWFzZU91dDogZWFzZU91dEV4cG8sXG4gICAgZWFzZUluT3V0OiBlYXNlSW5PdXRFeHBvXG59O1xuXG5leHBvcnQge1xuICAgIGVhc2VJbkV4cG8sXG4gICAgZWFzZU91dEV4cG8sXG4gICAgZWFzZUluT3V0RXhwb1xufTtcbiIsImltcG9ydCBiYWNrLCB7ZWFzZUluQmFjaywgZWFzZU91dEJhY2ssIGVhc2VJbk91dEJhY2t9IGZyb20gJy4vYmFjayc7XG5pbXBvcnQgYm91bmNlLCB7ZWFzZUluQm91bmNlLCBlYXNlT3V0Qm91bmNlLCBlYXNlSW5PdXRCb3VuY2V9IGZyb20gJy4vYm91bmNlJztcbmltcG9ydCBjaXJjdWxhciwge2Vhc2VJbkNpcmN1bGFyLCBlYXNlT3V0Q2lyY3VsYXIsIGVhc2VJbk91dENpcmN1bGFyfSBmcm9tICcuL2NpcmN1bGFyJztcbmltcG9ydCBjdWJpYywge2Vhc2VJbkN1YmljLCBlYXNlT3V0Q3ViaWMsIGVhc2VJbk91dEN1YmljfSBmcm9tICcuL2N1YmljJztcbmltcG9ydCBlbGFzdGljLCB7ZWFzZUluRWxhc3RpYywgZWFzZU91dEVsYXN0aWMsIGVhc2VJbk91dEVsYXN0aWN9IGZyb20gJy4vZWxhc3RpYyc7XG5pbXBvcnQgZXhwbywge2Vhc2VJbkV4cG8sIGVhc2VPdXRFeHBvLCBlYXNlSW5PdXRFeHBvfSBmcm9tICcuL2V4cG8nO1xuaW1wb3J0IGxpbmVhciwge2Vhc2VMaW5lYXJ9IGZyb20gJy4vbGluZWFyJztcbmltcG9ydCBxdWFkLCB7ZWFzZUluUXVhZCwgZWFzZU91dFF1YWQsIGVhc2VJbk91dFF1YWR9IGZyb20gJy4vcXVhZCc7XG5pbXBvcnQgcXVhcnQsIHtlYXNlSW5RdWFydCwgZWFzZU91dFF1YXJ0LCBlYXNlSW5PdXRRdWFydH0gZnJvbSAnLi9xdWFydCc7XG5pbXBvcnQgcXVpbnQsIHtlYXNlSW5RdWludCwgZWFzZU91dFF1aW50LCBlYXNlSW5PdXRRdWludH0gZnJvbSAnLi9xdWludCc7XG5pbXBvcnQgc2luZSwge2Vhc2VJblNpbmUsIGVhc2VPdXRTaW5lLCBlYXNlSW5PdXRTaW5lfSBmcm9tICcuL3NpbmUnO1xuXG5leHBvcnQge1xuICAgIGJhY2ssXG4gICAgYm91bmNlLFxuICAgIGNpcmN1bGFyLFxuICAgIGN1YmljLFxuICAgIGVsYXN0aWMsXG4gICAgZXhwbyxcbiAgICBsaW5lYXIsXG4gICAgcXVhZCxcbiAgICBxdWFydCxcbiAgICBxdWludCxcbiAgICBzaW5lLFxuICAgIGVhc2VMaW5lYXIsXG4gICAgZWFzZUluQmFjayxcbiAgICBlYXNlT3V0QmFjayxcbiAgICBlYXNlSW5PdXRCYWNrLFxuICAgIGVhc2VJbkJvdW5jZSxcbiAgICBlYXNlT3V0Qm91bmNlLFxuICAgIGVhc2VJbk91dEJvdW5jZSxcbiAgICBlYXNlSW5DaXJjdWxhcixcbiAgICBlYXNlT3V0Q2lyY3VsYXIsXG4gICAgZWFzZUluT3V0Q2lyY3VsYXIsXG4gICAgZWFzZUluQ3ViaWMsXG4gICAgZWFzZU91dEN1YmljLFxuICAgIGVhc2VJbk91dEN1YmljLFxuICAgIGVhc2VJbkVsYXN0aWMsXG4gICAgZWFzZU91dEVsYXN0aWMsXG4gICAgZWFzZUluT3V0RWxhc3RpYyxcbiAgICBlYXNlSW5FeHBvLFxuICAgIGVhc2VPdXRFeHBvLFxuICAgIGVhc2VJbk91dEV4cG8sXG4gICAgZWFzZUluUXVhZCxcbiAgICBlYXNlT3V0UXVhZCxcbiAgICBlYXNlSW5PdXRRdWFkLFxuICAgIGVhc2VJblF1YXJ0LFxuICAgIGVhc2VPdXRRdWFydCxcbiAgICBlYXNlSW5PdXRRdWFydCxcbiAgICBlYXNlSW5RdWludCxcbiAgICBlYXNlT3V0UXVpbnQsXG4gICAgZWFzZUluT3V0UXVpbnQsXG4gICAgZWFzZUluU2luZSxcbiAgICBlYXNlT3V0U2luZSxcbiAgICBlYXNlSW5PdXRTaW5lXG59O1xuXG4vKlxuVEVSTVMgT0YgVVNFIC0gRUFTSU5HIEVRVUFUSU9OU1xuXG5PcGVuIHNvdXJjZSB1bmRlciB0aGUgQlNEIExpY2Vuc2UuXG5cbkNvcHlyaWdodCDCqSAyMDAxIFJvYmVydCBQZW5uZXJcbkFsbCByaWdodHMgcmVzZXJ2ZWQuXG5cblJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dFxubW9kaWZpY2F0aW9uLCBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG5cblJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSwgdGhpc1xubGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG5SZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXNcbmxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uIGFuZC9vclxub3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cbk5laXRoZXIgdGhlIG5hbWUgb2YgdGhlIGF1dGhvciBub3IgdGhlIG5hbWVzIG9mIGNvbnRyaWJ1dG9ycyBtYXkgYmUgdXNlZCB0b1xuZW5kb3JzZSBvciBwcm9tb3RlIHByb2R1Y3RzIGRlcml2ZWQgZnJvbSB0aGlzIHNvZnR3YXJlIHdpdGhvdXQgc3BlY2lmaWNcbnByaW9yIHdyaXR0ZW4gcGVybWlzc2lvbi5cblRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgXCJBUyBJU1wiXG5BTkQgQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFXG5JTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBUkVcbkRJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgT1dORVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1JcbkFOWSBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFU1xuKElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTO1xuTE9TUyBPRiBVU0UsIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OXG5BTlkgVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVFxuKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSkgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVNcblNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxuKi9cbiIsImZ1bmN0aW9uIGVhc2VMaW5lYXIodCwgYiwgYywgZCkge1xuICAgIHJldHVybiBjICogdCAvIGQgKyBiO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZWFzZUluOiBlYXNlTGluZWFyLFxuICAgIGVhc2VPdXQ6IGVhc2VMaW5lYXIsXG4gICAgZWFzZUluT3V0OiBlYXNlTGluZWFyXG59O1xuXG5leHBvcnQge1xuICAgIGVhc2VMaW5lYXJcbn07XG4iLCJmdW5jdGlvbiBlYXNlSW5RdWFkKHQsIGIsIGMsIGQpIHtcbiAgICByZXR1cm4gYyAqICh0IC89IGQpICogdCArIGI7XG59XG5cbmZ1bmN0aW9uIGVhc2VPdXRRdWFkKHQsIGIsIGMsIGQpIHtcbiAgICByZXR1cm4gLWMgKiAodCAvPSBkKSAqICh0IC0gMikgKyBiO1xufVxuXG5mdW5jdGlvbiBlYXNlSW5PdXRRdWFkKHQsIGIsIGMsIGQpIHtcbiAgICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkge1xuICAgICAgICByZXR1cm4gYyAvIDIgKiB0ICogdCArIGI7XG4gICAgfVxuICAgIHJldHVybiAtYyAvIDIgKiAoKC0tdCkgKiAodCAtIDIpIC0gMSkgKyBiO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZWFzZUluOiBlYXNlSW5RdWFkLFxuICAgIGVhc2VPdXQ6IGVhc2VPdXRRdWFkLFxuICAgIGVhc2VJbk91dDogZWFzZUluT3V0UXVhZFxufTtcblxuZXhwb3J0IHtcbiAgICBlYXNlSW5RdWFkLFxuICAgIGVhc2VPdXRRdWFkLFxuICAgIGVhc2VJbk91dFF1YWRcbn07XG4iLCJmdW5jdGlvbiBlYXNlSW5RdWFydCh0LCBiLCBjLCBkKSB7XG4gICAgcmV0dXJuIGMgKiAodCAvPSBkKSAqIHQgKiB0ICogdCArIGI7XG59XG5cbmZ1bmN0aW9uIGVhc2VPdXRRdWFydCh0LCBiLCBjLCBkKSB7XG4gICAgcmV0dXJuIC1jICogKCh0ID0gdCAvIGQgLSAxKSAqIHQgKiB0ICogdCAtIDEpICsgYjtcbn1cblxuZnVuY3Rpb24gZWFzZUluT3V0UXVhcnQodCwgYiwgYywgZCkge1xuICAgIGlmICgodCAvPSBkIC8gMikgPCAxKSB7XG4gICAgICAgIHJldHVybiBjIC8gMiAqIHQgKiB0ICogdCAqIHQgKyBiO1xuICAgIH1cbiAgICByZXR1cm4gLWMgLyAyICogKCh0IC09IDIpICogdCAqIHQgKiB0IC0gMikgKyBiO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZWFzZUluOiBlYXNlSW5RdWFydCxcbiAgICBlYXNlT3V0OiBlYXNlT3V0UXVhcnQsXG4gICAgZWFzZUluT3V0OiBlYXNlSW5PdXRRdWFydFxufTtcblxuZXhwb3J0IHtcbiAgICBlYXNlSW5RdWFydCxcbiAgICBlYXNlT3V0UXVhcnQsXG4gICAgZWFzZUluT3V0UXVhcnRcbn07XG4iLCJmdW5jdGlvbiBlYXNlSW5RdWludCh0LCBiLCBjLCBkKSB7XG4gICAgcmV0dXJuIGMgKiAodCAvPSBkKSAqIHQgKiB0ICogdCAqIHQgKyBiO1xufVxuXG5mdW5jdGlvbiBlYXNlT3V0UXVpbnQodCwgYiwgYywgZCkge1xuICAgIHJldHVybiBjICogKCh0ID0gdCAvIGQgLSAxKSAqIHQgKiB0ICogdCAqIHQgKyAxKSArIGI7XG59XG5cbmZ1bmN0aW9uIGVhc2VJbk91dFF1aW50KHQsIGIsIGMsIGQpIHtcbiAgICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkge1xuICAgICAgICByZXR1cm4gYyAvIDIgKiB0ICogdCAqIHQgKiB0ICogdCArIGI7XG4gICAgfVxuICAgIHJldHVybiBjIC8gMiAqICgodCAtPSAyKSAqIHQgKiB0ICogdCAqIHQgKyAyKSArIGI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBlYXNlSW46IGVhc2VJblF1aW50LFxuICAgIGVhc2VPdXQ6IGVhc2VPdXRRdWludCxcbiAgICBlYXNlSW5PdXQ6IGVhc2VJbk91dFF1aW50XG59O1xuXG5leHBvcnQge1xuICAgIGVhc2VJblF1aW50LFxuICAgIGVhc2VPdXRRdWludCxcbiAgICBlYXNlSW5PdXRRdWludFxufTtcbiIsImNvbnN0IHtjb3MsIFBJLCBzaW59ID0gTWF0aDtcbmNvbnN0IFBJX0QyID0gUEkgLyAyO1xuXG5mdW5jdGlvbiBlYXNlSW5TaW5lKHQsIGIsIGMsIGQpIHtcbiAgICByZXR1cm4gLWMgKiBjb3ModCAvIGQgKiBQSV9EMikgKyBjICsgYjtcbn1cblxuZnVuY3Rpb24gZWFzZU91dFNpbmUodCwgYiwgYywgZCkge1xuICAgIHJldHVybiBjICogc2luKHQgLyBkICogUElfRDIpICsgYjtcbn1cblxuZnVuY3Rpb24gZWFzZUluT3V0U2luZSh0LCBiLCBjLCBkKSB7XG4gICAgcmV0dXJuIC1jIC8gMiAqIChjb3MoUEkgKiB0IC8gZCkgLSAxKSArIGI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBlYXNlSW46IGVhc2VJblNpbmUsXG4gICAgZWFzZU91dDogZWFzZU91dFNpbmUsXG4gICAgZWFzZUluT3V0OiBlYXNlSW5PdXRTaW5lXG59O1xuXG5leHBvcnQge1xuICAgIGVhc2VJblNpbmUsXG4gICAgZWFzZU91dFNpbmUsXG4gICAgZWFzZUluT3V0U2luZVxufTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRlYm91bmNlKGhhbmRsZXIpIHtcbiAgICBsZXQgdGlja2luZyA9IGZhbHNlO1xuXG4gICAgZnVuY3Rpb24gdXBkYXRlKGV2ZW50KSB7XG4gICAgICAgIGhhbmRsZXIoZXZlbnQpO1xuICAgICAgICB0aWNraW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVxdWVzdFRpY2soZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aWNraW5nKSB7XG4gICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHVwZGF0ZShldmVudCkpO1xuICAgICAgICAgICAgdGlja2luZyA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVxdWVzdFRpY2s7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZWxlZ2F0ZUV2ZW50cyhwYXJlbnRFbCwgZXZlbnRUeXBlLCBmaWx0ZXIsIGZuKSB7XG5cbiAgICBpZiAodHlwZW9mIGZpbHRlciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgY29uc3QgdGFnTmFtZSA9IGZpbHRlci50b1VwcGVyQ2FzZSgpO1xuICAgICAgICBmaWx0ZXIgPSB0YXJnZXQgPT4gdGFyZ2V0LnRhZ05hbWUgPT09IHRhZ05hbWU7XG4gICAgfVxuXG4gICAgcGFyZW50RWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIChldmVudCkgPT4ge1xuICAgICAgICBsZXQgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuXG4gICAgICAgIHdoaWxlICh0YXJnZXQgIT09IHBhcmVudEVsKSB7XG4gICAgICAgICAgICBpZiAoZmlsdGVyKHRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBmbih0YXJnZXQsIGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnROb2RlO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4iLCJpbXBvcnQge0V2ZW50RW1pdHRlcn0gZnJvbSAnZXZlbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZW1pdHRlciBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5zZXRNYXhMaXN0ZW5lcnMoMjApO1xuICAgIH1cblxuICAgIG9mZiAodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKGxpc3RlbmVyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyh0eXBlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgZW1pdHRlciBmcm9tICcuL2VtaXR0ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuY3JlYXRlKGVtaXR0ZXIucHJvdG90eXBlKTtcbiIsImltcG9ydCBlbWl0dGVyIGZyb20gJy4vZW1pdHRlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGhlYXJ0YmVhdChpbnRlcnZhbCkge1xuICAgIGxldCBiZWF0ID0gbnVsbCxcbiAgICAgICAgdGltZSA9IDAsXG4gICAgICAgIG51bVRpbWVzID0gMCxcbiAgICAgICAgbWF4VGltZXMgPSAwLFxuICAgICAgICBydW5uaW5nID0gZmFsc2U7XG5cbiAgICBmdW5jdGlvbiBzdGFydChtYXhOdW1UaW1lcyA9IDAsIHRpbWVPZmZzZXQgPSAwKSB7XG4gICAgICAgIG1heFRpbWVzID0gbWF4TnVtVGltZXM7XG4gICAgICAgIHRpbWUgPSB0aW1lT2Zmc2V0O1xuICAgICAgICBudW1UaW1lcyA9IDA7XG4gICAgICAgIHJ1bm5pbmcgPSB0cnVlO1xuICAgICAgICByZXR1cm4gYmVhdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdG9wKCkge1xuICAgICAgICBydW5uaW5nID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBiZWF0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZShkdCA9IDEpIHtcbiAgICAgICAgaWYgKCFydW5uaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gYmVhdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtYXhUaW1lcyA+IDAgJiYgbnVtVGltZXMgPj0gbWF4VGltZXMpIHtcbiAgICAgICAgICAgIHJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIGJlYXQuZW1pdCgnY29tcGxldGUnKTtcbiAgICAgICAgICAgIHJldHVybiBiZWF0O1xuICAgICAgICB9XG5cbiAgICAgICAgdGltZSArPSBkdDtcblxuICAgICAgICBpZiAodGltZSA+PSBpbnRlcnZhbCkge1xuICAgICAgICAgICAgdGltZSA9IDA7XG4gICAgICAgICAgICBudW1UaW1lcysrO1xuICAgICAgICAgICAgYmVhdC5lbWl0KCd1cGRhdGUnLCBudW1UaW1lcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJlYXQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0SW50ZXJ2YWwodmFsdWUpIHtcbiAgICAgICAgaW50ZXJ2YWwgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIGJlYXQ7XG4gICAgfVxuXG4gICAgYmVhdCA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmNyZWF0ZShlbWl0dGVyLnByb3RvdHlwZSksIHtcbiAgICAgICAgc3RhcnQsXG4gICAgICAgIHN0b3AsXG4gICAgICAgIHVwZGF0ZSxcbiAgICAgICAgZ2V0IGludGVydmFsKCkge1xuICAgICAgICAgICAgcmV0dXJuIGludGVydmFsO1xuICAgICAgICB9LFxuICAgICAgICBzZXQgaW50ZXJ2YWwodmFsdWUpIHtcbiAgICAgICAgICAgIGludGVydmFsID0gdmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldEludGVydmFsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gYmVhdDtcbn1cbiIsImltcG9ydCBkZWJvdW5jZSBmcm9tICcuL2RlYm91bmNlJztcbmltcG9ydCBkZWxlZ2F0ZUV2ZW50cyBmcm9tICcuL2RlbGVnYXRlRXZlbnRzJztcbmltcG9ydCBlbWl0dGVyIGZyb20gJy4vZW1pdHRlcic7XG5pbXBvcnQgZXZlbnRCdXMgZnJvbSAnLi9ldmVudEJ1cyc7XG5pbXBvcnQgaGVhcnRiZWF0IGZyb20gJy4vaGVhcnRiZWF0JztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGRlYm91bmNlLFxuICAgIGRlbGVnYXRlRXZlbnRzLFxuICAgIGVtaXR0ZXIsXG4gICAgZXZlbnRCdXMsXG4gICAgaGVhcnRiZWF0XG59O1xuIiwibGV0IHRpbWUgPSAwO1xubGV0IGZwcyA9IDA7XG5sZXQgY3VycmVudEZwcyA9IDA7XG5sZXQgYXZlcmFnZUZwcyA9IDA7XG5sZXQgdGlja3MgPSAwO1xubGV0IHRvdGFsRnBzID0gMDtcbmxldCBsYXN0RnBzID0gMDtcbmxldCBsYXN0QXZlcmFnZSA9IDA7XG5sZXQgbG9nTXNnID0gbnVsbDtcblxuY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbmVsLnNldEF0dHJpYnV0ZSgnaWQnLCAnZnBzJyk7XG5lbC5zdHlsZS5mb250RmFtaWx5ID0gJ21vbm9zcGFjZSc7XG5lbC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG5lbC5zdHlsZS5sZWZ0ID0gJzAnO1xuZWwuc3R5bGUudG9wID0gJzAnO1xuZWwuc3R5bGUucGFkZGluZyA9ICcycHggNnB4JztcbmVsLnN0eWxlLnpJbmRleCA9ICc5OTk5OSc7XG5lbC5zdHlsZS5iYWNrZ3JvdW5kID0gJyMwMDAnO1xuZWwuc3R5bGUuY29sb3IgPSAnI2ZmZic7XG5lbC5zdHlsZS5mb250U2l6ZSA9ICcxMHB4JztcbmVsLnN0eWxlLnVzZXJTZWxlY3QgPSAnbm9uZSc7XG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsKTtcblxuZnVuY3Rpb24gcmVwb3J0KCkge1xuICAgIGxhc3RGcHMgPSBjdXJyZW50RnBzO1xuICAgIGxhc3RBdmVyYWdlID0gYXZlcmFnZUZwcztcbiAgICBlbC5pbm5lckhUTUwgPSBgRlBTOiAke2N1cnJlbnRGcHN9PGJyIC8+QVZFOiAke2F2ZXJhZ2VGcHN9YDtcblxuICAgIGlmIChsb2dNc2cpIHtcbiAgICAgICAgZWwuaW5uZXJIVE1MID0gYCR7ZWwuaW5uZXJIVE1MfTxiciAvPk1TRzogJHtsb2dNc2d9YDtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZShub3cpIHtcbiAgICBpZiAodHlwZW9mIG5vdyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgbm93ID0gRGF0ZS5ub3coKTtcbiAgICB9XG5cbiAgICBpZiAodGltZSA9PT0gMCkge1xuICAgICAgICB0aW1lID0gbm93O1xuICAgIH1cblxuICAgIGlmIChub3cgLSAxMDAwID4gdGltZSkge1xuICAgICAgICB0aW1lID0gbm93O1xuICAgICAgICBjdXJyZW50RnBzID0gZnBzO1xuICAgICAgICBmcHMgPSAwO1xuXG4gICAgICAgIGlmIChjdXJyZW50RnBzID4gMSkge1xuICAgICAgICAgICAgdGlja3MrKztcbiAgICAgICAgICAgIHRvdGFsRnBzICs9IGN1cnJlbnRGcHM7XG4gICAgICAgICAgICBhdmVyYWdlRnBzID0gTWF0aC5mbG9vcih0b3RhbEZwcyAvIHRpY2tzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjdXJyZW50RnBzICE9PSBsYXN0RnBzIHx8IGF2ZXJhZ2VGcHMgIT09IGxhc3RBdmVyYWdlKSB7XG4gICAgICAgICAgICByZXBvcnQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZwcysrO1xufVxuXG5mdW5jdGlvbiBhdXRvKCkge1xuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYXV0byk7XG4gICAgdXBkYXRlKCk7XG59XG5cbmZ1bmN0aW9uIGxvZyh2YWx1ZSkge1xuICAgIGxvZ01zZyA9IFN0cmluZyh2YWx1ZSk7XG4gICAgcmVwb3J0KCk7XG59XG5cbmZ1bmN0aW9uIHN0eWxlKHByb3BzKSB7XG4gICAgT2JqZWN0LmtleXMocHJvcHMpLmZvckVhY2goKHByb3ApID0+IHtcbiAgICAgICAgZWwuc3R5bGVbcHJvcF0gPSBwcm9wc1twcm9wXTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGF1dG8sXG4gICAgZWwsXG4gICAgbG9nLFxuICAgIHN0eWxlLFxuICAgIHVwZGF0ZVxufTtcbiIsImxldCByZXF1ZXN0ID0gbnVsbCxcbiAgICBleGl0ID0gbnVsbCxcbiAgICBjaGFuZ2UgPSBudWxsLFxuICAgIGVycm9yID0gbnVsbCxcbiAgICBlbGVtZW50ID0gbnVsbCxcbiAgICBlbmFibGVkID0gbnVsbDtcblxuY29uc3QgZG9jRWwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cbmlmICh0eXBlb2YgZG9jRWwucmVxdWVzdEZ1bGxzY3JlZW4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmVxdWVzdCA9ICdyZXF1ZXN0RnVsbHNjcmVlbic7XG4gICAgZXhpdCA9ICdleGl0RnVsbHNjcmVlbic7XG4gICAgY2hhbmdlID0gJ2Z1bGxzY3JlZW5jaGFuZ2UnO1xuICAgIGVycm9yID0gJ2Z1bGxzY3JlZW5lcnJvcic7XG4gICAgZWxlbWVudCA9ICdmdWxsc2NyZWVuRWxlbWVudCc7XG4gICAgZW5hYmxlZCA9ICdmdWxsc2NyZWVuRW5hYmxlZCc7XG59IGVsc2UgaWYgKHR5cGVvZiBkb2NFbC5tb3pSZXF1ZXN0RnVsbFNjcmVlbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXF1ZXN0ID0gJ21velJlcXVlc3RGdWxsU2NyZWVuJztcbiAgICBleGl0ID0gJ21vekNhbmNlbEZ1bGxTY3JlZW4nO1xuICAgIGNoYW5nZSA9ICdtb3pmdWxsc2NyZWVuY2hhbmdlJztcbiAgICBlcnJvciA9ICdtb3pmdWxsc2NyZWVuZXJyb3InO1xuICAgIGVsZW1lbnQgPSAnbW96RnVsbFNjcmVlbkVsZW1lbnQnO1xuICAgIGVuYWJsZWQgPSAnbW96RnVsbFNjcmVlbkVuYWJsZWQnO1xufSBlbHNlIGlmICh0eXBlb2YgZG9jRWwubXNSZXF1ZXN0RnVsbHNjcmVlbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXF1ZXN0ID0gJ21zUmVxdWVzdEZ1bGxzY3JlZW4nO1xuICAgIGV4aXQgPSAnbXNFeGl0RnVsbHNjcmVlbic7XG4gICAgY2hhbmdlID0gJ01TRnVsbHNjcmVlbkNoYW5nZSc7XG4gICAgZXJyb3IgPSAnTVNGdWxsc2NyZWVuRXJyb3InO1xuICAgIGVsZW1lbnQgPSAnbXNGdWxsc2NyZWVuRWxlbWVudCc7XG4gICAgZW5hYmxlZCA9ICdtc0Z1bGxzY3JlZW5FbmFibGVkJztcbn0gZWxzZSBpZiAodHlwZW9mIGRvY0VsLndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuICE9PSAndW5kZWZpbmVkJykge1xuICAgIHJlcXVlc3QgPSAnd2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4nO1xuICAgIGV4aXQgPSAnd2Via2l0RXhpdEZ1bGxzY3JlZW4nO1xuICAgIGNoYW5nZSA9ICd3ZWJraXRmdWxsc2NyZWVuY2hhbmdlJztcbiAgICBlcnJvciA9ICd3ZWJraXRGdWxsc2NyZWVuRXJyb3InO1xuICAgIGVsZW1lbnQgPSAnd2Via2l0RnVsbHNjcmVlbkVsZW1lbnQnO1xuICAgIGVuYWJsZWQgPSAnd2Via2l0RnVsbHNjcmVlbkVuYWJsZWQnO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgcmVxdWVzdCxcbiAgICBleGl0LFxuICAgIGNoYW5nZSxcbiAgICBlcnJvcixcbiAgICBlbGVtZW50LFxuICAgIGVuYWJsZWRcbn07XG4iLCJpbXBvcnQgYXBpIGZyb20gJy4vYXBpJztcbmltcG9ydCBlbWl0dGVyIGZyb20gJy4uL2V2ZW50cy9lbWl0dGVyJztcblxuY29uc3QgZnVsbHNjcmVlbiA9IE9iamVjdC5jcmVhdGUoZW1pdHRlci5wcm90b3R5cGUpO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGFwaS5jaGFuZ2UsIChldmVudCkgPT4ge1xuICAgIGZ1bGxzY3JlZW4uZW1pdCgnY2hhbmdlJywgZXZlbnQpO1xufSk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoYXBpLmVycm9yLCAoZXZlbnQpID0+IHtcbiAgICBmdWxsc2NyZWVuLmVtaXQoJ2Vycm9yJywgZXZlbnQpO1xufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGZ1bGxzY3JlZW4sIHtcbiAgICByZXF1ZXN0OiB7XG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbihlbCkge1xuICAgICAgICAgICAgZWwgPSBlbCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgICAgICBlbFthcGkucmVxdWVzdF0odHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGV4aXQ6IHtcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZG9jdW1lbnRbYXBpLmV4aXRdKCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHRvZ2dsZToge1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24oZWwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzRnVsbHNjcmVlbikge1xuICAgICAgICAgICAgICAgIHRoaXMuZXhpdCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlcXVlc3QoZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBpc1N1cHBvcnRlZDoge1xuICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICByZXR1cm4gISFhcGkucmVxdWVzdDtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgaXNGdWxsc2NyZWVuOiB7XG4gICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgIHJldHVybiAhIWRvY3VtZW50W2FwaS5lbGVtZW50XTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZWxlbWVudDoge1xuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnRbYXBpLmVsZW1lbnRdO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBlbmFibGVkOiB7XG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudFthcGkuZW5hYmxlZF07XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgZnVsbHNjcmVlbjtcbiIsImZ1bmN0aW9uIGdldENvbG91cihyLCBnLCBiLCBhID0gMSkge1xuICAgIGlmICh0eXBlb2YgciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIHI7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgciA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgcmV0dXJuIGByZ2JhKCR7cn0sJHtifSwke2d9LCR7YX0pYDtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyYXBoaWNzIHtcbiAgICBjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIGlmICh0eXBlb2Ygd2lkdGggPT09ICdvYmplY3QnICYmIHdpZHRoLnRhZ05hbWUgPT09ICdDQU5WQVMnKSB7XG4gICAgICAgICAgICB0aGlzLmNhbnZhcyA9IHdpZHRoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgICAgIHRoaXMuc2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgfVxuXG4gICAgZ2V0IGNvbnRleHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmN0eDtcbiAgICB9XG5cbiAgICBmaWxsKHIsIGcsIGIsIGEgPSAxKSB7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IGdldENvbG91cihyLCBnLCBiLCBhKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc3Ryb2tlKHIsIGcsIGIsIGEgPSAxKSB7XG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gZ2V0Q29sb3VyKHIsIGcsIGIsIGEpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBjaXJjbGUoeCwgeSwgcmFkaXVzKSB7XG4gICAgICAgIGNvbnN0IHtjdHh9ID0gdGhpcztcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguYXJjKHgsIHksIHJhZGl1cywgMCwgTWF0aC5QSSAqIDIsIGZhbHNlKTtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcmVjdCh4LCB5LCB3aWR0aCwgaGVpZ2h0LCBhbmdsZSA9IDApIHtcbiAgICAgICAgY29uc3Qge2N0eH0gPSB0aGlzO1xuICAgICAgICBpZiAoYW5nbGUgIT09IDApIHtcbiAgICAgICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgICAgICBjdHgudHJhbnNsYXRlKHggKyB3aWR0aCAvIDIsIHkgKyBoZWlnaHQgLyAyKTtcbiAgICAgICAgICAgIGN0eC5yb3RhdGUoYW5nbGUpO1xuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY3R4LnJlY3QoLXdpZHRoIC8gMiwgLWhlaWdodCAvIDIsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjdHgucmVjdCh4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgbGluZSh4MSwgeTEsIHgyLCB5Mikge1xuICAgICAgICBjb25zdCB7Y3R4fSA9IHRoaXM7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4Lm1vdmVUbyh4MSwgeTEpO1xuICAgICAgICBjdHgubGluZVRvKHgyLCB5Mik7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgbGluZVdpZHRoKHdpZHRoKSB7XG4gICAgICAgIHRoaXMuY3R4LmxpbmVXaWR0aCA9IHdpZHRoO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBtb3ZlKHgsIHkpIHtcbiAgICAgICAgdGhpcy5jdHgubW92ZVRvKHgsIHkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBpbWFnZShlbCwgeCwgeSwgb3B0aW9ucykge1xuICAgICAgICBjb25zdCB7Y3R4fSA9IHRoaXM7XG4gICAgICAgIGlmIChvcHRpb25zKSB7XG4gICAgICAgICAgICBjb25zdCB7YWxwaGEgPSAxLCByb3RhdGlvbiA9IDAsIHNjYWxlID0gMX0gPSBvcHRpb25zO1xuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0WCA9IGVsLndpZHRoIC8gMjtcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldFkgPSBlbC5oZWlnaHQgLyAyO1xuICAgICAgICAgICAgY3R4LnNhdmUoKTtcbiAgICAgICAgICAgIGN0eC50cmFuc2xhdGUoeCArIG9mZnNldFgsIHkgKyBvZmZzZXRZKTtcbiAgICAgICAgICAgIGN0eC5yb3RhdGUocm90YXRpb24pO1xuICAgICAgICAgICAgY3R4LnNjYWxlKHNjYWxlLCBzY2FsZSk7XG4gICAgICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSBhbHBoYTtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoZWwsIC1vZmZzZXRYLCAtb2Zmc2V0WSk7XG4gICAgICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShlbCwgeCwgeSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgdGV4dChzdHIsIHgsIHkpIHtcbiAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoc3RyLCB4LCB5KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2V0Rm9udFN0eWxlKGZhbWlseSwgc2l6ZSkge1xuICAgICAgICB0aGlzLmN0eC5mb250ID0gYCR7c2l6ZX1weCAke2ZhbWlseX1gO1xuICAgIH1cblxuICAgIGdldEltYWdlRGF0YSh4ID0gMCwgeSA9IDAsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgY29uc3Qge2N0eCwgY2FudmFzfSA9IHRoaXM7XG4gICAgICAgIHJldHVybiBjdHguZ2V0SW1hZ2VEYXRhKHgsIHksIHdpZHRoIHx8IGNhbnZhcy53aWR0aCwgaGVpZ2h0IHx8IGNhbnZhcy5oZWlnaHQpO1xuICAgIH1cblxuICAgIGdldFBpeGVsKHgsIHkpIHtcbiAgICAgICAgeCA9IE1hdGguZmxvb3IoeCk7XG4gICAgICAgIHkgPSBNYXRoLmZsb29yKHkpO1xuICAgICAgICBjb25zdCB7ZGF0YX0gPSB0aGlzLmN0eC5nZXRJbWFnZURhdGEoeCwgeSwgMSwgMSk7XG4gICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkYXRhKTtcbiAgICB9XG5cbiAgICBzZXRQaXhlbCh4LCB5LCByLCBnLCBiLCBhKSB7XG4gICAgICAgIHggPSBNYXRoLmZsb29yKHgpO1xuICAgICAgICB5ID0gTWF0aC5mbG9vcih5KTtcbiAgICAgICAgY29uc3Qge3dpZHRoLCBkYXRhfSA9IHRoaXMuZ2V0SW1hZ2VEYXRhKCk7XG4gICAgICAgIGNvbnN0IGkgPSAoeCArIHkgKiB3aWR0aCkgKiA0O1xuICAgICAgICBkYXRhW2kgKyAwXSA9IHI7XG4gICAgICAgIGRhdGFbaSArIDFdID0gZztcbiAgICAgICAgZGF0YVtpICsgMl0gPSBiO1xuICAgICAgICBkYXRhW2kgKyAzXSA9IGE7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGNsZWFyQ2lyY2xlKHgsIHksIHJhZGl1cyA9IDIwKSB7XG4gICAgICAgIGNvbnN0IHtjdHh9ID0gdGhpcztcbiAgICAgICAgY3R4LnNhdmUoKTtcbiAgICAgICAgY3R4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdkZXN0aW5hdGlvbi1vdXQnO1xuICAgICAgICB0aGlzLmNpcmNsZSh4LCB5LCByYWRpdXMpO1xuICAgICAgICBjdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ3NvdXJjZS1vdmVyJztcbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgdHJhbnNsYXRlQW5kKHgsIHksIGZuKSB7XG4gICAgICAgIGNvbnN0IHtjdHh9ID0gdGhpcztcbiAgICAgICAgY3R4LnNhdmUoKTtcbiAgICAgICAgY3R4LnRyYW5zbGF0ZSh4LCB5KTtcbiAgICAgICAgZm4oY3R4KTtcbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgY2xlYXIociwgZywgYiwgYSA9IDEpIHtcbiAgICAgICAgY29uc3QgY29sb3IgPSBnZXRDb2xvdXIociwgZywgYiwgYSk7XG4gICAgICAgIGNvbnN0IHtjdHh9ID0gdGhpcztcbiAgICAgICAgY29uc3Qge3dpZHRoLCBoZWlnaHR9ID0gdGhpcy5jYW52YXM7XG4gICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgIGN0eC5zZXRUcmFuc2Zvcm0oMSwgMCwgMCwgMSwgMCwgMCk7XG4gICAgICAgIGlmIChjb2xvcikge1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgfVxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNpemUod2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCwgaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0KSB7XG4gICAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FudmFzLnBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuY2FudmFzLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQodGhpcy5jYW52YXMpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2FudmFzID0gbnVsbDtcbiAgICAgICAgdGhpcy5jdHggPSBudWxsO1xuICAgIH1cbn1cbiIsImltcG9ydCBsb2FkU2NyaXB0IGZyb20gJy4uL2h0dHAvbG9hZFNjcmlwdCc7XG5pbXBvcnQgaXNMb2NhbEhvc3QgZnJvbSAnLi4vcGxhdGZvcm0vaXNMb2NhbEhvc3QnO1xuXG4vLyBleGFtcGxlIHVzYWdlOlxuLy9cbi8vIGNvbnN0IG9wdHMgPSB7XG4vLyAgICAgZnJpY3Rpb246IDAuOSxcbi8vICAgICBtYXhTcGVlZDogMVxuLy8gfTtcbi8vIGd1aSh0cnVlKVxuLy8gICAgIC50aGVuKChnKSA9PiB7XG4vLyAgICAgICAgIGcuYWRkKG9wdHMsICdmcmljdGlvbicsIDAuNywgMC45OTkpO1xuLy8gICAgICAgICBnLmFkZChvcHRzLCAnbWF4U3BlZWQnLCAwLjUsIDIpLm9uQ2hhbmdlKCh2YWx1ZSkgPT4gY29uc29sZS5sb2codmFsdWUpKTtcbi8vICAgICB9KVxuLy8gICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmVycm9yKGVycikpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBndWkobG9jYWxob3N0T25seSA9IGZhbHNlKSB7XG4gICAgaWYgKGxvY2FsaG9zdE9ubHkgJiYgIWlzTG9jYWxIb3N0KCkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKCgpID0+IHt9KTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgbG9hZFNjcmlwdCgnaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvZGF0LWd1aS8wLjYuMS9kYXQuZ3VpLm1pbi5qcycsIChlcnIsIHNyYykgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGxvYWRpbmcgc2NyaXB0Jywgc3JjKTtcbiAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdFcnJvciBsb2FkaW5nIHNjcmlwdCcpKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBnID0gbmV3IHdpbmRvdy5kYXQuR1VJKHthdXRvUGxhY2U6IHRydWV9KTtcbiAgICAgICAgICAgIGNvbnN0IHMgPSBkb2N1bWVudC5zdHlsZVNoZWV0c1swXTtcbiAgICAgICAgICAgIHMuaW5zZXJ0UnVsZSgnLmRnLmFjIHt6LWluZGV4OjEwMDAwICFpbXBvcnRhbnR9JywgMCk7XG4gICAgICAgICAgICBzLmluc2VydFJ1bGUoJy5kZyAqIHtmb250LXNpemU6MTFweCAhaW1wb3J0YW50fScsIDApO1xuICAgICAgICAgICAgcy5pbnNlcnRSdWxlKCcuZGcgaW5wdXQge2ZvbnQ6MTFweCBMdWNpZGEgR3JhbmRlLHNhbnMtc2VyaWYgIWltcG9ydGFudH0nLCAwKTtcbiAgICAgICAgICAgIHJlc29sdmUoZyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG5ndWkuaXNMb2NhbEhvc3QgPSBpc0xvY2FsSG9zdDtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldExvY2F0aW9uKGhyZWYpIHtcbiAgICBjb25zdCBsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGwuaHJlZiA9IGhyZWY7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBoYXNoOiBsLmhhc2gsXG4gICAgICAgIGhvc3Q6IGwuaG9zdCxcbiAgICAgICAgaG9zdG5hbWU6IGwuaG9zdG5hbWUsXG4gICAgICAgIHBhdGhuYW1lOiBsLnBhdGhuYW1lLFxuICAgICAgICBwb3J0OiBsLnBvcnQsXG4gICAgICAgIHByb3RvY29sOiBsLnByb3RvY29sLFxuICAgICAgICBzZWFyY2g6IGwuc2VhcmNoXG4gICAgfTtcbn1cbiIsImltcG9ydCBnZXRMb2NhdGlvbiBmcm9tICcuL2dldExvY2F0aW9uJztcbmltcG9ydCBqc29ucCBmcm9tICcuL2pzb25wJztcbmltcG9ydCBsb2FkU2NyaXB0IGZyb20gJy4vbG9hZFNjcmlwdCc7XG5pbXBvcnQgdXJsUGFyYW1zIGZyb20gJy4vdXJsUGFyYW1zJztcbmltcG9ydCB4aHIgZnJvbSAnLi94aHInO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZ2V0TG9jYXRpb24sXG4gICAganNvbnAsXG4gICAgbG9hZFNjcmlwdCxcbiAgICB1cmxQYXJhbXMsXG4gICAgeGhyXG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ganNvbnAodXJsLCBjYiwgdGltZW91dCA9IDUwMDApIHtcbiAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICBjb25zdCBjYWxsYmFjayA9IGBqc29ucF9jYWxsYmFja18ke01hdGgucm91bmQoMTAwMDAwICogTWF0aC5yYW5kb20oKSl9YDtcbiAgICBjb25zdCBzZXBhcmF0b3IgPSB1cmwuaW5kZXhPZignPycpID49IDAgPyAnJicgOiAnPyc7XG5cbiAgICBjb25zdCB0aW1lb3V0SWQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHdpbmRvd1tjYWxsYmFja10obnVsbCwgJ2pzb25wIGVycm9yJyk7XG4gICAgfSwgdGltZW91dCk7XG5cbiAgICB3aW5kb3dbY2FsbGJhY2tdID0gZnVuY3Rpb24oZGF0YSwgZXJyID0gbnVsbCkge1xuICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XG4gICAgICAgIGRlbGV0ZSB3aW5kb3dbY2FsbGJhY2tdO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHNjcmlwdCk7XG4gICAgICAgIGNiKGRhdGEsIGVycik7XG4gICAgfTtcblxuICAgIHNjcmlwdC5zcmMgPSBgJHt1cmx9JHtzZXBhcmF0b3J9Y2FsbGJhY2s9JHtjYWxsYmFja31gO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvYWRTY3JpcHQoc3JjLCBjYikge1xuICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgIHNjcmlwdC5zcmMgPSBzcmM7XG4gICAgc2NyaXB0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiBjYihudWxsLCBzcmMpKTtcbiAgICBzY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoKSA9PiBjYih0cnVlLCBzcmMpKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgcmV0dXJuIHNjcmlwdDtcbn1cbiIsImNvbnN0IHBsdXMgPSAvXFwrL2c7ICAvLyBtYXRjaCAnKycgc3ltYm9sXG5jb25zdCBzZWFyY2ggPSAvKFteJj1dKyk9PyhbXiZdKikvZztcblxuZnVuY3Rpb24gZGVjb2RlKHN0cikge1xuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoc3RyLnJlcGxhY2UocGx1cywgJyAnKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVybFBhcmFtcyhxdWVyeSkge1xuICAgIHF1ZXJ5ID0gcXVlcnkgfHwgd2luZG93LmxvY2F0aW9uLnNlYXJjaC5zbGljZSgxKTtcblxuICAgIGNvbnN0IHBhcmFtcyA9IHt9O1xuICAgIGxldCBtYXRjaCA9IHNlYXJjaC5leGVjKHF1ZXJ5KTtcbiAgICB3aGlsZSAobWF0Y2gpIHtcbiAgICAgICAgcGFyYW1zW2RlY29kZShtYXRjaFsxXSldID0gZGVjb2RlKG1hdGNoWzJdKTtcbiAgICAgICAgbWF0Y2ggPSBzZWFyY2guZXhlYyhxdWVyeSk7XG4gICAgfVxuICAgIHJldHVybiBwYXJhbXM7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB4aHIodXJsLCB0eXBlID0gJ2pzb24nKSB7XG4gICAgY29uc3QgcCA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgY29uc3QgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHJlcS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHJlc3BvbnNlID0gcmVxLnJlc3BvbnNlO1xuICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdqc29uJyAmJiB0eXBlb2YgcmVzcG9uc2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmVxLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgKCkgPT4gcmVqZWN0KHJlcS5zdGF0dXMpKTtcbiAgICAgICAgcmVxLm9wZW4oJ0dFVCcsIHVybCk7XG4gICAgICAgIHJlcS5yZXNwb25zZVR5cGUgPSB0eXBlO1xuICAgICAgICAvLyByZXEuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnKTtcbiAgICAgICAgcmVxLnNlbmQoKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcDtcbn1cbiIsImltcG9ydCAnLi9wb2x5ZmlsbCc7XG5pbXBvcnQgYXJyYXkgZnJvbSAnLi9hcnJheSc7XG5pbXBvcnQgZG9tIGZyb20gJy4vZG9tJztcbmltcG9ydCBlYXNlIGZyb20gJy4vZWFzZSc7XG5pbXBvcnQgZXZlbnRzIGZyb20gJy4vZXZlbnRzJztcbmltcG9ydCBmcHMgZnJvbSAnLi9mcHMnO1xuaW1wb3J0IGZ1bGxzY3JlZW4gZnJvbSAnLi9mdWxsc2NyZWVuJztcbmltcG9ydCBncmFwaGljcyBmcm9tICcuL2dyYXBoaWNzJztcbmltcG9ydCBndWkgZnJvbSAnLi9ndWknO1xuaW1wb3J0IGh0dHAgZnJvbSAnLi9odHRwJztcbmltcG9ydCBpbnB1dCBmcm9tICcuL2lucHV0JztcbmltcG9ydCBsaW5rZWRMaXN0IGZyb20gJy4vbGlua2VkLWxpc3QnO1xuaW1wb3J0IG1hdGggZnJvbSAnLi9tYXRoJztcbmltcG9ydCBtZWRpYSBmcm9tICcuL21lZGlhJztcbmltcG9ydCBvYmplY3QgZnJvbSAnLi9vYmplY3QnO1xuaW1wb3J0IG9iamVjdFBvb2wgZnJvbSAnLi9vYmplY3QtcG9vbCc7XG5pbXBvcnQgUGFydGljbGUgZnJvbSAnLi9wYXJ0aWNsZSc7XG5pbXBvcnQgUGFydGljbGVHcm91cCBmcm9tICcuL3BhcnRpY2xlJztcbmltcG9ydCBwbGF0Zm9ybSBmcm9tICcuL3BsYXRmb3JtJztcbmltcG9ydCBwb3B1cCBmcm9tICcuL3BvcHVwJztcbmltcG9ydCBRdWFkVHJlZSBmcm9tICcuL3F1YWQtdHJlZSc7XG5pbXBvcnQgc2hhcmUgZnJvbSAnLi9zaGFyZSc7XG5pbXBvcnQgc3RvcmFnZSBmcm9tICcuL3N0b3JhZ2UnO1xuaW1wb3J0IHN0cmluZyBmcm9tICcuL3N0cmluZyc7XG5pbXBvcnQgVGlja2VyIGZyb20gJy4vdGlja2VyJztcbmltcG9ydCB0cmFjayBmcm9tICcuL3RyYWNrJztcbmltcG9ydCBUd2VlbiBmcm9tICcuL3R3ZWVuJztcbmltcG9ydCB2aXNpYmlsaXR5IGZyb20gJy4vdmlzaWJpbGl0eSc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBhcnJheSxcbiAgICBkb20sXG4gICAgZWFzZSxcbiAgICBldmVudHMsXG4gICAgZnBzLFxuICAgIGZ1bGxzY3JlZW4sXG4gICAgZ3JhcGhpY3MsXG4gICAgZ3VpLFxuICAgIGh0dHAsXG4gICAgaW5wdXQsXG4gICAgbGlua2VkTGlzdCxcbiAgICBtYXRoLFxuICAgIG1lZGlhLFxuICAgIG9iamVjdCxcbiAgICBvYmplY3RQb29sLFxuICAgIFBhcnRpY2xlLFxuICAgIFBhcnRpY2xlR3JvdXAsXG4gICAgcGxhdGZvcm0sXG4gICAgcG9wdXAsXG4gICAgUXVhZFRyZWUsXG4gICAgc2hhcmUsXG4gICAgc3RvcmFnZSxcbiAgICBzdHJpbmcsXG4gICAgVGlja2VyLFxuICAgIFR3ZWVuLFxuICAgIHRyYWNrLFxuICAgIHZpc2liaWxpdHlcbn07XG4iLCJmdW5jdGlvbiBnZXRUZXN0KGVsKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZWwpKSB7XG4gICAgICAgIHJldHVybiB0YXJnZXQgPT4gZWwuaW5jbHVkZXModGFyZ2V0KTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBlbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gdGFyZ2V0ID0+IGVsKHRhcmdldCk7XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQgPT4gdGFyZ2V0ID09PSBlbDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2xpY2tPdXRzaWRlKGVsLCBmbikge1xuICAgIGNvbnN0IHRlc3QgPSBnZXRUZXN0KGVsKTtcblxuICAgIGZ1bmN0aW9uIG9uQ2xpY2tPdXRzaWRlKGV2ZW50KSB7XG4gICAgICAgIGxldCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIGxldCBpbnNpZGUgPSBmYWxzZTtcblxuICAgICAgICB3aGlsZSAodGFyZ2V0ICE9PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgICAgICBpZiAodGVzdCh0YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgaW5zaWRlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnROb2RlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpbnNpZGUpIHtcbiAgICAgICAgICAgIGZuKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uVG91Y2hPdXRzaWRlKGV2ZW50KSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNsaWNrT3V0c2lkZSk7XG4gICAgICAgIG9uQ2xpY2tPdXRzaWRlKGV2ZW50KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25DbGlja091dHNpZGUpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBvblRvdWNoT3V0c2lkZSk7XG4gICAgfVxuXG4gICAgZGVzdHJveSgpO1xuXG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uQ2xpY2tPdXRzaWRlKTtcbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBvblRvdWNoT3V0c2lkZSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBkZXN0cm95XG4gICAgfTtcbn1cbiIsImltcG9ydCBjbGlja091dHNpZGUgZnJvbSAnLi9jbGlja091dHNpZGUnO1xuaW1wb3J0IGtleWJvYXJkIGZyb20gJy4va2V5Ym9hcmQnO1xuaW1wb3J0IGtleUlucHV0IGZyb20gJy4va2V5SW5wdXQnO1xuaW1wb3J0IG1pY3JvcGhvbmUgZnJvbSAnLi9taWNyb3Bob25lJztcbmltcG9ydCBtb3VzZUxlZnRXaW5kb3cgZnJvbSAnLi9tb3VzZUxlZnRXaW5kb3cnO1xuaW1wb3J0IG1vdXNlV2hlZWwgZnJvbSAnLi9tb3VzZVdoZWVsJztcbmltcG9ydCBwb2ludGVyQ29vcmRzIGZyb20gJy4vcG9pbnRlckNvb3Jkcyc7XG5pbXBvcnQgdG91Y2hJbnB1dCBmcm9tICcuL3RvdWNoSW5wdXQnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgY2xpY2tPdXRzaWRlLFxuICAgIGtleWJvYXJkLFxuICAgIGtleUlucHV0LFxuICAgIG1pY3JvcGhvbmUsXG4gICAgbW91c2VMZWZ0V2luZG93LFxuICAgIG1vdXNlV2hlZWwsXG4gICAgcG9pbnRlckNvb3JkcyxcbiAgICB0b3VjaElucHV0XG59O1xuIiwiaW1wb3J0IGFycmF5IGZyb20gJy4uL2FycmF5L2FycmF5JztcbmltcG9ydCBlbWl0dGVyIGZyb20gJy4uL2V2ZW50cy9lbWl0dGVyJztcbmltcG9ydCBrZXlib2FyZCBmcm9tICcuL2tleWJvYXJkJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ga2V5SW5wdXQoKSB7XG4gICAgY29uc3QgYXBpID0gT2JqZWN0LmNyZWF0ZShlbWl0dGVyLnByb3RvdHlwZSk7XG4gICAgY29uc3Qga2V5cyA9IGFycmF5KDI1NiwgZmFsc2UpO1xuXG4gICAgZnVuY3Rpb24gZW1pdEtleShrZXlDb2RlKSB7XG4gICAgICAgIGNvbnN0IGtleU5hbWUgPSBPYmplY3Qua2V5cyhrZXlib2FyZCkucmVkdWNlKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ga2V5Ym9hcmRba2V5XSA9PT0ga2V5Q29kZSA/IGtleSA6IHZhbHVlO1xuICAgICAgICB9LCAnJykudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgaWYgKGtleU5hbWUpIHtcbiAgICAgICAgICAgIGFwaS5lbWl0KGtleU5hbWUudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbktleURvd24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAga2V5c1tldmVudC5rZXlDb2RlXSA9IHRydWU7XG4gICAgICAgIGFwaS5lbWl0KCdrZXlkb3duJywgZXZlbnQua2V5Q29kZSk7XG4gICAgICAgIGVtaXRLZXkoZXZlbnQua2V5Q29kZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25LZXlVcChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBrZXlzW2V2ZW50LmtleUNvZGVdID0gZmFsc2U7XG4gICAgICAgIGFwaS5lbWl0KCdrZXl1cCcsIGV2ZW50LmtleUNvZGUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZCgpIHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uS2V5RG93biwgZmFsc2UpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIG9uS2V5VXAsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbktleURvd24pO1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXl1cCcsIG9uS2V5VXApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzRG93bihrZXkpIHtcbiAgICAgICAgcmV0dXJuIGtleXNba2V5XTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsZWZ0KCkge1xuICAgICAgICByZXR1cm4ga2V5c1trZXlib2FyZC5MRUZUXSB8fCBrZXlzW2tleWJvYXJkLkFdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJpZ2h0KCkge1xuICAgICAgICByZXR1cm4ga2V5c1trZXlib2FyZC5SSUdIVF0gfHwga2V5c1trZXlib2FyZC5EXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cCgpIHtcbiAgICAgICAgcmV0dXJuIGtleXNba2V5Ym9hcmQuVVBdIHx8IGtleXNba2V5Ym9hcmQuV107XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZG93bigpIHtcbiAgICAgICAgcmV0dXJuIGtleXNba2V5Ym9hcmQuRE9XTl0gfHwga2V5c1trZXlib2FyZC5TXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzcGFjZSgpIHtcbiAgICAgICAgcmV0dXJuIGtleXNba2V5Ym9hcmQuU1BBQ0VdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVuYWJsZSh2YWx1ZSA9IHRydWUpIHtcbiAgICAgICAgcmVtb3ZlKCk7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgYWRkKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGQoKTtcblxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKGFwaSwge1xuICAgICAgICBrZXlib2FyZCxcbiAgICAgICAgZW5hYmxlLFxuICAgICAgICBpc0Rvd24sXG4gICAgICAgIGxlZnQsXG4gICAgICAgIHJpZ2h0LFxuICAgICAgICB1cCxcbiAgICAgICAgZG93bixcbiAgICAgICAgc3BhY2VcbiAgICB9KTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IHtcbiAgICBBOiAnQScuY2hhckNvZGVBdCgwKSxcbiAgICBCOiAnQicuY2hhckNvZGVBdCgwKSxcbiAgICBDOiAnQycuY2hhckNvZGVBdCgwKSxcbiAgICBEOiAnRCcuY2hhckNvZGVBdCgwKSxcbiAgICBFOiAnRScuY2hhckNvZGVBdCgwKSxcbiAgICBGOiAnRicuY2hhckNvZGVBdCgwKSxcbiAgICBHOiAnRycuY2hhckNvZGVBdCgwKSxcbiAgICBIOiAnSCcuY2hhckNvZGVBdCgwKSxcbiAgICBJOiAnSScuY2hhckNvZGVBdCgwKSxcbiAgICBKOiAnSicuY2hhckNvZGVBdCgwKSxcbiAgICBLOiAnSycuY2hhckNvZGVBdCgwKSxcbiAgICBMOiAnTCcuY2hhckNvZGVBdCgwKSxcbiAgICBNOiAnTScuY2hhckNvZGVBdCgwKSxcbiAgICBOOiAnTicuY2hhckNvZGVBdCgwKSxcbiAgICBPOiAnTycuY2hhckNvZGVBdCgwKSxcbiAgICBQOiAnUCcuY2hhckNvZGVBdCgwKSxcbiAgICBROiAnUScuY2hhckNvZGVBdCgwKSxcbiAgICBSOiAnUicuY2hhckNvZGVBdCgwKSxcbiAgICBTOiAnUycuY2hhckNvZGVBdCgwKSxcbiAgICBUOiAnVCcuY2hhckNvZGVBdCgwKSxcbiAgICBVOiAnVScuY2hhckNvZGVBdCgwKSxcbiAgICBWOiAnVicuY2hhckNvZGVBdCgwKSxcbiAgICBXOiAnVycuY2hhckNvZGVBdCgwKSxcbiAgICBYOiAnWCcuY2hhckNvZGVBdCgwKSxcbiAgICBZOiAnWScuY2hhckNvZGVBdCgwKSxcbiAgICBaOiAnWicuY2hhckNvZGVBdCgwKSxcbiAgICBaRVJPOiAnMCcuY2hhckNvZGVBdCgwKSxcbiAgICBPTkU6ICcxJy5jaGFyQ29kZUF0KDApLFxuICAgIFRXTzogJzInLmNoYXJDb2RlQXQoMCksXG4gICAgVEhSRUU6ICczJy5jaGFyQ29kZUF0KDApLFxuICAgIEZPVVI6ICc0Jy5jaGFyQ29kZUF0KDApLFxuICAgIEZJVkU6ICc1Jy5jaGFyQ29kZUF0KDApLFxuICAgIFNJWDogJzYnLmNoYXJDb2RlQXQoMCksXG4gICAgU0VWRU46ICc3Jy5jaGFyQ29kZUF0KDApLFxuICAgIEVJR0hUOiAnOCcuY2hhckNvZGVBdCgwKSxcbiAgICBOSU5FOiAnOScuY2hhckNvZGVBdCgwKSxcbiAgICBOVU1QQURfMDogOTYsXG4gICAgTlVNUEFEXzE6IDk3LFxuICAgIE5VTVBBRF8yOiA5OCxcbiAgICBOVU1QQURfMzogOTksXG4gICAgTlVNUEFEXzQ6IDEwMCxcbiAgICBOVU1QQURfNTogMTAxLFxuICAgIE5VTVBBRF82OiAxMDIsXG4gICAgTlVNUEFEXzc6IDEwMyxcbiAgICBOVU1QQURfODogMTA0LFxuICAgIE5VTVBBRF85OiAxMDUsXG4gICAgTlVNUEFEX01VTFRJUExZOiAxMDYsXG4gICAgTlVNUEFEX0FERDogMTA3LFxuICAgIE5VTVBBRF9FTlRFUjogMTA4LFxuICAgIE5VTVBBRF9TVUJUUkFDVDogMTA5LFxuICAgIE5VTVBBRF9ERUNJTUFMOiAxMTAsXG4gICAgTlVNUEFEX0RJVklERTogMTExLFxuICAgIEYxOiAxMTIsXG4gICAgRjI6IDExMyxcbiAgICBGMzogMTE0LFxuICAgIEY0OiAxMTUsXG4gICAgRjU6IDExNixcbiAgICBGNjogMTE3LFxuICAgIEY3OiAxMTgsXG4gICAgRjg6IDExOSxcbiAgICBGOTogMTIwLFxuICAgIEYxMDogMTIxLFxuICAgIEYxMTogMTIyLFxuICAgIEYxMjogMTIzLFxuICAgIEYxMzogMTI0LFxuICAgIEYxNDogMTI1LFxuICAgIEYxNTogMTI2LFxuICAgIENPTE9OOiAxODYsXG4gICAgRVFVQUxTOiAxODcsXG4gICAgVU5ERVJTQ09SRTogMTg5LFxuICAgIFFVRVNUSU9OX01BUks6IDE5MSxcbiAgICBUSUxERTogMTkyLFxuICAgIE9QRU5fQlJBQ0tFVDogMjE5LFxuICAgIEJBQ0tXQVJEX1NMQVNIOiAyMjAsXG4gICAgQ0xPU0VEX0JSQUNLRVQ6IDIyMSxcbiAgICBRVU9URVM6IDIyMixcbiAgICBCQUNLU1BBQ0U6IDgsXG4gICAgVEFCOiA5LFxuICAgIENMRUFSOiAxMixcbiAgICBFTlRFUjogMTMsXG4gICAgU0hJRlQ6IDE2LFxuICAgIENPTlRST0w6IDE3LFxuICAgIEFMVDogMTgsXG4gICAgQ0FQU19MT0NLOiAyMCxcbiAgICBFU0M6IDI3LFxuICAgIFNQQUNFOiAzMixcbiAgICBQQUdFX1VQOiAzMyxcbiAgICBQQUdFX0RPV046IDM0LFxuICAgIEVORDogMzUsXG4gICAgSE9NRTogMzYsXG4gICAgTEVGVDogMzcsXG4gICAgVVA6IDM4LFxuICAgIFJJR0hUOiAzOSxcbiAgICBET1dOOiA0MCxcbiAgICBJTlNFUlQ6IDQ1LFxuICAgIERFTEVURTogNDYsXG4gICAgSEVMUDogNDcsXG4gICAgTlVNX0xPQ0s6IDE0NFxufTtcbiIsImltcG9ydCBlbWl0dGVyIGZyb20gJy4uL2V2ZW50cy9lbWl0dGVyJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWljcm9waG9uZSgpIHtcbiAgICBjb25zdCBtaWMgPSBPYmplY3QuY3JlYXRlKGVtaXR0ZXIucHJvdG90eXBlKTtcbiAgICBsZXQgc3RyZWFtID0gbnVsbDtcblxuICAgIGNvbnN0IGdldFVzZXJNZWRpYSA9IChuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhIHx8XG4gICAgICAgIG5hdmlnYXRvci53ZWJraXRHZXRVc2VyTWVkaWEgfHxcbiAgICAgICAgbmF2aWdhdG9yLm1vekdldFVzZXJNZWRpYSB8fFxuICAgICAgICBuYXZpZ2F0b3IubXNHZXRVc2VyTWVkaWEpO1xuXG4gICAgY29uc3QgaXNTdXBwb3J0ZWQgPSAhIWdldFVzZXJNZWRpYTtcblxuICAgIGZ1bmN0aW9uIGNvbm5lY3QoKSB7XG4gICAgICAgIGlmICghaXNTdXBwb3J0ZWQpIHtcbiAgICAgICAgICAgIG1pYy5lbWl0KCdlcnJvcicsICdOb3Qgc3VwcG9ydGVkJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZ2V0VXNlck1lZGlhKHtcbiAgICAgICAgICAgIGF1ZGlvOiB0cnVlXG4gICAgICAgIH0sIChtZWRpYVN0cmVhbSkgPT4ge1xuICAgICAgICAgICAgc3RyZWFtID0gbWVkaWFTdHJlYW07XG4gICAgICAgICAgICBtaWMuZW1pdCgnY29ubmVjdCcsIHN0cmVhbSk7XG4gICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZS5uYW1lID09PSAnUGVybWlzc2lvbkRlbmllZEVycm9yJyB8fCBlID09PSAnUEVSTUlTU0lPTl9ERU5JRUQnKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1Blcm1pc3Npb24gZGVuaWVkLiBVbmRvIGJ5IGNsaWNraW5nIHRoZSBjYW1lcmEgaWNvbiBpbiB0aGUgYWRkcmVzcyBiYXInKTtcbiAgICAgICAgICAgICAgICBtaWMuZW1pdCgnZGVuaWVkJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1pYy5lbWl0KCdlcnJvcicsIGUubWVzc2FnZSB8fCBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGlzY29ubmVjdCgpIHtcbiAgICAgICAgaWYgKHN0cmVhbSkge1xuICAgICAgICAgICAgc3RyZWFtLnN0b3AoKTtcbiAgICAgICAgICAgIHN0cmVhbSA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVXZWJBdWRpb1NvdXJjZSh3ZWJBdWRpb0NvbnRleHQsIGNvbm5lY3RUbykge1xuICAgICAgICBpZiAoIXN0cmVhbSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzb3VyY2UgPSB3ZWJBdWRpb0NvbnRleHQuY3JlYXRlTWVkaWFTdHJlYW1Tb3VyY2Uoc3RyZWFtKTtcblxuICAgICAgICBpZiAoY29ubmVjdFRvKSB7XG4gICAgICAgICAgICBzb3VyY2UuY29ubmVjdChjb25uZWN0VG8pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSEFDSzogc3RvcHMgbW96IGdhcmJhZ2UgY29sbGVjdGlvbiBraWxsaW5nIHRoZSBzdHJlYW1cbiAgICAgICAgLy8gc2VlIGh0dHBzOi8vc3VwcG9ydC5tb3ppbGxhLm9yZy9lbi1VUy9xdWVzdGlvbnMvOTg0MTc5XG4gICAgICAgIGlmIChuYXZpZ2F0b3IubW96R2V0VXNlck1lZGlhKSB7XG4gICAgICAgICAgICB3aW5kb3cuaGFja19mb3JfbW96aWxsYSA9IHNvdXJjZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzb3VyY2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24obWljLCB7XG4gICAgICAgIGNvbm5lY3QsXG4gICAgICAgIGRpc2Nvbm5lY3QsXG4gICAgICAgIGNyZWF0ZVdlYkF1ZGlvU291cmNlLFxuICAgICAgICBpc1N1cHBvcnRlZDogKCkgPT4gaXNTdXBwb3J0ZWQsXG4gICAgICAgIHN0cmVhbTogKCkgPT4gc3RyZWFtXG4gICAgfSk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtb3VzZUxlZnRXaW5kb3coZm4pIHtcbiAgICBmdW5jdGlvbiBoYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGZyb20gPSBldmVudC5yZWxhdGVkVGFyZ2V0IHx8IGV2ZW50LnRvRWxlbWVudDtcbiAgICAgICAgaWYgKCFmcm9tIHx8IGZyb20ubm9kZU5hbWUgPT09ICdIVE1MJykge1xuICAgICAgICAgICAgZm4oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBoYW5kbGVyLCBmYWxzZSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBkZXN0cm95ICgpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgaGFuZGxlcik7XG4gICAgICAgIH1cbiAgICB9O1xufVxuIiwiaW1wb3J0IGVtaXR0ZXIgZnJvbSAnLi4vZXZlbnRzL2VtaXR0ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtb3VzZVdoZWVsKHNwZWVkKSB7XG4gICAgc3BlZWQgPSBzcGVlZCB8fCAyO1xuXG4gICAgbGV0IHdoZWVsO1xuXG4gICAgZnVuY3Rpb24gd2hlZWxIYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IChldmVudC5kZXRhaWwgPCAwIHx8IGV2ZW50LndoZWVsRGVsdGEgPiAwKSA/IDEgOiAtMTtcbiAgICAgICAgY29uc3QgZGVsdGEgPSBkaXJlY3Rpb24gKiBzcGVlZDtcblxuICAgICAgICBpZiAoZGlyZWN0aW9uID4gMCkge1xuICAgICAgICAgICAgd2hlZWwuZW1pdCgndXAnLCBkZWx0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3aGVlbC5lbWl0KCdkb3duJywgZGVsdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgd2hlZWwuZW1pdCgndXBkYXRlJywgZGVsdGEpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZCgpIHtcbiAgICAgICAgaWYgKCdvbm1vdXNld2hlZWwnIGluIHdpbmRvdykge1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNld2hlZWwnLCB3aGVlbEhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIGlmICh3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTU1vdXNlU2Nyb2xsJywgd2hlZWxIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICAgIGlmICgnb25tb3VzZXdoZWVsJyBpbiB3aW5kb3cpIHtcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXdoZWVsJywgd2hlZWxIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSBpZiAod2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdET01Nb3VzZVNjcm9sbCcsIHdoZWVsSGFuZGxlciwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkKCk7XG5cbiAgICB3aGVlbCA9IE9iamVjdC5jcmVhdGUoZW1pdHRlci5wcm90b3R5cGUsIHtcbiAgICAgICAgX2V2ZW50czoge1xuICAgICAgICAgICAgdmFsdWU6IHt9XG4gICAgICAgIH0sXG4gICAgICAgIGFkZDoge1xuICAgICAgICAgICAgdmFsdWU6IGFkZFxuICAgICAgICB9LFxuICAgICAgICByZW1vdmU6IHtcbiAgICAgICAgICAgIHZhbHVlOiByZW1vdmVcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUod2hlZWwpO1xufVxuIiwiaW1wb3J0IGdldFBhZ2VIZWlnaHQgZnJvbSAnLi4vZG9tL2dldFBhZ2VIZWlnaHQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwb2ludGVyQ29vcmRzKCkge1xuICAgIGxldCBzZWxmID0gbnVsbDtcblxuICAgIGZ1bmN0aW9uIGNhbGN1bGF0ZUNvb3JkcyhldmVudCkge1xuICAgICAgICBjb25zdCB0b3VjaCA9IGV2ZW50LnRvdWNoZXMgJiYgZXZlbnQudG91Y2hlcy5sZW5ndGg7XG4gICAgICAgIGNvbnN0IHAgPSB0b3VjaCA/IGV2ZW50LnRvdWNoZXNbMF0gOiBldmVudDtcbiAgICAgICAgY29uc3QgY1ggPSBwLmNsaWVudFggfHwgMDtcbiAgICAgICAgY29uc3QgY1kgPSBwLmNsaWVudFkgfHwgMDtcbiAgICAgICAgY29uc3QgcFggPSB3aW5kb3cucGFnZVhPZmZzZXQ7XG4gICAgICAgIGNvbnN0IHBZID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuICAgICAgICBzZWxmLmV2ZW50ID0gZXZlbnQ7XG4gICAgICAgIHNlbGYuY2xpZW50WCA9IGNYO1xuICAgICAgICBzZWxmLmNsaWVudFkgPSBjWTtcbiAgICAgICAgc2VsZi54ID0gY1ggKyBwWDtcbiAgICAgICAgc2VsZi55ID0gY1kgKyBwWTtcbiAgICAgICAgc2VsZi5wZXJjZW50WCA9IHNlbGYueCAvIHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICBzZWxmLnBlcmNlbnRZID0gc2VsZi55IC8gZ2V0UGFnZUhlaWdodCgpO1xuICAgIH1cblxuICAgIHNlbGYgPSB7XG4gICAgICAgIGV2ZW50OiBudWxsLFxuICAgICAgICBjbGllbnRYOiAwLFxuICAgICAgICBjbGllbnRZOiAwLFxuICAgICAgICB4OiAwLFxuICAgICAgICB5OiAwLFxuICAgICAgICBwZXJjZW50WDogMCxcbiAgICAgICAgcGVyY2VudFk6IDAsXG4gICAgICAgIGlzTGlzdGVuaW5nOiBmYWxzZSxcblxuICAgICAgICBvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGNhbGN1bGF0ZUNvb3Jkcyk7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIGNhbGN1bGF0ZUNvb3Jkcyk7XG4gICAgICAgICAgICBzZWxmLmlzTGlzdGVuaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuICAgICAgICBvZmY6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBjYWxjdWxhdGVDb29yZHMpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBjYWxjdWxhdGVDb29yZHMpO1xuICAgICAgICAgICAgc2VsZi5pc0xpc3RlbmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBzZWxmO1xufVxuIiwiaW1wb3J0IGVtaXR0ZXIgZnJvbSAnLi4vZXZlbnRzL2VtaXR0ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0b3VjaElucHV0KGVsKSB7XG4gICAgZWwgPSBlbCB8fCBkb2N1bWVudC5ib2R5O1xuXG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgc3RhcnQ6IFstMSwgLTFdLFxuICAgICAgICBtb3ZlOiBbLTEsIC0xXSxcbiAgICAgICAgZW5kOiBbLTEsIC0xXSxcbiAgICAgICAgcG9zaXRpb246IFstMSwgLTFdLFxuICAgICAgICBkaXN0YW5jZTogWzAsIDBdLFxuICAgICAgICBkaXJlY3Rpb246IFsnbm9uZScsICdub25lJ10sXG4gICAgICAgIHRvdWNoaW5nOiBmYWxzZSxcbiAgICAgICAgb3JpZ2luYWxFdmVudDogbnVsbFxuICAgIH07XG5cbiAgICBsZXQgc2VsZjtcblxuICAgIGZ1bmN0aW9uIHRvdWNoSGFuZGxlcihldmVudCkge1xuICAgICAgICBpZiAoIShldmVudCAmJiBldmVudC50b3VjaGVzKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGRhdGEub3JpZ2luYWxFdmVudCA9IGV2ZW50O1xuICAgICAgICBjb25zdCB0b3VjaCA9IGV2ZW50LnRvdWNoZXNbMF07XG4gICAgICAgIGNvbnN0IHggPSB0b3VjaCAmJiB0b3VjaC5wYWdlWDtcbiAgICAgICAgY29uc3QgeSA9IHRvdWNoICYmIHRvdWNoLnBhZ2VZO1xuXG4gICAgICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAndG91Y2hzdGFydCc6XG4gICAgICAgICAgICAgICAgZGF0YS5zdGFydFswXSA9IGRhdGEubW92ZVswXSA9IGRhdGEuZW5kWzBdID0gZGF0YS5wb3NpdGlvblswXSA9IHg7XG4gICAgICAgICAgICAgICAgZGF0YS5zdGFydFsxXSA9IGRhdGEubW92ZVsxXSA9IGRhdGEuZW5kWzFdID0gZGF0YS5wb3NpdGlvblsxXSA9IHk7XG4gICAgICAgICAgICAgICAgZGF0YS50b3VjaGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgc2VsZi5lbWl0KCdzdGFydCcsIGRhdGEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAndG91Y2htb3ZlJzpcbiAgICAgICAgICAgICAgICBkYXRhLm1vdmVbMF0gPSBkYXRhLnBvc2l0aW9uWzBdID0geDtcbiAgICAgICAgICAgICAgICBkYXRhLm1vdmVbMV0gPSBkYXRhLnBvc2l0aW9uWzFdID0geTtcbiAgICAgICAgICAgICAgICBzZWxmLmVtaXQoJ21vdmUnLCBkYXRhKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3RvdWNoZW5kJzpcbiAgICAgICAgICAgICAgICBkYXRhLmVuZFswXSA9IGRhdGEucG9zaXRpb25bMF0gPSB4O1xuICAgICAgICAgICAgICAgIGRhdGEuZW5kWzFdID0gZGF0YS5wb3NpdGlvblsxXSA9IHk7XG4gICAgICAgICAgICAgICAgZGF0YS50b3VjaGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHNlbGYuZW1pdCgnZW5kJywgZGF0YSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OiBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpc3RlbihlbGVtKSB7XG4gICAgICAgIGVsID0gZWxlbSB8fCBlbDtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRvdWNoSGFuZGxlcik7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRvdWNoSGFuZGxlcik7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdG91Y2hIYW5kbGVyKTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICAgc2VsZi5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRvdWNoSGFuZGxlcik7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRvdWNoSGFuZGxlcik7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdG91Y2hIYW5kbGVyKTtcbiAgICAgICAgZWwgPSBudWxsO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9XG5cbiAgICBsaXN0ZW4oZWwpO1xuXG4gICAgc2VsZiA9IE9iamVjdC5jcmVhdGUoZW1pdHRlci5wcm90b3R5cGUsIHtcbiAgICAgICAgX2V2ZW50czoge1xuICAgICAgICAgICAgdmFsdWU6IHt9XG4gICAgICAgIH0sXG4gICAgICAgIGxpc3Rlbjoge1xuICAgICAgICAgICAgdmFsdWU6IGxpc3RlblxuICAgICAgICB9LFxuICAgICAgICBpc0Rvd246IHtcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS50b3VjaGluZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZ2V0VG91Y2g6IHtcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZGVzdHJveToge1xuICAgICAgICAgICAgdmFsdWU6IGRlc3Ryb3lcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUoc2VsZik7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsaW5rZWRMaXN0KGFyciA9IFtdKSB7XG5cbiAgICBsZXQgZmlyc3QsXG4gICAgICAgIGxhc3Q7XG5cbiAgICAvKlxuICAgICAgICBpdGVtID0ge1xuICAgICAgICAgICAgJ25leHQnOiBudWxsLFxuICAgICAgICAgICAgJ3ByZXYnOiBudWxsXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaXRlbSA9IGxpbmtlZExpc3QuZ2V0Rmlyc3QoKTtcbiAgICAgICAgd2hpbGUoaXRlbSkge1xuICAgICAgICAgICAgLy8gZG8gc3R1ZmZcbiAgICAgICAgICAgIGl0ZW0gPSBpdGVtLm5leHQ7XG4gICAgICAgIH1cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gcmVtb3ZlKGl0ZW0pIHtcbiAgICAgICAgaWYgKGl0ZW0ubmV4dCkge1xuICAgICAgICAgICAgaXRlbS5uZXh0LnByZXYgPSBpdGVtLnByZXY7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGl0ZW0ucHJldikge1xuICAgICAgICAgICAgaXRlbS5wcmV2Lm5leHQgPSBpdGVtLm5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGl0ZW0gPT09IGZpcnN0KSB7XG4gICAgICAgICAgICBmaXJzdCA9IGl0ZW0ubmV4dDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXRlbSA9PT0gbGFzdCkge1xuICAgICAgICAgICAgbGFzdCA9IGl0ZW0ucHJldjtcbiAgICAgICAgfVxuICAgICAgICBpdGVtLm5leHQgPSBpdGVtLnByZXYgPSBudWxsO1xuXG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc2VydEFmdGVyKGl0ZW0sIGFmdGVyKSB7XG4gICAgICAgIHJlbW92ZShpdGVtKTtcblxuICAgICAgICBpdGVtLnByZXYgPSBhZnRlcjtcbiAgICAgICAgaXRlbS5uZXh0ID0gYWZ0ZXIubmV4dDtcblxuICAgICAgICBpZiAoIWFmdGVyLm5leHQpIHtcbiAgICAgICAgICAgIGxhc3QgPSBpdGVtO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWZ0ZXIubmV4dC5wcmV2ID0gaXRlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFmdGVyLm5leHQgPSBpdGVtO1xuXG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc2VydEJlZm9yZShpdGVtLCBiZWZvcmUpIHtcbiAgICAgICAgcmVtb3ZlKGl0ZW0pO1xuXG4gICAgICAgIGl0ZW0ucHJldiA9IGJlZm9yZS5wcmV2O1xuICAgICAgICBpdGVtLm5leHQgPSBiZWZvcmU7XG5cbiAgICAgICAgaWYgKCFiZWZvcmUucHJldikge1xuICAgICAgICAgICAgZmlyc3QgPSBpdGVtO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYmVmb3JlLnByZXYubmV4dCA9IGl0ZW07XG4gICAgICAgIH1cblxuICAgICAgICBiZWZvcmUucHJldiA9IGl0ZW07XG5cbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkKGl0ZW0pIHtcbiAgICAgICAgaWYgKCFmaXJzdCkge1xuICAgICAgICAgICAgZmlyc3QgPSBsYXN0ID0gaXRlbTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBpID0gZmlyc3Q7XG4gICAgICAgICAgICB3aGlsZSAoaS5uZXh0KSB7XG4gICAgICAgICAgICAgICAgaSA9IGkubmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluc2VydEFmdGVyKGl0ZW0sIGkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvckVhY2goZm4pIHtcbiAgICAgICAgbGV0IGl0ZW0gPSBmaXJzdDtcbiAgICAgICAgd2hpbGUgKGl0ZW0pIHtcbiAgICAgICAgICAgIGZuKGl0ZW0pO1xuICAgICAgICAgICAgaXRlbSA9IGl0ZW0ubmV4dDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1hcChmbikge1xuICAgICAgICBjb25zdCBsaXN0ID0gbGlua2VkTGlzdCgpO1xuICAgICAgICBsZXQgaXRlbSA9IGZpcnN0O1xuICAgICAgICB3aGlsZSAoaXRlbSkge1xuICAgICAgICAgICAgbGlzdC5hZGQoZm4oaXRlbSkpO1xuICAgICAgICAgICAgaXRlbSA9IGl0ZW0ubmV4dDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGlzdDtcbiAgICB9XG5cbiAgICBhcnIuZm9yRWFjaCgoaXRlbSkgPT4gYWRkKGl0ZW0pKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGdldCBmaXJzdCAoKSB7XG4gICAgICAgICAgICByZXR1cm4gZmlyc3Q7XG4gICAgICAgIH0sXG4gICAgICAgIGdldEZpcnN0ICgpIHtcbiAgICAgICAgICAgIHJldHVybiBmaXJzdDtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IGxhc3QgKCkge1xuICAgICAgICAgICAgcmV0dXJuIGxhc3Q7XG4gICAgICAgIH0sXG4gICAgICAgIGdldExhc3QgKCkge1xuICAgICAgICAgICAgcmV0dXJuIGxhc3Q7XG4gICAgICAgIH0sXG4gICAgICAgIGdldCBsZW5ndGggKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q291bnQoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0Q291bnQgKCkge1xuICAgICAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgICAgIGxldCBpID0gZmlyc3Q7XG4gICAgICAgICAgICB3aGlsZSAoaSkge1xuICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICAgICAgaSA9IGkubmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb3VudDtcbiAgICAgICAgfSxcbiAgICAgICAgYWRkLFxuICAgICAgICByZW1vdmUsXG4gICAgICAgIGluc2VydEFmdGVyLFxuICAgICAgICBpbnNlcnRCZWZvcmUsXG4gICAgICAgIGZvckVhY2gsXG4gICAgICAgIG1hcFxuICAgIH07XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhbmdsZSh4MSwgeTEsIHgyLCB5Mikge1xuICAgIGNvbnN0IGR4ID0geDIgLSB4MTtcbiAgICBjb25zdCBkeSA9IHkyIC0geTE7XG4gICAgcmV0dXJuIE1hdGguYXRhbjIoZHksIGR4KTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNlcnAoZnJvbSwgdG8sIHdlaWdodCA9IDAuMykge1xuICAgIGNvbnN0IGYgPSAoMSAtIE1hdGguY29zKHdlaWdodCAqIE1hdGguUEkpKSAvIDI7XG4gICAgcmV0dXJuIChmcm9tICogKDEgLSBmKSArIHRvICogZik7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjaXJjbGVEaXN0cmlidXRpb24ocmFkaXVzLCBvcmlnaW4gPSB7eDogMCwgeTogMH0sIHAgPSB7eDogMCwgeTogMH0pIHtcbiAgICBjb25zdCByID0gTWF0aC5zcXJ0KE1hdGgucmFuZG9tKCkpICogcmFkaXVzO1xuICAgIGNvbnN0IHRoZXRhID0gTWF0aC5yYW5kb20oKSAqIE1hdGguUEkgKiAyO1xuICAgIHAueCA9IG9yaWdpbi54ICsgTWF0aC5jb3ModGhldGEpICogcjtcbiAgICBwLnkgPSBvcmlnaW4ueSArIE1hdGguc2luKHRoZXRhKSAqIHI7XG4gICAgcmV0dXJuIHA7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjbGFtcCh2YWx1ZSwgbWluLCBtYXgpIHtcbiAgICBpZiAobWluID4gbWF4KSB7XG4gICAgICAgIGNvbnN0IGEgPSBtaW47XG4gICAgICAgIG1pbiA9IG1heDtcbiAgICAgICAgbWF4ID0gYTtcbiAgICB9XG4gICAgaWYgKHZhbHVlIDwgbWluKSB7XG4gICAgICAgIHJldHVybiBtaW47XG4gICAgfVxuICAgIGlmICh2YWx1ZSA+IG1heCkge1xuICAgICAgICByZXR1cm4gbWF4O1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb2luVG9zcyhoZWFkcyA9IHRydWUsIHRhaWxzID0gZmFsc2UpIHtcbiAgICByZXR1cm4gTWF0aC5yYW5kb20oKSA+IDAuNSA/IGhlYWRzIDogdGFpbHM7XG59XG4iLCIvKlxuVGhlIHNpZ24gdGVsbHMgdXMgaWYgYSBpcyB0byB0aGUgbGVmdCAoLSkgb3IgdGhlIHJpZ2h0ICgrKSBvZiBiXG4qL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3Jvc3NQcm9kdWN0MmQoYVgsIGFZLCBiWCwgYlkpIHtcbiAgICByZXR1cm4gYVggKiBiWSAtIGFZICogYlg7XG59XG4iLCJjb25zdCBERUcgPSAxODAgLyBNYXRoLlBJO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZWdyZWVzKHJhZGlhbnMpIHtcbiAgICByZXR1cm4gcmFkaWFucyAqIERFRztcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRpZmZlcmVuY2UoYSwgYikge1xuICAgIHJldHVybiBNYXRoLmFicyhhIC0gYik7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkaXN0YW5jZSh4MSwgeTEsIHgyLCB5Mikge1xuICAgIGNvbnN0IGR4ID0geDEgLSB4MjtcbiAgICBjb25zdCBkeSA9IHkxIC0geTI7XG4gICAgcmV0dXJuIE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkaXN0YW5jZVNRKHgxLCB5MSwgeDIsIHkyKSB7XG4gICAgY29uc3QgZHggPSB4MSAtIHgyO1xuICAgIGNvbnN0IGR5ID0geTEgLSB5MjtcbiAgICByZXR1cm4gZHggKiBkeCArIGR5ICogZHk7XG59XG4iLCIvKlxuLSBJZiBBIGFuZCBCIGFyZSBwZXJwZW5kaWN1bGFyIChhdCA5MCBkZWdyZWVzIHRvIGVhY2ggb3RoZXIpLCB0aGUgcmVzdWx0XG5vZiB0aGUgZG90IHByb2R1Y3Qgd2lsbCBiZSB6ZXJvLCBiZWNhdXNlIGNvcyjOmCkgd2lsbCBiZSB6ZXJvLlxuLSBJZiB0aGUgYW5nbGUgYmV0d2VlbiBBIGFuZCBCIGFyZSBsZXNzIHRoYW4gOTAgZGVncmVlcywgdGhlIGRvdCBwcm9kdWN0XG53aWxsIGJlIHBvc2l0aXZlIChncmVhdGVyIHRoYW4gemVybyksIGFzIGNvcyjOmCkgd2lsbCBiZSBwb3NpdGl2ZSwgYW5kXG50aGUgdmVjdG9yIGxlbmd0aHMgYXJlIGFsd2F5cyBwb3NpdGl2ZSB2YWx1ZXMuXG4tIElmIHRoZSBhbmdsZSBiZXR3ZWVuIEEgYW5kIEIgYXJlIGdyZWF0ZXIgdGhhbiA5MCBkZWdyZWVzLCB0aGUgZG90XG5wcm9kdWN0IHdpbGwgYmUgbmVnYXRpdmUgKGxlc3MgdGhhbiB6ZXJvKSwgYXMgY29zKM6YKSB3aWxsIGJlIG5lZ2F0aXZlLFxuYW5kIHRoZSB2ZWN0b3IgbGVuZ3RocyBhcmUgYWx3YXlzIHBvc2l0aXZlIHZhbHVlc1xuKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRvdFByb2R1Y3QyZChhWCwgYVksIGJYLCBiWSkge1xuICAgIHJldHVybiBhWCAqIGJYICsgYVkgKiBiWTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldENpcmNsZVBvaW50cyhvcmlnaW5YLCBvcmlnaW5ZLCByYWRpdXMsIGNvdW50LCBzdGFydCwgQ2xhc3MpIHtcbiAgICBpZiAodHlwZW9mIHN0YXJ0ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBzdGFydCA9IC1NYXRoLlBJIC8gMjtcbiAgICB9XG5cbiAgICBjb25zdCBwb2ludHMgPSBbXSxcbiAgICAgICAgY2lyYyA9IE1hdGguUEkgKiAyLFxuICAgICAgICBpbmNyID0gY2lyYyAvIGNvdW50O1xuXG4gICAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgY2lyYyArIHN0YXJ0OyBpICs9IGluY3IpIHtcbiAgICAgICAgY29uc3Qgb2IgPSB0eXBlb2YgQ2xhc3MgPT09ICd1bmRlZmluZWQnID8ge30gOiBuZXcgQ2xhc3MoKTtcbiAgICAgICAgb2IueCA9IG9yaWdpblggKyByYWRpdXMgKiBNYXRoLmNvcyhpKTtcbiAgICAgICAgb2IueSA9IG9yaWdpblkgKyByYWRpdXMgKiBNYXRoLnNpbihpKTtcbiAgICAgICAgcG9pbnRzLnB1c2gob2IpO1xuICAgIH1cblxuICAgIHJldHVybiBwb2ludHM7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRJbnRlcnNlY3Rpb25BcmVhKGFYLCBhWSwgYVcsIGFILCBiWCwgYlksIGJXLCBiSCkge1xuICAgIGNvbnN0IG92ZXJsYXBYID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oYVggKyBhVywgYlggKyBiVykgLSBNYXRoLm1heChhWCwgYlgpKTtcbiAgICBjb25zdCBvdmVybGFwWSA9IE1hdGgubWF4KDAsIE1hdGgubWluKGFZICsgYUgsIGJZICsgYkgpIC0gTWF0aC5tYXgoYVksIGJZKSk7XG4gICAgcmV0dXJuIG92ZXJsYXBYICogb3ZlcmxhcFk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRPdmVybGFwWChhWCwgYVcsIGJYLCBiVykge1xuICAgIHJldHVybiBNYXRoLm1heCgwLCBNYXRoLm1pbihhWCArIGFXLCBiWCArIGJXKSAtIE1hdGgubWF4KGFYLCBiWCkpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0T3ZlcmxhcFkoYVksIGFILCBiWSwgYkgpIHtcbiAgICByZXR1cm4gTWF0aC5tYXgoMCwgTWF0aC5taW4oYVkgKyBhSCwgYlkgKyBiSCkgLSBNYXRoLm1heChhWSwgYlkpKTtcbn1cbiIsImltcG9ydCBhbmdsZSBmcm9tICcuL2FuZ2xlJztcbmltcG9ydCBjZXJwIGZyb20gJy4vY2VycCc7XG5pbXBvcnQgY2lyY2xlRGlzdHJpYnV0aW9uIGZyb20gJy4vY2lyY2xlRGlzdHJpYnV0aW9uJztcbmltcG9ydCBjbGFtcCBmcm9tICcuL2NsYW1wJztcbmltcG9ydCBjb2luVG9zcyBmcm9tICcuL2NvaW5Ub3NzJztcbmltcG9ydCBjcm9zc1Byb2R1Y3QyZCBmcm9tICcuL2Nyb3NzUHJvZHVjdDJkJztcbmltcG9ydCBkZWdyZWVzIGZyb20gJy4vZGVncmVlcyc7XG5pbXBvcnQgZGlmZmVyZW5jZSBmcm9tICcuL2RpZmZlcmVuY2UnO1xuaW1wb3J0IGRpc3RhbmNlIGZyb20gJy4vZGlzdGFuY2UnO1xuaW1wb3J0IGRpc3RhbmNlU3EgZnJvbSAnLi9kaXN0YW5jZVNxJztcbmltcG9ydCBkb3RQcm9kdWN0MmQgZnJvbSAnLi9kb3RQcm9kdWN0MmQnO1xuaW1wb3J0IGdldENpcmNsZVBvaW50cyBmcm9tICcuL2dldENpcmNsZVBvaW50cyc7XG5pbXBvcnQgZ2V0SW50ZXJzZWN0aW9uQXJlYSBmcm9tICcuL2dldEludGVyc2VjdGlvbkFyZWEnO1xuaW1wb3J0IGdldE92ZXJsYXBYIGZyb20gJy4vZ2V0T3ZlcmxhcFgnO1xuaW1wb3J0IGdldE92ZXJsYXBZIGZyb20gJy4vZ2V0T3ZlcmxhcFknO1xuaW1wb3J0IGxlcnAgZnJvbSAnLi9sZXJwJztcbmltcG9ydCBtYXAgZnJvbSAnLi9tYXAnO1xuaW1wb3J0IG5vcm1hbGl6ZSBmcm9tICcuL25vcm1hbGl6ZSc7XG5pbXBvcnQgb3JpZW50YXRpb24gZnJvbSAnLi9vcmllbnRhdGlvbic7XG5pbXBvcnQgcGVyY2VudFJlbWFpbmluZyBmcm9tICcuL3BlcmNlbnRSZW1haW5pbmcnO1xuaW1wb3J0IHBlcnNwZWN0aXZlIGZyb20gJy4vcGVyc3BlY3RpdmUnO1xuaW1wb3J0IHF1YWRyYXRpY0N1cnZlIGZyb20gJy4vcXVhZHJhdGljQ3VydmUnO1xuaW1wb3J0IHJhZGlhbnMgZnJvbSAnLi9yYWRpYW5zJztcbmltcG9ydCByYW5kb20gZnJvbSAnLi9yYW5kb20nO1xuaW1wb3J0IHJhbmRvbUludCBmcm9tICcuL3JhbmRvbUludCc7XG5pbXBvcnQgcmFuZG9tU2lnbiBmcm9tICcuL3JhbmRvbVNpZ24nO1xuaW1wb3J0IHJvdGF0ZVBvaW50IGZyb20gJy4vcm90YXRlUG9pbnQnO1xuaW1wb3J0IHJvdGF0ZVRvRGVnIGZyb20gJy4vcm90YXRlVG9EZWcnO1xuaW1wb3J0IHJvdGF0ZVRvUmFkIGZyb20gJy4vcm90YXRlVG9SYWQnO1xuaW1wb3J0IHJvdW5kVG8gZnJvbSAnLi9yb3VuZFRvJztcbmltcG9ydCByb3VuZFRvTmVhcmVzdCBmcm9tICcuL3JvdW5kVG9OZWFyZXN0JztcbmltcG9ydCBzaXplIGZyb20gJy4vc2l6ZSc7XG5pbXBvcnQgc21lcnAgZnJvbSAnLi9zbWVycCc7XG5pbXBvcnQgc21vb3Roc3RlcCBmcm9tICcuL3Ntb290aHN0ZXAnO1xuaW1wb3J0IHNwbGl0VmFsdWVBbmRVbml0IGZyb20gJy4vc3BsaXRWYWx1ZUFuZFVuaXQnO1xuaW1wb3J0IHdlaWdodGVkQXZlcmFnZSBmcm9tICcuL3dlaWdodGVkQXZlcmFnZSc7XG5pbXBvcnQgd2VpZ2h0ZWREaXN0cmlidXRpb24gZnJvbSAnLi93ZWlnaHRlZERpc3RyaWJ1dGlvbic7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBhbmdsZSxcbiAgICBjZXJwLFxuICAgIGNpcmNsZURpc3RyaWJ1dGlvbixcbiAgICBjbGFtcCxcbiAgICBjb2luVG9zcyxcbiAgICBjcm9zc1Byb2R1Y3QyZCxcbiAgICBkZWdyZWVzLFxuICAgIGRpZmZlcmVuY2UsXG4gICAgZGlzdGFuY2UsXG4gICAgZGlzdGFuY2VTcSxcbiAgICBkb3RQcm9kdWN0MmQsXG4gICAgZ2V0Q2lyY2xlUG9pbnRzLFxuICAgIGdldEludGVyc2VjdGlvbkFyZWEsXG4gICAgZ2V0T3ZlcmxhcFgsXG4gICAgZ2V0T3ZlcmxhcFksXG4gICAgbGVycCxcbiAgICBtYXAsXG4gICAgbm9ybWFsaXplLFxuICAgIG9yaWVudGF0aW9uLFxuICAgIHBlcmNlbnRSZW1haW5pbmcsXG4gICAgcGVyc3BlY3RpdmUsXG4gICAgcXVhZHJhdGljQ3VydmUsXG4gICAgcmFkaWFucyxcbiAgICByYW5kb20sXG4gICAgcmFuZG9tSW50LFxuICAgIHJhbmRvbVNpZ24sXG4gICAgcm90YXRlUG9pbnQsXG4gICAgcm90YXRlVG9EZWcsXG4gICAgcm90YXRlVG9SYWQsXG4gICAgcm91bmRUbyxcbiAgICByb3VuZFRvTmVhcmVzdCxcbiAgICBzbWVycCxcbiAgICBzbW9vdGhzdGVwLFxuICAgIHNpemUsXG4gICAgc3BsaXRWYWx1ZUFuZFVuaXQsXG4gICAgd2VpZ2h0ZWRBdmVyYWdlLFxuICAgIHdlaWdodGVkRGlzdHJpYnV0aW9uXG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbGVycChmcm9tLCB0bywgd2VpZ2h0ID0gMC4zKSB7XG4gICAgcmV0dXJuIGZyb20gKyAodG8gLSBmcm9tKSAqIHdlaWdodDtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1hcCh2LCBhLCBiLCB4LCB5KSB7XG4gICAgLy8gdmFsdWUsIG1pbiBleHBlY3RlZCwgbWF4IGV4cGVjdGVkLCBtYXAgbWluLCBtYXAgbWF4XG4gICAgLy8gZS5nLiBtYXAgc29tZSB2YWx1ZSBiZXR3ZWVuIDAgdG8gMTAwIHRvIC01MCB0byA1MFxuICAgIC8vIG1hcCg1MCwgMCwgMTAwLCAtNTAsIDUwKSAvLyAwXG4gICAgLy8gbWFwKDI1LCAwLCAxMDAsIC01MCwgNTApIC8vIC0yNVxuICAgIHJldHVybiAodiA9PT0gYSkgPyB4IDogKHYgLSBhKSAqICh5IC0geCkgLyAoYiAtIGEpICsgeDtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG5vcm1hbGl6ZSh2YWx1ZSwgbWluLCBtYXgpIHtcbiAgICByZXR1cm4gKHZhbHVlIC0gbWluKSAvIChtYXggLSBtaW4pO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb3JpZW50YXRpb24oeCwgeSkge1xuICAgIHJldHVybiBNYXRoLmF0YW4yKHksIHgpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGVyY2VudFJlbWFpbmluZyh2YWx1ZSwgdG90YWwpIHtcbiAgICByZXR1cm4gKHZhbHVlICUgdG90YWwpIC8gdG90YWw7XG59XG4iLCIvLyB4ID0geCAqIHBlcnNwZWN0aXZlXG4vLyB5ID0geSAqIHBlcnNwZWN0aXZlXG4vLyBzY2FsZSA9IHBlcnNwZWN0aXZlXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBlcnNwZWN0aXZlKHosIGZvY2FsTGVuZ3RoID0gMzAwKSB7XG4gICAgcmV0dXJuIGZvY2FsTGVuZ3RoIC8gKGZvY2FsTGVuZ3RoICsgeik7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBxdWFkcmF0aWNDdXJ2ZShmcm9tWCwgZnJvbVksIGNwWCwgY3BZLCB0b1gsIHRvWSwgZ29UaHJvdWdoQ1AgPSBmYWxzZSkge1xuICAgIGNvbnN0IG4gPSAyMDtcbiAgICBjb25zdCBwb2ludHMgPSBbZnJvbVgsIGZyb21ZXTtcbiAgICBsZXQgeGEgPSAwO1xuICAgIGxldCB5YSA9IDA7XG5cbiAgICBpZiAoZ29UaHJvdWdoQ1ApIHtcbiAgICAgICAgY3BYID0gY3BYICogMiAtIChmcm9tWCArIHRvWCkgLyAyO1xuICAgICAgICBjcFkgPSBjcFkgKiAyIC0gKGZyb21ZICsgdG9ZKSAvIDI7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gbjsgKytpKSB7XG4gICAgICAgIGNvbnN0IGogPSBpIC8gbjtcblxuICAgICAgICB4YSA9IGZyb21YICsgKChjcFggLSBmcm9tWCkgKiBqKTtcbiAgICAgICAgeWEgPSBmcm9tWSArICgoY3BZIC0gZnJvbVkpICogaik7XG5cbiAgICAgICAgcG9pbnRzLnB1c2goeGEgKyAoKChjcFggKyAoKHRvWCAtIGNwWCkgKiBqKSkgLSB4YSkgKiBqKSwgeWEgKyAoKChjcFkgKyAoKHRvWSAtIGNwWSkgKiBqKSkgLSB5YSkgKiBqKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBvaW50cztcbn1cbiIsImNvbnN0IFJBRCA9IE1hdGguUEkgLyAxODA7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJhZGlhbnMoZGVncmVlcykge1xuICAgIHJldHVybiBkZWdyZWVzICogUkFEO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmFuZG9tKG1pbiwgbWF4KSB7XG4gICAgaWYgKGlzTmFOKG1heCkpIHtcbiAgICAgICAgbWF4ID0gbWluO1xuICAgICAgICBtaW4gPSAwO1xuICAgIH1cbiAgICByZXR1cm4gbWluICsgTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmFuZG9tSW50KG1pbiwgbWF4KSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IobWluICsgTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByYW5kb21TaWduKCkge1xuICAgIHJldHVybiBNYXRoLnJhbmRvbSgpID4gMC41ID8gLTEgOiAxO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcm90YXRlUG9pbnQocCwgdGhldGEsIG9yaWdpbiA9IHt4OiAwLCB5OiAwfSwgcDEgPSB7eDogMCwgeTogMH0pIHtcbiAgICBjb25zdCBzaW5UaGV0YSA9IE1hdGguc2luKHRoZXRhKTtcbiAgICBjb25zdCBjb3NUaGV0YSA9IE1hdGguY29zKHRoZXRhKTtcbiAgICBwMS54ID0gKHAueCAtIG9yaWdpbi54KSAqIGNvc1RoZXRhIC0gKHAueSAtIG9yaWdpbi55KSAqIHNpblRoZXRhO1xuICAgIHAxLnkgPSAocC54IC0gb3JpZ2luLngpICogc2luVGhldGEgKyAocC55IC0gb3JpZ2luLnkpICogY29zVGhldGE7XG4gICAgcDEueCArPSBvcmlnaW4ueDtcbiAgICBwMS55ICs9IG9yaWdpbi55O1xuICAgIHJldHVybiBwMTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJvdGF0ZVRvRGVnKHN0YXJ0LCBlbmQpIHtcbiAgICBsZXQgZGlmZiA9IChlbmQgLSBzdGFydCkgJSAzNjA7XG4gICAgaWYgKGRpZmYgIT09IGRpZmYgJSAxODApIHtcbiAgICAgICAgZGlmZiA9IChkaWZmIDwgMCkgPyBkaWZmICsgMzYwIDogZGlmZiAtIDM2MDtcbiAgICB9XG4gICAgcmV0dXJuIHN0YXJ0ICsgZGlmZjtcbn1cbiIsImNvbnN0IFBJMiA9IE1hdGguUEkgKiAyO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByb3RhdGVUb1JBRChzdGFydCwgZW5kKSB7XG4gICAgbGV0IGRpZmYgPSAoZW5kIC0gc3RhcnQpICUgUEkyO1xuICAgIGlmIChkaWZmICE9PSBkaWZmICUgTWF0aC5QSSkge1xuICAgICAgICBkaWZmID0gZGlmZiA8IDAgPyBkaWZmICsgUEkyIDogZGlmZiAtIFBJMjtcbiAgICB9XG4gICAgcmV0dXJuIHN0YXJ0ICsgZGlmZjtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJvdW5kVG8oeCwgcGxhY2VzID0gMikge1xuICAgIGNvbnN0IGRpdiA9IE1hdGgucG93KDEwLCBwbGFjZXMpO1xuICAgIHJldHVybiBNYXRoLnJvdW5kKHggKiBkaXYpIC8gZGl2O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcm91bmRUb05lYXJlc3QodmFsdWUsIHVuaXQpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZCh2YWx1ZSAvIHVuaXQpICogdW5pdDtcbn1cbiIsImZ1bmN0aW9uIGdldFNjYWxlKG1ldGhvZCwgd2lkdGgsIGhlaWdodCwgYXJlYVdpZHRoLCBhcmVhSGVpZ2h0KSB7XG4gICAgc3dpdGNoIChtZXRob2QpIHtcbiAgICAgICAgY2FzZSAnY292ZXInOlxuICAgICAgICAgICAgcmV0dXJuIE1hdGgubWF4KGFyZWFXaWR0aCAvIHdpZHRoLCBhcmVhSGVpZ2h0IC8gaGVpZ2h0KTtcbiAgICAgICAgY2FzZSAnY29udGFpbic6XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5taW4oYXJlYVdpZHRoIC8gd2lkdGgsIGFyZWFIZWlnaHQgLyBoZWlnaHQpO1xuICAgICAgICBjYXNlICd3aWR0aCc6XG4gICAgICAgICAgICByZXR1cm4gYXJlYVdpZHRoIC8gd2lkdGg7XG4gICAgICAgIGNhc2UgJ2hlaWdodCc6XG4gICAgICAgICAgICByZXR1cm4gYXJlYUhlaWdodCAvIGhlaWdodDtcbiAgICAgICAgZGVmYXVsdDogYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiAxO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzaXplKHJlY3QsIGFyZWFXaWR0aCwgYXJlYUhlaWdodCwgbWV0aG9kID0gJ2NvdmVyJywgYXV0b0NlbnRlciA9IHRydWUpIHtcbiAgICBjb25zdCBzY2FsZSA9IGdldFNjYWxlKG1ldGhvZCwgcmVjdC53aWR0aCwgcmVjdC5oZWlnaHQsIGFyZWFXaWR0aCwgYXJlYUhlaWdodCk7XG4gICAgY29uc3Qgd2lkdGggPSBNYXRoLmNlaWwocmVjdC53aWR0aCAqIHNjYWxlKTtcbiAgICBjb25zdCBoZWlnaHQgPSBNYXRoLmNlaWwocmVjdC5oZWlnaHQgKiBzY2FsZSk7XG5cbiAgICBsZXQgeCA9IDAsIHkgPSAwO1xuXG4gICAgaWYgKGF1dG9DZW50ZXIpIHtcbiAgICAgICAgeCA9IE1hdGgucm91bmQoKGFyZWFXaWR0aCAtIHdpZHRoKSAqIDAuNSk7XG4gICAgICAgIHkgPSBNYXRoLnJvdW5kKChhcmVhSGVpZ2h0IC0gaGVpZ2h0KSAqIDAuNSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgeCxcbiAgICAgICAgeSxcbiAgICAgICAgd2lkdGgsXG4gICAgICAgIGhlaWdodCxcbiAgICAgICAgc2NhbGVcbiAgICB9O1xufVxuIiwiaW1wb3J0IHNtb290aHN0ZXAgZnJvbSAnLi9zbW9vdGhzdGVwJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc21lcnAoZnJvbSwgdG8sIHN0YXJ0VGltZSwgZW5kVGltZSwgdGltZSkge1xuICAgIHJldHVybiBmcm9tICsgKHRvIC0gZnJvbSkgKiBzbW9vdGhzdGVwKHN0YXJ0VGltZSwgZW5kVGltZSwgdGltZSk7XG59XG4iLCJpbXBvcnQgY2xhbXAgZnJvbSAnLi9jbGFtcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNtb290aHN0ZXAobWluLCBtYXgsIHZhbHVlKSB7XG4gICAgY29uc3QgeCA9IGNsYW1wKCh2YWx1ZSAtIG1pbikgLyAobWF4IC0gbWluKSwgMCwgMSk7XG4gICAgcmV0dXJuIHggKiB4ICogKDMgLSAyICogeCk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzcGxpdFZhbHVlQW5kVW5pdChwcm9wKSB7XG4gICAgY29uc3QgcmUgPSAvKF4tP1xcZCpcXC4/XFxkKikoLiopLztcbiAgICBjb25zdCBtYXRjaCA9IHByb3AubWF0Y2gocmUpO1xuICAgIGNvbnN0IHZhbHVlID0gTnVtYmVyKG1hdGNoWzFdKTtcbiAgICBjb25zdCB1bml0ID0gbWF0Y2hbMl07XG4gICAgcmV0dXJuIHt2YWx1ZSwgdW5pdH07XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB3ZWlnaHRlZEF2ZXJhZ2UoZnJvbSwgdG8sIHdlaWdodCA9IDEwKSB7XG4gICAgcmV0dXJuICgoZnJvbSAqICh3ZWlnaHQgLSAxKSkgKyB0bykgLyB3ZWlnaHQ7XG59XG4iLCJpbXBvcnQgcmFuZG9tIGZyb20gJy4vcmFuZG9tJztcblxuLy8gZ3JlYXRlciBwcm9iYWJpbGl0eSBvZiBiZWluZyBoYWxmd2F5IGJldHdlZWVuIG1pbiBhbmQgbWF4XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdlaWdodGVkRGlzdHJpYnV0aW9uKG1pbiwgbWF4LCB3ZWlnaHQgPSA1KSB7XG4gICAgbGV0IHRvdGFsID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdlaWdodDsgaSsrKSB7XG4gICAgICAgIHRvdGFsICs9IHJhbmRvbShtaW4sIG1heCk7XG4gICAgfVxuICAgIHJldHVybiB0b3RhbCAvIHdlaWdodDtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGN1ZXBvaW50c1JlYWRlcigpIHtcbiAgICBjb25zdCBsaXN0ID0gW107XG4gICAgbGV0IHJlYWRlcjtcbiAgICBsZXQgZGlzcGF0Y2g7XG4gICAgbGV0IGN1cnJlbnRQb3NpdGlvbiA9IDA7XG4gICAgbGV0IGxhc3RQb3NpdGlvbiA9IC0xO1xuICAgIGxldCB0b2xlcmFuY2UgPSAwLjI7XG5cbiAgICBmdW5jdGlvbiBhZGQocG9zaXRpb24sIG5hbWUsIGRhdGEpIHtcbiAgICAgICAgbGlzdC5wdXNoKHtwb3NpdGlvbiwgbmFtZSwgZGF0YX0pO1xuXG4gICAgICAgIGxpc3Quc29ydCgoYSwgYikgPT4gYS5wb3NpdGlvbiAtIGIucG9zaXRpb24pO1xuXG4gICAgICAgIHJldHVybiByZWFkZXI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25DdWVwb2ludChmbiwgdGhpc0FyZykge1xuICAgICAgICBpZiAoZm4pIHtcbiAgICAgICAgICAgIGRpc3BhdGNoID0gdGhpc0FyZyA/IGZuLmJpbmQodGhpc0FyZykgOiBmbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRpc3BhdGNoID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVhZGVyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgICAgICBjdXJyZW50UG9zaXRpb24gPSAwO1xuICAgICAgICBsYXN0UG9zaXRpb24gPSAtMTtcbiAgICAgICAgcmV0dXJuIHJlYWRlcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVBbGwoKSB7XG4gICAgICAgIGxpc3QubGVuZ3RoID0gMDtcbiAgICAgICAgcmV0dXJuIHJlc2V0KCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0VG9sZXJhbmNlKHZhbHVlKSB7XG4gICAgICAgIHRvbGVyYW5jZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gcmVhZGVyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluUmFuZ2UoY3VlcG9pbnRQb3MsIGN1cnJlbnRQb3MsIGxhc3RQb3MpIHtcbiAgICAgICAgaWYgKGN1ZXBvaW50UG9zID4gY3VycmVudFBvcykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjdWVwb2ludFBvcyA8PSBsYXN0UG9zKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZGlmZiA9IGN1ZXBvaW50UG9zIC0gY3VycmVudFBvcztcbiAgICAgICAgaWYgKGRpZmYgPCAwKSB7XG4gICAgICAgICAgICBkaWZmID0gLWRpZmY7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRpZmYgPD0gdG9sZXJhbmNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrKGN1cnJlbnRQb3MsIGxhc3RQb3MpIHtcbiAgICAgICAgaWYgKGN1cnJlbnRQb3MgPD0gbGFzdFBvcykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgZGlzcGF0Y2ggIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxpc3Quc29tZSgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaWYgKGluUmFuZ2UoaXRlbS5wb3NpdGlvbiwgY3VycmVudFBvcywgbGFzdFBvcykpIHtcbiAgICAgICAgICAgICAgICBkaXNwYXRjaChpdGVtKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlKHBvc2l0aW9uKSB7XG4gICAgICAgIGN1cnJlbnRQb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgICAgICBjaGVjayhjdXJyZW50UG9zaXRpb24sIGxhc3RQb3NpdGlvbik7XG4gICAgICAgIGxhc3RQb3NpdGlvbiA9IGN1cnJlbnRQb3NpdGlvbjtcbiAgICAgICAgcmV0dXJuIHJlYWRlcjtcbiAgICB9XG5cbiAgICByZWFkZXIgPSBPYmplY3QuZnJlZXplKHtcbiAgICAgICAgYWRkLFxuICAgICAgICBvbkN1ZXBvaW50LFxuICAgICAgICByZW1vdmVBbGwsXG4gICAgICAgIHJlc2V0LFxuICAgICAgICBzZXRUb2xlcmFuY2UsXG4gICAgICAgIHVwZGF0ZVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlYWRlcjtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlPU1BsYXlWaWRlb0lubGluZShlbCwgbG9vcCA9IHRydWUpIHtcbiAgICBjb25zdCBmcmFtZVRpbWUgPSAxIC8gMjU7XG5cbiAgICBsZXQgc2VsZixcbiAgICAgICAgbGFzdFRpbWUgPSAwLFxuICAgICAgICBwbGF5aW5nID0gZmFsc2U7XG5cbiAgICAvLyBUaGlzIGNhbiAoYW5kIHNob3VsZCkgYmUgcHV0IGluIGEgY3NzIGZpbGUgaW5zdGVhZCBvZiBkb2luZyBzdHlsZVNoZWV0c1swXS5pbnNlcnRSdWxlOlxuICAgIGNvbnN0IGNzc1J1bGUgPSAnLmlPU1BsYXlWaWRlb0lubGluZTo6LXdlYmtpdC1tZWRpYS1jb250cm9scyB7IGRpc3BsYXk6bm9uZSAhaW1wb3J0YW50OyB9JztcbiAgICBkb2N1bWVudC5zdHlsZVNoZWV0c1swXS5pbnNlcnRSdWxlKGNzc1J1bGUsIDApO1xuXG4gICAgZWwucmVtb3ZlQXR0cmlidXRlKCdjb250cm9scycpO1xuICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2lPU1BsYXlWaWRlb0lubGluZScpO1xuXG5cbiAgICBmdW5jdGlvbiBzZWVrKHRpbWUpIHtcbiAgICAgICAgZWwuY3VycmVudFRpbWUgPSB0aW1lO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXVzZSgpIHtcbiAgICAgICAgcGxheWluZyA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVGcmFtZSgpIHtcbiAgICAgICAgaWYgKCFwbGF5aW5nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZUZyYW1lKTtcblxuICAgICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICBjb25zdCBkZWx0YVRpbWUgPSBub3cgLSBsYXN0VGltZTtcblxuICAgICAgICBpZiAoZGVsdGFUaW1lID49IGZyYW1lVGltZSAqIDEwMDApIHtcbiAgICAgICAgICAgIGxhc3RUaW1lID0gbm93O1xuXG4gICAgICAgICAgICBjb25zdCBlbmRlZCA9IGVsLmN1cnJlbnRUaW1lICsgZnJhbWVUaW1lID49IGVsLmR1cmF0aW9uO1xuXG4gICAgICAgICAgICBpZiAoZW5kZWQgJiYgbG9vcCkge1xuICAgICAgICAgICAgICAgIHNlZWsoMCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGVuZGVkKSB7XG4gICAgICAgICAgICAgICAgcGF1c2UoKTtcbiAgICAgICAgICAgICAgICAvLyBzZWxmLmVtaXQoJ2VuZGVkJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlZWsoZWwuY3VycmVudFRpbWUgKyBmcmFtZVRpbWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBzZWxmLmVtaXQoJ3RpbWV1cGRhdGUnLCBlbC5jdXJyZW50VGltZSwgc2VsZik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGF5KCkge1xuICAgICAgICBwbGF5aW5nID0gdHJ1ZTtcbiAgICAgICAgdXBkYXRlRnJhbWUoKTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICAgLy8gc2VsZi5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICAgICAgcGF1c2UoKTtcbiAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKHVwZGF0ZUZyYW1lKTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9XG5cbiAgICAvLyBzZWxmID0gT2JqZWN0LmNyZWF0ZShFbWl0dGVyLnByb3RvdHlwZSwge1xuICAgIHNlbGYgPSBPYmplY3QuY3JlYXRlKG51bGwsIHtcbiAgICAgICAgX2V2ZW50czoge1xuICAgICAgICAgICAgdmFsdWU6IHt9XG4gICAgICAgIH0sXG4gICAgICAgIGRlc3Ryb3k6IHtcbiAgICAgICAgICAgIHZhbHVlOiBkZXN0cm95XG4gICAgICAgIH0sXG4gICAgICAgIHBhdXNlOiB7XG4gICAgICAgICAgICB2YWx1ZTogcGF1c2VcbiAgICAgICAgfSxcbiAgICAgICAgcGxheToge1xuICAgICAgICAgICAgdmFsdWU6IHBsYXlcbiAgICAgICAgfSxcbiAgICAgICAgc2Vlazoge1xuICAgICAgICAgICAgdmFsdWU6IHNlZWtcbiAgICAgICAgfSxcbiAgICAgICAgZWw6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjdXJyZW50VGltZToge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZWwuY3VycmVudFRpbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGR1cmF0aW9uOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbC5kdXJhdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbG9vcDoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbG9vcDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgbG9vcCA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBwbGF5aW5nOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwbGF5aW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZShzZWxmKTtcbn1cbiIsImltcG9ydCBjdWVwb2ludHNSZWFkZXIgZnJvbSAnLi9jdWVwb2ludHNSZWFkZXInO1xuaW1wb3J0IGlPU1BsYXlWaWRlb0lubGluZSBmcm9tICcuL2lPU1BsYXlWaWRlb0lubGluZSc7XG5pbXBvcnQgdmlkZW9QbGF5ZXIgZnJvbSAnLi92aWRlb1BsYXllcic7XG5pbXBvcnQgdmltZW8gZnJvbSAnLi92aW1lbyc7XG5pbXBvcnQgeW91dHViZSBmcm9tICcuL3lvdXR1YmUnO1xuaW1wb3J0IHlvdXR1YmVCYXNpYyBmcm9tICcuL3lvdXR1YmVCYXNpYyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBjdWVwb2ludHNSZWFkZXIsXG4gICAgaU9TUGxheVZpZGVvSW5saW5lLFxuICAgIHZpZGVvUGxheWVyLFxuICAgIHZpbWVvLFxuICAgIHlvdXR1YmUsXG4gICAgeW91dHViZUJhc2ljXG59O1xuIiwiaW1wb3J0IGVtaXR0ZXIgZnJvbSAnLi4vZXZlbnRzL2VtaXR0ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB2aWRlb1BsYXllcih2aWRlb0VsKSB7XG4gICAgbGV0IGVsID0gdmlkZW9FbCB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xuICAgIGxldCBwbGF5ZXI7XG5cbiAgICBmdW5jdGlvbiBtZXRhZGF0YUhhbmRsZXIoKSB7XG4gICAgICAgIHBsYXllci5lbWl0KCdtZXRhZGF0YScsIHtcbiAgICAgICAgICAgIHNyYzogZWwuY3VycmVudFNyYyxcbiAgICAgICAgICAgIHdpZHRoOiBlbC52aWRlb1dpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBlbC52aWRlb0hlaWdodCxcbiAgICAgICAgICAgIGR1cmF0aW9uOiBlbC5kdXJhdGlvblxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYW5wbGF5SGFuZGxlcigpIHtcbiAgICAgICAgcGxheWVyLmVtaXQoJ3JlYWR5Jyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGxheUhhbmRsZXIoKSB7XG4gICAgICAgIHBsYXllci5lbWl0KCdwbGF5Jyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW5kZWRIYW5kbGVyKCkge1xuICAgICAgICBwbGF5ZXIuZW1pdCgnZW5kZWQnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlcnJvckhhbmRsZXIoKSB7XG4gICAgICAgIHBsYXllci5lbWl0KCdlcnJvcicsIGVsLmVycm9yKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0aW1ldXBkYXRlSGFuZGxlcigpIHtcbiAgICAgICAgcGxheWVyLmVtaXQoJ3RpbWV1cGRhdGUnLCBlbC5jdXJyZW50VGltZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2xvYWRlZG1ldGFkYXRhJywgbWV0YWRhdGFIYW5kbGVyKTtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2FucGxheXRocm91Z2gnLCBjYW5wbGF5SGFuZGxlcik7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BsYXknLCBwbGF5SGFuZGxlcik7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BsYXlpbmcnLCBwbGF5SGFuZGxlcik7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZXJyb3JIYW5kbGVyKTtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignZW5kZWQnLCBlbmRlZEhhbmRsZXIpO1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0aW1ldXBkYXRlJywgdGltZXVwZGF0ZUhhbmRsZXIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgICByZW1vdmVFdmVudExpc3RlbmVycygpO1xuXG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlZG1ldGFkYXRhJywgbWV0YWRhdGFIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NhbnBsYXl0aHJvdWdoJywgY2FucGxheUhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigncGxheScsIHBsYXlIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3BsYXlpbmcnLCBwbGF5SGFuZGxlciwgZmFsc2UpO1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGVycm9ySGFuZGxlciwgZmFsc2UpO1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdlbmRlZCcsIGVuZGVkSGFuZGxlciwgZmFsc2UpO1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCd0aW1ldXBkYXRlJywgdGltZXVwZGF0ZUhhbmRsZXIsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICBwbGF5ZXIub2ZmKCk7XG4gICAgICAgIGVsLnBhdXNlKCk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZSgnc3JjJyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKTtcblxuICAgICAgICBpZiAoZWwucGFyZW50RWxlbWVudCkge1xuICAgICAgICAgICAgZWwucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChlbCk7XG4gICAgICAgIH1cblxuICAgICAgICBlbCA9IG51bGw7XG5cbiAgICAgICAgcmV0dXJuIHBsYXllcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRCbG9iVVJMKHVybCkge1xuICAgICAgICB1cmwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTCh1cmwpO1xuICAgICAgICBmdW5jdGlvbiByZXZva2UoKSB7XG4gICAgICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjYW5wbGF5dGhyb3VnaCcsIHJldm9rZSk7XG4gICAgICAgICAgICB3aW5kb3cuVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpO1xuICAgICAgICB9XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NhbnBsYXl0aHJvdWdoJywgcmV2b2tlKTtcbiAgICAgICAgcmV0dXJuIHVybDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2FkKHVybCkge1xuICAgICAgICBpZiAod2luZG93LkJsb2IgJiYgdXJsIGluc3RhbmNlb2Ygd2luZG93LkJsb2IpIHtcbiAgICAgICAgICAgIHVybCA9IGdldEJsb2JVUkwodXJsKTtcbiAgICAgICAgfVxuICAgICAgICBhZGRFdmVudExpc3RlbmVycygpO1xuXG4gICAgICAgIGVsLmNyb3NzT3JpZ2luID0gJ2Fub255bW91cyc7XG4gICAgICAgIGVsLnByZWxvYWQgPSAnYXV0byc7XG4gICAgICAgIGVsLnNyYyA9IHVybDtcbiAgICAgICAgZWwubG9hZCgpO1xuXG4gICAgICAgIHJldHVybiBwbGF5ZXI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGxheSgpIHtcbiAgICAgICAgZWwucGxheSgpO1xuXG4gICAgICAgIHJldHVybiBwbGF5ZXI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGF1c2UoKSB7XG4gICAgICAgIGVsLnBhdXNlKCk7XG5cbiAgICAgICAgcmV0dXJuIHBsYXllcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZWVrKHRpbWUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGVsLmN1cnJlbnRUaW1lID0gdGltZTtcbiAgICAgICAgfSBjYXRjaCAoZSkge31cblxuICAgICAgICByZXR1cm4gcGxheWVyO1xuICAgIH1cblxuICAgIGFkZEV2ZW50TGlzdGVuZXJzKCk7XG5cbiAgICBwbGF5ZXIgPSBPYmplY3QuY3JlYXRlKGVtaXR0ZXIucHJvdG90eXBlLCB7XG4gICAgICAgIF9ldmVudHM6IHtcbiAgICAgICAgICAgIHZhbHVlOiB7fVxuICAgICAgICB9LFxuICAgICAgICBkZXN0cm95OiB7XG4gICAgICAgICAgICB2YWx1ZTogZGVzdHJveVxuICAgICAgICB9LFxuICAgICAgICBsb2FkOiB7XG4gICAgICAgICAgICB2YWx1ZTogbG9hZFxuICAgICAgICB9LFxuICAgICAgICBwYXVzZToge1xuICAgICAgICAgICAgdmFsdWU6IHBhdXNlXG4gICAgICAgIH0sXG4gICAgICAgIHBsYXk6IHtcbiAgICAgICAgICAgIHZhbHVlOiBwbGF5XG4gICAgICAgIH0sXG4gICAgICAgIHNlZWs6IHtcbiAgICAgICAgICAgIHZhbHVlOiBzZWVrXG4gICAgICAgIH0sXG4gICAgICAgIGVsOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY3VycmVudFRpbWU6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsLmN1cnJlbnRUaW1lO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICBlbC5jdXJyZW50VGltZSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBkdXJhdGlvbjoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZWwuZHVyYXRpb247XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHZvbHVtZToge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZWwudm9sdW1lO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICBlbC52b2x1bWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUocGxheWVyKTtcbn1cbiIsImltcG9ydCBlbWl0dGVyIGZyb20gJy4uL2V2ZW50cy9lbWl0dGVyJztcblxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIudmltZW8uY29tL3BsYXllci9qcy1hcGlcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdmltZW8oZWwpIHtcbiAgICBjb25zdCB2aW1lb1BsYXllciA9IGVsLmNvbnRlbnRXaW5kb3c7XG4gICAgY29uc3QgcmUgPSAvXmh0dHBzPzpcXC9cXC9wbGF5ZXIudmltZW8uY29tLztcbiAgICBsZXQgcGxheWVyLCBvcmlnaW4gPSAnKicsIHBhdXNlZCA9IGZhbHNlO1xuXG4gICAgZnVuY3Rpb24gc2VuZENvbW1hbmQobWV0aG9kLCB2YWx1ZSA9ICcnKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgICBtZXRob2RcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIGRhdGEudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICAgICAgdmltZW9QbGF5ZXIucG9zdE1lc3NhZ2UobWVzc2FnZSwgb3JpZ2luKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGF5KCkge1xuICAgICAgICBwYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgc2VuZENvbW1hbmQoJ3BsYXknKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXVzZSgpIHtcbiAgICAgICAgcGF1c2VkID0gdHJ1ZTtcbiAgICAgICAgc2VuZENvbW1hbmQoJ3BhdXNlJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25SZWFkeSgpIHtcbiAgICAgICAgc2VuZENvbW1hbmQoJ2FkZEV2ZW50TGlzdGVuZXInLCAncGxheScpO1xuICAgICAgICBzZW5kQ29tbWFuZCgnYWRkRXZlbnRMaXN0ZW5lcicsICdwYXVzZScpO1xuICAgICAgICBzZW5kQ29tbWFuZCgnYWRkRXZlbnRMaXN0ZW5lcicsICdmaW5pc2gnKTtcbiAgICAgICAgc2VuZENvbW1hbmQoJ2FkZEV2ZW50TGlzdGVuZXInLCAncGxheVByb2dyZXNzJyk7XG4gICAgICAgIHBsYXllci5lbWl0KCdyZWFkeScpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uUGxheSgpIHtcbiAgICAgICAgcGF1c2VkID0gZmFsc2U7XG4gICAgICAgIHBsYXllci5lbWl0KCdwbGF5Jyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25QYXVzZSgpIHtcbiAgICAgICAgcGF1c2VkID0gdHJ1ZTtcbiAgICAgICAgcGxheWVyLmVtaXQoJ3BhdXNlJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25GaW5pc2goKSB7XG4gICAgICAgIHBsYXllci5lbWl0KCdlbmRlZCcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uUGxheVByb2dyZXNzKGRhdGEpIHtcbiAgICAgICAgcGxheWVyLmVtaXQoJ3RpbWV1cGRhdGUnLCBkYXRhLnNlY29uZHMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTWVzc2FnZShldmVudCkge1xuICAgICAgICBjb25zdCBpc1ZpbWVvID0gcmUudGVzdChldmVudC5vcmlnaW4pO1xuXG4gICAgICAgIGlmICghaXNWaW1lbykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UoZXZlbnQuZGF0YSk7XG5cbiAgICAgICAgaWYgKGRhdGEucGxheWVyX2lkICYmIGVsLmlkICE9PSBkYXRhLnBsYXllcl9pZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9yaWdpbiA9PT0gJyonKSB7XG4gICAgICAgICAgICBvcmlnaW4gPSBldmVudC5vcmlnaW47XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKGRhdGEuZXZlbnQpIHtcbiAgICAgICAgICAgIGNhc2UgJ3JlYWR5JzpcbiAgICAgICAgICAgICAgICBvblJlYWR5KGRhdGEucGxheWVyX2lkKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3BsYXlQcm9ncmVzcyc6XG4gICAgICAgICAgICAgICAgb25QbGF5UHJvZ3Jlc3MoZGF0YS5kYXRhKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3BsYXknOlxuICAgICAgICAgICAgICAgIG9uUGxheSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncGF1c2UnOlxuICAgICAgICAgICAgICAgIG9uUGF1c2UoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2ZpbmlzaCc6XG4gICAgICAgICAgICAgICAgb25GaW5pc2goKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIG9uTWVzc2FnZSk7XG4gICAgfVxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBvbk1lc3NhZ2UpO1xuXG4gICAgcGxheWVyID0gT2JqZWN0LmFzc2lnbihPYmplY3QuY3JlYXRlKGVtaXR0ZXIucHJvdG90eXBlKSwge1xuICAgICAgICBfZXZlbnRzOiB7fSxcbiAgICAgICAgcGxheSxcbiAgICAgICAgcGF1c2UsXG4gICAgICAgIHBhdXNlZDogKCkgPT4gcGF1c2VkLFxuICAgICAgICBkZXN0cm95XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcGxheWVyO1xufVxuIiwiLy8gaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20veW91dHViZS9pZnJhbWVfYXBpX3JlZmVyZW5jZSNFdmVudHNcbmltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tICdldmVudHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB5b3V0dWJlKGVsKSB7XG4gICAgbGV0IGVtaXR0ZXIgPSBudWxsLCBwbGF5ZXIgPSBudWxsLCBwYXVzZWQgPSBmYWxzZTtcblxuICAgIGZ1bmN0aW9uIHBsYXkoKSB7XG4gICAgICAgIHBhdXNlZCA9IGZhbHNlO1xuICAgICAgICBwbGF5ZXIucGxheVZpZGVvKCk7XG4gICAgICAgIHJldHVybiBlbWl0dGVyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhdXNlKCkge1xuICAgICAgICBwYXVzZWQgPSB0cnVlO1xuICAgICAgICBwbGF5ZXIucGF1c2VWaWRlbygpO1xuICAgICAgICByZXR1cm4gZW1pdHRlcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblJlYWR5KCkge1xuICAgICAgICBlbWl0dGVyLmVtaXQoJ3JlYWR5Jyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25TdGF0ZUNoYW5nZShldmVudCkge1xuICAgICAgICBjb25zdCB7UGxheWVyU3RhdGV9ID0gd2luZG93LllUO1xuXG4gICAgICAgIHN3aXRjaCAoZXZlbnQuZGF0YSkge1xuICAgICAgICAgICAgY2FzZSBQbGF5ZXJTdGF0ZS5DVUVEOlxuICAgICAgICAgICAgY2FzZSBQbGF5ZXJTdGF0ZS5CVUZGRVJJTkc6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFBsYXllclN0YXRlLlBMQVlJTkc6XG4gICAgICAgICAgICAgICAgcGF1c2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZW1pdHRlci5lbWl0KCdwbGF5Jyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFBsYXllclN0YXRlLlBBVVNFRDpcbiAgICAgICAgICAgICAgICBwYXVzZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGVtaXR0ZXIuZW1pdCgncGF1c2UnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUGxheWVyU3RhdGUuRU5ERUQ6XG4gICAgICAgICAgICAgICAgZW1pdHRlci5lbWl0KCdlbmRlZCcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDogYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZXN0cm95KCkge31cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVBsYXllcigpIHtcbiAgICAgICAgaWYgKHBsYXllcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcGxheWVyID0gbmV3IHdpbmRvdy5ZVC5QbGF5ZXIoZWwsIHtcbiAgICAgICAgICAgIGV2ZW50czoge1xuICAgICAgICAgICAgICAgIG9uUmVhZHksXG4gICAgICAgICAgICAgICAgb25TdGF0ZUNoYW5nZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuXG4gICAgaWYgKHdpbmRvdy5ZVCkge1xuICAgICAgICBjcmVhdGVQbGF5ZXIoKTtcbiAgICB9IGVsc2UgaWYgKHdpbmRvdy55dFBsYXllckNhbGxzKSB7XG4gICAgICAgIHdpbmRvdy55dFBsYXllckNhbGxzLnB1c2goY3JlYXRlUGxheWVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB3aW5kb3cueXRQbGF5ZXJDYWxscyA9IFtjcmVhdGVQbGF5ZXJdO1xuICAgICAgICB3aW5kb3cub25Zb3VUdWJlSWZyYW1lQVBJUmVhZHkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHdpbmRvdy55dFBsYXllckNhbGxzLmZvckVhY2goKGNhbGwpID0+IGNhbGwoKSk7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICBzY3JpcHQuc3JjID0gJ2h0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2lmcmFtZV9hcGknO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgfVxuXG4gICAgZW1pdHRlciA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmNyZWF0ZShFdmVudEVtaXR0ZXIucHJvdG90eXBlKSwge1xuICAgICAgICBfZXZlbnRzOiB7fSxcbiAgICAgICAgcGxheSxcbiAgICAgICAgcGF1c2UsXG4gICAgICAgIHBhdXNlZDogKCkgPT4gcGF1c2VkLFxuICAgICAgICBkZXN0cm95XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZW1pdHRlcjtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHlvdXR1YmVCYXNpYyhlbCkge1xuICAgIGNvbnN0IGlmcmFtZSA9IGVsLmNvbnRlbnRXaW5kb3c7XG5cbiAgICBmdW5jdGlvbiBzZW5kQ29tbWFuZChjb21tYW5kKSB7XG4gICAgICAgIGlmcmFtZS5wb3N0TWVzc2FnZShge1wiZXZlbnRcIjpcImNvbW1hbmRcIixcImZ1bmNcIjpcIiR7Y29tbWFuZH1cIixcImFyZ3NcIjpcIlwifWAsICcqJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGxheSgpIHtcbiAgICAgICAgc2VuZENvbW1hbmQoJ3BsYXlWaWRlbycpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhdXNlKCkge1xuICAgICAgICBzZW5kQ29tbWFuZCgncGF1c2VWaWRlbycpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHBsYXksXG4gICAgICAgIHBhdXNlXG4gICAgfTtcbn1cbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIHRoaXMuX2V2ZW50cyA9IHRoaXMuX2V2ZW50cyB8fCB7fTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxuRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24obikge1xuICBpZiAoIWlzTnVtYmVyKG4pIHx8IG4gPCAwIHx8IGlzTmFOKG4pKVxuICAgIHRocm93IFR5cGVFcnJvcignbiBtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyJyk7XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgZXIsIGhhbmRsZXIsIGxlbiwgYXJncywgaSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKHR5cGUgPT09ICdlcnJvcicpIHtcbiAgICBpZiAoIXRoaXMuX2V2ZW50cy5lcnJvciB8fFxuICAgICAgICAoaXNPYmplY3QodGhpcy5fZXZlbnRzLmVycm9yKSAmJiAhdGhpcy5fZXZlbnRzLmVycm9yLmxlbmd0aCkpIHtcbiAgICAgIGVyID0gYXJndW1lbnRzWzFdO1xuICAgICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBBdCBsZWFzdCBnaXZlIHNvbWUga2luZCBvZiBjb250ZXh0IHRvIHRoZSB1c2VyXG4gICAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ1VuY2F1Z2h0LCB1bnNwZWNpZmllZCBcImVycm9yXCIgZXZlbnQuICgnICsgZXIgKyAnKScpO1xuICAgICAgICBlcnIuY29udGV4dCA9IGVyO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICBpZiAoaXNVbmRlZmluZWQoaGFuZGxlcikpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGhhbmRsZXIpKSB7XG4gICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAvLyBmYXN0IGNhc2VzXG4gICAgICBjYXNlIDE6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBzbG93ZXJcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICBoYW5kbGVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc09iamVjdChoYW5kbGVyKSkge1xuICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgIGxpc3RlbmVycyA9IGhhbmRsZXIuc2xpY2UoKTtcbiAgICBsZW4gPSBsaXN0ZW5lcnMubGVuZ3RoO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKylcbiAgICAgIGxpc3RlbmVyc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBtO1xuXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gIGlmICh0aGlzLl9ldmVudHMubmV3TGlzdGVuZXIpXG4gICAgdGhpcy5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgIGlzRnVuY3Rpb24obGlzdGVuZXIubGlzdGVuZXIpID9cbiAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gIGVsc2UgaWYgKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkpXG4gICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5wdXNoKGxpc3RlbmVyKTtcbiAgZWxzZVxuICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IFt0aGlzLl9ldmVudHNbdHlwZV0sIGxpc3RlbmVyXTtcblxuICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSAmJiAhdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCkge1xuICAgIGlmICghaXNVbmRlZmluZWQodGhpcy5fbWF4TGlzdGVuZXJzKSkge1xuICAgICAgbSA9IHRoaXMuX21heExpc3RlbmVycztcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICAgIH1cblxuICAgIGlmIChtICYmIG0gPiAwICYmIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGggPiBtKSB7XG4gICAgICB0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkID0gdHJ1ZTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJyhub2RlKSB3YXJuaW5nOiBwb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5ICcgK1xuICAgICAgICAgICAgICAgICAgICAnbGVhayBkZXRlY3RlZC4gJWQgbGlzdGVuZXJzIGFkZGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1VzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvIGluY3JlYXNlIGxpbWl0LicsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGgpO1xuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLnRyYWNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIG5vdCBzdXBwb3J0ZWQgaW4gSUUgMTBcbiAgICAgICAgY29uc29sZS50cmFjZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICB2YXIgZmlyZWQgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBnKCkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgZyk7XG5cbiAgICBpZiAoIWZpcmVkKSB7XG4gICAgICBmaXJlZCA9IHRydWU7XG4gICAgICBsaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfVxuXG4gIGcubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgdGhpcy5vbih0eXBlLCBnKTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIGVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZmYgdGhlIGxpc3RlbmVyIHdhcyByZW1vdmVkXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIGxpc3QsIHBvc2l0aW9uLCBsZW5ndGgsIGk7XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgbGlzdCA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgbGVuZ3RoID0gbGlzdC5sZW5ndGg7XG4gIHBvc2l0aW9uID0gLTE7XG5cbiAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8XG4gICAgICAoaXNGdW5jdGlvbihsaXN0Lmxpc3RlbmVyKSAmJiBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuXG4gIH0gZWxzZSBpZiAoaXNPYmplY3QobGlzdCkpIHtcbiAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSA+IDA7KSB7XG4gICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHxcbiAgICAgICAgICAobGlzdFtpXS5saXN0ZW5lciAmJiBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICAgIGxpc3QubGVuZ3RoID0gMDtcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3Quc3BsaWNlKHBvc2l0aW9uLCAxKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBrZXksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICByZXR1cm4gdGhpcztcblxuICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gIGlmICghdGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXG4gICAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICBlbHNlIGlmICh0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgZm9yIChrZXkgaW4gdGhpcy5fZXZlbnRzKSB7XG4gICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgfVxuICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGxpc3RlbmVycykpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gIH0gZWxzZSBpZiAobGlzdGVuZXJzKSB7XG4gICAgLy8gTElGTyBvcmRlclxuICAgIHdoaWxlIChsaXN0ZW5lcnMubGVuZ3RoKVxuICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbbGlzdGVuZXJzLmxlbmd0aCAtIDFdKTtcbiAgfVxuICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciByZXQ7XG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0ID0gW107XG4gIGVsc2UgaWYgKGlzRnVuY3Rpb24odGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICByZXQgPSBbdGhpcy5fZXZlbnRzW3R5cGVdXTtcbiAgZWxzZVxuICAgIHJldCA9IHRoaXMuX2V2ZW50c1t0eXBlXS5zbGljZSgpO1xuICByZXR1cm4gcmV0O1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24odHlwZSkge1xuICBpZiAodGhpcy5fZXZlbnRzKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgICBpZiAoaXNGdW5jdGlvbihldmxpc3RlbmVyKSlcbiAgICAgIHJldHVybiAxO1xuICAgIGVsc2UgaWYgKGV2bGlzdGVuZXIpXG4gICAgICByZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGg7XG4gIH1cbiAgcmV0dXJuIDA7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKTtcbn07XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nO1xufVxuXG5mdW5jdGlvbiBpc051bWJlcihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdudW1iZXInO1xufVxuXG5mdW5jdGlvbiBpc09iamVjdChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnICYmIGFyZyAhPT0gbnVsbDtcbn1cblxuZnVuY3Rpb24gaXNVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IHZvaWQgMDtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG52YXIgTWluaVNpZ25hbEJpbmRpbmcgPSAoZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBNaW5pU2lnbmFsQmluZGluZyhmbiwgb25jZSwgdGhpc0FyZykge1xuICAgIGlmIChvbmNlID09PSB1bmRlZmluZWQpIG9uY2UgPSBmYWxzZTtcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBNaW5pU2lnbmFsQmluZGluZyk7XG5cbiAgICB0aGlzLl9mbiA9IGZuO1xuICAgIHRoaXMuX29uY2UgPSBvbmNlO1xuICAgIHRoaXMuX3RoaXNBcmcgPSB0aGlzQXJnO1xuICAgIHRoaXMuX25leHQgPSB0aGlzLl9wcmV2ID0gdGhpcy5fb3duZXIgPSBudWxsO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKE1pbmlTaWduYWxCaW5kaW5nLCBbe1xuICAgIGtleTogJ2RldGFjaCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRldGFjaCgpIHtcbiAgICAgIGlmICh0aGlzLl9vd25lciA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuICAgICAgdGhpcy5fb3duZXIuZGV0YWNoKHRoaXMpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIE1pbmlTaWduYWxCaW5kaW5nO1xufSkoKTtcblxuZnVuY3Rpb24gX2FkZE1pbmlTaWduYWxCaW5kaW5nKHNlbGYsIG5vZGUpIHtcbiAgaWYgKCFzZWxmLl9oZWFkKSB7XG4gICAgc2VsZi5faGVhZCA9IG5vZGU7XG4gICAgc2VsZi5fdGFpbCA9IG5vZGU7XG4gIH0gZWxzZSB7XG4gICAgc2VsZi5fdGFpbC5fbmV4dCA9IG5vZGU7XG4gICAgbm9kZS5fcHJldiA9IHNlbGYuX3RhaWw7XG4gICAgc2VsZi5fdGFpbCA9IG5vZGU7XG4gIH1cblxuICBub2RlLl9vd25lciA9IHNlbGY7XG5cbiAgcmV0dXJuIG5vZGU7XG59XG5cbnZhciBNaW5pU2lnbmFsID0gKGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gTWluaVNpZ25hbCgpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTWluaVNpZ25hbCk7XG5cbiAgICB0aGlzLl9oZWFkID0gdGhpcy5fdGFpbCA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhNaW5pU2lnbmFsLCBbe1xuICAgIGtleTogJ2hhbmRsZXJzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaGFuZGxlcnMoKSB7XG4gICAgICB2YXIgZXhpc3RzID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8gZmFsc2UgOiBhcmd1bWVudHNbMF07XG5cbiAgICAgIHZhciBub2RlID0gdGhpcy5faGVhZDtcblxuICAgICAgaWYgKGV4aXN0cykgcmV0dXJuICEhbm9kZTtcblxuICAgICAgdmFyIGVlID0gW107XG5cbiAgICAgIHdoaWxlIChub2RlKSB7XG4gICAgICAgIGVlLnB1c2gobm9kZSk7XG4gICAgICAgIG5vZGUgPSBub2RlLl9uZXh0O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZWU7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnaGFzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaGFzKG5vZGUpIHtcbiAgICAgIGlmICghKG5vZGUgaW5zdGFuY2VvZiBNaW5pU2lnbmFsQmluZGluZykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaW5pU2lnbmFsI2hhcygpOiBGaXJzdCBhcmcgbXVzdCBiZSBhIE1pbmlTaWduYWxCaW5kaW5nIG9iamVjdC4nKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5vZGUuX293bmVyID09PSB0aGlzO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2Rpc3BhdGNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGlzcGF0Y2goKSB7XG4gICAgICB2YXIgbm9kZSA9IHRoaXMuX2hlYWQ7XG5cbiAgICAgIGlmICghbm9kZSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICB3aGlsZSAobm9kZSkge1xuICAgICAgICBpZiAobm9kZS5fb25jZSkgdGhpcy5kZXRhY2gobm9kZSk7XG4gICAgICAgIG5vZGUuX2ZuLmFwcGx5KG5vZGUuX3RoaXNBcmcsIGFyZ3VtZW50cyk7XG4gICAgICAgIG5vZGUgPSBub2RlLl9uZXh0O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdhZGQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhZGQoZm4pIHtcbiAgICAgIHZhciB0aGlzQXJnID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGFyZ3VtZW50c1sxXTtcblxuICAgICAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pbmlTaWduYWwjYWRkKCk6IEZpcnN0IGFyZyBtdXN0IGJlIGEgRnVuY3Rpb24uJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gX2FkZE1pbmlTaWduYWxCaW5kaW5nKHRoaXMsIG5ldyBNaW5pU2lnbmFsQmluZGluZyhmbiwgZmFsc2UsIHRoaXNBcmcpKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdvbmNlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25jZShmbikge1xuICAgICAgdmFyIHRoaXNBcmcgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyBudWxsIDogYXJndW1lbnRzWzFdO1xuXG4gICAgICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWluaVNpZ25hbCNvbmNlKCk6IEZpcnN0IGFyZyBtdXN0IGJlIGEgRnVuY3Rpb24uJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gX2FkZE1pbmlTaWduYWxCaW5kaW5nKHRoaXMsIG5ldyBNaW5pU2lnbmFsQmluZGluZyhmbiwgdHJ1ZSwgdGhpc0FyZykpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2RldGFjaCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRldGFjaChub2RlKSB7XG4gICAgICBpZiAoIShub2RlIGluc3RhbmNlb2YgTWluaVNpZ25hbEJpbmRpbmcpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWluaVNpZ25hbCNkZXRhY2goKTogRmlyc3QgYXJnIG11c3QgYmUgYSBNaW5pU2lnbmFsQmluZGluZyBvYmplY3QuJyk7XG4gICAgICB9XG4gICAgICBpZiAobm9kZS5fb3duZXIgIT09IHRoaXMpIHJldHVybiB0aGlzO1xuXG4gICAgICBpZiAobm9kZS5fcHJldikgbm9kZS5fcHJldi5fbmV4dCA9IG5vZGUuX25leHQ7XG4gICAgICBpZiAobm9kZS5fbmV4dCkgbm9kZS5fbmV4dC5fcHJldiA9IG5vZGUuX3ByZXY7XG5cbiAgICAgIGlmIChub2RlID09PSB0aGlzLl9oZWFkKSB7XG4gICAgICAgIHRoaXMuX2hlYWQgPSBub2RlLl9uZXh0O1xuICAgICAgICBpZiAobm9kZS5fbmV4dCA9PT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuX3RhaWwgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKG5vZGUgPT09IHRoaXMuX3RhaWwpIHtcbiAgICAgICAgdGhpcy5fdGFpbCA9IG5vZGUuX3ByZXY7XG4gICAgICAgIHRoaXMuX3RhaWwuX25leHQgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBub2RlLl9vd25lciA9IG51bGw7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdkZXRhY2hBbGwnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXRhY2hBbGwoKSB7XG4gICAgICB2YXIgbm9kZSA9IHRoaXMuX2hlYWQ7XG4gICAgICBpZiAoIW5vZGUpIHJldHVybiB0aGlzO1xuXG4gICAgICB0aGlzLl9oZWFkID0gdGhpcy5fdGFpbCA9IG51bGw7XG5cbiAgICAgIHdoaWxlIChub2RlKSB7XG4gICAgICAgIG5vZGUuX293bmVyID0gbnVsbDtcbiAgICAgICAgbm9kZSA9IG5vZGUuX25leHQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gTWluaVNpZ25hbDtcbn0pKCk7XG5cbk1pbmlTaWduYWwuTWluaVNpZ25hbEJpbmRpbmcgPSBNaW5pU2lnbmFsQmluZGluZztcblxuZXhwb3J0c1snZGVmYXVsdCddID0gTWluaVNpZ25hbDtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb2JqZWN0UG9vbChmYWN0b3J5Rm4pIHtcblxuICAgIGxldCBwb29sID0gW107XG4gICAgbGV0IG51bUNyZWF0ZWQgPSAwO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0UG9vbCAoKSB7XG4gICAgICAgICAgICByZXR1cm4gcG9vbDtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgIGlmICggcG9vbC5sZW5ndGggPiAwICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwb29sLnBvcCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBudW1DcmVhdGVkKys7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhY3RvcnlGbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBkaXNwb3NlIChpbnN0YW5jZSkge1xuICAgICAgICAgICAgcG9vbC5wdXNoKGluc3RhbmNlKTtcbiAgICAgICAgfSxcbiAgICAgICAgZmlsbCAoY291bnQpIHtcbiAgICAgICAgICAgIHdoaWxlICggcG9vbC5sZW5ndGggPCBjb3VudCApIHtcbiAgICAgICAgICAgICAgICBudW1DcmVhdGVkKys7XG4gICAgICAgICAgICAgICAgcG9vbFtwb29sLmxlbmd0aF0gPSBmYWN0b3J5Rm4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZW1wdHkgKCkge1xuICAgICAgICAgICAgcG9vbCA9IFtdO1xuICAgICAgICB9LFxuICAgICAgICBnZXROdW1DcmVhdGVkKCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bUNyZWF0ZWQ7XG4gICAgICAgIH1cbiAgICB9O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2xvbmUob2IpIHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYikpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZmlsdGVyKG9iLCBwcmVkaWNhdGUpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMob2IpXG4gICAgICAgIC5maWx0ZXIoa2V5ID0+IHByZWRpY2F0ZShrZXksIG9iW2tleV0pKVxuICAgICAgICAucmVkdWNlKChuZXdPYiwga2V5KSA9PiB7XG4gICAgICAgICAgICBuZXdPYltrZXldID0gb2Jba2V5XTtcbiAgICAgICAgICAgIHJldHVybiBuZXdPYjtcbiAgICAgICAgfSwge30pO1xufVxuIiwiaW1wb3J0IGNsb25lIGZyb20gJy4vY2xvbmUnO1xuaW1wb3J0IGZpbHRlciBmcm9tICcuL2ZpbHRlcic7XG5pbXBvcnQgbWFwIGZyb20gJy4vbWFwJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGNsb25lLFxuICAgIGZpbHRlcixcbiAgICBtYXBcbn07XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYXAob2IsIGZuKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iKVxuICAgICAgICAucmVkdWNlKChuZXdPYiwga2V5KSA9PiB7XG4gICAgICAgICAgICBuZXdPYltrZXldID0gZm4oa2V5LCBvYltrZXldKTtcbiAgICAgICAgICAgIHJldHVybiBuZXdPYjtcbiAgICAgICAgfSwge30pO1xufVxuIiwiY29uc3Qge2FicywgYXRhbjIsIGNvcywgc2luLCBzcXJ0fSA9IE1hdGg7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhcnRpY2xlIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHRoaXMub3B0cyA9IG9wdGlvbnM7XG5cbiAgICAgICAgdGhpcy5fYm91bmRzID0ge307XG4gICAgICAgIHRoaXMuX291dGVyQm91bmRzID0ge307XG5cbiAgICAgICAgdGhpcy5fZGVmYXVsdHMgPSB7XG4gICAgICAgICAgICBhbGl2ZTogdHJ1ZSxcbiAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB5OiAwLFxuICAgICAgICAgICAgYW5nbGU6IDAsXG4gICAgICAgICAgICBzcGVlZDogMCxcbiAgICAgICAgICAgIGdyYXZpdHk6IDAsXG4gICAgICAgICAgICBtYXNzOiAxLFxuICAgICAgICAgICAgcmFkaXVzOiAwLFxuICAgICAgICAgICAgYm91bmNlOiB7eDogLTEsIHk6IC0xfSxcbiAgICAgICAgICAgIGZyaWN0aW9uOiAxLFxuICAgICAgICAgICAgbGlmZVRpbWU6IDAsXG4gICAgICAgICAgICBib3VuZHM6IHt4OiAwLCB5OiAwLCB3aWR0aDogMTI4MCwgaGVpZ2h0OiA3MjB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5fcHJvcHMgPSBPYmplY3Qua2V5cyh0aGlzLl9kZWZhdWx0cyk7XG5cbiAgICAgICAgdGhpcy5yZXNldChvcHRpb25zKTtcbiAgICB9XG5cbiAgICByZXNldChvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IGRlZnMgPSB0aGlzLl9kZWZhdWx0cztcbiAgICAgICAgY29uc3QgcHJvcHMgPSB0aGlzLl9wcm9wcztcbiAgICAgICAgY29uc3Qgb3B0cyA9IG9wdGlvbnMgfHwgZGVmcztcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBrZXkgPSBwcm9wc1tpXTtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gb3B0c1trZXldIHx8IGRlZnNba2V5XTtcbiAgICAgICAgICAgIHRoaXNba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgZGVmc1trZXldID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBhbmdsZSA9IG9wdHMuYW5nbGUgfHwgZGVmcy5hbmdsZTtcbiAgICAgICAgY29uc3Qgc3BlZWQgPSBvcHRzLnNwZWVkIHx8IGRlZnMuc3BlZWQ7XG5cbiAgICAgICAgdGhpcy52eCA9IGNvcyhhbmdsZSkgKiBzcGVlZDtcbiAgICAgICAgdGhpcy52eSA9IHNpbihhbmdsZSkgKiBzcGVlZDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIHRoaXMudnggKj0gdGhpcy5mcmljdGlvbjtcbiAgICAgICAgdGhpcy52eSAqPSB0aGlzLmZyaWN0aW9uO1xuICAgICAgICB0aGlzLnZ5ICs9IHRoaXMuZ3Jhdml0eTtcbiAgICAgICAgdGhpcy54ICs9IHRoaXMudng7XG4gICAgICAgIHRoaXMueSArPSB0aGlzLnZ5O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBhY2NlbGxlcmF0ZShzcGVlZCwgYW5nbGUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBhbmdsZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGFuZ2xlID0gdGhpcy5hbmdsZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnZ4ICs9IGNvcyhhbmdsZSkgKiBzcGVlZDtcbiAgICAgICAgdGhpcy52eSArPSBzaW4oYW5nbGUpICogc3BlZWQ7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGdldCBzcGVlZCgpIHtcbiAgICAgICAgaWYgKHRoaXMudnggPT09IDAgJiYgdGhpcy52eSA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNxcnQodGhpcy52eCAqIHRoaXMudnggKyB0aGlzLnZ5ICogdGhpcy52eSk7XG4gICAgfVxuXG4gICAgc2V0IHNwZWVkKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGFuZ2xlID0gdGhpcy5hbmdsZTtcbiAgICAgICAgdGhpcy52eCA9IGNvcyhhbmdsZSkgKiB2YWx1ZTtcbiAgICAgICAgdGhpcy52eSA9IHNpbihhbmdsZSkgKiB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgYW5nbGUoKSB7XG4gICAgICAgIGlmICh0aGlzLnZ4ID09PSAwICYmIHRoaXMudnkgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhdGFuMih0aGlzLnZ5LCB0aGlzLnZ4KTtcbiAgICB9XG5cbiAgICBzZXQgYW5nbGUodmFsdWUpIHtcbiAgICAgICAgY29uc3Qgc3BlZWQgPSB0aGlzLnNwZWVkO1xuICAgICAgICB0aGlzLnZ4ID0gY29zKHZhbHVlKSAqIHNwZWVkO1xuICAgICAgICB0aGlzLnZ5ID0gc2luKHZhbHVlKSAqIHNwZWVkO1xuICAgIH1cblxuICAgIHNldEJvdW5kcyh4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHRoaXMuX2JvdW5kcy54ID0geCB8fCAwO1xuICAgICAgICB0aGlzLl9ib3VuZHMueSA9IHkgfHwgMDtcbiAgICAgICAgdGhpcy5fYm91bmRzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuX2JvdW5kcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgfVxuXG4gICAgZ2V0IGJvdW5kcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JvdW5kcztcbiAgICB9XG5cbiAgICBzZXQgYm91bmRzKG9iKSB7XG4gICAgICAgIGNvbnN0IHt4LCB5LCB3aWR0aCwgaGVpZ2h0fSA9IG9iO1xuICAgICAgICB0aGlzLnNldEJvdW5kcyh4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcbiAgICB9XG5cbiAgICBnZXQgbGVmdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueCAtIHRoaXMucmFkaXVzO1xuICAgIH1cblxuICAgIGdldCByaWdodCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueCArIHRoaXMucmFkaXVzO1xuICAgIH1cblxuICAgIGdldCB0b3AoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnkgLSB0aGlzLnJhZGl1cztcbiAgICB9XG5cbiAgICBnZXQgYm90dG9tKCkge1xuICAgICAgICByZXR1cm4gdGhpcy55ICsgdGhpcy5yYWRpdXM7XG4gICAgfVxuXG4gICAgZ2V0IG91dGVyQm91bmRzKCkge1xuICAgICAgICB0aGlzLl9vdXRlckJvdW5kcy5sZWZ0ID0gdGhpcy5fYm91bmRzLnggLSB0aGlzLnJhZGl1cztcbiAgICAgICAgdGhpcy5fb3V0ZXJCb3VuZHMucmlnaHQgPSB0aGlzLl9ib3VuZHMueCArIHRoaXMuX2JvdW5kcy53aWR0aCArIHRoaXMucmFkaXVzO1xuICAgICAgICB0aGlzLl9vdXRlckJvdW5kcy50b3AgPSB0aGlzLl9ib3VuZHMueSAtIHRoaXMucmFkaXVzO1xuICAgICAgICB0aGlzLl9vdXRlckJvdW5kcy5ib3R0b20gPSB0aGlzLl9ib3VuZHMueSArIHRoaXMuX2JvdW5kcy5oZWlnaHQgKyB0aGlzLnJhZGl1cztcbiAgICAgICAgcmV0dXJuIHRoaXMuX291dGVyQm91bmRzO1xuICAgIH1cblxuICAgIGFuZ2xlVG8ocCkge1xuICAgICAgICByZXR1cm4gYXRhbjIocC55IC0gdGhpcy55LCBwLnggLSB0aGlzLngpO1xuICAgIH1cblxuICAgIGRpc3RhbmNlVG8ocCkge1xuICAgICAgICBjb25zdCBkeCA9IHAueCAtIHRoaXMueDtcbiAgICAgICAgY29uc3QgZHkgPSBwLnkgLSB0aGlzLnk7XG4gICAgICAgIHJldHVybiBzcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbiAgICB9XG5cbiAgICBtb3ZlVG8ocCwgdGhydXN0ID0gMC4wMDUpIHtcbiAgICAgICAgY29uc3QgZHggPSBwLnggLSB0aGlzLng7XG4gICAgICAgIGNvbnN0IGR5ID0gcC55IC0gdGhpcy55O1xuXG4gICAgICAgIHRoaXMudnggKz0gZHggKiB0aHJ1c3Q7XG4gICAgICAgIHRoaXMudnkgKz0gZHkgKiB0aHJ1c3Q7XG5cbiAgICAgICAgaWYgKGFicyh0aGlzLnZ4KSA+IGFicyhkeCkpIHtcbiAgICAgICAgICAgIHRoaXMudnggPSBkeDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhYnModGhpcy52eSkgPiBhYnMoZHkpKSB7XG4gICAgICAgICAgICB0aGlzLnZ5ID0gZHk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBncmF2aXRhdGVUbyhwKSB7XG4gICAgICAgIGNvbnN0IGR4ID0gcC54IC0gdGhpcy54O1xuICAgICAgICBjb25zdCBkeSA9IHAueSAtIHRoaXMueTtcbiAgICAgICAgY29uc3QgZGlzdFNxID0gZHggKiBkeCArIGR5ICogZHk7XG4gICAgICAgIGlmIChkaXN0U3EgPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBkaXN0ID0gc3FydChkaXN0U3EpO1xuICAgICAgICAgICAgY29uc3QgZm9yY2UgPSBwLm1hc3MgLyBkaXN0U3E7XG4gICAgICAgICAgICBjb25zdCBheCA9IGR4IC8gZGlzdCAqIGZvcmNlO1xuICAgICAgICAgICAgY29uc3QgYXkgPSBkeSAvIGRpc3QgKiBmb3JjZTtcbiAgICAgICAgICAgIHRoaXMudnggKz0gYXg7XG4gICAgICAgICAgICB0aGlzLnZ5ICs9IGF5O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc3ByaW5nVG8ocCwgc3RpZmZuZXNzLCBsZW5ndGgpIHtcbiAgICAgICAgY29uc3QgZHggPSBwLnggLSB0aGlzLng7XG4gICAgICAgIGNvbnN0IGR5ID0gcC55IC0gdGhpcy55O1xuICAgICAgICBjb25zdCBkaXN0YW5jZSA9IHNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuICAgICAgICBjb25zdCBmb3JjZSA9IChkaXN0YW5jZSAtIChsZW5ndGggfHwgMCkpICogKHN0aWZmbmVzcyB8fCAwLjIpO1xuXG4gICAgICAgIGlmIChhYnMoZGlzdGFuY2UgKiBmb3JjZSkgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnZ4ICs9IGR4IC8gZGlzdGFuY2UgKiBmb3JjZTtcbiAgICAgICAgICAgIHRoaXMudnkgKz0gZHkgLyBkaXN0YW5jZSAqIGZvcmNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgY29sbGlkZXMocCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXN0YW5jZVRvKHApIDw9IHRoaXMucmFkaXVzICsgcC5yYWRpdXM7XG4gICAgfVxuXG4gICAgZWRnZUNvbGxpZGUoKSB7XG4gICAgICAgIGNvbnN0IGxlZnQgPSB0aGlzLl9ib3VuZHMueCArIHRoaXMucmFkaXVzO1xuICAgICAgICBjb25zdCByaWdodCA9IHRoaXMuX2JvdW5kcy54ICsgdGhpcy5fYm91bmRzLndpZHRoIC0gdGhpcy5yYWRpdXM7XG4gICAgICAgIGNvbnN0IHRvcCA9IHRoaXMuX2JvdW5kcy55ICsgdGhpcy5yYWRpdXM7XG4gICAgICAgIGNvbnN0IGJvdHRvbSA9IHRoaXMuX2JvdW5kcy55ICsgdGhpcy5fYm91bmRzLmhlaWdodCAtIHRoaXMucmFkaXVzO1xuXG4gICAgICAgIGlmICh0aGlzLnggPCBsZWZ0KSB7XG4gICAgICAgICAgICB0aGlzLnggPSBsZWZ0O1xuICAgICAgICAgICAgdGhpcy52eCA9IHRoaXMudnggKiB0aGlzLmJvdW5jZS54O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMueCA+IHJpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLnggPSByaWdodDtcbiAgICAgICAgICAgIHRoaXMudnggPSB0aGlzLnZ4ICogdGhpcy5ib3VuY2UueDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnkgPCB0b3ApIHtcbiAgICAgICAgICAgIHRoaXMueSA9IHRvcDtcbiAgICAgICAgICAgIHRoaXMudnkgPSB0aGlzLnZ5ICogdGhpcy5ib3VuY2UueTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnkgPiBib3R0b20pIHtcbiAgICAgICAgICAgIHRoaXMueSA9IGJvdHRvbTtcbiAgICAgICAgICAgIHRoaXMudnkgPSB0aGlzLnZ5ICogdGhpcy5ib3VuY2UueTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVkZ2VXcmFwKCkge1xuICAgICAgICBjb25zdCB7bGVmdCwgcmlnaHQsIHRvcCwgYm90dG9tfSA9IHRoaXMub3V0ZXJCb3VuZHM7XG5cbiAgICAgICAgaWYgKHRoaXMueCA8IGxlZnQpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHJpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMueCA+IHJpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLnggPSBsZWZ0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMueSA8IHRvcCkge1xuICAgICAgICAgICAgdGhpcy55ID0gYm90dG9tO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMueSA+IGJvdHRvbSkge1xuICAgICAgICAgICAgdGhpcy55ID0gdG9wO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZWRnZUtpbGwoKSB7XG4gICAgICAgIGNvbnN0IHtsZWZ0LCByaWdodCwgdG9wLCBib3R0b219ID0gdGhpcy5vdXRlckJvdW5kcztcblxuICAgICAgICBpZiAodGhpcy54IDwgbGVmdCB8fCB0aGlzLnggPiByaWdodCB8fCB0aGlzLnkgPCB0b3AgfHwgdGhpcy55ID4gYm90dG9tKSB7XG4gICAgICAgICAgICB0aGlzLmFsaXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlZGdlUmVzZXQoKSB7XG4gICAgICAgIGNvbnN0IHtsZWZ0LCByaWdodCwgdG9wLCBib3R0b219ID0gdGhpcy5vdXRlckJvdW5kcztcblxuICAgICAgICBpZiAodGhpcy54IDwgbGVmdCB8fCB0aGlzLnggPiByaWdodCB8fCB0aGlzLnkgPCB0b3AgfHwgdGhpcy55ID4gYm90dG9tKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsaWZlS2lsbCgpIHtcbiAgICAgICAgdGhpcy5saWZlVGltZS0tO1xuXG4gICAgICAgIGlmICh0aGlzLmxpZmVUaW1lIDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMuYWxpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBhbmRyb2lkIGZyb20gJy4uL29zL2FuZHJvaWQnO1xuXG4vL2h0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTQ0MDM3NjYvaG93LXRvLWRldGVjdC10aGUtc3RvY2stYW5kcm9pZC1icm93c2VyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhbmRyb2lkTmF0aXZlKHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudCkge1xuICAgIGlmICghYW5kcm9pZCh1YSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IGlzQW5kcm9pZE1vYmlsZSA9IHVhLmluZGV4T2YoJ01vemlsbGEvNS4wJykgPiAtMSAmJiB1YS5pbmRleE9mKCdBcHBsZVdlYktpdCcpID4gLTE7XG5cbiAgICBjb25zdCByZUFwcGxlV2ViS2l0ID0gL0FwcGxlV2ViS2l0XFwvKFtcXGQuXSspLztcbiAgICBjb25zdCByZXN1bHRBcHBsZVdlYktpdCA9IHJlQXBwbGVXZWJLaXQuZXhlYyh1YSk7XG4gICAgY29uc3QgYXBwbGVXZWJLaXRWZXJzaW9uID0gcmVzdWx0QXBwbGVXZWJLaXQgPyBwYXJzZUZsb2F0KHJlQXBwbGVXZWJLaXQuZXhlYyh1YSlbMV0pIDogbnVsbDtcblxuICAgIGNvbnN0IHJlQ2hyb21lID0gL0Nocm9tZVxcLyhbXFxkLl0rKS87XG4gICAgY29uc3QgcmVzdWx0Q2hyb21lID0gcmVDaHJvbWUuZXhlYyh1YSk7XG4gICAgY29uc3QgY2hyb21lVmVyc2lvbiA9IHJlc3VsdENocm9tZSA/IHBhcnNlRmxvYXQocmVDaHJvbWUuZXhlYyh1YSlbMV0pIDogbnVsbDtcblxuICAgIHJldHVybiBpc0FuZHJvaWRNb2JpbGUgJiYgKGFwcGxlV2ViS2l0VmVyc2lvbiAmJiBhcHBsZVdlYktpdFZlcnNpb24gPCA1MzcpIHx8IChjaHJvbWVWZXJzaW9uICYmIGNocm9tZVZlcnNpb24gPCAzNyk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpZVZlcnNpb24odWEgPSBuYXZpZ2F0b3IudXNlckFnZW50KSB7XG4gICAgbGV0IHYgPSAwO1xuICAgIGlmICgvTVNJRSAoXFxkK1xcLlxcZCspOy8udGVzdCh1YSkpIHtcbiAgICAgICAgdiA9IHBhcnNlSW50KFJlZ0V4cC4kMSwgMTApO1xuICAgIH0gZWxzZSBpZiAoL1RyaWRlbnRcXC8oXFxkK1xcLlxcZCspKC4qKXJ2OihcXGQrXFwuXFxkKykvLnRlc3QodWEpKSB7XG4gICAgICAgIHYgPSBwYXJzZUludChSZWdFeHAuJDMsIDEwKTtcbiAgICB9XG4gICAgcmV0dXJuIHY7XG59XG4iLCJpbXBvcnQgb3MgZnJvbSAnLi4vb3MnO1xuaW1wb3J0IGllVmVyc2lvbiBmcm9tICcuL2llVmVyc2lvbic7XG5pbXBvcnQgYW5kcm9pZE5hdGl2ZSBmcm9tICcuL2FuZHJvaWROYXRpdmUnO1xuaW1wb3J0IHNhZmFyaSBmcm9tICcuL3NhZmFyaSc7XG5cbmNvbnN0IHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcbmNvbnN0IGNocm9tZWlPUyA9ICgpID0+IG9zLmlvcygpICYmIC9DcmlPUy8udGVzdCh1YSk7XG5jb25zdCBmaXJlZm94ID0gKCkgPT4gL0ZpcmVmb3gvLnRlc3QodWEpO1xuY29uc3QgaWUgPSAoKSA9PiBpZVZlcnNpb24oKSA+IDA7XG5jb25zdCBzYWZhcmlNb2JpbGUgPSAoKSA9PiBvcy5pb3MoKSAmJiAvQXBwbGVXZWJLaXQvLnRlc3QodWEpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYW5kcm9pZE5hdGl2ZSxcbiAgICBjaHJvbWVpT1MsXG4gICAgZmlyZWZveCxcbiAgICBpZSxcbiAgICBpZVZlcnNpb24sXG4gICAgc2FmYXJpLFxuICAgIHNhZmFyaU1vYmlsZVxufTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNhZmFyaSh1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQpIHtcbiAgICByZXR1cm4gIS9BbmRyb2lkLy50ZXN0KHVhKSAmJiAhL0Nocm9tZS8udGVzdCh1YSkgJiYgL1NhZmFyaS8udGVzdCh1YSk7XG59XG4iLCJjb25zdCB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XG5cbmNvbnN0IGlwYWQgPSAoKSA9PiAvaVBhZC9pLnRlc3QodWEpO1xuY29uc3QgaXBvZCA9ICgpID0+IC9pUG9kL2kudGVzdCh1YSk7XG5jb25zdCBpcGhvbmUgPSAoKSA9PiAvaVBob25lL2kudGVzdCh1YSk7XG5jb25zdCBtb2JpbGUgPSAoKSA9PiAhIXVhLm1hdGNoKC9BbmRyb2lkfHdlYk9TfGlQaG9uZXxpUGFkfGlQb2R8QmxhY2tCZXJyeXxJRU1vYmlsZXxPcGVyYSBNaW5pfFdpbmRvd3MgUGhvbmV8U3ltYmlhbk9TL2kpO1xuY29uc3QgZGVza3RvcCA9ICgpID0+ICFtb2JpbGUoKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGRlc2t0b3AsXG4gICAgaXBhZCxcbiAgICBpcGhvbmUsXG4gICAgaXBvZCxcbiAgICBtb2JpbGVcbn07XG4iLCJpbXBvcnQgYnJvd3NlciBmcm9tICcuL2Jyb3dzZXInO1xuaW1wb3J0IGRldmljZSBmcm9tICcuL2RldmljZSc7XG5pbXBvcnQgb3MgZnJvbSAnLi9vcyc7XG5pbXBvcnQgc3VwcG9ydHMgZnJvbSAnLi9zdXBwb3J0cyc7XG5pbXBvcnQgc2NyZWVuIGZyb20gJy4vc2NyZWVuJztcbmltcG9ydCBpc0xvY2FsSG9zdCBmcm9tICcuL2lzTG9jYWxIb3N0JztcblxuY29uc3QgbG9jYWwgPSBpc0xvY2FsSG9zdCgpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYnJvd3NlcixcbiAgICBkZXZpY2UsXG4gICAgb3MsXG4gICAgc3VwcG9ydHMsXG4gICAgc2NyZWVuLFxuICAgIGxvY2FsXG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNMb2NhbEhvc3QoKSB7XG4gICAgcmV0dXJuIC9eKD86aHR0cHM/OlxcL1xcLyk/KD86bG9jYWxob3N0fDE5MlxcLjE2OCkvLnRlc3Qod2luZG93LmxvY2F0aW9uLmhyZWYpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odWEgPSBuYXZpZ2F0b3IudXNlckFnZW50KSB7XG4gICAgcmV0dXJuIC9BbmRyb2lkL2kudGVzdCh1YSk7XG59XG4iLCJpbXBvcnQgYW5kcm9pZCBmcm9tICcuL2FuZHJvaWQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhbmRyb2lkVmVyc2lvbih1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQpIHtcbiAgICBpZiAoIWFuZHJvaWQodWEpKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBjb25zdCB2ZXJzaW9uID0gdWEubWF0Y2goL0FuZHJvaWQgKFxcZCsoPzpcXC5cXGQrKSspOy8pWzFdO1xuICAgIGNvbnN0IFthLCBiXSA9IHZlcnNpb24uc3BsaXQoJy4nKTtcbiAgICByZXR1cm4gcGFyc2VGbG9hdChgJHthfS4ke2J9YCk7XG59XG4iLCJpbXBvcnQgYW5kcm9pZCBmcm9tICcuL2FuZHJvaWQnO1xuaW1wb3J0IGFuZHJvaWRWZXJzaW9uIGZyb20gJy4vYW5kcm9pZFZlcnNpb24nO1xuaW1wb3J0IGlvcyBmcm9tICcuL2lvcyc7XG5pbXBvcnQgaW9zVmVyc2lvbiBmcm9tICcuL2lvc1ZlcnNpb24nO1xuaW1wb3J0IGxpbnV4IGZyb20gJy4vbGludXgnO1xuaW1wb3J0IG1hYyBmcm9tICcuL21hYyc7XG5pbXBvcnQgd2luZG93cyBmcm9tICcuL3dpbmRvd3MnO1xuaW1wb3J0IHdpbmRvd3NQaG9uZSBmcm9tICcuL3dpbmRvd3NQaG9uZSc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBhbmRyb2lkLFxuICAgIGFuZHJvaWRWZXJzaW9uLFxuICAgIGlvcyxcbiAgICBpb3NWZXJzaW9uLFxuICAgIGxpbnV4LFxuICAgIG1hYyxcbiAgICB3aW5kb3dzLFxuICAgIHdpbmRvd3NQaG9uZVxufTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlvcyh1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQpIHtcbiAgICByZXR1cm4gL2lQW2FvXWR8aVBob25lL2kudGVzdCh1YSk7XG59XG4iLCJpbXBvcnQgaW9zIGZyb20gJy4vaW9zJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW9zVmVyc2lvbih1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQpIHtcbiAgICBpZiAoaW9zKHVhKSkge1xuICAgICAgICBjb25zdCBbLCBiLCBjXSA9IHVhLm1hdGNoKC9PUyAoXFxkKylfKFxcZCspL2kpO1xuICAgICAgICBpZiAoYiAmJiBjKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChgJHtifS4ke2N9YCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIDA7XG59XG4iLCJpbXBvcnQgYW5kcm9pZCBmcm9tICcuL2FuZHJvaWQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsaW51eCh1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQpIHtcbiAgICByZXR1cm4gIWFuZHJvaWQodWEpICYmIC9MaW51eC8udGVzdCh1YSk7XG59XG4iLCJpbXBvcnQgaW9zIGZyb20gJy4vaW9zJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFjKHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudCkge1xuICAgIHJldHVybiAhaW9zKHVhKSAmJiAvTWFjIE9TLy50ZXN0KHVhKTtcbn1cbiIsImltcG9ydCB3aW5kb3dzUGhvbmUgZnJvbSAnLi93aW5kb3dzUGhvbmUnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB3aW5kb3dzKHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudCkge1xuICAgIHJldHVybiAhd2luZG93c1Bob25lKHVhKSAmJiAvV2luZG93cy8udGVzdCh1YSk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB3aW5kb3dzUGhvbmUodWEgPSBuYXZpZ2F0b3IudXNlckFnZW50KSB7XG4gICAgcmV0dXJuIC9XaW5kb3dzIFBob25lL2kudGVzdCh1YSk7XG59XG4iLCIvLyBzY3JlZW4ud2lkdGggLyBzY3JlZW4uaGVpZ2h0IGlzIG9mdGVuIHdyb25nIGluIEFuZHJvaWRcbmNvbnN0IGhlaWdodCA9ICgpID0+IE1hdGgubWF4KHdpbmRvdy5vdXRlckhlaWdodCwgd2luZG93LnNjcmVlbi5oZWlnaHQpO1xuY29uc3Qgd2lkdGggPSAoKSA9PiBNYXRoLm1heCh3aW5kb3cub3V0ZXJXaWR0aCwgd2luZG93LnNjcmVlbi53aWR0aCk7XG5jb25zdCBkcHIgPSAoKSA9PiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxO1xuY29uc3QgcmV0aW5hID0gKCkgPT4gZHByKCkgPiAxO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgd2lkdGgsXG4gICAgaGVpZ2h0LFxuICAgIGRwcixcbiAgICByZXRpbmFcbn07XG4iLCJleHBvcnQgZGVmYXVsdCAoKSA9PiAhIXdpbmRvdy5EZXZpY2VPcmllbnRhdGlvbkV2ZW50O1xuIiwiaW1wb3J0IHdlYmdsIGZyb20gJy4vd2ViZ2wnO1xuaW1wb3J0IHdlYm0gZnJvbSAnLi93ZWJtJztcbmltcG9ydCBtcDQgZnJvbSAnLi9tcDQnO1xuaW1wb3J0IGRldmljZU9yaWVudGF0aW9uIGZyb20gJy4vZGV2aWNlT3JpZW50YXRpb24nO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgd2ViZ2wsXG4gICAgd2VibSxcbiAgICBtcDQsXG4gICAgZGV2aWNlT3JpZW50YXRpb25cbn07XG4iLCJjb25zdCB2aWRlb0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcbmV4cG9ydCBkZWZhdWx0ICgpID0+ICEhKHZpZGVvRWwuY2FuUGxheVR5cGUgJiYgdmlkZW9FbC5jYW5QbGF5VHlwZSgndmlkZW8vbXA0OyBjb2RlY3M9XCJhdmMxLjQyRTAxRSwgbXA0YS40MC4yXCInKSk7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB3ZWJnbCgpIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgY29uc3QgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCd3ZWJnbCcpIHx8IGNhbnZhcy5nZXRDb250ZXh0KCdleHBlcmltZW50YWwtd2ViZ2wnKTtcbiAgICAgICAgcmV0dXJuICEhKHdpbmRvdy5XZWJHTFJlbmRlcmluZ0NvbnRleHQgJiYgY29udGV4dCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuIiwiY29uc3QgdmlkZW9FbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG5leHBvcnQgZGVmYXVsdCAoKSA9PiAhISh2aWRlb0VsLmNhblBsYXlUeXBlICYmIHZpZGVvRWwuY2FuUGxheVR5cGUoJ3ZpZGVvL3dlYm07IGNvZGVjcz1cInZwOCwgdm9yYmlzXCInKSk7XG4iLCIvKlxuICogY2xhc3NMaXN0IChwYXJ0aWFsIHBvbHlmaWxsIGZvciBJRSAxMCwgSUUgMTEgYW5kIEZpcmVmb3ggPDI0KVxuICogYWRhcHRlZCBmcm9tOiBodHRwczovL2dpdGh1Yi5jb20vZWxpZ3JleS9jbGFzc0xpc3QuanMvYmxvYi9tYXN0ZXIvY2xhc3NMaXN0LmpzXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgbGV0IHRlc3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnXycpO1xuXG4gICAgdGVzdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYzEnLCAnYzInKTtcblxuICAgIC8vIFBvbHlmaWxsIGZvciBJRSAxMC8xMSBhbmQgRmlyZWZveCA8MjYsIHdoZXJlIGNsYXNzTGlzdC5hZGQgYW5kXG4gICAgLy8gY2xhc3NMaXN0LnJlbW92ZSBleGlzdCBidXQgc3VwcG9ydCBvbmx5IG9uZSBhcmd1bWVudCBhdCBhIHRpbWUuXG4gICAgaWYgKCF0ZXN0RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2MyJykpIHtcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlTWV0aG9kKG1ldGhvZCkge1xuICAgICAgICAgICAgY29uc3Qgb3JpZ2luYWwgPSB3aW5kb3cuRE9NVG9rZW5MaXN0LnByb3RvdHlwZVttZXRob2RdO1xuXG4gICAgICAgICAgICB3aW5kb3cuRE9NVG9rZW5MaXN0LnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odG9rZW4pIHtcbiAgICAgICAgICAgICAgICBsZXQgaTtcbiAgICAgICAgICAgICAgICBjb25zdCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbC5jYWxsKHRoaXMsIHRva2VuKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGNyZWF0ZU1ldGhvZCgnYWRkJyk7XG4gICAgICAgIGNyZWF0ZU1ldGhvZCgncmVtb3ZlJyk7XG4gICAgfVxuXG4gICAgdGVzdEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnYzMnLCBmYWxzZSk7XG5cbiAgICAvLyBQb2x5ZmlsbCBmb3IgSUUgMTAsIElFIDExIGFuZCBGaXJlZm94IDwyNCwgd2hlcmUgY2xhc3NMaXN0LnRvZ2dsZSBkb2VzIG5vdFxuICAgIC8vIHN1cHBvcnQgdGhlIHNlY29uZCBhcmd1bWVudC5cbiAgICBpZiAodGVzdEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjMycpKSB7XG4gICAgICAgIGNvbnN0IHRvZ2dsZSA9IHdpbmRvdy5ET01Ub2tlbkxpc3QucHJvdG90eXBlLnRvZ2dsZTtcblxuICAgICAgICB3aW5kb3cuRE9NVG9rZW5MaXN0LnByb3RvdHlwZS50b2dnbGUgPSBmdW5jdGlvbih0b2tlbiwgZm9yY2UpIHtcbiAgICAgICAgICAgIGZvcmNlID0gISFmb3JjZTtcbiAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSAmJiB0aGlzLmNvbnRhaW5zKHRva2VuKSA9PT0gZm9yY2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9yY2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0b2dnbGUuY2FsbCh0aGlzLCB0b2tlbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdGVzdEVsZW1lbnQgPSBudWxsO1xufSgpKTtcbiIsIihmdW5jdGlvbihmbikge1xuICAgIHdpbmRvdy5jb25zb2xlID0gd2luZG93LmNvbnNvbGUgfHwge307XG4gICAgY29uc3QgbWV0aG9kcyA9IFtcbiAgICAgICAgJ2Fzc2VydCcsXG4gICAgICAgICdjbGVhcicsXG4gICAgICAgICdjb3VudCcsXG4gICAgICAgICdkZWJ1ZycsXG4gICAgICAgICdkaXInLFxuICAgICAgICAnZGlyeG1sJyxcbiAgICAgICAgJ2Vycm9yJyxcbiAgICAgICAgJ2dyb3VwJyxcbiAgICAgICAgJ2dyb3VwQ29sbGFwc2VkJyxcbiAgICAgICAgJ2dyb3VwRW5kJyxcbiAgICAgICAgJ2luZm8nLFxuICAgICAgICAnbG9nJyxcbiAgICAgICAgJ21hcmtUaW1lbGluZScsXG4gICAgICAgICdtZW1vcnknLFxuICAgICAgICAncHJvZmlsZScsXG4gICAgICAgICdwcm9maWxlRW5kJyxcbiAgICAgICAgJ3RhYmxlJyxcbiAgICAgICAgJ3RpbWUnLFxuICAgICAgICAndGltZUVuZCcsXG4gICAgICAgICd0aW1lU3RhbXAnLFxuICAgICAgICAndGltZWxpbmUnLFxuICAgICAgICAndGltZWxpbmVFbmQnLFxuICAgICAgICAndHJhY2UnLFxuICAgICAgICAnd2FybidcbiAgICBdO1xuICAgIG1ldGhvZHMuZm9yRWFjaCgobmFtZSkgPT4ge1xuICAgICAgICB3aW5kb3cuY29uc29sZVtuYW1lXSA9IHdpbmRvdy5jb25zb2xlW25hbWVdIHx8IGZuO1xuICAgIH0pO1xufShmdW5jdGlvbigpIHt9KSk7XG4iLCJpbXBvcnQgJy4vY2xhc3NMaXN0JztcbmltcG9ydCAnLi9jb25zb2xlJztcbmltcG9ydCAnLi9yZXF1ZXN0QW5pbWF0aW9uRnJhbWUnO1xuIiwiLypcbiAqIHJlcXVlc3RBbmltYXRpb25GcmFtZSAoaW9zNiBhbmQgYW5kcm9pZCA8IDQuNClcbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgaWYgKCF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKSB7XG4gICAgICAgIGNvbnN0IHZlbmRvcnMgPSBbJ21zJywgJ21veicsICd3ZWJraXQnLCAnbyddO1xuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHZlbmRvcnMubGVuZ3RoICYmICF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lOyArK3gpIHtcbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3dbdmVuZG9yc1t4XSArICdSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXTtcbiAgICAgICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9IHdpbmRvd1t2ZW5kb3JzW3hdICsgJ0NhbmNlbEFuaW1hdGlvbkZyYW1lJ10gfHwgd2luZG93W3ZlbmRvcnNbeF0gK1xuICAgICAgICAgICAgICAgICdDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXTtcbiAgICAgICAgfVxuICAgIH1cbn0oKSk7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwb3B1cCh1cmwsIHdpZHRoID0gODAwLCBoZWlnaHQgPSA2MDAsIG5hbWUgPSAnJykge1xuICAgIGNvbnN0IGxlZnQgPSAod2luZG93LnNjcmVlbi53aWR0aCAtIHdpZHRoKSAvIDI7XG4gICAgY29uc3QgdG9wID0gKHdpbmRvdy5zY3JlZW4uaGVpZ2h0IC0gaGVpZ2h0KSAvIDI7XG4gICAgLy8gY29uc3QgbGVmdCA9ICh3aW5kb3cuc2NyZWVuLmF2YWlsV2lkdGggLSB3aWR0aCkgLyAyO1xuICAgIC8vIGNvbnN0IHRvcCA9ICh3aW5kb3cuc2NyZWVuLmF2YWlsSGVpZ2h0IC0gaGVpZ2h0KSAvIDI7XG4gICAgY29uc3QgZGVmYXVsdHMgPSAnZGlyZWN0b3JpZXM9bm8sbG9jYXRpb249bm8sbWVudWJhcj1ubyxyZXNpemFibGU9bm8sc2Nyb2xsYmFycz1ubyxzdGF0dXM9bm8sdG9vbGJhcj1ubyc7XG4gICAgY29uc3QgcGFyYW1zID0gYHdpZHRoPSR7d2lkdGh9LGhlaWdodD0ke2hlaWdodH0sdG9wPSR7dG9wfSxsZWZ0PSR7bGVmdH0sJHtkZWZhdWx0c31gO1xuICAgIGNvbnN0IHdpbiA9IHdpbmRvdy5vcGVuKHVybCwgbmFtZSwgcGFyYW1zKTtcbiAgICBpZiAod2luID09PSBudWxsIHx8IHR5cGVvZiB3aW4gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHdpbmRvdy5mb2N1cykge1xuICAgICAgICB3aW4uZm9jdXMoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG4iLCJcbmNsYXNzIE5vZGUge1xuICAgIGNvbnN0cnVjdG9yKGJvdW5kcywgZGVwdGgsIG1heERlcHRoLCBtYXhDaGlsZHJlbikge1xuICAgICAgICB0aGlzLl9ib3VuZHMgPSBib3VuZHM7XG4gICAgICAgIHRoaXMuX2RlcHRoID0gZGVwdGg7XG4gICAgICAgIHRoaXMuX21heERlcHRoID0gbWF4RGVwdGg7XG4gICAgICAgIHRoaXMuX21heENoaWxkcmVuID0gbWF4Q2hpbGRyZW47XG5cbiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IFtdO1xuICAgICAgICB0aGlzLm5vZGVzID0gW107XG4gICAgfVxuXG4gICAgaW5zZXJ0KGl0ZW0pIHtcbiAgICAgICAgaWYgKHRoaXMubm9kZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuX2ZpbmRJbmRleChpdGVtKTtcbiAgICAgICAgICAgIHRoaXMubm9kZXNbaW5kZXhdLmluc2VydChpdGVtKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2hpbGRyZW4ucHVzaChpdGVtKTtcblxuICAgICAgICBpZiAoISh0aGlzLl9kZXB0aCA+PSB0aGlzLl9tYXhEZXB0aCkgJiYgdGhpcy5jaGlsZHJlbi5sZW5ndGggPiB0aGlzLl9tYXhDaGlsZHJlbikge1xuXG4gICAgICAgICAgICB0aGlzLnN1YmRpdmlkZSgpO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluc2VydCh0aGlzLmNoaWxkcmVuW2ldKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5sZW5ndGggPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0cmlldmUoaXRlbSkge1xuICAgICAgICBpZiAodGhpcy5ub2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fZmluZEluZGV4KGl0ZW0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubm9kZXNbaW5kZXhdLnJldHJpZXZlKGl0ZW0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW47XG4gICAgfVxuXG4gICAgX2ZpbmRJbmRleChpdGVtKSB7XG4gICAgICAgIGNvbnN0IHt4LCB5LCB3aWR0aCwgaGVpZ2h0fSA9IHRoaXMuX2JvdW5kcztcblxuICAgICAgICBjb25zdCByaWdodCA9IGl0ZW0ueCA+IHggKyB3aWR0aCAvIDI7XG4gICAgICAgIGNvbnN0IGJvdHRvbSA9IGl0ZW0ueSA+IHkgKyBoZWlnaHQgLyAyO1xuXG4gICAgICAgIGxldCBpbmRleDtcblxuICAgICAgICBpZiAocmlnaHQpIHtcbiAgICAgICAgICAgIGluZGV4ID0gYm90dG9tID8gTm9kZS5CUiA6IE5vZGUuVFI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpbmRleCA9IGJvdHRvbSA/IE5vZGUuQkwgOiBOb2RlLlRMO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cblxuICAgIHN1YmRpdmlkZSgpIHtcbiAgICAgICAgY29uc3QgZGVwdGggPSB0aGlzLl9kZXB0aCArIDE7XG5cbiAgICAgICAgY29uc3Qge3gsIHksIHdpZHRoLCBoZWlnaHR9ID0gdGhpcy5fYm91bmRzO1xuICAgICAgICBjb25zdCB3ID0gd2lkdGggLyAyO1xuICAgICAgICBjb25zdCBoID0gaGVpZ2h0IC8gMjtcblxuICAgICAgICB0aGlzLm5vZGVzW05vZGUuVExdID0gbmV3IE5vZGUoe1xuICAgICAgICAgICAgeCxcbiAgICAgICAgICAgIHksXG4gICAgICAgICAgICB3aWR0aDogdyxcbiAgICAgICAgICAgIGhlaWdodDogaFxuICAgICAgICB9LFxuICAgICAgICBkZXB0aCwgdGhpcy5fbWF4RGVwdGgsIHRoaXMuX21heENoaWxkcmVuKTtcblxuICAgICAgICB0aGlzLm5vZGVzW05vZGUuVFJdID0gbmV3IE5vZGUoe1xuICAgICAgICAgICAgeDogeCArIHcsXG4gICAgICAgICAgICB5LFxuICAgICAgICAgICAgd2lkdGg6IHcsXG4gICAgICAgICAgICBoZWlnaHQ6IGhcbiAgICAgICAgfSxcbiAgICAgICAgZGVwdGgsIHRoaXMuX21heERlcHRoLCB0aGlzLl9tYXhDaGlsZHJlbik7XG5cbiAgICAgICAgdGhpcy5ub2Rlc1tOb2RlLkJMXSA9IG5ldyBOb2RlKHtcbiAgICAgICAgICAgIHgsXG4gICAgICAgICAgICB5OiB5ICsgaCxcbiAgICAgICAgICAgIHdpZHRoOiB3LFxuICAgICAgICAgICAgaGVpZ2h0OiBoXG4gICAgICAgIH0sXG4gICAgICAgIGRlcHRoLCB0aGlzLl9tYXhEZXB0aCwgdGhpcy5fbWF4Q2hpbGRyZW4pO1xuXG4gICAgICAgIHRoaXMubm9kZXNbTm9kZS5CUl0gPSBuZXcgTm9kZSh7XG4gICAgICAgICAgICB4OiB4ICsgdyxcbiAgICAgICAgICAgIHk6IHkgKyBoLFxuICAgICAgICAgICAgd2lkdGg6IHcsXG4gICAgICAgICAgICBoZWlnaHQ6IGhcbiAgICAgICAgfSxcbiAgICAgICAgZGVwdGgsIHRoaXMuX21heERlcHRoLCB0aGlzLl9tYXhDaGlsZHJlbik7XG4gICAgfVxuXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4ubGVuZ3RoID0gMDtcblxuICAgICAgICB3aGlsZSAodGhpcy5ub2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMubm9kZXMucG9wKCkuY2xlYXIoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuTm9kZS5UTCA9IDA7XG5Ob2RlLlRSID0gMTtcbk5vZGUuQkwgPSAyO1xuTm9kZS5CUiA9IDM7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFF1YWRUcmVlIHtcbiAgICBjb25zdHJ1Y3Rvcihib3VuZHMsIG1heERlcHRoID0gLTEsIG1heENoaWxkcmVuID0gLTEpIHtcbiAgICAgICAgdGhpcy5yb290ID0gbmV3IE5vZGUoYm91bmRzLCAwLCBtYXhEZXB0aCwgbWF4Q2hpbGRyZW4pO1xuICAgIH1cblxuICAgIGluc2VydChpdGVtKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW0pKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb3QuaW5zZXJ0KGl0ZW1baV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yb290Lmluc2VydChpdGVtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLnJvb3QuY2xlYXIoKTtcbiAgICB9XG5cbiAgICByZXRyaWV2ZShpdGVtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJvb3QucmV0cmlldmUoaXRlbSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHBvcHVwIGZyb20gJy4uL3BvcHVwJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZW1haWwodXJsLCBzdWJqZWN0ID0gJycsIGJvZHkgPSAnJykge1xuICAgIHVybCA9IGVuY29kZVVSSUNvbXBvbmVudCh1cmwpO1xuICAgIHN1YmplY3QgPSBlbmNvZGVVUklDb21wb25lbnQoc3ViamVjdCk7XG5cbiAgICBjb25zdCBuZXdsaW5lcyA9IGVuY29kZVVSSUNvbXBvbmVudCgnXFxyXFxuXFxyXFxuJyk7XG4gICAgYm9keSA9IGJvZHkgPyBgJHtlbmNvZGVVUklDb21wb25lbnQoYm9keSl9JHtuZXdsaW5lc31gIDogJyc7XG5cbiAgICByZXR1cm4gcG9wdXAoYG1haWx0bzo/c3ViamVjdD0ke3N1YmplY3R9JmJvZHk9JHtib2R5fSR7dXJsfWApO1xufVxuIiwiaW1wb3J0IHBvcHVwIGZyb20gJy4uL3BvcHVwJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZmFjZWJvb2sodXJsKSB7XG4gICAgdXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KHVybCk7XG4gICAgcmV0dXJuIHBvcHVwKGBodHRwczovL3d3dy5mYWNlYm9vay5jb20vc2hhcmVyL3NoYXJlci5waHA/dT0ke3VybH1gKTtcbn1cbiIsImltcG9ydCBwb3B1cCBmcm9tICcuLi9wb3B1cCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZhY2Vib29rRmVlZERpYWxvZyhhcHBJZCwgcmVkaXJlY3QsIHVybCwgdGl0bGUgPSAnJywgaW1hZ2UgPSAnJywgY2FwdGlvbiA9ICcnLCBkZXNjID0gJycsIHNvdXJjZSA9ICcnKSB7XG4gICAgdGl0bGUgPSBlbmNvZGVVUklDb21wb25lbnQodGl0bGUpO1xuICAgIGNhcHRpb24gPSBlbmNvZGVVUklDb21wb25lbnQoY2FwdGlvbik7XG4gICAgZGVzYyA9IGVuY29kZVVSSUNvbXBvbmVudChkZXNjKTtcblxuICAgIGNvbnN0IHBhcmFtcyA9IGA/ZGlzcGxheT1wb3B1cCZzaG93X2Vycm9yPXRydWUmYXBwX2lkPSR7YXBwSWR9JnNvdXJjZT0ke3NvdXJjZX0mcmVkaXJlY3RfdXJpPSR7cmVkaXJlY3R9YDtcbiAgICBjb25zdCBjb250ZW50ID0gYG5hbWU9JHt0aXRsZX0mbGluaz0ke3VybH0mY2FwdGlvbj0ke2NhcHRpb259JmRlc2NyaXB0aW9uPSR7ZGVzY30mcGljdHVyZT0ke2ltYWdlfWA7XG5cbiAgICByZXR1cm4gcG9wdXAoYGh0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS9kaWFsb2cvZmVlZD8ke3BhcmFtc30mJHtjb250ZW50fWApO1xufVxuIiwiaW1wb3J0IHBvcHVwIGZyb20gJy4uL3BvcHVwJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ29vZ2xlcGx1cyh1cmwpIHtcbiAgICB1cmwgPSBlbmNvZGVVUklDb21wb25lbnQodXJsKTtcbiAgICByZXR1cm4gcG9wdXAoYGh0dHBzOi8vcGx1cy5nb29nbGUuY29tL3NoYXJlP3VybD0ke3VybH1gKTtcbn1cbiIsImltcG9ydCBlbWFpbCBmcm9tICcuL2VtYWlsJztcbmltcG9ydCBmYWNlYm9vayBmcm9tICcuL2ZhY2Vib29rJztcbmltcG9ydCBmYWNlYm9va0ZlZWREaWFsb2cgZnJvbSAnLi9mYWNlYm9va0ZlZWREaWFsb2cnO1xuaW1wb3J0IGdvb2dsZXBsdXMgZnJvbSAnLi9nb29nbGVwbHVzJztcbmltcG9ydCBsaW5rZWRpbiBmcm9tICcuL2xpbmtlZGluJztcbmltcG9ydCBwaW50ZXJlc3QgZnJvbSAnLi9waW50ZXJlc3QnO1xuaW1wb3J0IHJlZGRpdCBmcm9tICcuL3JlZGRpdCc7XG5pbXBvcnQgcmVucmVuIGZyb20gJy4vcmVucmVuJztcbmltcG9ydCBzbXMgZnJvbSAnLi9zbXMnO1xuaW1wb3J0IHR3aXR0ZXIgZnJvbSAnLi90d2l0dGVyJztcbmltcG9ydCB2a29udGFrdGUgZnJvbSAnLi92a29udGFrdGUnO1xuaW1wb3J0IHdlaWJvIGZyb20gJy4vd2VpYm8nO1xuaW1wb3J0IHdoYXRzYXBwIGZyb20gJy4vd2hhdHNhcHAnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZW1haWwsXG4gICAgZmFjZWJvb2ssXG4gICAgZmFjZWJvb2tGZWVkRGlhbG9nLFxuICAgIGdvb2dsZXBsdXMsXG4gICAgbGlua2VkaW4sXG4gICAgcGludGVyZXN0LFxuICAgIHJlZGRpdCxcbiAgICByZW5yZW4sXG4gICAgc21zLFxuICAgIHR3aXR0ZXIsXG4gICAgdmtvbnRha3RlLFxuICAgIHdlaWJvLFxuICAgIHdoYXRzYXBwXG59O1xuIiwiaW1wb3J0IHBvcHVwIGZyb20gJy4uL3BvcHVwJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbGlua2VkaW4odXJsLCB0aXRsZSA9ICcnKSB7XG4gICAgdXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KHVybCk7XG4gICAgdGl0bGUgPSBlbmNvZGVVUklDb21wb25lbnQodGl0bGUpO1xuICAgIHJldHVybiBwb3B1cChgaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3NoYXJlQXJ0aWNsZT9taW5pPXRydWUmdXJsPSR7dXJsfSZ0aXRsZT0ke3RpdGxlfWApO1xufVxuIiwiaW1wb3J0IHBvcHVwIGZyb20gJy4uL3BvcHVwJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGludGVyZXN0KHVybCwgbWVkaWEsIGRlc2MgPSAnJykge1xuICAgIHVybCA9IGVuY29kZVVSSUNvbXBvbmVudCh1cmwpO1xuICAgIG1lZGlhID0gZW5jb2RlVVJJQ29tcG9uZW50KG1lZGlhKTtcbiAgICBkZXNjID0gZW5jb2RlVVJJQ29tcG9uZW50KGRlc2MpO1xuICAgIHJldHVybiBwb3B1cChgaHR0cHM6Ly9waW50ZXJlc3QuY29tL3Bpbi9jcmVhdGUvYnV0dG9uLz91cmw9JHt1cmx9Jm1lZGlhPSR7bWVkaWF9JmRlc2NyaXB0aW9uPSR7ZGVzY31gKTtcbn1cbiIsImltcG9ydCBwb3B1cCBmcm9tICcuLi9wb3B1cCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlZGRpdCh1cmwsIHRpdGxlID0gJycpIHtcbiAgICB1cmwgPSBlbmNvZGVVUklDb21wb25lbnQodXJsKTtcbiAgICB0aXRsZSA9IGVuY29kZVVSSUNvbXBvbmVudCh0aXRsZSk7XG4gICAgcmV0dXJuIHBvcHVwKGBodHRwczovL3d3dy5yZWRkaXQuY29tL3N1Ym1pdD91cmw9JHt1cmx9JnRpdGxlPSR7dGl0bGV9YCk7XG59XG4iLCJpbXBvcnQgcG9wdXAgZnJvbSAnLi4vcG9wdXAnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB2a29udGFrdGUodXJsLCB0aXRsZSA9ICcnKSB7XG4gICAgdXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KHVybCk7XG4gICAgdGl0bGUgPSBlbmNvZGVVUklDb21wb25lbnQodGl0bGUpO1xuICAgIHJldHVybiBwb3B1cChgaHR0cDovL3NoYXJlLnJlbnJlbi5jb20vc2hhcmUvYnV0dG9uc2hhcmUuZG8/bGluaz0ke3VybH0mdGl0bGU9JHt0aXRsZX1gKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNtcyh1cmwsIGJvZHkgPSAnJykge1xuICAgIHVybCA9IGVuY29kZVVSSUNvbXBvbmVudCh1cmwpO1xuXG4gICAgY29uc3QgbmV3bGluZXMgPSBlbmNvZGVVUklDb21wb25lbnQoJ1xcclxcblxcclxcbicpO1xuICAgIGJvZHkgPSBib2R5ID8gYCR7ZW5jb2RlVVJJQ29tcG9uZW50KGJvZHkpfSR7bmV3bGluZXN9YCA6ICcnO1xuXG4gICAgY29uc3QgaW9zID0gL2lQW2FvXWR8aVBob25lL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICBjb25zdCBkZWxpbSA9IGlvcyA/ICcmJyA6ICc/JztcblxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYHNtczoke2RlbGltfWJvZHk9JHtib2R5fSR7dXJsfWA7XG59XG4iLCJpbXBvcnQgcG9wdXAgZnJvbSAnLi4vcG9wdXAnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0d2l0dGVyKHVybCwgdGV4dCA9ICcnLCBoYXNodGFncyA9ICcnLCByZWxhdGVkID0gJycpIHtcbiAgICB1cmwgPSBlbmNvZGVVUklDb21wb25lbnQodXJsKTtcbiAgICB0ZXh0ID0gZW5jb2RlVVJJQ29tcG9uZW50KHRleHQpO1xuICAgIGhhc2h0YWdzID0gZW5jb2RlVVJJQ29tcG9uZW50KGhhc2h0YWdzKTtcbiAgICByZWxhdGVkID0gZW5jb2RlVVJJQ29tcG9uZW50KHJlbGF0ZWQpO1xuXG4gICAgcmV0dXJuIHBvcHVwKGBodHRwczovL3R3aXR0ZXIuY29tL2ludGVudC90d2VldD91cmw9JHt1cmx9JnRleHQ9JHt0ZXh0fSZoYXNodGFncz0ke2hhc2h0YWdzfSZyZWxhdGVkPSR7cmVsYXRlZH1gKTtcbn1cbiIsImltcG9ydCBwb3B1cCBmcm9tICcuLi9wb3B1cCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHZrb250YWt0ZSh1cmwsIHRpdGxlID0gJycsIGRlc2NyaXB0aW9uID0gJycsIGltYWdlID0gJycpIHtcbiAgICB1cmwgPSBlbmNvZGVVUklDb21wb25lbnQodXJsKTtcbiAgICB0aXRsZSA9IGVuY29kZVVSSUNvbXBvbmVudCh0aXRsZSk7XG4gICAgZGVzY3JpcHRpb24gPSBlbmNvZGVVUklDb21wb25lbnQoZGVzY3JpcHRpb24pO1xuICAgIGltYWdlID0gZW5jb2RlVVJJQ29tcG9uZW50KGltYWdlKTtcbiAgICByZXR1cm4gcG9wdXAoYGh0dHA6Ly92a29udGFrdGUucnUvc2hhcmUucGhwP3VybD0ke3VybH0mdGl0bGU9JHt0aXRsZX0mZGVzY3JpcHRpb249JHtkZXNjcmlwdGlvbn0maW1hZ2U9JHtpbWFnZX1gKTtcbn1cbiIsImltcG9ydCBwb3B1cCBmcm9tICcuLi9wb3B1cCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdlaWJvKHVybCwgdGl0bGUgPSAnJywgaW1hZ2UgPSAnJykge1xuICAgIHVybCA9IGVuY29kZVVSSUNvbXBvbmVudCh1cmwpO1xuICAgIHRpdGxlID0gZW5jb2RlVVJJQ29tcG9uZW50KHRpdGxlKTtcbiAgICBpbWFnZSA9IGVuY29kZVVSSUNvbXBvbmVudChpbWFnZSk7XG5cbiAgICBjb25zdCBwYXJhbXMgPSBgdXJsPSR7dXJsfSZhcHBrZXk9JnRpdGxlPSR7dGl0bGV9JnBpYz0ke2ltYWdlfSZyYWxhdGVVaWQ9Jmxhbmd1YWdlPXpoX2NuYDtcbiAgICByZXR1cm4gcG9wdXAoYGh0dHA6Ly9zZXJ2aWNlLndlaWJvLmNvbS9zaGFyZS9zaGFyZS5waHA/JHtwYXJhbXN9YCk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB3aGF0c2FwcCh1cmwsIGJvZHkgPSAnJykge1xuICAgIHVybCA9IGVuY29kZVVSSUNvbXBvbmVudCh1cmwpO1xuXG4gICAgY29uc3QgbmV3bGluZXMgPSBlbmNvZGVVUklDb21wb25lbnQoJ1xcclxcblxcclxcbicpO1xuICAgIGJvZHkgPSBib2R5ID8gYCR7ZW5jb2RlVVJJQ29tcG9uZW50KGJvZHkpfSR7bmV3bGluZXN9YCA6ICcnO1xuXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgd2hhdHNhcHA6Ly9zZW5kP3RleHQ9JHtib2R5fSR7dXJsfWA7XG59XG4iLCJmdW5jdGlvbiBsb2FkKGtleSkge1xuICAgIGxldCBpdGVtID0gbnVsbDtcblxuICAgIHRyeSB7XG4gICAgICAgIGl0ZW0gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICAgIH0gY2F0Y2ggKGVycikge31cblxuICAgIHJldHVybiBpdGVtO1xufVxuXG5mdW5jdGlvbiBzYXZlKGtleSwgaXRlbSkge1xuICAgIHRyeSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgaXRlbSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdDb3VsZG5cXCd0IHNhdmUgaW4gbG9jYWxTdG9yYWdlJyk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gbG9hZEpTT04oa2V5KSB7XG4gICAgY29uc3QgaXRlbSA9IGxvYWQoa2V5KTtcbiAgICByZXR1cm4gaXRlbSA/IEpTT04ucGFyc2UoaXRlbSkgOiBudWxsO1xufVxuXG5mdW5jdGlvbiBzYXZlSlNPTihrZXksIGl0ZW0pIHtcbiAgICByZXR1cm4gc2F2ZShrZXksIEpTT04uc3RyaW5naWZ5KGl0ZW0pKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlKGtleSkge1xuICAgIHRyeSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCB7bG9hZCwgc2F2ZSwgbG9hZEpTT04sIHNhdmVKU09OLCByZW1vdmV9O1xuIiwiLy8gZXZlcnl0aGluZyBhZnRlciB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiBzdWJzdHIgaW4gc3RyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhZnRlckZpcnN0KHN0ciwgc3Vic3RyKSB7XG4gICAgbGV0IGluZGV4ID0gc3RyLmluZGV4T2Yoc3Vic3RyKTtcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgaW5kZXggKz0gc3Vic3RyLmxlbmd0aDtcbiAgICByZXR1cm4gc3RyLnNsaWNlKGluZGV4KTtcbn1cbiIsIi8vIGV2ZXJ5dGhpbmcgYWZ0ZXIgdGhlIGxhc3Qgb2NjdXJlbmNlIG9mIHN1YnN0ciBpbiBzdHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFmdGVyTGFzdChzdHIsIHN1YnN0cikge1xuICAgIGxldCBpbmRleCA9IHN0ci5sYXN0SW5kZXhPZihzdWJzdHIpO1xuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBpbmRleCArPSBzdWJzdHIubGVuZ3RoO1xuICAgIHJldHVybiBzdHIuc2xpY2UoaW5kZXgpO1xufVxuIiwiLy8gZXZlcnl0aGluZyBiZWZvcmUgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2Ygc3Vic3RyIGluIHN0clxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmVmb3JlRmlyc3Qoc3RyLCBzdWJzdHIpIHtcbiAgICBjb25zdCBpbmRleCA9IHN0ci5pbmRleE9mKHN1YnN0cik7XG4gICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHJldHVybiBzdHIuc2xpY2UoMCwgaW5kZXgpO1xufVxuIiwiLy8gZXZlcnl0aGluZyBiZWZvcmUgdGhlIGxhc3Qgb2NjdXJyZW5jZSBvZiBzdWJzdHIgaW4gdGhlIHN0cmluZy5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJlZm9yZUxhc3Qoc3RyLCBzdWJzdHIpIHtcbiAgICBjb25zdCBpbmRleCA9IHN0ci5sYXN0SW5kZXhPZihzdWJzdHIpO1xuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICByZXR1cm4gc3RyLnNsaWNlKDAsIGluZGV4KTtcbn1cbiIsIi8vIHdoZXRoZXIgc3RyIGJlZ2lucyB3aXRoIHN1YnN0clxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmVnaW5zV2l0aChzdHIsIHN1YnN0cikge1xuICAgIHJldHVybiBzdHIuaW5kZXhPZihzdWJzdHIpID09PSAwO1xufVxuIiwiLy8gZXZlcnl0aGluZyBhZnRlciB0aGUgZmlyc3Qgb2NjdXJhbmNlIG9mIHN0YXJ0IGFuZCBiZWZvcmUgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgZW5kXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBiZXR3ZWVuKHN0ciwgc3RhcnQsIGVuZCkge1xuICAgIGxldCBzdWJzdHIgPSAnJztcbiAgICBsZXQgc3RhcnRJbmRleCA9IHN0ci5pbmRleE9mKHN0YXJ0KTtcbiAgICBpZiAoc3RhcnRJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgc3RhcnRJbmRleCArPSBzdGFydC5sZW5ndGg7XG4gICAgICAgIGNvbnN0IGVuZEluZGV4ID0gc3RyLmluZGV4T2YoZW5kLCBzdGFydEluZGV4KTtcbiAgICAgICAgaWYgKGVuZEluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgc3Vic3RyID0gc3RyLnNsaWNlKHN0YXJ0SW5kZXgsIGVuZEluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3Vic3RyO1xufVxuIiwiaW1wb3J0IGVzY2FwZVBhdHRlcm4gZnJvbSAnLi9lc2NhcGVQYXR0ZXJuJztcbmltcG9ydCB0cnVuY2F0ZSBmcm9tICcuL3RydW5jYXRlJztcbi8vIFV0aWxpdHkgbWV0aG9kIHRoYXQgaW50ZWxsaWdlbnRseSBicmVha3MgdXAgeW91ciBzdHJpbmcsXG4vLyBhbGxvd2luZyB5b3UgdG8gY3JlYXRlIGJsb2NrcyBvZiByZWFkYWJsZSB0ZXh0LlxuLy8gVGhpcyBtZXRob2QgcmV0dXJucyB5b3UgdGhlIGNsb3Nlc3QgcG9zc2libGUgbWF0Y2ggdG8gdGhlIGRlbGltIHBhcmFtYXRlcixcbi8vIHdoaWxlIGtlZXBpbmcgdGhlIHRleHQgbGVuZ3RoIHdpdGhpbiB0aGUgbGVuIHBhcmFtdGVyLlxuLy8gSWYgYSBtYXRjaCBjYW4ndCBiZSBmb3VuZCBpbiB5b3VyIHNwZWNpZmllZCBsZW5ndGggYW4gICcuLi4nIGlzIGFkZGVkIHRvIHRoYXQgYmxvY2ssXG4vLyBhbmQgdGhlIGJsb2NraW5nIGNvbnRpbnVlcyB1bnRpbGwgYWxsIHRoZSB0ZXh0IGlzIGJyb2tlbiBhcGFydC5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJsb2NrKHN0ciwgbGVuLCBkZWxpbSA9ICcuJykge1xuICAgIGNvbnN0IGFyciA9IFtdO1xuXG4gICAgaWYgKCFzdHIgfHwgIXN0ci5pbmNsdWRlcyhkZWxpbSkpIHtcbiAgICAgICAgcmV0dXJuIGFycjtcbiAgICB9XG5cbiAgICBpZiAoZGVsaW0gPT09ICcgJykge1xuICAgICAgICBzdHIgKz0gZGVsaW07XG4gICAgfVxuXG4gICAgbGV0IGNockluZGV4ID0gMDtcbiAgICBjb25zdCByZXBsUGF0dCA9IG5ldyBSZWdFeHAoJ1teJyArIGVzY2FwZVBhdHRlcm4oZGVsaW0pICsgJ10rJCcpO1xuXG4gICAgd2hpbGUgKGNockluZGV4IDwgc3RyLmxlbmd0aCkge1xuICAgICAgICBsZXQgc3ViU3RyaW5nID0gc3RyLnN1YnN0cihjaHJJbmRleCwgbGVuKTtcbiAgICAgICAgaWYgKCFzdWJTdHJpbmcuaW5jbHVkZXMoZGVsaW0pKSB7XG4gICAgICAgICAgICBhcnIucHVzaCh0cnVuY2F0ZShzdWJTdHJpbmcsIHN1YlN0cmluZy5sZW5ndGgpKTtcbiAgICAgICAgICAgIGNockluZGV4ICs9IHN1YlN0cmluZy5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgc3ViU3RyaW5nID0gc3ViU3RyaW5nLnJlcGxhY2UocmVwbFBhdHQsICcnKTtcbiAgICAgICAgY2hySW5kZXggKz0gc3ViU3RyaW5nLmxlbmd0aDtcbiAgICAgICAgYXJyLnB1c2goc3ViU3RyaW5nLnRyaW0oKSk7XG4gICAgfVxuICAgIHJldHVybiBhcnI7XG59XG4iLCIvLyBDYXBpdGFsaXplIHRoZSBmaXJzdCB3b3JkIGluIGEgc3RyaW5nIG9yIGFsbCB3b3Jkc1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2FwaXRhbGl6ZShzdHIsIGFsbCA9IGZhbHNlKSB7XG4gICAgY29uc3Qgc3Vic3RyID0gc3RyLnRyaW1MZWZ0KCk7XG4gICAgY29uc3QgcmUgPSBhbGwgPyAvXi58XFxiLi9nIDogLyheXFx3KS87XG4gICAgcmV0dXJuIHN1YnN0ci5yZXBsYWNlKHJlLCAobWF0Y2gpID0+IG1hdGNoLnRvVXBwZXJDYXNlKCkpO1xufVxuIiwiaW1wb3J0IGVzY2FwZVBhdHRlcm4gZnJvbSAnLi9lc2NhcGVQYXR0ZXJuJztcblxuLy8gdGhlIG51bWJlciBvZiB0aW1lcyBzdWJzdHIgYXBwZWFycyB3aXRoaW4gc3RyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb3VudE9mKHN0ciwgc3Vic3RyLCBjYXNlU2Vuc2l0aXZlKSB7XG4gICAgY29uc3QgZXNjYXBlZFN0ciA9IGVzY2FwZVBhdHRlcm4oc3Vic3RyKTtcbiAgICBjb25zdCBmbGFncyA9ICghY2FzZVNlbnNpdGl2ZSkgPyAnaWcnIDogJ2cnO1xuICAgIHJldHVybiBzdHIubWF0Y2gobmV3IFJlZ0V4cChlc2NhcGVkU3RyLCBmbGFncykpLmxlbmd0aDtcbn1cbiIsIi8vIExldmVuc2h0ZWluIGRpc3RhbmNlIChlZGl0RGlzdGFuY2UpIGlzIGEgbWVhc3VyZSBvZiB0aGUgc2ltaWxhcml0eSBiZXR3ZWVuXG4vLyB0d28gc3RyaW5ncy4gVGhlIGRpc3RhbmNlIGlzIHRoZSBudW1iZXIgb2YgZGVsZXRpb25zLCBpbnNlcnRpb25zLCBvclxuLy8gc3Vic3RpdHV0aW9ucyByZXF1aXJlZCB0byB0cmFuc2Zvcm0gc291cmNlIGludG8gdGFyZ2V0LlxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZWRpdERpc3RhbmNlKHNvdXJjZSA9ICcnLCB0YXJnZXQgPSAnJykge1xuXG4gICAgaWYgKHNvdXJjZSA9PT0gdGFyZ2V0KSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIGlmICghc291cmNlLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gdGFyZ2V0Lmxlbmd0aDtcbiAgICB9XG5cbiAgICBpZiAoIXRhcmdldC5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZS5sZW5ndGg7XG4gICAgfVxuXG4gICAgY29uc3QgZCA9IFtdO1xuICAgIGxldCBpLCBqLCBjb3N0O1xuXG4gICAgZm9yIChpID0gMDsgaSA8PSBzb3VyY2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZFtpXSA9IFtdO1xuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDw9IHNvdXJjZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBkW2ldWzBdID0gaTtcbiAgICB9XG4gICAgZm9yIChqID0gMDsgaiA8PSB0YXJnZXQubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgZFswXVtqXSA9IGo7XG4gICAgfVxuXG4gICAgZm9yIChpID0gMTsgaSA8PSBzb3VyY2UubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICBjb25zdCBzaSA9IHNvdXJjZS5jaGFyQXQoaSAtIDEpO1xuICAgICAgICBmb3IgKGogPSAxOyBqIDw9IHRhcmdldC5sZW5ndGg7IGorKykge1xuXG4gICAgICAgICAgICBjb25zdCB0aiA9IHRhcmdldC5jaGFyQXQoaiAtIDEpO1xuXG4gICAgICAgICAgICBpZiAoc2kgPT09IHRqKSB7XG4gICAgICAgICAgICAgICAgY29zdCA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvc3QgPSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkW2ldW2pdID0gTWF0aC5taW4oZFtpIC0gMV1bal0gKyAxLCBkW2ldW2ogLSAxXSArIDEsIGRbaSAtIDFdW2ogLSAxXSArIGNvc3QpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRbc291cmNlLmxlbmd0aF1bdGFyZ2V0Lmxlbmd0aF07XG59XG4iLCIvLyB3aGV0aGVyIHN0ciBlbmRzIHdpdGggc3Vic3RyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlbmRzV2l0aChzdHIsIHN1YnN0cikge1xuICAgIHJldHVybiBzdHIubGFzdEluZGV4T2Yoc3Vic3RyKSA9PT0gc3RyLmxlbmd0aCAtIHN1YnN0ci5sZW5ndGg7XG59XG4iLCIvLyBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlc2NhcGVIdG1sKHN0cikge1xuLy8gICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuLy8gICAgIGRpdi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzdHIpKTtcbi8vICAgICByZXR1cm4gZGl2LmlubmVySFRNTDtcbi8vIH1cblxuY29uc3QgZW50aXR5TWFwID0ge1xuICAgICcmJzogJyZhbXA7JyxcbiAgICAnPCc6ICcmbHQ7JyxcbiAgICAnPic6ICcmZ3Q7JyxcbiAgICAnXCInOiAnJnF1b3Q7JyxcbiAgICAnXFwnJzogJyYjMzk7JyxcbiAgICAnLyc6ICcmI3gyRjsnLFxuICAgICdgJzogJyYjeDYwOycsXG4gICAgJz0nOiAnJiN4M0Q7J1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXNjYXBlSHRtbChzdHJpbmcpIHtcbiAgICByZXR1cm4gU3RyaW5nKHN0cmluZylcbiAgICAgICAgLnJlcGxhY2UoL1smPD5cIidgPVxcL10vZywgZnVuY3Rpb24gZnJvbUVudGl0eU1hcChzKSB7XG4gICAgICAgICAgICByZXR1cm4gZW50aXR5TWFwW3NdO1xuICAgICAgICB9KTtcbn1cbiIsIi8vIHJlZ2V4IGVzY2FwZSBwYXR0ZXJuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlc2NhcGVQYXR0ZXJuKHBhdHRlcm4pIHtcbiAgICByZXR1cm4gcGF0dGVybi5yZXBsYWNlKC8oXFxdfFxcW3xcXHt8XFx9fFxcKHxcXCl8XFwqfFxcK3xcXD98XFwufFxcXFwpL2csICdcXFxcJDEnKTtcbn1cbiIsImltcG9ydCByZW1vdmVFeHRyYVdoaXRlc3BhY2UgZnJvbSAnLi9yZW1vdmVFeHRyYVdoaXRlc3BhY2UnO1xuXG4vLyB3aGV0aGVyIHN0ciBjb250YWlucyBhbnkgdGV4dFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaGFzVGV4dChzdHIpIHtcbiAgICByZXR1cm4gISFyZW1vdmVFeHRyYVdoaXRlc3BhY2Uoc3RyKS5sZW5ndGg7XG59XG4iLCJpbXBvcnQgYWZ0ZXJGaXJzdCBmcm9tICcuL2FmdGVyRmlyc3QnO1xuaW1wb3J0IGFmdGVyTGFzdCBmcm9tICcuL2FmdGVyTGFzdCc7XG5pbXBvcnQgYmVmb3JlRmlyc3QgZnJvbSAnLi9iZWZvcmVGaXJzdCc7XG5pbXBvcnQgYmVmb3JlTGFzdCBmcm9tICcuL2JlZm9yZUxhc3QnO1xuaW1wb3J0IGJlZ2luc1dpdGggZnJvbSAnLi9iZWdpbnNXaXRoJztcbmltcG9ydCBiZXR3ZWVuIGZyb20gJy4vYmV0d2Vlbic7XG5pbXBvcnQgYmxvY2sgZnJvbSAnLi9ibG9jayc7XG5pbXBvcnQgY2FwaXRhbGl6ZSBmcm9tICcuL2NhcGl0YWxpemUnO1xuaW1wb3J0IGNvdW50T2YgZnJvbSAnLi9jb3VudE9mJztcbmltcG9ydCBlZGl0RGlzdGFuY2UgZnJvbSAnLi9lZGl0RGlzdGFuY2UnO1xuaW1wb3J0IGVuZHNXaXRoIGZyb20gJy4vZW5kc1dpdGgnO1xuaW1wb3J0IGVzY2FwZUhUTUwgZnJvbSAnLi9lc2NhcGVIVE1MJztcbmltcG9ydCBlc2NhcGVQYXR0ZXJuIGZyb20gJy4vZXNjYXBlUGF0dGVybic7XG5pbXBvcnQgaGFzVGV4dCBmcm9tICcuL2hhc1RleHQnO1xuaW1wb3J0IGlzTnVtZXJpYyBmcm9tICcuL2lzTnVtZXJpYyc7XG5pbXBvcnQgcGFkTGVmdCBmcm9tICcuL3BhZExlZnQnO1xuaW1wb3J0IHBhZFJpZ2h0IGZyb20gJy4vcGFkUmlnaHQnO1xuaW1wb3J0IHByZXZlbnRXaWRvdyBmcm9tICcuL3ByZXZlbnRXaWRvdyc7XG5pbXBvcnQgcHJvcGVyQ2FzZSBmcm9tICcuL3Byb3BlckNhc2UnO1xuaW1wb3J0IHJlbW92ZSBmcm9tICcuL3JlbW92ZSc7XG5pbXBvcnQgcmVtb3ZlRXh0cmFXaGl0ZXNwYWNlIGZyb20gJy4vcmVtb3ZlRXh0cmFXaGl0ZXNwYWNlJztcbmltcG9ydCByZXZlcnNlIGZyb20gJy4vcmV2ZXJzZSc7XG5pbXBvcnQgcmV2ZXJzZVdvcmRzIGZyb20gJy4vcmV2ZXJzZVdvcmRzJztcbmltcG9ydCBzaW1pbGFyaXR5IGZyb20gJy4vc2ltaWxhcml0eSc7XG5pbXBvcnQgc3RyaXBUYWdzIGZyb20gJy4vc3RyaXBUYWdzJztcbmltcG9ydCBzd2FwQ2FzZSBmcm9tICcuL3N3YXBDYXNlJztcbmltcG9ydCB0aW1lQ29kZSBmcm9tICcuL3RpbWVDb2RlJztcbmltcG9ydCB0b051bWJlciBmcm9tICcuL3RvTnVtYmVyJztcbmltcG9ydCB0cnVuY2F0ZSBmcm9tICcuL3RydW5jYXRlJztcbmltcG9ydCB3b3JkQ291bnQgZnJvbSAnLi93b3JkQ291bnQnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYWZ0ZXJGaXJzdCxcbiAgICBhZnRlckxhc3QsXG4gICAgYmVmb3JlRmlyc3QsXG4gICAgYmVmb3JlTGFzdCxcbiAgICBiZWdpbnNXaXRoLFxuICAgIGJldHdlZW4sXG4gICAgYmxvY2ssXG4gICAgY2FwaXRhbGl6ZSxcbiAgICBjb3VudE9mLFxuICAgIGVkaXREaXN0YW5jZSxcbiAgICBlbmRzV2l0aCxcbiAgICBlc2NhcGVIVE1MLFxuICAgIGVzY2FwZVBhdHRlcm4sXG4gICAgaGFzVGV4dCxcbiAgICBpc051bWVyaWMsXG4gICAgcGFkTGVmdCxcbiAgICBwYWRSaWdodCxcbiAgICBwcmV2ZW50V2lkb3csXG4gICAgcHJvcGVyQ2FzZSxcbiAgICByZW1vdmUsXG4gICAgcmVtb3ZlRXh0cmFXaGl0ZXNwYWNlLFxuICAgIHJldmVyc2UsXG4gICAgcmV2ZXJzZVdvcmRzLFxuICAgIHNpbWlsYXJpdHksXG4gICAgc3RyaXBUYWdzLFxuICAgIHN3YXBDYXNlLFxuICAgIHRpbWVDb2RlLFxuICAgIHRvTnVtYmVyLFxuICAgIHRydW5jYXRlLFxuICAgIHdvcmRDb3VudFxufTtcbiIsIi8vIHdoZXRoZXIgc3RyIGlzIG51bWVyaWNcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzTnVtZXJpYyhzdHIpIHtcbiAgICBjb25zdCByZWd4ID0gL15bLStdP1xcZCpcXC4/XFxkKyg/OltlRV1bLStdP1xcZCspPyQvO1xuICAgIHJldHVybiByZWd4LnRlc3Qoc3RyKTtcbn1cbiIsIi8vIHBhZCBzdHIgd2l0aCBzdWJzdHIgZnJvbSB0aGUgbGVmdFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFkTGVmdChzdHIsIHN1YnN0ciwgbGVuZ3RoKSB7XG4gICAgc3RyID0gU3RyaW5nKHN0cik7XG4gICAgd2hpbGUgKHN0ci5sZW5ndGggPCBsZW5ndGgpIHtcbiAgICAgICAgc3RyID0gc3Vic3RyICsgc3RyO1xuICAgIH1cbiAgICByZXR1cm4gc3RyO1xufVxuIiwiLy8gcGFkcyBzdHIgd2l0aCBzdWJzdHIgZnJvbSB0aGUgcmlnaHRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhZFJpZ2h0KHN0ciwgc3Vic3RyLCBsZW5ndGgpIHtcbiAgICBzdHIgPSBTdHJpbmcoc3RyKTtcbiAgICB3aGlsZSAoc3RyLmxlbmd0aCA8IGxlbmd0aCkge1xuICAgICAgICBzdHIgKz0gc3Vic3RyO1xuICAgIH1cbiAgICByZXR1cm4gc3RyO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcHJldmVudFdpZG93KHN0cikge1xuICAgIHN0ciA9IHN0ci50cmltKCk7XG5cbiAgICBjb25zdCBsYXN0U3BhY2UgPSBzdHIubGFzdEluZGV4T2YoJyAnKTtcbiAgICBpZiAobGFzdFNwYWNlID4gMCkge1xuICAgICAgICByZXR1cm4gYCR7c3RyLnNsaWNlKDAsIGxhc3RTcGFjZSl9Jm5ic3A7JHtzdHIuc2xpY2UobGFzdFNwYWNlICsgMSl9YDtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RyO1xufVxuIiwiaW1wb3J0IGNhcGl0YWxpemUgZnJvbSAnLi9jYXBpdGFsaXplJztcblxuLy8gcHJvcGVyIGNhc2Ugc3RyIGluIHNlbnRlbmNlIGZvcm1hdFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcHJvcGVyQ2FzZShzdHIpIHtcbiAgICBjb25zdCBuZXdTdHIgPSBzdHIudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXGIoW14uPzshXSspLywgY2FwaXRhbGl6ZSk7XG4gICAgcmV0dXJuIG5ld1N0ci5yZXBsYWNlKC9cXGJbaV1cXGIvLCAnSScpO1xufVxuIiwiaW1wb3J0IGVzY2FwZVBhdHRlcm4gZnJvbSAnLi9lc2NhcGVQYXR0ZXJuJztcblxuLy8gcmVtb3ZlIGFsbCBpbnN0YW5jZXMgb2Ygc3Vic3RyIGluIHN0clxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVtb3ZlKHN0ciwgc3Vic3RyLCBjYXNlU2Vuc2l0aXZlID0gZmFsc2UpIHtcbiAgICBjb25zdCBlc2NhcGVkU3RyID0gZXNjYXBlUGF0dGVybihzdWJzdHIpO1xuICAgIGNvbnN0IGZsYWdzID0gY2FzZVNlbnNpdGl2ZSA/ICdnJyA6ICdpZyc7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKG5ldyBSZWdFeHAoZXNjYXBlZFN0ciwgZmxhZ3MpLCAnJyk7XG59XG4iLCIvLyByZW1vdmUgZXh0cmEgd2hpdGVzcGFjZSAoZXh0cmEgc3BhY2VzLCB0YWJzLCBsaW5lIGJyZWFrcywgZXRjKVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVtb3ZlRXh0cmFXaGl0ZXNwYWNlKHN0cikge1xuICAgIHJldHVybiBzdHIudHJpbSgpLnJlcGxhY2UoL1xccysvZywgJyAnKTtcbn1cbiIsIi8vIHJldmVyc2UgY2hhcmFjdGVyIG9yZGVyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZXZlcnNlKHN0cikge1xuICAgIHJldHVybiBzdHIuc3BsaXQoJycpLnJldmVyc2UoKS5qb2luKCcnKTtcbn1cbiIsIi8vIHJldmVyc2Ugd29yZCBvcmRlclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmV2ZXJzZVdvcmRzKHN0cikge1xuICAgIHJldHVybiBzdHIuc3BsaXQoJyAnKS5yZXZlcnNlKCkuam9pbignICcpO1xufVxuIiwiaW1wb3J0IGVkaXREaXN0YW5jZSBmcm9tICcuL2VkaXREaXN0YW5jZSc7XG5cbi8vIHBlcmNlbnRhZ2Ugb2Ygc2ltaWxpYXJpdHkgZnJvbSAwIHRvIDFcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNpbWlsYXJpdHkoYSwgYikge1xuICAgIGNvbnN0IGUgPSBlZGl0RGlzdGFuY2UoYSwgYik7XG4gICAgY29uc3QgbSA9IE1hdGgubWF4KGEubGVuZ3RoLCBiLmxlbmd0aCk7XG4gICAgaWYgKG0gPT09IDApIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgfVxuICAgIHJldHVybiAoMSAtIGUgLyBtKTtcbn1cbiIsIi8vIHJlbW92ZSBhbGwgSFRNTCB0YWdzIGZyb20gc3RyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzdHJpcFRhZ3Moc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC88XFwvP1tePl0rPi9pZ20sICcnKTtcbn1cbiIsIlxuLy8gc3dhcHMgdGhlIGNhc2Ugb2Ygc3RyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzd2FwQ2FzZShzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoLyhcXHcpLywgZnVuY3Rpb24obmV3U3RyKSB7XG4gICAgICAgIGNvbnN0IGxvd2VyID0gbmV3U3RyLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IHVwcGVyID0gbmV3U3RyLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIHN3aXRjaCAobmV3U3RyKSB7XG4gICAgICAgICAgICBjYXNlIGxvd2VyOlxuICAgICAgICAgICAgICAgIHJldHVybiB1cHBlcjtcbiAgICAgICAgICAgIGNhc2UgdXBwZXI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxvd2VyO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3U3RyO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4iLCIvLyBmb3JtYXRzIHNlY29uZHMgaW50byBISDpNTTpTU1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdGltZUNvZGUoc2Vjb25kcywgZGVsaW0gPSAnOicpIHtcbiAgICBjb25zdCBoID0gTWF0aC5mbG9vcihzZWNvbmRzIC8gMzYwMCk7XG4gICAgY29uc3QgbSA9IE1hdGguZmxvb3IoKHNlY29uZHMgJSAzNjAwKSAvIDYwKTtcbiAgICBjb25zdCBzID0gTWF0aC5mbG9vcigoc2Vjb25kcyAlIDM2MDApICUgNjApO1xuICAgIGNvbnN0IGhyID0gKGggPCAxMCA/ICcwJyArIGggOiBoKSArIGRlbGltO1xuICAgIGNvbnN0IG1uID0gKG0gPCAxMCA/ICcwJyArIG0gOiBtKSArIGRlbGltO1xuICAgIGNvbnN0IHNjID0gKHMgPCAxMCA/ICcwJyArIHMgOiBzKTtcbiAgICByZXR1cm4gaHIgKyBtbiArIHNjO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdG9OdW1iZXIoc3RyKSB7XG4gICAgcmV0dXJuIE51bWJlcihzdHIucmVwbGFjZSgvW14wLTkuXS9nLCAnJykpO1xufVxuIiwiLy8gdHJ1bmNhdGUgdG8gbGVuZ3RoIHdpdGggc3VmZml4XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0cnVuY2F0ZShzdHIsIGxlbiwgc3VmZml4ID0gJy4uLicpIHtcbiAgICBsZW4gLT0gc3VmZml4Lmxlbmd0aDtcbiAgICBsZXQgdHJ1bmMgPSBzdHI7XG4gICAgaWYgKHRydW5jLmxlbmd0aCA+IGxlbikge1xuICAgICAgICB0cnVuYyA9IHRydW5jLnN1YnN0cigwLCBsZW4pO1xuICAgICAgICBjb25zdCByID0gL1teXFxzXS87XG4gICAgICAgIGlmIChyLnRlc3Qoc3RyLmNoYXJBdChsZW4pKSkge1xuICAgICAgICAgICAgdHJ1bmMgPSB0cnVuYy5yZXBsYWNlKC9cXHcrJHxcXHMrJC8sICcnKS50cmltUmlnaHQoKTtcbiAgICAgICAgfVxuICAgICAgICB0cnVuYyArPSBzdWZmaXg7XG4gICAgfVxuICAgIHJldHVybiB0cnVuYztcbn1cbiIsIi8vIHRoZSBudW1iZXIgb2Ygd29yZHMgaW4gYSBzdHJpbmdcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdvcmRDb3VudChzdHIpIHtcbiAgICByZXR1cm4gc3RyLm1hdGNoKC9cXGJcXHcrXFxiL2cpLmxlbmd0aDtcbn1cbiIsIi8vIGltcG9ydCBTaWduYWwgZnJvbSAnc2lnbmFscyc7XG5pbXBvcnQgTWluaVNpZ25hbCBmcm9tICdtaW5pLXNpZ25hbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaWNrZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZSA9IHRoaXMudXBkYXRlLmJpbmQodGhpcyk7XG4gICAgICAgIC8vIHRoaXMub25VcGRhdGUgPSBuZXcgU2lnbmFsKCk7XG4gICAgICAgIHRoaXMub25VcGRhdGUgPSBuZXcgTWluaVNpZ25hbCgpO1xuXG4gICAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxhc3QgPSAwO1xuICAgICAgICAvLyB0aGlzLmFjY3VtdWxhdGVkID0gMDtcbiAgICAgICAgLy8gdGhpcy5zdGVwID0gMTAwMCAvIDYwO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICBpZiAodGhpcy5ydW5uaW5nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJ1bm5pbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cblxuICAgIHN0b3AoKSB7XG4gICAgICAgIGlmICghdGhpcy5ydW5uaW5nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGlmICghdGhpcy5ydW5uaW5nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMudXBkYXRlKTtcblxuICAgICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICBsZXQgZHQgPSBub3cgLSB0aGlzLmxhc3Q7XG4gICAgICAgIGlmIChkdCA+IDIwKSB7XG4gICAgICAgICAgICBkdCA9IDIwO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubGFzdCA9IG5vdztcblxuICAgICAgICAvLyAgLy8gZml4ZWQgc3RlcDpcbiAgICAgICAgLy8gdGhpcy5hY2N1bXVsYXRlZCArPSBkdDtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gd2hpbGUgKHRoaXMuYWNjdW11bGF0ZWQgPj0gdGhpcy5zdGVwKSB7XG4gICAgICAgIC8vICAgICB0aGlzLmFjY3VtdWxhdGVkIC09IHRoaXMuc3RlcDtcbiAgICAgICAgLy8gICAgIHRoaXMub25VcGRhdGUuZGlzcGF0Y2godGhpcy5zdGVwKTtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIHRoaXMub25VcGRhdGUuZGlzcGF0Y2goZHQgKiAwLjAwMSk7XG4gICAgfVxuXG4gICAgYWRkKGZuLCBjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9uVXBkYXRlLmFkZChmbiwgY29udGV4dCk7XG4gICAgfVxuXG4gICAgcmVtb3ZlKGJpbmRpbmcpIHtcbiAgICAgICAgdGhpcy5vblVwZGF0ZS5kZXRhY2goYmluZGluZyk7XG4gICAgfVxuXG4gICAgLy8gcmVtb3ZlKGZuLCBjb250ZXh0KSB7XG4gICAgLy8gICAgIHRoaXMub25VcGRhdGUucmVtb3ZlKGZuLCBjb250ZXh0KTtcbiAgICAvLyB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBldmVudChjYXRlZ29yeSwgYWN0aW9uLCBsYWJlbCwgdmFsdWUpIHtcbiAgICBpZiAoIXdpbmRvdy5nYSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHdpbmRvdy5nYSgnc2VuZCcsICdldmVudCcsIGNhdGVnb3J5LCBhY3Rpb24sIGxhYmVsLCB2YWx1ZSk7XG59XG4iLCJpbXBvcnQgZXZlbnQgZnJvbSAnLi9ldmVudCc7XG5pbXBvcnQgcGFnZXZpZXcgZnJvbSAnLi9wYWdldmlldyc7XG5pbXBvcnQgbG9hZCBmcm9tICcuL2xvYWQnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZXZlbnQsXG4gICAgcGFnZXZpZXcsXG4gICAgbG9hZFxufTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvYWQoZ2FBY2NvdW50KSB7XG4gICAgY29uc29sZS5sb2coJ0luaXRpYWxpemUgR29vZ2xlIEFuYWx5dGljcyB3aXRoIGFjY291bnQgSWQ6JywgZ2FBY2NvdW50KTtcblxuICAgIC8qZXNsaW50LWRpc2FibGUqL1xuICAgIChmdW5jdGlvbihpLHMsbyxnLHIsYSxtKXtpWydHb29nbGVBbmFseXRpY3NPYmplY3QnXT1yO2lbcl09aVtyXXx8ZnVuY3Rpb24oKXtcblx0KGlbcl0ucT1pW3JdLnF8fFtdKS5wdXNoKGFyZ3VtZW50cyl9LGlbcl0ubD0xKm5ldyBEYXRlKCk7YT1zLmNyZWF0ZUVsZW1lbnQobyksXG5cdG09cy5nZXRFbGVtZW50c0J5VGFnTmFtZShvKVswXTthLmFzeW5jPTE7YS5zcmM9ZzttLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGEsbSlcblx0fSkod2luZG93LGRvY3VtZW50LCdzY3JpcHQnLCcvL3d3dy5nb29nbGUtYW5hbHl0aWNzLmNvbS9hbmFseXRpY3MuanMnLCdnYScpO1xuICAgIC8qZXNsaW50LWVuYWJsZSovXG5cbiAgICB3aW5kb3cuZ2EoJ2NyZWF0ZScsIGdhQWNjb3VudCwgJ2F1dG8nKTtcbiAgICB3aW5kb3cuZ2EoJ3NlbmQnLCAncGFnZXZpZXcnKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhZ2V2aWV3KHBhdGgpIHtcbiAgICBpZiAoIXdpbmRvdy5nYSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHdpbmRvdy5nYSgnc2VuZCcsICdwYWdldmlldycsIHBhdGgpO1xufVxuIiwiaW1wb3J0IHtlYXNlT3V0UXVhZH0gZnJvbSAnLi4vZWFzZS9xdWFkJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHdlZW4ge1xuICAgIGNvbnN0cnVjdG9yKG9iLCBwcm9wcywgZHVyYXRpb24sIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5vYiA9IG9iO1xuXG4gICAgICAgIGlmIChwcm9wcykge1xuICAgICAgICAgICAgdGhpcy50byhwcm9wcywgZHVyYXRpb24sIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG8ocHJvcHMsIGR1cmF0aW9uLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgdGhpcy5kdXJhdGlvbiA9IGR1cmF0aW9uO1xuICAgICAgICB0aGlzLmVhc2UgPSBvcHRpb25zLmVhc2UgfHwgZWFzZU91dFF1YWQ7XG4gICAgICAgIHRoaXMuZGVsYXkgPSBvcHRpb25zLmRlbGF5IHx8IDA7XG4gICAgICAgIHRoaXMub25VcGRhdGUgPSBvcHRpb25zLm9uVXBkYXRlO1xuICAgICAgICB0aGlzLm9uQ29tcGxldGUgPSBvcHRpb25zLm9uQ29tcGxldGU7XG4gICAgICAgIHRoaXMudGltZSA9IDA7XG4gICAgICAgIHRoaXMuY29tcGxldGUgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLl9wcm9wcyA9IE9iamVjdC5rZXlzKHByb3BzKTtcbiAgICAgICAgdGhpcy5fYmVnaW5WYWxzID0ge307XG4gICAgICAgIHRoaXMuX2NoYW5nZVZhbHMgPSB7fTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3Byb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBwcm9wID0gdGhpcy5fcHJvcHNbaV07XG4gICAgICAgICAgICB0aGlzLl9iZWdpblZhbHNbcHJvcF0gPSB0aGlzLm9iW3Byb3BdO1xuICAgICAgICAgICAgdGhpcy5fY2hhbmdlVmFsc1twcm9wXSA9IHByb3BzW3Byb3BdIC0gdGhpcy5fYmVnaW5WYWxzW3Byb3BdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlKGR0KSB7XG4gICAgICAgIGlmICh0aGlzLnRpbWUgPT09IHRoaXMuZHVyYXRpb24pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRlbGF5ID4gMCkge1xuICAgICAgICAgICAgdGhpcy5kZWxheSAtPSBkdDtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudGltZSArPSBkdDtcblxuICAgICAgICBpZiAodGhpcy50aW1lID4gdGhpcy5kdXJhdGlvbikge1xuICAgICAgICAgICAgdGhpcy50aW1lID0gdGhpcy5kdXJhdGlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHByb3AgPSB0aGlzLl9wcm9wc1tpXTtcbiAgICAgICAgICAgIHRoaXMub2JbcHJvcF0gPSB0aGlzLmVhc2UodGhpcy50aW1lLCB0aGlzLl9iZWdpblZhbHNbcHJvcF0sIHRoaXMuX2NoYW5nZVZhbHNbcHJvcF0sIHRoaXMuZHVyYXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMub25VcGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMub25VcGRhdGUodGhpcy5vYik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy50aW1lID09PSB0aGlzLmR1cmF0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBsZXRlID0gdHJ1ZTtcblxuICAgICAgICAgICAgaWYgKHRoaXMub25Db21wbGV0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMub25Db21wbGV0ZSh0aGlzLm9iKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc2V0KCkge1xuICAgICAgICB0aGlzLnRpbWUgPSAwO1xuICAgICAgICB0aGlzLmNvbXBsZXRlID0gZmFsc2U7XG4gICAgfVxufVxuIiwibGV0IGhpZGRlbixcbiAgICBjaGFuZ2U7XG5cbmlmICh0eXBlb2YgZG9jdW1lbnQuaGlkZGVuICE9PSAndW5kZWZpbmVkJykge1xuICAgIGhpZGRlbiA9ICdoaWRkZW4nO1xuICAgIGNoYW5nZSA9ICd2aXNpYmlsaXR5Y2hhbmdlJztcbn0gZWxzZSBpZiAodHlwZW9mIGRvY3VtZW50Lm1vekhpZGRlbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBoaWRkZW4gPSAnbW96SGlkZGVuJztcbiAgICBjaGFuZ2UgPSAnbW96dmlzaWJpbGl0eWNoYW5nZSc7XG59IGVsc2UgaWYgKHR5cGVvZiBkb2N1bWVudC5tc0hpZGRlbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBoaWRkZW4gPSAnbXNIaWRkZW4nO1xuICAgIGNoYW5nZSA9ICdtc3Zpc2liaWxpdHljaGFuZ2UnO1xufSBlbHNlIGlmICh0eXBlb2YgZG9jdW1lbnQud2Via2l0SGlkZGVuICE9PSAndW5kZWZpbmVkJykge1xuICAgIGhpZGRlbiA9ICd3ZWJraXRIaWRkZW4nO1xuICAgIGNoYW5nZSA9ICd3ZWJraXR2aXNpYmlsaXR5Y2hhbmdlJztcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGhpZGRlbixcbiAgICBjaGFuZ2Vcbn07XG4iLCJpbXBvcnQgYXBpIGZyb20gJy4vYXBpJztcbmltcG9ydCBlbWl0dGVyIGZyb20gJy4uL2V2ZW50cy9lbWl0dGVyJztcblxuY29uc3QgdmlzaWJpbGl0eSA9IE9iamVjdC5jcmVhdGUoZW1pdHRlci5wcm90b3R5cGUsIHtcbiAgICBoaWRkZW46IHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudFthcGkuaGlkZGVuXTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5mdW5jdGlvbiBvblZpc2liaWxpdHlDaGFuZ2UoKSB7XG4gICAgaWYgKGRvY3VtZW50W2FwaS5oaWRkZW5dKSB7XG4gICAgICAgIHZpc2liaWxpdHkuZW1pdCgnaGlkZGVuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmlzaWJpbGl0eS5lbWl0KCdzaG93bicpO1xuICAgIH1cbn1cblxuaWYgKGFwaS5jaGFuZ2UpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGFwaS5jaGFuZ2UsIG9uVmlzaWJpbGl0eUNoYW5nZSwgZmFsc2UpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2aXNpYmlsaXR5O1xuIl19
