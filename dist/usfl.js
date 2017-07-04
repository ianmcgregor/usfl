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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcnJheS9hcnJheS5qcyIsImFycmF5L2Nsb25lLmpzIiwiYXJyYXkvaW5kZXguanMiLCJhcnJheS9tb3ZlRWxlbWVudC5qcyIsImFycmF5L25lYXJlc3QuanMiLCJhcnJheS9yYW5kb21DaG9pY2UuanMiLCJhcnJheS9zb3J0QWxwaGEuanMiLCJhcnJheS9zb3J0TnVtZXJpYy5qcyIsImFycmF5L3NvcnRSYW5kb20uanMiLCJkb20vYmxvY2tTY3JvbGxpbmcuanMiLCJkb20vZWxDb29yZHMuanMiLCJkb20vZm9yY2VSZWRyYXcuanMiLCJkb20vZ2V0UGFnZUhlaWdodC5qcyIsImRvbS9nZXRTY3JvbGxQZXJjZW50YWdlLmpzIiwiZG9tL2dldFNjcm9sbFJlbWFpbmluZy5qcyIsImRvbS9nZXRTY3JvbGxUb3AuanMiLCJkb20vZ2V0U3Jjc2V0SW1hZ2UuanMiLCJkb20vaW5kZXguanMiLCJkb20vaXNFbGVtZW50SW5WaWV3cG9ydC5qcyIsImRvbS9pc1BhZ2VFbmQuanMiLCJkb20vcmVzaXplLmpzIiwiZG9tL3Njcm9sbC5qcyIsImRvbS9zZXRTdHlsZS5qcyIsImRvbS90cmFuc2l0aW9uRW5kLmpzIiwiZWFzZS9iYWNrLmpzIiwiZWFzZS9ib3VuY2UuanMiLCJlYXNlL2NpcmN1bGFyLmpzIiwiZWFzZS9jdWJpYy5qcyIsImVhc2UvZWxhc3RpYy5qcyIsImVhc2UvZXhwby5qcyIsImVhc2UvaW5kZXguanMiLCJlYXNlL2xpbmVhci5qcyIsImVhc2UvcXVhZC5qcyIsImVhc2UvcXVhcnQuanMiLCJlYXNlL3F1aW50LmpzIiwiZWFzZS9zaW5lLmpzIiwiZXZlbnRzL2RlYm91bmNlLmpzIiwiZXZlbnRzL2RlbGVnYXRlRXZlbnRzLmpzIiwiZXZlbnRzL2VtaXR0ZXIuanMiLCJldmVudHMvZXZlbnRCdXMuanMiLCJldmVudHMvaGVhcnRiZWF0LmpzIiwiZXZlbnRzL2luZGV4LmpzIiwiZnBzL2luZGV4LmpzIiwiZnVsbHNjcmVlbi9hcGkuanMiLCJmdWxsc2NyZWVuL2luZGV4LmpzIiwiZ3JhcGhpY3MvaW5kZXguanMiLCJndWkvaW5kZXguanMiLCJodHRwL2dldExvY2F0aW9uLmpzIiwiaHR0cC9pbmRleC5qcyIsImh0dHAvanNvbnAuanMiLCJodHRwL2xvYWRTY3JpcHQuanMiLCJodHRwL3VybFBhcmFtcy5qcyIsImh0dHAveGhyLmpzIiwiaW5kZXguanMiLCJpbnB1dC9jbGlja091dHNpZGUuanMiLCJpbnB1dC9pbmRleC5qcyIsImlucHV0L2tleUlucHV0LmpzIiwiaW5wdXQva2V5Ym9hcmQuanMiLCJpbnB1dC9taWNyb3Bob25lLmpzIiwiaW5wdXQvbW91c2VMZWZ0V2luZG93LmpzIiwiaW5wdXQvbW91c2VXaGVlbC5qcyIsImlucHV0L3BvaW50ZXJDb29yZHMuanMiLCJpbnB1dC90b3VjaElucHV0LmpzIiwibGlua2VkLWxpc3QvaW5kZXguanMiLCJtYXRoL2FuZ2xlLmpzIiwibWF0aC9jZXJwLmpzIiwibWF0aC9jaXJjbGVEaXN0cmlidXRpb24uanMiLCJtYXRoL2NsYW1wLmpzIiwibWF0aC9jb2luVG9zcy5qcyIsIm1hdGgvY3Jvc3NQcm9kdWN0MmQuanMiLCJtYXRoL2RlZ3JlZXMuanMiLCJtYXRoL2RpZmZlcmVuY2UuanMiLCJtYXRoL2Rpc3RhbmNlLmpzIiwibWF0aC9kaXN0YW5jZVNxLmpzIiwibWF0aC9kb3RQcm9kdWN0MmQuanMiLCJtYXRoL2dldENpcmNsZVBvaW50cy5qcyIsIm1hdGgvZ2V0SW50ZXJzZWN0aW9uQXJlYS5qcyIsIm1hdGgvZ2V0T3ZlcmxhcFguanMiLCJtYXRoL2dldE92ZXJsYXBZLmpzIiwibWF0aC9pbmRleC5qcyIsIm1hdGgvbGVycC5qcyIsIm1hdGgvbWFwLmpzIiwibWF0aC9ub3JtYWxpemUuanMiLCJtYXRoL29yaWVudGF0aW9uLmpzIiwibWF0aC9wZXJjZW50UmVtYWluaW5nLmpzIiwibWF0aC9wZXJzcGVjdGl2ZS5qcyIsIm1hdGgvcXVhZHJhdGljQ3VydmUuanMiLCJtYXRoL3JhZGlhbnMuanMiLCJtYXRoL3JhbmRvbS5qcyIsIm1hdGgvcmFuZG9tSW50LmpzIiwibWF0aC9yYW5kb21TaWduLmpzIiwibWF0aC9yb3RhdGVQb2ludC5qcyIsIm1hdGgvcm90YXRlVG9EZWcuanMiLCJtYXRoL3JvdGF0ZVRvUmFkLmpzIiwibWF0aC9yb3VuZFRvLmpzIiwibWF0aC9yb3VuZFRvTmVhcmVzdC5qcyIsIm1hdGgvc2l6ZS5qcyIsIm1hdGgvc21lcnAuanMiLCJtYXRoL3Ntb290aHN0ZXAuanMiLCJtYXRoL3NwbGl0VmFsdWVBbmRVbml0LmpzIiwibWF0aC93ZWlnaHRlZEF2ZXJhZ2UuanMiLCJtYXRoL3dlaWdodGVkRGlzdHJpYnV0aW9uLmpzIiwibWVkaWEvY3VlcG9pbnRzUmVhZGVyLmpzIiwibWVkaWEvaU9TUGxheVZpZGVvSW5saW5lLmpzIiwibWVkaWEvaW5kZXguanMiLCJtZWRpYS92aWRlb1BsYXllci5qcyIsIm1lZGlhL3ZpbWVvLmpzIiwibWVkaWEveW91dHViZS5qcyIsIm1lZGlhL3lvdXR1YmVCYXNpYy5qcyIsIm5vZGVfbW9kdWxlcy9ldmVudHMvZXZlbnRzLmpzIiwibm9kZV9tb2R1bGVzL21pbmktc2lnbmFscy9saWIvbWluaS1zaWduYWxzLmpzIiwib2JqZWN0LXBvb2wvaW5kZXguanMiLCJvYmplY3QvY2xvbmUuanMiLCJvYmplY3QvZmlsdGVyLmpzIiwib2JqZWN0L2luZGV4LmpzIiwib2JqZWN0L21hcC5qcyIsInBhcnRpY2xlL2luZGV4LmpzIiwicGxhdGZvcm0vYnJvd3Nlci9hbmRyb2lkTmF0aXZlLmpzIiwicGxhdGZvcm0vYnJvd3Nlci9pZVZlcnNpb24uanMiLCJwbGF0Zm9ybS9icm93c2VyL2luZGV4LmpzIiwicGxhdGZvcm0vYnJvd3Nlci9zYWZhcmkuanMiLCJwbGF0Zm9ybS9kZXZpY2UvaW5kZXguanMiLCJwbGF0Zm9ybS9pbmRleC5qcyIsInBsYXRmb3JtL2lzTG9jYWxIb3N0LmpzIiwicGxhdGZvcm0vb3MvYW5kcm9pZC5qcyIsInBsYXRmb3JtL29zL2FuZHJvaWRWZXJzaW9uLmpzIiwicGxhdGZvcm0vb3MvaW5kZXguanMiLCJwbGF0Zm9ybS9vcy9pb3MuanMiLCJwbGF0Zm9ybS9vcy9pb3NWZXJzaW9uLmpzIiwicGxhdGZvcm0vb3MvbGludXguanMiLCJwbGF0Zm9ybS9vcy9tYWMuanMiLCJwbGF0Zm9ybS9vcy93aW5kb3dzLmpzIiwicGxhdGZvcm0vb3Mvd2luZG93c1Bob25lLmpzIiwicGxhdGZvcm0vc2NyZWVuL2luZGV4LmpzIiwicGxhdGZvcm0vc3VwcG9ydHMvZGV2aWNlT3JpZW50YXRpb24uanMiLCJwbGF0Zm9ybS9zdXBwb3J0cy9pbmRleC5qcyIsInBsYXRmb3JtL3N1cHBvcnRzL21wNC5qcyIsInBsYXRmb3JtL3N1cHBvcnRzL3dlYmdsLmpzIiwicGxhdGZvcm0vc3VwcG9ydHMvd2VibS5qcyIsInBvbHlmaWxsL2NsYXNzTGlzdC5qcyIsInBvbHlmaWxsL2NvbnNvbGUuanMiLCJwb2x5ZmlsbC9pbmRleC5qcyIsInBvbHlmaWxsL3JlcXVlc3RBbmltYXRpb25GcmFtZS5qcyIsInBvcHVwL2luZGV4LmpzIiwicXVhZC10cmVlL2luZGV4LmpzIiwic2hhcmUvZW1haWwuanMiLCJzaGFyZS9mYWNlYm9vay5qcyIsInNoYXJlL2ZhY2Vib29rRmVlZERpYWxvZy5qcyIsInNoYXJlL2dvb2dsZXBsdXMuanMiLCJzaGFyZS9pbmRleC5qcyIsInNoYXJlL2xpbmtlZGluLmpzIiwic2hhcmUvcGludGVyZXN0LmpzIiwic2hhcmUvcmVkZGl0LmpzIiwic2hhcmUvcmVucmVuLmpzIiwic2hhcmUvc21zLmpzIiwic2hhcmUvdHdpdHRlci5qcyIsInNoYXJlL3Zrb250YWt0ZS5qcyIsInNoYXJlL3dlaWJvLmpzIiwic2hhcmUvd2hhdHNhcHAuanMiLCJzdG9yYWdlL2luZGV4LmpzIiwic3RyaW5nL2FmdGVyRmlyc3QuanMiLCJzdHJpbmcvYWZ0ZXJMYXN0LmpzIiwic3RyaW5nL2JlZm9yZUZpcnN0LmpzIiwic3RyaW5nL2JlZm9yZUxhc3QuanMiLCJzdHJpbmcvYmVnaW5zV2l0aC5qcyIsInN0cmluZy9iZXR3ZWVuLmpzIiwic3RyaW5nL2Jsb2NrLmpzIiwic3RyaW5nL2NhcGl0YWxpemUuanMiLCJzdHJpbmcvY291bnRPZi5qcyIsInN0cmluZy9lZGl0RGlzdGFuY2UuanMiLCJzdHJpbmcvZW5kc1dpdGguanMiLCJzdHJpbmcvZXNjYXBlSFRNTC5qcyIsInN0cmluZy9lc2NhcGVQYXR0ZXJuLmpzIiwic3RyaW5nL2hhc1RleHQuanMiLCJzdHJpbmcvaW5kZXguanMiLCJzdHJpbmcvaXNOdW1lcmljLmpzIiwic3RyaW5nL3BhZExlZnQuanMiLCJzdHJpbmcvcGFkUmlnaHQuanMiLCJzdHJpbmcvcHJldmVudFdpZG93LmpzIiwic3RyaW5nL3Byb3BlckNhc2UuanMiLCJzdHJpbmcvcmVtb3ZlLmpzIiwic3RyaW5nL3JlbW92ZUV4dHJhV2hpdGVzcGFjZS5qcyIsInN0cmluZy9yZXZlcnNlLmpzIiwic3RyaW5nL3JldmVyc2VXb3Jkcy5qcyIsInN0cmluZy9zaW1pbGFyaXR5LmpzIiwic3RyaW5nL3N0cmlwVGFncy5qcyIsInN0cmluZy9zd2FwQ2FzZS5qcyIsInN0cmluZy90aW1lQ29kZS5qcyIsInN0cmluZy90b051bWJlci5qcyIsInN0cmluZy90cnVuY2F0ZS5qcyIsInN0cmluZy93b3JkQ291bnQuanMiLCJ0aWNrZXIvaW5kZXguanMiLCJ0cmFjay9ldmVudC5qcyIsInRyYWNrL2luZGV4LmpzIiwidHJhY2svbG9hZC5qcyIsInRyYWNrL3BhZ2V2aWV3LmpzIiwidHdlZW4vaW5kZXguanMiLCJ2aXNpYmlsaXR5L2FwaS5qcyIsInZpc2liaWxpdHkvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztrQkNBd0IsSztBQUFULFNBQVMsS0FBVCxDQUFlLE1BQWYsRUFBdUIsS0FBdkIsRUFBOEI7QUFDekMsUUFBTSxNQUFNLEVBQVo7QUFDQSxTQUFLLElBQUksSUFBSSxDQUFiLEVBQWdC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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QWdCLE9BQWhCO0FBQ0g7QUFDSjs7QUFFRCxJQUFJLGNBQUksTUFBUixFQUFnQjtBQUNaLGFBQVMsZ0JBQVQsQ0FBMEIsY0FBSSxNQUE5QixFQUFzQyxrQkFBdEMsRUFBMEQsS0FBMUQ7QUFDSDs7a0JBRWMsVSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhcnJheShsZW5ndGgsIHZhbHVlKSB7XG4gICAgY29uc3QgYXJyID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCB2YWwgPSB0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnID8gdmFsdWUgOiBpO1xuICAgICAgICBhcnIucHVzaCh2YWwpO1xuICAgIH1cbiAgICByZXR1cm4gYXJyO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2xvbmUoYXJyKSB7XG4gICAgcmV0dXJuIGFyci5zbGljZSgwKTtcbn1cbiIsImltcG9ydCBhcnJheSBmcm9tICcuL2FycmF5JztcbmltcG9ydCBjbG9uZSBmcm9tICcuL2Nsb25lJztcbmltcG9ydCBtb3ZlRWxlbWVudCBmcm9tICcuL21vdmVFbGVtZW50JztcbmltcG9ydCBuZWFyZXN0IGZyb20gJy4vbmVhcmVzdCc7XG5pbXBvcnQgcmFuZG9tQ2hvaWNlIGZyb20gJy4vcmFuZG9tQ2hvaWNlJztcbmltcG9ydCBzb3J0QWxwaGEgZnJvbSAnLi9zb3J0QWxwaGEnO1xuaW1wb3J0IHNvcnROdW1lcmljIGZyb20gJy4vc29ydE51bWVyaWMnO1xuaW1wb3J0IHNvcnRSYW5kb20gZnJvbSAnLi9zb3J0UmFuZG9tJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGFycmF5LFxuICAgIGNsb25lLFxuICAgIG1vdmVFbGVtZW50LFxuICAgIG5lYXJlc3QsXG4gICAgcmFuZG9tQ2hvaWNlLFxuICAgIHNvcnRBbHBoYSxcbiAgICBzb3J0TnVtZXJpYyxcbiAgICBzb3J0UmFuZG9tXG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbW92ZUVsZW1lbnQoYXJyLCBmcm9tLCB0bykge1xuICAgIGFyciA9IGFyci5zbGljZSgwKTtcbiAgICBjb25zdCByZW1vdmVkID0gYXJyLnNwbGljZShmcm9tLCAxKVswXTtcbiAgICBjb25zdCBpbnNlcnRBdCA9IHRvIDwgMCA/IGFyci5sZW5ndGggKyB0byA6IHRvO1xuICAgIGFyci5zcGxpY2UoaW5zZXJ0QXQsIDAsIHJlbW92ZWQpO1xuICAgIHJldHVybiBhcnI7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBuZWFyZXN0KHZhbHVlLCBhcnIpIHtcbiAgICBsZXQgbGVhc3QgPSBOdW1iZXIuTUFYX1ZBTFVFO1xuICAgIHJldHVybiBhcnIucmVkdWNlKChyZXN1bHQsIGl0ZW0pID0+IHtcbiAgICAgICAgY29uc3QgZGlmZiA9IE1hdGguYWJzKGl0ZW0gLSB2YWx1ZSk7XG4gICAgICAgIGlmIChkaWZmIDwgbGVhc3QpIHtcbiAgICAgICAgICAgIGxlYXN0ID0gZGlmZjtcbiAgICAgICAgICAgIHJlc3VsdCA9IGl0ZW07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LCAtMSk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByYW5kb21DaG9pY2UoYXJyKSB7XG4gICAgcmV0dXJuIGFycltNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhcnIubGVuZ3RoKV07XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzb3J0QWxwaGEoYSwgYikge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbih4LCB5KSB7XG4gICAgICAgICAgICByZXR1cm4gU3RyaW5nKHhbYV0pLnRvTG93ZXJDYXNlKCkgPiBTdHJpbmcoeVthXSkudG9Mb3dlckNhc2UoKSA/IDEgOiAtMTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIFN0cmluZyhhKS50b0xvd2VyQ2FzZSgpID4gU3RyaW5nKGIpLnRvTG93ZXJDYXNlKCkgPyAxIDogLTE7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzb3J0TnVtZXJpYyhhLCBiKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHgsIHkpIHtcbiAgICAgICAgICAgIHJldHVybiBOdW1iZXIoeFthXSkgLSBOdW1iZXIoeVthXSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBOdW1iZXIoYSkgLSBOdW1iZXIoYik7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzb3J0UmFuZG9tKCkge1xuICAgIHJldHVybiBNYXRoLnJhbmRvbSgpID4gMC41ID8gLTEgOiAxO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmxvY2tTY3JvbGxpbmcodmFsdWUpIHtcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gdmFsdWUgPyAnaGlkZGVuJyA6ICcnO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZWxDb29yZHMoZWwpIHtcbiAgICBjb25zdCBib3ggPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5ib2R5O1xuICAgIGNvbnN0IGRvY0VsID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG4gICAgY29uc3Qgc2Nyb2xsVG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvY0VsLnNjcm9sbFRvcCB8fCBib2R5LnNjcm9sbFRvcDtcbiAgICBjb25zdCBzY3JvbGxMZWZ0ID0gd2luZG93LnBhZ2VYT2Zmc2V0IHx8IGRvY0VsLnNjcm9sbExlZnQgfHwgYm9keS5zY3JvbGxMZWZ0O1xuXG4gICAgY29uc3QgY2xpZW50VG9wID0gZG9jRWwuY2xpZW50VG9wIHx8IGJvZHkuY2xpZW50VG9wIHx8IDA7XG4gICAgY29uc3QgY2xpZW50TGVmdCA9IGRvY0VsLmNsaWVudExlZnQgfHwgYm9keS5jbGllbnRMZWZ0IHx8IDA7XG5cbiAgICBjb25zdCB0b3AgPSBib3gudG9wICsgc2Nyb2xsVG9wIC0gY2xpZW50VG9wO1xuICAgIGNvbnN0IGxlZnQgPSBib3gubGVmdCArIHNjcm9sbExlZnQgLSBjbGllbnRMZWZ0O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9wOiBNYXRoLnJvdW5kKHRvcCksXG4gICAgICAgIGxlZnQ6IE1hdGgucm91bmQobGVmdCksXG4gICAgICAgIHg6IE1hdGgucm91bmQobGVmdCksXG4gICAgICAgIHk6IE1hdGgucm91bmQodG9wKVxuICAgIH07XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmb3JjZVJlZHJhdyhlbCkge1xuICAgIGNvbnN0IGRpc3BsYXkgPSBlbC5zdHlsZS5kaXNwbGF5O1xuICAgIGVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZWwub2Zmc2V0SGVpZ2h0O1xuICAgIGVsLnN0eWxlLmRpc3BsYXkgPSBkaXNwbGF5O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0UGFnZUhlaWdodCgpIHtcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQuYm9keTtcbiAgICBjb25zdCBkb2MgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cbiAgICByZXR1cm4gTWF0aC5tYXgoXG4gICAgICAgIGJvZHkuc2Nyb2xsSGVpZ2h0IHx8IDAsXG4gICAgICAgIGJvZHkub2Zmc2V0SGVpZ2h0IHx8IDAsXG4gICAgICAgIGJvZHkuY2xpZW50SGVpZ2h0IHx8IDAsXG4gICAgICAgIGRvYy5jbGllbnRIZWlnaHQgfHwgMCxcbiAgICAgICAgZG9jLm9mZnNldEhlaWdodCB8fCAwLFxuICAgICAgICBkb2Muc2Nyb2xsSGVpZ2h0IHx8IDBcbiAgICApO1xufVxuIiwiaW1wb3J0IGdldFNjcm9sbFRvcCBmcm9tICcuL2dldFNjcm9sbFRvcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFNjcm9sbFBlcmNlbnRhZ2UoKSB7XG4gICAgcmV0dXJuIChnZXRTY3JvbGxUb3AoKSArIHdpbmRvdy5pbm5lckhlaWdodCkgLyBkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodDtcbn1cbiIsImltcG9ydCBnZXRTY3JvbGxUb3AgZnJvbSAnLi9nZXRTY3JvbGxUb3AnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRTY3JvbGxSZW1haW5pbmcoKSB7XG4gICAgY29uc3QgYiA9IGRvY3VtZW50LmJvZHk7XG4gICAgcmV0dXJuIE1hdGguYWJzKGdldFNjcm9sbFRvcCgpIC0gKGIuc2Nyb2xsSGVpZ2h0IC0gYi5jbGllbnRIZWlnaHQpKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFNjcm9sbFRvcCgpIHtcbiAgICByZXR1cm4gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRTcmNzZXRJbWFnZShzcmNzZXQsIHBpeGVsV2lkdGgpIHtcbiAgICBwaXhlbFdpZHRoID0gcGl4ZWxXaWR0aCB8fCB3aW5kb3cuaW5uZXJXaWR0aCAqICh3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAwKTtcblxuICAgIGNvbnN0IHNldCA9IHNyY3NldC5zcGxpdCgnLCcpXG4gICAgICAgIC5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IFt1cmwsIHdpZHRoXSA9IGl0ZW0udHJpbSgpLnNwbGl0KC9cXHMrLyk7XG4gICAgICAgICAgICBjb25zdCBzaXplID0gcGFyc2VJbnQod2lkdGguc2xpY2UoMCwgLTEpLCAxMCk7XG4gICAgICAgICAgICByZXR1cm4ge3VybCwgc2l6ZX07XG4gICAgICAgIH0pXG4gICAgICAgIC5zb3J0KChhLCBiKSA9PiBiLnNpemUgLSBhLnNpemUpO1xuXG4gICAgaWYgKCFzZXQubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICByZXR1cm4gc2V0LnJlZHVjZSgodmFsdWUsIGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuIGl0ZW0uc2l6ZSA+PSBwaXhlbFdpZHRoID8gaXRlbS51cmwgOiB2YWx1ZTtcbiAgICB9LCBzZXRbMF0udXJsKTtcbn1cbiIsImltcG9ydCBibG9ja1Njcm9sbGluZyBmcm9tICcuL2Jsb2NrU2Nyb2xsaW5nJztcbmltcG9ydCBlbENvb3JkcyBmcm9tICcuL2VsQ29vcmRzJztcbmltcG9ydCBmb3JjZVJlZHJhdyBmcm9tICcuL2ZvcmNlUmVkcmF3JztcbmltcG9ydCBnZXRQYWdlSGVpZ2h0IGZyb20gJy4vZ2V0UGFnZUhlaWdodCc7XG5pbXBvcnQgZ2V0U2Nyb2xsUGVyY2VudGFnZSBmcm9tICcuL2dldFNjcm9sbFBlcmNlbnRhZ2UnO1xuaW1wb3J0IGdldFNjcm9sbFJlbWFpbmluZyBmcm9tICcuL2dldFNjcm9sbFJlbWFpbmluZyc7XG5pbXBvcnQgZ2V0U2Nyb2xsVG9wIGZyb20gJy4vZ2V0U2Nyb2xsVG9wJztcbmltcG9ydCBnZXRTcmNzZXRJbWFnZSBmcm9tICcuL2dldFNyY3NldEltYWdlJztcbmltcG9ydCBpc0VsZW1lbnRJblZpZXdwb3J0IGZyb20gJy4vaXNFbGVtZW50SW5WaWV3cG9ydCc7XG5pbXBvcnQgaXNQYWdlRW5kIGZyb20gJy4vaXNQYWdlRW5kJztcbmltcG9ydCByZXNpemUgZnJvbSAnLi9yZXNpemUnO1xuaW1wb3J0IHNjcm9sbCBmcm9tICcuL3Njcm9sbCc7XG5pbXBvcnQgc2V0U3R5bGUgZnJvbSAnLi9zZXRTdHlsZSc7XG5pbXBvcnQgdHJhbnNpdGlvbkVuZCBmcm9tICcuL3RyYW5zaXRpb25FbmQnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYmxvY2tTY3JvbGxpbmcsXG4gICAgZWxDb29yZHMsXG4gICAgZm9yY2VSZWRyYXcsXG4gICAgZ2V0UGFnZUhlaWdodCxcbiAgICBnZXRTY3JvbGxQZXJjZW50YWdlLFxuICAgIGdldFNjcm9sbFJlbWFpbmluZyxcbiAgICBnZXRTY3JvbGxUb3AsXG4gICAgZ2V0U3Jjc2V0SW1hZ2UsXG4gICAgaXNFbGVtZW50SW5WaWV3cG9ydCxcbiAgICBpc1BhZ2VFbmQsXG4gICAgcmVzaXplLFxuICAgIHNjcm9sbCxcbiAgICBzZXRTdHlsZSxcbiAgICB0cmFuc2l0aW9uRW5kXG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNFbGVtZW50SW5WaWV3cG9ydChlbCwgYnVmZmVyID0gMCkge1xuICAgIGNvbnN0IHJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICByZXR1cm4gKFxuICAgICAgICByZWN0LnRvcCA+PSAwIC0gYnVmZmVyICYmXG4gICAgICAgIHJlY3QubGVmdCA+PSAwIC0gYnVmZmVyICYmXG4gICAgICAgIHJlY3QuYm90dG9tIDw9IHdpbmRvdy5pbm5lckhlaWdodCArIGJ1ZmZlciAmJlxuICAgICAgICByZWN0LnJpZ2h0IDw9IHdpbmRvdy5pbm5lcldpZHRoICsgYnVmZmVyXG4gICAgKTtcbn1cbiIsImltcG9ydCBnZXRTY3JvbGxSZW1haW5pbmcgZnJvbSAnLi9nZXRTY3JvbGxSZW1haW5pbmcnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc1BhZ2VFbmQoYnVmZmVyID0gMCkge1xuICAgIHJldHVybiBnZXRTY3JvbGxSZW1haW5pbmcoKSA8PSBidWZmZXI7XG59XG4iLCJpbXBvcnQgZXZlbnRCdXMgZnJvbSAnLi4vZXZlbnRzL2V2ZW50QnVzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVzaXplKGRlYm91Y2VEZWxheSA9IDUwMCkge1xuXG4gICAgbGV0IHRpbWVvdXRJZDtcblxuICAgIC8vIG9yaWVudGF0aW9uY2hhbmdlIHRvbz9cblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SWQpO1xuICAgICAgICB0aW1lb3V0SWQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiBldmVudEJ1cy5lbWl0KCdyZXNpemUnKSwgZGVib3VjZURlbGF5KTtcbiAgICB9KTtcbn1cbiIsImltcG9ydCBldmVudEJ1cyBmcm9tICcuLi9ldmVudHMvZXZlbnRCdXMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzY3JvbGwoY2FsbE5vdyA9IGZhbHNlKSB7XG5cbiAgICBsZXQgbGFzdFNjcm9sbFkgPSAwLFxuICAgICAgICB0aWNraW5nID0gZmFsc2UsXG4gICAgICAgIHRpbWVvdXRJZDtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XG4gICAgICAgIHRpbWVvdXRJZCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IGV2ZW50QnVzLmVtaXQoJ3Njcm9sbGVuZCcsIGxhc3RTY3JvbGxZKSwgMjAwKTtcblxuICAgICAgICBldmVudEJ1cy5lbWl0KCdzY3JvbGwnLCBsYXN0U2Nyb2xsWSk7XG4gICAgICAgIHRpY2tpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXF1ZXN0VGljaygpIHtcbiAgICAgICAgaWYgKCF0aWNraW5nKSB7XG4gICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSk7XG4gICAgICAgICAgICB0aWNraW5nID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uU2Nyb2xsKCkge1xuICAgICAgICAvLyBsYXN0U2Nyb2xsWSA9IHdpbmRvdy5zY3JvbGxZO1xuICAgICAgICBsYXN0U2Nyb2xsWSA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgICAgICByZXF1ZXN0VGljaygpO1xuICAgIH1cblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBvblNjcm9sbCwgZmFsc2UpO1xuXG4gICAgaWYgKGNhbGxOb3cpIHtcbiAgICAgICAgb25TY3JvbGwoKTtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZXRTdHlsZShlbCwgc3R5bGUpIHtcbiAgICBPYmplY3Qua2V5cyhzdHlsZSkuZm9yRWFjaCgocHJvcCkgPT4ge1xuICAgICAgICBlbC5zdHlsZVtwcm9wXSA9IHN0eWxlW3Byb3BdO1xuICAgIH0pO1xuICAgIHJldHVybiBlbDtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRyYW5zaXRpb25FbmQoZWwsIGNiLCB0aW1lb3V0ID0gMTAwMCkge1xuXG4gICAgbGV0IHRpbWVvdXRJZDtcblxuICAgIGZ1bmN0aW9uIGhhbmRsZXIoKSB7XG4gICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGltZW91dElkKTtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGhhbmRsZXIpO1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCd3ZWJraXRUcmFuc2l0aW9uRW5kJywgaGFuZGxlcik7XG4gICAgICAgIGNiKCk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBlbC5zdHlsZS50cmFuc2l0aW9uICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgaGFuZGxlcik7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZWwuc3R5bGUuV2Via2l0VHJhbnNpdGlvbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignd2Via2l0VHJhbnNpdGlvbkVuZCcsIGhhbmRsZXIpO1xuICAgIH1cblxuICAgIHRpbWVvdXRJZCA9IHdpbmRvdy5zZXRUaW1lb3V0KGhhbmRsZXIsIHRpbWVvdXQpO1xufVxuIiwiZnVuY3Rpb24gZWFzZUluQmFjayh0LCBiLCBjLCBkLCBzID0gMS43MDE1OCkge1xuICAgIHJldHVybiBjICogKHQgLz0gZCkgKiB0ICogKChzICsgMSkgKiB0IC0gcykgKyBiO1xufVxuXG5mdW5jdGlvbiBlYXNlT3V0QmFjayh0LCBiLCBjLCBkLCBzID0gMS43MDE1OCkge1xuICAgIHJldHVybiBjICogKCh0ID0gdCAvIGQgLSAxKSAqIHQgKiAoKHMgKyAxKSAqIHQgKyBzKSArIDEpICsgYjtcbn1cblxuZnVuY3Rpb24gZWFzZUluT3V0QmFjayh0LCBiLCBjLCBkLCBzID0gMS43MDE1OCkge1xuICAgIGlmICgodCAvPSBkIC8gMikgPCAxKSB7XG4gICAgICAgIHJldHVybiBjIC8gMiAqICh0ICogdCAqICgoKHMgKj0gKDEuNTI1KSkgKyAxKSAqIHQgLSBzKSkgKyBiO1xuICAgIH1cbiAgICByZXR1cm4gYyAvIDIgKiAoKHQgLT0gMikgKiB0ICogKCgocyAqPSAoMS41MjUpKSArIDEpICogdCArIHMpICsgMikgKyBiO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZWFzZUluOiBlYXNlSW5CYWNrLFxuICAgIGVhc2VPdXQ6IGVhc2VPdXRCYWNrLFxuICAgIGVhc2VJbk91dDogZWFzZUluT3V0QmFja1xufTtcblxuZXhwb3J0IHtcbiAgICBlYXNlSW5CYWNrLFxuICAgIGVhc2VPdXRCYWNrLFxuICAgIGVhc2VJbk91dEJhY2tcbn07XG4iLCJmdW5jdGlvbiBlYXNlT3V0Qm91bmNlKHQsIGIsIGMsIGQpIHtcbiAgICBpZiAoKHQgLz0gZCkgPCAoMSAvIDIuNzUpKSB7XG4gICAgICAgIHJldHVybiBjICogKDcuNTYyNSAqIHQgKiB0KSArIGI7XG4gICAgfSBlbHNlIGlmICh0IDwgKDIgLyAyLjc1KSkge1xuICAgICAgICByZXR1cm4gYyAqICg3LjU2MjUgKiAodCAtPSAoMS41IC8gMi43NSkpICogdCArIDAuNzUpICsgYjtcbiAgICB9IGVsc2UgaWYgKHQgPCAoMi41IC8gMi43NSkpIHtcbiAgICAgICAgcmV0dXJuIGMgKiAoNy41NjI1ICogKHQgLT0gKDIuMjUgLyAyLjc1KSkgKiB0ICsgMC45Mzc1KSArIGI7XG4gICAgfVxuICAgIHJldHVybiBjICogKDcuNTYyNSAqICh0IC09ICgyLjYyNSAvIDIuNzUpKSAqIHQgKyAwLjk4NDM3NSkgKyBiO1xufVxuXG5mdW5jdGlvbiBlYXNlSW5Cb3VuY2UodCwgYiwgYywgZCkge1xuICAgIHJldHVybiBjIC0gZWFzZU91dEJvdW5jZShkIC0gdCwgMCwgYywgZCkgKyBiO1xufVxuXG5mdW5jdGlvbiBlYXNlSW5PdXRCb3VuY2UodCwgYiwgYywgZCkge1xuICAgIGlmICh0IDwgZCAvIDIpIHtcbiAgICAgICAgcmV0dXJuIGVhc2VJbkJvdW5jZSh0ICogMiwgMCwgYywgZCkgKiAwLjUgKyBiO1xuICAgIH1cbiAgICByZXR1cm4gZWFzZU91dEJvdW5jZSh0ICogMiAtIGQsIDAsIGMsIGQpICogMC41ICsgYyAqIDAuNSArIGI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBlYXNlSW46IGVhc2VJbkJvdW5jZSxcbiAgICBlYXNlT3V0OiBlYXNlT3V0Qm91bmNlLFxuICAgIGVhc2VJbk91dDogZWFzZUluT3V0Qm91bmNlXG59O1xuXG5leHBvcnQge1xuICAgIGVhc2VJbkJvdW5jZSxcbiAgICBlYXNlT3V0Qm91bmNlLFxuICAgIGVhc2VJbk91dEJvdW5jZVxufTtcbiIsImNvbnN0IHtzcXJ0fSA9IE1hdGg7XG5cbmZ1bmN0aW9uIGVhc2VJbkNpcmN1bGFyKHQsIGIsIGMsIGQpIHtcbiAgICByZXR1cm4gLWMgKiAoc3FydCgxIC0gKHQgLz0gZCkgKiB0KSAtIDEpICsgYjtcbn1cblxuZnVuY3Rpb24gZWFzZU91dENpcmN1bGFyKHQsIGIsIGMsIGQpIHtcbiAgICByZXR1cm4gYyAqIHNxcnQoMSAtICh0ID0gdCAvIGQgLSAxKSAqIHQpICsgYjtcbn1cblxuZnVuY3Rpb24gZWFzZUluT3V0Q2lyY3VsYXIodCwgYiwgYywgZCkge1xuICAgIGlmICgodCAvPSBkIC8gMikgPCAxKSB7XG4gICAgICAgIHJldHVybiAtYyAvIDIgKiAoc3FydCgxIC0gdCAqIHQpIC0gMSkgKyBiO1xuICAgIH1cbiAgICByZXR1cm4gYyAvIDIgKiAoc3FydCgxIC0gKHQgLT0gMikgKiB0KSArIDEpICsgYjtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGVhc2VJbjogZWFzZUluQ2lyY3VsYXIsXG4gICAgZWFzZU91dDogZWFzZU91dENpcmN1bGFyLFxuICAgIGVhc2VJbk91dDogZWFzZUluT3V0Q2lyY3VsYXJcbn07XG5cbmV4cG9ydCB7XG4gICAgZWFzZUluQ2lyY3VsYXIsXG4gICAgZWFzZU91dENpcmN1bGFyLFxuICAgIGVhc2VJbk91dENpcmN1bGFyXG59O1xuIiwiZnVuY3Rpb24gZWFzZUluQ3ViaWModCwgYiwgYywgZCkge1xuICAgIHJldHVybiBjICogKHQgLz0gZCkgKiB0ICogdCArIGI7XG59XG5cbmZ1bmN0aW9uIGVhc2VPdXRDdWJpYyh0LCBiLCBjLCBkKSB7XG4gICAgcmV0dXJuIGMgKiAoKHQgPSB0IC8gZCAtIDEpICogdCAqIHQgKyAxKSArIGI7XG59XG5cbmZ1bmN0aW9uIGVhc2VJbk91dEN1YmljKHQsIGIsIGMsIGQpIHtcbiAgICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkge1xuICAgICAgICByZXR1cm4gYyAvIDIgKiB0ICogdCAqIHQgKyBiO1xuICAgIH1cbiAgICByZXR1cm4gYyAvIDIgKiAoKHQgLT0gMikgKiB0ICogdCArIDIpICsgYjtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGVhc2VJbjogZWFzZUluQ3ViaWMsXG4gICAgZWFzZU91dDogZWFzZU91dEN1YmljLFxuICAgIGVhc2VJbk91dDogZWFzZUluT3V0Q3ViaWNcbn07XG5cbmV4cG9ydCB7XG4gICAgZWFzZUluQ3ViaWMsXG4gICAgZWFzZU91dEN1YmljLFxuICAgIGVhc2VJbk91dEN1YmljXG59O1xuIiwiY29uc3Qge2FicywgYXNpbiwgUEksIHBvdywgc2lufSA9IE1hdGg7XG5jb25zdCBQSV8yID0gUEkgKiAyO1xuXG5mdW5jdGlvbiBlYXNlSW5FbGFzdGljKHQsIGIsIGMsIGQsIGEsIHApIHtcbiAgICBsZXQgcztcbiAgICBpZiAodCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gYjtcbiAgICB9XG4gICAgaWYgKCh0IC89IGQpID09PSAxKSB7XG4gICAgICAgIHJldHVybiBiICsgYztcbiAgICB9XG4gICAgaWYgKCFwKSB7XG4gICAgICAgIHAgPSBkICogMC4zO1xuICAgIH1cbiAgICBpZiAoIWEgfHwgYSA8IGFicyhjKSkge1xuICAgICAgICBhID0gYztcbiAgICAgICAgcyA9IHAgLyA0O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHMgPSBwIC8gUElfMiAqIGFzaW4oYyAvIGEpO1xuICAgIH1cbiAgICByZXR1cm4gLShhICogcG93KDIsIDEwICogKHQgLT0gMSkpICogc2luKCh0ICogZCAtIHMpICogUElfMiAvIHApKSArIGI7XG59XG5cbmZ1bmN0aW9uIGVhc2VPdXRFbGFzdGljKHQsIGIsIGMsIGQsIGEsIHApIHtcbiAgICBsZXQgcztcbiAgICBpZiAodCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gYjtcbiAgICB9XG4gICAgaWYgKCh0IC89IGQpID09PSAxKSB7XG4gICAgICAgIHJldHVybiBiICsgYztcbiAgICB9XG4gICAgaWYgKCFwKSB7XG4gICAgICAgIHAgPSBkICogMC4zO1xuICAgIH1cbiAgICBpZiAoIWEgfHwgYSA8IGFicyhjKSkge1xuICAgICAgICBhID0gYztcbiAgICAgICAgcyA9IHAgLyA0O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHMgPSBwIC8gUElfMiAqIGFzaW4oYyAvIGEpO1xuICAgIH1cbiAgICByZXR1cm4gKGEgKiBwb3coMiwgLTEwICogdCkgKiBzaW4oKHQgKiBkIC0gcykgKiBQSV8yIC8gcCkgKyBjICsgYik7XG59XG5cbmZ1bmN0aW9uIGVhc2VJbk91dEVsYXN0aWModCwgYiwgYywgZCwgYSwgcCkge1xuICAgIGxldCBzO1xuICAgIGlmICh0ID09PSAwKSB7XG4gICAgICAgIHJldHVybiBiO1xuICAgIH1cbiAgICBpZiAoKHQgLz0gZCAvIDIpID09PSAyKSB7XG4gICAgICAgIHJldHVybiBiICsgYztcbiAgICB9XG4gICAgaWYgKCFwKSB7XG4gICAgICAgIHAgPSBkICogKDAuMyAqIDEuNSk7XG4gICAgfVxuICAgIGlmICghYSB8fCBhIDwgYWJzKGMpKSB7XG4gICAgICAgIGEgPSBjO1xuICAgICAgICBzID0gcCAvIDQ7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcyA9IHAgLyBQSV8yICogYXNpbihjIC8gYSk7XG4gICAgfVxuICAgIGlmICh0IDwgMSkge1xuICAgICAgICByZXR1cm4gLTAuNSAqIChhICogcG93KDIsIDEwICogKHQgLT0gMSkpICogc2luKCh0ICogZCAtIHMpICogUElfMiAvIHApKSArIGI7XG4gICAgfVxuICAgIHJldHVybiBhICogcG93KDIsIC0xMCAqICh0IC09IDEpKSAqIHNpbigodCAqIGQgLSBzKSAqIFBJXzIgLyBwKSAqIDAuNSArIGMgKyBiO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZWFzZUluOiBlYXNlSW5FbGFzdGljLFxuICAgIGVhc2VPdXQ6IGVhc2VPdXRFbGFzdGljLFxuICAgIGVhc2VJbk91dDogZWFzZUluT3V0RWxhc3RpY1xufTtcblxuZXhwb3J0IHtcbiAgICBlYXNlSW5FbGFzdGljLFxuICAgIGVhc2VPdXRFbGFzdGljLFxuICAgIGVhc2VJbk91dEVsYXN0aWNcbn07XG4iLCJjb25zdCB7cG93fSA9IE1hdGg7XG5cbmZ1bmN0aW9uIGVhc2VJbkV4cG8odCwgYiwgYywgZCkge1xuICAgIHJldHVybiB0ID09PSAwID8gYiA6IGMgKiBwb3coMiwgMTAgKiAodCAvIGQgLSAxKSkgKyBiO1xufVxuXG5mdW5jdGlvbiBlYXNlT3V0RXhwbyh0LCBiLCBjLCBkKSB7XG4gICAgcmV0dXJuIHQgPT09IGQgPyBiICsgYyA6IGMgKiAoLXBvdygyLCAtMTAgKiB0IC8gZCkgKyAxKSArIGI7XG59XG5cbmZ1bmN0aW9uIGVhc2VJbk91dEV4cG8odCwgYiwgYywgZCkge1xuICAgIGlmICh0ID09PSAwKSB7XG4gICAgICAgIHJldHVybiBiO1xuICAgIH1cbiAgICBpZiAodCA9PT0gZCkge1xuICAgICAgICByZXR1cm4gYiArIGM7XG4gICAgfVxuICAgIGlmICgodCAvPSBkIC8gMikgPCAxKSB7XG4gICAgICAgIHJldHVybiBjIC8gMiAqIHBvdygyLCAxMCAqICh0IC0gMSkpICsgYjtcbiAgICB9XG4gICAgcmV0dXJuIGMgLyAyICogKC1wb3coMiwgLTEwICogLS10KSArIDIpICsgYjtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGVhc2VJbjogZWFzZUluRXhwbyxcbiAgICBlYXNlT3V0OiBlYXNlT3V0RXhwbyxcbiAgICBlYXNlSW5PdXQ6IGVhc2VJbk91dEV4cG9cbn07XG5cbmV4cG9ydCB7XG4gICAgZWFzZUluRXhwbyxcbiAgICBlYXNlT3V0RXhwbyxcbiAgICBlYXNlSW5PdXRFeHBvXG59O1xuIiwiaW1wb3J0IGJhY2ssIHtlYXNlSW5CYWNrLCBlYXNlT3V0QmFjaywgZWFzZUluT3V0QmFja30gZnJvbSAnLi9iYWNrJztcbmltcG9ydCBib3VuY2UsIHtlYXNlSW5Cb3VuY2UsIGVhc2VPdXRCb3VuY2UsIGVhc2VJbk91dEJvdW5jZX0gZnJvbSAnLi9ib3VuY2UnO1xuaW1wb3J0IGNpcmN1bGFyLCB7ZWFzZUluQ2lyY3VsYXIsIGVhc2VPdXRDaXJjdWxhciwgZWFzZUluT3V0Q2lyY3VsYXJ9IGZyb20gJy4vY2lyY3VsYXInO1xuaW1wb3J0IGN1YmljLCB7ZWFzZUluQ3ViaWMsIGVhc2VPdXRDdWJpYywgZWFzZUluT3V0Q3ViaWN9IGZyb20gJy4vY3ViaWMnO1xuaW1wb3J0IGVsYXN0aWMsIHtlYXNlSW5FbGFzdGljLCBlYXNlT3V0RWxhc3RpYywgZWFzZUluT3V0RWxhc3RpY30gZnJvbSAnLi9lbGFzdGljJztcbmltcG9ydCBleHBvLCB7ZWFzZUluRXhwbywgZWFzZU91dEV4cG8sIGVhc2VJbk91dEV4cG99IGZyb20gJy4vZXhwbyc7XG5pbXBvcnQgbGluZWFyLCB7ZWFzZUxpbmVhcn0gZnJvbSAnLi9saW5lYXInO1xuaW1wb3J0IHF1YWQsIHtlYXNlSW5RdWFkLCBlYXNlT3V0UXVhZCwgZWFzZUluT3V0UXVhZH0gZnJvbSAnLi9xdWFkJztcbmltcG9ydCBxdWFydCwge2Vhc2VJblF1YXJ0LCBlYXNlT3V0UXVhcnQsIGVhc2VJbk91dFF1YXJ0fSBmcm9tICcuL3F1YXJ0JztcbmltcG9ydCBxdWludCwge2Vhc2VJblF1aW50LCBlYXNlT3V0UXVpbnQsIGVhc2VJbk91dFF1aW50fSBmcm9tICcuL3F1aW50JztcbmltcG9ydCBzaW5lLCB7ZWFzZUluU2luZSwgZWFzZU91dFNpbmUsIGVhc2VJbk91dFNpbmV9IGZyb20gJy4vc2luZSc7XG5cbmV4cG9ydCB7XG4gICAgYmFjayxcbiAgICBib3VuY2UsXG4gICAgY2lyY3VsYXIsXG4gICAgY3ViaWMsXG4gICAgZWxhc3RpYyxcbiAgICBleHBvLFxuICAgIGxpbmVhcixcbiAgICBxdWFkLFxuICAgIHF1YXJ0LFxuICAgIHF1aW50LFxuICAgIHNpbmUsXG4gICAgZWFzZUxpbmVhcixcbiAgICBlYXNlSW5CYWNrLFxuICAgIGVhc2VPdXRCYWNrLFxuICAgIGVhc2VJbk91dEJhY2ssXG4gICAgZWFzZUluQm91bmNlLFxuICAgIGVhc2VPdXRCb3VuY2UsXG4gICAgZWFzZUluT3V0Qm91bmNlLFxuICAgIGVhc2VJbkNpcmN1bGFyLFxuICAgIGVhc2VPdXRDaXJjdWxhcixcbiAgICBlYXNlSW5PdXRDaXJjdWxhcixcbiAgICBlYXNlSW5DdWJpYyxcbiAgICBlYXNlT3V0Q3ViaWMsXG4gICAgZWFzZUluT3V0Q3ViaWMsXG4gICAgZWFzZUluRWxhc3RpYyxcbiAgICBlYXNlT3V0RWxhc3RpYyxcbiAgICBlYXNlSW5PdXRFbGFzdGljLFxuICAgIGVhc2VJbkV4cG8sXG4gICAgZWFzZU91dEV4cG8sXG4gICAgZWFzZUluT3V0RXhwbyxcbiAgICBlYXNlSW5RdWFkLFxuICAgIGVhc2VPdXRRdWFkLFxuICAgIGVhc2VJbk91dFF1YWQsXG4gICAgZWFzZUluUXVhcnQsXG4gICAgZWFzZU91dFF1YXJ0LFxuICAgIGVhc2VJbk91dFF1YXJ0LFxuICAgIGVhc2VJblF1aW50LFxuICAgIGVhc2VPdXRRdWludCxcbiAgICBlYXNlSW5PdXRRdWludCxcbiAgICBlYXNlSW5TaW5lLFxuICAgIGVhc2VPdXRTaW5lLFxuICAgIGVhc2VJbk91dFNpbmVcbn07XG5cbi8qXG5URVJNUyBPRiBVU0UgLSBFQVNJTkcgRVFVQVRJT05TXG5cbk9wZW4gc291cmNlIHVuZGVyIHRoZSBCU0QgTGljZW5zZS5cblxuQ29weXJpZ2h0IMKpIDIwMDEgUm9iZXJ0IFBlbm5lclxuQWxsIHJpZ2h0cyByZXNlcnZlZC5cblxuUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0XG5tb2RpZmljYXRpb24sIGFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcblxuUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLCB0aGlzXG5saXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cblJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSwgdGhpc1xubGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb24gYW5kL29yXG5vdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuTmVpdGhlciB0aGUgbmFtZSBvZiB0aGUgYXV0aG9yIG5vciB0aGUgbmFtZXMgb2YgY29udHJpYnV0b3JzIG1heSBiZSB1c2VkIHRvXG5lbmRvcnNlIG9yIHByb21vdGUgcHJvZHVjdHMgZGVyaXZlZCBmcm9tIHRoaXMgc29mdHdhcmUgd2l0aG91dCBzcGVjaWZpY1xucHJpb3Igd3JpdHRlbiBwZXJtaXNzaW9uLlxuVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCJcbkFORCBBTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEVcbklNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRVxuRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBPV05FUiBPUiBDT05UUklCVVRPUlMgQkUgTElBQkxFIEZPUlxuQU5ZIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTXG4oSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7XG5MT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT05cbkFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUXG4oSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJU1xuU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4qL1xuIiwiZnVuY3Rpb24gZWFzZUxpbmVhcih0LCBiLCBjLCBkKSB7XG4gICAgcmV0dXJuIGMgKiB0IC8gZCArIGI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBlYXNlSW46IGVhc2VMaW5lYXIsXG4gICAgZWFzZU91dDogZWFzZUxpbmVhcixcbiAgICBlYXNlSW5PdXQ6IGVhc2VMaW5lYXJcbn07XG5cbmV4cG9ydCB7XG4gICAgZWFzZUxpbmVhclxufTtcbiIsImZ1bmN0aW9uIGVhc2VJblF1YWQodCwgYiwgYywgZCkge1xuICAgIHJldHVybiBjICogKHQgLz0gZCkgKiB0ICsgYjtcbn1cblxuZnVuY3Rpb24gZWFzZU91dFF1YWQodCwgYiwgYywgZCkge1xuICAgIHJldHVybiAtYyAqICh0IC89IGQpICogKHQgLSAyKSArIGI7XG59XG5cbmZ1bmN0aW9uIGVhc2VJbk91dFF1YWQodCwgYiwgYywgZCkge1xuICAgIGlmICgodCAvPSBkIC8gMikgPCAxKSB7XG4gICAgICAgIHJldHVybiBjIC8gMiAqIHQgKiB0ICsgYjtcbiAgICB9XG4gICAgcmV0dXJuIC1jIC8gMiAqICgoLS10KSAqICh0IC0gMikgLSAxKSArIGI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBlYXNlSW46IGVhc2VJblF1YWQsXG4gICAgZWFzZU91dDogZWFzZU91dFF1YWQsXG4gICAgZWFzZUluT3V0OiBlYXNlSW5PdXRRdWFkXG59O1xuXG5leHBvcnQge1xuICAgIGVhc2VJblF1YWQsXG4gICAgZWFzZU91dFF1YWQsXG4gICAgZWFzZUluT3V0UXVhZFxufTtcbiIsImZ1bmN0aW9uIGVhc2VJblF1YXJ0KHQsIGIsIGMsIGQpIHtcbiAgICByZXR1cm4gYyAqICh0IC89IGQpICogdCAqIHQgKiB0ICsgYjtcbn1cblxuZnVuY3Rpb24gZWFzZU91dFF1YXJ0KHQsIGIsIGMsIGQpIHtcbiAgICByZXR1cm4gLWMgKiAoKHQgPSB0IC8gZCAtIDEpICogdCAqIHQgKiB0IC0gMSkgKyBiO1xufVxuXG5mdW5jdGlvbiBlYXNlSW5PdXRRdWFydCh0LCBiLCBjLCBkKSB7XG4gICAgaWYgKCh0IC89IGQgLyAyKSA8IDEpIHtcbiAgICAgICAgcmV0dXJuIGMgLyAyICogdCAqIHQgKiB0ICogdCArIGI7XG4gICAgfVxuICAgIHJldHVybiAtYyAvIDIgKiAoKHQgLT0gMikgKiB0ICogdCAqIHQgLSAyKSArIGI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBlYXNlSW46IGVhc2VJblF1YXJ0LFxuICAgIGVhc2VPdXQ6IGVhc2VPdXRRdWFydCxcbiAgICBlYXNlSW5PdXQ6IGVhc2VJbk91dFF1YXJ0XG59O1xuXG5leHBvcnQge1xuICAgIGVhc2VJblF1YXJ0LFxuICAgIGVhc2VPdXRRdWFydCxcbiAgICBlYXNlSW5PdXRRdWFydFxufTtcbiIsImZ1bmN0aW9uIGVhc2VJblF1aW50KHQsIGIsIGMsIGQpIHtcbiAgICByZXR1cm4gYyAqICh0IC89IGQpICogdCAqIHQgKiB0ICogdCArIGI7XG59XG5cbmZ1bmN0aW9uIGVhc2VPdXRRdWludCh0LCBiLCBjLCBkKSB7XG4gICAgcmV0dXJuIGMgKiAoKHQgPSB0IC8gZCAtIDEpICogdCAqIHQgKiB0ICogdCArIDEpICsgYjtcbn1cblxuZnVuY3Rpb24gZWFzZUluT3V0UXVpbnQodCwgYiwgYywgZCkge1xuICAgIGlmICgodCAvPSBkIC8gMikgPCAxKSB7XG4gICAgICAgIHJldHVybiBjIC8gMiAqIHQgKiB0ICogdCAqIHQgKiB0ICsgYjtcbiAgICB9XG4gICAgcmV0dXJuIGMgLyAyICogKCh0IC09IDIpICogdCAqIHQgKiB0ICogdCArIDIpICsgYjtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGVhc2VJbjogZWFzZUluUXVpbnQsXG4gICAgZWFzZU91dDogZWFzZU91dFF1aW50LFxuICAgIGVhc2VJbk91dDogZWFzZUluT3V0UXVpbnRcbn07XG5cbmV4cG9ydCB7XG4gICAgZWFzZUluUXVpbnQsXG4gICAgZWFzZU91dFF1aW50LFxuICAgIGVhc2VJbk91dFF1aW50XG59O1xuIiwiY29uc3Qge2NvcywgUEksIHNpbn0gPSBNYXRoO1xuY29uc3QgUElfRDIgPSBQSSAvIDI7XG5cbmZ1bmN0aW9uIGVhc2VJblNpbmUodCwgYiwgYywgZCkge1xuICAgIHJldHVybiAtYyAqIGNvcyh0IC8gZCAqIFBJX0QyKSArIGMgKyBiO1xufVxuXG5mdW5jdGlvbiBlYXNlT3V0U2luZSh0LCBiLCBjLCBkKSB7XG4gICAgcmV0dXJuIGMgKiBzaW4odCAvIGQgKiBQSV9EMikgKyBiO1xufVxuXG5mdW5jdGlvbiBlYXNlSW5PdXRTaW5lKHQsIGIsIGMsIGQpIHtcbiAgICByZXR1cm4gLWMgLyAyICogKGNvcyhQSSAqIHQgLyBkKSAtIDEpICsgYjtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGVhc2VJbjogZWFzZUluU2luZSxcbiAgICBlYXNlT3V0OiBlYXNlT3V0U2luZSxcbiAgICBlYXNlSW5PdXQ6IGVhc2VJbk91dFNpbmVcbn07XG5cbmV4cG9ydCB7XG4gICAgZWFzZUluU2luZSxcbiAgICBlYXNlT3V0U2luZSxcbiAgICBlYXNlSW5PdXRTaW5lXG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGVib3VuY2UoaGFuZGxlcikge1xuICAgIGxldCB0aWNraW5nID0gZmFsc2U7XG5cbiAgICBmdW5jdGlvbiB1cGRhdGUoZXZlbnQpIHtcbiAgICAgICAgaGFuZGxlcihldmVudCk7XG4gICAgICAgIHRpY2tpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXF1ZXN0VGljayhldmVudCkge1xuICAgICAgICBpZiAoIXRpY2tpbmcpIHtcbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdXBkYXRlKGV2ZW50KSk7XG4gICAgICAgICAgICB0aWNraW5nID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXF1ZXN0VGljaztcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRlbGVnYXRlRXZlbnRzKHBhcmVudEVsLCBldmVudFR5cGUsIGZpbHRlciwgZm4pIHtcblxuICAgIGlmICh0eXBlb2YgZmlsdGVyID09PSAnc3RyaW5nJykge1xuICAgICAgICBjb25zdCB0YWdOYW1lID0gZmlsdGVyLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIGZpbHRlciA9IHRhcmdldCA9PiB0YXJnZXQudGFnTmFtZSA9PT0gdGFnTmFtZTtcbiAgICB9XG5cbiAgICBwYXJlbnRFbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgKGV2ZW50KSA9PiB7XG4gICAgICAgIGxldCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG5cbiAgICAgICAgd2hpbGUgKHRhcmdldCAhPT0gcGFyZW50RWwpIHtcbiAgICAgICAgICAgIGlmIChmaWx0ZXIodGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIGZuKHRhcmdldCwgZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGU7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbiIsImltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tICdldmVudHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBlbWl0dGVyIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLnNldE1heExpc3RlbmVycygyMCk7XG4gICAgfVxuXG4gICAgb2ZmICh0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgICBpZiAobGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKHR5cGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgIH1cbn1cbiIsImltcG9ydCBlbWl0dGVyIGZyb20gJy4vZW1pdHRlcic7XG5cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5jcmVhdGUoZW1pdHRlci5wcm90b3R5cGUpO1xuIiwiaW1wb3J0IGVtaXR0ZXIgZnJvbSAnLi9lbWl0dGVyJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaGVhcnRiZWF0KGludGVydmFsKSB7XG4gICAgbGV0IGJlYXQgPSBudWxsLFxuICAgICAgICB0aW1lID0gMCxcbiAgICAgICAgbnVtVGltZXMgPSAwLFxuICAgICAgICBtYXhUaW1lcyA9IDAsXG4gICAgICAgIHJ1bm5pbmcgPSBmYWxzZTtcblxuICAgIGZ1bmN0aW9uIHN0YXJ0KG1heE51bVRpbWVzID0gMCwgdGltZU9mZnNldCA9IDApIHtcbiAgICAgICAgbWF4VGltZXMgPSBtYXhOdW1UaW1lcztcbiAgICAgICAgdGltZSA9IHRpbWVPZmZzZXQ7XG4gICAgICAgIG51bVRpbWVzID0gMDtcbiAgICAgICAgcnVubmluZyA9IHRydWU7XG4gICAgICAgIHJldHVybiBiZWF0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgICAgIHJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGJlYXQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlKGR0ID0gMSkge1xuICAgICAgICBpZiAoIXJ1bm5pbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBiZWF0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1heFRpbWVzID4gMCAmJiBudW1UaW1lcyA+PSBtYXhUaW1lcykge1xuICAgICAgICAgICAgcnVubmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgYmVhdC5lbWl0KCdjb21wbGV0ZScpO1xuICAgICAgICAgICAgcmV0dXJuIGJlYXQ7XG4gICAgICAgIH1cblxuICAgICAgICB0aW1lICs9IGR0O1xuXG4gICAgICAgIGlmICh0aW1lID49IGludGVydmFsKSB7XG4gICAgICAgICAgICB0aW1lID0gMDtcbiAgICAgICAgICAgIG51bVRpbWVzKys7XG4gICAgICAgICAgICBiZWF0LmVtaXQoJ3VwZGF0ZScsIG51bVRpbWVzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYmVhdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRJbnRlcnZhbCh2YWx1ZSkge1xuICAgICAgICBpbnRlcnZhbCA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gYmVhdDtcbiAgICB9XG5cbiAgICBiZWF0ID0gT2JqZWN0LmFzc2lnbihPYmplY3QuY3JlYXRlKGVtaXR0ZXIucHJvdG90eXBlKSwge1xuICAgICAgICBzdGFydCxcbiAgICAgICAgc3RvcCxcbiAgICAgICAgdXBkYXRlLFxuICAgICAgICBnZXQgaW50ZXJ2YWwoKSB7XG4gICAgICAgICAgICByZXR1cm4gaW50ZXJ2YWw7XG4gICAgICAgIH0sXG4gICAgICAgIHNldCBpbnRlcnZhbCh2YWx1ZSkge1xuICAgICAgICAgICAgaW50ZXJ2YWwgPSB2YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0SW50ZXJ2YWxcbiAgICB9KTtcblxuICAgIHJldHVybiBiZWF0O1xufVxuIiwiaW1wb3J0IGRlYm91bmNlIGZyb20gJy4vZGVib3VuY2UnO1xuaW1wb3J0IGRlbGVnYXRlRXZlbnRzIGZyb20gJy4vZGVsZWdhdGVFdmVudHMnO1xuaW1wb3J0IGVtaXR0ZXIgZnJvbSAnLi9lbWl0dGVyJztcbmltcG9ydCBldmVudEJ1cyBmcm9tICcuL2V2ZW50QnVzJztcbmltcG9ydCBoZWFydGJlYXQgZnJvbSAnLi9oZWFydGJlYXQnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZGVib3VuY2UsXG4gICAgZGVsZWdhdGVFdmVudHMsXG4gICAgZW1pdHRlcixcbiAgICBldmVudEJ1cyxcbiAgICBoZWFydGJlYXRcbn07XG4iLCJsZXQgdGltZSA9IDA7XG5sZXQgZnBzID0gMDtcbmxldCBjdXJyZW50RnBzID0gMDtcbmxldCBhdmVyYWdlRnBzID0gMDtcbmxldCB0aWNrcyA9IDA7XG5sZXQgdG90YWxGcHMgPSAwO1xubGV0IGxhc3RGcHMgPSAwO1xubGV0IGxhc3RBdmVyYWdlID0gMDtcbmxldCBsb2dNc2cgPSBudWxsO1xuXG5jb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuZWwuc2V0QXR0cmlidXRlKCdpZCcsICdmcHMnKTtcbmVsLnN0eWxlLmZvbnRGYW1pbHkgPSAnbW9ub3NwYWNlJztcbmVsLnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcbmVsLnN0eWxlLmxlZnQgPSAnMCc7XG5lbC5zdHlsZS50b3AgPSAnMCc7XG5lbC5zdHlsZS5wYWRkaW5nID0gJzJweCA2cHgnO1xuZWwuc3R5bGUuekluZGV4ID0gJzk5OTk5JztcbmVsLnN0eWxlLmJhY2tncm91bmQgPSAnIzAwMCc7XG5lbC5zdHlsZS5jb2xvciA9ICcjZmZmJztcbmVsLnN0eWxlLmZvbnRTaXplID0gJzEwcHgnO1xuZWwuc3R5bGUudXNlclNlbGVjdCA9ICdub25lJztcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWwpO1xuXG5mdW5jdGlvbiByZXBvcnQoKSB7XG4gICAgbGFzdEZwcyA9IGN1cnJlbnRGcHM7XG4gICAgbGFzdEF2ZXJhZ2UgPSBhdmVyYWdlRnBzO1xuICAgIGVsLmlubmVySFRNTCA9IGBGUFM6ICR7Y3VycmVudEZwc308YnIgLz5BVkU6ICR7YXZlcmFnZUZwc31gO1xuXG4gICAgaWYgKGxvZ01zZykge1xuICAgICAgICBlbC5pbm5lckhUTUwgPSBgJHtlbC5pbm5lckhUTUx9PGJyIC8+TVNHOiAke2xvZ01zZ31gO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlKG5vdykge1xuICAgIGlmICh0eXBlb2Ygbm93ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBub3cgPSBEYXRlLm5vdygpO1xuICAgIH1cblxuICAgIGlmICh0aW1lID09PSAwKSB7XG4gICAgICAgIHRpbWUgPSBub3c7XG4gICAgfVxuXG4gICAgaWYgKG5vdyAtIDEwMDAgPiB0aW1lKSB7XG4gICAgICAgIHRpbWUgPSBub3c7XG4gICAgICAgIGN1cnJlbnRGcHMgPSBmcHM7XG4gICAgICAgIGZwcyA9IDA7XG5cbiAgICAgICAgaWYgKGN1cnJlbnRGcHMgPiAxKSB7XG4gICAgICAgICAgICB0aWNrcysrO1xuICAgICAgICAgICAgdG90YWxGcHMgKz0gY3VycmVudEZwcztcbiAgICAgICAgICAgIGF2ZXJhZ2VGcHMgPSBNYXRoLmZsb29yKHRvdGFsRnBzIC8gdGlja3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGN1cnJlbnRGcHMgIT09IGxhc3RGcHMgfHwgYXZlcmFnZUZwcyAhPT0gbGFzdEF2ZXJhZ2UpIHtcbiAgICAgICAgICAgIHJlcG9ydCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnBzKys7XG59XG5cbmZ1bmN0aW9uIGF1dG8oKSB7XG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShhdXRvKTtcbiAgICB1cGRhdGUoKTtcbn1cblxuZnVuY3Rpb24gbG9nKHZhbHVlKSB7XG4gICAgbG9nTXNnID0gU3RyaW5nKHZhbHVlKTtcbiAgICByZXBvcnQoKTtcbn1cblxuZnVuY3Rpb24gc3R5bGUocHJvcHMpIHtcbiAgICBPYmplY3Qua2V5cyhwcm9wcykuZm9yRWFjaCgocHJvcCkgPT4ge1xuICAgICAgICBlbC5zdHlsZVtwcm9wXSA9IHByb3BzW3Byb3BdO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYXV0byxcbiAgICBlbCxcbiAgICBsb2csXG4gICAgc3R5bGUsXG4gICAgdXBkYXRlXG59O1xuIiwibGV0IHJlcXVlc3QgPSBudWxsLFxuICAgIGV4aXQgPSBudWxsLFxuICAgIGNoYW5nZSA9IG51bGwsXG4gICAgZXJyb3IgPSBudWxsLFxuICAgIGVsZW1lbnQgPSBudWxsLFxuICAgIGVuYWJsZWQgPSBudWxsO1xuXG5jb25zdCBkb2NFbCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuaWYgKHR5cGVvZiBkb2NFbC5yZXF1ZXN0RnVsbHNjcmVlbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXF1ZXN0ID0gJ3JlcXVlc3RGdWxsc2NyZWVuJztcbiAgICBleGl0ID0gJ2V4aXRGdWxsc2NyZWVuJztcbiAgICBjaGFuZ2UgPSAnZnVsbHNjcmVlbmNoYW5nZSc7XG4gICAgZXJyb3IgPSAnZnVsbHNjcmVlbmVycm9yJztcbiAgICBlbGVtZW50ID0gJ2Z1bGxzY3JlZW5FbGVtZW50JztcbiAgICBlbmFibGVkID0gJ2Z1bGxzY3JlZW5FbmFibGVkJztcbn0gZWxzZSBpZiAodHlwZW9mIGRvY0VsLm1velJlcXVlc3RGdWxsU2NyZWVuICE9PSAndW5kZWZpbmVkJykge1xuICAgIHJlcXVlc3QgPSAnbW96UmVxdWVzdEZ1bGxTY3JlZW4nO1xuICAgIGV4aXQgPSAnbW96Q2FuY2VsRnVsbFNjcmVlbic7XG4gICAgY2hhbmdlID0gJ21vemZ1bGxzY3JlZW5jaGFuZ2UnO1xuICAgIGVycm9yID0gJ21vemZ1bGxzY3JlZW5lcnJvcic7XG4gICAgZWxlbWVudCA9ICdtb3pGdWxsU2NyZWVuRWxlbWVudCc7XG4gICAgZW5hYmxlZCA9ICdtb3pGdWxsU2NyZWVuRW5hYmxlZCc7XG59IGVsc2UgaWYgKHR5cGVvZiBkb2NFbC5tc1JlcXVlc3RGdWxsc2NyZWVuICE9PSAndW5kZWZpbmVkJykge1xuICAgIHJlcXVlc3QgPSAnbXNSZXF1ZXN0RnVsbHNjcmVlbic7XG4gICAgZXhpdCA9ICdtc0V4aXRGdWxsc2NyZWVuJztcbiAgICBjaGFuZ2UgPSAnTVNGdWxsc2NyZWVuQ2hhbmdlJztcbiAgICBlcnJvciA9ICdNU0Z1bGxzY3JlZW5FcnJvcic7XG4gICAgZWxlbWVudCA9ICdtc0Z1bGxzY3JlZW5FbGVtZW50JztcbiAgICBlbmFibGVkID0gJ21zRnVsbHNjcmVlbkVuYWJsZWQnO1xufSBlbHNlIGlmICh0eXBlb2YgZG9jRWwud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmVxdWVzdCA9ICd3ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbic7XG4gICAgZXhpdCA9ICd3ZWJraXRFeGl0RnVsbHNjcmVlbic7XG4gICAgY2hhbmdlID0gJ3dlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UnO1xuICAgIGVycm9yID0gJ3dlYmtpdEZ1bGxzY3JlZW5FcnJvcic7XG4gICAgZWxlbWVudCA9ICd3ZWJraXRGdWxsc2NyZWVuRWxlbWVudCc7XG4gICAgZW5hYmxlZCA9ICd3ZWJraXRGdWxsc2NyZWVuRW5hYmxlZCc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICByZXF1ZXN0LFxuICAgIGV4aXQsXG4gICAgY2hhbmdlLFxuICAgIGVycm9yLFxuICAgIGVsZW1lbnQsXG4gICAgZW5hYmxlZFxufTtcbiIsImltcG9ydCBhcGkgZnJvbSAnLi9hcGknO1xuaW1wb3J0IGVtaXR0ZXIgZnJvbSAnLi4vZXZlbnRzL2VtaXR0ZXInO1xuXG5jb25zdCBmdWxsc2NyZWVuID0gT2JqZWN0LmNyZWF0ZShlbWl0dGVyLnByb3RvdHlwZSk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoYXBpLmNoYW5nZSwgKGV2ZW50KSA9PiB7XG4gICAgZnVsbHNjcmVlbi5lbWl0KCdjaGFuZ2UnLCBldmVudCk7XG59KTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihhcGkuZXJyb3IsIChldmVudCkgPT4ge1xuICAgIGZ1bGxzY3JlZW4uZW1pdCgnZXJyb3InLCBldmVudCk7XG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoZnVsbHNjcmVlbiwge1xuICAgIHJlcXVlc3Q6IHtcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uKGVsKSB7XG4gICAgICAgICAgICBlbCA9IGVsIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgICAgIGVsW2FwaS5yZXF1ZXN0XSh0cnVlKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZXhpdDoge1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBkb2N1bWVudFthcGkuZXhpdF0oKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgdG9nZ2xlOiB7XG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbihlbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5leGl0KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucmVxdWVzdChlbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGlzU3VwcG9ydGVkOiB7XG4gICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgIHJldHVybiAhIWFwaS5yZXF1ZXN0O1xuICAgICAgICB9XG4gICAgfSxcbiAgICBpc0Z1bGxzY3JlZW46IHtcbiAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgcmV0dXJuICEhZG9jdW1lbnRbYXBpLmVsZW1lbnRdO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBlbGVtZW50OiB7XG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudFthcGkuZWxlbWVudF07XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGVuYWJsZWQ6IHtcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50W2FwaS5lbmFibGVkXTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBmdWxsc2NyZWVuO1xuIiwiZnVuY3Rpb24gZ2V0Q29sb3VyKHIsIGcsIGIsIGEgPSAxKSB7XG4gICAgaWYgKHR5cGVvZiByID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gcjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiByID09PSAnbnVtYmVyJykge1xuICAgICAgICByZXR1cm4gYHJnYmEoJHtyfSwke2J9LCR7Z30sJHthfSlgO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JhcGhpY3Mge1xuICAgIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB3aWR0aCA9PT0gJ29iamVjdCcgJiYgd2lkdGgudGFnTmFtZSA9PT0gJ0NBTlZBUycpIHtcbiAgICAgICAgICAgIHRoaXMuY2FudmFzID0gd2lkdGg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICAgICAgdGhpcy5zaXplKHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICB9XG5cbiAgICBnZXQgYWxwaGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmN0eC5nbG9iYWxBbHBoYTtcbiAgICB9XG5cbiAgICBzZXQgYWxwaGEodmFsdWUpIHtcbiAgICAgICAgdGhpcy5jdHguZ2xvYmFsQWxwaGEgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgYmxlbmRNb2RlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uO1xuICAgIH1cblxuICAgIHNldCBibGVuZE1vZGUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5jdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IGNvbnRleHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmN0eDtcbiAgICB9XG5cbiAgICBmaWxsKHIsIGcsIGIsIGEgPSAxKSB7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IGdldENvbG91cihyLCBnLCBiLCBhKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc3Ryb2tlKHIsIGcsIGIsIGEgPSAxKSB7XG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gZ2V0Q29sb3VyKHIsIGcsIGIsIGEpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBjaXJjbGUoeCwgeSwgcmFkaXVzKSB7XG4gICAgICAgIGNvbnN0IHtjdHh9ID0gdGhpcztcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguYXJjKHgsIHksIHJhZGl1cywgMCwgTWF0aC5QSSAqIDIsIGZhbHNlKTtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcmVjdCh4LCB5LCB3aWR0aCwgaGVpZ2h0LCBhbmdsZSA9IDApIHtcbiAgICAgICAgY29uc3Qge2N0eH0gPSB0aGlzO1xuICAgICAgICBpZiAoYW5nbGUgIT09IDApIHtcbiAgICAgICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgICAgICBjdHgudHJhbnNsYXRlKHggKyB3aWR0aCAvIDIsIHkgKyBoZWlnaHQgLyAyKTtcbiAgICAgICAgICAgIGN0eC5yb3RhdGUoYW5nbGUpO1xuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY3R4LnJlY3QoLXdpZHRoIC8gMiwgLWhlaWdodCAvIDIsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjdHgucmVjdCh4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgbGluZSh4MSwgeTEsIHgyLCB5Mikge1xuICAgICAgICBjb25zdCB7Y3R4fSA9IHRoaXM7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4Lm1vdmVUbyh4MSwgeTEpO1xuICAgICAgICBjdHgubGluZVRvKHgyLCB5Mik7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgbGluZVdpZHRoKHdpZHRoKSB7XG4gICAgICAgIHRoaXMuY3R4LmxpbmVXaWR0aCA9IHdpZHRoO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBtb3ZlKHgsIHkpIHtcbiAgICAgICAgdGhpcy5jdHgubW92ZVRvKHgsIHkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBpbWFnZShlbCwgeCwgeSwgb3B0aW9ucykge1xuICAgICAgICBjb25zdCB7Y3R4fSA9IHRoaXM7XG4gICAgICAgIGlmIChvcHRpb25zKSB7XG4gICAgICAgICAgICBjb25zdCB7YWxwaGEgPSAxLCByb3RhdGlvbiA9IDAsIHNjYWxlID0gMX0gPSBvcHRpb25zO1xuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0WCA9IGVsLndpZHRoIC8gMjtcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldFkgPSBlbC5oZWlnaHQgLyAyO1xuICAgICAgICAgICAgY3R4LnNhdmUoKTtcbiAgICAgICAgICAgIGN0eC50cmFuc2xhdGUoeCArIG9mZnNldFgsIHkgKyBvZmZzZXRZKTtcbiAgICAgICAgICAgIGN0eC5yb3RhdGUocm90YXRpb24pO1xuICAgICAgICAgICAgY3R4LnNjYWxlKHNjYWxlLCBzY2FsZSk7XG4gICAgICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSBhbHBoYTtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoZWwsIC1vZmZzZXRYLCAtb2Zmc2V0WSk7XG4gICAgICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShlbCwgeCwgeSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgdGV4dChzdHIsIHgsIHkpIHtcbiAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoc3RyLCB4LCB5KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2V0Rm9udFN0eWxlKGZhbWlseSwgc2l6ZSkge1xuICAgICAgICB0aGlzLmN0eC5mb250ID0gYCR7c2l6ZX1weCAke2ZhbWlseX1gO1xuICAgIH1cblxuICAgIGdldEltYWdlRGF0YSh4ID0gMCwgeSA9IDAsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgY29uc3Qge2N0eCwgY2FudmFzfSA9IHRoaXM7XG4gICAgICAgIHJldHVybiBjdHguZ2V0SW1hZ2VEYXRhKHgsIHksIHdpZHRoIHx8IGNhbnZhcy53aWR0aCwgaGVpZ2h0IHx8IGNhbnZhcy5oZWlnaHQpO1xuICAgIH1cblxuICAgIGdldFBpeGVsKHgsIHkpIHtcbiAgICAgICAgeCA9IE1hdGguZmxvb3IoeCk7XG4gICAgICAgIHkgPSBNYXRoLmZsb29yKHkpO1xuICAgICAgICBjb25zdCB7ZGF0YX0gPSB0aGlzLmN0eC5nZXRJbWFnZURhdGEoeCwgeSwgMSwgMSk7XG4gICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkYXRhKTtcbiAgICB9XG5cbiAgICBzZXRQaXhlbCh4LCB5LCByLCBnLCBiLCBhKSB7XG4gICAgICAgIHggPSBNYXRoLmZsb29yKHgpO1xuICAgICAgICB5ID0gTWF0aC5mbG9vcih5KTtcbiAgICAgICAgY29uc3Qge3dpZHRoLCBkYXRhfSA9IHRoaXMuZ2V0SW1hZ2VEYXRhKCk7XG4gICAgICAgIGNvbnN0IGkgPSAoeCArIHkgKiB3aWR0aCkgKiA0O1xuICAgICAgICBkYXRhW2kgKyAwXSA9IHI7XG4gICAgICAgIGRhdGFbaSArIDFdID0gZztcbiAgICAgICAgZGF0YVtpICsgMl0gPSBiO1xuICAgICAgICBkYXRhW2kgKyAzXSA9IGE7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGNsZWFyQ2lyY2xlKHgsIHksIHJhZGl1cyA9IDIwKSB7XG4gICAgICAgIGNvbnN0IHtjdHh9ID0gdGhpcztcbiAgICAgICAgY3R4LnNhdmUoKTtcbiAgICAgICAgY3R4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdkZXN0aW5hdGlvbi1vdXQnO1xuICAgICAgICB0aGlzLmNpcmNsZSh4LCB5LCByYWRpdXMpO1xuICAgICAgICBjdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ3NvdXJjZS1vdmVyJztcbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgdHJhbnNsYXRlQW5kKHgsIHksIGZuKSB7XG4gICAgICAgIGNvbnN0IHtjdHh9ID0gdGhpcztcbiAgICAgICAgY3R4LnNhdmUoKTtcbiAgICAgICAgY3R4LnRyYW5zbGF0ZSh4LCB5KTtcbiAgICAgICAgZm4oY3R4KTtcbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgY2xlYXIociwgZywgYiwgYSA9IDEpIHtcbiAgICAgICAgY29uc3QgY29sb3IgPSBnZXRDb2xvdXIociwgZywgYiwgYSk7XG4gICAgICAgIGNvbnN0IHtjdHh9ID0gdGhpcztcbiAgICAgICAgY29uc3Qge3dpZHRoLCBoZWlnaHR9ID0gdGhpcy5jYW52YXM7XG4gICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgIGN0eC5zZXRUcmFuc2Zvcm0oMSwgMCwgMCwgMSwgMCwgMCk7XG4gICAgICAgIGlmIChjb2xvcikge1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgfVxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNpemUod2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCwgaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0KSB7XG4gICAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FudmFzLnBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuY2FudmFzLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQodGhpcy5jYW52YXMpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2FudmFzID0gbnVsbDtcbiAgICAgICAgdGhpcy5jdHggPSBudWxsO1xuICAgIH1cbn1cbiIsImltcG9ydCBsb2FkU2NyaXB0IGZyb20gJy4uL2h0dHAvbG9hZFNjcmlwdCc7XG5pbXBvcnQgaXNMb2NhbEhvc3QgZnJvbSAnLi4vcGxhdGZvcm0vaXNMb2NhbEhvc3QnO1xuXG4vLyBleGFtcGxlIHVzYWdlOlxuLy9cbi8vIGNvbnN0IG9wdHMgPSB7XG4vLyAgICAgZnJpY3Rpb246IDAuOSxcbi8vICAgICBtYXhTcGVlZDogMVxuLy8gfTtcbi8vIGd1aSh0cnVlKVxuLy8gICAgIC50aGVuKChnKSA9PiB7XG4vLyAgICAgICAgIGcuYWRkKG9wdHMsICdmcmljdGlvbicsIDAuNywgMC45OTkpO1xuLy8gICAgICAgICBnLmFkZChvcHRzLCAnbWF4U3BlZWQnLCAwLjUsIDIpLm9uQ2hhbmdlKCh2YWx1ZSkgPT4gY29uc29sZS5sb2codmFsdWUpKTtcbi8vICAgICB9KVxuLy8gICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmVycm9yKGVycikpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBndWkobG9jYWxob3N0T25seSA9IGZhbHNlKSB7XG4gICAgaWYgKGxvY2FsaG9zdE9ubHkgJiYgIWlzTG9jYWxIb3N0KCkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKCgpID0+IHt9KTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgbG9hZFNjcmlwdCgnaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvZGF0LWd1aS8wLjYuMS9kYXQuZ3VpLm1pbi5qcycsIChlcnIsIHNyYykgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGxvYWRpbmcgc2NyaXB0Jywgc3JjKTtcbiAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdFcnJvciBsb2FkaW5nIHNjcmlwdCcpKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBnID0gbmV3IHdpbmRvdy5kYXQuR1VJKHthdXRvUGxhY2U6IHRydWV9KTtcblxuICAgICAgICAgICAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgICAgICAgICBjb25zdCBzID0gc3R5bGUuc2hlZXQ7XG4gICAgICAgICAgICBzLmluc2VydFJ1bGUoJy5kZy5hYyB7b3ZlcmZsb3c6IHZpc2libGUgIWltcG9ydGFudDsgei1pbmRleDoxMDAwMCAhaW1wb3J0YW50fScsIDApO1xuICAgICAgICAgICAgcy5pbnNlcnRSdWxlKCcuZGcgKiB7Zm9udC1zaXplOjExcHggIWltcG9ydGFudH0nLCAwKTtcbiAgICAgICAgICAgIHMuaW5zZXJ0UnVsZSgnLmRnIGlucHV0IHtmb250OjExcHggTHVjaWRhIEdyYW5kZSxzYW5zLXNlcmlmICFpbXBvcnRhbnR9JywgMCk7XG5cbiAgICAgICAgICAgIHJlc29sdmUoZyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG5ndWkuaXNMb2NhbEhvc3QgPSBpc0xvY2FsSG9zdDtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldExvY2F0aW9uKGhyZWYpIHtcbiAgICBjb25zdCBsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGwuaHJlZiA9IGhyZWY7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBoYXNoOiBsLmhhc2gsXG4gICAgICAgIGhvc3Q6IGwuaG9zdCxcbiAgICAgICAgaG9zdG5hbWU6IGwuaG9zdG5hbWUsXG4gICAgICAgIHBhdGhuYW1lOiBsLnBhdGhuYW1lLFxuICAgICAgICBwb3J0OiBsLnBvcnQsXG4gICAgICAgIHByb3RvY29sOiBsLnByb3RvY29sLFxuICAgICAgICBzZWFyY2g6IGwuc2VhcmNoXG4gICAgfTtcbn1cbiIsImltcG9ydCBnZXRMb2NhdGlvbiBmcm9tICcuL2dldExvY2F0aW9uJztcbmltcG9ydCBqc29ucCBmcm9tICcuL2pzb25wJztcbmltcG9ydCBsb2FkU2NyaXB0IGZyb20gJy4vbG9hZFNjcmlwdCc7XG5pbXBvcnQgdXJsUGFyYW1zIGZyb20gJy4vdXJsUGFyYW1zJztcbmltcG9ydCB4aHIgZnJvbSAnLi94aHInO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZ2V0TG9jYXRpb24sXG4gICAganNvbnAsXG4gICAgbG9hZFNjcmlwdCxcbiAgICB1cmxQYXJhbXMsXG4gICAgeGhyXG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ganNvbnAodXJsLCBjYiwgdGltZW91dCA9IDUwMDApIHtcbiAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICBjb25zdCBjYWxsYmFjayA9IGBqc29ucF9jYWxsYmFja18ke01hdGgucm91bmQoMTAwMDAwICogTWF0aC5yYW5kb20oKSl9YDtcbiAgICBjb25zdCBzZXBhcmF0b3IgPSB1cmwuaW5kZXhPZignPycpID49IDAgPyAnJicgOiAnPyc7XG5cbiAgICBjb25zdCB0aW1lb3V0SWQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHdpbmRvd1tjYWxsYmFja10obnVsbCwgJ2pzb25wIGVycm9yJyk7XG4gICAgfSwgdGltZW91dCk7XG5cbiAgICB3aW5kb3dbY2FsbGJhY2tdID0gZnVuY3Rpb24oZGF0YSwgZXJyID0gbnVsbCkge1xuICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XG4gICAgICAgIGRlbGV0ZSB3aW5kb3dbY2FsbGJhY2tdO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHNjcmlwdCk7XG4gICAgICAgIGNiKGRhdGEsIGVycik7XG4gICAgfTtcblxuICAgIHNjcmlwdC5zcmMgPSBgJHt1cmx9JHtzZXBhcmF0b3J9Y2FsbGJhY2s9JHtjYWxsYmFja31gO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvYWRTY3JpcHQoc3JjLCBjYikge1xuICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgIHNjcmlwdC5zcmMgPSBzcmM7XG4gICAgc2NyaXB0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiBjYihudWxsLCBzcmMpKTtcbiAgICBzY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoKSA9PiBjYih0cnVlLCBzcmMpKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgcmV0dXJuIHNjcmlwdDtcbn1cbiIsImNvbnN0IHBsdXMgPSAvXFwrL2c7ICAvLyBtYXRjaCAnKycgc3ltYm9sXG5jb25zdCBzZWFyY2ggPSAvKFteJj1dKyk9PyhbXiZdKikvZztcblxuZnVuY3Rpb24gZGVjb2RlKHN0cikge1xuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoc3RyLnJlcGxhY2UocGx1cywgJyAnKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVybFBhcmFtcyhxdWVyeSkge1xuICAgIHF1ZXJ5ID0gcXVlcnkgfHwgd2luZG93LmxvY2F0aW9uLnNlYXJjaC5zbGljZSgxKTtcblxuICAgIGNvbnN0IHBhcmFtcyA9IHt9O1xuICAgIGxldCBtYXRjaCA9IHNlYXJjaC5leGVjKHF1ZXJ5KTtcbiAgICB3aGlsZSAobWF0Y2gpIHtcbiAgICAgICAgcGFyYW1zW2RlY29kZShtYXRjaFsxXSldID0gZGVjb2RlKG1hdGNoWzJdKTtcbiAgICAgICAgbWF0Y2ggPSBzZWFyY2guZXhlYyhxdWVyeSk7XG4gICAgfVxuICAgIHJldHVybiBwYXJhbXM7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB4aHIodXJsLCB0eXBlID0gJ2pzb24nKSB7XG4gICAgY29uc3QgcCA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgY29uc3QgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHJlcS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHJlc3BvbnNlID0gcmVxLnJlc3BvbnNlO1xuICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdqc29uJyAmJiB0eXBlb2YgcmVzcG9uc2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmVxLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgKCkgPT4gcmVqZWN0KHJlcS5zdGF0dXMpKTtcbiAgICAgICAgcmVxLm9wZW4oJ0dFVCcsIHVybCk7XG4gICAgICAgIHJlcS5yZXNwb25zZVR5cGUgPSB0eXBlO1xuICAgICAgICAvLyByZXEuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnKTtcbiAgICAgICAgcmVxLnNlbmQoKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcDtcbn1cbiIsImltcG9ydCAnLi9wb2x5ZmlsbCc7XG5pbXBvcnQgYXJyYXkgZnJvbSAnLi9hcnJheSc7XG5pbXBvcnQgZG9tIGZyb20gJy4vZG9tJztcbmltcG9ydCBlYXNlIGZyb20gJy4vZWFzZSc7XG5pbXBvcnQgZXZlbnRzIGZyb20gJy4vZXZlbnRzJztcbmltcG9ydCBmcHMgZnJvbSAnLi9mcHMnO1xuaW1wb3J0IGZ1bGxzY3JlZW4gZnJvbSAnLi9mdWxsc2NyZWVuJztcbmltcG9ydCBncmFwaGljcyBmcm9tICcuL2dyYXBoaWNzJztcbmltcG9ydCBndWkgZnJvbSAnLi9ndWknO1xuaW1wb3J0IGh0dHAgZnJvbSAnLi9odHRwJztcbmltcG9ydCBpbnB1dCBmcm9tICcuL2lucHV0JztcbmltcG9ydCBsaW5rZWRMaXN0IGZyb20gJy4vbGlua2VkLWxpc3QnO1xuaW1wb3J0IG1hdGggZnJvbSAnLi9tYXRoJztcbmltcG9ydCBtZWRpYSBmcm9tICcuL21lZGlhJztcbmltcG9ydCBvYmplY3QgZnJvbSAnLi9vYmplY3QnO1xuaW1wb3J0IG9iamVjdFBvb2wgZnJvbSAnLi9vYmplY3QtcG9vbCc7XG5pbXBvcnQgUGFydGljbGUgZnJvbSAnLi9wYXJ0aWNsZSc7XG5pbXBvcnQgUGFydGljbGVHcm91cCBmcm9tICcuL3BhcnRpY2xlJztcbmltcG9ydCBwbGF0Zm9ybSBmcm9tICcuL3BsYXRmb3JtJztcbmltcG9ydCBwb3B1cCBmcm9tICcuL3BvcHVwJztcbmltcG9ydCBRdWFkVHJlZSBmcm9tICcuL3F1YWQtdHJlZSc7XG5pbXBvcnQgc2hhcmUgZnJvbSAnLi9zaGFyZSc7XG5pbXBvcnQgc3RvcmFnZSBmcm9tICcuL3N0b3JhZ2UnO1xuaW1wb3J0IHN0cmluZyBmcm9tICcuL3N0cmluZyc7XG5pbXBvcnQgVGlja2VyIGZyb20gJy4vdGlja2VyJztcbmltcG9ydCB0cmFjayBmcm9tICcuL3RyYWNrJztcbmltcG9ydCBUd2VlbiBmcm9tICcuL3R3ZWVuJztcbmltcG9ydCB2aXNpYmlsaXR5IGZyb20gJy4vdmlzaWJpbGl0eSc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBhcnJheSxcbiAgICBkb20sXG4gICAgZWFzZSxcbiAgICBldmVudHMsXG4gICAgZnBzLFxuICAgIGZ1bGxzY3JlZW4sXG4gICAgZ3JhcGhpY3MsXG4gICAgZ3VpLFxuICAgIGh0dHAsXG4gICAgaW5wdXQsXG4gICAgbGlua2VkTGlzdCxcbiAgICBtYXRoLFxuICAgIG1lZGlhLFxuICAgIG9iamVjdCxcbiAgICBvYmplY3RQb29sLFxuICAgIFBhcnRpY2xlLFxuICAgIFBhcnRpY2xlR3JvdXAsXG4gICAgcGxhdGZvcm0sXG4gICAgcG9wdXAsXG4gICAgUXVhZFRyZWUsXG4gICAgc2hhcmUsXG4gICAgc3RvcmFnZSxcbiAgICBzdHJpbmcsXG4gICAgVGlja2VyLFxuICAgIFR3ZWVuLFxuICAgIHRyYWNrLFxuICAgIHZpc2liaWxpdHlcbn07XG4iLCJmdW5jdGlvbiBnZXRUZXN0KGVsKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZWwpKSB7XG4gICAgICAgIHJldHVybiB0YXJnZXQgPT4gZWwuaW5jbHVkZXModGFyZ2V0KTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBlbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gdGFyZ2V0ID0+IGVsKHRhcmdldCk7XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQgPT4gdGFyZ2V0ID09PSBlbDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2xpY2tPdXRzaWRlKGVsLCBmbikge1xuICAgIGNvbnN0IHRlc3QgPSBnZXRUZXN0KGVsKTtcblxuICAgIGZ1bmN0aW9uIG9uQ2xpY2tPdXRzaWRlKGV2ZW50KSB7XG4gICAgICAgIGxldCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIGxldCBpbnNpZGUgPSBmYWxzZTtcblxuICAgICAgICB3aGlsZSAodGFyZ2V0ICYmIHRhcmdldCAhPT0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgICAgICAgaWYgKHRlc3QodGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIGluc2lkZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaW5zaWRlKSB7XG4gICAgICAgICAgICBmbihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblRvdWNoT3V0c2lkZShldmVudCkge1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25DbGlja091dHNpZGUpO1xuICAgICAgICBvbkNsaWNrT3V0c2lkZShldmVudCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIG9uQ2xpY2tPdXRzaWRlKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0Jywgb25Ub3VjaE91dHNpZGUpO1xuICAgIH1cblxuICAgIGRlc3Ryb3koKTtcblxuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNsaWNrT3V0c2lkZSk7XG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0Jywgb25Ub3VjaE91dHNpZGUpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZGVzdHJveVxuICAgIH07XG59XG4iLCJpbXBvcnQgY2xpY2tPdXRzaWRlIGZyb20gJy4vY2xpY2tPdXRzaWRlJztcbmltcG9ydCBrZXlib2FyZCBmcm9tICcuL2tleWJvYXJkJztcbmltcG9ydCBrZXlJbnB1dCBmcm9tICcuL2tleUlucHV0JztcbmltcG9ydCBtaWNyb3Bob25lIGZyb20gJy4vbWljcm9waG9uZSc7XG5pbXBvcnQgbW91c2VMZWZ0V2luZG93IGZyb20gJy4vbW91c2VMZWZ0V2luZG93JztcbmltcG9ydCBtb3VzZVdoZWVsIGZyb20gJy4vbW91c2VXaGVlbCc7XG5pbXBvcnQgcG9pbnRlckNvb3JkcyBmcm9tICcuL3BvaW50ZXJDb29yZHMnO1xuaW1wb3J0IHRvdWNoSW5wdXQgZnJvbSAnLi90b3VjaElucHV0JztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGNsaWNrT3V0c2lkZSxcbiAgICBrZXlib2FyZCxcbiAgICBrZXlJbnB1dCxcbiAgICBtaWNyb3Bob25lLFxuICAgIG1vdXNlTGVmdFdpbmRvdyxcbiAgICBtb3VzZVdoZWVsLFxuICAgIHBvaW50ZXJDb29yZHMsXG4gICAgdG91Y2hJbnB1dFxufTtcbiIsImltcG9ydCBhcnJheSBmcm9tICcuLi9hcnJheS9hcnJheSc7XG5pbXBvcnQgZW1pdHRlciBmcm9tICcuLi9ldmVudHMvZW1pdHRlcic7XG5pbXBvcnQga2V5Ym9hcmQgZnJvbSAnLi9rZXlib2FyZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGtleUlucHV0KCkge1xuICAgIGNvbnN0IGFwaSA9IE9iamVjdC5jcmVhdGUoZW1pdHRlci5wcm90b3R5cGUpO1xuICAgIGNvbnN0IGtleXMgPSBhcnJheSgyNTYsIGZhbHNlKTtcblxuICAgIGZ1bmN0aW9uIGVtaXRLZXkoa2V5Q29kZSkge1xuICAgICAgICBjb25zdCBrZXlOYW1lID0gT2JqZWN0LmtleXMoa2V5Ym9hcmQpLnJlZHVjZSgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGtleWJvYXJkW2tleV0gPT09IGtleUNvZGUgPyBrZXkgOiB2YWx1ZTtcbiAgICAgICAgfSwgJycpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGlmIChrZXlOYW1lKSB7XG4gICAgICAgICAgICBhcGkuZW1pdChrZXlOYW1lLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25LZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGtleXNbZXZlbnQua2V5Q29kZV0gPSB0cnVlO1xuICAgICAgICBhcGkuZW1pdCgna2V5ZG93bicsIGV2ZW50LmtleUNvZGUpO1xuICAgICAgICBlbWl0S2V5KGV2ZW50LmtleUNvZGUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uS2V5VXAoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAga2V5c1tldmVudC5rZXlDb2RlXSA9IGZhbHNlO1xuICAgICAgICBhcGkuZW1pdCgna2V5dXAnLCBldmVudC5rZXlDb2RlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGQoKSB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbktleURvd24sIGZhbHNlKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBvbktleVVwLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25LZXlEb3duKTtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBvbktleVVwKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0Rvd24oa2V5KSB7XG4gICAgICAgIHJldHVybiBrZXlzW2tleV07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGVmdCgpIHtcbiAgICAgICAgcmV0dXJuIGtleXNba2V5Ym9hcmQuTEVGVF0gfHwga2V5c1trZXlib2FyZC5BXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByaWdodCgpIHtcbiAgICAgICAgcmV0dXJuIGtleXNba2V5Ym9hcmQuUklHSFRdIHx8IGtleXNba2V5Ym9hcmQuRF07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXAoKSB7XG4gICAgICAgIHJldHVybiBrZXlzW2tleWJvYXJkLlVQXSB8fCBrZXlzW2tleWJvYXJkLlddO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRvd24oKSB7XG4gICAgICAgIHJldHVybiBrZXlzW2tleWJvYXJkLkRPV05dIHx8IGtleXNba2V5Ym9hcmQuU107XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3BhY2UoKSB7XG4gICAgICAgIHJldHVybiBrZXlzW2tleWJvYXJkLlNQQUNFXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlbmFibGUodmFsdWUgPSB0cnVlKSB7XG4gICAgICAgIHJlbW92ZSgpO1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIGFkZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkKCk7XG5cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihhcGksIHtcbiAgICAgICAga2V5Ym9hcmQsXG4gICAgICAgIGVuYWJsZSxcbiAgICAgICAgaXNEb3duLFxuICAgICAgICBsZWZ0LFxuICAgICAgICByaWdodCxcbiAgICAgICAgdXAsXG4gICAgICAgIGRvd24sXG4gICAgICAgIHNwYWNlXG4gICAgfSk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gICAgQTogJ0EnLmNoYXJDb2RlQXQoMCksXG4gICAgQjogJ0InLmNoYXJDb2RlQXQoMCksXG4gICAgQzogJ0MnLmNoYXJDb2RlQXQoMCksXG4gICAgRDogJ0QnLmNoYXJDb2RlQXQoMCksXG4gICAgRTogJ0UnLmNoYXJDb2RlQXQoMCksXG4gICAgRjogJ0YnLmNoYXJDb2RlQXQoMCksXG4gICAgRzogJ0cnLmNoYXJDb2RlQXQoMCksXG4gICAgSDogJ0gnLmNoYXJDb2RlQXQoMCksXG4gICAgSTogJ0knLmNoYXJDb2RlQXQoMCksXG4gICAgSjogJ0onLmNoYXJDb2RlQXQoMCksXG4gICAgSzogJ0snLmNoYXJDb2RlQXQoMCksXG4gICAgTDogJ0wnLmNoYXJDb2RlQXQoMCksXG4gICAgTTogJ00nLmNoYXJDb2RlQXQoMCksXG4gICAgTjogJ04nLmNoYXJDb2RlQXQoMCksXG4gICAgTzogJ08nLmNoYXJDb2RlQXQoMCksXG4gICAgUDogJ1AnLmNoYXJDb2RlQXQoMCksXG4gICAgUTogJ1EnLmNoYXJDb2RlQXQoMCksXG4gICAgUjogJ1InLmNoYXJDb2RlQXQoMCksXG4gICAgUzogJ1MnLmNoYXJDb2RlQXQoMCksXG4gICAgVDogJ1QnLmNoYXJDb2RlQXQoMCksXG4gICAgVTogJ1UnLmNoYXJDb2RlQXQoMCksXG4gICAgVjogJ1YnLmNoYXJDb2RlQXQoMCksXG4gICAgVzogJ1cnLmNoYXJDb2RlQXQoMCksXG4gICAgWDogJ1gnLmNoYXJDb2RlQXQoMCksXG4gICAgWTogJ1knLmNoYXJDb2RlQXQoMCksXG4gICAgWjogJ1onLmNoYXJDb2RlQXQoMCksXG4gICAgWkVSTzogJzAnLmNoYXJDb2RlQXQoMCksXG4gICAgT05FOiAnMScuY2hhckNvZGVBdCgwKSxcbiAgICBUV086ICcyJy5jaGFyQ29kZUF0KDApLFxuICAgIFRIUkVFOiAnMycuY2hhckNvZGVBdCgwKSxcbiAgICBGT1VSOiAnNCcuY2hhckNvZGVBdCgwKSxcbiAgICBGSVZFOiAnNScuY2hhckNvZGVBdCgwKSxcbiAgICBTSVg6ICc2Jy5jaGFyQ29kZUF0KDApLFxuICAgIFNFVkVOOiAnNycuY2hhckNvZGVBdCgwKSxcbiAgICBFSUdIVDogJzgnLmNoYXJDb2RlQXQoMCksXG4gICAgTklORTogJzknLmNoYXJDb2RlQXQoMCksXG4gICAgTlVNUEFEXzA6IDk2LFxuICAgIE5VTVBBRF8xOiA5NyxcbiAgICBOVU1QQURfMjogOTgsXG4gICAgTlVNUEFEXzM6IDk5LFxuICAgIE5VTVBBRF80OiAxMDAsXG4gICAgTlVNUEFEXzU6IDEwMSxcbiAgICBOVU1QQURfNjogMTAyLFxuICAgIE5VTVBBRF83OiAxMDMsXG4gICAgTlVNUEFEXzg6IDEwNCxcbiAgICBOVU1QQURfOTogMTA1LFxuICAgIE5VTVBBRF9NVUxUSVBMWTogMTA2LFxuICAgIE5VTVBBRF9BREQ6IDEwNyxcbiAgICBOVU1QQURfRU5URVI6IDEwOCxcbiAgICBOVU1QQURfU1VCVFJBQ1Q6IDEwOSxcbiAgICBOVU1QQURfREVDSU1BTDogMTEwLFxuICAgIE5VTVBBRF9ESVZJREU6IDExMSxcbiAgICBGMTogMTEyLFxuICAgIEYyOiAxMTMsXG4gICAgRjM6IDExNCxcbiAgICBGNDogMTE1LFxuICAgIEY1OiAxMTYsXG4gICAgRjY6IDExNyxcbiAgICBGNzogMTE4LFxuICAgIEY4OiAxMTksXG4gICAgRjk6IDEyMCxcbiAgICBGMTA6IDEyMSxcbiAgICBGMTE6IDEyMixcbiAgICBGMTI6IDEyMyxcbiAgICBGMTM6IDEyNCxcbiAgICBGMTQ6IDEyNSxcbiAgICBGMTU6IDEyNixcbiAgICBDT0xPTjogMTg2LFxuICAgIEVRVUFMUzogMTg3LFxuICAgIFVOREVSU0NPUkU6IDE4OSxcbiAgICBRVUVTVElPTl9NQVJLOiAxOTEsXG4gICAgVElMREU6IDE5MixcbiAgICBPUEVOX0JSQUNLRVQ6IDIxOSxcbiAgICBCQUNLV0FSRF9TTEFTSDogMjIwLFxuICAgIENMT1NFRF9CUkFDS0VUOiAyMjEsXG4gICAgUVVPVEVTOiAyMjIsXG4gICAgQkFDS1NQQUNFOiA4LFxuICAgIFRBQjogOSxcbiAgICBDTEVBUjogMTIsXG4gICAgRU5URVI6IDEzLFxuICAgIFNISUZUOiAxNixcbiAgICBDT05UUk9MOiAxNyxcbiAgICBBTFQ6IDE4LFxuICAgIENBUFNfTE9DSzogMjAsXG4gICAgRVNDOiAyNyxcbiAgICBTUEFDRTogMzIsXG4gICAgUEFHRV9VUDogMzMsXG4gICAgUEFHRV9ET1dOOiAzNCxcbiAgICBFTkQ6IDM1LFxuICAgIEhPTUU6IDM2LFxuICAgIExFRlQ6IDM3LFxuICAgIFVQOiAzOCxcbiAgICBSSUdIVDogMzksXG4gICAgRE9XTjogNDAsXG4gICAgSU5TRVJUOiA0NSxcbiAgICBERUxFVEU6IDQ2LFxuICAgIEhFTFA6IDQ3LFxuICAgIE5VTV9MT0NLOiAxNDRcbn07XG4iLCJpbXBvcnQgZW1pdHRlciBmcm9tICcuLi9ldmVudHMvZW1pdHRlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1pY3JvcGhvbmUoKSB7XG4gICAgY29uc3QgbWljID0gT2JqZWN0LmNyZWF0ZShlbWl0dGVyLnByb3RvdHlwZSk7XG4gICAgbGV0IHN0cmVhbSA9IG51bGw7XG5cbiAgICBjb25zdCBnZXRVc2VyTWVkaWEgPSAobmF2aWdhdG9yLmdldFVzZXJNZWRpYSB8fFxuICAgICAgICBuYXZpZ2F0b3Iud2Via2l0R2V0VXNlck1lZGlhIHx8XG4gICAgICAgIG5hdmlnYXRvci5tb3pHZXRVc2VyTWVkaWEgfHxcbiAgICAgICAgbmF2aWdhdG9yLm1zR2V0VXNlck1lZGlhKTtcblxuICAgIGNvbnN0IGlzU3VwcG9ydGVkID0gISFnZXRVc2VyTWVkaWE7XG5cbiAgICBmdW5jdGlvbiBjb25uZWN0KCkge1xuICAgICAgICBpZiAoIWlzU3VwcG9ydGVkKSB7XG4gICAgICAgICAgICBtaWMuZW1pdCgnZXJyb3InLCAnTm90IHN1cHBvcnRlZCcpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGdldFVzZXJNZWRpYSh7XG4gICAgICAgICAgICBhdWRpbzogdHJ1ZVxuICAgICAgICB9LCAobWVkaWFTdHJlYW0pID0+IHtcbiAgICAgICAgICAgIHN0cmVhbSA9IG1lZGlhU3RyZWFtO1xuICAgICAgICAgICAgbWljLmVtaXQoJ2Nvbm5lY3QnLCBzdHJlYW0pO1xuICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGUubmFtZSA9PT0gJ1Blcm1pc3Npb25EZW5pZWRFcnJvcicgfHwgZSA9PT0gJ1BFUk1JU1NJT05fREVOSUVEJykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQZXJtaXNzaW9uIGRlbmllZC4gVW5kbyBieSBjbGlja2luZyB0aGUgY2FtZXJhIGljb24gaW4gdGhlIGFkZHJlc3MgYmFyJyk7XG4gICAgICAgICAgICAgICAgbWljLmVtaXQoJ2RlbmllZCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtaWMuZW1pdCgnZXJyb3InLCBlLm1lc3NhZ2UgfHwgZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRpc2Nvbm5lY3QoKSB7XG4gICAgICAgIGlmIChzdHJlYW0pIHtcbiAgICAgICAgICAgIHN0cmVhbS5zdG9wKCk7XG4gICAgICAgICAgICBzdHJlYW0gPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlV2ViQXVkaW9Tb3VyY2Uod2ViQXVkaW9Db250ZXh0LCBjb25uZWN0VG8pIHtcbiAgICAgICAgaWYgKCFzdHJlYW0pIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc291cmNlID0gd2ViQXVkaW9Db250ZXh0LmNyZWF0ZU1lZGlhU3RyZWFtU291cmNlKHN0cmVhbSk7XG5cbiAgICAgICAgaWYgKGNvbm5lY3RUbykge1xuICAgICAgICAgICAgc291cmNlLmNvbm5lY3QoY29ubmVjdFRvKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEhBQ0s6IHN0b3BzIG1veiBnYXJiYWdlIGNvbGxlY3Rpb24ga2lsbGluZyB0aGUgc3RyZWFtXG4gICAgICAgIC8vIHNlZSBodHRwczovL3N1cHBvcnQubW96aWxsYS5vcmcvZW4tVVMvcXVlc3Rpb25zLzk4NDE3OVxuICAgICAgICBpZiAobmF2aWdhdG9yLm1vekdldFVzZXJNZWRpYSkge1xuICAgICAgICAgICAgd2luZG93LmhhY2tfZm9yX21vemlsbGEgPSBzb3VyY2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc291cmNlO1xuICAgIH1cblxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKG1pYywge1xuICAgICAgICBjb25uZWN0LFxuICAgICAgICBkaXNjb25uZWN0LFxuICAgICAgICBjcmVhdGVXZWJBdWRpb1NvdXJjZSxcbiAgICAgICAgaXNTdXBwb3J0ZWQ6ICgpID0+IGlzU3VwcG9ydGVkLFxuICAgICAgICBzdHJlYW06ICgpID0+IHN0cmVhbVxuICAgIH0pO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbW91c2VMZWZ0V2luZG93KGZuKSB7XG4gICAgZnVuY3Rpb24gaGFuZGxlcihldmVudCkge1xuICAgICAgICBjb25zdCBmcm9tID0gZXZlbnQucmVsYXRlZFRhcmdldCB8fCBldmVudC50b0VsZW1lbnQ7XG4gICAgICAgIGlmICghZnJvbSB8fCBmcm9tLm5vZGVOYW1lID09PSAnSFRNTCcpIHtcbiAgICAgICAgICAgIGZuKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgaGFuZGxlciwgZmFsc2UpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZGVzdHJveSAoKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIGhhbmRsZXIpO1xuICAgICAgICB9XG4gICAgfTtcbn1cbiIsImltcG9ydCBlbWl0dGVyIGZyb20gJy4uL2V2ZW50cy9lbWl0dGVyJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbW91c2VXaGVlbChzcGVlZCkge1xuICAgIHNwZWVkID0gc3BlZWQgfHwgMjtcblxuICAgIGxldCB3aGVlbDtcblxuICAgIGZ1bmN0aW9uIHdoZWVsSGFuZGxlcihldmVudCkge1xuICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSAoZXZlbnQuZGV0YWlsIDwgMCB8fCBldmVudC53aGVlbERlbHRhID4gMCkgPyAxIDogLTE7XG4gICAgICAgIGNvbnN0IGRlbHRhID0gZGlyZWN0aW9uICogc3BlZWQ7XG5cbiAgICAgICAgaWYgKGRpcmVjdGlvbiA+IDApIHtcbiAgICAgICAgICAgIHdoZWVsLmVtaXQoJ3VwJywgZGVsdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2hlZWwuZW1pdCgnZG93bicsIGRlbHRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdoZWVsLmVtaXQoJ3VwZGF0ZScsIGRlbHRhKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGQoKSB7XG4gICAgICAgIGlmICgnb25tb3VzZXdoZWVsJyBpbiB3aW5kb3cpIHtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXdoZWVsJywgd2hlZWxIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSBpZiAod2luZG93LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Nb3VzZVNjcm9sbCcsIHdoZWVsSGFuZGxlciwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgICBpZiAoJ29ubW91c2V3aGVlbCcgaW4gd2luZG93KSB7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V3aGVlbCcsIHdoZWVsSGFuZGxlciwgZmFsc2UpO1xuICAgICAgICB9IGVsc2UgaWYgKHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignRE9NTW91c2VTY3JvbGwnLCB3aGVlbEhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZCgpO1xuXG4gICAgd2hlZWwgPSBPYmplY3QuY3JlYXRlKGVtaXR0ZXIucHJvdG90eXBlLCB7XG4gICAgICAgIF9ldmVudHM6IHtcbiAgICAgICAgICAgIHZhbHVlOiB7fVxuICAgICAgICB9LFxuICAgICAgICBhZGQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiBhZGRcbiAgICAgICAgfSxcbiAgICAgICAgcmVtb3ZlOiB7XG4gICAgICAgICAgICB2YWx1ZTogcmVtb3ZlXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBPYmplY3QuZnJlZXplKHdoZWVsKTtcbn1cbiIsImltcG9ydCBnZXRQYWdlSGVpZ2h0IGZyb20gJy4uL2RvbS9nZXRQYWdlSGVpZ2h0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcG9pbnRlckNvb3JkcygpIHtcbiAgICBsZXQgc2VsZiA9IG51bGw7XG5cbiAgICBmdW5jdGlvbiBjYWxjdWxhdGVDb29yZHMoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgdG91Y2ggPSBldmVudC50b3VjaGVzICYmIGV2ZW50LnRvdWNoZXMubGVuZ3RoO1xuICAgICAgICBjb25zdCBwID0gdG91Y2ggPyBldmVudC50b3VjaGVzWzBdIDogZXZlbnQ7XG4gICAgICAgIGNvbnN0IGNYID0gcC5jbGllbnRYIHx8IDA7XG4gICAgICAgIGNvbnN0IGNZID0gcC5jbGllbnRZIHx8IDA7XG4gICAgICAgIGNvbnN0IHBYID0gd2luZG93LnBhZ2VYT2Zmc2V0O1xuICAgICAgICBjb25zdCBwWSA9IHdpbmRvdy5wYWdlWU9mZnNldDtcbiAgICAgICAgc2VsZi5ldmVudCA9IGV2ZW50O1xuICAgICAgICBzZWxmLmNsaWVudFggPSBjWDtcbiAgICAgICAgc2VsZi5jbGllbnRZID0gY1k7XG4gICAgICAgIHNlbGYueCA9IGNYICsgcFg7XG4gICAgICAgIHNlbGYueSA9IGNZICsgcFk7XG4gICAgICAgIHNlbGYucGVyY2VudFggPSBzZWxmLnggLyB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgc2VsZi5wZXJjZW50WSA9IHNlbGYueSAvIGdldFBhZ2VIZWlnaHQoKTtcbiAgICB9XG5cbiAgICBzZWxmID0ge1xuICAgICAgICBldmVudDogbnVsbCxcbiAgICAgICAgY2xpZW50WDogMCxcbiAgICAgICAgY2xpZW50WTogMCxcbiAgICAgICAgeDogMCxcbiAgICAgICAgeTogMCxcbiAgICAgICAgcGVyY2VudFg6IDAsXG4gICAgICAgIHBlcmNlbnRZOiAwLFxuICAgICAgICBpc0xpc3RlbmluZzogZmFsc2UsXG5cbiAgICAgICAgb246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBjYWxjdWxhdGVDb29yZHMpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBjYWxjdWxhdGVDb29yZHMpO1xuICAgICAgICAgICAgc2VsZi5pc0xpc3RlbmluZyA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcbiAgICAgICAgb2ZmOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgY2FsY3VsYXRlQ29vcmRzKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgY2FsY3VsYXRlQ29vcmRzKTtcbiAgICAgICAgICAgIHNlbGYuaXNMaXN0ZW5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gc2VsZjtcbn1cbiIsImltcG9ydCBlbWl0dGVyIGZyb20gJy4uL2V2ZW50cy9lbWl0dGVyJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdG91Y2hJbnB1dChlbCkge1xuICAgIGVsID0gZWwgfHwgZG9jdW1lbnQuYm9keTtcblxuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIHN0YXJ0OiBbLTEsIC0xXSxcbiAgICAgICAgbW92ZTogWy0xLCAtMV0sXG4gICAgICAgIGVuZDogWy0xLCAtMV0sXG4gICAgICAgIHBvc2l0aW9uOiBbLTEsIC0xXSxcbiAgICAgICAgZGlzdGFuY2U6IFswLCAwXSxcbiAgICAgICAgZGlyZWN0aW9uOiBbJ25vbmUnLCAnbm9uZSddLFxuICAgICAgICB0b3VjaGluZzogZmFsc2UsXG4gICAgICAgIG9yaWdpbmFsRXZlbnQ6IG51bGxcbiAgICB9O1xuXG4gICAgbGV0IHNlbGY7XG5cbiAgICBmdW5jdGlvbiB0b3VjaEhhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgaWYgKCEoZXZlbnQgJiYgZXZlbnQudG91Y2hlcykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBkYXRhLm9yaWdpbmFsRXZlbnQgPSBldmVudDtcbiAgICAgICAgY29uc3QgdG91Y2ggPSBldmVudC50b3VjaGVzWzBdO1xuICAgICAgICBjb25zdCB4ID0gdG91Y2ggJiYgdG91Y2gucGFnZVg7XG4gICAgICAgIGNvbnN0IHkgPSB0b3VjaCAmJiB0b3VjaC5wYWdlWTtcblxuICAgICAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3RvdWNoc3RhcnQnOlxuICAgICAgICAgICAgICAgIGRhdGEuc3RhcnRbMF0gPSBkYXRhLm1vdmVbMF0gPSBkYXRhLmVuZFswXSA9IGRhdGEucG9zaXRpb25bMF0gPSB4O1xuICAgICAgICAgICAgICAgIGRhdGEuc3RhcnRbMV0gPSBkYXRhLm1vdmVbMV0gPSBkYXRhLmVuZFsxXSA9IGRhdGEucG9zaXRpb25bMV0gPSB5O1xuICAgICAgICAgICAgICAgIGRhdGEudG91Y2hpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHNlbGYuZW1pdCgnc3RhcnQnLCBkYXRhKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3RvdWNobW92ZSc6XG4gICAgICAgICAgICAgICAgZGF0YS5tb3ZlWzBdID0gZGF0YS5wb3NpdGlvblswXSA9IHg7XG4gICAgICAgICAgICAgICAgZGF0YS5tb3ZlWzFdID0gZGF0YS5wb3NpdGlvblsxXSA9IHk7XG4gICAgICAgICAgICAgICAgc2VsZi5lbWl0KCdtb3ZlJywgZGF0YSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd0b3VjaGVuZCc6XG4gICAgICAgICAgICAgICAgZGF0YS5lbmRbMF0gPSBkYXRhLnBvc2l0aW9uWzBdID0geDtcbiAgICAgICAgICAgICAgICBkYXRhLmVuZFsxXSA9IGRhdGEucG9zaXRpb25bMV0gPSB5O1xuICAgICAgICAgICAgICAgIGRhdGEudG91Y2hpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBzZWxmLmVtaXQoJ2VuZCcsIGRhdGEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDogYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaXN0ZW4oZWxlbSkge1xuICAgICAgICBlbCA9IGVsZW0gfHwgZWw7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0b3VjaEhhbmRsZXIpO1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0b3VjaEhhbmRsZXIpO1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRvdWNoSGFuZGxlcik7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAgIHNlbGYucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0b3VjaEhhbmRsZXIpO1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0b3VjaEhhbmRsZXIpO1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRvdWNoSGFuZGxlcik7XG4gICAgICAgIGVsID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfVxuXG4gICAgbGlzdGVuKGVsKTtcblxuICAgIHNlbGYgPSBPYmplY3QuY3JlYXRlKGVtaXR0ZXIucHJvdG90eXBlLCB7XG4gICAgICAgIF9ldmVudHM6IHtcbiAgICAgICAgICAgIHZhbHVlOiB7fVxuICAgICAgICB9LFxuICAgICAgICBsaXN0ZW46IHtcbiAgICAgICAgICAgIHZhbHVlOiBsaXN0ZW5cbiAgICAgICAgfSxcbiAgICAgICAgaXNEb3duOiB7XG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEudG91Y2hpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGdldFRvdWNoOiB7XG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGRlc3Ryb3k6IHtcbiAgICAgICAgICAgIHZhbHVlOiBkZXN0cm95XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBPYmplY3QuZnJlZXplKHNlbGYpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbGlua2VkTGlzdChhcnIgPSBbXSkge1xuXG4gICAgbGV0IGZpcnN0LFxuICAgICAgICBsYXN0O1xuXG4gICAgLypcbiAgICAgICAgaXRlbSA9IHtcbiAgICAgICAgICAgICduZXh0JzogbnVsbCxcbiAgICAgICAgICAgICdwcmV2JzogbnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGl0ZW0gPSBsaW5rZWRMaXN0LmdldEZpcnN0KCk7XG4gICAgICAgIHdoaWxlKGl0ZW0pIHtcbiAgICAgICAgICAgIC8vIGRvIHN0dWZmXG4gICAgICAgICAgICBpdGVtID0gaXRlbS5uZXh0O1xuICAgICAgICB9XG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIHJlbW92ZShpdGVtKSB7XG4gICAgICAgIGlmIChpdGVtLm5leHQpIHtcbiAgICAgICAgICAgIGl0ZW0ubmV4dC5wcmV2ID0gaXRlbS5wcmV2O1xuICAgICAgICB9XG4gICAgICAgIGlmIChpdGVtLnByZXYpIHtcbiAgICAgICAgICAgIGl0ZW0ucHJldi5uZXh0ID0gaXRlbS5uZXh0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChpdGVtID09PSBmaXJzdCkge1xuICAgICAgICAgICAgZmlyc3QgPSBpdGVtLm5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGl0ZW0gPT09IGxhc3QpIHtcbiAgICAgICAgICAgIGxhc3QgPSBpdGVtLnByZXY7XG4gICAgICAgIH1cbiAgICAgICAgaXRlbS5uZXh0ID0gaXRlbS5wcmV2ID0gbnVsbDtcblxuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnNlcnRBZnRlcihpdGVtLCBhZnRlcikge1xuICAgICAgICByZW1vdmUoaXRlbSk7XG5cbiAgICAgICAgaXRlbS5wcmV2ID0gYWZ0ZXI7XG4gICAgICAgIGl0ZW0ubmV4dCA9IGFmdGVyLm5leHQ7XG5cbiAgICAgICAgaWYgKCFhZnRlci5uZXh0KSB7XG4gICAgICAgICAgICBsYXN0ID0gaXRlbTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFmdGVyLm5leHQucHJldiA9IGl0ZW07XG4gICAgICAgIH1cblxuICAgICAgICBhZnRlci5uZXh0ID0gaXRlbTtcblxuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnNlcnRCZWZvcmUoaXRlbSwgYmVmb3JlKSB7XG4gICAgICAgIHJlbW92ZShpdGVtKTtcblxuICAgICAgICBpdGVtLnByZXYgPSBiZWZvcmUucHJldjtcbiAgICAgICAgaXRlbS5uZXh0ID0gYmVmb3JlO1xuXG4gICAgICAgIGlmICghYmVmb3JlLnByZXYpIHtcbiAgICAgICAgICAgIGZpcnN0ID0gaXRlbTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJlZm9yZS5wcmV2Lm5leHQgPSBpdGVtO1xuICAgICAgICB9XG5cbiAgICAgICAgYmVmb3JlLnByZXYgPSBpdGVtO1xuXG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZChpdGVtKSB7XG4gICAgICAgIGlmICghZmlyc3QpIHtcbiAgICAgICAgICAgIGZpcnN0ID0gbGFzdCA9IGl0ZW07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgaSA9IGZpcnN0O1xuICAgICAgICAgICAgd2hpbGUgKGkubmV4dCkge1xuICAgICAgICAgICAgICAgIGkgPSBpLm5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbnNlcnRBZnRlcihpdGVtLCBpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JFYWNoKGZuKSB7XG4gICAgICAgIGxldCBpdGVtID0gZmlyc3Q7XG4gICAgICAgIHdoaWxlIChpdGVtKSB7XG4gICAgICAgICAgICBmbihpdGVtKTtcbiAgICAgICAgICAgIGl0ZW0gPSBpdGVtLm5leHQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYXAoZm4pIHtcbiAgICAgICAgY29uc3QgbGlzdCA9IGxpbmtlZExpc3QoKTtcbiAgICAgICAgbGV0IGl0ZW0gPSBmaXJzdDtcbiAgICAgICAgd2hpbGUgKGl0ZW0pIHtcbiAgICAgICAgICAgIGxpc3QuYWRkKGZuKGl0ZW0pKTtcbiAgICAgICAgICAgIGl0ZW0gPSBpdGVtLm5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxpc3Q7XG4gICAgfVxuXG4gICAgYXJyLmZvckVhY2goKGl0ZW0pID0+IGFkZChpdGVtKSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBnZXQgZmlyc3QgKCkge1xuICAgICAgICAgICAgcmV0dXJuIGZpcnN0O1xuICAgICAgICB9LFxuICAgICAgICBnZXRGaXJzdCAoKSB7XG4gICAgICAgICAgICByZXR1cm4gZmlyc3Q7XG4gICAgICAgIH0sXG4gICAgICAgIGdldCBsYXN0ICgpIHtcbiAgICAgICAgICAgIHJldHVybiBsYXN0O1xuICAgICAgICB9LFxuICAgICAgICBnZXRMYXN0ICgpIHtcbiAgICAgICAgICAgIHJldHVybiBsYXN0O1xuICAgICAgICB9LFxuICAgICAgICBnZXQgbGVuZ3RoICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldENvdW50KCk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldENvdW50ICgpIHtcbiAgICAgICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgICAgICBsZXQgaSA9IGZpcnN0O1xuICAgICAgICAgICAgd2hpbGUgKGkpIHtcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgICAgIGkgPSBpLm5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY291bnQ7XG4gICAgICAgIH0sXG4gICAgICAgIGFkZCxcbiAgICAgICAgcmVtb3ZlLFxuICAgICAgICBpbnNlcnRBZnRlcixcbiAgICAgICAgaW5zZXJ0QmVmb3JlLFxuICAgICAgICBmb3JFYWNoLFxuICAgICAgICBtYXBcbiAgICB9O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYW5nbGUoeDEsIHkxLCB4MiwgeTIpIHtcbiAgICBjb25zdCBkeCA9IHgyIC0geDE7XG4gICAgY29uc3QgZHkgPSB5MiAtIHkxO1xuICAgIHJldHVybiBNYXRoLmF0YW4yKGR5LCBkeCk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjZXJwKGZyb20sIHRvLCB3ZWlnaHQgPSAwLjMpIHtcbiAgICBjb25zdCBmID0gKDEgLSBNYXRoLmNvcyh3ZWlnaHQgKiBNYXRoLlBJKSkgLyAyO1xuICAgIHJldHVybiAoZnJvbSAqICgxIC0gZikgKyB0byAqIGYpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2lyY2xlRGlzdHJpYnV0aW9uKHJhZGl1cywgb3JpZ2luID0ge3g6IDAsIHk6IDB9LCBwID0ge3g6IDAsIHk6IDB9KSB7XG4gICAgY29uc3QgciA9IE1hdGguc3FydChNYXRoLnJhbmRvbSgpKSAqIHJhZGl1cztcbiAgICBjb25zdCB0aGV0YSA9IE1hdGgucmFuZG9tKCkgKiBNYXRoLlBJICogMjtcbiAgICBwLnggPSBvcmlnaW4ueCArIE1hdGguY29zKHRoZXRhKSAqIHI7XG4gICAgcC55ID0gb3JpZ2luLnkgKyBNYXRoLnNpbih0aGV0YSkgKiByO1xuICAgIHJldHVybiBwO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2xhbXAodmFsdWUsIG1pbiwgbWF4KSB7XG4gICAgaWYgKG1pbiA+IG1heCkge1xuICAgICAgICBjb25zdCBhID0gbWluO1xuICAgICAgICBtaW4gPSBtYXg7XG4gICAgICAgIG1heCA9IGE7XG4gICAgfVxuICAgIGlmICh2YWx1ZSA8IG1pbikge1xuICAgICAgICByZXR1cm4gbWluO1xuICAgIH1cbiAgICBpZiAodmFsdWUgPiBtYXgpIHtcbiAgICAgICAgcmV0dXJuIG1heDtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29pblRvc3MoaGVhZHMgPSB0cnVlLCB0YWlscyA9IGZhbHNlKSB7XG4gICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgPiAwLjUgPyBoZWFkcyA6IHRhaWxzO1xufVxuIiwiLypcblRoZSBzaWduIHRlbGxzIHVzIGlmIGEgaXMgdG8gdGhlIGxlZnQgKC0pIG9yIHRoZSByaWdodCAoKykgb2YgYlxuKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyb3NzUHJvZHVjdDJkKGFYLCBhWSwgYlgsIGJZKSB7XG4gICAgcmV0dXJuIGFYICogYlkgLSBhWSAqIGJYO1xufVxuIiwiY29uc3QgREVHID0gMTgwIC8gTWF0aC5QSTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGVncmVlcyhyYWRpYW5zKSB7XG4gICAgcmV0dXJuIHJhZGlhbnMgKiBERUc7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkaWZmZXJlbmNlKGEsIGIpIHtcbiAgICByZXR1cm4gTWF0aC5hYnMoYSAtIGIpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGlzdGFuY2UoeDEsIHkxLCB4MiwgeTIpIHtcbiAgICBjb25zdCBkeCA9IHgxIC0geDI7XG4gICAgY29uc3QgZHkgPSB5MSAtIHkyO1xuICAgIHJldHVybiBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGlzdGFuY2VTUSh4MSwgeTEsIHgyLCB5Mikge1xuICAgIGNvbnN0IGR4ID0geDEgLSB4MjtcbiAgICBjb25zdCBkeSA9IHkxIC0geTI7XG4gICAgcmV0dXJuIGR4ICogZHggKyBkeSAqIGR5O1xufVxuIiwiLypcbi0gSWYgQSBhbmQgQiBhcmUgcGVycGVuZGljdWxhciAoYXQgOTAgZGVncmVlcyB0byBlYWNoIG90aGVyKSwgdGhlIHJlc3VsdFxub2YgdGhlIGRvdCBwcm9kdWN0IHdpbGwgYmUgemVybywgYmVjYXVzZSBjb3MozpgpIHdpbGwgYmUgemVyby5cbi0gSWYgdGhlIGFuZ2xlIGJldHdlZW4gQSBhbmQgQiBhcmUgbGVzcyB0aGFuIDkwIGRlZ3JlZXMsIHRoZSBkb3QgcHJvZHVjdFxud2lsbCBiZSBwb3NpdGl2ZSAoZ3JlYXRlciB0aGFuIHplcm8pLCBhcyBjb3MozpgpIHdpbGwgYmUgcG9zaXRpdmUsIGFuZFxudGhlIHZlY3RvciBsZW5ndGhzIGFyZSBhbHdheXMgcG9zaXRpdmUgdmFsdWVzLlxuLSBJZiB0aGUgYW5nbGUgYmV0d2VlbiBBIGFuZCBCIGFyZSBncmVhdGVyIHRoYW4gOTAgZGVncmVlcywgdGhlIGRvdFxucHJvZHVjdCB3aWxsIGJlIG5lZ2F0aXZlIChsZXNzIHRoYW4gemVybyksIGFzIGNvcyjOmCkgd2lsbCBiZSBuZWdhdGl2ZSxcbmFuZCB0aGUgdmVjdG9yIGxlbmd0aHMgYXJlIGFsd2F5cyBwb3NpdGl2ZSB2YWx1ZXNcbiovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkb3RQcm9kdWN0MmQoYVgsIGFZLCBiWCwgYlkpIHtcbiAgICByZXR1cm4gYVggKiBiWCArIGFZICogYlk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRDaXJjbGVQb2ludHMob3JpZ2luWCwgb3JpZ2luWSwgcmFkaXVzLCBjb3VudCwgc3RhcnQsIENsYXNzKSB7XG4gICAgaWYgKHR5cGVvZiBzdGFydCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgc3RhcnQgPSAtTWF0aC5QSSAvIDI7XG4gICAgfVxuXG4gICAgY29uc3QgcG9pbnRzID0gW10sXG4gICAgICAgIGNpcmMgPSBNYXRoLlBJICogMixcbiAgICAgICAgaW5jciA9IGNpcmMgLyBjb3VudDtcblxuICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IGNpcmMgKyBzdGFydDsgaSArPSBpbmNyKSB7XG4gICAgICAgIGNvbnN0IG9iID0gdHlwZW9mIENsYXNzID09PSAndW5kZWZpbmVkJyA/IHt9IDogbmV3IENsYXNzKCk7XG4gICAgICAgIG9iLnggPSBvcmlnaW5YICsgcmFkaXVzICogTWF0aC5jb3MoaSk7XG4gICAgICAgIG9iLnkgPSBvcmlnaW5ZICsgcmFkaXVzICogTWF0aC5zaW4oaSk7XG4gICAgICAgIHBvaW50cy5wdXNoKG9iKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcG9pbnRzO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0SW50ZXJzZWN0aW9uQXJlYShhWCwgYVksIGFXLCBhSCwgYlgsIGJZLCBiVywgYkgpIHtcbiAgICBjb25zdCBvdmVybGFwWCA9IE1hdGgubWF4KDAsIE1hdGgubWluKGFYICsgYVcsIGJYICsgYlcpIC0gTWF0aC5tYXgoYVgsIGJYKSk7XG4gICAgY29uc3Qgb3ZlcmxhcFkgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihhWSArIGFILCBiWSArIGJIKSAtIE1hdGgubWF4KGFZLCBiWSkpO1xuICAgIHJldHVybiBvdmVybGFwWCAqIG92ZXJsYXBZO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0T3ZlcmxhcFgoYVgsIGFXLCBiWCwgYlcpIHtcbiAgICByZXR1cm4gTWF0aC5tYXgoMCwgTWF0aC5taW4oYVggKyBhVywgYlggKyBiVykgLSBNYXRoLm1heChhWCwgYlgpKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldE92ZXJsYXBZKGFZLCBhSCwgYlksIGJIKSB7XG4gICAgcmV0dXJuIE1hdGgubWF4KDAsIE1hdGgubWluKGFZICsgYUgsIGJZICsgYkgpIC0gTWF0aC5tYXgoYVksIGJZKSk7XG59XG4iLCJpbXBvcnQgYW5nbGUgZnJvbSAnLi9hbmdsZSc7XG5pbXBvcnQgY2VycCBmcm9tICcuL2NlcnAnO1xuaW1wb3J0IGNpcmNsZURpc3RyaWJ1dGlvbiBmcm9tICcuL2NpcmNsZURpc3RyaWJ1dGlvbic7XG5pbXBvcnQgY2xhbXAgZnJvbSAnLi9jbGFtcCc7XG5pbXBvcnQgY29pblRvc3MgZnJvbSAnLi9jb2luVG9zcyc7XG5pbXBvcnQgY3Jvc3NQcm9kdWN0MmQgZnJvbSAnLi9jcm9zc1Byb2R1Y3QyZCc7XG5pbXBvcnQgZGVncmVlcyBmcm9tICcuL2RlZ3JlZXMnO1xuaW1wb3J0IGRpZmZlcmVuY2UgZnJvbSAnLi9kaWZmZXJlbmNlJztcbmltcG9ydCBkaXN0YW5jZSBmcm9tICcuL2Rpc3RhbmNlJztcbmltcG9ydCBkaXN0YW5jZVNxIGZyb20gJy4vZGlzdGFuY2VTcSc7XG5pbXBvcnQgZG90UHJvZHVjdDJkIGZyb20gJy4vZG90UHJvZHVjdDJkJztcbmltcG9ydCBnZXRDaXJjbGVQb2ludHMgZnJvbSAnLi9nZXRDaXJjbGVQb2ludHMnO1xuaW1wb3J0IGdldEludGVyc2VjdGlvbkFyZWEgZnJvbSAnLi9nZXRJbnRlcnNlY3Rpb25BcmVhJztcbmltcG9ydCBnZXRPdmVybGFwWCBmcm9tICcuL2dldE92ZXJsYXBYJztcbmltcG9ydCBnZXRPdmVybGFwWSBmcm9tICcuL2dldE92ZXJsYXBZJztcbmltcG9ydCBsZXJwIGZyb20gJy4vbGVycCc7XG5pbXBvcnQgbWFwIGZyb20gJy4vbWFwJztcbmltcG9ydCBub3JtYWxpemUgZnJvbSAnLi9ub3JtYWxpemUnO1xuaW1wb3J0IG9yaWVudGF0aW9uIGZyb20gJy4vb3JpZW50YXRpb24nO1xuaW1wb3J0IHBlcmNlbnRSZW1haW5pbmcgZnJvbSAnLi9wZXJjZW50UmVtYWluaW5nJztcbmltcG9ydCBwZXJzcGVjdGl2ZSBmcm9tICcuL3BlcnNwZWN0aXZlJztcbmltcG9ydCBxdWFkcmF0aWNDdXJ2ZSBmcm9tICcuL3F1YWRyYXRpY0N1cnZlJztcbmltcG9ydCByYWRpYW5zIGZyb20gJy4vcmFkaWFucyc7XG5pbXBvcnQgcmFuZG9tIGZyb20gJy4vcmFuZG9tJztcbmltcG9ydCByYW5kb21JbnQgZnJvbSAnLi9yYW5kb21JbnQnO1xuaW1wb3J0IHJhbmRvbVNpZ24gZnJvbSAnLi9yYW5kb21TaWduJztcbmltcG9ydCByb3RhdGVQb2ludCBmcm9tICcuL3JvdGF0ZVBvaW50JztcbmltcG9ydCByb3RhdGVUb0RlZyBmcm9tICcuL3JvdGF0ZVRvRGVnJztcbmltcG9ydCByb3RhdGVUb1JhZCBmcm9tICcuL3JvdGF0ZVRvUmFkJztcbmltcG9ydCByb3VuZFRvIGZyb20gJy4vcm91bmRUbyc7XG5pbXBvcnQgcm91bmRUb05lYXJlc3QgZnJvbSAnLi9yb3VuZFRvTmVhcmVzdCc7XG5pbXBvcnQgc2l6ZSBmcm9tICcuL3NpemUnO1xuaW1wb3J0IHNtZXJwIGZyb20gJy4vc21lcnAnO1xuaW1wb3J0IHNtb290aHN0ZXAgZnJvbSAnLi9zbW9vdGhzdGVwJztcbmltcG9ydCBzcGxpdFZhbHVlQW5kVW5pdCBmcm9tICcuL3NwbGl0VmFsdWVBbmRVbml0JztcbmltcG9ydCB3ZWlnaHRlZEF2ZXJhZ2UgZnJvbSAnLi93ZWlnaHRlZEF2ZXJhZ2UnO1xuaW1wb3J0IHdlaWdodGVkRGlzdHJpYnV0aW9uIGZyb20gJy4vd2VpZ2h0ZWREaXN0cmlidXRpb24nO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYW5nbGUsXG4gICAgY2VycCxcbiAgICBjaXJjbGVEaXN0cmlidXRpb24sXG4gICAgY2xhbXAsXG4gICAgY29pblRvc3MsXG4gICAgY3Jvc3NQcm9kdWN0MmQsXG4gICAgZGVncmVlcyxcbiAgICBkaWZmZXJlbmNlLFxuICAgIGRpc3RhbmNlLFxuICAgIGRpc3RhbmNlU3EsXG4gICAgZG90UHJvZHVjdDJkLFxuICAgIGdldENpcmNsZVBvaW50cyxcbiAgICBnZXRJbnRlcnNlY3Rpb25BcmVhLFxuICAgIGdldE92ZXJsYXBYLFxuICAgIGdldE92ZXJsYXBZLFxuICAgIGxlcnAsXG4gICAgbWFwLFxuICAgIG5vcm1hbGl6ZSxcbiAgICBvcmllbnRhdGlvbixcbiAgICBwZXJjZW50UmVtYWluaW5nLFxuICAgIHBlcnNwZWN0aXZlLFxuICAgIHF1YWRyYXRpY0N1cnZlLFxuICAgIHJhZGlhbnMsXG4gICAgcmFuZG9tLFxuICAgIHJhbmRvbUludCxcbiAgICByYW5kb21TaWduLFxuICAgIHJvdGF0ZVBvaW50LFxuICAgIHJvdGF0ZVRvRGVnLFxuICAgIHJvdGF0ZVRvUmFkLFxuICAgIHJvdW5kVG8sXG4gICAgcm91bmRUb05lYXJlc3QsXG4gICAgc21lcnAsXG4gICAgc21vb3Roc3RlcCxcbiAgICBzaXplLFxuICAgIHNwbGl0VmFsdWVBbmRVbml0LFxuICAgIHdlaWdodGVkQXZlcmFnZSxcbiAgICB3ZWlnaHRlZERpc3RyaWJ1dGlvblxufTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxlcnAoZnJvbSwgdG8sIHdlaWdodCA9IDAuMykge1xuICAgIHJldHVybiBmcm9tICsgKHRvIC0gZnJvbSkgKiB3ZWlnaHQ7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYXAodiwgYSwgYiwgeCwgeSkge1xuICAgIC8vIHZhbHVlLCBtaW4gZXhwZWN0ZWQsIG1heCBleHBlY3RlZCwgbWFwIG1pbiwgbWFwIG1heFxuICAgIC8vIGUuZy4gbWFwIHNvbWUgdmFsdWUgYmV0d2VlbiAwIHRvIDEwMCB0byAtNTAgdG8gNTBcbiAgICAvLyBtYXAoNTAsIDAsIDEwMCwgLTUwLCA1MCkgLy8gMFxuICAgIC8vIG1hcCgyNSwgMCwgMTAwLCAtNTAsIDUwKSAvLyAtMjVcbiAgICByZXR1cm4gKHYgPT09IGEpID8geCA6ICh2IC0gYSkgKiAoeSAtIHgpIC8gKGIgLSBhKSArIHg7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBub3JtYWxpemUodmFsdWUsIG1pbiwgbWF4KSB7XG4gICAgcmV0dXJuICh2YWx1ZSAtIG1pbikgLyAobWF4IC0gbWluKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG9yaWVudGF0aW9uKHgsIHkpIHtcbiAgICByZXR1cm4gTWF0aC5hdGFuMih5LCB4KTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBlcmNlbnRSZW1haW5pbmcodmFsdWUsIHRvdGFsKSB7XG4gICAgcmV0dXJuICh2YWx1ZSAlIHRvdGFsKSAvIHRvdGFsO1xufVxuIiwiLy8geCA9IHggKiBwZXJzcGVjdGl2ZVxuLy8geSA9IHkgKiBwZXJzcGVjdGl2ZVxuLy8gc2NhbGUgPSBwZXJzcGVjdGl2ZVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwZXJzcGVjdGl2ZSh6LCBmb2NhbExlbmd0aCA9IDMwMCkge1xuICAgIHJldHVybiBmb2NhbExlbmd0aCAvIChmb2NhbExlbmd0aCArIHopO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcXVhZHJhdGljQ3VydmUoZnJvbVgsIGZyb21ZLCBjcFgsIGNwWSwgdG9YLCB0b1ksIGdvVGhyb3VnaENQID0gZmFsc2UpIHtcbiAgICBjb25zdCBuID0gMjA7XG4gICAgY29uc3QgcG9pbnRzID0gW2Zyb21YLCBmcm9tWV07XG4gICAgbGV0IHhhID0gMDtcbiAgICBsZXQgeWEgPSAwO1xuXG4gICAgaWYgKGdvVGhyb3VnaENQKSB7XG4gICAgICAgIGNwWCA9IGNwWCAqIDIgLSAoZnJvbVggKyB0b1gpIC8gMjtcbiAgICAgICAgY3BZID0gY3BZICogMiAtIChmcm9tWSArIHRvWSkgLyAyO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IG47ICsraSkge1xuICAgICAgICBjb25zdCBqID0gaSAvIG47XG5cbiAgICAgICAgeGEgPSBmcm9tWCArICgoY3BYIC0gZnJvbVgpICogaik7XG4gICAgICAgIHlhID0gZnJvbVkgKyAoKGNwWSAtIGZyb21ZKSAqIGopO1xuXG4gICAgICAgIHBvaW50cy5wdXNoKHhhICsgKCgoY3BYICsgKCh0b1ggLSBjcFgpICogaikpIC0geGEpICogaiksIHlhICsgKCgoY3BZICsgKCh0b1kgLSBjcFkpICogaikpIC0geWEpICogaikpO1xuICAgIH1cblxuICAgIHJldHVybiBwb2ludHM7XG59XG4iLCJjb25zdCBSQUQgPSBNYXRoLlBJIC8gMTgwO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByYWRpYW5zKGRlZ3JlZXMpIHtcbiAgICByZXR1cm4gZGVncmVlcyAqIFJBRDtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJhbmRvbShtaW4sIG1heCkge1xuICAgIGlmIChpc05hTihtYXgpKSB7XG4gICAgICAgIG1heCA9IG1pbjtcbiAgICAgICAgbWluID0gMDtcbiAgICB9XG4gICAgcmV0dXJuIG1pbiArIE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJhbmRvbUludChtaW4sIG1heCkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKG1pbiArIE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmFuZG9tU2lnbigpIHtcbiAgICByZXR1cm4gTWF0aC5yYW5kb20oKSA+IDAuNSA/IC0xIDogMTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJvdGF0ZVBvaW50KHAsIHRoZXRhLCBvcmlnaW4gPSB7eDogMCwgeTogMH0sIHAxID0ge3g6IDAsIHk6IDB9KSB7XG4gICAgY29uc3Qgc2luVGhldGEgPSBNYXRoLnNpbih0aGV0YSk7XG4gICAgY29uc3QgY29zVGhldGEgPSBNYXRoLmNvcyh0aGV0YSk7XG4gICAgcDEueCA9IChwLnggLSBvcmlnaW4ueCkgKiBjb3NUaGV0YSAtIChwLnkgLSBvcmlnaW4ueSkgKiBzaW5UaGV0YTtcbiAgICBwMS55ID0gKHAueCAtIG9yaWdpbi54KSAqIHNpblRoZXRhICsgKHAueSAtIG9yaWdpbi55KSAqIGNvc1RoZXRhO1xuICAgIHAxLnggKz0gb3JpZ2luLng7XG4gICAgcDEueSArPSBvcmlnaW4ueTtcbiAgICByZXR1cm4gcDE7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByb3RhdGVUb0RlZyhzdGFydCwgZW5kKSB7XG4gICAgbGV0IGRpZmYgPSAoZW5kIC0gc3RhcnQpICUgMzYwO1xuICAgIGlmIChkaWZmICE9PSBkaWZmICUgMTgwKSB7XG4gICAgICAgIGRpZmYgPSAoZGlmZiA8IDApID8gZGlmZiArIDM2MCA6IGRpZmYgLSAzNjA7XG4gICAgfVxuICAgIHJldHVybiBzdGFydCArIGRpZmY7XG59XG4iLCJjb25zdCBQSTIgPSBNYXRoLlBJICogMjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcm90YXRlVG9SQUQoc3RhcnQsIGVuZCkge1xuICAgIGxldCBkaWZmID0gKGVuZCAtIHN0YXJ0KSAlIFBJMjtcbiAgICBpZiAoZGlmZiAhPT0gZGlmZiAlIE1hdGguUEkpIHtcbiAgICAgICAgZGlmZiA9IGRpZmYgPCAwID8gZGlmZiArIFBJMiA6IGRpZmYgLSBQSTI7XG4gICAgfVxuICAgIHJldHVybiBzdGFydCArIGRpZmY7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByb3VuZFRvKHgsIHBsYWNlcyA9IDIpIHtcbiAgICBjb25zdCBkaXYgPSBNYXRoLnBvdygxMCwgcGxhY2VzKTtcbiAgICByZXR1cm4gTWF0aC5yb3VuZCh4ICogZGl2KSAvIGRpdjtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJvdW5kVG9OZWFyZXN0KHZhbHVlLCB1bml0KSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQodmFsdWUgLyB1bml0KSAqIHVuaXQ7XG59XG4iLCJmdW5jdGlvbiBnZXRTY2FsZShtZXRob2QsIHdpZHRoLCBoZWlnaHQsIGFyZWFXaWR0aCwgYXJlYUhlaWdodCkge1xuICAgIHN3aXRjaCAobWV0aG9kKSB7XG4gICAgICAgIGNhc2UgJ2NvdmVyJzpcbiAgICAgICAgICAgIHJldHVybiBNYXRoLm1heChhcmVhV2lkdGggLyB3aWR0aCwgYXJlYUhlaWdodCAvIGhlaWdodCk7XG4gICAgICAgIGNhc2UgJ2NvbnRhaW4nOlxuICAgICAgICAgICAgcmV0dXJuIE1hdGgubWluKGFyZWFXaWR0aCAvIHdpZHRoLCBhcmVhSGVpZ2h0IC8gaGVpZ2h0KTtcbiAgICAgICAgY2FzZSAnd2lkdGgnOlxuICAgICAgICAgICAgcmV0dXJuIGFyZWFXaWR0aCAvIHdpZHRoO1xuICAgICAgICBjYXNlICdoZWlnaHQnOlxuICAgICAgICAgICAgcmV0dXJuIGFyZWFIZWlnaHQgLyBoZWlnaHQ7XG4gICAgICAgIGRlZmF1bHQ6IGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gMTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2l6ZShyZWN0LCBhcmVhV2lkdGgsIGFyZWFIZWlnaHQsIG1ldGhvZCA9ICdjb3ZlcicsIGF1dG9DZW50ZXIgPSB0cnVlKSB7XG4gICAgY29uc3Qgc2NhbGUgPSBnZXRTY2FsZShtZXRob2QsIHJlY3Qud2lkdGgsIHJlY3QuaGVpZ2h0LCBhcmVhV2lkdGgsIGFyZWFIZWlnaHQpO1xuICAgIGNvbnN0IHdpZHRoID0gTWF0aC5jZWlsKHJlY3Qud2lkdGggKiBzY2FsZSk7XG4gICAgY29uc3QgaGVpZ2h0ID0gTWF0aC5jZWlsKHJlY3QuaGVpZ2h0ICogc2NhbGUpO1xuXG4gICAgbGV0IHggPSAwLCB5ID0gMDtcblxuICAgIGlmIChhdXRvQ2VudGVyKSB7XG4gICAgICAgIHggPSBNYXRoLnJvdW5kKChhcmVhV2lkdGggLSB3aWR0aCkgKiAwLjUpO1xuICAgICAgICB5ID0gTWF0aC5yb3VuZCgoYXJlYUhlaWdodCAtIGhlaWdodCkgKiAwLjUpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHgsXG4gICAgICAgIHksXG4gICAgICAgIHdpZHRoLFxuICAgICAgICBoZWlnaHQsXG4gICAgICAgIHNjYWxlXG4gICAgfTtcbn1cbiIsImltcG9ydCBzbW9vdGhzdGVwIGZyb20gJy4vc21vb3Roc3RlcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNtZXJwKGZyb20sIHRvLCBzdGFydFRpbWUsIGVuZFRpbWUsIHRpbWUpIHtcbiAgICByZXR1cm4gZnJvbSArICh0byAtIGZyb20pICogc21vb3Roc3RlcChzdGFydFRpbWUsIGVuZFRpbWUsIHRpbWUpO1xufVxuIiwiaW1wb3J0IGNsYW1wIGZyb20gJy4vY2xhbXAnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzbW9vdGhzdGVwKG1pbiwgbWF4LCB2YWx1ZSkge1xuICAgIGNvbnN0IHggPSBjbGFtcCgodmFsdWUgLSBtaW4pIC8gKG1heCAtIG1pbiksIDAsIDEpO1xuICAgIHJldHVybiB4ICogeCAqICgzIC0gMiAqIHgpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3BsaXRWYWx1ZUFuZFVuaXQocHJvcCkge1xuICAgIGNvbnN0IHJlID0gLyheLT9cXGQqXFwuP1xcZCopKC4qKS87XG4gICAgY29uc3QgbWF0Y2ggPSBwcm9wLm1hdGNoKHJlKTtcbiAgICBjb25zdCB2YWx1ZSA9IE51bWJlcihtYXRjaFsxXSk7XG4gICAgY29uc3QgdW5pdCA9IG1hdGNoWzJdO1xuICAgIHJldHVybiB7dmFsdWUsIHVuaXR9O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gd2VpZ2h0ZWRBdmVyYWdlKGZyb20sIHRvLCB3ZWlnaHQgPSAxMCkge1xuICAgIHJldHVybiAoKGZyb20gKiAod2VpZ2h0IC0gMSkpICsgdG8pIC8gd2VpZ2h0O1xufVxuIiwiaW1wb3J0IHJhbmRvbSBmcm9tICcuL3JhbmRvbSc7XG5cbi8vIGdyZWF0ZXIgcHJvYmFiaWxpdHkgb2YgYmVpbmcgaGFsZndheSBiZXR3ZWVlbiBtaW4gYW5kIG1heFxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB3ZWlnaHRlZERpc3RyaWJ1dGlvbihtaW4sIG1heCwgd2VpZ2h0ID0gNSkge1xuICAgIGxldCB0b3RhbCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3ZWlnaHQ7IGkrKykge1xuICAgICAgICB0b3RhbCArPSByYW5kb20obWluLCBtYXgpO1xuICAgIH1cbiAgICByZXR1cm4gdG90YWwgLyB3ZWlnaHQ7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjdWVwb2ludHNSZWFkZXIoKSB7XG4gICAgY29uc3QgbGlzdCA9IFtdO1xuICAgIGxldCByZWFkZXI7XG4gICAgbGV0IGRpc3BhdGNoO1xuICAgIGxldCBjdXJyZW50UG9zaXRpb24gPSAwO1xuICAgIGxldCBsYXN0UG9zaXRpb24gPSAtMTtcbiAgICBsZXQgdG9sZXJhbmNlID0gMC4yO1xuXG4gICAgZnVuY3Rpb24gYWRkKHBvc2l0aW9uLCBuYW1lLCBkYXRhKSB7XG4gICAgICAgIGxpc3QucHVzaCh7cG9zaXRpb24sIG5hbWUsIGRhdGF9KTtcblxuICAgICAgICBsaXN0LnNvcnQoKGEsIGIpID0+IGEucG9zaXRpb24gLSBiLnBvc2l0aW9uKTtcblxuICAgICAgICByZXR1cm4gcmVhZGVyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uQ3VlcG9pbnQoZm4sIHRoaXNBcmcpIHtcbiAgICAgICAgaWYgKGZuKSB7XG4gICAgICAgICAgICBkaXNwYXRjaCA9IHRoaXNBcmcgPyBmbi5iaW5kKHRoaXNBcmcpIDogZm47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkaXNwYXRjaCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlYWRlcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXNldCgpIHtcbiAgICAgICAgY3VycmVudFBvc2l0aW9uID0gMDtcbiAgICAgICAgbGFzdFBvc2l0aW9uID0gLTE7XG4gICAgICAgIHJldHVybiByZWFkZXI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlQWxsKCkge1xuICAgICAgICBsaXN0Lmxlbmd0aCA9IDA7XG4gICAgICAgIHJldHVybiByZXNldCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldFRvbGVyYW5jZSh2YWx1ZSkge1xuICAgICAgICB0b2xlcmFuY2UgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHJlYWRlcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpblJhbmdlKGN1ZXBvaW50UG9zLCBjdXJyZW50UG9zLCBsYXN0UG9zKSB7XG4gICAgICAgIGlmIChjdWVwb2ludFBvcyA+IGN1cnJlbnRQb3MpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3VlcG9pbnRQb3MgPD0gbGFzdFBvcykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGRpZmYgPSBjdWVwb2ludFBvcyAtIGN1cnJlbnRQb3M7XG4gICAgICAgIGlmIChkaWZmIDwgMCkge1xuICAgICAgICAgICAgZGlmZiA9IC1kaWZmO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkaWZmIDw9IHRvbGVyYW5jZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVjayhjdXJyZW50UG9zLCBsYXN0UG9zKSB7XG4gICAgICAgIGlmIChjdXJyZW50UG9zIDw9IGxhc3RQb3MpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGRpc3BhdGNoICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsaXN0LnNvbWUoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGlmIChpblJhbmdlKGl0ZW0ucG9zaXRpb24sIGN1cnJlbnRQb3MsIGxhc3RQb3MpKSB7XG4gICAgICAgICAgICAgICAgZGlzcGF0Y2goaXRlbSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZShwb3NpdGlvbikge1xuICAgICAgICBjdXJyZW50UG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICAgICAgY2hlY2soY3VycmVudFBvc2l0aW9uLCBsYXN0UG9zaXRpb24pO1xuICAgICAgICBsYXN0UG9zaXRpb24gPSBjdXJyZW50UG9zaXRpb247XG4gICAgICAgIHJldHVybiByZWFkZXI7XG4gICAgfVxuXG4gICAgcmVhZGVyID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgICAgIGFkZCxcbiAgICAgICAgb25DdWVwb2ludCxcbiAgICAgICAgcmVtb3ZlQWxsLFxuICAgICAgICByZXNldCxcbiAgICAgICAgc2V0VG9sZXJhbmNlLFxuICAgICAgICB1cGRhdGVcbiAgICB9KTtcblxuICAgIHJldHVybiByZWFkZXI7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpT1NQbGF5VmlkZW9JbmxpbmUoZWwsIGxvb3AgPSB0cnVlKSB7XG4gICAgY29uc3QgZnJhbWVUaW1lID0gMSAvIDI1O1xuXG4gICAgbGV0IHNlbGYsXG4gICAgICAgIGxhc3RUaW1lID0gMCxcbiAgICAgICAgcGxheWluZyA9IGZhbHNlO1xuXG4gICAgLy8gVGhpcyBjYW4gKGFuZCBzaG91bGQpIGJlIHB1dCBpbiBhIGNzcyBmaWxlIGluc3RlYWQgb2YgZG9pbmcgc3R5bGVTaGVldHNbMF0uaW5zZXJ0UnVsZTpcbiAgICBjb25zdCBjc3NSdWxlID0gJy5pT1NQbGF5VmlkZW9JbmxpbmU6Oi13ZWJraXQtbWVkaWEtY29udHJvbHMgeyBkaXNwbGF5Om5vbmUgIWltcG9ydGFudDsgfSc7XG4gICAgZG9jdW1lbnQuc3R5bGVTaGVldHNbMF0uaW5zZXJ0UnVsZShjc3NSdWxlLCAwKTtcblxuICAgIGVsLnJlbW92ZUF0dHJpYnV0ZSgnY29udHJvbHMnKTtcbiAgICBlbC5jbGFzc0xpc3QuYWRkKCdpT1NQbGF5VmlkZW9JbmxpbmUnKTtcblxuXG4gICAgZnVuY3Rpb24gc2Vlayh0aW1lKSB7XG4gICAgICAgIGVsLmN1cnJlbnRUaW1lID0gdGltZTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGF1c2UoKSB7XG4gICAgICAgIHBsYXlpbmcgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlRnJhbWUoKSB7XG4gICAgICAgIGlmICghcGxheWluZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGVGcmFtZSk7XG5cbiAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgY29uc3QgZGVsdGFUaW1lID0gbm93IC0gbGFzdFRpbWU7XG5cbiAgICAgICAgaWYgKGRlbHRhVGltZSA+PSBmcmFtZVRpbWUgKiAxMDAwKSB7XG4gICAgICAgICAgICBsYXN0VGltZSA9IG5vdztcblxuICAgICAgICAgICAgY29uc3QgZW5kZWQgPSBlbC5jdXJyZW50VGltZSArIGZyYW1lVGltZSA+PSBlbC5kdXJhdGlvbjtcblxuICAgICAgICAgICAgaWYgKGVuZGVkICYmIGxvb3ApIHtcbiAgICAgICAgICAgICAgICBzZWVrKDApO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChlbmRlZCkge1xuICAgICAgICAgICAgICAgIHBhdXNlKCk7XG4gICAgICAgICAgICAgICAgLy8gc2VsZi5lbWl0KCdlbmRlZCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWVrKGVsLmN1cnJlbnRUaW1lICsgZnJhbWVUaW1lKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gc2VsZi5lbWl0KCd0aW1ldXBkYXRlJywgZWwuY3VycmVudFRpbWUsIHNlbGYpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGxheSgpIHtcbiAgICAgICAgcGxheWluZyA9IHRydWU7XG4gICAgICAgIHVwZGF0ZUZyYW1lKCk7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAgIC8vIHNlbGYucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gICAgICAgIHBhdXNlKCk7XG4gICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSh1cGRhdGVGcmFtZSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfVxuXG4gICAgLy8gc2VsZiA9IE9iamVjdC5jcmVhdGUoRW1pdHRlci5wcm90b3R5cGUsIHtcbiAgICBzZWxmID0gT2JqZWN0LmNyZWF0ZShudWxsLCB7XG4gICAgICAgIF9ldmVudHM6IHtcbiAgICAgICAgICAgIHZhbHVlOiB7fVxuICAgICAgICB9LFxuICAgICAgICBkZXN0cm95OiB7XG4gICAgICAgICAgICB2YWx1ZTogZGVzdHJveVxuICAgICAgICB9LFxuICAgICAgICBwYXVzZToge1xuICAgICAgICAgICAgdmFsdWU6IHBhdXNlXG4gICAgICAgIH0sXG4gICAgICAgIHBsYXk6IHtcbiAgICAgICAgICAgIHZhbHVlOiBwbGF5XG4gICAgICAgIH0sXG4gICAgICAgIHNlZWs6IHtcbiAgICAgICAgICAgIHZhbHVlOiBzZWVrXG4gICAgICAgIH0sXG4gICAgICAgIGVsOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY3VycmVudFRpbWU6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsLmN1cnJlbnRUaW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBkdXJhdGlvbjoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZWwuZHVyYXRpb247XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGxvb3A6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxvb3A7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGxvb3AgPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcGxheWluZzoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGxheWluZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUoc2VsZik7XG59XG4iLCJpbXBvcnQgY3VlcG9pbnRzUmVhZGVyIGZyb20gJy4vY3VlcG9pbnRzUmVhZGVyJztcbmltcG9ydCBpT1NQbGF5VmlkZW9JbmxpbmUgZnJvbSAnLi9pT1NQbGF5VmlkZW9JbmxpbmUnO1xuaW1wb3J0IHZpZGVvUGxheWVyIGZyb20gJy4vdmlkZW9QbGF5ZXInO1xuaW1wb3J0IHZpbWVvIGZyb20gJy4vdmltZW8nO1xuaW1wb3J0IHlvdXR1YmUgZnJvbSAnLi95b3V0dWJlJztcbmltcG9ydCB5b3V0dWJlQmFzaWMgZnJvbSAnLi95b3V0dWJlQmFzaWMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgY3VlcG9pbnRzUmVhZGVyLFxuICAgIGlPU1BsYXlWaWRlb0lubGluZSxcbiAgICB2aWRlb1BsYXllcixcbiAgICB2aW1lbyxcbiAgICB5b3V0dWJlLFxuICAgIHlvdXR1YmVCYXNpY1xufTtcbiIsImltcG9ydCBlbWl0dGVyIGZyb20gJy4uL2V2ZW50cy9lbWl0dGVyJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdmlkZW9QbGF5ZXIodmlkZW9FbCkge1xuICAgIGxldCBlbCA9IHZpZGVvRWwgfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcbiAgICBsZXQgcGxheWVyO1xuXG4gICAgZnVuY3Rpb24gbWV0YWRhdGFIYW5kbGVyKCkge1xuICAgICAgICBwbGF5ZXIuZW1pdCgnbWV0YWRhdGEnLCB7XG4gICAgICAgICAgICBzcmM6IGVsLmN1cnJlbnRTcmMsXG4gICAgICAgICAgICB3aWR0aDogZWwudmlkZW9XaWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogZWwudmlkZW9IZWlnaHQsXG4gICAgICAgICAgICBkdXJhdGlvbjogZWwuZHVyYXRpb25cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FucGxheUhhbmRsZXIoKSB7XG4gICAgICAgIHBsYXllci5lbWl0KCdyZWFkeScpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBsYXlIYW5kbGVyKCkge1xuICAgICAgICBwbGF5ZXIuZW1pdCgncGxheScpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVuZGVkSGFuZGxlcigpIHtcbiAgICAgICAgcGxheWVyLmVtaXQoJ2VuZGVkJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXJyb3JIYW5kbGVyKCkge1xuICAgICAgICBwbGF5ZXIuZW1pdCgnZXJyb3InLCBlbC5lcnJvcik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdGltZXVwZGF0ZUhhbmRsZXIoKSB7XG4gICAgICAgIHBsYXllci5lbWl0KCd0aW1ldXBkYXRlJywgZWwuY3VycmVudFRpbWUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZUV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdsb2FkZWRtZXRhZGF0YScsIG1ldGFkYXRhSGFuZGxlcik7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NhbnBsYXl0aHJvdWdoJywgY2FucGxheUhhbmRsZXIpO1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdwbGF5JywgcGxheUhhbmRsZXIpO1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdwbGF5aW5nJywgcGxheUhhbmRsZXIpO1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdlcnJvcicsIGVycm9ySGFuZGxlcik7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2VuZGVkJywgZW5kZWRIYW5kbGVyKTtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndGltZXVwZGF0ZScsIHRpbWV1cGRhdGVIYW5kbGVyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRFdmVudExpc3RlbmVycygpIHtcbiAgICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKTtcblxuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdsb2FkZWRtZXRhZGF0YScsIG1ldGFkYXRhSGFuZGxlciwgZmFsc2UpO1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjYW5wbGF5dGhyb3VnaCcsIGNhbnBsYXlIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3BsYXknLCBwbGF5SGFuZGxlciwgZmFsc2UpO1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdwbGF5aW5nJywgcGxheUhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBlcnJvckhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignZW5kZWQnLCBlbmRlZEhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigndGltZXVwZGF0ZScsIHRpbWV1cGRhdGVIYW5kbGVyLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICAgcGxheWVyLm9mZigpO1xuICAgICAgICBlbC5wYXVzZSgpO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoJ3NyYycpO1xuICAgICAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXJzKCk7XG5cbiAgICAgICAgaWYgKGVsLnBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgIGVsLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoZWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgZWwgPSBudWxsO1xuXG4gICAgICAgIHJldHVybiBwbGF5ZXI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0QmxvYlVSTCh1cmwpIHtcbiAgICAgICAgdXJsID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwodXJsKTtcbiAgICAgICAgZnVuY3Rpb24gcmV2b2tlKCkge1xuICAgICAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2FucGxheXRocm91Z2gnLCByZXZva2UpO1xuICAgICAgICAgICAgd2luZG93LlVSTC5yZXZva2VPYmplY3RVUkwodXJsKTtcbiAgICAgICAgfVxuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjYW5wbGF5dGhyb3VnaCcsIHJldm9rZSk7XG4gICAgICAgIHJldHVybiB1cmw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9hZCh1cmwpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5CbG9iICYmIHVybCBpbnN0YW5jZW9mIHdpbmRvdy5CbG9iKSB7XG4gICAgICAgICAgICB1cmwgPSBnZXRCbG9iVVJMKHVybCk7XG4gICAgICAgIH1cbiAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcnMoKTtcblxuICAgICAgICBlbC5jcm9zc09yaWdpbiA9ICdhbm9ueW1vdXMnO1xuICAgICAgICBlbC5wcmVsb2FkID0gJ2F1dG8nO1xuICAgICAgICBlbC5zcmMgPSB1cmw7XG4gICAgICAgIGVsLmxvYWQoKTtcblxuICAgICAgICByZXR1cm4gcGxheWVyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBsYXkoKSB7XG4gICAgICAgIGVsLnBsYXkoKTtcblxuICAgICAgICByZXR1cm4gcGxheWVyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhdXNlKCkge1xuICAgICAgICBlbC5wYXVzZSgpO1xuXG4gICAgICAgIHJldHVybiBwbGF5ZXI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2Vlayh0aW1lKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBlbC5jdXJyZW50VGltZSA9IHRpbWU7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICAgICAgcmV0dXJuIHBsYXllcjtcbiAgICB9XG5cbiAgICBhZGRFdmVudExpc3RlbmVycygpO1xuXG4gICAgcGxheWVyID0gT2JqZWN0LmNyZWF0ZShlbWl0dGVyLnByb3RvdHlwZSwge1xuICAgICAgICBfZXZlbnRzOiB7XG4gICAgICAgICAgICB2YWx1ZToge31cbiAgICAgICAgfSxcbiAgICAgICAgZGVzdHJveToge1xuICAgICAgICAgICAgdmFsdWU6IGRlc3Ryb3lcbiAgICAgICAgfSxcbiAgICAgICAgbG9hZDoge1xuICAgICAgICAgICAgdmFsdWU6IGxvYWRcbiAgICAgICAgfSxcbiAgICAgICAgcGF1c2U6IHtcbiAgICAgICAgICAgIHZhbHVlOiBwYXVzZVxuICAgICAgICB9LFxuICAgICAgICBwbGF5OiB7XG4gICAgICAgICAgICB2YWx1ZTogcGxheVxuICAgICAgICB9LFxuICAgICAgICBzZWVrOiB7XG4gICAgICAgICAgICB2YWx1ZTogc2Vla1xuICAgICAgICB9LFxuICAgICAgICBlbDoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGN1cnJlbnRUaW1lOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbC5jdXJyZW50VGltZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgZWwuY3VycmVudFRpbWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZHVyYXRpb246IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsLmR1cmF0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB2b2x1bWU6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsLnZvbHVtZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgZWwudm9sdW1lID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBPYmplY3QuZnJlZXplKHBsYXllcik7XG59XG4iLCJpbXBvcnQgZW1pdHRlciBmcm9tICcuLi9ldmVudHMvZW1pdHRlcic7XG5cbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLnZpbWVvLmNvbS9wbGF5ZXIvanMtYXBpXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHZpbWVvKGVsKSB7XG4gICAgY29uc3QgdmltZW9QbGF5ZXIgPSBlbC5jb250ZW50V2luZG93O1xuICAgIGNvbnN0IHJlID0gL15odHRwcz86XFwvXFwvcGxheWVyLnZpbWVvLmNvbS87XG4gICAgbGV0IHBsYXllciwgb3JpZ2luID0gJyonLCBwYXVzZWQgPSBmYWxzZTtcblxuICAgIGZ1bmN0aW9uIHNlbmRDb21tYW5kKG1ldGhvZCwgdmFsdWUgPSAnJykge1xuICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgbWV0aG9kXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBkYXRhLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtZXNzYWdlID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgICAgIHZpbWVvUGxheWVyLnBvc3RNZXNzYWdlKG1lc3NhZ2UsIG9yaWdpbik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGxheSgpIHtcbiAgICAgICAgcGF1c2VkID0gZmFsc2U7XG4gICAgICAgIHNlbmRDb21tYW5kKCdwbGF5Jyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGF1c2UoKSB7XG4gICAgICAgIHBhdXNlZCA9IHRydWU7XG4gICAgICAgIHNlbmRDb21tYW5kKCdwYXVzZScpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uUmVhZHkoKSB7XG4gICAgICAgIHNlbmRDb21tYW5kKCdhZGRFdmVudExpc3RlbmVyJywgJ3BsYXknKTtcbiAgICAgICAgc2VuZENvbW1hbmQoJ2FkZEV2ZW50TGlzdGVuZXInLCAncGF1c2UnKTtcbiAgICAgICAgc2VuZENvbW1hbmQoJ2FkZEV2ZW50TGlzdGVuZXInLCAnZmluaXNoJyk7XG4gICAgICAgIHNlbmRDb21tYW5kKCdhZGRFdmVudExpc3RlbmVyJywgJ3BsYXlQcm9ncmVzcycpO1xuICAgICAgICBwbGF5ZXIuZW1pdCgncmVhZHknKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblBsYXkoKSB7XG4gICAgICAgIHBhdXNlZCA9IGZhbHNlO1xuICAgICAgICBwbGF5ZXIuZW1pdCgncGxheScpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uUGF1c2UoKSB7XG4gICAgICAgIHBhdXNlZCA9IHRydWU7XG4gICAgICAgIHBsYXllci5lbWl0KCdwYXVzZScpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRmluaXNoKCkge1xuICAgICAgICBwbGF5ZXIuZW1pdCgnZW5kZWQnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblBsYXlQcm9ncmVzcyhkYXRhKSB7XG4gICAgICAgIHBsYXllci5lbWl0KCd0aW1ldXBkYXRlJywgZGF0YS5zZWNvbmRzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbk1lc3NhZ2UoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgaXNWaW1lbyA9IHJlLnRlc3QoZXZlbnQub3JpZ2luKTtcblxuICAgICAgICBpZiAoIWlzVmltZW8pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKGV2ZW50LmRhdGEpO1xuXG4gICAgICAgIGlmIChkYXRhLnBsYXllcl9pZCAmJiBlbC5pZCAhPT0gZGF0YS5wbGF5ZXJfaWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcmlnaW4gPT09ICcqJykge1xuICAgICAgICAgICAgb3JpZ2luID0gZXZlbnQub3JpZ2luO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoIChkYXRhLmV2ZW50KSB7XG4gICAgICAgICAgICBjYXNlICdyZWFkeSc6XG4gICAgICAgICAgICAgICAgb25SZWFkeShkYXRhLnBsYXllcl9pZCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdwbGF5UHJvZ3Jlc3MnOlxuICAgICAgICAgICAgICAgIG9uUGxheVByb2dyZXNzKGRhdGEuZGF0YSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdwbGF5JzpcbiAgICAgICAgICAgICAgICBvblBsYXkoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3BhdXNlJzpcbiAgICAgICAgICAgICAgICBvblBhdXNlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdmaW5pc2gnOlxuICAgICAgICAgICAgICAgIG9uRmluaXNoKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBvbk1lc3NhZ2UpO1xuICAgIH1cblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgb25NZXNzYWdlKTtcblxuICAgIHBsYXllciA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmNyZWF0ZShlbWl0dGVyLnByb3RvdHlwZSksIHtcbiAgICAgICAgX2V2ZW50czoge30sXG4gICAgICAgIHBsYXksXG4gICAgICAgIHBhdXNlLFxuICAgICAgICBwYXVzZWQ6ICgpID0+IHBhdXNlZCxcbiAgICAgICAgZGVzdHJveVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHBsYXllcjtcbn1cbiIsIi8vIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL3lvdXR1YmUvaWZyYW1lX2FwaV9yZWZlcmVuY2UjRXZlbnRzXG5pbXBvcnQge0V2ZW50RW1pdHRlcn0gZnJvbSAnZXZlbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24geW91dHViZShlbCkge1xuICAgIGxldCBlbWl0dGVyID0gbnVsbCwgcGxheWVyID0gbnVsbCwgcGF1c2VkID0gZmFsc2U7XG5cbiAgICBmdW5jdGlvbiBwbGF5KCkge1xuICAgICAgICBwYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgcGxheWVyLnBsYXlWaWRlbygpO1xuICAgICAgICByZXR1cm4gZW1pdHRlcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXVzZSgpIHtcbiAgICAgICAgcGF1c2VkID0gdHJ1ZTtcbiAgICAgICAgcGxheWVyLnBhdXNlVmlkZW8oKTtcbiAgICAgICAgcmV0dXJuIGVtaXR0ZXI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25SZWFkeSgpIHtcbiAgICAgICAgZW1pdHRlci5lbWl0KCdyZWFkeScpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uU3RhdGVDaGFuZ2UoZXZlbnQpIHtcbiAgICAgICAgY29uc3Qge1BsYXllclN0YXRlfSA9IHdpbmRvdy5ZVDtcblxuICAgICAgICBzd2l0Y2ggKGV2ZW50LmRhdGEpIHtcbiAgICAgICAgICAgIGNhc2UgUGxheWVyU3RhdGUuQ1VFRDpcbiAgICAgICAgICAgIGNhc2UgUGxheWVyU3RhdGUuQlVGRkVSSU5HOlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBQbGF5ZXJTdGF0ZS5QTEFZSU5HOlxuICAgICAgICAgICAgICAgIHBhdXNlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGVtaXR0ZXIuZW1pdCgncGxheScpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBQbGF5ZXJTdGF0ZS5QQVVTRUQ6XG4gICAgICAgICAgICAgICAgcGF1c2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBlbWl0dGVyLmVtaXQoJ3BhdXNlJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFBsYXllclN0YXRlLkVOREVEOlxuICAgICAgICAgICAgICAgIGVtaXR0ZXIuZW1pdCgnZW5kZWQnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6IGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVzdHJveSgpIHt9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVQbGF5ZXIoKSB7XG4gICAgICAgIGlmIChwbGF5ZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHBsYXllciA9IG5ldyB3aW5kb3cuWVQuUGxheWVyKGVsLCB7XG4gICAgICAgICAgICBldmVudHM6IHtcbiAgICAgICAgICAgICAgICBvblJlYWR5LFxuICAgICAgICAgICAgICAgIG9uU3RhdGVDaGFuZ2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cblxuICAgIGlmICh3aW5kb3cuWVQpIHtcbiAgICAgICAgY3JlYXRlUGxheWVyKCk7XG4gICAgfSBlbHNlIGlmICh3aW5kb3cueXRQbGF5ZXJDYWxscykge1xuICAgICAgICB3aW5kb3cueXRQbGF5ZXJDYWxscy5wdXNoKGNyZWF0ZVBsYXllcik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgd2luZG93Lnl0UGxheWVyQ2FsbHMgPSBbY3JlYXRlUGxheWVyXTtcbiAgICAgICAgd2luZG93Lm9uWW91VHViZUlmcmFtZUFQSVJlYWR5ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB3aW5kb3cueXRQbGF5ZXJDYWxscy5mb3JFYWNoKChjYWxsKSA9PiBjYWxsKCkpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgc2NyaXB0LnNyYyA9ICdodHRwczovL3d3dy55b3V0dWJlLmNvbS9pZnJhbWVfYXBpJztcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgIH1cblxuICAgIGVtaXR0ZXIgPSBPYmplY3QuYXNzaWduKE9iamVjdC5jcmVhdGUoRXZlbnRFbWl0dGVyLnByb3RvdHlwZSksIHtcbiAgICAgICAgX2V2ZW50czoge30sXG4gICAgICAgIHBsYXksXG4gICAgICAgIHBhdXNlLFxuICAgICAgICBwYXVzZWQ6ICgpID0+IHBhdXNlZCxcbiAgICAgICAgZGVzdHJveVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGVtaXR0ZXI7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB5b3V0dWJlQmFzaWMoZWwpIHtcbiAgICBjb25zdCBpZnJhbWUgPSBlbC5jb250ZW50V2luZG93O1xuXG4gICAgZnVuY3Rpb24gc2VuZENvbW1hbmQoY29tbWFuZCkge1xuICAgICAgICBpZnJhbWUucG9zdE1lc3NhZ2UoYHtcImV2ZW50XCI6XCJjb21tYW5kXCIsXCJmdW5jXCI6XCIke2NvbW1hbmR9XCIsXCJhcmdzXCI6XCJcIn1gLCAnKicpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBsYXkoKSB7XG4gICAgICAgIHNlbmRDb21tYW5kKCdwbGF5VmlkZW8nKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXVzZSgpIHtcbiAgICAgICAgc2VuZENvbW1hbmQoJ3BhdXNlVmlkZW8nKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBwbGF5LFxuICAgICAgICBwYXVzZVxuICAgIH07XG59XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICB0aGlzLl9ldmVudHMgPSB0aGlzLl9ldmVudHMgfHwge307XG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbkV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uKG4pIHtcbiAgaWYgKCFpc051bWJlcihuKSB8fCBuIDwgMCB8fCBpc05hTihuKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ24gbXVzdCBiZSBhIHBvc2l0aXZlIG51bWJlcicpO1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGVyLCBoYW5kbGVyLCBsZW4sIGFyZ3MsIGksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmICh0eXBlID09PSAnZXJyb3InKSB7XG4gICAgaWYgKCF0aGlzLl9ldmVudHMuZXJyb3IgfHxcbiAgICAgICAgKGlzT2JqZWN0KHRoaXMuX2V2ZW50cy5lcnJvcikgJiYgIXRoaXMuX2V2ZW50cy5lcnJvci5sZW5ndGgpKSB7XG4gICAgICBlciA9IGFyZ3VtZW50c1sxXTtcbiAgICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQXQgbGVhc3QgZ2l2ZSBzb21lIGtpbmQgb2YgY29udGV4dCB0byB0aGUgdXNlclxuICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdVbmNhdWdodCwgdW5zcGVjaWZpZWQgXCJlcnJvclwiIGV2ZW50LiAoJyArIGVyICsgJyknKTtcbiAgICAgICAgZXJyLmNvbnRleHQgPSBlcjtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzVW5kZWZpbmVkKGhhbmRsZXIpKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAoaXNGdW5jdGlvbihoYW5kbGVyKSkge1xuICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgLy8gZmFzdCBjYXNlc1xuICAgICAgY2FzZSAxOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1syXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gc2xvd2VyXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgaGFuZGxlci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNPYmplY3QoaGFuZGxlcikpIHtcbiAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICBsaXN0ZW5lcnMgPSBoYW5kbGVyLnNsaWNlKCk7XG4gICAgbGVuID0gbGlzdGVuZXJzLmxlbmd0aDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspXG4gICAgICBsaXN0ZW5lcnNbaV0uYXBwbHkodGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PT0gXCJuZXdMaXN0ZW5lclwiISBCZWZvcmVcbiAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxuICBpZiAodGhpcy5fZXZlbnRzLm5ld0xpc3RlbmVyKVxuICAgIHRoaXMuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICBpc0Z1bmN0aW9uKGxpc3RlbmVyLmxpc3RlbmVyKSA/XG4gICAgICAgICAgICAgIGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICBlbHNlIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0ucHVzaChsaXN0ZW5lcik7XG4gIGVsc2VcbiAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBbdGhpcy5fZXZlbnRzW3R5cGVdLCBsaXN0ZW5lcl07XG5cbiAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgaWYgKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkgJiYgIXRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQpIHtcbiAgICBpZiAoIWlzVW5kZWZpbmVkKHRoaXMuX21heExpc3RlbmVycykpIHtcbiAgICAgIG0gPSB0aGlzLl9tYXhMaXN0ZW5lcnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcbiAgICB9XG5cbiAgICBpZiAobSAmJiBtID4gMCAmJiB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoID4gbSkge1xuICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCA9IHRydWU7XG4gICAgICBjb25zb2xlLmVycm9yKCcobm9kZSkgd2FybmluZzogcG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2xlYWsgZGV0ZWN0ZWQuICVkIGxpc3RlbmVycyBhZGRlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICdVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byBpbmNyZWFzZSBsaW1pdC4nLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoKTtcbiAgICAgIGlmICh0eXBlb2YgY29uc29sZS50cmFjZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyBub3Qgc3VwcG9ydGVkIGluIElFIDEwXG4gICAgICAgIGNvbnNvbGUudHJhY2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgdmFyIGZpcmVkID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gZygpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGcpO1xuXG4gICAgaWYgKCFmaXJlZCkge1xuICAgICAgZmlyZWQgPSB0cnVlO1xuICAgICAgbGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gIH1cblxuICBnLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHRoaXMub24odHlwZSwgZyk7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBlbWl0cyBhICdyZW1vdmVMaXN0ZW5lcicgZXZlbnQgaWZmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZFxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBsaXN0LCBwb3NpdGlvbiwgbGVuZ3RoLCBpO1xuXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIGxpc3QgPSB0aGlzLl9ldmVudHNbdHlwZV07XG4gIGxlbmd0aCA9IGxpc3QubGVuZ3RoO1xuICBwb3NpdGlvbiA9IC0xO1xuXG4gIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fFxuICAgICAgKGlzRnVuY3Rpb24obGlzdC5saXN0ZW5lcikgJiYgbGlzdC5saXN0ZW5lciA9PT0gbGlzdGVuZXIpKSB7XG4gICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICBpZiAodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcblxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGxpc3QpKSB7XG4gICAgZm9yIChpID0gbGVuZ3RoOyBpLS0gPiAwOykge1xuICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8XG4gICAgICAgICAgKGxpc3RbaV0ubGlzdGVuZXIgJiYgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpKSB7XG4gICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgICBsaXN0Lmxlbmd0aCA9IDA7XG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0LnNwbGljZShwb3NpdGlvbiwgMSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIga2V5LCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICBpZiAoIXRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcikge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKVxuICAgICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgZWxzZSBpZiAodGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIGZvciAoa2V5IGluIHRoaXMuX2V2ZW50cykge1xuICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgIH1cbiAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICBpZiAoaXNGdW5jdGlvbihsaXN0ZW5lcnMpKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICB9IGVsc2UgaWYgKGxpc3RlbmVycykge1xuICAgIC8vIExJRk8gb3JkZXJcbiAgICB3aGlsZSAobGlzdGVuZXJzLmxlbmd0aClcbiAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzW2xpc3RlbmVycy5sZW5ndGggLSAxXSk7XG4gIH1cbiAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgcmV0O1xuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIHJldCA9IFtdO1xuICBlbHNlIGlmIChpc0Z1bmN0aW9uKHRoaXMuX2V2ZW50c1t0eXBlXSkpXG4gICAgcmV0ID0gW3RoaXMuX2V2ZW50c1t0eXBlXV07XG4gIGVsc2VcbiAgICByZXQgPSB0aGlzLl9ldmVudHNbdHlwZV0uc2xpY2UoKTtcbiAgcmV0dXJuIHJldDtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgaWYgKHRoaXMuX2V2ZW50cykge1xuICAgIHZhciBldmxpc3RlbmVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gICAgaWYgKGlzRnVuY3Rpb24oZXZsaXN0ZW5lcikpXG4gICAgICByZXR1cm4gMTtcbiAgICBlbHNlIGlmIChldmxpc3RlbmVyKVxuICAgICAgcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RoO1xuICB9XG4gIHJldHVybiAwO1xufTtcblxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XG4gIHJldHVybiBlbWl0dGVyLmxpc3RlbmVyQ291bnQodHlwZSk7XG59O1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gaXNOdW1iZXIoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnbnVtYmVyJztcbn1cblxuZnVuY3Rpb24gaXNPYmplY3QoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiBhcmcgIT09IG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKGFyZykge1xuICByZXR1cm4gYXJnID09PSB2b2lkIDA7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmICgndmFsdWUnIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxudmFyIE1pbmlTaWduYWxCaW5kaW5nID0gKGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gTWluaVNpZ25hbEJpbmRpbmcoZm4sIG9uY2UsIHRoaXNBcmcpIHtcbiAgICBpZiAob25jZSA9PT0gdW5kZWZpbmVkKSBvbmNlID0gZmFsc2U7XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTWluaVNpZ25hbEJpbmRpbmcpO1xuXG4gICAgdGhpcy5fZm4gPSBmbjtcbiAgICB0aGlzLl9vbmNlID0gb25jZTtcbiAgICB0aGlzLl90aGlzQXJnID0gdGhpc0FyZztcbiAgICB0aGlzLl9uZXh0ID0gdGhpcy5fcHJldiA9IHRoaXMuX293bmVyID0gbnVsbDtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhNaW5pU2lnbmFsQmluZGluZywgW3tcbiAgICBrZXk6ICdkZXRhY2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXRhY2goKSB7XG4gICAgICBpZiAodGhpcy5fb3duZXIgPT09IG51bGwpIHJldHVybiBmYWxzZTtcbiAgICAgIHRoaXMuX293bmVyLmRldGFjaCh0aGlzKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBNaW5pU2lnbmFsQmluZGluZztcbn0pKCk7XG5cbmZ1bmN0aW9uIF9hZGRNaW5pU2lnbmFsQmluZGluZyhzZWxmLCBub2RlKSB7XG4gIGlmICghc2VsZi5faGVhZCkge1xuICAgIHNlbGYuX2hlYWQgPSBub2RlO1xuICAgIHNlbGYuX3RhaWwgPSBub2RlO1xuICB9IGVsc2Uge1xuICAgIHNlbGYuX3RhaWwuX25leHQgPSBub2RlO1xuICAgIG5vZGUuX3ByZXYgPSBzZWxmLl90YWlsO1xuICAgIHNlbGYuX3RhaWwgPSBub2RlO1xuICB9XG5cbiAgbm9kZS5fb3duZXIgPSBzZWxmO1xuXG4gIHJldHVybiBub2RlO1xufVxuXG52YXIgTWluaVNpZ25hbCA9IChmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIE1pbmlTaWduYWwoKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIE1pbmlTaWduYWwpO1xuXG4gICAgdGhpcy5faGVhZCA9IHRoaXMuX3RhaWwgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoTWluaVNpZ25hbCwgW3tcbiAgICBrZXk6ICdoYW5kbGVycycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGhhbmRsZXJzKCkge1xuICAgICAgdmFyIGV4aXN0cyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogYXJndW1lbnRzWzBdO1xuXG4gICAgICB2YXIgbm9kZSA9IHRoaXMuX2hlYWQ7XG5cbiAgICAgIGlmIChleGlzdHMpIHJldHVybiAhIW5vZGU7XG5cbiAgICAgIHZhciBlZSA9IFtdO1xuXG4gICAgICB3aGlsZSAobm9kZSkge1xuICAgICAgICBlZS5wdXNoKG5vZGUpO1xuICAgICAgICBub2RlID0gbm9kZS5fbmV4dDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGVlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2hhcycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGhhcyhub2RlKSB7XG4gICAgICBpZiAoIShub2RlIGluc3RhbmNlb2YgTWluaVNpZ25hbEJpbmRpbmcpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWluaVNpZ25hbCNoYXMoKTogRmlyc3QgYXJnIG11c3QgYmUgYSBNaW5pU2lnbmFsQmluZGluZyBvYmplY3QuJyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBub2RlLl9vd25lciA9PT0gdGhpcztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdkaXNwYXRjaCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRpc3BhdGNoKCkge1xuICAgICAgdmFyIG5vZGUgPSB0aGlzLl9oZWFkO1xuXG4gICAgICBpZiAoIW5vZGUpIHJldHVybiBmYWxzZTtcblxuICAgICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgICAgaWYgKG5vZGUuX29uY2UpIHRoaXMuZGV0YWNoKG5vZGUpO1xuICAgICAgICBub2RlLl9mbi5hcHBseShub2RlLl90aGlzQXJnLCBhcmd1bWVudHMpO1xuICAgICAgICBub2RlID0gbm9kZS5fbmV4dDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnYWRkJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYWRkKGZuKSB7XG4gICAgICB2YXIgdGhpc0FyZyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IG51bGwgOiBhcmd1bWVudHNbMV07XG5cbiAgICAgIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaW5pU2lnbmFsI2FkZCgpOiBGaXJzdCBhcmcgbXVzdCBiZSBhIEZ1bmN0aW9uLicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIF9hZGRNaW5pU2lnbmFsQmluZGluZyh0aGlzLCBuZXcgTWluaVNpZ25hbEJpbmRpbmcoZm4sIGZhbHNlLCB0aGlzQXJnKSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnb25jZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uY2UoZm4pIHtcbiAgICAgIHZhciB0aGlzQXJnID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGFyZ3VtZW50c1sxXTtcblxuICAgICAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pbmlTaWduYWwjb25jZSgpOiBGaXJzdCBhcmcgbXVzdCBiZSBhIEZ1bmN0aW9uLicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIF9hZGRNaW5pU2lnbmFsQmluZGluZyh0aGlzLCBuZXcgTWluaVNpZ25hbEJpbmRpbmcoZm4sIHRydWUsIHRoaXNBcmcpKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdkZXRhY2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXRhY2gobm9kZSkge1xuICAgICAgaWYgKCEobm9kZSBpbnN0YW5jZW9mIE1pbmlTaWduYWxCaW5kaW5nKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pbmlTaWduYWwjZGV0YWNoKCk6IEZpcnN0IGFyZyBtdXN0IGJlIGEgTWluaVNpZ25hbEJpbmRpbmcgb2JqZWN0LicpO1xuICAgICAgfVxuICAgICAgaWYgKG5vZGUuX293bmVyICE9PSB0aGlzKSByZXR1cm4gdGhpcztcblxuICAgICAgaWYgKG5vZGUuX3ByZXYpIG5vZGUuX3ByZXYuX25leHQgPSBub2RlLl9uZXh0O1xuICAgICAgaWYgKG5vZGUuX25leHQpIG5vZGUuX25leHQuX3ByZXYgPSBub2RlLl9wcmV2O1xuXG4gICAgICBpZiAobm9kZSA9PT0gdGhpcy5faGVhZCkge1xuICAgICAgICB0aGlzLl9oZWFkID0gbm9kZS5fbmV4dDtcbiAgICAgICAgaWYgKG5vZGUuX25leHQgPT09IG51bGwpIHtcbiAgICAgICAgICB0aGlzLl90YWlsID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChub2RlID09PSB0aGlzLl90YWlsKSB7XG4gICAgICAgIHRoaXMuX3RhaWwgPSBub2RlLl9wcmV2O1xuICAgICAgICB0aGlzLl90YWlsLl9uZXh0ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgbm9kZS5fb3duZXIgPSBudWxsO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZGV0YWNoQWxsJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGV0YWNoQWxsKCkge1xuICAgICAgdmFyIG5vZGUgPSB0aGlzLl9oZWFkO1xuICAgICAgaWYgKCFub2RlKSByZXR1cm4gdGhpcztcblxuICAgICAgdGhpcy5faGVhZCA9IHRoaXMuX3RhaWwgPSBudWxsO1xuXG4gICAgICB3aGlsZSAobm9kZSkge1xuICAgICAgICBub2RlLl9vd25lciA9IG51bGw7XG4gICAgICAgIG5vZGUgPSBub2RlLl9uZXh0O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIE1pbmlTaWduYWw7XG59KSgpO1xuXG5NaW5pU2lnbmFsLk1pbmlTaWduYWxCaW5kaW5nID0gTWluaVNpZ25hbEJpbmRpbmc7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IE1pbmlTaWduYWw7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG9iamVjdFBvb2woZmFjdG9yeUZuKSB7XG5cbiAgICBsZXQgcG9vbCA9IFtdO1xuICAgIGxldCBudW1DcmVhdGVkID0gMDtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGdldFBvb2wgKCkge1xuICAgICAgICAgICAgcmV0dXJuIHBvb2w7XG4gICAgICAgIH0sXG4gICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICBpZiAoIHBvb2wubGVuZ3RoID4gMCApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9vbC5wb3AoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbnVtQ3JlYXRlZCsrO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWN0b3J5Rm4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZGlzcG9zZSAoaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHBvb2wucHVzaChpbnN0YW5jZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGZpbGwgKGNvdW50KSB7XG4gICAgICAgICAgICB3aGlsZSAoIHBvb2wubGVuZ3RoIDwgY291bnQgKSB7XG4gICAgICAgICAgICAgICAgbnVtQ3JlYXRlZCsrO1xuICAgICAgICAgICAgICAgIHBvb2xbcG9vbC5sZW5ndGhdID0gZmFjdG9yeUZuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVtcHR5ICgpIHtcbiAgICAgICAgICAgIHBvb2wgPSBbXTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0TnVtQ3JlYXRlZCgpIHtcbiAgICAgICAgICAgIHJldHVybiBudW1DcmVhdGVkO1xuICAgICAgICB9XG4gICAgfTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNsb25lKG9iKSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2IpKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZpbHRlcihvYiwgcHJlZGljYXRlKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iKVxuICAgICAgICAuZmlsdGVyKGtleSA9PiBwcmVkaWNhdGUoa2V5LCBvYltrZXldKSlcbiAgICAgICAgLnJlZHVjZSgobmV3T2IsIGtleSkgPT4ge1xuICAgICAgICAgICAgbmV3T2Jba2V5XSA9IG9iW2tleV07XG4gICAgICAgICAgICByZXR1cm4gbmV3T2I7XG4gICAgICAgIH0sIHt9KTtcbn1cbiIsImltcG9ydCBjbG9uZSBmcm9tICcuL2Nsb25lJztcbmltcG9ydCBmaWx0ZXIgZnJvbSAnLi9maWx0ZXInO1xuaW1wb3J0IG1hcCBmcm9tICcuL21hcCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBjbG9uZSxcbiAgICBmaWx0ZXIsXG4gICAgbWFwXG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFwKG9iLCBmbikge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhvYilcbiAgICAgICAgLnJlZHVjZSgobmV3T2IsIGtleSkgPT4ge1xuICAgICAgICAgICAgbmV3T2Jba2V5XSA9IGZuKGtleSwgb2Jba2V5XSk7XG4gICAgICAgICAgICByZXR1cm4gbmV3T2I7XG4gICAgICAgIH0sIHt9KTtcbn1cbiIsImNvbnN0IHthYnMsIGF0YW4yLCBjb3MsIHNpbiwgc3FydH0gPSBNYXRoO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXJ0aWNsZSB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICB0aGlzLm9wdHMgPSBvcHRpb25zO1xuXG4gICAgICAgIHRoaXMuX2JvdW5kcyA9IHt9O1xuICAgICAgICB0aGlzLl9vdXRlckJvdW5kcyA9IHt9O1xuXG4gICAgICAgIHRoaXMuX2RlZmF1bHRzID0ge1xuICAgICAgICAgICAgYWxpdmU6IHRydWUsXG4gICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgeTogMCxcbiAgICAgICAgICAgIGFuZ2xlOiAwLFxuICAgICAgICAgICAgc3BlZWQ6IDAsXG4gICAgICAgICAgICBncmF2aXR5OiAwLFxuICAgICAgICAgICAgbWFzczogMSxcbiAgICAgICAgICAgIHJhZGl1czogMCxcbiAgICAgICAgICAgIGJvdW5jZToge3g6IC0xLCB5OiAtMX0sXG4gICAgICAgICAgICBmcmljdGlvbjogMSxcbiAgICAgICAgICAgIGxpZmVUaW1lOiAwLFxuICAgICAgICAgICAgYm91bmRzOiB7eDogMCwgeTogMCwgd2lkdGg6IDEyODAsIGhlaWdodDogNzIwfVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuX3Byb3BzID0gT2JqZWN0LmtleXModGhpcy5fZGVmYXVsdHMpO1xuXG4gICAgICAgIHRoaXMucmVzZXQob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcmVzZXQob3B0aW9ucykge1xuICAgICAgICBjb25zdCBkZWZzID0gdGhpcy5fZGVmYXVsdHM7XG4gICAgICAgIGNvbnN0IHByb3BzID0gdGhpcy5fcHJvcHM7XG4gICAgICAgIGNvbnN0IG9wdHMgPSBvcHRpb25zIHx8IGRlZnM7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qga2V5ID0gcHJvcHNbaV07XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IG9wdHNba2V5XSB8fCBkZWZzW2tleV07XG4gICAgICAgICAgICB0aGlzW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIGRlZnNba2V5XSA9IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYW5nbGUgPSBvcHRzLmFuZ2xlIHx8IGRlZnMuYW5nbGU7XG4gICAgICAgIGNvbnN0IHNwZWVkID0gb3B0cy5zcGVlZCB8fCBkZWZzLnNwZWVkO1xuXG4gICAgICAgIHRoaXMudnggPSBjb3MoYW5nbGUpICogc3BlZWQ7XG4gICAgICAgIHRoaXMudnkgPSBzaW4oYW5nbGUpICogc3BlZWQ7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICB0aGlzLnZ4ICo9IHRoaXMuZnJpY3Rpb247XG4gICAgICAgIHRoaXMudnkgKj0gdGhpcy5mcmljdGlvbjtcbiAgICAgICAgdGhpcy52eSArPSB0aGlzLmdyYXZpdHk7XG4gICAgICAgIHRoaXMueCArPSB0aGlzLnZ4O1xuICAgICAgICB0aGlzLnkgKz0gdGhpcy52eTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgYWNjZWxsZXJhdGUoc3BlZWQsIGFuZ2xlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYW5nbGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBhbmdsZSA9IHRoaXMuYW5nbGU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy52eCArPSBjb3MoYW5nbGUpICogc3BlZWQ7XG4gICAgICAgIHRoaXMudnkgKz0gc2luKGFuZ2xlKSAqIHNwZWVkO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBnZXQgc3BlZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLnZ4ID09PSAwICYmIHRoaXMudnkgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzcXJ0KHRoaXMudnggKiB0aGlzLnZ4ICsgdGhpcy52eSAqIHRoaXMudnkpO1xuICAgIH1cblxuICAgIHNldCBzcGVlZCh2YWx1ZSkge1xuICAgICAgICBjb25zdCBhbmdsZSA9IHRoaXMuYW5nbGU7XG4gICAgICAgIHRoaXMudnggPSBjb3MoYW5nbGUpICogdmFsdWU7XG4gICAgICAgIHRoaXMudnkgPSBzaW4oYW5nbGUpICogdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IGFuZ2xlKCkge1xuICAgICAgICBpZiAodGhpcy52eCA9PT0gMCAmJiB0aGlzLnZ5ID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXRhbjIodGhpcy52eSwgdGhpcy52eCk7XG4gICAgfVxuXG4gICAgc2V0IGFuZ2xlKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IHNwZWVkID0gdGhpcy5zcGVlZDtcbiAgICAgICAgdGhpcy52eCA9IGNvcyh2YWx1ZSkgKiBzcGVlZDtcbiAgICAgICAgdGhpcy52eSA9IHNpbih2YWx1ZSkgKiBzcGVlZDtcbiAgICB9XG5cbiAgICBzZXRCb3VuZHMoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xuICAgICAgICB0aGlzLl9ib3VuZHMueCA9IHggfHwgMDtcbiAgICAgICAgdGhpcy5fYm91bmRzLnkgPSB5IHx8IDA7XG4gICAgICAgIHRoaXMuX2JvdW5kcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLl9ib3VuZHMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIH1cblxuICAgIGdldCBib3VuZHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ib3VuZHM7XG4gICAgfVxuXG4gICAgc2V0IGJvdW5kcyhvYikge1xuICAgICAgICBjb25zdCB7eCwgeSwgd2lkdGgsIGhlaWdodH0gPSBvYjtcbiAgICAgICAgdGhpcy5zZXRCb3VuZHMoeCwgeSwgd2lkdGgsIGhlaWdodCk7XG4gICAgfVxuXG4gICAgZ2V0IGxlZnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnggLSB0aGlzLnJhZGl1cztcbiAgICB9XG5cbiAgICBnZXQgcmlnaHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnggKyB0aGlzLnJhZGl1cztcbiAgICB9XG5cbiAgICBnZXQgdG9wKCkge1xuICAgICAgICByZXR1cm4gdGhpcy55IC0gdGhpcy5yYWRpdXM7XG4gICAgfVxuXG4gICAgZ2V0IGJvdHRvbSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueSArIHRoaXMucmFkaXVzO1xuICAgIH1cblxuICAgIGdldCBvdXRlckJvdW5kcygpIHtcbiAgICAgICAgdGhpcy5fb3V0ZXJCb3VuZHMubGVmdCA9IHRoaXMuX2JvdW5kcy54IC0gdGhpcy5yYWRpdXM7XG4gICAgICAgIHRoaXMuX291dGVyQm91bmRzLnJpZ2h0ID0gdGhpcy5fYm91bmRzLnggKyB0aGlzLl9ib3VuZHMud2lkdGggKyB0aGlzLnJhZGl1cztcbiAgICAgICAgdGhpcy5fb3V0ZXJCb3VuZHMudG9wID0gdGhpcy5fYm91bmRzLnkgLSB0aGlzLnJhZGl1cztcbiAgICAgICAgdGhpcy5fb3V0ZXJCb3VuZHMuYm90dG9tID0gdGhpcy5fYm91bmRzLnkgKyB0aGlzLl9ib3VuZHMuaGVpZ2h0ICsgdGhpcy5yYWRpdXM7XG4gICAgICAgIHJldHVybiB0aGlzLl9vdXRlckJvdW5kcztcbiAgICB9XG5cbiAgICBhbmdsZVRvKHApIHtcbiAgICAgICAgcmV0dXJuIGF0YW4yKHAueSAtIHRoaXMueSwgcC54IC0gdGhpcy54KTtcbiAgICB9XG5cbiAgICBkaXN0YW5jZVRvKHApIHtcbiAgICAgICAgY29uc3QgZHggPSBwLnggLSB0aGlzLng7XG4gICAgICAgIGNvbnN0IGR5ID0gcC55IC0gdGhpcy55O1xuICAgICAgICByZXR1cm4gc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgfVxuXG4gICAgbW92ZVRvKHAsIHRocnVzdCA9IDAuMDA1KSB7XG4gICAgICAgIGNvbnN0IGR4ID0gcC54IC0gdGhpcy54O1xuICAgICAgICBjb25zdCBkeSA9IHAueSAtIHRoaXMueTtcblxuICAgICAgICB0aGlzLnZ4ICs9IGR4ICogdGhydXN0O1xuICAgICAgICB0aGlzLnZ5ICs9IGR5ICogdGhydXN0O1xuXG4gICAgICAgIGlmIChhYnModGhpcy52eCkgPiBhYnMoZHgpKSB7XG4gICAgICAgICAgICB0aGlzLnZ4ID0gZHg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYWJzKHRoaXMudnkpID4gYWJzKGR5KSkge1xuICAgICAgICAgICAgdGhpcy52eSA9IGR5O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZ3Jhdml0YXRlVG8ocCkge1xuICAgICAgICBjb25zdCBkeCA9IHAueCAtIHRoaXMueDtcbiAgICAgICAgY29uc3QgZHkgPSBwLnkgLSB0aGlzLnk7XG4gICAgICAgIGNvbnN0IGRpc3RTcSA9IGR4ICogZHggKyBkeSAqIGR5O1xuICAgICAgICBpZiAoZGlzdFNxID4gMCkge1xuICAgICAgICAgICAgY29uc3QgZGlzdCA9IHNxcnQoZGlzdFNxKTtcbiAgICAgICAgICAgIGNvbnN0IGZvcmNlID0gcC5tYXNzIC8gZGlzdFNxO1xuICAgICAgICAgICAgY29uc3QgYXggPSBkeCAvIGRpc3QgKiBmb3JjZTtcbiAgICAgICAgICAgIGNvbnN0IGF5ID0gZHkgLyBkaXN0ICogZm9yY2U7XG4gICAgICAgICAgICB0aGlzLnZ4ICs9IGF4O1xuICAgICAgICAgICAgdGhpcy52eSArPSBheTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNwcmluZ1RvKHAsIHN0aWZmbmVzcywgbGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IGR4ID0gcC54IC0gdGhpcy54O1xuICAgICAgICBjb25zdCBkeSA9IHAueSAtIHRoaXMueTtcbiAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBzcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbiAgICAgICAgY29uc3QgZm9yY2UgPSAoZGlzdGFuY2UgLSAobGVuZ3RoIHx8IDApKSAqIChzdGlmZm5lc3MgfHwgMC4yKTtcblxuICAgICAgICBpZiAoYWJzKGRpc3RhbmNlICogZm9yY2UpID4gMCkge1xuICAgICAgICAgICAgdGhpcy52eCArPSBkeCAvIGRpc3RhbmNlICogZm9yY2U7XG4gICAgICAgICAgICB0aGlzLnZ5ICs9IGR5IC8gZGlzdGFuY2UgKiBmb3JjZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGNvbGxpZGVzKHApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzdGFuY2VUbyhwKSA8PSB0aGlzLnJhZGl1cyArIHAucmFkaXVzO1xuICAgIH1cblxuICAgIGVkZ2VDb2xsaWRlKCkge1xuICAgICAgICBjb25zdCBsZWZ0ID0gdGhpcy5fYm91bmRzLnggKyB0aGlzLnJhZGl1cztcbiAgICAgICAgY29uc3QgcmlnaHQgPSB0aGlzLl9ib3VuZHMueCArIHRoaXMuX2JvdW5kcy53aWR0aCAtIHRoaXMucmFkaXVzO1xuICAgICAgICBjb25zdCB0b3AgPSB0aGlzLl9ib3VuZHMueSArIHRoaXMucmFkaXVzO1xuICAgICAgICBjb25zdCBib3R0b20gPSB0aGlzLl9ib3VuZHMueSArIHRoaXMuX2JvdW5kcy5oZWlnaHQgLSB0aGlzLnJhZGl1cztcblxuICAgICAgICBpZiAodGhpcy54IDwgbGVmdCkge1xuICAgICAgICAgICAgdGhpcy54ID0gbGVmdDtcbiAgICAgICAgICAgIHRoaXMudnggPSB0aGlzLnZ4ICogdGhpcy5ib3VuY2UueDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnggPiByaWdodCkge1xuICAgICAgICAgICAgdGhpcy54ID0gcmlnaHQ7XG4gICAgICAgICAgICB0aGlzLnZ4ID0gdGhpcy52eCAqIHRoaXMuYm91bmNlLng7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy55IDwgdG9wKSB7XG4gICAgICAgICAgICB0aGlzLnkgPSB0b3A7XG4gICAgICAgICAgICB0aGlzLnZ5ID0gdGhpcy52eSAqIHRoaXMuYm91bmNlLnk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy55ID4gYm90dG9tKSB7XG4gICAgICAgICAgICB0aGlzLnkgPSBib3R0b207XG4gICAgICAgICAgICB0aGlzLnZ5ID0gdGhpcy52eSAqIHRoaXMuYm91bmNlLnk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlZGdlV3JhcCgpIHtcbiAgICAgICAgY29uc3Qge2xlZnQsIHJpZ2h0LCB0b3AsIGJvdHRvbX0gPSB0aGlzLm91dGVyQm91bmRzO1xuXG4gICAgICAgIGlmICh0aGlzLnggPCBsZWZ0KSB7XG4gICAgICAgICAgICB0aGlzLnggPSByaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnggPiByaWdodCkge1xuICAgICAgICAgICAgdGhpcy54ID0gbGVmdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnkgPCB0b3ApIHtcbiAgICAgICAgICAgIHRoaXMueSA9IGJvdHRvbTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnkgPiBib3R0b20pIHtcbiAgICAgICAgICAgIHRoaXMueSA9IHRvcDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVkZ2VLaWxsKCkge1xuICAgICAgICBjb25zdCB7bGVmdCwgcmlnaHQsIHRvcCwgYm90dG9tfSA9IHRoaXMub3V0ZXJCb3VuZHM7XG5cbiAgICAgICAgaWYgKHRoaXMueCA8IGxlZnQgfHwgdGhpcy54ID4gcmlnaHQgfHwgdGhpcy55IDwgdG9wIHx8IHRoaXMueSA+IGJvdHRvbSkge1xuICAgICAgICAgICAgdGhpcy5hbGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZWRnZVJlc2V0KCkge1xuICAgICAgICBjb25zdCB7bGVmdCwgcmlnaHQsIHRvcCwgYm90dG9tfSA9IHRoaXMub3V0ZXJCb3VuZHM7XG5cbiAgICAgICAgaWYgKHRoaXMueCA8IGxlZnQgfHwgdGhpcy54ID4gcmlnaHQgfHwgdGhpcy55IDwgdG9wIHx8IHRoaXMueSA+IGJvdHRvbSkge1xuICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGlmZUtpbGwoKSB7XG4gICAgICAgIHRoaXMubGlmZVRpbWUtLTtcblxuICAgICAgICBpZiAodGhpcy5saWZlVGltZSA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmFsaXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgYW5kcm9pZCBmcm9tICcuLi9vcy9hbmRyb2lkJztcblxuLy9odHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE0NDAzNzY2L2hvdy10by1kZXRlY3QtdGhlLXN0b2NrLWFuZHJvaWQtYnJvd3NlclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYW5kcm9pZE5hdGl2ZSh1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQpIHtcbiAgICBpZiAoIWFuZHJvaWQodWEpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBpc0FuZHJvaWRNb2JpbGUgPSB1YS5pbmRleE9mKCdNb3ppbGxhLzUuMCcpID4gLTEgJiYgdWEuaW5kZXhPZignQXBwbGVXZWJLaXQnKSA+IC0xO1xuXG4gICAgY29uc3QgcmVBcHBsZVdlYktpdCA9IC9BcHBsZVdlYktpdFxcLyhbXFxkLl0rKS87XG4gICAgY29uc3QgcmVzdWx0QXBwbGVXZWJLaXQgPSByZUFwcGxlV2ViS2l0LmV4ZWModWEpO1xuICAgIGNvbnN0IGFwcGxlV2ViS2l0VmVyc2lvbiA9IHJlc3VsdEFwcGxlV2ViS2l0ID8gcGFyc2VGbG9hdChyZUFwcGxlV2ViS2l0LmV4ZWModWEpWzFdKSA6IG51bGw7XG5cbiAgICBjb25zdCByZUNocm9tZSA9IC9DaHJvbWVcXC8oW1xcZC5dKykvO1xuICAgIGNvbnN0IHJlc3VsdENocm9tZSA9IHJlQ2hyb21lLmV4ZWModWEpO1xuICAgIGNvbnN0IGNocm9tZVZlcnNpb24gPSByZXN1bHRDaHJvbWUgPyBwYXJzZUZsb2F0KHJlQ2hyb21lLmV4ZWModWEpWzFdKSA6IG51bGw7XG5cbiAgICByZXR1cm4gaXNBbmRyb2lkTW9iaWxlICYmIChhcHBsZVdlYktpdFZlcnNpb24gJiYgYXBwbGVXZWJLaXRWZXJzaW9uIDwgNTM3KSB8fCAoY2hyb21lVmVyc2lvbiAmJiBjaHJvbWVWZXJzaW9uIDwgMzcpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaWVWZXJzaW9uKHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudCkge1xuICAgIGxldCB2ID0gMDtcbiAgICBpZiAoL01TSUUgKFxcZCtcXC5cXGQrKTsvLnRlc3QodWEpKSB7XG4gICAgICAgIHYgPSBwYXJzZUludChSZWdFeHAuJDEsIDEwKTtcbiAgICB9IGVsc2UgaWYgKC9UcmlkZW50XFwvKFxcZCtcXC5cXGQrKSguKilydjooXFxkK1xcLlxcZCspLy50ZXN0KHVhKSkge1xuICAgICAgICB2ID0gcGFyc2VJbnQoUmVnRXhwLiQzLCAxMCk7XG4gICAgfVxuICAgIHJldHVybiB2O1xufVxuIiwiaW1wb3J0IG9zIGZyb20gJy4uL29zJztcbmltcG9ydCBpZVZlcnNpb24gZnJvbSAnLi9pZVZlcnNpb24nO1xuaW1wb3J0IGFuZHJvaWROYXRpdmUgZnJvbSAnLi9hbmRyb2lkTmF0aXZlJztcbmltcG9ydCBzYWZhcmkgZnJvbSAnLi9zYWZhcmknO1xuXG5jb25zdCB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XG5jb25zdCBjaHJvbWVpT1MgPSAoKSA9PiBvcy5pb3MoKSAmJiAvQ3JpT1MvLnRlc3QodWEpO1xuY29uc3QgZmlyZWZveCA9ICgpID0+IC9GaXJlZm94Ly50ZXN0KHVhKTtcbmNvbnN0IGllID0gKCkgPT4gaWVWZXJzaW9uKCkgPiAwO1xuY29uc3Qgc2FmYXJpTW9iaWxlID0gKCkgPT4gb3MuaW9zKCkgJiYgL0FwcGxlV2ViS2l0Ly50ZXN0KHVhKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGFuZHJvaWROYXRpdmUsXG4gICAgY2hyb21laU9TLFxuICAgIGZpcmVmb3gsXG4gICAgaWUsXG4gICAgaWVWZXJzaW9uLFxuICAgIHNhZmFyaSxcbiAgICBzYWZhcmlNb2JpbGVcbn07XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzYWZhcmkodWEgPSBuYXZpZ2F0b3IudXNlckFnZW50KSB7XG4gICAgcmV0dXJuICEvQW5kcm9pZC8udGVzdCh1YSkgJiYgIS9DaHJvbWUvLnRlc3QodWEpICYmIC9TYWZhcmkvLnRlc3QodWEpO1xufVxuIiwiY29uc3QgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xuXG5jb25zdCBpcGFkID0gKCkgPT4gL2lQYWQvaS50ZXN0KHVhKTtcbmNvbnN0IGlwb2QgPSAoKSA9PiAvaVBvZC9pLnRlc3QodWEpO1xuY29uc3QgaXBob25lID0gKCkgPT4gL2lQaG9uZS9pLnRlc3QodWEpO1xuY29uc3QgbW9iaWxlID0gKCkgPT4gISF1YS5tYXRjaCgvQW5kcm9pZHx3ZWJPU3xpUGhvbmV8aVBhZHxpUG9kfEJsYWNrQmVycnl8SUVNb2JpbGV8T3BlcmEgTWluaXxXaW5kb3dzIFBob25lfFN5bWJpYW5PUy9pKTtcbmNvbnN0IGRlc2t0b3AgPSAoKSA9PiAhbW9iaWxlKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBkZXNrdG9wLFxuICAgIGlwYWQsXG4gICAgaXBob25lLFxuICAgIGlwb2QsXG4gICAgbW9iaWxlXG59O1xuIiwiaW1wb3J0IGJyb3dzZXIgZnJvbSAnLi9icm93c2VyJztcbmltcG9ydCBkZXZpY2UgZnJvbSAnLi9kZXZpY2UnO1xuaW1wb3J0IG9zIGZyb20gJy4vb3MnO1xuaW1wb3J0IHN1cHBvcnRzIGZyb20gJy4vc3VwcG9ydHMnO1xuaW1wb3J0IHNjcmVlbiBmcm9tICcuL3NjcmVlbic7XG5pbXBvcnQgaXNMb2NhbEhvc3QgZnJvbSAnLi9pc0xvY2FsSG9zdCc7XG5cbmNvbnN0IGxvY2FsID0gaXNMb2NhbEhvc3QoKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGJyb3dzZXIsXG4gICAgZGV2aWNlLFxuICAgIG9zLFxuICAgIHN1cHBvcnRzLFxuICAgIHNjcmVlbixcbiAgICBsb2NhbFxufTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzTG9jYWxIb3N0KCkge1xuICAgIHJldHVybiAvXig/Omh0dHBzPzpcXC9cXC8pPyg/OmxvY2FsaG9zdHwxOTJcXC4xNjgpLy50ZXN0KHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudCkge1xuICAgIHJldHVybiAvQW5kcm9pZC9pLnRlc3QodWEpO1xufVxuIiwiaW1wb3J0IGFuZHJvaWQgZnJvbSAnLi9hbmRyb2lkJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYW5kcm9pZFZlcnNpb24odWEgPSBuYXZpZ2F0b3IudXNlckFnZW50KSB7XG4gICAgaWYgKCFhbmRyb2lkKHVhKSkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgY29uc3QgdmVyc2lvbiA9IHVhLm1hdGNoKC9BbmRyb2lkIChcXGQrKD86XFwuXFxkKykrKTsvKVsxXTtcbiAgICBjb25zdCBbYSwgYl0gPSB2ZXJzaW9uLnNwbGl0KCcuJyk7XG4gICAgcmV0dXJuIHBhcnNlRmxvYXQoYCR7YX0uJHtifWApO1xufVxuIiwiaW1wb3J0IGFuZHJvaWQgZnJvbSAnLi9hbmRyb2lkJztcbmltcG9ydCBhbmRyb2lkVmVyc2lvbiBmcm9tICcuL2FuZHJvaWRWZXJzaW9uJztcbmltcG9ydCBpb3MgZnJvbSAnLi9pb3MnO1xuaW1wb3J0IGlvc1ZlcnNpb24gZnJvbSAnLi9pb3NWZXJzaW9uJztcbmltcG9ydCBsaW51eCBmcm9tICcuL2xpbnV4JztcbmltcG9ydCBtYWMgZnJvbSAnLi9tYWMnO1xuaW1wb3J0IHdpbmRvd3MgZnJvbSAnLi93aW5kb3dzJztcbmltcG9ydCB3aW5kb3dzUGhvbmUgZnJvbSAnLi93aW5kb3dzUGhvbmUnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYW5kcm9pZCxcbiAgICBhbmRyb2lkVmVyc2lvbixcbiAgICBpb3MsXG4gICAgaW9zVmVyc2lvbixcbiAgICBsaW51eCxcbiAgICBtYWMsXG4gICAgd2luZG93cyxcbiAgICB3aW5kb3dzUGhvbmVcbn07XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpb3ModWEgPSBuYXZpZ2F0b3IudXNlckFnZW50KSB7XG4gICAgcmV0dXJuIC9pUFthb11kfGlQaG9uZS9pLnRlc3QodWEpO1xufVxuIiwiaW1wb3J0IGlvcyBmcm9tICcuL2lvcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlvc1ZlcnNpb24odWEgPSBuYXZpZ2F0b3IudXNlckFnZW50KSB7XG4gICAgaWYgKGlvcyh1YSkpIHtcbiAgICAgICAgY29uc3QgWywgYiwgY10gPSB1YS5tYXRjaCgvT1MgKFxcZCspXyhcXGQrKS9pKTtcbiAgICAgICAgaWYgKGIgJiYgYykge1xuICAgICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQoYCR7Yn0uJHtjfWApO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAwO1xufVxuIiwiaW1wb3J0IGFuZHJvaWQgZnJvbSAnLi9hbmRyb2lkJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbGludXgodWEgPSBuYXZpZ2F0b3IudXNlckFnZW50KSB7XG4gICAgcmV0dXJuICFhbmRyb2lkKHVhKSAmJiAvTGludXgvLnRlc3QodWEpO1xufVxuIiwiaW1wb3J0IGlvcyBmcm9tICcuL2lvcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1hYyh1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQpIHtcbiAgICByZXR1cm4gIWlvcyh1YSkgJiYgL01hYyBPUy8udGVzdCh1YSk7XG59XG4iLCJpbXBvcnQgd2luZG93c1Bob25lIGZyb20gJy4vd2luZG93c1Bob25lJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gd2luZG93cyh1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQpIHtcbiAgICByZXR1cm4gIXdpbmRvd3NQaG9uZSh1YSkgJiYgL1dpbmRvd3MvLnRlc3QodWEpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gd2luZG93c1Bob25lKHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudCkge1xuICAgIHJldHVybiAvV2luZG93cyBQaG9uZS9pLnRlc3QodWEpO1xufVxuIiwiLy8gc2NyZWVuLndpZHRoIC8gc2NyZWVuLmhlaWdodCBpcyBvZnRlbiB3cm9uZyBpbiBBbmRyb2lkXG5jb25zdCBoZWlnaHQgPSAoKSA9PiBNYXRoLm1heCh3aW5kb3cub3V0ZXJIZWlnaHQsIHdpbmRvdy5zY3JlZW4uaGVpZ2h0KTtcbmNvbnN0IHdpZHRoID0gKCkgPT4gTWF0aC5tYXgod2luZG93Lm91dGVyV2lkdGgsIHdpbmRvdy5zY3JlZW4ud2lkdGgpO1xuY29uc3QgZHByID0gKCkgPT4gd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMTtcbmNvbnN0IHJldGluYSA9ICgpID0+IGRwcigpID4gMTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIHdpZHRoLFxuICAgIGhlaWdodCxcbiAgICBkcHIsXG4gICAgcmV0aW5hXG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgKCkgPT4gISF3aW5kb3cuRGV2aWNlT3JpZW50YXRpb25FdmVudDtcbiIsImltcG9ydCB3ZWJnbCBmcm9tICcuL3dlYmdsJztcbmltcG9ydCB3ZWJtIGZyb20gJy4vd2VibSc7XG5pbXBvcnQgbXA0IGZyb20gJy4vbXA0JztcbmltcG9ydCBkZXZpY2VPcmllbnRhdGlvbiBmcm9tICcuL2RldmljZU9yaWVudGF0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIHdlYmdsLFxuICAgIHdlYm0sXG4gICAgbXA0LFxuICAgIGRldmljZU9yaWVudGF0aW9uXG59O1xuIiwiY29uc3QgdmlkZW9FbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG5leHBvcnQgZGVmYXVsdCAoKSA9PiAhISh2aWRlb0VsLmNhblBsYXlUeXBlICYmIHZpZGVvRWwuY2FuUGxheVR5cGUoJ3ZpZGVvL21wNDsgY29kZWNzPVwiYXZjMS40MkUwMUUsIG1wNGEuNDAuMlwiJykpO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gd2ViZ2woKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnd2ViZ2wnKSB8fCBjYW52YXMuZ2V0Q29udGV4dCgnZXhwZXJpbWVudGFsLXdlYmdsJyk7XG4gICAgICAgIHJldHVybiAhISh3aW5kb3cuV2ViR0xSZW5kZXJpbmdDb250ZXh0ICYmIGNvbnRleHQpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbiIsImNvbnN0IHZpZGVvRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xuZXhwb3J0IGRlZmF1bHQgKCkgPT4gISEodmlkZW9FbC5jYW5QbGF5VHlwZSAmJiB2aWRlb0VsLmNhblBsYXlUeXBlKCd2aWRlby93ZWJtOyBjb2RlY3M9XCJ2cDgsIHZvcmJpc1wiJykpO1xuIiwiLypcbiAqIGNsYXNzTGlzdCAocGFydGlhbCBwb2x5ZmlsbCBmb3IgSUUgMTAsIElFIDExIGFuZCBGaXJlZm94IDwyNClcbiAqIGFkYXB0ZWQgZnJvbTogaHR0cHM6Ly9naXRodWIuY29tL2VsaWdyZXkvY2xhc3NMaXN0LmpzL2Jsb2IvbWFzdGVyL2NsYXNzTGlzdC5qc1xuICovXG5cbihmdW5jdGlvbigpIHtcblxuICAgIGxldCB0ZXN0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ18nKTtcblxuICAgIHRlc3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2MxJywgJ2MyJyk7XG5cbiAgICAvLyBQb2x5ZmlsbCBmb3IgSUUgMTAvMTEgYW5kIEZpcmVmb3ggPDI2LCB3aGVyZSBjbGFzc0xpc3QuYWRkIGFuZFxuICAgIC8vIGNsYXNzTGlzdC5yZW1vdmUgZXhpc3QgYnV0IHN1cHBvcnQgb25seSBvbmUgYXJndW1lbnQgYXQgYSB0aW1lLlxuICAgIGlmICghdGVzdEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjMicpKSB7XG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZU1ldGhvZChtZXRob2QpIHtcbiAgICAgICAgICAgIGNvbnN0IG9yaWdpbmFsID0gd2luZG93LkRPTVRva2VuTGlzdC5wcm90b3R5cGVbbWV0aG9kXTtcblxuICAgICAgICAgICAgd2luZG93LkRPTVRva2VuTGlzdC5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHRva2VuKSB7XG4gICAgICAgICAgICAgICAgbGV0IGk7XG4gICAgICAgICAgICAgICAgY29uc3QgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWwuY2FsbCh0aGlzLCB0b2tlbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjcmVhdGVNZXRob2QoJ2FkZCcpO1xuICAgICAgICBjcmVhdGVNZXRob2QoJ3JlbW92ZScpO1xuICAgIH1cblxuICAgIHRlc3RFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ2MzJywgZmFsc2UpO1xuXG4gICAgLy8gUG9seWZpbGwgZm9yIElFIDEwLCBJRSAxMSBhbmQgRmlyZWZveCA8MjQsIHdoZXJlIGNsYXNzTGlzdC50b2dnbGUgZG9lcyBub3RcbiAgICAvLyBzdXBwb3J0IHRoZSBzZWNvbmQgYXJndW1lbnQuXG4gICAgaWYgKHRlc3RFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnYzMnKSkge1xuICAgICAgICBjb25zdCB0b2dnbGUgPSB3aW5kb3cuRE9NVG9rZW5MaXN0LnByb3RvdHlwZS50b2dnbGU7XG5cbiAgICAgICAgd2luZG93LkRPTVRva2VuTGlzdC5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24odG9rZW4sIGZvcmNlKSB7XG4gICAgICAgICAgICBmb3JjZSA9ICEhZm9yY2U7XG4gICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgdGhpcy5jb250YWlucyh0b2tlbikgPT09IGZvcmNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcmNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9nZ2xlLmNhbGwodGhpcywgdG9rZW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHRlc3RFbGVtZW50ID0gbnVsbDtcbn0oKSk7XG4iLCIoZnVuY3Rpb24oZm4pIHtcbiAgICB3aW5kb3cuY29uc29sZSA9IHdpbmRvdy5jb25zb2xlIHx8IHt9O1xuICAgIGNvbnN0IG1ldGhvZHMgPSBbXG4gICAgICAgICdhc3NlcnQnLFxuICAgICAgICAnY2xlYXInLFxuICAgICAgICAnY291bnQnLFxuICAgICAgICAnZGVidWcnLFxuICAgICAgICAnZGlyJyxcbiAgICAgICAgJ2RpcnhtbCcsXG4gICAgICAgICdlcnJvcicsXG4gICAgICAgICdncm91cCcsXG4gICAgICAgICdncm91cENvbGxhcHNlZCcsXG4gICAgICAgICdncm91cEVuZCcsXG4gICAgICAgICdpbmZvJyxcbiAgICAgICAgJ2xvZycsXG4gICAgICAgICdtYXJrVGltZWxpbmUnLFxuICAgICAgICAnbWVtb3J5JyxcbiAgICAgICAgJ3Byb2ZpbGUnLFxuICAgICAgICAncHJvZmlsZUVuZCcsXG4gICAgICAgICd0YWJsZScsXG4gICAgICAgICd0aW1lJyxcbiAgICAgICAgJ3RpbWVFbmQnLFxuICAgICAgICAndGltZVN0YW1wJyxcbiAgICAgICAgJ3RpbWVsaW5lJyxcbiAgICAgICAgJ3RpbWVsaW5lRW5kJyxcbiAgICAgICAgJ3RyYWNlJyxcbiAgICAgICAgJ3dhcm4nXG4gICAgXTtcbiAgICBtZXRob2RzLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICAgICAgd2luZG93LmNvbnNvbGVbbmFtZV0gPSB3aW5kb3cuY29uc29sZVtuYW1lXSB8fCBmbjtcbiAgICB9KTtcbn0oZnVuY3Rpb24oKSB7fSkpO1xuIiwiaW1wb3J0ICcuL2NsYXNzTGlzdCc7XG5pbXBvcnQgJy4vY29uc29sZSc7XG5pbXBvcnQgJy4vcmVxdWVzdEFuaW1hdGlvbkZyYW1lJztcbiIsIi8qXG4gKiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgKGlvczYgYW5kIGFuZHJvaWQgPCA0LjQpXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAgIGlmICghd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSkge1xuICAgICAgICBjb25zdCB2ZW5kb3JzID0gWydtcycsICdtb3onLCAnd2Via2l0JywgJ28nXTtcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB2ZW5kb3JzLmxlbmd0aCAmJiAhd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZTsgKyt4KSB7XG4gICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gd2luZG93W3ZlbmRvcnNbeF0gKyAnUmVxdWVzdEFuaW1hdGlvbkZyYW1lJ107XG4gICAgICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSB3aW5kb3dbdmVuZG9yc1t4XSArICdDYW5jZWxBbmltYXRpb25GcmFtZSddIHx8IHdpbmRvd1t2ZW5kb3JzW3hdICtcbiAgICAgICAgICAgICAgICAnQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lJ107XG4gICAgICAgIH1cbiAgICB9XG59KCkpO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcG9wdXAodXJsLCB3aWR0aCA9IDgwMCwgaGVpZ2h0ID0gNjAwLCBuYW1lID0gJycpIHtcbiAgICBjb25zdCBsZWZ0ID0gKHdpbmRvdy5zY3JlZW4ud2lkdGggLSB3aWR0aCkgLyAyO1xuICAgIGNvbnN0IHRvcCA9ICh3aW5kb3cuc2NyZWVuLmhlaWdodCAtIGhlaWdodCkgLyAyO1xuICAgIC8vIGNvbnN0IGxlZnQgPSAod2luZG93LnNjcmVlbi5hdmFpbFdpZHRoIC0gd2lkdGgpIC8gMjtcbiAgICAvLyBjb25zdCB0b3AgPSAod2luZG93LnNjcmVlbi5hdmFpbEhlaWdodCAtIGhlaWdodCkgLyAyO1xuICAgIGNvbnN0IGRlZmF1bHRzID0gJ2RpcmVjdG9yaWVzPW5vLGxvY2F0aW9uPW5vLG1lbnViYXI9bm8scmVzaXphYmxlPW5vLHNjcm9sbGJhcnM9bm8sc3RhdHVzPW5vLHRvb2xiYXI9bm8nO1xuICAgIGNvbnN0IHBhcmFtcyA9IGB3aWR0aD0ke3dpZHRofSxoZWlnaHQ9JHtoZWlnaHR9LHRvcD0ke3RvcH0sbGVmdD0ke2xlZnR9LCR7ZGVmYXVsdHN9YDtcbiAgICBjb25zdCB3aW4gPSB3aW5kb3cub3Blbih1cmwsIG5hbWUsIHBhcmFtcyk7XG4gICAgaWYgKHdpbiA9PT0gbnVsbCB8fCB0eXBlb2Ygd2luID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICh3aW5kb3cuZm9jdXMpIHtcbiAgICAgICAgd2luLmZvY3VzKCk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuIiwiXG5jbGFzcyBOb2RlIHtcbiAgICBjb25zdHJ1Y3Rvcihib3VuZHMsIGRlcHRoLCBtYXhEZXB0aCwgbWF4Q2hpbGRyZW4pIHtcbiAgICAgICAgdGhpcy5fYm91bmRzID0gYm91bmRzO1xuICAgICAgICB0aGlzLl9kZXB0aCA9IGRlcHRoO1xuICAgICAgICB0aGlzLl9tYXhEZXB0aCA9IG1heERlcHRoO1xuICAgICAgICB0aGlzLl9tYXhDaGlsZHJlbiA9IG1heENoaWxkcmVuO1xuXG4gICAgICAgIHRoaXMuY2hpbGRyZW4gPSBbXTtcbiAgICAgICAgdGhpcy5ub2RlcyA9IFtdO1xuICAgIH1cblxuICAgIGluc2VydChpdGVtKSB7XG4gICAgICAgIGlmICh0aGlzLm5vZGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9maW5kSW5kZXgoaXRlbSk7XG4gICAgICAgICAgICB0aGlzLm5vZGVzW2luZGV4XS5pbnNlcnQoaXRlbSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNoaWxkcmVuLnB1c2goaXRlbSk7XG5cbiAgICAgICAgaWYgKCEodGhpcy5fZGVwdGggPj0gdGhpcy5fbWF4RGVwdGgpICYmIHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gdGhpcy5fbWF4Q2hpbGRyZW4pIHtcblxuICAgICAgICAgICAgdGhpcy5zdWJkaXZpZGUoKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnNlcnQodGhpcy5jaGlsZHJlbltpXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4ubGVuZ3RoID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHJpZXZlKGl0ZW0pIHtcbiAgICAgICAgaWYgKHRoaXMubm9kZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuX2ZpbmRJbmRleChpdGVtKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm5vZGVzW2luZGV4XS5yZXRyaWV2ZShpdGVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuO1xuICAgIH1cblxuICAgIF9maW5kSW5kZXgoaXRlbSkge1xuICAgICAgICBjb25zdCB7eCwgeSwgd2lkdGgsIGhlaWdodH0gPSB0aGlzLl9ib3VuZHM7XG5cbiAgICAgICAgY29uc3QgcmlnaHQgPSBpdGVtLnggPiB4ICsgd2lkdGggLyAyO1xuICAgICAgICBjb25zdCBib3R0b20gPSBpdGVtLnkgPiB5ICsgaGVpZ2h0IC8gMjtcblxuICAgICAgICBsZXQgaW5kZXg7XG5cbiAgICAgICAgaWYgKHJpZ2h0KSB7XG4gICAgICAgICAgICBpbmRleCA9IGJvdHRvbSA/IE5vZGUuQlIgOiBOb2RlLlRSO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaW5kZXggPSBib3R0b20gPyBOb2RlLkJMIDogTm9kZS5UTDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG5cbiAgICBzdWJkaXZpZGUoKSB7XG4gICAgICAgIGNvbnN0IGRlcHRoID0gdGhpcy5fZGVwdGggKyAxO1xuXG4gICAgICAgIGNvbnN0IHt4LCB5LCB3aWR0aCwgaGVpZ2h0fSA9IHRoaXMuX2JvdW5kcztcbiAgICAgICAgY29uc3QgdyA9IHdpZHRoIC8gMjtcbiAgICAgICAgY29uc3QgaCA9IGhlaWdodCAvIDI7XG5cbiAgICAgICAgdGhpcy5ub2Rlc1tOb2RlLlRMXSA9IG5ldyBOb2RlKHtcbiAgICAgICAgICAgIHgsXG4gICAgICAgICAgICB5LFxuICAgICAgICAgICAgd2lkdGg6IHcsXG4gICAgICAgICAgICBoZWlnaHQ6IGhcbiAgICAgICAgfSxcbiAgICAgICAgZGVwdGgsIHRoaXMuX21heERlcHRoLCB0aGlzLl9tYXhDaGlsZHJlbik7XG5cbiAgICAgICAgdGhpcy5ub2Rlc1tOb2RlLlRSXSA9IG5ldyBOb2RlKHtcbiAgICAgICAgICAgIHg6IHggKyB3LFxuICAgICAgICAgICAgeSxcbiAgICAgICAgICAgIHdpZHRoOiB3LFxuICAgICAgICAgICAgaGVpZ2h0OiBoXG4gICAgICAgIH0sXG4gICAgICAgIGRlcHRoLCB0aGlzLl9tYXhEZXB0aCwgdGhpcy5fbWF4Q2hpbGRyZW4pO1xuXG4gICAgICAgIHRoaXMubm9kZXNbTm9kZS5CTF0gPSBuZXcgTm9kZSh7XG4gICAgICAgICAgICB4LFxuICAgICAgICAgICAgeTogeSArIGgsXG4gICAgICAgICAgICB3aWR0aDogdyxcbiAgICAgICAgICAgIGhlaWdodDogaFxuICAgICAgICB9LFxuICAgICAgICBkZXB0aCwgdGhpcy5fbWF4RGVwdGgsIHRoaXMuX21heENoaWxkcmVuKTtcblxuICAgICAgICB0aGlzLm5vZGVzW05vZGUuQlJdID0gbmV3IE5vZGUoe1xuICAgICAgICAgICAgeDogeCArIHcsXG4gICAgICAgICAgICB5OiB5ICsgaCxcbiAgICAgICAgICAgIHdpZHRoOiB3LFxuICAgICAgICAgICAgaGVpZ2h0OiBoXG4gICAgICAgIH0sXG4gICAgICAgIGRlcHRoLCB0aGlzLl9tYXhEZXB0aCwgdGhpcy5fbWF4Q2hpbGRyZW4pO1xuICAgIH1cblxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLmNoaWxkcmVuLmxlbmd0aCA9IDA7XG5cbiAgICAgICAgd2hpbGUgKHRoaXMubm9kZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGVzLnBvcCgpLmNsZWFyKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbk5vZGUuVEwgPSAwO1xuTm9kZS5UUiA9IDE7XG5Ob2RlLkJMID0gMjtcbk5vZGUuQlIgPSAzO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBRdWFkVHJlZSB7XG4gICAgY29uc3RydWN0b3IoYm91bmRzLCBtYXhEZXB0aCA9IC0xLCBtYXhDaGlsZHJlbiA9IC0xKSB7XG4gICAgICAgIHRoaXMucm9vdCA9IG5ldyBOb2RlKGJvdW5kcywgMCwgbWF4RGVwdGgsIG1heENoaWxkcmVuKTtcbiAgICB9XG5cbiAgICBpbnNlcnQoaXRlbSkge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShpdGVtKSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb290Lmluc2VydChpdGVtW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucm9vdC5pbnNlcnQoaXRlbSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5yb290LmNsZWFyKCk7XG4gICAgfVxuXG4gICAgcmV0cmlldmUoaXRlbSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yb290LnJldHJpZXZlKGl0ZW0pO1xuICAgIH1cbn1cbiIsImltcG9ydCBwb3B1cCBmcm9tICcuLi9wb3B1cCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGVtYWlsKHVybCwgc3ViamVjdCA9ICcnLCBib2R5ID0gJycpIHtcbiAgICB1cmwgPSBlbmNvZGVVUklDb21wb25lbnQodXJsKTtcbiAgICBzdWJqZWN0ID0gZW5jb2RlVVJJQ29tcG9uZW50KHN1YmplY3QpO1xuXG4gICAgY29uc3QgbmV3bGluZXMgPSBlbmNvZGVVUklDb21wb25lbnQoJ1xcclxcblxcclxcbicpO1xuICAgIGJvZHkgPSBib2R5ID8gYCR7ZW5jb2RlVVJJQ29tcG9uZW50KGJvZHkpfSR7bmV3bGluZXN9YCA6ICcnO1xuXG4gICAgcmV0dXJuIHBvcHVwKGBtYWlsdG86P3N1YmplY3Q9JHtzdWJqZWN0fSZib2R5PSR7Ym9keX0ke3VybH1gKTtcbn1cbiIsImltcG9ydCBwb3B1cCBmcm9tICcuLi9wb3B1cCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZhY2Vib29rKHVybCkge1xuICAgIHVybCA9IGVuY29kZVVSSUNvbXBvbmVudCh1cmwpO1xuICAgIHJldHVybiBwb3B1cChgaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL3NoYXJlci9zaGFyZXIucGhwP3U9JHt1cmx9YCk7XG59XG4iLCJpbXBvcnQgcG9wdXAgZnJvbSAnLi4vcG9wdXAnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmYWNlYm9va0ZlZWREaWFsb2coYXBwSWQsIHJlZGlyZWN0LCB1cmwsIHRpdGxlID0gJycsIGltYWdlID0gJycsIGNhcHRpb24gPSAnJywgZGVzYyA9ICcnLCBzb3VyY2UgPSAnJykge1xuICAgIHRpdGxlID0gZW5jb2RlVVJJQ29tcG9uZW50KHRpdGxlKTtcbiAgICBjYXB0aW9uID0gZW5jb2RlVVJJQ29tcG9uZW50KGNhcHRpb24pO1xuICAgIGRlc2MgPSBlbmNvZGVVUklDb21wb25lbnQoZGVzYyk7XG5cbiAgICBjb25zdCBwYXJhbXMgPSBgP2Rpc3BsYXk9cG9wdXAmc2hvd19lcnJvcj10cnVlJmFwcF9pZD0ke2FwcElkfSZzb3VyY2U9JHtzb3VyY2V9JnJlZGlyZWN0X3VyaT0ke3JlZGlyZWN0fWA7XG4gICAgY29uc3QgY29udGVudCA9IGBuYW1lPSR7dGl0bGV9Jmxpbms9JHt1cmx9JmNhcHRpb249JHtjYXB0aW9ufSZkZXNjcmlwdGlvbj0ke2Rlc2N9JnBpY3R1cmU9JHtpbWFnZX1gO1xuXG4gICAgcmV0dXJuIHBvcHVwKGBodHRwczovL3d3dy5mYWNlYm9vay5jb20vZGlhbG9nL2ZlZWQ/JHtwYXJhbXN9JiR7Y29udGVudH1gKTtcbn1cbiIsImltcG9ydCBwb3B1cCBmcm9tICcuLi9wb3B1cCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdvb2dsZXBsdXModXJsKSB7XG4gICAgdXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KHVybCk7XG4gICAgcmV0dXJuIHBvcHVwKGBodHRwczovL3BsdXMuZ29vZ2xlLmNvbS9zaGFyZT91cmw9JHt1cmx9YCk7XG59XG4iLCJpbXBvcnQgZW1haWwgZnJvbSAnLi9lbWFpbCc7XG5pbXBvcnQgZmFjZWJvb2sgZnJvbSAnLi9mYWNlYm9vayc7XG5pbXBvcnQgZmFjZWJvb2tGZWVkRGlhbG9nIGZyb20gJy4vZmFjZWJvb2tGZWVkRGlhbG9nJztcbmltcG9ydCBnb29nbGVwbHVzIGZyb20gJy4vZ29vZ2xlcGx1cyc7XG5pbXBvcnQgbGlua2VkaW4gZnJvbSAnLi9saW5rZWRpbic7XG5pbXBvcnQgcGludGVyZXN0IGZyb20gJy4vcGludGVyZXN0JztcbmltcG9ydCByZWRkaXQgZnJvbSAnLi9yZWRkaXQnO1xuaW1wb3J0IHJlbnJlbiBmcm9tICcuL3JlbnJlbic7XG5pbXBvcnQgc21zIGZyb20gJy4vc21zJztcbmltcG9ydCB0d2l0dGVyIGZyb20gJy4vdHdpdHRlcic7XG5pbXBvcnQgdmtvbnRha3RlIGZyb20gJy4vdmtvbnRha3RlJztcbmltcG9ydCB3ZWlibyBmcm9tICcuL3dlaWJvJztcbmltcG9ydCB3aGF0c2FwcCBmcm9tICcuL3doYXRzYXBwJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGVtYWlsLFxuICAgIGZhY2Vib29rLFxuICAgIGZhY2Vib29rRmVlZERpYWxvZyxcbiAgICBnb29nbGVwbHVzLFxuICAgIGxpbmtlZGluLFxuICAgIHBpbnRlcmVzdCxcbiAgICByZWRkaXQsXG4gICAgcmVucmVuLFxuICAgIHNtcyxcbiAgICB0d2l0dGVyLFxuICAgIHZrb250YWt0ZSxcbiAgICB3ZWlibyxcbiAgICB3aGF0c2FwcFxufTtcbiIsImltcG9ydCBwb3B1cCBmcm9tICcuLi9wb3B1cCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxpbmtlZGluKHVybCwgdGl0bGUgPSAnJykge1xuICAgIHVybCA9IGVuY29kZVVSSUNvbXBvbmVudCh1cmwpO1xuICAgIHRpdGxlID0gZW5jb2RlVVJJQ29tcG9uZW50KHRpdGxlKTtcbiAgICByZXR1cm4gcG9wdXAoYGh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9zaGFyZUFydGljbGU/bWluaT10cnVlJnVybD0ke3VybH0mdGl0bGU9JHt0aXRsZX1gKTtcbn1cbiIsImltcG9ydCBwb3B1cCBmcm9tICcuLi9wb3B1cCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBpbnRlcmVzdCh1cmwsIG1lZGlhLCBkZXNjID0gJycpIHtcbiAgICB1cmwgPSBlbmNvZGVVUklDb21wb25lbnQodXJsKTtcbiAgICBtZWRpYSA9IGVuY29kZVVSSUNvbXBvbmVudChtZWRpYSk7XG4gICAgZGVzYyA9IGVuY29kZVVSSUNvbXBvbmVudChkZXNjKTtcbiAgICByZXR1cm4gcG9wdXAoYGh0dHBzOi8vcGludGVyZXN0LmNvbS9waW4vY3JlYXRlL2J1dHRvbi8/dXJsPSR7dXJsfSZtZWRpYT0ke21lZGlhfSZkZXNjcmlwdGlvbj0ke2Rlc2N9YCk7XG59XG4iLCJpbXBvcnQgcG9wdXAgZnJvbSAnLi4vcG9wdXAnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZWRkaXQodXJsLCB0aXRsZSA9ICcnKSB7XG4gICAgdXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KHVybCk7XG4gICAgdGl0bGUgPSBlbmNvZGVVUklDb21wb25lbnQodGl0bGUpO1xuICAgIHJldHVybiBwb3B1cChgaHR0cHM6Ly93d3cucmVkZGl0LmNvbS9zdWJtaXQ/dXJsPSR7dXJsfSZ0aXRsZT0ke3RpdGxlfWApO1xufVxuIiwiaW1wb3J0IHBvcHVwIGZyb20gJy4uL3BvcHVwJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdmtvbnRha3RlKHVybCwgdGl0bGUgPSAnJykge1xuICAgIHVybCA9IGVuY29kZVVSSUNvbXBvbmVudCh1cmwpO1xuICAgIHRpdGxlID0gZW5jb2RlVVJJQ29tcG9uZW50KHRpdGxlKTtcbiAgICByZXR1cm4gcG9wdXAoYGh0dHA6Ly9zaGFyZS5yZW5yZW4uY29tL3NoYXJlL2J1dHRvbnNoYXJlLmRvP2xpbms9JHt1cmx9JnRpdGxlPSR7dGl0bGV9YCk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzbXModXJsLCBib2R5ID0gJycpIHtcbiAgICB1cmwgPSBlbmNvZGVVUklDb21wb25lbnQodXJsKTtcblxuICAgIGNvbnN0IG5ld2xpbmVzID0gZW5jb2RlVVJJQ29tcG9uZW50KCdcXHJcXG5cXHJcXG4nKTtcbiAgICBib2R5ID0gYm9keSA/IGAke2VuY29kZVVSSUNvbXBvbmVudChib2R5KX0ke25ld2xpbmVzfWAgOiAnJztcblxuICAgIGNvbnN0IGlvcyA9IC9pUFthb11kfGlQaG9uZS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgY29uc3QgZGVsaW0gPSBpb3MgPyAnJicgOiAnPyc7XG5cbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGBzbXM6JHtkZWxpbX1ib2R5PSR7Ym9keX0ke3VybH1gO1xufVxuIiwiaW1wb3J0IHBvcHVwIGZyb20gJy4uL3BvcHVwJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdHdpdHRlcih1cmwsIHRleHQgPSAnJywgaGFzaHRhZ3MgPSAnJywgcmVsYXRlZCA9ICcnKSB7XG4gICAgdXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KHVybCk7XG4gICAgdGV4dCA9IGVuY29kZVVSSUNvbXBvbmVudCh0ZXh0KTtcbiAgICBoYXNodGFncyA9IGVuY29kZVVSSUNvbXBvbmVudChoYXNodGFncyk7XG4gICAgcmVsYXRlZCA9IGVuY29kZVVSSUNvbXBvbmVudChyZWxhdGVkKTtcblxuICAgIHJldHVybiBwb3B1cChgaHR0cHM6Ly90d2l0dGVyLmNvbS9pbnRlbnQvdHdlZXQ/dXJsPSR7dXJsfSZ0ZXh0PSR7dGV4dH0maGFzaHRhZ3M9JHtoYXNodGFnc30mcmVsYXRlZD0ke3JlbGF0ZWR9YCk7XG59XG4iLCJpbXBvcnQgcG9wdXAgZnJvbSAnLi4vcG9wdXAnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB2a29udGFrdGUodXJsLCB0aXRsZSA9ICcnLCBkZXNjcmlwdGlvbiA9ICcnLCBpbWFnZSA9ICcnKSB7XG4gICAgdXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KHVybCk7XG4gICAgdGl0bGUgPSBlbmNvZGVVUklDb21wb25lbnQodGl0bGUpO1xuICAgIGRlc2NyaXB0aW9uID0gZW5jb2RlVVJJQ29tcG9uZW50KGRlc2NyaXB0aW9uKTtcbiAgICBpbWFnZSA9IGVuY29kZVVSSUNvbXBvbmVudChpbWFnZSk7XG4gICAgcmV0dXJuIHBvcHVwKGBodHRwOi8vdmtvbnRha3RlLnJ1L3NoYXJlLnBocD91cmw9JHt1cmx9JnRpdGxlPSR7dGl0bGV9JmRlc2NyaXB0aW9uPSR7ZGVzY3JpcHRpb259JmltYWdlPSR7aW1hZ2V9YCk7XG59XG4iLCJpbXBvcnQgcG9wdXAgZnJvbSAnLi4vcG9wdXAnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB3ZWlibyh1cmwsIHRpdGxlID0gJycsIGltYWdlID0gJycpIHtcbiAgICB1cmwgPSBlbmNvZGVVUklDb21wb25lbnQodXJsKTtcbiAgICB0aXRsZSA9IGVuY29kZVVSSUNvbXBvbmVudCh0aXRsZSk7XG4gICAgaW1hZ2UgPSBlbmNvZGVVUklDb21wb25lbnQoaW1hZ2UpO1xuXG4gICAgY29uc3QgcGFyYW1zID0gYHVybD0ke3VybH0mYXBwa2V5PSZ0aXRsZT0ke3RpdGxlfSZwaWM9JHtpbWFnZX0mcmFsYXRlVWlkPSZsYW5ndWFnZT16aF9jbmA7XG4gICAgcmV0dXJuIHBvcHVwKGBodHRwOi8vc2VydmljZS53ZWliby5jb20vc2hhcmUvc2hhcmUucGhwPyR7cGFyYW1zfWApO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gd2hhdHNhcHAodXJsLCBib2R5ID0gJycpIHtcbiAgICB1cmwgPSBlbmNvZGVVUklDb21wb25lbnQodXJsKTtcblxuICAgIGNvbnN0IG5ld2xpbmVzID0gZW5jb2RlVVJJQ29tcG9uZW50KCdcXHJcXG5cXHJcXG4nKTtcbiAgICBib2R5ID0gYm9keSA/IGAke2VuY29kZVVSSUNvbXBvbmVudChib2R5KX0ke25ld2xpbmVzfWAgOiAnJztcblxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYHdoYXRzYXBwOi8vc2VuZD90ZXh0PSR7Ym9keX0ke3VybH1gO1xufVxuIiwiZnVuY3Rpb24gbG9hZChrZXkpIHtcbiAgICBsZXQgaXRlbSA9IG51bGw7XG5cbiAgICB0cnkge1xuICAgICAgICBpdGVtID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgICB9IGNhdGNoIChlcnIpIHt9XG5cbiAgICByZXR1cm4gaXRlbTtcbn1cblxuZnVuY3Rpb24gc2F2ZShrZXksIGl0ZW0pIHtcbiAgICB0cnkge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIGl0ZW0pO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignQ291bGRuXFwndCBzYXZlIGluIGxvY2FsU3RvcmFnZScpO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGxvYWRKU09OKGtleSkge1xuICAgIGNvbnN0IGl0ZW0gPSBsb2FkKGtleSk7XG4gICAgcmV0dXJuIGl0ZW0gPyBKU09OLnBhcnNlKGl0ZW0pIDogbnVsbDtcbn1cblxuZnVuY3Rpb24gc2F2ZUpTT04oa2V5LCBpdGVtKSB7XG4gICAgcmV0dXJuIHNhdmUoa2V5LCBKU09OLnN0cmluZ2lmeShpdGVtKSk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZShrZXkpIHtcbiAgICB0cnkge1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICAgIH0gY2F0Y2ggKGVycikge31cbn1cblxuZXhwb3J0IGRlZmF1bHQge2xvYWQsIHNhdmUsIGxvYWRKU09OLCBzYXZlSlNPTiwgcmVtb3ZlfTtcbiIsIi8vIGV2ZXJ5dGhpbmcgYWZ0ZXIgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2Ygc3Vic3RyIGluIHN0clxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWZ0ZXJGaXJzdChzdHIsIHN1YnN0cikge1xuICAgIGxldCBpbmRleCA9IHN0ci5pbmRleE9mKHN1YnN0cik7XG4gICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGluZGV4ICs9IHN1YnN0ci5sZW5ndGg7XG4gICAgcmV0dXJuIHN0ci5zbGljZShpbmRleCk7XG59XG4iLCIvLyBldmVyeXRoaW5nIGFmdGVyIHRoZSBsYXN0IG9jY3VyZW5jZSBvZiBzdWJzdHIgaW4gc3RyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhZnRlckxhc3Qoc3RyLCBzdWJzdHIpIHtcbiAgICBsZXQgaW5kZXggPSBzdHIubGFzdEluZGV4T2Yoc3Vic3RyKTtcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgaW5kZXggKz0gc3Vic3RyLmxlbmd0aDtcbiAgICByZXR1cm4gc3RyLnNsaWNlKGluZGV4KTtcbn1cbiIsIi8vIGV2ZXJ5dGhpbmcgYmVmb3JlIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIHN1YnN0ciBpbiBzdHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJlZm9yZUZpcnN0KHN0ciwgc3Vic3RyKSB7XG4gICAgY29uc3QgaW5kZXggPSBzdHIuaW5kZXhPZihzdWJzdHIpO1xuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICByZXR1cm4gc3RyLnNsaWNlKDAsIGluZGV4KTtcbn1cbiIsIi8vIGV2ZXJ5dGhpbmcgYmVmb3JlIHRoZSBsYXN0IG9jY3VycmVuY2Ugb2Ygc3Vic3RyIGluIHRoZSBzdHJpbmcuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBiZWZvcmVMYXN0KHN0ciwgc3Vic3RyKSB7XG4gICAgY29uc3QgaW5kZXggPSBzdHIubGFzdEluZGV4T2Yoc3Vic3RyKTtcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgcmV0dXJuIHN0ci5zbGljZSgwLCBpbmRleCk7XG59XG4iLCIvLyB3aGV0aGVyIHN0ciBiZWdpbnMgd2l0aCBzdWJzdHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJlZ2luc1dpdGgoc3RyLCBzdWJzdHIpIHtcbiAgICByZXR1cm4gc3RyLmluZGV4T2Yoc3Vic3RyKSA9PT0gMDtcbn1cbiIsIi8vIGV2ZXJ5dGhpbmcgYWZ0ZXIgdGhlIGZpcnN0IG9jY3VyYW5jZSBvZiBzdGFydCBhbmQgYmVmb3JlIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIGVuZFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmV0d2VlbihzdHIsIHN0YXJ0LCBlbmQpIHtcbiAgICBsZXQgc3Vic3RyID0gJyc7XG4gICAgbGV0IHN0YXJ0SW5kZXggPSBzdHIuaW5kZXhPZihzdGFydCk7XG4gICAgaWYgKHN0YXJ0SW5kZXggIT09IC0xKSB7XG4gICAgICAgIHN0YXJ0SW5kZXggKz0gc3RhcnQubGVuZ3RoO1xuICAgICAgICBjb25zdCBlbmRJbmRleCA9IHN0ci5pbmRleE9mKGVuZCwgc3RhcnRJbmRleCk7XG4gICAgICAgIGlmIChlbmRJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHN1YnN0ciA9IHN0ci5zbGljZShzdGFydEluZGV4LCBlbmRJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN1YnN0cjtcbn1cbiIsImltcG9ydCBlc2NhcGVQYXR0ZXJuIGZyb20gJy4vZXNjYXBlUGF0dGVybic7XG5pbXBvcnQgdHJ1bmNhdGUgZnJvbSAnLi90cnVuY2F0ZSc7XG4vLyBVdGlsaXR5IG1ldGhvZCB0aGF0IGludGVsbGlnZW50bHkgYnJlYWtzIHVwIHlvdXIgc3RyaW5nLFxuLy8gYWxsb3dpbmcgeW91IHRvIGNyZWF0ZSBibG9ja3Mgb2YgcmVhZGFibGUgdGV4dC5cbi8vIFRoaXMgbWV0aG9kIHJldHVybnMgeW91IHRoZSBjbG9zZXN0IHBvc3NpYmxlIG1hdGNoIHRvIHRoZSBkZWxpbSBwYXJhbWF0ZXIsXG4vLyB3aGlsZSBrZWVwaW5nIHRoZSB0ZXh0IGxlbmd0aCB3aXRoaW4gdGhlIGxlbiBwYXJhbXRlci5cbi8vIElmIGEgbWF0Y2ggY2FuJ3QgYmUgZm91bmQgaW4geW91ciBzcGVjaWZpZWQgbGVuZ3RoIGFuICAnLi4uJyBpcyBhZGRlZCB0byB0aGF0IGJsb2NrLFxuLy8gYW5kIHRoZSBibG9ja2luZyBjb250aW51ZXMgdW50aWxsIGFsbCB0aGUgdGV4dCBpcyBicm9rZW4gYXBhcnQuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBibG9jayhzdHIsIGxlbiwgZGVsaW0gPSAnLicpIHtcbiAgICBjb25zdCBhcnIgPSBbXTtcblxuICAgIGlmICghc3RyIHx8ICFzdHIuaW5jbHVkZXMoZGVsaW0pKSB7XG4gICAgICAgIHJldHVybiBhcnI7XG4gICAgfVxuXG4gICAgaWYgKGRlbGltID09PSAnICcpIHtcbiAgICAgICAgc3RyICs9IGRlbGltO1xuICAgIH1cblxuICAgIGxldCBjaHJJbmRleCA9IDA7XG4gICAgY29uc3QgcmVwbFBhdHQgPSBuZXcgUmVnRXhwKCdbXicgKyBlc2NhcGVQYXR0ZXJuKGRlbGltKSArICddKyQnKTtcblxuICAgIHdoaWxlIChjaHJJbmRleCA8IHN0ci5sZW5ndGgpIHtcbiAgICAgICAgbGV0IHN1YlN0cmluZyA9IHN0ci5zdWJzdHIoY2hySW5kZXgsIGxlbik7XG4gICAgICAgIGlmICghc3ViU3RyaW5nLmluY2x1ZGVzKGRlbGltKSkge1xuICAgICAgICAgICAgYXJyLnB1c2godHJ1bmNhdGUoc3ViU3RyaW5nLCBzdWJTdHJpbmcubGVuZ3RoKSk7XG4gICAgICAgICAgICBjaHJJbmRleCArPSBzdWJTdHJpbmcubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIHN1YlN0cmluZyA9IHN1YlN0cmluZy5yZXBsYWNlKHJlcGxQYXR0LCAnJyk7XG4gICAgICAgIGNockluZGV4ICs9IHN1YlN0cmluZy5sZW5ndGg7XG4gICAgICAgIGFyci5wdXNoKHN1YlN0cmluZy50cmltKCkpO1xuICAgIH1cbiAgICByZXR1cm4gYXJyO1xufVxuIiwiLy8gQ2FwaXRhbGl6ZSB0aGUgZmlyc3Qgd29yZCBpbiBhIHN0cmluZyBvciBhbGwgd29yZHNcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNhcGl0YWxpemUoc3RyLCBhbGwgPSBmYWxzZSkge1xuICAgIGNvbnN0IHN1YnN0ciA9IHN0ci50cmltTGVmdCgpO1xuICAgIGNvbnN0IHJlID0gYWxsID8gL14ufFxcYi4vZyA6IC8oXlxcdykvO1xuICAgIHJldHVybiBzdWJzdHIucmVwbGFjZShyZSwgKG1hdGNoKSA9PiBtYXRjaC50b1VwcGVyQ2FzZSgpKTtcbn1cbiIsImltcG9ydCBlc2NhcGVQYXR0ZXJuIGZyb20gJy4vZXNjYXBlUGF0dGVybic7XG5cbi8vIHRoZSBudW1iZXIgb2YgdGltZXMgc3Vic3RyIGFwcGVhcnMgd2l0aGluIHN0clxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY291bnRPZihzdHIsIHN1YnN0ciwgY2FzZVNlbnNpdGl2ZSkge1xuICAgIGNvbnN0IGVzY2FwZWRTdHIgPSBlc2NhcGVQYXR0ZXJuKHN1YnN0cik7XG4gICAgY29uc3QgZmxhZ3MgPSAoIWNhc2VTZW5zaXRpdmUpID8gJ2lnJyA6ICdnJztcbiAgICByZXR1cm4gc3RyLm1hdGNoKG5ldyBSZWdFeHAoZXNjYXBlZFN0ciwgZmxhZ3MpKS5sZW5ndGg7XG59XG4iLCIvLyBMZXZlbnNodGVpbiBkaXN0YW5jZSAoZWRpdERpc3RhbmNlKSBpcyBhIG1lYXN1cmUgb2YgdGhlIHNpbWlsYXJpdHkgYmV0d2VlblxuLy8gdHdvIHN0cmluZ3MuIFRoZSBkaXN0YW5jZSBpcyB0aGUgbnVtYmVyIG9mIGRlbGV0aW9ucywgaW5zZXJ0aW9ucywgb3Jcbi8vIHN1YnN0aXR1dGlvbnMgcmVxdWlyZWQgdG8gdHJhbnNmb3JtIHNvdXJjZSBpbnRvIHRhcmdldC5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGVkaXREaXN0YW5jZShzb3VyY2UgPSAnJywgdGFyZ2V0ID0gJycpIHtcblxuICAgIGlmIChzb3VyY2UgPT09IHRhcmdldCkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICBpZiAoIXNvdXJjZS5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldC5sZW5ndGg7XG4gICAgfVxuXG4gICAgaWYgKCF0YXJnZXQubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2UubGVuZ3RoO1xuICAgIH1cblxuICAgIGNvbnN0IGQgPSBbXTtcbiAgICBsZXQgaSwgaiwgY29zdDtcblxuICAgIGZvciAoaSA9IDA7IGkgPD0gc291cmNlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGRbaV0gPSBbXTtcbiAgICB9XG4gICAgZm9yIChpID0gMDsgaSA8PSBzb3VyY2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZFtpXVswXSA9IGk7XG4gICAgfVxuICAgIGZvciAoaiA9IDA7IGogPD0gdGFyZ2V0Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGRbMF1bal0gPSBqO1xuICAgIH1cblxuICAgIGZvciAoaSA9IDE7IGkgPD0gc291cmNlLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgY29uc3Qgc2kgPSBzb3VyY2UuY2hhckF0KGkgLSAxKTtcbiAgICAgICAgZm9yIChqID0gMTsgaiA8PSB0YXJnZXQubGVuZ3RoOyBqKyspIHtcblxuICAgICAgICAgICAgY29uc3QgdGogPSB0YXJnZXQuY2hhckF0KGogLSAxKTtcblxuICAgICAgICAgICAgaWYgKHNpID09PSB0aikge1xuICAgICAgICAgICAgICAgIGNvc3QgPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb3N0ID0gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZFtpXVtqXSA9IE1hdGgubWluKGRbaSAtIDFdW2pdICsgMSwgZFtpXVtqIC0gMV0gKyAxLCBkW2kgLSAxXVtqIC0gMV0gKyBjb3N0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkW3NvdXJjZS5sZW5ndGhdW3RhcmdldC5sZW5ndGhdO1xufVxuIiwiLy8gd2hldGhlciBzdHIgZW5kcyB3aXRoIHN1YnN0clxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZW5kc1dpdGgoc3RyLCBzdWJzdHIpIHtcbiAgICByZXR1cm4gc3RyLmxhc3RJbmRleE9mKHN1YnN0cikgPT09IHN0ci5sZW5ndGggLSBzdWJzdHIubGVuZ3RoO1xufVxuIiwiLy8gZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXNjYXBlSHRtbChzdHIpIHtcbi8vICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbi8vICAgICBkaXYuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoc3RyKSk7XG4vLyAgICAgcmV0dXJuIGRpdi5pbm5lckhUTUw7XG4vLyB9XG5cbmNvbnN0IGVudGl0eU1hcCA9IHtcbiAgICAnJic6ICcmYW1wOycsXG4gICAgJzwnOiAnJmx0OycsXG4gICAgJz4nOiAnJmd0OycsXG4gICAgJ1wiJzogJyZxdW90OycsXG4gICAgJ1xcJyc6ICcmIzM5OycsXG4gICAgJy8nOiAnJiN4MkY7JyxcbiAgICAnYCc6ICcmI3g2MDsnLFxuICAgICc9JzogJyYjeDNEOydcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGVzY2FwZUh0bWwoc3RyaW5nKSB7XG4gICAgcmV0dXJuIFN0cmluZyhzdHJpbmcpXG4gICAgICAgIC5yZXBsYWNlKC9bJjw+XCInYD1cXC9dL2csIGZ1bmN0aW9uIGZyb21FbnRpdHlNYXAocykge1xuICAgICAgICAgICAgcmV0dXJuIGVudGl0eU1hcFtzXTtcbiAgICAgICAgfSk7XG59XG4iLCIvLyByZWdleCBlc2NhcGUgcGF0dGVyblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXNjYXBlUGF0dGVybihwYXR0ZXJuKSB7XG4gICAgcmV0dXJuIHBhdHRlcm4ucmVwbGFjZSgvKFxcXXxcXFt8XFx7fFxcfXxcXCh8XFwpfFxcKnxcXCt8XFw/fFxcLnxcXFxcKS9nLCAnXFxcXCQxJyk7XG59XG4iLCJpbXBvcnQgcmVtb3ZlRXh0cmFXaGl0ZXNwYWNlIGZyb20gJy4vcmVtb3ZlRXh0cmFXaGl0ZXNwYWNlJztcblxuLy8gd2hldGhlciBzdHIgY29udGFpbnMgYW55IHRleHRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGhhc1RleHQoc3RyKSB7XG4gICAgcmV0dXJuICEhcmVtb3ZlRXh0cmFXaGl0ZXNwYWNlKHN0cikubGVuZ3RoO1xufVxuIiwiaW1wb3J0IGFmdGVyRmlyc3QgZnJvbSAnLi9hZnRlckZpcnN0JztcbmltcG9ydCBhZnRlckxhc3QgZnJvbSAnLi9hZnRlckxhc3QnO1xuaW1wb3J0IGJlZm9yZUZpcnN0IGZyb20gJy4vYmVmb3JlRmlyc3QnO1xuaW1wb3J0IGJlZm9yZUxhc3QgZnJvbSAnLi9iZWZvcmVMYXN0JztcbmltcG9ydCBiZWdpbnNXaXRoIGZyb20gJy4vYmVnaW5zV2l0aCc7XG5pbXBvcnQgYmV0d2VlbiBmcm9tICcuL2JldHdlZW4nO1xuaW1wb3J0IGJsb2NrIGZyb20gJy4vYmxvY2snO1xuaW1wb3J0IGNhcGl0YWxpemUgZnJvbSAnLi9jYXBpdGFsaXplJztcbmltcG9ydCBjb3VudE9mIGZyb20gJy4vY291bnRPZic7XG5pbXBvcnQgZWRpdERpc3RhbmNlIGZyb20gJy4vZWRpdERpc3RhbmNlJztcbmltcG9ydCBlbmRzV2l0aCBmcm9tICcuL2VuZHNXaXRoJztcbmltcG9ydCBlc2NhcGVIVE1MIGZyb20gJy4vZXNjYXBlSFRNTCc7XG5pbXBvcnQgZXNjYXBlUGF0dGVybiBmcm9tICcuL2VzY2FwZVBhdHRlcm4nO1xuaW1wb3J0IGhhc1RleHQgZnJvbSAnLi9oYXNUZXh0JztcbmltcG9ydCBpc051bWVyaWMgZnJvbSAnLi9pc051bWVyaWMnO1xuaW1wb3J0IHBhZExlZnQgZnJvbSAnLi9wYWRMZWZ0JztcbmltcG9ydCBwYWRSaWdodCBmcm9tICcuL3BhZFJpZ2h0JztcbmltcG9ydCBwcmV2ZW50V2lkb3cgZnJvbSAnLi9wcmV2ZW50V2lkb3cnO1xuaW1wb3J0IHByb3BlckNhc2UgZnJvbSAnLi9wcm9wZXJDYXNlJztcbmltcG9ydCByZW1vdmUgZnJvbSAnLi9yZW1vdmUnO1xuaW1wb3J0IHJlbW92ZUV4dHJhV2hpdGVzcGFjZSBmcm9tICcuL3JlbW92ZUV4dHJhV2hpdGVzcGFjZSc7XG5pbXBvcnQgcmV2ZXJzZSBmcm9tICcuL3JldmVyc2UnO1xuaW1wb3J0IHJldmVyc2VXb3JkcyBmcm9tICcuL3JldmVyc2VXb3Jkcyc7XG5pbXBvcnQgc2ltaWxhcml0eSBmcm9tICcuL3NpbWlsYXJpdHknO1xuaW1wb3J0IHN0cmlwVGFncyBmcm9tICcuL3N0cmlwVGFncyc7XG5pbXBvcnQgc3dhcENhc2UgZnJvbSAnLi9zd2FwQ2FzZSc7XG5pbXBvcnQgdGltZUNvZGUgZnJvbSAnLi90aW1lQ29kZSc7XG5pbXBvcnQgdG9OdW1iZXIgZnJvbSAnLi90b051bWJlcic7XG5pbXBvcnQgdHJ1bmNhdGUgZnJvbSAnLi90cnVuY2F0ZSc7XG5pbXBvcnQgd29yZENvdW50IGZyb20gJy4vd29yZENvdW50JztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGFmdGVyRmlyc3QsXG4gICAgYWZ0ZXJMYXN0LFxuICAgIGJlZm9yZUZpcnN0LFxuICAgIGJlZm9yZUxhc3QsXG4gICAgYmVnaW5zV2l0aCxcbiAgICBiZXR3ZWVuLFxuICAgIGJsb2NrLFxuICAgIGNhcGl0YWxpemUsXG4gICAgY291bnRPZixcbiAgICBlZGl0RGlzdGFuY2UsXG4gICAgZW5kc1dpdGgsXG4gICAgZXNjYXBlSFRNTCxcbiAgICBlc2NhcGVQYXR0ZXJuLFxuICAgIGhhc1RleHQsXG4gICAgaXNOdW1lcmljLFxuICAgIHBhZExlZnQsXG4gICAgcGFkUmlnaHQsXG4gICAgcHJldmVudFdpZG93LFxuICAgIHByb3BlckNhc2UsXG4gICAgcmVtb3ZlLFxuICAgIHJlbW92ZUV4dHJhV2hpdGVzcGFjZSxcbiAgICByZXZlcnNlLFxuICAgIHJldmVyc2VXb3JkcyxcbiAgICBzaW1pbGFyaXR5LFxuICAgIHN0cmlwVGFncyxcbiAgICBzd2FwQ2FzZSxcbiAgICB0aW1lQ29kZSxcbiAgICB0b051bWJlcixcbiAgICB0cnVuY2F0ZSxcbiAgICB3b3JkQ291bnRcbn07XG4iLCIvLyB3aGV0aGVyIHN0ciBpcyBudW1lcmljXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc051bWVyaWMoc3RyKSB7XG4gICAgY29uc3QgcmVneCA9IC9eWy0rXT9cXGQqXFwuP1xcZCsoPzpbZUVdWy0rXT9cXGQrKT8kLztcbiAgICByZXR1cm4gcmVneC50ZXN0KHN0cik7XG59XG4iLCIvLyBwYWQgc3RyIHdpdGggc3Vic3RyIGZyb20gdGhlIGxlZnRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhZExlZnQoc3RyLCBzdWJzdHIsIGxlbmd0aCkge1xuICAgIHN0ciA9IFN0cmluZyhzdHIpO1xuICAgIHdoaWxlIChzdHIubGVuZ3RoIDwgbGVuZ3RoKSB7XG4gICAgICAgIHN0ciA9IHN1YnN0ciArIHN0cjtcbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbn1cbiIsIi8vIHBhZHMgc3RyIHdpdGggc3Vic3RyIGZyb20gdGhlIHJpZ2h0XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYWRSaWdodChzdHIsIHN1YnN0ciwgbGVuZ3RoKSB7XG4gICAgc3RyID0gU3RyaW5nKHN0cik7XG4gICAgd2hpbGUgKHN0ci5sZW5ndGggPCBsZW5ndGgpIHtcbiAgICAgICAgc3RyICs9IHN1YnN0cjtcbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHByZXZlbnRXaWRvdyhzdHIpIHtcbiAgICBzdHIgPSBzdHIudHJpbSgpO1xuXG4gICAgY29uc3QgbGFzdFNwYWNlID0gc3RyLmxhc3RJbmRleE9mKCcgJyk7XG4gICAgaWYgKGxhc3RTcGFjZSA+IDApIHtcbiAgICAgICAgcmV0dXJuIGAke3N0ci5zbGljZSgwLCBsYXN0U3BhY2UpfSZuYnNwOyR7c3RyLnNsaWNlKGxhc3RTcGFjZSArIDEpfWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0cjtcbn1cbiIsImltcG9ydCBjYXBpdGFsaXplIGZyb20gJy4vY2FwaXRhbGl6ZSc7XG5cbi8vIHByb3BlciBjYXNlIHN0ciBpbiBzZW50ZW5jZSBmb3JtYXRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHByb3BlckNhc2Uoc3RyKSB7XG4gICAgY29uc3QgbmV3U3RyID0gc3RyLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxiKFteLj87IV0rKS8sIGNhcGl0YWxpemUpO1xuICAgIHJldHVybiBuZXdTdHIucmVwbGFjZSgvXFxiW2ldXFxiLywgJ0knKTtcbn1cbiIsImltcG9ydCBlc2NhcGVQYXR0ZXJuIGZyb20gJy4vZXNjYXBlUGF0dGVybic7XG5cbi8vIHJlbW92ZSBhbGwgaW5zdGFuY2VzIG9mIHN1YnN0ciBpbiBzdHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbW92ZShzdHIsIHN1YnN0ciwgY2FzZVNlbnNpdGl2ZSA9IGZhbHNlKSB7XG4gICAgY29uc3QgZXNjYXBlZFN0ciA9IGVzY2FwZVBhdHRlcm4oc3Vic3RyKTtcbiAgICBjb25zdCBmbGFncyA9IGNhc2VTZW5zaXRpdmUgPyAnZycgOiAnaWcnO1xuICAgIHJldHVybiBzdHIucmVwbGFjZShuZXcgUmVnRXhwKGVzY2FwZWRTdHIsIGZsYWdzKSwgJycpO1xufVxuIiwiLy8gcmVtb3ZlIGV4dHJhIHdoaXRlc3BhY2UgKGV4dHJhIHNwYWNlcywgdGFicywgbGluZSBicmVha3MsIGV0YylcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbW92ZUV4dHJhV2hpdGVzcGFjZShzdHIpIHtcbiAgICByZXR1cm4gc3RyLnRyaW0oKS5yZXBsYWNlKC9cXHMrL2csICcgJyk7XG59XG4iLCIvLyByZXZlcnNlIGNoYXJhY3RlciBvcmRlclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmV2ZXJzZShzdHIpIHtcbiAgICByZXR1cm4gc3RyLnNwbGl0KCcnKS5yZXZlcnNlKCkuam9pbignJyk7XG59XG4iLCIvLyByZXZlcnNlIHdvcmQgb3JkZXJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJldmVyc2VXb3JkcyhzdHIpIHtcbiAgICByZXR1cm4gc3RyLnNwbGl0KCcgJykucmV2ZXJzZSgpLmpvaW4oJyAnKTtcbn1cbiIsImltcG9ydCBlZGl0RGlzdGFuY2UgZnJvbSAnLi9lZGl0RGlzdGFuY2UnO1xuXG4vLyBwZXJjZW50YWdlIG9mIHNpbWlsaWFyaXR5IGZyb20gMCB0byAxXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzaW1pbGFyaXR5KGEsIGIpIHtcbiAgICBjb25zdCBlID0gZWRpdERpc3RhbmNlKGEsIGIpO1xuICAgIGNvbnN0IG0gPSBNYXRoLm1heChhLmxlbmd0aCwgYi5sZW5ndGgpO1xuICAgIGlmIChtID09PSAwKSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgIH1cbiAgICByZXR1cm4gKDEgLSBlIC8gbSk7XG59XG4iLCIvLyByZW1vdmUgYWxsIEhUTUwgdGFncyBmcm9tIHN0clxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3RyaXBUYWdzKHN0cikge1xuICAgIHJldHVybiBzdHIucmVwbGFjZSgvPFxcLz9bXj5dKz4vaWdtLCAnJyk7XG59XG4iLCJcbi8vIHN3YXBzIHRoZSBjYXNlIG9mIHN0clxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3dhcENhc2Uoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC8oXFx3KS8sIGZ1bmN0aW9uKG5ld1N0cikge1xuICAgICAgICBjb25zdCBsb3dlciA9IG5ld1N0ci50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCB1cHBlciA9IG5ld1N0ci50b1VwcGVyQ2FzZSgpO1xuICAgICAgICBzd2l0Y2ggKG5ld1N0cikge1xuICAgICAgICAgICAgY2FzZSBsb3dlcjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdXBwZXI7XG4gICAgICAgICAgICBjYXNlIHVwcGVyOlxuICAgICAgICAgICAgICAgIHJldHVybiBsb3dlcjtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld1N0cjtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuIiwiLy8gZm9ybWF0cyBzZWNvbmRzIGludG8gSEg6TU06U1NcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRpbWVDb2RlKHNlY29uZHMsIGRlbGltID0gJzonKSB7XG4gICAgY29uc3QgaCA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDM2MDApO1xuICAgIGNvbnN0IG0gPSBNYXRoLmZsb29yKChzZWNvbmRzICUgMzYwMCkgLyA2MCk7XG4gICAgY29uc3QgcyA9IE1hdGguZmxvb3IoKHNlY29uZHMgJSAzNjAwKSAlIDYwKTtcbiAgICBjb25zdCBociA9IChoIDwgMTAgPyAnMCcgKyBoIDogaCkgKyBkZWxpbTtcbiAgICBjb25zdCBtbiA9IChtIDwgMTAgPyAnMCcgKyBtIDogbSkgKyBkZWxpbTtcbiAgICBjb25zdCBzYyA9IChzIDwgMTAgPyAnMCcgKyBzIDogcyk7XG4gICAgcmV0dXJuIGhyICsgbW4gKyBzYztcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRvTnVtYmVyKHN0cikge1xuICAgIHJldHVybiBOdW1iZXIoc3RyLnJlcGxhY2UoL1teMC05Ll0vZywgJycpKTtcbn1cbiIsIi8vIHRydW5jYXRlIHRvIGxlbmd0aCB3aXRoIHN1ZmZpeFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdHJ1bmNhdGUoc3RyLCBsZW4sIHN1ZmZpeCA9ICcuLi4nKSB7XG4gICAgbGVuIC09IHN1ZmZpeC5sZW5ndGg7XG4gICAgbGV0IHRydW5jID0gc3RyO1xuICAgIGlmICh0cnVuYy5sZW5ndGggPiBsZW4pIHtcbiAgICAgICAgdHJ1bmMgPSB0cnVuYy5zdWJzdHIoMCwgbGVuKTtcbiAgICAgICAgY29uc3QgciA9IC9bXlxcc10vO1xuICAgICAgICBpZiAoci50ZXN0KHN0ci5jaGFyQXQobGVuKSkpIHtcbiAgICAgICAgICAgIHRydW5jID0gdHJ1bmMucmVwbGFjZSgvXFx3KyR8XFxzKyQvLCAnJykudHJpbVJpZ2h0KCk7XG4gICAgICAgIH1cbiAgICAgICAgdHJ1bmMgKz0gc3VmZml4O1xuICAgIH1cbiAgICByZXR1cm4gdHJ1bmM7XG59XG4iLCIvLyB0aGUgbnVtYmVyIG9mIHdvcmRzIGluIGEgc3RyaW5nXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB3b3JkQ291bnQoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5tYXRjaCgvXFxiXFx3K1xcYi9nKS5sZW5ndGg7XG59XG4iLCIvLyBpbXBvcnQgU2lnbmFsIGZyb20gJ3NpZ25hbHMnO1xuaW1wb3J0IE1pbmlTaWduYWwgZnJvbSAnbWluaS1zaWduYWxzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGlja2VyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy51cGRhdGUgPSB0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpO1xuICAgICAgICAvLyB0aGlzLm9uVXBkYXRlID0gbmV3IFNpZ25hbCgpO1xuICAgICAgICB0aGlzLm9uVXBkYXRlID0gbmV3IE1pbmlTaWduYWwoKTtcblxuICAgICAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5sYXN0ID0gMDtcbiAgICAgICAgLy8gdGhpcy5hY2N1bXVsYXRlZCA9IDA7XG4gICAgICAgIC8vIHRoaXMuc3RlcCA9IDEwMDAgLyA2MDtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgaWYgKHRoaXMucnVubmluZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5ydW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG5cbiAgICBzdG9wKCkge1xuICAgICAgICBpZiAoIXRoaXMucnVubmluZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICBpZiAoIXRoaXMucnVubmluZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZSk7XG5cbiAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgbGV0IGR0ID0gbm93IC0gdGhpcy5sYXN0O1xuICAgICAgICBpZiAoZHQgPiAyMCkge1xuICAgICAgICAgICAgZHQgPSAyMDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxhc3QgPSBub3c7XG5cbiAgICAgICAgLy8gIC8vIGZpeGVkIHN0ZXA6XG4gICAgICAgIC8vIHRoaXMuYWNjdW11bGF0ZWQgKz0gZHQ7XG4gICAgICAgIC8vXG4gICAgICAgIC8vIHdoaWxlICh0aGlzLmFjY3VtdWxhdGVkID49IHRoaXMuc3RlcCkge1xuICAgICAgICAvLyAgICAgdGhpcy5hY2N1bXVsYXRlZCAtPSB0aGlzLnN0ZXA7XG4gICAgICAgIC8vICAgICB0aGlzLm9uVXBkYXRlLmRpc3BhdGNoKHRoaXMuc3RlcCk7XG4gICAgICAgIC8vIH1cblxuICAgICAgICB0aGlzLm9uVXBkYXRlLmRpc3BhdGNoKGR0ICogMC4wMDEpO1xuICAgIH1cblxuICAgIGFkZChmbiwgY29udGV4dCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vblVwZGF0ZS5hZGQoZm4sIGNvbnRleHQpO1xuICAgIH1cblxuICAgIHJlbW92ZShiaW5kaW5nKSB7XG4gICAgICAgIHRoaXMub25VcGRhdGUuZGV0YWNoKGJpbmRpbmcpO1xuICAgIH1cblxuICAgIC8vIHJlbW92ZShmbiwgY29udGV4dCkge1xuICAgIC8vICAgICB0aGlzLm9uVXBkYXRlLnJlbW92ZShmbiwgY29udGV4dCk7XG4gICAgLy8gfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXZlbnQoY2F0ZWdvcnksIGFjdGlvbiwgbGFiZWwsIHZhbHVlKSB7XG4gICAgaWYgKCF3aW5kb3cuZ2EpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB3aW5kb3cuZ2EoJ3NlbmQnLCAnZXZlbnQnLCBjYXRlZ29yeSwgYWN0aW9uLCBsYWJlbCwgdmFsdWUpO1xufVxuIiwiaW1wb3J0IGV2ZW50IGZyb20gJy4vZXZlbnQnO1xuaW1wb3J0IHBhZ2V2aWV3IGZyb20gJy4vcGFnZXZpZXcnO1xuaW1wb3J0IGxvYWQgZnJvbSAnLi9sb2FkJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGV2ZW50LFxuICAgIHBhZ2V2aWV3LFxuICAgIGxvYWRcbn07XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsb2FkKGdhQWNjb3VudCkge1xuICAgIGNvbnNvbGUubG9nKCdJbml0aWFsaXplIEdvb2dsZSBBbmFseXRpY3Mgd2l0aCBhY2NvdW50IElkOicsIGdhQWNjb3VudCk7XG5cbiAgICAvKmVzbGludC1kaXNhYmxlKi9cbiAgICAoZnVuY3Rpb24oaSxzLG8sZyxyLGEsbSl7aVsnR29vZ2xlQW5hbHl0aWNzT2JqZWN0J109cjtpW3JdPWlbcl18fGZ1bmN0aW9uKCl7XG5cdChpW3JdLnE9aVtyXS5xfHxbXSkucHVzaChhcmd1bWVudHMpfSxpW3JdLmw9MSpuZXcgRGF0ZSgpO2E9cy5jcmVhdGVFbGVtZW50KG8pLFxuXHRtPXMuZ2V0RWxlbWVudHNCeVRhZ05hbWUobylbMF07YS5hc3luYz0xO2Euc3JjPWc7bS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShhLG0pXG5cdH0pKHdpbmRvdyxkb2N1bWVudCwnc2NyaXB0JywnLy93d3cuZ29vZ2xlLWFuYWx5dGljcy5jb20vYW5hbHl0aWNzLmpzJywnZ2EnKTtcbiAgICAvKmVzbGludC1lbmFibGUqL1xuXG4gICAgd2luZG93LmdhKCdjcmVhdGUnLCBnYUFjY291bnQsICdhdXRvJyk7XG4gICAgd2luZG93LmdhKCdzZW5kJywgJ3BhZ2V2aWV3Jyk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYWdldmlldyhwYXRoKSB7XG4gICAgaWYgKCF3aW5kb3cuZ2EpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB3aW5kb3cuZ2EoJ3NlbmQnLCAncGFnZXZpZXcnLCBwYXRoKTtcbn1cbiIsImltcG9ydCB7ZWFzZU91dFF1YWR9IGZyb20gJy4uL2Vhc2UvcXVhZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFR3ZWVuIHtcbiAgICBjb25zdHJ1Y3RvcihvYiwgcHJvcHMsIGR1cmF0aW9uLCBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMub2IgPSBvYjtcblxuICAgICAgICBpZiAocHJvcHMpIHtcbiAgICAgICAgICAgIHRoaXMudG8ocHJvcHMsIGR1cmF0aW9uLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvKHByb3BzLCBkdXJhdGlvbiwgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHRoaXMuZHVyYXRpb24gPSBkdXJhdGlvbjtcbiAgICAgICAgdGhpcy5lYXNlID0gb3B0aW9ucy5lYXNlIHx8IGVhc2VPdXRRdWFkO1xuICAgICAgICB0aGlzLmRlbGF5ID0gb3B0aW9ucy5kZWxheSB8fCAwO1xuICAgICAgICB0aGlzLm9uVXBkYXRlID0gb3B0aW9ucy5vblVwZGF0ZTtcbiAgICAgICAgdGhpcy5vbkNvbXBsZXRlID0gb3B0aW9ucy5vbkNvbXBsZXRlO1xuICAgICAgICB0aGlzLnRpbWUgPSAwO1xuICAgICAgICB0aGlzLmNvbXBsZXRlID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5fcHJvcHMgPSBPYmplY3Qua2V5cyhwcm9wcyk7XG4gICAgICAgIHRoaXMuX2JlZ2luVmFscyA9IHt9O1xuICAgICAgICB0aGlzLl9jaGFuZ2VWYWxzID0ge307XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9wcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcHJvcCA9IHRoaXMuX3Byb3BzW2ldO1xuICAgICAgICAgICAgdGhpcy5fYmVnaW5WYWxzW3Byb3BdID0gdGhpcy5vYltwcm9wXTtcbiAgICAgICAgICAgIHRoaXMuX2NoYW5nZVZhbHNbcHJvcF0gPSBwcm9wc1twcm9wXSAtIHRoaXMuX2JlZ2luVmFsc1twcm9wXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZShkdCkge1xuICAgICAgICBpZiAodGhpcy50aW1lID09PSB0aGlzLmR1cmF0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kZWxheSA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuZGVsYXkgLT0gZHQ7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRpbWUgKz0gZHQ7XG5cbiAgICAgICAgaWYgKHRoaXMudGltZSA+IHRoaXMuZHVyYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMudGltZSA9IHRoaXMuZHVyYXRpb247XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3Byb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBwcm9wID0gdGhpcy5fcHJvcHNbaV07XG4gICAgICAgICAgICB0aGlzLm9iW3Byb3BdID0gdGhpcy5lYXNlKHRoaXMudGltZSwgdGhpcy5fYmVnaW5WYWxzW3Byb3BdLCB0aGlzLl9jaGFuZ2VWYWxzW3Byb3BdLCB0aGlzLmR1cmF0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9uVXBkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLm9uVXBkYXRlKHRoaXMub2IpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudGltZSA9PT0gdGhpcy5kdXJhdGlvbikge1xuICAgICAgICAgICAgdGhpcy5jb21wbGV0ZSA9IHRydWU7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm9uQ29tcGxldGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ29tcGxldGUodGhpcy5vYik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXNldCgpIHtcbiAgICAgICAgdGhpcy50aW1lID0gMDtcbiAgICAgICAgdGhpcy5jb21wbGV0ZSA9IGZhbHNlO1xuICAgIH1cbn1cbiIsImxldCBoaWRkZW4sXG4gICAgY2hhbmdlO1xuXG5pZiAodHlwZW9mIGRvY3VtZW50LmhpZGRlbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBoaWRkZW4gPSAnaGlkZGVuJztcbiAgICBjaGFuZ2UgPSAndmlzaWJpbGl0eWNoYW5nZSc7XG59IGVsc2UgaWYgKHR5cGVvZiBkb2N1bWVudC5tb3pIaWRkZW4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaGlkZGVuID0gJ21vekhpZGRlbic7XG4gICAgY2hhbmdlID0gJ21venZpc2liaWxpdHljaGFuZ2UnO1xufSBlbHNlIGlmICh0eXBlb2YgZG9jdW1lbnQubXNIaWRkZW4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaGlkZGVuID0gJ21zSGlkZGVuJztcbiAgICBjaGFuZ2UgPSAnbXN2aXNpYmlsaXR5Y2hhbmdlJztcbn0gZWxzZSBpZiAodHlwZW9mIGRvY3VtZW50LndlYmtpdEhpZGRlbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBoaWRkZW4gPSAnd2Via2l0SGlkZGVuJztcbiAgICBjaGFuZ2UgPSAnd2Via2l0dmlzaWJpbGl0eWNoYW5nZSc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBoaWRkZW4sXG4gICAgY2hhbmdlXG59O1xuIiwiaW1wb3J0IGFwaSBmcm9tICcuL2FwaSc7XG5pbXBvcnQgZW1pdHRlciBmcm9tICcuLi9ldmVudHMvZW1pdHRlcic7XG5cbmNvbnN0IHZpc2liaWxpdHkgPSBPYmplY3QuY3JlYXRlKGVtaXR0ZXIucHJvdG90eXBlLCB7XG4gICAgaGlkZGVuOiB7XG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnRbYXBpLmhpZGRlbl07XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuZnVuY3Rpb24gb25WaXNpYmlsaXR5Q2hhbmdlKCkge1xuICAgIGlmIChkb2N1bWVudFthcGkuaGlkZGVuXSkge1xuICAgICAgICB2aXNpYmlsaXR5LmVtaXQoJ2hpZGRlbicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZpc2liaWxpdHkuZW1pdCgnc2hvd24nKTtcbiAgICB9XG59XG5cbmlmIChhcGkuY2hhbmdlKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihhcGkuY2hhbmdlLCBvblZpc2liaWxpdHlDaGFuZ2UsIGZhbHNlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdmlzaWJpbGl0eTtcbiJdfQ==
