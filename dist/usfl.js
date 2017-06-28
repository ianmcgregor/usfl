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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcnJheS9hcnJheS5qcyIsImFycmF5L2Nsb25lLmpzIiwiYXJyYXkvaW5kZXguanMiLCJhcnJheS9tb3ZlRWxlbWVudC5qcyIsImFycmF5L25lYXJlc3QuanMiLCJhcnJheS9yYW5kb21DaG9pY2UuanMiLCJhcnJheS9zb3J0QWxwaGEuanMiLCJhcnJheS9zb3J0TnVtZXJpYy5qcyIsImFycmF5L3NvcnRSYW5kb20uanMiLCJkb20vYmxvY2tTY3JvbGxpbmcuanMiLCJkb20vZWxDb29yZHMuanMiLCJkb20vZm9yY2VSZWRyYXcuanMiLCJkb20vZ2V0UGFnZUhlaWdodC5qcyIsImRvbS9nZXRTY3JvbGxQZXJjZW50YWdlLmpzIiwiZG9tL2dldFNjcm9sbFJlbWFpbmluZy5qcyIsImRvbS9nZXRTY3JvbGxUb3AuanMiLCJkb20vZ2V0U3Jjc2V0SW1hZ2UuanMiLCJkb20vaW5kZXguanMiLCJkb20vaXNFbGVtZW50SW5WaWV3cG9ydC5qcyIsImRvbS9pc1BhZ2VFbmQuanMiLCJkb20vcmVzaXplLmpzIiwiZG9tL3Njcm9sbC5qcyIsImRvbS9zZXRTdHlsZS5qcyIsImRvbS90cmFuc2l0aW9uRW5kLmpzIiwiZWFzZS9iYWNrLmpzIiwiZWFzZS9ib3VuY2UuanMiLCJlYXNlL2NpcmN1bGFyLmpzIiwiZWFzZS9jdWJpYy5qcyIsImVhc2UvZWxhc3RpYy5qcyIsImVhc2UvZXhwby5qcyIsImVhc2UvaW5kZXguanMiLCJlYXNlL2xpbmVhci5qcyIsImVhc2UvcXVhZC5qcyIsImVhc2UvcXVhcnQuanMiLCJlYXNlL3F1aW50LmpzIiwiZWFzZS9zaW5lLmpzIiwiZXZlbnRzL2RlYm91bmNlLmpzIiwiZXZlbnRzL2RlbGVnYXRlRXZlbnRzLmpzIiwiZXZlbnRzL2VtaXR0ZXIuanMiLCJldmVudHMvZXZlbnRCdXMuanMiLCJldmVudHMvaGVhcnRiZWF0LmpzIiwiZXZlbnRzL2luZGV4LmpzIiwiZnBzL2luZGV4LmpzIiwiZnVsbHNjcmVlbi9hcGkuanMiLCJmdWxsc2NyZWVuL2luZGV4LmpzIiwiZ3JhcGhpY3MvaW5kZXguanMiLCJndWkvaW5kZXguanMiLCJodHRwL2dldExvY2F0aW9uLmpzIiwiaHR0cC9pbmRleC5qcyIsImh0dHAvanNvbnAuanMiLCJodHRwL2xvYWRTY3JpcHQuanMiLCJodHRwL3VybFBhcmFtcy5qcyIsImh0dHAveGhyLmpzIiwiaW5kZXguanMiLCJpbnB1dC9jbGlja091dHNpZGUuanMiLCJpbnB1dC9pbmRleC5qcyIsImlucHV0L2tleUlucHV0LmpzIiwiaW5wdXQva2V5Ym9hcmQuanMiLCJpbnB1dC9taWNyb3Bob25lLmpzIiwiaW5wdXQvbW91c2VMZWZ0V2luZG93LmpzIiwiaW5wdXQvbW91c2VXaGVlbC5qcyIsImlucHV0L3BvaW50ZXJDb29yZHMuanMiLCJpbnB1dC90b3VjaElucHV0LmpzIiwibGlua2VkLWxpc3QvaW5kZXguanMiLCJtYXRoL2FuZ2xlLmpzIiwibWF0aC9jZXJwLmpzIiwibWF0aC9jaXJjbGVEaXN0cmlidXRpb24uanMiLCJtYXRoL2NsYW1wLmpzIiwibWF0aC9jb2luVG9zcy5qcyIsIm1hdGgvY3Jvc3NQcm9kdWN0MmQuanMiLCJtYXRoL2RlZ3JlZXMuanMiLCJtYXRoL2RpZmZlcmVuY2UuanMiLCJtYXRoL2Rpc3RhbmNlLmpzIiwibWF0aC9kaXN0YW5jZVNxLmpzIiwibWF0aC9kb3RQcm9kdWN0MmQuanMiLCJtYXRoL2dldENpcmNsZVBvaW50cy5qcyIsIm1hdGgvZ2V0SW50ZXJzZWN0aW9uQXJlYS5qcyIsIm1hdGgvZ2V0T3ZlcmxhcFguanMiLCJtYXRoL2dldE92ZXJsYXBZLmpzIiwibWF0aC9pbmRleC5qcyIsIm1hdGgvbGVycC5qcyIsIm1hdGgvbWFwLmpzIiwibWF0aC9ub3JtYWxpemUuanMiLCJtYXRoL29yaWVudGF0aW9uLmpzIiwibWF0aC9wZXJjZW50UmVtYWluaW5nLmpzIiwibWF0aC9wZXJzcGVjdGl2ZS5qcyIsIm1hdGgvcXVhZHJhdGljQ3VydmUuanMiLCJtYXRoL3JhZGlhbnMuanMiLCJtYXRoL3JhbmRvbS5qcyIsIm1hdGgvcmFuZG9tSW50LmpzIiwibWF0aC9yYW5kb21TaWduLmpzIiwibWF0aC9yb3RhdGVQb2ludC5qcyIsIm1hdGgvcm90YXRlVG9EZWcuanMiLCJtYXRoL3JvdGF0ZVRvUmFkLmpzIiwibWF0aC9yb3VuZFRvLmpzIiwibWF0aC9yb3VuZFRvTmVhcmVzdC5qcyIsIm1hdGgvc2l6ZS5qcyIsIm1hdGgvc21lcnAuanMiLCJtYXRoL3Ntb290aHN0ZXAuanMiLCJtYXRoL3NwbGl0VmFsdWVBbmRVbml0LmpzIiwibWF0aC93ZWlnaHRlZEF2ZXJhZ2UuanMiLCJtYXRoL3dlaWdodGVkRGlzdHJpYnV0aW9uLmpzIiwibWVkaWEvY3VlcG9pbnRzUmVhZGVyLmpzIiwibWVkaWEvaU9TUGxheVZpZGVvSW5saW5lLmpzIiwibWVkaWEvaW5kZXguanMiLCJtZWRpYS92aWRlb1BsYXllci5qcyIsIm1lZGlhL3ZpbWVvLmpzIiwibWVkaWEveW91dHViZS5qcyIsIm1lZGlhL3lvdXR1YmVCYXNpYy5qcyIsIm5vZGVfbW9kdWxlcy9ldmVudHMvZXZlbnRzLmpzIiwibm9kZV9tb2R1bGVzL21pbmktc2lnbmFscy9saWIvbWluaS1zaWduYWxzLmpzIiwib2JqZWN0LXBvb2wvaW5kZXguanMiLCJvYmplY3QvY2xvbmUuanMiLCJvYmplY3QvZmlsdGVyLmpzIiwib2JqZWN0L2luZGV4LmpzIiwib2JqZWN0L21hcC5qcyIsInBhcnRpY2xlL2luZGV4LmpzIiwicGxhdGZvcm0vYnJvd3Nlci9hbmRyb2lkTmF0aXZlLmpzIiwicGxhdGZvcm0vYnJvd3Nlci9pZVZlcnNpb24uanMiLCJwbGF0Zm9ybS9icm93c2VyL2luZGV4LmpzIiwicGxhdGZvcm0vYnJvd3Nlci9zYWZhcmkuanMiLCJwbGF0Zm9ybS9kZXZpY2UvaW5kZXguanMiLCJwbGF0Zm9ybS9pbmRleC5qcyIsInBsYXRmb3JtL2lzTG9jYWxIb3N0LmpzIiwicGxhdGZvcm0vb3MvYW5kcm9pZC5qcyIsInBsYXRmb3JtL29zL2FuZHJvaWRWZXJzaW9uLmpzIiwicGxhdGZvcm0vb3MvaW5kZXguanMiLCJwbGF0Zm9ybS9vcy9pb3MuanMiLCJwbGF0Zm9ybS9vcy9pb3NWZXJzaW9uLmpzIiwicGxhdGZvcm0vb3MvbGludXguanMiLCJwbGF0Zm9ybS9vcy9tYWMuanMiLCJwbGF0Zm9ybS9vcy93aW5kb3dzLmpzIiwicGxhdGZvcm0vb3Mvd2luZG93c1Bob25lLmpzIiwicGxhdGZvcm0vc2NyZWVuL2luZGV4LmpzIiwicGxhdGZvcm0vc3VwcG9ydHMvZGV2aWNlT3JpZW50YXRpb24uanMiLCJwbGF0Zm9ybS9zdXBwb3J0cy9pbmRleC5qcyIsInBsYXRmb3JtL3N1cHBvcnRzL21wNC5qcyIsInBsYXRmb3JtL3N1cHBvcnRzL3dlYmdsLmpzIiwicGxhdGZvcm0vc3VwcG9ydHMvd2VibS5qcyIsInBvbHlmaWxsL2NsYXNzTGlzdC5qcyIsInBvbHlmaWxsL2NvbnNvbGUuanMiLCJwb2x5ZmlsbC9pbmRleC5qcyIsInBvbHlmaWxsL3JlcXVlc3RBbmltYXRpb25GcmFtZS5qcyIsInBvcHVwL2luZGV4LmpzIiwicXVhZC10cmVlL2luZGV4LmpzIiwic2hhcmUvZW1haWwuanMiLCJzaGFyZS9mYWNlYm9vay5qcyIsInNoYXJlL2ZhY2Vib29rRmVlZERpYWxvZy5qcyIsInNoYXJlL2dvb2dsZXBsdXMuanMiLCJzaGFyZS9pbmRleC5qcyIsInNoYXJlL2xpbmtlZGluLmpzIiwic2hhcmUvcGludGVyZXN0LmpzIiwic2hhcmUvcmVkZGl0LmpzIiwic2hhcmUvcmVucmVuLmpzIiwic2hhcmUvc21zLmpzIiwic2hhcmUvdHdpdHRlci5qcyIsInNoYXJlL3Zrb250YWt0ZS5qcyIsInNoYXJlL3dlaWJvLmpzIiwic2hhcmUvd2hhdHNhcHAuanMiLCJzdG9yYWdlL2luZGV4LmpzIiwic3RyaW5nL2FmdGVyRmlyc3QuanMiLCJzdHJpbmcvYWZ0ZXJMYXN0LmpzIiwic3RyaW5nL2JlZm9yZUZpcnN0LmpzIiwic3RyaW5nL2JlZm9yZUxhc3QuanMiLCJzdHJpbmcvYmVnaW5zV2l0aC5qcyIsInN0cmluZy9iZXR3ZWVuLmpzIiwic3RyaW5nL2Jsb2NrLmpzIiwic3RyaW5nL2NhcGl0YWxpemUuanMiLCJzdHJpbmcvY291bnRPZi5qcyIsInN0cmluZy9lZGl0RGlzdGFuY2UuanMiLCJzdHJpbmcvZW5kc1dpdGguanMiLCJzdHJpbmcvZXNjYXBlSFRNTC5qcyIsInN0cmluZy9lc2NhcGVQYXR0ZXJuLmpzIiwic3RyaW5nL2hhc1RleHQuanMiLCJzdHJpbmcvaW5kZXguanMiLCJzdHJpbmcvaXNOdW1lcmljLmpzIiwic3RyaW5nL3BhZExlZnQuanMiLCJzdHJpbmcvcGFkUmlnaHQuanMiLCJzdHJpbmcvcHJldmVudFdpZG93LmpzIiwic3RyaW5nL3Byb3BlckNhc2UuanMiLCJzdHJpbmcvcmVtb3ZlLmpzIiwic3RyaW5nL3JlbW92ZUV4dHJhV2hpdGVzcGFjZS5qcyIsInN0cmluZy9yZXZlcnNlLmpzIiwic3RyaW5nL3JldmVyc2VXb3Jkcy5qcyIsInN0cmluZy9zaW1pbGFyaXR5LmpzIiwic3RyaW5nL3N0cmlwVGFncy5qcyIsInN0cmluZy9zd2FwQ2FzZS5qcyIsInN0cmluZy90aW1lQ29kZS5qcyIsInN0cmluZy90b051bWJlci5qcyIsInN0cmluZy90cnVuY2F0ZS5qcyIsInN0cmluZy93b3JkQ291bnQuanMiLCJ0aWNrZXIvaW5kZXguanMiLCJ0cmFjay9ldmVudC5qcyIsInRyYWNrL2luZGV4LmpzIiwidHJhY2svbG9hZC5qcyIsInRyYWNrL3BhZ2V2aWV3LmpzIiwidHdlZW4vaW5kZXguanMiLCJ2aXNpYmlsaXR5L2FwaS5qcyIsInZpc2liaWxpdHkvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztrQkNBd0IsSztBQUFULFNBQVMsS0FBVCxDQUFlLE1BQWYsRUFBdUIsS0FBdkIsRUFBOEI7QUFDekMsUUFBTSxNQUFNLEVBQVo7QUFDQSxTQUFLLElBQUksSUFBSSxDQUFiLEVBQWdC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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5U0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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Ozs7Ozs7QUNGckIsSUFBSSxlQUFKO0FBQUEsSUFDSSxlQURKOztBQUdBLElBQUksT0FBTyxTQUFTLE1BQWhCLEtBQTJCLFdBQS9CLEVBQTRDO0FBQ3hDLGFBQVMsUUFBVDtBQUNBLGFBQVMsa0JBQVQ7QUFDSCxDQUhELE1BR08sSUFBSSxPQUFPLFNBQVMsU0FBaEIsS0FBOEIsV0FBbEMsRUFBK0M7QUFDbEQsYUFBUyxXQUFUO0FBQ0EsYUFBUyxxQkFBVDtBQUNILENBSE0sTUFHQSxJQUFJLE9BQU8sU0FBUyxRQUFoQixLQUE2QixXQUFqQyxFQUE4QztBQUNqRCxhQUFTLFVBQVQ7QUFDQSxhQUFTLG9CQUFUO0FBQ0gsQ0FITSxNQUdBLElBQUksT0FBTyxTQUFTLFlBQWhCLEtBQWlDLFdBQXJDLEVBQWtEO0FBQ3JELGFBQVMsY0FBVDtBQUNBLGFBQVMsd0JBQVQ7QUFDSDs7a0JBRWM7QUFDWCxrQkFEVztBQUVYO0FBRlcsQzs7Ozs7Ozs7O0FDakJmOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU0sYUFBYSxPQUFPLE1BQVAsQ0FBYyxrQkFBUSxTQUF0QixFQUFpQztBQUNoRCxZQUFRO0FBQ0osYUFBSyxlQUFXO0FBQ1osbUJBQU8sU0FBUyxjQUFJLE1BQWIsQ0FBUDtBQUNIO0FBSEc7QUFEd0MsQ0FBakMsQ0FBbkI7O0FBUUEsU0FBUyxrQkFBVCxHQUE4QjtBQUMxQixRQUFJLFNBQVMsY0FBSSxNQUFiLENBQUosRUFBMEI7QUFDdEIsbUJBQVcsSUFBWCxDQUFnQixRQUFoQjtBQUNILEtBRkQsTUFFTztBQUNILG1CQUFXLElBQVgsQ0FBZ0IsT0FBaEI7QUFDSDtBQUNKOztBQUVELElBQUksY0FBSSxNQUFSLEVBQWdCO0FBQ1osYUFBUyxnQkFBVCxDQUEwQixjQUFJLE1BQTlCLEVBQXNDLGtCQUF0QyxFQUEwRCxLQUExRDtBQUNIOztrQkFFYyxVIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFycmF5KGxlbmd0aCwgdmFsdWUpIHtcbiAgICBjb25zdCBhcnIgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHZhbCA9IHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcgPyB2YWx1ZSA6IGk7XG4gICAgICAgIGFyci5wdXNoKHZhbCk7XG4gICAgfVxuICAgIHJldHVybiBhcnI7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjbG9uZShhcnIpIHtcbiAgICByZXR1cm4gYXJyLnNsaWNlKDApO1xufVxuIiwiaW1wb3J0IGFycmF5IGZyb20gJy4vYXJyYXknO1xuaW1wb3J0IGNsb25lIGZyb20gJy4vY2xvbmUnO1xuaW1wb3J0IG1vdmVFbGVtZW50IGZyb20gJy4vbW92ZUVsZW1lbnQnO1xuaW1wb3J0IG5lYXJlc3QgZnJvbSAnLi9uZWFyZXN0JztcbmltcG9ydCByYW5kb21DaG9pY2UgZnJvbSAnLi9yYW5kb21DaG9pY2UnO1xuaW1wb3J0IHNvcnRBbHBoYSBmcm9tICcuL3NvcnRBbHBoYSc7XG5pbXBvcnQgc29ydE51bWVyaWMgZnJvbSAnLi9zb3J0TnVtZXJpYyc7XG5pbXBvcnQgc29ydFJhbmRvbSBmcm9tICcuL3NvcnRSYW5kb20nO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYXJyYXksXG4gICAgY2xvbmUsXG4gICAgbW92ZUVsZW1lbnQsXG4gICAgbmVhcmVzdCxcbiAgICByYW5kb21DaG9pY2UsXG4gICAgc29ydEFscGhhLFxuICAgIHNvcnROdW1lcmljLFxuICAgIHNvcnRSYW5kb21cbn07XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtb3ZlRWxlbWVudChhcnIsIGZyb20sIHRvKSB7XG4gICAgYXJyID0gYXJyLnNsaWNlKDApO1xuICAgIGNvbnN0IHJlbW92ZWQgPSBhcnIuc3BsaWNlKGZyb20sIDEpWzBdO1xuICAgIGNvbnN0IGluc2VydEF0ID0gdG8gPCAwID8gYXJyLmxlbmd0aCArIHRvIDogdG87XG4gICAgYXJyLnNwbGljZShpbnNlcnRBdCwgMCwgcmVtb3ZlZCk7XG4gICAgcmV0dXJuIGFycjtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG5lYXJlc3QodmFsdWUsIGFycikge1xuICAgIGxldCBsZWFzdCA9IE51bWJlci5NQVhfVkFMVUU7XG4gICAgcmV0dXJuIGFyci5yZWR1Y2UoKHJlc3VsdCwgaXRlbSkgPT4ge1xuICAgICAgICBjb25zdCBkaWZmID0gTWF0aC5hYnMoaXRlbSAtIHZhbHVlKTtcbiAgICAgICAgaWYgKGRpZmYgPCBsZWFzdCkge1xuICAgICAgICAgICAgbGVhc3QgPSBkaWZmO1xuICAgICAgICAgICAgcmVzdWx0ID0gaXRlbTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sIC0xKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJhbmRvbUNob2ljZShhcnIpIHtcbiAgICByZXR1cm4gYXJyW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFyci5sZW5ndGgpXTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNvcnRBbHBoYShhLCBiKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHgsIHkpIHtcbiAgICAgICAgICAgIHJldHVybiBTdHJpbmcoeFthXSkudG9Mb3dlckNhc2UoKSA+IFN0cmluZyh5W2FdKS50b0xvd2VyQ2FzZSgpID8gMSA6IC0xO1xuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gU3RyaW5nKGEpLnRvTG93ZXJDYXNlKCkgPiBTdHJpbmcoYikudG9Mb3dlckNhc2UoKSA/IDEgOiAtMTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNvcnROdW1lcmljKGEsIGIpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oeCwgeSkge1xuICAgICAgICAgICAgcmV0dXJuIE51bWJlcih4W2FdKSAtIE51bWJlcih5W2FdKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIE51bWJlcihhKSAtIE51bWJlcihiKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNvcnRSYW5kb20oKSB7XG4gICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgPiAwLjUgPyAtMSA6IDE7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBibG9ja1Njcm9sbGluZyh2YWx1ZSkge1xuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSB2YWx1ZSA/ICdoaWRkZW4nIDogJyc7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlbENvb3JkcyhlbCkge1xuICAgIGNvbnN0IGJveCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LmJvZHk7XG4gICAgY29uc3QgZG9jRWwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cbiAgICBjb25zdCBzY3JvbGxUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jRWwuc2Nyb2xsVG9wIHx8IGJvZHkuc2Nyb2xsVG9wO1xuICAgIGNvbnN0IHNjcm9sbExlZnQgPSB3aW5kb3cucGFnZVhPZmZzZXQgfHwgZG9jRWwuc2Nyb2xsTGVmdCB8fCBib2R5LnNjcm9sbExlZnQ7XG5cbiAgICBjb25zdCBjbGllbnRUb3AgPSBkb2NFbC5jbGllbnRUb3AgfHwgYm9keS5jbGllbnRUb3AgfHwgMDtcbiAgICBjb25zdCBjbGllbnRMZWZ0ID0gZG9jRWwuY2xpZW50TGVmdCB8fCBib2R5LmNsaWVudExlZnQgfHwgMDtcblxuICAgIGNvbnN0IHRvcCA9IGJveC50b3AgKyBzY3JvbGxUb3AgLSBjbGllbnRUb3A7XG4gICAgY29uc3QgbGVmdCA9IGJveC5sZWZ0ICsgc2Nyb2xsTGVmdCAtIGNsaWVudExlZnQ7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0b3A6IE1hdGgucm91bmQodG9wKSxcbiAgICAgICAgbGVmdDogTWF0aC5yb3VuZChsZWZ0KSxcbiAgICAgICAgeDogTWF0aC5yb3VuZChsZWZ0KSxcbiAgICAgICAgeTogTWF0aC5yb3VuZCh0b3ApXG4gICAgfTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZvcmNlUmVkcmF3KGVsKSB7XG4gICAgY29uc3QgZGlzcGxheSA9IGVsLnN0eWxlLmRpc3BsYXk7XG4gICAgZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBlbC5vZmZzZXRIZWlnaHQ7XG4gICAgZWwuc3R5bGUuZGlzcGxheSA9IGRpc3BsYXk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRQYWdlSGVpZ2h0KCkge1xuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5ib2R5O1xuICAgIGNvbnN0IGRvYyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuICAgIHJldHVybiBNYXRoLm1heChcbiAgICAgICAgYm9keS5zY3JvbGxIZWlnaHQgfHwgMCxcbiAgICAgICAgYm9keS5vZmZzZXRIZWlnaHQgfHwgMCxcbiAgICAgICAgYm9keS5jbGllbnRIZWlnaHQgfHwgMCxcbiAgICAgICAgZG9jLmNsaWVudEhlaWdodCB8fCAwLFxuICAgICAgICBkb2Mub2Zmc2V0SGVpZ2h0IHx8IDAsXG4gICAgICAgIGRvYy5zY3JvbGxIZWlnaHQgfHwgMFxuICAgICk7XG59XG4iLCJpbXBvcnQgZ2V0U2Nyb2xsVG9wIGZyb20gJy4vZ2V0U2Nyb2xsVG9wJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0U2Nyb2xsUGVyY2VudGFnZSgpIHtcbiAgICByZXR1cm4gKGdldFNjcm9sbFRvcCgpICsgd2luZG93LmlubmVySGVpZ2h0KSAvIGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0O1xufVxuIiwiaW1wb3J0IGdldFNjcm9sbFRvcCBmcm9tICcuL2dldFNjcm9sbFRvcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFNjcm9sbFJlbWFpbmluZygpIHtcbiAgICBjb25zdCBiID0gZG9jdW1lbnQuYm9keTtcbiAgICByZXR1cm4gTWF0aC5hYnMoZ2V0U2Nyb2xsVG9wKCkgLSAoYi5zY3JvbGxIZWlnaHQgLSBiLmNsaWVudEhlaWdodCkpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0U2Nyb2xsVG9wKCkge1xuICAgIHJldHVybiB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFNyY3NldEltYWdlKHNyY3NldCwgcGl4ZWxXaWR0aCkge1xuICAgIHBpeGVsV2lkdGggPSBwaXhlbFdpZHRoIHx8IHdpbmRvdy5pbm5lcldpZHRoICogKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDApO1xuXG4gICAgY29uc3Qgc2V0ID0gc3Jjc2V0LnNwbGl0KCcsJylcbiAgICAgICAgLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgW3VybCwgd2lkdGhdID0gaXRlbS50cmltKCkuc3BsaXQoL1xccysvKTtcbiAgICAgICAgICAgIGNvbnN0IHNpemUgPSBwYXJzZUludCh3aWR0aC5zbGljZSgwLCAtMSksIDEwKTtcbiAgICAgICAgICAgIHJldHVybiB7dXJsLCBzaXplfTtcbiAgICAgICAgfSlcbiAgICAgICAgLnNvcnQoKGEsIGIpID0+IGIuc2l6ZSAtIGEuc2l6ZSk7XG5cbiAgICBpZiAoIXNldC5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIHJldHVybiBzZXQucmVkdWNlKCh2YWx1ZSwgaXRlbSkgPT4ge1xuICAgICAgICByZXR1cm4gaXRlbS5zaXplID49IHBpeGVsV2lkdGggPyBpdGVtLnVybCA6IHZhbHVlO1xuICAgIH0sIHNldFswXS51cmwpO1xufVxuIiwiaW1wb3J0IGJsb2NrU2Nyb2xsaW5nIGZyb20gJy4vYmxvY2tTY3JvbGxpbmcnO1xuaW1wb3J0IGVsQ29vcmRzIGZyb20gJy4vZWxDb29yZHMnO1xuaW1wb3J0IGZvcmNlUmVkcmF3IGZyb20gJy4vZm9yY2VSZWRyYXcnO1xuaW1wb3J0IGdldFBhZ2VIZWlnaHQgZnJvbSAnLi9nZXRQYWdlSGVpZ2h0JztcbmltcG9ydCBnZXRTY3JvbGxQZXJjZW50YWdlIGZyb20gJy4vZ2V0U2Nyb2xsUGVyY2VudGFnZSc7XG5pbXBvcnQgZ2V0U2Nyb2xsUmVtYWluaW5nIGZyb20gJy4vZ2V0U2Nyb2xsUmVtYWluaW5nJztcbmltcG9ydCBnZXRTY3JvbGxUb3AgZnJvbSAnLi9nZXRTY3JvbGxUb3AnO1xuaW1wb3J0IGdldFNyY3NldEltYWdlIGZyb20gJy4vZ2V0U3Jjc2V0SW1hZ2UnO1xuaW1wb3J0IGlzRWxlbWVudEluVmlld3BvcnQgZnJvbSAnLi9pc0VsZW1lbnRJblZpZXdwb3J0JztcbmltcG9ydCBpc1BhZ2VFbmQgZnJvbSAnLi9pc1BhZ2VFbmQnO1xuaW1wb3J0IHJlc2l6ZSBmcm9tICcuL3Jlc2l6ZSc7XG5pbXBvcnQgc2Nyb2xsIGZyb20gJy4vc2Nyb2xsJztcbmltcG9ydCBzZXRTdHlsZSBmcm9tICcuL3NldFN0eWxlJztcbmltcG9ydCB0cmFuc2l0aW9uRW5kIGZyb20gJy4vdHJhbnNpdGlvbkVuZCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBibG9ja1Njcm9sbGluZyxcbiAgICBlbENvb3JkcyxcbiAgICBmb3JjZVJlZHJhdyxcbiAgICBnZXRQYWdlSGVpZ2h0LFxuICAgIGdldFNjcm9sbFBlcmNlbnRhZ2UsXG4gICAgZ2V0U2Nyb2xsUmVtYWluaW5nLFxuICAgIGdldFNjcm9sbFRvcCxcbiAgICBnZXRTcmNzZXRJbWFnZSxcbiAgICBpc0VsZW1lbnRJblZpZXdwb3J0LFxuICAgIGlzUGFnZUVuZCxcbiAgICByZXNpemUsXG4gICAgc2Nyb2xsLFxuICAgIHNldFN0eWxlLFxuICAgIHRyYW5zaXRpb25FbmRcbn07XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc0VsZW1lbnRJblZpZXdwb3J0KGVsLCBidWZmZXIgPSAwKSB7XG4gICAgY29uc3QgcmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHJldHVybiAoXG4gICAgICAgIHJlY3QudG9wID49IDAgLSBidWZmZXIgJiZcbiAgICAgICAgcmVjdC5sZWZ0ID49IDAgLSBidWZmZXIgJiZcbiAgICAgICAgcmVjdC5ib3R0b20gPD0gd2luZG93LmlubmVySGVpZ2h0ICsgYnVmZmVyICYmXG4gICAgICAgIHJlY3QucmlnaHQgPD0gd2luZG93LmlubmVyV2lkdGggKyBidWZmZXJcbiAgICApO1xufVxuIiwiaW1wb3J0IGdldFNjcm9sbFJlbWFpbmluZyBmcm9tICcuL2dldFNjcm9sbFJlbWFpbmluZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzUGFnZUVuZChidWZmZXIgPSAwKSB7XG4gICAgcmV0dXJuIGdldFNjcm9sbFJlbWFpbmluZygpIDw9IGJ1ZmZlcjtcbn1cbiIsImltcG9ydCBldmVudEJ1cyBmcm9tICcuLi9ldmVudHMvZXZlbnRCdXMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZXNpemUoZGVib3VjZURlbGF5ID0gNTAwKSB7XG5cbiAgICBsZXQgdGltZW91dElkO1xuXG4gICAgLy8gb3JpZW50YXRpb25jaGFuZ2UgdG9vP1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XG4gICAgICAgIHRpbWVvdXRJZCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IGV2ZW50QnVzLmVtaXQoJ3Jlc2l6ZScpLCBkZWJvdWNlRGVsYXkpO1xuICAgIH0pO1xufVxuIiwiaW1wb3J0IGV2ZW50QnVzIGZyb20gJy4uL2V2ZW50cy9ldmVudEJ1cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNjcm9sbChjYWxsTm93ID0gZmFsc2UpIHtcblxuICAgIGxldCBsYXN0U2Nyb2xsWSA9IDAsXG4gICAgICAgIHRpY2tpbmcgPSBmYWxzZSxcbiAgICAgICAgdGltZW91dElkO1xuXG4gICAgZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dElkKTtcbiAgICAgICAgdGltZW91dElkID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4gZXZlbnRCdXMuZW1pdCgnc2Nyb2xsZW5kJywgbGFzdFNjcm9sbFkpLCAyMDApO1xuXG4gICAgICAgIGV2ZW50QnVzLmVtaXQoJ3Njcm9sbCcsIGxhc3RTY3JvbGxZKTtcbiAgICAgICAgdGlja2luZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlcXVlc3RUaWNrKCkge1xuICAgICAgICBpZiAoIXRpY2tpbmcpIHtcbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlKTtcbiAgICAgICAgICAgIHRpY2tpbmcgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25TY3JvbGwoKSB7XG4gICAgICAgIC8vIGxhc3RTY3JvbGxZID0gd2luZG93LnNjcm9sbFk7XG4gICAgICAgIGxhc3RTY3JvbGxZID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG4gICAgICAgIHJlcXVlc3RUaWNrKCk7XG4gICAgfVxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIG9uU2Nyb2xsLCBmYWxzZSk7XG5cbiAgICBpZiAoY2FsbE5vdykge1xuICAgICAgICBvblNjcm9sbCgpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNldFN0eWxlKGVsLCBzdHlsZSkge1xuICAgIE9iamVjdC5rZXlzKHN0eWxlKS5mb3JFYWNoKChwcm9wKSA9PiB7XG4gICAgICAgIGVsLnN0eWxlW3Byb3BdID0gc3R5bGVbcHJvcF07XG4gICAgfSk7XG4gICAgcmV0dXJuIGVsO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdHJhbnNpdGlvbkVuZChlbCwgY2IsIHRpbWVvdXQgPSAxMDAwKSB7XG5cbiAgICBsZXQgdGltZW91dElkO1xuXG4gICAgZnVuY3Rpb24gaGFuZGxlcigpIHtcbiAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aW1lb3V0SWQpO1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgaGFuZGxlcik7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCBoYW5kbGVyKTtcbiAgICAgICAgY2IoKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGVsLnN0eWxlLnRyYW5zaXRpb24gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBoYW5kbGVyKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBlbC5zdHlsZS5XZWJraXRUcmFuc2l0aW9uICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRUcmFuc2l0aW9uRW5kJywgaGFuZGxlcik7XG4gICAgfVxuXG4gICAgdGltZW91dElkID0gd2luZG93LnNldFRpbWVvdXQoaGFuZGxlciwgdGltZW91dCk7XG59XG4iLCJmdW5jdGlvbiBlYXNlSW5CYWNrKHQsIGIsIGMsIGQsIHMgPSAxLjcwMTU4KSB7XG4gICAgcmV0dXJuIGMgKiAodCAvPSBkKSAqIHQgKiAoKHMgKyAxKSAqIHQgLSBzKSArIGI7XG59XG5cbmZ1bmN0aW9uIGVhc2VPdXRCYWNrKHQsIGIsIGMsIGQsIHMgPSAxLjcwMTU4KSB7XG4gICAgcmV0dXJuIGMgKiAoKHQgPSB0IC8gZCAtIDEpICogdCAqICgocyArIDEpICogdCArIHMpICsgMSkgKyBiO1xufVxuXG5mdW5jdGlvbiBlYXNlSW5PdXRCYWNrKHQsIGIsIGMsIGQsIHMgPSAxLjcwMTU4KSB7XG4gICAgaWYgKCh0IC89IGQgLyAyKSA8IDEpIHtcbiAgICAgICAgcmV0dXJuIGMgLyAyICogKHQgKiB0ICogKCgocyAqPSAoMS41MjUpKSArIDEpICogdCAtIHMpKSArIGI7XG4gICAgfVxuICAgIHJldHVybiBjIC8gMiAqICgodCAtPSAyKSAqIHQgKiAoKChzICo9ICgxLjUyNSkpICsgMSkgKiB0ICsgcykgKyAyKSArIGI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBlYXNlSW46IGVhc2VJbkJhY2ssXG4gICAgZWFzZU91dDogZWFzZU91dEJhY2ssXG4gICAgZWFzZUluT3V0OiBlYXNlSW5PdXRCYWNrXG59O1xuXG5leHBvcnQge1xuICAgIGVhc2VJbkJhY2ssXG4gICAgZWFzZU91dEJhY2ssXG4gICAgZWFzZUluT3V0QmFja1xufTtcbiIsImZ1bmN0aW9uIGVhc2VPdXRCb3VuY2UodCwgYiwgYywgZCkge1xuICAgIGlmICgodCAvPSBkKSA8ICgxIC8gMi43NSkpIHtcbiAgICAgICAgcmV0dXJuIGMgKiAoNy41NjI1ICogdCAqIHQpICsgYjtcbiAgICB9IGVsc2UgaWYgKHQgPCAoMiAvIDIuNzUpKSB7XG4gICAgICAgIHJldHVybiBjICogKDcuNTYyNSAqICh0IC09ICgxLjUgLyAyLjc1KSkgKiB0ICsgMC43NSkgKyBiO1xuICAgIH0gZWxzZSBpZiAodCA8ICgyLjUgLyAyLjc1KSkge1xuICAgICAgICByZXR1cm4gYyAqICg3LjU2MjUgKiAodCAtPSAoMi4yNSAvIDIuNzUpKSAqIHQgKyAwLjkzNzUpICsgYjtcbiAgICB9XG4gICAgcmV0dXJuIGMgKiAoNy41NjI1ICogKHQgLT0gKDIuNjI1IC8gMi43NSkpICogdCArIDAuOTg0Mzc1KSArIGI7XG59XG5cbmZ1bmN0aW9uIGVhc2VJbkJvdW5jZSh0LCBiLCBjLCBkKSB7XG4gICAgcmV0dXJuIGMgLSBlYXNlT3V0Qm91bmNlKGQgLSB0LCAwLCBjLCBkKSArIGI7XG59XG5cbmZ1bmN0aW9uIGVhc2VJbk91dEJvdW5jZSh0LCBiLCBjLCBkKSB7XG4gICAgaWYgKHQgPCBkIC8gMikge1xuICAgICAgICByZXR1cm4gZWFzZUluQm91bmNlKHQgKiAyLCAwLCBjLCBkKSAqIDAuNSArIGI7XG4gICAgfVxuICAgIHJldHVybiBlYXNlT3V0Qm91bmNlKHQgKiAyIC0gZCwgMCwgYywgZCkgKiAwLjUgKyBjICogMC41ICsgYjtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGVhc2VJbjogZWFzZUluQm91bmNlLFxuICAgIGVhc2VPdXQ6IGVhc2VPdXRCb3VuY2UsXG4gICAgZWFzZUluT3V0OiBlYXNlSW5PdXRCb3VuY2Vcbn07XG5cbmV4cG9ydCB7XG4gICAgZWFzZUluQm91bmNlLFxuICAgIGVhc2VPdXRCb3VuY2UsXG4gICAgZWFzZUluT3V0Qm91bmNlXG59O1xuIiwiY29uc3Qge3NxcnR9ID0gTWF0aDtcblxuZnVuY3Rpb24gZWFzZUluQ2lyY3VsYXIodCwgYiwgYywgZCkge1xuICAgIHJldHVybiAtYyAqIChzcXJ0KDEgLSAodCAvPSBkKSAqIHQpIC0gMSkgKyBiO1xufVxuXG5mdW5jdGlvbiBlYXNlT3V0Q2lyY3VsYXIodCwgYiwgYywgZCkge1xuICAgIHJldHVybiBjICogc3FydCgxIC0gKHQgPSB0IC8gZCAtIDEpICogdCkgKyBiO1xufVxuXG5mdW5jdGlvbiBlYXNlSW5PdXRDaXJjdWxhcih0LCBiLCBjLCBkKSB7XG4gICAgaWYgKCh0IC89IGQgLyAyKSA8IDEpIHtcbiAgICAgICAgcmV0dXJuIC1jIC8gMiAqIChzcXJ0KDEgLSB0ICogdCkgLSAxKSArIGI7XG4gICAgfVxuICAgIHJldHVybiBjIC8gMiAqIChzcXJ0KDEgLSAodCAtPSAyKSAqIHQpICsgMSkgKyBiO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZWFzZUluOiBlYXNlSW5DaXJjdWxhcixcbiAgICBlYXNlT3V0OiBlYXNlT3V0Q2lyY3VsYXIsXG4gICAgZWFzZUluT3V0OiBlYXNlSW5PdXRDaXJjdWxhclxufTtcblxuZXhwb3J0IHtcbiAgICBlYXNlSW5DaXJjdWxhcixcbiAgICBlYXNlT3V0Q2lyY3VsYXIsXG4gICAgZWFzZUluT3V0Q2lyY3VsYXJcbn07XG4iLCJmdW5jdGlvbiBlYXNlSW5DdWJpYyh0LCBiLCBjLCBkKSB7XG4gICAgcmV0dXJuIGMgKiAodCAvPSBkKSAqIHQgKiB0ICsgYjtcbn1cblxuZnVuY3Rpb24gZWFzZU91dEN1YmljKHQsIGIsIGMsIGQpIHtcbiAgICByZXR1cm4gYyAqICgodCA9IHQgLyBkIC0gMSkgKiB0ICogdCArIDEpICsgYjtcbn1cblxuZnVuY3Rpb24gZWFzZUluT3V0Q3ViaWModCwgYiwgYywgZCkge1xuICAgIGlmICgodCAvPSBkIC8gMikgPCAxKSB7XG4gICAgICAgIHJldHVybiBjIC8gMiAqIHQgKiB0ICogdCArIGI7XG4gICAgfVxuICAgIHJldHVybiBjIC8gMiAqICgodCAtPSAyKSAqIHQgKiB0ICsgMikgKyBiO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZWFzZUluOiBlYXNlSW5DdWJpYyxcbiAgICBlYXNlT3V0OiBlYXNlT3V0Q3ViaWMsXG4gICAgZWFzZUluT3V0OiBlYXNlSW5PdXRDdWJpY1xufTtcblxuZXhwb3J0IHtcbiAgICBlYXNlSW5DdWJpYyxcbiAgICBlYXNlT3V0Q3ViaWMsXG4gICAgZWFzZUluT3V0Q3ViaWNcbn07XG4iLCJjb25zdCB7YWJzLCBhc2luLCBQSSwgcG93LCBzaW59ID0gTWF0aDtcbmNvbnN0IFBJXzIgPSBQSSAqIDI7XG5cbmZ1bmN0aW9uIGVhc2VJbkVsYXN0aWModCwgYiwgYywgZCwgYSwgcCkge1xuICAgIGxldCBzO1xuICAgIGlmICh0ID09PSAwKSB7XG4gICAgICAgIHJldHVybiBiO1xuICAgIH1cbiAgICBpZiAoKHQgLz0gZCkgPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIGIgKyBjO1xuICAgIH1cbiAgICBpZiAoIXApIHtcbiAgICAgICAgcCA9IGQgKiAwLjM7XG4gICAgfVxuICAgIGlmICghYSB8fCBhIDwgYWJzKGMpKSB7XG4gICAgICAgIGEgPSBjO1xuICAgICAgICBzID0gcCAvIDQ7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcyA9IHAgLyBQSV8yICogYXNpbihjIC8gYSk7XG4gICAgfVxuICAgIHJldHVybiAtKGEgKiBwb3coMiwgMTAgKiAodCAtPSAxKSkgKiBzaW4oKHQgKiBkIC0gcykgKiBQSV8yIC8gcCkpICsgYjtcbn1cblxuZnVuY3Rpb24gZWFzZU91dEVsYXN0aWModCwgYiwgYywgZCwgYSwgcCkge1xuICAgIGxldCBzO1xuICAgIGlmICh0ID09PSAwKSB7XG4gICAgICAgIHJldHVybiBiO1xuICAgIH1cbiAgICBpZiAoKHQgLz0gZCkgPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIGIgKyBjO1xuICAgIH1cbiAgICBpZiAoIXApIHtcbiAgICAgICAgcCA9IGQgKiAwLjM7XG4gICAgfVxuICAgIGlmICghYSB8fCBhIDwgYWJzKGMpKSB7XG4gICAgICAgIGEgPSBjO1xuICAgICAgICBzID0gcCAvIDQ7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcyA9IHAgLyBQSV8yICogYXNpbihjIC8gYSk7XG4gICAgfVxuICAgIHJldHVybiAoYSAqIHBvdygyLCAtMTAgKiB0KSAqIHNpbigodCAqIGQgLSBzKSAqIFBJXzIgLyBwKSArIGMgKyBiKTtcbn1cblxuZnVuY3Rpb24gZWFzZUluT3V0RWxhc3RpYyh0LCBiLCBjLCBkLCBhLCBwKSB7XG4gICAgbGV0IHM7XG4gICAgaWYgKHQgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGI7XG4gICAgfVxuICAgIGlmICgodCAvPSBkIC8gMikgPT09IDIpIHtcbiAgICAgICAgcmV0dXJuIGIgKyBjO1xuICAgIH1cbiAgICBpZiAoIXApIHtcbiAgICAgICAgcCA9IGQgKiAoMC4zICogMS41KTtcbiAgICB9XG4gICAgaWYgKCFhIHx8IGEgPCBhYnMoYykpIHtcbiAgICAgICAgYSA9IGM7XG4gICAgICAgIHMgPSBwIC8gNDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzID0gcCAvIFBJXzIgKiBhc2luKGMgLyBhKTtcbiAgICB9XG4gICAgaWYgKHQgPCAxKSB7XG4gICAgICAgIHJldHVybiAtMC41ICogKGEgKiBwb3coMiwgMTAgKiAodCAtPSAxKSkgKiBzaW4oKHQgKiBkIC0gcykgKiBQSV8yIC8gcCkpICsgYjtcbiAgICB9XG4gICAgcmV0dXJuIGEgKiBwb3coMiwgLTEwICogKHQgLT0gMSkpICogc2luKCh0ICogZCAtIHMpICogUElfMiAvIHApICogMC41ICsgYyArIGI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBlYXNlSW46IGVhc2VJbkVsYXN0aWMsXG4gICAgZWFzZU91dDogZWFzZU91dEVsYXN0aWMsXG4gICAgZWFzZUluT3V0OiBlYXNlSW5PdXRFbGFzdGljXG59O1xuXG5leHBvcnQge1xuICAgIGVhc2VJbkVsYXN0aWMsXG4gICAgZWFzZU91dEVsYXN0aWMsXG4gICAgZWFzZUluT3V0RWxhc3RpY1xufTtcbiIsImNvbnN0IHtwb3d9ID0gTWF0aDtcblxuZnVuY3Rpb24gZWFzZUluRXhwbyh0LCBiLCBjLCBkKSB7XG4gICAgcmV0dXJuIHQgPT09IDAgPyBiIDogYyAqIHBvdygyLCAxMCAqICh0IC8gZCAtIDEpKSArIGI7XG59XG5cbmZ1bmN0aW9uIGVhc2VPdXRFeHBvKHQsIGIsIGMsIGQpIHtcbiAgICByZXR1cm4gdCA9PT0gZCA/IGIgKyBjIDogYyAqICgtcG93KDIsIC0xMCAqIHQgLyBkKSArIDEpICsgYjtcbn1cblxuZnVuY3Rpb24gZWFzZUluT3V0RXhwbyh0LCBiLCBjLCBkKSB7XG4gICAgaWYgKHQgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGI7XG4gICAgfVxuICAgIGlmICh0ID09PSBkKSB7XG4gICAgICAgIHJldHVybiBiICsgYztcbiAgICB9XG4gICAgaWYgKCh0IC89IGQgLyAyKSA8IDEpIHtcbiAgICAgICAgcmV0dXJuIGMgLyAyICogcG93KDIsIDEwICogKHQgLSAxKSkgKyBiO1xuICAgIH1cbiAgICByZXR1cm4gYyAvIDIgKiAoLXBvdygyLCAtMTAgKiAtLXQpICsgMikgKyBiO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZWFzZUluOiBlYXNlSW5FeHBvLFxuICAgIGVhc2VPdXQ6IGVhc2VPdXRFeHBvLFxuICAgIGVhc2VJbk91dDogZWFzZUluT3V0RXhwb1xufTtcblxuZXhwb3J0IHtcbiAgICBlYXNlSW5FeHBvLFxuICAgIGVhc2VPdXRFeHBvLFxuICAgIGVhc2VJbk91dEV4cG9cbn07XG4iLCJpbXBvcnQgYmFjaywge2Vhc2VJbkJhY2ssIGVhc2VPdXRCYWNrLCBlYXNlSW5PdXRCYWNrfSBmcm9tICcuL2JhY2snO1xuaW1wb3J0IGJvdW5jZSwge2Vhc2VJbkJvdW5jZSwgZWFzZU91dEJvdW5jZSwgZWFzZUluT3V0Qm91bmNlfSBmcm9tICcuL2JvdW5jZSc7XG5pbXBvcnQgY2lyY3VsYXIsIHtlYXNlSW5DaXJjdWxhciwgZWFzZU91dENpcmN1bGFyLCBlYXNlSW5PdXRDaXJjdWxhcn0gZnJvbSAnLi9jaXJjdWxhcic7XG5pbXBvcnQgY3ViaWMsIHtlYXNlSW5DdWJpYywgZWFzZU91dEN1YmljLCBlYXNlSW5PdXRDdWJpY30gZnJvbSAnLi9jdWJpYyc7XG5pbXBvcnQgZWxhc3RpYywge2Vhc2VJbkVsYXN0aWMsIGVhc2VPdXRFbGFzdGljLCBlYXNlSW5PdXRFbGFzdGljfSBmcm9tICcuL2VsYXN0aWMnO1xuaW1wb3J0IGV4cG8sIHtlYXNlSW5FeHBvLCBlYXNlT3V0RXhwbywgZWFzZUluT3V0RXhwb30gZnJvbSAnLi9leHBvJztcbmltcG9ydCBsaW5lYXIsIHtlYXNlTGluZWFyfSBmcm9tICcuL2xpbmVhcic7XG5pbXBvcnQgcXVhZCwge2Vhc2VJblF1YWQsIGVhc2VPdXRRdWFkLCBlYXNlSW5PdXRRdWFkfSBmcm9tICcuL3F1YWQnO1xuaW1wb3J0IHF1YXJ0LCB7ZWFzZUluUXVhcnQsIGVhc2VPdXRRdWFydCwgZWFzZUluT3V0UXVhcnR9IGZyb20gJy4vcXVhcnQnO1xuaW1wb3J0IHF1aW50LCB7ZWFzZUluUXVpbnQsIGVhc2VPdXRRdWludCwgZWFzZUluT3V0UXVpbnR9IGZyb20gJy4vcXVpbnQnO1xuaW1wb3J0IHNpbmUsIHtlYXNlSW5TaW5lLCBlYXNlT3V0U2luZSwgZWFzZUluT3V0U2luZX0gZnJvbSAnLi9zaW5lJztcblxuZXhwb3J0IHtcbiAgICBiYWNrLFxuICAgIGJvdW5jZSxcbiAgICBjaXJjdWxhcixcbiAgICBjdWJpYyxcbiAgICBlbGFzdGljLFxuICAgIGV4cG8sXG4gICAgbGluZWFyLFxuICAgIHF1YWQsXG4gICAgcXVhcnQsXG4gICAgcXVpbnQsXG4gICAgc2luZSxcbiAgICBlYXNlTGluZWFyLFxuICAgIGVhc2VJbkJhY2ssXG4gICAgZWFzZU91dEJhY2ssXG4gICAgZWFzZUluT3V0QmFjayxcbiAgICBlYXNlSW5Cb3VuY2UsXG4gICAgZWFzZU91dEJvdW5jZSxcbiAgICBlYXNlSW5PdXRCb3VuY2UsXG4gICAgZWFzZUluQ2lyY3VsYXIsXG4gICAgZWFzZU91dENpcmN1bGFyLFxuICAgIGVhc2VJbk91dENpcmN1bGFyLFxuICAgIGVhc2VJbkN1YmljLFxuICAgIGVhc2VPdXRDdWJpYyxcbiAgICBlYXNlSW5PdXRDdWJpYyxcbiAgICBlYXNlSW5FbGFzdGljLFxuICAgIGVhc2VPdXRFbGFzdGljLFxuICAgIGVhc2VJbk91dEVsYXN0aWMsXG4gICAgZWFzZUluRXhwbyxcbiAgICBlYXNlT3V0RXhwbyxcbiAgICBlYXNlSW5PdXRFeHBvLFxuICAgIGVhc2VJblF1YWQsXG4gICAgZWFzZU91dFF1YWQsXG4gICAgZWFzZUluT3V0UXVhZCxcbiAgICBlYXNlSW5RdWFydCxcbiAgICBlYXNlT3V0UXVhcnQsXG4gICAgZWFzZUluT3V0UXVhcnQsXG4gICAgZWFzZUluUXVpbnQsXG4gICAgZWFzZU91dFF1aW50LFxuICAgIGVhc2VJbk91dFF1aW50LFxuICAgIGVhc2VJblNpbmUsXG4gICAgZWFzZU91dFNpbmUsXG4gICAgZWFzZUluT3V0U2luZVxufTtcblxuLypcblRFUk1TIE9GIFVTRSAtIEVBU0lORyBFUVVBVElPTlNcblxuT3BlbiBzb3VyY2UgdW5kZXIgdGhlIEJTRCBMaWNlbnNlLlxuXG5Db3B5cmlnaHQgwqkgMjAwMSBSb2JlcnQgUGVubmVyXG5BbGwgcmlnaHRzIHJlc2VydmVkLlxuXG5SZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXRcbm1vZGlmaWNhdGlvbiwgYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuXG5SZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXNcbmxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLCB0aGlzXG5saXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvbiBhbmQvb3Jcbm90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG5OZWl0aGVyIHRoZSBuYW1lIG9mIHRoZSBhdXRob3Igbm9yIHRoZSBuYW1lcyBvZiBjb250cmlidXRvcnMgbWF5IGJlIHVzZWQgdG9cbmVuZG9yc2Ugb3IgcHJvbW90ZSBwcm9kdWN0cyBkZXJpdmVkIGZyb20gdGhpcyBzb2Z0d2FyZSB3aXRob3V0IHNwZWNpZmljXG5wcmlvciB3cml0dGVuIHBlcm1pc3Npb24uXG5USElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTIFwiQVMgSVNcIlxuQU5EIEFOWSBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRVxuSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQVJFXG5ESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIE9XTkVSIE9SIENPTlRSSUJVVE9SUyBCRSBMSUFCTEUgRk9SXG5BTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVNcbihJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUztcbkxPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTlxuQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlRcbihJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTXG5TT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cbiovXG4iLCJmdW5jdGlvbiBlYXNlTGluZWFyKHQsIGIsIGMsIGQpIHtcbiAgICByZXR1cm4gYyAqIHQgLyBkICsgYjtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGVhc2VJbjogZWFzZUxpbmVhcixcbiAgICBlYXNlT3V0OiBlYXNlTGluZWFyLFxuICAgIGVhc2VJbk91dDogZWFzZUxpbmVhclxufTtcblxuZXhwb3J0IHtcbiAgICBlYXNlTGluZWFyXG59O1xuIiwiZnVuY3Rpb24gZWFzZUluUXVhZCh0LCBiLCBjLCBkKSB7XG4gICAgcmV0dXJuIGMgKiAodCAvPSBkKSAqIHQgKyBiO1xufVxuXG5mdW5jdGlvbiBlYXNlT3V0UXVhZCh0LCBiLCBjLCBkKSB7XG4gICAgcmV0dXJuIC1jICogKHQgLz0gZCkgKiAodCAtIDIpICsgYjtcbn1cblxuZnVuY3Rpb24gZWFzZUluT3V0UXVhZCh0LCBiLCBjLCBkKSB7XG4gICAgaWYgKCh0IC89IGQgLyAyKSA8IDEpIHtcbiAgICAgICAgcmV0dXJuIGMgLyAyICogdCAqIHQgKyBiO1xuICAgIH1cbiAgICByZXR1cm4gLWMgLyAyICogKCgtLXQpICogKHQgLSAyKSAtIDEpICsgYjtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGVhc2VJbjogZWFzZUluUXVhZCxcbiAgICBlYXNlT3V0OiBlYXNlT3V0UXVhZCxcbiAgICBlYXNlSW5PdXQ6IGVhc2VJbk91dFF1YWRcbn07XG5cbmV4cG9ydCB7XG4gICAgZWFzZUluUXVhZCxcbiAgICBlYXNlT3V0UXVhZCxcbiAgICBlYXNlSW5PdXRRdWFkXG59O1xuIiwiZnVuY3Rpb24gZWFzZUluUXVhcnQodCwgYiwgYywgZCkge1xuICAgIHJldHVybiBjICogKHQgLz0gZCkgKiB0ICogdCAqIHQgKyBiO1xufVxuXG5mdW5jdGlvbiBlYXNlT3V0UXVhcnQodCwgYiwgYywgZCkge1xuICAgIHJldHVybiAtYyAqICgodCA9IHQgLyBkIC0gMSkgKiB0ICogdCAqIHQgLSAxKSArIGI7XG59XG5cbmZ1bmN0aW9uIGVhc2VJbk91dFF1YXJ0KHQsIGIsIGMsIGQpIHtcbiAgICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkge1xuICAgICAgICByZXR1cm4gYyAvIDIgKiB0ICogdCAqIHQgKiB0ICsgYjtcbiAgICB9XG4gICAgcmV0dXJuIC1jIC8gMiAqICgodCAtPSAyKSAqIHQgKiB0ICogdCAtIDIpICsgYjtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGVhc2VJbjogZWFzZUluUXVhcnQsXG4gICAgZWFzZU91dDogZWFzZU91dFF1YXJ0LFxuICAgIGVhc2VJbk91dDogZWFzZUluT3V0UXVhcnRcbn07XG5cbmV4cG9ydCB7XG4gICAgZWFzZUluUXVhcnQsXG4gICAgZWFzZU91dFF1YXJ0LFxuICAgIGVhc2VJbk91dFF1YXJ0XG59O1xuIiwiZnVuY3Rpb24gZWFzZUluUXVpbnQodCwgYiwgYywgZCkge1xuICAgIHJldHVybiBjICogKHQgLz0gZCkgKiB0ICogdCAqIHQgKiB0ICsgYjtcbn1cblxuZnVuY3Rpb24gZWFzZU91dFF1aW50KHQsIGIsIGMsIGQpIHtcbiAgICByZXR1cm4gYyAqICgodCA9IHQgLyBkIC0gMSkgKiB0ICogdCAqIHQgKiB0ICsgMSkgKyBiO1xufVxuXG5mdW5jdGlvbiBlYXNlSW5PdXRRdWludCh0LCBiLCBjLCBkKSB7XG4gICAgaWYgKCh0IC89IGQgLyAyKSA8IDEpIHtcbiAgICAgICAgcmV0dXJuIGMgLyAyICogdCAqIHQgKiB0ICogdCAqIHQgKyBiO1xuICAgIH1cbiAgICByZXR1cm4gYyAvIDIgKiAoKHQgLT0gMikgKiB0ICogdCAqIHQgKiB0ICsgMikgKyBiO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZWFzZUluOiBlYXNlSW5RdWludCxcbiAgICBlYXNlT3V0OiBlYXNlT3V0UXVpbnQsXG4gICAgZWFzZUluT3V0OiBlYXNlSW5PdXRRdWludFxufTtcblxuZXhwb3J0IHtcbiAgICBlYXNlSW5RdWludCxcbiAgICBlYXNlT3V0UXVpbnQsXG4gICAgZWFzZUluT3V0UXVpbnRcbn07XG4iLCJjb25zdCB7Y29zLCBQSSwgc2lufSA9IE1hdGg7XG5jb25zdCBQSV9EMiA9IFBJIC8gMjtcblxuZnVuY3Rpb24gZWFzZUluU2luZSh0LCBiLCBjLCBkKSB7XG4gICAgcmV0dXJuIC1jICogY29zKHQgLyBkICogUElfRDIpICsgYyArIGI7XG59XG5cbmZ1bmN0aW9uIGVhc2VPdXRTaW5lKHQsIGIsIGMsIGQpIHtcbiAgICByZXR1cm4gYyAqIHNpbih0IC8gZCAqIFBJX0QyKSArIGI7XG59XG5cbmZ1bmN0aW9uIGVhc2VJbk91dFNpbmUodCwgYiwgYywgZCkge1xuICAgIHJldHVybiAtYyAvIDIgKiAoY29zKFBJICogdCAvIGQpIC0gMSkgKyBiO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZWFzZUluOiBlYXNlSW5TaW5lLFxuICAgIGVhc2VPdXQ6IGVhc2VPdXRTaW5lLFxuICAgIGVhc2VJbk91dDogZWFzZUluT3V0U2luZVxufTtcblxuZXhwb3J0IHtcbiAgICBlYXNlSW5TaW5lLFxuICAgIGVhc2VPdXRTaW5lLFxuICAgIGVhc2VJbk91dFNpbmVcbn07XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZWJvdW5jZShoYW5kbGVyKSB7XG4gICAgbGV0IHRpY2tpbmcgPSBmYWxzZTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZShldmVudCkge1xuICAgICAgICBoYW5kbGVyKGV2ZW50KTtcbiAgICAgICAgdGlja2luZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlcXVlc3RUaWNrKGV2ZW50KSB7XG4gICAgICAgIGlmICghdGlja2luZykge1xuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB1cGRhdGUoZXZlbnQpKTtcbiAgICAgICAgICAgIHRpY2tpbmcgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcXVlc3RUaWNrO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGVsZWdhdGVFdmVudHMocGFyZW50RWwsIGV2ZW50VHlwZSwgZmlsdGVyLCBmbikge1xuXG4gICAgaWYgKHR5cGVvZiBmaWx0ZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNvbnN0IHRhZ05hbWUgPSBmaWx0ZXIudG9VcHBlckNhc2UoKTtcbiAgICAgICAgZmlsdGVyID0gdGFyZ2V0ID0+IHRhcmdldC50YWdOYW1lID09PSB0YWdOYW1lO1xuICAgIH1cblxuICAgIHBhcmVudEVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCAoZXZlbnQpID0+IHtcbiAgICAgICAgbGV0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcblxuICAgICAgICB3aGlsZSAodGFyZ2V0ICE9PSBwYXJlbnRFbCkge1xuICAgICAgICAgICAgaWYgKGZpbHRlcih0YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgZm4odGFyZ2V0LCBldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuIiwiaW1wb3J0IHtFdmVudEVtaXR0ZXJ9IGZyb20gJ2V2ZW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGVtaXR0ZXIgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuc2V0TWF4TGlzdGVuZXJzKDIwKTtcbiAgICB9XG5cbiAgICBvZmYgKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICAgIGlmIChsaXN0ZW5lcikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnModHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IGVtaXR0ZXIgZnJvbSAnLi9lbWl0dGVyJztcblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmNyZWF0ZShlbWl0dGVyLnByb3RvdHlwZSk7XG4iLCJpbXBvcnQgZW1pdHRlciBmcm9tICcuL2VtaXR0ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBoZWFydGJlYXQoaW50ZXJ2YWwpIHtcbiAgICBsZXQgYmVhdCA9IG51bGwsXG4gICAgICAgIHRpbWUgPSAwLFxuICAgICAgICBudW1UaW1lcyA9IDAsXG4gICAgICAgIG1heFRpbWVzID0gMCxcbiAgICAgICAgcnVubmluZyA9IGZhbHNlO1xuXG4gICAgZnVuY3Rpb24gc3RhcnQobWF4TnVtVGltZXMgPSAwLCB0aW1lT2Zmc2V0ID0gMCkge1xuICAgICAgICBtYXhUaW1lcyA9IG1heE51bVRpbWVzO1xuICAgICAgICB0aW1lID0gdGltZU9mZnNldDtcbiAgICAgICAgbnVtVGltZXMgPSAwO1xuICAgICAgICBydW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGJlYXQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3RvcCgpIHtcbiAgICAgICAgcnVubmluZyA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gYmVhdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGUoZHQgPSAxKSB7XG4gICAgICAgIGlmICghcnVubmluZykge1xuICAgICAgICAgICAgcmV0dXJuIGJlYXQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWF4VGltZXMgPiAwICYmIG51bVRpbWVzID49IG1heFRpbWVzKSB7XG4gICAgICAgICAgICBydW5uaW5nID0gZmFsc2U7XG4gICAgICAgICAgICBiZWF0LmVtaXQoJ2NvbXBsZXRlJyk7XG4gICAgICAgICAgICByZXR1cm4gYmVhdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRpbWUgKz0gZHQ7XG5cbiAgICAgICAgaWYgKHRpbWUgPj0gaW50ZXJ2YWwpIHtcbiAgICAgICAgICAgIHRpbWUgPSAwO1xuICAgICAgICAgICAgbnVtVGltZXMrKztcbiAgICAgICAgICAgIGJlYXQuZW1pdCgndXBkYXRlJywgbnVtVGltZXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBiZWF0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldEludGVydmFsKHZhbHVlKSB7XG4gICAgICAgIGludGVydmFsID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBiZWF0O1xuICAgIH1cblxuICAgIGJlYXQgPSBPYmplY3QuYXNzaWduKE9iamVjdC5jcmVhdGUoZW1pdHRlci5wcm90b3R5cGUpLCB7XG4gICAgICAgIHN0YXJ0LFxuICAgICAgICBzdG9wLFxuICAgICAgICB1cGRhdGUsXG4gICAgICAgIGdldCBpbnRlcnZhbCgpIHtcbiAgICAgICAgICAgIHJldHVybiBpbnRlcnZhbDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0IGludGVydmFsKHZhbHVlKSB7XG4gICAgICAgICAgICBpbnRlcnZhbCA9IHZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBzZXRJbnRlcnZhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGJlYXQ7XG59XG4iLCJpbXBvcnQgZGVib3VuY2UgZnJvbSAnLi9kZWJvdW5jZSc7XG5pbXBvcnQgZGVsZWdhdGVFdmVudHMgZnJvbSAnLi9kZWxlZ2F0ZUV2ZW50cyc7XG5pbXBvcnQgZW1pdHRlciBmcm9tICcuL2VtaXR0ZXInO1xuaW1wb3J0IGV2ZW50QnVzIGZyb20gJy4vZXZlbnRCdXMnO1xuaW1wb3J0IGhlYXJ0YmVhdCBmcm9tICcuL2hlYXJ0YmVhdCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBkZWJvdW5jZSxcbiAgICBkZWxlZ2F0ZUV2ZW50cyxcbiAgICBlbWl0dGVyLFxuICAgIGV2ZW50QnVzLFxuICAgIGhlYXJ0YmVhdFxufTtcbiIsImxldCB0aW1lID0gMDtcbmxldCBmcHMgPSAwO1xubGV0IGN1cnJlbnRGcHMgPSAwO1xubGV0IGF2ZXJhZ2VGcHMgPSAwO1xubGV0IHRpY2tzID0gMDtcbmxldCB0b3RhbEZwcyA9IDA7XG5sZXQgbGFzdEZwcyA9IDA7XG5sZXQgbGFzdEF2ZXJhZ2UgPSAwO1xubGV0IGxvZ01zZyA9IG51bGw7XG5cbmNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5lbC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2ZwcycpO1xuZWwuc3R5bGUuZm9udEZhbWlseSA9ICdtb25vc3BhY2UnO1xuZWwuc3R5bGUucG9zaXRpb24gPSAnZml4ZWQnO1xuZWwuc3R5bGUubGVmdCA9ICcwJztcbmVsLnN0eWxlLnRvcCA9ICcwJztcbmVsLnN0eWxlLnBhZGRpbmcgPSAnMnB4IDZweCc7XG5lbC5zdHlsZS56SW5kZXggPSAnOTk5OTknO1xuZWwuc3R5bGUuYmFja2dyb3VuZCA9ICcjMDAwJztcbmVsLnN0eWxlLmNvbG9yID0gJyNmZmYnO1xuZWwuc3R5bGUuZm9udFNpemUgPSAnMTBweCc7XG5lbC5zdHlsZS51c2VyU2VsZWN0ID0gJ25vbmUnO1xuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbCk7XG5cbmZ1bmN0aW9uIHJlcG9ydCgpIHtcbiAgICBsYXN0RnBzID0gY3VycmVudEZwcztcbiAgICBsYXN0QXZlcmFnZSA9IGF2ZXJhZ2VGcHM7XG4gICAgZWwuaW5uZXJIVE1MID0gYEZQUzogJHtjdXJyZW50RnBzfTxiciAvPkFWRTogJHthdmVyYWdlRnBzfWA7XG5cbiAgICBpZiAobG9nTXNnKSB7XG4gICAgICAgIGVsLmlubmVySFRNTCA9IGAke2VsLmlubmVySFRNTH08YnIgLz5NU0c6ICR7bG9nTXNnfWA7XG4gICAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGUobm93KSB7XG4gICAgaWYgKHR5cGVvZiBub3cgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIG5vdyA9IERhdGUubm93KCk7XG4gICAgfVxuXG4gICAgaWYgKHRpbWUgPT09IDApIHtcbiAgICAgICAgdGltZSA9IG5vdztcbiAgICB9XG5cbiAgICBpZiAobm93IC0gMTAwMCA+IHRpbWUpIHtcbiAgICAgICAgdGltZSA9IG5vdztcbiAgICAgICAgY3VycmVudEZwcyA9IGZwcztcbiAgICAgICAgZnBzID0gMDtcblxuICAgICAgICBpZiAoY3VycmVudEZwcyA+IDEpIHtcbiAgICAgICAgICAgIHRpY2tzKys7XG4gICAgICAgICAgICB0b3RhbEZwcyArPSBjdXJyZW50RnBzO1xuICAgICAgICAgICAgYXZlcmFnZUZwcyA9IE1hdGguZmxvb3IodG90YWxGcHMgLyB0aWNrcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY3VycmVudEZwcyAhPT0gbGFzdEZwcyB8fCBhdmVyYWdlRnBzICE9PSBsYXN0QXZlcmFnZSkge1xuICAgICAgICAgICAgcmVwb3J0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmcHMrKztcbn1cblxuZnVuY3Rpb24gYXV0bygpIHtcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGF1dG8pO1xuICAgIHVwZGF0ZSgpO1xufVxuXG5mdW5jdGlvbiBsb2codmFsdWUpIHtcbiAgICBsb2dNc2cgPSBTdHJpbmcodmFsdWUpO1xuICAgIHJlcG9ydCgpO1xufVxuXG5mdW5jdGlvbiBzdHlsZShwcm9wcykge1xuICAgIE9iamVjdC5rZXlzKHByb3BzKS5mb3JFYWNoKChwcm9wKSA9PiB7XG4gICAgICAgIGVsLnN0eWxlW3Byb3BdID0gcHJvcHNbcHJvcF07XG4gICAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBhdXRvLFxuICAgIGVsLFxuICAgIGxvZyxcbiAgICBzdHlsZSxcbiAgICB1cGRhdGVcbn07XG4iLCJsZXQgcmVxdWVzdCA9IG51bGwsXG4gICAgZXhpdCA9IG51bGwsXG4gICAgY2hhbmdlID0gbnVsbCxcbiAgICBlcnJvciA9IG51bGwsXG4gICAgZWxlbWVudCA9IG51bGwsXG4gICAgZW5hYmxlZCA9IG51bGw7XG5cbmNvbnN0IGRvY0VsID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG5pZiAodHlwZW9mIGRvY0VsLnJlcXVlc3RGdWxsc2NyZWVuICE9PSAndW5kZWZpbmVkJykge1xuICAgIHJlcXVlc3QgPSAncmVxdWVzdEZ1bGxzY3JlZW4nO1xuICAgIGV4aXQgPSAnZXhpdEZ1bGxzY3JlZW4nO1xuICAgIGNoYW5nZSA9ICdmdWxsc2NyZWVuY2hhbmdlJztcbiAgICBlcnJvciA9ICdmdWxsc2NyZWVuZXJyb3InO1xuICAgIGVsZW1lbnQgPSAnZnVsbHNjcmVlbkVsZW1lbnQnO1xuICAgIGVuYWJsZWQgPSAnZnVsbHNjcmVlbkVuYWJsZWQnO1xufSBlbHNlIGlmICh0eXBlb2YgZG9jRWwubW96UmVxdWVzdEZ1bGxTY3JlZW4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmVxdWVzdCA9ICdtb3pSZXF1ZXN0RnVsbFNjcmVlbic7XG4gICAgZXhpdCA9ICdtb3pDYW5jZWxGdWxsU2NyZWVuJztcbiAgICBjaGFuZ2UgPSAnbW96ZnVsbHNjcmVlbmNoYW5nZSc7XG4gICAgZXJyb3IgPSAnbW96ZnVsbHNjcmVlbmVycm9yJztcbiAgICBlbGVtZW50ID0gJ21vekZ1bGxTY3JlZW5FbGVtZW50JztcbiAgICBlbmFibGVkID0gJ21vekZ1bGxTY3JlZW5FbmFibGVkJztcbn0gZWxzZSBpZiAodHlwZW9mIGRvY0VsLm1zUmVxdWVzdEZ1bGxzY3JlZW4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmVxdWVzdCA9ICdtc1JlcXVlc3RGdWxsc2NyZWVuJztcbiAgICBleGl0ID0gJ21zRXhpdEZ1bGxzY3JlZW4nO1xuICAgIGNoYW5nZSA9ICdNU0Z1bGxzY3JlZW5DaGFuZ2UnO1xuICAgIGVycm9yID0gJ01TRnVsbHNjcmVlbkVycm9yJztcbiAgICBlbGVtZW50ID0gJ21zRnVsbHNjcmVlbkVsZW1lbnQnO1xuICAgIGVuYWJsZWQgPSAnbXNGdWxsc2NyZWVuRW5hYmxlZCc7XG59IGVsc2UgaWYgKHR5cGVvZiBkb2NFbC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXF1ZXN0ID0gJ3dlYmtpdFJlcXVlc3RGdWxsc2NyZWVuJztcbiAgICBleGl0ID0gJ3dlYmtpdEV4aXRGdWxsc2NyZWVuJztcbiAgICBjaGFuZ2UgPSAnd2Via2l0ZnVsbHNjcmVlbmNoYW5nZSc7XG4gICAgZXJyb3IgPSAnd2Via2l0RnVsbHNjcmVlbkVycm9yJztcbiAgICBlbGVtZW50ID0gJ3dlYmtpdEZ1bGxzY3JlZW5FbGVtZW50JztcbiAgICBlbmFibGVkID0gJ3dlYmtpdEZ1bGxzY3JlZW5FbmFibGVkJztcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIHJlcXVlc3QsXG4gICAgZXhpdCxcbiAgICBjaGFuZ2UsXG4gICAgZXJyb3IsXG4gICAgZWxlbWVudCxcbiAgICBlbmFibGVkXG59O1xuIiwiaW1wb3J0IGFwaSBmcm9tICcuL2FwaSc7XG5pbXBvcnQgZW1pdHRlciBmcm9tICcuLi9ldmVudHMvZW1pdHRlcic7XG5cbmNvbnN0IGZ1bGxzY3JlZW4gPSBPYmplY3QuY3JlYXRlKGVtaXR0ZXIucHJvdG90eXBlKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihhcGkuY2hhbmdlLCAoZXZlbnQpID0+IHtcbiAgICBmdWxsc2NyZWVuLmVtaXQoJ2NoYW5nZScsIGV2ZW50KTtcbn0pO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGFwaS5lcnJvciwgKGV2ZW50KSA9PiB7XG4gICAgZnVsbHNjcmVlbi5lbWl0KCdlcnJvcicsIGV2ZW50KTtcbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhmdWxsc2NyZWVuLCB7XG4gICAgcmVxdWVzdDoge1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24oZWwpIHtcbiAgICAgICAgICAgIGVsID0gZWwgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICAgICAgZWxbYXBpLnJlcXVlc3RdKHRydWUpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBleGl0OiB7XG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGRvY3VtZW50W2FwaS5leGl0XSgpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICB0b2dnbGU6IHtcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uKGVsKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc0Z1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV4aXQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXF1ZXN0KGVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgaXNTdXBwb3J0ZWQ6IHtcbiAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgcmV0dXJuICEhYXBpLnJlcXVlc3Q7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGlzRnVsbHNjcmVlbjoge1xuICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICByZXR1cm4gISFkb2N1bWVudFthcGkuZWxlbWVudF07XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGVsZW1lbnQ6IHtcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50W2FwaS5lbGVtZW50XTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZW5hYmxlZDoge1xuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnRbYXBpLmVuYWJsZWRdO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bGxzY3JlZW47XG4iLCJmdW5jdGlvbiBnZXRDb2xvdXIociwgZywgYiwgYSA9IDEpIHtcbiAgICBpZiAodHlwZW9mIHIgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiByO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHIgPT09ICdudW1iZXInKSB7XG4gICAgICAgIHJldHVybiBgcmdiYSgke3J9LCR7Yn0sJHtnfSwke2F9KWA7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmFwaGljcyB7XG4gICAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCkge1xuICAgICAgICBpZiAodHlwZW9mIHdpZHRoID09PSAnb2JqZWN0JyAmJiB3aWR0aC50YWdOYW1lID09PSAnQ0FOVkFTJykge1xuICAgICAgICAgICAgdGhpcy5jYW52YXMgPSB3aWR0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgICAgICB0aGlzLnNpemUod2lkdGgsIGhlaWdodCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIH1cblxuICAgIGdldCBjb250ZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jdHg7XG4gICAgfVxuXG4gICAgZmlsbChyLCBnLCBiLCBhID0gMSkge1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBnZXRDb2xvdXIociwgZywgYiwgYSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHN0cm9rZShyLCBnLCBiLCBhID0gMSkge1xuICAgICAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IGdldENvbG91cihyLCBnLCBiLCBhKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgY2lyY2xlKHgsIHksIHJhZGl1cykge1xuICAgICAgICBjb25zdCB7Y3R4fSA9IHRoaXM7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LmFyYyh4LCB5LCByYWRpdXMsIDAsIE1hdGguUEkgKiAyLCBmYWxzZSk7XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCwgYW5nbGUgPSAwKSB7XG4gICAgICAgIGNvbnN0IHtjdHh9ID0gdGhpcztcbiAgICAgICAgaWYgKGFuZ2xlICE9PSAwKSB7XG4gICAgICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZSh4ICsgd2lkdGggLyAyLCB5ICsgaGVpZ2h0IC8gMik7XG4gICAgICAgICAgICBjdHgucm90YXRlKGFuZ2xlKTtcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGN0eC5yZWN0KC13aWR0aCAvIDIsIC1oZWlnaHQgLyAyLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3R4LnJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGxpbmUoeDEsIHkxLCB4MiwgeTIpIHtcbiAgICAgICAgY29uc3Qge2N0eH0gPSB0aGlzO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5tb3ZlVG8oeDEsIHkxKTtcbiAgICAgICAgY3R4LmxpbmVUbyh4MiwgeTIpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGxpbmVXaWR0aCh3aWR0aCkge1xuICAgICAgICB0aGlzLmN0eC5saW5lV2lkdGggPSB3aWR0aDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgbW92ZSh4LCB5KSB7XG4gICAgICAgIHRoaXMuY3R4Lm1vdmVUbyh4LCB5KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaW1hZ2UoZWwsIHgsIHksIG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3Qge2N0eH0gPSB0aGlzO1xuICAgICAgICBpZiAob3B0aW9ucykge1xuICAgICAgICAgICAgY29uc3Qge2FscGhhID0gMSwgcm90YXRpb24gPSAwLCBzY2FsZSA9IDF9ID0gb3B0aW9ucztcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldFggPSBlbC53aWR0aCAvIDI7XG4gICAgICAgICAgICBjb25zdCBvZmZzZXRZID0gZWwuaGVpZ2h0IC8gMjtcbiAgICAgICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgICAgICBjdHgudHJhbnNsYXRlKHggKyBvZmZzZXRYLCB5ICsgb2Zmc2V0WSk7XG4gICAgICAgICAgICBjdHgucm90YXRlKHJvdGF0aW9uKTtcbiAgICAgICAgICAgIGN0eC5zY2FsZShzY2FsZSwgc2NhbGUpO1xuICAgICAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gYWxwaGE7XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKGVsLCAtb2Zmc2V0WCwgLW9mZnNldFkpO1xuICAgICAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoZWwsIHgsIHkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHRleHQoc3RyLCB4LCB5KSB7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KHN0ciwgeCwgeSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldEZvbnRTdHlsZShmYW1pbHksIHNpemUpIHtcbiAgICAgICAgdGhpcy5jdHguZm9udCA9IGAke3NpemV9cHggJHtmYW1pbHl9YDtcbiAgICB9XG5cbiAgICBnZXRJbWFnZURhdGEoeCA9IDAsIHkgPSAwLCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIGNvbnN0IHtjdHgsIGNhbnZhc30gPSB0aGlzO1xuICAgICAgICByZXR1cm4gY3R4LmdldEltYWdlRGF0YSh4LCB5LCB3aWR0aCB8fCBjYW52YXMud2lkdGgsIGhlaWdodCB8fCBjYW52YXMuaGVpZ2h0KTtcbiAgICB9XG5cbiAgICBnZXRQaXhlbCh4LCB5KSB7XG4gICAgICAgIHggPSBNYXRoLmZsb29yKHgpO1xuICAgICAgICB5ID0gTWF0aC5mbG9vcih5KTtcbiAgICAgICAgY29uc3Qge2RhdGF9ID0gdGhpcy5jdHguZ2V0SW1hZ2VEYXRhKHgsIHksIDEsIDEpO1xuICAgICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZGF0YSk7XG4gICAgfVxuXG4gICAgc2V0UGl4ZWwoeCwgeSwgciwgZywgYiwgYSkge1xuICAgICAgICB4ID0gTWF0aC5mbG9vcih4KTtcbiAgICAgICAgeSA9IE1hdGguZmxvb3IoeSk7XG4gICAgICAgIGNvbnN0IHt3aWR0aCwgZGF0YX0gPSB0aGlzLmdldEltYWdlRGF0YSgpO1xuICAgICAgICBjb25zdCBpID0gKHggKyB5ICogd2lkdGgpICogNDtcbiAgICAgICAgZGF0YVtpICsgMF0gPSByO1xuICAgICAgICBkYXRhW2kgKyAxXSA9IGc7XG4gICAgICAgIGRhdGFbaSArIDJdID0gYjtcbiAgICAgICAgZGF0YVtpICsgM10gPSBhO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBjbGVhckNpcmNsZSh4LCB5LCByYWRpdXMgPSAyMCkge1xuICAgICAgICBjb25zdCB7Y3R4fSA9IHRoaXM7XG4gICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgIGN0eC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnZGVzdGluYXRpb24tb3V0JztcbiAgICAgICAgdGhpcy5jaXJjbGUoeCwgeSwgcmFkaXVzKTtcbiAgICAgICAgY3R4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdzb3VyY2Utb3Zlcic7XG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHRyYW5zbGF0ZUFuZCh4LCB5LCBmbikge1xuICAgICAgICBjb25zdCB7Y3R4fSA9IHRoaXM7XG4gICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgIGN0eC50cmFuc2xhdGUoeCwgeSk7XG4gICAgICAgIGZuKGN0eCk7XG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGNsZWFyKHIsIGcsIGIsIGEgPSAxKSB7XG4gICAgICAgIGNvbnN0IGNvbG9yID0gZ2V0Q29sb3VyKHIsIGcsIGIsIGEpO1xuICAgICAgICBjb25zdCB7Y3R4fSA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHt3aWR0aCwgaGVpZ2h0fSA9IHRoaXMuY2FudmFzO1xuICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICBjdHguc2V0VHJhbnNmb3JtKDEsIDAsIDAsIDEsIDAsIDApO1xuICAgICAgICBpZiAoY29sb3IpIHtcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgIH1cbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzaXplKHdpZHRoID0gd2luZG93LmlubmVyV2lkdGgsIGhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCkge1xuICAgICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLmNhbnZhcy5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMuY2FudmFzKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNhbnZhcyA9IG51bGw7XG4gICAgICAgIHRoaXMuY3R4ID0gbnVsbDtcbiAgICB9XG59XG4iLCJpbXBvcnQgbG9hZFNjcmlwdCBmcm9tICcuLi9odHRwL2xvYWRTY3JpcHQnO1xuaW1wb3J0IGlzTG9jYWxIb3N0IGZyb20gJy4uL3BsYXRmb3JtL2lzTG9jYWxIb3N0JztcblxuLy8gZXhhbXBsZSB1c2FnZTpcbi8vXG4vLyBjb25zdCBvcHRzID0ge1xuLy8gICAgIGZyaWN0aW9uOiAwLjksXG4vLyAgICAgbWF4U3BlZWQ6IDFcbi8vIH07XG4vLyBndWkodHJ1ZSlcbi8vICAgICAudGhlbigoZykgPT4ge1xuLy8gICAgICAgICBnLmFkZChvcHRzLCAnZnJpY3Rpb24nLCAwLjcsIDAuOTk5KTtcbi8vICAgICAgICAgZy5hZGQob3B0cywgJ21heFNwZWVkJywgMC41LCAyKS5vbkNoYW5nZSgodmFsdWUpID0+IGNvbnNvbGUubG9nKHZhbHVlKSk7XG4vLyAgICAgfSlcbi8vICAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5lcnJvcihlcnIpKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ3VpKGxvY2FsaG9zdE9ubHkgPSBmYWxzZSkge1xuICAgIGlmIChsb2NhbGhvc3RPbmx5ICYmICFpc0xvY2FsSG9zdCgpKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgoKSA9PiB7fSk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGxvYWRTY3JpcHQoJ2h0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2RhdC1ndWkvMC42LjEvZGF0Lmd1aS5taW4uanMnLCAoZXJyLCBzcmMpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBsb2FkaW5nIHNjcmlwdCcsIHNyYyk7XG4gICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignRXJyb3IgbG9hZGluZyBzY3JpcHQnKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZyA9IG5ldyB3aW5kb3cuZGF0LkdVSSh7YXV0b1BsYWNlOiB0cnVlfSk7XG5cbiAgICAgICAgICAgIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICAgICAgICAgICAgY29uc3QgcyA9IHN0eWxlLnNoZWV0O1xuICAgICAgICAgICAgcy5pbnNlcnRSdWxlKCcuZGcuYWMge292ZXJmbG93OiB2aXNpYmxlICFpbXBvcnRhbnQ7IHotaW5kZXg6MTAwMDAgIWltcG9ydGFudH0nLCAwKTtcbiAgICAgICAgICAgIHMuaW5zZXJ0UnVsZSgnLmRnICoge2ZvbnQtc2l6ZToxMXB4ICFpbXBvcnRhbnR9JywgMCk7XG4gICAgICAgICAgICBzLmluc2VydFJ1bGUoJy5kZyBpbnB1dCB7Zm9udDoxMXB4IEx1Y2lkYSBHcmFuZGUsc2Fucy1zZXJpZiAhaW1wb3J0YW50fScsIDApO1xuXG4gICAgICAgICAgICByZXNvbHZlKGcpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuZ3VpLmlzTG9jYWxIb3N0ID0gaXNMb2NhbEhvc3Q7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRMb2NhdGlvbihocmVmKSB7XG4gICAgY29uc3QgbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBsLmhyZWYgPSBocmVmO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaGFzaDogbC5oYXNoLFxuICAgICAgICBob3N0OiBsLmhvc3QsXG4gICAgICAgIGhvc3RuYW1lOiBsLmhvc3RuYW1lLFxuICAgICAgICBwYXRobmFtZTogbC5wYXRobmFtZSxcbiAgICAgICAgcG9ydDogbC5wb3J0LFxuICAgICAgICBwcm90b2NvbDogbC5wcm90b2NvbCxcbiAgICAgICAgc2VhcmNoOiBsLnNlYXJjaFxuICAgIH07XG59XG4iLCJpbXBvcnQgZ2V0TG9jYXRpb24gZnJvbSAnLi9nZXRMb2NhdGlvbic7XG5pbXBvcnQganNvbnAgZnJvbSAnLi9qc29ucCc7XG5pbXBvcnQgbG9hZFNjcmlwdCBmcm9tICcuL2xvYWRTY3JpcHQnO1xuaW1wb3J0IHVybFBhcmFtcyBmcm9tICcuL3VybFBhcmFtcyc7XG5pbXBvcnQgeGhyIGZyb20gJy4veGhyJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGdldExvY2F0aW9uLFxuICAgIGpzb25wLFxuICAgIGxvYWRTY3JpcHQsXG4gICAgdXJsUGFyYW1zLFxuICAgIHhoclxufTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGpzb25wKHVybCwgY2IsIHRpbWVvdXQgPSA1MDAwKSB7XG4gICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgY29uc3QgY2FsbGJhY2sgPSBganNvbnBfY2FsbGJhY2tfJHtNYXRoLnJvdW5kKDEwMDAwMCAqIE1hdGgucmFuZG9tKCkpfWA7XG4gICAgY29uc3Qgc2VwYXJhdG9yID0gdXJsLmluZGV4T2YoJz8nKSA+PSAwID8gJyYnIDogJz8nO1xuXG4gICAgY29uc3QgdGltZW91dElkID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB3aW5kb3dbY2FsbGJhY2tdKG51bGwsICdqc29ucCBlcnJvcicpO1xuICAgIH0sIHRpbWVvdXQpO1xuXG4gICAgd2luZG93W2NhbGxiYWNrXSA9IGZ1bmN0aW9uKGRhdGEsIGVyciA9IG51bGwpIHtcbiAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aW1lb3V0SWQpO1xuICAgICAgICBkZWxldGUgd2luZG93W2NhbGxiYWNrXTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChzY3JpcHQpO1xuICAgICAgICBjYihkYXRhLCBlcnIpO1xuICAgIH07XG5cbiAgICBzY3JpcHQuc3JjID0gYCR7dXJsfSR7c2VwYXJhdG9yfWNhbGxiYWNrPSR7Y2FsbGJhY2t9YDtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsb2FkU2NyaXB0KHNyYywgY2IpIHtcbiAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICBzY3JpcHQuc3JjID0gc3JjO1xuICAgIHNjcmlwdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4gY2IobnVsbCwgc3JjKSk7XG4gICAgc2NyaXB0LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgKCkgPT4gY2IodHJ1ZSwgc3JjKSk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgIHJldHVybiBzY3JpcHQ7XG59XG4iLCJjb25zdCBwbHVzID0gL1xcKy9nOyAgLy8gbWF0Y2ggJysnIHN5bWJvbFxuY29uc3Qgc2VhcmNoID0gLyhbXiY9XSspPT8oW14mXSopL2c7XG5cbmZ1bmN0aW9uIGRlY29kZShzdHIpIHtcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHN0ci5yZXBsYWNlKHBsdXMsICcgJykpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1cmxQYXJhbXMocXVlcnkpIHtcbiAgICBxdWVyeSA9IHF1ZXJ5IHx8IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc2xpY2UoMSk7XG5cbiAgICBjb25zdCBwYXJhbXMgPSB7fTtcbiAgICBsZXQgbWF0Y2ggPSBzZWFyY2guZXhlYyhxdWVyeSk7XG4gICAgd2hpbGUgKG1hdGNoKSB7XG4gICAgICAgIHBhcmFtc1tkZWNvZGUobWF0Y2hbMV0pXSA9IGRlY29kZShtYXRjaFsyXSk7XG4gICAgICAgIG1hdGNoID0gc2VhcmNoLmV4ZWMocXVlcnkpO1xuICAgIH1cbiAgICByZXR1cm4gcGFyYW1zO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24geGhyKHVybCwgdHlwZSA9ICdqc29uJykge1xuICAgIGNvbnN0IHAgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IHJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICByZXEuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCByZXNwb25zZSA9IHJlcS5yZXNwb25zZTtcbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnanNvbicgJiYgdHlwZW9mIHJlc3BvbnNlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJlcS5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsICgpID0+IHJlamVjdChyZXEuc3RhdHVzKSk7XG4gICAgICAgIHJlcS5vcGVuKCdHRVQnLCB1cmwpO1xuICAgICAgICByZXEucmVzcG9uc2VUeXBlID0gdHlwZTtcbiAgICAgICAgLy8gcmVxLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04Jyk7XG4gICAgICAgIHJlcS5zZW5kKCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHA7XG59XG4iLCJpbXBvcnQgJy4vcG9seWZpbGwnO1xuaW1wb3J0IGFycmF5IGZyb20gJy4vYXJyYXknO1xuaW1wb3J0IGRvbSBmcm9tICcuL2RvbSc7XG5pbXBvcnQgZWFzZSBmcm9tICcuL2Vhc2UnO1xuaW1wb3J0IGV2ZW50cyBmcm9tICcuL2V2ZW50cyc7XG5pbXBvcnQgZnBzIGZyb20gJy4vZnBzJztcbmltcG9ydCBmdWxsc2NyZWVuIGZyb20gJy4vZnVsbHNjcmVlbic7XG5pbXBvcnQgZ3JhcGhpY3MgZnJvbSAnLi9ncmFwaGljcyc7XG5pbXBvcnQgZ3VpIGZyb20gJy4vZ3VpJztcbmltcG9ydCBodHRwIGZyb20gJy4vaHR0cCc7XG5pbXBvcnQgaW5wdXQgZnJvbSAnLi9pbnB1dCc7XG5pbXBvcnQgbGlua2VkTGlzdCBmcm9tICcuL2xpbmtlZC1saXN0JztcbmltcG9ydCBtYXRoIGZyb20gJy4vbWF0aCc7XG5pbXBvcnQgbWVkaWEgZnJvbSAnLi9tZWRpYSc7XG5pbXBvcnQgb2JqZWN0IGZyb20gJy4vb2JqZWN0JztcbmltcG9ydCBvYmplY3RQb29sIGZyb20gJy4vb2JqZWN0LXBvb2wnO1xuaW1wb3J0IFBhcnRpY2xlIGZyb20gJy4vcGFydGljbGUnO1xuaW1wb3J0IFBhcnRpY2xlR3JvdXAgZnJvbSAnLi9wYXJ0aWNsZSc7XG5pbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi9wbGF0Zm9ybSc7XG5pbXBvcnQgcG9wdXAgZnJvbSAnLi9wb3B1cCc7XG5pbXBvcnQgUXVhZFRyZWUgZnJvbSAnLi9xdWFkLXRyZWUnO1xuaW1wb3J0IHNoYXJlIGZyb20gJy4vc2hhcmUnO1xuaW1wb3J0IHN0b3JhZ2UgZnJvbSAnLi9zdG9yYWdlJztcbmltcG9ydCBzdHJpbmcgZnJvbSAnLi9zdHJpbmcnO1xuaW1wb3J0IFRpY2tlciBmcm9tICcuL3RpY2tlcic7XG5pbXBvcnQgdHJhY2sgZnJvbSAnLi90cmFjayc7XG5pbXBvcnQgVHdlZW4gZnJvbSAnLi90d2Vlbic7XG5pbXBvcnQgdmlzaWJpbGl0eSBmcm9tICcuL3Zpc2liaWxpdHknO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYXJyYXksXG4gICAgZG9tLFxuICAgIGVhc2UsXG4gICAgZXZlbnRzLFxuICAgIGZwcyxcbiAgICBmdWxsc2NyZWVuLFxuICAgIGdyYXBoaWNzLFxuICAgIGd1aSxcbiAgICBodHRwLFxuICAgIGlucHV0LFxuICAgIGxpbmtlZExpc3QsXG4gICAgbWF0aCxcbiAgICBtZWRpYSxcbiAgICBvYmplY3QsXG4gICAgb2JqZWN0UG9vbCxcbiAgICBQYXJ0aWNsZSxcbiAgICBQYXJ0aWNsZUdyb3VwLFxuICAgIHBsYXRmb3JtLFxuICAgIHBvcHVwLFxuICAgIFF1YWRUcmVlLFxuICAgIHNoYXJlLFxuICAgIHN0b3JhZ2UsXG4gICAgc3RyaW5nLFxuICAgIFRpY2tlcixcbiAgICBUd2VlbixcbiAgICB0cmFjayxcbiAgICB2aXNpYmlsaXR5XG59O1xuIiwiZnVuY3Rpb24gZ2V0VGVzdChlbCkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGVsKSkge1xuICAgICAgICByZXR1cm4gdGFyZ2V0ID0+IGVsLmluY2x1ZGVzKHRhcmdldCk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgZWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldCA9PiBlbCh0YXJnZXQpO1xuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0ID0+IHRhcmdldCA9PT0gZWw7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNsaWNrT3V0c2lkZShlbCwgZm4pIHtcbiAgICBjb25zdCB0ZXN0ID0gZ2V0VGVzdChlbCk7XG5cbiAgICBmdW5jdGlvbiBvbkNsaWNrT3V0c2lkZShldmVudCkge1xuICAgICAgICBsZXQgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBsZXQgaW5zaWRlID0gZmFsc2U7XG5cbiAgICAgICAgd2hpbGUgKHRhcmdldCAmJiB0YXJnZXQgIT09IGRvY3VtZW50LmJvZHkpIHtcbiAgICAgICAgICAgIGlmICh0ZXN0KHRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBpbnNpZGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWluc2lkZSkge1xuICAgICAgICAgICAgZm4oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Ub3VjaE91dHNpZGUoZXZlbnQpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIG9uQ2xpY2tPdXRzaWRlKTtcbiAgICAgICAgb25DbGlja091dHNpZGUoZXZlbnQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNsaWNrT3V0c2lkZSk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIG9uVG91Y2hPdXRzaWRlKTtcbiAgICB9XG5cbiAgICBkZXN0cm95KCk7XG5cbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25DbGlja091dHNpZGUpO1xuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIG9uVG91Y2hPdXRzaWRlKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGRlc3Ryb3lcbiAgICB9O1xufVxuIiwiaW1wb3J0IGNsaWNrT3V0c2lkZSBmcm9tICcuL2NsaWNrT3V0c2lkZSc7XG5pbXBvcnQga2V5Ym9hcmQgZnJvbSAnLi9rZXlib2FyZCc7XG5pbXBvcnQga2V5SW5wdXQgZnJvbSAnLi9rZXlJbnB1dCc7XG5pbXBvcnQgbWljcm9waG9uZSBmcm9tICcuL21pY3JvcGhvbmUnO1xuaW1wb3J0IG1vdXNlTGVmdFdpbmRvdyBmcm9tICcuL21vdXNlTGVmdFdpbmRvdyc7XG5pbXBvcnQgbW91c2VXaGVlbCBmcm9tICcuL21vdXNlV2hlZWwnO1xuaW1wb3J0IHBvaW50ZXJDb29yZHMgZnJvbSAnLi9wb2ludGVyQ29vcmRzJztcbmltcG9ydCB0b3VjaElucHV0IGZyb20gJy4vdG91Y2hJbnB1dCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBjbGlja091dHNpZGUsXG4gICAga2V5Ym9hcmQsXG4gICAga2V5SW5wdXQsXG4gICAgbWljcm9waG9uZSxcbiAgICBtb3VzZUxlZnRXaW5kb3csXG4gICAgbW91c2VXaGVlbCxcbiAgICBwb2ludGVyQ29vcmRzLFxuICAgIHRvdWNoSW5wdXRcbn07XG4iLCJpbXBvcnQgYXJyYXkgZnJvbSAnLi4vYXJyYXkvYXJyYXknO1xuaW1wb3J0IGVtaXR0ZXIgZnJvbSAnLi4vZXZlbnRzL2VtaXR0ZXInO1xuaW1wb3J0IGtleWJvYXJkIGZyb20gJy4va2V5Ym9hcmQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBrZXlJbnB1dCgpIHtcbiAgICBjb25zdCBhcGkgPSBPYmplY3QuY3JlYXRlKGVtaXR0ZXIucHJvdG90eXBlKTtcbiAgICBjb25zdCBrZXlzID0gYXJyYXkoMjU2LCBmYWxzZSk7XG5cbiAgICBmdW5jdGlvbiBlbWl0S2V5KGtleUNvZGUpIHtcbiAgICAgICAgY29uc3Qga2V5TmFtZSA9IE9iamVjdC5rZXlzKGtleWJvYXJkKS5yZWR1Y2UoKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBrZXlib2FyZFtrZXldID09PSBrZXlDb2RlID8ga2V5IDogdmFsdWU7XG4gICAgICAgIH0sICcnKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBpZiAoa2V5TmFtZSkge1xuICAgICAgICAgICAgYXBpLmVtaXQoa2V5TmFtZS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uS2V5RG93bihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBrZXlzW2V2ZW50LmtleUNvZGVdID0gdHJ1ZTtcbiAgICAgICAgYXBpLmVtaXQoJ2tleWRvd24nLCBldmVudC5rZXlDb2RlKTtcbiAgICAgICAgZW1pdEtleShldmVudC5rZXlDb2RlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbktleVVwKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGtleXNbZXZlbnQua2V5Q29kZV0gPSBmYWxzZTtcbiAgICAgICAgYXBpLmVtaXQoJ2tleXVwJywgZXZlbnQua2V5Q29kZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkKCkge1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25LZXlEb3duLCBmYWxzZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgb25LZXlVcCwgZmFsc2UpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uS2V5RG93bik7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgb25LZXlVcCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNEb3duKGtleSkge1xuICAgICAgICByZXR1cm4ga2V5c1trZXldO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxlZnQoKSB7XG4gICAgICAgIHJldHVybiBrZXlzW2tleWJvYXJkLkxFRlRdIHx8IGtleXNba2V5Ym9hcmQuQV07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmlnaHQoKSB7XG4gICAgICAgIHJldHVybiBrZXlzW2tleWJvYXJkLlJJR0hUXSB8fCBrZXlzW2tleWJvYXJkLkRdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwKCkge1xuICAgICAgICByZXR1cm4ga2V5c1trZXlib2FyZC5VUF0gfHwga2V5c1trZXlib2FyZC5XXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkb3duKCkge1xuICAgICAgICByZXR1cm4ga2V5c1trZXlib2FyZC5ET1dOXSB8fCBrZXlzW2tleWJvYXJkLlNdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNwYWNlKCkge1xuICAgICAgICByZXR1cm4ga2V5c1trZXlib2FyZC5TUEFDRV07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW5hYmxlKHZhbHVlID0gdHJ1ZSkge1xuICAgICAgICByZW1vdmUoKTtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBhZGQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZCgpO1xuXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oYXBpLCB7XG4gICAgICAgIGtleWJvYXJkLFxuICAgICAgICBlbmFibGUsXG4gICAgICAgIGlzRG93bixcbiAgICAgICAgbGVmdCxcbiAgICAgICAgcmlnaHQsXG4gICAgICAgIHVwLFxuICAgICAgICBkb3duLFxuICAgICAgICBzcGFjZVxuICAgIH0pO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQge1xuICAgIEE6ICdBJy5jaGFyQ29kZUF0KDApLFxuICAgIEI6ICdCJy5jaGFyQ29kZUF0KDApLFxuICAgIEM6ICdDJy5jaGFyQ29kZUF0KDApLFxuICAgIEQ6ICdEJy5jaGFyQ29kZUF0KDApLFxuICAgIEU6ICdFJy5jaGFyQ29kZUF0KDApLFxuICAgIEY6ICdGJy5jaGFyQ29kZUF0KDApLFxuICAgIEc6ICdHJy5jaGFyQ29kZUF0KDApLFxuICAgIEg6ICdIJy5jaGFyQ29kZUF0KDApLFxuICAgIEk6ICdJJy5jaGFyQ29kZUF0KDApLFxuICAgIEo6ICdKJy5jaGFyQ29kZUF0KDApLFxuICAgIEs6ICdLJy5jaGFyQ29kZUF0KDApLFxuICAgIEw6ICdMJy5jaGFyQ29kZUF0KDApLFxuICAgIE06ICdNJy5jaGFyQ29kZUF0KDApLFxuICAgIE46ICdOJy5jaGFyQ29kZUF0KDApLFxuICAgIE86ICdPJy5jaGFyQ29kZUF0KDApLFxuICAgIFA6ICdQJy5jaGFyQ29kZUF0KDApLFxuICAgIFE6ICdRJy5jaGFyQ29kZUF0KDApLFxuICAgIFI6ICdSJy5jaGFyQ29kZUF0KDApLFxuICAgIFM6ICdTJy5jaGFyQ29kZUF0KDApLFxuICAgIFQ6ICdUJy5jaGFyQ29kZUF0KDApLFxuICAgIFU6ICdVJy5jaGFyQ29kZUF0KDApLFxuICAgIFY6ICdWJy5jaGFyQ29kZUF0KDApLFxuICAgIFc6ICdXJy5jaGFyQ29kZUF0KDApLFxuICAgIFg6ICdYJy5jaGFyQ29kZUF0KDApLFxuICAgIFk6ICdZJy5jaGFyQ29kZUF0KDApLFxuICAgIFo6ICdaJy5jaGFyQ29kZUF0KDApLFxuICAgIFpFUk86ICcwJy5jaGFyQ29kZUF0KDApLFxuICAgIE9ORTogJzEnLmNoYXJDb2RlQXQoMCksXG4gICAgVFdPOiAnMicuY2hhckNvZGVBdCgwKSxcbiAgICBUSFJFRTogJzMnLmNoYXJDb2RlQXQoMCksXG4gICAgRk9VUjogJzQnLmNoYXJDb2RlQXQoMCksXG4gICAgRklWRTogJzUnLmNoYXJDb2RlQXQoMCksXG4gICAgU0lYOiAnNicuY2hhckNvZGVBdCgwKSxcbiAgICBTRVZFTjogJzcnLmNoYXJDb2RlQXQoMCksXG4gICAgRUlHSFQ6ICc4Jy5jaGFyQ29kZUF0KDApLFxuICAgIE5JTkU6ICc5Jy5jaGFyQ29kZUF0KDApLFxuICAgIE5VTVBBRF8wOiA5NixcbiAgICBOVU1QQURfMTogOTcsXG4gICAgTlVNUEFEXzI6IDk4LFxuICAgIE5VTVBBRF8zOiA5OSxcbiAgICBOVU1QQURfNDogMTAwLFxuICAgIE5VTVBBRF81OiAxMDEsXG4gICAgTlVNUEFEXzY6IDEwMixcbiAgICBOVU1QQURfNzogMTAzLFxuICAgIE5VTVBBRF84OiAxMDQsXG4gICAgTlVNUEFEXzk6IDEwNSxcbiAgICBOVU1QQURfTVVMVElQTFk6IDEwNixcbiAgICBOVU1QQURfQUREOiAxMDcsXG4gICAgTlVNUEFEX0VOVEVSOiAxMDgsXG4gICAgTlVNUEFEX1NVQlRSQUNUOiAxMDksXG4gICAgTlVNUEFEX0RFQ0lNQUw6IDExMCxcbiAgICBOVU1QQURfRElWSURFOiAxMTEsXG4gICAgRjE6IDExMixcbiAgICBGMjogMTEzLFxuICAgIEYzOiAxMTQsXG4gICAgRjQ6IDExNSxcbiAgICBGNTogMTE2LFxuICAgIEY2OiAxMTcsXG4gICAgRjc6IDExOCxcbiAgICBGODogMTE5LFxuICAgIEY5OiAxMjAsXG4gICAgRjEwOiAxMjEsXG4gICAgRjExOiAxMjIsXG4gICAgRjEyOiAxMjMsXG4gICAgRjEzOiAxMjQsXG4gICAgRjE0OiAxMjUsXG4gICAgRjE1OiAxMjYsXG4gICAgQ09MT046IDE4NixcbiAgICBFUVVBTFM6IDE4NyxcbiAgICBVTkRFUlNDT1JFOiAxODksXG4gICAgUVVFU1RJT05fTUFSSzogMTkxLFxuICAgIFRJTERFOiAxOTIsXG4gICAgT1BFTl9CUkFDS0VUOiAyMTksXG4gICAgQkFDS1dBUkRfU0xBU0g6IDIyMCxcbiAgICBDTE9TRURfQlJBQ0tFVDogMjIxLFxuICAgIFFVT1RFUzogMjIyLFxuICAgIEJBQ0tTUEFDRTogOCxcbiAgICBUQUI6IDksXG4gICAgQ0xFQVI6IDEyLFxuICAgIEVOVEVSOiAxMyxcbiAgICBTSElGVDogMTYsXG4gICAgQ09OVFJPTDogMTcsXG4gICAgQUxUOiAxOCxcbiAgICBDQVBTX0xPQ0s6IDIwLFxuICAgIEVTQzogMjcsXG4gICAgU1BBQ0U6IDMyLFxuICAgIFBBR0VfVVA6IDMzLFxuICAgIFBBR0VfRE9XTjogMzQsXG4gICAgRU5EOiAzNSxcbiAgICBIT01FOiAzNixcbiAgICBMRUZUOiAzNyxcbiAgICBVUDogMzgsXG4gICAgUklHSFQ6IDM5LFxuICAgIERPV046IDQwLFxuICAgIElOU0VSVDogNDUsXG4gICAgREVMRVRFOiA0NixcbiAgICBIRUxQOiA0NyxcbiAgICBOVU1fTE9DSzogMTQ0XG59O1xuIiwiaW1wb3J0IGVtaXR0ZXIgZnJvbSAnLi4vZXZlbnRzL2VtaXR0ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtaWNyb3Bob25lKCkge1xuICAgIGNvbnN0IG1pYyA9IE9iamVjdC5jcmVhdGUoZW1pdHRlci5wcm90b3R5cGUpO1xuICAgIGxldCBzdHJlYW0gPSBudWxsO1xuXG4gICAgY29uc3QgZ2V0VXNlck1lZGlhID0gKG5hdmlnYXRvci5nZXRVc2VyTWVkaWEgfHxcbiAgICAgICAgbmF2aWdhdG9yLndlYmtpdEdldFVzZXJNZWRpYSB8fFxuICAgICAgICBuYXZpZ2F0b3IubW96R2V0VXNlck1lZGlhIHx8XG4gICAgICAgIG5hdmlnYXRvci5tc0dldFVzZXJNZWRpYSk7XG5cbiAgICBjb25zdCBpc1N1cHBvcnRlZCA9ICEhZ2V0VXNlck1lZGlhO1xuXG4gICAgZnVuY3Rpb24gY29ubmVjdCgpIHtcbiAgICAgICAgaWYgKCFpc1N1cHBvcnRlZCkge1xuICAgICAgICAgICAgbWljLmVtaXQoJ2Vycm9yJywgJ05vdCBzdXBwb3J0ZWQnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBnZXRVc2VyTWVkaWEoe1xuICAgICAgICAgICAgYXVkaW86IHRydWVcbiAgICAgICAgfSwgKG1lZGlhU3RyZWFtKSA9PiB7XG4gICAgICAgICAgICBzdHJlYW0gPSBtZWRpYVN0cmVhbTtcbiAgICAgICAgICAgIG1pYy5lbWl0KCdjb25uZWN0Jywgc3RyZWFtKTtcbiAgICAgICAgfSwgKGUpID0+IHtcbiAgICAgICAgICAgIGlmIChlLm5hbWUgPT09ICdQZXJtaXNzaW9uRGVuaWVkRXJyb3InIHx8IGUgPT09ICdQRVJNSVNTSU9OX0RFTklFRCcpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUGVybWlzc2lvbiBkZW5pZWQuIFVuZG8gYnkgY2xpY2tpbmcgdGhlIGNhbWVyYSBpY29uIGluIHRoZSBhZGRyZXNzIGJhcicpO1xuICAgICAgICAgICAgICAgIG1pYy5lbWl0KCdkZW5pZWQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbWljLmVtaXQoJ2Vycm9yJywgZS5tZXNzYWdlIHx8IGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkaXNjb25uZWN0KCkge1xuICAgICAgICBpZiAoc3RyZWFtKSB7XG4gICAgICAgICAgICBzdHJlYW0uc3RvcCgpO1xuICAgICAgICAgICAgc3RyZWFtID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVdlYkF1ZGlvU291cmNlKHdlYkF1ZGlvQ29udGV4dCwgY29ubmVjdFRvKSB7XG4gICAgICAgIGlmICghc3RyZWFtKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IHdlYkF1ZGlvQ29udGV4dC5jcmVhdGVNZWRpYVN0cmVhbVNvdXJjZShzdHJlYW0pO1xuXG4gICAgICAgIGlmIChjb25uZWN0VG8pIHtcbiAgICAgICAgICAgIHNvdXJjZS5jb25uZWN0KGNvbm5lY3RUbyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBIQUNLOiBzdG9wcyBtb3ogZ2FyYmFnZSBjb2xsZWN0aW9uIGtpbGxpbmcgdGhlIHN0cmVhbVxuICAgICAgICAvLyBzZWUgaHR0cHM6Ly9zdXBwb3J0Lm1vemlsbGEub3JnL2VuLVVTL3F1ZXN0aW9ucy85ODQxNzlcbiAgICAgICAgaWYgKG5hdmlnYXRvci5tb3pHZXRVc2VyTWVkaWEpIHtcbiAgICAgICAgICAgIHdpbmRvdy5oYWNrX2Zvcl9tb3ppbGxhID0gc291cmNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNvdXJjZTtcbiAgICB9XG5cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihtaWMsIHtcbiAgICAgICAgY29ubmVjdCxcbiAgICAgICAgZGlzY29ubmVjdCxcbiAgICAgICAgY3JlYXRlV2ViQXVkaW9Tb3VyY2UsXG4gICAgICAgIGlzU3VwcG9ydGVkOiAoKSA9PiBpc1N1cHBvcnRlZCxcbiAgICAgICAgc3RyZWFtOiAoKSA9PiBzdHJlYW1cbiAgICB9KTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1vdXNlTGVmdFdpbmRvdyhmbikge1xuICAgIGZ1bmN0aW9uIGhhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgZnJvbSA9IGV2ZW50LnJlbGF0ZWRUYXJnZXQgfHwgZXZlbnQudG9FbGVtZW50O1xuICAgICAgICBpZiAoIWZyb20gfHwgZnJvbS5ub2RlTmFtZSA9PT0gJ0hUTUwnKSB7XG4gICAgICAgICAgICBmbihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIGhhbmRsZXIsIGZhbHNlKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGRlc3Ryb3kgKCkge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBoYW5kbGVyKTtcbiAgICAgICAgfVxuICAgIH07XG59XG4iLCJpbXBvcnQgZW1pdHRlciBmcm9tICcuLi9ldmVudHMvZW1pdHRlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1vdXNlV2hlZWwoc3BlZWQpIHtcbiAgICBzcGVlZCA9IHNwZWVkIHx8IDI7XG5cbiAgICBsZXQgd2hlZWw7XG5cbiAgICBmdW5jdGlvbiB3aGVlbEhhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgZGlyZWN0aW9uID0gKGV2ZW50LmRldGFpbCA8IDAgfHwgZXZlbnQud2hlZWxEZWx0YSA+IDApID8gMSA6IC0xO1xuICAgICAgICBjb25zdCBkZWx0YSA9IGRpcmVjdGlvbiAqIHNwZWVkO1xuXG4gICAgICAgIGlmIChkaXJlY3Rpb24gPiAwKSB7XG4gICAgICAgICAgICB3aGVlbC5lbWl0KCd1cCcsIGRlbHRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdoZWVsLmVtaXQoJ2Rvd24nLCBkZWx0YSk7XG4gICAgICAgIH1cblxuICAgICAgICB3aGVlbC5lbWl0KCd1cGRhdGUnLCBkZWx0YSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkKCkge1xuICAgICAgICBpZiAoJ29ubW91c2V3aGVlbCcgaW4gd2luZG93KSB7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V3aGVlbCcsIHdoZWVsSGFuZGxlciwgZmFsc2UpO1xuICAgICAgICB9IGVsc2UgaWYgKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NTW91c2VTY3JvbGwnLCB3aGVlbEhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgICAgaWYgKCdvbm1vdXNld2hlZWwnIGluIHdpbmRvdykge1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNld2hlZWwnLCB3aGVlbEhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIGlmICh3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ0RPTU1vdXNlU2Nyb2xsJywgd2hlZWxIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGQoKTtcblxuICAgIHdoZWVsID0gT2JqZWN0LmNyZWF0ZShlbWl0dGVyLnByb3RvdHlwZSwge1xuICAgICAgICBfZXZlbnRzOiB7XG4gICAgICAgICAgICB2YWx1ZToge31cbiAgICAgICAgfSxcbiAgICAgICAgYWRkOiB7XG4gICAgICAgICAgICB2YWx1ZTogYWRkXG4gICAgICAgIH0sXG4gICAgICAgIHJlbW92ZToge1xuICAgICAgICAgICAgdmFsdWU6IHJlbW92ZVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZSh3aGVlbCk7XG59XG4iLCJpbXBvcnQgZ2V0UGFnZUhlaWdodCBmcm9tICcuLi9kb20vZ2V0UGFnZUhlaWdodCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBvaW50ZXJDb29yZHMoKSB7XG4gICAgbGV0IHNlbGYgPSBudWxsO1xuXG4gICAgZnVuY3Rpb24gY2FsY3VsYXRlQ29vcmRzKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHRvdWNoID0gZXZlbnQudG91Y2hlcyAmJiBldmVudC50b3VjaGVzLmxlbmd0aDtcbiAgICAgICAgY29uc3QgcCA9IHRvdWNoID8gZXZlbnQudG91Y2hlc1swXSA6IGV2ZW50O1xuICAgICAgICBjb25zdCBjWCA9IHAuY2xpZW50WCB8fCAwO1xuICAgICAgICBjb25zdCBjWSA9IHAuY2xpZW50WSB8fCAwO1xuICAgICAgICBjb25zdCBwWCA9IHdpbmRvdy5wYWdlWE9mZnNldDtcbiAgICAgICAgY29uc3QgcFkgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XG4gICAgICAgIHNlbGYuZXZlbnQgPSBldmVudDtcbiAgICAgICAgc2VsZi5jbGllbnRYID0gY1g7XG4gICAgICAgIHNlbGYuY2xpZW50WSA9IGNZO1xuICAgICAgICBzZWxmLnggPSBjWCArIHBYO1xuICAgICAgICBzZWxmLnkgPSBjWSArIHBZO1xuICAgICAgICBzZWxmLnBlcmNlbnRYID0gc2VsZi54IC8gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgIHNlbGYucGVyY2VudFkgPSBzZWxmLnkgLyBnZXRQYWdlSGVpZ2h0KCk7XG4gICAgfVxuXG4gICAgc2VsZiA9IHtcbiAgICAgICAgZXZlbnQ6IG51bGwsXG4gICAgICAgIGNsaWVudFg6IDAsXG4gICAgICAgIGNsaWVudFk6IDAsXG4gICAgICAgIHg6IDAsXG4gICAgICAgIHk6IDAsXG4gICAgICAgIHBlcmNlbnRYOiAwLFxuICAgICAgICBwZXJjZW50WTogMCxcbiAgICAgICAgaXNMaXN0ZW5pbmc6IGZhbHNlLFxuXG4gICAgICAgIG9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgY2FsY3VsYXRlQ29vcmRzKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgY2FsY3VsYXRlQ29vcmRzKTtcbiAgICAgICAgICAgIHNlbGYuaXNMaXN0ZW5pbmcgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG4gICAgICAgIG9mZjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGNhbGN1bGF0ZUNvb3Jkcyk7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIGNhbGN1bGF0ZUNvb3Jkcyk7XG4gICAgICAgICAgICBzZWxmLmlzTGlzdGVuaW5nID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIHNlbGY7XG59XG4iLCJpbXBvcnQgZW1pdHRlciBmcm9tICcuLi9ldmVudHMvZW1pdHRlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRvdWNoSW5wdXQoZWwpIHtcbiAgICBlbCA9IGVsIHx8IGRvY3VtZW50LmJvZHk7XG5cbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICBzdGFydDogWy0xLCAtMV0sXG4gICAgICAgIG1vdmU6IFstMSwgLTFdLFxuICAgICAgICBlbmQ6IFstMSwgLTFdLFxuICAgICAgICBwb3NpdGlvbjogWy0xLCAtMV0sXG4gICAgICAgIGRpc3RhbmNlOiBbMCwgMF0sXG4gICAgICAgIGRpcmVjdGlvbjogWydub25lJywgJ25vbmUnXSxcbiAgICAgICAgdG91Y2hpbmc6IGZhbHNlLFxuICAgICAgICBvcmlnaW5hbEV2ZW50OiBudWxsXG4gICAgfTtcblxuICAgIGxldCBzZWxmO1xuXG4gICAgZnVuY3Rpb24gdG91Y2hIYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgIGlmICghKGV2ZW50ICYmIGV2ZW50LnRvdWNoZXMpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZGF0YS5vcmlnaW5hbEV2ZW50ID0gZXZlbnQ7XG4gICAgICAgIGNvbnN0IHRvdWNoID0gZXZlbnQudG91Y2hlc1swXTtcbiAgICAgICAgY29uc3QgeCA9IHRvdWNoICYmIHRvdWNoLnBhZ2VYO1xuICAgICAgICBjb25zdCB5ID0gdG91Y2ggJiYgdG91Y2gucGFnZVk7XG5cbiAgICAgICAgc3dpdGNoIChldmVudC50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICd0b3VjaHN0YXJ0JzpcbiAgICAgICAgICAgICAgICBkYXRhLnN0YXJ0WzBdID0gZGF0YS5tb3ZlWzBdID0gZGF0YS5lbmRbMF0gPSBkYXRhLnBvc2l0aW9uWzBdID0geDtcbiAgICAgICAgICAgICAgICBkYXRhLnN0YXJ0WzFdID0gZGF0YS5tb3ZlWzFdID0gZGF0YS5lbmRbMV0gPSBkYXRhLnBvc2l0aW9uWzFdID0geTtcbiAgICAgICAgICAgICAgICBkYXRhLnRvdWNoaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzZWxmLmVtaXQoJ3N0YXJ0JywgZGF0YSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd0b3VjaG1vdmUnOlxuICAgICAgICAgICAgICAgIGRhdGEubW92ZVswXSA9IGRhdGEucG9zaXRpb25bMF0gPSB4O1xuICAgICAgICAgICAgICAgIGRhdGEubW92ZVsxXSA9IGRhdGEucG9zaXRpb25bMV0gPSB5O1xuICAgICAgICAgICAgICAgIHNlbGYuZW1pdCgnbW92ZScsIGRhdGEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAndG91Y2hlbmQnOlxuICAgICAgICAgICAgICAgIGRhdGEuZW5kWzBdID0gZGF0YS5wb3NpdGlvblswXSA9IHg7XG4gICAgICAgICAgICAgICAgZGF0YS5lbmRbMV0gPSBkYXRhLnBvc2l0aW9uWzFdID0geTtcbiAgICAgICAgICAgICAgICBkYXRhLnRvdWNoaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgc2VsZi5lbWl0KCdlbmQnLCBkYXRhKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6IGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGlzdGVuKGVsZW0pIHtcbiAgICAgICAgZWwgPSBlbGVtIHx8IGVsO1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdG91Y2hIYW5kbGVyKTtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdG91Y2hIYW5kbGVyKTtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0b3VjaEhhbmRsZXIpO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICBzZWxmLnJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdG91Y2hIYW5kbGVyKTtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdG91Y2hIYW5kbGVyKTtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0b3VjaEhhbmRsZXIpO1xuICAgICAgICBlbCA9IG51bGw7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH1cblxuICAgIGxpc3RlbihlbCk7XG5cbiAgICBzZWxmID0gT2JqZWN0LmNyZWF0ZShlbWl0dGVyLnByb3RvdHlwZSwge1xuICAgICAgICBfZXZlbnRzOiB7XG4gICAgICAgICAgICB2YWx1ZToge31cbiAgICAgICAgfSxcbiAgICAgICAgbGlzdGVuOiB7XG4gICAgICAgICAgICB2YWx1ZTogbGlzdGVuXG4gICAgICAgIH0sXG4gICAgICAgIGlzRG93bjoge1xuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhLnRvdWNoaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBnZXRUb3VjaDoge1xuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBkZXN0cm95OiB7XG4gICAgICAgICAgICB2YWx1ZTogZGVzdHJveVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZShzZWxmKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxpbmtlZExpc3QoYXJyID0gW10pIHtcblxuICAgIGxldCBmaXJzdCxcbiAgICAgICAgbGFzdDtcblxuICAgIC8qXG4gICAgICAgIGl0ZW0gPSB7XG4gICAgICAgICAgICAnbmV4dCc6IG51bGwsXG4gICAgICAgICAgICAncHJldic6IG51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpdGVtID0gbGlua2VkTGlzdC5nZXRGaXJzdCgpO1xuICAgICAgICB3aGlsZShpdGVtKSB7XG4gICAgICAgICAgICAvLyBkbyBzdHVmZlxuICAgICAgICAgICAgaXRlbSA9IGl0ZW0ubmV4dDtcbiAgICAgICAgfVxuICAgICovXG5cbiAgICBmdW5jdGlvbiByZW1vdmUoaXRlbSkge1xuICAgICAgICBpZiAoaXRlbS5uZXh0KSB7XG4gICAgICAgICAgICBpdGVtLm5leHQucHJldiA9IGl0ZW0ucHJldjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXRlbS5wcmV2KSB7XG4gICAgICAgICAgICBpdGVtLnByZXYubmV4dCA9IGl0ZW0ubmV4dDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXRlbSA9PT0gZmlyc3QpIHtcbiAgICAgICAgICAgIGZpcnN0ID0gaXRlbS5uZXh0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChpdGVtID09PSBsYXN0KSB7XG4gICAgICAgICAgICBsYXN0ID0gaXRlbS5wcmV2O1xuICAgICAgICB9XG4gICAgICAgIGl0ZW0ubmV4dCA9IGl0ZW0ucHJldiA9IG51bGw7XG5cbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zZXJ0QWZ0ZXIoaXRlbSwgYWZ0ZXIpIHtcbiAgICAgICAgcmVtb3ZlKGl0ZW0pO1xuXG4gICAgICAgIGl0ZW0ucHJldiA9IGFmdGVyO1xuICAgICAgICBpdGVtLm5leHQgPSBhZnRlci5uZXh0O1xuXG4gICAgICAgIGlmICghYWZ0ZXIubmV4dCkge1xuICAgICAgICAgICAgbGFzdCA9IGl0ZW07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhZnRlci5uZXh0LnByZXYgPSBpdGVtO1xuICAgICAgICB9XG5cbiAgICAgICAgYWZ0ZXIubmV4dCA9IGl0ZW07XG5cbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zZXJ0QmVmb3JlKGl0ZW0sIGJlZm9yZSkge1xuICAgICAgICByZW1vdmUoaXRlbSk7XG5cbiAgICAgICAgaXRlbS5wcmV2ID0gYmVmb3JlLnByZXY7XG4gICAgICAgIGl0ZW0ubmV4dCA9IGJlZm9yZTtcblxuICAgICAgICBpZiAoIWJlZm9yZS5wcmV2KSB7XG4gICAgICAgICAgICBmaXJzdCA9IGl0ZW07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBiZWZvcmUucHJldi5uZXh0ID0gaXRlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJlZm9yZS5wcmV2ID0gaXRlbTtcblxuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGQoaXRlbSkge1xuICAgICAgICBpZiAoIWZpcnN0KSB7XG4gICAgICAgICAgICBmaXJzdCA9IGxhc3QgPSBpdGVtO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGkgPSBmaXJzdDtcbiAgICAgICAgICAgIHdoaWxlIChpLm5leHQpIHtcbiAgICAgICAgICAgICAgICBpID0gaS5uZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5zZXJ0QWZ0ZXIoaXRlbSwgaSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9yRWFjaChmbikge1xuICAgICAgICBsZXQgaXRlbSA9IGZpcnN0O1xuICAgICAgICB3aGlsZSAoaXRlbSkge1xuICAgICAgICAgICAgZm4oaXRlbSk7XG4gICAgICAgICAgICBpdGVtID0gaXRlbS5uZXh0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFwKGZuKSB7XG4gICAgICAgIGNvbnN0IGxpc3QgPSBsaW5rZWRMaXN0KCk7XG4gICAgICAgIGxldCBpdGVtID0gZmlyc3Q7XG4gICAgICAgIHdoaWxlIChpdGVtKSB7XG4gICAgICAgICAgICBsaXN0LmFkZChmbihpdGVtKSk7XG4gICAgICAgICAgICBpdGVtID0gaXRlbS5uZXh0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsaXN0O1xuICAgIH1cblxuICAgIGFyci5mb3JFYWNoKChpdGVtKSA9PiBhZGQoaXRlbSkpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0IGZpcnN0ICgpIHtcbiAgICAgICAgICAgIHJldHVybiBmaXJzdDtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0Rmlyc3QgKCkge1xuICAgICAgICAgICAgcmV0dXJuIGZpcnN0O1xuICAgICAgICB9LFxuICAgICAgICBnZXQgbGFzdCAoKSB7XG4gICAgICAgICAgICByZXR1cm4gbGFzdDtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0TGFzdCAoKSB7XG4gICAgICAgICAgICByZXR1cm4gbGFzdDtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IGxlbmd0aCAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRDb3VudCgpO1xuICAgICAgICB9LFxuICAgICAgICBnZXRDb3VudCAoKSB7XG4gICAgICAgICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgICAgICAgbGV0IGkgPSBmaXJzdDtcbiAgICAgICAgICAgIHdoaWxlIChpKSB7XG4gICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgICAgICBpID0gaS5uZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNvdW50O1xuICAgICAgICB9LFxuICAgICAgICBhZGQsXG4gICAgICAgIHJlbW92ZSxcbiAgICAgICAgaW5zZXJ0QWZ0ZXIsXG4gICAgICAgIGluc2VydEJlZm9yZSxcbiAgICAgICAgZm9yRWFjaCxcbiAgICAgICAgbWFwXG4gICAgfTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFuZ2xlKHgxLCB5MSwgeDIsIHkyKSB7XG4gICAgY29uc3QgZHggPSB4MiAtIHgxO1xuICAgIGNvbnN0IGR5ID0geTIgLSB5MTtcbiAgICByZXR1cm4gTWF0aC5hdGFuMihkeSwgZHgpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2VycChmcm9tLCB0bywgd2VpZ2h0ID0gMC4zKSB7XG4gICAgY29uc3QgZiA9ICgxIC0gTWF0aC5jb3Mod2VpZ2h0ICogTWF0aC5QSSkpIC8gMjtcbiAgICByZXR1cm4gKGZyb20gKiAoMSAtIGYpICsgdG8gKiBmKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNpcmNsZURpc3RyaWJ1dGlvbihyYWRpdXMsIG9yaWdpbiA9IHt4OiAwLCB5OiAwfSwgcCA9IHt4OiAwLCB5OiAwfSkge1xuICAgIGNvbnN0IHIgPSBNYXRoLnNxcnQoTWF0aC5yYW5kb20oKSkgKiByYWRpdXM7XG4gICAgY29uc3QgdGhldGEgPSBNYXRoLnJhbmRvbSgpICogTWF0aC5QSSAqIDI7XG4gICAgcC54ID0gb3JpZ2luLnggKyBNYXRoLmNvcyh0aGV0YSkgKiByO1xuICAgIHAueSA9IG9yaWdpbi55ICsgTWF0aC5zaW4odGhldGEpICogcjtcbiAgICByZXR1cm4gcDtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNsYW1wKHZhbHVlLCBtaW4sIG1heCkge1xuICAgIGlmIChtaW4gPiBtYXgpIHtcbiAgICAgICAgY29uc3QgYSA9IG1pbjtcbiAgICAgICAgbWluID0gbWF4O1xuICAgICAgICBtYXggPSBhO1xuICAgIH1cbiAgICBpZiAodmFsdWUgPCBtaW4pIHtcbiAgICAgICAgcmV0dXJuIG1pbjtcbiAgICB9XG4gICAgaWYgKHZhbHVlID4gbWF4KSB7XG4gICAgICAgIHJldHVybiBtYXg7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvaW5Ub3NzKGhlYWRzID0gdHJ1ZSwgdGFpbHMgPSBmYWxzZSkge1xuICAgIHJldHVybiBNYXRoLnJhbmRvbSgpID4gMC41ID8gaGVhZHMgOiB0YWlscztcbn1cbiIsIi8qXG5UaGUgc2lnbiB0ZWxscyB1cyBpZiBhIGlzIHRvIHRoZSBsZWZ0ICgtKSBvciB0aGUgcmlnaHQgKCspIG9mIGJcbiovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcm9zc1Byb2R1Y3QyZChhWCwgYVksIGJYLCBiWSkge1xuICAgIHJldHVybiBhWCAqIGJZIC0gYVkgKiBiWDtcbn1cbiIsImNvbnN0IERFRyA9IDE4MCAvIE1hdGguUEk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRlZ3JlZXMocmFkaWFucykge1xuICAgIHJldHVybiByYWRpYW5zICogREVHO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGlmZmVyZW5jZShhLCBiKSB7XG4gICAgcmV0dXJuIE1hdGguYWJzKGEgLSBiKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRpc3RhbmNlKHgxLCB5MSwgeDIsIHkyKSB7XG4gICAgY29uc3QgZHggPSB4MSAtIHgyO1xuICAgIGNvbnN0IGR5ID0geTEgLSB5MjtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRpc3RhbmNlU1EoeDEsIHkxLCB4MiwgeTIpIHtcbiAgICBjb25zdCBkeCA9IHgxIC0geDI7XG4gICAgY29uc3QgZHkgPSB5MSAtIHkyO1xuICAgIHJldHVybiBkeCAqIGR4ICsgZHkgKiBkeTtcbn1cbiIsIi8qXG4tIElmIEEgYW5kIEIgYXJlIHBlcnBlbmRpY3VsYXIgKGF0IDkwIGRlZ3JlZXMgdG8gZWFjaCBvdGhlciksIHRoZSByZXN1bHRcbm9mIHRoZSBkb3QgcHJvZHVjdCB3aWxsIGJlIHplcm8sIGJlY2F1c2UgY29zKM6YKSB3aWxsIGJlIHplcm8uXG4tIElmIHRoZSBhbmdsZSBiZXR3ZWVuIEEgYW5kIEIgYXJlIGxlc3MgdGhhbiA5MCBkZWdyZWVzLCB0aGUgZG90IHByb2R1Y3RcbndpbGwgYmUgcG9zaXRpdmUgKGdyZWF0ZXIgdGhhbiB6ZXJvKSwgYXMgY29zKM6YKSB3aWxsIGJlIHBvc2l0aXZlLCBhbmRcbnRoZSB2ZWN0b3IgbGVuZ3RocyBhcmUgYWx3YXlzIHBvc2l0aXZlIHZhbHVlcy5cbi0gSWYgdGhlIGFuZ2xlIGJldHdlZW4gQSBhbmQgQiBhcmUgZ3JlYXRlciB0aGFuIDkwIGRlZ3JlZXMsIHRoZSBkb3RcbnByb2R1Y3Qgd2lsbCBiZSBuZWdhdGl2ZSAobGVzcyB0aGFuIHplcm8pLCBhcyBjb3MozpgpIHdpbGwgYmUgbmVnYXRpdmUsXG5hbmQgdGhlIHZlY3RvciBsZW5ndGhzIGFyZSBhbHdheXMgcG9zaXRpdmUgdmFsdWVzXG4qL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZG90UHJvZHVjdDJkKGFYLCBhWSwgYlgsIGJZKSB7XG4gICAgcmV0dXJuIGFYICogYlggKyBhWSAqIGJZO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0Q2lyY2xlUG9pbnRzKG9yaWdpblgsIG9yaWdpblksIHJhZGl1cywgY291bnQsIHN0YXJ0LCBDbGFzcykge1xuICAgIGlmICh0eXBlb2Ygc3RhcnQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHN0YXJ0ID0gLU1hdGguUEkgLyAyO1xuICAgIH1cblxuICAgIGNvbnN0IHBvaW50cyA9IFtdLFxuICAgICAgICBjaXJjID0gTWF0aC5QSSAqIDIsXG4gICAgICAgIGluY3IgPSBjaXJjIC8gY291bnQ7XG5cbiAgICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPCBjaXJjICsgc3RhcnQ7IGkgKz0gaW5jcikge1xuICAgICAgICBjb25zdCBvYiA9IHR5cGVvZiBDbGFzcyA9PT0gJ3VuZGVmaW5lZCcgPyB7fSA6IG5ldyBDbGFzcygpO1xuICAgICAgICBvYi54ID0gb3JpZ2luWCArIHJhZGl1cyAqIE1hdGguY29zKGkpO1xuICAgICAgICBvYi55ID0gb3JpZ2luWSArIHJhZGl1cyAqIE1hdGguc2luKGkpO1xuICAgICAgICBwb2ludHMucHVzaChvYik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBvaW50cztcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldEludGVyc2VjdGlvbkFyZWEoYVgsIGFZLCBhVywgYUgsIGJYLCBiWSwgYlcsIGJIKSB7XG4gICAgY29uc3Qgb3ZlcmxhcFggPSBNYXRoLm1heCgwLCBNYXRoLm1pbihhWCArIGFXLCBiWCArIGJXKSAtIE1hdGgubWF4KGFYLCBiWCkpO1xuICAgIGNvbnN0IG92ZXJsYXBZID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oYVkgKyBhSCwgYlkgKyBiSCkgLSBNYXRoLm1heChhWSwgYlkpKTtcbiAgICByZXR1cm4gb3ZlcmxhcFggKiBvdmVybGFwWTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldE92ZXJsYXBYKGFYLCBhVywgYlgsIGJXKSB7XG4gICAgcmV0dXJuIE1hdGgubWF4KDAsIE1hdGgubWluKGFYICsgYVcsIGJYICsgYlcpIC0gTWF0aC5tYXgoYVgsIGJYKSk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRPdmVybGFwWShhWSwgYUgsIGJZLCBiSCkge1xuICAgIHJldHVybiBNYXRoLm1heCgwLCBNYXRoLm1pbihhWSArIGFILCBiWSArIGJIKSAtIE1hdGgubWF4KGFZLCBiWSkpO1xufVxuIiwiaW1wb3J0IGFuZ2xlIGZyb20gJy4vYW5nbGUnO1xuaW1wb3J0IGNlcnAgZnJvbSAnLi9jZXJwJztcbmltcG9ydCBjaXJjbGVEaXN0cmlidXRpb24gZnJvbSAnLi9jaXJjbGVEaXN0cmlidXRpb24nO1xuaW1wb3J0IGNsYW1wIGZyb20gJy4vY2xhbXAnO1xuaW1wb3J0IGNvaW5Ub3NzIGZyb20gJy4vY29pblRvc3MnO1xuaW1wb3J0IGNyb3NzUHJvZHVjdDJkIGZyb20gJy4vY3Jvc3NQcm9kdWN0MmQnO1xuaW1wb3J0IGRlZ3JlZXMgZnJvbSAnLi9kZWdyZWVzJztcbmltcG9ydCBkaWZmZXJlbmNlIGZyb20gJy4vZGlmZmVyZW5jZSc7XG5pbXBvcnQgZGlzdGFuY2UgZnJvbSAnLi9kaXN0YW5jZSc7XG5pbXBvcnQgZGlzdGFuY2VTcSBmcm9tICcuL2Rpc3RhbmNlU3EnO1xuaW1wb3J0IGRvdFByb2R1Y3QyZCBmcm9tICcuL2RvdFByb2R1Y3QyZCc7XG5pbXBvcnQgZ2V0Q2lyY2xlUG9pbnRzIGZyb20gJy4vZ2V0Q2lyY2xlUG9pbnRzJztcbmltcG9ydCBnZXRJbnRlcnNlY3Rpb25BcmVhIGZyb20gJy4vZ2V0SW50ZXJzZWN0aW9uQXJlYSc7XG5pbXBvcnQgZ2V0T3ZlcmxhcFggZnJvbSAnLi9nZXRPdmVybGFwWCc7XG5pbXBvcnQgZ2V0T3ZlcmxhcFkgZnJvbSAnLi9nZXRPdmVybGFwWSc7XG5pbXBvcnQgbGVycCBmcm9tICcuL2xlcnAnO1xuaW1wb3J0IG1hcCBmcm9tICcuL21hcCc7XG5pbXBvcnQgbm9ybWFsaXplIGZyb20gJy4vbm9ybWFsaXplJztcbmltcG9ydCBvcmllbnRhdGlvbiBmcm9tICcuL29yaWVudGF0aW9uJztcbmltcG9ydCBwZXJjZW50UmVtYWluaW5nIGZyb20gJy4vcGVyY2VudFJlbWFpbmluZyc7XG5pbXBvcnQgcGVyc3BlY3RpdmUgZnJvbSAnLi9wZXJzcGVjdGl2ZSc7XG5pbXBvcnQgcXVhZHJhdGljQ3VydmUgZnJvbSAnLi9xdWFkcmF0aWNDdXJ2ZSc7XG5pbXBvcnQgcmFkaWFucyBmcm9tICcuL3JhZGlhbnMnO1xuaW1wb3J0IHJhbmRvbSBmcm9tICcuL3JhbmRvbSc7XG5pbXBvcnQgcmFuZG9tSW50IGZyb20gJy4vcmFuZG9tSW50JztcbmltcG9ydCByYW5kb21TaWduIGZyb20gJy4vcmFuZG9tU2lnbic7XG5pbXBvcnQgcm90YXRlUG9pbnQgZnJvbSAnLi9yb3RhdGVQb2ludCc7XG5pbXBvcnQgcm90YXRlVG9EZWcgZnJvbSAnLi9yb3RhdGVUb0RlZyc7XG5pbXBvcnQgcm90YXRlVG9SYWQgZnJvbSAnLi9yb3RhdGVUb1JhZCc7XG5pbXBvcnQgcm91bmRUbyBmcm9tICcuL3JvdW5kVG8nO1xuaW1wb3J0IHJvdW5kVG9OZWFyZXN0IGZyb20gJy4vcm91bmRUb05lYXJlc3QnO1xuaW1wb3J0IHNpemUgZnJvbSAnLi9zaXplJztcbmltcG9ydCBzbWVycCBmcm9tICcuL3NtZXJwJztcbmltcG9ydCBzbW9vdGhzdGVwIGZyb20gJy4vc21vb3Roc3RlcCc7XG5pbXBvcnQgc3BsaXRWYWx1ZUFuZFVuaXQgZnJvbSAnLi9zcGxpdFZhbHVlQW5kVW5pdCc7XG5pbXBvcnQgd2VpZ2h0ZWRBdmVyYWdlIGZyb20gJy4vd2VpZ2h0ZWRBdmVyYWdlJztcbmltcG9ydCB3ZWlnaHRlZERpc3RyaWJ1dGlvbiBmcm9tICcuL3dlaWdodGVkRGlzdHJpYnV0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGFuZ2xlLFxuICAgIGNlcnAsXG4gICAgY2lyY2xlRGlzdHJpYnV0aW9uLFxuICAgIGNsYW1wLFxuICAgIGNvaW5Ub3NzLFxuICAgIGNyb3NzUHJvZHVjdDJkLFxuICAgIGRlZ3JlZXMsXG4gICAgZGlmZmVyZW5jZSxcbiAgICBkaXN0YW5jZSxcbiAgICBkaXN0YW5jZVNxLFxuICAgIGRvdFByb2R1Y3QyZCxcbiAgICBnZXRDaXJjbGVQb2ludHMsXG4gICAgZ2V0SW50ZXJzZWN0aW9uQXJlYSxcbiAgICBnZXRPdmVybGFwWCxcbiAgICBnZXRPdmVybGFwWSxcbiAgICBsZXJwLFxuICAgIG1hcCxcbiAgICBub3JtYWxpemUsXG4gICAgb3JpZW50YXRpb24sXG4gICAgcGVyY2VudFJlbWFpbmluZyxcbiAgICBwZXJzcGVjdGl2ZSxcbiAgICBxdWFkcmF0aWNDdXJ2ZSxcbiAgICByYWRpYW5zLFxuICAgIHJhbmRvbSxcbiAgICByYW5kb21JbnQsXG4gICAgcmFuZG9tU2lnbixcbiAgICByb3RhdGVQb2ludCxcbiAgICByb3RhdGVUb0RlZyxcbiAgICByb3RhdGVUb1JhZCxcbiAgICByb3VuZFRvLFxuICAgIHJvdW5kVG9OZWFyZXN0LFxuICAgIHNtZXJwLFxuICAgIHNtb290aHN0ZXAsXG4gICAgc2l6ZSxcbiAgICBzcGxpdFZhbHVlQW5kVW5pdCxcbiAgICB3ZWlnaHRlZEF2ZXJhZ2UsXG4gICAgd2VpZ2h0ZWREaXN0cmlidXRpb25cbn07XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsZXJwKGZyb20sIHRvLCB3ZWlnaHQgPSAwLjMpIHtcbiAgICByZXR1cm4gZnJvbSArICh0byAtIGZyb20pICogd2VpZ2h0O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFwKHYsIGEsIGIsIHgsIHkpIHtcbiAgICAvLyB2YWx1ZSwgbWluIGV4cGVjdGVkLCBtYXggZXhwZWN0ZWQsIG1hcCBtaW4sIG1hcCBtYXhcbiAgICAvLyBlLmcuIG1hcCBzb21lIHZhbHVlIGJldHdlZW4gMCB0byAxMDAgdG8gLTUwIHRvIDUwXG4gICAgLy8gbWFwKDUwLCAwLCAxMDAsIC01MCwgNTApIC8vIDBcbiAgICAvLyBtYXAoMjUsIDAsIDEwMCwgLTUwLCA1MCkgLy8gLTI1XG4gICAgcmV0dXJuICh2ID09PSBhKSA/IHggOiAodiAtIGEpICogKHkgLSB4KSAvIChiIC0gYSkgKyB4O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbm9ybWFsaXplKHZhbHVlLCBtaW4sIG1heCkge1xuICAgIHJldHVybiAodmFsdWUgLSBtaW4pIC8gKG1heCAtIG1pbik7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvcmllbnRhdGlvbih4LCB5KSB7XG4gICAgcmV0dXJuIE1hdGguYXRhbjIoeSwgeCk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwZXJjZW50UmVtYWluaW5nKHZhbHVlLCB0b3RhbCkge1xuICAgIHJldHVybiAodmFsdWUgJSB0b3RhbCkgLyB0b3RhbDtcbn1cbiIsIi8vIHggPSB4ICogcGVyc3BlY3RpdmVcbi8vIHkgPSB5ICogcGVyc3BlY3RpdmVcbi8vIHNjYWxlID0gcGVyc3BlY3RpdmVcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGVyc3BlY3RpdmUoeiwgZm9jYWxMZW5ndGggPSAzMDApIHtcbiAgICByZXR1cm4gZm9jYWxMZW5ndGggLyAoZm9jYWxMZW5ndGggKyB6KTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHF1YWRyYXRpY0N1cnZlKGZyb21YLCBmcm9tWSwgY3BYLCBjcFksIHRvWCwgdG9ZLCBnb1Rocm91Z2hDUCA9IGZhbHNlKSB7XG4gICAgY29uc3QgbiA9IDIwO1xuICAgIGNvbnN0IHBvaW50cyA9IFtmcm9tWCwgZnJvbVldO1xuICAgIGxldCB4YSA9IDA7XG4gICAgbGV0IHlhID0gMDtcblxuICAgIGlmIChnb1Rocm91Z2hDUCkge1xuICAgICAgICBjcFggPSBjcFggKiAyIC0gKGZyb21YICsgdG9YKSAvIDI7XG4gICAgICAgIGNwWSA9IGNwWSAqIDIgLSAoZnJvbVkgKyB0b1kpIC8gMjtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBuOyArK2kpIHtcbiAgICAgICAgY29uc3QgaiA9IGkgLyBuO1xuXG4gICAgICAgIHhhID0gZnJvbVggKyAoKGNwWCAtIGZyb21YKSAqIGopO1xuICAgICAgICB5YSA9IGZyb21ZICsgKChjcFkgLSBmcm9tWSkgKiBqKTtcblxuICAgICAgICBwb2ludHMucHVzaCh4YSArICgoKGNwWCArICgodG9YIC0gY3BYKSAqIGopKSAtIHhhKSAqIGopLCB5YSArICgoKGNwWSArICgodG9ZIC0gY3BZKSAqIGopKSAtIHlhKSAqIGopKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcG9pbnRzO1xufVxuIiwiY29uc3QgUkFEID0gTWF0aC5QSSAvIDE4MDtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmFkaWFucyhkZWdyZWVzKSB7XG4gICAgcmV0dXJuIGRlZ3JlZXMgKiBSQUQ7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByYW5kb20obWluLCBtYXgpIHtcbiAgICBpZiAoaXNOYU4obWF4KSkge1xuICAgICAgICBtYXggPSBtaW47XG4gICAgICAgIG1pbiA9IDA7XG4gICAgfVxuICAgIHJldHVybiBtaW4gKyBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbik7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByYW5kb21JbnQobWluLCBtYXgpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihtaW4gKyBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJhbmRvbVNpZ24oKSB7XG4gICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgPiAwLjUgPyAtMSA6IDE7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByb3RhdGVQb2ludChwLCB0aGV0YSwgb3JpZ2luID0ge3g6IDAsIHk6IDB9LCBwMSA9IHt4OiAwLCB5OiAwfSkge1xuICAgIGNvbnN0IHNpblRoZXRhID0gTWF0aC5zaW4odGhldGEpO1xuICAgIGNvbnN0IGNvc1RoZXRhID0gTWF0aC5jb3ModGhldGEpO1xuICAgIHAxLnggPSAocC54IC0gb3JpZ2luLngpICogY29zVGhldGEgLSAocC55IC0gb3JpZ2luLnkpICogc2luVGhldGE7XG4gICAgcDEueSA9IChwLnggLSBvcmlnaW4ueCkgKiBzaW5UaGV0YSArIChwLnkgLSBvcmlnaW4ueSkgKiBjb3NUaGV0YTtcbiAgICBwMS54ICs9IG9yaWdpbi54O1xuICAgIHAxLnkgKz0gb3JpZ2luLnk7XG4gICAgcmV0dXJuIHAxO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcm90YXRlVG9EZWcoc3RhcnQsIGVuZCkge1xuICAgIGxldCBkaWZmID0gKGVuZCAtIHN0YXJ0KSAlIDM2MDtcbiAgICBpZiAoZGlmZiAhPT0gZGlmZiAlIDE4MCkge1xuICAgICAgICBkaWZmID0gKGRpZmYgPCAwKSA/IGRpZmYgKyAzNjAgOiBkaWZmIC0gMzYwO1xuICAgIH1cbiAgICByZXR1cm4gc3RhcnQgKyBkaWZmO1xufVxuIiwiY29uc3QgUEkyID0gTWF0aC5QSSAqIDI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJvdGF0ZVRvUkFEKHN0YXJ0LCBlbmQpIHtcbiAgICBsZXQgZGlmZiA9IChlbmQgLSBzdGFydCkgJSBQSTI7XG4gICAgaWYgKGRpZmYgIT09IGRpZmYgJSBNYXRoLlBJKSB7XG4gICAgICAgIGRpZmYgPSBkaWZmIDwgMCA/IGRpZmYgKyBQSTIgOiBkaWZmIC0gUEkyO1xuICAgIH1cbiAgICByZXR1cm4gc3RhcnQgKyBkaWZmO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcm91bmRUbyh4LCBwbGFjZXMgPSAyKSB7XG4gICAgY29uc3QgZGl2ID0gTWF0aC5wb3coMTAsIHBsYWNlcyk7XG4gICAgcmV0dXJuIE1hdGgucm91bmQoeCAqIGRpdikgLyBkaXY7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByb3VuZFRvTmVhcmVzdCh2YWx1ZSwgdW5pdCkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKHZhbHVlIC8gdW5pdCkgKiB1bml0O1xufVxuIiwiZnVuY3Rpb24gZ2V0U2NhbGUobWV0aG9kLCB3aWR0aCwgaGVpZ2h0LCBhcmVhV2lkdGgsIGFyZWFIZWlnaHQpIHtcbiAgICBzd2l0Y2ggKG1ldGhvZCkge1xuICAgICAgICBjYXNlICdjb3Zlcic6XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5tYXgoYXJlYVdpZHRoIC8gd2lkdGgsIGFyZWFIZWlnaHQgLyBoZWlnaHQpO1xuICAgICAgICBjYXNlICdjb250YWluJzpcbiAgICAgICAgICAgIHJldHVybiBNYXRoLm1pbihhcmVhV2lkdGggLyB3aWR0aCwgYXJlYUhlaWdodCAvIGhlaWdodCk7XG4gICAgICAgIGNhc2UgJ3dpZHRoJzpcbiAgICAgICAgICAgIHJldHVybiBhcmVhV2lkdGggLyB3aWR0aDtcbiAgICAgICAgY2FzZSAnaGVpZ2h0JzpcbiAgICAgICAgICAgIHJldHVybiBhcmVhSGVpZ2h0IC8gaGVpZ2h0O1xuICAgICAgICBkZWZhdWx0OiBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIDE7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNpemUocmVjdCwgYXJlYVdpZHRoLCBhcmVhSGVpZ2h0LCBtZXRob2QgPSAnY292ZXInLCBhdXRvQ2VudGVyID0gdHJ1ZSkge1xuICAgIGNvbnN0IHNjYWxlID0gZ2V0U2NhbGUobWV0aG9kLCByZWN0LndpZHRoLCByZWN0LmhlaWdodCwgYXJlYVdpZHRoLCBhcmVhSGVpZ2h0KTtcbiAgICBjb25zdCB3aWR0aCA9IE1hdGguY2VpbChyZWN0LndpZHRoICogc2NhbGUpO1xuICAgIGNvbnN0IGhlaWdodCA9IE1hdGguY2VpbChyZWN0LmhlaWdodCAqIHNjYWxlKTtcblxuICAgIGxldCB4ID0gMCwgeSA9IDA7XG5cbiAgICBpZiAoYXV0b0NlbnRlcikge1xuICAgICAgICB4ID0gTWF0aC5yb3VuZCgoYXJlYVdpZHRoIC0gd2lkdGgpICogMC41KTtcbiAgICAgICAgeSA9IE1hdGgucm91bmQoKGFyZWFIZWlnaHQgLSBoZWlnaHQpICogMC41KTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB4LFxuICAgICAgICB5LFxuICAgICAgICB3aWR0aCxcbiAgICAgICAgaGVpZ2h0LFxuICAgICAgICBzY2FsZVxuICAgIH07XG59XG4iLCJpbXBvcnQgc21vb3Roc3RlcCBmcm9tICcuL3Ntb290aHN0ZXAnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzbWVycChmcm9tLCB0bywgc3RhcnRUaW1lLCBlbmRUaW1lLCB0aW1lKSB7XG4gICAgcmV0dXJuIGZyb20gKyAodG8gLSBmcm9tKSAqIHNtb290aHN0ZXAoc3RhcnRUaW1lLCBlbmRUaW1lLCB0aW1lKTtcbn1cbiIsImltcG9ydCBjbGFtcCBmcm9tICcuL2NsYW1wJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc21vb3Roc3RlcChtaW4sIG1heCwgdmFsdWUpIHtcbiAgICBjb25zdCB4ID0gY2xhbXAoKHZhbHVlIC0gbWluKSAvIChtYXggLSBtaW4pLCAwLCAxKTtcbiAgICByZXR1cm4geCAqIHggKiAoMyAtIDIgKiB4KTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNwbGl0VmFsdWVBbmRVbml0KHByb3ApIHtcbiAgICBjb25zdCByZSA9IC8oXi0/XFxkKlxcLj9cXGQqKSguKikvO1xuICAgIGNvbnN0IG1hdGNoID0gcHJvcC5tYXRjaChyZSk7XG4gICAgY29uc3QgdmFsdWUgPSBOdW1iZXIobWF0Y2hbMV0pO1xuICAgIGNvbnN0IHVuaXQgPSBtYXRjaFsyXTtcbiAgICByZXR1cm4ge3ZhbHVlLCB1bml0fTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdlaWdodGVkQXZlcmFnZShmcm9tLCB0bywgd2VpZ2h0ID0gMTApIHtcbiAgICByZXR1cm4gKChmcm9tICogKHdlaWdodCAtIDEpKSArIHRvKSAvIHdlaWdodDtcbn1cbiIsImltcG9ydCByYW5kb20gZnJvbSAnLi9yYW5kb20nO1xuXG4vLyBncmVhdGVyIHByb2JhYmlsaXR5IG9mIGJlaW5nIGhhbGZ3YXkgYmV0d2VlZW4gbWluIGFuZCBtYXhcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gd2VpZ2h0ZWREaXN0cmlidXRpb24obWluLCBtYXgsIHdlaWdodCA9IDUpIHtcbiAgICBsZXQgdG90YWwgPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd2VpZ2h0OyBpKyspIHtcbiAgICAgICAgdG90YWwgKz0gcmFuZG9tKG1pbiwgbWF4KTtcbiAgICB9XG4gICAgcmV0dXJuIHRvdGFsIC8gd2VpZ2h0O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3VlcG9pbnRzUmVhZGVyKCkge1xuICAgIGNvbnN0IGxpc3QgPSBbXTtcbiAgICBsZXQgcmVhZGVyO1xuICAgIGxldCBkaXNwYXRjaDtcbiAgICBsZXQgY3VycmVudFBvc2l0aW9uID0gMDtcbiAgICBsZXQgbGFzdFBvc2l0aW9uID0gLTE7XG4gICAgbGV0IHRvbGVyYW5jZSA9IDAuMjtcblxuICAgIGZ1bmN0aW9uIGFkZChwb3NpdGlvbiwgbmFtZSwgZGF0YSkge1xuICAgICAgICBsaXN0LnB1c2goe3Bvc2l0aW9uLCBuYW1lLCBkYXRhfSk7XG5cbiAgICAgICAgbGlzdC5zb3J0KChhLCBiKSA9PiBhLnBvc2l0aW9uIC0gYi5wb3NpdGlvbik7XG5cbiAgICAgICAgcmV0dXJuIHJlYWRlcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkN1ZXBvaW50KGZuLCB0aGlzQXJnKSB7XG4gICAgICAgIGlmIChmbikge1xuICAgICAgICAgICAgZGlzcGF0Y2ggPSB0aGlzQXJnID8gZm4uYmluZCh0aGlzQXJnKSA6IGZuO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGlzcGF0Y2ggPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZWFkZXI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICAgIGN1cnJlbnRQb3NpdGlvbiA9IDA7XG4gICAgICAgIGxhc3RQb3NpdGlvbiA9IC0xO1xuICAgICAgICByZXR1cm4gcmVhZGVyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZUFsbCgpIHtcbiAgICAgICAgbGlzdC5sZW5ndGggPSAwO1xuICAgICAgICByZXR1cm4gcmVzZXQoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRUb2xlcmFuY2UodmFsdWUpIHtcbiAgICAgICAgdG9sZXJhbmNlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiByZWFkZXI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5SYW5nZShjdWVwb2ludFBvcywgY3VycmVudFBvcywgbGFzdFBvcykge1xuICAgICAgICBpZiAoY3VlcG9pbnRQb3MgPiBjdXJyZW50UG9zKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGN1ZXBvaW50UG9zIDw9IGxhc3RQb3MpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBkaWZmID0gY3VlcG9pbnRQb3MgLSBjdXJyZW50UG9zO1xuICAgICAgICBpZiAoZGlmZiA8IDApIHtcbiAgICAgICAgICAgIGRpZmYgPSAtZGlmZjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGlmZiA8PSB0b2xlcmFuY2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2soY3VycmVudFBvcywgbGFzdFBvcykge1xuICAgICAgICBpZiAoY3VycmVudFBvcyA8PSBsYXN0UG9zKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBkaXNwYXRjaCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGlzdC5zb21lKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAoaW5SYW5nZShpdGVtLnBvc2l0aW9uLCBjdXJyZW50UG9zLCBsYXN0UG9zKSkge1xuICAgICAgICAgICAgICAgIGRpc3BhdGNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGUocG9zaXRpb24pIHtcbiAgICAgICAgY3VycmVudFBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgICAgIGNoZWNrKGN1cnJlbnRQb3NpdGlvbiwgbGFzdFBvc2l0aW9uKTtcbiAgICAgICAgbGFzdFBvc2l0aW9uID0gY3VycmVudFBvc2l0aW9uO1xuICAgICAgICByZXR1cm4gcmVhZGVyO1xuICAgIH1cblxuICAgIHJlYWRlciA9IE9iamVjdC5mcmVlemUoe1xuICAgICAgICBhZGQsXG4gICAgICAgIG9uQ3VlcG9pbnQsXG4gICAgICAgIHJlbW92ZUFsbCxcbiAgICAgICAgcmVzZXQsXG4gICAgICAgIHNldFRvbGVyYW5jZSxcbiAgICAgICAgdXBkYXRlXG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVhZGVyO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaU9TUGxheVZpZGVvSW5saW5lKGVsLCBsb29wID0gdHJ1ZSkge1xuICAgIGNvbnN0IGZyYW1lVGltZSA9IDEgLyAyNTtcblxuICAgIGxldCBzZWxmLFxuICAgICAgICBsYXN0VGltZSA9IDAsXG4gICAgICAgIHBsYXlpbmcgPSBmYWxzZTtcblxuICAgIC8vIFRoaXMgY2FuIChhbmQgc2hvdWxkKSBiZSBwdXQgaW4gYSBjc3MgZmlsZSBpbnN0ZWFkIG9mIGRvaW5nIHN0eWxlU2hlZXRzWzBdLmluc2VydFJ1bGU6XG4gICAgY29uc3QgY3NzUnVsZSA9ICcuaU9TUGxheVZpZGVvSW5saW5lOjotd2Via2l0LW1lZGlhLWNvbnRyb2xzIHsgZGlzcGxheTpub25lICFpbXBvcnRhbnQ7IH0nO1xuICAgIGRvY3VtZW50LnN0eWxlU2hlZXRzWzBdLmluc2VydFJ1bGUoY3NzUnVsZSwgMCk7XG5cbiAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoJ2NvbnRyb2xzJyk7XG4gICAgZWwuY2xhc3NMaXN0LmFkZCgnaU9TUGxheVZpZGVvSW5saW5lJyk7XG5cblxuICAgIGZ1bmN0aW9uIHNlZWsodGltZSkge1xuICAgICAgICBlbC5jdXJyZW50VGltZSA9IHRpbWU7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhdXNlKCkge1xuICAgICAgICBwbGF5aW5nID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUZyYW1lKCkge1xuICAgICAgICBpZiAoIXBsYXlpbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlRnJhbWUpO1xuXG4gICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIGNvbnN0IGRlbHRhVGltZSA9IG5vdyAtIGxhc3RUaW1lO1xuXG4gICAgICAgIGlmIChkZWx0YVRpbWUgPj0gZnJhbWVUaW1lICogMTAwMCkge1xuICAgICAgICAgICAgbGFzdFRpbWUgPSBub3c7XG5cbiAgICAgICAgICAgIGNvbnN0IGVuZGVkID0gZWwuY3VycmVudFRpbWUgKyBmcmFtZVRpbWUgPj0gZWwuZHVyYXRpb247XG5cbiAgICAgICAgICAgIGlmIChlbmRlZCAmJiBsb29wKSB7XG4gICAgICAgICAgICAgICAgc2VlaygwKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZW5kZWQpIHtcbiAgICAgICAgICAgICAgICBwYXVzZSgpO1xuICAgICAgICAgICAgICAgIC8vIHNlbGYuZW1pdCgnZW5kZWQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VlayhlbC5jdXJyZW50VGltZSArIGZyYW1lVGltZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHNlbGYuZW1pdCgndGltZXVwZGF0ZScsIGVsLmN1cnJlbnRUaW1lLCBzZWxmKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBsYXkoKSB7XG4gICAgICAgIHBsYXlpbmcgPSB0cnVlO1xuICAgICAgICB1cGRhdGVGcmFtZSgpO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICAvLyBzZWxmLnJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgICAgICBwYXVzZSgpO1xuICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUodXBkYXRlRnJhbWUpO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH1cblxuICAgIC8vIHNlbGYgPSBPYmplY3QuY3JlYXRlKEVtaXR0ZXIucHJvdG90eXBlLCB7XG4gICAgc2VsZiA9IE9iamVjdC5jcmVhdGUobnVsbCwge1xuICAgICAgICBfZXZlbnRzOiB7XG4gICAgICAgICAgICB2YWx1ZToge31cbiAgICAgICAgfSxcbiAgICAgICAgZGVzdHJveToge1xuICAgICAgICAgICAgdmFsdWU6IGRlc3Ryb3lcbiAgICAgICAgfSxcbiAgICAgICAgcGF1c2U6IHtcbiAgICAgICAgICAgIHZhbHVlOiBwYXVzZVxuICAgICAgICB9LFxuICAgICAgICBwbGF5OiB7XG4gICAgICAgICAgICB2YWx1ZTogcGxheVxuICAgICAgICB9LFxuICAgICAgICBzZWVrOiB7XG4gICAgICAgICAgICB2YWx1ZTogc2Vla1xuICAgICAgICB9LFxuICAgICAgICBlbDoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGN1cnJlbnRUaW1lOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbC5jdXJyZW50VGltZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZHVyYXRpb246IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsLmR1cmF0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBsb29wOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBsb29wO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICBsb29wID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHBsYXlpbmc6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBsYXlpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBPYmplY3QuZnJlZXplKHNlbGYpO1xufVxuIiwiaW1wb3J0IGN1ZXBvaW50c1JlYWRlciBmcm9tICcuL2N1ZXBvaW50c1JlYWRlcic7XG5pbXBvcnQgaU9TUGxheVZpZGVvSW5saW5lIGZyb20gJy4vaU9TUGxheVZpZGVvSW5saW5lJztcbmltcG9ydCB2aWRlb1BsYXllciBmcm9tICcuL3ZpZGVvUGxheWVyJztcbmltcG9ydCB2aW1lbyBmcm9tICcuL3ZpbWVvJztcbmltcG9ydCB5b3V0dWJlIGZyb20gJy4veW91dHViZSc7XG5pbXBvcnQgeW91dHViZUJhc2ljIGZyb20gJy4veW91dHViZUJhc2ljJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGN1ZXBvaW50c1JlYWRlcixcbiAgICBpT1NQbGF5VmlkZW9JbmxpbmUsXG4gICAgdmlkZW9QbGF5ZXIsXG4gICAgdmltZW8sXG4gICAgeW91dHViZSxcbiAgICB5b3V0dWJlQmFzaWNcbn07XG4iLCJpbXBvcnQgZW1pdHRlciBmcm9tICcuLi9ldmVudHMvZW1pdHRlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHZpZGVvUGxheWVyKHZpZGVvRWwpIHtcbiAgICBsZXQgZWwgPSB2aWRlb0VsIHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG4gICAgbGV0IHBsYXllcjtcblxuICAgIGZ1bmN0aW9uIG1ldGFkYXRhSGFuZGxlcigpIHtcbiAgICAgICAgcGxheWVyLmVtaXQoJ21ldGFkYXRhJywge1xuICAgICAgICAgICAgc3JjOiBlbC5jdXJyZW50U3JjLFxuICAgICAgICAgICAgd2lkdGg6IGVsLnZpZGVvV2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IGVsLnZpZGVvSGVpZ2h0LFxuICAgICAgICAgICAgZHVyYXRpb246IGVsLmR1cmF0aW9uXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhbnBsYXlIYW5kbGVyKCkge1xuICAgICAgICBwbGF5ZXIuZW1pdCgncmVhZHknKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGF5SGFuZGxlcigpIHtcbiAgICAgICAgcGxheWVyLmVtaXQoJ3BsYXknKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlbmRlZEhhbmRsZXIoKSB7XG4gICAgICAgIHBsYXllci5lbWl0KCdlbmRlZCcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVycm9ySGFuZGxlcigpIHtcbiAgICAgICAgcGxheWVyLmVtaXQoJ2Vycm9yJywgZWwuZXJyb3IpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRpbWV1cGRhdGVIYW5kbGVyKCkge1xuICAgICAgICBwbGF5ZXIuZW1pdCgndGltZXVwZGF0ZScsIGVsLmN1cnJlbnRUaW1lKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVFdmVudExpc3RlbmVycygpIHtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbG9hZGVkbWV0YWRhdGEnLCBtZXRhZGF0YUhhbmRsZXIpO1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjYW5wbGF5dGhyb3VnaCcsIGNhbnBsYXlIYW5kbGVyKTtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigncGxheScsIHBsYXlIYW5kbGVyKTtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigncGxheWluZycsIHBsYXlIYW5kbGVyKTtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignZXJyb3InLCBlcnJvckhhbmRsZXIpO1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdlbmRlZCcsIGVuZGVkSGFuZGxlcik7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RpbWV1cGRhdGUnLCB0aW1ldXBkYXRlSGFuZGxlcik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXJzKCk7XG5cbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVkbWV0YWRhdGEnLCBtZXRhZGF0YUhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2FucGxheXRocm91Z2gnLCBjYW5wbGF5SGFuZGxlciwgZmFsc2UpO1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdwbGF5JywgcGxheUhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigncGxheWluZycsIHBsYXlIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZXJyb3JIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2VuZGVkJywgZW5kZWRIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RpbWV1cGRhdGUnLCB0aW1ldXBkYXRlSGFuZGxlciwgZmFsc2UpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAgIHBsYXllci5vZmYoKTtcbiAgICAgICAgZWwucGF1c2UoKTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKCdzcmMnKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge31cblxuICAgICAgICByZW1vdmVFdmVudExpc3RlbmVycygpO1xuXG4gICAgICAgIGlmIChlbC5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICBlbC5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKGVsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVsID0gbnVsbDtcblxuICAgICAgICByZXR1cm4gcGxheWVyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEJsb2JVUkwodXJsKSB7XG4gICAgICAgIHVybCA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKHVybCk7XG4gICAgICAgIGZ1bmN0aW9uIHJldm9rZSgpIHtcbiAgICAgICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NhbnBsYXl0aHJvdWdoJywgcmV2b2tlKTtcbiAgICAgICAgICAgIHdpbmRvdy5VUkwucmV2b2tlT2JqZWN0VVJMKHVybCk7XG4gICAgICAgIH1cbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2FucGxheXRocm91Z2gnLCByZXZva2UpO1xuICAgICAgICByZXR1cm4gdXJsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvYWQodXJsKSB7XG4gICAgICAgIGlmICh3aW5kb3cuQmxvYiAmJiB1cmwgaW5zdGFuY2VvZiB3aW5kb3cuQmxvYikge1xuICAgICAgICAgICAgdXJsID0gZ2V0QmxvYlVSTCh1cmwpO1xuICAgICAgICB9XG4gICAgICAgIGFkZEV2ZW50TGlzdGVuZXJzKCk7XG5cbiAgICAgICAgZWwuY3Jvc3NPcmlnaW4gPSAnYW5vbnltb3VzJztcbiAgICAgICAgZWwucHJlbG9hZCA9ICdhdXRvJztcbiAgICAgICAgZWwuc3JjID0gdXJsO1xuICAgICAgICBlbC5sb2FkKCk7XG5cbiAgICAgICAgcmV0dXJuIHBsYXllcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGF5KCkge1xuICAgICAgICBlbC5wbGF5KCk7XG5cbiAgICAgICAgcmV0dXJuIHBsYXllcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXVzZSgpIHtcbiAgICAgICAgZWwucGF1c2UoKTtcblxuICAgICAgICByZXR1cm4gcGxheWVyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNlZWsodGltZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZWwuY3VycmVudFRpbWUgPSB0aW1lO1xuICAgICAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgICAgIHJldHVybiBwbGF5ZXI7XG4gICAgfVxuXG4gICAgYWRkRXZlbnRMaXN0ZW5lcnMoKTtcblxuICAgIHBsYXllciA9IE9iamVjdC5jcmVhdGUoZW1pdHRlci5wcm90b3R5cGUsIHtcbiAgICAgICAgX2V2ZW50czoge1xuICAgICAgICAgICAgdmFsdWU6IHt9XG4gICAgICAgIH0sXG4gICAgICAgIGRlc3Ryb3k6IHtcbiAgICAgICAgICAgIHZhbHVlOiBkZXN0cm95XG4gICAgICAgIH0sXG4gICAgICAgIGxvYWQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiBsb2FkXG4gICAgICAgIH0sXG4gICAgICAgIHBhdXNlOiB7XG4gICAgICAgICAgICB2YWx1ZTogcGF1c2VcbiAgICAgICAgfSxcbiAgICAgICAgcGxheToge1xuICAgICAgICAgICAgdmFsdWU6IHBsYXlcbiAgICAgICAgfSxcbiAgICAgICAgc2Vlazoge1xuICAgICAgICAgICAgdmFsdWU6IHNlZWtcbiAgICAgICAgfSxcbiAgICAgICAgZWw6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjdXJyZW50VGltZToge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZWwuY3VycmVudFRpbWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGVsLmN1cnJlbnRUaW1lID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGR1cmF0aW9uOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbC5kdXJhdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdm9sdW1lOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbC52b2x1bWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGVsLnZvbHVtZSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZShwbGF5ZXIpO1xufVxuIiwiaW1wb3J0IGVtaXR0ZXIgZnJvbSAnLi4vZXZlbnRzL2VtaXR0ZXInO1xuXG4vLyBodHRwczovL2RldmVsb3Blci52aW1lby5jb20vcGxheWVyL2pzLWFwaVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB2aW1lbyhlbCkge1xuICAgIGNvbnN0IHZpbWVvUGxheWVyID0gZWwuY29udGVudFdpbmRvdztcbiAgICBjb25zdCByZSA9IC9eaHR0cHM/OlxcL1xcL3BsYXllci52aW1lby5jb20vO1xuICAgIGxldCBwbGF5ZXIsIG9yaWdpbiA9ICcqJywgcGF1c2VkID0gZmFsc2U7XG5cbiAgICBmdW5jdGlvbiBzZW5kQ29tbWFuZChtZXRob2QsIHZhbHVlID0gJycpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgIG1ldGhvZFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgZGF0YS52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgICAgICB2aW1lb1BsYXllci5wb3N0TWVzc2FnZShtZXNzYWdlLCBvcmlnaW4pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBsYXkoKSB7XG4gICAgICAgIHBhdXNlZCA9IGZhbHNlO1xuICAgICAgICBzZW5kQ29tbWFuZCgncGxheScpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhdXNlKCkge1xuICAgICAgICBwYXVzZWQgPSB0cnVlO1xuICAgICAgICBzZW5kQ29tbWFuZCgncGF1c2UnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblJlYWR5KCkge1xuICAgICAgICBzZW5kQ29tbWFuZCgnYWRkRXZlbnRMaXN0ZW5lcicsICdwbGF5Jyk7XG4gICAgICAgIHNlbmRDb21tYW5kKCdhZGRFdmVudExpc3RlbmVyJywgJ3BhdXNlJyk7XG4gICAgICAgIHNlbmRDb21tYW5kKCdhZGRFdmVudExpc3RlbmVyJywgJ2ZpbmlzaCcpO1xuICAgICAgICBzZW5kQ29tbWFuZCgnYWRkRXZlbnRMaXN0ZW5lcicsICdwbGF5UHJvZ3Jlc3MnKTtcbiAgICAgICAgcGxheWVyLmVtaXQoJ3JlYWR5Jyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25QbGF5KCkge1xuICAgICAgICBwYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgcGxheWVyLmVtaXQoJ3BsYXknKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblBhdXNlKCkge1xuICAgICAgICBwYXVzZWQgPSB0cnVlO1xuICAgICAgICBwbGF5ZXIuZW1pdCgncGF1c2UnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkZpbmlzaCgpIHtcbiAgICAgICAgcGxheWVyLmVtaXQoJ2VuZGVkJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25QbGF5UHJvZ3Jlc3MoZGF0YSkge1xuICAgICAgICBwbGF5ZXIuZW1pdCgndGltZXVwZGF0ZScsIGRhdGEuc2Vjb25kcyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25NZXNzYWdlKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGlzVmltZW8gPSByZS50ZXN0KGV2ZW50Lm9yaWdpbik7XG5cbiAgICAgICAgaWYgKCFpc1ZpbWVvKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShldmVudC5kYXRhKTtcblxuICAgICAgICBpZiAoZGF0YS5wbGF5ZXJfaWQgJiYgZWwuaWQgIT09IGRhdGEucGxheWVyX2lkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3JpZ2luID09PSAnKicpIHtcbiAgICAgICAgICAgIG9yaWdpbiA9IGV2ZW50Lm9yaWdpbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoZGF0YS5ldmVudCkge1xuICAgICAgICAgICAgY2FzZSAncmVhZHknOlxuICAgICAgICAgICAgICAgIG9uUmVhZHkoZGF0YS5wbGF5ZXJfaWQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncGxheVByb2dyZXNzJzpcbiAgICAgICAgICAgICAgICBvblBsYXlQcm9ncmVzcyhkYXRhLmRhdGEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncGxheSc6XG4gICAgICAgICAgICAgICAgb25QbGF5KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdwYXVzZSc6XG4gICAgICAgICAgICAgICAgb25QYXVzZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZmluaXNoJzpcbiAgICAgICAgICAgICAgICBvbkZpbmlzaCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgb25NZXNzYWdlKTtcbiAgICB9XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIG9uTWVzc2FnZSk7XG5cbiAgICBwbGF5ZXIgPSBPYmplY3QuYXNzaWduKE9iamVjdC5jcmVhdGUoZW1pdHRlci5wcm90b3R5cGUpLCB7XG4gICAgICAgIF9ldmVudHM6IHt9LFxuICAgICAgICBwbGF5LFxuICAgICAgICBwYXVzZSxcbiAgICAgICAgcGF1c2VkOiAoKSA9PiBwYXVzZWQsXG4gICAgICAgIGRlc3Ryb3lcbiAgICB9KTtcblxuICAgIHJldHVybiBwbGF5ZXI7XG59XG4iLCIvLyBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS95b3V0dWJlL2lmcmFtZV9hcGlfcmVmZXJlbmNlI0V2ZW50c1xuaW1wb3J0IHtFdmVudEVtaXR0ZXJ9IGZyb20gJ2V2ZW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHlvdXR1YmUoZWwpIHtcbiAgICBsZXQgZW1pdHRlciA9IG51bGwsIHBsYXllciA9IG51bGwsIHBhdXNlZCA9IGZhbHNlO1xuXG4gICAgZnVuY3Rpb24gcGxheSgpIHtcbiAgICAgICAgcGF1c2VkID0gZmFsc2U7XG4gICAgICAgIHBsYXllci5wbGF5VmlkZW8oKTtcbiAgICAgICAgcmV0dXJuIGVtaXR0ZXI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGF1c2UoKSB7XG4gICAgICAgIHBhdXNlZCA9IHRydWU7XG4gICAgICAgIHBsYXllci5wYXVzZVZpZGVvKCk7XG4gICAgICAgIHJldHVybiBlbWl0dGVyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uUmVhZHkoKSB7XG4gICAgICAgIGVtaXR0ZXIuZW1pdCgncmVhZHknKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblN0YXRlQ2hhbmdlKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHtQbGF5ZXJTdGF0ZX0gPSB3aW5kb3cuWVQ7XG5cbiAgICAgICAgc3dpdGNoIChldmVudC5kYXRhKSB7XG4gICAgICAgICAgICBjYXNlIFBsYXllclN0YXRlLkNVRUQ6XG4gICAgICAgICAgICBjYXNlIFBsYXllclN0YXRlLkJVRkZFUklORzpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUGxheWVyU3RhdGUuUExBWUlORzpcbiAgICAgICAgICAgICAgICBwYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBlbWl0dGVyLmVtaXQoJ3BsYXknKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUGxheWVyU3RhdGUuUEFVU0VEOlxuICAgICAgICAgICAgICAgIHBhdXNlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgZW1pdHRlci5lbWl0KCdwYXVzZScpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBQbGF5ZXJTdGF0ZS5FTkRFRDpcbiAgICAgICAgICAgICAgICBlbWl0dGVyLmVtaXQoJ2VuZGVkJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OiBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlc3Ryb3koKSB7fVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlUGxheWVyKCkge1xuICAgICAgICBpZiAocGxheWVyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBwbGF5ZXIgPSBuZXcgd2luZG93LllULlBsYXllcihlbCwge1xuICAgICAgICAgICAgZXZlbnRzOiB7XG4gICAgICAgICAgICAgICAgb25SZWFkeSxcbiAgICAgICAgICAgICAgICBvblN0YXRlQ2hhbmdlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG5cbiAgICBpZiAod2luZG93LllUKSB7XG4gICAgICAgIGNyZWF0ZVBsYXllcigpO1xuICAgIH0gZWxzZSBpZiAod2luZG93Lnl0UGxheWVyQ2FsbHMpIHtcbiAgICAgICAgd2luZG93Lnl0UGxheWVyQ2FsbHMucHVzaChjcmVhdGVQbGF5ZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy55dFBsYXllckNhbGxzID0gW2NyZWF0ZVBsYXllcl07XG4gICAgICAgIHdpbmRvdy5vbllvdVR1YmVJZnJhbWVBUElSZWFkeSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgd2luZG93Lnl0UGxheWVyQ2FsbHMuZm9yRWFjaCgoY2FsbCkgPT4gY2FsbCgpKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgIHNjcmlwdC5zcmMgPSAnaHR0cHM6Ly93d3cueW91dHViZS5jb20vaWZyYW1lX2FwaSc7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICB9XG5cbiAgICBlbWl0dGVyID0gT2JqZWN0LmFzc2lnbihPYmplY3QuY3JlYXRlKEV2ZW50RW1pdHRlci5wcm90b3R5cGUpLCB7XG4gICAgICAgIF9ldmVudHM6IHt9LFxuICAgICAgICBwbGF5LFxuICAgICAgICBwYXVzZSxcbiAgICAgICAgcGF1c2VkOiAoKSA9PiBwYXVzZWQsXG4gICAgICAgIGRlc3Ryb3lcbiAgICB9KTtcblxuICAgIHJldHVybiBlbWl0dGVyO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24geW91dHViZUJhc2ljKGVsKSB7XG4gICAgY29uc3QgaWZyYW1lID0gZWwuY29udGVudFdpbmRvdztcblxuICAgIGZ1bmN0aW9uIHNlbmRDb21tYW5kKGNvbW1hbmQpIHtcbiAgICAgICAgaWZyYW1lLnBvc3RNZXNzYWdlKGB7XCJldmVudFwiOlwiY29tbWFuZFwiLFwiZnVuY1wiOlwiJHtjb21tYW5kfVwiLFwiYXJnc1wiOlwiXCJ9YCwgJyonKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGF5KCkge1xuICAgICAgICBzZW5kQ29tbWFuZCgncGxheVZpZGVvJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGF1c2UoKSB7XG4gICAgICAgIHNlbmRDb21tYW5kKCdwYXVzZVZpZGVvJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGxheSxcbiAgICAgICAgcGF1c2VcbiAgICB9O1xufVxuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgdGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG5FdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbihuKSB7XG4gIGlmICghaXNOdW1iZXIobikgfHwgbiA8IDAgfHwgaXNOYU4obikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCduIG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXInKTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBlciwgaGFuZGxlciwgbGVuLCBhcmdzLCBpLCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAodHlwZSA9PT0gJ2Vycm9yJykge1xuICAgIGlmICghdGhpcy5fZXZlbnRzLmVycm9yIHx8XG4gICAgICAgIChpc09iamVjdCh0aGlzLl9ldmVudHMuZXJyb3IpICYmICF0aGlzLl9ldmVudHMuZXJyb3IubGVuZ3RoKSkge1xuICAgICAgZXIgPSBhcmd1bWVudHNbMV07XG4gICAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEF0IGxlYXN0IGdpdmUgc29tZSBraW5kIG9mIGNvbnRleHQgdG8gdGhlIHVzZXJcbiAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5jYXVnaHQsIHVuc3BlY2lmaWVkIFwiZXJyb3JcIiBldmVudC4gKCcgKyBlciArICcpJyk7XG4gICAgICAgIGVyci5jb250ZXh0ID0gZXI7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYW5kbGVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc1VuZGVmaW5lZChoYW5kbGVyKSlcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKGlzRnVuY3Rpb24oaGFuZGxlcikpIHtcbiAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIC8vIGZhc3QgY2FzZXNcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vIHNsb3dlclxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgIGhhbmRsZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGhhbmRsZXIpKSB7XG4gICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgbGlzdGVuZXJzID0gaGFuZGxlci5zbGljZSgpO1xuICAgIGxlbiA9IGxpc3RlbmVycy5sZW5ndGg7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKVxuICAgICAgbGlzdGVuZXJzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIG07XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgaWYgKHRoaXMuX2V2ZW50cy5uZXdMaXN0ZW5lcilcbiAgICB0aGlzLmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgaXNGdW5jdGlvbihsaXN0ZW5lci5saXN0ZW5lcikgP1xuICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgZWxzZSBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuICBlbHNlXG4gICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gW3RoaXMuX2V2ZW50c1t0eXBlXSwgbGlzdGVuZXJdO1xuXG4gIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pICYmICF0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkKSB7XG4gICAgaWYgKCFpc1VuZGVmaW5lZCh0aGlzLl9tYXhMaXN0ZW5lcnMpKSB7XG4gICAgICBtID0gdGhpcy5fbWF4TGlzdGVuZXJzO1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gICAgfVxuXG4gICAgaWYgKG0gJiYgbSA+IDAgJiYgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCA+IG0pIHtcbiAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQgPSB0cnVlO1xuICAgICAgY29uc29sZS5lcnJvcignKG5vZGUpIHdhcm5pbmc6IHBvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgJyArXG4gICAgICAgICAgICAgICAgICAgICdsZWFrIGRldGVjdGVkLiAlZCBsaXN0ZW5lcnMgYWRkZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gaW5jcmVhc2UgbGltaXQuJyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCk7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUudHJhY2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gbm90IHN1cHBvcnRlZCBpbiBJRSAxMFxuICAgICAgICBjb25zb2xlLnRyYWNlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIHZhciBmaXJlZCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGcoKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBnKTtcblxuICAgIGlmICghZmlyZWQpIHtcbiAgICAgIGZpcmVkID0gdHJ1ZTtcbiAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgZy5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICB0aGlzLm9uKHR5cGUsIGcpO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gZW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWRcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbGlzdCwgcG9zaXRpb24sIGxlbmd0aCwgaTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXR1cm4gdGhpcztcblxuICBsaXN0ID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuICBsZW5ndGggPSBsaXN0Lmxlbmd0aDtcbiAgcG9zaXRpb24gPSAtMTtcblxuICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHxcbiAgICAgIChpc0Z1bmN0aW9uKGxpc3QubGlzdGVuZXIpICYmIGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG5cbiAgfSBlbHNlIGlmIChpc09iamVjdChsaXN0KSkge1xuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tID4gMDspIHtcbiAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fFxuICAgICAgICAgIChsaXN0W2ldLmxpc3RlbmVyICYmIGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgbGlzdC5sZW5ndGggPSAwO1xuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC5zcGxpY2UocG9zaXRpb24sIDEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGtleSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgaWYgKCF0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIGVsc2UgaWYgKHRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICBmb3IgKGtleSBpbiB0aGlzLl9ldmVudHMpIHtcbiAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICB9XG4gICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzRnVuY3Rpb24obGlzdGVuZXJzKSkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgfSBlbHNlIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAvLyBMSUZPIG9yZGVyXG4gICAgd2hpbGUgKGxpc3RlbmVycy5sZW5ndGgpXG4gICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tsaXN0ZW5lcnMubGVuZ3RoIC0gMV0pO1xuICB9XG4gIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIHJldDtcbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXQgPSBbXTtcbiAgZWxzZSBpZiAoaXNGdW5jdGlvbih0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIHJldCA9IFt0aGlzLl9ldmVudHNbdHlwZV1dO1xuICBlbHNlXG4gICAgcmV0ID0gdGhpcy5fZXZlbnRzW3R5cGVdLnNsaWNlKCk7XG4gIHJldHVybiByZXQ7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIGlmICh0aGlzLl9ldmVudHMpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICAgIGlmIChpc0Z1bmN0aW9uKGV2bGlzdGVuZXIpKVxuICAgICAgcmV0dXJuIDE7XG4gICAgZWxzZSBpZiAoZXZsaXN0ZW5lcilcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgfVxuICByZXR1cm4gMDtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xufTtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGlzTnVtYmVyKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ251bWJlcic7XG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xufVxuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gdm9pZCAwO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbnZhciBNaW5pU2lnbmFsQmluZGluZyA9IChmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIE1pbmlTaWduYWxCaW5kaW5nKGZuLCBvbmNlLCB0aGlzQXJnKSB7XG4gICAgaWYgKG9uY2UgPT09IHVuZGVmaW5lZCkgb25jZSA9IGZhbHNlO1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIE1pbmlTaWduYWxCaW5kaW5nKTtcblxuICAgIHRoaXMuX2ZuID0gZm47XG4gICAgdGhpcy5fb25jZSA9IG9uY2U7XG4gICAgdGhpcy5fdGhpc0FyZyA9IHRoaXNBcmc7XG4gICAgdGhpcy5fbmV4dCA9IHRoaXMuX3ByZXYgPSB0aGlzLl9vd25lciA9IG51bGw7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoTWluaVNpZ25hbEJpbmRpbmcsIFt7XG4gICAga2V5OiAnZGV0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGV0YWNoKCkge1xuICAgICAgaWYgKHRoaXMuX293bmVyID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG4gICAgICB0aGlzLl9vd25lci5kZXRhY2godGhpcyk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gTWluaVNpZ25hbEJpbmRpbmc7XG59KSgpO1xuXG5mdW5jdGlvbiBfYWRkTWluaVNpZ25hbEJpbmRpbmcoc2VsZiwgbm9kZSkge1xuICBpZiAoIXNlbGYuX2hlYWQpIHtcbiAgICBzZWxmLl9oZWFkID0gbm9kZTtcbiAgICBzZWxmLl90YWlsID0gbm9kZTtcbiAgfSBlbHNlIHtcbiAgICBzZWxmLl90YWlsLl9uZXh0ID0gbm9kZTtcbiAgICBub2RlLl9wcmV2ID0gc2VsZi5fdGFpbDtcbiAgICBzZWxmLl90YWlsID0gbm9kZTtcbiAgfVxuXG4gIG5vZGUuX293bmVyID0gc2VsZjtcblxuICByZXR1cm4gbm9kZTtcbn1cblxudmFyIE1pbmlTaWduYWwgPSAoZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBNaW5pU2lnbmFsKCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBNaW5pU2lnbmFsKTtcblxuICAgIHRoaXMuX2hlYWQgPSB0aGlzLl90YWlsID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKE1pbmlTaWduYWwsIFt7XG4gICAga2V5OiAnaGFuZGxlcnMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVycygpIHtcbiAgICAgIHZhciBleGlzdHMgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IGFyZ3VtZW50c1swXTtcblxuICAgICAgdmFyIG5vZGUgPSB0aGlzLl9oZWFkO1xuXG4gICAgICBpZiAoZXhpc3RzKSByZXR1cm4gISFub2RlO1xuXG4gICAgICB2YXIgZWUgPSBbXTtcblxuICAgICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgICAgZWUucHVzaChub2RlKTtcbiAgICAgICAgbm9kZSA9IG5vZGUuX25leHQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBlZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdoYXMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBoYXMobm9kZSkge1xuICAgICAgaWYgKCEobm9kZSBpbnN0YW5jZW9mIE1pbmlTaWduYWxCaW5kaW5nKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pbmlTaWduYWwjaGFzKCk6IEZpcnN0IGFyZyBtdXN0IGJlIGEgTWluaVNpZ25hbEJpbmRpbmcgb2JqZWN0LicpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbm9kZS5fb3duZXIgPT09IHRoaXM7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZGlzcGF0Y2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkaXNwYXRjaCgpIHtcbiAgICAgIHZhciBub2RlID0gdGhpcy5faGVhZDtcblxuICAgICAgaWYgKCFub2RlKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgIHdoaWxlIChub2RlKSB7XG4gICAgICAgIGlmIChub2RlLl9vbmNlKSB0aGlzLmRldGFjaChub2RlKTtcbiAgICAgICAgbm9kZS5fZm4uYXBwbHkobm9kZS5fdGhpc0FyZywgYXJndW1lbnRzKTtcbiAgICAgICAgbm9kZSA9IG5vZGUuX25leHQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2FkZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFkZChmbikge1xuICAgICAgdmFyIHRoaXNBcmcgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyBudWxsIDogYXJndW1lbnRzWzFdO1xuXG4gICAgICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWluaVNpZ25hbCNhZGQoKTogRmlyc3QgYXJnIG11c3QgYmUgYSBGdW5jdGlvbi4nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBfYWRkTWluaVNpZ25hbEJpbmRpbmcodGhpcywgbmV3IE1pbmlTaWduYWxCaW5kaW5nKGZuLCBmYWxzZSwgdGhpc0FyZykpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ29uY2UnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbmNlKGZuKSB7XG4gICAgICB2YXIgdGhpc0FyZyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IG51bGwgOiBhcmd1bWVudHNbMV07XG5cbiAgICAgIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaW5pU2lnbmFsI29uY2UoKTogRmlyc3QgYXJnIG11c3QgYmUgYSBGdW5jdGlvbi4nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBfYWRkTWluaVNpZ25hbEJpbmRpbmcodGhpcywgbmV3IE1pbmlTaWduYWxCaW5kaW5nKGZuLCB0cnVlLCB0aGlzQXJnKSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZGV0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGV0YWNoKG5vZGUpIHtcbiAgICAgIGlmICghKG5vZGUgaW5zdGFuY2VvZiBNaW5pU2lnbmFsQmluZGluZykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaW5pU2lnbmFsI2RldGFjaCgpOiBGaXJzdCBhcmcgbXVzdCBiZSBhIE1pbmlTaWduYWxCaW5kaW5nIG9iamVjdC4nKTtcbiAgICAgIH1cbiAgICAgIGlmIChub2RlLl9vd25lciAhPT0gdGhpcykgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGlmIChub2RlLl9wcmV2KSBub2RlLl9wcmV2Ll9uZXh0ID0gbm9kZS5fbmV4dDtcbiAgICAgIGlmIChub2RlLl9uZXh0KSBub2RlLl9uZXh0Ll9wcmV2ID0gbm9kZS5fcHJldjtcblxuICAgICAgaWYgKG5vZGUgPT09IHRoaXMuX2hlYWQpIHtcbiAgICAgICAgdGhpcy5faGVhZCA9IG5vZGUuX25leHQ7XG4gICAgICAgIGlmIChub2RlLl9uZXh0ID09PSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5fdGFpbCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAobm9kZSA9PT0gdGhpcy5fdGFpbCkge1xuICAgICAgICB0aGlzLl90YWlsID0gbm9kZS5fcHJldjtcbiAgICAgICAgdGhpcy5fdGFpbC5fbmV4dCA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIG5vZGUuX293bmVyID0gbnVsbDtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2RldGFjaEFsbCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRldGFjaEFsbCgpIHtcbiAgICAgIHZhciBub2RlID0gdGhpcy5faGVhZDtcbiAgICAgIGlmICghbm9kZSkgcmV0dXJuIHRoaXM7XG5cbiAgICAgIHRoaXMuX2hlYWQgPSB0aGlzLl90YWlsID0gbnVsbDtcblxuICAgICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgICAgbm9kZS5fb3duZXIgPSBudWxsO1xuICAgICAgICBub2RlID0gbm9kZS5fbmV4dDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBNaW5pU2lnbmFsO1xufSkoKTtcblxuTWluaVNpZ25hbC5NaW5pU2lnbmFsQmluZGluZyA9IE1pbmlTaWduYWxCaW5kaW5nO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBNaW5pU2lnbmFsO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvYmplY3RQb29sKGZhY3RvcnlGbikge1xuXG4gICAgbGV0IHBvb2wgPSBbXTtcbiAgICBsZXQgbnVtQ3JlYXRlZCA9IDA7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRQb29sICgpIHtcbiAgICAgICAgICAgIHJldHVybiBwb29sO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgaWYgKCBwb29sLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvb2wucG9wKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG51bUNyZWF0ZWQrKztcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFjdG9yeUZuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGRpc3Bvc2UgKGluc3RhbmNlKSB7XG4gICAgICAgICAgICBwb29sLnB1c2goaW5zdGFuY2UpO1xuICAgICAgICB9LFxuICAgICAgICBmaWxsIChjb3VudCkge1xuICAgICAgICAgICAgd2hpbGUgKCBwb29sLmxlbmd0aCA8IGNvdW50ICkge1xuICAgICAgICAgICAgICAgIG51bUNyZWF0ZWQrKztcbiAgICAgICAgICAgICAgICBwb29sW3Bvb2wubGVuZ3RoXSA9IGZhY3RvcnlGbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlbXB0eSAoKSB7XG4gICAgICAgICAgICBwb29sID0gW107XG4gICAgICAgIH0sXG4gICAgICAgIGdldE51bUNyZWF0ZWQoKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVtQ3JlYXRlZDtcbiAgICAgICAgfVxuICAgIH07XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjbG9uZShvYikge1xuICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iKSk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmaWx0ZXIob2IsIHByZWRpY2F0ZSkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhvYilcbiAgICAgICAgLmZpbHRlcihrZXkgPT4gcHJlZGljYXRlKGtleSwgb2Jba2V5XSkpXG4gICAgICAgIC5yZWR1Y2UoKG5ld09iLCBrZXkpID0+IHtcbiAgICAgICAgICAgIG5ld09iW2tleV0gPSBvYltrZXldO1xuICAgICAgICAgICAgcmV0dXJuIG5ld09iO1xuICAgICAgICB9LCB7fSk7XG59XG4iLCJpbXBvcnQgY2xvbmUgZnJvbSAnLi9jbG9uZSc7XG5pbXBvcnQgZmlsdGVyIGZyb20gJy4vZmlsdGVyJztcbmltcG9ydCBtYXAgZnJvbSAnLi9tYXAnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgY2xvbmUsXG4gICAgZmlsdGVyLFxuICAgIG1hcFxufTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1hcChvYiwgZm4pIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMob2IpXG4gICAgICAgIC5yZWR1Y2UoKG5ld09iLCBrZXkpID0+IHtcbiAgICAgICAgICAgIG5ld09iW2tleV0gPSBmbihrZXksIG9iW2tleV0pO1xuICAgICAgICAgICAgcmV0dXJuIG5ld09iO1xuICAgICAgICB9LCB7fSk7XG59XG4iLCJjb25zdCB7YWJzLCBhdGFuMiwgY29zLCBzaW4sIHNxcnR9ID0gTWF0aDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFydGljbGUge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5vcHRzID0gb3B0aW9ucztcblxuICAgICAgICB0aGlzLl9ib3VuZHMgPSB7fTtcbiAgICAgICAgdGhpcy5fb3V0ZXJCb3VuZHMgPSB7fTtcblxuICAgICAgICB0aGlzLl9kZWZhdWx0cyA9IHtcbiAgICAgICAgICAgIGFsaXZlOiB0cnVlLFxuICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgIHk6IDAsXG4gICAgICAgICAgICBhbmdsZTogMCxcbiAgICAgICAgICAgIHNwZWVkOiAwLFxuICAgICAgICAgICAgZ3Jhdml0eTogMCxcbiAgICAgICAgICAgIG1hc3M6IDEsXG4gICAgICAgICAgICByYWRpdXM6IDAsXG4gICAgICAgICAgICBib3VuY2U6IHt4OiAtMSwgeTogLTF9LFxuICAgICAgICAgICAgZnJpY3Rpb246IDEsXG4gICAgICAgICAgICBsaWZlVGltZTogMCxcbiAgICAgICAgICAgIGJvdW5kczoge3g6IDAsIHk6IDAsIHdpZHRoOiAxMjgwLCBoZWlnaHQ6IDcyMH1cbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLl9wcm9wcyA9IE9iamVjdC5rZXlzKHRoaXMuX2RlZmF1bHRzKTtcblxuICAgICAgICB0aGlzLnJlc2V0KG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHJlc2V0KG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgZGVmcyA9IHRoaXMuX2RlZmF1bHRzO1xuICAgICAgICBjb25zdCBwcm9wcyA9IHRoaXMuX3Byb3BzO1xuICAgICAgICBjb25zdCBvcHRzID0gb3B0aW9ucyB8fCBkZWZzO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IHByb3BzW2ldO1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBvcHRzW2tleV0gfHwgZGVmc1trZXldO1xuICAgICAgICAgICAgdGhpc1trZXldID0gdmFsdWU7XG4gICAgICAgICAgICBkZWZzW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGFuZ2xlID0gb3B0cy5hbmdsZSB8fCBkZWZzLmFuZ2xlO1xuICAgICAgICBjb25zdCBzcGVlZCA9IG9wdHMuc3BlZWQgfHwgZGVmcy5zcGVlZDtcblxuICAgICAgICB0aGlzLnZ4ID0gY29zKGFuZ2xlKSAqIHNwZWVkO1xuICAgICAgICB0aGlzLnZ5ID0gc2luKGFuZ2xlKSAqIHNwZWVkO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy52eCAqPSB0aGlzLmZyaWN0aW9uO1xuICAgICAgICB0aGlzLnZ5ICo9IHRoaXMuZnJpY3Rpb247XG4gICAgICAgIHRoaXMudnkgKz0gdGhpcy5ncmF2aXR5O1xuICAgICAgICB0aGlzLnggKz0gdGhpcy52eDtcbiAgICAgICAgdGhpcy55ICs9IHRoaXMudnk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGFjY2VsbGVyYXRlKHNwZWVkLCBhbmdsZSkge1xuICAgICAgICBpZiAodHlwZW9mIGFuZ2xlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgYW5nbGUgPSB0aGlzLmFuZ2xlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudnggKz0gY29zKGFuZ2xlKSAqIHNwZWVkO1xuICAgICAgICB0aGlzLnZ5ICs9IHNpbihhbmdsZSkgKiBzcGVlZDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZ2V0IHNwZWVkKCkge1xuICAgICAgICBpZiAodGhpcy52eCA9PT0gMCAmJiB0aGlzLnZ5ID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3FydCh0aGlzLnZ4ICogdGhpcy52eCArIHRoaXMudnkgKiB0aGlzLnZ5KTtcbiAgICB9XG5cbiAgICBzZXQgc3BlZWQodmFsdWUpIHtcbiAgICAgICAgY29uc3QgYW5nbGUgPSB0aGlzLmFuZ2xlO1xuICAgICAgICB0aGlzLnZ4ID0gY29zKGFuZ2xlKSAqIHZhbHVlO1xuICAgICAgICB0aGlzLnZ5ID0gc2luKGFuZ2xlKSAqIHZhbHVlO1xuICAgIH1cblxuICAgIGdldCBhbmdsZSgpIHtcbiAgICAgICAgaWYgKHRoaXMudnggPT09IDAgJiYgdGhpcy52eSA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGF0YW4yKHRoaXMudnksIHRoaXMudngpO1xuICAgIH1cblxuICAgIHNldCBhbmdsZSh2YWx1ZSkge1xuICAgICAgICBjb25zdCBzcGVlZCA9IHRoaXMuc3BlZWQ7XG4gICAgICAgIHRoaXMudnggPSBjb3ModmFsdWUpICogc3BlZWQ7XG4gICAgICAgIHRoaXMudnkgPSBzaW4odmFsdWUpICogc3BlZWQ7XG4gICAgfVxuXG4gICAgc2V0Qm91bmRzKHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgdGhpcy5fYm91bmRzLnggPSB4IHx8IDA7XG4gICAgICAgIHRoaXMuX2JvdW5kcy55ID0geSB8fCAwO1xuICAgICAgICB0aGlzLl9ib3VuZHMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5fYm91bmRzLmhlaWdodCA9IGhlaWdodDtcbiAgICB9XG5cbiAgICBnZXQgYm91bmRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYm91bmRzO1xuICAgIH1cblxuICAgIHNldCBib3VuZHMob2IpIHtcbiAgICAgICAgY29uc3Qge3gsIHksIHdpZHRoLCBoZWlnaHR9ID0gb2I7XG4gICAgICAgIHRoaXMuc2V0Qm91bmRzKHgsIHksIHdpZHRoLCBoZWlnaHQpO1xuICAgIH1cblxuICAgIGdldCBsZWZ0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy54IC0gdGhpcy5yYWRpdXM7XG4gICAgfVxuXG4gICAgZ2V0IHJpZ2h0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy54ICsgdGhpcy5yYWRpdXM7XG4gICAgfVxuXG4gICAgZ2V0IHRvcCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueSAtIHRoaXMucmFkaXVzO1xuICAgIH1cblxuICAgIGdldCBib3R0b20oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnkgKyB0aGlzLnJhZGl1cztcbiAgICB9XG5cbiAgICBnZXQgb3V0ZXJCb3VuZHMoKSB7XG4gICAgICAgIHRoaXMuX291dGVyQm91bmRzLmxlZnQgPSB0aGlzLl9ib3VuZHMueCAtIHRoaXMucmFkaXVzO1xuICAgICAgICB0aGlzLl9vdXRlckJvdW5kcy5yaWdodCA9IHRoaXMuX2JvdW5kcy54ICsgdGhpcy5fYm91bmRzLndpZHRoICsgdGhpcy5yYWRpdXM7XG4gICAgICAgIHRoaXMuX291dGVyQm91bmRzLnRvcCA9IHRoaXMuX2JvdW5kcy55IC0gdGhpcy5yYWRpdXM7XG4gICAgICAgIHRoaXMuX291dGVyQm91bmRzLmJvdHRvbSA9IHRoaXMuX2JvdW5kcy55ICsgdGhpcy5fYm91bmRzLmhlaWdodCArIHRoaXMucmFkaXVzO1xuICAgICAgICByZXR1cm4gdGhpcy5fb3V0ZXJCb3VuZHM7XG4gICAgfVxuXG4gICAgYW5nbGVUbyhwKSB7XG4gICAgICAgIHJldHVybiBhdGFuMihwLnkgLSB0aGlzLnksIHAueCAtIHRoaXMueCk7XG4gICAgfVxuXG4gICAgZGlzdGFuY2VUbyhwKSB7XG4gICAgICAgIGNvbnN0IGR4ID0gcC54IC0gdGhpcy54O1xuICAgICAgICBjb25zdCBkeSA9IHAueSAtIHRoaXMueTtcbiAgICAgICAgcmV0dXJuIHNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuICAgIH1cblxuICAgIG1vdmVUbyhwLCB0aHJ1c3QgPSAwLjAwNSkge1xuICAgICAgICBjb25zdCBkeCA9IHAueCAtIHRoaXMueDtcbiAgICAgICAgY29uc3QgZHkgPSBwLnkgLSB0aGlzLnk7XG5cbiAgICAgICAgdGhpcy52eCArPSBkeCAqIHRocnVzdDtcbiAgICAgICAgdGhpcy52eSArPSBkeSAqIHRocnVzdDtcblxuICAgICAgICBpZiAoYWJzKHRoaXMudngpID4gYWJzKGR4KSkge1xuICAgICAgICAgICAgdGhpcy52eCA9IGR4O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFicyh0aGlzLnZ5KSA+IGFicyhkeSkpIHtcbiAgICAgICAgICAgIHRoaXMudnkgPSBkeTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGdyYXZpdGF0ZVRvKHApIHtcbiAgICAgICAgY29uc3QgZHggPSBwLnggLSB0aGlzLng7XG4gICAgICAgIGNvbnN0IGR5ID0gcC55IC0gdGhpcy55O1xuICAgICAgICBjb25zdCBkaXN0U3EgPSBkeCAqIGR4ICsgZHkgKiBkeTtcbiAgICAgICAgaWYgKGRpc3RTcSA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGRpc3QgPSBzcXJ0KGRpc3RTcSk7XG4gICAgICAgICAgICBjb25zdCBmb3JjZSA9IHAubWFzcyAvIGRpc3RTcTtcbiAgICAgICAgICAgIGNvbnN0IGF4ID0gZHggLyBkaXN0ICogZm9yY2U7XG4gICAgICAgICAgICBjb25zdCBheSA9IGR5IC8gZGlzdCAqIGZvcmNlO1xuICAgICAgICAgICAgdGhpcy52eCArPSBheDtcbiAgICAgICAgICAgIHRoaXMudnkgKz0gYXk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzcHJpbmdUbyhwLCBzdGlmZm5lc3MsIGxlbmd0aCkge1xuICAgICAgICBjb25zdCBkeCA9IHAueCAtIHRoaXMueDtcbiAgICAgICAgY29uc3QgZHkgPSBwLnkgLSB0aGlzLnk7XG4gICAgICAgIGNvbnN0IGRpc3RhbmNlID0gc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgICAgIGNvbnN0IGZvcmNlID0gKGRpc3RhbmNlIC0gKGxlbmd0aCB8fCAwKSkgKiAoc3RpZmZuZXNzIHx8IDAuMik7XG5cbiAgICAgICAgaWYgKGFicyhkaXN0YW5jZSAqIGZvcmNlKSA+IDApIHtcbiAgICAgICAgICAgIHRoaXMudnggKz0gZHggLyBkaXN0YW5jZSAqIGZvcmNlO1xuICAgICAgICAgICAgdGhpcy52eSArPSBkeSAvIGRpc3RhbmNlICogZm9yY2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBjb2xsaWRlcyhwKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpc3RhbmNlVG8ocCkgPD0gdGhpcy5yYWRpdXMgKyBwLnJhZGl1cztcbiAgICB9XG5cbiAgICBlZGdlQ29sbGlkZSgpIHtcbiAgICAgICAgY29uc3QgbGVmdCA9IHRoaXMuX2JvdW5kcy54ICsgdGhpcy5yYWRpdXM7XG4gICAgICAgIGNvbnN0IHJpZ2h0ID0gdGhpcy5fYm91bmRzLnggKyB0aGlzLl9ib3VuZHMud2lkdGggLSB0aGlzLnJhZGl1cztcbiAgICAgICAgY29uc3QgdG9wID0gdGhpcy5fYm91bmRzLnkgKyB0aGlzLnJhZGl1cztcbiAgICAgICAgY29uc3QgYm90dG9tID0gdGhpcy5fYm91bmRzLnkgKyB0aGlzLl9ib3VuZHMuaGVpZ2h0IC0gdGhpcy5yYWRpdXM7XG5cbiAgICAgICAgaWYgKHRoaXMueCA8IGxlZnQpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IGxlZnQ7XG4gICAgICAgICAgICB0aGlzLnZ4ID0gdGhpcy52eCAqIHRoaXMuYm91bmNlLng7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy54ID4gcmlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHJpZ2h0O1xuICAgICAgICAgICAgdGhpcy52eCA9IHRoaXMudnggKiB0aGlzLmJvdW5jZS54O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMueSA8IHRvcCkge1xuICAgICAgICAgICAgdGhpcy55ID0gdG9wO1xuICAgICAgICAgICAgdGhpcy52eSA9IHRoaXMudnkgKiB0aGlzLmJvdW5jZS55O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMueSA+IGJvdHRvbSkge1xuICAgICAgICAgICAgdGhpcy55ID0gYm90dG9tO1xuICAgICAgICAgICAgdGhpcy52eSA9IHRoaXMudnkgKiB0aGlzLmJvdW5jZS55O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZWRnZVdyYXAoKSB7XG4gICAgICAgIGNvbnN0IHtsZWZ0LCByaWdodCwgdG9wLCBib3R0b219ID0gdGhpcy5vdXRlckJvdW5kcztcblxuICAgICAgICBpZiAodGhpcy54IDwgbGVmdCkge1xuICAgICAgICAgICAgdGhpcy54ID0gcmlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy54ID4gcmlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IGxlZnQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy55IDwgdG9wKSB7XG4gICAgICAgICAgICB0aGlzLnkgPSBib3R0b207XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy55ID4gYm90dG9tKSB7XG4gICAgICAgICAgICB0aGlzLnkgPSB0b3A7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlZGdlS2lsbCgpIHtcbiAgICAgICAgY29uc3Qge2xlZnQsIHJpZ2h0LCB0b3AsIGJvdHRvbX0gPSB0aGlzLm91dGVyQm91bmRzO1xuXG4gICAgICAgIGlmICh0aGlzLnggPCBsZWZ0IHx8IHRoaXMueCA+IHJpZ2h0IHx8IHRoaXMueSA8IHRvcCB8fCB0aGlzLnkgPiBib3R0b20pIHtcbiAgICAgICAgICAgIHRoaXMuYWxpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVkZ2VSZXNldCgpIHtcbiAgICAgICAgY29uc3Qge2xlZnQsIHJpZ2h0LCB0b3AsIGJvdHRvbX0gPSB0aGlzLm91dGVyQm91bmRzO1xuXG4gICAgICAgIGlmICh0aGlzLnggPCBsZWZ0IHx8IHRoaXMueCA+IHJpZ2h0IHx8IHRoaXMueSA8IHRvcCB8fCB0aGlzLnkgPiBib3R0b20pIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxpZmVLaWxsKCkge1xuICAgICAgICB0aGlzLmxpZmVUaW1lLS07XG5cbiAgICAgICAgaWYgKHRoaXMubGlmZVRpbWUgPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5hbGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IGFuZHJvaWQgZnJvbSAnLi4vb3MvYW5kcm9pZCc7XG5cbi8vaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xNDQwMzc2Ni9ob3ctdG8tZGV0ZWN0LXRoZS1zdG9jay1hbmRyb2lkLWJyb3dzZXJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFuZHJvaWROYXRpdmUodWEgPSBuYXZpZ2F0b3IudXNlckFnZW50KSB7XG4gICAgaWYgKCFhbmRyb2lkKHVhKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgaXNBbmRyb2lkTW9iaWxlID0gdWEuaW5kZXhPZignTW96aWxsYS81LjAnKSA+IC0xICYmIHVhLmluZGV4T2YoJ0FwcGxlV2ViS2l0JykgPiAtMTtcblxuICAgIGNvbnN0IHJlQXBwbGVXZWJLaXQgPSAvQXBwbGVXZWJLaXRcXC8oW1xcZC5dKykvO1xuICAgIGNvbnN0IHJlc3VsdEFwcGxlV2ViS2l0ID0gcmVBcHBsZVdlYktpdC5leGVjKHVhKTtcbiAgICBjb25zdCBhcHBsZVdlYktpdFZlcnNpb24gPSByZXN1bHRBcHBsZVdlYktpdCA/IHBhcnNlRmxvYXQocmVBcHBsZVdlYktpdC5leGVjKHVhKVsxXSkgOiBudWxsO1xuXG4gICAgY29uc3QgcmVDaHJvbWUgPSAvQ2hyb21lXFwvKFtcXGQuXSspLztcbiAgICBjb25zdCByZXN1bHRDaHJvbWUgPSByZUNocm9tZS5leGVjKHVhKTtcbiAgICBjb25zdCBjaHJvbWVWZXJzaW9uID0gcmVzdWx0Q2hyb21lID8gcGFyc2VGbG9hdChyZUNocm9tZS5leGVjKHVhKVsxXSkgOiBudWxsO1xuXG4gICAgcmV0dXJuIGlzQW5kcm9pZE1vYmlsZSAmJiAoYXBwbGVXZWJLaXRWZXJzaW9uICYmIGFwcGxlV2ViS2l0VmVyc2lvbiA8IDUzNykgfHwgKGNocm9tZVZlcnNpb24gJiYgY2hyb21lVmVyc2lvbiA8IDM3KTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGllVmVyc2lvbih1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQpIHtcbiAgICBsZXQgdiA9IDA7XG4gICAgaWYgKC9NU0lFIChcXGQrXFwuXFxkKyk7Ly50ZXN0KHVhKSkge1xuICAgICAgICB2ID0gcGFyc2VJbnQoUmVnRXhwLiQxLCAxMCk7XG4gICAgfSBlbHNlIGlmICgvVHJpZGVudFxcLyhcXGQrXFwuXFxkKykoLiopcnY6KFxcZCtcXC5cXGQrKS8udGVzdCh1YSkpIHtcbiAgICAgICAgdiA9IHBhcnNlSW50KFJlZ0V4cC4kMywgMTApO1xuICAgIH1cbiAgICByZXR1cm4gdjtcbn1cbiIsImltcG9ydCBvcyBmcm9tICcuLi9vcyc7XG5pbXBvcnQgaWVWZXJzaW9uIGZyb20gJy4vaWVWZXJzaW9uJztcbmltcG9ydCBhbmRyb2lkTmF0aXZlIGZyb20gJy4vYW5kcm9pZE5hdGl2ZSc7XG5pbXBvcnQgc2FmYXJpIGZyb20gJy4vc2FmYXJpJztcblxuY29uc3QgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xuY29uc3QgY2hyb21laU9TID0gKCkgPT4gb3MuaW9zKCkgJiYgL0NyaU9TLy50ZXN0KHVhKTtcbmNvbnN0IGZpcmVmb3ggPSAoKSA9PiAvRmlyZWZveC8udGVzdCh1YSk7XG5jb25zdCBpZSA9ICgpID0+IGllVmVyc2lvbigpID4gMDtcbmNvbnN0IHNhZmFyaU1vYmlsZSA9ICgpID0+IG9zLmlvcygpICYmIC9BcHBsZVdlYktpdC8udGVzdCh1YSk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBhbmRyb2lkTmF0aXZlLFxuICAgIGNocm9tZWlPUyxcbiAgICBmaXJlZm94LFxuICAgIGllLFxuICAgIGllVmVyc2lvbixcbiAgICBzYWZhcmksXG4gICAgc2FmYXJpTW9iaWxlXG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2FmYXJpKHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudCkge1xuICAgIHJldHVybiAhL0FuZHJvaWQvLnRlc3QodWEpICYmICEvQ2hyb21lLy50ZXN0KHVhKSAmJiAvU2FmYXJpLy50ZXN0KHVhKTtcbn1cbiIsImNvbnN0IHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcblxuY29uc3QgaXBhZCA9ICgpID0+IC9pUGFkL2kudGVzdCh1YSk7XG5jb25zdCBpcG9kID0gKCkgPT4gL2lQb2QvaS50ZXN0KHVhKTtcbmNvbnN0IGlwaG9uZSA9ICgpID0+IC9pUGhvbmUvaS50ZXN0KHVhKTtcbmNvbnN0IG1vYmlsZSA9ICgpID0+ICEhdWEubWF0Y2goL0FuZHJvaWR8d2ViT1N8aVBob25lfGlQYWR8aVBvZHxCbGFja0JlcnJ5fElFTW9iaWxlfE9wZXJhIE1pbml8V2luZG93cyBQaG9uZXxTeW1iaWFuT1MvaSk7XG5jb25zdCBkZXNrdG9wID0gKCkgPT4gIW1vYmlsZSgpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZGVza3RvcCxcbiAgICBpcGFkLFxuICAgIGlwaG9uZSxcbiAgICBpcG9kLFxuICAgIG1vYmlsZVxufTtcbiIsImltcG9ydCBicm93c2VyIGZyb20gJy4vYnJvd3Nlcic7XG5pbXBvcnQgZGV2aWNlIGZyb20gJy4vZGV2aWNlJztcbmltcG9ydCBvcyBmcm9tICcuL29zJztcbmltcG9ydCBzdXBwb3J0cyBmcm9tICcuL3N1cHBvcnRzJztcbmltcG9ydCBzY3JlZW4gZnJvbSAnLi9zY3JlZW4nO1xuaW1wb3J0IGlzTG9jYWxIb3N0IGZyb20gJy4vaXNMb2NhbEhvc3QnO1xuXG5jb25zdCBsb2NhbCA9IGlzTG9jYWxIb3N0KCk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBicm93c2VyLFxuICAgIGRldmljZSxcbiAgICBvcyxcbiAgICBzdXBwb3J0cyxcbiAgICBzY3JlZW4sXG4gICAgbG9jYWxcbn07XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc0xvY2FsSG9zdCgpIHtcbiAgICByZXR1cm4gL14oPzpodHRwcz86XFwvXFwvKT8oPzpsb2NhbGhvc3R8MTkyXFwuMTY4KS8udGVzdCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbih1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQpIHtcbiAgICByZXR1cm4gL0FuZHJvaWQvaS50ZXN0KHVhKTtcbn1cbiIsImltcG9ydCBhbmRyb2lkIGZyb20gJy4vYW5kcm9pZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFuZHJvaWRWZXJzaW9uKHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudCkge1xuICAgIGlmICghYW5kcm9pZCh1YSkpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIGNvbnN0IHZlcnNpb24gPSB1YS5tYXRjaCgvQW5kcm9pZCAoXFxkKyg/OlxcLlxcZCspKyk7LylbMV07XG4gICAgY29uc3QgW2EsIGJdID0gdmVyc2lvbi5zcGxpdCgnLicpO1xuICAgIHJldHVybiBwYXJzZUZsb2F0KGAke2F9LiR7Yn1gKTtcbn1cbiIsImltcG9ydCBhbmRyb2lkIGZyb20gJy4vYW5kcm9pZCc7XG5pbXBvcnQgYW5kcm9pZFZlcnNpb24gZnJvbSAnLi9hbmRyb2lkVmVyc2lvbic7XG5pbXBvcnQgaW9zIGZyb20gJy4vaW9zJztcbmltcG9ydCBpb3NWZXJzaW9uIGZyb20gJy4vaW9zVmVyc2lvbic7XG5pbXBvcnQgbGludXggZnJvbSAnLi9saW51eCc7XG5pbXBvcnQgbWFjIGZyb20gJy4vbWFjJztcbmltcG9ydCB3aW5kb3dzIGZyb20gJy4vd2luZG93cyc7XG5pbXBvcnQgd2luZG93c1Bob25lIGZyb20gJy4vd2luZG93c1Bob25lJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGFuZHJvaWQsXG4gICAgYW5kcm9pZFZlcnNpb24sXG4gICAgaW9zLFxuICAgIGlvc1ZlcnNpb24sXG4gICAgbGludXgsXG4gICAgbWFjLFxuICAgIHdpbmRvd3MsXG4gICAgd2luZG93c1Bob25lXG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW9zKHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudCkge1xuICAgIHJldHVybiAvaVBbYW9dZHxpUGhvbmUvaS50ZXN0KHVhKTtcbn1cbiIsImltcG9ydCBpb3MgZnJvbSAnLi9pb3MnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpb3NWZXJzaW9uKHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudCkge1xuICAgIGlmIChpb3ModWEpKSB7XG4gICAgICAgIGNvbnN0IFssIGIsIGNdID0gdWEubWF0Y2goL09TIChcXGQrKV8oXFxkKykvaSk7XG4gICAgICAgIGlmIChiICYmIGMpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0KGAke2J9LiR7Y31gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gMDtcbn1cbiIsImltcG9ydCBhbmRyb2lkIGZyb20gJy4vYW5kcm9pZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxpbnV4KHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudCkge1xuICAgIHJldHVybiAhYW5kcm9pZCh1YSkgJiYgL0xpbnV4Ly50ZXN0KHVhKTtcbn1cbiIsImltcG9ydCBpb3MgZnJvbSAnLi9pb3MnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYWModWEgPSBuYXZpZ2F0b3IudXNlckFnZW50KSB7XG4gICAgcmV0dXJuICFpb3ModWEpICYmIC9NYWMgT1MvLnRlc3QodWEpO1xufVxuIiwiaW1wb3J0IHdpbmRvd3NQaG9uZSBmcm9tICcuL3dpbmRvd3NQaG9uZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdpbmRvd3ModWEgPSBuYXZpZ2F0b3IudXNlckFnZW50KSB7XG4gICAgcmV0dXJuICF3aW5kb3dzUGhvbmUodWEpICYmIC9XaW5kb3dzLy50ZXN0KHVhKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdpbmRvd3NQaG9uZSh1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQpIHtcbiAgICByZXR1cm4gL1dpbmRvd3MgUGhvbmUvaS50ZXN0KHVhKTtcbn1cbiIsIi8vIHNjcmVlbi53aWR0aCAvIHNjcmVlbi5oZWlnaHQgaXMgb2Z0ZW4gd3JvbmcgaW4gQW5kcm9pZFxuY29uc3QgaGVpZ2h0ID0gKCkgPT4gTWF0aC5tYXgod2luZG93Lm91dGVySGVpZ2h0LCB3aW5kb3cuc2NyZWVuLmhlaWdodCk7XG5jb25zdCB3aWR0aCA9ICgpID0+IE1hdGgubWF4KHdpbmRvdy5vdXRlcldpZHRoLCB3aW5kb3cuc2NyZWVuLndpZHRoKTtcbmNvbnN0IGRwciA9ICgpID0+IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDE7XG5jb25zdCByZXRpbmEgPSAoKSA9PiBkcHIoKSA+IDE7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICB3aWR0aCxcbiAgICBoZWlnaHQsXG4gICAgZHByLFxuICAgIHJldGluYVxufTtcbiIsImV4cG9ydCBkZWZhdWx0ICgpID0+ICEhd2luZG93LkRldmljZU9yaWVudGF0aW9uRXZlbnQ7XG4iLCJpbXBvcnQgd2ViZ2wgZnJvbSAnLi93ZWJnbCc7XG5pbXBvcnQgd2VibSBmcm9tICcuL3dlYm0nO1xuaW1wb3J0IG1wNCBmcm9tICcuL21wNCc7XG5pbXBvcnQgZGV2aWNlT3JpZW50YXRpb24gZnJvbSAnLi9kZXZpY2VPcmllbnRhdGlvbic7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICB3ZWJnbCxcbiAgICB3ZWJtLFxuICAgIG1wNCxcbiAgICBkZXZpY2VPcmllbnRhdGlvblxufTtcbiIsImNvbnN0IHZpZGVvRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xuZXhwb3J0IGRlZmF1bHQgKCkgPT4gISEodmlkZW9FbC5jYW5QbGF5VHlwZSAmJiB2aWRlb0VsLmNhblBsYXlUeXBlKCd2aWRlby9tcDQ7IGNvZGVjcz1cImF2YzEuNDJFMDFFLCBtcDRhLjQwLjJcIicpKTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdlYmdsKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJ3dlYmdsJykgfHwgY2FudmFzLmdldENvbnRleHQoJ2V4cGVyaW1lbnRhbC13ZWJnbCcpO1xuICAgICAgICByZXR1cm4gISEod2luZG93LldlYkdMUmVuZGVyaW5nQ29udGV4dCAmJiBjb250ZXh0KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG4iLCJjb25zdCB2aWRlb0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcbmV4cG9ydCBkZWZhdWx0ICgpID0+ICEhKHZpZGVvRWwuY2FuUGxheVR5cGUgJiYgdmlkZW9FbC5jYW5QbGF5VHlwZSgndmlkZW8vd2VibTsgY29kZWNzPVwidnA4LCB2b3JiaXNcIicpKTtcbiIsIi8qXG4gKiBjbGFzc0xpc3QgKHBhcnRpYWwgcG9seWZpbGwgZm9yIElFIDEwLCBJRSAxMSBhbmQgRmlyZWZveCA8MjQpXG4gKiBhZGFwdGVkIGZyb206IGh0dHBzOi8vZ2l0aHViLmNvbS9lbGlncmV5L2NsYXNzTGlzdC5qcy9ibG9iL21hc3Rlci9jbGFzc0xpc3QuanNcbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICBsZXQgdGVzdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdfJyk7XG5cbiAgICB0ZXN0RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdjMScsICdjMicpO1xuXG4gICAgLy8gUG9seWZpbGwgZm9yIElFIDEwLzExIGFuZCBGaXJlZm94IDwyNiwgd2hlcmUgY2xhc3NMaXN0LmFkZCBhbmRcbiAgICAvLyBjbGFzc0xpc3QucmVtb3ZlIGV4aXN0IGJ1dCBzdXBwb3J0IG9ubHkgb25lIGFyZ3VtZW50IGF0IGEgdGltZS5cbiAgICBpZiAoIXRlc3RFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnYzInKSkge1xuICAgICAgICBmdW5jdGlvbiBjcmVhdGVNZXRob2QobWV0aG9kKSB7XG4gICAgICAgICAgICBjb25zdCBvcmlnaW5hbCA9IHdpbmRvdy5ET01Ub2tlbkxpc3QucHJvdG90eXBlW21ldGhvZF07XG5cbiAgICAgICAgICAgIHdpbmRvdy5ET01Ub2tlbkxpc3QucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih0b2tlbikge1xuICAgICAgICAgICAgICAgIGxldCBpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsLmNhbGwodGhpcywgdG9rZW4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgY3JlYXRlTWV0aG9kKCdhZGQnKTtcbiAgICAgICAgY3JlYXRlTWV0aG9kKCdyZW1vdmUnKTtcbiAgICB9XG5cbiAgICB0ZXN0RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdjMycsIGZhbHNlKTtcblxuICAgIC8vIFBvbHlmaWxsIGZvciBJRSAxMCwgSUUgMTEgYW5kIEZpcmVmb3ggPDI0LCB3aGVyZSBjbGFzc0xpc3QudG9nZ2xlIGRvZXMgbm90XG4gICAgLy8gc3VwcG9ydCB0aGUgc2Vjb25kIGFyZ3VtZW50LlxuICAgIGlmICh0ZXN0RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2MzJykpIHtcbiAgICAgICAgY29uc3QgdG9nZ2xlID0gd2luZG93LkRPTVRva2VuTGlzdC5wcm90b3R5cGUudG9nZ2xlO1xuXG4gICAgICAgIHdpbmRvdy5ET01Ub2tlbkxpc3QucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uKHRva2VuLCBmb3JjZSkge1xuICAgICAgICAgICAgZm9yY2UgPSAhIWZvcmNlO1xuICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIHRoaXMuY29udGFpbnModG9rZW4pID09PSBmb3JjZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3JjZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRvZ2dsZS5jYWxsKHRoaXMsIHRva2VuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICB0ZXN0RWxlbWVudCA9IG51bGw7XG59KCkpO1xuIiwiKGZ1bmN0aW9uKGZuKSB7XG4gICAgd2luZG93LmNvbnNvbGUgPSB3aW5kb3cuY29uc29sZSB8fCB7fTtcbiAgICBjb25zdCBtZXRob2RzID0gW1xuICAgICAgICAnYXNzZXJ0JyxcbiAgICAgICAgJ2NsZWFyJyxcbiAgICAgICAgJ2NvdW50JyxcbiAgICAgICAgJ2RlYnVnJyxcbiAgICAgICAgJ2RpcicsXG4gICAgICAgICdkaXJ4bWwnLFxuICAgICAgICAnZXJyb3InLFxuICAgICAgICAnZ3JvdXAnLFxuICAgICAgICAnZ3JvdXBDb2xsYXBzZWQnLFxuICAgICAgICAnZ3JvdXBFbmQnLFxuICAgICAgICAnaW5mbycsXG4gICAgICAgICdsb2cnLFxuICAgICAgICAnbWFya1RpbWVsaW5lJyxcbiAgICAgICAgJ21lbW9yeScsXG4gICAgICAgICdwcm9maWxlJyxcbiAgICAgICAgJ3Byb2ZpbGVFbmQnLFxuICAgICAgICAndGFibGUnLFxuICAgICAgICAndGltZScsXG4gICAgICAgICd0aW1lRW5kJyxcbiAgICAgICAgJ3RpbWVTdGFtcCcsXG4gICAgICAgICd0aW1lbGluZScsXG4gICAgICAgICd0aW1lbGluZUVuZCcsXG4gICAgICAgICd0cmFjZScsXG4gICAgICAgICd3YXJuJ1xuICAgIF07XG4gICAgbWV0aG9kcy5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgICAgIHdpbmRvdy5jb25zb2xlW25hbWVdID0gd2luZG93LmNvbnNvbGVbbmFtZV0gfHwgZm47XG4gICAgfSk7XG59KGZ1bmN0aW9uKCkge30pKTtcbiIsImltcG9ydCAnLi9jbGFzc0xpc3QnO1xuaW1wb3J0ICcuL2NvbnNvbGUnO1xuaW1wb3J0ICcuL3JlcXVlc3RBbmltYXRpb25GcmFtZSc7XG4iLCIvKlxuICogcmVxdWVzdEFuaW1hdGlvbkZyYW1lIChpb3M2IGFuZCBhbmRyb2lkIDwgNC40KVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgICBpZiAoIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpIHtcbiAgICAgICAgY29uc3QgdmVuZG9ycyA9IFsnbXMnLCAnbW96JywgJ3dlYmtpdCcsICdvJ107XG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdmVuZG9ycy5sZW5ndGggJiYgIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7ICsreCkge1xuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvd1t2ZW5kb3JzW3hdICsgJ1JlcXVlc3RBbmltYXRpb25GcmFtZSddO1xuICAgICAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gd2luZG93W3ZlbmRvcnNbeF0gKyAnQ2FuY2VsQW5pbWF0aW9uRnJhbWUnXSB8fCB3aW5kb3dbdmVuZG9yc1t4XSArXG4gICAgICAgICAgICAgICAgJ0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSddO1xuICAgICAgICB9XG4gICAgfVxufSgpKTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBvcHVwKHVybCwgd2lkdGggPSA4MDAsIGhlaWdodCA9IDYwMCwgbmFtZSA9ICcnKSB7XG4gICAgY29uc3QgbGVmdCA9ICh3aW5kb3cuc2NyZWVuLndpZHRoIC0gd2lkdGgpIC8gMjtcbiAgICBjb25zdCB0b3AgPSAod2luZG93LnNjcmVlbi5oZWlnaHQgLSBoZWlnaHQpIC8gMjtcbiAgICAvLyBjb25zdCBsZWZ0ID0gKHdpbmRvdy5zY3JlZW4uYXZhaWxXaWR0aCAtIHdpZHRoKSAvIDI7XG4gICAgLy8gY29uc3QgdG9wID0gKHdpbmRvdy5zY3JlZW4uYXZhaWxIZWlnaHQgLSBoZWlnaHQpIC8gMjtcbiAgICBjb25zdCBkZWZhdWx0cyA9ICdkaXJlY3Rvcmllcz1ubyxsb2NhdGlvbj1ubyxtZW51YmFyPW5vLHJlc2l6YWJsZT1ubyxzY3JvbGxiYXJzPW5vLHN0YXR1cz1ubyx0b29sYmFyPW5vJztcbiAgICBjb25zdCBwYXJhbXMgPSBgd2lkdGg9JHt3aWR0aH0saGVpZ2h0PSR7aGVpZ2h0fSx0b3A9JHt0b3B9LGxlZnQ9JHtsZWZ0fSwke2RlZmF1bHRzfWA7XG4gICAgY29uc3Qgd2luID0gd2luZG93Lm9wZW4odXJsLCBuYW1lLCBwYXJhbXMpO1xuICAgIGlmICh3aW4gPT09IG51bGwgfHwgdHlwZW9mIHdpbiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAod2luZG93LmZvY3VzKSB7XG4gICAgICAgIHdpbi5mb2N1cygpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cbiIsIlxuY2xhc3MgTm9kZSB7XG4gICAgY29uc3RydWN0b3IoYm91bmRzLCBkZXB0aCwgbWF4RGVwdGgsIG1heENoaWxkcmVuKSB7XG4gICAgICAgIHRoaXMuX2JvdW5kcyA9IGJvdW5kcztcbiAgICAgICAgdGhpcy5fZGVwdGggPSBkZXB0aDtcbiAgICAgICAgdGhpcy5fbWF4RGVwdGggPSBtYXhEZXB0aDtcbiAgICAgICAgdGhpcy5fbWF4Q2hpbGRyZW4gPSBtYXhDaGlsZHJlbjtcblxuICAgICAgICB0aGlzLmNoaWxkcmVuID0gW107XG4gICAgICAgIHRoaXMubm9kZXMgPSBbXTtcbiAgICB9XG5cbiAgICBpbnNlcnQoaXRlbSkge1xuICAgICAgICBpZiAodGhpcy5ub2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fZmluZEluZGV4KGl0ZW0pO1xuICAgICAgICAgICAgdGhpcy5ub2Rlc1tpbmRleF0uaW5zZXJ0KGl0ZW0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jaGlsZHJlbi5wdXNoKGl0ZW0pO1xuXG4gICAgICAgIGlmICghKHRoaXMuX2RlcHRoID49IHRoaXMuX21heERlcHRoKSAmJiB0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IHRoaXMuX21heENoaWxkcmVuKSB7XG5cbiAgICAgICAgICAgIHRoaXMuc3ViZGl2aWRlKCk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5zZXJ0KHRoaXMuY2hpbGRyZW5baV0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLmxlbmd0aCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXRyaWV2ZShpdGVtKSB7XG4gICAgICAgIGlmICh0aGlzLm5vZGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9maW5kSW5kZXgoaXRlbSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ub2Rlc1tpbmRleF0ucmV0cmlldmUoaXRlbSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbjtcbiAgICB9XG5cbiAgICBfZmluZEluZGV4KGl0ZW0pIHtcbiAgICAgICAgY29uc3Qge3gsIHksIHdpZHRoLCBoZWlnaHR9ID0gdGhpcy5fYm91bmRzO1xuXG4gICAgICAgIGNvbnN0IHJpZ2h0ID0gaXRlbS54ID4geCArIHdpZHRoIC8gMjtcbiAgICAgICAgY29uc3QgYm90dG9tID0gaXRlbS55ID4geSArIGhlaWdodCAvIDI7XG5cbiAgICAgICAgbGV0IGluZGV4O1xuXG4gICAgICAgIGlmIChyaWdodCkge1xuICAgICAgICAgICAgaW5kZXggPSBib3R0b20gPyBOb2RlLkJSIDogTm9kZS5UUjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGluZGV4ID0gYm90dG9tID8gTm9kZS5CTCA6IE5vZGUuVEw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuXG4gICAgc3ViZGl2aWRlKCkge1xuICAgICAgICBjb25zdCBkZXB0aCA9IHRoaXMuX2RlcHRoICsgMTtcblxuICAgICAgICBjb25zdCB7eCwgeSwgd2lkdGgsIGhlaWdodH0gPSB0aGlzLl9ib3VuZHM7XG4gICAgICAgIGNvbnN0IHcgPSB3aWR0aCAvIDI7XG4gICAgICAgIGNvbnN0IGggPSBoZWlnaHQgLyAyO1xuXG4gICAgICAgIHRoaXMubm9kZXNbTm9kZS5UTF0gPSBuZXcgTm9kZSh7XG4gICAgICAgICAgICB4LFxuICAgICAgICAgICAgeSxcbiAgICAgICAgICAgIHdpZHRoOiB3LFxuICAgICAgICAgICAgaGVpZ2h0OiBoXG4gICAgICAgIH0sXG4gICAgICAgIGRlcHRoLCB0aGlzLl9tYXhEZXB0aCwgdGhpcy5fbWF4Q2hpbGRyZW4pO1xuXG4gICAgICAgIHRoaXMubm9kZXNbTm9kZS5UUl0gPSBuZXcgTm9kZSh7XG4gICAgICAgICAgICB4OiB4ICsgdyxcbiAgICAgICAgICAgIHksXG4gICAgICAgICAgICB3aWR0aDogdyxcbiAgICAgICAgICAgIGhlaWdodDogaFxuICAgICAgICB9LFxuICAgICAgICBkZXB0aCwgdGhpcy5fbWF4RGVwdGgsIHRoaXMuX21heENoaWxkcmVuKTtcblxuICAgICAgICB0aGlzLm5vZGVzW05vZGUuQkxdID0gbmV3IE5vZGUoe1xuICAgICAgICAgICAgeCxcbiAgICAgICAgICAgIHk6IHkgKyBoLFxuICAgICAgICAgICAgd2lkdGg6IHcsXG4gICAgICAgICAgICBoZWlnaHQ6IGhcbiAgICAgICAgfSxcbiAgICAgICAgZGVwdGgsIHRoaXMuX21heERlcHRoLCB0aGlzLl9tYXhDaGlsZHJlbik7XG5cbiAgICAgICAgdGhpcy5ub2Rlc1tOb2RlLkJSXSA9IG5ldyBOb2RlKHtcbiAgICAgICAgICAgIHg6IHggKyB3LFxuICAgICAgICAgICAgeTogeSArIGgsXG4gICAgICAgICAgICB3aWR0aDogdyxcbiAgICAgICAgICAgIGhlaWdodDogaFxuICAgICAgICB9LFxuICAgICAgICBkZXB0aCwgdGhpcy5fbWF4RGVwdGgsIHRoaXMuX21heENoaWxkcmVuKTtcbiAgICB9XG5cbiAgICBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5sZW5ndGggPSAwO1xuXG4gICAgICAgIHdoaWxlICh0aGlzLm5vZGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5ub2Rlcy5wb3AoKS5jbGVhcigpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5Ob2RlLlRMID0gMDtcbk5vZGUuVFIgPSAxO1xuTm9kZS5CTCA9IDI7XG5Ob2RlLkJSID0gMztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUXVhZFRyZWUge1xuICAgIGNvbnN0cnVjdG9yKGJvdW5kcywgbWF4RGVwdGggPSAtMSwgbWF4Q2hpbGRyZW4gPSAtMSkge1xuICAgICAgICB0aGlzLnJvb3QgPSBuZXcgTm9kZShib3VuZHMsIDAsIG1heERlcHRoLCBtYXhDaGlsZHJlbik7XG4gICAgfVxuXG4gICAgaW5zZXJ0KGl0ZW0pIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbSkpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMucm9vdC5pbnNlcnQoaXRlbVtpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJvb3QuaW5zZXJ0KGl0ZW0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMucm9vdC5jbGVhcigpO1xuICAgIH1cblxuICAgIHJldHJpZXZlKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucm9vdC5yZXRyaWV2ZShpdGVtKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgcG9wdXAgZnJvbSAnLi4vcG9wdXAnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlbWFpbCh1cmwsIHN1YmplY3QgPSAnJywgYm9keSA9ICcnKSB7XG4gICAgdXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KHVybCk7XG4gICAgc3ViamVjdCA9IGVuY29kZVVSSUNvbXBvbmVudChzdWJqZWN0KTtcblxuICAgIGNvbnN0IG5ld2xpbmVzID0gZW5jb2RlVVJJQ29tcG9uZW50KCdcXHJcXG5cXHJcXG4nKTtcbiAgICBib2R5ID0gYm9keSA/IGAke2VuY29kZVVSSUNvbXBvbmVudChib2R5KX0ke25ld2xpbmVzfWAgOiAnJztcblxuICAgIHJldHVybiBwb3B1cChgbWFpbHRvOj9zdWJqZWN0PSR7c3ViamVjdH0mYm9keT0ke2JvZHl9JHt1cmx9YCk7XG59XG4iLCJpbXBvcnQgcG9wdXAgZnJvbSAnLi4vcG9wdXAnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmYWNlYm9vayh1cmwpIHtcbiAgICB1cmwgPSBlbmNvZGVVUklDb21wb25lbnQodXJsKTtcbiAgICByZXR1cm4gcG9wdXAoYGh0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS9zaGFyZXIvc2hhcmVyLnBocD91PSR7dXJsfWApO1xufVxuIiwiaW1wb3J0IHBvcHVwIGZyb20gJy4uL3BvcHVwJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZmFjZWJvb2tGZWVkRGlhbG9nKGFwcElkLCByZWRpcmVjdCwgdXJsLCB0aXRsZSA9ICcnLCBpbWFnZSA9ICcnLCBjYXB0aW9uID0gJycsIGRlc2MgPSAnJywgc291cmNlID0gJycpIHtcbiAgICB0aXRsZSA9IGVuY29kZVVSSUNvbXBvbmVudCh0aXRsZSk7XG4gICAgY2FwdGlvbiA9IGVuY29kZVVSSUNvbXBvbmVudChjYXB0aW9uKTtcbiAgICBkZXNjID0gZW5jb2RlVVJJQ29tcG9uZW50KGRlc2MpO1xuXG4gICAgY29uc3QgcGFyYW1zID0gYD9kaXNwbGF5PXBvcHVwJnNob3dfZXJyb3I9dHJ1ZSZhcHBfaWQ9JHthcHBJZH0mc291cmNlPSR7c291cmNlfSZyZWRpcmVjdF91cmk9JHtyZWRpcmVjdH1gO1xuICAgIGNvbnN0IGNvbnRlbnQgPSBgbmFtZT0ke3RpdGxlfSZsaW5rPSR7dXJsfSZjYXB0aW9uPSR7Y2FwdGlvbn0mZGVzY3JpcHRpb249JHtkZXNjfSZwaWN0dXJlPSR7aW1hZ2V9YDtcblxuICAgIHJldHVybiBwb3B1cChgaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL2RpYWxvZy9mZWVkPyR7cGFyYW1zfSYke2NvbnRlbnR9YCk7XG59XG4iLCJpbXBvcnQgcG9wdXAgZnJvbSAnLi4vcG9wdXAnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnb29nbGVwbHVzKHVybCkge1xuICAgIHVybCA9IGVuY29kZVVSSUNvbXBvbmVudCh1cmwpO1xuICAgIHJldHVybiBwb3B1cChgaHR0cHM6Ly9wbHVzLmdvb2dsZS5jb20vc2hhcmU/dXJsPSR7dXJsfWApO1xufVxuIiwiaW1wb3J0IGVtYWlsIGZyb20gJy4vZW1haWwnO1xuaW1wb3J0IGZhY2Vib29rIGZyb20gJy4vZmFjZWJvb2snO1xuaW1wb3J0IGZhY2Vib29rRmVlZERpYWxvZyBmcm9tICcuL2ZhY2Vib29rRmVlZERpYWxvZyc7XG5pbXBvcnQgZ29vZ2xlcGx1cyBmcm9tICcuL2dvb2dsZXBsdXMnO1xuaW1wb3J0IGxpbmtlZGluIGZyb20gJy4vbGlua2VkaW4nO1xuaW1wb3J0IHBpbnRlcmVzdCBmcm9tICcuL3BpbnRlcmVzdCc7XG5pbXBvcnQgcmVkZGl0IGZyb20gJy4vcmVkZGl0JztcbmltcG9ydCByZW5yZW4gZnJvbSAnLi9yZW5yZW4nO1xuaW1wb3J0IHNtcyBmcm9tICcuL3Ntcyc7XG5pbXBvcnQgdHdpdHRlciBmcm9tICcuL3R3aXR0ZXInO1xuaW1wb3J0IHZrb250YWt0ZSBmcm9tICcuL3Zrb250YWt0ZSc7XG5pbXBvcnQgd2VpYm8gZnJvbSAnLi93ZWlibyc7XG5pbXBvcnQgd2hhdHNhcHAgZnJvbSAnLi93aGF0c2FwcCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBlbWFpbCxcbiAgICBmYWNlYm9vayxcbiAgICBmYWNlYm9va0ZlZWREaWFsb2csXG4gICAgZ29vZ2xlcGx1cyxcbiAgICBsaW5rZWRpbixcbiAgICBwaW50ZXJlc3QsXG4gICAgcmVkZGl0LFxuICAgIHJlbnJlbixcbiAgICBzbXMsXG4gICAgdHdpdHRlcixcbiAgICB2a29udGFrdGUsXG4gICAgd2VpYm8sXG4gICAgd2hhdHNhcHBcbn07XG4iLCJpbXBvcnQgcG9wdXAgZnJvbSAnLi4vcG9wdXAnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsaW5rZWRpbih1cmwsIHRpdGxlID0gJycpIHtcbiAgICB1cmwgPSBlbmNvZGVVUklDb21wb25lbnQodXJsKTtcbiAgICB0aXRsZSA9IGVuY29kZVVSSUNvbXBvbmVudCh0aXRsZSk7XG4gICAgcmV0dXJuIHBvcHVwKGBodHRwczovL3d3dy5saW5rZWRpbi5jb20vc2hhcmVBcnRpY2xlP21pbmk9dHJ1ZSZ1cmw9JHt1cmx9JnRpdGxlPSR7dGl0bGV9YCk7XG59XG4iLCJpbXBvcnQgcG9wdXAgZnJvbSAnLi4vcG9wdXAnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwaW50ZXJlc3QodXJsLCBtZWRpYSwgZGVzYyA9ICcnKSB7XG4gICAgdXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KHVybCk7XG4gICAgbWVkaWEgPSBlbmNvZGVVUklDb21wb25lbnQobWVkaWEpO1xuICAgIGRlc2MgPSBlbmNvZGVVUklDb21wb25lbnQoZGVzYyk7XG4gICAgcmV0dXJuIHBvcHVwKGBodHRwczovL3BpbnRlcmVzdC5jb20vcGluL2NyZWF0ZS9idXR0b24vP3VybD0ke3VybH0mbWVkaWE9JHttZWRpYX0mZGVzY3JpcHRpb249JHtkZXNjfWApO1xufVxuIiwiaW1wb3J0IHBvcHVwIGZyb20gJy4uL3BvcHVwJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVkZGl0KHVybCwgdGl0bGUgPSAnJykge1xuICAgIHVybCA9IGVuY29kZVVSSUNvbXBvbmVudCh1cmwpO1xuICAgIHRpdGxlID0gZW5jb2RlVVJJQ29tcG9uZW50KHRpdGxlKTtcbiAgICByZXR1cm4gcG9wdXAoYGh0dHBzOi8vd3d3LnJlZGRpdC5jb20vc3VibWl0P3VybD0ke3VybH0mdGl0bGU9JHt0aXRsZX1gKTtcbn1cbiIsImltcG9ydCBwb3B1cCBmcm9tICcuLi9wb3B1cCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHZrb250YWt0ZSh1cmwsIHRpdGxlID0gJycpIHtcbiAgICB1cmwgPSBlbmNvZGVVUklDb21wb25lbnQodXJsKTtcbiAgICB0aXRsZSA9IGVuY29kZVVSSUNvbXBvbmVudCh0aXRsZSk7XG4gICAgcmV0dXJuIHBvcHVwKGBodHRwOi8vc2hhcmUucmVucmVuLmNvbS9zaGFyZS9idXR0b25zaGFyZS5kbz9saW5rPSR7dXJsfSZ0aXRsZT0ke3RpdGxlfWApO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc21zKHVybCwgYm9keSA9ICcnKSB7XG4gICAgdXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KHVybCk7XG5cbiAgICBjb25zdCBuZXdsaW5lcyA9IGVuY29kZVVSSUNvbXBvbmVudCgnXFxyXFxuXFxyXFxuJyk7XG4gICAgYm9keSA9IGJvZHkgPyBgJHtlbmNvZGVVUklDb21wb25lbnQoYm9keSl9JHtuZXdsaW5lc31gIDogJyc7XG5cbiAgICBjb25zdCBpb3MgPSAvaVBbYW9dZHxpUGhvbmUvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgIGNvbnN0IGRlbGltID0gaW9zID8gJyYnIDogJz8nO1xuXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgc21zOiR7ZGVsaW19Ym9keT0ke2JvZHl9JHt1cmx9YDtcbn1cbiIsImltcG9ydCBwb3B1cCBmcm9tICcuLi9wb3B1cCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHR3aXR0ZXIodXJsLCB0ZXh0ID0gJycsIGhhc2h0YWdzID0gJycsIHJlbGF0ZWQgPSAnJykge1xuICAgIHVybCA9IGVuY29kZVVSSUNvbXBvbmVudCh1cmwpO1xuICAgIHRleHQgPSBlbmNvZGVVUklDb21wb25lbnQodGV4dCk7XG4gICAgaGFzaHRhZ3MgPSBlbmNvZGVVUklDb21wb25lbnQoaGFzaHRhZ3MpO1xuICAgIHJlbGF0ZWQgPSBlbmNvZGVVUklDb21wb25lbnQocmVsYXRlZCk7XG5cbiAgICByZXR1cm4gcG9wdXAoYGh0dHBzOi8vdHdpdHRlci5jb20vaW50ZW50L3R3ZWV0P3VybD0ke3VybH0mdGV4dD0ke3RleHR9Jmhhc2h0YWdzPSR7aGFzaHRhZ3N9JnJlbGF0ZWQ9JHtyZWxhdGVkfWApO1xufVxuIiwiaW1wb3J0IHBvcHVwIGZyb20gJy4uL3BvcHVwJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdmtvbnRha3RlKHVybCwgdGl0bGUgPSAnJywgZGVzY3JpcHRpb24gPSAnJywgaW1hZ2UgPSAnJykge1xuICAgIHVybCA9IGVuY29kZVVSSUNvbXBvbmVudCh1cmwpO1xuICAgIHRpdGxlID0gZW5jb2RlVVJJQ29tcG9uZW50KHRpdGxlKTtcbiAgICBkZXNjcmlwdGlvbiA9IGVuY29kZVVSSUNvbXBvbmVudChkZXNjcmlwdGlvbik7XG4gICAgaW1hZ2UgPSBlbmNvZGVVUklDb21wb25lbnQoaW1hZ2UpO1xuICAgIHJldHVybiBwb3B1cChgaHR0cDovL3Zrb250YWt0ZS5ydS9zaGFyZS5waHA/dXJsPSR7dXJsfSZ0aXRsZT0ke3RpdGxlfSZkZXNjcmlwdGlvbj0ke2Rlc2NyaXB0aW9ufSZpbWFnZT0ke2ltYWdlfWApO1xufVxuIiwiaW1wb3J0IHBvcHVwIGZyb20gJy4uL3BvcHVwJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gd2VpYm8odXJsLCB0aXRsZSA9ICcnLCBpbWFnZSA9ICcnKSB7XG4gICAgdXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KHVybCk7XG4gICAgdGl0bGUgPSBlbmNvZGVVUklDb21wb25lbnQodGl0bGUpO1xuICAgIGltYWdlID0gZW5jb2RlVVJJQ29tcG9uZW50KGltYWdlKTtcblxuICAgIGNvbnN0IHBhcmFtcyA9IGB1cmw9JHt1cmx9JmFwcGtleT0mdGl0bGU9JHt0aXRsZX0mcGljPSR7aW1hZ2V9JnJhbGF0ZVVpZD0mbGFuZ3VhZ2U9emhfY25gO1xuICAgIHJldHVybiBwb3B1cChgaHR0cDovL3NlcnZpY2Uud2VpYm8uY29tL3NoYXJlL3NoYXJlLnBocD8ke3BhcmFtc31gKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdoYXRzYXBwKHVybCwgYm9keSA9ICcnKSB7XG4gICAgdXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KHVybCk7XG5cbiAgICBjb25zdCBuZXdsaW5lcyA9IGVuY29kZVVSSUNvbXBvbmVudCgnXFxyXFxuXFxyXFxuJyk7XG4gICAgYm9keSA9IGJvZHkgPyBgJHtlbmNvZGVVUklDb21wb25lbnQoYm9keSl9JHtuZXdsaW5lc31gIDogJyc7XG5cbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGB3aGF0c2FwcDovL3NlbmQ/dGV4dD0ke2JvZHl9JHt1cmx9YDtcbn1cbiIsImZ1bmN0aW9uIGxvYWQoa2V5KSB7XG4gICAgbGV0IGl0ZW0gPSBudWxsO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgaXRlbSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7fVxuXG4gICAgcmV0dXJuIGl0ZW07XG59XG5cbmZ1bmN0aW9uIHNhdmUoa2V5LCBpdGVtKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBpdGVtKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0NvdWxkblxcJ3Qgc2F2ZSBpbiBsb2NhbFN0b3JhZ2UnKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBsb2FkSlNPTihrZXkpIHtcbiAgICBjb25zdCBpdGVtID0gbG9hZChrZXkpO1xuICAgIHJldHVybiBpdGVtID8gSlNPTi5wYXJzZShpdGVtKSA6IG51bGw7XG59XG5cbmZ1bmN0aW9uIHNhdmVKU09OKGtleSwgaXRlbSkge1xuICAgIHJldHVybiBzYXZlKGtleSwgSlNPTi5zdHJpbmdpZnkoaXRlbSkpO1xufVxuXG5mdW5jdGlvbiByZW1vdmUoa2V5KSB7XG4gICAgdHJ5IHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcbiAgICB9IGNhdGNoIChlcnIpIHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtsb2FkLCBzYXZlLCBsb2FkSlNPTiwgc2F2ZUpTT04sIHJlbW92ZX07XG4iLCIvLyBldmVyeXRoaW5nIGFmdGVyIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIHN1YnN0ciBpbiBzdHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFmdGVyRmlyc3Qoc3RyLCBzdWJzdHIpIHtcbiAgICBsZXQgaW5kZXggPSBzdHIuaW5kZXhPZihzdWJzdHIpO1xuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBpbmRleCArPSBzdWJzdHIubGVuZ3RoO1xuICAgIHJldHVybiBzdHIuc2xpY2UoaW5kZXgpO1xufVxuIiwiLy8gZXZlcnl0aGluZyBhZnRlciB0aGUgbGFzdCBvY2N1cmVuY2Ugb2Ygc3Vic3RyIGluIHN0clxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWZ0ZXJMYXN0KHN0ciwgc3Vic3RyKSB7XG4gICAgbGV0IGluZGV4ID0gc3RyLmxhc3RJbmRleE9mKHN1YnN0cik7XG4gICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGluZGV4ICs9IHN1YnN0ci5sZW5ndGg7XG4gICAgcmV0dXJuIHN0ci5zbGljZShpbmRleCk7XG59XG4iLCIvLyBldmVyeXRoaW5nIGJlZm9yZSB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiBzdWJzdHIgaW4gc3RyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBiZWZvcmVGaXJzdChzdHIsIHN1YnN0cikge1xuICAgIGNvbnN0IGluZGV4ID0gc3RyLmluZGV4T2Yoc3Vic3RyKTtcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgcmV0dXJuIHN0ci5zbGljZSgwLCBpbmRleCk7XG59XG4iLCIvLyBldmVyeXRoaW5nIGJlZm9yZSB0aGUgbGFzdCBvY2N1cnJlbmNlIG9mIHN1YnN0ciBpbiB0aGUgc3RyaW5nLlxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmVmb3JlTGFzdChzdHIsIHN1YnN0cikge1xuICAgIGNvbnN0IGluZGV4ID0gc3RyLmxhc3RJbmRleE9mKHN1YnN0cik7XG4gICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHJldHVybiBzdHIuc2xpY2UoMCwgaW5kZXgpO1xufVxuIiwiLy8gd2hldGhlciBzdHIgYmVnaW5zIHdpdGggc3Vic3RyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBiZWdpbnNXaXRoKHN0ciwgc3Vic3RyKSB7XG4gICAgcmV0dXJuIHN0ci5pbmRleE9mKHN1YnN0cikgPT09IDA7XG59XG4iLCIvLyBldmVyeXRoaW5nIGFmdGVyIHRoZSBmaXJzdCBvY2N1cmFuY2Ugb2Ygc3RhcnQgYW5kIGJlZm9yZSB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiBlbmRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJldHdlZW4oc3RyLCBzdGFydCwgZW5kKSB7XG4gICAgbGV0IHN1YnN0ciA9ICcnO1xuICAgIGxldCBzdGFydEluZGV4ID0gc3RyLmluZGV4T2Yoc3RhcnQpO1xuICAgIGlmIChzdGFydEluZGV4ICE9PSAtMSkge1xuICAgICAgICBzdGFydEluZGV4ICs9IHN0YXJ0Lmxlbmd0aDtcbiAgICAgICAgY29uc3QgZW5kSW5kZXggPSBzdHIuaW5kZXhPZihlbmQsIHN0YXJ0SW5kZXgpO1xuICAgICAgICBpZiAoZW5kSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICBzdWJzdHIgPSBzdHIuc2xpY2Uoc3RhcnRJbmRleCwgZW5kSW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzdWJzdHI7XG59XG4iLCJpbXBvcnQgZXNjYXBlUGF0dGVybiBmcm9tICcuL2VzY2FwZVBhdHRlcm4nO1xuaW1wb3J0IHRydW5jYXRlIGZyb20gJy4vdHJ1bmNhdGUnO1xuLy8gVXRpbGl0eSBtZXRob2QgdGhhdCBpbnRlbGxpZ2VudGx5IGJyZWFrcyB1cCB5b3VyIHN0cmluZyxcbi8vIGFsbG93aW5nIHlvdSB0byBjcmVhdGUgYmxvY2tzIG9mIHJlYWRhYmxlIHRleHQuXG4vLyBUaGlzIG1ldGhvZCByZXR1cm5zIHlvdSB0aGUgY2xvc2VzdCBwb3NzaWJsZSBtYXRjaCB0byB0aGUgZGVsaW0gcGFyYW1hdGVyLFxuLy8gd2hpbGUga2VlcGluZyB0aGUgdGV4dCBsZW5ndGggd2l0aGluIHRoZSBsZW4gcGFyYW10ZXIuXG4vLyBJZiBhIG1hdGNoIGNhbid0IGJlIGZvdW5kIGluIHlvdXIgc3BlY2lmaWVkIGxlbmd0aCBhbiAgJy4uLicgaXMgYWRkZWQgdG8gdGhhdCBibG9jayxcbi8vIGFuZCB0aGUgYmxvY2tpbmcgY29udGludWVzIHVudGlsbCBhbGwgdGhlIHRleHQgaXMgYnJva2VuIGFwYXJ0LlxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmxvY2soc3RyLCBsZW4sIGRlbGltID0gJy4nKSB7XG4gICAgY29uc3QgYXJyID0gW107XG5cbiAgICBpZiAoIXN0ciB8fCAhc3RyLmluY2x1ZGVzKGRlbGltKSkge1xuICAgICAgICByZXR1cm4gYXJyO1xuICAgIH1cblxuICAgIGlmIChkZWxpbSA9PT0gJyAnKSB7XG4gICAgICAgIHN0ciArPSBkZWxpbTtcbiAgICB9XG5cbiAgICBsZXQgY2hySW5kZXggPSAwO1xuICAgIGNvbnN0IHJlcGxQYXR0ID0gbmV3IFJlZ0V4cCgnW14nICsgZXNjYXBlUGF0dGVybihkZWxpbSkgKyAnXSskJyk7XG5cbiAgICB3aGlsZSAoY2hySW5kZXggPCBzdHIubGVuZ3RoKSB7XG4gICAgICAgIGxldCBzdWJTdHJpbmcgPSBzdHIuc3Vic3RyKGNockluZGV4LCBsZW4pO1xuICAgICAgICBpZiAoIXN1YlN0cmluZy5pbmNsdWRlcyhkZWxpbSkpIHtcbiAgICAgICAgICAgIGFyci5wdXNoKHRydW5jYXRlKHN1YlN0cmluZywgc3ViU3RyaW5nLmxlbmd0aCkpO1xuICAgICAgICAgICAgY2hySW5kZXggKz0gc3ViU3RyaW5nLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICBzdWJTdHJpbmcgPSBzdWJTdHJpbmcucmVwbGFjZShyZXBsUGF0dCwgJycpO1xuICAgICAgICBjaHJJbmRleCArPSBzdWJTdHJpbmcubGVuZ3RoO1xuICAgICAgICBhcnIucHVzaChzdWJTdHJpbmcudHJpbSgpKTtcbiAgICB9XG4gICAgcmV0dXJuIGFycjtcbn1cbiIsIi8vIENhcGl0YWxpemUgdGhlIGZpcnN0IHdvcmQgaW4gYSBzdHJpbmcgb3IgYWxsIHdvcmRzXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjYXBpdGFsaXplKHN0ciwgYWxsID0gZmFsc2UpIHtcbiAgICBjb25zdCBzdWJzdHIgPSBzdHIudHJpbUxlZnQoKTtcbiAgICBjb25zdCByZSA9IGFsbCA/IC9eLnxcXGIuL2cgOiAvKF5cXHcpLztcbiAgICByZXR1cm4gc3Vic3RyLnJlcGxhY2UocmUsIChtYXRjaCkgPT4gbWF0Y2gudG9VcHBlckNhc2UoKSk7XG59XG4iLCJpbXBvcnQgZXNjYXBlUGF0dGVybiBmcm9tICcuL2VzY2FwZVBhdHRlcm4nO1xuXG4vLyB0aGUgbnVtYmVyIG9mIHRpbWVzIHN1YnN0ciBhcHBlYXJzIHdpdGhpbiBzdHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvdW50T2Yoc3RyLCBzdWJzdHIsIGNhc2VTZW5zaXRpdmUpIHtcbiAgICBjb25zdCBlc2NhcGVkU3RyID0gZXNjYXBlUGF0dGVybihzdWJzdHIpO1xuICAgIGNvbnN0IGZsYWdzID0gKCFjYXNlU2Vuc2l0aXZlKSA/ICdpZycgOiAnZyc7XG4gICAgcmV0dXJuIHN0ci5tYXRjaChuZXcgUmVnRXhwKGVzY2FwZWRTdHIsIGZsYWdzKSkubGVuZ3RoO1xufVxuIiwiLy8gTGV2ZW5zaHRlaW4gZGlzdGFuY2UgKGVkaXREaXN0YW5jZSkgaXMgYSBtZWFzdXJlIG9mIHRoZSBzaW1pbGFyaXR5IGJldHdlZW5cbi8vIHR3byBzdHJpbmdzLiBUaGUgZGlzdGFuY2UgaXMgdGhlIG51bWJlciBvZiBkZWxldGlvbnMsIGluc2VydGlvbnMsIG9yXG4vLyBzdWJzdGl0dXRpb25zIHJlcXVpcmVkIHRvIHRyYW5zZm9ybSBzb3VyY2UgaW50byB0YXJnZXQuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlZGl0RGlzdGFuY2Uoc291cmNlID0gJycsIHRhcmdldCA9ICcnKSB7XG5cbiAgICBpZiAoc291cmNlID09PSB0YXJnZXQpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgaWYgKCFzb3VyY2UubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiB0YXJnZXQubGVuZ3RoO1xuICAgIH1cblxuICAgIGlmICghdGFyZ2V0Lmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gc291cmNlLmxlbmd0aDtcbiAgICB9XG5cbiAgICBjb25zdCBkID0gW107XG4gICAgbGV0IGksIGosIGNvc3Q7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDw9IHNvdXJjZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBkW2ldID0gW107XG4gICAgfVxuICAgIGZvciAoaSA9IDA7IGkgPD0gc291cmNlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGRbaV1bMF0gPSBpO1xuICAgIH1cbiAgICBmb3IgKGogPSAwOyBqIDw9IHRhcmdldC5sZW5ndGg7IGorKykge1xuICAgICAgICBkWzBdW2pdID0gajtcbiAgICB9XG5cbiAgICBmb3IgKGkgPSAxOyBpIDw9IHNvdXJjZS5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgIGNvbnN0IHNpID0gc291cmNlLmNoYXJBdChpIC0gMSk7XG4gICAgICAgIGZvciAoaiA9IDE7IGogPD0gdGFyZ2V0Lmxlbmd0aDsgaisrKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHRqID0gdGFyZ2V0LmNoYXJBdChqIC0gMSk7XG5cbiAgICAgICAgICAgIGlmIChzaSA9PT0gdGopIHtcbiAgICAgICAgICAgICAgICBjb3N0ID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29zdCA9IDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRbaV1bal0gPSBNYXRoLm1pbihkW2kgLSAxXVtqXSArIDEsIGRbaV1baiAtIDFdICsgMSwgZFtpIC0gMV1baiAtIDFdICsgY29zdCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZFtzb3VyY2UubGVuZ3RoXVt0YXJnZXQubGVuZ3RoXTtcbn1cbiIsIi8vIHdoZXRoZXIgc3RyIGVuZHMgd2l0aCBzdWJzdHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGVuZHNXaXRoKHN0ciwgc3Vic3RyKSB7XG4gICAgcmV0dXJuIHN0ci5sYXN0SW5kZXhPZihzdWJzdHIpID09PSBzdHIubGVuZ3RoIC0gc3Vic3RyLmxlbmd0aDtcbn1cbiIsIi8vIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGVzY2FwZUh0bWwoc3RyKSB7XG4vLyAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4vLyAgICAgZGl2LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHN0cikpO1xuLy8gICAgIHJldHVybiBkaXYuaW5uZXJIVE1MO1xuLy8gfVxuXG5jb25zdCBlbnRpdHlNYXAgPSB7XG4gICAgJyYnOiAnJmFtcDsnLFxuICAgICc8JzogJyZsdDsnLFxuICAgICc+JzogJyZndDsnLFxuICAgICdcIic6ICcmcXVvdDsnLFxuICAgICdcXCcnOiAnJiMzOTsnLFxuICAgICcvJzogJyYjeDJGOycsXG4gICAgJ2AnOiAnJiN4NjA7JyxcbiAgICAnPSc6ICcmI3gzRDsnXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlc2NhcGVIdG1sKHN0cmluZykge1xuICAgIHJldHVybiBTdHJpbmcoc3RyaW5nKVxuICAgICAgICAucmVwbGFjZSgvWyY8PlwiJ2A9XFwvXS9nLCBmdW5jdGlvbiBmcm9tRW50aXR5TWFwKHMpIHtcbiAgICAgICAgICAgIHJldHVybiBlbnRpdHlNYXBbc107XG4gICAgICAgIH0pO1xufVxuIiwiLy8gcmVnZXggZXNjYXBlIHBhdHRlcm5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGVzY2FwZVBhdHRlcm4ocGF0dGVybikge1xuICAgIHJldHVybiBwYXR0ZXJuLnJlcGxhY2UoLyhcXF18XFxbfFxce3xcXH18XFwofFxcKXxcXCp8XFwrfFxcP3xcXC58XFxcXCkvZywgJ1xcXFwkMScpO1xufVxuIiwiaW1wb3J0IHJlbW92ZUV4dHJhV2hpdGVzcGFjZSBmcm9tICcuL3JlbW92ZUV4dHJhV2hpdGVzcGFjZSc7XG5cbi8vIHdoZXRoZXIgc3RyIGNvbnRhaW5zIGFueSB0ZXh0XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBoYXNUZXh0KHN0cikge1xuICAgIHJldHVybiAhIXJlbW92ZUV4dHJhV2hpdGVzcGFjZShzdHIpLmxlbmd0aDtcbn1cbiIsImltcG9ydCBhZnRlckZpcnN0IGZyb20gJy4vYWZ0ZXJGaXJzdCc7XG5pbXBvcnQgYWZ0ZXJMYXN0IGZyb20gJy4vYWZ0ZXJMYXN0JztcbmltcG9ydCBiZWZvcmVGaXJzdCBmcm9tICcuL2JlZm9yZUZpcnN0JztcbmltcG9ydCBiZWZvcmVMYXN0IGZyb20gJy4vYmVmb3JlTGFzdCc7XG5pbXBvcnQgYmVnaW5zV2l0aCBmcm9tICcuL2JlZ2luc1dpdGgnO1xuaW1wb3J0IGJldHdlZW4gZnJvbSAnLi9iZXR3ZWVuJztcbmltcG9ydCBibG9jayBmcm9tICcuL2Jsb2NrJztcbmltcG9ydCBjYXBpdGFsaXplIGZyb20gJy4vY2FwaXRhbGl6ZSc7XG5pbXBvcnQgY291bnRPZiBmcm9tICcuL2NvdW50T2YnO1xuaW1wb3J0IGVkaXREaXN0YW5jZSBmcm9tICcuL2VkaXREaXN0YW5jZSc7XG5pbXBvcnQgZW5kc1dpdGggZnJvbSAnLi9lbmRzV2l0aCc7XG5pbXBvcnQgZXNjYXBlSFRNTCBmcm9tICcuL2VzY2FwZUhUTUwnO1xuaW1wb3J0IGVzY2FwZVBhdHRlcm4gZnJvbSAnLi9lc2NhcGVQYXR0ZXJuJztcbmltcG9ydCBoYXNUZXh0IGZyb20gJy4vaGFzVGV4dCc7XG5pbXBvcnQgaXNOdW1lcmljIGZyb20gJy4vaXNOdW1lcmljJztcbmltcG9ydCBwYWRMZWZ0IGZyb20gJy4vcGFkTGVmdCc7XG5pbXBvcnQgcGFkUmlnaHQgZnJvbSAnLi9wYWRSaWdodCc7XG5pbXBvcnQgcHJldmVudFdpZG93IGZyb20gJy4vcHJldmVudFdpZG93JztcbmltcG9ydCBwcm9wZXJDYXNlIGZyb20gJy4vcHJvcGVyQ2FzZSc7XG5pbXBvcnQgcmVtb3ZlIGZyb20gJy4vcmVtb3ZlJztcbmltcG9ydCByZW1vdmVFeHRyYVdoaXRlc3BhY2UgZnJvbSAnLi9yZW1vdmVFeHRyYVdoaXRlc3BhY2UnO1xuaW1wb3J0IHJldmVyc2UgZnJvbSAnLi9yZXZlcnNlJztcbmltcG9ydCByZXZlcnNlV29yZHMgZnJvbSAnLi9yZXZlcnNlV29yZHMnO1xuaW1wb3J0IHNpbWlsYXJpdHkgZnJvbSAnLi9zaW1pbGFyaXR5JztcbmltcG9ydCBzdHJpcFRhZ3MgZnJvbSAnLi9zdHJpcFRhZ3MnO1xuaW1wb3J0IHN3YXBDYXNlIGZyb20gJy4vc3dhcENhc2UnO1xuaW1wb3J0IHRpbWVDb2RlIGZyb20gJy4vdGltZUNvZGUnO1xuaW1wb3J0IHRvTnVtYmVyIGZyb20gJy4vdG9OdW1iZXInO1xuaW1wb3J0IHRydW5jYXRlIGZyb20gJy4vdHJ1bmNhdGUnO1xuaW1wb3J0IHdvcmRDb3VudCBmcm9tICcuL3dvcmRDb3VudCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBhZnRlckZpcnN0LFxuICAgIGFmdGVyTGFzdCxcbiAgICBiZWZvcmVGaXJzdCxcbiAgICBiZWZvcmVMYXN0LFxuICAgIGJlZ2luc1dpdGgsXG4gICAgYmV0d2VlbixcbiAgICBibG9jayxcbiAgICBjYXBpdGFsaXplLFxuICAgIGNvdW50T2YsXG4gICAgZWRpdERpc3RhbmNlLFxuICAgIGVuZHNXaXRoLFxuICAgIGVzY2FwZUhUTUwsXG4gICAgZXNjYXBlUGF0dGVybixcbiAgICBoYXNUZXh0LFxuICAgIGlzTnVtZXJpYyxcbiAgICBwYWRMZWZ0LFxuICAgIHBhZFJpZ2h0LFxuICAgIHByZXZlbnRXaWRvdyxcbiAgICBwcm9wZXJDYXNlLFxuICAgIHJlbW92ZSxcbiAgICByZW1vdmVFeHRyYVdoaXRlc3BhY2UsXG4gICAgcmV2ZXJzZSxcbiAgICByZXZlcnNlV29yZHMsXG4gICAgc2ltaWxhcml0eSxcbiAgICBzdHJpcFRhZ3MsXG4gICAgc3dhcENhc2UsXG4gICAgdGltZUNvZGUsXG4gICAgdG9OdW1iZXIsXG4gICAgdHJ1bmNhdGUsXG4gICAgd29yZENvdW50XG59O1xuIiwiLy8gd2hldGhlciBzdHIgaXMgbnVtZXJpY1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNOdW1lcmljKHN0cikge1xuICAgIGNvbnN0IHJlZ3ggPSAvXlstK10/XFxkKlxcLj9cXGQrKD86W2VFXVstK10/XFxkKyk/JC87XG4gICAgcmV0dXJuIHJlZ3gudGVzdChzdHIpO1xufVxuIiwiLy8gcGFkIHN0ciB3aXRoIHN1YnN0ciBmcm9tIHRoZSBsZWZ0XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYWRMZWZ0KHN0ciwgc3Vic3RyLCBsZW5ndGgpIHtcbiAgICBzdHIgPSBTdHJpbmcoc3RyKTtcbiAgICB3aGlsZSAoc3RyLmxlbmd0aCA8IGxlbmd0aCkge1xuICAgICAgICBzdHIgPSBzdWJzdHIgKyBzdHI7XG4gICAgfVxuICAgIHJldHVybiBzdHI7XG59XG4iLCIvLyBwYWRzIHN0ciB3aXRoIHN1YnN0ciBmcm9tIHRoZSByaWdodFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFkUmlnaHQoc3RyLCBzdWJzdHIsIGxlbmd0aCkge1xuICAgIHN0ciA9IFN0cmluZyhzdHIpO1xuICAgIHdoaWxlIChzdHIubGVuZ3RoIDwgbGVuZ3RoKSB7XG4gICAgICAgIHN0ciArPSBzdWJzdHI7XG4gICAgfVxuICAgIHJldHVybiBzdHI7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwcmV2ZW50V2lkb3coc3RyKSB7XG4gICAgc3RyID0gc3RyLnRyaW0oKTtcblxuICAgIGNvbnN0IGxhc3RTcGFjZSA9IHN0ci5sYXN0SW5kZXhPZignICcpO1xuICAgIGlmIChsYXN0U3BhY2UgPiAwKSB7XG4gICAgICAgIHJldHVybiBgJHtzdHIuc2xpY2UoMCwgbGFzdFNwYWNlKX0mbmJzcDske3N0ci5zbGljZShsYXN0U3BhY2UgKyAxKX1gO1xuICAgIH1cblxuICAgIHJldHVybiBzdHI7XG59XG4iLCJpbXBvcnQgY2FwaXRhbGl6ZSBmcm9tICcuL2NhcGl0YWxpemUnO1xuXG4vLyBwcm9wZXIgY2FzZSBzdHIgaW4gc2VudGVuY2UgZm9ybWF0XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwcm9wZXJDYXNlKHN0cikge1xuICAgIGNvbnN0IG5ld1N0ciA9IHN0ci50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xcYihbXi4/OyFdKykvLCBjYXBpdGFsaXplKTtcbiAgICByZXR1cm4gbmV3U3RyLnJlcGxhY2UoL1xcYltpXVxcYi8sICdJJyk7XG59XG4iLCJpbXBvcnQgZXNjYXBlUGF0dGVybiBmcm9tICcuL2VzY2FwZVBhdHRlcm4nO1xuXG4vLyByZW1vdmUgYWxsIGluc3RhbmNlcyBvZiBzdWJzdHIgaW4gc3RyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW1vdmUoc3RyLCBzdWJzdHIsIGNhc2VTZW5zaXRpdmUgPSBmYWxzZSkge1xuICAgIGNvbnN0IGVzY2FwZWRTdHIgPSBlc2NhcGVQYXR0ZXJuKHN1YnN0cik7XG4gICAgY29uc3QgZmxhZ3MgPSBjYXNlU2Vuc2l0aXZlID8gJ2cnIDogJ2lnJztcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UobmV3IFJlZ0V4cChlc2NhcGVkU3RyLCBmbGFncyksICcnKTtcbn1cbiIsIi8vIHJlbW92ZSBleHRyYSB3aGl0ZXNwYWNlIChleHRyYSBzcGFjZXMsIHRhYnMsIGxpbmUgYnJlYWtzLCBldGMpXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW1vdmVFeHRyYVdoaXRlc3BhY2Uoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci50cmltKCkucmVwbGFjZSgvXFxzKy9nLCAnICcpO1xufVxuIiwiLy8gcmV2ZXJzZSBjaGFyYWN0ZXIgb3JkZXJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJldmVyc2Uoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5zcGxpdCgnJykucmV2ZXJzZSgpLmpvaW4oJycpO1xufVxuIiwiLy8gcmV2ZXJzZSB3b3JkIG9yZGVyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZXZlcnNlV29yZHMoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5zcGxpdCgnICcpLnJldmVyc2UoKS5qb2luKCcgJyk7XG59XG4iLCJpbXBvcnQgZWRpdERpc3RhbmNlIGZyb20gJy4vZWRpdERpc3RhbmNlJztcblxuLy8gcGVyY2VudGFnZSBvZiBzaW1pbGlhcml0eSBmcm9tIDAgdG8gMVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2ltaWxhcml0eShhLCBiKSB7XG4gICAgY29uc3QgZSA9IGVkaXREaXN0YW5jZShhLCBiKTtcbiAgICBjb25zdCBtID0gTWF0aC5tYXgoYS5sZW5ndGgsIGIubGVuZ3RoKTtcbiAgICBpZiAobSA9PT0gMCkge1xuICAgICAgICByZXR1cm4gMTtcbiAgICB9XG4gICAgcmV0dXJuICgxIC0gZSAvIG0pO1xufVxuIiwiLy8gcmVtb3ZlIGFsbCBIVE1MIHRhZ3MgZnJvbSBzdHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN0cmlwVGFncyhzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoLzxcXC8/W14+XSs+L2lnbSwgJycpO1xufVxuIiwiXG4vLyBzd2FwcyB0aGUgY2FzZSBvZiBzdHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN3YXBDYXNlKHN0cikge1xuICAgIHJldHVybiBzdHIucmVwbGFjZSgvKFxcdykvLCBmdW5jdGlvbihuZXdTdHIpIHtcbiAgICAgICAgY29uc3QgbG93ZXIgPSBuZXdTdHIudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgdXBwZXIgPSBuZXdTdHIudG9VcHBlckNhc2UoKTtcbiAgICAgICAgc3dpdGNoIChuZXdTdHIpIHtcbiAgICAgICAgICAgIGNhc2UgbG93ZXI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVwcGVyO1xuICAgICAgICAgICAgY2FzZSB1cHBlcjpcbiAgICAgICAgICAgICAgICByZXR1cm4gbG93ZXI7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBuZXdTdHI7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbiIsIi8vIGZvcm1hdHMgc2Vjb25kcyBpbnRvIEhIOk1NOlNTXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0aW1lQ29kZShzZWNvbmRzLCBkZWxpbSA9ICc6Jykge1xuICAgIGNvbnN0IGggPSBNYXRoLmZsb29yKHNlY29uZHMgLyAzNjAwKTtcbiAgICBjb25zdCBtID0gTWF0aC5mbG9vcigoc2Vjb25kcyAlIDM2MDApIC8gNjApO1xuICAgIGNvbnN0IHMgPSBNYXRoLmZsb29yKChzZWNvbmRzICUgMzYwMCkgJSA2MCk7XG4gICAgY29uc3QgaHIgPSAoaCA8IDEwID8gJzAnICsgaCA6IGgpICsgZGVsaW07XG4gICAgY29uc3QgbW4gPSAobSA8IDEwID8gJzAnICsgbSA6IG0pICsgZGVsaW07XG4gICAgY29uc3Qgc2MgPSAocyA8IDEwID8gJzAnICsgcyA6IHMpO1xuICAgIHJldHVybiBociArIG1uICsgc2M7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0b051bWJlcihzdHIpIHtcbiAgICByZXR1cm4gTnVtYmVyKHN0ci5yZXBsYWNlKC9bXjAtOS5dL2csICcnKSk7XG59XG4iLCIvLyB0cnVuY2F0ZSB0byBsZW5ndGggd2l0aCBzdWZmaXhcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRydW5jYXRlKHN0ciwgbGVuLCBzdWZmaXggPSAnLi4uJykge1xuICAgIGxlbiAtPSBzdWZmaXgubGVuZ3RoO1xuICAgIGxldCB0cnVuYyA9IHN0cjtcbiAgICBpZiAodHJ1bmMubGVuZ3RoID4gbGVuKSB7XG4gICAgICAgIHRydW5jID0gdHJ1bmMuc3Vic3RyKDAsIGxlbik7XG4gICAgICAgIGNvbnN0IHIgPSAvW15cXHNdLztcbiAgICAgICAgaWYgKHIudGVzdChzdHIuY2hhckF0KGxlbikpKSB7XG4gICAgICAgICAgICB0cnVuYyA9IHRydW5jLnJlcGxhY2UoL1xcdyskfFxccyskLywgJycpLnRyaW1SaWdodCgpO1xuICAgICAgICB9XG4gICAgICAgIHRydW5jICs9IHN1ZmZpeDtcbiAgICB9XG4gICAgcmV0dXJuIHRydW5jO1xufVxuIiwiLy8gdGhlIG51bWJlciBvZiB3b3JkcyBpbiBhIHN0cmluZ1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gd29yZENvdW50KHN0cikge1xuICAgIHJldHVybiBzdHIubWF0Y2goL1xcYlxcdytcXGIvZykubGVuZ3RoO1xufVxuIiwiLy8gaW1wb3J0IFNpZ25hbCBmcm9tICdzaWduYWxzJztcbmltcG9ydCBNaW5pU2lnbmFsIGZyb20gJ21pbmktc2lnbmFscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpY2tlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlID0gdGhpcy51cGRhdGUuYmluZCh0aGlzKTtcbiAgICAgICAgLy8gdGhpcy5vblVwZGF0ZSA9IG5ldyBTaWduYWwoKTtcbiAgICAgICAgdGhpcy5vblVwZGF0ZSA9IG5ldyBNaW5pU2lnbmFsKCk7XG5cbiAgICAgICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMubGFzdCA9IDA7XG4gICAgICAgIC8vIHRoaXMuYWNjdW11bGF0ZWQgPSAwO1xuICAgICAgICAvLyB0aGlzLnN0ZXAgPSAxMDAwIC8gNjA7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnJ1bm5pbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucnVubmluZyA9IHRydWU7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuXG4gICAgc3RvcCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnJ1bm5pbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnJ1bm5pbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGUpO1xuXG4gICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIGxldCBkdCA9IG5vdyAtIHRoaXMubGFzdDtcbiAgICAgICAgaWYgKGR0ID4gMjApIHtcbiAgICAgICAgICAgIGR0ID0gMjA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sYXN0ID0gbm93O1xuXG4gICAgICAgIC8vICAvLyBmaXhlZCBzdGVwOlxuICAgICAgICAvLyB0aGlzLmFjY3VtdWxhdGVkICs9IGR0O1xuICAgICAgICAvL1xuICAgICAgICAvLyB3aGlsZSAodGhpcy5hY2N1bXVsYXRlZCA+PSB0aGlzLnN0ZXApIHtcbiAgICAgICAgLy8gICAgIHRoaXMuYWNjdW11bGF0ZWQgLT0gdGhpcy5zdGVwO1xuICAgICAgICAvLyAgICAgdGhpcy5vblVwZGF0ZS5kaXNwYXRjaCh0aGlzLnN0ZXApO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgdGhpcy5vblVwZGF0ZS5kaXNwYXRjaChkdCAqIDAuMDAxKTtcbiAgICB9XG5cbiAgICBhZGQoZm4sIGNvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub25VcGRhdGUuYWRkKGZuLCBjb250ZXh0KTtcbiAgICB9XG5cbiAgICByZW1vdmUoYmluZGluZykge1xuICAgICAgICB0aGlzLm9uVXBkYXRlLmRldGFjaChiaW5kaW5nKTtcbiAgICB9XG5cbiAgICAvLyByZW1vdmUoZm4sIGNvbnRleHQpIHtcbiAgICAvLyAgICAgdGhpcy5vblVwZGF0ZS5yZW1vdmUoZm4sIGNvbnRleHQpO1xuICAgIC8vIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGV2ZW50KGNhdGVnb3J5LCBhY3Rpb24sIGxhYmVsLCB2YWx1ZSkge1xuICAgIGlmICghd2luZG93LmdhKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgd2luZG93LmdhKCdzZW5kJywgJ2V2ZW50JywgY2F0ZWdvcnksIGFjdGlvbiwgbGFiZWwsIHZhbHVlKTtcbn1cbiIsImltcG9ydCBldmVudCBmcm9tICcuL2V2ZW50JztcbmltcG9ydCBwYWdldmlldyBmcm9tICcuL3BhZ2V2aWV3JztcbmltcG9ydCBsb2FkIGZyb20gJy4vbG9hZCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBldmVudCxcbiAgICBwYWdldmlldyxcbiAgICBsb2FkXG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbG9hZChnYUFjY291bnQpIHtcbiAgICBjb25zb2xlLmxvZygnSW5pdGlhbGl6ZSBHb29nbGUgQW5hbHl0aWNzIHdpdGggYWNjb3VudCBJZDonLCBnYUFjY291bnQpO1xuXG4gICAgLyplc2xpbnQtZGlzYWJsZSovXG4gICAgKGZ1bmN0aW9uKGkscyxvLGcscixhLG0pe2lbJ0dvb2dsZUFuYWx5dGljc09iamVjdCddPXI7aVtyXT1pW3JdfHxmdW5jdGlvbigpe1xuXHQoaVtyXS5xPWlbcl0ucXx8W10pLnB1c2goYXJndW1lbnRzKX0saVtyXS5sPTEqbmV3IERhdGUoKTthPXMuY3JlYXRlRWxlbWVudChvKSxcblx0bT1zLmdldEVsZW1lbnRzQnlUYWdOYW1lKG8pWzBdO2EuYXN5bmM9MTthLnNyYz1nO20ucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoYSxtKVxuXHR9KSh3aW5kb3csZG9jdW1lbnQsJ3NjcmlwdCcsJy8vd3d3Lmdvb2dsZS1hbmFseXRpY3MuY29tL2FuYWx5dGljcy5qcycsJ2dhJyk7XG4gICAgLyplc2xpbnQtZW5hYmxlKi9cblxuICAgIHdpbmRvdy5nYSgnY3JlYXRlJywgZ2FBY2NvdW50LCAnYXV0bycpO1xuICAgIHdpbmRvdy5nYSgnc2VuZCcsICdwYWdldmlldycpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFnZXZpZXcocGF0aCkge1xuICAgIGlmICghd2luZG93LmdhKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgd2luZG93LmdhKCdzZW5kJywgJ3BhZ2V2aWV3JywgcGF0aCk7XG59XG4iLCJpbXBvcnQge2Vhc2VPdXRRdWFkfSBmcm9tICcuLi9lYXNlL3F1YWQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUd2VlbiB7XG4gICAgY29uc3RydWN0b3Iob2IsIHByb3BzLCBkdXJhdGlvbiwgb3B0aW9ucykge1xuICAgICAgICB0aGlzLm9iID0gb2I7XG5cbiAgICAgICAgaWYgKHByb3BzKSB7XG4gICAgICAgICAgICB0aGlzLnRvKHByb3BzLCBkdXJhdGlvbiwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0byhwcm9wcywgZHVyYXRpb24sIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICB0aGlzLmR1cmF0aW9uID0gZHVyYXRpb247XG4gICAgICAgIHRoaXMuZWFzZSA9IG9wdGlvbnMuZWFzZSB8fCBlYXNlT3V0UXVhZDtcbiAgICAgICAgdGhpcy5kZWxheSA9IG9wdGlvbnMuZGVsYXkgfHwgMDtcbiAgICAgICAgdGhpcy5vblVwZGF0ZSA9IG9wdGlvbnMub25VcGRhdGU7XG4gICAgICAgIHRoaXMub25Db21wbGV0ZSA9IG9wdGlvbnMub25Db21wbGV0ZTtcbiAgICAgICAgdGhpcy50aW1lID0gMDtcbiAgICAgICAgdGhpcy5jb21wbGV0ZSA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuX3Byb3BzID0gT2JqZWN0LmtleXMocHJvcHMpO1xuICAgICAgICB0aGlzLl9iZWdpblZhbHMgPSB7fTtcbiAgICAgICAgdGhpcy5fY2hhbmdlVmFscyA9IHt9O1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHByb3AgPSB0aGlzLl9wcm9wc1tpXTtcbiAgICAgICAgICAgIHRoaXMuX2JlZ2luVmFsc1twcm9wXSA9IHRoaXMub2JbcHJvcF07XG4gICAgICAgICAgICB0aGlzLl9jaGFuZ2VWYWxzW3Byb3BdID0gcHJvcHNbcHJvcF0gLSB0aGlzLl9iZWdpblZhbHNbcHJvcF07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGUoZHQpIHtcbiAgICAgICAgaWYgKHRoaXMudGltZSA9PT0gdGhpcy5kdXJhdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZGVsYXkgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmRlbGF5IC09IGR0O1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50aW1lICs9IGR0O1xuXG4gICAgICAgIGlmICh0aGlzLnRpbWUgPiB0aGlzLmR1cmF0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnRpbWUgPSB0aGlzLmR1cmF0aW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9wcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcHJvcCA9IHRoaXMuX3Byb3BzW2ldO1xuICAgICAgICAgICAgdGhpcy5vYltwcm9wXSA9IHRoaXMuZWFzZSh0aGlzLnRpbWUsIHRoaXMuX2JlZ2luVmFsc1twcm9wXSwgdGhpcy5fY2hhbmdlVmFsc1twcm9wXSwgdGhpcy5kdXJhdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5vblVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5vblVwZGF0ZSh0aGlzLm9iKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnRpbWUgPT09IHRoaXMuZHVyYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuY29tcGxldGUgPSB0cnVlO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5vbkNvbXBsZXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkNvbXBsZXRlKHRoaXMub2IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzZXQoKSB7XG4gICAgICAgIHRoaXMudGltZSA9IDA7XG4gICAgICAgIHRoaXMuY29tcGxldGUgPSBmYWxzZTtcbiAgICB9XG59XG4iLCJsZXQgaGlkZGVuLFxuICAgIGNoYW5nZTtcblxuaWYgKHR5cGVvZiBkb2N1bWVudC5oaWRkZW4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaGlkZGVuID0gJ2hpZGRlbic7XG4gICAgY2hhbmdlID0gJ3Zpc2liaWxpdHljaGFuZ2UnO1xufSBlbHNlIGlmICh0eXBlb2YgZG9jdW1lbnQubW96SGlkZGVuICE9PSAndW5kZWZpbmVkJykge1xuICAgIGhpZGRlbiA9ICdtb3pIaWRkZW4nO1xuICAgIGNoYW5nZSA9ICdtb3p2aXNpYmlsaXR5Y2hhbmdlJztcbn0gZWxzZSBpZiAodHlwZW9mIGRvY3VtZW50Lm1zSGlkZGVuICE9PSAndW5kZWZpbmVkJykge1xuICAgIGhpZGRlbiA9ICdtc0hpZGRlbic7XG4gICAgY2hhbmdlID0gJ21zdmlzaWJpbGl0eWNoYW5nZSc7XG59IGVsc2UgaWYgKHR5cGVvZiBkb2N1bWVudC53ZWJraXRIaWRkZW4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaGlkZGVuID0gJ3dlYmtpdEhpZGRlbic7XG4gICAgY2hhbmdlID0gJ3dlYmtpdHZpc2liaWxpdHljaGFuZ2UnO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgaGlkZGVuLFxuICAgIGNoYW5nZVxufTtcbiIsImltcG9ydCBhcGkgZnJvbSAnLi9hcGknO1xuaW1wb3J0IGVtaXR0ZXIgZnJvbSAnLi4vZXZlbnRzL2VtaXR0ZXInO1xuXG5jb25zdCB2aXNpYmlsaXR5ID0gT2JqZWN0LmNyZWF0ZShlbWl0dGVyLnByb3RvdHlwZSwge1xuICAgIGhpZGRlbjoge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50W2FwaS5oaWRkZW5dO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbmZ1bmN0aW9uIG9uVmlzaWJpbGl0eUNoYW5nZSgpIHtcbiAgICBpZiAoZG9jdW1lbnRbYXBpLmhpZGRlbl0pIHtcbiAgICAgICAgdmlzaWJpbGl0eS5lbWl0KCdoaWRkZW4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2aXNpYmlsaXR5LmVtaXQoJ3Nob3duJyk7XG4gICAgfVxufVxuXG5pZiAoYXBpLmNoYW5nZSkge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoYXBpLmNoYW5nZSwgb25WaXNpYmlsaXR5Q2hhbmdlLCBmYWxzZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHZpc2liaWxpdHk7XG4iXX0=
